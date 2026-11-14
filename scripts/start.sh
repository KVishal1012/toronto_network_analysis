#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
.venv/bin/python -m server.app &
api_pid=$!
trap 'kill "$api_pid" 2>/dev/null || true' EXIT INT TERM
npm run "${1:-dev}"
