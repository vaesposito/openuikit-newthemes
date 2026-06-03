/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useCallback } from "react";
import {
  Bar,
  Cell,
  XAxis,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Tooltip,
  TooltipProps,
} from "recharts";
import { ChartDataItem, ChartProps } from "@/charts";
import { Stack, Typography, useTheme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { styles } from "./styles";

interface GlowBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  radius?: number;
  isIoc?: boolean;
}

const GlowBar = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
  radius = 4,
  isIoc,
}: GlowBarProps) => {
  if (!fill || fill === "transparent" || height <= 0) return null;
  const glowFilter =
    isIoc && fill
      ? `drop-shadow(0 0 4px ${fill}99) drop-shadow(0 0 10px ${fill}55)`
      : undefined;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={radius}
      ry={radius}
      style={glowFilter ? { filter: glowFilter } : undefined}
    />
  );
};

const BAR_SIZE_PX = 8;
const SPACE_BETWEEN_BARS_PX = 29;
const EMPTY_BAR: ChartDataItem = {
  name: "EmptyBar",
  value: 0,
  color: "transparent",
};

const DefaultTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  const theme = useTheme();

  if (!active || !payload || payload[0].value === EMPTY_BAR.value) {
    return null;
  }

  return (
    <Stack sx={styles(theme).tooltip}>
      <Typography variant="caption" sx={styles(theme).tooltipTypography}>
        {payload[0].value} {payload[0].payload.name}
      </Typography>
    </Stack>
  );
};

export interface BarChartProps extends ChartProps {
  handleClick?: (item: ChartDataItem) => void;
}

export const BarChart = ({
  data,
  handleClick,
  showTooltip,
  customTooltip,
}: BarChartProps) => {
  const [maxBars, setMaxBars] = useState(0);

  const theme = useTheme();
  const isIoc = isIocTheme(theme);

  const handleResize = useCallback((width: number) => {
    const maxBars =
      1 + Math.round(width / (BAR_SIZE_PX + SPACE_BETWEEN_BARS_PX));
    setMaxBars(maxBars);
  }, []);

  // adjustedData is used to "push" bars and align them to the beginning of the x-axis.
  const adjustedData = useMemo((): ChartDataItem[] => {
    if (maxBars <= data.length) {
      return data as ChartDataItem[];
    }
    const emptyBars = new Array(maxBars - data.length).fill(EMPTY_BAR);
    return [...data, ...emptyBars];
  }, [maxBars, data]);

  return (
    <ResponsiveContainer width="100%" height="100%" onResize={handleResize}>
      <RechartsBarChart data={adjustedData} barSize={BAR_SIZE_PX}>
        <XAxis hide scale="point" />
        <Bar
          dataKey="value"
          radius={4}
          minPointSize={10}
          isAnimationActive={false}
          background={{
            fill: "rgba(128,128,128,0.18)",
            radius: 4,
          }}
          shape={(props: GlowBarProps) => <GlowBar {...props} isIoc={isIoc} />}
        >
          {adjustedData.map((dataItem, i) => (
            <Cell
              key={`${dataItem.name}-${i}`}
              fill={dataItem.color}
              {...(dataItem.name === EMPTY_BAR.name && {
                display: "none",
              })}
              {...(handleClick && {
                cursor: "pointer",
                onClick: () => handleClick(dataItem),
              })}
            />
          ))}
        </Bar>
        {showTooltip && (
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            content={customTooltip ?? DefaultTooltip}
          />
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
