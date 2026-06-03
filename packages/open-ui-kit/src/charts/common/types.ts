/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import type { ContentType } from "recharts/types/component/Tooltip";
import { BarChart } from "../bar-chart/bar-chart";
import { HorizontalBarChart } from "../horizontal-bar-chart/horizontal-bar-chart";
import { DonutChart, DonutProps } from "../donut-chart/donut-chart";
import { GaugeChart, GaugeChartProps } from "../gauge-chart/gauge-chart";
import { LineChart } from "../line-chart/line-chart";
import { BarGraph, BarGraphProps } from "../bar-graph/bar-graph";
import { ScatterChart } from "../scatter-chart/scatter-chart";
import { SankeyChart } from "../sankey-chart/sankey-chart";
import { MeterChart } from "../meter-chart/meter-chart";
import { NetworkChart } from "../network-chart/network-chart";
import { FlowChart } from "../flow-chart/flow-chart";
import type { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  icon?: React.ElementType;
}

export interface TableChartDataItem {
  name: string;
  value: number;
  color: string;
}

export interface ChartCategory {
  name: string;
  color?: string;
}

export interface ChartCategoryItem {
  date: string;
  [key: string]: number | string;
}

export interface BarGraphItem {
  value: ReactNode;
  barData: {
    [barKey: string]: string | number;
  };
}

export interface ChartProps {
  data:
    | ChartDataItem[]
    | ChartCategoryItem[]
    | BarGraphItem[]
    | TableChartDataItem[];
  showTooltip?: boolean;
  categories?: ChartCategory[];
  customTooltip?: ContentType<number, string>;
}

export enum ChartType {
  VERTICAL_BAR = "vertical_bar",
  HORIZONTAL_BAR = "horizontal_bar",
  DONUT = "donut",
  GAUGE = "gauge",
  LINE = "line",
  BAR_GRAPH = "bar_graph",
  SCATTER = "scatter",
  SANKEY = "sankey",
  METER = "meter",
  NETWORK = "network",
  FLOW = "flow",
}

export const ChartTypeComponents: {
  [key: string]: React.ComponentType<ChartProps>;
} = {
  [ChartType.VERTICAL_BAR]: BarChart,
  [ChartType.HORIZONTAL_BAR]: HorizontalBarChart,
  [ChartType.DONUT]: DonutChart,
  [ChartType.GAUGE]: GaugeChart,
  [ChartType.LINE]: LineChart,
  [ChartType.BAR_GRAPH]: BarGraph,
  // Scatter / Sankey / Meter use their own richer prop shapes (x-y series,
  // flow graphs, single-value meters) rather than the shared ChartProps; cast
  // so they can still be looked up by ChartType in this registry.
  [ChartType.SCATTER]:
    ScatterChart as unknown as React.ComponentType<ChartProps>,
  [ChartType.SANKEY]: SankeyChart as unknown as React.ComponentType<ChartProps>,
  [ChartType.METER]: MeterChart as unknown as React.ComponentType<ChartProps>,
  [ChartType.NETWORK]:
    NetworkChart as unknown as React.ComponentType<ChartProps>,
  [ChartType.FLOW]: FlowChart as unknown as React.ComponentType<ChartProps>,
};

export type ConditionalPropsByType =
  | {
      type: ChartType.BAR_GRAPH;
      handleClick?: CategoricalChartFunc;
    }
  | {
      type: ChartType.DONUT;
      handleClick?: (sliceData: ChartDataItem) => void;
    }
  | {
      type: ChartType.HORIZONTAL_BAR;
      handleClick?: (sliceData: ChartDataItem) => void;
    }
  | {
      type: ChartType.VERTICAL_BAR;
      handleClick?: (sliceData: ChartDataItem) => void;
    }
  | {
      type: ChartType;
      handleClick?: never;
    };

export type ExtendedChartProps = GaugeChartProps &
  Omit<DonutProps, "handleClick"> &
  Omit<BarGraphProps, "handleClick">;
