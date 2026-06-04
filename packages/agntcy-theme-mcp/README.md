# AGNTCY Theme MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that exposes the **AGNTCY** design tokens **and** components from the [Open UI Kit](https://github.com/outshift-open/open-ui-kit) design system to AI tools and agents.

> **Scope (current):** AGNTCY only. In the Open UI Kit, the **default `light` and `dark` themes are the AGNTCY Light / Dark modes** (confirmed in `playground/vite-ts/src/component-docs.tsx`, where `light` → `"AGNTCY light"` and `dark` → `"AGNTCY dark"`). This server surfaces those two modes as `agntcy-light` and `agntcy-dark`. Other themes (C1D = `ioc*`, IoC = `ioc-next*`, Glass) are intentionally **not** exposed yet — see [Replicating per theme](#replicating-for-another-theme).

## What it exposes

The server is organized into two domains that share one process:

### Token tools (design tokens)
| Tool | Input | Returns |
| --- | --- | --- |
| `list_modes` | – | AGNTCY modes (`agntcy-light`, `agntcy-dark`) |
| `get_all_tokens` | `mode` | Full `VarsType` token map (334 tokens) with **resolved** values + resolved gradients |
| `get_token` | `mode`, `token` | A single resolved token value |
| `get_typography` | – | Typography ramp (families, weights, per-variant size/line-height/letter-spacing) |
| `get_color_palette` | `palette?` | Primitive color ramps (+ brand colors); optionally one palette |

### Component tools
| Tool | Input | Returns |
| --- | --- | --- |
| `list_components` | `category?` | Component names + category (`component` / `chart` / `mui-reexport`) + short description |
| `get_component` | `name` | Structured API: props (name/type/required/description), referenced enums, Figma Code Connect examples, story names, and the AGNTCY theme overrides (MUI slots + tokens) that style it |
| `get_component_snippet` | `name`, `mode` | Minimal **themed** TSX snippet wrapping the component in `ThemeProvider mode="…"` (uses a real Figma example when available) |
| `get_component_theme_tokens` | `name` | Which AGNTCY tokens + MUI style-override slots apply to a component (tokens ↔ components link) |

### Resources
- `agntcy://modes` — mode list
- `agntcy://typography` — typography ramp
- `agntcy://palette` — color palettes + brand colors
- `agntcy://components` — component catalog
- `agntcy://tokens/{mode}` — full resolved token map for a mode (templated; `agntcy-light` / `agntcy-dark`)

## How the data stays in sync with the code

The Open UI Kit source is the **single source of truth**. A build-time generator (`scripts/generate-data.mjs`) produces `data/theme-data.json` and `data/component-catalog.json`:

- **Tokens** — the *pure* token modules (`theme/light/light-vars.ts`, `theme/dark/dark-vars.ts`, `theme/color-palette.ts`, `theme/gradients.ts`) are bundled with esbuild and **evaluated**, so palette references resolve to final hex/rgba, `px` shape values, and fully-expanded gradient strings. No hand-copied values.
- **Typography** — read from `theme/common.tsx` via a literal AST evaluation (no MUI/React imported).
- **Components** — `src/components/index.ts` and `src/charts/index.ts` exports are the source of truth for the catalog. Props/enums are parsed from each component's TypeScript via the compiler AST; Figma examples come from `*.figma.tsx` Code Connect files; theme overrides + their `theme.palette.vars.*` token usage come from `theme/mui/*.tsx`.

`yarn build` runs `generate` first (`prebuild`), so the data is regenerated on every build. The compiled server reads only these local JSON files — it has **no runtime dependency** on the design-system source or any UI library.

## Install & build

```bash
# from the monorepo root
yarn install

# build this package (regenerates data, then compiles TS)
yarn workspace @open-ui-kit/agntcy-theme-mcp build
```

The executable is `dist/index.js` (bin name: `agntcy-theme-mcp`).

## Run

It speaks MCP over **STDIO** (a local, pipe-based transport — no network, no ports):

```bash
node packages/agntcy-theme-mcp/dist/index.js
```

### Verify locally

A small stdio client exercises every tool:

```bash
yarn workspace @open-ui-kit/agntcy-theme-mcp build
node packages/agntcy-theme-mcp/scripts/verify.mjs
```

Or use the MCP Inspector:

```bash
yarn workspace @open-ui-kit/agntcy-theme-mcp inspect
```

## Add to an MCP client config

Use the **absolute path** to the built `dist/index.js`.

**Cursor** (`~/.cursor/mcp.json`) or **Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "agntcy-theme": {
      "command": "node",
      "args": ["/absolute/path/to/open-ui-kit/packages/agntcy-theme-mcp/dist/index.js"]
    }
  }
}
```

## Examples (input → output)

**`get_token`**
```jsonc
// input
{ "mode": "agntcy-light", "token": "brandOrange" }
// output
{ "mode": "agntcy-light", "token": "brandOrange", "value": "#fbaf45" }
```

**`get_all_tokens`** (excerpt)
```jsonc
// input
{ "mode": "agntcy-dark" }
// output
{
  "mode": "agntcy-dark", "label": "AGNTCY Dark", "muiMode": "dark",
  "tokenCount": 334,
  "tokens": { "baseBackgroundStrong": "#00142b", "borderRadiusSm": "4px", "...": "..." },
  "gradients": { "gradientBrand": "linear-gradient(135deg, #0063c2 0%, #ffbb61 100%)", "...": "..." }
}
```

**`get_component`** (excerpt)
```jsonc
// input
{ "name": "Badge" }
// output
{
  "name": "Badge", "category": "component", "propsType": "BadgeProps",
  "props": [
    { "name": "type", "type": "BadgeType", "required": false, "description": "" },
    { "name": "content", "type": "React.ReactNode", "required": true, "description": "" }
  ],
  "enums": { "BadgeType": ["default","excellent","neutral","error","warning","info","success","inactive","moderate","severe"] },
  "figmaExamples": ["<Badge type=\"default\" content=\"Label\" />"],
  "themeOverrides": {}
}
```

**`get_component_snippet`**
```jsonc
// input
{ "name": "Badge", "mode": "agntcy-dark" }
// output.code
import { ThemeProvider, Badge } from "@open-ui-kit/core";

export function BadgeExample() {
  return (
    <ThemeProvider mode="dark">
        <Badge type="default" content="Label" />
    </ThemeProvider>
  );
}
```

**`get_component_theme_tokens`**
```jsonc
// input
{ "name": "Button" }
// output (excerpt)
{
  "name": "Button",
  "muiSlots": ["MuiButton"],
  "themeOverrides": { "MuiButton": { "sourceFile": "theme/mui/button.tsx", "tokensUsed": ["interactivePrimaryDefaultDefault", "..."] } },
  "tokensApplied": ["baseTextInverse", "borderRadiusSm", "interactivePrimaryDefaultDefault", "..."]
}
```

## Security

This server follows the repo's MCP security rules:

- **STDIO transport** — local, pipe-based; no network exposure / DNS-rebinding surface.
- **No network calls, no secrets, least privilege** — at runtime it only reads its own bundled `data/*.json` once at startup.
- **Strict input validation (zod)** — every tool input is a `zod` enum built from build-time **allow-lists**: mode names, the 334 token names, palette names, the exported component names, and categories. Unknown modes/tokens/components/properties are rejected before any handler runs (MCP error `-32602`). The templated token resource also re-checks the mode against the allow-list.
- **Sanitized outputs** — handlers return only the explicitly assembled fields for the request, never raw internal structures.
- **Auditable logging** — tool name + (allow-listed, non-sensitive) params are logged to **STDERR** as JSON (STDOUT is reserved for the MCP protocol stream). No sensitive data is handled or logged.

## Replicating for another theme

The server is intentionally theme-agnostic in shape. To add a per-theme server (e.g. **C1D** = `ioc` / `ioc-light`, **IoC** = `ioc-next` / `ioc-next-light`):

1. Copy this package to `packages/<theme>-theme-mcp/`.
2. In `scripts/generate-data.mjs`, point the token evaluation at that theme's `*-vars.ts` / `*-color-palette.ts` (and typography if the theme overrides it, e.g. `ioc-next-typography.ts`), and rename the two modes (e.g. `c1d-light`, `c1d-dark`).
3. Rebuild. The tool/resource surface, validation, and security posture stay identical — only the underlying data and the mode allow-list change.

## Assumptions

- **"AGNTCY themes" = the default `light` + `dark` themes** (the AGNTCY Light/Dark modes), per the playground docs labels.
- The server exposes **design tokens and components** (props/API, themed snippets, and token↔component links) — it does not render components or execute design-system code at runtime.
- Generated `data/*.json` is committed for reviewability and so the server runs without the design-system source present; it is regenerated on every build to prevent drift.

## License

Apache-2.0
