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
import { Box, Typography, useTheme, type Theme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import {
  labelStyle,
  legendHeading,
  lightenHex,
  mixHex,
  networkStyles,
  nodeGlow,
  withAlpha,
} from "./styles";

/** Node category — drives the bubble color family. */
export type NetworkNodeType = "agent" | "llm" | "tool" | "service";

export interface NetworkNode {
  id: string;
  label: string;
  /** Category that drives the node color. */
  type?: NetworkNodeType | string;
  /** "error" renders the node in the negative/error color (red ring). */
  status?: "error" | "default";
}

export interface NetworkLink {
  source: string;
  target: string;
}

/** A single labeled entry inside a legend group. */
export interface NetworkLegendItem {
  /** Bold name, e.g. "Moderator" / "GPT-4". */
  title: string;
  /** Muted role/subtitle, e.g. "Classification" / "Primary reasoning". */
  subtitle?: string;
}

/** A categorized group rendered in the left-hand legend panel. */
export interface NetworkLegendGroup {
  /** Uppercase heading, e.g. "AGENTS" / "LLMS" / "TOOLS". */
  heading: string;
  items: NetworkLegendItem[];
  /**
   * Visual treatment:
   *  - "card"    → dark-glass rounded cards (agents)
   *  - "pill"    → filled glass pills (LLMs)
   *  - "outline" → outlined pills (tools)
   */
  variant?: "card" | "pill" | "outline";
  /** Accent used for the group's items. Defaults per variant. */
  accent?: string;
}

export interface NetworkChartProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  /** Categorized legend groups rendered to the left of the graph. */
  legend?: NetworkLegendGroup[];
  /** Show text labels next to nodes. Defaults to true. */
  showLabels?: boolean;
  /** Fixed height (px) of the graph canvas. Defaults to 520. */
  height?: number;
}

interface SimNode extends SimulationNodeDatum, NetworkNode {
  degree: number;
}
type SimLink = SimulationLinkDatum<SimNode>;

const colorForNode = (node: NetworkNode, theme: Theme): string => {
  const v = theme.palette.vars;
  if (node.status === "error") return v.negativeBackgroundDefault; // red
  switch (node.type) {
    case "agent":
      return v.accentDDefault; // purple / violet
    case "llm":
      return v.accentGDefault; // night blue (legend only)
    case "tool":
      return v.infoBackgroundDefault; // blue
    case "service":
      // Orchid blue-magenta: violet leaning, distinct from the error red.
      return mixHex(v.accentDDefault, v.accentIDefault, 0.45);
    default:
      return v.accentDDefault;
  }
};

const radiusForDegree = (degree: number): number =>
  Math.min(30, 13 + degree * 2.6);

/**
 * Force-directed agent/tool network graph (OXP "agent network"). Layout is
 * computed with d3-force and rendered as SVG: purple glowing nodes, a red
 * error node, translucent links and Inter labels over a glass surface.
 */
export const NetworkChart = ({
  nodes,
  links,
  legend,
  showLabels = true,
  height = 520,
}: NetworkChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const graphRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const size = { width, height };

  useLayoutEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
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
          .distance(96)
          .strength(0.5),
      )
      .force("charge", forceManyBody<SimNode>().strength(-280))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "collide",
        forceCollide<SimNode>().radius((d) => radiusForDegree(d.degree) + 26),
      )
      .stop();

    for (let i = 0; i < 360; i += 1) sim.tick();

    // Clamp inside bounds, leaving generous room for node radius + labels.
    const padX = 70;
    const padY = 46;
    simNodes.forEach((n) => {
      n.x = Math.max(padX, Math.min(width - padX, n.x ?? width / 2));
      n.y = Math.max(padY, Math.min(height - padY, n.y ?? height / 2));
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
    <Box sx={styles.root}>
      {legend && legend.length > 0 && (
        <Box sx={styles.legend}>
          {legend.map((group) => (
            <LegendGroup key={group.heading} group={group} theme={theme} />
          ))}
        </Box>
      )}
      <Box ref={graphRef} sx={{ ...styles.graph, height }}>
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
                  strokeOpacity={0.2}
                  strokeWidth={1}
                />
              );
            })}

            {/* Nodes */}
            {layout.nodes.map((n) => {
              const color = colorForNode(n, theme);
              const r = radiusForDegree(n.degree);
              const isError = n.status === "error";
              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    fill={`url(#${gradientId(color)})`}
                    stroke={color}
                    strokeOpacity={isError ? 0.95 : 0.55}
                    strokeWidth={isError ? 2.5 : 1}
                    style={isIoc ? { filter: nodeGlow(color) } : undefined}
                  />
                  {showLabels && (
                    <text
                      x={n.x}
                      y={(n.y ?? 0) + r + 15}
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
    </Box>
  );
};

/** Renders one categorized legend group (cards / pills / outline pills). */
const LegendGroup = ({
  group,
  theme,
}: {
  group: NetworkLegendGroup;
  theme: Theme;
}) => {
  const v = theme.palette.vars;
  const variant = group.variant ?? "card";
  const accent = group.accent ?? v.accentHDefault;

  return (
    <Box>
      <Typography component="div" sx={legendHeading(theme)}>
        {group.heading}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {group.items.map((item) => {
          const isCard = variant === "card";
          const isOutline = variant === "outline";
          return (
            <Box
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.75,
                flexWrap: "wrap",
                borderRadius: isCard ? 2.5 : 999,
                px: isCard ? 1.75 : 1.5,
                py: isCard ? 1.25 : 0.625,
                alignSelf: isCard ? "stretch" : "flex-start",
                background: isOutline
                  ? "transparent"
                  : withAlpha(v.baseBackgroundStrong, isCard ? 0.55 : 0.45),
                border: `1px solid ${
                  isOutline
                    ? withAlpha(accent, 0.55)
                    : withAlpha(accent, isCard ? 0.28 : 0.32)
                }`,
                backdropFilter: "blur(6px)",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isCard ? "0.82rem" : "0.78rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: isOutline ? accent : v.baseTextStrong,
                  ...(isCard ? { display: "block", width: "100%" } : null),
                }}
              >
                {item.title}
              </Typography>
              {item.subtitle && (
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isCard ? "0.74rem" : "0.72rem",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: isCard ? v.baseTextWeak : accent,
                  }}
                >
                  {item.subtitle}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
