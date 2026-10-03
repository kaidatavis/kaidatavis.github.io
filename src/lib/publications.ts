import {
  createPublications,
  getPublicationCategories as categoriesOf,
  type Publication,
} from './publications-core';

// Imported as a build-time string so the path never depends on the runtime
// working directory or the location of the compiled chunk.
import bibSource from '../data/publications.bib?raw';

export type { Publication, PublicationCategory } from './publications-core';
export { citationText, doiUrl, normalizeDoi, pubAnchor } from './publications-core';

let cache: Publication[] | null = null;

/** All publications, newest first. Parsed once per build. */
export function getPublications(): Publication[] {
  if (cache) return cache;
  cache = createPublications(bibSource);
  return cache;
}

/** A short list for the home page. */
export function getRecentPublications(limit = 5): Publication[] {
  return getPublications()
    .filter((p) => p.category === 'Journal' || p.category === 'Conference')
    .slice(0, limit);
}

/** Years that contain at least one publication, newest first. */
export function getPublicationYears(): number[] {
  return [...new Set(getPublications().map((p) => p.year))].filter(Boolean).sort((a, b) => b - a);
}

/** Categories actually present, in display order. */
export function getPublicationCategories() {
  return categoriesOf(getPublications());
}