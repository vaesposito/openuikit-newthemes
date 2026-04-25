/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  greenPalette,
  greyPalette,
  lightOrangePalette,
  orangePalette,
  redPalette,
} from "../color-palette";
import { typography, commonMixins } from "../common";
import {
  createTheme,
  PaletteOptions,
  ThemeOptions,
  Theme,
  Shadows,
} from "@mui/material";
import { iocVars } from "./ioc-vars";
import {
  iocTealPalette,
  iocBluePalette,
  iocSurfacePalette,
  iocBackdropPalette,
  iocBorderPalette,
  iocTextPrimary,
  iocTextSecondary,
  iocTextDisabled,
  iocPageBackground,
  iocBackdropBlur,
  iocShadowSm,
  iocShadowMd,
  iocShadowLg,
} from "./ioc-color-palette";
import {
  appBarComponent,
  accordionComponent,
  avatarComponent,
  avatarGroupComponent,
  buttonComponent,
  cardComponent,
  checkboxComponent,
  circularProgressComponent,
  dialogComponent,
  dividerComponent,
  inputComponents,
  listComponent,
  menuComponent,
  popoverComponent,
  radioComponent,
  skeletonComponent,
  snackbarComponent,
  switchComponent,
  tabComponent,
  tabsComponent,
  tooltipComponent,
} from "../mui";

export const iocShadows: Shadows = [
  "none",
  iocShadowSm,
  iocShadowMd,
  iocShadowLg,
  iocShadowLg,
  iocShadowLg,
  ...Array(19).fill("none"),
] as Shadows;

const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    ...iocTealPalette,
    main: iocTealPalette[500],
    light: iocTealPalette[300],
    dark: iocTealPalette[700],
    contrastText: iocBackdropPalette[900],
  },
  secondary: {
    main: iocBluePalette[500],
    light: iocBluePalette[400],
    dark: iocBluePalette[600],
    contrastText: "#ffffff",
  },
  tertiary: lightOrangePalette,
  error: redPalette,
  warning: lightOrangePalette,
  info: iocBluePalette,
  success: greenPalette,
  negative: redPalette,
  orange: orangePalette,
  grey: greyPalette,
  vars: iocVars,
  text: {
    primary: iocTextPrimary,
    secondary: iocTextSecondary,
    disabled: iocTextDisabled,
  },
  background: {
    paper: iocSurfacePalette[100],
    default: iocBackdropPalette[600],
  },
  action: {
    hoverOpacity: 0.08,
    selectedOpacity: 0.14,
    focusOpacity: 0.10,
  },
};

const baseTheme: Theme = createTheme({
  breakpoints: {
    keys: ["md", "lg", "xl", "xxl"],
    values: { md: 1024, lg: 1440, xl: 1920, xxl: 2560 },
  },
  palette,
  typography,
  mixins: commonMixins,
});

// IoC-specific component overrides
const iocComponentOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: `${iocSurfacePalette[300]} ${iocBackdropPalette[800]}`,
      },
      // Smooth color-field background — no visible orbs, diffuse blue atmosphere
      body: {
        background: iocPageBackground,
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      },
      "*::-webkit-scrollbar": { width: "8px", height: "8px" },
      "*::-webkit-scrollbar-track": {
        backgroundColor: iocBackdropPalette[800],
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: iocSurfacePalette[300],
        borderRadius: 4,
        border: "2px solid transparent",
        backgroundClip: "content-box",
        "&:hover": { backgroundColor: iocSurfacePalette[400] },
      },
      "::selection": {
        backgroundColor: iocTealPalette.alpha20,
        color: "#ffffff",
      },
    },
  },

  // Cards: transparent, no border, no shadow — depth comes from the background
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: iocSurfacePalette[100],
        backgroundImage: "none",
        border: `1px solid ${iocBorderPalette[200]}`,
        borderRadius: "10px",
        boxShadow: "none",
        position: "relative" as const,
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backgroundColor: iocSurfacePalette[100],
      },
      elevation1: {
        backgroundColor: iocSurfacePalette[100],
        boxShadow: iocShadowSm,
      },
      elevation2: {
        backgroundColor: iocSurfacePalette[200],
        backdropFilter: iocBackdropBlur,
        boxShadow: iocShadowMd,
      },
      elevation3: {
        backgroundColor: iocSurfacePalette[300],
        backdropFilter: iocBackdropBlur,
        boxShadow: iocShadowLg,
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        textTransform: "none" as const,
        fontWeight: 600,
        transition: "all 0.18s ease",
      },
      contained: {
        backgroundColor: iocTealPalette[500],
        color: iocBackdropPalette[900],
        "&:hover": {
          backgroundColor: iocTealPalette[400],
          boxShadow: `0 0 20px ${iocTealPalette.alpha20}`,
        },
      },
      containedSecondary: {
        backgroundColor: iocBluePalette[500],
        color: "#ffffff",
        "&:hover": {
          backgroundColor: iocBluePalette[400],
          boxShadow: "0 0 20px rgba(43,130,246,0.25)",
        },
      },
      outlined: {
        borderColor: iocBorderPalette[300],
        color: iocTealPalette[400],
        "&:hover": {
          borderColor: iocTealPalette[500],
          backgroundColor: iocTealPalette.alpha05,
        },
      },
      text: {
        color: iocTealPalette[400],
        "&:hover": { backgroundColor: iocTealPalette.alpha05 },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: iocSurfacePalette[50],
          backdropFilter: "blur(12px)",
          borderRadius: "8px",
          "& fieldset": { borderColor: iocBorderPalette[300] },
          "&:hover fieldset": { borderColor: iocBorderPalette[400] },
          "&.Mui-focused fieldset": {
            borderColor: iocTealPalette[500],
            boxShadow: `0 0 0 3px ${iocTealPalette.alpha10}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: iocTextSecondary,
          "&.Mui-focused": { color: iocTealPalette[400] },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: iocBackdropPalette[400],
        backdropFilter: iocBackdropBlur,
        border: `1px solid ${iocBorderPalette[300]}`,
        borderRadius: "14px",
        boxShadow: iocShadowLg,
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
        backgroundColor: iocBackdropPalette[500],
        backdropFilter: iocBackdropBlur,
        borderRight: `1px solid ${iocBorderPalette[200]}`,
        boxShadow: iocShadowLg,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: iocBackdropPalette[600],
        backdropFilter: iocBackdropBlur,
        borderBottom: `1px solid ${iocBorderPalette[200]}`,
        boxShadow: "none",
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: iocBackdropPalette[400],
        backdropFilter: iocBackdropBlur,
        border: `1px solid ${iocBorderPalette[300]}`,
        borderRadius: "10px",
        boxShadow: iocShadowLg,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        margin: "2px 6px",
        "&:hover": { backgroundColor: iocSurfacePalette[200] },
        "&.Mui-selected": {
          backgroundColor: iocTealPalette.alpha10,
          "&:hover": { backgroundColor: iocTealPalette.alpha20 },
        },
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: iocBackdropPalette[300],
        border: `1px solid ${iocBorderPalette[300]}`,
        borderRadius: "6px",
        boxShadow: iocShadowMd,
        color: iocTextPrimary,
        fontSize: "12px",
        fontWeight: 500,
        backdropFilter: "blur(16px)",
      },
      arrow: { color: iocBackdropPalette[300] },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: iocSurfacePalette[200],
        border: `1px solid ${iocBorderPalette[200]}`,
        color: iocTextSecondary,
        "&:hover": { backgroundColor: iocSurfacePalette[300] },
      },
      colorPrimary: {
        backgroundColor: iocTealPalette[500],
        color: iocBackdropPalette[900],
        border: "none",
      },
      colorSecondary: {
        backgroundColor: iocBluePalette[500],
        color: "#fff",
        border: "none",
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        "& .MuiSwitch-track": { backgroundColor: iocSurfacePalette[400], opacity: 1 },
        "& .Mui-checked + .MuiSwitch-track": {
          backgroundColor: iocTealPalette[600],
          opacity: 1,
        },
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: { color: iocTealPalette[500] },
      rail: { backgroundColor: iocSurfacePalette[300] },
      thumb: {
        backgroundColor: "#fff",
        "&:hover, &.Mui-focusVisible": {
          boxShadow: `0 0 16px ${iocTealPalette.alpha20}`,
        },
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-indicator": {
          backgroundColor: iocTealPalette[500],
          height: "3px",
          borderRadius: "3px 3px 0 0",
        },
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none" as const,
        fontWeight: 500,
        color: iocTextSecondary,
        "&.Mui-selected": { color: iocTealPalette[400] },
        "&:hover": { backgroundColor: iocSurfacePalette[100] },
        transition: "all 0.15s ease",
      },
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: iocSurfacePalette[100],
        border: `1px solid ${iocBorderPalette[200]}`,
        borderRadius: "10px !important",
        marginBottom: "8px",
        boxShadow: "none",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: "0 0 8px 0" },
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        backgroundColor: iocSurfacePalette[200],
        backdropFilter: "blur(12px)",
        border: `1px solid ${iocBorderPalette[200]}`,
        borderRadius: "10px",
      },
      standardSuccess: { borderLeftColor: greenPalette[500], borderLeftWidth: "4px" },
      standardError:   { borderLeftColor: redPalette[500],   borderLeftWidth: "4px" },
      standardWarning: { borderLeftColor: lightOrangePalette[500], borderLeftWidth: "4px" },
      standardInfo:    { borderLeftColor: iocTealPalette[500], borderLeftWidth: "4px" },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        backgroundColor: iocTealPalette[500],
        color: iocBackdropPalette[900],
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: iocSurfacePalette[300],
        border: `2px solid ${iocBorderPalette[300]}`,
        color: iocTealPalette[300],
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { borderColor: iocBorderPalette[200] },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": { backgroundColor: iocSurfacePalette[200] },
        "&.Mui-selected": {
          backgroundColor: iocTealPalette.alpha10,
          borderLeft: `3px solid ${iocTealPalette[500]}`,
          "&:hover": { backgroundColor: iocTealPalette.alpha20 },
        },
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: { backgroundColor: iocSurfacePalette[200] },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: { backgroundColor: iocSurfacePalette[200], borderRadius: "4px" },
      bar: { backgroundColor: iocTealPalette[500], borderRadius: "4px" },
    },
  },
};

const iocThemeOptions: ThemeOptions = {
  shadows: iocShadows,
  components: {
    ...appBarComponent(baseTheme),
    ...accordionComponent(baseTheme),
    ...avatarComponent(baseTheme),
    ...avatarGroupComponent(baseTheme),
    ...buttonComponent(baseTheme),
    ...cardComponent(baseTheme),
    ...checkboxComponent(baseTheme),
    ...circularProgressComponent(baseTheme),
    ...dialogComponent(baseTheme),
    ...dividerComponent(baseTheme),
    ...inputComponents(baseTheme),
    ...listComponent(baseTheme),
    ...menuComponent(baseTheme),
    ...popoverComponent(baseTheme),
    ...radioComponent(baseTheme),
    ...skeletonComponent(baseTheme),
    ...snackbarComponent(baseTheme),
    ...switchComponent(baseTheme),
    ...tabComponent(baseTheme),
    ...tabsComponent(baseTheme),
    ...tooltipComponent(baseTheme),
    // IoC-specific overrides
    ...iocComponentOverrides,
  },
};

export const iocTheme: Theme = createTheme(baseTheme, iocThemeOptions);
