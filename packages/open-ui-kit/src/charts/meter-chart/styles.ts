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

interface ScoreStyles {
  container: SxProps<Theme>;
  value: SxProps<Theme>;
  title: SxProps<Theme>;
  hintPill: SxProps<Theme>;
  trackCell: SxProps<Theme>;
  track: SxProps<Theme>;
  markerWrap: (leftPct: number) => SxProps<Theme>;
  markerLine: SxProps<Theme>;
  markerLabel: SxProps<Theme>;
  ctaCell: SxProps<Theme>;
}

/**
 * OXP "Health Score" layout: a huge light-weight value with an uppercase
 * caption beneath, a gradient-outlined helper pill, and a hairline rainbow
 * track with thin vertical value markers.
 */
export const scoreStyles = (
  theme: Theme,
  trackHeight: number,
  gradient: string,
  pillFrom: string,
  pillTo: string,
  isIoc: boolean,
): ScoreStyles => {
  const surface = theme.palette.vars.baseBackgroundStrong;
  return {
    container: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      columnGap: { xs: 2.5, md: 4 },
      rowGap: { xs: 2, md: 2.5 },
      alignItems: "center",
      gridTemplateAreas: `"value pill" "title track" "title cta"`,
    },
    value: {
      gridArea: "value",
      alignSelf: "end",
      fontFamily: "Inter, sans-serif",
      fontWeight: 300,
      lineHeight: 0.95,
      letterSpacing: "-0.02em",
      fontSize: { xs: "48px", sm: "60px", md: "72px" },
      color: theme.palette.vars.baseTextStrong,
      whiteSpace: "nowrap",
    },
    title: {
      gridArea: "title",
      alignSelf: "start",
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      fontSize: { xs: "13px", md: "15px" },
      color:
        theme.palette.vars.baseTextWeak ?? theme.palette.vars.baseTextDefault,
      whiteSpace: "nowrap",
    },
    hintPill: {
      gridArea: "pill",
      justifySelf: "start",
      alignSelf: "center",
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "9999px",
      padding: "10px 22px",
      fontFamily: "Inter, sans-serif",
      fontSize: { xs: "13px", md: "15px" },
      color: theme.palette.vars.baseTextDefault,
      border: "1px solid transparent",
      background: `linear-gradient(${surface}, ${surface}) padding-box, linear-gradient(90deg, ${pillFrom} 0%, ${pillTo} 100%) border-box`,
      ...(isIoc && { boxShadow: `0 0 16px ${pillTo}33` }),
    },
    trackCell: {
      gridArea: "track",
      position: "relative",
      width: "100%",
      paddingTop: "26px",
      alignSelf: "center",
    },
    track: {
      position: "relative",
      width: "100%",
      height: `${trackHeight}px`,
      borderRadius: "9999px",
      background: gradient,
      ...(isIoc && { boxShadow: `0 0 6px rgba(23,199,255,0.2)` }),
    },
    markerWrap: (leftPct: number) => ({
      position: "absolute",
      left: `${leftPct}%`,
      top: 0,
      bottom: 0,
      transform: "translateX(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }),
    markerLabel: {
      fontFamily: "Inter, sans-serif",
      fontSize: "13px",
      color: theme.palette.vars.baseTextDefault,
      marginBottom: "4px",
      whiteSpace: "nowrap",
    },
    markerLine: {
      width: "1px",
      flex: 1,
      backgroundColor:
        theme.palette.vars.baseTextWeak ?? "rgba(255,255,255,0.45)",
    },
    ctaCell: {
      gridArea: "cta",
      justifySelf: "end",
    },
  };
};
