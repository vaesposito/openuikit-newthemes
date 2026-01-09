/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Typography, Stack, Card, CardContent } from "@mui/material";
import {
  glassAuroraBackground,
  glassMeshBackground,
  glassCosmicBackground,
  glassVibrantAurora,
  glassSunsetAurora,
  glassOceanDepth,
  glassNebula,
} from "../glass-color-palette";
import {
  glassLightAuroraBackground,
  glassLightMeshBackground,
  glassLightCosmicBackground,
  glassLightVibrantAurora,
  glassLightSunsetAurora,
  glassLightOceanDepth,
  glassLightNebula,
  glassLightMintFresh,
  glassLightRoseGold,
} from "../glass-light-color-palette";

interface BackgroundPreviewProps {
  name: string;
  background: string;
  isDark?: boolean;
}

const BackgroundPreview = ({
  name,
  background,
  isDark = true,
}: BackgroundPreviewProps) => (
  <Box
    sx={{
      background,
      borderRadius: 3,
      p: 3,
      minHeight: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      position: "relative",
      overflow: "hidden",
      border: "1px solid",
      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,0.4)"
          : "0 8px 32px rgba(0,0,0,0.15)",
      },
    }}
  >
    <Box
      sx={{
        background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        borderRadius: 2,
        px: 2,
        py: 1,
        alignSelf: "flex-start",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.87)",
          fontWeight: 600,
        }}
      >
        {name}
      </Typography>
    </Box>
  </Box>
);

const AllBackgrounds = () => {
  const darkBackgrounds = [
    { name: "Aurora", bg: glassAuroraBackground },
    { name: "Ocean Depth", bg: glassOceanDepth },
    { name: "Sunset Aurora", bg: glassSunsetAurora },
    { name: "Nebula", bg: glassNebula },
    { name: "Cosmic", bg: glassCosmicBackground },
    { name: "Vibrant Aurora", bg: glassVibrantAurora },
    { name: "Mesh", bg: glassMeshBackground },
  ];

  const lightBackgrounds = [
    { name: "Aurora", bg: glassLightAuroraBackground },
    { name: "Ocean", bg: glassLightOceanDepth },
    { name: "Sunset", bg: glassLightSunsetAurora },
    { name: "Nebula", bg: glassLightNebula },
    { name: "Cosmic", bg: glassLightCosmicBackground },
    { name: "Vibrant", bg: glassLightVibrantAurora },
    { name: "Mesh", bg: glassLightMeshBackground },
    { name: "Mint Fresh", bg: glassLightMintFresh },
    { name: "Rose Gold", bg: glassLightRoseGold },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#1a1a2e", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: "white", mb: 1, textAlign: "center" }}
      >
        Glass Theme Background Presets
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "rgba(255,255,255,0.7)", mb: 4, textAlign: "center" }}
      >
        Aurora-style gradients inspired by One Cisco Design Field Kit
      </Typography>

      {/* Dark Backgrounds */}
      <Typography
        variant="h5"
        sx={{ color: "white", mb: 2, mt: 4 }}
      >
        🌙 Dark Mode Backgrounds
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 2,
          mb: 6,
        }}
      >
        {darkBackgrounds.map(({ name, bg }) => (
          <BackgroundPreview key={name} name={name} background={bg} isDark />
        ))}
      </Box>

      {/* Light Backgrounds */}
      <Typography
        variant="h5"
        sx={{ color: "white", mb: 2 }}
      >
        ☀️ Light Mode Backgrounds
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 2,
        }}
      >
        {lightBackgrounds.map(({ name, bg }) => (
          <BackgroundPreview
            key={name}
            name={name}
            background={bg}
            isDark={false}
          />
        ))}
      </Box>
    </Box>
  );
};

const meta: Meta = {
  title: "Foundations/Glass Theme/Background Presets",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## Glass Theme Background Presets

A collection of aurora-style gradient backgrounds for the Glass theme.

### Dark Mode Presets
- **Aurora** - Flowing cyan, purple, and magenta gradients
- **Ocean Depth** - Deep blue and teal flowing gradients
- **Sunset Aurora** - Warm reds and oranges fading into cool purples
- **Nebula** - Rich purple and pink cosmic clouds
- **Cosmic** - Deep space feel with indigo and teal
- **Vibrant Aurora** - More saturated, bold aurora colors
- **Mesh** - Organic multi-color flowing mesh effect

### Light Mode Presets
All dark presets are available in light mode with softer, pastel tones, plus:
- **Mint Fresh** - Cool mint green and teal
- **Rose Gold** - Warm pink and gold tones

### Usage

\`\`\`tsx
import { 
  glassAuroraBackground,
  glassLightMintFresh 
} from '@open-ui-kit/core';

<Box sx={{ background: glassAuroraBackground }}>
  Content here
</Box>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

export const AllPresets: StoryObj = {
  render: () => <AllBackgrounds />,
};

export const DarkAurora: StoryObj = {
  render: () => (
    <Box
      sx={{
        background: glassAuroraBackground,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          bgcolor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.12)",
          p: 4,
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
          Dark Aurora
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
          The default dark glass background with flowing cyan, purple, and
          magenta gradients.
        </Typography>
      </Card>
    </Box>
  ),
  parameters: {
    backgrounds: { default: "Dark" },
  },
};

export const LightMint: StoryObj = {
  render: () => (
    <Box
      sx={{
        background: glassLightMintFresh,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          bgcolor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(0,0,0,0.1)",
          p: 4,
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ color: "rgba(0,0,0,0.87)", mb: 2 }}>
          Light Mint
        </Typography>
        <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>
          A fresh, cool mint green background perfect for light mode
          interfaces.
        </Typography>
      </Card>
    </Box>
  ),
  parameters: {
    backgrounds: { default: "Light" },
  },
};
