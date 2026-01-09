/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Avatar,
  Badge,
  Divider,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Home,
  Settings,
  Person,
  Notifications,
  Search,
  Add,
  Star,
  Favorite,
} from "@mui/icons-material";
import { glassTheme } from "../glass-theme";
import { glassLightTheme } from "../glass-light-theme";
import {
  glassBackgroundPresets,
  glassAuroraBackground,
  glassMeshBackground,
  glassCosmicBackground,
  glassSunsetAurora,
  glassOceanDepth,
  glassNebula,
} from "../glass-color-palette";
import {
  glassLightBackgroundPresets,
  glassLightAuroraBackground,
  glassLightOceanDepth,
  glassLightSunsetAurora,
  glassLightMintFresh,
  glassLightRoseGold,
} from "../glass-light-color-palette";
import { Table } from "@/components/table";
import { ChartWidget, ChartType, ChartCategoryItem } from "@/charts";
import { MRT_ColumnDef } from "material-react-table";

// ===== Mock Data for Table =====
interface TableDataRow {
  id: string;
  name: string;
  status: string;
  progress: number;
  category: string;
}

const tableColumns: MRT_ColumnDef<TableDataRow>[] = [
  { accessorKey: "id", header: "ID", size: 80 },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "progress", header: "Progress (%)" },
  { accessorKey: "category", header: "Category" },
];

const tableData: TableDataRow[] = [
  { id: "001", name: "Project Alpha", status: "Active", progress: 75, category: "Development" },
  { id: "002", name: "Project Beta", status: "Pending", progress: 30, category: "Design" },
  { id: "003", name: "Project Gamma", status: "Complete", progress: 100, category: "Testing" },
  { id: "004", name: "Project Delta", status: "Active", progress: 55, category: "Development" },
  { id: "005", name: "Project Epsilon", status: "On Hold", progress: 10, category: "Research" },
];

// ===== Mock Data for Charts =====
const chartColors = {
  cyan: "#00bcd4",
  purple: "#9c27b0",
  magenta: "#e91e63",
  green: "#1de9b6",
  orange: "#ff9800",
  blue: "#3a95ff",
};

const donutData = [
  { name: "Completed", value: 45, color: chartColors.cyan },
  { name: "In Progress", value: 30, color: chartColors.purple },
  { name: "Pending", value: 15, color: chartColors.magenta },
  { name: "Blocked", value: 10, color: chartColors.orange },
];

const barData = [
  { name: "Jan", value: 120, color: chartColors.cyan },
  { name: "Feb", value: 180, color: chartColors.purple },
  { name: "Mar", value: 150, color: chartColors.magenta },
  { name: "Apr", value: 220, color: chartColors.green },
];

const lineCategories = [
  { name: "Revenue", color: chartColors.cyan },
  { name: "Expenses", color: chartColors.magenta },
  { name: "Profit", color: chartColors.green },
];

const lineData: ChartCategoryItem[] = [
  { date: "Jan", Revenue: 4200, Expenses: 2800, Profit: 1400 },
  { date: "Feb", Revenue: 4800, Expenses: 3200, Profit: 1600 },
  { date: "Mar", Revenue: 5100, Expenses: 2900, Profit: 2200 },
  { date: "Apr", Revenue: 4900, Expenses: 3100, Profit: 1800 },
  { date: "May", Revenue: 5600, Expenses: 3400, Profit: 2200 },
  { date: "Jun", Revenue: 6200, Expenses: 3600, Profit: 2600 },
];

const gaugeData = [{ name: "Performance", value: 78, color: chartColors.cyan }];

const horizontalBarData = [
  { name: "API Services", value: 850, color: chartColors.cyan },
  { name: "Web Apps", value: 620, color: chartColors.purple },
  { name: "Mobile", value: 480, color: chartColors.magenta },
  { name: "Database", value: 320, color: chartColors.green },
];

interface GlassThemeShowcaseProps {
  mode: "dark" | "light";
  background: string;
}

const GlassThemeShowcase = ({ mode, background }: GlassThemeShowcaseProps) => {
  const [tabValue, setTabValue] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState(65);

  const theme = mode === "dark" ? glassTheme : glassLightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: background,
          backgroundAttachment: "fixed",
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1, textAlign: "center" }}>
          Glass Theme - {mode === "dark" ? "Dark" : "Light"} Mode
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, textAlign: "center", opacity: 0.7 }}
        >
          Glassmorphism design with frosted surfaces and aurora gradients
        </Typography>

        <Stack spacing={3} maxWidth="1000px" mx="auto">
          {/* Buttons */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Buttons
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button variant="contained">Primary</Button>
                <Button variant="contained" color="secondary">
                  Secondary
                </Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Inputs
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <TextField
                  label="Text Field"
                  variant="outlined"
                  size="small"
                  placeholder="Enter text..."
                />
                <TextField
                  label="Filled"
                  variant="filled"
                  size="small"
                  defaultValue="Value"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.target.checked)}
                    />
                  }
                  label="Switch"
                />
              </Stack>
              <Box sx={{ mt: 3, px: 1 }}>
                <Typography variant="body2" gutterBottom>
                  Slider
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={(_, v) => setSliderValue(v as number)}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Chips & Badges */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Chips & Badges
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
              >
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Secondary" color="secondary" />
                <Chip label="Outlined" variant="outlined" />
                <Badge badgeContent={4} color="primary">
                  <Avatar>U</Avatar>
                </Badge>
                <Badge badgeContent={99} color="error">
                  <Avatar sx={{ bgcolor: "secondary.main" }}>A</Avatar>
                </Badge>
              </Stack>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tabs
              </Typography>
              <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
                <Tab label="Overview" />
                <Tab label="Details" />
                <Tab label="Settings" />
              </Tabs>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2">
                  Tab content for:{" "}
                  {["Overview", "Details", "Settings"][tabValue]}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alerts
              </Typography>
              <Stack spacing={1.5}>
                <Alert severity="success">Success alert message</Alert>
                <Alert severity="info">Info alert message</Alert>
                <Alert severity="warning">Warning alert message</Alert>
                <Alert severity="error">Error alert message</Alert>
              </Stack>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={65}
                sx={{ mb: 2, height: 8, borderRadius: 4 }}
              />
              <LinearProgress color="secondary" sx={{ height: 8, borderRadius: 4 }} />
            </CardContent>
          </Card>

          {/* Navigation List */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Navigation
              </Typography>
              <List>
                <ListItemButton selected>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </CardContent>
          </Card>

          {/* Icon Buttons with Tooltips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Icon Buttons & Tooltips
              </Typography>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Search">
                  <IconButton>
                    <Search />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add">
                  <IconButton color="primary">
                    <Add />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Favorite">
                  <IconButton color="secondary">
                    <Favorite />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Star">
                  <IconButton color="warning">
                    <Star />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                  <Badge badgeContent={3} color="error">
                    <IconButton>
                      <Notifications />
                    </IconButton>
                  </Badge>
                </Tooltip>
              </Stack>
            </CardContent>
          </Card>

          {/* Paper Elevations */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Paper Elevations
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {[1, 2, 3, 4].map((elevation) => (
                  <Paper
                    key={elevation}
                    elevation={elevation}
                    sx={{ p: 3, minWidth: 120, textAlign: "center" }}
                  >
                    <Typography variant="body2">
                      Elevation {elevation}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Table
              </Typography>
              <Box sx={{ "& .MuiPaper-root": { background: "transparent" } }}>
                <Table
                  columns={tableColumns}
                  data={tableData}
                  isLoading={false}
                  enableTopToolbar={false}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Charts Grid */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            Charts & Graphs
          </Typography>

          <Grid container spacing={3}>
            {/* Donut Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ height: 280 }}>
                <ChartWidget
                  label="Task Distribution"
                  data={donutData}
                  type={ChartType.DONUT}
                  isLoading={false}
                  showTooltip
                />
              </Box>
            </Grid>

            {/* Gauge Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ height: 280 }}>
                <ChartWidget
                  label="System Performance"
                  data={gaugeData}
                  type={ChartType.GAUGE}
                  isLoading={false}
                  showTooltip
                />
              </Box>
            </Grid>

            {/* Vertical Bar Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Box sx={{ height: 280 }}>
                <ChartWidget
                  label="Monthly Overview"
                  data={barData}
                  type={ChartType.VERTICAL_BAR}
                  isLoading={false}
                  showTooltip
                />
              </Box>
            </Grid>

            {/* Line Chart */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 280 }}>
                <ChartWidget
                  label="Revenue Trends"
                  data={lineData}
                  categories={lineCategories}
                  type={ChartType.LINE}
                  isLoading={false}
                  showTooltip
                />
              </Box>
            </Grid>

            {/* Horizontal Bar Chart */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 280 }}>
                <ChartWidget
                  label="Service Usage"
                  data={horizontalBarData}
                  type={ChartType.HORIZONTAL_BAR}
                  categories={[{ name: "Service" }, { name: "Requests" }]}
                  isLoading={false}
                  showTooltip
                />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

const meta: Meta<typeof GlassThemeShowcase> = {
  title: "Foundations/Glass Theme",
  component: GlassThemeShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Glass Theme

A glassmorphism-inspired theme featuring:
- **Frosted glass surfaces** with backdrop blur effects
- **Aurora gradient backgrounds** inspired by One Cisco Design Field Kit
- **Translucent components** with subtle borders
- **Cyan and purple accent colors** for a modern, vibrant look

### Available Modes
- **Dark Glass** - Dark backdrop with translucent white surfaces
- **Light Glass** - Light backdrop with frosted white surfaces

### Background Presets
Each mode comes with multiple aurora background presets:
- Aurora, Ocean, Sunset, Nebula, Cosmic, Mesh (dark)
- Aurora, Ocean, Sunset, Mint, Rose (light)
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["dark", "light"],
      description: "Theme mode",
    },
    background: {
      control: "select",
      description: "Background gradient preset",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassThemeShowcase>;

// Dark Mode Stories
export const DarkAurora: Story = {
  args: {
    mode: "dark",
    background: glassAuroraBackground,
  },
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

export const DarkOcean: Story = {
  args: {
    mode: "dark",
    background: glassOceanDepth,
  },
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

export const DarkSunset: Story = {
  args: {
    mode: "dark",
    background: glassSunsetAurora,
  },
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

export const DarkNebula: Story = {
  args: {
    mode: "dark",
    background: glassNebula,
  },
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

export const DarkCosmic: Story = {
  args: {
    mode: "dark",
    background: glassCosmicBackground,
  },
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

export const DarkMesh: Story = {
  args: {
    mode: "dark",
    background: glassMeshBackground,
  },
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

// Light Mode Stories
export const LightAurora: Story = {
  args: {
    mode: "light",
    background: glassLightAuroraBackground,
  },
  parameters: {
    backgrounds: { default: "Light" },
  },
};

export const LightOcean: Story = {
  args: {
    mode: "light",
    background: glassLightOceanDepth,
  },
  parameters: {
    backgrounds: { default: "Light" },
  },
};

export const LightSunset: Story = {
  args: {
    mode: "light",
    background: glassLightSunsetAurora,
  },
  parameters: {
    backgrounds: { default: "Light" },
  },
};

export const LightMint: Story = {
  args: {
    mode: "light",
    background: glassLightMintFresh,
  },
  parameters: {
    backgrounds: { default: "Light" },
  },
};

export const LightRose: Story = {
  args: {
    mode: "light",
    background: glassLightRoseGold,
  },
  parameters: {
    backgrounds: { default: "Light" },
  },
};
