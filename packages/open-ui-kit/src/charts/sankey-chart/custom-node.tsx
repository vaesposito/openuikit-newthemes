/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@mui/material";
import { sankeyStyles, nodeGlow } from "./styles";

export interface SankeyNodePayload {
  name: string;
  value?: number;
}

export interface CustomNodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: SankeyNodePayload;
  // injected by us
  colors: string[];
  theme: Theme;
  isIoc: boolean;
  containerWidth: number;
}

/**
 * Sankey node: rounded color block + outer-side label and a circular value
 * badge. Color comes from the accent palette by node index.
 */
export const CustomNode = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  index = 0,
  payload,
  colors,
  theme,
  isIoc,
  containerWidth,
}: CustomNodeProps) => {
  const styles = sankeyStyles(theme);
  const color = colors[index % colors.length];
  const isLeft = x < containerWidth / 2;
  const value = payload?.value ?? 0;

  // Label sits on the outer side of the node.
  const labelX = isLeft ? x + width + 10 : x - 10;
  const labelAnchor = isLeft ? "start" : "end";
  const cy = y + height / 2;

  // Circular value badge at the node's outer-top.
  const badgeR = 11;
  const badgeCx = isLeft ? x + width + badgeR + 2 : x - badgeR - 2;
  const badgeCy = y + height / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={Math.max(height, 2)}
        rx={4}
        ry={4}
        fill={color}
        fillOpacity={0.95}
        style={isIoc ? { filter: nodeGlow(color) } : undefined}
      />
      <text
        x={labelX}
        y={cy - 9}
        textAnchor={labelAnchor}
        dominantBaseline="middle"
        {...styles.nodeLabel}
      >
        {payload?.name}
      </text>
      <circle
        cx={badgeCx}
        cy={badgeCy}
        r={badgeR}
        fill={color}
        fillOpacity={0.95}
      />
      <text
        x={badgeCx}
        y={badgeCy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        {...styles.badgeText}
      >
        {value}
      </text>
    </g>
  );
};
