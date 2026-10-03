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
| `pnpm run deploy`     | Build, commit `dist/` and push it — publishes to GitHub Pages   |
| `pnpm astro -- --help`| Astro CLI                                                      |

`typecheck` and `bib:check` run in CI and do not block a deploy. Run them
locally before pushing anyway.

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

dist/                  Built site, committed and deployed as-is
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

GitHub Pages is served from the **committed `dist/` directory**, not from a build
in CI. There are two workflows:

- `deploy.yml` — uploads `dist/` to GitHub Pages. No toolchain, no `pnpm install`,
  no build step: what is committed is exactly what goes live. It triggers only
  when `dist/` changes.
- `ci.yml` — runs `typecheck` and `bib:check` on pushes and pull requests. It
  never builds or deploys.

To publish a change:

```sh
pnpm run deploy
```

That builds, commits `dist/` with the message `build: update pre-built output`,
and pushes. If the build produced no change it stops before committing. You can
preview the exact result first with `pnpm build && pnpm preview`.

**If you change source, rebuild.** Nothing regenerates `dist/` automatically, so
editing `src/` without committing a fresh `dist/` leaves the live site on the old
build. `pnpm run deploy` is the only step that updates it.

### Where the site is deployed from

This repo is a **user Pages site** (`kaidatavis.github.io`), so it is served at
`https://kaidatavis.github.io/`. The canonical domain `kaixu.me` is not wired up
yet.

`SITE_URL` decides both the origin and the path prefix, so the same source
deploys to any of these without edits:

| `SITE_URL` | Serves at | `base` |
| --- | --- | --- |
| *(unset)* | `https://kaixu.me/` | `/` |
| `https://kaidatavis.github.io` | `https://kaidatavis.github.io/` | `/` |
| `https://example.github.io/repo` | `https://example.github.io/repo/` | `/repo/` |

`base` matters: without it Astro emits asset URLs at the origin root, and on a
subdirectory deployment the stylesheet, favicon and images all 404. Every
internal URL goes through `src/lib/routes.ts`, which joins `base` onto it.

`dist/` is committed, so **changing `SITE_URL` requires a rebuild**:

```sh
SITE_URL=https://kaixu.me pnpm run deploy
```

To move to `kaixu.me` for real:

1. Point a `kaixu.me` A record at GitHub's Pages IPs (`185.199.108–111.153`).
   `public/CNAME` is already set, so no repo change is needed beyond the rebuild.
2. Wait for the certificate, then enable "Enforce HTTPS" in
   **Settings → Pages**.
3. Deploy with `SITE_URL=https://kaixu.me` as above.

Only the `<head>` and the redirect page use absolute URLs; all navigation is
relative, so a rebuild is enough to move the whole site.