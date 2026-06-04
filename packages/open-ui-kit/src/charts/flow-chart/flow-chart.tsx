/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, useTheme, type Theme } from "@mui/material";
import { isIocTheme } from "../common/is-ioc-theme";
import { flowContainer, lighten, withAlpha } from "./styles";

export type FlowTone = "pass" | "fail" | "neutral";
export type FlowNodeVariant =
  | "default"
  | "amber"
  | "fail"
  | "verdict-pass"
  | "verdict-fail";

export interface FlowGate {
  id: string;
  /** Eyebrow label, e.g. "GATE 1" / "VERDICT". */
  label: string;
  /** Title beneath the eyebrow, e.g. "Eligibility Verification". */
  title?: string;
  /** Timestamp line, e.g. "00:25 UTC". */
  timestamp?: string;
  /** Right-align the labels (used for the trailing VERDICT column). */
  alignEnd?: boolean;
  /** Red-triangle alert marker hanging below the divider. */
  alert?: { label: string };
}

export interface FlowNode {
  id: string;
  label: string;
  /** Column index (aligns under gate columns). */
  column: number;
  /** Vertical position 0 (top) .. 1 (bottom) within the body. */
  row: number;
  variant?: FlowNodeVariant;
  width?: number;
  height?: number;
}

export interface FlowLink {
  source: string;
  target: string;
  /** pass → teal, fail → red, neutral → muted. */
  tone: FlowTone;
  /** Circular count badge near the source ("38" / "Yes"). */
  badge?: { count: string; label?: string };
  /**
   * Category pill placed along the ribbon ("Insurance" / "18 Trajectories").
   * `t` (0..1) controls how far along the curve the pill sits (default 0.5).
   */
  pill?: { label: string; count?: string; t?: number };
  /** Ribbon thickness in px. */
  weight?: number;
}

export interface FlowChartProps {
  gates: FlowGate[];
  nodes: FlowNode[];
  links: FlowLink[];
  /** Fixed drawing height in px. Defaults to 460. */
  height?: number;
}

const HEADER_H = 132;
const DIVIDER_Y = 96;
const PAD_X = 28;
const NODE_W = 140;
const NODE_H = 86;

/**
 * Column-center fractions (0..1 across the drawable span). The reference
 * spaces Gate 2 → Gate 3 wider so the category pills have room to breathe;
 * fall back to even spacing for other column counts.
 */
const columnFractions = (numCols: number): number[] => {
  if (numCols === 4) return [0, 0.27, 0.64, 1];
  return Array.from({ length: numCols }, (_, i) =>
    numCols > 1 ? i / (numCols - 1) : 0,
  );
};

const toneColors = (tone: FlowTone, theme: Theme): string => {
  switch (tone) {
    case "pass":
      return theme.palette.vars.accentJDefault; // teal
    case "fail":
      return theme.palette.vars.negativeBackgroundDefault; // red
    case "neutral":
    default:
      return theme.palette.vars.baseTextWeak;
  }
};

const nodeFill = (variant: FlowNodeVariant, theme: Theme) => {
  const v = theme.palette.vars;
  switch (variant) {
    case "amber":
      return {
        fill: withAlpha(v.warningBackgroundDefault, 0.3),
        stroke: withAlpha(v.warningBackgroundDefault, 0.62),
      };
    case "fail":
      return {
        fill: withAlpha(v.negativeBackgroundDefault, 0.26),
        stroke: withAlpha(v.negativeBackgroundDefault, 0.58),
      };
    case "verdict-pass":
      return {
        fill: withAlpha(v.accentJDefault, 0.3),
        stroke: withAlpha(v.accentJDefault, 0.62),
      };
    case "verdict-fail":
      return {
        fill: withAlpha(v.infoBackgroundDefault, 0.32),
        stroke: withAlpha(v.infoBackgroundDefault, 0.55),
      };
    case "default":
    default:
      return {
        fill: withAlpha(v.baseBackgroundStrong, 0.78),
        stroke: "rgba(255,255,255,0.12)",
      };
  }
};

/**
 * OXP "gated decision flow" — a timeline-headed Sankey/decision diagram.
 * A top timeline lists gates (cyan eyebrow + title + UTC time) over a divider
 * with red-triangle alert markers; dark translucent decision nodes are linked
 * by thick gradient ribbons (teal pass / red fail) carrying circular count
 * badges and mid-ribbon category pills. Fully token-driven.
 */
export const FlowChart = ({
  gates,
  nodes,
  links,
  height = 460,
}: FlowChartProps) => {
  const theme = useTheme();
  const isIoc = isIocTheme(theme);
  const vars = theme.palette.vars;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = useMemo(() => {
    if (!width) return null;
    const numCols = Math.max(gates.length, 1);
    const leftInset = PAD_X + NODE_W / 2;
    const rightInset = PAD_X + NODE_W / 2;
    const span = Math.max(width - leftInset - rightInset, 1);
    const fracs = columnFractions(numCols);
    const colX = (c: number) =>
      leftInset + (fracs[c] ?? (numCols > 1 ? c / (numCols - 1) : 0)) * span;

    const bodyTop = HEADER_H;
    const bodyBottom = height - 24;
    const nodeCenterY = (row: number) =>
      bodyTop + NODE_H / 2 + row * (bodyBottom - bodyTop - NODE_H);

    const placed: Record<
      string,
      { x: number; y: number; w: number; h: number; node: FlowNode }
    > = {};
    nodes.forEach((n) => {
      const w = n.width ?? NODE_W;
      const h = n.height ?? NODE_H;
      placed[n.id] = {
        x: colX(n.column),
        y: nodeCenterY(n.row),
        w,
        h,
        node: n,
      };
    });

    // Distribute ribbon attach points across each node edge so they fan out.
    const outIdx: Record<string, number> = {};
    const outCount: Record<string, number> = {};
    const inIdx: Record<string, number> = {};
    const inCount: Record<string, number> = {};
    links.forEach((l) => {
      outCount[l.source] = (outCount[l.source] ?? 0) + 1;
      inCount[l.target] = (inCount[l.target] ?? 0) + 1;
    });

    const ribbons = links.map((l, i) => {
      const s = placed[l.source];
      const t = placed[l.target];
      if (!s || !t) return null;
      const oi = (outIdx[l.source] = (outIdx[l.source] ?? 0) + 1);
      const ii = (inIdx[l.target] = (inIdx[l.target] ?? 0) + 1);
      const oc = outCount[l.source] ?? 1;
      const ic = inCount[l.target] ?? 1;
      const spread = (h: number, idx: number, count: number) =>
        count <= 1 ? 0 : (idx / (count + 1) - 0.5) * (h * 0.6);
      const sx = s.x + s.w / 2;
      const sy = s.y + spread(s.h, oi, oc);
      const tx = t.x - t.w / 2;
      const ty = t.y + spread(t.h, ii, ic);
      const mx = (sx + tx) / 2;
      const path = `M ${sx},${sy} C ${mx},${sy} ${mx},${ty} ${tx},${ty}`;
      return { l, i, sx, sy, tx, ty, mx, path };
    });

    return { placed, ribbons, colX, numCols };
  }, [width, height, gates, nodes, links]);

  const gradId = (tone: FlowTone) => `flow-grad-${tone}`;

  // Evaluate the cubic bezier used for each ribbon
  // (P0=(sx,sy), C1=(mx,sy), C2=(mx,ty), P3=(tx,ty)) at parameter t∈[0,1].
  const pointOnCurve = (
    r: { sx: number; sy: number; mx: number; tx: number; ty: number },
    t: number,
  ) => {
    const mt = 1 - t;
    const x =
      mt * mt * mt * r.sx +
      3 * mt * mt * t * r.mx +
      3 * mt * t * t * r.mx +
      t * t * t * r.tx;
    const y =
      mt * mt * mt * r.sy +
      3 * mt * mt * t * r.sy +
      3 * mt * t * t * r.ty +
      t * t * t * r.ty;
    return { x, y };
  };

  return (
    <Box ref={containerRef} sx={flowContainer(isIoc)}>
      {layout && (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            {(["pass", "fail", "neutral"] as FlowTone[]).map((tone) => {
              const c = toneColors(tone, theme);
              return (
                <linearGradient
                  key={tone}
                  id={gradId(tone)}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={withAlpha(c, 0.85)} />
                  <stop offset="100%" stopColor={lighten(c, 0.18)} />
                </linearGradient>
              );
            })}
          </defs>

          {/* ── Top timeline header ───────────────────────────────── */}
          <line
            x1={PAD_X}
            y1={DIVIDER_Y}
            x2={width - PAD_X}
            y2={DIVIDER_Y}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={1}
          />
          {gates.map((g, c) => {
            const cx = layout.colX(c);
            const anchor = g.alignEnd ? "end" : "start";
            const tx = g.alignEnd ? cx + NODE_W / 2 : cx - NODE_W / 2;
            return (
              <g key={g.id}>
                <text
                  x={tx}
                  y={42}
                  textAnchor={anchor}
                  fontFamily="Inter, sans-serif"
                  fontSize={12}
                  fontWeight={700}
                  letterSpacing="0.12em"
                  fill={vars.accentHDefault}
                >
                  {g.label}
                </text>
                {g.title && (
                  <text
                    x={tx}
                    y={64}
                    textAnchor={anchor}
                    fontFamily="Inter, sans-serif"
                    fontSize={14}
                    fontWeight={500}
                    fill={vars.baseTextStrong}
                  >
                    {g.title}
                  </text>
                )}
                {g.timestamp && (
                  <text
                    x={tx}
                    y={82}
                    textAnchor={anchor}
                    fontFamily="Inter, sans-serif"
                    fontSize={11}
                    fill={vars.baseTextWeak}
                  >
                    {g.timestamp}
                  </text>
                )}
                {g.alert && (
                  <g>
                    <circle
                      cx={cx}
                      cy={DIVIDER_Y + 24}
                      r={11}
                      fill={withAlpha(vars.negativeBackgroundDefault, 0.16)}
                      stroke={vars.negativeBackgroundDefault}
                      strokeWidth={1.5}
                    />
                    <path
                      d={`M ${cx},${DIVIDER_Y + 19} L ${cx + 4.5},${DIVIDER_Y + 28} L ${cx - 4.5},${DIVIDER_Y + 28} Z`}
                      fill={vars.negativeBackgroundDefault}
                    />
                    <foreignObject
                      x={cx - 60}
                      y={DIVIDER_Y + 38}
                      width={120}
                      height={36}
                    >
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 11,
                          lineHeight: 1.25,
                          textAlign: "center",
                          color: vars.baseTextDefault,
                        }}
                      >
                        {g.alert.label}
                      </div>
                    </foreignObject>
                  </g>
                )}
              </g>
            );
          })}

          {/* ── Ribbons (soft, overlapping bezier bands) ─────────── */}
          {layout.ribbons.map((r) =>
            r ? (
              <path
                key={`rib-${r.i}`}
                d={r.path}
                fill="none"
                stroke={`url(#${gradId(r.l.tone)})`}
                strokeWidth={r.l.weight ?? 24}
                strokeLinecap="round"
                opacity={0.9}
                style={
                  isIoc
                    ? {
                        filter: `drop-shadow(0 0 2px ${withAlpha(
                          toneColors(r.l.tone, theme),
                          0.35,
                        )})`,
                      }
                    : undefined
                }
              />
            ) : null,
          )}

          {/* ── Decision nodes (drawn on top of ribbons) ─────────── */}
          {nodes.map((n) => {
            const p = layout.placed[n.id];
            if (!p) return null;
            const { fill, stroke } = nodeFill(n.variant ?? "default", theme);
            const isVerdict =
              n.variant === "verdict-pass" || n.variant === "verdict-fail";
            return (
              <g key={n.id}>
                <rect
                  x={p.x - p.w / 2}
                  y={p.y - p.h / 2}
                  width={p.w}
                  height={p.h}
                  rx={16}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={1}
                />
                <foreignObject
                  x={p.x - p.w / 2}
                  y={p.y - p.h / 2}
                  width={p.w}
                  height={p.h}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 14px",
                      boxSizing: "border-box",
                      textAlign: "center",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isVerdict ? 15 : 14,
                      fontWeight: isVerdict ? 600 : 500,
                      lineHeight: 1.25,
                      color: vars.baseTextStrong,
                    }}
                  >
                    {n.label}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* ── Mid-ribbon category pills (on top, always readable) ─ */}
          {layout.ribbons.map((r) => {
            if (!r || !r.l.pill) return null;
            const text = r.l.pill.count
              ? `${r.l.pill.label}   ${r.l.pill.count}`
              : r.l.pill.label;
            const w = text.length * 5.9 + 22;
            const { y: midY } = pointOnCurve(r, r.l.pill.t ?? 0.5);
            // Keep the pill inside the open ribbon span between the two nodes
            // so it never sits over a node's title.
            const loX = r.sx + 16 + w / 2;
            const hiX = r.tx - 16 - w / 2;
            const rawX = pointOnCurve(r, r.l.pill.t ?? 0.5).x;
            const midX =
              loX <= hiX
                ? Math.min(Math.max(rawX, loX), hiX)
                : (r.sx + r.tx) / 2;
            return (
              <g key={`pill-${r.i}`}>
                <rect
                  x={midX - w / 2}
                  y={midY - 12}
                  width={w}
                  height={24}
                  rx={12}
                  fill={withAlpha(vars.baseBackgroundStrong, 0.85)}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
                <text
                  x={midX}
                  y={midY + 3.5}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize={10.5}
                >
                  <tspan fill={vars.baseTextStrong} fontWeight={500}>
                    {r.l.pill.label}
                  </tspan>
                  {r.l.pill.count && (
                    <tspan
                      fill={vars.baseTextWeak}
                    >{`   ${r.l.pill.count}`}</tspan>
                  )}
                </text>
              </g>
            );
          })}

          {/* ── Count badges riding the ribbon near the source ───── */}
          {layout.ribbons.map((r) => {
            if (!r || !r.l.badge) return null;
            // Sit the badge a short way along the curve so the two siblings
            // from one node ride their own (diverging) ribbons instead of
            // stacking, and clear the node's text.
            const { x: bx, y: by } = pointOnCurve(r, 0.22);
            const c = toneColors(r.l.tone, theme);
            return (
              <g key={`badge-${r.i}`}>
                <circle
                  cx={bx}
                  cy={by}
                  r={16}
                  fill={c}
                  stroke={lighten(c, 0.28)}
                  strokeWidth={1}
                  style={
                    isIoc
                      ? { filter: `drop-shadow(0 0 7px ${withAlpha(c, 0.6)})` }
                      : undefined
                  }
                />
                <text
                  x={bx}
                  y={r.l.badge.label ? by - 1 : by + 4}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontSize={11.5}
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {r.l.badge.count}
                </text>
                {r.l.badge.label && (
                  <text
                    x={bx}
                    y={by + 9}
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                    fontSize={8}
                    fontWeight={600}
                    fill="#ffffff"
                  >
                    {r.l.badge.label}
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
