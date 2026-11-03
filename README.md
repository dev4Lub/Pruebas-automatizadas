# QA Luber: frontend y ciberseguridad

Este paquete contiene pruebas de navegador Playwright para https://dev.lbrluber.com. No incluye pruebas unitarias PHPUnit ni requiere editar código del backend. Las comprobaciones HTTP de endpoints están clasificadas como ciberseguridad de caja negra: observan la respuesta accesible desde fuera.

## Ejecutar en CMD

Abre CMD en esta carpeta. Configura el ambiente y ejecuta la suite completa:

    set "PLAYWRIGHT_BASE_URL=https://dev.lbrluber.com"
    npm run test:qa

Solo frontend:

    npm run test:front

Solo ciberseguridad web:

    npm run test:security

Los informes de cada ejecución quedan archivados en:

    evidencias/corrida-<fecha-hora>/
Dentro de cada corrida:
- playwright-report/index.html es el informe navegable de Playwright.
- test-results/ contiene capturas, videos y trazas de pruebas fallidas.
- LEEME.md resume fecha, URL y código de salida.

Para abrir el informe más reciente:

    npm run test:qa:report

Las capturas y videos se toman automáticamente en todos los casos. La traza se conserva cuando falla un caso. En pruebas con cuentas usa solo datos sintéticos, revisa que las capturas no muestren datos personales y protege la carpeta evidencias.

## Casos que requieren configuración

FORM-04 de frontend necesita una cuenta sintética autorizada:

    set "PW_ADMIN_EMAIL=correo-sintetico"
    set "PW_ADMIN_PASSWORD=clave-sintetica"

La revisión de cookie requiere el nombre real configurado por el sistema:

    set "PW_SESSION_COOKIE=nombre-real-de-cookie"

Si faltan estas variables, los casos correspondientes se omiten y el reporte lo indica.

## Scanner de ciberseguridad

Con Docker Desktop abierto, ejecuta en CMD:

    run-zap-baseline.cmd

Genera un informe pasivo ZAP HTML/JSON en la raíz del paquete. No ejecuta ataques activos. Para probar SQL injection de forma activa, usa solo un entorno aislado con datos descartables y autorización expresa; revisa los hallazgos antes de considerarlos confirmados.

"# Pruebas-automatizadas" 
