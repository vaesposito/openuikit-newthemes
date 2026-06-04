/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* Local stdio verification client for the AGNTCY Theme MCP server. */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.resolve(__dirname, "../dist/index.js");

const transport = new StdioClientTransport({
  command: "node",
  args: [serverPath],
});
const client = new Client({ name: "verify", version: "0.0.0" });
await client.connect(transport);

const parse = (r) => JSON.parse(r.content[0].text);

const tools = await client.listTools();
console.log("TOOLS:", tools.tools.map((t) => t.name).join(", "));
const resources = await client.listResources();
console.log("RESOURCES:", resources.resources.map((r) => r.uri).join(", "));

const modes = parse(
  await client.callTool({ name: "list_modes", arguments: {} }),
);
console.log("\nlist_modes:", JSON.stringify(modes.modes));

const dark = parse(
  await client.callTool({
    name: "get_all_tokens",
    arguments: { mode: "agntcy-dark" },
  }),
);
console.log(
  "\nget_all_tokens(agntcy-dark): count=",
  dark.tokenCount,
  "baseBackgroundStrong=",
  dark.tokens.baseBackgroundStrong,
  "gradientBrand=",
  dark.gradients.gradientBrand,
);

const tok = parse(
  await client.callTool({
    name: "get_token",
    arguments: { mode: "agntcy-light", token: "brandOrange" },
  }),
);
console.log("\nget_token(light,brandOrange):", JSON.stringify(tok));

const typ = parse(
  await client.callTool({ name: "get_typography", arguments: {} }),
);
console.log("\nget_typography h1:", JSON.stringify(typ.typography.h1));

const comps = parse(
  await client.callTool({
    name: "list_components",
    arguments: { category: "chart" },
  }),
);
console.log(
  "\nlist_components(chart): count=",
  comps.count,
  "sample=",
  comps.components.slice(0, 4).map((c) => c.name),
);

const badge = parse(
  await client.callTool({
    name: "get_component",
    arguments: { name: "Badge" },
  }),
);
console.log(
  "\nget_component(Badge): props=",
  badge.props
    .map((p) => `${p.name}${p.required ? "" : "?"}:${p.type}`)
    .join(", "),
);
console.log("  enums=", JSON.stringify(badge.enums.BadgeType));

const snip = parse(
  await client.callTool({
    name: "get_component_snippet",
    arguments: { name: "Badge", mode: "agntcy-dark" },
  }),
);
console.log("\nget_component_snippet(Badge,dark):\n" + snip.code);
console.log("basedOnFigmaExample=", snip.basedOnFigmaExample);

const link = parse(
  await client.callTool({
    name: "get_component_theme_tokens",
    arguments: { name: "Button" },
  }),
);
console.log(
  "\nget_component_theme_tokens(Button): slots=",
  link.muiSlots,
  "tokens#=",
  link.tokensApplied.length,
);

// Negative test: invalid mode must be rejected by schema (SDK returns isError).
let negOk = false;
try {
  const bad = await client.callTool({
    name: "get_all_tokens",
    arguments: { mode: "nope" },
  });
  negOk = bad.isError === true;
  console.log(
    "\nNEGATIVE TEST (invalid mode):",
    negOk ? "OK rejected ->" : "FAILED accepted ->",
    bad.content[0].text.slice(0, 120),
  );
} catch (e) {
  negOk = true;
  console.log(
    "\nNEGATIVE TEST (invalid mode): OK threw ->",
    String(e.message).slice(0, 80),
  );
}

// Negative test: unknown component name.
const badComp = await client.callTool({
  name: "get_component",
  arguments: { name: "NotAComponent" },
});
console.log(
  "NEGATIVE TEST (invalid component):",
  badComp.isError ? "OK rejected" : "FAILED accepted",
);

// Resource read
const res = await client.readResource({ uri: "agntcy://tokens/agntcy-light" });
const resObj = JSON.parse(res.contents[0].text);
console.log(
  "\nresource agntcy://tokens/agntcy-light: borderRadiusLg=",
  resObj.tokens.borderRadiusLg,
);

await client.close();
console.log("\nALL CHECKS PASSED");
