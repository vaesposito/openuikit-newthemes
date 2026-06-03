/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Button, Typography, useTheme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { meterStyles, scoreStyles } from "./styles";

export interface MeterMarker {
  /** Value (in the same scale as min/max) the marker sits at. */
  value: number;
  /** Optional label rendered above the marker line. */
  label?: string;
}

export interface MeterCta {
  label: string;
  href?: string;
  onClick?: () => void;
}

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
  /**
   * Layout variant. "bar" (default) renders the compact gradient bar with a
   * dot marker. "score" renders the OXP Health-Score layout: a large
   * light-weight value, an uppercase caption, a gradient-outlined hint pill
   * and a hairline rainbow track with thin vertical value markers.
   */
  variant?: "bar" | "score";
  /** Unit appended to the value (e.g. "%"). */
  unit?: string;
  /** Uppercase caption beneath the big value (score variant). */
  title?: string;
  /** Gradient-outlined helper pill text (score variant). */
  hint?: string;
  /** Vertical value markers along the track (score variant). */
  markers?: MeterMarker[];
  /**
   * Full multi-stop rainbow for the score track, e.g.
   * red → magenta → orange → amber → green → cyan. Defaults to theme tokens.
   */
  gradientStops?: string[];
  /** Optional call-to-action button (score variant). */
  cta?: MeterCta;
}

/**
 * Linear gradient health meter. The default "bar" variant mirrors the
 * severity-bar visual language; the "score" variant reproduces the OXP
 * Health-Score panel. Both gain a glow under IoC themes.
 */
export const MeterChart = ({
  value,
  min = 0,
  max = 100,
  label,
  showValue = true,
  height,
  colors,
  valueFormatter,
  variant = "bar",
  unit = "",
  title,
  hint,
  markers,
  gradientStops,
  cta,
}: MeterChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const vars = theme.palette.vars;

  const clamped = Math.min(Math.max(value, min), max);
  const pct = ((clamped - min) / (max - min)) * 100;
  const formatValue = (v: number) =>
    valueFormatter ? valueFormatter(v) : `${Math.round(v)}${unit}`;

  if (variant === "score") {
    const trackHeight = height ?? 3;
    // Full rainbow derived from accent/semantic tokens:
    // red → magenta → orange → amber → green → cyan.
    const stops = gradientStops ?? [
      vars.negativeBackgroundDefault,
      vars.accentIDefault,
      vars.accentFDefault,
      vars.warningBackgroundDefault,
      vars.accentEDefault,
      vars.accentHDefault,
    ];
    const step = stops.length > 1 ? 100 / (stops.length - 1) : 100;
    const gradient = `linear-gradient(90deg, ${stops
      .map((c, i) => `${c} ${Math.round(i * step)}%`)
      .join(", ")})`;

    const pillFrom = vars.accentGDefault ?? vars.accentHDefault;
    const pillTo = vars.accentHDefault;
    const styles = scoreStyles(
      theme,
      trackHeight,
      gradient,
      pillFrom,
      pillTo,
      isIoc,
    );

    return (
      <Box sx={styles.container}>
        <Typography component="div" sx={styles.value}>
          {formatValue(clamped)}
        </Typography>
        {title && (
          <Typography component="div" sx={styles.title}>
            {title}
          </Typography>
        )}
        {hint && <Box sx={styles.hintPill}>{hint}</Box>}
        <Box sx={styles.trackCell}>
          <Box sx={styles.track} />
          {(markers ?? []).map((m, i) => {
            const mPct =
              ((Math.min(Math.max(m.value, min), max) - min) / (max - min)) *
              100;
            return (
              <Box key={i} sx={styles.markerWrap(mPct)}>
                {m.label && <Box sx={styles.markerLabel}>{m.label}</Box>}
                <Box sx={styles.markerLine} />
              </Box>
            );
          })}
        </Box>
        {cta && (
          <Box sx={styles.ctaCell}>
            <Button variant={"secondary" as any} onClick={cta.onClick}>
              {cta.label}
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  const [low, mid, high] = colors ?? [
    vars.negativeBackgroundDefault,
    vars.warningBackgroundDefault,
    vars.accentHDefault,
  ];
  const gradient = `linear-gradient(90deg, ${low} 0%, ${mid} 50%, ${high} 100%)`;
  const markerColor = pct < 40 ? low : pct < 70 ? mid : high;
  const styles = meterStyles(theme, height ?? 10, gradient, isIoc);

  return (
    <Box sx={styles.container}>
      {(label || showValue) && (
        <Box sx={styles.header}>
          {label && (
            <Typography variant="caption" color={vars.baseTextDefault}>
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography variant="body2Semibold" color={vars.baseTextStrong}>
              {formatValue(clamped)}
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
