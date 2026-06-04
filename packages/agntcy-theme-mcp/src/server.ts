/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AGNTCY Theme MCP server definition.
 *
 * Organized into two domains that share one server:
 *   • Token tools      — design tokens (VarsType), typography, palettes, gradients.
 *   • Component tools   — component catalog, props/API, themed snippets, token links.
 *
 * Replicating this for another theme (C1D, IoC, …) means pointing the build-time
 * generator at that theme's vars/palette/typography sources and changing the
 * MODE allow-list; the tool/resource surface stays identical.
 */

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  themeData,
  componentData,
  getMode,
  getComponent,
  tokensForComponent,
  MODE_IDS,
} from "./data.js";
import {
  getAllTokensShape,
  getTokenShape,
  getColorPaletteShape,
  listComponentsShape,
  getComponentShape,
  getComponentSnippetShape,
  getComponentThemeTokensShape,
} from "./schemas.js";
import { buildSnippet } from "./snippet.js";
import { logEvent } from "./logger.js";

type TextResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

/** Sanitized JSON tool result. Only the explicitly assembled fields are returned. */
function ok(payload: unknown): TextResult {
  return {
    content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
  };
}

function fail(message: string): TextResult {
  return {
    content: [{ type: "text", text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}

export function createServer(): McpServer {
  const server = new McpServer({
    name: "agntcy-theme-mcp",
    version: "0.1.0",
  });

  const modesSummary = Object.values(themeData.modes).map((m) => ({
    id: m.id,
    label: m.label,
    muiMode: m.muiMode,
    description: m.description,
  }));

  // ───────────────────────── Token tools ─────────────────────────

  server.registerTool(
    "list_modes",
    {
      title: "List AGNTCY theme modes",
      description:
        "List the available AGNTCY theme modes (agntcy-light, agntcy-dark) with their MUI mode and description.",
      inputSchema: {},
    },
    async () => {
      logEvent("tool", { tool: "list_modes" });
      return ok({ themeFamily: themeData.themeFamily, modes: modesSummary });
    },
  );

  server.registerTool(
    "get_all_tokens",
    {
      title: "Get all resolved tokens for a mode",
      description:
        "Return the full VarsType token map (final resolved values: hex/rgba, px, gradients, glows) for an AGNTCY mode, plus the resolved gradient set.",
      inputSchema: getAllTokensShape,
    },
    async ({ mode }) => {
      logEvent("tool", { tool: "get_all_tokens", mode });
      const m = getMode(mode);
      return ok({
        mode: m.id,
        label: m.label,
        muiMode: m.muiMode,
        tokenCount: Object.keys(m.vars).length,
        tokens: m.vars,
        gradients: m.gradients,
      });
    },
  );

  server.registerTool(
    "get_token",
    {
      title: "Get a single token value",
      description:
        "Return the resolved value of one token (by exact name) for an AGNTCY mode.",
      inputSchema: getTokenShape,
    },
    async ({ mode, token }) => {
      logEvent("tool", { tool: "get_token", mode, token });
      const m = getMode(mode);
      const value = m.vars[token];
      if (value === undefined) {
        return fail(`Token "${token}" is not defined for mode "${mode}".`);
      }
      return ok({ mode: m.id, token, value });
    },
  );

  server.registerTool(
    "get_typography",
    {
      title: "Get the typography ramp",
      description:
        "Return the AGNTCY typography ramp: font families, weights, and per-variant size/line-height/letter-spacing. Shared across light and dark.",
      inputSchema: {},
    },
    async () => {
      logEvent("tool", { tool: "get_typography" });
      return ok({
        themeFamily: themeData.themeFamily,
        typography: themeData.typography,
      });
    },
  );

  server.registerTool(
    "get_color_palette",
    {
      title: "Get color palette(s)",
      description:
        "Return the base color palettes (primitive ramps shared by AGNTCY light & dark). Optionally filter to a single palette by name.",
      inputSchema: getColorPaletteShape,
    },
    async ({ palette }) => {
      logEvent("tool", {
        tool: "get_color_palette",
        palette: palette ?? "(all)",
      });
      if (palette) {
        return ok({ palette, values: themeData.palettes[palette] });
      }
      return ok({
        palettes: themeData.palettes,
        brandColors: themeData.brandColors,
      });
    },
  );

  // ─────────────────────── Component tools ───────────────────────

  server.registerTool(
    "list_components",
    {
      title: "List Open UI Kit components",
      description:
        "List exported components with name, category (component | chart | mui-reexport) and a short description. Optionally filter by category.",
      inputSchema: listComponentsShape,
    },
    async ({ category }) => {
      logEvent("tool", {
        tool: "list_components",
        category: category ?? "(all)",
      });
      const items = componentData.components
        .filter((c) => !category || c.category === category)
        .map((c) => ({
          name: c.name,
          category: c.category,
          description: c.description,
          propsCount: c.props.length,
          hasFigmaExample: c.figmaExamples.length > 0,
        }));
      return ok({ count: items.length, components: items });
    },
  );

  server.registerTool(
    "get_component",
    {
      title: "Get component details",
      description:
        "Return a component's structured API: props (name, type, required, description), referenced enums, Figma Code Connect examples, story names, and the AGNTCY theme overrides (MUI slots + tokens) that style it.",
      inputSchema: getComponentShape,
    },
    async ({ name }) => {
      logEvent("tool", { tool: "get_component", name });
      const c = getComponent(name);
      return ok({
        name: c.name,
        category: c.category,
        source: c.source,
        description: c.description,
        propsType: c.propsType,
        props: c.props,
        enums: c.enums,
        figmaExamples: c.figmaExamples,
        stories: c.stories,
        themeOverrides: c.themeOverrides,
      });
    },
  );

  server.registerTool(
    "get_component_snippet",
    {
      title: "Get themed usage snippet",
      description:
        "Return a minimal TSX usage snippet for a component wrapped in ThemeProvider for the given AGNTCY mode. Uses a real Figma Code Connect example when available.",
      inputSchema: getComponentSnippetShape,
    },
    async ({ name, mode }) => {
      logEvent("tool", { tool: "get_component_snippet", name, mode });
      const c = getComponent(name);
      const m = getMode(mode);
      const snippet = buildSnippet(c, m);
      return ok({ name: c.name, ...snippet });
    },
  );

  server.registerTool(
    "get_component_theme_tokens",
    {
      title: "Get tokens/overrides applied to a component",
      description:
        "Return which AGNTCY theme tokens and MUI style-override slots apply to a component, linking tokens ↔ components.",
      inputSchema: getComponentThemeTokensShape,
    },
    async ({ name }) => {
      logEvent("tool", { tool: "get_component_theme_tokens", name });
      const c = getComponent(name);
      return ok({
        name: c.name,
        muiSlots: Object.keys(c.themeOverrides),
        themeOverrides: c.themeOverrides,
        tokensApplied: tokensForComponent(c),
      });
    },
  );

  // ───────────────────────── Resources ─────────────────────────

  server.registerResource(
    "modes",
    "agntcy://modes",
    {
      title: "AGNTCY theme modes",
      description: "List of AGNTCY theme modes.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({ modes: modesSummary }, null, 2),
        },
      ],
    }),
  );

  server.registerResource(
    "typography",
    "agntcy://typography",
    {
      title: "AGNTCY typography ramp",
      description: "Typography ramp shared by AGNTCY light & dark.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(themeData.typography, null, 2),
        },
      ],
    }),
  );

  server.registerResource(
    "palette",
    "agntcy://palette",
    {
      title: "AGNTCY color palettes",
      description: "Primitive color ramps shared by AGNTCY light & dark.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              palettes: themeData.palettes,
              brandColors: themeData.brandColors,
            },
            null,
            2,
          ),
        },
      ],
    }),
  );

  server.registerResource(
    "components",
    "agntcy://components",
    {
      title: "AGNTCY component catalog",
      description: "List of exported Open UI Kit components.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              count: componentData.componentCount,
              components: componentData.components.map((c) => ({
                name: c.name,
                category: c.category,
                description: c.description,
              })),
            },
            null,
            2,
          ),
        },
      ],
    }),
  );

  // Templated resource: resolved tokens per mode.
  server.registerResource(
    "tokens-by-mode",
    new ResourceTemplate("agntcy://tokens/{mode}", {
      list: async () => ({
        resources: MODE_IDS.map((id) => ({
          uri: `agntcy://tokens/${id}`,
          name: `tokens-${id}`,
          mimeType: "application/json",
        })),
      }),
    }),
    {
      title: "AGNTCY resolved tokens by mode",
      description: "Full resolved VarsType token map for a given AGNTCY mode.",
      mimeType: "application/json",
    },
    async (uri, variables) => {
      const mode = String(variables.mode);
      // Validate against the allow-list; reject anything else.
      if (!MODE_IDS.includes(mode)) {
        throw new Error(`Unknown mode: ${mode}`);
      }
      const m = getMode(mode);
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(
              { mode: m.id, tokens: m.vars, gradients: m.gradients },
              null,
              2,
            ),
          },
        ],
      };
    },
  );

  return server;
}
