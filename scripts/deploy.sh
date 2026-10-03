#!/usr/bin/env bash
#
# Rebuild the static site and publish it to GitHub Pages.
#
# Pages serves the committed docs/ folder of this branch, so this script builds
# into docs/, commits the result and pushes. No GitHub Actions involved.
#
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Building"
pnpm run build

echo "==> Staging docs/"
git add docs

if git diff --cached --quiet -- docs; then
  echo "==> docs/ is already up to date; nothing to deploy."
  exit 0
fi

echo "==> Committing"
git commit -m "build: update published site"

echo "==> Pushing"
git push

echo "==> Done. GitHub Pages republishes within a minute or two."
echo "    If the site looks stale, Settings -> Pages will show the deploy status."