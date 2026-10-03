// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kaixu.me',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  // Old WordPress permalinks that are still linked to from elsewhere.
  redirects: {
    '/2025/09/14/ai-co-scientist': '/projects/agentic-science',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});