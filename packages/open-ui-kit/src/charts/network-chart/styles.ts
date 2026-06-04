/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SxProps, Theme } from "@mui/material";

export const networkStyles = (
  theme: Theme,
  isIoc: boolean,
): Record<string, SxProps<Theme>> => ({
  /** Two-column shell: categorized legend + force-directed graph area. */
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: { xs: 2, md: 3 },
    width: "100%",
  },
  legend: {
    flex: "0 0 auto",
    width: { xs: "100%", sm: 210 },
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    py: 1,
  },
  graph: {
    position: "relative",
    flex: "1 1 360px",
    minWidth: 0,
    overflow: "hidden",
    // Transparent canvas: the glowing nodes + labels float directly over the
    // page background (no glass card surface). Non-IoC keeps a faint surface.
    background: isIoc ? "transparent" : theme.palette.vars.baseBackgroundMedium,
  },
});

/** Add an alpha channel to a #rrggbb hex (returns rgba()). */
export const withAlpha = (hex: string, alpha: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/** Group heading ("AGENTS" / "LLMS" / "TOOLS"). */
export const legendHeading = (theme: Theme): SxProps<Theme> => ({
  fontFamily: "Inter, sans-serif",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: theme.palette.vars.baseTextStrong,
  mb: 1.25,
});

export const labelStyle = (theme: Theme) =>
  ({
    fontFamily: "Inter, sans-serif",
    fontSize: 12.5,
    fontWeight: 500,
    fill: theme.palette.vars.baseTextStrong,
  }) as const;

/**
 * Soft drop-shadow bloom for IoC network nodes. Two gentle layers (not neon):
 * a tight low-alpha halo plus a wider, very faint glow. `boost` (e.g. on hover)
 * slightly intensifies it.
 */
export const nodeGlow = (color: string, boost = false) =>
  boost
    ? `drop-shadow(0 0 4px ${color}66) drop-shadow(0 0 12px ${color}3a)`
    : `drop-shadow(0 0 3px ${color}40) drop-shadow(0 0 9px ${color}24)`;

/** Blend two #rrggbb hex colors; `amt` 0 → a, 1 → b. */
export const mixHex = (a: string, b: string, amt: number): string => {
  const pa = /^#?([0-9a-f]{6})$/i.exec(a.trim());
  const pb = /^#?([0-9a-f]{6})$/i.exec(b.trim());
  if (!pa || !pb) return a;
  const na = parseInt(pa[1], 16);
  const nb = parseInt(pb[1], 16);
  const mix = (sa: number, sb: number) => Math.round(sa + (sb - sa) * amt);
  const r = mix((na >> 16) & 255, (nb >> 16) & 255);
  const g = mix((na >> 8) & 255, (nb >> 8) & 255);
  const bl = mix(na & 255, nb & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
};

/** Mix a hex color toward white by `amt` (0..1) for a radial sphere highlight. */
export const lightenHex = (hex: string, amt: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amt);
  const g = Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amt);
  const b = Math.round((n & 255) + (255 - (n & 255)) * amt);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
