/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartScatterChart,
  Tooltip,
  TooltipProps,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
  ZAxis,
} from "recharts";
import { Stack, Typography, useTheme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { resolveSeriesColor } from "../common/chart-colors";
import { scatterGlow, scatterStyles } from "./styles";

export interface ScatterPoint {
  x: number;
  y: number;
  /** Optional magnitude → bubble size (mapped via ZAxis). */
  z?: number;
  name?: string;
}

export interface ScatterSeries {
  name: string;
  /** Overrides the brand-accent default for this series. */
  color?: string;
  data: ScatterPoint[];
}

/** A highlighted region with an optional pill badge label. */
export interface ScatterBand {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  label?: string;
  /** Overrides the default accent band color. */
  color?: string;
}

export interface ScatterChartProps {
  series: ScatterSeries[];
  band?: ScatterBand;
  showTooltip?: boolean;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  /** [min, max] range of `z` mapped to bubble radius in px. */
  zRange?: [number, number];
}

interface GlowDotProps {
  cx?: number;
  cy?: number;
  fill?: string;
  r?: number;
  glow?: boolean;
}

const GlowDot = ({ cx = 0, cy = 0, fill, r = 5, glow }: GlowDotProps) => {
  if (!fill) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      fillOpacity={0.9}
      stroke={fill}
      strokeOpacity={0.5}
      strokeWidth={1}
      style={glow ? { filter: scatterGlow(fill) } : undefined}
    />
  );
};

const ScatterTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  const theme = useTheme();
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload as ScatterPoint;
  return (
    <Stack sx={scatterStyles(theme).tooltip}>
      <Typography variant="caption" color={theme.palette.vars.baseTextStrong}>
        {p?.name ? `${p.name} · ` : ""}({p?.x}, {p?.y})
      </Typography>
    </Stack>
  );
};

/**
 * Scatter / distribution chart. Plots one or more x/y series (optionally sized
 * by `z`), with an optional highlighted band and pill badge overlay. Series
 * default to the theme's brand-accent palette and gain a glow under IoC themes.
 */
export const ScatterChart = ({
  series,
  band,
  showTooltip = true,
  xAxisProps,
  yAxisProps,
  zRange = [40, 400],
}: ScatterChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const styles = scatterStyles(theme);
  const bandColor = band?.color ?? theme.palette.vars.accentHDefault;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartScatterChart margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid
          strokeDasharray="4 4"
          stroke={styles.grid.stroke}
          strokeOpacity={styles.grid.strokeOpacity}
        />
        <XAxis
          type="number"
          dataKey="x"
          axisLine={{ stroke: theme.palette.vars.inactiveBackgroundDefault }}
          tickLine={false}
          tick={styles.axisTick}
          {...xAxisProps}
        />
        <YAxis
          type="number"
          dataKey="y"
          width={40}
          axisLine={false}
          tickLine={false}
          tick={styles.axisTick}
          {...yAxisProps}
        />
        <ZAxis type="number" dataKey="z" range={zRange} />
        {band && (
          <ReferenceArea
            x1={band.x1}
            x2={band.x2}
            y1={band.y1}
            y2={band.y2}
            fill={bandColor}
            fillOpacity={0.12}
            stroke={bandColor}
            strokeOpacity={0.5}
            strokeDasharray="4 4"
            ifOverflow="extendDomain"
            label={
              band.label
                ? (props: {
                    viewBox?: { x: number; y: number; width: number };
                  }) => {
                    const vb = props.viewBox ?? { x: 0, y: 0, width: 0 };
                    const text = band.label ?? "";
                    const w = Math.max(48, text.length * 7 + 20);
                    const x = vb.x + vb.width / 2 - w / 2;
                    const y = vb.y + 8;
                    return (
                      <g
                        style={
                          isIoc ? { filter: scatterGlow(bandColor) } : undefined
                        }
                      >
                        <rect
                          x={x}
                          y={y}
                          width={w}
                          height={22}
                          rx={11}
                          ry={11}
                          fill={bandColor}
                          fillOpacity={0.95}
                        />
                        <text
                          x={x + w / 2}
                          y={y + 15}
                          textAnchor="middle"
                          fontFamily="Inter"
                          fontSize={11}
                          fontWeight={600}
                          fill={theme.palette.vars.neutralTextInDefault}
                        >
                          {text}
                        </text>
                      </g>
                    );
                  }
                : undefined
            }
          />
        )}
        {series.map((s, i) => {
          const color = resolveSeriesColor(theme, i, s.color);
          return (
            <Scatter
              key={s.name}
              name={s.name}
              data={s.data}
              fill={color}
              isAnimationActive={false}
              shape={(props: GlowDotProps) => (
                <GlowDot {...props} fill={color} glow={isIoc} />
              )}
            />
          );
        })}
        {showTooltip && (
          <Tooltip
            cursor={{ strokeDasharray: "4 4", stroke: styles.grid.stroke }}
            content={<ScatterTooltip />}
          />
        )}
      </RechartScatterChart>
    </ResponsiveContainer>
  );
};
