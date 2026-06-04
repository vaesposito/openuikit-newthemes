/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type ComponentEntry,
  type TokenMode,
  tokensForComponent,
} from "./data.js";

/** Synthesize a placeholder value for a required prop based on its type text. */
function placeholderFor(prop: ComponentEntry["props"][number]): string {
  const t = prop.type.toLowerCase();
  if (t.includes("react.reactnode") || t.includes("string")) {
    return `"${prop.name}"`;
  }
  if (t.includes("boolean")) return "{true}";
  if (t.includes("number")) return "{0}";
  if (t.includes("[]") || t.startsWith("array")) return "{[]}";
  if (t.includes("=>") || t.includes("function") || t.startsWith("(")) {
    return "{() => {}}";
  }
  return "{/* … */}";
}

function synthesizeJsx(c: ComponentEntry): string {
  const required = c.props.filter((p) => p.required);
  if (required.length === 0) return `<${c.name} />`;
  const attrs = required.map((p) => `${p.name}=${placeholderFor(p)}`).join(" ");
  return `<${c.name} ${attrs} />`;
}

export interface SnippetResult {
  language: "tsx";
  mode: string;
  code: string;
  relevantTokens: string[];
  basedOnFigmaExample: boolean;
}

/**
 * Build a minimal, faithful usage snippet for a component wrapped in the
 * Open UI Kit `ThemeProvider` for the given AGNTCY mode. Prefers a real
 * Figma Code Connect example when one exists for the component.
 */
export function buildSnippet(
  c: ComponentEntry,
  mode: TokenMode,
): SnippetResult {
  const basedOnFigmaExample = c.figmaExamples.length > 0;
  const inner = basedOnFigmaExample ? c.figmaExamples[0] : synthesizeJsx(c);
  const indentedInner = inner
    .split("\n")
    .map((line) => `        ${line}`)
    .join("\n");

  const relevantTokens = tokensForComponent(c);

  const code = `import { ThemeProvider, ${c.name} } from "@open-ui-kit/core";

export function ${c.name}Example() {
  return (
    <ThemeProvider mode="${mode.muiMode}">
${indentedInner}
    </ThemeProvider>
  );
}`;

  return {
    language: "tsx",
    mode: mode.id,
    code,
    relevantTokens,
    basedOnFigmaExample,
  };
}
