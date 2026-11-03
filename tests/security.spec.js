import { test, expect } from '@playwright/test';

const protectedApiPaths = [
  '/api/v1/me',
  '/api/v1/internal/products',
  '/api/v1/internal/orders',
  '/api/v1/marketing/products',
  '/api/v1/marketing/orders'
];

async function attachResponseMeta(testInfo, path, response) {
  const meta = [
    'GET ' + path,
    'HTTP ' + response.status(),
    'Content-Type: ' + (response.headers()['content-type'] || '(ausente)'),
    'Respuesta recibida; cuerpo omitido para no guardar posibles datos personales.'
  ].join('\n');
  await testInfo.attach('evidencia-http.txt', {
    body: Buffer.from(meta, 'utf8'),
    contentType: 'text/plain'
  });
}

test('SEC-FE-01: home expone cabeceras básicas de seguridad', async ({ request }, testInfo) => {
  const response = await request.get('/');
  const headers = response.headers();
  const selected = {
    status: response.status(),
    'x-frame-options': headers['x-frame-options'] || '(ausente)',
    'x-content-type-options': headers['x-content-type-options'] || '(ausente)',
    'content-security-policy': headers['content-security-policy'] || '(ausente)',
    'referrer-policy': headers['referrer-policy'] || '(ausente)',
    'strict-transport-security': headers['strict-transport-security'] || '(ausente)'
  };

  await testInfo.attach('cabeceras-seguridad.json', {
    body: Buffer.from(JSON.stringify(selected, null, 2), 'utf8'),
    contentType: 'application/json'
  });

  expect(response.status()).toBeLessThan(400);
  expect(headers['x-content-type-options']).toBeTruthy();
  expect(headers['content-security-policy']).toBeTruthy();
});

for (const route of ['/admin', '/admin/pedidos']) {
  test('SEC-FE-02: visitante no obtiene contenido protegido en ' + route, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const finalPath = new URL(page.url()).pathname.toLowerCase();
    const loginVisible = await page.locator('input[type="password"]').count() > 0;
    expect(finalPath.includes('login') || loginVisible).toBeTruthy();
  });
}

for (const route of protectedApiPaths) {
  test('SEC-API: ' + route + ' requiere autenticación', async ({ request }, testInfo) => {
    const response = await request.get(route);
    await attachResponseMeta(testInfo, route, response);
    expect([401, 403]).toContain(response.status());
  });
}

test('SEC-FE-03: búsqueda no ejecuta una sonda XSS inocua', async ({ page }) => {
  await page.addInitScript(() => { window.__luberXssProbe = 0; });
  const probe = '<script>window.__luberXssProbe=1</script>';
  await page.goto('/buscar?q=' + encodeURIComponent(probe), { waitUntil: 'domcontentloaded' });
  expect(await page.evaluate(() => window.__luberXssProbe)).toBe(0);
});

test('SEC-FE-04: búsqueda no filtra errores SQL con una entrada de prueba', async ({ request }, testInfo) => {
  const route = '/buscar?q=%27';
  const response = await request.get(route);
  const body = await response.text();
  const sqlError = /SQLSTATE|PDOException|SQL syntax|syntax error.*SQL|database error/i.test(body);

  await testInfo.attach('evidencia-inyeccion.txt', {
    body: Buffer.from([
      'GET ' + route,
      'HTTP ' + response.status(),
      'Se detectó texto típico de error SQL: ' + sqlError,
      'Se adjunta solo el resultado lógico, no el cuerpo, para evitar filtrar información.'
    ].join('\n'), 'utf8'),
    contentType: 'text/plain'
  });

  expect(response.status()).toBeLessThan(500);
  expect(sqlError).toBeFalsy();
});

test('SEC-FE-05: recibo sintético no es público desde storage', async ({ request }, testInfo) => {
  const route = '/storage/receipts/qa-no-existe.pdf';
  const response = await request.get(route);
  await attachResponseMeta(testInfo, route, response);
  expect([401, 403, 404]).toContain(response.status());
});

test('SEC-FE-06: atributos de cookie de sesión (requiere PW_SESSION_COOKIE)', async ({ request }, testInfo) => {
  const cookieName = process.env.PW_SESSION_COOKIE;
  test.skip(!cookieName, 'Configura PW_SESSION_COOKIE con el nombre real de cookie de sesión.');

  const response = await request.get('/admin/login');
  const setCookie = response.headers()['set-cookie'] || '';
  const cookie = setCookie.split(/,(?=[^;,]+=)/).find(line => line.trim().startsWith(cookieName + '='));

  await testInfo.attach('cookie-redactada.txt', {
    body: Buffer.from(cookie
      ? cookie.replace(/=.*/, '=[REDACTADO]')
      : 'La ruta no emitió la cookie configurada en esta respuesta.', 'utf8'),
    contentType: 'text/plain'
  });

  expect(cookie, 'La respuesta debe emitir la cookie de sesión configurada').toBeTruthy();
  expect(cookie).toMatch(/httponly/i);
  expect(cookie).toMatch(/samesite=(lax|strict)/i);
  expect(cookie).toMatch(/secure/i);
});
