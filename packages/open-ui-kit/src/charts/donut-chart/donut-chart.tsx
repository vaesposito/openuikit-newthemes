/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useTheme } from "@mui/material";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Stack, Typography } from "@mui/material";
import { donutLabel, styles } from "./styles";
import { ChartDataItem, ChartProps } from "@/charts";

const formatBigNum = (value: number) =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);

export interface DonutProps extends ChartProps {
  handleClick?: (sliceData: ChartDataItem) => void;
}

const getTotalValues = (data: ChartDataItem[]) => {
  const total = data.map((v) => v.value).reduce((a, b) => a + b, 0);
  return total > 999999 ? formatBigNum(total) : total;
};

const DefaultTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  const theme = useTheme();

  if (!active || !payload) {
    return null;
  }

  return (
    <Stack sx={styles(theme).tooltip}>
      <Typography variant="caption" sx={styles(theme).tooltipTypography}>
        {payload[0].value} {payload[0].name}
      </Typography>
    </Stack>
  );
};

/**
 * A donut chart typically shows the proportions of categorical data where the size of each piece of the donut communicates the proportion of each category.
 */
export const DonutChart = ({
  data,
  showTooltip = true,
  customTooltip,
  handleClick,
}: DonutProps): JSX.Element => {
  const theme = useTheme();
  const isIoc = theme.palette.primary.main === "#00BCEB";
  const innerRadius = 57;
  const outerRadius = 66;

  const dominantColor = (data as ChartDataItem[])[0]?.color ?? "#00BCEB";
  const iocGlowStyle: React.CSSProperties | undefined = isIoc
    ? {
        filter: `drop-shadow(0 0 3px ${dominantColor}88)`,
      }
    : undefined;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={132} height={132}>
        {/* Glow applied at HTML level via customized SVG wrapper isn't possible in Recharts,
            so we rely on CSS filter on the PieChart SVG wrapper div */}
        <Pie
          onClick={handleClick}
          strokeWidth={0}
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
          startAngle={450}
          endAngle={90}
          minAngle={10}
          style={iocGlowStyle}
        >
          {(data as ChartDataItem[]).map(({ color }, index) => (
            <Cell
              key={`cell-${index}`}
              fill={color}
              cursor={handleClick ? "pointer" : "default"}
            />
          ))}
        </Pie>
        <text
          style={donutLabel(theme)}
          textAnchor="middle"
          dominantBaseline="middle"
          x={"50%"}
          y={"50%"}
          fill={theme.palette.vars.baseTextDefault}
        >
          {getTotalValues(data as ChartDataItem[])}
        </text>
        {showTooltip && (
          <Tooltip
            allowEscapeViewBox={{ x: true, y: true }}
            content={customTooltip ?? DefaultTooltip}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};
