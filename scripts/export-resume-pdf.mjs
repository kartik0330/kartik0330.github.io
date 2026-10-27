// Builds the site and prints /resume to an A4 PDF with headless Edge or Chrome.
//
//   npm run pdf              -> public/Kartik_Mangal_Resume_2026.pdf (published; no phone number)
//   npm run pdf -- --private -> research/Kartik_Mangal_Resume_2026_private.pdf (local only; includes phone)
//
// Set CHROME_PATH to use a specific browser.
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const isPrivate = process.argv.includes('--private');
const fileName = 'Kartik_Mangal_Resume_2026';

const outDir = isPrivate ? join(root, 'research', '.private-build') : join(root, 'dist');
const pdfPath = isPrivate
  ? join(root, 'research', `${fileName}_private.pdf`)
  : join(root, 'public', `${fileName}.pdf`);

const browsers = [
  process.env.CHROME_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const browser = browsers.find((b) => existsSync(b));
if (!browser) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.');
  process.exit(1);
}

// Private details (e.g. RESUME_PHONE=...) live in research/.env.private, which is git-ignored.
const privateEnv = {};
const privateEnvFile = join(root, 'research', '.env.private');
if (isPrivate && existsSync(privateEnvFile)) {
  for (const line of readFileSync(privateEnvFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m) privateEnv[m[1]] = m[2];
  }
}

console.log(`Building site${isPrivate ? ' (private resume)' : ''}...`);
const build = spawnSync(process.execPath, [join(root, 'node_modules', 'astro', 'bin', 'astro.mjs'), 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, OUT_DIR: outDir, ...(isPrivate ? { PRIVATE_RESUME: '1', ...privateEnv } : {}) },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const page = pathToFileURL(join(outDir, 'resume', 'index.html')).href;
const profile = mkdtempSync(join(tmpdir(), 'resume-pdf-'));
mkdirSync(resolve(pdfPath, '..'), { recursive: true });

console.log(`Printing ${page}\n  -> ${pdfPath}`);
const print = spawnSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${pdfPath}`,
    page,
  ],
  { stdio: 'inherit' },
);
rmSync(profile, { recursive: true, force: true });
if (print.status !== 0 || !existsSync(pdfPath)) {
  console.error('PDF export failed.');
  process.exit(print.status ?? 1);
}

if (isPrivate) {
  rmSync(outDir, { recursive: true, force: true });
} else {
  // public/ was copied into dist/ before the PDF existed; add it so dist is deployable as-is.
  copyFileSync(pdfPath, join(outDir, `${fileName}.pdf`));
}
console.log('Done.');
