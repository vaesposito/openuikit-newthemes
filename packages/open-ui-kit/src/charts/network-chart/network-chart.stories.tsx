import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { NetworkChart, NetworkChartProps } from "./network-chart";

const meta: Meta<typeof NetworkChart> = {
  title: "Charts/Network Chart",
  component: NetworkChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NetworkChart>;

const SAMPLE: NetworkChartProps = {
  nodes: [
    { id: "itinerary", label: "Itinerary Assistant", type: "agent" },
    { id: "routing", label: "Routing Assistant", type: "agent" },
    { id: "weather", label: "Weather API", type: "tool" },
    { id: "trips", label: "Trip Database", type: "tool" },
    { id: "vendor", label: "Vendor API", type: "tool" },
    { id: "hotel", label: "Hotel API", type: "tool" },
    { id: "calendar", label: "Calendar Sync", type: "tool" },
    { id: "duration", label: "Duration Calculator", type: "llm" },
    { id: "route-opt", label: "Route Optimizer", type: "llm" },
    { id: "restaurant", label: "Restaurant Finder", type: "agent" },
    { id: "flight", label: "Flight API", type: "tool", status: "error" },
  ],
  links: [
    { source: "itinerary", target: "weather" },
    { source: "itinerary", target: "trips" },
    { source: "itinerary", target: "duration" },
    { source: "itinerary", target: "restaurant" },
    { source: "routing", target: "itinerary" },
    { source: "routing", target: "vendor" },
    { source: "routing", target: "route-opt" },
    { source: "routing", target: "flight" },
    { source: "vendor", target: "hotel" },
    { source: "restaurant", target: "calendar" },
    { source: "duration", target: "route-opt" },
  ],
};

const BasicNetworkChart = () => (
  <Box sx={{ height: 420, width: 640 }}>
    <NetworkChart {...SAMPLE} />
  </Box>
);

export const Basic: Story = {
  render: () => <BasicNetworkChart />,
};
