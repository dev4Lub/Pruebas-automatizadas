# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: qa-extended.spec.js >> TI-01: la página principal cumple el umbral de carga de 3 segundos
- Location: tests\qa-extended.spec.js:5:5

# Error details

```
Error: Carga observada: 6474 ms; máximo esperado: 3000 ms

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 3000
Received:    6474
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]: ✦
    - generic [ref=e4]:
      - strong [ref=e5]: 10% de descuento en compras en línea.
      - text: En prendas a precio regular, desde $120.000 COP, del 1 al 15 de noviembre.
    - link "Descubrir colección →" [ref=e6] [cursor=pointer]:
      - /url: /coleccion/todos
  - generic [ref=e7]:
    - generic [ref=e8]: 🚚 Envío gratis nacional, hasta nuevo aviso
    - generic [ref=e9]: ·
    - text: Asesoría WhatsApp 555-555-555
    - generic [ref=e10]: ·
    - link "📦 Rastrear mi pedido" [ref=e11] [cursor=pointer]:
      - /url: /cuenta#rastrear
  - banner [ref=e12]:
    - link [ref=e13] [cursor=pointer]:
      - /url: /
      - img "Luber" [ref=e14]
    - navigation [ref=e15]:
      - link "Inicio" [ref=e16] [cursor=pointer]:
        - /url: /
      - link "Hombre" [ref=e17] [cursor=pointer]:
        - /url: /coleccion/hombre
      - link "Mujer" [ref=e18] [cursor=pointer]:
        - /url: /coleccion/mujer
      - link "Tiendas" [ref=e19] [cursor=pointer]:
        - /url: /tiendas
      - link "📦 Rastrear pedido" [ref=e20] [cursor=pointer]:
        - /url: /cuenta#rastrear
        - generic [ref=e21]: 📦
        - generic [ref=e22]: Rastrear pedido
    - generic [ref=e23]:
      - button "Buscar" [ref=e24] [cursor=pointer]
      - button "Mi cuenta" [ref=e28] [cursor=pointer]
      - button "Ver carrito" [ref=e32] [cursor=pointer]:
        - generic [ref=e36]: "0"
  - complementary [aria-hidden] [ref=e37]:
    - generic [ref=e38]:
      - link [ref=e39] [cursor=pointer]:
        - /url: /
      - button [ref=e41] [cursor=pointer]: ✕
    - generic [ref=e42]:
      - generic [ref=e44]:
        - textbox [ref=e48]:
          - /placeholder: Buscar por prenda, tela, color...
        - button [ref=e49] [cursor=pointer]: Ir
      - link [ref=e50] [cursor=pointer]:
        - /url: /cuenta#rastrear
        - generic [ref=e51]:
          - generic [ref=e52]: 📦
          - generic [ref=e53]: Rastrear mi pedido
        - generic [ref=e54]: En vivo
      - generic [ref=e55]:
        - generic [ref=e56]: Navegación
        - list [ref=e57]:
          - listitem [ref=e58]:
            - link [ref=e59] [cursor=pointer]:
              - /url: /
              - generic [ref=e60]: 🏠
              - generic [ref=e61]: Inicio
              - generic [ref=e62]: →
          - listitem [ref=e63]:
            - link [ref=e64] [cursor=pointer]:
              - /url: /coleccion/todos
              - generic [ref=e65]: ✦
              - generic [ref=e66]: Todo el catálogo
              - generic [ref=e67]: →
          - listitem [ref=e68]:
            - link [ref=e69] [cursor=pointer]:
              - /url: /coleccion/hombre
              - generic [ref=e70]: 👔
              - generic [ref=e71]: Hombre
              - generic [ref=e72]: →
          - listitem [ref=e73]:
            - link [ref=e74] [cursor=pointer]:
              - /url: /coleccion/mujer
              - generic [ref=e75]: 👗
              - generic [ref=e76]: Mujer
              - generic [ref=e77]: →
      - generic [ref=e78]:
        - generic [ref=e79]: Prendas y Categorías
        - generic [ref=e80]:
          - link [ref=e81] [cursor=pointer]:
            - /url: /coleccion/hombre?subcat=sastreria
            - text: Sastrería & Blazers
          - link [ref=e82] [cursor=pointer]:
            - /url: /coleccion/hombre?subcat=camisas
            - text: Camisas
          - link [ref=e83] [cursor=pointer]:
            - /url: /coleccion/hombre?subcat=tejidos
            - text: Suéteres & Tejidos
          - link [ref=e84] [cursor=pointer]:
            - /url: /coleccion/hombre?subcat=pantalones
            - text: Pantalones Sastre
      - generic [ref=e85]:
        - generic [ref=e86]: Mi Cuenta & Compras
        - list [ref=e87]:
          - listitem [ref=e88]:
            - link [ref=e89] [cursor=pointer]:
              - /url: /carrito
              - generic [ref=e90]: 🛍️
              - generic [ref=e91]: Bolsa de Compras
              - generic [ref=e92]: "0"
          - listitem [ref=e93]:
            - link [ref=e94] [cursor=pointer]:
              - /url: /cuenta
              - generic [ref=e95]: 👤
              - generic [ref=e96]: Mi Cuenta / Iniciar sesión
              - generic [ref=e97]: →
          - listitem [ref=e98]:
            - link [ref=e99] [cursor=pointer]:
              - /url: /tiendas
              - generic [ref=e100]: 📍
              - generic [ref=e101]: Nuestras Tiendas (68 sedes)
              - generic [ref=e102]: →
      - generic [ref=e103]:
        - generic [ref=e104]: 💬 Asesoría y Compras
        - generic [ref=e105]: ¿Dudas con tu talla, pedido o pago? Escríbenos directamente a nuestra línea oficial.
        - link [ref=e106] [cursor=pointer]:
          - /url: https://wa.me/555555555?text=Hola+Luber+Colombia%2C+deseo+recibir+asesor%C3%ADa+para+una+compra+en+l%C3%ADnea.
          - generic [ref=e107]: 🟢
          - text: "WhatsApp: 555-555-555"
  - main [ref=e108]:
    - generic [ref=e109]:
      - img "Colección Luber 2026" [ref=e110]
      - generic [ref=e112]:
        - paragraph [ref=e113]: Nueva colección · 2026
        - heading "Presente y Futuro de la Moda." [level=1] [ref=e114]: Presente y Futurode la Moda.
        - paragraph [ref=e115]: Piezas de líneas limpias para acompañar los momentos que importan.
        - generic [ref=e116]:
          - link "Comprar hombre" [ref=e117] [cursor=pointer]:
            - /url: /coleccion/hombre
          - link "Ver mujer →" [ref=e118] [cursor=pointer]:
            - /url: /coleccion/mujer
          - link "📦 Rastrear pedido" [ref=e119] [cursor=pointer]:
            - /url: /cuenta#rastrear
      - generic [ref=e121]:
        - generic [ref=e122]: ✦ Confección Nacional
        - heading "Diseño Colombiano Para Cada Ocasión" [level=3] [ref=e123]: Diseño ColombianoPara Cada Ocasión
        - paragraph [ref=e124]: Sastrería y moda contemporánea creada con orgullo y precisión.
    - generic [ref=e125]:
      - link [ref=e126] [cursor=pointer]:
        - /url: /coleccion/hombre
        - img "Hombre vistiendo traje azul sastre Luber" [ref=e128]
        - generic [ref=e129]:
          - heading "Hombre" [level=2] [ref=e130]
          - text: Ver colección →
      - link [ref=e131] [cursor=pointer]:
        - /url: /coleccion/mujer
        - img "Mujer vistiendo conjunto sastre marfil Luber" [ref=e133]
        - generic [ref=e134]:
          - heading "Mujer" [level=2] [ref=e135]
          - text: Ver colección →
    - generic [ref=e136]:
      - text: LUBER / THE EDIT
      - generic [ref=e137]:
        - generic [ref=e138]:
          - paragraph [ref=e139]: Selección Luber
          - heading "Los imprescindibles de la temporada." [level=2] [ref=e140]: Los imprescindiblesde la temporada.
        - link "Explorar catálogo completo →" [ref=e141] [cursor=pointer]:
          - /url: /coleccion/todos
      - navigation "Filtrar por colección" [ref=e142]:
        - button "Ver todo" [ref=e143] [cursor=pointer]
        - button "Mujer" [ref=e144] [cursor=pointer]
        - button "Hombre" [ref=e145] [cursor=pointer]
      - generic [ref=e146]:
        - generic [ref=e147]: 6 productos
        - generic [ref=e148]:
          - button "Filtros +" [ref=e149] [cursor=pointer]:
            - text: Filtros
            - generic [ref=e150]: +
          - generic [ref=e151]:
            - generic [ref=e152]: "Ordenar por:"
            - combobox "Ordenar productos" [ref=e153] [cursor=pointer]:
              - option "Relevantes / Destacados" [selected]
              - 'option "Precio: menor a mayor"'
              - 'option "Precio: mayor a menor"'
              - option "Novedades / Más recientes"
              - 'option "Nombre: A — Z"'
      - generic [ref=e154]:
        - article [ref=e155]:
          - link "-10% Camisa Sport Azul Claro Ver detalle →" [ref=e156] [cursor=pointer]:
            - /url: /producto/camisa-sport-azul-claro-202021316906151011
            - generic [ref=e157]: "-10%"
            - img "Camisa Sport Azul Claro" [ref=e159]
            - text: Ver detalle →
          - generic [ref=e160]:
            - generic [ref=e161]:
              - generic [ref=e162]: Mujer
              - heading "Camisa Sport Azul Claro" [level=3] [ref=e163]
              - paragraph [ref=e164]: AZUL CLARO
            - generic [ref=e165]:
              - generic [ref=e166]: $169.900
              - text: $152.910
        - article [ref=e167]:
          - link "-10% Camisa Sport Rojo Claro Ver detalle →" [ref=e168] [cursor=pointer]:
            - /url: /producto/camisa-sport-rojo-claro
            - generic [ref=e169]: "-10%"
            - img "Camisa Sport Rojo Claro" [ref=e171]
            - text: Ver detalle →
          - generic [ref=e172]:
            - generic [ref=e173]:
              - generic [ref=e174]: Hombre
              - heading "Camisa Sport Rojo Claro" [level=3] [ref=e175]
              - paragraph [ref=e176]: Azul marino
            - generic [ref=e177]:
              - generic [ref=e178]: $129.900
              - text: $116.910
        - article [ref=e179]:
          - link "-10% Camisa Sport Beige Ver detalle →" [ref=e180] [cursor=pointer]:
            - /url: /producto/camisa-sport-beige-202021316906151255
            - generic [ref=e181]: "-10%"
            - img "Camisa Sport Beige" [ref=e183]
            - text: Ver detalle →
          - generic [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]: Mujer
              - heading "Camisa Sport Beige" [level=3] [ref=e187]
              - paragraph [ref=e188]: BEIGE
            - generic [ref=e189]:
              - generic [ref=e190]: $169.900
              - text: $152.910
        - article [ref=e191]:
          - link "-10% Suéter Gris Oscuro Ver detalle →" [ref=e192] [cursor=pointer]:
            - /url: /producto/sueter-gris-oscuro-107272214906153983
            - generic [ref=e193]: "-10%"
            - img "Suéter Gris Oscuro" [ref=e195]
            - text: Ver detalle →
          - generic [ref=e196]:
            - generic [ref=e197]:
              - generic [ref=e198]: Hombre
              - heading "Suéter Gris Oscuro" [level=3] [ref=e199]
              - paragraph [ref=e200]: GRIS OSCURO
            - generic [ref=e201]:
              - generic [ref=e202]: $149.900
              - text: $134.910
        - article [ref=e203]:
          - link "-10% Blusa Crudo Ver detalle →" [ref=e204] [cursor=pointer]:
            - /url: /producto/blusa-crudo-205052709906151291
            - generic [ref=e205]: "-10%"
            - img "Blusa Crudo" [ref=e207]
            - text: Ver detalle →
          - generic [ref=e208]:
            - generic [ref=e209]:
              - generic [ref=e210]: Mujer
              - heading "Blusa Crudo" [level=3] [ref=e211]
              - paragraph [ref=e212]: CRUDO
            - generic [ref=e213]:
              - generic [ref=e214]: $99.900
              - text: $89.910
        - article [ref=e215]:
          - link "-10% Camisa Sport Rojo Ver detalle →" [ref=e216] [cursor=pointer]:
            - /url: /producto/camisa-sport-rojo-202021316906151430
            - generic [ref=e217]: "-10%"
            - img "Camisa Sport Rojo" [ref=e219]
            - text: Ver detalle →
          - generic [ref=e220]:
            - generic [ref=e221]:
              - generic [ref=e222]: Mujer
              - heading "Camisa Sport Rojo" [level=3] [ref=e223]
              - paragraph [ref=e224]: ROJO
            - generic [ref=e225]:
              - generic [ref=e226]: $169.900
              - text: $152.910
    - generic [ref=e227]:
      - generic [ref=e228]:
        - paragraph [ref=e229]: Luber para cada paso
        - heading "Vestir bien es sentirte seguro." [level=2] [ref=e230]: Vestir bien essentirte seguro.
        - paragraph [ref=e231]: Diseñamos colecciones versátiles, con materiales que se sienten tan bien como se ven.
        - link "Conoce nuestra historia" [ref=e232] [cursor=pointer]:
          - /url: https://dev.lbrluber.com/nosotros
      - img "Woman wearing a cream tailored suit" [ref=e233]
    - region "Servicios para tu compra" [ref=e234]:
      - article [ref=e235]:
        - heading "Envíos nacionales" [level=3] [ref=e242]
        - paragraph [ref=e243]: Recibe tu compra donde estés en Colombia, con entregas estimadas de 7 a 15 días hábiles.
      - article [ref=e244]:
        - heading "Rastreo de pedido" [level=3] [ref=e249]
        - paragraph [ref=e250]: Consulta el estado de tu despacho en tiempo real con tu número de pedido o guía.
        - link "Rastrear mi pedido" [ref=e251] [cursor=pointer]:
          - /url: https://dev.lbrluber.com/cuenta#rastrear
      - article [ref=e255]:
        - heading "Asesoría y compra asistida" [level=3] [ref=e260]
        - paragraph [ref=e261]: Comunícate con nuestros asesores para coordinar tu compra al 555-555-555.
      - article [ref=e262]:
        - heading "Cambios fáciles" [level=3] [ref=e266]
        - paragraph [ref=e267]: Hasta 30 días para encontrar la talla perfecta.
    - generic [ref=e268]:
      - generic [ref=e269]:
        - paragraph [ref=e270]: Más cerca de ti
        - heading "Encuentra tu tienda Luber." [level=2] [ref=e271]: Encuentratu tienda Luber.
        - paragraph [ref=e272]: Más de 70 tiendas en Colombia para que vivas la experiencia Luber.
        - link "Buscar una tienda" [ref=e273] [cursor=pointer]:
          - /url: /tiendas
      - generic [ref=e274]:
        - paragraph [ref=e275]:
          - generic [ref=e276]: Bogotá
          - generic [ref=e277]: 18 tiendas
          - text: →
        - paragraph [ref=e278]:
          - generic [ref=e279]: Medellín
          - generic [ref=e280]: 6 tiendas
          - text: →
        - paragraph [ref=e281]:
          - generic [ref=e282]: Cali
          - generic [ref=e283]: 7 tiendas
          - text: →
        - paragraph [ref=e284]:
          - generic [ref=e285]: Otras ciudades
          - generic [ref=e286]: 42 tiendas
          - text: →
  - complementary [aria-hidden] [ref=e287]:
    - generic [ref=e288]:
      - strong [ref=e289]:
        - text: Tu bolsa
        - generic [ref=e290]: "0"
      - button [ref=e291] [cursor=pointer]: ×
    - generic [ref=e292]: Tu bolsa está vacía. Agrega tus piezas favoritas.
  - contentinfo [ref=e294]:
    - generic [ref=e295]:
      - link "Ir al inicio de Luber Colombia" [ref=e296] [cursor=pointer]:
        - /url: /
        - img "Luber Colombia" [ref=e297]
      - paragraph [ref=e298]:
        - strong [ref=e299]: Estilo y distinción que acompañan cada momento.
      - paragraph [ref=e300]: Diseñar y confeccionar prendas contemporáneas de alta calidad que exalten la autenticidad y elegancia cotidiana de cada persona en Colombia.
      - generic [ref=e301]:
        - generic [ref=e302]: "Síguenos:"
        - generic [ref=e303]:
          - link "Instagram de Luber Colombia" [ref=e304] [cursor=pointer]:
            - /url: https://instagram.com
          - link "Facebook de Luber Colombia" [ref=e308] [cursor=pointer]:
            - /url: https://facebook.com
          - link "TikTok de Luber Colombia" [ref=e311] [cursor=pointer]:
            - /url: https://tiktok.com
          - link "WhatsApp de Luber Colombia" [ref=e314] [cursor=pointer]:
            - /url: https://wa.me/555555555?text=Hola+Luber+Colombia%2C+deseo+recibir+asesor%C3%ADa+sobre+sus+colecciones.
    - generic [ref=e317]:
      - generic [ref=e318]: Sobre Luber
      - link "Nuestra historia" [ref=e319] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/nosotros
      - link "Misión y Visión" [ref=e320] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/nosotros#mision-vision
      - link "Sostenibilidad" [ref=e321] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/nosotros#sostenibilidad
      - link "Nuestras tiendas (70+)" [ref=e322] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/tiendas
      - link "Colección Hombre" [ref=e323] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/coleccion/hombre
      - link "Colección Mujer" [ref=e324] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/coleccion/mujer
    - generic [ref=e325]:
      - generic [ref=e326]: Servicio al Cliente
      - link "Mi cuenta personal" [ref=e327] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/cuenta
      - link "Rastrear mi pedido" [ref=e328] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/cuenta#rastrear
      - link "Preguntas frecuentes" [ref=e329] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/preguntas-frecuentes
      - link "Envíos y entregas" [ref=e330] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/preguntas-frecuentes#envios
      - link "Mi bolsa de compras" [ref=e331] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/carrito
      - link "Finalizar compra" [ref=e332] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/checkout
    - generic [ref=e333]:
      - generic [ref=e334]: Garantías & Marco Legal
      - link "Estatuto del Consumidor (Ley 1480 de 2011)" [ref=e335] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/cambios-devoluciones
      - link "Políticas de cambios (30 días)" [ref=e336] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/cambios-devoluciones#cambios
      - link "Devoluciones comerciales (20 días)" [ref=e337] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/cambios-devoluciones#cambios
      - 'link "Garantías anunciadas: ropa 30, calzado 60 y cuero 90 días" [ref=e338] [cursor=pointer]':
        - /url: https://dev.lbrluber.com/cambios-devoluciones#garantia
      - link "Derecho de retracto y reversión" [ref=e339] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/cambios-devoluciones#retracto
      - link "Tratamiento de datos (Habeas Data Ley 1581)" [ref=e340] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/privacidad
      - link "Términos y condiciones de compra" [ref=e341] [cursor=pointer]:
        - /url: https://dev.lbrluber.com/terminos
      - link "Vigilado Superintendencia SIC ↗" [ref=e342] [cursor=pointer]:
        - /url: https://www.sic.gov.co
    - generic [ref=e343]:
      - generic [ref=e344]: Atención al Cliente
      - generic [ref=e345]:
        - generic [ref=e346]: "Línea directa:"
        - link "555-555-555" [ref=e347] [cursor=pointer]:
          - /url: tel:555-555-555
      - generic [ref=e348]:
        - generic [ref=e349]: "WhatsApp oficial:"
        - link "555-555-555" [ref=e350] [cursor=pointer]:
          - /url: https://wa.me/555555555
      - generic [ref=e351]:
        - generic [ref=e352]: "Correo:"
        - link "[email protected]" [ref=e353] [cursor=pointer]:
          - /url: /cdn-cgi/l/email-protection#197a76776d787a6d7659756c7b7c6b377a7674377a76
      - generic [ref=e354]:
        - generic [ref=e355]: "Horario:"
        - generic [ref=e356]: "Lunes a Sábado: 8:00 a. m. – 8:00 p. m. (Hora Colombia)"
      - generic [ref=e357]:
        - generic [ref=e358]: "Sede principal:"
        - generic [ref=e359]: "Cra. 11 # 82-71, Zona Rosa · Bogotá, Colombia"
    - generic [ref=e360]:
      - generic [ref=e361]: © 2026 Comercializadora de Confecciones Luber Colombia S.A.S. NIT 901.842.109-4. Todos los derechos reservados.
      - generic [ref=e362]: "Comercio Electrónico vigilado y amparado bajo la Ley 1480 de 2011 (Estatuto del Consumidor), Ley Estatutaria 1581 de 2012 (Habeas Data) y Decreto 587 de 2016 de la República de Colombia. Entidad de control: Superintendencia de Industria y Comercio (SIC - www.sic.gov.co)."
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const basePublicPages = ['/', '/tiendas'];
  4  | 
  5  | test('TI-01: la página principal cumple el umbral de carga de 3 segundos', async ({ page }) => {
  6  |   const startedAt = Date.now();
  7  |   await page.goto('/', { waitUntil: 'load' });
  8  |   const elapsedMs = Date.now() - startedAt;
  9  | 
> 10 |   expect(elapsedMs, 'Carga observada: ' + elapsedMs + ' ms; máximo esperado: 3000 ms').toBeLessThanOrEqual(3000);
     |                                                                                        ^ Error: Carga observada: 6474 ms; máximo esperado: 3000 ms
  11 |   await expect(page.locator('body')).not.toBeEmpty();
  12 | });
  13 | 
  14 | test('TI-01: la página principal no genera excepciones JavaScript', async ({ page }) => {
  15 |   const errors = [];
  16 |   page.on('pageerror', error => errors.push(error.message));
  17 |   await page.goto('/', { waitUntil: 'load' });
  18 |   expect(errors, 'Excepciones de página: ' + errors.join(' | ')).toEqual([]);
  19 | });
  20 | 
  21 | test('TI-06: la búsqueda de Camisas muestra resultados', async ({ page }) => {
  22 |   await page.goto('/buscar?q=Camisas', { waitUntil: 'domcontentloaded' });
  23 |   const resultCount = page.getByText(/Se encontraron [1-9][0-9]* prendas disponibles en nuestro catálogo/i);
  24 |   await expect(resultCount).toBeVisible();
  25 | });
  26 | 
  27 | test('TI-07: la búsqueda comunica cuando no hay resultados', async ({ page }) => {
  28 |   await page.goto('/');
  29 |   const search = page.locator(
  30 |     'input[type="search"], input[placeholder*="buscar" i], input[name*="search" i], input[name="q"]'
  31 |   ).first();
  32 | 
  33 |   await expect(search, 'No encontré el campo de búsqueda; ajustar selector al DOM del sitio').toBeVisible();
  34 |   await search.fill('zzzxxx-sin-resultados');
  35 |   await search.press('Enter');
  36 | 
  37 |   await expect(
  38 |     page.getByRole('heading', { level: 3, name: /No encontramos resultados para/i })
  39 |   ).toBeVisible({ timeout: 10_000 });
  40 | });
  41 | 
  42 | test('TI-27 / TI-34: el panel administrativo exige autenticación', async ({ page }) => {
  43 |   await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  44 |   const finalPath = new URL(page.url()).pathname.toLowerCase();
  45 |   const loginVisible = await page.locator('input[type="password"]').count() > 0;
  46 | 
  47 |   expect(
  48 |     finalPath.includes('login') || loginVisible,
  49 |     'Se esperaba redirección al login; URL final: ' + page.url()
  50 |   ).toBeTruthy();
  51 | });
  52 | 
  53 | for (const route of basePublicPages) {
  54 |   for (const width of [360, 768]) {
  55 |     test('VIS-02: ' + route + ' sin overflow horizontal a ' + width + 'px', async ({ page }) => {
  56 |       await page.setViewportSize({ width, height: 900 });
  57 |       await page.goto(route, { waitUntil: 'domcontentloaded' });
  58 | 
  59 |       const dimensions = await page.evaluate(() => ({
  60 |         viewport: document.documentElement.clientWidth,
  61 |         document: Math.max(
  62 |           document.documentElement.scrollWidth,
  63 |           document.body?.scrollWidth ?? 0
  64 |         )
  65 |       }));
  66 | 
  67 |       expect(
  68 |         dimensions.document,
  69 |         route + ': scrollWidth ' + dimensions.document + 'px supera viewport ' + dimensions.viewport + 'px'
  70 |       ).toBeLessThanOrEqual(dimensions.viewport + 1);
  71 |     });
  72 |   }
  73 | }
  74 | 
  75 | test('FORM-01: el formulario de login impide enviar campos vacíos', async ({ page }) => {
  76 |   await page.goto('/admin/login');
  77 |   const form = page.locator('form').first();
  78 |   const email = form.locator('input[type="email"], input[name*="email" i]').first();
  79 |   const password = form.locator('input[type="password"]').first();
  80 | 
  81 |   await expect(form).toBeVisible();
  82 |   await expect(email).toBeVisible();
  83 |   await expect(password).toBeVisible();
  84 |   expect(await email.evaluate(el => el.checkValidity())).toBeFalsy();
  85 |   expect(await password.evaluate(el => el.checkValidity())).toBeFalsy();
  86 | });
  87 | 
  88 | test('FORM-02: el campo de correo rechaza un formato inválido', async ({ page }) => {
  89 |   await page.goto('/admin/login');
  90 |   const email = page.locator('input[type="email"], input[name*="email" i]').first();
  91 | 
  92 |   await expect(email).toBeVisible();
  93 |   await email.fill('correo-invalido');
  94 |   expect(
  95 |     await email.evaluate(el => el.checkValidity()),
  96 |     'El campo debe marcar como inválido el correo de prueba'
  97 |   ).toBeFalsy();
  98 | });
  99 | 
```