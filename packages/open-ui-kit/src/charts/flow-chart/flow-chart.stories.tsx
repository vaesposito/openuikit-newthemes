import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import { FlowChart, FlowChartProps } from "./flow-chart";

const meta: Meta<typeof FlowChart> = {
  title: "Charts/Flow Chart",
  component: FlowChart,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FlowChart>;

export const FLOW_SAMPLE: FlowChartProps = {
  gates: [
    {
      id: "g1",
      label: "GATE 1",
      title: "Eligibility Verification",
      timestamp: "00:25 UTC",
    },
    {
      id: "g2",
      label: "GATE 2",
      title: "Eligibility Condition",
      timestamp: "00:38 UTC",
      alert: { label: "12 Trajectories Failed" },
    },
    {
      id: "g3",
      label: "GATE 3",
      title: "Reasoning",
      timestamp: "00:38 UTC",
      alert: { label: "7/9 Arithmetic Failures" },
    },
    { id: "verdict", label: "VERDICT", alignEnd: true },
  ],
  nodes: [
    {
      id: "q1",
      label: "Did the agent verify eligibility?",
      column: 0,
      row: 0.55,
    },
    { id: "q2", label: "Was Eligibility Condition used?", column: 1, row: 0.4 },
    {
      id: "canceled",
      label: "Canceled without check",
      column: 1,
      row: 0.95,
      variant: "fail",
    },
    {
      id: "arith",
      label: "Was Arithmetic Correct?",
      column: 2,
      row: 0.16,
      variant: "amber",
    },
    {
      id: "reason",
      label: "Was the stated reason covered?",
      column: 2,
      row: 0.78,
    },
    {
      id: "passed",
      label: "Passed",
      column: 3,
      row: 0.3,
      variant: "verdict-pass",
      width: 120,
      height: 56,
    },
    {
      id: "failed",
      label: "Failed",
      column: 3,
      row: 0.92,
      variant: "verdict-fail",
      width: 120,
      height: 56,
    },
  ],
  links: [
    {
      source: "q1",
      target: "q2",
      tone: "pass",
      badge: { count: "38", label: "Yes" },
      weight: 26,
    },
    {
      source: "q1",
      target: "canceled",
      tone: "fail",
      badge: { count: "12", label: "No" },
      weight: 18,
    },
    {
      source: "q2",
      target: "arith",
      tone: "pass",
      pill: { label: "Insurance", count: "18 Trajectories", t: 0.52 },
      weight: 20,
    },
    {
      source: "q2",
      target: "reason",
      tone: "pass",
      pill: { label: "24h", count: "9 Trajectories", t: 0.4 },
      weight: 14,
    },
    {
      source: "q2",
      target: "reason",
      tone: "pass",
      pill: { label: "Business", count: "5 Trajectories", t: 0.74 },
      weight: 16,
    },
    {
      source: "arith",
      target: "passed",
      tone: "pass",
      badge: { count: "38", label: "Yes" },
      weight: 20,
    },
    {
      source: "arith",
      target: "failed",
      tone: "fail",
      badge: { count: "12", label: "No" },
      weight: 14,
    },
    {
      source: "reason",
      target: "failed",
      tone: "fail",
      badge: { count: "12", label: "No" },
      weight: 16,
    },
    { source: "reason", target: "passed", tone: "pass", weight: 14 },
  ],
};

const BasicFlowChart = () => (
  <Box sx={{ width: 1024, height: 480 }}>
    <FlowChart {...FLOW_SAMPLE} />
  </Box>
);

export const Basic: Story = {
  render: () => <BasicFlowChart />,
};
