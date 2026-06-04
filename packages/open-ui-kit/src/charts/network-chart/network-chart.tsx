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
  mixHex,
  networkStyles,
  nodeGlow,
  nodeGradientStops,
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
  /**
   * Node id this entry targets when clicked (for filtering). If omitted, the
   * entry maps to any node whose `label` matches `title` (case-insensitive).
   */
  nodeId?: string;
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
  /**
   * Node category this group targets when its heading is clicked (filters all
   * nodes of this `type`). Unioned with any node targets of its items.
   */
  type?: NetworkNodeType | string;
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

/** Stable keys identifying clickable legend entries (group header / item). */
const groupKey = (g: NetworkLegendGroup) => `g:${g.heading}`;
const itemKey = (g: NetworkLegendGroup, it: NetworkLegendItem) =>
  `i:${g.heading}:${it.title}`;

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
  // Active legend filters (entry keys). Empty → no filter.
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

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

  // Map every clickable legend entry → the set of node ids it targets.
  const legendTargets = useMemo(() => {
    const map = new Map<string, Set<string>>();
    if (!legend) return map;
    const norm = (s: string) => s.trim().toLowerCase();
    const byTitle = (title: string) =>
      nodes.filter((n) => norm(n.label) === norm(title)).map((n) => n.id);
    legend.forEach((group) => {
      const groupSet = new Set<string>();
      group.items.forEach((item) => {
        const ids = item.nodeId ? [item.nodeId] : byTitle(item.title);
        map.set(itemKey(group, item), new Set(ids));
        ids.forEach((id) => groupSet.add(id));
      });
      if (group.type) {
        nodes
          .filter((n) => n.type === group.type)
          .forEach((n) => groupSet.add(n.id));
      }
      map.set(groupKey(group), groupSet);
    });
    return map;
  }, [legend, nodes]);

  // Union of node ids targeted by all active legend filters.
  const selectedNodeIds = useMemo(() => {
    const s = new Set<string>();
    selectedKeys.forEach((k) =>
      legendTargets.get(k)?.forEach((id) => s.add(id)),
    );
    return s;
  }, [selectedKeys, legendTargets]);

  const toggleKey = (key: string) => {
    const targets = legendTargets.get(key);
    if (!targets || targets.size === 0) return; // inert entry → no-op
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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

  // Focus model: hover takes precedence, otherwise the active legend filter.
  const hoverActive = hoveredId != null;
  const filterActive = selectedNodeIds.size > 0;
  const primarySet = hoverActive
    ? new Set<string>([hoveredId as string])
    : filterActive
      ? selectedNodeIds
      : new Set<string>();
  const focusActive = primarySet.size > 0;
  const focusSet = new Set<string>(primarySet);
  if (focusActive) {
    primarySet.forEach((id) =>
      adjacency[id]?.forEach((nb) => focusSet.add(nb)),
    );
  }

  const hoveredNode = hoveredId
    ? simNodes.find((n) => n.id === hoveredId)
    : undefined;

  // Theme-aware discreet label chip (light chip in light theme, dark in dark).
  const isLight = theme.palette.mode === "light";
  const chipFill = withAlpha(
    theme.palette.vars.baseBackgroundStrong,
    isLight ? 0.82 : 0.64,
  );
  const chipStroke = withAlpha(theme.palette.vars.baseTextWeak, 0.16);

  // De-clutter labels: greedily keep non-overlapping labels by node priority.
  const labelData = simNodes.map((n) => {
    const r = radiusForDegree(n.degree);
    const w = n.label.length * 6.4 + 14;
    return {
      id: n.id,
      n,
      r,
      w,
      h: 19,
      cx: n.x ?? 0,
      cy: (n.y ?? 0) + r + 13,
    };
  });
  const visibleLabels = new Set<string>();
  const placedBoxes: { l: number; r: number; t: number; b: number }[] = [];
  [...labelData]
    .sort((a, b) => b.r - a.r || b.n.degree - a.n.degree)
    .forEach((li) => {
      const box = {
        l: li.cx - li.w / 2,
        r: li.cx + li.w / 2,
        t: li.cy - li.h / 2,
        b: li.cy + li.h / 2,
      };
      const hit = placedBoxes.some(
        (p) => !(box.r < p.l || box.l > p.r || box.b < p.t || box.t > p.b),
      );
      if (!hit) {
        placedBoxes.push(box);
        visibleLabels.add(li.id);
      }
    });
  const zOf = (id: string) =>
    id === hoveredId ? 2 : primarySet.has(id) ? 1 : 0;
  const labelsToRender = labelData
    .filter(
      (li) =>
        showLabels &&
        (visibleLabels.has(li.id) ||
          li.id === hoveredId ||
          primarySet.has(li.id)),
    )
    .sort((a, b) => zOf(a.id) - zOf(b.id));

  // Tooltip placement: flip above/below near the top edge and clamp the center
  // horizontally so the overlay never clips at the container edges.
  const TIP_W = 200;
  const tipR = hoveredNode ? radiusForDegree(hoveredNode.degree) : 0;
  const tipNX = hoveredNode?.x ?? 0;
  const tipNY = hoveredNode?.y ?? 0;
  const tipBelow = tipNY - tipR - 12 < 48;
  const tipLeft = Math.min(
    Math.max(tipNX, TIP_W / 2 + 8),
    Math.max(width - TIP_W / 2 - 8, TIP_W / 2 + 8),
  );
  const tipTop = tipBelow ? tipNY + tipR + 10 : tipNY - tipR - 10;
  const tipTransform = tipBelow
    ? "translate(-50%, 0)"
    : "translate(-50%, -100%)";

  return (
    <Box sx={styles.root}>
      {legend && legend.length > 0 && (
        <Box sx={styles.legend}>
          {legend.map((group) => (
            <LegendGroup
              key={group.heading}
              group={group}
              theme={theme}
              selectedKeys={selectedKeys}
              legendTargets={legendTargets}
              onToggle={toggleKey}
            />
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
              {gradientColors.map((color) => {
                const [inner, mid, outer] = nodeGradientStops(color, theme);
                return (
                  <radialGradient
                    key={gradientId(color)}
                    id={gradientId(color)}
                    cx="36%"
                    cy="30%"
                    r="78%"
                  >
                    {/* Opaque tint with a soft sphere highlight (dimmer in dark). */}
                    <stop offset="0%" stopColor={inner} />
                    <stop offset="55%" stopColor={mid} />
                    <stop offset="100%" stopColor={outer} />
                  </radialGradient>
                );
              })}
            </defs>

            {/* Links — drawn first so opaque nodes always sit on top */}
            {simLinks.map((l, i) => {
              const s = l.source as SimNode;
              const t = l.target as SimNode;
              const touches = primarySet.has(s.id) || primarySet.has(t.id);
              const opacity = !focusActive ? 0.18 : touches ? 0.5 : 0.05;
              return (
                <line
                  key={`link-${i}`}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={theme.palette.vars.baseTextWeak}
                  strokeOpacity={opacity}
                  strokeWidth={focusActive && touches ? 1.4 : 1}
                />
              );
            })}

            {/* Nodes — opaque pastel bubbles on top of the links */}
            {simNodes.map((n) => {
              const color = colorForNode(n, theme);
              const r = radiusForDegree(n.degree);
              const isError = n.status === "error";
              const dimmed = focusActive && !focusSet.has(n.id);
              const focused = primarySet.has(n.id);
              return (
                <circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={`url(#${gradientId(color)})`}
                  stroke={isError ? color : mixHex(color, "#000000", 0.05)}
                  strokeOpacity={isError ? 0.9 : focused ? 0.6 : 0.28}
                  strokeWidth={isError ? 2.25 : focused ? 1.6 : 1}
                  opacity={dimmed ? 0.28 : 1}
                  style={{
                    filter: isIoc
                      ? nodeGlow(color, focused || isError, !isLight)
                      : undefined,
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
                />
              );
            })}

            {/* Labels — final pass, on top of every bubble, with chip + z-order */}
            {labelsToRender.map((li) => {
              const dimmed = focusActive && !focusSet.has(li.id);
              const style = labelStyle(theme);
              return (
                <g
                  key={`label-${li.id}`}
                  opacity={dimmed ? 0.16 : 1}
                  style={{ pointerEvents: "none" }}
                >
                  <rect
                    x={li.cx - li.w / 2}
                    y={li.cy - li.h / 2}
                    width={li.w}
                    height={li.h}
                    rx={6}
                    fill={chipFill}
                    stroke={chipStroke}
                    strokeWidth={1}
                  />
                  <text
                    x={li.cx}
                    y={li.cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    {...style}
                  >
                    {li.n.label}
                  </text>
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
              left: tipLeft,
              top: tipTop,
              transform: tipTransform,
              maxWidth: TIP_W,
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

/**
 * Renders one categorized legend group (cards / pills / outline pills). Each
 * entry that maps to graph node(s) is a toggle button that filters/focuses the
 * graph; the heading filters the whole category. Multi-select is supported.
 */
const LegendGroup = ({
  group,
  theme,
  selectedKeys,
  legendTargets,
  onToggle,
}: {
  group: NetworkLegendGroup;
  theme: Theme;
  selectedKeys: Set<string>;
  legendTargets: Map<string, Set<string>>;
  onToggle: (key: string) => void;
}) => {
  const v = theme.palette.vars;
  const variant = group.variant ?? "card";
  const accent = group.accent ?? v.accentHDefault;
  const isCard = variant === "card";
  const isOutline = variant === "outline";

  const hasTargets = (key: string) => (legendTargets.get(key)?.size ?? 0) > 0;
  const gKey = groupKey(group);
  const gInteractive = hasTargets(gKey);
  const gActive = selectedKeys.has(gKey);

  const focusRing = {
    "&:focus-visible": {
      outline: `2px solid ${withAlpha(accent, 0.7)}`,
      outlineOffset: 2,
    },
  } as const;

  return (
    <Box>
      <Box
        component="button"
        type="button"
        disabled={!gInteractive}
        aria-pressed={gInteractive ? gActive : undefined}
        onClick={() => onToggle(gKey)}
        sx={{
          ...legendHeading(theme),
          display: "block",
          textAlign: "left",
          width: "auto",
          appearance: "none",
          background: "none",
          border: "none",
          p: 0,
          m: 0,
          mb: 2,
          cursor: gInteractive ? "pointer" : "default",
          color: gActive ? accent : v.baseTextStrong,
          ...(gInteractive ? focusRing : null),
        }}
      >
        {group.heading}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {group.items.map((item) => {
          const key = itemKey(group, item);
          const interactive = hasTargets(key);
          const active = selectedKeys.has(key);
          return (
            <Box
              key={item.title}
              component="button"
              type="button"
              disabled={!interactive}
              aria-pressed={interactive ? active : undefined}
              onClick={() => onToggle(key)}
              sx={{
                textAlign: "left",
                display: "flex",
                alignItems: "baseline",
                gap: 0.75,
                flexWrap: "wrap",
                borderRadius: isCard ? 2.5 : 999,
                px: isCard ? 1.75 : 1.5,
                py: isCard ? 1.25 : 0.625,
                alignSelf: isCard ? "stretch" : "flex-start",
                cursor: interactive ? "pointer" : "default",
                appearance: "none",
                font: "inherit",
                transition: "background 120ms ease, border-color 120ms ease",
                background: active
                  ? withAlpha(accent, isOutline ? 0.16 : 0.2)
                  : isOutline
                    ? "transparent"
                    : withAlpha(v.baseBackgroundStrong, isCard ? 0.55 : 0.45),
                border: `1px solid ${
                  active
                    ? withAlpha(accent, 0.8)
                    : isOutline
                      ? withAlpha(accent, 0.55)
                      : withAlpha(accent, isCard ? 0.28 : 0.32)
                }`,
                backdropFilter: "blur(6px)",
                ...(interactive
                  ? {
                      "&:hover": {
                        borderColor: withAlpha(accent, active ? 0.9 : 0.6),
                        background: active
                          ? withAlpha(accent, isOutline ? 0.22 : 0.26)
                          : withAlpha(
                              isOutline ? accent : v.baseBackgroundStrong,
                              isOutline ? 0.1 : isCard ? 0.7 : 0.6,
                            ),
                      },
                      ...focusRing,
                    }
                  : null),
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isCard ? "0.82rem" : "0.78rem",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  color: isOutline || active ? accent : v.baseTextStrong,
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
