/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, Component } from "react";
import {
  AreaChart,
  Area,
  XAxis as RXAxis,
  YAxis as RYAxis,
  CartesianGrid as RGrid,
  Tooltip as RTooltip,
  ResponsiveContainer as RRC,
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
  Icons,
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
import AppsIcon from "@mui/icons-material/Apps";
import Tooltip from "@mui/material/Tooltip";

// ─── Icon catalogue imports ───────────────────────────────────────────────────
import type { SvgIconComponent } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningIcon from "@mui/icons-material/Warning";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShieldIcon from "@mui/icons-material/Shield";
import SecurityIcon from "@mui/icons-material/Security";
import BugReportIcon from "@mui/icons-material/BugReport";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import CodeIcon from "@mui/icons-material/Code";
import DataObjectIcon from "@mui/icons-material/DataObject";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RouterIcon from "@mui/icons-material/Router";
import DnsIcon from "@mui/icons-material/Dns";
import LanIcon from "@mui/icons-material/Lan";
import DevicesIcon from "@mui/icons-material/Devices";
import ComputerIcon from "@mui/icons-material/Computer";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HelpIcon from "@mui/icons-material/Help";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SyncIcon from "@mui/icons-material/Sync";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import TerminalIcon from "@mui/icons-material/Terminal";
import ApiIcon from "@mui/icons-material/Api";
import KeyIcon from "@mui/icons-material/Key";
import HttpsIcon from "@mui/icons-material/Https";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

// ─── Error Boundary ──────────────────────────────────────────────────────────

class SectionErrorBoundary extends Component<
  { children: React.ReactNode; name: string },
  { error: Error | null }
> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "error.light",
            bgcolor: "action.hover",
          }}
        >
          <Typography
            variant="body2"
            color="error.main"
            sx={{ fontWeight: 600, mb: 0.5 }}
          >
            Failed to render {this.props.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.primary",
              opacity: 0.6,
              fontFamily: "monospace",
            }}
          >
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
  { value: "light", label: "AGNTCY light", bg: "#ffffff" },
  { value: "dark", label: "AGNTCY dark", bg: "#141418" },
  { value: "ioc", label: "C1D dark", bg: "#050C18" },
  { value: "ioc-light", label: "C1D light", bg: "#F0F7FF" },
];

const COMPONENT_CATEGORIES = [
  { id: "buttons", label: "Buttons & Actions", Icon: TouchAppIcon },
  { id: "forms", label: "Form Controls", Icon: TuneIcon },
  { id: "data", label: "Data Display", Icon: LabelIcon },
  { id: "navigation", label: "Navigation", Icon: ExploreIcon },
  { id: "feedback", label: "Feedback & Status", Icon: NotificationsIcon },
  { id: "layout", label: "Layout", Icon: DashboardIcon },
  { id: "charts", label: "Charts", Icon: BarChartIcon },
  { id: "icons", label: "Icons", Icon: AppsIcon },
];

const TOKEN_CATEGORIES = [
  { id: "color", label: "Color", Icon: PaletteIcon },
  { id: "typography", label: "Typography", Icon: TextFieldsIcon },
  { id: "shadows", label: "Shadows", Icon: LayersIcon },
  { id: "spacing", label: "Spacing", Icon: DashboardIcon },
];

const TEMPLATE_CATEGORIES = [
  { id: "dashboard", label: "Dashboard", Icon: TableChartIcon },
];

// ─── Chart sample data ───────────────────────────────────────────────────────

const BAR_DATA = [
  { name: "Critical", value: 42, color: "#ef4444" },
  { name: "High", value: 87, color: "#f97316" },
  { name: "Medium", value: 134, color: "#f59e0b" },
  { name: "Low", value: 61, color: "#3b82f6" },
  { name: "Info", value: 28, color: "#6b7280" },
];

const DONUT_DATA = [
  { name: "Critical", value: 42, color: "#ef4444" },
  { name: "High", value: 87, color: "#f97316" },
  { name: "Medium", value: 134, color: "#f59e0b" },
  { name: "Low", value: 61, color: "#3b82f6" },
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
  return isNaN(d.getTime())
    ? String(v)
    : d.toLocaleString("en", { month: "short" });
};

const LINE_CATEGORIES = [
  { name: "Critical", color: "#ef4444" },
  { name: "High", color: "#f97316" },
  { name: "Resolved", color: "#22c55e" },
];

const HBAR_DATA = [
  { name: "Cryptomining", value: 10, color: "#3b82f6" },
  { name: "Ransomware", value: 7, color: "#3b82f6" },
  { name: "Data Destruction", value: 5, color: "#3b82f6" },
  { name: "Data Exfiltration", value: 3, color: "#3b82f6" },
  { name: "Recon", value: 1, color: "#3b82f6" },
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
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Button — Negative Color">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="primary" color="negative">
            Primary Negative
          </Button>
          <Button variant="secondary" color="negative">
            Secondary Negative
          </Button>
          <Button variant="outlined" color="negative">
            Outlined Negative
          </Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Button — Sizes">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Button variant="primary" size="small">
            Small
          </Button>
          <Button variant="primary" size="medium">
            Medium
          </Button>
          <Button variant="primary" size="large">
            Large
          </Button>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Icon Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton color="default">
            <ShareIcon />
          </IconButton>
          <IconButton disabled>
            <PrintIcon />
          </IconButton>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Floating Action Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <Fab color="primary" size="small">
            <AddIcon />
          </Fab>
          <Fab color="primary">
            <AddIcon />
          </Fab>
          <Fab variant="extended" color="primary">
            <AddIcon sx={{ mr: 1 }} />
            New Item
          </Fab>
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
              <SpeedDialAction
                key={a.name}
                icon={a.icon}
                tooltipTitle={a.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </ComponentGroup>

      <ComponentGroup label="Copy Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <CopyButton text="npm install @open-ui-kit/core" />
          <Typography
            variant="body2"
            sx={{ color: "text.primary", opacity: 0.65 }}
          >
            Click to copy
          </Typography>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Favorite Button">
        <Stack direction="row" spacing={2} alignItems="center">
          <FavoriteButton
            onClick={() => setFavActive((v) => !v)}
            isChecked={favActive}
            withBackground
          />
          <Typography
            variant="body2"
            sx={{ color: "text.primary", opacity: 0.65 }}
          >
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
            control={
              <Toggle
                checked={toggleOn}
                onChange={(e) => setToggleOn(e.target.checked)}
              />
            }
            label={toggleOn ? "On" : "Off"}
            sx={{
              gap: 1,
              "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
            }}
          />
          <Toggle checked={false} />
          <Toggle disabled />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Checkbox">
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            }
            label="Checked"
          />
          <FormControlLabel control={<Checkbox />} label="Unchecked" />
          <FormControlLabel
            control={<Checkbox indeterminate />}
            label="Indeterminate"
          />
          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Radio Group">
        <RadioGroup
          row
          value={radioVal}
          onChange={(e) => setRadioVal(e.target.value)}
        >
          <FormControlLabel value="a" control={<Radio />} label="Option A" />
          <FormControlLabel value="b" control={<Radio />} label="Option B" />
          <FormControlLabel value="c" control={<Radio />} label="Option C" />
          <FormControlLabel
            value="d"
            control={<Radio disabled />}
            label="Disabled"
          />
        </RadioGroup>
      </ComponentGroup>

      <ComponentGroup label="Slider">
        <Box sx={{ maxWidth: 480, px: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: "text.primary", opacity: 0.6 }}
          >
            Single value
          </Typography>
          <Slider
            value={sliderVal}
            onChange={(_, v) => setSliderVal(v as number)}
            valueLabelDisplay="auto"
          />
          <Typography
            variant="caption"
            sx={{
              mt: 2,
              display: "block",
              color: "text.primary",
              opacity: 0.6,
            }}
          >
            Range
          </Typography>
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
          <Select
            value={selectVal}
            label="Select option"
            onChange={(e) => setSelectVal(e.target.value)}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
      </ComponentGroup>

      <ComponentGroup label="Text Field">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextField label="Outlined" variant="outlined" size="small" />
          <TextField
            label="Filled"
            variant="filled"
            size="small"
            defaultValue="Value"
          />
          <TextField
            label="Error"
            variant="outlined"
            size="small"
            error
            helperText="Required"
          />
          <TextField
            label="Disabled"
            variant="outlined"
            size="small"
            disabled
            value="Disabled"
          />
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
            <Typography key={v} variant={v}>
              {v.toUpperCase()} — The quick brown fox
            </Typography>
          ))}
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1">
            subtitle1 — Supporting subtitle text
          </Typography>
          <Typography variant="body1">
            body1 — Regular paragraph text used for main content areas.
          </Typography>
          <Typography variant="body2">
            body2 — Smaller body text for secondary information.
          </Typography>
          <Typography variant="caption">
            caption — Caption text for labels
          </Typography>
          <Typography variant="overline">overline — SECTION LABEL</Typography>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Avatar">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
          <Avatar sx={{ bgcolor: "secondary.main" }}>BC</Avatar>
          <Avatar sx={{ bgcolor: "error.main" }}>X</Avatar>
          <Avatar sx={{ bgcolor: "success.main" }} />
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "warning.main",
              color: "rgba(0,0,0,0.87) !important",
            }}
          >
            LG
          </Avatar>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Badge — All 10 Types">
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
          {(
            [
              "default",
              "excellent",
              "neutral",
              "error",
              "warning",
              "info",
              "success",
              "inactive",
              "moderate",
              "severe",
            ] as const
          ).map((type) => (
            <Stack key={type} alignItems="center" spacing={1}>
              <Badge type={type} content={1} />
              <Typography
                variant="caption"
                sx={{
                  color: "text.primary",
                  opacity: 0.6,
                  fontSize: "0.68rem",
                }}
              >
                {type}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Tag — Color Variants">
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.keys(TagBackgroundColorVariants).map((key) => (
            <Tag
              key={key}
              color={
                TagBackgroundColorVariants[
                  key as keyof typeof TagBackgroundColorVariants
                ]
              }
            >
              {key}
            </Tag>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Tag — Status Variants">
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.values(TagStatus).map((status) => (
            <Tag key={status} status={status as TagStatus}>
              {status}
            </Tag>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Severity Badge">
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          {Object.values(Severity).map((sev) => (
            <Stack key={sev} alignItems="center" spacing={1}>
              <SeverityBadge severity={sev} />
              <Typography
                variant="caption"
                sx={{
                  color: "text.primary",
                  opacity: 0.6,
                  fontSize: "0.68rem",
                }}
              >
                {sev}
              </Typography>
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
        <Stack
          direction="row"
          spacing={4}
          alignItems="flex-end"
          flexWrap="wrap"
          useFlexGap
        >
          {Object.values(Severity).map((sev) => (
            <Stack key={sev} alignItems="center" spacing={1}>
              <SeverityBar
                severity={sev}
                sx={{ width: "6px", height: "40px" }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "text.primary",
                  opacity: 0.6,
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {sev}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Indicator Badge (0–4)">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
          {(
            [
              { val: 0, color: "#9ca3af", label: "None" },
              { val: 1, color: "#60a5fa", label: "Low" },
              { val: 2, color: "#fbbf24", label: "Medium" },
              { val: 3, color: "#f97316", label: "High" },
              { val: 4, color: "#ef4444", label: "Critical" },
            ] as const
          ).map(({ val, color, label }) => (
            <Stack key={val} alignItems="center" spacing={1}>
              <IndicatorBadge value={val} color={color} />
              <Typography
                variant="caption"
                sx={{
                  color: "text.primary",
                  opacity: 0.6,
                  fontSize: "0.68rem",
                }}
              >
                {label}
              </Typography>
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
          <Typography
            variant="body2"
            sx={{ color: "text.primary", opacity: 0.65 }}
          >
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
        <Tabs
          value={tabToggle}
          onChange={(_, v) => setTabToggle(v)}
          type="toggleTab"
        >
          <Tab label="List" />
          <Tab label="Grid" />
          <Tab label="Map" />
        </Tabs>
      </ComponentGroup>

      <ComponentGroup label="Link">
        <MemoryRouter>
          <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
            <Link
              href="#"
              color={LinkColorEnum.Primary}
              linkType={LinkType.UnderlineRegular}
            >
              Underline Regular
            </Link>
            <Link
              href="#"
              color={LinkColorEnum.Primary}
              linkType={LinkType.StandaloneRegular}
            >
              Standalone Regular
            </Link>
            <Link
              href="#"
              color={LinkColorEnum.Primary}
              linkType={LinkType.StandaloneBold}
            >
              Standalone Bold
            </Link>
            <Link
              href="#"
              color={LinkColorEnum.Secondary}
              linkType={LinkType.UnderlineRegular}
            >
              Secondary Color
            </Link>
            <Link href="#" color={LinkColorEnum.Primary} disabled>
              Disabled
            </Link>
          </Stack>
        </MemoryRouter>
      </ComponentGroup>

      <ComponentGroup label="Pagination">
        <Pagination
          count={10}
          page={page}
          onChange={(_, v) => setPage(v)}
          showFirstButton
          showLastButton
        />
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
          <Button
            variant="outlined"
            size="small"
            onClick={() => setStepperActive((v) => Math.max(0, v - 1))}
            disabled={stepperActive === 0}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => setStepperActive((v) => Math.min(4, v + 1))}
            disabled={stepperActive === 4}
          >
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
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.6 }}
              >
                {size}px
              </Typography>
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
          <Skeleton
            variant="rectangular"
            height={80}
            sx={{ borderRadius: 1 }}
          />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Banner — All Statuses">
        <Stack spacing={2}>
          <Banner
            status="info"
            text="Informational banner — context and guidance."
            showCloseButton={false}
          />
          <Banner
            status="success"
            text="Success banner — operation completed successfully."
            showCloseButton={false}
          />
          <Banner
            status="excellent"
            text="Excellent banner — all systems running optimally."
            showCloseButton={false}
          />
          <Banner
            status="warning"
            text="Warning banner — review before proceeding."
            showCloseButton={false}
          />
          <Banner
            status="negative"
            text="Negative banner — an error occurred, please retry."
            showCloseButton={false}
          />
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Accordion">
        <Stack spacing={1} sx={{ maxWidth: 620 }}>
          <Accordion
            title="Getting Started"
            subTitle="Learn the basics"
            defaultExpanded
          >
            <Typography variant="body2">
              Accordions organize content into collapsible sections to reduce
              visual noise. This one is open by default.
            </Typography>
          </Accordion>
          <Accordion title="Configuration Options" subTitle="Advanced settings">
            <Typography variant="body2">
              Advanced configuration options hidden to reduce clutter.
            </Typography>
          </Accordion>
          <Accordion title="Contained Variant" contained>
            <Typography variant="body2">
              The contained prop adds a border and background surface.
            </Typography>
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
              <Typography variant="h6" gutterBottom>
                Card Title
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", opacity: 0.65 }}
              >
                A themed MUI card with body content and elevation.
              </Typography>
            </CardContent>
          </Card>
          <Paper sx={{ p: 2.5, minWidth: 220, maxWidth: 260 }} elevation={2}>
            <Typography variant="subtitle1" gutterBottom>
              Paper (elevation 2)
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", opacity: 0.65 }}
            >
              MUI Paper with shadow elevation.
            </Typography>
          </Paper>
          <Paper
            sx={{ p: 2.5, minWidth: 220, maxWidth: 260 }}
            variant="outlined"
          >
            <Typography variant="subtitle1" gutterBottom>
              Paper (outlined)
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", opacity: 0.65 }}
            >
              Paper with border, no elevation.
            </Typography>
          </Paper>
        </Stack>
      </ComponentGroup>

      <ComponentGroup label="Divider">
        <Stack spacing={3} sx={{ maxWidth: 560 }}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.primary", opacity: 0.6 }}
              gutterBottom
              display="block"
            >
              Horizontal
            </Typography>
            <Divider />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.primary", opacity: 0.6 }}
              gutterBottom
              display="block"
            >
              With label
            </Typography>
            <Divider>Section</Divider>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ height: 40 }}
          >
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
          <Stack
            direction="row"
            spacing={4}
            alignItems="flex-start"
            flexWrap="wrap"
            useFlexGap
          >
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 160, width: 160 }}>
                <DonutChart data={DONUT_DATA} />
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.6 }}
              >
                4 segments
              </Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 160, width: 160 }}>
                <DonutChart data={DONUT_DATA.slice(0, 3)} />
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.6 }}
              >
                3 segments
              </Typography>
            </Stack>
          </Stack>
        </SectionErrorBoundary>
      </ComponentGroup>

      <ComponentGroup label="Gauge Chart">
        <SectionErrorBoundary name="GaugeChart">
          <Stack
            direction="row"
            spacing={4}
            alignItems="flex-start"
            flexWrap="wrap"
            useFlexGap
          >
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 140, width: 200 }}>
                <GaugeChart
                  data={[{ name: "Score", value: 24, color: "#ef4444" }]}
                  customLabelComponent={
                    <Typography variant="caption">Critical</Typography>
                  }
                />
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.6 }}
              >
                Critical (24)
              </Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 140, width: 200 }}>
                <GaugeChart
                  data={[{ name: "Score", value: 75, color: "#f59e0b" }]}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.6 }}
              >
                Warning (75)
              </Typography>
            </Stack>
            <Stack alignItems="center" spacing={1}>
              <Box sx={{ height: 140, width: 200 }}>
                <GaugeChart
                  data={[{ name: "Score", value: 95, color: "#22c55e" }]}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.6 }}
              >
                Good (95)
              </Typography>
            </Stack>
          </Stack>
        </SectionErrorBoundary>
      </ComponentGroup>

      <ComponentGroup label="Line Chart">
        <SectionErrorBoundary name="LineChart">
          <Box
            sx={{
              height: 240,
              maxWidth: 600,
              bgcolor: bg,
              borderRadius: 2,
              p: 1,
            }}
          >
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

type TokenEntry = { name: string; description?: string };
type TokenGroup = { label: string; tokens: TokenEntry[] };
type TokenSection = { label: string; groups: TokenGroup[] };

const C1D_PRIMITIVE_TOKENS: {
  label: string;
  tokens: { name: string; value: string; description?: string }[];
}[] = [
  {
    label: "Cisco Teal — Primary Accent",
    tokens: [
      {
        name: "iocTeal500 (Brand)",
        value: "#00BCEB",
        description: "Cisco brand teal — primary CTA, icons, rings",
      },
      { name: "iocTeal400", value: "#1AC6F0", description: "Hover state" },
      { name: "iocTeal600", value: "#00A0D1", description: "Active / pressed" },
      { name: "iocTeal700", value: "#0082AD", description: "Strong accent" },
      { name: "iocTeal200", value: "#7DE0F8", description: "Text on dark bg" },
      {
        name: "iocTealAlpha40",
        value: "rgba(0,188,235,0.40)",
        description: "Disabled states",
      },
      {
        name: "iocTealAlpha20",
        value: "rgba(0,188,235,0.20)",
        description: "Weak background",
      },
      {
        name: "iocTealAlpha10",
        value: "rgba(0,188,235,0.10)",
        description: "Subtle tint",
      },
    ],
  },
  {
    label: "Cisco Blue — Secondary",
    tokens: [
      {
        name: "iocBlue500",
        value: "#2B82F6",
        description: "Execute / action buttons",
      },
      { name: "iocBlue400", value: "#3B92FF", description: "Hover" },
      { name: "iocBlue600", value: "#1E6FD9", description: "Active" },
    ],
  },
  {
    label: "Backdrop — Dark Navy",
    tokens: [
      {
        name: "iocBackdrop900 (Deepest)",
        value: "#020508",
        description: "Absolute darkest void",
      },
      { name: "iocBackdrop800", value: "#03080F", description: "" },
      {
        name: "iocBackdrop700",
        value: "#050C18",
        description: "Page background",
      },
      {
        name: "iocBackdrop600",
        value: "#07111F",
        description: "Gradient start",
      },
      { name: "iocBackdrop500", value: "#091428", description: "" },
      { name: "iocBackdrop400", value: "#0C1B35", description: "Deep card bg" },
      { name: "iocBackdrop300", value: "#0F2040", description: "" },
      { name: "iocBackdrop200", value: "#132650", description: "" },
      {
        name: "iocBackdrop100",
        value: "#1A3060",
        description: "Lightest navy",
      },
    ],
  },
  {
    label: "Surfaces — Translucent Glass",
    tokens: [
      {
        name: "iocSurface50",
        value: "rgba(255,255,255,0.02)",
        description: "Barely-there tint",
      },
      {
        name: "iocSurface100",
        value: "rgba(255,255,255,0.035)",
        description: "Card background",
      },
      {
        name: "iocSurface200",
        value: "rgba(255,255,255,0.06)",
        description: "Control background",
      },
      {
        name: "iocSurface300",
        value: "rgba(255,255,255,0.09)",
        description: "Hover overlay",
      },
      {
        name: "iocSurface400",
        value: "rgba(255,255,255,0.12)",
        description: "Active state",
      },
      {
        name: "iocSurface500",
        value: "rgba(255,255,255,0.16)",
        description: "Emphasized surface",
      },
    ],
  },
  {
    label: "Borders — Translucent",
    tokens: [
      {
        name: "iocBorder100",
        value: "rgba(255,255,255,0.05)",
        description: "Weakest border",
      },
      {
        name: "iocBorder200",
        value: "rgba(255,255,255,0.07)",
        description: "Default divider",
      },
      {
        name: "iocBorder300",
        value: "rgba(255,255,255,0.09)",
        description: "Card border",
      },
      {
        name: "iocBorder400",
        value: "rgba(255,255,255,0.12)",
        description: "Emphasized border",
      },
      {
        name: "iocBorder500",
        value: "rgba(255,255,255,0.18)",
        description: "Strong border",
      },
    ],
  },
  {
    label: "Text — Alpha White",
    tokens: [
      {
        name: "iocTextPrimary",
        value: "rgba(255,255,255,0.94)",
        description: "Headings, key labels",
      },
      {
        name: "iocTextSecondary",
        value: "rgba(255,255,255,0.55)",
        description: "Body text, captions",
      },
      {
        name: "iocTextTertiary",
        value: "rgba(255,255,255,0.32)",
        description: "Placeholder, hints",
      },
      {
        name: "iocTextDisabled",
        value: "rgba(255,255,255,0.22)",
        description: "Disabled",
      },
    ],
  },
  {
    label: "Semantic Status",
    tokens: [
      {
        name: "Success",
        value: "#00B98E",
        description: "Green — compliance, success",
      },
      {
        name: "Negative",
        value: "#C62953",
        description: "Red — threats, errors",
      },
      {
        name: "Warning",
        value: "#FBAB2C",
        description: "Amber — warnings, medium severity",
      },
      {
        name: "Severe Warning",
        value: "#F2643D",
        description: "Orange — critical alerts",
      },
      {
        name: "Excellent",
        value: "#0AB6FF",
        description: "Cyan — excellent / informational",
      },
    ],
  },
  {
    label: "Shadows & Effects",
    tokens: [
      {
        name: "Shadow SM",
        value: "0 2px 8px rgba(0,0,0,0.30)",
        description: "Subtle card lift",
      },
      {
        name: "Shadow MD",
        value: "0 4px 16px rgba(0,0,0,0.40)",
        description: "Elevated card",
      },
      {
        name: "Shadow LG",
        value: "0 8px 32px rgba(0,0,0,0.50)",
        description: "Modal / drawer",
      },
      {
        name: "Backdrop Blur",
        value: "blur(20px)",
        description: "Glass panel blur",
      },
    ],
  },
];

const COLOR_TOKEN_SECTIONS: TokenSection[] = [
  {
    label: "Base — Text",
    groups: [
      {
        label: "Text",
        tokens: [
          {
            name: "baseTextStrong",
            description: "Primary headings, key content",
          },
          { name: "baseTextDefault", description: "Body text default" },
          { name: "baseTextMedium", description: "Secondary body text" },
          { name: "baseTextWeak", description: "Tertiary / hint text" },
          { name: "baseTextInverse", description: "Text on dark surfaces" },
          { name: "baseTextDisabled", description: "Disabled state" },
        ],
      },
    ],
  },
  {
    label: "Base — Background & Border",
    groups: [
      {
        label: "Background",
        tokens: [
          { name: "baseBackgroundStrong", description: "Strongest surface" },
          {
            name: "baseBackgroundMedium",
            description: "Default page background",
          },
          { name: "baseBackgroundWeak", description: "Subtle surface / card" },
          { name: "baseBackgroundHover", description: "Hover overlay" },
        ],
      },
      {
        label: "Border",
        tokens: [
          { name: "baseBorderDefault", description: "Standard border" },
          { name: "baseBorderStrong", description: "Emphasized border" },
          { name: "baseBorderMedium", description: "Moderate border" },
          { name: "baseBorderWeak", description: "Subtle border" },
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
          { name: "brandOrange", description: "Primary orange" },
          { name: "brandBlue", description: "Primary brand blue" },
          { name: "brandMidnightBlue", description: "Deep navy" },
          { name: "agentcyYellow", description: "Agentcy yellow" },
          { name: "agentcyBlue", description: "Agentcy blue" },
          { name: "agentcyDarkBlue", description: "Agentcy dark blue" },
        ],
      },
      {
        label: "Brand Text & Background",
        tokens: [
          { name: "brandTextPrimary", description: "Brand primary text" },
          { name: "brandTextSecondary", description: "Brand secondary text" },
          { name: "brandLogoPrimary", description: "Logo primary color" },
          {
            name: "brandBackgroundPrimaryDefault",
            description: "Brand bg primary",
          },
          { name: "brandBackgroundPrimaryWeak", description: "Brand bg weak" },
          {
            name: "brandBackgroundSecondaryDefault",
            description: "Brand bg secondary",
          },
          {
            name: "brandIconPrimaryDefault",
            description: "Brand icon primary",
          },
          {
            name: "brandIconSecondaryDefault",
            description: "Brand icon secondary",
          },
          {
            name: "brandIconTertiaryDefault",
            description: "Brand icon tertiary",
          },
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
          { name: "controlBackgroundDefault", description: "Input default bg" },
          {
            name: "controlBackgroundDisabled",
            description: "Disabled control",
          },
          { name: "controlBackgroundMedium", description: "Medium control" },
        ],
      },
      {
        label: "Border & Icon",
        tokens: [
          { name: "controlBorderDefault", description: "Default border" },
          { name: "controlBorderHover", description: "Hover border" },
          { name: "controlBorderActive", description: "Active border" },
          { name: "controlBorderNegative", description: "Error border" },
          { name: "controlBorderDisabled", description: "Disabled border" },
          { name: "controlIconDefault", description: "Icon default" },
          { name: "controlIconHover", description: "Icon hover" },
          { name: "controlIconDisabled", description: "Icon disabled" },
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
          { name: "interactivePrimaryDefaultDefault", description: "Default" },
          { name: "interactivePrimaryDefaultHover", description: "Hover" },
          { name: "interactivePrimaryDefaultActive", description: "Active" },
          {
            name: "interactivePrimaryDefaultDisabled",
            description: "Disabled",
          },
          {
            name: "interactivePrimaryWeakDefault",
            description: "Weak default",
          },
          { name: "interactivePrimaryWeakHover", description: "Weak hover" },
        ],
      },
      {
        label: "Secondary & Tertiary",
        tokens: [
          {
            name: "interactiveSecondaryDefaultDefault",
            description: "Secondary default",
          },
          {
            name: "interactiveSecondaryDefaultHover",
            description: "Secondary hover",
          },
          {
            name: "interactiveSecondaryDefaultActive",
            description: "Secondary active",
          },
          {
            name: "interactiveTertiaryDefault",
            description: "Tertiary default",
          },
          { name: "interactiveTertiaryHover", description: "Tertiary hover" },
          {
            name: "interactiveInverseBackgroundDefault",
            description: "Inverse bg",
          },
          {
            name: "interactiveInverseTextDefault",
            description: "Inverse text",
          },
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
          { name: "successBackgroundWeak", description: "Weak bg" },
          { name: "successTextDefault", description: "Text" },
          { name: "successBorderDefault", description: "Border" },
          { name: "successIconDefault", description: "Icon" },
          { name: "successTextInDefault", description: "On-color text" },
        ],
      },
      {
        label: "Negative (Error)",
        tokens: [
          { name: "negativeBackgroundDefault", description: "Default bg" },
          { name: "negativeBackgroundWeak", description: "Weak bg" },
          { name: "negativeTextDefault", description: "Text" },
          { name: "negativeBorderDefault", description: "Border" },
          { name: "negativeIconDefault", description: "Icon" },
          { name: "negativeTextInDefault", description: "On-color text" },
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
          { name: "warningBackgroundWeak", description: "Weak bg" },
          { name: "warningTextDefault", description: "Text" },
          { name: "warningBorderDefault", description: "Border" },
          { name: "warningIconDefault", description: "Icon" },
        ],
      },
      {
        label: "Severe Warning",
        tokens: [
          { name: "severeWarningBackgroundDefault", description: "Default bg" },
          { name: "severeWarningBackgroundWeak", description: "Weak bg" },
          { name: "severeWarningTextDefault", description: "Text" },
          { name: "severeWarningIconDefault", description: "Icon" },
        ],
      },
      {
        label: "Moderate",
        tokens: [
          { name: "moderateBackgroundDefault", description: "Default bg" },
          { name: "moderateBackgroundWeak", description: "Weak bg" },
          { name: "moderateTextDefault", description: "Text" },
          { name: "moderateIconDefault", description: "Icon" },
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
          { name: "excellentBackgroundWeak", description: "Weak bg" },
          { name: "excellentTextDefault", description: "Text" },
          { name: "excellentIconDefault", description: "Icon" },
        ],
      },
      {
        label: "Neutral (Info Blue)",
        tokens: [
          { name: "neutralBackgroundDefault", description: "Default bg" },
          { name: "neutralBackgroundWeak", description: "Weak bg" },
          { name: "neutralTextDefault", description: "Text" },
          { name: "neutralIconDefault", description: "Icon" },
        ],
      },
      {
        label: "Info (Purple)",
        tokens: [
          { name: "infoBackgroundDefault", description: "Default bg" },
          { name: "infoBackgroundWeak", description: "Weak bg" },
          { name: "infoTextDefault", description: "Text" },
          { name: "infoIconDefault", description: "Icon" },
        ],
      },
      {
        label: "Inactive",
        tokens: [
          { name: "inactiveBackgroundDefault", description: "Default bg" },
          { name: "inactiveBackgroundWeak", description: "Weak bg" },
          { name: "inactiveTextDefault", description: "Text" },
          { name: "inactiveIconDefault", description: "Icon" },
        ],
      },
    ],
  },
  {
    label: "Accents (A–J)",
    groups: [
      {
        label: "Data Visualization",
        tokens: [
          { name: "accentADefault", description: "Accent A — Lavender" },
          { name: "accentAWeak", description: "Accent A weak" },
          { name: "accentBDefault", description: "Accent B — Sunset" },
          { name: "accentBWeak", description: "Accent B weak" },
          { name: "accentCDefault", description: "Accent C — Soft salmon" },
          { name: "accentCWeak", description: "Accent C weak" },
          { name: "accentDDefault", description: "Accent D — Deep plum" },
          { name: "accentDWeak", description: "Accent D weak" },
          { name: "accentEDefault", description: "Accent E — Lime" },
          { name: "accentEWeak", description: "Accent E weak" },
          { name: "accentFDefault", description: "Accent F — Deep orange" },
          { name: "accentFWeak", description: "Accent F weak" },
          { name: "accentGDefault", description: "Accent G — Night sky" },
          { name: "accentGWeak", description: "Accent G weak" },
          { name: "accentHDefault", description: "Accent H — Deep navy" },
          { name: "accentHWeak", description: "Accent H weak" },
          { name: "accentIDefault", description: "Accent I — Pink" },
          { name: "accentIWeak", description: "Accent I weak" },
          { name: "accentJDefault", description: "Accent J — Teal" },
          { name: "accentJWeak", description: "Accent J weak" },
        ],
      },
    ],
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
  const vars = theme.palette.vars as unknown as Record<string, string>;
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
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontSize: "0.62rem",
              color: "text.primary",
              opacity: 0.45,
              lineHeight: 1.2,
            }}
          >
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
      <Typography
        sx={{
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "text.primary",
          opacity: 0.4,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          mb: 0.5,
          px: 1,
        }}
      >
        {group.label}
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {group.tokens.map((t, i) => (
          <React.Fragment key={t.name}>
            {i > 0 && (
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  opacity: 0.5,
                }}
              />
            )}
            <TokenRow {...t} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

// ─── Token sections ───────────────────────────────────────────────────────────

function C1DPrimitiveRow({
  name,
  value,
  description,
}: {
  name: string;
  value: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    });
  };
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
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontSize: "0.62rem",
              color: "text.primary",
              opacity: 0.45,
              lineHeight: 1.2,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
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
            color: "text.primary",
            opacity: 0.65,
            "&:hover": { opacity: 1 },
            whiteSpace: "nowrap",
          }}
        >
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
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "primary.main",
              bgcolor: "action.hover",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "#00BCEB",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              C1D Dark — Cisco 1 Design primitive tokens
            </Typography>
          </Box>
          {C1D_PRIMITIVE_TOKENS.map((section) => (
            <Box key={section.label} sx={{ mb: 2.5 }}>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "text.primary",
                  opacity: 0.4,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 0.5,
                  px: 1,
                }}
              >
                {section.label}
              </Typography>
              <Box
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  overflow: "hidden",
                }}
              >
                {section.tokens.map((t, i) => (
                  <React.Fragment key={t.name}>
                    {i > 0 && (
                      <Box
                        sx={{
                          borderTop: "1px solid",
                          borderColor: "divider",
                          opacity: 0.5,
                        }}
                      />
                    )}
                    <C1DPrimitiveRow {...t} />
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              mx: 0,
              my: 3,
              borderTop: "1px solid",
              borderColor: "divider",
              opacity: 0.4,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "primary.main",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 2,
            }}
          >
            C1D Semantic Tokens
          </Typography>
        </Box>
      )}
      {COLOR_TOKEN_SECTIONS.map((section) => (
        <Box key={section.label} sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "primary.main",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {section.label}
          </Typography>
          {section.groups.map((group) => (
            <TokenGroupBlock key={group.label} group={group} />
          ))}
        </Box>
      ))}

      {/* Glow tokens — C1D only */}
      {isIoc && (
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "primary.main",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 1.5,
            }}
          >
            Glows
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 1.5,
            }}
          >
            {(
              [
                "glowPrimary",
                "glowSecondary",
                "glowSuccess",
                "glowWarning",
                "glowNegative",
                "glowSevere",
                "glowExcellent",
                "glowNeutral",
              ] as const
            ).map((key) => {
              const value = (vars as Record<string, string>)[key] ?? "none";
              const label = key
                .replace("glow", "")
                .replace(/([A-Z])/g, " $1")
                .trim();
              // Extract the base colour (strip trailing alpha) for the dot fill
              const colorMatch = value.match(
                /#[0-9a-fA-F]{6,8}|rgba?\([^)]+\)/,
              );
              const baseHex = colorMatch
                ? colorMatch[0].replace(/[A-Fa-f0-9]{2}$/, "")
                : "#888";
              // Stage bg matches the actual theme so glows look as designed
              const stageBg = theme.palette.background.default;
              const dotColor = theme.palette.mode === "dark" ? "#fff" : baseHex;
              return (
                <Box
                  key={key}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Stage — uses the theme's real background so the glow renders as in production */}
                  <Box
                    sx={{
                      bgcolor: stageBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 80,
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: dotColor,
                        boxShadow: value,
                      }}
                    />
                  </Box>
                  {/* Label row */}
                  <Box
                    sx={{
                      px: 1.5,
                      py: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "background.paper",
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        vars.{key}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.58rem",
                          color: "text.secondary",
                          opacity: 0.55,
                          mt: 0.25,
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                    <TokenCopyChip text={`theme.palette.vars.${key}`} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Gradient tokens */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "primary.main",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            mb: 1.5,
          }}
        >
          Gradients
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          {(
            [
              "gradientPrimary",
              "gradientSecondary",
              "gradientNegative",
              "gradientBrand",
              ...(isIoc ? ["gradientPage"] : []),
            ] as const
          ).map((key, i) => {
            const value = (vars as Record<string, string>)[key] ?? "";
            const label = key
              .replace("gradient", "")
              .replace(/([A-Z])/g, " $1")
              .trim();
            return (
              <React.Fragment key={key}>
                {i > 0 && (
                  <Box
                    sx={{
                      borderTop: "1px solid",
                      borderColor: "divider",
                      opacity: 0.5,
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2.5,
                    py: 1.5,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 28,
                      borderRadius: "6px",
                      background: value,
                      flexShrink: 0,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      vars.{key}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        color: "text.primary",
                        opacity: 0.45,
                        mt: 0.25,
                        wordBreak: "break-all",
                      }}
                    >
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
  { variant: "h1", meta: "Sharp Sans 700, 60px", sample: "Aa" },
  { variant: "h2", meta: "Sharp Sans 700, 48px", sample: "Aa" },
  { variant: "h3", meta: "Sharp Sans 700, 36px", sample: "Aa" },
  { variant: "h4", meta: "Sharp Sans 700, 24px", sample: "Heading Four" },
  { variant: "h5", meta: "Sharp Sans 700, 20px", sample: "Heading Five" },
  { variant: "h6", meta: "Sharp Sans 700, 18px", sample: "Heading Six" },
  { variant: "subtitle1", meta: "Inter 500, 16px", sample: "Subtitle One" },
  { variant: "subtitle2", meta: "Inter 500, 14px", sample: "Subtitle Two" },
  {
    variant: "body1",
    meta: "Inter 400, 14px",
    sample: "Body one — paragraph text for reading.",
  },
  {
    variant: "body2",
    meta: "Inter 400, 12px",
    sample: "Body two — smaller paragraph text.",
  },
  { variant: "button", meta: "Inter 600, 12px", sample: "Button Label" },
  { variant: "caption", meta: "Inter 400, 12px", sample: "Caption label" },
  { variant: "overline", meta: "Inter 600, 10px", sample: "OVERLINE TEXT" },
] as const;

function TypographyTokensSection() {
  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
          mb: 3,
        }}
      >
        {TYPOGRAPHY_VARIANTS.map(({ variant, meta, sample }, i) => (
          <React.Fragment key={variant}>
            {i > 0 && (
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  opacity: 0.5,
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                px: 2.5,
                py: 1.5,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <Typography variant={variant as any} sx={{ lineHeight: 1.1 }}>
                  {sample}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    color: "text.primary",
                    opacity: 0.45,
                  }}
                >
                  {meta}
                </Typography>
              </Box>
              <TokenCopyChip text={variant} />
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Typography
        sx={{
          fontSize: "0.65rem",
          fontWeight: 700,
          color: "text.primary",
          opacity: 0.4,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          mb: 0.75,
          px: 0.5,
        }}
      >
        Font Families
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {[
          {
            name: "Inter",
            role: "Body, UI, captions, buttons",
            sample: "The quick brown fox jumps over the lazy dog.",
          },
          {
            name: "Sharp Sans",
            role: "Display headings (H1–H6)",
            sample: "Sharp Sans — Heading Display",
          },
        ].map(({ name, role, sample }, i) => (
          <React.Fragment key={name}>
            {i > 0 && (
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: "divider",
                  opacity: 0.5,
                }}
              />
            )}
            <Box
              sx={{ px: 2.5, py: 1.5, "&:hover": { bgcolor: "action.hover" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    color: "text.primary",
                    opacity: 0.45,
                  }}
                >
                  {role}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "text.primary",
                  opacity: 0.65,
                }}
              >
                {sample}
              </Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}

function ShadowTokensSection() {
  const theme = useTheme();
  const labels = [
    "None",
    "Lifted — subtle card lift",
    "Subtle — card resting",
    "Raised — elevated card",
    "Floating — modal / dropdown",
    "Side Drawer — sheet overlay",
  ];
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      {([0, 1, 2, 3, 4, 5] as const).map((level, i) => (
        <React.Fragment key={level}>
          {i > 0 && (
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                opacity: 0.5,
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              px: 2.5,
              py: 2,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 36,
                borderRadius: 1.5,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: theme.shadows[level],
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                elevation={level}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  color: "text.primary",
                  opacity: 0.45,
                }}
              >
                {labels[level]}
              </Typography>
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
      <Typography
        sx={{
          fontSize: "0.7rem",
          color: "text.primary",
          opacity: 0.5,
          mb: 2,
          lineHeight: 1.6,
        }}
      >
        Spacing is based on an 8px base unit — <code>theme.spacing(n)</code> ={" "}
        <code>n × 8px</code>. Use MUI's <code>sx</code> prop shorthand (e.g.{" "}
        <code>p={"{2}"}</code> = 16px) or token aliases below.
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {steps.map((step, i) => {
          const px = theme.spacing(step);
          const alias = aliases[step];
          const barWidth = Math.min((step / 12) * 100, 100);
          return (
            <React.Fragment key={step}>
              {i > 0 && (
                <Box
                  sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    opacity: 0.4,
                  }}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2.5,
                  py: 1.25,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {/* Visual bar */}
                <Box sx={{ width: 120, flexShrink: 0 }}>
                  <Box
                    sx={{
                      height: 10,
                      borderRadius: "100px",
                      bgcolor: "primary.main",
                      width: `${Math.max(barWidth, step === 0 ? 0 : 2)}%`,
                      opacity: 0.75,
                      minWidth: step === 0 ? 0 : 3,
                    }}
                  />
                </Box>
                {/* Token name */}
                <Box sx={{ width: 60, flexShrink: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    spacing({step})
                  </Typography>
                </Box>
                {/* Alias */}
                <Box sx={{ width: 48, flexShrink: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      color: "primary.main",
                      opacity: 0.8,
                    }}
                  >
                    {alias}
                  </Typography>
                </Box>
                {/* px value */}
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    color: "text.primary",
                    opacity: 0.5,
                  }}
                >
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
  {
    id: "EVT-001",
    time: "09:41",
    type: "Brute Force",
    severity: Severity.CRITICAL,
    source: "192.168.1.45",
    tagStatus: TagStatus.Negative,
  },
  {
    id: "EVT-002",
    time: "09:38",
    type: "Port Scan",
    severity: Severity.HIGH,
    source: "10.0.0.120",
    tagStatus: TagStatus.Warning,
  },
  {
    id: "EVT-003",
    time: "09:22",
    type: "Malware Detected",
    severity: Severity.CRITICAL,
    source: "WS-2847",
    tagStatus: TagStatus.Info,
  },
  {
    id: "EVT-004",
    time: "09:15",
    type: "Failed Auth ×12",
    severity: Severity.MEDIUM,
    source: "AD-Server",
    tagStatus: TagStatus.Positive,
  },
  {
    id: "EVT-005",
    time: "08:54",
    type: "Data Exfiltration",
    severity: Severity.HIGH,
    source: "192.168.5.99",
    tagStatus: TagStatus.Negative,
  },
  {
    id: "EVT-006",
    time: "08:30",
    type: "Config Change",
    severity: Severity.LOW,
    source: "Admin-01",
    tagStatus: TagStatus.Excellent,
  },
  {
    id: "EVT-007",
    time: "08:12",
    type: "Unusual Login",
    severity: Severity.MEDIUM,
    source: "User: j.smith",
    tagStatus: TagStatus.Warning,
  },
];

const DASH_STATUS_LABEL: Record<string, string> = {
  [TagStatus.Negative]: "Active",
  [TagStatus.Warning]: "Investigating",
  [TagStatus.Info]: "Contained",
  [TagStatus.Positive]: "Resolved",
  [TagStatus.Excellent]: "Resolved",
};

const DASH_KPI = [
  {
    label: "Active Threats",
    value: "12",
    sub: "↑ 3 since yesterday",
    subColor: "error.main",
  },
  {
    label: "Compliance",
    value: "98.2%",
    sub: "↑ 0.4% this week",
    subColor: "success.main",
  },
  {
    label: "Endpoints Online",
    value: "847",
    sub: "of 852 total",
    subColor: "text.primary",
  },
  {
    label: "Open Incidents",
    value: "3",
    sub: "2 high priority",
    subColor: "warning.main",
  },
];

const DASH_BAR = [
  { name: "Brute Force", value: 28, color: "#ef4444" },
  { name: "Malware", value: 19, color: "#f97316" },
  { name: "Phishing", value: 14, color: "#f59e0b" },
  { name: "Port Scan", value: 11, color: "#3b82f6" },
  { name: "Exfiltration", value: 7, color: "#8b5cf6" },
];

const DASH_COMPLIANCE = [
  { label: "Patch Compliance", value: 94 },
  { label: "MFA Coverage", value: 88 },
  { label: "Encryption", value: 100 },
  { label: "Access Reviews", value: 76 },
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
const DASH_GAUGE_DATA = [
  { name: "Security Score", value: 85, color: "#00BCEB" },
];

// ── Dashboard (same content across all themes, look & feel from active theme) ──
/** Renders a Card in non-C1D themes; a spacious transparent Box in C1D. */
function DashCard({
  children,
  sx = {},
}: {
  children: React.ReactNode;
  sx?: object;
}) {
  const theme = useTheme();
  const isIoc = theme.palette.primary.main === "#00BCEB";
  if (isIoc) {
    return (
      <Box
        sx={{
          ...sx,
          "& .MuiCardContent-root": { p: 0 },
        }}
      >
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
      <Stack
        direction="row"
        spacing={isIoc ? 3 : 2}
        flexWrap="wrap"
        useFlexGap
        sx={{ mb: isIoc ? 4 : 3 }}
      >
        {DASH_KPI.map(({ label, value, sub, subColor }) => (
          <DashCard key={label} sx={{ flex: "1 1 180px", minWidth: 160 }}>
            <CardContent>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "text.primary",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 0.5,
                  opacity: 0.6,
                }}
              >
                {label}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, lineHeight: 1.1, mb: 0.5 }}
              >
                {value}
              </Typography>
              <Typography
                sx={{ fontSize: "0.72rem", fontWeight: 600, color: subColor }}
              >
                {sub}
              </Typography>
            </CardContent>
          </DashCard>
        ))}
      </Stack>

      {/* ── Middle row: bar chart + compliance + gauge ── */}
      <Stack
        direction="row"
        spacing={isIoc ? 3 : 2}
        sx={{ mb: isIoc ? 4 : 3 }}
        flexWrap="wrap"
        useFlexGap
      >
        <DashCard sx={{ flex: "1 1 0", minWidth: 0 }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                mb: isIoc ? 3 : 2,
                color: "text.primary",
              }}
            >
              Threat Distribution
            </Typography>
            <Box
              sx={{
                height: 200,
                ...(isIoc && {
                  "& svg": { overflow: "visible !important" },
                  "& .recharts-bar-rectangle path": {
                    filter: "drop-shadow(0 0 4px rgba(0,188,235,0.35))",
                  },
                }),
              }}
            >
              <SectionErrorBoundary name="DashboardBarChart">
                <BarChart data={DASH_BAR} />
              </SectionErrorBoundary>
            </Box>
          </CardContent>
        </DashCard>

        <DashCard sx={{ flex: "1 1 0", minWidth: 0 }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                mb: isIoc ? 3 : 2,
                color: "text.primary",
              }}
            >
              Compliance Overview
            </Typography>
            <Box
              sx={{
                height: 200,
                ...(isIoc && {
                  "& [data-compliance-bar]": {
                    filter: "drop-shadow(0 0 4px currentColor)",
                  },
                }),
              }}
            >
              <SectionErrorBoundary name="ComplianceHorizontalBar">
                <HorizontalBarChart
                  data={DASH_COMPLIANCE.map(({ label, value }) => ({
                    name: label,
                    value,
                    color:
                      value >= 90
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

        <DashCard
          sx={{
            flex: "1 1 0",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: isIoc ? 3 : 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Risk Trends — 7-Day Score
            </Typography>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "success.main",
                fontWeight: 600,
              }}
            >
              ↓ 13 pts improved
            </Typography>
          </Box>
          <Box
            sx={{
              height: 160,
              ...(isIoc && { "& svg": { overflow: "visible !important" } }),
            }}
          >
            <SectionErrorBoundary name="DashboardLineChart">
              {isIoc ? (
                /* C1D: filled area chart with gradient + glow */
                <RRC width="100%" height="100%">
                  <defs>
                    <linearGradient
                      id="riskAreaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      {/* Matches reference: solid deep-blue fill fading to near-transparent navy */}
                      <stop offset="0%" stopColor="rgba(30,100,220,0.75)" />
                      <stop offset="60%" stopColor="rgba(10,40,120,0.55)" />
                      <stop offset="100%" stopColor="rgba(5,15,50,0.20)" />
                    </linearGradient>
                  </defs>
                  <AreaChart
                    data={DASH_RISK_LINE}
                    margin={{ top: 10, right: 8, bottom: 0, left: -10 }}
                  >
                    <RXAxis
                      dataKey="date"
                      tickFormatter={(v: string) =>
                        ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"][
                          new Date(v).getDay() === 0
                            ? 6
                            : new Date(v).getDay() - 1
                        ] ?? v.slice(5)
                      }
                      tick={{ fontSize: 10, fill: "rgba(255,255,255,0.38)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <RYAxis
                      domain={["dataMin - 3", "dataMax + 3"]}
                      tick={{ fontSize: 10, fill: "rgba(255,255,255,0.38)" }}
                      axisLine={false}
                      tickLine={false}
                      width={28}
                    />
                    <RGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <RTooltip
                      contentStyle={{
                        backgroundColor: "#0C1B35",
                        border: "1px solid rgba(0,188,235,0.25)",
                        borderRadius: 8,
                        fontSize: 12,
                        color: "#fff",
                      }}
                      cursor={{
                        stroke: "rgba(0,188,235,0.3)",
                        strokeWidth: 1,
                        strokeDasharray: "4 3",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="Risk"
                      stroke="#40D0F4"
                      strokeWidth={2.5}
                      fill="url(#riskAreaGradient)"
                      dot={false}
                      activeDot={{
                        r: 4,
                        fill: "#40D0F4",
                        stroke: "rgba(64,208,244,0.45)",
                        strokeWidth: 8,
                      }}
                      style={{
                        filter:
                          "drop-shadow(0 0 5px rgba(0,188,235,0.8)) drop-shadow(0 0 12px rgba(0,188,235,0.4))",
                      }}
                    />
                  </AreaChart>
                </RRC>
              ) : (
                <LineChart
                  data={DASH_RISK_LINE}
                  categories={DASH_RISK_CATEGORIES}
                  xAxisProps={{
                    dataKey: "date",
                    tickFormatter: (v: string) => v.slice(5),
                  }}
                />
              )}
            </SectionErrorBoundary>
          </Box>
        </CardContent>
      </DashCard>

      {/* ── Security events table ── */}
      <DashCard>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: isIoc ? 3 : 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Security Events
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined">
                Export
              </Button>
              <Button size="small" variant="primary">
                View All
              </Button>
            </Stack>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {[
                    "Event ID",
                    "Time",
                    "Type",
                    "Severity",
                    "Source",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: "text.primary",
                        opacity: 0.6,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        borderColor: "divider",
                        py: 1,
                      }}
                    >
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
                        bgcolor: isSelected
                          ? theme.palette.vars.baseBackgroundMedium
                          : "transparent",
                        "&:hover": {
                          bgcolor: theme.palette.vars.baseBackgroundHover,
                        },
                        "& td": {
                          borderColor: "divider",
                          py: 1,
                          fontSize: "0.78rem",
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "text.primary",
                          opacity: 0.7,
                          fontWeight: 600,
                        }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "text.primary",
                          opacity: 0.55,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.time}
                      </TableCell>
                      <TableCell sx={{ color: "text.primary" }}>
                        {row.type}
                      </TableCell>
                      <TableCell>
                        <SeverityBadge severity={row.severity} />
                      </TableCell>
                      <TableCell sx={{ color: "text.primary", opacity: 0.65 }}>
                        {row.source}
                      </TableCell>
                      <TableCell>
                        <Tag status={row.tagStatus} size={"small" as any}>
                          {DASH_STATUS_LABEL[row.tagStatus]}
                        </Tag>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="tertariary"
                          sx={{
                            fontSize: "0.68rem",
                            py: 0,
                            minWidth: 0,
                            px: 1,
                          }}
                        >
                          Review
                        </Button>
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

// ─── Icons Section ────────────────────────────────────────────────────────────

const ICON_CATALOGUE: {
  category: string;
  icons: { name: string; component: SvgIconComponent; import: string }[];
}[] = [
  {
    category: "Navigation",
    icons: [
      { name: "Home", component: HomeIcon, import: "HomeIcon" },
      { name: "Dashboard", component: DashboardIcon, import: "DashboardIcon" },
      { name: "Search", component: SearchIcon, import: "SearchIcon" },
      { name: "Menu", component: MenuIcon, import: "MenuIcon" },
      { name: "Settings", component: SettingsIcon, import: "SettingsIcon" },
      { name: "ArrowBack", component: ArrowBackIcon, import: "ArrowBackIcon" },
      {
        name: "ArrowForward",
        component: ArrowForwardIcon,
        import: "ArrowForwardIcon",
      },
      {
        name: "ChevronLeft",
        component: ChevronLeftIcon,
        import: "ChevronLeftIcon",
      },
      {
        name: "ChevronRight",
        component: ChevronRightIcon,
        import: "ChevronRightIcon",
      },
      {
        name: "ExpandMore",
        component: ExpandMoreIcon,
        import: "ExpandMoreIcon",
      },
      {
        name: "ExpandLess",
        component: ExpandLessIcon,
        import: "ExpandLessIcon",
      },
      { name: "OpenInNew", component: OpenInNewIcon, import: "OpenInNewIcon" },
    ],
  },
  {
    category: "Actions",
    icons: [
      { name: "Add", component: AddIcon, import: "AddIcon" },
      { name: "Edit", component: EditIcon, import: "EditIcon" },
      { name: "Delete", component: DeleteIcon, import: "DeleteIcon" },
      { name: "Close", component: CloseIcon, import: "CloseIcon" },
      { name: "Check", component: CheckIcon, import: "CheckIcon" },
      { name: "Save", component: SaveIcon, import: "SaveIcon" },
      { name: "Upload", component: UploadIcon, import: "UploadIcon" },
      { name: "Download", component: DownloadIcon, import: "DownloadIcon" },
      { name: "Refresh", component: RefreshIcon, import: "RefreshIcon" },
      { name: "MoreVert", component: MoreVertIcon, import: "MoreVertIcon" },
      { name: "MoreHoriz", component: MoreHorizIcon, import: "MoreHorizIcon" },
      {
        name: "FilterList",
        component: FilterListIcon,
        import: "FilterListIcon",
      },
      { name: "Sort", component: SortIcon, import: "SortIcon" },
      { name: "Share", component: ShareIcon, import: "ShareIcon" },
      { name: "Print", component: PrintIcon, import: "PrintIcon" },
      {
        name: "ContentCopy",
        component: ContentCopyIcon,
        import: "ContentCopyIcon",
      },
      {
        name: "ContentPaste",
        component: ContentPasteIcon,
        import: "ContentPasteIcon",
      },
      { name: "CopyAll", component: CopyAllIcon, import: "CopyAllIcon" },
      {
        name: "Visibility",
        component: VisibilityIcon,
        import: "VisibilityIcon",
      },
      {
        name: "VisibilityOff",
        component: VisibilityOffIcon,
        import: "VisibilityOffIcon",
      },
    ],
  },
  {
    category: "Status & Feedback",
    icons: [
      {
        name: "CheckCircle",
        component: CheckCircleIcon,
        import: "CheckCircleIcon",
      },
      {
        name: "CheckCircleOutline",
        component: CheckCircleOutlineIcon,
        import: "CheckCircleOutlineIcon",
      },
      { name: "Error", component: ErrorIcon, import: "ErrorIcon" },
      {
        name: "ErrorOutline",
        component: ErrorOutlineIcon,
        import: "ErrorOutlineIcon",
      },
      { name: "Warning", component: WarningIcon, import: "WarningIcon" },
      {
        name: "WarningAmber",
        component: WarningAmberIcon,
        import: "WarningAmberIcon",
      },
      { name: "Info", component: InfoIcon, import: "InfoIcon" },
      {
        name: "InfoOutlined",
        component: InfoOutlinedIcon,
        import: "InfoOutlinedIcon",
      },
      { name: "Help", component: HelpIcon, import: "HelpIcon" },
      {
        name: "HelpOutline",
        component: HelpOutlineIcon,
        import: "HelpOutlineIcon",
      },
      {
        name: "Notifications",
        component: NotificationsIcon,
        import: "NotificationsIcon",
      },
      { name: "Autorenew", component: AutorenewIcon, import: "AutorenewIcon" },
      { name: "Sync", component: SyncIcon, import: "SyncIcon" },
      {
        name: "SyncProblem",
        component: SyncProblemIcon,
        import: "SyncProblemIcon",
      },
      { name: "PlayArrow", component: PlayArrowIcon, import: "PlayArrowIcon" },
      { name: "Pause", component: PauseIcon, import: "PauseIcon" },
      { name: "Stop", component: StopIcon, import: "StopIcon" },
    ],
  },
  {
    category: "Security",
    icons: [
      { name: "Security", component: SecurityIcon, import: "SecurityIcon" },
      { name: "Shield", component: ShieldIcon, import: "ShieldIcon" },
      { name: "Lock", component: LockIcon, import: "LockIcon" },
      { name: "LockOpen", component: LockOpenIcon, import: "LockOpenIcon" },
      { name: "Key", component: KeyIcon, import: "KeyIcon" },
      { name: "VpnKey", component: VpnKeyIcon, import: "VpnKeyIcon" },
      { name: "Https", component: HttpsIcon, import: "HttpsIcon" },
      {
        name: "Fingerprint",
        component: FingerprintIcon,
        import: "FingerprintIcon",
      },
      { name: "BugReport", component: BugReportIcon, import: "BugReportIcon" },
      {
        name: "VerifiedUser",
        component: VerifiedUserIcon,
        import: "VerifiedUserIcon",
      },
      { name: "GppBad", component: GppBadIcon, import: "GppBadIcon" },
      { name: "GppGood", component: GppGoodIcon, import: "GppGoodIcon" },
    ],
  },
  {
    category: "People",
    icons: [
      { name: "Person", component: PersonIcon, import: "PersonIcon" },
      { name: "Group", component: GroupIcon, import: "GroupIcon" },
      { name: "Groups", component: GroupsIcon, import: "GroupsIcon" },
      {
        name: "AccountCircle",
        component: AccountCircleIcon,
        import: "AccountCircleIcon",
      },
      { name: "Star", component: StarIcon, import: "StarIcon" },
      {
        name: "StarBorder",
        component: StarBorderIcon,
        import: "StarBorderIcon",
      },
      { name: "Bookmark", component: BookmarkIcon, import: "BookmarkIcon" },
      {
        name: "BookmarkBorder",
        component: BookmarkBorderIcon,
        import: "BookmarkBorderIcon",
      },
      { name: "Email", component: EmailIcon, import: "EmailIcon" },
      { name: "Chat", component: ChatIcon, import: "ChatIcon" },
    ],
  },
  {
    category: "Data & Charts",
    icons: [
      { name: "BarChart", component: BarChartIcon, import: "BarChartIcon" },
      { name: "ShowChart", component: ShowChartIcon, import: "ShowChartIcon" },
      { name: "PieChart", component: PieChartIcon, import: "PieChartIcon" },
      {
        name: "DonutLarge",
        component: DonutLargeIcon,
        import: "DonutLargeIcon",
      },
      { name: "Timeline", component: TimelineIcon, import: "TimelineIcon" },
      {
        name: "TableChart",
        component: TableChartIcon,
        import: "TableChartIcon",
      },
      {
        name: "DataObject",
        component: DataObjectIcon,
        import: "DataObjectIcon",
      },
      { name: "Code", component: CodeIcon, import: "CodeIcon" },
      { name: "Terminal", component: TerminalIcon, import: "TerminalIcon" },
      { name: "Api", component: ApiIcon, import: "ApiIcon" },
    ],
  },
  {
    category: "Infrastructure",
    icons: [
      { name: "Storage", component: StorageIcon, import: "StorageIcon" },
      { name: "Cloud", component: CloudIcon, import: "CloudIcon" },
      {
        name: "CloudUpload",
        component: CloudUploadIcon,
        import: "CloudUploadIcon",
      },
      {
        name: "CloudDownload",
        component: CloudDownloadIcon,
        import: "CloudDownloadIcon",
      },
      { name: "Router", component: RouterIcon, import: "RouterIcon" },
      { name: "Dns", component: DnsIcon, import: "DnsIcon" },
      { name: "Lan", component: LanIcon, import: "LanIcon" },
      { name: "Devices", component: DevicesIcon, import: "DevicesIcon" },
      { name: "Computer", component: ComputerIcon, import: "ComputerIcon" },
    ],
  },
  {
    category: "Files & Media",
    icons: [
      { name: "Folder", component: FolderIcon, import: "FolderIcon" },
      {
        name: "FolderOpen",
        component: FolderOpenIcon,
        import: "FolderOpenIcon",
      },
      {
        name: "InsertDriveFile",
        component: InsertDriveFileIcon,
        import: "InsertDriveFileIcon",
      },
      {
        name: "AttachFile",
        component: AttachFileIcon,
        import: "AttachFileIcon",
      },
      { name: "GridView", component: GridViewIcon, import: "GridViewIcon" },
      { name: "ViewList", component: ViewListIcon, import: "ViewListIcon" },
      { name: "ZoomIn", component: ZoomInIcon, import: "ZoomInIcon" },
      { name: "ZoomOut", component: ZoomOutIcon, import: "ZoomOutIcon" },
      {
        name: "Fullscreen",
        component: FullscreenIcon,
        import: "FullscreenIcon",
      },
      {
        name: "FullscreenExit",
        component: FullscreenExitIcon,
        import: "FullscreenExitIcon",
      },
      { name: "DarkMode", component: DarkModeIcon, import: "DarkModeIcon" },
      { name: "LightMode", component: LightModeIcon, import: "LightModeIcon" },
    ],
  },

  {
    category: "Custom Icons",
    icons: [
      {
        name: "API",
        component: Icons.API as unknown as SvgIconComponent,
        import: "API",
      },
      {
        name: "API Key",
        component: Icons.APIKey as unknown as SvgIconComponent,
        import: "APIKey",
      },
      {
        name: "API Outline",
        component: Icons.APIOutline as unknown as SvgIconComponent,
        import: "APIOutline",
      },
      {
        name: "Activity Log",
        component: Icons.ActivityLog as unknown as SvgIconComponent,
        import: "ActivityLog",
      },
      {
        name: "All",
        component: Icons.All as unknown as SvgIconComponent,
        import: "All",
      },
      {
        name: "All Clear",
        component: Icons.AllClear as unknown as SvgIconComponent,
        import: "AllClear",
      },
      {
        name: "All Dots",
        component: Icons.AllDots as unknown as SvgIconComponent,
        import: "AllDots",
      },
      {
        name: "Ansible",
        component: Icons.Ansible as unknown as SvgIconComponent,
        import: "Ansible",
      },
      {
        name: "Approved",
        component: Icons.Approved as unknown as SvgIconComponent,
        import: "Approved",
      },
      {
        name: "Arrow Back IOS",
        component: Icons.ArrowBackIOS as unknown as SvgIconComponent,
        import: "ArrowBackIOS",
      },
      {
        name: "Arrow Dotted",
        component: Icons.ArrowDotted as unknown as SvgIconComponent,
        import: "ArrowDotted",
      },
      {
        name: "Arrow Forward IOS",
        component: Icons.ArrowForwardIOS as unknown as SvgIconComponent,
        import: "ArrowForwardIOS",
      },
      {
        name: "Arrow Forward Icon",
        component: Icons.ArrowForwardIcon as unknown as SvgIconComponent,
        import: "ArrowForwardIcon",
      },
      {
        name: "Attack Path",
        component: Icons.AttackPath as unknown as SvgIconComponent,
        import: "AttackPath",
      },
      {
        name: "Attack Path Icon",
        component: Icons.AttackPathIcon as unknown as SvgIconComponent,
        import: "AttackPathIcon",
      },
      {
        name: "Attack Path Icon V2",
        component: Icons.AttackPathIconV2 as unknown as SvgIconComponent,
        import: "AttackPathIconV2",
      },
      {
        name: "Bar",
        component: Icons.Bar as unknown as SvgIconComponent,
        import: "Bar",
      },
      {
        name: "Bitbucket",
        component: Icons.Bitbucket as unknown as SvgIconComponent,
        import: "Bitbucket",
      },
      {
        name: "Bitbucket Color",
        component: Icons.BitbucketColor as unknown as SvgIconComponent,
        import: "BitbucketColor",
      },
      {
        name: "Block",
        component: Icons.Block as unknown as SvgIconComponent,
        import: "Block",
      },
      {
        name: "Bug",
        component: Icons.Bug as unknown as SvgIconComponent,
        import: "Bug",
      },
      {
        name: "Bug Circle",
        component: Icons.BugCircle as unknown as SvgIconComponent,
        import: "BugCircle",
      },
      {
        name: "Bug Outline",
        component: Icons.BugOutline as unknown as SvgIconComponent,
        import: "BugOutline",
      },
      {
        name: "Bulb",
        component: Icons.Bulb as unknown as SvgIconComponent,
        import: "Bulb",
      },
      {
        name: "CIS Fatal",
        component: Icons.CISFatal as unknown as SvgIconComponent,
        import: "CISFatal",
      },
      {
        name: "CIS Info",
        component: Icons.CISInfo as unknown as SvgIconComponent,
        import: "CISInfo",
      },
      {
        name: "CIS Warning",
        component: Icons.CISWarning as unknown as SvgIconComponent,
        import: "CISWarning",
      },
      {
        name: "Calendar",
        component: Icons.Calendar as unknown as SvgIconComponent,
        import: "Calendar",
      },
      {
        name: "Cdr Icon",
        component: Icons.CdrIcon as unknown as SvgIconComponent,
        import: "CdrIcon",
      },
      {
        name: "Check",
        component: Icons.Check as unknown as SvgIconComponent,
        import: "Check",
      },
      {
        name: "Check Bold",
        component: Icons.CheckBold as unknown as SvgIconComponent,
        import: "CheckBold",
      },
      {
        name: "Check Circle Outline",
        component: Icons.CheckCircleOutline as unknown as SvgIconComponent,
        import: "CheckCircleOutline",
      },
      {
        name: "Checkbox",
        component: Icons.Checkbox as unknown as SvgIconComponent,
        import: "Checkbox",
      },
      {
        name: "Checkbox Full",
        component: Icons.CheckboxFull as unknown as SvgIconComponent,
        import: "CheckboxFull",
      },
      {
        name: "Checkmarx",
        component: Icons.Checkmarx as unknown as SvgIconComponent,
        import: "Checkmarx",
      },
      {
        name: "Classification Data Labeling",
        component:
          Icons.ClassificationDataLabeling as unknown as SvgIconComponent,
        import: "ClassificationDataLabeling",
      },
      {
        name: "Clock",
        component: Icons.Clock as unknown as SvgIconComponent,
        import: "Clock",
      },
      {
        name: "Clock Pending",
        component: Icons.ClockPending as unknown as SvgIconComponent,
        import: "ClockPending",
      },
      {
        name: "Close",
        component: Icons.Close as unknown as SvgIconComponent,
        import: "Close",
      },
      {
        name: "Close Large",
        component: Icons.CloseLarge as unknown as SvgIconComponent,
        import: "CloseLarge",
      },
      {
        name: "Cloud Deployment Manager",
        component: Icons.CloudDeploymentManager as unknown as SvgIconComponent,
        import: "CloudDeploymentManager",
      },
      {
        name: "Cloud Install",
        component: Icons.CloudInstall as unknown as SvgIconComponent,
        import: "CloudInstall",
      },
      {
        name: "Clusters",
        component: Icons.Clusters as unknown as SvgIconComponent,
        import: "Clusters",
      },
      {
        name: "Code",
        component: Icons.Code as unknown as SvgIconComponent,
        import: "Code",
      },
      {
        name: "Collapse",
        component: Icons.Collapse as unknown as SvgIconComponent,
        import: "Collapse",
      },
      {
        name: "Collapse All",
        component: Icons.CollapseAll as unknown as SvgIconComponent,
        import: "CollapseAll",
      },
      {
        name: "Common IAC",
        component: Icons.CommonIAC as unknown as SvgIconComponent,
        import: "CommonIAC",
      },
      {
        name: "Compare",
        component: Icons.Compare as unknown as SvgIconComponent,
        import: "Compare",
      },
      {
        name: "Compliance",
        component: Icons.Compliance as unknown as SvgIconComponent,
        import: "Compliance",
      },
      {
        name: "Compliance Cis",
        component: Icons.ComplianceCis as unknown as SvgIconComponent,
        import: "ComplianceCis",
      },
      {
        name: "Compliance Gdpr",
        component: Icons.ComplianceGdpr as unknown as SvgIconComponent,
        import: "ComplianceGdpr",
      },
      {
        name: "Compliance Hipaa",
        component: Icons.ComplianceHipaa as unknown as SvgIconComponent,
        import: "ComplianceHipaa",
      },
      {
        name: "Compliance Pci",
        component: Icons.CompliancePci as unknown as SvgIconComponent,
        import: "CompliancePci",
      },
      {
        name: "Compliance Soc2",
        component: Icons.ComplianceSoc2 as unknown as SvgIconComponent,
        import: "ComplianceSoc2",
      },
      {
        name: "Connection",
        component: Icons.Connection as unknown as SvgIconComponent,
        import: "Connection",
      },
      {
        name: "Copy",
        component: Icons.Copy as unknown as SvgIconComponent,
        import: "Copy",
      },
      {
        name: "Copy Landscape",
        component: Icons.CopyLandscape as unknown as SvgIconComponent,
        import: "CopyLandscape",
      },
      {
        name: "Cross Bold",
        component: Icons.CrossBold as unknown as SvgIconComponent,
        import: "CrossBold",
      },
      {
        name: "Cross Circle Outline",
        component: Icons.CrossCircleOutline as unknown as SvgIconComponent,
        import: "CrossCircleOutline",
      },
      {
        name: "Crossplane",
        component: Icons.Crossplane as unknown as SvgIconComponent,
        import: "Crossplane",
      },
      {
        name: "Dashboard1",
        component: Icons.Dashboard1 as unknown as SvgIconComponent,
        import: "Dashboard1",
      },
      {
        name: "Dashboard2",
        component: Icons.Dashboard2 as unknown as SvgIconComponent,
        import: "Dashboard2",
      },
      {
        name: "Data Label",
        component: Icons.DataLabel as unknown as SvgIconComponent,
        import: "DataLabel",
      },
      {
        name: "Database",
        component: Icons.Database as unknown as SvgIconComponent,
        import: "Database",
      },
      {
        name: "Database Access",
        component: Icons.DatabaseAccess as unknown as SvgIconComponent,
        import: "DatabaseAccess",
      },
      {
        name: "Database Outline",
        component: Icons.DatabaseOutline as unknown as SvgIconComponent,
        import: "DatabaseOutline",
      },
      {
        name: "Delete",
        component: Icons.Delete as unknown as SvgIconComponent,
        import: "Delete",
      },
      {
        name: "Doc Valid",
        component: Icons.DocValid as unknown as SvgIconComponent,
        import: "DocValid",
      },
      {
        name: "Docker",
        component: Icons.Docker as unknown as SvgIconComponent,
        import: "Docker",
      },
      {
        name: "Docker2",
        component: Icons.Docker2 as unknown as SvgIconComponent,
        import: "Docker2",
      },
      {
        name: "Docker Compose",
        component: Icons.DockerCompose as unknown as SvgIconComponent,
        import: "DockerCompose",
      },
      {
        name: "Documentation",
        component: Icons.Documentation as unknown as SvgIconComponent,
        import: "Documentation",
      },
      {
        name: "Dot",
        component: Icons.Dot as unknown as SvgIconComponent,
        import: "Dot",
      },
      {
        name: "Double Arrow Forward",
        component: Icons.DoubleArrowForward as unknown as SvgIconComponent,
        import: "DoubleArrowForward",
      },
      {
        name: "Download Outline",
        component: Icons.DownloadOutline as unknown as SvgIconComponent,
        import: "DownloadOutline",
      },
      {
        name: "Drag",
        component: Icons.Drag as unknown as SvgIconComponent,
        import: "Drag",
      },
      {
        name: "Duplicate",
        component: Icons.Duplicate as unknown as SvgIconComponent,
        import: "Duplicate",
      },
      {
        name: "Edit Outline",
        component: Icons.EditOutline as unknown as SvgIconComponent,
        import: "EditOutline",
      },
      {
        name: "Encrypt",
        component: Icons.Encrypt as unknown as SvgIconComponent,
        import: "Encrypt",
      },
      {
        name: "Endpoint",
        component: Icons.Endpoint as unknown as SvgIconComponent,
        import: "Endpoint",
      },
      {
        name: "Error Circle Outline",
        component: Icons.ErrorCircleOutline as unknown as SvgIconComponent,
        import: "ErrorCircleOutline",
      },
      {
        name: "Exchange",
        component: Icons.Exchange as unknown as SvgIconComponent,
        import: "Exchange",
      },
      {
        name: "Exclamation",
        component: Icons.Exclamation as unknown as SvgIconComponent,
        import: "Exclamation",
      },
      {
        name: "Expand",
        component: Icons.Expand as unknown as SvgIconComponent,
        import: "Expand",
      },
      {
        name: "Expand All",
        component: Icons.ExpandAll as unknown as SvgIconComponent,
        import: "ExpandAll",
      },
      {
        name: "Expansions",
        component: Icons.Expansions as unknown as SvgIconComponent,
        import: "Expansions",
      },
      {
        name: "Export",
        component: Icons.Export as unknown as SvgIconComponent,
        import: "Export",
      },
      {
        name: "Falcon",
        component: Icons.Falcon as unknown as SvgIconComponent,
        import: "Falcon",
      },
      {
        name: "File",
        component: Icons.File as unknown as SvgIconComponent,
        import: "File",
      },
      {
        name: "File System",
        component: Icons.FileSystem as unknown as SvgIconComponent,
        import: "FileSystem",
      },
      {
        name: "Filter",
        component: Icons.Filter as unknown as SvgIconComponent,
        import: "Filter",
      },
      {
        name: "Filter Outline",
        component: Icons.FilterOutline as unknown as SvgIconComponent,
        import: "FilterOutline",
      },
      {
        name: "Fingerprint",
        component: Icons.Fingerprint as unknown as SvgIconComponent,
        import: "Fingerprint",
      },
      {
        name: "Folder",
        component: Icons.Folder as unknown as SvgIconComponent,
        import: "Folder",
      },
      {
        name: "Framework",
        component: Icons.Framework as unknown as SvgIconComponent,
        import: "Framework",
      },
      {
        name: "Git Hub",
        component: Icons.GitHub as unknown as SvgIconComponent,
        import: "GitHub",
      },
      {
        name: "Git Hub Group Asset",
        component: Icons.GitHubGroupAsset as unknown as SvgIconComponent,
        import: "GitHubGroupAsset",
      },
      {
        name: "Git Hub Repo Asset",
        component: Icons.GitHubRepoAsset as unknown as SvgIconComponent,
        import: "GitHubRepoAsset",
      },
      {
        name: "Git Lab",
        component: Icons.GitLab as unknown as SvgIconComponent,
        import: "GitLab",
      },
      {
        name: "Git Lab Group Asset",
        component: Icons.GitLabGroupAsset as unknown as SvgIconComponent,
        import: "GitLabGroupAsset",
      },
      {
        name: "Git Lab Repo Asset",
        component: Icons.GitLabRepoAsset as unknown as SvgIconComponent,
        import: "GitLabRepoAsset",
      },
      {
        name: "Gitlab Color",
        component: Icons.GitlabColor as unknown as SvgIconComponent,
        import: "GitlabColor",
      },
      {
        name: "Group",
        component: Icons.Group as unknown as SvgIconComponent,
        import: "Group",
      },
      {
        name: "Guard Duty",
        component: Icons.GuardDuty as unknown as SvgIconComponent,
        import: "GuardDuty",
      },
      {
        name: "Health",
        component: Icons.Health as unknown as SvgIconComponent,
        import: "Health",
      },
      {
        name: "Helm",
        component: Icons.Helm as unknown as SvgIconComponent,
        import: "Helm",
      },
      {
        name: "Hide Outline",
        component: Icons.HideOutline as unknown as SvgIconComponent,
        import: "HideOutline",
      },
      {
        name: "IAC",
        component: Icons.IAC as unknown as SvgIconComponent,
        import: "IAC",
      },
      {
        name: "IAC Security",
        component: Icons.IACSecurity as unknown as SvgIconComponent,
        import: "IACSecurity",
      },
      {
        name: "Iac Stack",
        component: Icons.IacStack as unknown as SvgIconComponent,
        import: "IacStack",
      },
      {
        name: "Ignore",
        component: Icons.Ignore as unknown as SvgIconComponent,
        import: "Ignore",
      },
      {
        name: "Image Valid",
        component: Icons.ImageValid as unknown as SvgIconComponent,
        import: "ImageValid",
      },
      {
        name: "Info",
        component: Icons.Info as unknown as SvgIconComponent,
        import: "Info",
      },
      {
        name: "Info Bold",
        component: Icons.InfoBold as unknown as SvgIconComponent,
        import: "InfoBold",
      },
      {
        name: "Info Circle Outline",
        component: Icons.InfoCircleOutline as unknown as SvgIconComponent,
        import: "InfoCircleOutline",
      },
      {
        name: "Inline V",
        component: Icons.InlineV as unknown as SvgIconComponent,
        import: "InlineV",
      },
      {
        name: "Inline X",
        component: Icons.InlineX as unknown as SvgIconComponent,
        import: "InlineX",
      },
      {
        name: "Insights",
        component: Icons.Insights as unknown as SvgIconComponent,
        import: "Insights",
      },
      {
        name: "Internet Scanner",
        component: Icons.InternetScanner as unknown as SvgIconComponent,
        import: "InternetScanner",
      },
      {
        name: "Jira",
        component: Icons.Jira as unknown as SvgIconComponent,
        import: "Jira",
      },
      {
        name: "Jira Blue",
        component: Icons.JiraBlue as unknown as SvgIconComponent,
        import: "JiraBlue",
      },
      {
        name: "Keyboard Arrow Down",
        component: Icons.KeyboardArrowDown as unknown as SvgIconComponent,
        import: "KeyboardArrowDown",
      },
      {
        name: "Keyboard Arrow Left",
        component: Icons.KeyboardArrowLeft as unknown as SvgIconComponent,
        import: "KeyboardArrowLeft",
      },
      {
        name: "Keyboard Arrow Right",
        component: Icons.KeyboardArrowRight as unknown as SvgIconComponent,
        import: "KeyboardArrowRight",
      },
      {
        name: "Keyboard Arrow Up",
        component: Icons.KeyboardArrowUp as unknown as SvgIconComponent,
        import: "KeyboardArrowUp",
      },
      {
        name: "Legend",
        component: Icons.Legend as unknown as SvgIconComponent,
        import: "Legend",
      },
      {
        name: "Link",
        component: Icons.Link as unknown as SvgIconComponent,
        import: "Link",
      },
      {
        name: "List",
        component: Icons.List as unknown as SvgIconComponent,
        import: "List",
      },
      {
        name: "Loading",
        component: Icons.Loading as unknown as SvgIconComponent,
        import: "Loading",
      },
      {
        name: "Lock Off",
        component: Icons.LockOff as unknown as SvgIconComponent,
        import: "LockOff",
      },
      {
        name: "Lock Outline",
        component: Icons.LockOutline as unknown as SvgIconComponent,
        import: "LockOutline",
      },
      {
        name: "Logout",
        component: Icons.Logout as unknown as SvgIconComponent,
        import: "Logout",
      },
      {
        name: "Malware Icon",
        component: Icons.MalwareIcon as unknown as SvgIconComponent,
        import: "MalwareIcon",
      },
      {
        name: "Manage Columns",
        component: Icons.ManageColumns as unknown as SvgIconComponent,
        import: "ManageColumns",
      },
      {
        name: "Manual Data Labeling",
        component: Icons.ManualDataLabeling as unknown as SvgIconComponent,
        import: "ManualDataLabeling",
      },
      {
        name: "Mcd",
        component: Icons.Mcd as unknown as SvgIconComponent,
        import: "Mcd",
      },
      {
        name: "Mcd Gateway",
        component: Icons.McdGateway as unknown as SvgIconComponent,
        import: "McdGateway",
      },
      {
        name: "Menu Apisec",
        component: Icons.MenuApisec as unknown as SvgIconComponent,
        import: "MenuApisec",
      },
      {
        name: "Menu Attack Path Analysis",
        component: Icons.MenuAttackPathAnalysis as unknown as SvgIconComponent,
        import: "MenuAttackPathAnalysis",
      },
      {
        name: "Menu CICD",
        component: Icons.MenuCICD as unknown as SvgIconComponent,
        import: "MenuCICD",
      },
      {
        name: "Menu Cloud Inventory",
        component: Icons.MenuCloudInventory as unknown as SvgIconComponent,
        import: "MenuCloudInventory",
      },
      {
        name: "Menu Compliance Report",
        component: Icons.MenuComplianceReport as unknown as SvgIconComponent,
        import: "MenuComplianceReport",
      },
      {
        name: "Menu Data Security",
        component: Icons.MenuDataSecurity as unknown as SvgIconComponent,
        import: "MenuDataSecurity",
      },
      {
        name: "Menu External Attack Surface",
        component:
          Icons.MenuExternalAttackSurface as unknown as SvgIconComponent,
        import: "MenuExternalAttackSurface",
      },
      {
        name: "Menu Integrations",
        component: Icons.MenuIntegrations as unknown as SvgIconComponent,
        import: "MenuIntegrations",
      },
      {
        name: "Menu Overview",
        component: Icons.MenuOverview as unknown as SvgIconComponent,
        import: "MenuOverview",
      },
      {
        name: "Menu Reports",
        component: Icons.MenuReports as unknown as SvgIconComponent,
        import: "MenuReports",
      },
      {
        name: "Menu Runtime Events",
        component: Icons.MenuRuntimeEvents as unknown as SvgIconComponent,
        import: "MenuRuntimeEvents",
      },
      {
        name: "Menu Security Graph",
        component: Icons.MenuSecurityGraph as unknown as SvgIconComponent,
        import: "MenuSecurityGraph",
      },
      {
        name: "Menu Security Posture",
        component: Icons.MenuSecurityPosture as unknown as SvgIconComponent,
        import: "MenuSecurityPosture",
      },
      {
        name: "Menu Settings",
        component: Icons.MenuSettings as unknown as SvgIconComponent,
        import: "MenuSettings",
      },
      {
        name: "Menu Software Supply Chain",
        component: Icons.MenuSoftwareSupplyChain as unknown as SvgIconComponent,
        import: "MenuSoftwareSupplyChain",
      },
      {
        name: "Menu Vulnerability Management",
        component:
          Icons.MenuVulnerabilityManagement as unknown as SvgIconComponent,
        import: "MenuVulnerabilityManagement",
      },
      {
        name: "Merge",
        component: Icons.Merge as unknown as SvgIconComponent,
        import: "Merge",
      },
      {
        name: "Merge Circle",
        component: Icons.MergeCircle as unknown as SvgIconComponent,
        import: "MergeCircle",
      },
      {
        name: "Minus Bold",
        component: Icons.MinusBold as unknown as SvgIconComponent,
        import: "MinusBold",
      },
      {
        name: "Minus Circle Out",
        component: Icons.MinusCircleOut as unknown as SvgIconComponent,
        import: "MinusCircleOut",
      },
      {
        name: "Move Top",
        component: Icons.MoveTop as unknown as SvgIconComponent,
        import: "MoveTop",
      },
      {
        name: "Namespace",
        component: Icons.Namespace as unknown as SvgIconComponent,
        import: "Namespace",
      },
      {
        name: "Network",
        component: Icons.Network as unknown as SvgIconComponent,
        import: "Network",
      },
      {
        name: "Node",
        component: Icons.Node as unknown as SvgIconComponent,
        import: "Node",
      },
      {
        name: "Notifications",
        component: Icons.Notifications as unknown as SvgIconComponent,
        import: "Notifications",
      },
      {
        name: "Open API",
        component: Icons.OpenAPI as unknown as SvgIconComponent,
        import: "OpenAPI",
      },
      {
        name: "Open In New Tab",
        component: Icons.OpenInNewTab as unknown as SvgIconComponent,
        import: "OpenInNewTab",
      },
      {
        name: "Open Page",
        component: Icons.OpenPage as unknown as SvgIconComponent,
        import: "OpenPage",
      },
      {
        name: "Open Port",
        component: Icons.OpenPort as unknown as SvgIconComponent,
        import: "OpenPort",
      },
      {
        name: "Packages",
        component: Icons.Packages as unknown as SvgIconComponent,
        import: "Packages",
      },
      {
        name: "Panoptica Full Logo",
        component: Icons.PanopticaFullLogo as unknown as SvgIconComponent,
        import: "PanopticaFullLogo",
      },
      {
        name: "Panoptica Icon",
        component: Icons.PanopticaIcon as unknown as SvgIconComponent,
        import: "PanopticaIcon",
      },
      {
        name: "Password",
        component: Icons.Password as unknown as SvgIconComponent,
        import: "Password",
      },
      {
        name: "Permissions",
        component: Icons.Permissions as unknown as SvgIconComponent,
        import: "Permissions",
      },
      {
        name: "Pin",
        component: Icons.Pin as unknown as SvgIconComponent,
        import: "Pin",
      },
      {
        name: "Plus Bold",
        component: Icons.PlusBold as unknown as SvgIconComponent,
        import: "PlusBold",
      },
      {
        name: "Policy Automated",
        component: Icons.PolicyAutomated as unknown as SvgIconComponent,
        import: "PolicyAutomated",
      },
      {
        name: "Policy Secret",
        component: Icons.PolicySecret as unknown as SvgIconComponent,
        import: "PolicySecret",
      },
      {
        name: "Policy Version",
        component: Icons.PolicyVersion as unknown as SvgIconComponent,
        import: "PolicyVersion",
      },
      {
        name: "Preview",
        component: Icons.Preview as unknown as SvgIconComponent,
        import: "Preview",
      },
      {
        name: "Private IP",
        component: Icons.PrivateIP as unknown as SvgIconComponent,
        import: "PrivateIP",
      },
      {
        name: "Pull Request",
        component: Icons.PullRequest as unknown as SvgIconComponent,
        import: "PullRequest",
      },
      {
        name: "Pulumi",
        component: Icons.Pulumi as unknown as SvgIconComponent,
        import: "Pulumi",
      },
      {
        name: "Query Collapse",
        component: Icons.QueryCollapse as unknown as SvgIconComponent,
        import: "QueryCollapse",
      },
      {
        name: "Radio Checked",
        component: Icons.RadioChecked as unknown as SvgIconComponent,
        import: "RadioChecked",
      },
      {
        name: "Realtime Asset",
        component: Icons.RealtimeAsset as unknown as SvgIconComponent,
        import: "RealtimeAsset",
      },
      {
        name: "Recon",
        component: Icons.Recon as unknown as SvgIconComponent,
        import: "Recon",
      },
      {
        name: "Reload",
        component: Icons.Reload as unknown as SvgIconComponent,
        import: "Reload",
      },
      {
        name: "Repair",
        component: Icons.Repair as unknown as SvgIconComponent,
        import: "Repair",
      },
      {
        name: "Replace",
        component: Icons.Replace as unknown as SvgIconComponent,
        import: "Replace",
      },
      {
        name: "Repo",
        component: Icons.Repo as unknown as SvgIconComponent,
        import: "Repo",
      },
      {
        name: "Repository",
        component: Icons.Repository as unknown as SvgIconComponent,
        import: "Repository",
      },
      {
        name: "Rounded Check Circle Outline",
        component:
          Icons.RoundedCheckCircleOutline as unknown as SvgIconComponent,
        import: "RoundedCheckCircleOutline",
      },
      {
        name: "Rule Based Data Labeling",
        component: Icons.RuleBasedDataLabeling as unknown as SvgIconComponent,
        import: "RuleBasedDataLabeling",
      },
      {
        name: "SSO",
        component: Icons.SSO as unknown as SvgIconComponent,
        import: "SSO",
      },
      {
        name: "S Three Bucket",
        component: Icons.SThreeBucket as unknown as SvgIconComponent,
        import: "SThreeBucket",
      },
      {
        name: "Scan",
        component: Icons.Scan as unknown as SvgIconComponent,
        import: "Scan",
      },
      {
        name: "Secret",
        component: Icons.Secret as unknown as SvgIconComponent,
        import: "Secret",
      },
      {
        name: "Secure Endpoint",
        component: Icons.SecureEndpoint as unknown as SvgIconComponent,
        import: "SecureEndpoint",
      },
      {
        name: "Security Posture Icon",
        component: Icons.SecurityPostureIcon as unknown as SvgIconComponent,
        import: "SecurityPostureIcon",
      },
      {
        name: "Send",
        component: Icons.Send as unknown as SvgIconComponent,
        import: "Send",
      },
      {
        name: "Sensitive Data",
        component: Icons.SensitiveData as unknown as SvgIconComponent,
        import: "SensitiveData",
      },
      {
        name: "Serverless",
        component: Icons.Serverless as unknown as SvgIconComponent,
        import: "Serverless",
      },
      {
        name: "Service Now",
        component: Icons.ServiceNow as unknown as SvgIconComponent,
        import: "ServiceNow",
      },
      {
        name: "Settings",
        component: Icons.Settings as unknown as SvgIconComponent,
        import: "Settings",
      },
      {
        name: "Settings Menu API Keys",
        component: Icons.SettingsMenuAPIKeys as unknown as SvgIconComponent,
        import: "SettingsMenuAPIKeys",
      },
      {
        name: "Settings Menu API Security",
        component: Icons.SettingsMenuAPISecurity as unknown as SvgIconComponent,
        import: "SettingsMenuAPISecurity",
      },
      {
        name: "Settings Menu Accounts",
        component: Icons.SettingsMenuAccounts as unknown as SvgIconComponent,
        import: "SettingsMenuAccounts",
      },
      {
        name: "Settings Menu Alerts",
        component: Icons.SettingsMenuAlerts as unknown as SvgIconComponent,
        import: "SettingsMenuAlerts",
      },
      {
        name: "Settings Menu Audit Log",
        component: Icons.SettingsMenuAuditLog as unknown as SvgIconComponent,
        import: "SettingsMenuAuditLog",
      },
      {
        name: "Settings Menu External Attack Surface",
        component:
          Icons.SettingsMenuExternalAttackSurface as unknown as SvgIconComponent,
        import: "SettingsMenuExternalAttackSurface",
      },
      {
        name: "Settings Menu Gen AI Security",
        component:
          Icons.SettingsMenuGenAISecurity as unknown as SvgIconComponent,
        import: "SettingsMenuGenAISecurity",
      },
      {
        name: "Settings Menu Integrations",
        component:
          Icons.SettingsMenuIntegrations as unknown as SvgIconComponent,
        import: "SettingsMenuIntegrations",
      },
      {
        name: "Settings Menu Profile",
        component: Icons.SettingsMenuProfile as unknown as SvgIconComponent,
        import: "SettingsMenuProfile",
      },
      {
        name: "Settings Menu SCM",
        component: Icons.SettingsMenuSCM as unknown as SvgIconComponent,
        import: "SettingsMenuSCM",
      },
      {
        name: "Settings Menu Users Scopes",
        component: Icons.SettingsMenuUsersScopes as unknown as SvgIconComponent,
        import: "SettingsMenuUsersScopes",
      },
      {
        name: "Settings Outline",
        component: Icons.SettingsOutline as unknown as SvgIconComponent,
        import: "SettingsOutline",
      },
      {
        name: "Severity Bar",
        component: Icons.SeverityBar as unknown as SvgIconComponent,
        import: "SeverityBar",
      },
      {
        name: "Shadow",
        component: Icons.Shadow as unknown as SvgIconComponent,
        import: "Shadow",
      },
      {
        name: "Share",
        component: Icons.Share as unknown as SvgIconComponent,
        import: "Share",
      },
      {
        name: "Size Down",
        component: Icons.SizeDown as unknown as SvgIconComponent,
        import: "SizeDown",
      },
      {
        name: "Size Up",
        component: Icons.SizeUp as unknown as SvgIconComponent,
        import: "SizeUp",
      },
      {
        name: "Skip Next",
        component: Icons.SkipNext as unknown as SvgIconComponent,
        import: "SkipNext",
      },
      {
        name: "Skip Previous",
        component: Icons.SkipPrevious as unknown as SvgIconComponent,
        import: "SkipPrevious",
      },
      {
        name: "Slack",
        component: Icons.Slack as unknown as SvgIconComponent,
        import: "Slack",
      },
      {
        name: "Snyk",
        component: Icons.Snyk as unknown as SvgIconComponent,
        import: "Snyk",
      },
      {
        name: "Sort Arrow Down",
        component: Icons.SortArrowDown as unknown as SvgIconComponent,
        import: "SortArrowDown",
      },
      {
        name: "Sort Arrow Up",
        component: Icons.SortArrowUp as unknown as SvgIconComponent,
        import: "SortArrowUp",
      },
      {
        name: "Sort Double Arrow",
        component: Icons.SortDoubleArrow as unknown as SvgIconComponent,
        import: "SortDoubleArrow",
      },
      {
        name: "Sort Group",
        component: Icons.SortGroup as unknown as SvgIconComponent,
        import: "SortGroup",
      },
      {
        name: "Sort Inverted",
        component: Icons.SortInverted as unknown as SvgIconComponent,
        import: "SortInverted",
      },
      {
        name: "Spark",
        component: Icons.Spark as unknown as SvgIconComponent,
        import: "Spark",
      },
      {
        name: "Star",
        component: Icons.Star as unknown as SvgIconComponent,
        import: "Star",
      },
      {
        name: "Star Outline",
        component: Icons.StarOutline as unknown as SvgIconComponent,
        import: "StarOutline",
      },
      {
        name: "Structure",
        component: Icons.Structure as unknown as SvgIconComponent,
        import: "Structure",
      },
      {
        name: "Swagger",
        component: Icons.Swagger as unknown as SvgIconComponent,
        import: "Swagger",
      },
      {
        name: "Swagger Outline",
        component: Icons.SwaggerOutline as unknown as SvgIconComponent,
        import: "SwaggerOutline",
      },
      {
        name: "Table",
        component: Icons.Table as unknown as SvgIconComponent,
        import: "Table",
      },
      {
        name: "Target",
        component: Icons.Target as unknown as SvgIconComponent,
        import: "Target",
      },
      {
        name: "Target Sensitive",
        component: Icons.TargetSensitive as unknown as SvgIconComponent,
        import: "TargetSensitive",
      },
      {
        name: "Teams",
        component: Icons.Teams as unknown as SvgIconComponent,
        import: "Teams",
      },
      {
        name: "Tenable",
        component: Icons.Tenable as unknown as SvgIconComponent,
        import: "Tenable",
      },
      {
        name: "Terraform",
        component: Icons.Terraform as unknown as SvgIconComponent,
        import: "Terraform",
      },
      {
        name: "Test",
        component: Icons.Test as unknown as SvgIconComponent,
        import: "Test",
      },
      {
        name: "Tray",
        component: Icons.Tray as unknown as SvgIconComponent,
        import: "Tray",
      },
      {
        name: "Trend",
        component: Icons.Trend as unknown as SvgIconComponent,
        import: "Trend",
      },
      {
        name: "Trend Arrow",
        component: Icons.TrendArrow as unknown as SvgIconComponent,
        import: "TrendArrow",
      },
      {
        name: "Triangle Up Outline",
        component: Icons.TriangleUpOutline as unknown as SvgIconComponent,
        import: "TriangleUpOutline",
      },
      {
        name: "Twist Lock",
        component: Icons.TwistLock as unknown as SvgIconComponent,
        import: "TwistLock",
      },
      {
        name: "Un Ignore",
        component: Icons.UnIgnore as unknown as SvgIconComponent,
        import: "UnIgnore",
      },
      {
        name: "Undo",
        component: Icons.Undo as unknown as SvgIconComponent,
        import: "Undo",
      },
      {
        name: "Uninstall",
        component: Icons.Uninstall as unknown as SvgIconComponent,
        import: "Uninstall",
      },
      {
        name: "Union",
        component: Icons.Union as unknown as SvgIconComponent,
        import: "Union",
      },
      {
        name: "Unlock",
        component: Icons.Unlock as unknown as SvgIconComponent,
        import: "Unlock",
      },
      {
        name: "User",
        component: Icons.User as unknown as SvgIconComponent,
        import: "User",
      },
      {
        name: "User Circle",
        component: Icons.UserCircle as unknown as SvgIconComponent,
        import: "UserCircle",
      },
      {
        name: "Vul Arrow Up",
        component: Icons.VulArrowUp as unknown as SvgIconComponent,
        import: "VulArrowUp",
      },
      {
        name: "Vul Cisa",
        component: Icons.VulCisa as unknown as SvgIconComponent,
        import: "VulCisa",
      },
      {
        name: "Vul Container",
        component: Icons.VulContainer as unknown as SvgIconComponent,
        import: "VulContainer",
      },
      {
        name: "Vul Exploitable",
        component: Icons.VulExploitable as unknown as SvgIconComponent,
        import: "VulExploitable",
      },
      {
        name: "Vul Panoptica",
        component: Icons.VulPanoptica as unknown as SvgIconComponent,
        import: "VulPanoptica",
      },
      {
        name: "Vul Partial",
        component: Icons.VulPartial as unknown as SvgIconComponent,
        import: "VulPartial",
      },
      {
        name: "Vul Public",
        component: Icons.VulPublic as unknown as SvgIconComponent,
        import: "VulPublic",
      },
      {
        name: "Vul Serverless",
        component: Icons.VulServerless as unknown as SvgIconComponent,
        import: "VulServerless",
      },
      {
        name: "Vul Snyk",
        component: Icons.VulSnyk as unknown as SvgIconComponent,
        import: "VulSnyk",
      },
      {
        name: "Vul Stackrox",
        component: Icons.VulStackrox as unknown as SvgIconComponent,
        import: "VulStackrox",
      },
      {
        name: "Vul Tenable",
        component: Icons.VulTenable as unknown as SvgIconComponent,
        import: "VulTenable",
      },
      {
        name: "Vul Twist Lock",
        component: Icons.VulTwistLock as unknown as SvgIconComponent,
        import: "VulTwistLock",
      },
      {
        name: "Vulnerabilities Icon",
        component: Icons.VulnerabilitiesIcon as unknown as SvgIconComponent,
        import: "VulnerabilitiesIcon",
      },
      {
        name: "Warning Accounts",
        component: Icons.WarningAccounts as unknown as SvgIconComponent,
        import: "WarningAccounts",
      },
      {
        name: "Warning Question",
        component: Icons.WarningQuestion as unknown as SvgIconComponent,
        import: "WarningQuestion",
      },
      {
        name: "Webex",
        component: Icons.Webex as unknown as SvgIconComponent,
        import: "Webex",
      },
      {
        name: "Zombie",
        component: Icons.Zombie as unknown as SvgIconComponent,
        import: "Zombie",
      },
      {
        name: "g RPC",
        component: Icons.gRPC as unknown as SvgIconComponent,
        import: "gRPC",
      },
    ],
  },
  {
    category: "AWS Categories",
    icons: [
      {
        name: "AWS Category Analytics",
        component: Icons.AWSCategoryAnalytics as unknown as SvgIconComponent,
        import: "AWSCategoryAnalytics",
      },
      {
        name: "AWS Category Compute",
        component: Icons.AWSCategoryCompute as unknown as SvgIconComponent,
        import: "AWSCategoryCompute",
      },
      {
        name: "AWS Category Containers",
        component: Icons.AWSCategoryContainers as unknown as SvgIconComponent,
        import: "AWSCategoryContainers",
      },
      {
        name: "AWS Category Database",
        component: Icons.AWSCategoryDatabase as unknown as SvgIconComponent,
        import: "AWSCategoryDatabase",
      },
      {
        name: "AWS Category Identity Security",
        component:
          Icons.AWSCategoryIdentitySecurity as unknown as SvgIconComponent,
        import: "AWSCategoryIdentitySecurity",
      },
      {
        name: "AWS Category Identity Security1",
        component:
          Icons.AWSCategoryIdentitySecurity1 as unknown as SvgIconComponent,
        import: "AWSCategoryIdentitySecurity1",
      },
      {
        name: "AWS Category Machine Learning",
        component:
          Icons.AWSCategoryMachineLearning as unknown as SvgIconComponent,
        import: "AWSCategoryMachineLearning",
      },
      {
        name: "AWS Category Management Governance",
        component:
          Icons.AWSCategoryManagementGovernance as unknown as SvgIconComponent,
        import: "AWSCategoryManagementGovernance",
      },
      {
        name: "AWS Category Networking",
        component: Icons.AWSCategoryNetworking as unknown as SvgIconComponent,
        import: "AWSCategoryNetworking",
      },
      {
        name: "AWS Category None",
        component: Icons.AWSCategoryNone as unknown as SvgIconComponent,
        import: "AWSCategoryNone",
      },
      {
        name: "AWS Category Storage",
        component: Icons.AWSCategoryStorage as unknown as SvgIconComponent,
        import: "AWSCategoryStorage",
      },
      {
        name: "AWS Category Undefined",
        component: Icons.AWSCategoryUndefined as unknown as SvgIconComponent,
        import: "AWSCategoryUndefined",
      },
      {
        name: "AWS Category Web Mobile",
        component: Icons.AWSCategoryWebMobile as unknown as SvgIconComponent,
        import: "AWSCategoryWebMobile",
      },
    ],
  },
  {
    category: "AWS Services",
    icons: [
      {
        name: "AWS Cloud Formation",
        component: Icons.AWSCloudFormation as unknown as SvgIconComponent,
        import: "AWSCloudFormation",
      },
      {
        name: "AWS Icon",
        component: Icons.AWSIcon as unknown as SvgIconComponent,
        import: "AWSIcon",
      },
      {
        name: "AWS Services ACM",
        component: Icons.AWSServicesACM as unknown as SvgIconComponent,
        import: "AWSServicesACM",
      },
      {
        name: "AWS Services AMI",
        component: Icons.AWSServicesAMI as unknown as SvgIconComponent,
        import: "AWSServicesAMI",
      },
      {
        name: "AWS Services API Gateway",
        component: Icons.AWSServicesAPIGateway as unknown as SvgIconComponent,
        import: "AWSServicesAPIGateway",
      },
      {
        name: "AWS Services AWS Config",
        component: Icons.AWSServicesAWSConfig as unknown as SvgIconComponent,
        import: "AWSServicesAWSConfig",
      },
      {
        name: "AWS Services AWS Transfer Family",
        component:
          Icons.AWSServicesAWSTransferFamily as unknown as SvgIconComponent,
        import: "AWSServicesAWSTransferFamily",
      },
      {
        name: "AWS Services AWS Transfer Family1",
        component:
          Icons.AWSServicesAWSTransferFamily1 as unknown as SvgIconComponent,
        import: "AWSServicesAWSTransferFamily1",
      },
      {
        name: "AWS Services Amazon Memory DB For Redis",
        component:
          Icons.AWSServicesAmazonMemoryDBForRedis as unknown as SvgIconComponent,
        import: "AWSServicesAmazonMemoryDBForRedis",
      },
      {
        name: "AWS Services Athena",
        component: Icons.AWSServicesAthena as unknown as SvgIconComponent,
        import: "AWSServicesAthena",
      },
      {
        name: "AWS Services Auto Scaling Group",
        component:
          Icons.AWSServicesAutoScalingGroup as unknown as SvgIconComponent,
        import: "AWSServicesAutoScalingGroup",
      },
      {
        name: "AWS Services Auto Scaling Group1",
        component:
          Icons.AWSServicesAutoScalingGroup1 as unknown as SvgIconComponent,
        import: "AWSServicesAutoScalingGroup1",
      },
      {
        name: "AWS Services Backup",
        component: Icons.AWSServicesBackup as unknown as SvgIconComponent,
        import: "AWSServicesBackup",
      },
      {
        name: "AWS Services CIS",
        component: Icons.AWSServicesCIS as unknown as SvgIconComponent,
        import: "AWSServicesCIS",
      },
      {
        name: "AWS Services Certificate Manager",
        component:
          Icons.AWSServicesCertificateManager as unknown as SvgIconComponent,
        import: "AWSServicesCertificateManager",
      },
      {
        name: "AWS Services Client VPN",
        component: Icons.AWSServicesClientVPN as unknown as SvgIconComponent,
        import: "AWSServicesClientVPN",
      },
      {
        name: "AWS Services Cloud Formation",
        component:
          Icons.AWSServicesCloudFormation as unknown as SvgIconComponent,
        import: "AWSServicesCloudFormation",
      },
      {
        name: "AWS Services Cloud Formation Stack",
        component:
          Icons.AWSServicesCloudFormationStack as unknown as SvgIconComponent,
        import: "AWSServicesCloudFormationStack",
      },
      {
        name: "AWS Services Cloud Formation Stack Set",
        component:
          Icons.AWSServicesCloudFormationStackSet as unknown as SvgIconComponent,
        import: "AWSServicesCloudFormationStackSet",
      },
      {
        name: "AWS Services Cloud Trail",
        component: Icons.AWSServicesCloudTrail as unknown as SvgIconComponent,
        import: "AWSServicesCloudTrail",
      },
      {
        name: "AWS Services Cloud Watch",
        component: Icons.AWSServicesCloudWatch as unknown as SvgIconComponent,
        import: "AWSServicesCloudWatch",
      },
      {
        name: "AWS Services Cloudfront",
        component: Icons.AWSServicesCloudfront as unknown as SvgIconComponent,
        import: "AWSServicesCloudfront",
      },
      {
        name: "AWS Services Cognito",
        component: Icons.AWSServicesCognito as unknown as SvgIconComponent,
        import: "AWSServicesCognito",
      },
      {
        name: "AWS Services Compliance",
        component: Icons.AWSServicesCompliance as unknown as SvgIconComponent,
        import: "AWSServicesCompliance",
      },
      {
        name: "AWS Services Config Recorders",
        component:
          Icons.AWSServicesConfigRecorders as unknown as SvgIconComponent,
        import: "AWSServicesConfigRecorders",
      },
      {
        name: "AWS Services Config Rules",
        component: Icons.AWSServicesConfigRules as unknown as SvgIconComponent,
        import: "AWSServicesConfigRules",
      },
      {
        name: "AWS Services DB",
        component: Icons.AWSServicesDB as unknown as SvgIconComponent,
        import: "AWSServicesDB",
      },
      {
        name: "AWS Services Data Pipeline",
        component: Icons.AWSServicesDataPipeline as unknown as SvgIconComponent,
        import: "AWSServicesDataPipeline",
      },
      {
        name: "AWS Services Database Migration",
        component:
          Icons.AWSServicesDatabaseMigration as unknown as SvgIconComponent,
        import: "AWSServicesDatabaseMigration",
      },
      {
        name: "AWS Services Docker Image",
        component: Icons.AWSServicesDockerImage as unknown as SvgIconComponent,
        import: "AWSServicesDockerImage",
      },
      {
        name: "AWS Services Dynamo DB",
        component: Icons.AWSServicesDynamoDB as unknown as SvgIconComponent,
        import: "AWSServicesDynamoDB",
      },
      {
        name: "AWS Services EBS",
        component: Icons.AWSServicesEBS as unknown as SvgIconComponent,
        import: "AWSServicesEBS",
      },
      {
        name: "AWS Services EC2",
        component: Icons.AWSServicesEC2 as unknown as SvgIconComponent,
        import: "AWSServicesEC2",
      },
      {
        name: "AWS Services EC2 Snapshot",
        component: Icons.AWSServicesEC2Snapshot as unknown as SvgIconComponent,
        import: "AWSServicesEC2Snapshot",
      },
      {
        name: "AWS Services ECS Task",
        component: Icons.AWSServicesECSTask as unknown as SvgIconComponent,
        import: "AWSServicesECSTask",
      },
      {
        name: "AWS Services ECS Task Definition",
        component:
          Icons.AWSServicesECSTaskDefinition as unknown as SvgIconComponent,
        import: "AWSServicesECSTaskDefinition",
      },
      {
        name: "AWS Services EFS",
        component: Icons.AWSServicesEFS as unknown as SvgIconComponent,
        import: "AWSServicesEFS",
      },
      {
        name: "AWS Services EKS Cluster",
        component: Icons.AWSServicesEKSCluster as unknown as SvgIconComponent,
        import: "AWSServicesEKSCluster",
      },
      {
        name: "AWS Services ELB Policy",
        component: Icons.AWSServicesELBPolicy as unknown as SvgIconComponent,
        import: "AWSServicesELBPolicy",
      },
      {
        name: "AWS Services EL Bv2 Listener",
        component:
          Icons.AWSServicesELBv2Listener as unknown as SvgIconComponent,
        import: "AWSServicesELBv2Listener",
      },
      {
        name: "AWS Services EMR",
        component: Icons.AWSServicesEMR as unknown as SvgIconComponent,
        import: "AWSServicesEMR",
      },
      {
        name: "AWS Services Egress Only Interent Gateway",
        component:
          Icons.AWSServicesEgressOnlyInterentGateway as unknown as SvgIconComponent,
        import: "AWSServicesEgressOnlyInterentGateway",
      },
      {
        name: "AWS Services Elasti Cache",
        component: Icons.AWSServicesElastiCache as unknown as SvgIconComponent,
        import: "AWSServicesElastiCache",
      },
      {
        name: "AWS Services Elastic Beanstalk",
        component:
          Icons.AWSServicesElasticBeanstalk as unknown as SvgIconComponent,
        import: "AWSServicesElasticBeanstalk",
      },
      {
        name: "AWS Services Elastic Container Registry ECR",
        component:
          Icons.AWSServicesElasticContainerRegistryECR as unknown as SvgIconComponent,
        import: "AWSServicesElasticContainerRegistryECR",
      },
      {
        name: "AWS Services Elastic Container Service ECS",
        component:
          Icons.AWSServicesElasticContainerServiceECS as unknown as SvgIconComponent,
        import: "AWSServicesElasticContainerServiceECS",
      },
      {
        name: "AWS Services Elastic IP",
        component: Icons.AWSServicesElasticIP as unknown as SvgIconComponent,
        import: "AWSServicesElasticIP",
      },
      {
        name: "AWS Services Elastic IP1",
        component: Icons.AWSServicesElasticIP1 as unknown as SvgIconComponent,
        import: "AWSServicesElasticIP1",
      },
      {
        name: "AWS Services Elastic Kubernetes Service EKS",
        component:
          Icons.AWSServicesElasticKubernetesServiceEKS as unknown as SvgIconComponent,
        import: "AWSServicesElasticKubernetesServiceEKS",
      },
      {
        name: "AWS Services Elastic Load Balancing",
        component:
          Icons.AWSServicesElasticLoadBalancing as unknown as SvgIconComponent,
        import: "AWSServicesElasticLoadBalancing",
      },
      {
        name: "AWS Services Elastic Network Interface",
        component:
          Icons.AWSServicesElasticNetworkInterface as unknown as SvgIconComponent,
        import: "AWSServicesElasticNetworkInterface",
      },
      {
        name: "AWS Services Elasticsearch",
        component:
          Icons.AWSServicesElasticsearch as unknown as SvgIconComponent,
        import: "AWSServicesElasticsearch",
      },
      {
        name: "AWS Services Event Source Mapping",
        component:
          Icons.AWSServicesEventSourceMapping as unknown as SvgIconComponent,
        import: "AWSServicesEventSourceMapping",
      },
      {
        name: "AWS Services Global Accelerator",
        component:
          Icons.AWSServicesGlobalAccelerator as unknown as SvgIconComponent,
        import: "AWSServicesGlobalAccelerator",
      },
      {
        name: "AWS Services Glue",
        component: Icons.AWSServicesGlue as unknown as SvgIconComponent,
        import: "AWSServicesGlue",
      },
      {
        name: "AWS Services Group",
        component: Icons.AWSServicesGroup as unknown as SvgIconComponent,
        import: "AWSServicesGroup",
      },
      {
        name: "AWS Services Guard Duty",
        component: Icons.AWSServicesGuardDuty as unknown as SvgIconComponent,
        import: "AWSServicesGuardDuty",
      },
      {
        name: "AWS Services IAM Access Key",
        component: Icons.AWSServicesIAMAccessKey as unknown as SvgIconComponent,
        import: "AWSServicesIAMAccessKey",
      },
      {
        name: "AWS Services IAM Account",
        component: Icons.AWSServicesIAMAccount as unknown as SvgIconComponent,
        import: "AWSServicesIAMAccount",
      },
      {
        name: "AWS Services IAM Credential Report",
        component:
          Icons.AWSServicesIAMCredentialReport as unknown as SvgIconComponent,
        import: "AWSServicesIAMCredentialReport",
      },
      {
        name: "AWS Services IAM Organizational Policy",
        component:
          Icons.AWSServicesIAMOrganizationalPolicy as unknown as SvgIconComponent,
        import: "AWSServicesIAMOrganizationalPolicy",
      },
      {
        name: "AWS Services IAM Password Policy",
        component:
          Icons.AWSServicesIAMPasswordPolicy as unknown as SvgIconComponent,
        import: "AWSServicesIAMPasswordPolicy",
      },
      {
        name: "AWS Services IAM Virtual MFA Devices",
        component:
          Icons.AWSServicesIAMVirtualMFADevices as unknown as SvgIconComponent,
        import: "AWSServicesIAMVirtualMFADevices",
      },
      {
        name: "AWS Services Image",
        component: Icons.AWSServicesImage as unknown as SvgIconComponent,
        import: "AWSServicesImage",
      },
      {
        name: "AWS Services Inspector",
        component: Icons.AWSServicesInspector as unknown as SvgIconComponent,
        import: "AWSServicesInspector",
      },
      {
        name: "AWS Services Internet Gateway",
        component:
          Icons.AWSServicesInternetGateway as unknown as SvgIconComponent,
        import: "AWSServicesInternetGateway",
      },
      {
        name: "AWS Services Internet Gateway1",
        component:
          Icons.AWSServicesInternetGateway1 as unknown as SvgIconComponent,
        import: "AWSServicesInternetGateway1",
      },
      {
        name: "AWS Services KMS Key",
        component: Icons.AWSServicesKMSKey as unknown as SvgIconComponent,
        import: "AWSServicesKMSKey",
      },
      {
        name: "AWS Services Key Pairs",
        component: Icons.AWSServicesKeyPairs as unknown as SvgIconComponent,
        import: "AWSServicesKeyPairs",
      },
      {
        name: "AWS Services Kinesis",
        component: Icons.AWSServicesKinesis as unknown as SvgIconComponent,
        import: "AWSServicesKinesis",
      },
      {
        name: "AWS Services Lambda",
        component: Icons.AWSServicesLambda as unknown as SvgIconComponent,
        import: "AWSServicesLambda",
      },
      {
        name: "AWS Services Launch Template",
        component:
          Icons.AWSServicesLaunchTemplate as unknown as SvgIconComponent,
        import: "AWSServicesLaunchTemplate",
      },
      {
        name: "AWS Services MFA Device",
        component: Icons.AWSServicesMFADevice as unknown as SvgIconComponent,
        import: "AWSServicesMFADevice",
      },
      {
        name: "AWS Services Macie",
        component: Icons.AWSServicesMacie as unknown as SvgIconComponent,
        import: "AWSServicesMacie",
      },
      {
        name: "AWS Services NAT Gateway",
        component: Icons.AWSServicesNATGateway as unknown as SvgIconComponent,
        import: "AWSServicesNATGateway",
      },
      {
        name: "AWS Services NAT Gateway1",
        component: Icons.AWSServicesNATGateway1 as unknown as SvgIconComponent,
        import: "AWSServicesNATGateway1",
      },
      {
        name: "AWS Services Neptune",
        component: Icons.AWSServicesNeptune as unknown as SvgIconComponent,
        import: "AWSServicesNeptune",
      },
      {
        name: "AWS Services Network ACL",
        component: Icons.AWSServicesNetworkACL as unknown as SvgIconComponent,
        import: "AWSServicesNetworkACL",
      },
      {
        name: "AWS Services Organizational Unit",
        component:
          Icons.AWSServicesOrganizationalUnit as unknown as SvgIconComponent,
        import: "AWSServicesOrganizationalUnit",
      },
      {
        name: "AWS Services Policy",
        component: Icons.AWSServicesPolicy as unknown as SvgIconComponent,
        import: "AWSServicesPolicy",
      },
      {
        name: "AWS Services RDS",
        component: Icons.AWSServicesRDS as unknown as SvgIconComponent,
        import: "AWSServicesRDS",
      },
      {
        name: "AWS Services RDS Cluster",
        component: Icons.AWSServicesRDSCluster as unknown as SvgIconComponent,
        import: "AWSServicesRDSCluster",
      },
      {
        name: "AWS Services RDS Cluster1",
        component: Icons.AWSServicesRDSCluster1 as unknown as SvgIconComponent,
        import: "AWSServicesRDSCluster1",
      },
      {
        name: "AWS Services Redshift",
        component: Icons.AWSServicesRedshift as unknown as SvgIconComponent,
        import: "AWSServicesRedshift",
      },
      {
        name: "AWS Services Role",
        component: Icons.AWSServicesRole as unknown as SvgIconComponent,
        import: "AWSServicesRole",
      },
      {
        name: "AWS Services Route53",
        component: Icons.AWSServicesRoute53 as unknown as SvgIconComponent,
        import: "AWSServicesRoute53",
      },
      {
        name: "AWS Services Route53 Route Table",
        component:
          Icons.AWSServicesRoute53RouteTable as unknown as SvgIconComponent,
        import: "AWSServicesRoute53RouteTable",
      },
      {
        name: "AWS Services Route53 Route Table1",
        component:
          Icons.AWSServicesRoute53RouteTable1 as unknown as SvgIconComponent,
        import: "AWSServicesRoute53RouteTable1",
      },
      {
        name: "AWS Services S3 Bucket",
        component: Icons.AWSServicesS3Bucket as unknown as SvgIconComponent,
        import: "AWSServicesS3Bucket",
      },
      {
        name: "AWS Services Sage Maker",
        component: Icons.AWSServicesSageMaker as unknown as SvgIconComponent,
        import: "AWSServicesSageMaker",
      },
      {
        name: "AWS Services Sage Maker Notebook",
        component:
          Icons.AWSServicesSageMakerNotebook as unknown as SvgIconComponent,
        import: "AWSServicesSageMakerNotebook",
      },
      {
        name: "AWS Services Secrets Manager",
        component:
          Icons.AWSServicesSecretsManager as unknown as SvgIconComponent,
        import: "AWSServicesSecretsManager",
      },
      {
        name: "AWS Services Security Hub",
        component: Icons.AWSServicesSecurityHub as unknown as SvgIconComponent,
        import: "AWSServicesSecurityHub",
      },
      {
        name: "AWS Services Security Hub1",
        component: Icons.AWSServicesSecurityHub1 as unknown as SvgIconComponent,
        import: "AWSServicesSecurityHub1",
      },
      {
        name: "AWS Services Server Certificate",
        component:
          Icons.AWSServicesServerCertificate as unknown as SvgIconComponent,
        import: "AWSServicesServerCertificate",
      },
      {
        name: "AWS Services Simple Notification Service",
        component:
          Icons.AWSServicesSimpleNotificationService as unknown as SvgIconComponent,
        import: "AWSServicesSimpleNotificationService",
      },
      {
        name: "AWS Services Simple Queue Service SQS",
        component:
          Icons.AWSServicesSimpleQueueServiceSQS as unknown as SvgIconComponent,
        import: "AWSServicesSimpleQueueServiceSQS",
      },
      {
        name: "AWS Services Spot Fleet",
        component: Icons.AWSServicesSpotFleet as unknown as SvgIconComponent,
        import: "AWSServicesSpotFleet",
      },
      {
        name: "AWS Services Spot Instance",
        component: Icons.AWSServicesSpotInstance as unknown as SvgIconComponent,
        import: "AWSServicesSpotInstance",
      },
      {
        name: "AWS Services Subnet",
        component: Icons.AWSServicesSubnet as unknown as SvgIconComponent,
        import: "AWSServicesSubnet",
      },
      {
        name: "AWS Services Systems Manager",
        component:
          Icons.AWSServicesSystemsManager as unknown as SvgIconComponent,
        import: "AWSServicesSystemsManager",
      },
      {
        name: "AWS Services Systems Manager SSM",
        component:
          Icons.AWSServicesSystemsManagerSSM as unknown as SvgIconComponent,
        import: "AWSServicesSystemsManagerSSM",
      },
      {
        name: "AWS Services Target Group",
        component: Icons.AWSServicesTargetGroup as unknown as SvgIconComponent,
        import: "AWSServicesTargetGroup",
      },
      {
        name: "AWS Services Transit Gateway",
        component:
          Icons.AWSServicesTransitGateway as unknown as SvgIconComponent,
        import: "AWSServicesTransitGateway",
      },
      {
        name: "AWS Services Unknown Asset",
        component: Icons.AWSServicesUnknownAsset as unknown as SvgIconComponent,
        import: "AWSServicesUnknownAsset",
      },
      {
        name: "AWS Services User",
        component: Icons.AWSServicesUser as unknown as SvgIconComponent,
        import: "AWSServicesUser",
      },
      {
        name: "AWS Services V Elastic Container Service",
        component:
          Icons.AWSServicesVElasticContainerService as unknown as SvgIconComponent,
        import: "AWSServicesVElasticContainerService",
      },
      {
        name: "AWS Services VPC Endpoints",
        component: Icons.AWSServicesVPCEndpoints as unknown as SvgIconComponent,
        import: "AWSServicesVPCEndpoints",
      },
      {
        name: "AWS Services VPC Flow Logs",
        component: Icons.AWSServicesVPCFlowLogs as unknown as SvgIconComponent,
        import: "AWSServicesVPCFlowLogs",
      },
      {
        name: "AWS Services VPC Network Access Analyzer",
        component:
          Icons.AWSServicesVPCNetworkAccessAnalyzer as unknown as SvgIconComponent,
        import: "AWSServicesVPCNetworkAccessAnalyzer",
      },
      {
        name: "AWS Services VPC Peering Connection",
        component:
          Icons.AWSServicesVPCPeeringConnection as unknown as SvgIconComponent,
        import: "AWSServicesVPCPeeringConnection",
      },
      {
        name: "AWS Services VPCVPN Gateway",
        component:
          Icons.AWSServicesVPCVPNGateway as unknown as SvgIconComponent,
        import: "AWSServicesVPCVPNGateway",
      },
      {
        name: "AWS Services Virtual Private Cloud",
        component:
          Icons.AWSServicesVirtualPrivateCloud as unknown as SvgIconComponent,
        import: "AWSServicesVirtualPrivateCloud",
      },
      {
        name: "AWS Services WAF",
        component: Icons.AWSServicesWAF as unknown as SvgIconComponent,
        import: "AWSServicesWAF",
      },
      {
        name: "AWS Services WAF2",
        component: Icons.AWSServicesWAF2 as unknown as SvgIconComponent,
        import: "AWSServicesWAF2",
      },
    ],
  },
  {
    category: "Azure",
    icons: [
      {
        name: "AZURE Icon",
        component: Icons.AZUREIcon as unknown as SvgIconComponent,
        import: "AZUREIcon",
      },
      {
        name: "Azure Category Analytics",
        component: Icons.AzureCategoryAnalytics as unknown as SvgIconComponent,
        import: "AzureCategoryAnalytics",
      },
      {
        name: "Azure Category Azure Action Group",
        component:
          Icons.AzureCategoryAzureActionGroup as unknown as SvgIconComponent,
        import: "AzureCategoryAzureActionGroup",
      },
      {
        name: "Azure Category Compute",
        component: Icons.AzureCategoryCompute as unknown as SvgIconComponent,
        import: "AzureCategoryCompute",
      },
      {
        name: "Azure Category Containers",
        component: Icons.AzureCategoryContainers as unknown as SvgIconComponent,
        import: "AzureCategoryContainers",
      },
      {
        name: "Azure Category Database",
        component: Icons.AzureCategoryDatabase as unknown as SvgIconComponent,
        import: "AzureCategoryDatabase",
      },
      {
        name: "Azure Category Database1",
        component: Icons.AzureCategoryDatabase1 as unknown as SvgIconComponent,
        import: "AzureCategoryDatabase1",
      },
      {
        name: "Azure Category Identity Security",
        component:
          Icons.AzureCategoryIdentitySecurity as unknown as SvgIconComponent,
        import: "AzureCategoryIdentitySecurity",
      },
      {
        name: "Azure Category Machine Learning",
        component:
          Icons.AzureCategoryMachineLearning as unknown as SvgIconComponent,
        import: "AzureCategoryMachineLearning",
      },
      {
        name: "Azure Category Management Governance",
        component:
          Icons.AzureCategoryManagementGovernance as unknown as SvgIconComponent,
        import: "AzureCategoryManagementGovernance",
      },
      {
        name: "Azure Category Networking",
        component: Icons.AzureCategoryNetworking as unknown as SvgIconComponent,
        import: "AzureCategoryNetworking",
      },
      {
        name: "Azure Category None",
        component: Icons.AzureCategoryNone as unknown as SvgIconComponent,
        import: "AzureCategoryNone",
      },
      {
        name: "Azure Category Storage",
        component: Icons.AzureCategoryStorage as unknown as SvgIconComponent,
        import: "AzureCategoryStorage",
      },
      {
        name: "Azure Category Web Mobile",
        component: Icons.AzureCategoryWebMobile as unknown as SvgIconComponent,
        import: "AzureCategoryWebMobile",
      },
      {
        name: "Azure Devops",
        component: Icons.AzureDevops as unknown as SvgIconComponent,
        import: "AzureDevops",
      },
      {
        name: "Azure Group Asset",
        component: Icons.AzureGroupAsset as unknown as SvgIconComponent,
        import: "AzureGroupAsset",
      },
      {
        name: "Azure Repo Asset",
        component: Icons.AzureRepoAsset as unknown as SvgIconComponent,
        import: "AzureRepoAsset",
      },
      {
        name: "Azure Resource Manager",
        component: Icons.AzureResourceManager as unknown as SvgIconComponent,
        import: "AzureResourceManager",
      },
      {
        name: "Azure Services AD Domain",
        component: Icons.AzureServicesADDomain as unknown as SvgIconComponent,
        import: "AzureServicesADDomain",
      },
      {
        name: "Azure Services Azure AD",
        component: Icons.AzureServicesAzureAD as unknown as SvgIconComponent,
        import: "AzureServicesAzureAD",
      },
      {
        name: "Azure Services Azure AD Role",
        component:
          Icons.AzureServicesAzureADRole as unknown as SvgIconComponent,
        import: "AzureServicesAzureADRole",
      },
      {
        name: "Azure Services Azure API For FHIR",
        component:
          Icons.AzureServicesAzureAPIForFHIR as unknown as SvgIconComponent,
        import: "AzureServicesAzureAPIForFHIR",
      },
      {
        name: "Azure Services Azure Advanced Threat Protection",
        component:
          Icons.AzureServicesAzureAdvancedThreatProtection as unknown as SvgIconComponent,
        import: "AzureServicesAzureAdvancedThreatProtection",
      },
      {
        name: "Azure Services Azure Api Management",
        component:
          Icons.AzureServicesAzureApiManagement as unknown as SvgIconComponent,
        import: "AzureServicesAzureApiManagement",
      },
      {
        name: "Azure Services Azure App Configuration",
        component:
          Icons.AzureServicesAzureAppConfiguration as unknown as SvgIconComponent,
        import: "AzureServicesAzureAppConfiguration",
      },
      {
        name: "Azure Services Azure App Service",
        component:
          Icons.AzureServicesAzureAppService as unknown as SvgIconComponent,
        import: "AzureServicesAzureAppService",
      },
      {
        name: "Azure Services Azure Attestation",
        component:
          Icons.AzureServicesAzureAttestation as unknown as SvgIconComponent,
        import: "AzureServicesAzureAttestation",
      },
      {
        name: "Azure Services Azure Automation",
        component:
          Icons.AzureServicesAzureAutomation as unknown as SvgIconComponent,
        import: "AzureServicesAzureAutomation",
      },
      {
        name: "Azure Services Azure Backup",
        component:
          Icons.AzureServicesAzureBackup as unknown as SvgIconComponent,
        import: "AzureServicesAzureBackup",
      },
      {
        name: "Azure Services Azure Bot Service",
        component:
          Icons.AzureServicesAzureBotService as unknown as SvgIconComponent,
        import: "AzureServicesAzureBotService",
      },
      {
        name: "Azure Services Azure Cognitive Search",
        component:
          Icons.AzureServicesAzureCognitiveSearch as unknown as SvgIconComponent,
        import: "AzureServicesAzureCognitiveSearch",
      },
      {
        name: "Azure Services Azure Container Registry",
        component:
          Icons.AzureServicesAzureContainerRegistry as unknown as SvgIconComponent,
        import: "AzureServicesAzureContainerRegistry",
      },
      {
        name: "Azure Services Azure Cosmos DB",
        component:
          Icons.AzureServicesAzureCosmosDB as unknown as SvgIconComponent,
        import: "AzureServicesAzureCosmosDB",
      },
      {
        name: "Azure Services Azure Data Factory",
        component:
          Icons.AzureServicesAzureDataFactory as unknown as SvgIconComponent,
        import: "AzureServicesAzureDataFactory",
      },
      {
        name: "Azure Services Azure Data Lake",
        component:
          Icons.AzureServicesAzureDataLake as unknown as SvgIconComponent,
        import: "AzureServicesAzureDataLake",
      },
      {
        name: "Azure Services Azure Databricks",
        component:
          Icons.AzureServicesAzureDatabricks as unknown as SvgIconComponent,
        import: "AzureServicesAzureDatabricks",
      },
      {
        name: "Azure Services Azure Digital Twins",
        component:
          Icons.AzureServicesAzureDigitalTwins as unknown as SvgIconComponent,
        import: "AzureServicesAzureDigitalTwins",
      },
      {
        name: "Azure Services Azure Event Grid",
        component:
          Icons.AzureServicesAzureEventGrid as unknown as SvgIconComponent,
        import: "AzureServicesAzureEventGrid",
      },
      {
        name: "Azure Services Azure Event Hub",
        component:
          Icons.AzureServicesAzureEventHub as unknown as SvgIconComponent,
        import: "AzureServicesAzureEventHub",
      },
      {
        name: "Azure Services Azure Front Door",
        component:
          Icons.AzureServicesAzureFrontDoor as unknown as SvgIconComponent,
        import: "AzureServicesAzureFrontDoor",
      },
      {
        name: "Azure Services Azure HD Insight",
        component:
          Icons.AzureServicesAzureHDInsight as unknown as SvgIconComponent,
        import: "AzureServicesAzureHDInsight",
      },
      {
        name: "Azure Services Azure Identity",
        component:
          Icons.AzureServicesAzureIdentity as unknown as SvgIconComponent,
        import: "AzureServicesAzureIdentity",
      },
      {
        name: "Azure Services Azure Io T Hub",
        component:
          Icons.AzureServicesAzureIoTHub as unknown as SvgIconComponent,
        import: "AzureServicesAzureIoTHub",
      },
      {
        name: "Azure Services Azure Key Vault",
        component:
          Icons.AzureServicesAzureKeyVault as unknown as SvgIconComponent,
        import: "AzureServicesAzureKeyVault",
      },
      {
        name: "Azure Services Azure Kubernetes Service",
        component:
          Icons.AzureServicesAzureKubernetesService as unknown as SvgIconComponent,
        import: "AzureServicesAzureKubernetesService",
      },
      {
        name: "Azure Services Azure Machine Learning",
        component:
          Icons.AzureServicesAzureMachineLearning as unknown as SvgIconComponent,
        import: "AzureServicesAzureMachineLearning",
      },
      {
        name: "Azure Services Azure Monitor",
        component:
          Icons.AzureServicesAzureMonitor as unknown as SvgIconComponent,
        import: "AzureServicesAzureMonitor",
      },
      {
        name: "Azure Services Azure Postgre SQL",
        component:
          Icons.AzureServicesAzurePostgreSQL as unknown as SvgIconComponent,
        import: "AzureServicesAzurePostgreSQL",
      },
      {
        name: "Azure Services Azure SQL",
        component: Icons.AzureServicesAzureSQL as unknown as SvgIconComponent,
        import: "AzureServicesAzureSQL",
      },
      {
        name: "Azure Services Azure Security Center",
        component:
          Icons.AzureServicesAzureSecurityCenter as unknown as SvgIconComponent,
        import: "AzureServicesAzureSecurityCenter",
      },
      {
        name: "Azure Services Azure Service Bus",
        component:
          Icons.AzureServicesAzureServiceBus as unknown as SvgIconComponent,
        import: "AzureServicesAzureServiceBus",
      },
      {
        name: "Azure Services Azure Signal R",
        component:
          Icons.AzureServicesAzureSignalR as unknown as SvgIconComponent,
        import: "AzureServicesAzureSignalR",
      },
      {
        name: "Azure Services Azure Stack",
        component: Icons.AzureServicesAzureStack as unknown as SvgIconComponent,
        import: "AzureServicesAzureStack",
      },
      {
        name: "Azure Services Azure Storage",
        component:
          Icons.AzureServicesAzureStorage as unknown as SvgIconComponent,
        import: "AzureServicesAzureStorage",
      },
      {
        name: "Azure Services Azure Traffic Manager",
        component:
          Icons.AzureServicesAzureTrafficManager as unknown as SvgIconComponent,
        import: "AzureServicesAzureTrafficManager",
      },
      {
        name: "Azure Services Azure Web Apps",
        component:
          Icons.AzureServicesAzureWebApps as unknown as SvgIconComponent,
        import: "AzureServicesAzureWebApps",
      },
      {
        name: "Azure Services CDN Profile",
        component: Icons.AzureServicesCDNProfile as unknown as SvgIconComponent,
        import: "AzureServicesCDNProfile",
      },
      {
        name: "Azure Services Container Instances",
        component:
          Icons.AzureServicesContainerInstances as unknown as SvgIconComponent,
        import: "AzureServicesContainerInstances",
      },
      {
        name: "Azure Services Database Account",
        component:
          Icons.AzureServicesDatabaseAccount as unknown as SvgIconComponent,
        import: "AzureServicesDatabaseAccount",
      },
      {
        name: "Azure Services Defender",
        component: Icons.AzureServicesDefender as unknown as SvgIconComponent,
        import: "AzureServicesDefender",
      },
      {
        name: "Azure Services Disks",
        component: Icons.AzureServicesDisks as unknown as SvgIconComponent,
        import: "AzureServicesDisks",
      },
      {
        name: "Azure Services Docker Image",
        component:
          Icons.AzureServicesDockerImage as unknown as SvgIconComponent,
        import: "AzureServicesDockerImage",
      },
      {
        name: "Azure Services Grafana",
        component: Icons.AzureServicesGrafana as unknown as SvgIconComponent,
        import: "AzureServicesGrafana",
      },
      {
        name: "Azure Services Group",
        component: Icons.AzureServicesGroup as unknown as SvgIconComponent,
        import: "AzureServicesGroup",
      },
      {
        name: "Azure Services Load Balancers",
        component:
          Icons.AzureServicesLoadBalancers as unknown as SvgIconComponent,
        import: "AzureServicesLoadBalancers",
      },
      {
        name: "Azure Services Logic Apps",
        component: Icons.AzureServicesLogicApps as unknown as SvgIconComponent,
        import: "AzureServicesLogicApps",
      },
      {
        name: "Azure Services Machine Learning",
        component:
          Icons.AzureServicesMachineLearning as unknown as SvgIconComponent,
        import: "AzureServicesMachineLearning",
      },
      {
        name: "Azure Services Microsoft Azure Fluid Relay",
        component:
          Icons.AzureServicesMicrosoftAzureFluidRelay as unknown as SvgIconComponent,
        import: "AzureServicesMicrosoftAzureFluidRelay",
      },
      {
        name: "Azure Services My SQL",
        component: Icons.AzureServicesMySQL as unknown as SvgIconComponent,
        import: "AzureServicesMySQL",
      },
      {
        name: "Azure Services Network Interfaces",
        component:
          Icons.AzureServicesNetworkInterfaces as unknown as SvgIconComponent,
        import: "AzureServicesNetworkInterfaces",
      },
      {
        name: "Azure Services Network Policy",
        component:
          Icons.AzureServicesNetworkPolicy as unknown as SvgIconComponent,
        import: "AzureServicesNetworkPolicy",
      },
      {
        name: "Azure Services Network Security Groups",
        component:
          Icons.AzureServicesNetworkSecurityGroups as unknown as SvgIconComponent,
        import: "AzureServicesNetworkSecurityGroups",
      },
      {
        name: "Azure Services Power BI",
        component: Icons.AzureServicesPowerBI as unknown as SvgIconComponent,
        import: "AzureServicesPowerBI",
      },
      {
        name: "Azure Services Public IP",
        component: Icons.AzureServicesPublicIP as unknown as SvgIconComponent,
        import: "AzureServicesPublicIP",
      },
      {
        name: "Azure Services Resource Group",
        component:
          Icons.AzureServicesResourceGroup as unknown as SvgIconComponent,
        import: "AzureServicesResourceGroup",
      },
      {
        name: "Azure Services Resources",
        component: Icons.AzureServicesResources as unknown as SvgIconComponent,
        import: "AzureServicesResources",
      },
      {
        name: "Azure Services Role Assignment",
        component:
          Icons.AzureServicesRoleAssignment as unknown as SvgIconComponent,
        import: "AzureServicesRoleAssignment",
      },
      {
        name: "Azure Services SQL Database",
        component:
          Icons.AzureServicesSQLDatabase as unknown as SvgIconComponent,
        import: "AzureServicesSQLDatabase",
      },
      {
        name: "Azure Services SSH Keys",
        component: Icons.AzureServicesSSHKeys as unknown as SvgIconComponent,
        import: "AzureServicesSSHKeys",
      },
      {
        name: "Azure Services Security Center",
        component:
          Icons.AzureServicesSecurityCenter as unknown as SvgIconComponent,
        import: "AzureServicesSecurityCenter",
      },
      {
        name: "Azure Services Service Fabric",
        component:
          Icons.AzureServicesServiceFabric as unknown as SvgIconComponent,
        import: "AzureServicesServiceFabric",
      },
      {
        name: "Azure Services Service Principal",
        component:
          Icons.AzureServicesServicePrincipal as unknown as SvgIconComponent,
        import: "AzureServicesServicePrincipal",
      },
      {
        name: "Azure Services Services",
        component: Icons.AzureServicesServices as unknown as SvgIconComponent,
        import: "AzureServicesServices",
      },
      {
        name: "Azure Services Storage Sync Services",
        component:
          Icons.AzureServicesStorageSyncServices as unknown as SvgIconComponent,
        import: "AzureServicesStorageSyncServices",
      },
      {
        name: "Azure Services Subscriptions",
        component:
          Icons.AzureServicesSubscriptions as unknown as SvgIconComponent,
        import: "AzureServicesSubscriptions",
      },
      {
        name: "Azure Services Unknown",
        component: Icons.AzureServicesUnknown as unknown as SvgIconComponent,
        import: "AzureServicesUnknown",
      },
      {
        name: "Azure Services Virtual Machine",
        component:
          Icons.AzureServicesVirtualMachine as unknown as SvgIconComponent,
        import: "AzureServicesVirtualMachine",
      },
    ],
  },
  {
    category: "GCP",
    icons: [
      {
        name: "GCP Category Analytics",
        component: Icons.GCPCategoryAnalytics as unknown as SvgIconComponent,
        import: "GCPCategoryAnalytics",
      },
      {
        name: "GCP Category Compute",
        component: Icons.GCPCategoryCompute as unknown as SvgIconComponent,
        import: "GCPCategoryCompute",
      },
      {
        name: "GCP Category Containers",
        component: Icons.GCPCategoryContainers as unknown as SvgIconComponent,
        import: "GCPCategoryContainers",
      },
      {
        name: "GCP Category Containers1",
        component: Icons.GCPCategoryContainers1 as unknown as SvgIconComponent,
        import: "GCPCategoryContainers1",
      },
      {
        name: "GCP Category Identity Security",
        component:
          Icons.GCPCategoryIdentitySecurity as unknown as SvgIconComponent,
        import: "GCPCategoryIdentitySecurity",
      },
      {
        name: "GCP Category Identity Security1",
        component:
          Icons.GCPCategoryIdentitySecurity1 as unknown as SvgIconComponent,
        import: "GCPCategoryIdentitySecurity1",
      },
      {
        name: "GCP Category Machine Learning",
        component:
          Icons.GCPCategoryMachineLearning as unknown as SvgIconComponent,
        import: "GCPCategoryMachineLearning",
      },
      {
        name: "GCP Category Management Governance",
        component:
          Icons.GCPCategoryManagementGovernance as unknown as SvgIconComponent,
        import: "GCPCategoryManagementGovernance",
      },
      {
        name: "GCP Category Memory Store",
        component: Icons.GCPCategoryMemoryStore as unknown as SvgIconComponent,
        import: "GCPCategoryMemoryStore",
      },
      {
        name: "GCP Category Networking",
        component: Icons.GCPCategoryNetworking as unknown as SvgIconComponent,
        import: "GCPCategoryNetworking",
      },
      {
        name: "GCP Category None",
        component: Icons.GCPCategoryNone as unknown as SvgIconComponent,
        import: "GCPCategoryNone",
      },
      {
        name: "GCP Category Storage",
        component: Icons.GCPCategoryStorage as unknown as SvgIconComponent,
        import: "GCPCategoryStorage",
      },
      {
        name: "GCP Category Undefined",
        component: Icons.GCPCategoryUndefined as unknown as SvgIconComponent,
        import: "GCPCategoryUndefined",
      },
      {
        name: "GCP Category Web Mobile",
        component: Icons.GCPCategoryWebMobile as unknown as SvgIconComponent,
        import: "GCPCategoryWebMobile",
      },
      {
        name: "GCP Icon",
        component: Icons.GCPIcon as unknown as SvgIconComponent,
        import: "GCPIcon",
      },
      {
        name: "GCP Services Apigee API Platform",
        component:
          Icons.GCPServicesApigeeAPIPlatform as unknown as SvgIconComponent,
        import: "GCPServicesApigeeAPIPlatform",
      },
      {
        name: "GCP Services App Engine",
        component: Icons.GCPServicesAppEngine as unknown as SvgIconComponent,
        import: "GCPServicesAppEngine",
      },
      {
        name: "GCP Services Bigquery",
        component: Icons.GCPServicesBigquery as unknown as SvgIconComponent,
        import: "GCPServicesBigquery",
      },
      {
        name: "GCP Services Bigtable",
        component: Icons.GCPServicesBigtable as unknown as SvgIconComponent,
        import: "GCPServicesBigtable",
      },
      {
        name: "GCP Services Cloud API Gateway",
        component:
          Icons.GCPServicesCloudAPIGateway as unknown as SvgIconComponent,
        import: "GCPServicesCloudAPIGateway",
      },
      {
        name: "GCP Services Cloud Build",
        component: Icons.GCPServicesCloudBuild as unknown as SvgIconComponent,
        import: "GCPServicesCloudBuild",
      },
      {
        name: "GCP Services Cloud CDN",
        component: Icons.GCPServicesCloudCDN as unknown as SvgIconComponent,
        import: "GCPServicesCloudCDN",
      },
      {
        name: "GCP Services Cloud DNS",
        component: Icons.GCPServicesCloudDNS as unknown as SvgIconComponent,
        import: "GCPServicesCloudDNS",
      },
      {
        name: "GCP Services Cloud Load Balancing",
        component:
          Icons.GCPServicesCloudLoadBalancing as unknown as SvgIconComponent,
        import: "GCPServicesCloudLoadBalancing",
      },
      {
        name: "GCP Services Cloud Logging",
        component: Icons.GCPServicesCloudLogging as unknown as SvgIconComponent,
        import: "GCPServicesCloudLogging",
      },
      {
        name: "GCP Services Cloud Monitoring",
        component:
          Icons.GCPServicesCloudMonitoring as unknown as SvgIconComponent,
        import: "GCPServicesCloudMonitoring",
      },
      {
        name: "GCP Services Cloud Run",
        component: Icons.GCPServicesCloudRun as unknown as SvgIconComponent,
        import: "GCPServicesCloudRun",
      },
      {
        name: "GCP Services Cloud Sql",
        component: Icons.GCPServicesCloudSql as unknown as SvgIconComponent,
        import: "GCPServicesCloudSql",
      },
      {
        name: "GCP Services Cloud Storage",
        component: Icons.GCPServicesCloudStorage as unknown as SvgIconComponent,
        import: "GCPServicesCloudStorage",
      },
      {
        name: "GCP Services Cloud Storage2",
        component:
          Icons.GCPServicesCloudStorage2 as unknown as SvgIconComponent,
        import: "GCPServicesCloudStorage2",
      },
      {
        name: "GCP Services Compute Engine",
        component:
          Icons.GCPServicesComputeEngine as unknown as SvgIconComponent,
        import: "GCPServicesComputeEngine",
      },
      {
        name: "GCP Services Compute Image",
        component: Icons.GCPServicesComputeImage as unknown as SvgIconComponent,
        import: "GCPServicesComputeImage",
      },
      {
        name: "GCP Services Container Registry",
        component:
          Icons.GCPServicesContainerRegistry as unknown as SvgIconComponent,
        import: "GCPServicesContainerRegistry",
      },
      {
        name: "GCP Services Dataflow",
        component: Icons.GCPServicesDataflow as unknown as SvgIconComponent,
        import: "GCPServicesDataflow",
      },
      {
        name: "GCP Services Dataproc",
        component: Icons.GCPServicesDataproc as unknown as SvgIconComponent,
        import: "GCPServicesDataproc",
      },
      {
        name: "GCP Services Disks",
        component: Icons.GCPServicesDisks as unknown as SvgIconComponent,
        import: "GCPServicesDisks",
      },
      {
        name: "GCP Services Docker Image",
        component: Icons.GCPServicesDockerImage as unknown as SvgIconComponent,
        import: "GCPServicesDockerImage",
      },
      {
        name: "GCP Services Filestore",
        component: Icons.GCPServicesFilestore as unknown as SvgIconComponent,
        import: "GCPServicesFilestore",
      },
      {
        name: "GCP Services Firestore",
        component: Icons.GCPServicesFirestore as unknown as SvgIconComponent,
        import: "GCPServicesFirestore",
      },
      {
        name: "GCP Services GKE",
        component: Icons.GCPServicesGKE as unknown as SvgIconComponent,
        import: "GCPServicesGKE",
      },
      {
        name: "GCP Services GKE Node Pool",
        component: Icons.GCPServicesGKENodePool as unknown as SvgIconComponent,
        import: "GCPServicesGKENodePool",
      },
      {
        name: "GCP Services IAM Principal",
        component: Icons.GCPServicesIAMPrincipal as unknown as SvgIconComponent,
        import: "GCPServicesIAMPrincipal",
      },
      {
        name: "GCP Services IAM Roles",
        component: Icons.GCPServicesIAMRoles as unknown as SvgIconComponent,
        import: "GCPServicesIAMRoles",
      },
      {
        name: "GCP Services Identity And Access Management",
        component:
          Icons.GCPServicesIdentityAndAccessManagement as unknown as SvgIconComponent,
        import: "GCPServicesIdentityAndAccessManagement",
      },
      {
        name: "GCP Services Instance Group",
        component:
          Icons.GCPServicesInstanceGroup as unknown as SvgIconComponent,
        import: "GCPServicesInstanceGroup",
      },
      {
        name: "GCP Services KMS Key",
        component: Icons.GCPServicesKMSKey as unknown as SvgIconComponent,
        import: "GCPServicesKMSKey",
      },
      {
        name: "GCP Services Load Balancer",
        component: Icons.GCPServicesLoadBalancer as unknown as SvgIconComponent,
        import: "GCPServicesLoadBalancer",
      },
      {
        name: "GCP Services Local SSD",
        component: Icons.GCPServicesLocalSSD as unknown as SvgIconComponent,
        import: "GCPServicesLocalSSD",
      },
      {
        name: "GCP Services Managed Instance Group",
        component:
          Icons.GCPServicesManagedInstanceGroup as unknown as SvgIconComponent,
        import: "GCPServicesManagedInstanceGroup",
      },
      {
        name: "GCP Services Network Endpoint Group",
        component:
          Icons.GCPServicesNetworkEndpointGroup as unknown as SvgIconComponent,
        import: "GCPServicesNetworkEndpointGroup",
      },
      {
        name: "GCP Services Network Firewall",
        component:
          Icons.GCPServicesNetworkFirewall as unknown as SvgIconComponent,
        import: "GCPServicesNetworkFirewall",
      },
      {
        name: "GCP Services Project",
        component: Icons.GCPServicesProject as unknown as SvgIconComponent,
        import: "GCPServicesProject",
      },
      {
        name: "GCP Services Pubsub",
        component: Icons.GCPServicesPubsub as unknown as SvgIconComponent,
        import: "GCPServicesPubsub",
      },
      {
        name: "GCP Services SQL Database",
        component: Icons.GCPServicesSQLDatabase as unknown as SvgIconComponent,
        import: "GCPServicesSQLDatabase",
      },
      {
        name: "GCP Services Secret Manager",
        component:
          Icons.GCPServicesSecretManager as unknown as SvgIconComponent,
        import: "GCPServicesSecretManager",
      },
      {
        name: "GCP Services Security Center",
        component:
          Icons.GCPServicesSecurityCenter as unknown as SvgIconComponent,
        import: "GCPServicesSecurityCenter",
      },
      {
        name: "GCP Services Service Account",
        component:
          Icons.GCPServicesServiceAccount as unknown as SvgIconComponent,
        import: "GCPServicesServiceAccount",
      },
      {
        name: "GCP Services Storage Bucket",
        component:
          Icons.GCPServicesStorageBucket as unknown as SvgIconComponent,
        import: "GCPServicesStorageBucket",
      },
      {
        name: "GCP Services Target Instance",
        component:
          Icons.GCPServicesTargetInstance as unknown as SvgIconComponent,
        import: "GCPServicesTargetInstance",
      },
      {
        name: "GCP Services Target Pool",
        component: Icons.GCPServicesTargetPool as unknown as SvgIconComponent,
        import: "GCPServicesTargetPool",
      },
      {
        name: "GCP Services Target Pool1",
        component: Icons.GCPServicesTargetPool1 as unknown as SvgIconComponent,
        import: "GCPServicesTargetPool1",
      },
      {
        name: "GCP Services Unknown",
        component: Icons.GCPServicesUnknown as unknown as SvgIconComponent,
        import: "GCPServicesUnknown",
      },
      {
        name: "GCP Services Vault",
        component: Icons.GCPServicesVault as unknown as SvgIconComponent,
        import: "GCPServicesVault",
      },
      {
        name: "GCP Services Vertex AI",
        component: Icons.GCPServicesVertexAI as unknown as SvgIconComponent,
        import: "GCPServicesVertexAI",
      },
      {
        name: "GCP Services Virtual Private Cloud",
        component:
          Icons.GCPServicesVirtualPrivateCloud as unknown as SvgIconComponent,
        import: "GCPServicesVirtualPrivateCloud",
      },
      {
        name: "GCP Services Virtual Private Cloud1",
        component:
          Icons.GCPServicesVirtualPrivateCloud1 as unknown as SvgIconComponent,
        import: "GCPServicesVirtualPrivateCloud1",
      },
    ],
  },
  {
    category: "Kubernetes",
    icons: [
      {
        name: "KUBE Icon",
        component: Icons.KUBEIcon as unknown as SvgIconComponent,
        import: "KUBEIcon",
      },
      {
        name: "Kubernetes",
        component: Icons.Kubernetes as unknown as SvgIconComponent,
        import: "Kubernetes",
      },
      {
        name: "Kubernetes Category Compute",
        component:
          Icons.KubernetesCategoryCompute as unknown as SvgIconComponent,
        import: "KubernetesCategoryCompute",
      },
      {
        name: "Kubernetes Category Identity Security",
        component:
          Icons.KubernetesCategoryIdentitySecurity as unknown as SvgIconComponent,
        import: "KubernetesCategoryIdentitySecurity",
      },
      {
        name: "Kubernetes Category Management Governance",
        component:
          Icons.KubernetesCategoryManagementGovernance as unknown as SvgIconComponent,
        import: "KubernetesCategoryManagementGovernance",
      },
      {
        name: "Kubernetes Category Networking",
        component:
          Icons.KubernetesCategoryNetworking as unknown as SvgIconComponent,
        import: "KubernetesCategoryNetworking",
      },
      {
        name: "Kubernetes Category None",
        component: Icons.KubernetesCategoryNone as unknown as SvgIconComponent,
        import: "KubernetesCategoryNone",
      },
      {
        name: "Kubernetes Category Storage",
        component:
          Icons.KubernetesCategoryStorage as unknown as SvgIconComponent,
        import: "KubernetesCategoryStorage",
      },
      {
        name: "Kubernetes Icon",
        component: Icons.KubernetesIcon as unknown as SvgIconComponent,
        import: "KubernetesIcon",
      },
      {
        name: "Kubernetes Services Cluster",
        component:
          Icons.KubernetesServicesCluster as unknown as SvgIconComponent,
        import: "KubernetesServicesCluster",
      },
      {
        name: "Kubernetes Services Cluster Role",
        component:
          Icons.KubernetesServicesClusterRole as unknown as SvgIconComponent,
        import: "KubernetesServicesClusterRole",
      },
      {
        name: "Kubernetes Services Cluster Role Binding",
        component:
          Icons.KubernetesServicesClusterRoleBinding as unknown as SvgIconComponent,
        import: "KubernetesServicesClusterRoleBinding",
      },
      {
        name: "Kubernetes Services Config Map",
        component:
          Icons.KubernetesServicesConfigMap as unknown as SvgIconComponent,
        import: "KubernetesServicesConfigMap",
      },
      {
        name: "Kubernetes Services Daemon Set",
        component:
          Icons.KubernetesServicesDaemonSet as unknown as SvgIconComponent,
        import: "KubernetesServicesDaemonSet",
      },
      {
        name: "Kubernetes Services Deployment",
        component:
          Icons.KubernetesServicesDeployment as unknown as SvgIconComponent,
        import: "KubernetesServicesDeployment",
      },
      {
        name: "Kubernetes Services Docker Image",
        component:
          Icons.KubernetesServicesDockerImage as unknown as SvgIconComponent,
        import: "KubernetesServicesDockerImage",
      },
      {
        name: "Kubernetes Services Endpoint",
        component:
          Icons.KubernetesServicesEndpoint as unknown as SvgIconComponent,
        import: "KubernetesServicesEndpoint",
      },
      {
        name: "Kubernetes Services K8 Service",
        component:
          Icons.KubernetesServicesK8Service as unknown as SvgIconComponent,
        import: "KubernetesServicesK8Service",
      },
      {
        name: "Kubernetes Services Namespace",
        component:
          Icons.KubernetesServicesNamespace as unknown as SvgIconComponent,
        import: "KubernetesServicesNamespace",
      },
      {
        name: "Kubernetes Services Network Policy",
        component:
          Icons.KubernetesServicesNetworkPolicy as unknown as SvgIconComponent,
        import: "KubernetesServicesNetworkPolicy",
      },
      {
        name: "Kubernetes Services Node",
        component: Icons.KubernetesServicesNode as unknown as SvgIconComponent,
        import: "KubernetesServicesNode",
      },
      {
        name: "Kubernetes Services Pod",
        component: Icons.KubernetesServicesPod as unknown as SvgIconComponent,
        import: "KubernetesServicesPod",
      },
      {
        name: "Kubernetes Services Replica Set",
        component:
          Icons.KubernetesServicesReplicaSet as unknown as SvgIconComponent,
        import: "KubernetesServicesReplicaSet",
      },
      {
        name: "Kubernetes Services Role",
        component: Icons.KubernetesServicesRole as unknown as SvgIconComponent,
        import: "KubernetesServicesRole",
      },
      {
        name: "Kubernetes Services Role Binding",
        component:
          Icons.KubernetesServicesRoleBinding as unknown as SvgIconComponent,
        import: "KubernetesServicesRoleBinding",
      },
      {
        name: "Kubernetes Services Service Account",
        component:
          Icons.KubernetesServicesServiceAccount as unknown as SvgIconComponent,
        import: "KubernetesServicesServiceAccount",
      },
      {
        name: "Kubernetes Services Stateful Set",
        component:
          Icons.KubernetesServicesStatefulSet as unknown as SvgIconComponent,
        import: "KubernetesServicesStatefulSet",
      },
      {
        name: "Kubernetes Services Unknown",
        component:
          Icons.KubernetesServicesUnknown as unknown as SvgIconComponent,
        import: "KubernetesServicesUnknown",
      },
    ],
  },
  {
    category: "Oracle",
    icons: [
      {
        name: "OCI Icon",
        component: Icons.OCIIcon as unknown as SvgIconComponent,
        import: "OCIIcon",
      },
      {
        name: "Oracle Category Compute",
        component: Icons.OracleCategoryCompute as unknown as SvgIconComponent,
        import: "OracleCategoryCompute",
      },
      {
        name: "Oracle Category Developer Services",
        component:
          Icons.OracleCategoryDeveloperServices as unknown as SvgIconComponent,
        import: "OracleCategoryDeveloperServices",
      },
      {
        name: "Oracle Category Identity Security",
        component:
          Icons.OracleCategoryIdentitySecurity as unknown as SvgIconComponent,
        import: "OracleCategoryIdentitySecurity",
      },
      {
        name: "Oracle Category Networking",
        component:
          Icons.OracleCategoryNetworking as unknown as SvgIconComponent,
        import: "OracleCategoryNetworking",
      },
      {
        name: "Oracle Category None",
        component: Icons.OracleCategoryNone as unknown as SvgIconComponent,
        import: "OracleCategoryNone",
      },
      {
        name: "Oracle Category Storage",
        component: Icons.OracleCategoryStorage as unknown as SvgIconComponent,
        import: "OracleCategoryStorage",
      },
      {
        name: "Oracle Icon",
        component: Icons.OracleIcon as unknown as SvgIconComponent,
        import: "OracleIcon",
      },
      {
        name: "Oracle Services Compartment",
        component:
          Icons.OracleServicesCompartment as unknown as SvgIconComponent,
        import: "OracleServicesCompartment",
      },
      {
        name: "Oracle Services Dynamic Groups",
        component:
          Icons.OracleServicesDynamicGroups as unknown as SvgIconComponent,
        import: "OracleServicesDynamicGroups",
      },
      {
        name: "Oracle Services Group",
        component: Icons.OracleServicesGroup as unknown as SvgIconComponent,
        import: "OracleServicesGroup",
      },
      {
        name: "Oracle Services Identity Domain",
        component:
          Icons.OracleServicesIdentityDomain as unknown as SvgIconComponent,
        import: "OracleServicesIdentityDomain",
      },
      {
        name: "Oracle Services Internet Gateway",
        component:
          Icons.OracleServicesInternetGateway as unknown as SvgIconComponent,
        import: "OracleServicesInternetGateway",
      },
      {
        name: "Oracle Services Network Load Balancer",
        component:
          Icons.OracleServicesNetworkLoadBalancer as unknown as SvgIconComponent,
        import: "OracleServicesNetworkLoadBalancer",
      },
      {
        name: "Oracle Services Network Security Group",
        component:
          Icons.OracleServicesNetworkSecurityGroup as unknown as SvgIconComponent,
        import: "OracleServicesNetworkSecurityGroup",
      },
      {
        name: "Oracle Services Object Storage",
        component:
          Icons.OracleServicesObjectStorage as unknown as SvgIconComponent,
        import: "OracleServicesObjectStorage",
      },
      {
        name: "Oracle Services Oracle Instance",
        component:
          Icons.OracleServicesOracleInstance as unknown as SvgIconComponent,
        import: "OracleServicesOracleInstance",
      },
      {
        name: "Oracle Services Policy",
        component: Icons.OracleServicesPolicy as unknown as SvgIconComponent,
        import: "OracleServicesPolicy",
      },
      {
        name: "Oracle Services Public IP",
        component: Icons.OracleServicesPublicIP as unknown as SvgIconComponent,
        import: "OracleServicesPublicIP",
      },
      {
        name: "Oracle Services Security Lists",
        component:
          Icons.OracleServicesSecurityLists as unknown as SvgIconComponent,
        import: "OracleServicesSecurityLists",
      },
      {
        name: "Oracle Services Subnet",
        component: Icons.OracleServicesSubnet as unknown as SvgIconComponent,
        import: "OracleServicesSubnet",
      },
      {
        name: "Oracle Services User",
        component: Icons.OracleServicesUser as unknown as SvgIconComponent,
        import: "OracleServicesUser",
      },
      {
        name: "Oracle Services Virtual Network",
        component:
          Icons.OracleServicesVirtualNetwork as unknown as SvgIconComponent,
        import: "OracleServicesVirtualNetwork",
      },
    ],
  },
];

function IconsSection() {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const muiIconNames = new Set(
    ICON_CATALOGUE.filter((c) =>
      [
        "Navigation",
        "Actions",
        "Status & Feedback",
        "Data & Files",
        "Communication",
        "UI & Layout",
      ].includes(c.category),
    ).flatMap((c) => c.icons.map((i) => i.import)),
  );

  const handleCopy = (importName: string) => {
    const importLine = muiIconNames.has(importName)
      ? `import ${importName} from "@mui/icons-material/${importName.replace(/Icon$/, "")}";`
      : `import { ${importName} } from "@open-ui-kit/core";`;
    navigator.clipboard.writeText(importLine).catch(() => {});
    setCopiedName(importName);
    setTimeout(() => setCopiedName(null), 1800);
  };

  const filtered = search.trim().toLowerCase();
  const matchesSearch = (name: string) =>
    !filtered || name.toLowerCase().includes(filtered);

  return (
    <Box>
      {/* Description row */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: "action.hover",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.85, mb: 0.5 }}>
          Icons come from{" "}
          <Box
            component="code"
            sx={{
              fontSize: "0.8em",
              px: 0.5,
              bgcolor: "action.selected",
              borderRadius: 0.5,
            }}
          >
            @mui/icons-material
          </Box>{" "}
          and{" "}
          <Box
            component="code"
            sx={{
              fontSize: "0.8em",
              px: 0.5,
              bgcolor: "action.selected",
              borderRadius: 0.5,
            }}
          >
            @open-ui-kit/core
          </Box>
          . Click any icon to copy its import statement. Use them directly in
          Button{" "}
          <Box
            component="code"
            sx={{
              fontSize: "0.8em",
              px: 0.5,
              bgcolor: "action.selected",
              borderRadius: 0.5,
            }}
          >
            startIcon
          </Box>{" "}
          /{" "}
          <Box
            component="code"
            sx={{
              fontSize: "0.8em",
              px: 0.5,
              bgcolor: "action.selected",
              borderRadius: 0.5,
            }}
          >
            endIcon
          </Box>
          , IconButton, or as standalone{" "}
          <Box
            component="code"
            sx={{
              fontSize: "0.8em",
              px: 0.5,
              bgcolor: "action.selected",
              borderRadius: 0.5,
            }}
          >
            SvgIcon
          </Box>
          .
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3, maxWidth: 360 }}>
        <Box
          component="input"
          placeholder="Search icons…"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          sx={{
            width: "100%",
            px: 2,
            py: 1.1,
            borderRadius: 2,
            border: "1.5px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            color: "text.primary",
            fontSize: "0.875rem",
            outline: "none",
            transition: "border-color 0.15s",
            "&:focus": { borderColor: "primary.main" },
          }}
        />
      </Box>

      {/* Icon grid by category */}
      {ICON_CATALOGUE.map(({ category, icons }) => {
        const visible = icons.filter(({ name }) => matchesSearch(name));
        if (!visible.length) return null;
        return (
          <ComponentGroup key={category} label={category}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                gap: 1.5,
              }}
            >
              {visible.map(
                ({ name, component: IconComp, import: importName }) => {
                  const isCopied = copiedName === importName;
                  return (
                    <Tooltip
                      key={name}
                      title={
                        isCopied
                          ? "Copied!"
                          : `import ${importName} from "@mui/icons-material/${importName.replace(/Icon$/, "")}"`
                      }
                      placement="top"
                      arrow
                    >
                      <Box
                        component="button"
                        onClick={() => handleCopy(importName)}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.75,
                          p: 1.5,
                          border: "1.5px solid",
                          borderColor: isCopied ? "primary.main" : "divider",
                          borderRadius: 2,
                          bgcolor: isCopied
                            ? "action.selected"
                            : "background.paper",
                          cursor: "pointer",
                          outline: "none",
                          transition: "all 0.15s",
                          "&:hover": {
                            borderColor: "primary.main",
                            bgcolor: "action.hover",
                            transform: "translateY(-1px)",
                            boxShadow: `0 4px 12px ${theme.palette.primary.main}22`,
                          },
                        }}
                      >
                        {isCopied ? (
                          <CheckCircleIcon
                            sx={{ fontSize: 28, color: "primary.main" }}
                          />
                        ) : (
                          <IconComp
                            sx={{
                              fontSize: 28,
                              color: "text.primary",
                              opacity: 0.8,
                            }}
                          />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "0.62rem",
                            color: isCopied ? "primary.main" : "text.secondary",
                            textAlign: "center",
                            lineHeight: 1.25,
                            wordBreak: "break-word",
                            fontWeight: isCopied ? 600 : 400,
                          }}
                        >
                          {isCopied ? "Copied!" : name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  );
                },
              )}
            </Box>
          </ComponentGroup>
        );
      })}

      {filtered &&
        ICON_CATALOGUE.every(({ icons }) =>
          icons.every(({ name }) => !name.toLowerCase().includes(filtered)),
        ) && (
          <Box sx={{ textAlign: "center", py: 8, opacity: 0.5 }}>
            <Typography variant="body2">
              No icons matching "{search}". Try a different keyword.
            </Typography>
          </Box>
        )}
    </Box>
  );
}

// ─── Category renderer ────────────────────────────────────────────────────────

const SECTION_META: Record<
  string,
  { title: string; description: string; Component: React.FC; wide?: boolean }
> = {
  buttons: {
    title: "Buttons & Actions",
    description:
      "Interactive controls for triggering actions. All variants, sizes, colors, and specialized button types.",
    Component: ButtonsSection,
  },
  forms: {
    title: "Form Controls",
    description:
      "Input components for collecting user data — switches, checkboxes, sliders, selects, and text fields.",
    Component: FormsSection,
  },
  data: {
    title: "Data Display",
    description:
      "Components for presenting information: typography, badges, severity indicators, tags, and avatars.",
    Component: DataDisplaySection,
  },
  navigation: {
    title: "Navigation",
    description:
      "Components that help users move through the interface: tabs, breadcrumbs, pagination, and links.",
    Component: NavigationSection,
  },
  feedback: {
    title: "Feedback & Status",
    description:
      "Loading states, alerts, notifications, and collapsible content to communicate system status.",
    Component: FeedbackSection,
  },
  layout: {
    title: "Layout & Structure",
    description: "Structural components for organizing content on the page.",
    Component: LayoutSection,
  },
  charts: {
    title: "Charts",
    description:
      "Data visualization components built on Recharts. All charts adapt to the active theme.",
    Component: ChartsSection,
  },
  icons: {
    title: "Icons",
    description:
      "Material UI icon library — 100+ icons organized by category. Click any icon to copy its import statement. All icons support size and color props and can be used in buttons, navigation, and any component with an icon slot.",
    Component: IconsSection,
    wide: true,
  },
  dashboard: {
    title: "Dashboard Template",
    description:
      "Security operations dashboard — action cards, activity timeline, status gauge, and risk trends. Fully theme-aware.",
    Component: DashboardSection,
    wide: true,
  },
  color: {
    title: "Color Tokens",
    description:
      "Semantic color tokens — base, brand, control, interactive, status, and accent colors for both AGNTCY light and dark themes.",
    Component: ColorTokensSection,
  },
  typography: {
    title: "Typography",
    description:
      "Type scale: font families, sizes, weights, and variants across all text styles.",
    Component: TypographyTokensSection,
  },
  shadows: {
    title: "Shadows",
    description: "Elevation shadow levels from flat (0) to side-drawer (5).",
    Component: ShadowTokensSection,
  },
  spacing: {
    title: "Spacing",
    description:
      "8px base-unit spacing scale — from 0 to 24 steps, with semantic aliases and px values.",
    Component: SpacingTokensSection,
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ComponentDocs() {
  const urlTheme = new URLSearchParams(window.location.search).get(
    "theme",
  ) as DocThemeMode | null;
  const urlSection = new URLSearchParams(window.location.search).get("section");
  const [activeTheme, setActiveTheme] = useState<DocThemeMode>(
    urlTheme && THEMES.some((t) => t.value === urlTheme) ? urlTheme : "light",
  );
  const [activeCategory, setActiveCategory] = useState(
    urlSection && SECTION_META[urlSection] ? urlSection : "buttons",
  );
  const mainRef = useRef<HTMLDivElement>(null);

  const { title, description, Component, wide } = SECTION_META[activeCategory];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const isC1D = activeTheme === "ioc" || activeTheme === "ioc-light";
  const isIoc = isC1D; // alias used throughout for C1D-specific layout/spacing
  const isIocDark = activeTheme === "ioc"; // dark-only: gradient backdrop, glows

  // Nav item style — C1D: full-width teal-tinted rounded highlight, no border
  const navItemSx = (isActive: boolean) =>
    isIoc
      ? {
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          width: "calc(100% - 16px)",
          mx: 1,
          px: 1.5,
          py: 0.85,
          border: "none",
          outline: "none",
          cursor: "pointer",
          borderRadius: "8px",
          bgcolor: isActive ? "rgba(0,188,235,0.12)" : "transparent",
          // Dark C1D: light text on dark bg. Light C1D: dark navy/teal on white.
          color: isActive
            ? isIocDark
              ? "#00BCEB"
              : "#006B8A"
            : isIocDark
              ? "#C8D6E8"
              : "#0A1628",
          transition: "all 0.15s",
          "&:hover": {
            bgcolor: isActive ? "rgba(0,188,235,0.16)" : "rgba(0,188,235,0.06)",
            color: isIocDark ? "#00BCEB" : "#006B8A",
          },
        }
      : {
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          width: "100%",
          px: 2.5,
          py: 1.0,
          border: "none",
          outline: "none",
          cursor: "pointer",
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
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: `
            radial-gradient(ellipse 130% 90% at -15% -5%, rgba(0,70,160,0.50) 0%, rgba(0,40,100,0.15) 45%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 60% 110%, rgba(0,30,80,0.30) 0%, transparent 60%),
            linear-gradient(160deg, #07111F 0%, #050C18 40%, #030810 100%)
          `,
            pointerEvents: "none",
          }}
        />
      )}
      {/* Fixed gradient backdrop for C1D light */}
      {activeTheme === "ioc-light" && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: `
            radial-gradient(ellipse 120% 80% at -10% -8%, rgba(0,188,235,0.13) 0%, rgba(0,130,200,0.06) 40%, transparent 65%),
            radial-gradient(ellipse 70% 60% at 100% 100%, rgba(43,130,246,0.07) 0%, transparent 55%),
            linear-gradient(150deg, #EBF6FF 0%, #F4F9FF 45%, #FAFCFF 100%)
          `,
            pointerEvents: "none",
          }}
        />
      )}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: isC1D ? "transparent" : "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
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
            bgcolor: isIocDark
              ? "rgba(7,17,31,0.80)"
              : activeTheme === "ioc-light"
                ? "rgba(255,255,255,0.75)"
                : "background.paper",
            backdropFilter: isC1D ? "blur(20px)" : "none",
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            px: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ flexShrink: 0, fontWeight: 600 }}
          >
            Open UI Kit
          </Typography>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <Typography
            variant="caption"
            noWrap
            sx={{ flex: 1, minWidth: 0, color: "text.primary", opacity: 0.6 }}
          >
            Component Reference
          </Typography>

          {/* Theme Switcher */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{ flexShrink: 0 }}
          >
            <Typography
              variant="caption"
              sx={{
                mr: 0.5,
                whiteSpace: "nowrap",
                color: "text.primary",
                opacity: 0.6,
              }}
            >
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
                    "&:hover": {
                      bgcolor: "action.hover",
                      borderColor: "primary.light",
                    },
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
                    sx={{
                      fontWeight: isActive ? 700 : 400,
                      whiteSpace: "nowrap",
                      fontSize: "0.72rem",
                    }}
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
              bgcolor: isIocDark
                ? "rgba(7,17,31,0.70)"
                : activeTheme === "ioc-light"
                  ? "rgba(255,255,255,0.70)"
                  : "background.paper",
              backdropFilter: isC1D ? "blur(20px)" : "none",
              borderRight: "1px solid",
              borderColor: "divider",
              py: 2,
            }}
          >
            {/* Components group */}
            <Typography
              variant="overline"
              sx={{
                px: 2.5,
                display: "block",
                mb: 0.75,
                fontSize: "0.62rem",
                color: "text.primary",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              Components
            </Typography>

            {COMPONENT_CATEGORIES.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Box
                  key={id}
                  component="button"
                  onClick={() => handleCategoryChange(id)}
                  sx={navItemSx(isActive)}
                >
                  <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "0.825rem",
                      textAlign: "left",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              );
            })}

            {/* Templates group */}
            <Box
              sx={{
                mx: 2,
                my: 1.5,
                borderTop: "1px solid",
                borderColor: "divider",
                opacity: 0.5,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                px: 2.5,
                display: "block",
                mb: 0.75,
                fontSize: "0.62rem",
                color: "text.primary",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              Templates
            </Typography>

            {TEMPLATE_CATEGORIES.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Box
                  key={id}
                  component="button"
                  onClick={() => handleCategoryChange(id)}
                  sx={navItemSx(isActive)}
                >
                  <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "0.825rem",
                      textAlign: "left",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              );
            })}

            {/* Tokens group */}
            <Box
              sx={{
                mx: 2,
                my: 1.5,
                borderTop: "1px solid",
                borderColor: "divider",
                opacity: 0.5,
              }}
            />
            <Typography
              variant="overline"
              sx={{
                px: 2.5,
                display: "block",
                mb: 0.75,
                fontSize: "0.62rem",
                color: "text.primary",
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              Tokens
            </Typography>

            {TOKEN_CATEGORIES.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id;
              return (
                <Box
                  key={id}
                  component="button"
                  onClick={() => handleCategoryChange(id)}
                  sx={navItemSx(isActive)}
                >
                  <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "0.825rem",
                      textAlign: "left",
                      lineHeight: 1.3,
                    }}
                  >
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
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.primary", opacity: 0.65 }}
              >
                {description}
              </Typography>
              <Divider sx={{ mt: 3 }} />
            </Box>

            {/* Components */}
            <Box sx={{ maxWidth: wide ? "none" : 860 }}>
              <Component />
            </Box>

            {/* Footer */}
            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "text.primary", opacity: 0.4 }}
              >
                Open UI Kit · Apache 2.0 · {COMPONENT_CATEGORIES.length - 1}{" "}
                component sections ·{" "}
                {ICON_CATALOGUE.reduce((s, c) => s + c.icons.length, 0)} icons ·{" "}
                {TEMPLATE_CATEGORIES.length} template ·{" "}
                {TOKEN_CATEGORIES.length} token sections
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
