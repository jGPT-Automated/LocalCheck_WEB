#!/bin/bash
# Installs dependencies so `npm run lint` and the node tests work in Claude Code cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Skips scripts/install-ci.sh, which needs the Sites sandbox env; plain install reuses the container cache.
npm install
