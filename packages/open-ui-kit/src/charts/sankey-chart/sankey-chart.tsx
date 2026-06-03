/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from "react";
import { ResponsiveContainer, Sankey, Tooltip, TooltipProps } from "recharts";
import { Stack, Typography, useTheme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { getChartSeriesColors } from "../common/chart-colors";
import { CustomNode } from "./custom-node";
import { CustomLink } from "./custom-link";
import { sankeyStyles } from "./styles";

export interface SankeyNode {
  name: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export interface SankeyChartProps {
  data: SankeyData;
  /** Overrides the brand-accent palette used to color nodes/ribbons. */
  colors?: string[];
  nodePadding?: number;
  nodeWidth?: number;
  showTooltip?: boolean;
}

const SankeyTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  const theme = useTheme();
  if (!active || !payload || !payload.length) return null;
  const p = payload[0]?.payload ?? {};
  const name =
    p?.name ??
    (p?.source && p?.target ? `${p.source.name} → ${p.target.name}` : "");
  return (
    <Stack sx={sankeyStyles(theme).tooltip}>
      <Typography variant="caption" color={theme.palette.vars.baseTextStrong}>
        {name} · {payload[0]?.value}
      </Typography>
    </Stack>
  );
};

/**
 * Sankey / flow chart with gradient ribbons (source→target color) and circular
 * value badges on each node. Node/ribbon colors default to the theme's
 * brand-accent palette; nodes gain a glow under IoC themes.
 */
export const SankeyChart = ({
  data,
  colors,
  nodePadding = 28,
  nodeWidth = 12,
  showTooltip = true,
}: SankeyChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const palette = colors ?? getChartSeriesColors(theme);
  const [containerWidth, setContainerWidth] = useState(600);

  const handleResize = useCallback((width: number) => {
    if (width) setContainerWidth(width);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%" onResize={handleResize}>
      <Sankey
        data={data}
        nodePadding={nodePadding}
        nodeWidth={nodeWidth}
        margin={{ top: 16, right: 80, bottom: 16, left: 80 }}
        link={<CustomLink colors={palette} />}
        node={
          <CustomNode
            colors={palette}
            theme={theme}
            isIoc={isIoc}
            containerWidth={containerWidth}
          />
        }
      >
        {showTooltip && <Tooltip content={<SankeyTooltip />} />}
      </Sankey>
    </ResponsiveContainer>
  );
};
