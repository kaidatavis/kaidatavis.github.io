/**
 * URL helpers that respect the deployment's `base` path.
 *
 * The site is built with `format: 'directory'`, so `/papers` is written to disk
 * as `papers/index.html` and is served at `/papers/`. On a domain that is just
 * `/papers/`, but on a project Pages site it is `/personal-website/papers/`.
 * Writing paths by hand gets one of those two wrong, so route every internal URL
 * through here and keep `base` in astro.config.mjs as the single source of truth.
 */

/** e.g. '' for kaixu.me, '/personal-website' for the project Pages site. */
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

const ABSOLUTE = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

function isAbsolute(path: string): boolean {
  return ABSOLUTE.test(path);
}

/** Prefix the base path. Leaves the path otherwise untouched. */
export function asset(path: string): string {
  if (isAbsolute(path)) return path;
  const rel = path.replace(/^\/+/, '');
  return rel ? `${base}/${rel}` : `${base}/`;
}

/** Prefix the base path and give directory routes their trailing slash. */
export function route(path: string): string {
  if (isAbsolute(path)) return path;
  const [, pathname = '', suffix = ''] = path.match(/^([^?#]*)(.*)$/) ?? [];
  return asset(pathname).replace(/\/*$/, '/') + suffix;
}