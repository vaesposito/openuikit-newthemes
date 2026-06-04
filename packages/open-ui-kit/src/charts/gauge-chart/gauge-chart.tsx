/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { barShadow, boxStyle, gaugeLabel, gaugeWrapper } from "./styles";
import { ChartDataItem, ChartProps } from "@/charts";
import { isIocTheme } from "../common/is-ioc-theme";
import styled from "@emotion/styled";

// Dividers Configuration
const NUM_DIVIDERS = 51;
const SMALL_DIVIDER_LENGTH = 2.2;
const BIG_DIVIDER_LENGTH = 4.4;
const DIVIDER_MARGIN_FROM_CHART = 10;

// Gauge Configuration
const START_ANGLE = 240;
const END_ANGLE = -60;

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Mix a hex color toward white by `amt` (0..1) for a same-hue gradient sheen.
const lightenHex = (hex: string, amt: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = Math.round(((n >> 16) & 255) + (255 - ((n >> 16) & 255)) * amt);
  const g = Math.round(((n >> 8) & 255) + (255 - ((n >> 8) & 255)) * amt);
  const b = Math.round((n & 255) + (255 - (n & 255)) * amt);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export interface GaugeChartProps extends ChartProps {
  maxValue?: number;
  /** Optional unit rendered as a smaller, lighter superscript next to the value (e.g. "%"). */
  unit?: string;
  customLabelComponent?: React.ReactNode;
  styleProps?: {
    customWidth?: number;
    customHeight?: number;
    textTop?: string;
  };
}

export const GaugeChart = ({
  data,
  maxValue = 100,
  unit,
  customLabelComponent,
  styleProps,
}: GaugeChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);

  const [valueItem] = data as ChartDataItem[];

  // Under IoC the arc color is derived from the score so the stroke, its
  // gradient and the radial bloom always agree semantically:
  //   ≥80 → success/green, ≥50 → warning/amber, else → negative/red.
  // Non-IoC keeps the caller-supplied color.
  const scorePct = (Math.min(valueItem.value, maxValue) / maxValue) * 100;
  const semanticColor =
    scorePct >= 80
      ? theme.palette.vars.successBackgroundDefault
      : scorePct >= 50
        ? theme.palette.vars.warningBackgroundDefault
        : theme.palette.vars.negativeBackgroundDefault;
  const activeColor = isIoc ? semanticColor : valueItem.color;

  const gaugeData = [
    // Main Bar
    {
      value: (valueItem.value / maxValue) * 100,
      fill: activeColor,
    },
    // Background Bar
    {
      value:
        ((maxValue - Math.min(valueItem.value, maxValue)) / maxValue) * 100,
      fill: isIoc
        ? theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.08)"
        : theme.palette.vars.controlIconDisabled,
    },
  ];

  const width = styleProps?.customWidth || 132;
  const height = styleProps?.customHeight || 132;
  const cx = width / 2;
  const cy = height / 2;
  // OXP gauge uses a thin arc relative to its diameter; non-ioc keeps 9.
  const chartWidth = isIoc ? 6.5 : 9;
  const outerRadius = width / 2;
  const innerRadius = outerRadius - chartWidth;

  // Create all dividers in their appropriate place (hidden in ioc — glow replaces them)
  const renderDividers = () => (
    <>
      {Array.from({ length: NUM_DIVIDERS }).map((_, i) => {
        const strokeWidth = i % 5 === 0 ? 1.2 : 0.4;
        const length = i % 5 === 0 ? BIG_DIVIDER_LENGTH : SMALL_DIVIDER_LENGTH;
        const margin =
          i % 5 === 0
            ? DIVIDER_MARGIN_FROM_CHART + SMALL_DIVIDER_LENGTH
            : DIVIDER_MARGIN_FROM_CHART;

        const angle =
          START_ANGLE + (i * (END_ANGLE - START_ANGLE)) / (NUM_DIVIDERS - 1);
        const radian = (angle * Math.PI) / 180;
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);

        const x1 = cx + (innerRadius - margin) * cos;
        const y1 = cy - (innerRadius - margin) * sin;
        const x2 = x1 + length * cos;
        const y2 = y1 - length * sin;

        return (
          <line
            key={`gauge-divider-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={
              isIoc
                ? "transparent"
                : theme.palette.vars.inactiveBackgroundDefault
            }
            strokeWidth={strokeWidth}
          />
        );
      })}
    </>
  );

  // Per-color id so multiple gauges on one page never share a gradient
  // (a shared id made every arc render the first gauge's color).
  const gradientId = `gauge-active-${String(activeColor).replace(/[^a-z0-9]/gi, "")}`;
  const iocGlowStyle: React.CSSProperties | undefined = isIoc
    ? {
        // Tight glow keeps the thin arc crisp; the radial bloom div behind
        // supplies the wide ambient halo (matches the OXP gauge).
        filter: `drop-shadow(0 0 3px ${activeColor}) drop-shadow(0 0 8px ${activeColor}88)`,
      }
    : undefined;

  return (
    <StyledResponsiveContainer width="100%" height="100%">
      <div style={gaugeWrapper({ height, width })}>
        {/* Soft ambient bloom behind the arc — tinted with the active arc color */}
        {isIoc && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: width * 1.75,
              height: height * 1.75,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${activeColor}40 0%, ${activeColor}1F 34%, transparent 68%)`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
        {/* Glow wrapper — isolates the arc so Typography doesn't inherit the filter */}
        <div style={{ ...iocGlowStyle, position: "relative", zIndex: 1 }}>
          <PieChart width={width} height={height}>
            {isIoc && (
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={activeColor} />
                  <stop
                    offset="100%"
                    stopColor={lightenHex(activeColor, 0.4)}
                  />
                </linearGradient>
              </defs>
            )}
            <Pie
              data={gaugeData}
              cx="50%"
              cy="50%"
              startAngle={START_ANGLE}
              endAngle={END_ANGLE}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              strokeWidth={0}
              isAnimationActive={false}
              cornerRadius={isIoc ? chartWidth / 2 : 0}
            >
              <Cell
                key={`gauge-main-bar`}
                strokeLinecap="round"
                fill={isIoc ? `url(#${gradientId})` : activeColor}
              />
              <Cell key={`gauge-background-bar`} strokeLinecap="round" />
            </Pie>
            {renderDividers()}
          </PieChart>
        </div>
        <Box
          sx={{
            position: "absolute",
            top: styleProps?.textTop || "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "flex-start",
            lineHeight: 1,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontFamily: "Inter, sans-serif",
              // Large, lightweight numeral under IoC; bold elsewhere.
              fontWeight: isIoc ? 300 : 700,
              fontSize: isIoc ? `${Math.round(width * 0.34)}px` : "2.125rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: theme.palette.vars.baseTextStrong,
            }}
          >
            {Math.round(valueItem.value)}
          </Typography>
          {unit && (
            <Typography
              component="span"
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: isIoc ? `${Math.round(width * 0.15)}px` : "1rem",
                lineHeight: 1,
                marginTop: "0.18em",
                marginLeft: "0.08em",
                color: theme.palette.vars.baseTextWeak,
              }}
            >
              {unit}
            </Typography>
          )}
        </Box>
        <Box sx={boxStyle}>{customLabelComponent && customLabelComponent}</Box>
      </div>
    </StyledResponsiveContainer>
  );
};

export const gaugeWrapper = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) =>
  ({
    display: "inline-block",
    width: `${width}px`,
    height: `${height}px`,
    position: "relative",
  }) as const;

export const barShadow = (barFill: string, strong = false) => ({
  filter: strong
    ? // ioc: wide bloom — tight core + mid halo + wide outer glow
      `drop-shadow(0 0 4px ${barFill}) drop-shadow(0 0 10px ${barFill}EE) drop-shadow(0 0 22px ${barFill}AA) drop-shadow(0 0 40px ${barFill}66) drop-shadow(0 0 60px ${barFill}33)`
    : `drop-shadow(0 0 4px ${barFill}80) drop-shadow(0 1.97px 1px rgba(0, 0, 0, 0.25))`,
});

export const gaugeLabel = {
  transform: "translate(-50%, -50%)",
};

export const boxStyle = {
  position: "absolute",
  top: "64%",
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
};
