// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// `SITE_URL` decides both the canonical origin and the path prefix, so the same
// source deploys correctly to a domain at the root (kaixu.me) and to a project
// Pages site under a subdirectory (kaidatavis.github.io/personal-website).
// Default is the production domain.
const site = process.env.SITE_URL ?? 'https://kaixu.me';
const base = new URL(site).pathname.replace(/\/*$/, '/');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  // Pages serves each directory-format route at `<route>/`, so links must carry
  // the slash or every internal navigation pays a 301. See src/lib/routes.ts.
  trailingSlash: 'always',
  // Pages publishes the `docs/` folder of this branch directly. Committing it
  // means the site deploys from a branch with no GitHub Actions involved.
  outDir: './docs',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  // Old WordPress permalinks that are still linked to from elsewhere.
  redirects: {
    '/2025/09/14/ai-co-scientist/': '/projects/agentic-science/',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});