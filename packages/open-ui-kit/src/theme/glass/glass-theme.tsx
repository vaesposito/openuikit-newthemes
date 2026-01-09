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
import { glassVars } from "./glass-vars";
import {
  glassAccentPalette,
  glassHighlightPalette,
  glassBackdropPalette,
  glassSurfacePalette,
  glassBorderPalette,
  glassCardLifted,
  glassCardSubtle,
  glassCardRaised,
  glassCardFloating,
  glassSideDrawer,
  glassAuroraBackground,
  glassBackdropBlur,
  glassTextPrimary,
  glassTextSecondary,
} from "./glass-color-palette";
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

// Glass-specific shadows with colored glows
export const shadows: Shadows = [
  `none`,
  glassCardLifted,
  glassCardSubtle,
  glassCardRaised,
  glassCardFloating,
  glassSideDrawer,
  ...Array(20).fill("none"),
] as Shadows;

const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    ...glassAccentPalette,
    main: glassAccentPalette[500],
    light: glassAccentPalette[300],
    dark: glassAccentPalette[700],
    contrastText: glassBackdropPalette[900],
  },
  secondary: {
    ...glassHighlightPalette,
    main: glassHighlightPalette[500],
    light: glassHighlightPalette[300],
    dark: glassHighlightPalette[700],
    contrastText: "#ffffff",
  },
  tertiary: lightOrangePalette,
  error: redPalette,
  warning: lightOrangePalette,
  info: glassHighlightPalette,
  success: greenPalette,
  negative: redPalette,
  orange: orangePalette,
  grey: greyPalette,
  vars: glassVars,
  text: {
    primary: glassTextPrimary,
    secondary: glassTextSecondary,
    disabled: "rgba(255, 255, 255, 0.30)",
  },
  background: {
    paper: glassSurfacePalette[100],
    default: glassBackdropPalette[400],
  },
  action: {
    hoverOpacity: 0.08,
    selectedOpacity: 0.16,
    focusOpacity: 0.12,
  },
};

const theme: Theme = createTheme({
  breakpoints: {
    keys: ["md", "lg", "xl", "xxl"],
    values: {
      md: 1024,
      lg: 1440,
      xl: 1920,
      xxl: 2560,
    },
  },
  palette,
  typography,
  mixins: commonMixins,
});

// Glass-specific component overrides
const glassComponentOverrides = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backgroundColor: glassSurfacePalette[100],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        border: `1px solid ${glassBorderPalette[300]}`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${glassBorderPalette[500]} 50%, transparent 100%)`,
          opacity: 0.5,
        },
      },
      elevation1: {
        boxShadow: glassCardSubtle,
      },
      elevation2: {
        boxShadow: glassCardLifted,
      },
      elevation3: {
        boxShadow: glassCardRaised,
      },
      elevation4: {
        boxShadow: glassCardFloating,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[100],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        border: `1px solid ${glassBorderPalette[300]}`,
        borderRadius: "16px",
        boxShadow: glassCardLifted,
        position: "relative" as const,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${glassBorderPalette[600]} 50%, transparent 100%)`,
        },
        "&:hover": {
          borderColor: glassBorderPalette[500],
          boxShadow: `${glassCardRaised}, 0 0 30px ${glassAccentPalette.alpha10}`,
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        textTransform: "none" as const,
        fontWeight: 600,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "all 0.2s ease-in-out",
      },
      contained: {
        background: `linear-gradient(135deg, ${glassAccentPalette[500]} 0%, ${glassAccentPalette[600]} 100%)`,
        boxShadow: `0 4px 16px ${glassAccentPalette.alpha40}`,
        "&:hover": {
          background: `linear-gradient(135deg, ${glassAccentPalette[400]} 0%, ${glassAccentPalette[500]} 100%)`,
          boxShadow: `0 6px 24px ${glassAccentPalette.alpha40}`,
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      },
      containedSecondary: {
        background: `linear-gradient(135deg, ${glassHighlightPalette[500]} 0%, ${glassHighlightPalette[600]} 100%)`,
        boxShadow: `0 4px 16px ${glassHighlightPalette.alpha40}`,
        "&:hover": {
          background: `linear-gradient(135deg, ${glassHighlightPalette[400]} 0%, ${glassHighlightPalette[500]} 100%)`,
          boxShadow: `0 6px 24px ${glassHighlightPalette.alpha40}`,
        },
      },
      outlined: {
        backgroundColor: glassSurfacePalette[50],
        borderColor: glassBorderPalette[400],
        "&:hover": {
          backgroundColor: glassSurfacePalette[200],
          borderColor: glassAccentPalette[500],
          boxShadow: `0 0 20px ${glassAccentPalette.alpha20}`,
        },
      },
      text: {
        "&:hover": {
          backgroundColor: glassSurfacePalette[100],
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: glassSurfacePalette[50],
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "12px",
          "& fieldset": {
            borderColor: glassBorderPalette[300],
            transition: "all 0.2s ease-in-out",
          },
          "&:hover fieldset": {
            borderColor: glassBorderPalette[500],
          },
          "&.Mui-focused fieldset": {
            borderColor: glassAccentPalette[500],
            boxShadow: `0 0 0 3px ${glassAccentPalette.alpha20}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: glassTextSecondary,
          "&.Mui-focused": {
            color: glassAccentPalette[400],
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: glassSurfacePalette[200],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        border: `1px solid ${glassBorderPalette[400]}`,
        borderRadius: "20px",
        boxShadow: glassCardFloating,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${glassBorderPalette[700]} 50%, transparent 100%)`,
        },
      },
      backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: glassSurfacePalette[100],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        borderLeft: `1px solid ${glassBorderPalette[400]}`,
        boxShadow: glassSideDrawer,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[100],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        borderBottom: `1px solid ${glassBorderPalette[300]}`,
        boxShadow: "none",
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: glassSurfacePalette[200],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        border: `1px solid ${glassBorderPalette[400]}`,
        borderRadius: "12px",
        boxShadow: glassCardRaised,
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        margin: "2px 8px",
        transition: "all 0.15s ease-in-out",
        "&:hover": {
          backgroundColor: glassSurfacePalette[300],
        },
        "&.Mui-selected": {
          backgroundColor: glassAccentPalette.alpha20,
          "&:hover": {
            backgroundColor: glassAccentPalette.alpha20,
          },
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: glassSurfacePalette[400],
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${glassBorderPalette[400]}`,
        borderRadius: "8px",
        boxShadow: glassCardSubtle,
        color: glassTextPrimary,
        fontSize: "12px",
        fontWeight: 500,
      },
      arrow: {
        color: glassSurfacePalette[400],
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[200],
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${glassBorderPalette[300]}`,
        "&:hover": {
          backgroundColor: glassSurfacePalette[300],
        },
      },
      filled: {
        "&.MuiChip-colorPrimary": {
          background: `linear-gradient(135deg, ${glassAccentPalette[500]} 0%, ${glassAccentPalette[600]} 100%)`,
          border: "none",
        },
        "&.MuiChip-colorSecondary": {
          background: `linear-gradient(135deg, ${glassHighlightPalette[500]} 0%, ${glassHighlightPalette[600]} 100%)`,
          border: "none",
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        "& .MuiSwitch-track": {
          backgroundColor: glassSurfacePalette[400],
          opacity: 1,
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        },
        "& .Mui-checked": {
          "& + .MuiSwitch-track": {
            backgroundColor: glassAccentPalette[500],
            opacity: 1,
          },
          "& .MuiSwitch-thumb": {
            backgroundColor: "#ffffff",
          },
        },
      },
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        "& .MuiSlider-track": {
          background: `linear-gradient(90deg, ${glassAccentPalette[500]} 0%, ${glassHighlightPalette[500]} 100%)`,
          border: "none",
        },
        "& .MuiSlider-rail": {
          backgroundColor: glassSurfacePalette[400],
        },
        "& .MuiSlider-thumb": {
          backgroundColor: "#ffffff",
          boxShadow: `0 2px 8px rgba(0, 0, 0, 0.3), 0 0 12px ${glassAccentPalette.alpha40}`,
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0 2px 12px rgba(0, 0, 0, 0.4), 0 0 20px ${glassAccentPalette.alpha40}`,
          },
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-indicator": {
          background: `linear-gradient(90deg, ${glassAccentPalette[500]} 0%, ${glassHighlightPalette[500]} 100%)`,
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
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: glassSurfacePalette[100],
        },
        "&.Mui-selected": {
          color: glassAccentPalette[400],
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[100],
        backdropFilter: glassBackdropBlur,
        WebkitBackdropFilter: glassBackdropBlur,
        border: `1px solid ${glassBorderPalette[300]}`,
        borderRadius: "12px !important",
        marginBottom: "8px",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: "0 0 8px 0",
          boxShadow: glassCardLifted,
        },
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[200],
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${glassBorderPalette[400]}`,
        borderRadius: "12px",
      },
      standardSuccess: {
        borderLeftColor: greenPalette[500],
        borderLeftWidth: "4px",
      },
      standardError: {
        borderLeftColor: redPalette[500],
        borderLeftWidth: "4px",
      },
      standardWarning: {
        borderLeftColor: lightOrangePalette[500],
        borderLeftWidth: "4px",
      },
      standardInfo: {
        borderLeftColor: glassHighlightPalette[500],
        borderLeftWidth: "4px",
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        background: `linear-gradient(135deg, ${glassAccentPalette[500]} 0%, ${glassAccentPalette[600]} 100%)`,
        boxShadow: `0 2px 8px ${glassAccentPalette.alpha40}`,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[300],
        border: `2px solid ${glassBorderPalette[400]}`,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: glassBorderPalette[300],
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        margin: "2px 8px",
        transition: "all 0.15s ease-in-out",
        "&:hover": {
          backgroundColor: glassSurfacePalette[200],
        },
        "&.Mui-selected": {
          backgroundColor: glassAccentPalette.alpha10,
          borderLeft: `3px solid ${glassAccentPalette[500]}`,
          "&:hover": {
            backgroundColor: glassAccentPalette.alpha20,
          },
        },
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[200],
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: glassAccentPalette[500],
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: glassSurfacePalette[300],
        borderRadius: "4px",
      },
      bar: {
        background: `linear-gradient(90deg, ${glassAccentPalette[500]} 0%, ${glassHighlightPalette[500]} 100%)`,
        borderRadius: "4px",
      },
    },
  },
};

const glassThemeOptions: ThemeOptions = {
  shadows,
  components: {
    ...appBarComponent(theme),
    ...accordionComponent(theme),
    ...avatarComponent(theme),
    ...avatarGroupComponent(theme),
    ...buttonComponent(theme),
    ...cardComponent(theme),
    ...checkboxComponent(theme),
    ...circularProgressComponent(theme),
    ...dialogComponent(theme),
    ...dividerComponent(theme),
    ...inputComponents(theme),
    ...listComponent(theme),
    ...menuComponent(theme),
    ...popoverComponent(theme),
    ...radioComponent(theme),
    ...skeletonComponent(theme),
    ...snackbarComponent(theme),
    ...switchComponent(theme),
    ...tabComponent(theme),
    ...tabsComponent(theme),
    ...tooltipComponent(theme),
    // Override with glass-specific styling
    ...glassComponentOverrides,

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: `${glassSurfacePalette[400]} ${glassBackdropPalette[500]}`,
        },
        body: {
          background: glassAuroraBackground,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: glassBackdropPalette[500],
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: glassSurfacePalette[300],
          borderRadius: 8,
          border: "2px solid transparent",
          backgroundClip: "content-box",
          "&:hover": {
            backgroundColor: glassSurfacePalette[500],
          },
        },
        "*::-webkit-scrollbar-corner": {
          backgroundColor: glassBackdropPalette[500],
        },
        // Global glass selection styling
        "::selection": {
          backgroundColor: glassAccentPalette.alpha40,
          color: "#ffffff",
        },
      },
    },
  },
};

export const glassTheme: Theme = createTheme(theme, glassThemeOptions);
