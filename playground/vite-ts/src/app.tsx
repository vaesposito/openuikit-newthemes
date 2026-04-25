/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ThemeProvider, ThemeMode } from "@open-ui-kit/core";
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
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
  Tab,
  Tabs,
} from "@mui/material";
import { iocTheme } from "./ioc-theme";
import ProTip from "./pro-tip";

type ExtendedThemeMode = ThemeMode | "ioc";

function Copyright() {
  return (
    <Typography variant="body2" align="center" sx={{ opacity: 0.5 }}>
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/outshift-open/open-ui-kit">
        Open UI Kit
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function ThemeShowcase({ isCiscoZen }: { isCiscoZen?: boolean }) {
  const [tabValue, setTabValue] = React.useState(0);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState(70);

  // In Cisco Zen, sections are separated by subtle spacing/dividers — not boxed cards
  const SectionWrapper = isCiscoZen
    ? ({ children, title }: { children: React.ReactNode; title: string }) => (
        <Box>
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.12em", opacity: 0.5, fontSize: "0.7rem", display: "block", mb: 1.5 }}
          >
            {title}
          </Typography>
          {children}
        </Box>
      )
    : ({ children, title }: { children: React.ReactNode; title: string }) => (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            {children}
          </CardContent>
        </Card>
      );

  return (
    <Stack spacing={isCiscoZen ? 5 : 4}>
      {/* Buttons */}
      <SectionWrapper title="Buttons">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" disabled>Disabled</Button>
        </Stack>
      </SectionWrapper>

      {isCiscoZen && <Divider />}

      {/* Inputs */}
      <SectionWrapper title="Inputs">
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextField label="Text Field" variant="outlined" size="small" />
          <TextField label="Filled" variant="filled" size="small" defaultValue="Value" />
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
          <Typography gutterBottom variant="body2">Slider</Typography>
          <Slider value={sliderValue} onChange={(_, v) => setSliderValue(v as number)} />
        </Box>
      </SectionWrapper>

      {isCiscoZen && <Divider />}

      {/* Chips & Badges */}
      <SectionWrapper title="Chips & Badges">
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
      </SectionWrapper>

      {isCiscoZen && <Divider />}

      {/* Tabs */}
      <SectionWrapper title="Tabs">
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Overview" />
          <Tab label="Details" />
          <Tab label="Settings" />
        </Tabs>
        <Box sx={{ pt: 2 }}>
          <Typography variant="body2">
            Tab content for: {["Overview", "Details", "Settings"][tabValue]}
          </Typography>
        </Box>
      </SectionWrapper>

      {isCiscoZen && <Divider />}

      {/* Alerts */}
      <SectionWrapper title="Alerts">
        <Stack spacing={2}>
          <Alert severity="success">Success alert message</Alert>
          <Alert severity="info">Info alert message</Alert>
          <Alert severity="warning">Warning alert message</Alert>
          <Alert severity="error">Error alert message</Alert>
        </Stack>
      </SectionWrapper>

      {isCiscoZen && <Divider />}

      {/* Progress */}
      <SectionWrapper title="Progress">
        <LinearProgress variant="determinate" value={65} sx={{ mb: 2 }} />
        <LinearProgress color="secondary" />
      </SectionWrapper>
    </Stack>
  );
}

export default function App() {
  const [themeMode, setThemeMode] = React.useState<ExtendedThemeMode>("ioc");
  const isCiscoZen = themeMode === "ioc";

  const ThemeWrapper = isCiscoZen
    ? ({ children }: { children: React.ReactNode }) => (
        <MuiThemeProvider theme={iocTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider mode={themeMode as ThemeMode}>{children}</ThemeProvider>
      );

  const ThemeSelector = () => (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel>Theme</InputLabel>
      <Select
        value={themeMode}
        label="Theme"
        onChange={(e) => setThemeMode(e.target.value as ExtendedThemeMode)}
      >
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="glass">Glass</MenuItem>
        <MenuItem value="glass-light">Glass Light</MenuItem>
        <MenuItem value="ioc">IoC</MenuItem>
      </Select>
    </FormControl>
  );

  if (isCiscoZen) {
    return (
      <ThemeWrapper>
        <Container maxWidth="md" sx={{ py: 6 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 6,
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "#00BCEB", letterSpacing: "0.15em", fontSize: "0.7rem" }}
              >
                Cisco Design System
              </Typography>
              <Typography variant="h4" component="h1" sx={{ mt: 0.5, fontWeight: 700 }}>
                Zen Garden Theme
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.55, maxWidth: 360 }}>
                Deep navy foundations with ambient teal glow. Transparent surfaces, depth from light.
              </Typography>
            </Box>
            <ThemeSelector />
          </Box>

          <ThemeShowcase isCiscoZen />

          <Divider sx={{ my: 5 }} />
          <ProTip />
          <Copyright />
        </Container>
      </ThemeWrapper>
    );
  }

  return (
    <ThemeWrapper>
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
          <ThemeSelector />
        </Box>

        {themeMode === "glass" && (
          <Alert severity="info" sx={{ mb: 3 }}>
            🔮 <strong>Glass Theme</strong> — Glassmorphism with backdrop blur, translucent surfaces,
            and cyan/purple accents.
          </Alert>
        )}

        <ThemeShowcase />

        <Divider sx={{ my: 4 }} />
        <ProTip />
        <Copyright />
      </Container>
    </ThemeWrapper>
  );
}
