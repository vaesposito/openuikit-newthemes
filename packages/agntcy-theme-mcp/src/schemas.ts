/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Strict input schemas for every tool.
 *
 * Security posture (per the repo MCP security rules): all inputs are treated
 * as untrusted. We use zod enums built from the build-time allow-lists, so
 * any mode / token / component / palette / category that is not part of the
 * AGNTCY data set is rejected before any handler logic runs. `.strict()` on
 * the wrapping objects rejects unknown properties.
 */

import { z } from "zod";
import {
  MODE_IDS,
  TOKEN_NAMES,
  COMPONENT_NAMES,
  PALETTE_NAMES,
  COMPONENT_CATEGORIES,
} from "./data.js";

export const modeSchema = z
  .enum(MODE_IDS)
  .describe("AGNTCY theme mode. One of: " + MODE_IDS.join(", "));

export const tokenSchema = z
  .enum(TOKEN_NAMES)
  .describe("Exact design-token name from the VarsType token set.");

export const componentSchema = z
  .enum(COMPONENT_NAMES)
  .describe("Exact exported component name from the Open UI Kit.");

export const paletteSchema = z
  .enum(PALETTE_NAMES)
  .describe("Color palette name (e.g. blue, grey, lightOrange).");

export const categorySchema = z
  .enum(COMPONENT_CATEGORIES)
  .describe("Component category filter.");

// Tool input shapes (ZodRawShape) consumed by McpServer.registerTool.
export const getAllTokensShape = { mode: modeSchema } as const;

export const getTokenShape = {
  mode: modeSchema,
  token: tokenSchema,
} as const;

export const getColorPaletteShape = {
  palette: paletteSchema.optional(),
} as const;

export const listComponentsShape = {
  category: categorySchema.optional(),
} as const;

export const getComponentShape = { name: componentSchema } as const;

export const getComponentSnippetShape = {
  name: componentSchema,
  mode: modeSchema,
} as const;

export const getComponentThemeTokensShape = {
  name: componentSchema,
} as const;
