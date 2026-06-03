/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@mui/material";

export const scatterStyles = (theme: Theme) => ({
  axisTick: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 0.4,
    fill: theme.palette.vars.baseTextWeak,
  },
  grid: {
    stroke: theme.palette.vars.inactiveBackgroundDefault,
    strokeOpacity: 0.35,
  },
  tooltip: {
    padding: "8px 12px",
    borderRadius: "8px",
    background: theme.palette.vars.baseBackgroundStrong,
    border: `1px solid ${theme.palette.divider}`,
  },
});

/** Drop-shadow bloom for IoC scatter points. */
export const scatterGlow = (color: string) =>
  `drop-shadow(0 0 4px ${color}AA) drop-shadow(0 0 10px ${color}55)`;
