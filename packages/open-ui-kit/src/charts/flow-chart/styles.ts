/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SxProps, Theme } from "@mui/material";

export const flowContainer = (isIoc: boolean): SxProps<Theme> => ({
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: 360,
  overflow: "hidden",
  ...(isIoc ? { background: "transparent" } : {}),
});

/** Convert a #rrggbb hex to an rgba() string with the given alpha. */
export const withAlpha = (color: string, alpha: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return color;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Mix a hex toward white by amt (0..1). Returns input unchanged if not hex. */
export const lighten = (color: string, amt: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return color;
  const n = parseInt(m[1], 16);
  const r = Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amt);
  const g = Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amt);
  const b = Math.round((n & 255) + (255 - (n & 255)) * amt);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
