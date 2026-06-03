/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SxProps, Theme } from "@mui/material";

interface MeterStyles {
  container: SxProps<Theme>;
  header: SxProps<Theme>;
  track: SxProps<Theme>;
  marker: (leftPct: number, color: string) => SxProps<Theme>;
}

export const meterStyles = (
  theme: Theme,
  trackHeight: number,
  gradient: string,
  isIoc: boolean,
): MeterStyles => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  track: {
    position: "relative",
    width: "100%",
    height: `${trackHeight}px`,
    borderRadius: "100px",
    background: gradient,
    ...(isIoc && {
      boxShadow: `0 0 8px rgba(23,199,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)`,
    }),
  },
  marker: (leftPct: number, color: string) => ({
    position: "absolute",
    top: "50%",
    left: `${leftPct}%`,
    transform: "translate(-50%, -50%)",
    width: `${trackHeight + 8}px`,
    height: `${trackHeight + 8}px`,
    borderRadius: "50%",
    backgroundColor: theme.palette.vars.baseBackgroundStrong,
    border: `3px solid ${color}`,
    boxSizing: "border-box",
    ...(isIoc && {
      boxShadow: `0 0 6px ${color}CC, 0 0 14px ${color}77`,
    }),
  }),
});
