#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Building and validating public distribution..."
npm run build:public

REMOTE_URL="$(git remote get-url origin)"
COMMIT_SHA="$(git rev-parse --short HEAD)"
TMP_DIR="$(mktemp -d /tmp/aster-gh-pages.XXXXXX)"
trap 'rm -rf "$TMP_DIR"' EXIT

cp -R "$ROOT/dist-public/." "$TMP_DIR/"
touch "$TMP_DIR/.nojekyll"

git -C "$TMP_DIR" init -b gh-pages >/dev/null
git -C "$TMP_DIR" add -A
git -C "$TMP_DIR" commit -m "Deploy ASTER public build (${COMMIT_SHA})" >/dev/null
git -C "$TMP_DIR" push --force "$REMOTE_URL" gh-pages

echo "Pushed dist-public (${COMMIT_SHA}) to ${REMOTE_URL} branch gh-pages."
echo "Enable GitHub Pages -> Settings -> Pages -> Deploy from branch: gh-pages / (root)"
