/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Typography, useTheme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { meterStyles } from "./styles";

export interface MeterChartProps {
  /** Current value plotted by the marker. */
  value: number;
  min?: number;
  max?: number;
  label?: string;
  /** Show the numeric value on the right of the header. */
  showValue?: boolean;
  /** Track height in px. */
  height?: number;
  /**
   * Gradient stops [low, mid, high]. Defaults to red → amber → cyan from
   * theme accent/semantic tokens.
   */
  colors?: [string, string, string];
  /** Formats the displayed value. */
  valueFormatter?: (value: number) => string;
}

/**
 * Linear gradient health meter — a red→amber→cyan gradient track with an
 * absolute marker at the current value. Mirrors the severity-bar visual
 * language and gains a glow under IoC themes.
 */
export const MeterChart = ({
  value,
  min = 0,
  max = 100,
  label,
  showValue = true,
  height = 10,
  colors,
  valueFormatter,
}: MeterChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);

  const [low, mid, high] = colors ?? [
    theme.palette.vars.negativeBackgroundDefault,
    theme.palette.vars.warningBackgroundDefault,
    theme.palette.vars.accentHDefault,
  ];
  const gradient = `linear-gradient(90deg, ${low} 0%, ${mid} 50%, ${high} 100%)`;

  const clamped = Math.min(Math.max(value, min), max);
  const pct = ((clamped - min) / (max - min)) * 100;

  // Marker color interpolates which band the value lands in.
  const markerColor = pct < 40 ? low : pct < 70 ? mid : high;

  const styles = meterStyles(theme, height, gradient, isIoc);

  return (
    <Box sx={styles.container}>
      {(label || showValue) && (
        <Box sx={styles.header}>
          {label && (
            <Typography
              variant="caption"
              color={theme.palette.vars.baseTextDefault}
            >
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography
              variant="body2Semibold"
              color={theme.palette.vars.baseTextStrong}
            >
              {valueFormatter ? valueFormatter(clamped) : Math.round(clamped)}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={styles.track}>
        <Box sx={styles.marker(pct, markerColor)} />
      </Box>
    </Box>
  );
};
