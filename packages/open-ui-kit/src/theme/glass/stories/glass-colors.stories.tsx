/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { glassTheme } from "../glass-theme";
import { glassLightTheme } from "../glass-light-theme";
import {
  glassAccentPalette,
  glassHighlightPalette,
  glassSurfacePalette,
  glassBorderPalette,
  glassAuroraBackground,
} from "../glass-color-palette";
import {
  glassLightAccentPalette,
  glassLightHighlightPalette,
  glassLightSurfacePalette,
  glassLightBorderPalette,
  glassLightAuroraBackground,
} from "../glass-light-color-palette";

interface ColorSwatchProps {
  color: string;
  name: string;
  isDark?: boolean;
}

const ColorSwatch = ({ color, name, isDark = true }: ColorSwatchProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: 2,
        background: color,
        border: isDark
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(0,0,0,0.1)",
        boxShadow: isDark
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 4px 12px rgba(0,0,0,0.1)",
      }}
    />
    <Typography
      variant="caption"
      sx={{
        fontFamily: "monospace",
        fontSize: "0.625rem",
        color: "text.secondary",
        textAlign: "center",
      }}
    >
      {name}
    </Typography>
  </Box>
);

interface PaletteRowProps {
  title: string;
  palette: Record<string | number, string>;
  isDark?: boolean;
}

const PaletteRow = ({ title, palette, isDark = true }: PaletteRowProps) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {Object.entries(palette).map(([key, value]) => (
        <ColorSwatch
          key={key}
          color={value}
          name={key}
          isDark={isDark}
        />
      ))}
    </Box>
  </Box>
);

const DarkColors = () => {
  return (
    <ThemeProvider theme={glassTheme}>
      <CssBaseline />
      <Box
        sx={{
          p: 4,
          background: glassAuroraBackground,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            background:
              "linear-gradient(135deg, #00e5ff 0%, #9c27b0 50%, #e91e63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Glass Theme Colors (Dark)
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Color palettes for dark mode glassmorphism
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <PaletteRow
            title="Accent (Cyan)"
            palette={glassAccentPalette}
            isDark={true}
          />
          <PaletteRow
            title="Highlight (Purple)"
            palette={glassHighlightPalette}
            isDark={true}
          />
          <PaletteRow
            title="Surface (Translucent White)"
            palette={glassSurfacePalette}
            isDark={true}
          />
          <PaletteRow
            title="Border"
            palette={glassBorderPalette}
            isDark={true}
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
            Usage
          </Typography>
          <Typography
            component="pre"
            sx={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              overflow: "auto",
              color: "text.secondary",
            }}
          >
            {`import { 
  glassAccentPalette,
  glassHighlightPalette,
  glassSurfacePalette 
} from '@open-ui-kit/core';

// Access color values
const primaryColor = glassAccentPalette[500]; // #00d4ff
const secondaryColor = glassHighlightPalette[500]; // #9370ff
const surface = glassSurfacePalette[200]; // rgba(255,255,255,0.12)`}
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

const LightColors = () => {
  return (
    <ThemeProvider theme={glassLightTheme}>
      <CssBaseline />
      <Box
        sx={{
          p: 4,
          background: glassLightAuroraBackground,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            background:
              "linear-gradient(135deg, #00bcd4 0%, #9c27b0 50%, #e91e63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Glass Theme Colors (Light)
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Color palettes for light mode glassmorphism
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <PaletteRow
            title="Accent (Cyan)"
            palette={glassLightAccentPalette}
            isDark={false}
          />
          <PaletteRow
            title="Highlight (Purple)"
            palette={glassLightHighlightPalette}
            isDark={false}
          />
          <PaletteRow
            title="Surface (Translucent White)"
            palette={glassLightSurfacePalette}
            isDark={false}
          />
          <PaletteRow
            title="Border"
            palette={glassLightBorderPalette}
            isDark={false}
          />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
            Usage
          </Typography>
          <Typography
            component="pre"
            sx={{
              fontFamily: "monospace",
              fontSize: "0.875rem",
              overflow: "auto",
              color: "text.secondary",
            }}
          >
            {`import { 
  glassLightAccentPalette,
  glassLightHighlightPalette,
  glassLightSurfacePalette 
} from '@open-ui-kit/core';

// Access color values
const primaryColor = glassLightAccentPalette[500]; // #00bcd4
const secondaryColor = glassLightHighlightPalette[500]; // #9c27b0
const surface = glassLightSurfacePalette[600]; // rgba(255,255,255,0.90)`}
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

const meta: Meta = {
  title: "Foundations/Glass Theme/Color Palette",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Glass Theme Color Palette

The glass theme uses translucent colors and vibrant accents to create the glassmorphism effect.

## Color Categories

### Accent (Cyan)
Primary brand color - used for buttons, links, and interactive elements.

### Highlight (Purple)  
Secondary accent color - used for secondary actions and highlights.

### Surface
Translucent white/black surfaces with varying opacity for the frosted glass effect.

### Border
Subtle border colors that define edges of glass elements.
        `,
      },
    },
  },
};

export default meta;

export const Dark: StoryObj = {
  render: () => <DarkColors />,
  parameters: {
    backgrounds: { default: "Glass" },
  },
};

export const Light: StoryObj = {
  render: () => <LightColors />,
};
