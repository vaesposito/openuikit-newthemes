/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// IoC Light Theme Color Palette
// C1D branding on a clean white-blue canvas

// ─── Surface (solid light, subtle teal tint) ─────────────────────────────────
export const iocLightSurface50  = "#FFFFFF";
export const iocLightSurface100 = "#F5F9FF";
export const iocLightSurface200 = "#EEF4FF";
export const iocLightSurface300 = "#E3EFFF";
export const iocLightSurface400 = "#D6E8FF";
export const iocLightSurface500 = "#C8DFFF";

export const iocLightSurfacePalette = {
  50:  iocLightSurface50,
  100: iocLightSurface100,
  200: iocLightSurface200,
  300: iocLightSurface300,
  400: iocLightSurface400,
  500: iocLightSurface500,
};

// ─── Border ──────────────────────────────────────────────────────────────────
export const iocLightBorder100 = "rgba(0, 0, 0, 0.06)";
export const iocLightBorder200 = "rgba(0, 0, 0, 0.09)";
export const iocLightBorder300 = "rgba(0, 0, 0, 0.12)";
export const iocLightBorder400 = "rgba(0, 0, 0, 0.18)";
export const iocLightBorder500 = "rgba(0, 0, 0, 0.24)";

export const iocLightBorderPalette = {
  100: iocLightBorder100,
  200: iocLightBorder200,
  300: iocLightBorder300,
  400: iocLightBorder400,
  500: iocLightBorder500,
};

// ─── Text (dark navy for legibility on white) ─────────────────────────────────
export const iocLightTextPrimary   = "#0A1628";
export const iocLightTextSecondary = "rgba(10, 22, 40, 0.65)";
export const iocLightTextTertiary  = "rgba(10, 22, 40, 0.40)";
export const iocLightTextDisabled  = "rgba(10, 22, 40, 0.28)";

// ─── Page background ──────────────────────────────────────────────────────────
export const iocLightPageBackground = `
  radial-gradient(ellipse 110% 70% at -10% -5%, rgba(0, 188, 235, 0.07) 0%, rgba(0, 120, 200, 0.03) 50%, transparent 70%),
  linear-gradient(160deg, #F0F7FF 0%, #F8FAFF 50%, #FFFFFF 100%)
`;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const iocLightShadowSm = "0 1px 4px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06)";
export const iocLightShadowMd = "0 2px 8px rgba(0, 0, 0, 0.10), 0 4px 16px rgba(0, 0, 0, 0.08)";
export const iocLightShadowLg = "0 4px 16px rgba(0, 0, 0, 0.12), 0 8px 32px rgba(0, 0, 0, 0.10)";
