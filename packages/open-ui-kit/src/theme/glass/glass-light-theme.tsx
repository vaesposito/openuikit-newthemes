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
import { glassLightVars } from "./glass-light-vars";
import {
  glassLightAccentPalette,
  glassLightHighlightPalette,
  glassLightBackdropPalette,
  glassLightSurfacePalette,
  glassLightBorderPalette,
  glassLightCardLifted,
  glassLightCardSubtle,
  glassLightCardRaised,
  glassLightCardFloating,
  glassLightSideDrawer,
  glassLightAuroraBackground,
  glassLightBackdropBlur,
  glassLightTextPrimary,
  glassLightTextSecondary,
} from "./glass-light-color-palette";
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

// Glass Light shadows - softer for light mode
export const shadows: Shadows = [
  `none`,
  glassLightCardSubtle,
  glassLightCardLifted,
  glassLightCardRaised,
  glassLightCardFloating,
  glassLightSideDrawer,
  ...Array(20).fill("none"),
] as Shadows;

const palette: PaletteOptions = {
  mode: "light",
  primary: {
    ...glassLightAccentPalette,
    main: glassLightAccentPalette[500],
    light: glassLightAccentPalette[300],
    dark: glassLightAccentPalette[700],
    contrastText: "#ffffff",
  },
  secondary: {
    ...glassLightHighlightPalette,
    main: glassLightHighlightPalette[500],
    light: glassLightHighlightPalette[300],
    dark: glassLightHighlightPalette[700],
    contrastText: "#ffffff",
  },
  tertiary: lightOrangePalette,
  error: redPalette,
  warning: lightOrangePalette,
  info: glassLightHighlightPalette,
  success: greenPalette,
  negative: redPalette,
  orange: orangePalette,
  grey: greyPalette,
  vars: glassLightVars,
  text: {
    primary: glassLightTextPrimary,
    secondary: glassLightTextSecondary,
    disabled: "rgba(0, 0, 0, 0.30)",
  },
  background: {
    paper: glassLightSurfacePalette[600],
    default: glassLightBackdropPalette[100],
  },
  action: {
    hoverOpacity: 0.06,
    selectedOpacity: 0.12,
    focusOpacity: 0.10,
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

// Glass Light component overrides
const glassLightComponentOverrides = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backgroundColor: glassLightSurfacePalette[600],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        border: `1px solid ${glassLightBorderPalette[300]}`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)`,
          opacity: 0.8,
        },
      },
      elevation1: {
        boxShadow: glassLightCardSubtle,
      },
      elevation2: {
        boxShadow: glassLightCardLifted,
      },
      elevation3: {
        boxShadow: glassLightCardRaised,
      },
      elevation4: {
        boxShadow: glassLightCardFloating,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightSurfacePalette[600],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        border: `1px solid ${glassLightBorderPalette[300]}`,
        borderRadius: "16px",
        boxShadow: glassLightCardLifted,
        position: "relative" as const,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 50%, transparent 100%)`,
        },
        "&:hover": {
          borderColor: glassLightBorderPalette[500],
          boxShadow: `${glassLightCardRaised}, 0 0 40px ${glassLightAccentPalette.alpha10}`,
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
        background: `linear-gradient(135deg, ${glassLightAccentPalette[500]} 0%, ${glassLightAccentPalette[600]} 100%)`,
        color: "#ffffff",
        boxShadow: `0 4px 16px ${glassLightAccentPalette.alpha40}`,
        "&:hover": {
          background: `linear-gradient(135deg, ${glassLightAccentPalette[400]} 0%, ${glassLightAccentPalette[500]} 100%)`,
          boxShadow: `0 6px 24px ${glassLightAccentPalette.alpha40}`,
          transform: "translateY(-1px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      },
      containedSecondary: {
        background: `linear-gradient(135deg, ${glassLightHighlightPalette[500]} 0%, ${glassLightHighlightPalette[600]} 100%)`,
        boxShadow: `0 4px 16px ${glassLightHighlightPalette.alpha40}`,
        "&:hover": {
          background: `linear-gradient(135deg, ${glassLightHighlightPalette[400]} 0%, ${glassLightHighlightPalette[500]} 100%)`,
          boxShadow: `0 6px 24px ${glassLightHighlightPalette.alpha40}`,
        },
      },
      outlined: {
        backgroundColor: glassLightSurfacePalette[400],
        borderColor: glassLightBorderPalette[400],
        color: glassLightTextPrimary,
        "&:hover": {
          backgroundColor: glassLightSurfacePalette[600],
          borderColor: glassLightAccentPalette[500],
          boxShadow: `0 0 20px ${glassLightAccentPalette.alpha20}`,
        },
      },
      text: {
        color: glassLightTextPrimary,
        "&:hover": {
          backgroundColor: glassLightSurfacePalette[400],
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          backgroundColor: glassLightSurfacePalette[500],
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "12px",
          "& fieldset": {
            borderColor: glassLightBorderPalette[300],
            transition: "all 0.2s ease-in-out",
          },
          "&:hover fieldset": {
            borderColor: glassLightBorderPalette[500],
          },
          "&.Mui-focused fieldset": {
            borderColor: glassLightAccentPalette[500],
            boxShadow: `0 0 0 3px ${glassLightAccentPalette.alpha20}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: glassLightTextSecondary,
          "&.Mui-focused": {
            color: glassLightAccentPalette[600],
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: glassLightSurfacePalette[700],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        border: `1px solid ${glassLightBorderPalette[400]}`,
        borderRadius: "20px",
        boxShadow: glassLightCardFloating,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)`,
        },
      },
      backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: glassLightSurfacePalette[700],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        borderLeft: `1px solid ${glassLightBorderPalette[400]}`,
        boxShadow: glassLightSideDrawer,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightSurfacePalette[600],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        borderBottom: `1px solid ${glassLightBorderPalette[300]}`,
        boxShadow: "none",
        color: glassLightTextPrimary,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: glassLightSurfacePalette[700],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        border: `1px solid ${glassLightBorderPalette[400]}`,
        borderRadius: "12px",
        boxShadow: glassLightCardRaised,
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
          backgroundColor: glassLightSurfacePalette[400],
        },
        "&.Mui-selected": {
          backgroundColor: glassLightAccentPalette.alpha20,
          "&:hover": {
            backgroundColor: glassLightAccentPalette.alpha20,
          },
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: glassLightSurfacePalette[800],
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${glassLightBorderPalette[400]}`,
        borderRadius: "8px",
        boxShadow: glassLightCardSubtle,
        color: glassLightTextPrimary,
        fontSize: "12px",
        fontWeight: 500,
      },
      arrow: {
        color: glassLightSurfacePalette[800],
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightSurfacePalette[500],
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${glassLightBorderPalette[300]}`,
        "&:hover": {
          backgroundColor: glassLightSurfacePalette[600],
        },
      },
      filled: {
        "&.MuiChip-colorPrimary": {
          background: `linear-gradient(135deg, ${glassLightAccentPalette[500]} 0%, ${glassLightAccentPalette[600]} 100%)`,
          border: "none",
          color: "#ffffff",
        },
        "&.MuiChip-colorSecondary": {
          background: `linear-gradient(135deg, ${glassLightHighlightPalette[500]} 0%, ${glassLightHighlightPalette[600]} 100%)`,
          border: "none",
          color: "#ffffff",
        },
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        "& .MuiSwitch-track": {
          backgroundColor: glassLightBorderPalette[600],
          opacity: 1,
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        },
        "& .Mui-checked": {
          "& + .MuiSwitch-track": {
            backgroundColor: glassLightAccentPalette[500],
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
          background: `linear-gradient(90deg, ${glassLightAccentPalette[500]} 0%, ${glassLightHighlightPalette[500]} 100%)`,
          border: "none",
        },
        "& .MuiSlider-rail": {
          backgroundColor: glassLightBorderPalette[500],
        },
        "& .MuiSlider-thumb": {
          backgroundColor: "#ffffff",
          border: `2px solid ${glassLightAccentPalette[500]}`,
          boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15), 0 0 12px ${glassLightAccentPalette.alpha40}`,
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0 2px 12px rgba(0, 0, 0, 0.2), 0 0 20px ${glassLightAccentPalette.alpha40}`,
          },
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-indicator": {
          background: `linear-gradient(90deg, ${glassLightAccentPalette[500]} 0%, ${glassLightHighlightPalette[500]} 100%)`,
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
        color: glassLightTextSecondary,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: glassLightSurfacePalette[400],
          color: glassLightTextPrimary,
        },
        "&.Mui-selected": {
          color: glassLightAccentPalette[700],
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightSurfacePalette[600],
        backdropFilter: glassLightBackdropBlur,
        WebkitBackdropFilter: glassLightBackdropBlur,
        border: `1px solid ${glassLightBorderPalette[300]}`,
        borderRadius: "12px !important",
        marginBottom: "8px",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: "0 0 8px 0",
          boxShadow: glassLightCardLifted,
        },
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightSurfacePalette[700],
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${glassLightBorderPalette[400]}`,
        borderRadius: "12px",
      },
      standardSuccess: {
        borderLeftColor: greenPalette[500],
        borderLeftWidth: "4px",
        background: `linear-gradient(90deg, rgba(0, 185, 141, 0.08) 0%, ${glassLightSurfacePalette[700]} 100%)`,
      },
      standardError: {
        borderLeftColor: redPalette[500],
        borderLeftWidth: "4px",
        background: `linear-gradient(90deg, rgba(198, 41, 83, 0.08) 0%, ${glassLightSurfacePalette[700]} 100%)`,
      },
      standardWarning: {
        borderLeftColor: lightOrangePalette[500],
        borderLeftWidth: "4px",
        background: `linear-gradient(90deg, rgba(251, 175, 69, 0.08) 0%, ${glassLightSurfacePalette[700]} 100%)`,
      },
      standardInfo: {
        borderLeftColor: glassLightHighlightPalette[500],
        borderLeftWidth: "4px",
        background: `linear-gradient(90deg, rgba(156, 39, 176, 0.08) 0%, ${glassLightSurfacePalette[700]} 100%)`,
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: {
        background: `linear-gradient(135deg, ${glassLightAccentPalette[500]} 0%, ${glassLightAccentPalette[600]} 100%)`,
        color: "#ffffff",
        boxShadow: `0 2px 8px ${glassLightAccentPalette.alpha40}`,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightSurfacePalette[500],
        border: `2px solid ${glassLightBorderPalette[400]}`,
        color: glassLightTextPrimary,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: glassLightBorderPalette[300],
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
          backgroundColor: glassLightSurfacePalette[500],
        },
        "&.Mui-selected": {
          backgroundColor: glassLightAccentPalette.alpha10,
          borderLeft: `3px solid ${glassLightAccentPalette[500]}`,
          "&:hover": {
            backgroundColor: glassLightAccentPalette.alpha20,
          },
        },
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightBorderPalette[200],
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: glassLightAccentPalette[500],
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: glassLightBorderPalette[300],
        borderRadius: "4px",
      },
      bar: {
        background: `linear-gradient(90deg, ${glassLightAccentPalette[500]} 0%, ${glassLightHighlightPalette[500]} 100%)`,
        borderRadius: "4px",
      },
    },
  },
};

const glassLightThemeOptions: ThemeOptions = {
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
    // Override with glass light styling
    ...glassLightComponentOverrides,

    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: `${glassLightBorderPalette[400]} ${glassLightBackdropPalette[100]}`,
        },
        body: {
          background: glassLightAuroraBackground,
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          color: glassLightTextPrimary,
        },
        "*::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: glassLightBackdropPalette[100],
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: glassLightBorderPalette[400],
          borderRadius: 8,
          border: "2px solid transparent",
          backgroundClip: "content-box",
          "&:hover": {
            backgroundColor: glassLightBorderPalette[600],
          },
        },
        "*::-webkit-scrollbar-corner": {
          backgroundColor: glassLightBackdropPalette[100],
        },
        // Global selection styling
        "::selection": {
          backgroundColor: glassLightAccentPalette.alpha40,
          color: "#ffffff",
        },
      },
    },
  },
};

export const glassLightTheme: Theme = createTheme(theme, glassLightThemeOptions);
