/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
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
  /**
   * Enable drag, hover-highlight and tooltips with a live force simulation.
   * Defaults to true. When false, a static pre-computed layout is rendered.
   */
  interactive?: boolean;
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

const PAD_X = 70;
const PAD_Y = 46;

/**
 * Force-directed agent/tool network graph (OXP "agent network"). A live
 * d3-force simulation renders soft, gently glowing bubble nodes (color-coded by
 * category, with a red error node), translucent links and Inter labels over a
 * transparent canvas. Nodes are draggable; hovering a node highlights it and
 * its neighbours (dimming the rest) and shows a tooltip.
 */
export const NetworkChart = ({
  nodes,
  links,
  legend,
  showLabels = true,
  height = 520,
  interactive = true,
}: NetworkChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const graphRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Live simulation + node/link instances persisted across renders.
  const simRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const linksRef = useRef<SimLink[]>([]);
  const dragIdRef = useRef<string | null>(null);
  // Re-render trigger on each simulation tick.
  const [, setFrame] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const clamp = (n: SimNode) => {
    n.x = Math.max(PAD_X, Math.min(width - PAD_X, n.x ?? width / 2));
    n.y = Math.max(PAD_Y, Math.min(height - PAD_Y, n.y ?? height / 2));
  };

  // Build / rebuild the simulation when data or canvas size changes.
  useEffect(() => {
    if (!width || !height) return undefined;

    const degree: Record<string, number> = {};
    links.forEach((l) => {
      degree[l.source] = (degree[l.source] ?? 0) + 1;
      degree[l.target] = (degree[l.target] ?? 0) + 1;
    });

    // Preserve existing positions (by id) so resize/data tweaks don't jump.
    const prev = new Map(nodesRef.current.map((n) => [n.id, n]));
    const simNodes: SimNode[] = nodes.map((n, i) => {
      const p = prev.get(n.id);
      return {
        ...n,
        degree: degree[n.id] ?? 0,
        x: p?.x ?? width / 2 + Math.cos(i) * 40,
        y: p?.y ?? height / 2 + Math.sin(i) * 40,
      };
    });
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

    // Pre-warm to a settled layout (no per-tick re-render while warming).
    for (let i = 0; i < 320; i += 1) sim.tick();
    simNodes.forEach(clamp);

    nodesRef.current = simNodes;
    linksRef.current = simLinks;
    simRef.current = sim;

    if (interactive) {
      sim.on("tick", () => {
        simNodes.forEach(clamp);
        setFrame((f) => f + 1);
      });
    }
    // Render the (warmed) layout once.
    setFrame((f) => f + 1);

    return () => {
      sim.on("tick", null);
      sim.stop();
      simRef.current = null;
    };
  }, [nodes, links, width, height, interactive]);

  const styles = networkStyles(theme, isIoc);

  // Adjacency for hover-highlight.
  const adjacency = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    links.forEach((l) => {
      (m[l.source] ??= new Set()).add(l.target);
      (m[l.target] ??= new Set()).add(l.source);
    });
    return m;
  }, [links]);

  // Unique node colors → one radial gradient def each (soft sphere highlight).
  const gradientColors = useMemo(() => {
    const set = new Set<string>();
    nodes.forEach((n) => set.add(colorForNode(n, theme)));
    return Array.from(set);
  }, [nodes, theme]);

  const gradientId = (color: string) =>
    `network-node-${color.replace(/[^a-z0-9]/gi, "")}`;

  const toSvg = (e: ReactPointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (e.clientX - rect.left) * (width / Math.max(rect.width, 1)),
      y: (e.clientY - rect.top) * (height / Math.max(rect.height, 1)),
    };
  };

  const onNodePointerDown = (e: ReactPointerEvent, node: SimNode) => {
    if (!interactive) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragIdRef.current = node.id;
    setDraggingId(node.id);
    setHoveredId(node.id);
    const p = toSvg(e);
    node.fx = p.x;
    node.fy = p.y;
    simRef.current?.alphaTarget(0.3).restart();
  };

  const onNodePointerMove = (e: ReactPointerEvent, node: SimNode) => {
    if (dragIdRef.current !== node.id) return;
    const p = toSvg(e);
    node.fx = p.x;
    node.fy = p.y;
  };

  const onNodePointerUp = (e: ReactPointerEvent, node: SimNode) => {
    if (dragIdRef.current !== node.id) return;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    dragIdRef.current = null;
    setDraggingId(null);
    // Release the pin so the node settles back into the layout.
    node.fx = null;
    node.fy = null;
    simRef.current?.alphaTarget(0);
  };

  const simNodes = nodesRef.current;
  const simLinks = linksRef.current;
  const ready = width > 0 && simNodes.length > 0;
  const activeId = hoveredId;
  const hoveredNode = activeId
    ? simNodes.find((n) => n.id === activeId)
    : undefined;
  const isNeighbor = (id: string) =>
    activeId != null && (id === activeId || adjacency[activeId]?.has(id));

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
        {ready && (
          <svg
            ref={svgRef}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{ touchAction: "none" }}
          >
            <defs>
              {gradientColors.map((color) => (
                <radialGradient
                  key={gradientId(color)}
                  id={gradientId(color)}
                  cx="36%"
                  cy="30%"
                  r="72%"
                >
                  <stop
                    offset="0%"
                    stopColor={lightenHex(color, 0.28)}
                    stopOpacity={0.9}
                  />
                  <stop offset="65%" stopColor={color} stopOpacity={0.52} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                </radialGradient>
              ))}
            </defs>

            {/* Links — subtle translucent lines */}
            {simLinks.map((l, i) => {
              const s = l.source as SimNode;
              const t = l.target as SimNode;
              const active =
                activeId == null || s.id === activeId || t.id === activeId;
              return (
                <line
                  key={`link-${i}`}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={theme.palette.vars.baseTextWeak}
                  strokeOpacity={activeId == null ? 0.18 : active ? 0.5 : 0.05}
                  strokeWidth={active && activeId != null ? 1.4 : 1}
                />
              );
            })}

            {/* Nodes */}
            {simNodes.map((n) => {
              const color = colorForNode(n, theme);
              const r = radiusForDegree(n.degree);
              const isError = n.status === "error";
              const dimmed = activeId != null && !isNeighbor(n.id);
              const focused = activeId === n.id;
              return (
                <g
                  key={n.id}
                  opacity={dimmed ? 0.22 : 1}
                  style={{
                    cursor: interactive
                      ? draggingId === n.id
                        ? "grabbing"
                        : "grab"
                      : "default",
                    transition: "opacity 120ms ease",
                  }}
                  onPointerDown={(e) => onNodePointerDown(e, n)}
                  onPointerMove={(e) => onNodePointerMove(e, n)}
                  onPointerUp={(e) => onNodePointerUp(e, n)}
                  onPointerEnter={() => {
                    if (!dragIdRef.current) setHoveredId(n.id);
                  }}
                  onPointerLeave={() => {
                    if (!dragIdRef.current) setHoveredId(null);
                  }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r}
                    fill={`url(#${gradientId(color)})`}
                    stroke={color}
                    strokeOpacity={isError ? 0.85 : focused ? 0.7 : 0.32}
                    strokeWidth={isError ? 2 : focused ? 1.5 : 1}
                    style={
                      isIoc
                        ? { filter: nodeGlow(color, focused || isError) }
                        : undefined
                    }
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

        {/* Hover tooltip */}
        {hoveredNode && (
          <Box
            sx={{
              position: "absolute",
              left: hoveredNode.x ?? 0,
              top:
                (hoveredNode.y ?? 0) - radiusForDegree(hoveredNode.degree) - 10,
              transform: "translate(-50%, -100%)",
              px: 1.25,
              py: 0.75,
              borderRadius: 1.5,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              background: withAlpha(
                theme.palette.vars.baseBackgroundStrong,
                0.92,
              ),
              border: `1px solid ${withAlpha(
                colorForNode(hoveredNode, theme),
                0.5,
              )}`,
              backdropFilter: "blur(6px)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
              zIndex: 2,
            }}
          >
            <Typography
              component="div"
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                lineHeight: 1.3,
                color: theme.palette.vars.baseTextStrong,
              }}
            >
              {hoveredNode.label}
            </Typography>
            {(hoveredNode.status === "error" || hoveredNode.type) && (
              <Typography
                component="div"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  lineHeight: 1.3,
                  textTransform: "capitalize",
                  color:
                    hoveredNode.status === "error"
                      ? theme.palette.vars.negativeBackgroundDefault
                      : theme.palette.vars.baseTextWeak,
                }}
              >
                {hoveredNode.status === "error" ? "Error" : hoveredNode.type}
              </Typography>
            )}
          </Box>
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
