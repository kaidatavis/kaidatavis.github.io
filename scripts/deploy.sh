#!/usr/bin/env bash
#
# Rebuild the static site and publish it to GitHub Pages.
#
# GitHub Pages is served from the committed dist/ directory, so this script
# commits the freshly built output and pushes it. The deploy workflow then
# uploads those exact files — no build runs in CI.
#
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Building"
pnpm run build

echo "==> Staging dist/"
git add dist

if git diff --cached --quiet -- dist; then
  echo "==> dist/ is already up to date; nothing to deploy."
  exit 0
fi

echo "==> Committing"
git commit -m "build: update pre-built output"

echo "==> Pushing"
git push

echo "==> Done. The deploy workflow will publish to GitHub Pages."