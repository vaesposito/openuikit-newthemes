/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";

export interface SankeyLinkPayload {
  source?: { index?: number };
  target?: { index?: number };
  value?: number;
}

export interface CustomLinkProps {
  sourceX?: number;
  sourceY?: number;
  sourceControlX?: number;
  targetControlX?: number;
  targetX?: number;
  targetY?: number;
  linkWidth?: number;
  index?: number;
  payload?: SankeyLinkPayload;
  // injected by us
  colors: string[];
}

/**
 * Sankey link rendered as a gradient ribbon flowing from the source node's
 * color to the target node's color via an SVG linearGradient def.
 */
export const CustomLink = ({
  sourceX = 0,
  sourceY = 0,
  sourceControlX = 0,
  targetControlX = 0,
  targetX = 0,
  targetY = 0,
  linkWidth = 0,
  index = 0,
  payload,
  colors,
}: CustomLinkProps) => {
  const [hovered, setHovered] = useState(false);

  const sourceColor = colors[(payload?.source?.index ?? 0) % colors.length];
  const targetColor = colors[(payload?.target?.index ?? 0) % colors.length];
  const gradientId = `sankey-link-gradient-${index}`;

  const d = `M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={sourceColor} />
          <stop offset="100%" stopColor={targetColor} />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={linkWidth}
        strokeOpacity={hovered ? 0.6 : 0.38}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transition: "stroke-opacity 0.15s ease" }}
      />
    </g>
  );
};
