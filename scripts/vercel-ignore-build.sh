#!/usr/bin/env bash
set -euo pipefail

branch="${VERCEL_GIT_COMMIT_REF:-}"

# Production must never be skipped by this budget gate.
if [[ "$branch" == "main" ]]; then
  exit 1
fi

case "$branch" in
  feature/jarvis-founder-portal-v1)
    # The Founder portal is an operational read-model surface. It must not lag
    # behind its own branch because a commit message omitted a preview tag.
    # Every commit on this dedicated branch is therefore build-eligible.
    exit 1
    ;;
  migration/*|security/*|ops/*)
    if git log -1 --pretty=%B | grep -Fq '[vercel-preview]'; then
      exit 1
    fi
    exit 0
    ;;
  *)
    # Preserve normal Vercel Git behavior for unrelated branches.
    exit 1
    ;;
esac
