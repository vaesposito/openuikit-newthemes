/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createTheme, Shadows } from "@mui/material";

// ─── IoC Color Palette ─────────────────────────────────────────
// Inspired by Cisco's design language: deep navy foundations + teal brand accent

const ciscoNavy900 = "#030A14";
const ciscoNavy800 = "#050D1A";
const ciscoNavy700 = "#070E1A";
const ciscoNavy600 = "#0A1628";
const ciscoNavy500 = "#0C1B2E";
const ciscoNavy400 = "#122338";
const ciscoNavy300 = "#1A3050";

const ciscoTeal500 = "#00BCEB"; // Cisco brand teal
const ciscoTeal400 = "#1AC6F0";
const ciscoTeal300 = "#40D0F4";
const ciscoTeal200 = "#7DE0F8";
const ciscoTeal600 = "#00A0D1";
const ciscoTeal700 = "#0082AD";
const ciscoTeal900 = "#003D54";
const ciscoTealAlpha30 = "rgba(0, 188, 235, 0.30)";
const ciscoTealAlpha20 = "rgba(0, 188, 235, 0.20)";
const ciscoTealAlpha10 = "rgba(0, 188, 235, 0.10)";
const ciscoTealAlpha05 = "rgba(0, 188, 235, 0.05)";

const ciscoBlue500 = "#6EB4FF";
const ciscoBlue400 = "#8FC4FF";
const ciscoBlue300 = "#B0D4FF";
const ciscoBlue600 = "#4E9EF0";
const ciscoBlueAlpha20 = "rgba(110, 180, 255, 0.20)";
const ciscoBlueAlpha10 = "rgba(110, 180, 255, 0.10)";

const ciscoTextPrimary = "rgba(255, 255, 255, 0.95)";
const ciscoTextSecondary = "rgba(255, 255, 255, 0.65)";
const ciscoTextTertiary = "rgba(255, 255, 255, 0.40)";
const ciscoTextDisabled = "rgba(255, 255, 255, 0.25)";

// ─── Background: Glow lives here, not on cards ──────────────────────────────
// IoC background — ambient glow orbs on the layout level.
// Cards and surfaces are fully transparent; depth comes from the background.
export const iocBackground = `
  radial-gradient(ellipse 70% 55% at -5% 100%, rgba(0, 100, 200, 0.55) 0%, rgba(0, 60, 140, 0.20) 55%, transparent 75%),
  radial-gradient(ellipse 45% 40% at 10%  85%, rgba(0, 188, 235, 0.22) 0%, transparent 55%),
  radial-gradient(ellipse 35% 30% at 30% 100%, rgba(30, 111, 217, 0.18) 0%, transparent 50%),
  #05080F
`;

// ─── MUI Theme ───────────────────────────────────────────────────────────────
const shadows: Shadows = Array(25).fill("none") as Shadows;

export const iocTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ciscoTeal500,
      light: ciscoTeal300,
      dark: ciscoTeal700,
      contrastText: ciscoNavy900,
    },
    secondary: {
      main: ciscoBlue500,
      light: ciscoBlue300,
      dark: ciscoBlue600,
      contrastText: "#fff",
    },
    background: {
      default: "#000914",
      paper: "transparent",
    },
    text: {
      primary: ciscoTextPrimary,
      secondary: ciscoTextSecondary,
      disabled: ciscoTextDisabled,
    },
    divider: "rgba(255, 255, 255, 0.10)",
    action: {
      hoverOpacity: 0.08,
      selectedOpacity: 0.14,
      focusOpacity: 0.10,
    },
  },
  typography: {
    fontFamily: '"Inter", "CiscoSans", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, color: ciscoTextSecondary },
    body1: { color: ciscoTextPrimary },
    body2: { color: ciscoTextSecondary },
  },
  shape: { borderRadius: 10 },
  shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: `${ciscoNavy300} ${ciscoNavy800}`,
        },
        // Glow is applied here — at the layout/body level
        body: {
          background: iocBackground,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
        "*::-webkit-scrollbar": { width: "8px", height: "8px" },
        "*::-webkit-scrollbar-track": { backgroundColor: ciscoNavy800, borderRadius: 4 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: ciscoNavy300,
          borderRadius: 4,
          border: "2px solid transparent",
          backgroundClip: "content-box",
        },
        "::selection": {
          backgroundColor: ciscoTealAlpha30,
          color: "#fff",
        },
      },
    },

    // Cards: transparent, no border, no shadow — they inherit the background glow
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          backgroundImage: "none",
          border: "none",
          boxShadow: "none",
          borderRadius: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": { paddingBottom: 16 },
        },
      },
    },

    // Paper: transparent by default; overlays (menus, dialogs) get a subtle navy tint
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
        },
        elevation1: { backgroundColor: "rgba(12, 27, 46, 0.70)", backdropFilter: "blur(20px)" },
        elevation2: { backgroundColor: "rgba(12, 27, 46, 0.80)", backdropFilter: "blur(24px)" },
        elevation3: { backgroundColor: "rgba(12, 27, 46, 0.85)", backdropFilter: "blur(28px)" },
        elevation4: { backgroundColor: "rgba(12, 27, 46, 0.90)", backdropFilter: "blur(32px)" },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.18s ease",
        },
        contained: {
          backgroundColor: ciscoTeal500,
          color: ciscoNavy900,
          "&:hover": {
            backgroundColor: ciscoTeal400,
            boxShadow: `0 0 24px ${ciscoTealAlpha30}`,
          },
        },
        containedSecondary: {
          backgroundColor: ciscoBlue500,
          color: ciscoNavy900,
          "&:hover": {
            backgroundColor: ciscoBlue400,
            boxShadow: `0 0 24px ${ciscoBlueAlpha20}`,
          },
        },
        outlined: {
          borderColor: "rgba(0, 188, 235, 0.40)",
          color: ciscoTeal400,
          "&:hover": {
            borderColor: ciscoTeal500,
            backgroundColor: ciscoTealAlpha05,
            boxShadow: `0 0 16px ${ciscoTealAlpha10}`,
          },
        },
        text: {
          color: ciscoTeal400,
          "&:hover": { backgroundColor: ciscoTealAlpha05 },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(12, 27, 46, 0.45)",
            backdropFilter: "blur(12px)",
            borderRadius: 8,
            "& fieldset": { borderColor: "rgba(0, 188, 235, 0.25)" },
            "&:hover fieldset": { borderColor: "rgba(0, 188, 235, 0.50)" },
            "&.Mui-focused fieldset": {
              borderColor: ciscoTeal500,
              boxShadow: `0 0 0 3px ${ciscoTealAlpha10}`,
            },
          },
          "& .MuiInputLabel-root": {
            color: ciscoTextTertiary,
            "&.Mui-focused": { color: ciscoTeal400 },
          },
          "& .MuiInputBase-input": { color: ciscoTextPrimary },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(12, 27, 46, 0.45)",
          backdropFilter: "blur(12px)",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0, 188, 235, 0.25)" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0, 188, 235, 0.50)" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: ciscoTeal500 },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(9, 20, 40, 0.92)",
          backdropFilter: "blur(32px)",
          border: "1px solid rgba(0, 188, 235, 0.15)",
          borderRadius: 16,
        },
        backdrop: {
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(6px)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(9, 20, 40, 0.92)",
          backdropFilter: "blur(32px)",
          borderRight: "1px solid rgba(0, 188, 235, 0.12)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(9, 20, 40, 0.80)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 188, 235, 0.12)",
          boxShadow: "none",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(10, 22, 40, 0.92)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(0, 188, 235, 0.15)",
          borderRadius: 10,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 40px ${ciscoTealAlpha10}`,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: "2px 6px",
          "&:hover": { backgroundColor: ciscoTealAlpha05 },
          "&.Mui-selected": {
            backgroundColor: ciscoTealAlpha10,
            "&:hover": { backgroundColor: ciscoTealAlpha20 },
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(9, 20, 40, 0.95)",
          border: "1px solid rgba(0, 188, 235, 0.20)",
          borderRadius: 6,
          color: ciscoTextPrimary,
          fontSize: 12,
          fontWeight: 500,
          backdropFilter: "blur(16px)",
        },
        arrow: { color: "rgba(9, 20, 40, 0.95)" },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 188, 235, 0.08)",
          border: "1px solid rgba(0, 188, 235, 0.20)",
          color: ciscoTeal300,
          "&:hover": { backgroundColor: ciscoTealAlpha10 },
        },
        colorPrimary: {
          backgroundColor: ciscoTeal500,
          color: ciscoNavy900,
          border: "none",
        },
        colorSecondary: {
          backgroundColor: ciscoBlue500,
          color: ciscoNavy900,
          border: "none",
        },
        outlined: {
          backgroundColor: "transparent",
          borderColor: "rgba(0, 188, 235, 0.30)",
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-track": { backgroundColor: "rgba(255,255,255,0.20)", opacity: 1 },
          "& .Mui-checked + .MuiSwitch-track": {
            backgroundColor: ciscoTeal600,
            opacity: 1,
          },
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: { color: ciscoTeal500 },
        rail: { backgroundColor: "rgba(255,255,255,0.15)" },
        thumb: {
          backgroundColor: "#fff",
          "&:hover, &.Mui-focusVisible": { boxShadow: `0 0 16px ${ciscoTealAlpha30}` },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: ciscoTeal500,
            height: 3,
            borderRadius: "3px 3px 0 0",
            boxShadow: `0 0 12px ${ciscoTealAlpha30}`,
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          color: ciscoTextTertiary,
          "&.Mui-selected": { color: ciscoTeal400 },
          "&:hover": { color: ciscoTextSecondary, backgroundColor: ciscoTealAlpha05 },
          transition: "all 0.15s ease",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(12, 27, 46, 0.70)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 188, 235, 0.15)",
          borderRadius: 10,
        },
        standardSuccess: { borderLeftColor: "#00B98E", borderLeftWidth: 4 },
        standardError: { borderLeftColor: "#E2415B", borderLeftWidth: 4 },
        standardWarning: { borderLeftColor: "#F5A623", borderLeftWidth: 4 },
        standardInfo: { borderLeftColor: ciscoTeal500, borderLeftWidth: 4 },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: { backgroundColor: "rgba(255,255,255,0.10)", borderRadius: 4 },
        bar: { backgroundColor: ciscoTeal500, borderRadius: 4 },
        colorSecondary: { backgroundColor: "rgba(255,255,255,0.10)" },
        barColorSecondary: { backgroundColor: ciscoBlue500 },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "rgba(255,255,255,0.08)" },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: ciscoNavy400,
          border: `2px solid rgba(0, 188, 235, 0.30)`,
          color: ciscoTeal300,
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: ciscoTeal500,
          color: ciscoNavy900,
          boxShadow: `0 0 8px ${ciscoTealAlpha30}`,
        },
        colorError: { backgroundColor: "#E2415B" },
      },
    },

    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: "rgba(255,255,255,0.06)" },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          backgroundImage: "none",
          boxShadow: "none",
          border: "none",
          "&:before": { display: "none" },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover": { backgroundColor: ciscoTealAlpha05 },
          "&.Mui-selected": {
            backgroundColor: ciscoTealAlpha10,
            borderLeft: `3px solid ${ciscoTeal500}`,
            "&:hover": { backgroundColor: ciscoTealAlpha20 },
          },
        },
      },
    },
  },
});
