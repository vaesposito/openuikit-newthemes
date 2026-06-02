/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TypographyVariantsOptions } from "@mui/material/styles/createTypography";
import { typography } from "../common";

// IoC (OXP) typography — intentionally distinct from the shared AGNTCY/C1D ramp.
// Headlines: Sharp Sans, tighter display tracking + larger sizes.
// Body/labels: Inter, airier line-heights and slightly larger label sizing.
// Built by cloning the shared ramp so every custom variant stays defined,
// then overriding sizes / line-heights / spacing for an airier, modern feel.
export const iocNextTypography: TypographyVariantsOptions = {
  ...typography,
  fontFamily: "Inter, sans-serif",

  // ── Display headlines (Sharp Sans) — larger + tighter tracking ─────────────
  h1: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "64px",
    lineHeight: "72px",
    letterSpacing: "-0.5px",
  },
  h2: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "52px",
    lineHeight: "60px",
    letterSpacing: "-0.4px",
  },
  h3: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "48px",
    letterSpacing: "-0.3px",
  },
  h4: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "30px",
    lineHeight: "40px",
    letterSpacing: "-0.2px",
  },
  h5: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "26px",
    lineHeight: "34px",
    letterSpacing: "-0.1px",
  },
  h6: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "22px",
    lineHeight: "30px",
  },
  headingSubSection: {
    fontFamily: "Sharp Sans, sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "28px",
  },

  // ── Body & subtitles (Inter) — airier line-heights ─────────────────────────
  subtitle1: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "26px",
    letterSpacing: "0.1px",
  },
  subtitle2: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.1px",
  },
  body1: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "26px",
    letterSpacing: "0.2px",
  },
  body1Semibold: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "26px",
    letterSpacing: "0px",
  },
  body2: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.15px",
  },
  body2Semibold: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0px",
  },

  // ── Captions / labels (Inter) — airier + a touch more tracking ─────────────
  caption: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.4px",
  },
  captionMedium: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.4px",
  },
  captionSemibold: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.2px",
  },
  button: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "16px",
    letterSpacing: "0.2px",
    textTransform: "none",
  },
  overline: {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "16px",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  },
};
