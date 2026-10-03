# kaixu.me

Personal website for Kai Xu, Associate Professor in Computer Science at the
University of Nottingham. Research on human-AI collaboration, machine learning
and data visualisation.

Built with [Astro](https://astro.build), Tailwind CSS 4 and pnpm. Static output,
published to GitHub Pages from the committed `docs/` folder on `main` — no build
step runs in CI.

## Commands

| Command               | Action                                                        |
| :-------------------- | :------------------------------------------------------------ |
| `pnpm install`        | Install dependencies                                           |
| `pnpm dev`            | Dev server at `localhost:4321` (`pnpm astro dev --background` to detach) |
| `pnpm build`          | Production build to `./docs/`                                 |
| `pnpm preview`        | Serve the production build locally                             |
| `pnpm run typecheck`  | `astro check` — types, including `.astro` files                |
| `pnpm run bib:check`  | Validate `src/data/publications.bib` before it renders badly    |
| `pnpm run deploy`     | Build, commit `docs/` and push it — publishes to GitHub Pages  |
| `pnpm astro -- --help`| Astro CLI                                                      |

`typecheck` and `bib:check` run in CI as a quality gate on every push and
pull request. Neither one deploys anything.

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

docs/                  Built site: the folder GitHub Pages publishes
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

GitHub Pages publishes the **committed `docs/` folder of `main`** straight from
the branch. There is no build step in CI and no deploy workflow: what is
committed is exactly what is served.

`ci.yml` is the only workflow. It runs `typecheck` and `bib:check` on pushes and
pull requests so a broken `.astro` file or a malformed BibTeX entry is caught
before it reaches `docs/`. It never builds or deploys.

To publish a change:

```sh
pnpm run deploy
```

That builds into `docs/`, commits it with the message
`build: update published site`, and pushes. If the build changed nothing it
stops before committing. You can preview the exact result first with
`pnpm build && pnpm preview`.

**If you change source, rebuild.** Nothing regenerates `docs/` automatically, so
editing `src/` without committing a fresh `docs/` leaves the live site on the
old build. `pnpm run deploy` is the only step that updates it.

The Pages setting must match this arrangement: **Settings → Pages → Build and
deployment → Source: Deploy from a branch**, branch `main`, folder `/docs`.
Leave the custom domain box empty until you move to `kaixu.me` — see below.

### Why there is no CNAME file

`public/CNAME` is deliberately absent. A branch-published Pages site *reads* a
`CNAME` file from the publishing folder and adopts it as the custom domain
immediately, without waiting for you to ask. With `kaixu.me` in there, Pages
would try to serve the custom domain while DNS still points at the old host,
and `kaidatavis.github.io` would redirect away.

When you move to `kaixu.me`, set the custom domain in
**Settings → Pages** instead, which is the same effect but under your control.

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

`docs/` is committed, so **changing `SITE_URL` requires a rebuild**:

```sh
SITE_URL=https://kaixu.me pnpm run deploy
```

To move to `kaixu.me` for real:

1. Point a `kaixu.me` A record at GitHub's Pages IPs (`185.199.108–111.153`).
2. Enter `kaixu.me` in **Settings → Pages → Custom domain** and wait for the
   DNS check to pass. Leave the CNAME file out of `public/` so nothing claims
   the domain ahead of you.
3. Deploy with `SITE_URL=https://kaixu.me` as above.
4. Tick "Enforce HTTPS" once the certificate has been issued.

Pages caches a deployment for up to ten minutes, so the switch is not instant.
If a stale build lingers, Settings → Pages shows the deploy history.

Only the `<head>` and the redirect page use absolute URLs; all navigation is
relative, so a rebuild is enough to move the whole site.