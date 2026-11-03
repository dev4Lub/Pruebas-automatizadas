import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const timestamp = new Date().toISOString().replace(/[.:]/g, '-');
const evidenceDir = path.join(root, 'evidencias', 'corrida-' + timestamp);
const cliPath = path.join(root, 'node_modules', '@playwright', 'test', 'cli.js');
const testArgs = process.argv.slice(2);

if (!(await fs.stat(cliPath).catch(() => null))) {
  console.error('No encuentro Playwright instalado. Ejecuta npm install en esta carpeta.');
  process.exit(1);
}

const result = spawnSync(process.execPath, [cliPath, 'test', ...testArgs], {
  cwd: root,
  stdio: 'inherit',
  env: process.env
});

await fs.mkdir(evidenceDir, { recursive: true });

for (const folder of ['playwright-report', 'test-results']) {
  const source = path.join(root, folder);
  try {
    await fs.cp(source, path.join(evidenceDir, folder), { recursive: true, force: true });
  } catch {
    console.warn('No se encontró la carpeta ' + folder + ' para archivar.');
  }
}

const summary = [
  '# Evidencias Playwright',
  '',
  '- Fecha local de la corrida: ' + new Date().toLocaleString(),
  '- URL base: ' + (process.env.PLAYWRIGHT_BASE_URL || 'https://dev.lbrluber.com'),
  '- Código de salida de Playwright: ' + (result.status ?? 'sin estado'),
  '- Informe HTML: playwright-report/index.html',
  '- Capturas, videos, trazas y resultados: test-results/',
  '',
  'Usa solo datos sintéticos. Revisa y redacta cualquier dato sensible antes de compartir las evidencias.'
].join('\n');

await fs.writeFile(path.join(evidenceDir, 'LEEME.md'), summary, 'utf8');
console.log('\nEvidencias archivadas en: ' + evidenceDir);

process.exitCode = result.status ?? 1;
