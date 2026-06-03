import { Box, Stack, useTheme } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { MeterChart } from "./meter-chart";

const meta: Meta<typeof MeterChart> = {
  title: "Charts/Meter Chart",
  component: MeterChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MeterChart>;

const BasicMeterChart = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 360,
        p: 2,
        background: theme.palette.vars.baseBackgroundMedium,
        borderRadius: "12px",
      }}
    >
      <Stack spacing={3}>
        <MeterChart value={22} label="Risk score" />
        <MeterChart value={58} label="Coverage" />
        <MeterChart value={91} label="Health" />
      </Stack>
    </Box>
  );
};

export const Basic: Story = {
  render: () => <BasicMeterChart />,
};
