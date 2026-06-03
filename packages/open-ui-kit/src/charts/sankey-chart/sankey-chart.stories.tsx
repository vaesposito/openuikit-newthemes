import { Box, useTheme } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { SankeyChart, SankeyChartProps } from "./sankey-chart";

const meta: Meta<typeof SankeyChart> = {
  title: "Charts/Sankey Chart",
  component: SankeyChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SankeyChart>;

const SAMPLE: SankeyChartProps = {
  data: {
    nodes: [
      { name: "Ingest" },
      { name: "Triage" },
      { name: "Enrich" },
      { name: "Resolved" },
      { name: "Escalated" },
      { name: "Closed" },
    ],
    links: [
      { source: 0, target: 1, value: 120 },
      { source: 1, target: 2, value: 80 },
      { source: 1, target: 4, value: 40 },
      { source: 2, target: 3, value: 60 },
      { source: 2, target: 4, value: 20 },
      { source: 3, target: 5, value: 60 },
      { source: 4, target: 5, value: 60 },
    ],
  },
};

const BasicSankeyChart = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: 360,
        width: 640,
        p: 1.5,
        background: theme.palette.vars.baseBackgroundMedium,
        borderRadius: "12px",
      }}
    >
      <SankeyChart {...SAMPLE} />
    </Box>
  );
};

export const Basic: Story = {
  render: () => <BasicSankeyChart />,
};
