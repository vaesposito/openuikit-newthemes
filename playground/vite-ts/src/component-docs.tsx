/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, Component } from "react";
import {
  AreaChart, Area, XAxis as RXAxis, YAxis as RYAxis, CartesianGrid as RGrid,
  Tooltip as RTooltip, ResponsiveContainer as RRC,
} from "recharts";
import { MemoryRouter } from "react-router-dom";
import {
  ThemeProvider,
  ThemeMode,
  Badge,
  Spinner,
  Tabs,
  Toggle,
  SeverityBadge,
  SeverityBar,
  SeverityBadgeLabel,
  IndicatorBadge,
  Banner,
  Accordion,
  Breadcrumbs,
  Link,
  ViewSwitcher,
  FavoriteButton,
  CopyButton,
  SearchField,
  Pagination,
  Tag,
  Divider,
  Avatar,
  Typography,
  Stack,
  Box,
  Button,
  IconButton,
  Fab,
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
  Skeleton,
  Stepper,
  Paper,
  // Charts — cast to any to work around unresolved internal path aliases in the dist types
  BarChart as _BarChart,
  LineChart as _LineChart,
  DonutChart as _DonutChart,
  GaugeChart as _GaugeChart,
  HorizontalBarChart as _HorizontalBarChart,
} from "@open-ui-kit/core";

const BarChart = _BarChart as React.FC<any>;
const LineChart = _LineChart as React.FC<any>;
const DonutChart = _DonutChart as React.FC<any>;
const GaugeChart = _GaugeChart as React.FC<any>;
const HorizontalBarChart = _HorizontalBarChart as React.FC<any>;
import {
  Tab,
  Card,
  CardContent,
  Step,
  StepLabel,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  Severity,
  TagBackgroundColorVariants,
  TagStatus,
  LinkColorEnum,
  LinkType,
} from "@open-ui-kit/core";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import TuneIcon from "@mui/icons-material/Tune";
import LabelIcon from "@mui/icons-material/Label";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import PaletteIcon from "@mui/icons-material/Palette";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import LayersIcon from "@mui/icons-material/Layers";
import Tooltip from "@mui/material/Tooltip";

// ─── Error Boundary ──────────────────────────────────────────────────────────

class SectionErrorBoundary extends Component<
  { children: React.ReactNode; name: string },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <Box sx={{ p: 3, borderRadius: 2, border: "1px dashed", borderColor: "error.light", bgcolor: "action.hover" }}>
          <Typography variant="body2" color="error.main" sx={{ fontWeight: 600, mb: 0.5 }}>
            Failed to render {this.props.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6, fontFamily: "monospace" }}>
            {(this.state.error as Error).message}
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SIDEBAR_WIDTH = 220;
const HEADER_HEIGHT = 56;

type DocThemeMode = ThemeMode;

const THEMES: { value: DocThemeMode; label: string; bg: string }[] = [
  { value: "light",     label: "AGNTCY light", bg: "#ffffff" },
  { value: "dark",      label: "AGNTCY dark",  bg: "#141418" },
  { value: "ioc",       label: "C1D dark",     bg: "#050C18" },
  { value: "ioc-light", label: "C1D light",    bg: "#F0F7FF" },
];

const COMPONENT_CATEGORIES = [
  { id: "buttons",    label: "Buttons & Actions", Icon: TouchAppIcon },
  { id: "forms",      label: "Form Controls",     Icon: TuneIcon },
  { id: "data",       label: "Data Display",      Icon: LabelIcon },
  { id: "navigation", label: "Navigation",        Icon: ExploreIcon },
  { id: "feedback",   label: "Feedback & Status", Icon: NotificationsIcon },
  { id: "layout",     label: "Layout",            Icon: DashboardIcon },
  { id: "charts",     label: "Charts",            Icon: BarChartIcon },
];

const TOKEN_CATEGORIES = [
  { id: "color",      label: "Color",       Icon: PaletteIcon },
  { id: "typography", label: "Typography",  Icon: TextFieldsIcon },
  { id: "shadows",    label: "Shadows",     Icon: LayersIcon },
  { id: "spacing",    label: "Spacing",     Icon: DashboardIcon },
];

const TEMPLATE_CATEGORIES = [
  { id: "dashboard", label: "Dashboard", Icon: TableChartIcon },
];

// ─── Chart sample data ───────────────────────────────────────────────────────

const BAR_DATA = [
  { name: "Critical", value: 42, color: "#ef4444" },
  { name: "High",     value: 87, color: "#f97316" },
  { name: "Medium",   value: 134, color: "#f59e0b" },
  { name: "Low",      value: 61, color: "#3b82f6" },
  { name: "Info",     value: 28, color: "#6b7280" },
];

const DONUT_DATA = [
  { name: "Critical", value: 42,  color: "#ef4444" },
  { name: "High",     value: 87,  color: "#f97316" },
  { name: "Medium",   value: 134, color: "#f59e0b" },
  { name: "Low",      value: 61,  color: "#3b82f6" },
];

const LINE_DATA = [
  { date: "2024-01-15", Critical: 40, High: 80, Resolved: 20 },
  { date: "2024-02-15", Critical: 55, High: 62, Resolved: 38 },
  { date: "2024-03-15", Critical: 31, High: 90, Resolved: 55 },
  { date: "2024-04-15", Critical: 68, High: 74, Resolved: 42 },
  { date: "2024-05-15", Critical: 50, High: 110, Resolved: 70 },
  { date: "2024-06-15", Critical: 38, High: 95, Resolved: 88 },
];
const LINE_MONTH_FMT = (v: unknown) => {
  const d = new Date(String(v));
  return isNaN(d.getTime()) ? String(v) : d.toLocaleString("en", { month: "short" });
};

const LINE_CATEGORIES = [
  { name: "Critical", color: "#ef4444" },
  { name: "High",     color: "#f97316" },
  { name: "Resolved", color: "#22c55e" },
];

const HBAR_DATA = [
  { name: "Cryptomining",      value: 10, color: "#3b82f6" },
  { name: "Ransomware",        value: 7,  color: "#3b82f6" },
  { name: "Data Destruction",  value: 5,  color: "#3b82f6" },
  { name: "Data Exfiltration", value: 3,  color: "#3b82f6" },
  { name: "Recon",             value: 1,  color: "#3b82f6" },
];

// ─── Layout helpers ───────────────────────────────────────────────────────────

function ComponentGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="overline"
        sx={{
          display: "block",
          mb: 2,
          letterSpacing: "0.1em",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "text.primary",
          opacity: 0.55,
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          pl: 1.5,
          lineHeight: 1.4,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ pl: 0.5 }}>{children}</Box>
    </Box>
  );
}

// ─── Category Sections ────────────────────────────────────────────────────────

function ButtonsSection() {
  const [favActive, setFavActive] = useState(false);

  return (
    <>
      <ComponentGroup label="Button — Variants">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="tertariary">Text</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Button — Negative Color">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="primary" color="negative">Primary Negative</Button>
          <Button variant="secondary" color="negative">Secondary Negative</Button>
          <Button variant="outlined" color="negative">Outlined Negative</Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Button — Sizes">
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Icon Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton color="primary"><EditIcon /></IconButton>
          <IconButton color="default"><ShareIcon /></IconButton>
          <IconButton disabled><PrintIcon /></IconButton>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Floating Action Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <Fab color="primary" size="small"><AddIcon /></Fab>
          <Fab color="primary"><AddIcon /></Fab>
          <Fab variant="extended" color="primary"><AddIcon sx={{ mr: 1 }} />New Item</Fab>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Speed Dial">
        <Box sx={{ height: 90, position: "relative" }}>
          <SpeedDial
            ariaLabel="Speed dial"
            sx={{ position: "absolute", bottom: 0, left: 0 }}
            icon={<SpeedDialIcon />}
            direction="right"
          >
            {[
              { icon: <EditIcon />, name: "Edit" },
              { icon: <PrintIcon />, name: "Print" },
              { icon: <ShareIcon />, name: "Share" },
            ].map((a) => (
              <SpeedDialAction key={a.name} icon={a.icon} tooltipTitle={a.name} />
            ))}
          </SpeedDial>
        </Box>
      </ComponentGroup>

      <ComponentGroup label="Copy Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <CopyButton text="npm install @open-ui-kit/core" />
          <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.65 }}>Click to copy</Typography>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Favorite Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <FavoriteButton
            onClick={() => setFavActive((v) => !v)}
            isChecked={favActive}
            withBackground
          />
          <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.65 }}>
            {favActive ? "Saved to favorites" : "Click to favorite"}
          </Typography>
        </Stack>
      </ComponentGroup>
    </>
  );
}

function FormsSection() {
  const [sliderVal, setSliderVal] = useState(40);
  const [search, setSearch] = useState("");
  const [selectVal, setSelectVal] = useState("option1");
  const [checked, setChecked] = useState(true);
  const [radioVal, setRadioVal] = useState("a");
  const [toggleOn, setToggleOn] = useState(true);

  return (
    <>
      <ComponentGroup label="Toggle (Switch)">
        <Stack direction="row" spacing={4} alignItems="center">
          <FormControlLabel
            control={<Toggle checked={toggleOn} onChange={(e) => setToggleOn(e.target.checked)} />}
            label={toggleOn ? "On" : "Off"}
            sx={{ gap: 1, "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
          />
          <Toggle checked={false} />
          <Toggle disabled />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Checkbox">
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
            label="Checked"
          />
          <FormControlLabel control={<Checkbox />} label="Unchecked" />
          <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Radio Group">
        <RadioGroup row value={radioVal} onChange={(e) => setRadioVal(e.target.value)}>
          <FormControlLabel value="a" control={<Radio />} label="Option A" />
          <FormControlLabel value="b" control={<Radio />} label="Option B" />
          <FormControlLabel value="c" control={<Radio />} label="Option C" />
          <FormControlLabel value="d" control={<Radio disabled />} label="Disabled" />
        </RadioGroup>
      </ComponentGroup>

      <ComponentGroup label="Slider">
        <Box sx={{ maxWidth: 480, px: 1 }}>
          <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>Single value</Typography>
          <Slider value={sliderVal} onChange={(_, v) => setSliderVal(v as number)} valueLabelDisplay="auto" />
          <Typography variant="caption" sx={{ mt: 2, display: "block", color: "text.primary", opacity: 0.6 }}>Range</Typography>
          <Slider value={[20, 70]} valueLabelDisplay="auto" />
        </Box>
      </ComponentGroup>

      <ComponentGroup label="Search Field">
        <Box sx={{ maxWidth: 400 }}>
          <SearchField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
          />
        </Box>
      </ComponentGroup>

      <ComponentGroup label="Select">
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Select option</InputLabel>
          <Select value={selectVal} label="Select option" onChange={(e) => setSelectVal(e.target.value)}>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </ComponentGroup>

      <ComponentGroup label="Text Field">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextField label="Outlined" variant="outlined" size="small" />
          <TextField label="Filled" variant="filled" size="small" defaultValue="Value" />
          <TextField label="Error" variant="outlined" size="small" error helperText="Required" />
          <TextField label="Disabled" variant="outlined" size="small" disabled value="Disabled" />
        </Stack>
      </ComponentGroup>
    </>
  );
}

function DataDisplaySection() {
  return (
    <>
      <ComponentGroup label="Typography Scale">
        <Stack spacing={0.5}>
          {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((v) => (
            <Typography key={v} variant={v}>{v.toUpperCase()} — The quick brown fox</Typography>
          ))}
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1">subtitle1 — Supporting subtitle text</Typography>
          <Typography variant="body1">body1 — Regular paragraph text used for main content areas.</Typography>
          <Typography variant="body2">body2 — Smaller body text for secondary information.</Typography>
          <Typography variant="caption">caption — Caption text for labels</Typography>
          <Typography variant="overline">overline — SECTION LABEL</Typography>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Avatar">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
          <Avatar sx={{ bgcolor: "secondary.main" }}>BC</Avatar>
          <Avatar sx={{ bgcolor: "error.main" }}>X</Avatar>
          <Avatar sx={{ bgcolor: "success.main" }} />
          <Avatar sx={{ width: 56, height: 56, bgcolor: "warning.main", color: "rgba(0,0,0,0.87) !important" }}>LG</Avatar>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Badge — All 10 Types">
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
          {(["default", "excellent", "neutral", "error", "warning", "info", "success", "inactive", "moderate", "severe"] as const).map((type) => (
            <Stack key={type} alignItems="center" spacing={1}>
              <Badge type={type} content={1} />
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6, fontSize: "0.68rem" }}>{type}</Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Tag — Color Variants">
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.keys(TagBackgroundColorVariants).map((key) => (
            <Tag key={key} color={TagBackgroundColorVariants[key as keyof typeof TagBackgroundColorVariants]}>
              {key}
            </Tag>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Tag — Status Variants">
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.values(TagStatus).map((status) => (
            <Tag key={status} status={status as TagStatus}>{status}</Tag>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Severity Badge">
        <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" useFlexGap>
          {Object.values(Severity).map((sev) => (
            <Stack key={sev} alignItems="center" spacing={1}>
              <SeverityBadge severity={sev} />
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6, fontSize: "0.68rem" }}>{sev}</Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Severity Badge Label">
        <Stack spacing={1.5}>
          {Object.values(Severity).map((sev) => (
            <SeverityBadgeLabel key={sev} severity={sev} label={sev} />
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Severity Bar">
        <Stack direction="row" spacing={4} alignItems="flex-end" flexWrap="wrap" useFlexGap>
          {Object.values(Severity).map((sev) => (
            <Stack key={sev} alignItems="center" spacing={1}>
              <SeverityBar severity={sev} sx={{ width: "6px", height: "40px" }} />
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{sev}</Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Indicator Badge (0–4)">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
          {([
            { val: 0, color: "#9ca3af", label: "None" },
            { val: 1, color: "#60a5fa", label: "Low" },
            { val: 2, color: "#fbbf24", label: "Medium" },
            { val: 3, color: "#f97316", label: "High" },
            { val: 4, color: "#ef4444", label: "Critical" },
          ] as const).map(({ val, color, label }) => (
            <Stack key={val} alignItems="center" spacing={1}>
              <IndicatorBadge value={val} color={color} />
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6, fontSize: "0.68rem" }}>{label}</Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>
    </>
  );
}

function NavigationSection() {
  const [tabMain, setTabMain] = useState(0);
  const [tabSub, setTabSub] = useState(0);
  const [tabToggle, setTabToggle] = useState(0);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [stepperActive, setStepperActive] = useState(1);

  return (
    <>
      <ComponentGroup label="Breadcrumbs">
        <MemoryRouter>
          <Breadcrumbs
            items={[
              { text: "Home" },
              { text: "Products" },
              { text: "Security" },
              { text: "Current Page" },
            ]}
          />
        </MemoryRouter>
      </ComponentGroup>

      <ComponentGroup label="Tabs — Main">
        <Tabs value={tabMain} onChange={(_, v) => setTabMain(v)} type="main">
          <Tab label="Overview" />
          <Tab label="Details" />
          <Tab label="Settings" />
          <Tab label="Disabled" disabled />
        </Tabs>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.65 }}>
            Active: {["Overview", "Details", "Settings"][tabMain]}
          </Typography>
        </Box>
      </ComponentGroup>

      <ComponentGroup label="Tabs — Sub Tab">
        <Tabs value={tabSub} onChange={(_, v) => setTabSub(v)} type="subTab">
          <Tab label="All items" />
          <Tab label="Active" />
          <Tab label="Archived" />
        </Tabs>
      </ComponentGroup>

      <ComponentGroup label="Tabs — Toggle Tab">
        <Tabs value={tabToggle} onChange={(_, v) => setTabToggle(v)} type="toggleTab">
          <Tab label="List" />
          <Tab label="Grid" />
          <Tab label="Map" />
        </Tabs>
      </ComponentGroup>

      <ComponentGroup label="Link">
        <MemoryRouter>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            <Link href="#" color={LinkColorEnum.Primary} linkType={LinkType.UnderlineRegular}>Underline Regular</Link>
            <Link href="#" color={LinkColorEnum.Primary} linkType={LinkType.StandaloneRegular}>Standalone Regular</Link>
            <Link href="#" color={LinkColorEnum.Primary} linkType={LinkType.StandaloneBold}>Standalone Bold</Link>
            <Link href="#" color={LinkColorEnum.Secondary} linkType={LinkType.UnderlineRegular}>Secondary Color</Link>
            <Link href="#" color={LinkColorEnum.Primary} disabled>Disabled</Link>
          </Stack>
        </MemoryRouter>
      </ComponentGroup>

      <ComponentGroup label="Pagination">
        <Pagination count={10} page={page} onChange={(_, v) => setPage(v)} showFirstButton showLastButton />
      </ComponentGroup>

      <ComponentGroup label="Stepper">
        <Stepper activeStep={stepperActive} sx={{ maxWidth: 580 }}>
          {["Configure", "Review", "Deploy", "Done"].map((label, idx) => (
            <Step key={label} completed={idx < stepperActive}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button variant="outlined" size="small" onClick={() => setStepperActive((v) => Math.max(0, v - 1))} disabled={stepperActive === 0}>
            Back
          </Button>
          <Button variant="primary" size="small" onClick={() => setStepperActive((v) => Math.min(4, v + 1))} disabled={stepperActive === 4}>
            Next
          </Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="View Switcher">
        <Stack spacing={2}>
          <ViewSwitcher
            value={view}
            onChange={setView}
            options={[
              { icon: GridViewIcon, value: "grid" },
              { icon: ViewListIcon, value: "list" },
            ]}
          />
          <ViewSwitcher
            value={view}
            onChange={setView}
            options={["Grid", "List", "Map"]}
          />
        </Stack>
      </ComponentGroup>
    </>
  );
}

function FeedbackSection() {
  return (
    <>
      <ComponentGroup label="Spinner">
        <Stack direction="row" spacing={5} alignItems="center">
          {[16, 24, 40, 64].map((size) => (
            <Stack key={size} alignItems="center" spacing={1}>
              <Spinner size={size} />
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>{size}px</Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Skeleton">
        <Stack spacing={1.5} sx={{ maxWidth: 440 }}>
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Stack spacing={0.75} sx={{ flex: 1 }}>
              <Skeleton variant="rectangular" height={14} />
              <Skeleton variant="rectangular" height={14} width="72%" />
            </Stack>
          </Stack>
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Banner — All Statuses">
        <Stack spacing={2}>
          <Banner status="info"      text="Informational banner — context and guidance." showCloseButton={false} />
          <Banner status="success"   text="Success banner — operation completed successfully." showCloseButton={false} />
          <Banner status="excellent" text="Excellent banner — all systems running optimally." showCloseButton={false} />
          <Banner status="warning"   text="Warning banner — review before proceeding." showCloseButton={false} />
          <Banner status="negative"  text="Negative banner — an error occurred, please retry." showCloseButton={false} />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Accordion">
        <Stack spacing={1} sx={{ maxWidth: 620 }}>
          <Accordion title="Getting Started" subTitle="Learn the basics" defaultExpanded>
            <Typography variant="body2">
              Accordions organize content into collapsible sections to reduce visual noise.
              This one is open by default.
            </Typography>
          </Accordion>
          <Accordion title="Configuration Options" subTitle="Advanced settings">
            <Typography variant="body2">Advanced configuration options hidden to reduce clutter.</Typography>
          </Accordion>
          <Accordion title="Contained Variant" contained>
            <Typography variant="body2">The contained prop adds a border and background surface.</Typography>
          </Accordion>
        </Stack>
      </ComponentGroup>
    </>
  );
}

function LayoutSection() {
  return (
    <>
      <ComponentGroup label="Card">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Card sx={{ minWidth: 220, maxWidth: 260 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Card Title</Typography>
              <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.65 }}>
                A themed MUI card with body content and elevation.
              </Typography>
            </CardContent>
          </Card>
          <Paper sx={{ p: 2.5, minWidth: 220, maxWidth: 260 }} elevation={2}>
            <Typography variant="subtitle1" gutterBottom>Paper (elevation 2)</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.65 }}>
              MUI Paper with shadow elevation.
            </Typography>
          </Paper>
          <Paper sx={{ p: 2.5, minWidth: 220, maxWidth: 260 }} variant="outlined">
            <Typography variant="subtitle1" gutterBottom>Paper (outlined)</Typography>
            <Typography variant="body2" sx={{ color: "text.primary", opacity: 0.65 }}>
              Paper with border, no elevation.
            </Typography>
          </Paper>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Divider">
        <Stack spacing={3} sx={{ maxWidth: 560 }}>
          <Box>
            <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }} gutterBottom display="block">Horizontal</Typography>
            <Divider />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }} gutterBottom display="block">With label</Typography>
            <Divider>Section</Divider>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ height: 40 }}>
            <Typography variant="body2">Left</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2">Center</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2">Right</Typography>
          </Stack>
        </Stack>
      </ComponentGroup>
    </>
  );
}

function ChartsSection() {
  const theme = useTheme();
  const bg = theme.palette.background.paper;

  return (
    <>
      <ComponentGroup label="Bar Chart">
        <SectionErrorBoundary name="BarChart">
          <Box sx={{ height: 220, maxWidth: 500 }}>
            <BarChart data={BAR_DATA} />
          </Box>
        </SectionErrorBoundary>
      </ComponentGroup>

      <ComponentGroup label="Donut Chart">
        <SectionErrorBoundary name="DonutChart">
          <Stack direction="row" spacing={4} alignItems="flex-start" flexWrap="wrap" useFlexGap>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 160, width: 160 }}>
                <DonutChart data={DONUT_DATA} />
              </Box>
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>4 segments</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 160, width: 160 }}>
                <DonutChart data={DONUT_DATA.slice(0, 3)} />
              </Box>
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>3 segments</Typography>
            </Stack>
          </Stack>
        </SectionErrorBoundary>
      </ComponentGroup>

      <ComponentGroup label="Gauge Chart">
        <SectionErrorBoundary name="GaugeChart">
          <Stack direction="row" spacing={4} alignItems="flex-start" flexWrap="wrap" useFlexGap>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 140, width: 200 }}>
                <GaugeChart
                  data={[{ name: "Score", value: 24, color: "#ef4444" }]}
                  customLabelComponent={<Typography variant="caption">Critical</Typography>}
                />
              </Box>
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>Critical (24)</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 140, width: 200 }}>
                <GaugeChart data={[{ name: "Score", value: 75, color: "#f59e0b" }]} />
              </Box>
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>Warning (75)</Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 140, width: 200 }}>
                <GaugeChart data={[{ name: "Score", value: 95, color: "#22c55e" }]} />
              </Box>
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.6 }}>Good (95)</Typography>
            </Stack>
          </Stack>
        </SectionErrorBoundary>
      </ComponentGroup>

      <ComponentGroup label="Line Chart">
        <SectionErrorBoundary name="LineChart">
          <Box sx={{ height: 240, maxWidth: 600, bgcolor: bg, borderRadius: 2, p: 1 }}>
            <LineChart
              data={LINE_DATA}
              categories={LINE_CATEGORIES}
              subject="date"
              xAxisProps={{ tickFormatter: LINE_MONTH_FMT }}
            />
          </Box>
        </SectionErrorBoundary>
      </ComponentGroup>

      <ComponentGroup label="Horizontal Bar Chart">
        <SectionErrorBoundary name="HorizontalBarChart">
          <Box sx={{ maxWidth: 480 }}>
            <HorizontalBarChart data={HBAR_DATA} />
          </Box>
        </SectionErrorBoundary>
      </ComponentGroup>
    </>
  );
}

// ─── Token definitions ────────────────────────────────────────────────────────

type TokenEntry   = { name: string; description?: string };
type TokenGroup   = { label: string; tokens: TokenEntry[] };
type TokenSection = { label: string; groups: TokenGroup[] };

const C1D_PRIMITIVE_TOKENS: {
  label: string;
  tokens: { name: string; value: string; description?: string }[];
}[] = [
  {
    label: "Cisco Teal — Primary Accent",
    tokens: [
      { name: "iocTeal500 (Brand)",   value: "#00BCEB", description: "Cisco brand teal — primary CTA, icons, rings" },
      { name: "iocTeal400",           value: "#1AC6F0", description: "Hover state" },
      { name: "iocTeal600",           value: "#00A0D1", description: "Active / pressed" },
      { name: "iocTeal700",           value: "#0082AD", description: "Strong accent" },
      { name: "iocTeal200",           value: "#7DE0F8", description: "Text on dark bg" },
      { name: "iocTealAlpha40",       value: "rgba(0,188,235,0.40)", description: "Disabled states" },
      { name: "iocTealAlpha20",       value: "rgba(0,188,235,0.20)", description: "Weak background" },
      { name: "iocTealAlpha10",       value: "rgba(0,188,235,0.10)", description: "Subtle tint" },
    ],
  },
  {
    label: "Cisco Blue — Secondary",
    tokens: [
      { name: "iocBlue500",  value: "#2B82F6", description: "Execute / action buttons" },
      { name: "iocBlue400",  value: "#3B92FF", description: "Hover" },
      { name: "iocBlue600",  value: "#1E6FD9", description: "Active" },
    ],
  },
  {
    label: "Backdrop — Dark Navy",
    tokens: [
      { name: "iocBackdrop900 (Deepest)", value: "#020508", description: "Absolute darkest void" },
      { name: "iocBackdrop800",           value: "#03080F", description: "" },
      { name: "iocBackdrop700",           value: "#050C18", description: "Page background" },
      { name: "iocBackdrop600",           value: "#07111F", description: "Gradient start" },
      { name: "iocBackdrop500",           value: "#091428", description: "" },
      { name: "iocBackdrop400",           value: "#0C1B35", description: "Deep card bg" },
      { name: "iocBackdrop300",           value: "#0F2040", description: "" },
      { name: "iocBackdrop200",           value: "#132650", description: "" },
      { name: "iocBackdrop100",           value: "#1A3060", description: "Lightest navy" },
    ],
  },
  {
    label: "Surfaces — Translucent Glass",
    tokens: [
      { name: "iocSurface50",  value: "rgba(255,255,255,0.02)", description: "Barely-there tint" },
      { name: "iocSurface100", value: "rgba(255,255,255,0.035)", description: "Card background" },
      { name: "iocSurface200", value: "rgba(255,255,255,0.06)", description: "Control background" },
      { name: "iocSurface300", value: "rgba(255,255,255,0.09)", description: "Hover overlay" },
      { name: "iocSurface400", value: "rgba(255,255,255,0.12)", description: "Active state" },
      { name: "iocSurface500", value: "rgba(255,255,255,0.16)", description: "Emphasized surface" },
    ],
  },
  {
    label: "Borders — Translucent",
    tokens: [
      { name: "iocBorder100", value: "rgba(255,255,255,0.05)", description: "Weakest border" },
      { name: "iocBorder200", value: "rgba(255,255,255,0.07)", description: "Default divider" },
      { name: "iocBorder300", value: "rgba(255,255,255,0.09)", description: "Card border" },
      { name: "iocBorder400", value: "rgba(255,255,255,0.12)", description: "Emphasized border" },
      { name: "iocBorder500", value: "rgba(255,255,255,0.18)", description: "Strong border" },
    ],
  },
  {
    label: "Text — Alpha White",
    tokens: [
      { name: "iocTextPrimary",   value: "rgba(255,255,255,0.94)", description: "Headings, key labels" },
      { name: "iocTextSecondary", value: "rgba(255,255,255,0.55)", description: "Body text, captions" },
      { name: "iocTextTertiary",  value: "rgba(255,255,255,0.32)", description: "Placeholder, hints" },
      { name: "iocTextDisabled",  value: "rgba(255,255,255,0.22)", description: "Disabled" },
    ],
  },
  {
    label: "Semantic Status",
    tokens: [
      { name: "Success",        value: "#00B98E", description: "Green — compliance, success" },
      { name: "Negative",       value: "#C62953", description: "Red — threats, errors" },
      { name: "Warning",        value: "#FBAB2C", description: "Amber — warnings, medium severity" },
      { name: "Severe Warning", value: "#F2643D", description: "Orange — critical alerts" },
      { name: "Excellent",      value: "#0AB6FF", description: "Cyan — excellent / informational" },
    ],
  },
  {
    label: "Shadows & Effects",
    tokens: [
      { name: "Shadow SM",       value: "0 2px 8px rgba(0,0,0,0.30)",  description: "Subtle card lift" },
      { name: "Shadow MD",       value: "0 4px 16px rgba(0,0,0,0.40)", description: "Elevated card" },
      { name: "Shadow LG",       value: "0 8px 32px rgba(0,0,0,0.50)", description: "Modal / drawer" },
      { name: "Backdrop Blur",   value: "blur(20px)",                   description: "Glass panel blur" },
    ],
  },
];

const COLOR_TOKEN_SECTIONS: TokenSection[] = [
  {
    label: "Base — Text",
    groups: [{
      label: "Text",
      tokens: [
        { name: "baseTextStrong",   description: "Primary headings, key content" },
        { name: "baseTextDefault",  description: "Body text default" },
        { name: "baseTextMedium",   description: "Secondary body text" },
        { name: "baseTextWeak",     description: "Tertiary / hint text" },
        { name: "baseTextInverse",  description: "Text on dark surfaces" },
        { name: "baseTextDisabled", description: "Disabled state" },
      ],
    }],
  },
  {
    label: "Base — Background & Border",
    groups: [
      {
        label: "Background",
        tokens: [
          { name: "baseBackgroundStrong", description: "Strongest surface" },
          { name: "baseBackgroundMedium", description: "Default page background" },
          { name: "baseBackgroundWeak",   description: "Subtle surface / card" },
          { name: "baseBackgroundHover",  description: "Hover overlay" },
        ],
      },
      {
        label: "Border",
        tokens: [
          { name: "baseBorderDefault", description: "Standard border" },
          { name: "baseBorderStrong",  description: "Emphasized border" },
          { name: "baseBorderMedium",  description: "Moderate border" },
          { name: "baseBorderWeak",    description: "Subtle border" },
        ],
      },
    ],
  },
  {
    label: "Brand",
    groups: [
      {
        label: "Core",
        tokens: [
          { name: "brandOrange",       description: "Primary orange" },
          { name: "brandBlue",         description: "Primary brand blue" },
          { name: "brandMidnightBlue", description: "Deep navy" },
          { name: "agentcyYellow",     description: "Agentcy yellow" },
          { name: "agentcyBlue",       description: "Agentcy blue" },
          { name: "agentcyDarkBlue",   description: "Agentcy dark blue" },
        ],
      },
      {
        label: "Brand Text & Background",
        tokens: [
          { name: "brandTextPrimary",                description: "Brand primary text" },
          { name: "brandTextSecondary",              description: "Brand secondary text" },
          { name: "brandLogoPrimary",                description: "Logo primary color" },
          { name: "brandBackgroundPrimaryDefault",   description: "Brand bg primary" },
          { name: "brandBackgroundPrimaryWeak",      description: "Brand bg weak" },
          { name: "brandBackgroundSecondaryDefault", description: "Brand bg secondary" },
          { name: "brandIconPrimaryDefault",         description: "Brand icon primary" },
          { name: "brandIconSecondaryDefault",       description: "Brand icon secondary" },
          { name: "brandIconTertiaryDefault",        description: "Brand icon tertiary" },
        ],
      },
    ],
  },
  {
    label: "Control",
    groups: [
      {
        label: "Background",
        tokens: [
          { name: "controlBackgroundDefault",  description: "Input default bg" },
          { name: "controlBackgroundDisabled", description: "Disabled control" },
          { name: "controlBackgroundMedium",   description: "Medium control" },
        ],
      },
      {
        label: "Border & Icon",
        tokens: [
          { name: "controlBorderDefault",  description: "Default border" },
          { name: "controlBorderHover",    description: "Hover border" },
          { name: "controlBorderActive",   description: "Active border" },
          { name: "controlBorderNegative", description: "Error border" },
          { name: "controlBorderDisabled", description: "Disabled border" },
          { name: "controlIconDefault",    description: "Icon default" },
          { name: "controlIconHover",      description: "Icon hover" },
          { name: "controlIconDisabled",   description: "Icon disabled" },
        ],
      },
    ],
  },
  {
    label: "Interactive",
    groups: [
      {
        label: "Primary",
        tokens: [
          { name: "interactivePrimaryDefaultDefault",  description: "Default" },
          { name: "interactivePrimaryDefaultHover",    description: "Hover" },
          { name: "interactivePrimaryDefaultActive",   description: "Active" },
          { name: "interactivePrimaryDefaultDisabled", description: "Disabled" },
          { name: "interactivePrimaryWeakDefault",     description: "Weak default" },
          { name: "interactivePrimaryWeakHover",       description: "Weak hover" },
        ],
      },
      {
        label: "Secondary & Tertiary",
        tokens: [
          { name: "interactiveSecondaryDefaultDefault", description: "Secondary default" },
          { name: "interactiveSecondaryDefaultHover",   description: "Secondary hover" },
          { name: "interactiveSecondaryDefaultActive",  description: "Secondary active" },
          { name: "interactiveTertiaryDefault",         description: "Tertiary default" },
          { name: "interactiveTertiaryHover",           description: "Tertiary hover" },
          { name: "interactiveInverseBackgroundDefault",description: "Inverse bg" },
          { name: "interactiveInverseTextDefault",      description: "Inverse text" },
        ],
      },
    ],
  },
  {
    label: "Status — Success & Negative",
    groups: [
      {
        label: "Success",
        tokens: [
          { name: "successBackgroundDefault", description: "Default bg" },
          { name: "successBackgroundWeak",    description: "Weak bg" },
          { name: "successTextDefault",       description: "Text" },
          { name: "successBorderDefault",     description: "Border" },
          { name: "successIconDefault",       description: "Icon" },
          { name: "successTextInDefault",     description: "On-color text" },
        ],
      },
      {
        label: "Negative (Error)",
        tokens: [
          { name: "negativeBackgroundDefault", description: "Default bg" },
          { name: "negativeBackgroundWeak",    description: "Weak bg" },
          { name: "negativeTextDefault",       description: "Text" },
          { name: "negativeBorderDefault",     description: "Border" },
          { name: "negativeIconDefault",       description: "Icon" },
          { name: "negativeTextInDefault",     description: "On-color text" },
        ],
      },
    ],
  },
  {
    label: "Status — Warning & Severity",
    groups: [
      {
        label: "Warning",
        tokens: [
          { name: "warningBackgroundDefault", description: "Default bg" },
          { name: "warningBackgroundWeak",    description: "Weak bg" },
          { name: "warningTextDefault",       description: "Text" },
          { name: "warningBorderDefault",     description: "Border" },
          { name: "warningIconDefault",       description: "Icon" },
        ],
      },
      {
        label: "Severe Warning",
        tokens: [
          { name: "severeWarningBackgroundDefault", description: "Default bg" },
          { name: "severeWarningBackgroundWeak",    description: "Weak bg" },
          { name: "severeWarningTextDefault",       description: "Text" },
          { name: "severeWarningIconDefault",       description: "Icon" },
        ],
      },
      {
        label: "Moderate",
        tokens: [
          { name: "moderateBackgroundDefault", description: "Default bg" },
          { name: "moderateBackgroundWeak",    description: "Weak bg" },
          { name: "moderateTextDefault",       description: "Text" },
          { name: "moderateIconDefault",       description: "Icon" },
        ],
      },
    ],
  },
  {
    label: "Status — Info & Inactive",
    groups: [
      {
        label: "Excellent",
        tokens: [
          { name: "excellentBackgroundDefault", description: "Default bg" },
          { name: "excellentBackgroundWeak",    description: "Weak bg" },
          { name: "excellentTextDefault",       description: "Text" },
          { name: "excellentIconDefault",       description: "Icon" },
        ],
      },
      {
        label: "Neutral (Info Blue)",
        tokens: [
          { name: "neutralBackgroundDefault", description: "Default bg" },
          { name: "neutralBackgroundWeak",    description: "Weak bg" },
          { name: "neutralTextDefault",       description: "Text" },
          { name: "neutralIconDefault",       description: "Icon" },
        ],
      },
      {
        label: "Info (Purple)",
        tokens: [
          { name: "infoBackgroundDefault", description: "Default bg" },
          { name: "infoBackgroundWeak",    description: "Weak bg" },
          { name: "infoTextDefault",       description: "Text" },
          { name: "infoIconDefault",       description: "Icon" },
        ],
      },
      {
        label: "Inactive",
        tokens: [
          { name: "inactiveBackgroundDefault", description: "Default bg" },
          { name: "inactiveBackgroundWeak",    description: "Weak bg" },
          { name: "inactiveTextDefault",       description: "Text" },
          { name: "inactiveIconDefault",       description: "Icon" },
        ],
      },
    ],
  },
  {
    label: "Accents (A–J)",
    groups: [{
      label: "Data Visualization",
      tokens: [
        { name: "accentADefault", description: "Accent A — Lavender" },
        { name: "accentAWeak",    description: "Accent A weak" },
        { name: "accentBDefault", description: "Accent B — Sunset" },
        { name: "accentBWeak",    description: "Accent B weak" },
        { name: "accentCDefault", description: "Accent C — Soft salmon" },
        { name: "accentCWeak",    description: "Accent C weak" },
        { name: "accentDDefault", description: "Accent D — Deep plum" },
        { name: "accentDWeak",    description: "Accent D weak" },
        { name: "accentEDefault", description: "Accent E — Lime" },
        { name: "accentEWeak",    description: "Accent E weak" },
        { name: "accentFDefault", description: "Accent F — Deep orange" },
        { name: "accentFWeak",    description: "Accent F weak" },
        { name: "accentGDefault", description: "Accent G — Night sky" },
        { name: "accentGWeak",    description: "Accent G weak" },
        { name: "accentHDefault", description: "Accent H — Deep navy" },
        { name: "accentHWeak",    description: "Accent H weak" },
        { name: "accentIDefault", description: "Accent I — Pink" },
        { name: "accentIWeak",    description: "Accent I weak" },
        { name: "accentJDefault", description: "Accent J — Teal" },
        { name: "accentJWeak",    description: "Accent J weak" },
      ],
    }],
  },
];

// ─── Token sub-components ─────────────────────────────────────────────────────

function ColorSwatch({ value }: { value: string }) {
  return (
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: "6px",
        flexShrink: 0,
        bgcolor: value || "transparent",
        border: "1.5px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    />
  );
}

function TokenCopyChip({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    });
  };
  return (
    <Tooltip title={copied ? "Copied!" : "Copy"} placement="top">
      <Box
        onClick={copy}
        sx={{
          fontFamily: "monospace",
          fontSize: "0.66rem",
          px: 0.75,
          py: 0.2,
          borderRadius: "4px",
          bgcolor: "action.hover",
          cursor: "pointer",
          userSelect: "none",
          color: "text.primary",
          opacity: 0.65,
          "&:hover": { opacity: 1 },
          transition: "opacity 0.12s",
          letterSpacing: 0,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Box>
    </Tooltip>
  );
}

function TokenRow({ name, description }: TokenEntry) {
  const theme = useTheme();
  const vars  = theme.palette.vars as unknown as Record<string, string>;
  const value = vars[name] ?? "";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 0.6,
        px: 1,
        borderRadius: 1,
        "&:hover": { bgcolor: "action.hover" },
        transition: "background-color 0.1s",
      }}
    >
      <ColorSwatch value={value} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 500, color: "text.primary", lineHeight: 1.3 }}>
          {name}
        </Typography>
        {description && (
          <Typography sx={{ fontSize: "0.62rem", color: "text.primary", opacity: 0.45, lineHeight: 1.2 }}>
            {description}
          </Typography>
        )}
      </Box>
      {value && <TokenCopyChip text={value} />}
    </Box>
  );
}

function TokenGroupBlock({ group }: { group: TokenGroup }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "text.primary", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5, px: 1 }}>
        {group.label}
      </Typography>
      <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
        {group.tokens.map((t, i) => (
          <React.Fragment key={t.name}>
            {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
            <TokenRow {...t} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

// ─── Token sections ───────────────────────────────────────────────────────────

function C1DPrimitiveRow({ name, value, description }: { name: string; value: string; description?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1100); });
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.6, px: 1, borderRadius: 1, "&:hover": { bgcolor: "action.hover" }, transition: "background-color 0.1s" }}>
      <ColorSwatch value={value} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 500, color: "text.primary", lineHeight: 1.3 }}>{name}</Typography>
        {description && <Typography sx={{ fontSize: "0.62rem", color: "text.primary", opacity: 0.45, lineHeight: 1.2 }}>{description}</Typography>}
      </Box>
      <Tooltip title={copied ? "Copied!" : "Copy"} placement="top">
        <Box onClick={copy} sx={{ fontFamily: "monospace", fontSize: "0.66rem", px: 0.75, py: 0.2, borderRadius: "4px", bgcolor: "action.hover", cursor: "pointer", color: "text.primary", opacity: 0.65, "&:hover": { opacity: 1 }, whiteSpace: "nowrap" }}>
          {value}
        </Box>
      </Tooltip>
    </Box>
  );
}

function ColorTokensSection() {
  const theme = useTheme();
  const vars = theme.palette.vars as unknown as Record<string, string>;
  // agentcyBlue = #00BCEB in both C1D dark and C1D light themes
  const isIoc = vars.agentcyBlue === "#00BCEB";

  return (
    <>
      {isIoc && (
        <Box sx={{ mb: 5 }}>
          <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "primary.main", bgcolor: "action.hover", display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#00BCEB", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "primary.main" }}>
              C1D Dark — Cisco 1 Design primitive tokens
            </Typography>
          </Box>
          {C1D_PRIMITIVE_TOKENS.map((section) => (
            <Box key={section.label} sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "text.primary", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5, px: 1 }}>
                {section.label}
              </Typography>
              <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
                {section.tokens.map((t, i) => (
                  <React.Fragment key={t.name}>
                    {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
                    <C1DPrimitiveRow {...t} />
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          ))}
          <Box sx={{ mx: 0, my: 3, borderTop: "1px solid", borderColor: "divider", opacity: 0.4 }} />
          <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "primary.main", textTransform: "uppercase", letterSpacing: "0.1em", mb: 2 }}>
            C1D Semantic Tokens
          </Typography>
        </Box>
      )}
      {COLOR_TOKEN_SECTIONS.map((section) => (
        <Box key={section.label} sx={{ mb: 4 }}>
          <Typography
            sx={{ fontSize: "0.7rem", fontWeight: 700, color: "primary.main", textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}
          >
            {section.label}
          </Typography>
          {section.groups.map((group) => (
            <TokenGroupBlock key={group.label} group={group} />
          ))}
        </Box>
      ))}

      {/* Glow tokens */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "primary.main", textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}>
          Glows
        </Typography>
        <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
          {(["glowPrimary","glowSecondary","glowSuccess","glowWarning","glowNegative","glowSevere","glowExcellent","glowNeutral"] as const).map((key, i) => {
            const value = (vars as Record<string, string>)[key] ?? "none";
            const label = key.replace("glow", "").replace(/([A-Z])/g, " $1").trim();
            const isNone = value === "none";
            // Extract the first colour from the box-shadow string for the swatch background
            const colorMatch = value.match(/#[0-9a-fA-F]{6,8}|rgba?\([^)]+\)/);
            const swatchColor = colorMatch ? colorMatch[0].replace(/[A-Fa-f0-9]{2}$/, "") : "transparent";
            return (
              <React.Fragment key={key}>
                {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.5, "&:hover": { bgcolor: "action.hover" } }}>
                  {/* Glow swatch — a small circle that glows if the token is active */}
                  <Box sx={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, bgcolor: isNone ? "transparent" : swatchColor, border: "1px solid", borderColor: "divider", boxShadow: isNone ? "none" : value }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: "text.primary" }}>
                      vars.{key}
                    </Typography>
                    <Typography sx={{ fontSize: "0.6rem", color: "text.primary", opacity: 0.45, mt: 0.25 }}>{label}</Typography>
                  </Box>
                  {isNone
                    ? <Typography sx={{ fontSize: "0.65rem", color: "text.primary", opacity: 0.3, fontFamily: "monospace" }}>none</Typography>
                    : <TokenCopyChip text={`theme.palette.vars.${key}`} />
                  }
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>

      {/* Gradient tokens */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "primary.main", textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}>
          Gradients
        </Typography>
        <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
          {(["gradientPrimary", "gradientSecondary", "gradientNegative", "gradientBrand", ...(isIoc ? ["gradientPage"] : [])] as const).map((key, i) => {
            const value = (vars as Record<string, string>)[key] ?? "";
            const label = key.replace("gradient", "").replace(/([A-Z])/g, " $1").trim();
            return (
              <React.Fragment key={key}>
                {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.5, "&:hover": { bgcolor: "action.hover" } }}>
                  <Box sx={{ width: 48, height: 28, borderRadius: "6px", background: value, flexShrink: 0, border: "1px solid", borderColor: "divider" }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: "text.primary" }}>
                      vars.{key}
                    </Typography>
                    <Typography sx={{ fontSize: "0.6rem", color: "text.primary", opacity: 0.45, mt: 0.25, wordBreak: "break-all" }}>
                      {label}
                    </Typography>
                  </Box>
                  <TokenCopyChip text={`theme.palette.vars.${key}`} />
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

const TYPOGRAPHY_VARIANTS = [
  { variant: "h1",        meta: "Sharp Sans 700, 60px",   sample: "Aa" },
  { variant: "h2",        meta: "Sharp Sans 700, 48px",   sample: "Aa" },
  { variant: "h3",        meta: "Sharp Sans 700, 36px",   sample: "Aa" },
  { variant: "h4",        meta: "Sharp Sans 700, 24px",   sample: "Heading Four" },
  { variant: "h5",        meta: "Sharp Sans 700, 20px",   sample: "Heading Five" },
  { variant: "h6",        meta: "Sharp Sans 700, 18px",   sample: "Heading Six" },
  { variant: "subtitle1", meta: "Inter 500, 16px",        sample: "Subtitle One" },
  { variant: "subtitle2", meta: "Inter 500, 14px",        sample: "Subtitle Two" },
  { variant: "body1",     meta: "Inter 400, 14px",        sample: "Body one — paragraph text for reading." },
  { variant: "body2",     meta: "Inter 400, 12px",        sample: "Body two — smaller paragraph text." },
  { variant: "button",    meta: "Inter 600, 12px",        sample: "Button Label" },
  { variant: "caption",   meta: "Inter 400, 12px",        sample: "Caption label" },
  { variant: "overline",  meta: "Inter 600, 10px",        sample: "OVERLINE TEXT" },
] as const;

function TypographyTokensSection() {
  return (
    <>
      <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden", mb: 3 }}>
        {TYPOGRAPHY_VARIANTS.map(({ variant, meta, sample }, i) => (
          <React.Fragment key={variant}>
            {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, px: 2.5, py: 1.5, "&:hover": { bgcolor: "action.hover" } }}>
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <Typography variant={variant as any} sx={{ lineHeight: 1.1 }}>{sample}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: "text.primary", opacity: 0.45 }}>{meta}</Typography>
              </Box>
              <TokenCopyChip text={variant} />
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "text.primary", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.75, px: 0.5 }}>
        Font Families
      </Typography>
      <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
        {[
          { name: "Inter",      role: "Body, UI, captions, buttons", sample: "The quick brown fox jumps over the lazy dog." },
          { name: "Sharp Sans", role: "Display headings (H1–H6)",     sample: "Sharp Sans — Heading Display" },
        ].map(({ name, role, sample }, i) => (
          <React.Fragment key={name}>
            {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
            <Box sx={{ px: 2.5, py: 1.5, "&:hover": { bgcolor: "action.hover" } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: "text.primary" }}>{name}</Typography>
                <Typography sx={{ fontSize: "0.62rem", color: "text.primary", opacity: 0.45 }}>{role}</Typography>
              </Box>
              <Typography sx={{ fontSize: "0.85rem", color: "text.primary", opacity: 0.65 }}>{sample}</Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}

function ShadowTokensSection() {
  const theme = useTheme();
  const labels = ["None", "Lifted — subtle card lift", "Subtle — card resting", "Raised — elevated card", "Floating — modal / dropdown", "Side Drawer — sheet overlay"];
  return (
    <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
      {([0, 1, 2, 3, 4, 5] as const).map((level, i) => (
        <React.Fragment key={level}>
          {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, px: 2.5, py: 2, "&:hover": { bgcolor: "action.hover" } }}>
            <Box sx={{ width: 52, height: 36, borderRadius: 1.5, bgcolor: "background.paper", border: "1px solid", borderColor: "divider", boxShadow: theme.shadows[level], flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: "text.primary" }}>elevation={level}</Typography>
              <Typography sx={{ fontSize: "0.62rem", color: "text.primary", opacity: 0.45 }}>{labels[level]}</Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}

function SpacingTokensSection() {
  const theme = useTheme();

  const steps = [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
  const aliases: Record<number, string> = {
    0: "none",
    0.25: "xxxs",
    0.5: "xxs",
    1: "xs",
    1.5: "sm",
    2: "md",
    3: "lg",
    4: "xl",
    5: "2xl",
    6: "3xl",
    8: "4xl",
    10: "5xl",
    12: "6xl",
    16: "7xl",
    20: "8xl",
    24: "9xl",
  };

  return (
    <>
      <Typography sx={{ fontSize: "0.7rem", color: "text.primary", opacity: 0.5, mb: 2, lineHeight: 1.6 }}>
        Spacing is based on an 8px base unit — <code>theme.spacing(n)</code> = <code>n × 8px</code>.
        Use MUI's <code>sx</code> prop shorthand (e.g. <code>p={"{2}"}</code> = 16px) or token aliases below.
      </Typography>
      <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", bgcolor: "background.paper", overflow: "hidden" }}>
        {steps.map((step, i) => {
          const px = theme.spacing(step);
          const alias = aliases[step];
          const barWidth = Math.min((step / 12) * 100, 100);
          return (
            <React.Fragment key={step}>
              {i > 0 && <Box sx={{ borderTop: "1px solid", borderColor: "divider", opacity: 0.4 }} />}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 2.5, py: 1.25, "&:hover": { bgcolor: "action.hover" } }}>
                {/* Visual bar */}
                <Box sx={{ width: 120, flexShrink: 0 }}>
                  <Box sx={{ height: 10, borderRadius: "100px", bgcolor: "primary.main", width: `${Math.max(barWidth, step === 0 ? 0 : 2)}%`, opacity: 0.75, minWidth: step === 0 ? 0 : 3 }} />
                </Box>
                {/* Token name */}
                <Box sx={{ width: 60, flexShrink: 0 }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 600, color: "text.primary" }}>
                    spacing({step})
                  </Typography>
                </Box>
                {/* Alias */}
                <Box sx={{ width: 48, flexShrink: 0 }}>
                  <Typography sx={{ fontSize: "0.65rem", color: "primary.main", opacity: 0.8 }}>{alias}</Typography>
                </Box>
                {/* px value */}
                <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: "text.primary", opacity: 0.5 }}>
                  {px}
                </Typography>
                <Box sx={{ flex: 1 }} />
                <TokenCopyChip text={`theme.spacing(${step})`} />
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </>
  );
}

// ─── Dashboard template ───────────────────────────────────────────────────────

const DASH_EVENTS = [
  { id: "EVT-001", time: "09:41", type: "Brute Force",       severity: Severity.CRITICAL, source: "192.168.1.45",   tagStatus: TagStatus.Negative   },
  { id: "EVT-002", time: "09:38", type: "Port Scan",         severity: Severity.HIGH,     source: "10.0.0.120",    tagStatus: TagStatus.Warning     },
  { id: "EVT-003", time: "09:22", type: "Malware Detected",  severity: Severity.CRITICAL, source: "WS-2847",       tagStatus: TagStatus.Info        },
  { id: "EVT-004", time: "09:15", type: "Failed Auth ×12",   severity: Severity.MEDIUM,   source: "AD-Server",     tagStatus: TagStatus.Positive    },
  { id: "EVT-005", time: "08:54", type: "Data Exfiltration", severity: Severity.HIGH,     source: "192.168.5.99",  tagStatus: TagStatus.Negative    },
  { id: "EVT-006", time: "08:30", type: "Config Change",     severity: Severity.LOW,      source: "Admin-01",      tagStatus: TagStatus.Excellent   },
  { id: "EVT-007", time: "08:12", type: "Unusual Login",     severity: Severity.MEDIUM,   source: "User: j.smith", tagStatus: TagStatus.Warning     },
];

const DASH_STATUS_LABEL: Record<string, string> = {
  [TagStatus.Negative]:  "Active",
  [TagStatus.Warning]:   "Investigating",
  [TagStatus.Info]:      "Contained",
  [TagStatus.Positive]:  "Resolved",
  [TagStatus.Excellent]: "Resolved",
};

const DASH_KPI = [
  { label: "Active Threats",   value: "12",    sub: "↑ 3 since yesterday", subColor: "error.main"     },
  { label: "Compliance",       value: "98.2%", sub: "↑ 0.4% this week",    subColor: "success.main"   },
  { label: "Endpoints Online", value: "847",   sub: "of 852 total",         subColor: "text.primary"   },
  { label: "Open Incidents",   value: "3",     sub: "2 high priority",      subColor: "warning.main"   },
];

const DASH_BAR = [
  { name: "Brute Force",  value: 28, color: "#ef4444" },
  { name: "Malware",      value: 19, color: "#f97316" },
  { name: "Phishing",     value: 14, color: "#f59e0b" },
  { name: "Port Scan",    value: 11, color: "#3b82f6" },
  { name: "Exfiltration", value: 7,  color: "#8b5cf6" },
];

const DASH_COMPLIANCE = [
  { label: "Patch Compliance", value: 94  },
  { label: "MFA Coverage",     value: 88  },
  { label: "Encryption",       value: 100 },
  { label: "Access Reviews",   value: 76  },
];

const DASH_RISK_LINE = [
  { date: "2024-01-08", Risk: 42 },
  { date: "2024-01-09", Risk: 38 },
  { date: "2024-01-10", Risk: 35 },
  { date: "2024-01-11", Risk: 31 },
  { date: "2024-01-12", Risk: 29 },
  { date: "2024-01-13", Risk: 28 },
  { date: "2024-01-14", Risk: 29 },
];
const DASH_RISK_CATEGORIES = [{ name: "Risk", color: "#00BCEB" }];
const DASH_GAUGE_DATA = [{ name: "Security Score", value: 85, color: "#00BCEB" }];


// ── Dashboard (same content across all themes, look & feel from active theme) ──
/** Renders a Card in non-C1D themes; a spacious transparent Box in C1D. */
function DashCard({ children, sx = {} }: { children: React.ReactNode; sx?: object }) {
  const theme = useTheme();
  const isIoc = theme.palette.primary.main === "#00BCEB";
  if (isIoc) {
    return (
      <Box sx={{
        ...sx,
        "& .MuiCardContent-root": { p: 0 },
      }}>
        <Box sx={{ px: 1, py: 2 }}>{children}</Box>
      </Box>
    );
  }
  return <Card sx={sx}>{children}</Card>;
}

function DashboardSection() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const theme = useTheme();
  const isIoc = theme.palette.primary.main === "#00BCEB";

  return (
    <>
      {/* ── KPI row ── */}
      <Stack direction="row" spacing={isIoc ? 3 : 2} flexWrap="wrap" useFlexGap sx={{ mb: isIoc ? 4 : 3 }}>
        {DASH_KPI.map(({ label, value, sub, subColor }) => (
          <DashCard key={label} sx={{ flex: "1 1 180px", minWidth: 160 }}>
            <CardContent>
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "text.primary", textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.5, opacity: 0.6 }}>
                {label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.1, mb: 0.5 }}>
                {value}
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: subColor }}>
                {sub}
              </Typography>
            </CardContent>
          </DashCard>
        ))}
      </Stack>

      {/* ── Middle row: bar chart + compliance + gauge ── */}
      <Stack direction="row" spacing={isIoc ? 3 : 2} sx={{ mb: isIoc ? 4 : 3 }} flexWrap="wrap" useFlexGap>
        <DashCard sx={{ flex: "1 1 0", minWidth: 0 }}>
          <CardContent>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, mb: isIoc ? 3 : 2, color: "text.primary" }}>
              Threat Distribution
            </Typography>
            <Box sx={{
              height: 200,
              ...(isIoc && {
                "& svg": { overflow: "visible !important" },
                "& .recharts-bar-rectangle path": {
                  filter: "drop-shadow(0 0 4px rgba(0,188,235,0.35))",
                },
              }),
            }}>
              <SectionErrorBoundary name="DashboardBarChart">
                <BarChart data={DASH_BAR} />
              </SectionErrorBoundary>
            </Box>
          </CardContent>
        </DashCard>

        <DashCard sx={{ flex: "1 1 0", minWidth: 0 }}>
          <CardContent>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, mb: isIoc ? 3 : 2, color: "text.primary" }}>
              Compliance Overview
            </Typography>
            <Box sx={{
              height: 200,
              ...(isIoc && {
                "& [data-compliance-bar]": {
                  filter: "drop-shadow(0 0 4px currentColor)",
                },
              }),
            }}>
              <SectionErrorBoundary name="ComplianceHorizontalBar">
                <HorizontalBarChart
                  data={DASH_COMPLIANCE.map(({ label, value }) => ({
                    name: label,
                    value,
                    color: value >= 90
                      ? theme.palette.success.main
                      : value >= 80
                      ? theme.palette.warning.main
                      : theme.palette.error.main,
                  }))}
                />
              </SectionErrorBoundary>
            </Box>
          </CardContent>
        </DashCard>

        <DashCard sx={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <CardContent sx={{ textAlign: "center", width: "100%" }}>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, mb: 1, color: "text.primary" }}>
              Security Score
            </Typography>
            <Box sx={{ height: 160 }}>
              <SectionErrorBoundary name="DashboardGauge">
                <GaugeChart data={DASH_GAUGE_DATA} />
              </SectionErrorBoundary>
            </Box>
          </CardContent>
        </DashCard>
      </Stack>

      {/* ── Risk trend row ── */}
      <DashCard sx={{ mb: isIoc ? 4 : 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: isIoc ? 3 : 2 }}>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "text.primary" }}>
              Risk Trends — 7-Day Score
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: "success.main", fontWeight: 600 }}>
              ↓ 13 pts improved
            </Typography>
          </Box>
          <Box sx={{ height: 160, ...(isIoc && { "& svg": { overflow: "visible !important" } }) }}>
            <SectionErrorBoundary name="DashboardLineChart">
              {isIoc ? (
                /* C1D: filled area chart with gradient + glow */
                <RRC width="100%" height="100%">
                  <defs>
                    <linearGradient id="riskAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      {/* Matches reference: solid deep-blue fill fading to near-transparent navy */}
                      <stop offset="0%"  stopColor="rgba(30,100,220,0.75)" />
                      <stop offset="60%" stopColor="rgba(10,40,120,0.55)" />
                      <stop offset="100%" stopColor="rgba(5,15,50,0.20)" />
                    </linearGradient>
                  </defs>
                  <AreaChart data={DASH_RISK_LINE} margin={{ top: 10, right: 8, bottom: 0, left: -10 }}>
                    <RXAxis
                      dataKey="date"
                      tickFormatter={(v: string) => ["Mon","Tues","Wed","Thur","Fri","Sat","Sun"][new Date(v).getDay() === 0 ? 6 : new Date(v).getDay() - 1] ?? v.slice(5)}
                      tick={{ fontSize: 10, fill: "rgba(255,255,255,0.38)" }}
                      axisLine={false} tickLine={false}
                    />
                    <RYAxis domain={["dataMin - 3", "dataMax + 3"]} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.38)" }} axisLine={false} tickLine={false} width={28} />
                    <RGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <RTooltip
                      contentStyle={{ backgroundColor: "#0C1B35", border: "1px solid rgba(0,188,235,0.25)", borderRadius: 8, fontSize: 12, color: "#fff" }}
                      cursor={{ stroke: "rgba(0,188,235,0.3)", strokeWidth: 1, strokeDasharray: "4 3" }}
                    />
                    <Area
                      type="monotone" dataKey="Risk"
                      stroke="#40D0F4" strokeWidth={2.5}
                      fill="url(#riskAreaGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#40D0F4", stroke: "rgba(64,208,244,0.45)", strokeWidth: 8 }}
                      style={{ filter: "drop-shadow(0 0 5px rgba(0,188,235,0.8)) drop-shadow(0 0 12px rgba(0,188,235,0.4))" }}
                    />
                  </AreaChart>
                </RRC>
              ) : (
                <LineChart
                  data={DASH_RISK_LINE}
                  categories={DASH_RISK_CATEGORIES}
                  xAxisProps={{ dataKey: "date", tickFormatter: (v: string) => v.slice(5) }}
                />
              )}
            </SectionErrorBoundary>
          </Box>
        </CardContent>
      </DashCard>

      {/* ── Security events table ── */}
      <DashCard>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: isIoc ? 3 : 2 }}>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "text.primary" }}>
              Security Events
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined">Export</Button>
              <Button size="small" variant="primary">View All</Button>
            </Stack>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Event ID", "Time", "Type", "Severity", "Source", "Status", "Action"].map((h) => (
                    <TableCell key={h} sx={{ fontSize: "0.68rem", fontWeight: 700, color: "text.primary", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.06em", borderColor: "divider", py: 1 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {DASH_EVENTS.map((row) => {
                  const isSelected = selectedRow === row.id;
                  return (
                    <TableRow
                      key={row.id}
                      onClick={() => setSelectedRow(isSelected ? null : row.id)}
                      sx={{
                        cursor: "pointer",
                        bgcolor: isSelected ? theme.palette.vars.baseBackgroundMedium : "transparent",
                        "&:hover": { bgcolor: theme.palette.vars.baseBackgroundHover },
                        "& td": { borderColor: "divider", py: 1, fontSize: "0.78rem" },
                      }}
                    >
                      <TableCell sx={{ color: "text.primary", opacity: 0.7, fontWeight: 600 }}>{row.id}</TableCell>
                      <TableCell sx={{ color: "text.primary", opacity: 0.55, whiteSpace: "nowrap" }}>{row.time}</TableCell>
                      <TableCell sx={{ color: "text.primary" }}>{row.type}</TableCell>
                      <TableCell>
                        <SeverityBadge severity={row.severity} />
                      </TableCell>
                      <TableCell sx={{ color: "text.primary", opacity: 0.65 }}>{row.source}</TableCell>
                      <TableCell>
                        <Tag status={row.tagStatus} size={"small" as any}>{DASH_STATUS_LABEL[row.tagStatus]}</Tag>
                      </TableCell>
                      <TableCell>
                        <Button size="small" variant="tertariary" sx={{ fontSize: "0.68rem", py: 0, minWidth: 0, px: 1 }}>Review</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </DashCard>
    </>
  );
}

// ─── Category renderer ────────────────────────────────────────────────────────

const SECTION_META: Record<string, { title: string; description: string; Component: React.FC; wide?: boolean }> = {
  buttons:    { title: "Buttons & Actions",  description: "Interactive controls for triggering actions. All variants, sizes, colors, and specialized button types.", Component: ButtonsSection },
  forms:      { title: "Form Controls",      description: "Input components for collecting user data — switches, checkboxes, sliders, selects, and text fields.", Component: FormsSection },
  data:       { title: "Data Display",       description: "Components for presenting information: typography, badges, severity indicators, tags, and avatars.", Component: DataDisplaySection },
  navigation: { title: "Navigation",         description: "Components that help users move through the interface: tabs, breadcrumbs, pagination, and links.", Component: NavigationSection },
  feedback:   { title: "Feedback & Status",  description: "Loading states, alerts, notifications, and collapsible content to communicate system status.", Component: FeedbackSection },
  layout:     { title: "Layout & Structure", description: "Structural components for organizing content on the page.", Component: LayoutSection },
  charts:     { title: "Charts",             description: "Data visualization components built on Recharts. All charts adapt to the active theme.", Component: ChartsSection },
  dashboard:  { title: "Dashboard Template", description: "Security operations dashboard — action cards, activity timeline, status gauge, and risk trends. Fully theme-aware.", Component: DashboardSection, wide: true },
  color:      { title: "Color Tokens",       description: "Semantic color tokens — base, brand, control, interactive, status, and accent colors for both AGNTCY light and dark themes.", Component: ColorTokensSection },
  typography: { title: "Typography",         description: "Type scale: font families, sizes, weights, and variants across all text styles.", Component: TypographyTokensSection },
  shadows:    { title: "Shadows",            description: "Elevation shadow levels from flat (0) to side-drawer (5).", Component: ShadowTokensSection },
  spacing:    { title: "Spacing",            description: "8px base-unit spacing scale — from 0 to 24 steps, with semantic aliases and px values.", Component: SpacingTokensSection },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComponentDocs() {
  const urlTheme = new URLSearchParams(window.location.search).get("theme") as DocThemeMode | null;
  const [activeTheme, setActiveTheme] = useState<DocThemeMode>(
    urlTheme && THEMES.some((t) => t.value === urlTheme) ? urlTheme : "light"
  );
  const [activeCategory, setActiveCategory] = useState("buttons");
  const mainRef = useRef<HTMLDivElement>(null);

  const { title, description, Component, wide } = SECTION_META[activeCategory];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const isC1D     = activeTheme === "ioc" || activeTheme === "ioc-light";
  const isIoc     = isC1D; // alias used throughout for C1D-specific layout/spacing
  const isIocDark = activeTheme === "ioc"; // dark-only: gradient backdrop, glows

  // Nav item style — C1D: full-width teal-tinted rounded highlight, no border
  const navItemSx = (isActive: boolean) =>
    isIoc
      ? {
          display: "flex", alignItems: "center", gap: 1.5,
          width: "calc(100% - 16px)", mx: 1,
          px: 1.5, py: 0.85,
          border: "none", outline: "none", cursor: "pointer",
          borderRadius: "8px",
          bgcolor: isActive ? "rgba(0,188,235,0.12)" : "transparent",
          // Dark C1D: light text on dark bg. Light C1D: dark navy/teal on white.
          color: isActive
            ? (isIocDark ? "#00BCEB" : "#006B8A")
            : (isIocDark ? "#C8D6E8" : "#0A1628"),
          transition: "all 0.15s",
          "&:hover": {
            bgcolor: isActive ? "rgba(0,188,235,0.16)" : "rgba(0,188,235,0.06)",
            color: isIocDark ? "#00BCEB" : "#006B8A",
          },
        }
      : {
          display: "flex", alignItems: "center", gap: 1.5, width: "100%",
          px: 2.5, py: 1.0, border: "none", outline: "none", cursor: "pointer",
          bgcolor: isActive ? "action.selected" : "transparent",
          color: isActive ? "primary.light" : "text.primary",
          borderLeft: isActive ? "3px solid" : "3px solid transparent",
          borderColor: isActive ? "primary.light" : "transparent",
          transition: "all 0.12s",
          "&:hover": { bgcolor: "action.hover", color: "primary.light" },
        };

  return (
    <ThemeProvider mode={activeTheme}>
      {/* Fixed gradient backdrop for C1D dark */}
      {isIocDark && (
        <Box sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: `
            radial-gradient(ellipse 130% 90% at -15% -5%, rgba(0,70,160,0.50) 0%, rgba(0,40,100,0.15) 45%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 60% 110%, rgba(0,30,80,0.30) 0%, transparent 60%),
            linear-gradient(160deg, #07111F 0%, #050C18 40%, #030810 100%)
          `,
          pointerEvents: "none",
        }} />
      )}
      {/* Fixed gradient backdrop for C1D light */}
      {activeTheme === "ioc-light" && (
        <Box sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: `
            radial-gradient(ellipse 120% 80% at -10% -8%, rgba(0,188,235,0.13) 0%, rgba(0,130,200,0.06) 40%, transparent 65%),
            radial-gradient(ellipse 70% 60% at 100% 100%, rgba(43,130,246,0.07) 0%, transparent 55%),
            linear-gradient(150deg, #EBF6FF 0%, #F4F9FF 45%, #FAFCFF 100%)
          `,
          pointerEvents: "none",
        }} />
      )}
      <Box sx={{ minHeight: "100vh", bgcolor: isC1D ? "transparent" : "background.default", color: "text.primary", display: "flex", flexDirection: "column", overflowX: "hidden" }}>

        {/* ── Header ── */}
        <Box
          component="header"
          sx={{
            height: HEADER_HEIGHT,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            bgcolor: isIocDark ? "rgba(7,17,31,0.80)" : activeTheme === "ioc-light" ? "rgba(255,255,255,0.75)" : "background.paper",
            backdropFilter: isC1D ? "blur(20px)" : "none",
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            px: 2,
            gap: 2,
          }}
        >
          <Typography variant="subtitle2" noWrap sx={{ flexShrink: 0, fontWeight: 600 }}>
            Open UI Kit
          </Typography>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Typography variant="caption" noWrap sx={{ flex: 1, minWidth: 0, color: "text.primary", opacity: 0.6 }}>
            Component Reference
          </Typography>

          {/* Theme Switcher */}
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0 }}>
            <Typography variant="caption" sx={{ mr: 0.5, whiteSpace: "nowrap", color: "text.primary", opacity: 0.6 }}>
              Theme:
            </Typography>
            {THEMES.map((t) => {
              const isActive = activeTheme === t.value;
              return (
                <Box
                  key={t.value}
                  component="button"
                  onClick={() => setActiveTheme(t.value)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1,
                    py: 0.4,
                    borderRadius: 1.5,
                    border: isActive ? "2px solid" : "1.5px solid",
                    borderColor: isActive ? "primary.main" : "divider",
                    bgcolor: isActive ? "action.selected" : "transparent",
                    color: "text.primary",
                    cursor: "pointer",
                    outline: "none",
                    transition: "all 0.12s",
                    "&:hover": { bgcolor: "action.hover", borderColor: "primary.light" },
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: t.bg,
                      // box-shadow ring: always contrast regardless of theme bg
                      boxShadow: isActive
                        ? "0 0 0 1.5px var(--mui-palette-primary-main)"
                        : "0 0 0 1px rgba(128,128,128,0.5)",
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: isActive ? 700 : 400, whiteSpace: "nowrap", fontSize: "0.72rem" }}
                  >
                    {t.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* ── Body (sidebar + main) ── */}
        <Box sx={{ display: "flex", pt: `${HEADER_HEIGHT}px`, flex: 1 }}>

          {/* Sidebar */}
          <Box
            component="nav"
            sx={{
              width: SIDEBAR_WIDTH,
              flexShrink: 0,
              position: "fixed",
              top: HEADER_HEIGHT,
              bottom: 0,
              overflowY: "auto",
              bgcolor: isIocDark ? "rgba(7,17,31,0.70)" : activeTheme === "ioc-light" ? "rgba(255,255,255,0.70)" : "background.paper",
              backdropFilter: isC1D ? "blur(20px)" : "none",
              borderRight: "1px solid",
              borderColor: "divider",
              py: 2,
            }}
          >
            {/* Components group */}
            <Typography
              variant="overline"
              sx={{ px: 2.5, display: "block", mb: 0.75, fontSize: "0.62rem", color: "text.primary", letterSpacing: "0.1em", fontWeight: 700 }}
            >
              Components
            </Typography>

            {COMPONENT_CATEGORIES.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Box key={id} component="button" onClick={() => handleCategoryChange(id)} sx={navItemSx(isActive)}>
                  <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontWeight: isActive ? 600 : 400, fontSize: "0.825rem", textAlign: "left", lineHeight: 1.3 }}>
                    {label}
                  </Typography>
                </Box>
              );
            })}

            {/* Templates group */}
            <Box sx={{ mx: 2, my: 1.5, borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />
            <Typography
              variant="overline"
              sx={{ px: 2.5, display: "block", mb: 0.75, fontSize: "0.62rem", color: "text.primary", letterSpacing: "0.1em", fontWeight: 700 }}
            >
              Templates
            </Typography>

            {TEMPLATE_CATEGORIES.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Box key={id} component="button" onClick={() => handleCategoryChange(id)} sx={navItemSx(isActive)}>
                  <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontWeight: isActive ? 600 : 400, fontSize: "0.825rem", textAlign: "left", lineHeight: 1.3 }}>
                    {label}
                  </Typography>
                </Box>
              );
            })}

            {/* Tokens group */}
            <Box sx={{ mx: 2, my: 1.5, borderTop: "1px solid", borderColor: "divider", opacity: 0.5 }} />
            <Typography
              variant="overline"
              sx={{ px: 2.5, display: "block", mb: 0.75, fontSize: "0.62rem", color: "text.primary", letterSpacing: "0.1em", fontWeight: 700 }}
            >
              Tokens
            </Typography>

            {TOKEN_CATEGORIES.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Box key={id} component="button" onClick={() => handleCategoryChange(id)} sx={navItemSx(isActive)}>
                  <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontWeight: isActive ? 600 : 400, fontSize: "0.825rem", textAlign: "left", lineHeight: 1.3 }}>
                    {label}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Main content */}
          <Box
            ref={mainRef}
            sx={{
              ml: `${SIDEBAR_WIDTH}px`,
              width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
              overflowY: "auto",
              overflowX: "hidden",
              height: `calc(100vh - ${HEADER_HEIGHT}px)`,
              px: { xs: 3, md: 5 },
              py: 4,
            }}
          >
            {/* Section header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>
                {title}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.primary", opacity: 0.65 }}>
                {description}
              </Typography>
              <Divider sx={{ mt: 3 }} />
            </Box>

            {/* Components */}
            <Box sx={{ maxWidth: wide ? "none" : 860 }}>
              <Component />
            </Box>

            {/* Footer */}
            <Box sx={{ mt: 6, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography variant="caption" sx={{ color: "text.primary", opacity: 0.4 }}>
                Open UI Kit · Apache 2.0 · {COMPONENT_CATEGORIES.length} components · {TEMPLATE_CATEGORIES.length} template · {TOKEN_CATEGORIES.length} token sections
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
