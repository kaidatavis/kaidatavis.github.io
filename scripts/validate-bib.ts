/**
 * Validates src/data/publications.bib and reports anything that would render
 * poorly on the papers page. Run with `pnpm run bib:check`.
 *
 * Warnings are advisory: Zotero exports are messy, and most are cosmetic.
 * Errors indicate data that will be visibly wrong.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createPublications, getPublicationCategories } from '../src/lib/publications-core';

const bibPath = fileURLToPath(new URL('../src/data/publications.bib', import.meta.url));
const pubs = createPublications(readFileSync(bibPath, 'utf8'));

const errors: string[] = [];
const warnings: string[] = [];
const notes: string[] = [];

if (pubs.length === 0) {
  console.error('No publications parsed. Is src/data/publications.bib present?');
  process.exit(1);
}

for (const pub of pubs) {
  const label = `${pub.key} (${pub.year || 'no year'})`;

  if (!pub.title || pub.title === pub.key) errors.push(`${label}: missing title`);
  if (!pub.year) errors.push(`${label}: missing or unparseable year`);
  if (!pub.authors.length) errors.push(`${label}: no authors`);
  if (!pub.venue) errors.push(`${label}: no venue for type "${pub.type}"`);
  if (pub.authors.some((a) => /[{}]/.test(a.family + a.given))) {
    errors.push(`${label}: unresolved braces in author names`);
  }
  if (/\\[a-zA-Z]|[{}]/.test(pub.title)) {
    errors.push(`${label}: leftover LaTeX in title -> ${pub.title}`);
  }
  if (pub.doi && !/^10\.\d{4,9}\/\S+$/.test(pub.doi)) {
    errors.push(`${label}: malformed DOI -> ${pub.doi}`);
  }
  if (pub.url && !/^https?:\/\//.test(pub.url)) {
    errors.push(`${label}: malformed URL -> ${pub.url}`);
  }
  // A single-part "family" is usually a mononym or a corporate author.
  if (pub.authors.some((a) => !a.family)) {
    warnings.push(`${label}: author with empty surname`);
  }
  if (!pub.doi && !pub.url) {
    warnings.push(`${label}: no DOI or URL (title will not be clickable)`);
  }
  if (!pub.abstract) notes.push(`${label}: no abstract`);
  if (pub.abstractTruncated) {
    warnings.push(`${label}: abstract ends mid-sentence (truncated in Zotero)`);
  }
}

const withDoi = pubs.filter((p) => p.doi).length;
const withAbstract = pubs.filter((p) => p.abstract).length;

console.log(`publications : ${pubs.length}`);
console.log(`categories   : ${getPublicationCategories(pubs).join(', ')}`);
console.log(`years        : ${[...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a).join(', ')}`);
console.log(`with DOI     : ${withDoi}/${pubs.length}`);
console.log(`with abstract: ${withAbstract}/${pubs.length}`);

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  x ${e}`);
}

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (notes.length) {
  console.log(`\n${notes.length} without abstracts:`);
  for (const n of notes) console.log(`  - ${n}`);
}

process.exit(errors.length ? 1 : 0);