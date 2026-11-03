import { test, expect } from '@playwright/test';

const required = (name) => process.env[name]?.trim();
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'https://dev.lbrluber.com';

async function loginAsQaStaff(page) {
  const email = required('PW_ADMIN_EMAIL');
  const password = required('PW_ADMIN_PASSWORD');
  test.skip(!email || !password, 'Configura credenciales sintéticas autorizadas en PW_ADMIN_EMAIL y PW_ADMIN_PASSWORD.');

  await page.goto('/admin/login');
  await page.locator('input[type="email"], input[name*="email" i]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button[type="submit"], input[type="submit"]').first().click();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
}

test('TI-09: una variante agotada no se puede elegir', async ({ page }) => {
  const url = required('PW_OUT_OF_STOCK_PRODUCT_URL');
  const optionSelector = required('PW_OUT_OF_STOCK_OPTION_SELECTOR');
  test.skip(!url || !optionSelector, 'Define URL y selector de una variante agotada sintética en DEV.');

  await page.goto(url);
  const option = page.locator(optionSelector).first();
  await expect(option).toBeVisible();
  const unavailable = await option.evaluate((el) => {
    const text = (el.innerText || el.textContent || '').trim();
    return Boolean(el.disabled || el.getAttribute('aria-disabled') === 'true' || /agotad[oa]|sin stock/i.test(text));
  });
  expect(unavailable, 'La variante debe mostrarse agotada o deshabilitada.').toBeTruthy();
});

test('TI-13: el carrito conserva sus ítems al reabrir la página en el mismo contexto', async ({ page, context }) => {
  const productUrl = required('PW_CART_PRODUCT_URL');
  const addSelector = required('PW_ADD_TO_CART_SELECTOR');
  const cartPath = required('PW_CART_PATH');
  const itemSelector = required('PW_CART_ITEM_SELECTOR');
  test.skip(!productUrl || !addSelector || !cartPath || !itemSelector, 'Define URL sintética disponible, botón, ruta y selector de ítems del carrito.');

  await page.goto(productUrl);
  await page.locator(addSelector).first().click();
  const cart = await context.newPage();
  await cart.goto(new URL(cartPath, baseURL).toString());
  const before = await cart.locator(itemSelector).count();
  expect(before, 'El carrito debe contener el ítem recién agregado.').toBeGreaterThan(0);

  const reopenedPage = await context.newPage();
  await reopenedPage.goto(new URL(cartPath, baseURL).toString());
  await expect(reopenedPage.locator(itemSelector)).toHaveCount(before);
  await cart.close();
  await reopenedPage.close();
});

test('TI-17: el checkout marca los campos requeridos e inválidos sin enviar el pedido', async ({ page }) => {
  const checkoutUrl = required('PW_CHECKOUT_URL');
  test.skip(!checkoutUrl, 'Define PW_CHECKOUT_URL para un checkout de prueba que no procese pagos.');

  await page.goto(checkoutUrl);
  const form = page.locator('form').first();
  await expect(form).toBeVisible();
  const requiredCount = await form.locator('input[required], select[required], textarea[required]').count();
  expect(requiredCount, 'No encontré campos HTML requeridos en el formulario.').toBeGreaterThan(0);
  const emptyFormValid = await form.evaluate((el) => el.checkValidity());
  expect(emptyFormValid, 'El formulario vacío no debe ser válido.').toBeFalsy();

  const email = form.locator('input[type="email"]').first();
  if (await email.count()) {
    await email.fill('correo-invalido');
    expect(await email.evaluate((el) => el.checkValidity()), 'El correo inválido debe rechazarse en el navegador.').toBeFalsy();
  }
});

test('TI-24: la página definida para responsive no presenta overflow en móvil, tablet y desktop', async ({ page }) => {
  const route = required('PW_RESPONSIVE_PATH') || '/';
  for (const width of [360, 768, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL(route, baseURL).toString());
    const size = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth ?? 0)
    }));
    expect(size.document, `${route} desborda a ${width}px`).toBeLessThanOrEqual(size.viewport + 1);
  }
});

test('TI-26: el catálogo configurado muestra productos y registra el tiempo observado', async ({ page }, testInfo) => {
  const catalogUrl = required('PW_CATALOG_URL');
  const itemSelector = required('PW_CATALOG_ITEM_SELECTOR');
  test.skip(!catalogUrl || !itemSelector, 'Define URL del catálogo y selector de producto; no se presupone una ruta ni el DOM.');

  const startedAt = Date.now();
  const response = await page.goto(catalogUrl, { waitUntil: 'domcontentloaded' });
  await expect(page.locator(itemSelector).first()).toBeVisible();
  await testInfo.attach('ti-26-carga-observada.txt', {
    body: Buffer.from(`HTTP ${response?.status() ?? 'sin respuesta'}\nTiempo hasta primer producto visible: ${Date.now() - startedAt} ms\n`),
    contentType: 'text/plain'
  });
  // El paquete no define un umbral de rendimiento para el catálogo; este test no inventa uno.
});

test('TI-35 / AUTH-02: al cerrar sesión, volver atrás y recargar exige autenticación', async ({ page }) => {
  await loginAsQaStaff(page);
  const protectedPath = required('PW_PROTECTED_ADMIN_PATH') || '/admin';
  const logoutSelector = required('PW_LOGOUT_SELECTOR');
  test.skip(!logoutSelector, 'Define PW_LOGOUT_SELECTOR para el botón/enlace real de cierre de sesión.');

  await page.goto(protectedPath);
  const logout = page.locator(logoutSelector).first();
  await expect(logout).toBeVisible();
  await logout.click();
  await page.goBack().catch(() => {});
  await page.reload();
  const finalPath = new URL(page.url()).pathname.toLowerCase();
  const loginVisible = await page.locator('input[type="password"]').count() > 0;
  expect(finalPath.includes('login') || loginVisible, 'Después del logout no debe quedar disponible la vista protegida.').toBeTruthy();
});

test('VIS-01: el tablero no desborda a los anchos definidos (espaciado requiere revisión visual)', async ({ page }, testInfo) => {
  await loginAsQaStaff(page);
  const dashboardPath = required('PW_ADMIN_DASHBOARD_PATH') || '/admin';
  await page.goto(dashboardPath);
  for (const width of [1440, 1280, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    const size = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth ?? 0)
    }));
    expect(size.document, `El tablero desborda a ${width}px`).toBeLessThanOrEqual(size.viewport + 1);
    await testInfo.attach(`vis-01-${width}px.png`, { body: await page.screenshot(), contentType: 'image/png' });
  }
});

test('VIS-03: la navegación por teclado mantiene el foco en controles visibles', async ({ page }, testInfo) => {
  await page.goto('/admin/login');
  const focused = [];
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    focused.push(await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return { tag: '(none)', visible: false, label: '' };
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        visible: rect.width > 0 && rect.height > 0,
        label: el.getAttribute('aria-label') || el.getAttribute('name') || el.textContent?.trim().slice(0, 60) || ''
      };
    }));
  }
  await testInfo.attach('vis-03-foco.json', { body: Buffer.from(JSON.stringify(focused, null, 2)), contentType: 'application/json' });
  expect(focused.filter((x) => x.visible).length, 'El foco debe avanzar por controles visibles.').toBeGreaterThan(0);
  // El orden semántico, foco visible y accesibilidad de menús/modales siguen requiriendo revisión manual.
});

test('FORM-05: el login permite recorrer campos y botón con Tab/Shift+Tab sin enviar credenciales', async ({ page }) => {
  await page.goto('/admin/login');
  const email = page.locator('input[type="email"], input[name*="email" i]').first();
  const password = page.locator('input[type="password"]').first();
  const submit = page.locator('button[type="submit"], input[type="submit"]').first();
  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
  await expect(submit).toBeVisible();
  await email.focus();
  await page.keyboard.press('Tab');
  await expect(password).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(submit).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(password).toBeFocused();
});

test.fixme('TI-29: manipulación del precio requiere contrato y sandbox de pagos autorizados', async () => {
  // No se implementa un envío de precio manipulado hasta definir fixture, endpoint y sandbox descartable.
});
