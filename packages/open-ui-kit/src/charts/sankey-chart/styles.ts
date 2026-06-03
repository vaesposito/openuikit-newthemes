/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@mui/material";

export const sankeyStyles = (theme: Theme) => ({
  nodeLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 600,
    fill: theme.palette.vars.baseTextStrong,
  },
  badgeText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: 700,
    fill: theme.palette.vars.neutralTextInDefault,
  },
  tooltip: {
    padding: "8px 12px",
    borderRadius: "8px",
    background: theme.palette.vars.baseBackgroundStrong,
    border: `1px solid ${theme.palette.divider}`,
  },
});

export const nodeGlow = (color: string) =>
  `drop-shadow(0 0 4px ${color}AA) drop-shadow(0 0 10px ${color}55)`;
