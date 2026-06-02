/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// IoC (OXP / Outshift) Theme Color Palette — dark
// Derived from the Figma "OXP" design system: deep navy foundations,
// solid elevated navy surfaces, cyan brand accent, rich data-viz palette.

// ─── Cyan (primary brand accent) — anchor #17C7FF ────────────────────────────
export const iocNextCyan50 = "#E4FAFF";
export const iocNextCyan100 = "#B8F1FF";
export const iocNextCyan200 = "#84E6FF";
export const iocNextCyan300 = "#62E0FF";
export const iocNextCyan400 = "#3AD2FF";
export const iocNextCyan500 = "#17C7FF"; // OXP brand cyan
export const iocNextCyan600 = "#0AB6FF";
export const iocNextCyan700 = "#0091D6";
export const iocNextCyan800 = "#006FA8";
export const iocNextCyan900 = "#00496E";

export const iocNextCyanAlpha40 = "rgba(23, 199, 255, 0.40)";
export const iocNextCyanAlpha20 = "rgba(23, 199, 255, 0.20)";
export const iocNextCyanAlpha10 = "rgba(23, 199, 255, 0.10)";
export const iocNextCyanAlpha05 = "rgba(23, 199, 255, 0.05)";

export const iocNextCyanPalette = {
  50: iocNextCyan50,
  100: iocNextCyan100,
  200: iocNextCyan200,
  300: iocNextCyan300,
  400: iocNextCyan400,
  500: iocNextCyan500,
  600: iocNextCyan600,
  700: iocNextCyan700,
  800: iocNextCyan800,
  900: iocNextCyan900,
  alpha40: iocNextCyanAlpha40,
  alpha20: iocNextCyanAlpha20,
  alpha10: iocNextCyanAlpha10,
  alpha05: iocNextCyanAlpha05,
};

// ─── Blue (secondary) — #3A95FF / #187ADC ────────────────────────────────────
export const iocNextBlue400 = "#5AA6FF";
export const iocNextBlue500 = "#3A95FF"; // OXP neutral/secondary blue
export const iocNextBlue600 = "#187ADC";

export const iocNextBluePalette = {
  400: iocNextBlue400,
  500: iocNextBlue500,
  600: iocNextBlue600,
};

// ─── Surface (solid navy, elevated) ──────────────────────────────────────────
// Anchored on Panoptica/Surface tokens (#273549 → #384D6B).
export const iocNextSurface50 = "#273549";
export const iocNextSurface100 = "#2A3A50";
export const iocNextSurface200 = "#2E3E57";
export const iocNextSurface300 = "#334766";
export const iocNextSurface400 = "#384D6B";
export const iocNextSurface500 = "#41597C";

export const iocNextSurfacePalette = {
  50: iocNextSurface50,
  100: iocNextSurface100,
  200: iocNextSurface200,
  300: iocNextSurface300,
  400: iocNextSurface400,
  500: iocNextSurface500,
};

// ─── Backdrop (deep navy page foundation) ────────────────────────────────────
export const iocNextBackdrop900 = "#060B14";
export const iocNextBackdrop800 = "#08101D";
export const iocNextBackdrop700 = "#0A1526";
export const iocNextBackdrop600 = "#0C1B30";
export const iocNextBackdrop500 = "#0D274D"; // Control/Background/Weak
export const iocNextBackdrop400 = "#102A52";
export const iocNextBackdrop300 = "#14315E";
export const iocNextBackdrop200 = "#19386A";
export const iocNextBackdrop100 = "#1F4078";

export const iocNextBackdropPalette = {
  900: iocNextBackdrop900,
  800: iocNextBackdrop800,
  700: iocNextBackdrop700,
  600: iocNextBackdrop600,
  500: iocNextBackdrop500,
  400: iocNextBackdrop400,
  300: iocNextBackdrop300,
  200: iocNextBackdrop200,
  100: iocNextBackdrop100,
};

// ─── Border (blue-grey) ──────────────────────────────────────────────────────
export const iocNextBorder100 = "#263B62"; // Control/Border/Weak
export const iocNextBorder200 = "#324776";
export const iocNextBorder300 = "#4F628D"; // Control/Border/Default
export const iocNextBorder400 = "#5E7099";
export const iocNextBorder500 = "#6E80A8";

export const iocNextBorderPalette = {
  100: iocNextBorder100,
  200: iocNextBorder200,
  300: iocNextBorder300,
  400: iocNextBorder400,
  500: iocNextBorder500,
};

// ─── Text (light on dark navy) ───────────────────────────────────────────────
export const iocNextTextPrimary = "#F0F1F2"; // base/text/strong
export const iocNextTextSecondary = "#C5C7CB"; // base/text/medium
export const iocNextTextTertiary = "#9EA2A8"; // base/text/weak
export const iocNextTextDisabled = "#6A7079";

// ─── Page background: OXP "App Page" bottom bloom over deep navy ─────────────
// Recreates the signature OXP gradient (Figma node 4320:37117, "Ellipse 7/8"):
// a multi-stop bloom rising from the bottom-center — blue #0A66FF → cyan #02C8FF
// → magenta #FF007F → warm orange #FF9000 — fading into a near-black navy base.
// Layers are listed top→bottom: orange core, magenta mid, blue/cyan bloom,
// cyan accent, then the navy base linear.
export const iocNextPageBackground = `
  radial-gradient(ellipse 60% 42% at 50% 116%, rgba(255, 144, 0, 0.42) 0%, rgba(255, 144, 0, 0) 55%),
  radial-gradient(ellipse 85% 55% at 50% 110%, rgba(255, 0, 127, 0.38) 0%, rgba(255, 0, 127, 0) 60%),
  radial-gradient(ellipse 120% 70% at 46% 102%, rgba(10, 102, 255, 0.40) 0%, rgba(2, 200, 255, 0.12) 42%, transparent 70%),
  radial-gradient(ellipse 70% 50% at 62% 96%, rgba(2, 200, 255, 0.16) 0%, transparent 55%),
  linear-gradient(180deg, #060B14 0%, #070E1A 48%, #0A1124 100%)
`;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const iocNextShadowSm = "0 2px 8px rgba(0, 0, 0, 0.35)";
export const iocNextShadowMd = "0 4px 16px rgba(0, 0, 0, 0.45)";
export const iocNextShadowLg = "0 8px 32px rgba(0, 0, 0, 0.55)";

// ─── Effects ─────────────────────────────────────────────────────────────────
export const iocNextBackdropBlur = "blur(20px)";
