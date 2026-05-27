#!/usr/bin/env bash
# =============================================================================
# Figma Code Connect — Link & Publish
#
# USAGE:
#   1. Get a Figma Personal Access Token:
#      figma.com/settings → Security → Personal access tokens
#      Scopes needed: File content (read), Code Connect (read+write)
#
#   2. Export it:
#      export FIGMA_ACCESS_TOKEN="figd_xxxxxxxxxxxx"
#
#   3. Run this script:
#      bash scripts/figma-connect.sh
# =============================================================================

set -e

FIGMA_FILE="https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag"

if [ -z "$FIGMA_ACCESS_TOKEN" ]; then
  echo "❌  FIGMA_ACCESS_TOKEN is not set."
  echo "    Get one at: figma.com/settings → Personal access tokens"
  echo "    Then run:  export FIGMA_ACCESS_TOKEN=figd_xxxxxxxxxxxx"
  exit 1
fi

echo "🔗  Step 1 — Mapping Figma components to code components..."
echo "    This will scan the Figma file and let you associate each"
echo "    Figma component with its .figma.tsx file."
echo ""

npx figma-connect create \
  --figma-file "$FIGMA_FILE" \
  --config figma.config.json

echo ""
echo "✅  Step 2 — Publishing Code Connect to Figma..."
echo "    After this, every component in the Figma file will show"
echo "    the linked code snippet in the Inspect panel."
echo ""

npx figma-connect publish \
  --config figma.config.json

echo ""
echo "🎉  Done! Open the Figma file and select any component to see"
echo "    the code snippet in the Dev Mode Inspect panel."
echo "    File: $FIGMA_FILE"
