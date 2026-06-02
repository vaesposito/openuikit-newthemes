/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// IoC (OXP / Outshift) Theme Color Palette — light
// Clean blue-white canvas with the OXP cyan accent.
// Anchored on Surface Light tokens (#FBFCFE → #C8D5F5).

// ─── Surface (solid light, subtle blue tint) ─────────────────────────────────
export const iocNextLightSurface50 = "#FBFCFE";
export const iocNextLightSurface100 = "#F2F6FD";
export const iocNextLightSurface200 = "#EAF1FC";
export const iocNextLightSurface300 = "#E3EAFA";
export const iocNextLightSurface400 = "#DEE6F9";
export const iocNextLightSurface500 = "#C8D5F5";

export const iocNextLightSurfacePalette = {
  50: iocNextLightSurface50,
  100: iocNextLightSurface100,
  200: iocNextLightSurface200,
  300: iocNextLightSurface300,
  400: iocNextLightSurface400,
  500: iocNextLightSurface500,
};

// ─── Border ──────────────────────────────────────────────────────────────────
export const iocNextLightBorder100 = "rgba(15, 32, 64, 0.06)";
export const iocNextLightBorder200 = "rgba(15, 32, 64, 0.09)";
export const iocNextLightBorder300 = "rgba(15, 32, 64, 0.12)";
export const iocNextLightBorder400 = "rgba(15, 32, 64, 0.18)";
export const iocNextLightBorder500 = "rgba(15, 32, 64, 0.24)";

export const iocNextLightBorderPalette = {
  100: iocNextLightBorder100,
  200: iocNextLightBorder200,
  300: iocNextLightBorder300,
  400: iocNextLightBorder400,
  500: iocNextLightBorder500,
};

// ─── Text (dark for legibility on light) ─────────────────────────────────────
export const iocNextLightTextPrimary = "#23282E"; // base/text/default (light)
export const iocNextLightTextSecondary = "rgba(35, 40, 46, 0.65)";
export const iocNextLightTextTertiary = "rgba(35, 40, 46, 0.45)";
export const iocNextLightTextDisabled = "rgba(35, 40, 46, 0.30)";

// ─── Page background ──────────────────────────────────────────────────────────
// Light adaptation of the OXP "App Page" bottom bloom (Figma node 4320:37117).
// The reference is dark-only; here the same blue→cyan→magenta→orange bloom is
// echoed at much lower alpha so the light theme stays bright and frosted while
// staying coherent with the dark page gradient.
export const iocNextLightPageBackground = `
  radial-gradient(ellipse 60% 40% at 50% 115%, rgba(255, 144, 0, 0.10) 0%, rgba(255, 144, 0, 0) 58%),
  radial-gradient(ellipse 85% 52% at 50% 110%, rgba(255, 0, 127, 0.08) 0%, rgba(255, 0, 127, 0) 62%),
  radial-gradient(ellipse 120% 68% at 46% 104%, rgba(10, 102, 255, 0.10) 0%, rgba(2, 200, 255, 0.05) 45%, transparent 72%),
  linear-gradient(160deg, #EFF3FC 0%, #F6F9FF 50%, #FFFFFF 100%)
`;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const iocNextLightShadowSm =
  "0 1px 4px rgba(15, 32, 64, 0.08), 0 2px 8px rgba(15, 32, 64, 0.06)";
export const iocNextLightShadowMd =
  "0 2px 8px rgba(15, 32, 64, 0.10), 0 4px 16px rgba(15, 32, 64, 0.08)";
export const iocNextLightShadowLg =
  "0 4px 16px rgba(15, 32, 64, 0.12), 0 8px 32px rgba(15, 32, 64, 0.10)";
