# kaixu.me

Personal website for Kai Xu, Associate Professor in Computer Science at the
University of Nottingham. Research on human-AI collaboration, machine learning
and data visualisation.

Built with [Astro](https://astro.build), Tailwind CSS 4 and pnpm. Static output,
deployed to GitHub Pages on every push to `main`.

## Commands

| Command               | Action                                                        |
| :-------------------- | :------------------------------------------------------------ |
| `pnpm install`        | Install dependencies                                           |
| `pnpm dev`            | Dev server at `localhost:4321` (`pnpm astro dev --background` to detach) |
| `pnpm build`          | Production build to `./dist/`                                  |
| `pnpm preview`        | Serve the production build locally                             |
| `pnpm run typecheck`  | `astro check` — types, including `.astro` files                |
| `pnpm run bib:check`  | Validate `src/data/publications.bib` before it renders badly    |
| `pnpm astro -- --help`| Astro CLI                                                      |

`typecheck` and `bib:check` both run in CI and block a deploy, so run them
locally before pushing.

## Layout

```text
src/
├── components/        Header, Footer, ThemeToggle, Icon, cards
├── content/projects/  Markdown files, one per project idea
├── data/
│   ├── funding.ts     Grant history
│   ├── publications.bib  BibTeX source of truth for /papers
│   └── services.ts    Professional service and reviewing
├── layouts/           BaseLayout
├── lib/
│   ├── bibtex.ts      Dependency-free BibTeX parser
│   └── publications*.ts  Parsing/normalisation, plus the Astro-facing loader
├── pages/             One file per route
├── styles/global.css  Theme tokens, typography, utilities
└── config.ts          Profile, social links, navigation
```

### Adding a project

Create a Markdown file in `src/content/projects/`. The filename becomes the URL
(`/projects/FILENAME`), so use a short, stable name. A detail page is generated
automatically. Frontmatter is validated by `src/content.config.ts` — `summary`
must be 220 characters or fewer.

### Adding a publication

Replace `src/data/publications.bib` with a fresh Zotero export and run
`pnpm run bib:check`. The parser handles biblatex `date = YYYY-MM-DD` as well as
classic `year`/`month`, ignores Zotero's local `file` paths, and normalises DOIs
including the malformed `doi://10.…` and `https://doi.org/…` variants. Preprint
and published versions of the same title are deduplicated, keeping the published
one.

Strip the `file = {…}` lines before committing. Zotero writes your absolute
local paths into them, the parser ignores the field, and this repository is
public:

```sh
perl -i -pe 's/^\tfile = \{.*\},\n//' src/data/publications.bib
```

Warnings are advisory — most are older entries with no DOI or URL. Errors mean
the entry would render visibly wrong.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages. To set up a
new repository:

1. Create a GitHub repo and push this one to it.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Point a `kaixu.me` A record at GitHub's Pages IPs (`185.199.108–111.153`).
   `public/CNAME` is already set.
4. Enable "Enforce HTTPS" once the certificate has been issued.

The first deployment takes a few minutes while the certificate is issued.

### One thing to be aware of

`astro.config.mjs` sets `trailingSlash: 'never'` with `build.format: 'directory'`.
GitHub Pages serves directories at `/papers/` and redirects `/papers` there, so
every internal link takes one redirect hop and the canonical URL drops the
trailing slash. Setting `trailingSlash: 'always'` removes the hop. Decide before
going live — changing it later invalidates existing URLs.