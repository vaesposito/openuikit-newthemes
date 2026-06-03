import { Box, useTheme } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { ScatterChart, ScatterChartProps } from "./scatter-chart";

const meta: Meta<typeof ScatterChart> = {
  title: "Charts/Scatter Chart",
  component: ScatterChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScatterChart>;

const SERIES_A = Array.from({ length: 18 }, (_, i) => ({
  x: 10 + i * 4 + (i % 3) * 3,
  y: 30 + Math.round(Math.sin(i / 2) * 22) + (i % 4) * 6,
  z: 60 + (i % 5) * 80,
  name: `Asset ${i + 1}`,
}));

const SERIES_B = Array.from({ length: 14 }, (_, i) => ({
  x: 20 + i * 5,
  y: 60 + Math.round(Math.cos(i / 2) * 18) + (i % 3) * 8,
  z: 40 + (i % 4) * 70,
  name: `Threat ${i + 1}`,
}));

const SAMPLE: ScatterChartProps = {
  series: [
    { name: "Assets", data: SERIES_A },
    { name: "Threats", data: SERIES_B },
  ],
  band: {
    x1: 55,
    x2: 95,
    y1: 60,
    y2: 100,
    label: "High risk",
  },
};

const BasicScatterChart = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 320,
        width: 520,
        p: 1.5,
        background: theme.palette.vars.baseBackgroundMedium,
        borderRadius: "12px",
      }}
    >
      <ScatterChart {...SAMPLE} />
    </Box>
  );
};

export const Basic: Story = {
  render: () => <BasicScatterChart />,
};
