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
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 280,
    overflow: "hidden",
    // Transparent canvas: the glowing nodes + labels float directly over the
    // page background (no glass card surface). Non-IoC keeps a faint surface.
    background: isIoc ? "transparent" : theme.palette.vars.baseBackgroundMedium,
  },
});

export const labelStyle = (theme: Theme) =>
  ({
    fontFamily: "Inter, sans-serif",
    fontSize: 11,
    fontWeight: 600,
    fill: theme.palette.vars.baseTextDefault,
  }) as const;

/** Drop-shadow bloom for IoC network nodes. */
export const nodeGlow = (color: string) =>
  `drop-shadow(0 0 4px ${color}CC) drop-shadow(0 0 12px ${color}77) drop-shadow(0 0 24px ${color}33)`;

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
