/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Loads the generated, read-only theme + component data and exposes typed
 * accessors and allow-lists. All values are produced at build time from the
 * Open UI Kit source (see scripts/generate-data.mjs), so the runtime server
 * has no dependency on the design-system code and performs no I/O beyond
 * reading these local JSON files once at startup.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
// Compiled file lives in dist/, data lives in ../data relative to package root.
const DATA_DIR = path.resolve(here, "..", "data");

function loadJson<T>(file: string): T {
  const full = path.join(DATA_DIR, file);
  return JSON.parse(readFileSync(full, "utf8")) as T;
}

export interface TokenMode {
  id: string;
  label: string;
  muiMode: "light" | "dark";
  description: string;
  vars: Record<string, string>;
  gradients: Record<string, unknown>;
}

export interface ThemeData {
  generatedAt: string;
  source: string;
  themeFamily: string;
  tokenNames: string[];
  typography: Record<string, unknown>;
  palettes: Record<string, Record<string, string>>;
  brandColors: Record<string, string>;
  modes: Record<string, TokenMode>;
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ComponentEntry {
  name: string;
  category: "component" | "chart" | "mui-reexport";
  source: string;
  description: string;
  propsType: string | null;
  props: ComponentProp[];
  enums: Record<string, string[]>;
  figmaExamples: string[];
  stories: string[];
  themeOverrides: Record<string, { sourceFile: string; tokensUsed: string[] }>;
}

export interface ComponentData {
  generatedAt: string;
  source: string;
  themeFamily: string;
  componentCount: number;
  components: ComponentEntry[];
  muiOverrides: Record<string, { sourceFile: string; tokensUsed: string[] }>;
}

export const themeData: ThemeData = loadJson<ThemeData>("theme-data.json");
export const componentData: ComponentData = loadJson<ComponentData>(
  "component-catalog.json",
);

// ── Allow-lists (single source of truth for input validation) ──────────────

export const MODE_IDS = Object.keys(themeData.modes) as [string, ...string[]];
export const TOKEN_NAMES = themeData.tokenNames as [string, ...string[]];
export const PALETTE_NAMES = Object.keys(themeData.palettes) as [
  string,
  ...string[],
];
export const COMPONENT_NAMES = componentData.components.map((c) => c.name) as [
  string,
  ...string[],
];
export const COMPONENT_CATEGORIES = [
  "component",
  "chart",
  "mui-reexport",
] as const;

const componentByName = new Map(
  componentData.components.map((c) => [c.name, c]),
);

export function getMode(mode: string): TokenMode {
  const m = themeData.modes[mode];
  if (!m) throw new Error(`Unknown mode: ${mode}`);
  return m;
}

export function getComponent(name: string): ComponentEntry {
  const c = componentByName.get(name);
  if (!c) throw new Error(`Unknown component: ${name}`);
  return c;
}

/** All theme tokens referenced by a component's MUI style overrides. */
export function tokensForComponent(c: ComponentEntry): string[] {
  const set = new Set<string>();
  for (const slot of Object.values(c.themeOverrides)) {
    for (const t of slot.tokensUsed) set.add(t);
  }
  return Array.from(set).sort();
}
