@echo off
setlocal
set "TARGET=https://dev.lbrluber.com"
echo Ejecutando ZAP Baseline pasivo contra %TARGET%
echo Se guardaran informes en esta carpeta.
docker run --rm -t -v "%cd%:/zap/wrk/:rw" ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t "%TARGET%" -r zap-baseline-report.html -J zap-baseline-report.json
set "SCAN_EXIT=%ERRORLEVEL%"
echo.
echo ZAP finalizo con codigo %SCAN_EXIT%.
echo Los avisos WARN pueden producir codigo 2; revisa el informe HTML/JSON.
exit /b %SCAN_EXIT%
