import { test, expect } from '@playwright/test';

const basePublicPages = ['/', '/tiendas'];

test('TI-01: la página principal cumple el umbral de carga de 3 segundos', async ({ page }) => {
  const startedAt = Date.now();
  await page.goto('/', { waitUntil: 'load' });
  const elapsedMs = Date.now() - startedAt;

  expect(elapsedMs, 'Carga observada: ' + elapsedMs + ' ms; máximo esperado: 3000 ms').toBeLessThanOrEqual(3000);
  await expect(page.locator('body')).not.toBeEmpty();
});

test('TI-01: la página principal no genera excepciones JavaScript', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/', { waitUntil: 'load' });
  expect(errors, 'Excepciones de página: ' + errors.join(' | ')).toEqual([]);
});

test('TI-06: la búsqueda de Camisas muestra resultados', async ({ page }) => {
  await page.goto('/buscar?q=Camisas', { waitUntil: 'domcontentloaded' });
  const resultCount = page.getByText(/Se encontraron [1-9][0-9]* prendas disponibles en nuestro catálogo/i);
  await expect(resultCount).toBeVisible();
});

test('TI-07: la búsqueda comunica cuando no hay resultados', async ({ page }) => {
  await page.goto('/');
  const search = page.locator(
    'input[type="search"], input[placeholder*="buscar" i], input[name*="search" i], input[name="q"]'
  ).first();

  await expect(search, 'No encontré el campo de búsqueda; ajustar selector al DOM del sitio').toBeVisible();
  await search.fill('zzzxxx-sin-resultados');
  await search.press('Enter');

  await expect(
    page.getByRole('heading', { level: 3, name: /No encontramos resultados para/i })
  ).toBeVisible({ timeout: 10_000 });
});

test('TI-27 / TI-34: el panel administrativo exige autenticación', async ({ page }) => {
  await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  const finalPath = new URL(page.url()).pathname.toLowerCase();
  const loginVisible = await page.locator('input[type="password"]').count() > 0;

  expect(
    finalPath.includes('login') || loginVisible,
    'Se esperaba redirección al login; URL final: ' + page.url()
  ).toBeTruthy();
});

for (const route of basePublicPages) {
  for (const width of [360, 768]) {
    test('VIS-02: ' + route + ' sin overflow horizontal a ' + width + 'px', async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: 'domcontentloaded' });

      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: Math.max(
          document.documentElement.scrollWidth,
          document.body?.scrollWidth ?? 0
        )
      }));

      expect(
        dimensions.document,
        route + ': scrollWidth ' + dimensions.document + 'px supera viewport ' + dimensions.viewport + 'px'
      ).toBeLessThanOrEqual(dimensions.viewport + 1);
    });
  }
}

test('FORM-01: el formulario de login impide enviar campos vacíos', async ({ page }) => {
  await page.goto('/admin/login');
  const form = page.locator('form').first();
  const email = form.locator('input[type="email"], input[name*="email" i]').first();
  const password = form.locator('input[type="password"]').first();

  await expect(form).toBeVisible();
  await expect(email).toBeVisible();
  await expect(password).toBeVisible();
  expect(await email.evaluate(el => el.checkValidity())).toBeFalsy();
  expect(await password.evaluate(el => el.checkValidity())).toBeFalsy();
});

test('FORM-02: el campo de correo rechaza un formato inválido', async ({ page }) => {
  await page.goto('/admin/login');
  const email = page.locator('input[type="email"], input[name*="email" i]').first();

  await expect(email).toBeVisible();
  await email.fill('correo-invalido');
  expect(
    await email.evaluate(el => el.checkValidity()),
    'El campo debe marcar como inválido el correo de prueba'
  ).toBeFalsy();
});
