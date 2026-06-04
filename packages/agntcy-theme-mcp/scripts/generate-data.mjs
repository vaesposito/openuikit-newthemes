/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Build-time data generator for the AGNTCY Theme MCP server.
 *
 * The Open UI Kit source is the single source of truth. This script:
 *   1. Resolves the AGNTCY light/dark design tokens (VarsType) to final values
 *      by bundling + evaluating the *pure* token modules with esbuild.
 *   2. Extracts the typography ramp from the theme source (literal AST eval).
 *   3. Builds a component catalog (names, props, figma examples, stories,
 *      theme overrides) by parsing the component sources with the TypeScript AST.
 *
 * Output is written to ./data/*.json and committed so the runtime server has
 * NO dependency on the design-system source or any heavy UI dependency.
 */

import { build } from "esbuild";
import ts from "typescript";
import { mkdir, readFile, writeFile, rm, readdir } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import os from "node:os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, "..");
const UIKIT_SRC = path.resolve(PKG_ROOT, "../open-ui-kit/src");
const DATA_DIR = path.resolve(PKG_ROOT, "data");

if (!existsSync(UIKIT_SRC)) {
  throw new Error(`Cannot find Open UI Kit source at ${UIKIT_SRC}`);
}

// ───────────────────────────────────────────────────────────────────────────
// 1. Resolve design tokens (vars + palettes + gradients) by evaluating the
//    pure token modules. These files only depend on the literal color-palette,
//    so the bundle is fully self-contained (no React / MUI).
// ───────────────────────────────────────────────────────────────────────────

async function evaluateTokenModules() {
  const entry = [
    `export { lightVars } from ${JSON.stringify(path.join(UIKIT_SRC, "theme/light/light-vars.ts"))};`,
    `export { darkVars } from ${JSON.stringify(path.join(UIKIT_SRC, "theme/dark/dark-vars.ts"))};`,
    `export { gradientsPalette } from ${JSON.stringify(path.join(UIKIT_SRC, "theme/gradients.ts"))};`,
    `export { OS_LIGHT_COLORS, brandColors } from ${JSON.stringify(path.join(UIKIT_SRC, "theme/color-palette.ts"))};`,
  ].join("\n");

  const tmpRoot = path.join(
    os.tmpdir(),
    `agntcy-mcp-${process.pid}-${Date.now()}`,
  );
  await mkdir(tmpRoot, { recursive: true });
  const outfile = path.join(tmpRoot, "tokens.mjs");

  await build({
    stdin: {
      contents: entry,
      resolveDir: UIKIT_SRC,
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node18",
    write: true,
    outfile,
    alias: { "@": UIKIT_SRC },
    logLevel: "silent",
  });

  const mod = await import(pathToFileURL(outfile).href);
  const result = {
    lightVars: mod.lightVars,
    darkVars: mod.darkVars,
    gradientsPalette: mod.gradientsPalette,
    palettes: mod.OS_LIGHT_COLORS,
    brandColors: mod.brandColors,
  };
  await rm(tmpRoot, { recursive: true, force: true });
  return result;
}

// ───────────────────────────────────────────────────────────────────────────
// Minimal literal evaluator for plain object/array/string/number/bool nodes.
// Used to read the `typography` object without importing MUI / React.
// ───────────────────────────────────────────────────────────────────────────

function evalLiteral(node) {
  if (ts.isObjectLiteralExpression(node)) {
    const obj = {};
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      let key;
      if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
        key = prop.name.text;
      } else if (ts.isNumericLiteral(prop.name)) {
        key = prop.name.text;
      } else {
        continue;
      }
      obj[key] = evalLiteral(prop.initializer);
    }
    return obj;
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((el) => evalLiteral(el));
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isNumericLiteral(node)) {
    return Number(node.text);
  }
  if (
    ts.isPrefixUnaryExpression(node) &&
    node.operator === ts.SyntaxKind.MinusToken
  ) {
    const v = evalLiteral(node.operand);
    return typeof v === "number" ? -v : v;
  }
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  // Fallback: keep raw text so we never silently lose information.
  return node.getText();
}

function parseSource(filePath, code) {
  return ts.createSourceFile(
    filePath,
    code,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

async function extractTypography() {
  const file = path.join(UIKIT_SRC, "theme/common.tsx");
  const code = await readFile(file, "utf8");
  const sf = parseSource(file, code);
  let typography = null;
  const visit = (node) => {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === "typography" &&
          decl.initializer &&
          ts.isObjectLiteralExpression(decl.initializer)
        ) {
          typography = evalLiteral(decl.initializer);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (!typography) throw new Error("Could not extract typography object");
  return typography;
}

// ───────────────────────────────────────────────────────────────────────────
// 2. Component catalog extraction
// ───────────────────────────────────────────────────────────────────────────

function getJsDoc(node) {
  const docs = ts.getJSDocCommentsAndTags(node);
  for (const d of docs) {
    if (ts.isJSDoc(d)) {
      const comment = d.comment;
      if (typeof comment === "string") return comment.trim();
      if (Array.isArray(comment)) {
        return comment
          .map((c) => c.text)
          .join("")
          .trim();
      }
    }
  }
  return "";
}

// Parse one directory of component sources into an index of declarations.
async function indexDirectory(dir) {
  const files = await collectSourceFiles(dir);
  const types = {}; // name -> { kind, members?, union?, jsDoc, file }
  const components = {}; // name -> { jsDoc, file }
  const figmaByComponent = {}; // name -> [exampleSnippet]
  const storiesByFile = []; // story export names

  for (const file of files) {
    const code = await readFile(file, "utf8");
    const sf = parseSource(file, code);
    const rel = path.relative(UIKIT_SRC, file);

    const visit = (node) => {
      // interface XxxProps {...}
      if (ts.isInterfaceDeclaration(node)) {
        types[node.name.text] = {
          kind: "interface",
          members: extractMembers(node.members),
          jsDoc: getJsDoc(node),
          file: rel,
        };
      }
      // type Xxx = ...
      else if (ts.isTypeAliasDeclaration(node)) {
        const entry = { kind: "type", jsDoc: getJsDoc(node), file: rel };
        if (ts.isUnionTypeNode(node.type)) {
          entry.union = node.type.types.map((t) =>
            ts.isLiteralTypeNode(t)
              ? t.literal.getText().replace(/['"]/g, "")
              : t.getText(),
          );
        } else if (ts.isTypeLiteralNode(node.type)) {
          entry.members = extractMembers(node.type.members);
        } else {
          entry.alias = node.type.getText();
        }
        types[node.name.text] = entry;
      }
      // const X = (...) => / function X
      else if (ts.isVariableStatement(node)) {
        for (const decl of node.declarationList.declarations) {
          if (
            ts.isIdentifier(decl.name) &&
            decl.initializer &&
            (ts.isArrowFunction(decl.initializer) ||
              ts.isFunctionExpression(decl.initializer) ||
              isForwardRefCall(decl.initializer))
          ) {
            const name = decl.name.text;
            if (/^[A-Z]/.test(name) && !components[name]) {
              components[name] = {
                jsDoc: getJsDoc(node) || getJsDoc(decl),
                file: rel,
              };
            }
          }
        }
      } else if (
        ts.isFunctionDeclaration(node) &&
        node.name &&
        /^[A-Z]/.test(node.name.text)
      ) {
        if (!components[node.name.text]) {
          components[node.name.text] = { jsDoc: getJsDoc(node), file: rel };
        }
      }

      // figma.connect(Component, url, { example: () => <JSX/> })
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "connect"
      ) {
        const compArg = node.arguments[0];
        const optsArg = node.arguments[2];
        if (
          compArg &&
          ts.isIdentifier(compArg) &&
          optsArg &&
          ts.isObjectLiteralExpression(optsArg)
        ) {
          const compName = compArg.text;
          for (const p of optsArg.properties) {
            if (
              ts.isPropertyAssignment(p) &&
              ts.isIdentifier(p.name) &&
              p.name.text === "example" &&
              (ts.isArrowFunction(p.initializer) ||
                ts.isFunctionExpression(p.initializer))
            ) {
              const body = p.initializer.body;
              const snippet = (
                ts.isBlock(body) ? body.getText() : body.getText()
              ).trim();
              (figmaByComponent[compName] ||= []).push(snippet);
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    };
    visit(sf);

    if (file.endsWith(".stories.tsx") || file.endsWith(".stories.ts")) {
      sf.forEachChild((node) => {
        if (ts.isVariableStatement(node) && hasExportModifier(node)) {
          for (const decl of node.declarationList.declarations) {
            if (ts.isIdentifier(decl.name) && decl.name.text !== "default") {
              storiesByFile.push(decl.name.text);
            }
          }
        }
      });
    }
  }

  return { types, components, figmaByComponent, stories: storiesByFile };
}

function isForwardRefCall(node) {
  return (
    ts.isCallExpression(node) &&
    ((ts.isIdentifier(node.expression) &&
      node.expression.text === "forwardRef") ||
      (ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "forwardRef") ||
      (ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === "memo"))
  );
}

function hasExportModifier(node) {
  return !!node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}

function extractMembers(members) {
  const out = [];
  for (const m of members) {
    if (!ts.isPropertySignature(m) || !m.name) continue;
    const name =
      ts.isIdentifier(m.name) || ts.isStringLiteral(m.name)
        ? m.name.text
        : m.name.getText();
    out.push({
      name,
      type: m.type ? normalizeType(m.type.getText()) : "unknown",
      required: !m.questionToken,
      description: getJsDoc(m),
    });
  }
  return out;
}

function normalizeType(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function collectSourceFiles(dir) {
  const out = [];
  async function walk(d) {
    let entries;
    try {
      entries = await readdir(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        await walk(full);
      } else if (
        /\.(ts|tsx)$/.test(e.name) &&
        !/\.(test|spec)\.(ts|tsx)$/.test(e.name)
      ) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

// Read an index.ts and return { stars: [subdir], named: [{name, typeOnly}] }
async function readBarrel(indexFile) {
  const code = await readFile(indexFile, "utf8");
  const sf = parseSource(indexFile, code);
  const stars = [];
  const named = [];
  sf.forEachChild((node) => {
    if (!ts.isExportDeclaration(node)) return;
    const declTypeOnly = node.isTypeOnly;
    if (
      !node.exportClause &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      stars.push(node.moduleSpecifier.text);
    } else if (node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const spec of node.exportClause.elements) {
        named.push({
          name: spec.name.text,
          typeOnly: declTypeOnly || spec.isTypeOnly,
        });
      }
    }
  });
  return { stars, named };
}

// Resolve a module path (no extension) to an actual source file.
function resolveModuleFile(modulePath) {
  const candidates = [
    `${modulePath}.ts`,
    `${modulePath}.tsx`,
    path.join(modulePath, "index.ts"),
    path.join(modulePath, "index.tsx"),
  ];
  return candidates.find((c) => existsSync(c)) ?? null;
}

// Collect value (non-type) export names from a module, following named
// exports, `export const/function`, and one+ levels of `export * from`.
async function collectExportedValueNames(modulePath, depth, seen = new Set()) {
  if (depth > 4) return new Set();
  const file = resolveModuleFile(modulePath);
  if (!file || seen.has(file)) return new Set();
  seen.add(file);

  const code = await readFile(file, "utf8");
  const sf = parseSource(file, code);
  const names = new Set();
  const dir = path.dirname(file);

  for (const node of sf.statements) {
    if (ts.isExportDeclaration(node)) {
      if (node.isTypeOnly) continue;
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const spec of node.exportClause.elements) {
          if (!spec.isTypeOnly) names.add(spec.name.text);
        }
      } else if (
        !node.exportClause &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const child = path.resolve(dir, node.moduleSpecifier.text);
        for (const n of await collectExportedValueNames(
          child,
          depth + 1,
          seen,
        )) {
          names.add(n);
        }
      }
    } else if (hasExportModifier(node)) {
      if (ts.isVariableStatement(node)) {
        for (const decl of node.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) names.add(decl.name.text);
        }
      } else if (
        (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) &&
        node.name
      ) {
        names.add(node.name.text);
      }
    }
  }
  return names;
}

async function buildComponentCatalog(themeData) {
  const componentsIndex = path.join(UIKIT_SRC, "components/index.ts");
  const chartsIndex = path.join(UIKIT_SRC, "charts/index.ts");

  const muiOverrides = await extractMuiOverrides();
  const muiSlotByName = buildMuiSlotMap();

  const catalog = [];

  const groups = [
    {
      indexFile: componentsIndex,
      baseDir: path.join(UIKIT_SRC, "components"),
      category: "component",
    },
    {
      indexFile: chartsIndex,
      baseDir: path.join(UIKIT_SRC, "charts"),
      category: "chart",
    },
  ];

  for (const group of groups) {
    const barrel = await readBarrel(group.indexFile);

    // MUI re-exports (from components/index.ts only)
    for (const n of barrel.named) {
      if (n.typeOnly) continue;
      const slot = `Mui${n.name}`;
      catalog.push({
        name: n.name,
        category: "mui-reexport",
        source: "@mui/material",
        description: `Material UI \`${n.name}\` re-exported by Open UI Kit. Styled by the AGNTCY theme via component overrides when applicable.`,
        props: [],
        propsType: null,
        enums: {},
        figmaExamples: [],
        stories: [],
        themeOverrides: muiOverrides[slot]
          ? { [slot]: muiOverrides[slot] }
          : {},
      });
    }

    for (const star of barrel.stars) {
      // star like "./accordion" or "./bar-chart/bar-chart"
      const targetDir = resolveStarDir(group.baseDir, star);
      if (!targetDir) continue;
      const idx = await indexDirectory(targetDir.dir);

      // Exports are the source of truth: collect the value names actually
      // exported from this entry module (following named exports + `export *`).
      const entryModule = path.join(group.baseDir, star.replace(/^\.\//, ""));
      const exportedNames = await collectExportedValueNames(entryModule, 0);

      // Keep only PascalCase names that resolve to a component or have a *Props.
      const exportedValueNames = new Set();
      for (const name of exportedNames) {
        if (!/^[A-Z]/.test(name)) continue;
        if (idx.components[name] || idx.types[`${name}Props`]) {
          exportedValueNames.add(name);
        }
      }

      for (const compName of exportedValueNames) {
        if (!/^[A-Z]/.test(compName)) continue;
        if (catalog.find((c) => c.name === compName)) continue;
        const propsTypeName = `${compName}Props`;
        const propsType = idx.types[propsTypeName];
        const compInfo = idx.components[compName];

        // Resolve enum-like referenced types used by props.
        const enums = {};
        if (propsType?.members) {
          for (const mem of propsType.members) {
            for (const [tName, tDef] of Object.entries(idx.types)) {
              if (tDef.union && new RegExp(`\\b${tName}\\b`).test(mem.type)) {
                enums[tName] = tDef.union;
              }
            }
          }
        }

        const description =
          compInfo?.jsDoc ||
          propsType?.jsDoc ||
          `${compName} component from the Open UI Kit (AGNTCY theme).`;

        const slot = muiSlotByName[compName];
        const themeOverrides =
          slot && muiOverrides[slot] ? { [slot]: muiOverrides[slot] } : {};

        catalog.push({
          name: compName,
          category: group.category,
          source: compInfo?.file ?? targetDir.dir.replace(`${UIKIT_SRC}/`, ""),
          description,
          propsType: propsType ? propsTypeName : null,
          props: propsType?.members ?? [],
          enums,
          figmaExamples: (idx.figmaByComponent[compName] ?? []).slice(0, 6),
          stories: Array.from(new Set(idx.stories)).slice(0, 20),
          themeOverrides,
        });
      }
    }
  }

  catalog.sort((a, b) => a.name.localeCompare(b.name));
  return {
    catalog,
    muiOverrides,
    tokenCount: Object.keys(themeData.lightVars).length,
  };
}

function resolveStarDir(baseDir, star) {
  // star may be "./accordion" (dir) or "./bar-chart/bar-chart" (file)
  const cleaned = star.replace(/^\.\//, "");
  const asDir = path.join(baseDir, cleaned);
  if (existsSync(asDir) && isDir(asDir)) return { dir: asDir };
  // file-style: take its parent directory
  const parent = path.dirname(path.join(baseDir, cleaned));
  if (existsSync(parent) && isDir(parent)) return { dir: parent };
  return null;
}

function isDir(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

// Map our friendly component names to MUI theme slot keys (best effort).
function buildMuiSlotMap() {
  return {
    Button: "MuiButton",
    IconButton: "MuiIconButton",
    Card: "MuiCard",
    Checkbox: "MuiCheckbox",
    Radio: "MuiRadio",
    Dialog: "MuiDialog",
    Divider: "MuiDivider",
    List: "MuiList",
    Menu: "MuiMenu",
    Tabs: "MuiTabs",
    Tab: "MuiTab",
    Tooltip: "MuiTooltip",
    Avatar: "MuiAvatar",
    AvatarGroup: "MuiAvatarGroup",
    Accordion: "MuiAccordion",
    Skeleton: "MuiSkeleton",
    Toast: "MuiSnackbar",
    Spinner: "MuiCircularProgress",
  };
}

// Parse theme/mui/*.tsx files: top-level Mui* slots + theme tokens referenced.
async function extractMuiOverrides() {
  const muiDir = path.join(UIKIT_SRC, "theme/mui");
  const files = (await readdir(muiDir)).filter(
    (f) => /\.tsx?$/.test(f) && f !== "index.ts",
  );
  const overrides = {};
  for (const f of files) {
    const file = path.join(muiDir, f);
    const code = await readFile(file, "utf8");
    const rel = path.relative(UIKIT_SRC, file);
    const tokens = Array.from(
      code.matchAll(/theme\.palette\.vars\.([A-Za-z0-9_]+)/g),
    ).map((m) => m[1]);
    const uniqueTokens = Array.from(new Set(tokens));
    const sf = parseSource(file, code);
    const slots = new Set();
    const visit = (node) => {
      // returned object literal keys that look like MuiXxx
      if (
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name))
      ) {
        const key = node.name.text;
        if (/^Mui[A-Z]/.test(key)) slots.add(key);
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
    for (const slot of slots) {
      overrides[slot] = {
        sourceFile: rel,
        tokensUsed: uniqueTokens,
      };
    }
  }
  return overrides;
}

// ───────────────────────────────────────────────────────────────────────────
// Assemble + write
// ───────────────────────────────────────────────────────────────────────────

async function main() {
  console.error("[generate] evaluating token modules…");
  const tokens = await evaluateTokenModules();
  console.error("[generate] extracting typography…");
  const typography = await extractTypography();

  const modes = {
    "agntcy-light": {
      id: "agntcy-light",
      label: "AGNTCY Light",
      muiMode: "light",
      description: "Open UI Kit default light theme (AGNTCY brand).",
      vars: tokens.lightVars,
      gradients: {
        gradientPrimary: tokens.lightVars.gradientPrimary,
        gradientSecondary: tokens.lightVars.gradientSecondary,
        gradientNegative: tokens.lightVars.gradientNegative,
        gradientBrand: tokens.lightVars.gradientBrand,
        gradientPage: tokens.lightVars.gradientPage ?? null,
        illustrations: tokens.gradientsPalette.illustrations,
        backgroundForMode: tokens.gradientsPalette.background.light,
      },
    },
    "agntcy-dark": {
      id: "agntcy-dark",
      label: "AGNTCY Dark",
      muiMode: "dark",
      description: "Open UI Kit default dark theme (AGNTCY brand).",
      vars: tokens.darkVars,
      gradients: {
        gradientPrimary: tokens.darkVars.gradientPrimary,
        gradientSecondary: tokens.darkVars.gradientSecondary,
        gradientNegative: tokens.darkVars.gradientNegative,
        gradientBrand: tokens.darkVars.gradientBrand,
        gradientPage: tokens.darkVars.gradientPage ?? null,
        illustrations: tokens.gradientsPalette.illustrations,
        backgroundForMode: tokens.gradientsPalette.background.dark,
      },
    },
  };

  const themeData = {
    generatedAt: new Date().toISOString(),
    source: "packages/open-ui-kit/src (default light + dark = AGNTCY)",
    themeFamily: "AGNTCY",
    tokenNames: Object.keys(tokens.lightVars),
    typography,
    palettes: tokens.palettes,
    brandColors: tokens.brandColors,
    modes,
    lightVars: tokens.lightVars,
    darkVars: tokens.darkVars,
    gradientsPalette: tokens.gradientsPalette,
  };

  console.error("[generate] building component catalog…");
  const { catalog, muiOverrides } = await buildComponentCatalog(themeData);

  const componentData = {
    generatedAt: new Date().toISOString(),
    source: "packages/open-ui-kit/src/{components,charts}",
    themeFamily: "AGNTCY",
    componentCount: catalog.length,
    components: catalog,
    muiOverrides,
  };

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(
    path.join(DATA_DIR, "theme-data.json"),
    JSON.stringify(themeData, null, 2) + "\n",
  );
  await writeFile(
    path.join(DATA_DIR, "component-catalog.json"),
    JSON.stringify(componentData, null, 2) + "\n",
  );

  console.error(
    `[generate] done: ${themeData.tokenNames.length} tokens, ${catalog.length} components → ${path.relative(PKG_ROOT, DATA_DIR)}/`,
  );
}

main().catch((err) => {
  console.error("[generate] FAILED:", err);
  process.exit(1);
});
