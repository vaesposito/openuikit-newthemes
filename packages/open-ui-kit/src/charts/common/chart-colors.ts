/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@mui/material";

/**
 * Ordered brand-accent series palette (accentA…J) sourced from theme vars.
 *
 * Charts that don't receive an explicit per-datum/category color should fall
 * back to this palette so series default to the active theme's brand accents.
 * Consumer-supplied colors always take precedence — see {@link resolveSeriesColor}.
 */
export const getChartSeriesColors = (theme: Theme): string[] => {
  const v = theme.palette.vars;
  return [
    v.accentADefault,
    v.accentBDefault,
    v.accentCDefault,
    v.accentDDefault,
    v.accentEDefault,
    v.accentFDefault,
    v.accentGDefault,
    v.accentHDefault,
    v.accentIDefault,
    v.accentJDefault,
  ];
};

/** Pick the nth accent color, wrapping around the palette. */
export const getChartColor = (theme: Theme, index: number): string => {
  const colors = getChartSeriesColors(theme);
  return colors[((index % colors.length) + colors.length) % colors.length];
};

/**
 * Resolve a series color: prefer the consumer-supplied `color`, otherwise fall
 * back to the brand-accent palette at `index`. Keeps existing
 * ChartProps/ChartDataItem APIs intact (color stays optional/overriding).
 */
export const resolveSeriesColor = (
  theme: Theme,
  index: number,
  color?: string,
): string => color ?? getChartColor(theme, index);
