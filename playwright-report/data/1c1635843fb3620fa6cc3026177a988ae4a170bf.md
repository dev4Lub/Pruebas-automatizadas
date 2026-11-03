# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa-pending.spec.js >> FORM-05: el login permite recorrer campos y botón con Tab/Shift+Tab sin enviar credenciales
- Location: tests\qa-pending.spec.js:154:5

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('button[type="submit"], input[type="submit"]').first()
Expected: focused
Received: inactive
Timeout:  8000ms

Call log:
  - Expect "toBeFocused" locator('button[type="submit"], input[type="submit"]').first() with timeout 8000ms
  - waiting for locator('button[type="submit"], input[type="submit"]').first()
    19 × locator resolved to <button type="submit">Entrar</button>
       - unexpected value "inactive"

```

```yaml
- button "Entrar"
```

# Test source

```ts
  66  |   const email = form.locator('input[type="email"]').first();
  67  |   if (await email.count()) {
  68  |     await email.fill('correo-invalido');
  69  |     expect(await email.evaluate((el) => el.checkValidity()), 'El correo inválido debe rechazarse en el navegador.').toBeFalsy();
  70  |   }
  71  | });
  72  | 
  73  | test('TI-24: la página definida para responsive no presenta overflow en móvil, tablet y desktop', async ({ page }) => {
  74  |   const route = required('PW_RESPONSIVE_PATH') || '/';
  75  |   for (const width of [360, 768, 1366]) {
  76  |     await page.setViewportSize({ width, height: 900 });
  77  |     await page.goto(new URL(route, baseURL).toString());
  78  |     const size = await page.evaluate(() => ({
  79  |       viewport: document.documentElement.clientWidth,
  80  |       document: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth ?? 0)
  81  |     }));
  82  |     expect(size.document, `${route} desborda a ${width}px`).toBeLessThanOrEqual(size.viewport + 1);
  83  |   }
  84  | });
  85  | 
  86  | test('TI-26: el catálogo configurado muestra productos y registra el tiempo observado', async ({ page }, testInfo) => {
  87  |   const catalogUrl = required('PW_CATALOG_URL');
  88  |   const itemSelector = required('PW_CATALOG_ITEM_SELECTOR');
  89  |   test.skip(!catalogUrl || !itemSelector, 'Define URL del catálogo y selector de producto; no se presupone una ruta ni el DOM.');
  90  | 
  91  |   const startedAt = Date.now();
  92  |   const response = await page.goto(catalogUrl, { waitUntil: 'domcontentloaded' });
  93  |   await expect(page.locator(itemSelector).first()).toBeVisible();
  94  |   await testInfo.attach('ti-26-carga-observada.txt', {
  95  |     body: Buffer.from(`HTTP ${response?.status() ?? 'sin respuesta'}\nTiempo hasta primer producto visible: ${Date.now() - startedAt} ms\n`),
  96  |     contentType: 'text/plain'
  97  |   });
  98  |   // El paquete no define un umbral de rendimiento para el catálogo; este test no inventa uno.
  99  | });
  100 | 
  101 | test('TI-35 / AUTH-02: al cerrar sesión, volver atrás y recargar exige autenticación', async ({ page }) => {
  102 |   await loginAsQaStaff(page);
  103 |   const protectedPath = required('PW_PROTECTED_ADMIN_PATH') || '/admin';
  104 |   const logoutSelector = required('PW_LOGOUT_SELECTOR');
  105 |   test.skip(!logoutSelector, 'Define PW_LOGOUT_SELECTOR para el botón/enlace real de cierre de sesión.');
  106 | 
  107 |   await page.goto(protectedPath);
  108 |   const logout = page.locator(logoutSelector).first();
  109 |   await expect(logout).toBeVisible();
  110 |   await logout.click();
  111 |   await page.goBack().catch(() => {});
  112 |   await page.reload();
  113 |   const finalPath = new URL(page.url()).pathname.toLowerCase();
  114 |   const loginVisible = await page.locator('input[type="password"]').count() > 0;
  115 |   expect(finalPath.includes('login') || loginVisible, 'Después del logout no debe quedar disponible la vista protegida.').toBeTruthy();
  116 | });
  117 | 
  118 | test('VIS-01: el tablero no desborda a los anchos definidos (espaciado requiere revisión visual)', async ({ page }, testInfo) => {
  119 |   await loginAsQaStaff(page);
  120 |   const dashboardPath = required('PW_ADMIN_DASHBOARD_PATH') || '/admin';
  121 |   await page.goto(dashboardPath);
  122 |   for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  123 |     await page.setViewportSize({ width, height: 900 });
  124 |     const size = await page.evaluate(() => ({
  125 |       viewport: document.documentElement.clientWidth,
  126 |       document: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth ?? 0)
  127 |     }));
  128 |     expect(size.document, `El tablero desborda a ${width}px`).toBeLessThanOrEqual(size.viewport + 1);
  129 |     await testInfo.attach(`vis-01-${width}px.png`, { body: await page.screenshot(), contentType: 'image/png' });
  130 |   }
  131 | });
  132 | 
  133 | test('VIS-03: la navegación por teclado mantiene el foco en controles visibles', async ({ page }, testInfo) => {
  134 |   await page.goto('/admin/login');
  135 |   const focused = [];
  136 |   for (let i = 0; i < 8; i++) {
  137 |     await page.keyboard.press('Tab');
  138 |     focused.push(await page.evaluate(() => {
  139 |       const el = document.activeElement;
  140 |       if (!el) return { tag: '(none)', visible: false, label: '' };
  141 |       const rect = el.getBoundingClientRect();
  142 |       return {
  143 |         tag: el.tagName,
  144 |         visible: rect.width > 0 && rect.height > 0,
  145 |         label: el.getAttribute('aria-label') || el.getAttribute('name') || el.textContent?.trim().slice(0, 60) || ''
  146 |       };
  147 |     }));
  148 |   }
  149 |   await testInfo.attach('vis-03-foco.json', { body: Buffer.from(JSON.stringify(focused, null, 2)), contentType: 'application/json' });
  150 |   expect(focused.filter((x) => x.visible).length, 'El foco debe avanzar por controles visibles.').toBeGreaterThan(0);
  151 |   // El orden semántico, foco visible y accesibilidad de menús/modales siguen requiriendo revisión manual.
  152 | });
  153 | 
  154 | test('FORM-05: el login permite recorrer campos y botón con Tab/Shift+Tab sin enviar credenciales', async ({ page }) => {
  155 |   await page.goto('/admin/login');
  156 |   const email = page.locator('input[type="email"], input[name*="email" i]').first();
  157 |   const password = page.locator('input[type="password"]').first();
  158 |   const submit = page.locator('button[type="submit"], input[type="submit"]').first();
  159 |   await expect(email).toBeVisible();
  160 |   await expect(password).toBeVisible();
  161 |   await expect(submit).toBeVisible();
  162 |   await email.focus();
  163 |   await page.keyboard.press('Tab');
  164 |   await expect(password).toBeFocused();
  165 |   await page.keyboard.press('Tab');
> 166 |   await expect(submit).toBeFocused();
      |                        ^ Error: expect(locator).toBeFocused() failed
  167 |   await page.keyboard.press('Shift+Tab');
  168 |   await expect(password).toBeFocused();
  169 | });
  170 | 
  171 | test.fixme('TI-29: manipulación del precio requiere contrato y sandbox de pagos autorizados', async () => {
  172 |   // No se implementa un envío de precio manipulado hasta definir fixture, endpoint y sandbox descartable.
  173 | });
  174 | 
```