// @ts-check
import { defineConfig } from 'astro/config';

// SITE / BASE_PATH are set by the GitHub Pages workflow.
// For a <user>.github.io repo the base is "/"; for a project repo it is "/<repo>".
export default defineConfig({
  site: process.env.SITE ?? 'https://kartik0330.github.io',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  // OUT_DIR lets the PDF script build a private resume outside dist/.
  outDir: process.env.OUT_DIR ?? './dist',
  // Inline CSS so built pages (the resume especially) render from file:// for PDF export.
  build: { inlineStylesheets: 'always' },
  // three.js is lazy-loaded after first paint, so its chunk size is expected.
  vite: { build: { chunkSizeWarningLimit: 700 } },
});
