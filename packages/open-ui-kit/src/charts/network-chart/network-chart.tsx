/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { Box, useTheme, type Theme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { labelStyle, lightenHex, networkStyles, nodeGlow } from "./styles";

export interface NetworkNode {
  id: string;
  label: string;
  /** e.g. "agent" | "tool" | "llm" — drives the node color. */
  type?: string;
  /** "error" renders the node in the negative/error color. */
  status?: "error" | "default";
}

export interface NetworkLink {
  source: string;
  target: string;
}

export interface NetworkChartProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  /** Show text labels under nodes. Defaults to true. */
  showLabels?: boolean;
}

interface SimNode extends SimulationNodeDatum, NetworkNode {
  degree: number;
}
type SimLink = SimulationLinkDatum<SimNode>;

const colorForNode = (node: NetworkNode, theme: Theme): string => {
  if (node.status === "error") {
    return theme.palette.vars.negativeBackgroundDefault;
  }
  // Purple agent/tool family from accent tokens (matches the OXP graph).
  switch (node.type) {
    case "tool":
      return theme.palette.vars.accentADefault; // lavender
    case "llm":
      return theme.palette.vars.accentDDefault; // purple
    case "agent":
    default:
      return theme.palette.vars.accentDDefault; // purple
  }
};

const radiusForDegree = (degree: number): number =>
  Math.min(22, 9 + degree * 2.5);

/**
 * Force-directed agent/tool network graph (OXP "agent network"). Layout is
 * computed with d3-force and rendered as SVG: purple glowing nodes, a red
 * error node, translucent links and Inter labels over a glass surface.
 */
export const NetworkChart = ({
  nodes,
  links,
  showLabels = true,
}: NetworkChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Static layout: run the simulation to completion, then render.
  const layout = useMemo(() => {
    const { width, height } = size;
    if (!width || !height) return null;

    const degree: Record<string, number> = {};
    links.forEach((l) => {
      degree[l.source] = (degree[l.source] ?? 0) + 1;
      degree[l.target] = (degree[l.target] ?? 0) + 1;
    });

    const simNodes: SimNode[] = nodes.map((n) => ({
      ...n,
      degree: degree[n.id] ?? 0,
    }));
    const simLinks: SimLink[] = links.map((l) => ({
      source: l.source,
      target: l.target,
    }));

    const sim = forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance(78)
          .strength(0.55),
      )
      .force("charge", forceManyBody<SimNode>().strength(-200))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide<SimNode>().radius(34))
      .stop();

    for (let i = 0; i < 320; i += 1) sim.tick();

    // Clamp inside bounds, accounting for node radius + label space.
    const pad = 28;
    simNodes.forEach((n) => {
      n.x = Math.max(pad, Math.min(width - pad, n.x ?? width / 2));
      n.y = Math.max(pad, Math.min(height - pad, n.y ?? height / 2));
    });

    return { nodes: simNodes, links: simLinks };
  }, [nodes, links, size]);

  const styles = networkStyles(theme, isIoc);

  // Unique node colors → one radial gradient def each (sphere highlight).
  const gradientColors = useMemo(() => {
    const set = new Set<string>();
    nodes.forEach((n) => set.add(colorForNode(n, theme)));
    return Array.from(set);
  }, [nodes, theme]);

  const gradientId = (color: string) =>
    `network-node-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <Box ref={containerRef} sx={styles.container}>
      {layout && (
        <svg
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          <defs>
            {gradientColors.map((color) => (
              <radialGradient
                key={gradientId(color)}
                id={gradientId(color)}
                cx="35%"
                cy="30%"
                r="75%"
              >
                <stop offset="0%" stopColor={lightenHex(color, 0.45)} />
                <stop offset="100%" stopColor={color} />
              </radialGradient>
            ))}
          </defs>

          {/* Links — subtle translucent lines */}
          {layout.links.map((l, i) => {
            const s = l.source as SimNode;
            const t = l.target as SimNode;
            return (
              <line
                key={`link-${i}`}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={theme.palette.vars.baseTextWeak}
                strokeOpacity={0.22}
                strokeWidth={1}
              />
            );
          })}

          {/* Nodes */}
          {layout.nodes.map((n) => {
            const color = colorForNode(n, theme);
            const r = radiusForDegree(n.degree);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={`url(#${gradientId(color)})`}
                  stroke={color}
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  style={isIoc ? { filter: nodeGlow(color) } : undefined}
                />
                {showLabels && (
                  <text
                    x={n.x}
                    y={(n.y ?? 0) + r + 13}
                    textAnchor="middle"
                    {...labelStyle(theme)}
                  >
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}
    </Box>
  );
};
