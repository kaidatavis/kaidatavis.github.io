import {
  type BibEntry,
  authorsPlain,
  entryDate,
  latexToText,
  parseBibtex,
  resolveDate,
  splitNames,
} from './bibtex';

export type PublicationCategory = 'Journal' | 'Conference' | 'Chapter' | 'Thesis' | 'Report' | 'Preprint';

export interface Publication {
  key: string;
  type: string;
  category: PublicationCategory;
  title: string;
  authors: { family: string; given: string }[];
  authorText: string;
  /** Journal name, proceedings title, publisher, or institution. */
  venue: string;
  year: number;
  /** Sortable YYYYMMDD-ish integer. */
  date: number;
  month: number;
  volume?: string;
  number?: string;
  pages?: string;
  publisher?: string;
  isbn?: string;
  doi?: string;
  url?: string;
  abstract?: string;
  /** True when the source abstract was cut short (trailing ellipsis). */
  abstractTruncated: boolean;
  keywords: string[];
  /** Lowercased haystack for client-side search. */
  search: string;
}

const CATEGORY_BY_TYPE: Record<string, PublicationCategory> = {
  article: 'Journal',
  inproceedings: 'Conference',
  conference: 'Conference',
  incollection: 'Chapter',
  inbook: 'Chapter',
  book: 'Chapter',
  phdthesis: 'Thesis',
  mastersthesis: 'Thesis',
  thesis: 'Thesis',
  techreport: 'Report',
  report: 'Report',
  manual: 'Report',
  misc: 'Preprint',
  unpublished: 'Preprint',
};

/** Values Zotero writes that carry no meaning on a publication list. */
const NOISE = new Set(['null', 'undefined', 'n/a', 'none', 'selected', '']);

function txt(fields: Record<string, string>, key: string): string | undefined {
  const raw = fields[key];
  if (!raw) return undefined;
  const value = latexToText(raw);
  return NOISE.has(value.trim().toLowerCase()) ? undefined : value || undefined;
}

/** First present field among `keys`, after cleaning. */
function pick(fields: Record<string, string>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = txt(fields, key);
    if (value) return value;
  }
  return undefined;
}

/**
 * Normalise a DOI to its bare `10.xxxx/yyyy` form, or extract one from a URL.
 * Returns undefined when nothing usable is present.
 */
export function normalizeDoi(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let value = raw.trim();

  value = value
    .replace(/^(?:https?:\/\/)?(?:dx\.)?doi\.org\//i, '')
    .replace(/^doi:\/*/i, '')
    .trim();

  // Drop any trailing URL residue.
  const match = /^(10\.\d{4,9}\/\S+)/i.exec(value);
  if (!match) return undefined;
  return match[1].replace(/[.,;]$/, '');
}

export function doiUrl(doi: string): string {
  return `https://doi.org/${doi}`;
}

/**
 * Resolve the best external link for an entry, preferring a DOI because
 * `url` fields in Zotero exports are frequently publisher landing pages
 * that may move, while DOIs are permanent.
 */
function resolveLinks(fields: Record<string, string>): { doi?: string; url?: string } {
  const doi = normalizeDoi(txt(fields, 'doi'));
  const rawUrl = pick(fields, ['url', 'howpublished']);

  let url: string | undefined;
  if (rawUrl) {
    // `url = {doi://10.1098/...}` is a malformed but common Zotero idiom.
    const fromUrl = normalizeDoi(rawUrl);
    if (fromUrl) {
      url = doiUrl(fromUrl);
    } else if (/^https?:\/\//i.test(rawUrl)) {
      url = rawUrl;
    }
  }

  return { doi: doi ?? (url?.startsWith('https://doi.org/') ? url.slice(16) : undefined), url };
}

/** Venue label appropriate to the entry type. */
function resolveVenue(entry: BibEntry, f: Record<string, string>): string {
  switch (CATEGORY_BY_TYPE[entry.type]) {
    case 'Journal':
      return pick(f, ['journaltitle', 'journal']) ?? '';
    case 'Conference':
      return pick(f, ['booktitle', 'eventtitle', 'journaltitle', 'journal']) ?? 'Conference';
    case 'Chapter':
      return pick(f, ['booktitle', 'series']) ?? 'Book chapter';
    case 'Thesis':
      return pick(f, ['school', 'institution', 'publisher']) ?? 'Thesis';
    case 'Report':
      return pick(f, ['institution', 'publisher', 'school']) ?? 'Report';
    case 'Preprint':
      return pick(f, ['publisher', 'howpublished']) ?? 'Preprint';
    default:
      return pick(f, ['journaltitle', 'journal', 'booktitle', 'publisher']) ?? '';
  }
}

/** Normalise a page range, tolerating "to appear" and other placeholders. */
function resolvePages(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const value = raw.trim();
  if (!value || NOISE.has(value.toLowerCase())) return undefined;

  // Convert LaTeX -- ranges to en dashes, and single hyphens used as ranges.
  const cleaned = value.replace(/\s*--+\s*/g, '–').replace(/\s+-\s+/g, '–');
  if (/^(to appear|in press|forthcoming|unknown)$/i.test(cleaned)) return undefined;
  return cleaned;
}

/**
 * Zotero stores keyword lists comma-separated and, in a few entries, writes
 * the literal string "selected" as a flag. Drop the flag and cap the count.
 */
function resolveKeywords(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\s*[;,]\s*/)
    .map((k) => k.replace(/\.$/, '').trim())
    .filter((k) => k && !NOISE.has(k.toLowerCase()) && !/^selected$/i.test(k))
    .slice(0, 8);
}

function buildPublication(entry: BibEntry): Publication {
  const f = entry.fields;
  const { doi, url } = resolveLinks(f);
  const { year, month } = resolveDate(f);
  const title = pick(f, ['title']) ?? entry.key;
  // Edited volumes (e.g. Dagstuhl reports) list people under `editor` only.
  const rawAuthors = f.author || f.editor || '';

  const authors = splitNames(rawAuthors).map((a) => ({
    family: latexToText(a.family).replace(/[{}]/g, ''),
    given: latexToText(a.given).replace(/[{}]/g, ''),
  }));

  const abstractRaw = pick(f, ['abstract']);
  const abstractTruncated = Boolean(abstractRaw && /(?:\.\.\.|…)\s*$/.test(abstractRaw));
  const abstract = abstractRaw?.replace(/\s*(?:\.\.\.|…)\s*$/, '').trim();

  const pub: Publication = {
    key: entry.key,
    type: entry.type,
    category: CATEGORY_BY_TYPE[entry.type] ?? 'Preprint',
    title,
    authors,
    authorText: authorsPlain(rawAuthors),
    venue: resolveVenue(entry, f),
    year,
    date: entryDate(f),
    month,
    volume: pick(f, ['volume']),
    number: pick(f, ['number', 'issue']),
    pages: resolvePages(txt(f, 'pages')),
    publisher: pick(f, ['publisher']),
    isbn: pick(f, ['isbn']),
    doi,
    url,
    abstract,
    abstractTruncated,
    keywords: resolveKeywords(txt(f, 'keywords')),
    search: '',
  };

  pub.search = [
    pub.title,
    pub.authorText,
    pub.venue,
    pub.publisher ?? '',
    pub.keywords.join(' '),
    String(pub.year),
  ]
    .join(' ')
    .toLowerCase();

  return pub;
}

/**
 * Preprint/published duplicates share a title and author list but differ in
 * year and venue. Keep the published version and remember the preprint link.
 */
function dedupe(pubs: Publication[]): Publication[] {
  const byTitle = new Map<string, Publication>();

  for (const pub of pubs) {
    const signature = pub.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const existing = byTitle.get(signature);

    if (!existing) {
      byTitle.set(signature, pub);
      continue;
    }

    // Prefer non-preprint entries; among equals prefer the one with a DOI
    // and the more specific venue.
    const currentRank = rank(existing);
    const candidateRank = rank(pub);
    if (candidateRank > currentRank) byTitle.set(signature, pub);
  }

  return [...byTitle.values()];
}

function rank(pub: Publication): number {
  let score = 0;
  if (pub.category !== 'Preprint') score += 4;
  if (pub.doi) score += 2;
  if (pub.volume || pub.pages) score += 1;
  if (pub.publisher && pub.publisher.toLowerCase() !== 'arxiv') score += 1;
  return score;
}

/**
 * Parse and normalise a BibTeX source string, newest first. Kept free of any
 * Vite-specific imports so it can run under plain Node (see scripts/validate-bib.ts).
 */
export function createPublications(bibSource: string): Publication[] {
  return dedupe(parseBibtex(bibSource).map(buildPublication)).sort(
    (a, b) => b.date - a.date || a.title.localeCompare(b.title),
  );
}

/**
 * URL-safe anchor for a publication, derived from its BibTeX key. Used for
 * deep links into /papers (from the RSS feed, for example).
 */
export function pubAnchor(pub: Publication): string {
  return `pub-${pub.key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

/** Categories actually present, in display order. */
export function getPublicationCategories(pubs: Publication[]): PublicationCategory[] {
  const order: PublicationCategory[] = [
    'Journal',
    'Conference',
    'Preprint',
    'Chapter',
    'Report',
    'Thesis',
  ];
  const present = new Set(pubs.map((p) => p.category));
  return order.filter((c) => present.has(c));
}

/**
 * A plain-text citation, in a common author-year style. Used by the
 * "copy citation" control on each entry.
 */
export function citationText(pub: Publication): string {
  const names = pub.authors.map((a) => (a.given ? `${a.given} ${a.family}` : a.family));
  let authors: string;

  if (names.length === 0) authors = 'Anonymous';
  else if (names.length === 1) authors = names[0];
  else if (names.length <= 20) {
    authors = `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
  } else {
    authors = `${names[0]} et al.`;
  }

  const year = pub.year ? `(${pub.year})` : '(n.d.)';
  const locator = [pub.volume, pub.number ? `(${pub.number})` : '', pub.pages ? `:${pub.pages}` : '']
    .filter(Boolean)
    .join('');

  const container = pub.venue ? ` ${locator ? locator + ', ' : ''}${pub.venue}` : '';
  const doi = pub.doi ? ` https://doi.org/${pub.doi}` : pub.url ? ` ${pub.url}` : '';

  return `${authors} ${year}. ${pub.title}.${container}.${doi}`.replace(/\s+/g, ' ').trim();
}