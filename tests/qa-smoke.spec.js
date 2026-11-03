import { test, expect } from '@playwright/test';

const publicRoutes = [
  ['E2E-01', '/', 'home'],
  ['E2E-01', '/tiendas', 'tiendas'],
  ['E2E-01', '/privacidad', 'privacidad'],
  ['E2E-01', '/terminos', 'términos']
];

for (const [caseId, path, label] of publicRoutes) {
  test(caseId + ': ruta pública ' + label + ' responde', async ({ request }) => {
    const response = await request.get(path);
    expect(response.status(), 'HTTP para ' + path).toBeLessThan(400);
    expect(await response.text()).not.toBe('');
  });
}

test('E2E-02: el formulario de acceso de personal se muestra', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.locator('form').first()).toBeVisible();
  await expect(page.locator('input[type="password"]').first()).toBeVisible();
  await expect(page.locator('input[type="email"], input[name*="email" i]').first()).toBeVisible();
});

test('AUTH-01: visitante sin sesión no abre pedidos internos', async ({ page }) => {
  await page.goto('/admin/pedidos');
  const path = new URL(page.url()).pathname.toLowerCase();
  const loginVisible = await page.locator('input[type="password"]').count() > 0;
  expect(
    path.includes('login') || loginVisible,
    'Se esperaba login/redirección; URL final: ' + page.url()
  ).toBeTruthy();
});

for (const width of [360, 390, 768, 1280]) {
  test('VIS-04: login sin overflow horizontal a ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/admin/login');

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: Math.max(
        document.documentElement.scrollWidth,
        document.body?.scrollWidth ?? 0
      )
    }));

    expect(
      dimensions.document,
      'scrollWidth ' + dimensions.document + 'px supera viewport ' + dimensions.viewport + 'px'
    ).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
}

test('FORM-04: staff QA inicia sesión y llega al tablero (requiere cuenta sintética)', async ({ page }) => {
  const email = process.env.PW_ADMIN_EMAIL;
  const password = process.env.PW_ADMIN_PASSWORD;
  test.skip(!email || !password, 'Configura PW_ADMIN_EMAIL y PW_ADMIN_PASSWORD de una cuenta sintética autorizada.');

  await page.goto('/admin/login');
  await page.locator('input[type="email"], input[name*="email" i]').first().fill(email);
  await page.locator('input[type="password"]').first().fill(password);
  await page.locator('button[type="submit"], input[type="submit"]').first().click();

  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page).not.toHaveURL(/\/admin\/login(?:\?|$)/i);
});

