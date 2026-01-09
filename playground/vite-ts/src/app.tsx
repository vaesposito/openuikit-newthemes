/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeProvider, ThemeMode } from "@open-ui-kit/core";
import {
  Container,
  Box,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  LinearProgress,
  Alert,
  Divider,
  Avatar,
  Badge,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import ProTip from "./pro-tip";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/outshift-open/open-ui-kit">
        Open UI Kit
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function ThemeShowcase() {
  const [tabValue, setTabValue] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState(70);

  return (
    <Stack spacing={4}>
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
            <TextField label="Text Field" variant="outlined" size="small" />
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
            <Typography gutterBottom>Slider</Typography>
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
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
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
            <Typography>
              Tab content for: {["Overview", "Details", "Settings"][tabValue]}
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
          <Stack spacing={2}>
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
          <LinearProgress variant="determinate" value={65} sx={{ mb: 2 }} />
          <LinearProgress color="secondary" />
        </CardContent>
      </Card>
    </Stack>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>("glass");

  return (
    <ThemeProvider mode={themeMode}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1">
            Open UI Kit Theme Showcase
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={themeMode}
              label="Theme"
              onChange={(e) => setThemeMode(e.target.value as ThemeMode)}
            >
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="glass">Glass ✨</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {themeMode === "glass" && (
          <Alert severity="info" sx={{ mb: 3 }}>
            🔮 <strong>Glass Theme</strong> - Featuring glassmorphism with
            backdrop blur, translucent surfaces, and cyan/purple accents.
          </Alert>
        )}

        <ThemeShowcase />

        <Divider sx={{ my: 4 }} />

        <ProTip />
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
