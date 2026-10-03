/**
 * A small, dependency-free BibTeX parser plus formatter.
 *
 * It covers the subset of BibTeX that academic homepages actually use:
 * brace- or paren-delimited entries, quoted and bare field values,
 * `#` concatenation, nested braces, and the common LaTeX escapes.
 */

export interface BibEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
}

export interface Author {
  family: string;
  given: string;
}

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */

/**
 * Split a BibTeX source string into individual entries.
 * Comments (`%` to end of line) outside of values are stripped first.
 */
export function parseBibtex(source: string): BibEntry[] {
  const entries: BibEntry[] = [];
  let i = 0;

  while (i < source.length) {
    const at = source.indexOf('@', i);
    if (at === -1) break;

    // Advance past whitespace and `%` comments between entries. When there is
    // no trivia to skip this is a no-op, which is the common `@type{` case.
    const next = skipTrivia(source, at + 1);

    const typeMatch = /^[a-zA-Z]+/.exec(source.slice(next));
    if (!typeMatch) {
      i = at + 1;
      continue;
    }
    const type = typeMatch[0].toLowerCase();

    let cursor = next + typeMatch[0].length;
    while (cursor < source.length && /\s/.test(source[cursor])) cursor++;

    const open = source[cursor];
    const close = open === '{' ? '}' : open === '(' ? ')' : null;
    if (!close) {
      i = at + 1;
      continue;
    }

    const end = findClosing(source, cursor, open, close);
    if (end === -1) break;

    entries.push(parseBody(source.slice(cursor + 1, end), type));
    i = end + 1;
  }

  return entries;
}

/** Advance past whitespace and `%` comments. Returns the new index. */
function skipTrivia(src: string, from: number): number {
  let i = from;
  while (i < src.length) {
    if (/\s/.test(src[i])) {
      i++;
    } else if (src[i] === '%') {
      while (i < src.length && src[i] !== '\n') i++;
    } else {
      break;
    }
  }
  return i;
}

/** Find the index of the delimiter that closes the one at `start`. */
function findClosing(src: string, start: number, open: string, close: string): number {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (ch === '\\') {
      i++;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Parse the text between an entry's delimiters. */
function parseBody(body: string, type: string): BibEntry {
  let i = skipTrivia(body, 0);

  // Citation key runs to the first comma.
  let key = '';
  while (i < body.length && body[i] !== ',' && body[i] !== '}') {
    key += body[i++];
  }
  if (body[i] === ',') i++;
  else return { type, key: key.trim(), fields: {} };

  const fields: Record<string, string> = {};

  while (i < body.length) {
    i = skipTrivia(body, i);

    const nameMatch = /^[a-zA-Z][a-zA-Z0-9_-]*/.exec(body.slice(i));
    if (!nameMatch) {
      i++;
      continue;
    }
    const name = nameMatch[0].toLowerCase();
    i += nameMatch[0].length;

    i = skipTrivia(body, i);
    if (body[i] !== '=') continue;
    i = skipTrivia(body, i + 1);

    const { value, next } = readValue(body, i);
    if (name) fields[name] = cleanValue(value);
    i = next;

    i = skipTrivia(body, i);
    if (body[i] === ',') i++;
  }

  return { type, key: key.trim(), fields };
}

/**
 * Read a field value, following `#` concatenation. Handles `{...}`,
 * `"..."` and bare tokens.
 */
function readValue(src: string, from: number): { value: string; next: number } {
  let out = '';
  let i = from;
  let expectValue = true;

  while (i < src.length && expectValue) {
    i = skipTrivia(src, i);
    const ch = src[i];

    if (ch === '{') {
      const end = findClosing(src, i, '{', '}');
      if (end === -1) break;
      out += src.slice(i, end + 1);
      i = end + 1;
    } else if (ch === '"') {
      let j = i + 1;
      let depth = 0;
      while (j < src.length) {
        const c = src[j];
        if (c === '\\') {
          j += 2;
          continue;
        }
        if (c === '{') depth++;
        else if (c === '}') depth--;
        else if (c === '"' && depth === 0) break;
        j++;
      }
      out += src.slice(i, j + 1);
      i = j + 1;
    } else {
      let j = i;
      while (j < src.length && src[j] !== ',' && src[j] !== '#' && src[j] !== '}') j++;
      out += src.slice(i, j).trim();
      i = j;
    }

    const after = skipTrivia(src, i);
    if (src[after] === '#') {
      i = after + 1;
      expectValue = true;
    } else {
      expectValue = false;
      i = after;
    }
  }

  return { value: out, next: i };
}

/** Strip wrapping delimiters and collapse whitespace. */
function cleanValue(raw: string): string {
  let v = raw.trim();

  // Unwrap `{...}` / `"..."` used only for grouping, repeatedly.
  let changed = true;
  while (changed) {
    changed = false;
    v = v.trim();
    if (v.length >= 2 && v.startsWith('{') && v.endsWith('}')) {
      const inner = v.slice(1, -1);
      if (findClosing(inner, 0, '{', '}') === -1) {
        v = inner;
        changed = true;
      }
    } else if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
      v = v.slice(1, -1);
      changed = true;
    }
  }

  return v.replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ *
 * LaTeX to plain text
 * ------------------------------------------------------------------ */

const ACCENTS: Record<string, string> = {
  "'a": 'á', "'e": 'é', "'i": 'í', "'o": 'ó', "'u": 'ú', "'y": 'ý', "'c": 'ć',
  "'s": 'š', "'z": 'ž', "'n": 'ń', "'A": 'Á', "'E": 'É', "'I": 'Í', "'O": 'Ó',
  "'U": 'Ú',
  '`a': 'à', '`e': 'è', '`i': 'ì', '`o': 'ò', '`u': 'ù',
  '~n': 'ñ', '~a': 'ã', '~o': 'õ',
  '^a': 'â', '^e': 'ê', '^i': 'î', '^o': 'ô', '^u': 'û',
  '"a': 'ä', '"e': 'ë', '"i': 'ï', '"o': 'ö', '"u': 'ü', '"y': 'ÿ',
  'cc': 'ç', 'cC': 'Ç', 'ss': 'ß', 'aa': 'å', 'o/': 'ø', 'OE': 'Œ',
  '.z': 'ż', '.Z': 'Ż', 'l': 'ł', 'L': 'Ł',
  'ae': 'æ', 'AE': 'Æ',
};

/** Convert a BibTeX field value into display-ready plain text. */
export function latexToText(input: string): string {
  let s = input;

  // Drop font/style commands but keep their contents.
  s = s.replace(/\\(?:textbf|textit|emph|texttt|textsc|underline|mbox|mathrm|bm|bf|it|em|sl)\s*\{([^{}]*)\}/g, '$1');

// Braced accents: {\'e} -> é, {\"o} -> ö
  s = s.replace(/\{\s*\\([a-zA-Z])(["'`^~=])\s*\{?\s*([a-zA-Z])\s*\}?\s*\}/g,
    (_m, _base: string, accent: string, letter: string) => ACCENTS[accent + letter] ?? letter,
  );

  // Unbraced accents: \'e -> é, \"o -> ö (keeps any preceding base letter)
  s = s.replace(/\\([a-zA-Z])(["'`^~=.])\s*\{?\s*([a-zA-Z])\s*\}?/g,
    (_m, base: string, accent: string, letter: string) => base + (ACCENTS[accent + letter] ?? letter),
  );

  // Remaining single-letter control sequences: \ss -> ß, \o -> ø
  s = s.replace(/\\([a-zA-Z]+)/g, (_m, cmd: string) => {
    const map: Record<string, string> = {
      ss: 'ß', ae: 'æ', AE: 'Æ', aa: 'å', o: 'ø', O: 'Ø',
      l: 'ł', L: 'Ł', oe: 'œ', OE: 'Œ',
    };
    return map[cmd] ?? '';
  });

  // Braced word joins that only protect capitals: {LLM} -> LLM
  s = s.replace(/\{([^{}]*)\}/g, '$1');

  // Symbol commands.
  const symbols: Record<string, string> = {
    '\\&': '&', '\\%': '%', '\\_': '_', '\\$': '$', '\\#': '#',
    '\\ldots': '…', '\\dots': '…', '\\textellipsis': '…',
    '\\textendash': '–', '\\textemdash': '—',
    '\\textbackslash': '\\', '\\textasciitilde': '~',
    '\\textquotesingle': "'", '\\textasciicircum': '^',
    '\\ae': 'æ', '\\oe': 'œ', '\\ss': 'ß', '\\aa': 'å', '\\o': 'ø',
    '\\O': 'Ø', '\\l': 'ł', '\\L': 'Ł', '\\i': 'ı', '\\j': 'ȷ',
    '\\dag': '†', '\\ddag': '‡', '\\S': '§', '\\P': '¶',
    '\\copyright': '©', '\\pounds': '£', '\\euro': '€',
    '\\rightarrow': '→', '\\to': '→', '\\leftarrow': '←',
    '\\times': '×', '\\approx': '≈', '\\sim': '~',
    "\\'": "'", '\\`': '`', '\\"': '"', '\\^': '^',
  };
  for (const [cmd, ch] of Object.entries(symbols)) {
    s = s.split(cmd).join(ch);
  }

  // Dashes.
  s = s.replace(/---/g, '—').replace(/--/g, '–');

  // Quotes.
  s = s.replace(/``/g, '\u201c').replace(/''/g, '\u201d').replace(/`/g, '\u2018').replace(/'/g, '\u2019');

  // Any remaining backslash command becomes a space rather than leaking markup.
  s = s.replace(/\\[a-zA-Z]+\s*/g, ' ');
  s = s.replace(/[{}]/g, '');

  return s.replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ *
 * Authors
 * ------------------------------------------------------------------ */

/**
 * Split a BibTeX `author`/`editor` field into individual names.
 *
 * Handles three real-world conventions seen in Zotero exports:
 * braced names (`{Kai Xu}`), corporate authors, and the
 * occasionally-reversed `given, family` order.
 */
export function splitNames(field: string): Author[] {
  if (!field) return [];

  return field
    .split(/\s+and\s+/i)
    .map((raw) => stripOuterBraces(raw.trim()))
    .filter(Boolean)
    .map((raw) => {
      if (raw.includes(',')) {
        const [first, second] = raw.split(',').map((s) => s.trim());
        // "William Wong, B. L." is really family="William Wong", given="B. L."
        // Detect by checking whether the trailing part is just initials.
        if (second && /^(?:[A-Z]\.?\s*){1,4}$/.test(second) && !/^(?:[A-Z]\.?\s*){1,4}$/.test(first)) {
          return { family: first, given: second };
        }
        return { family: first, given: second ?? '' };
      }

      const parts = raw.split(/\s+/).filter(Boolean);
      if (parts.length === 1) return { family: parts[0], given: '' };

      // Treat trailing name particles (van, de, der) as part of the surname.
      const particles = new Set([
        'van', 'von', 'de', 'del', 'della', 'der', 'den', 'da', 'di',
        'du', 'la', 'le', 'ten', 'ter', 'bin', 'al',
      ]);
      let splitAt = parts.length - 1;
      while (splitAt > 1 && particles.has(parts[splitAt - 1].toLowerCase())) splitAt--;

      return {
        family: parts.slice(splitAt).join(' '),
        given: parts.slice(0, splitAt).join(' '),
      };
    });
}

/** Remove one layer of surrounding braces, if present. */
function stripOuterBraces(value: string): string {
  let v = value.trim();
  while (v.length >= 2 && v.startsWith('{') && v.endsWith('}')) {
    const inner = v.slice(1, -1).trim();
    // Only unwrap when the braces wrap the whole thing.
    let depth = 0;
    let wrapsAll = true;
    for (let i = 0; i < inner.length; i++) {
      if (inner[i] === '{') depth++;
      else if (inner[i] === '}') {
        depth--;
        if (depth < 0) {
          wrapsAll = false;
          break;
        }
      }
    }
    if (!wrapsAll || depth !== 0) break;
    v = inner;
  }
  return v;
}

/** One-line author string for search indexes and citation keys. */
export function authorsPlain(field: string): string {
  return splitNames(field)
    .map((a) => (a.given ? `${a.given} ${a.family}` : a.family))
    .join(', ');
}

/* ------------------------------------------------------------------ *
 * Dates
 * ------------------------------------------------------------------ */

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/**
 * Resolve a month token to 1-12. Accepts a full name, a three-letter
 * abbreviation, or a numeric string. Zotero exports both bare (`month = apr`)
 * and braced forms.
 */
function monthNumber(field: string | undefined): number {
  if (!field) return 0;
  const first = field.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!first) return 0;

  const asNumber = Number.parseInt(first, 10);
  if (Number.isFinite(asNumber) && asNumber >= 1 && asNumber <= 12) return asNumber;

  const full = MONTHS.find((m) => m.startsWith(first));
  return full ? MONTHS.indexOf(full) + 1 : 0;
}

/**
 * Derive year/month from biblatex (`date = 2022-04-14`) or classic
 * BibTeX (`year = 2026` plus `month = apr`) conventions.
 */
export function resolveDate(fields: Record<string, string>): { year: number; month: number } {
  const date = (fields.date ?? '').trim();

  if (date) {
    const match = /^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/.exec(date);
    if (match) {
      const year = Number.parseInt(match[1], 10);
      const month = match[2] ? Number.parseInt(match[2], 10) : 0;
      return {
        year: Number.isFinite(year) ? year : 0,
        month: month >= 1 && month <= 12 ? month : 0,
      };
    }
  }

  const year = Number.parseInt(fields.year ?? '', 10);
  return {
    year: Number.isFinite(year) ? year : 0,
    month: monthNumber(fields.month),
  };
}

/** Sortable numeric date (YYYYMMDD-style), used to order entries newest first. */
export function entryDate(fields: Record<string, string>): number {
  const { year, month } = resolveDate(fields);
  if (!year) return 0;
  return year * 10000 + month * 100 + 1;
}

export function entryYear(fields: Record<string, string>): number {
  return resolveDate(fields).year;
}