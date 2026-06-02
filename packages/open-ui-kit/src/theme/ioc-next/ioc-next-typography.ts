/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TypographyVariantsOptions } from "@mui/material/styles/createTypography";
import { typography } from "../common";

// IoC (OXP) typography — reconciled with the real OXP Figma values
// (file YcQcaTwBeHl4BpqD3eTHks, node 4501:8162).
//
// Findings from Figma:
//   • Headlines use **Sharp Sans Bold** (only Bold/700 is shipped). OXP only
//     actually uses H5–H7; H1–H4 exist for completeness but are unused.
//       - H5: 24 / 32   - H6: 20 / 28   - H7 (subsection): 18 / 28   (tracking 0)
//   • Everything else (subtitle/body/caption/button/overline/label) is **Inter**
//     on the STOCK Material/MUI type scale — only the Sharp Sans headlines
//     deviate from default MUI. Confirmed metrics: Body1 16/24 @0.15px,
//     Body2 14/20 @0.25px, Caption 12/16 @0.4px, Subtitle1 16/24 @0.15px.
//
// Font availability (packages/open-ui-kit/src/typography.css): Inter ships
// 400/600/700 only — there is NO Medium (500) face, so any 500 weight falls
// back to Inter Regular (400) per CSS font-matching. This matches the existing
// AGNTCY/C1D behaviour (their shared `common` ramp also uses 500 for subtitles).
//
// We spread the shared ramp first so every custom variant stays defined, then
// pin each variant to the real OXP/stock-MUI values (removing the previous
// airier line-heights and softer tracking).
export const iocNextTypography: TypographyVariantsOptions = {
  ...typography,
  fontFamily: "Inter, sans-serif",

  // ── Headlines (Sharp Sans Bold) ────────────────────────────────────────────
  // H1–H4 are unused by OXP but kept defined (Sharp Sans Bold) for completeness.
  h1: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "60px",
    lineHeight: "64px",
  },
  h2: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "48px",
    lineHeight: "52px",
  },
  h3: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "36px",
    lineHeight: "44px",
  },
  h4: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "36px",
  },
  // OXP H5 — Sharp Sans Bold 24/32.
  h5: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "0px",
  },
  // OXP H6 — Sharp Sans Bold 20/28.
  h6: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "0px",
  },
  // OXP H7 (sub-section heading) — Sharp Sans Bold 18/28.
  headingSubSection: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "28px",
    letterSpacing: "0px",
  },

  // ── Subtitles & body (Inter, stock MUI scale) ──────────────────────────────
  subtitle1: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  subtitle2: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
  },
  body1: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  body1Semibold: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
  },
  body2: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
  },
  body2Semibold: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.25px",
  },

  // ── Captions / labels / button / overline (Inter, stock MUI scale) ─────────
  caption: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.4px",
  },
  captionMedium: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.4px",
  },
  captionSemibold: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0px",
  },
  button: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.15px",
    textTransform: "none",
  },
  overline: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
};
