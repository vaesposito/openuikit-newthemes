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
import { commonMixins } from "../common";
import { iocNextTypography } from "./ioc-next-typography";
import {
  createTheme,
  PaletteOptions,
  ThemeOptions,
  Theme,
  Shadows,
} from "@mui/material";
import { iocNextLightVars } from "./ioc-next-light-vars";
import {
  iocNextCyanPalette,
  iocNextBluePalette,
} from "./ioc-next-color-palette";
import {
  iocNextLightSurfacePalette,
  iocNextLightTextPrimary,
  iocNextLightTextSecondary,
  iocNextLightTextDisabled,
  iocNextLightPageBackground,
  iocNextLightShadowSm,
  iocNextLightShadowMd,
  iocNextLightShadowLg,
} from "./ioc-next-light-color-palette";
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

// ── OXP glassmorphism language (light) ───────────────────────────────────────
// Frosted-white panes float over a soft light gradient, separated by space and
// glow instead of hard outlines.
const glassFill = "rgba(255, 255, 255, 0.55)";
const glassFillMedium = "rgba(255, 255, 255, 0.70)";
const glassFillStrong = "rgba(255, 255, 255, 0.85)";
const glassHairline = "rgba(15, 32, 64, 0.06)";
const glassBlur = "blur(28px)";
const glassDepth = "0 12px 40px rgba(15, 32, 64, 0.12)";

const glowPrimary = iocNextLightVars.glowPrimary as string;
const glowSecondary = iocNextLightVars.glowSecondary as string;

const palette: PaletteOptions = {
  mode: "light",
  primary: {
    ...iocNextCyanPalette,
    main: iocNextCyanPalette[500],
    light: iocNextCyanPalette[400],
    dark: iocNextCyanPalette[700],
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: iocNextBluePalette[500],
    light: iocNextBluePalette[400],
    dark: iocNextBluePalette[600],
    contrastText: "#ffffff",
  },
  tertiary: lightOrangePalette,
  error: redPalette,
  warning: lightOrangePalette,
  info: iocNextBluePalette,
  success: greenPalette,
  negative: redPalette,
  orange: orangePalette,
  grey: greyPalette,
  vars: iocNextLightVars,
  text: {
    primary: iocNextLightTextPrimary,
    secondary: iocNextLightTextSecondary,
    disabled: iocNextLightTextDisabled,
  },
  background: {
    paper: glassFill,
    default: iocNextLightSurfacePalette[100],
  },
  divider: glassHairline,
  action: {
    hoverOpacity: 0.06,
    selectedOpacity: 0.1,
    focusOpacity: 0.08,
  },
};

export const iocNextLightShadows: Shadows = [
  "none",
  iocNextLightShadowSm,
  iocNextLightShadowMd,
  iocNextLightShadowLg,
  iocNextLightShadowLg,
  iocNextLightShadowLg,
  ...Array(19).fill("none"),
] as Shadows;

const baseTheme: Theme = createTheme({
  breakpoints: {
    keys: ["md", "lg", "xl", "xxl"],
    values: { md: 1024, lg: 1440, xl: 1920, xxl: 2560 },
  },
  palette,
  typography: iocNextTypography,
  mixins: commonMixins,
});

const iocNextLightComponentOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: `rgba(15,32,64,0.18) transparent`,
      },
      body: {
        background: iocNextLightPageBackground,
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      },
      ".osd-view-switcher-option": {
        backgroundColor: `${glassFill} !important`,
        borderColor: `transparent !important`,
        color: `${iocNextLightTextSecondary} !important`,
        "&:hover": {
          backgroundColor: `${glassFillMedium} !important`,
          color: `${iocNextLightTextPrimary} !important`,
        },
      },
      ".osd-view-switcher-option-selected": {
        backgroundColor: `${glassFillStrong} !important`,
        borderColor: `${iocNextCyanPalette.alpha20} !important`,
        color: `${iocNextLightTextPrimary} !important`,
        boxShadow: `${glowPrimary} !important`,
      },
      "*::-webkit-scrollbar": { width: "8px", height: "8px" },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
        borderRadius: 8,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(15,32,64,0.16)",
        borderRadius: 8,
        border: "2px solid transparent",
        backgroundClip: "content-box",
        "&:hover": { backgroundColor: "rgba(15,32,64,0.28)" },
      },
      "::selection": {
        backgroundColor: iocNextCyanPalette.alpha20,
        color: iocNextLightTextPrimary,
      },
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent !important",
      },
    },
  },

  // Cards: borderless frosted-white glass, rounded, cyan glow on hover
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: glassFill,
        backgroundImage:
          "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,0.65) 0%, transparent 55%)",
        backdropFilter: glassBlur,
        WebkitBackdropFilter: glassBlur,
        border: "none",
        borderRadius: "20px",
        boxShadow: glassDepth,
        position: "relative" as const,
        padding: "20px",
        transition: "box-shadow 0.2s ease, background-color 0.2s ease",
        "&:hover": {
          backgroundColor: glassFillMedium,
          boxShadow: `${glassDepth}, ${glowPrimary}`,
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backgroundColor: glassFill,
        backdropFilter: glassBlur,
        WebkitBackdropFilter: glassBlur,
        borderRadius: "16px",
      },
      elevation1: {
        backgroundColor: glassFill,
        backdropFilter: glassBlur,
        boxShadow: glassDepth,
      },
      elevation2: {
        backgroundColor: glassFillMedium,
        backdropFilter: glassBlur,
        boxShadow: glassDepth,
      },
      elevation3: {
        backgroundColor: glassFillStrong,
        backdropFilter: glassBlur,
        boxShadow: `${glassDepth}, ${glowPrimary}`,
      },
    },
  },

  MuiButton: {
    defaultProps: {
      disableRipple: true,
      variant: "primary",
      color: "default",
      size: "medium",
    } as any,
    styleOverrides: {
      root: {
        textTransform: "none" as const,
        borderRadius: "12px",
        fontWeight: 600,
        transition: "all 0.18s ease",
        color: "#FFFFFF",
        "& .MuiButton-startIcon": { marginLeft: 0 },
        "& .MuiButton-endIcon": { marginRight: 0 },
        "&.Mui-focusVisible": {
          boxShadow: `0 0 0 3px ${iocNextCyanPalette.alpha20}, ${glowPrimary}`,
        },
        "&.MuiButton-sizeLarge": {
          ...baseTheme.typography.subtitle1,
          height: "44px",
          borderRadius: "14px",
        },
        "&.MuiButton-sizeMedium": {
          ...baseTheme.typography.subtitle2,
          height: "36px",
        },
        "&.MuiButton-sizeSmall": {
          ...baseTheme.typography.subtitle2,
          height: "28px",
          padding: "2px 14px",
        },
        "&.MuiButton-primarySizeLarge, &.MuiButton-primarySizeMedium": {
          paddingRight: "18px",
          paddingLeft: "18px",
        },
        "&.MuiButton-primary": {
          background: `linear-gradient(180deg, ${iocNextCyanPalette[400]} 0%, ${iocNextCyanPalette[600]} 100%)`,
          color: "#FFFFFF",
          boxShadow: `0 4px 14px ${iocNextCyanPalette.alpha40}`,
          "&.Mui-disabled": { opacity: 0.4, boxShadow: "none" },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocNextCyanPalette[300]} 0%, ${iocNextCyanPalette[500]} 100%)`,
            boxShadow: glowPrimary,
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocNextCyanPalette[500]} 0%, ${iocNextCyanPalette[700]} 100%)`,
          },
        },
        "&.MuiButton-secondary": {
          background: `linear-gradient(180deg, ${iocNextBluePalette[500]} 0%, ${iocNextBluePalette[600]} 100%)`,
          color: "#ffffff",
          boxShadow: `0 4px 14px rgba(58,149,255,0.30)`,
          "&.Mui-disabled": { opacity: 0.4, boxShadow: "none" },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocNextBluePalette[400]} 0%, ${iocNextBluePalette[500]} 100%)`,
            boxShadow: glowSecondary,
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocNextBluePalette[600]} 0%, #1560c0 100%)`,
          },
        },
        "&.MuiButton-outlined": {
          border: `1px solid ${iocNextCyanPalette.alpha40}`,
          background: iocNextCyanPalette.alpha05,
          color: iocNextCyanPalette[700],
          "&.Mui-disabled": {
            opacity: 0.35,
            borderColor: glassHairline,
          },
          "&:hover": {
            borderColor: iocNextCyanPalette[500],
            backgroundColor: iocNextCyanPalette.alpha10,
            boxShadow: `0 0 12px ${iocNextCyanPalette.alpha20}`,
          },
        },
        "&.MuiButton-tertariary": {
          background: "none",
          color: iocNextCyanPalette[700],
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha10 },
        },
        "&.MuiButton-primaryNegative": {
          background: `linear-gradient(180deg, ${baseTheme.palette.vars.negativeBackgroundHover} 0%, ${baseTheme.palette.vars.negativeBackgroundDefault} 100%)`,
          color: "#ffffff",
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": {
            background: `linear-gradient(180deg, ${baseTheme.palette.vars.negativeBackgroundWeak ?? baseTheme.palette.vars.negativeBackgroundHover} 0%, ${baseTheme.palette.vars.negativeBackgroundHover} 100%)`,
            boxShadow: baseTheme.palette.vars.glowNegative,
          },
          "&:active": {
            background: baseTheme.palette.vars.negativeBackgroundActive,
          },
        },
        "&.MuiButton-outlinedNegative": {
          border: `1px solid ${baseTheme.palette.vars.negativeBorderDefault}`,
          background: "none",
          color: baseTheme.palette.vars.negativeTextDefault,
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": {
            border: `1px solid ${baseTheme.palette.vars.negativeBackgroundHover}`,
            color: baseTheme.palette.vars.negativeBackgroundHover,
          },
        },
        "&.MuiButton-tertariaryNegative": {
          background: "none",
          color: baseTheme.palette.vars.negativeTextDefault,
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": { color: baseTheme.palette.vars.negativeBackgroundHover },
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiInputLabel-outlined": {
          transform: "translate(12px, -9px) scale(1)",
        },
        "& .MuiInputLabel-filled": {
          transform: "translate(12px, 3px) scale(1)",
        },
        "& .MuiOutlinedInput-root": {
          backgroundColor: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          "& fieldset": { borderColor: glassHairline },
          "&:hover fieldset": { borderColor: "rgba(15,32,64,0.14)" },
          "&.Mui-focused fieldset": {
            borderColor: iocNextCyanPalette[500],
            boxShadow: `0 0 0 3px ${iocNextCyanPalette.alpha20}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: iocNextLightTextSecondary,
          "&.Mui-focused": { color: iocNextCyanPalette[700] },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backgroundImage:
          "radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.8) 0%, transparent 55%)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "none",
        borderRadius: "24px",
        boxShadow: `0 24px 80px rgba(15,32,64,0.2), ${glowPrimary}`,
      },
      backdrop: {
        backgroundColor: "rgba(15, 32, 64, 0.25)",
        backdropFilter: "blur(8px)",
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "none",
        boxShadow: "0 0 60px rgba(15,32,64,0.15)",
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: glassBlur,
        WebkitBackdropFilter: glassBlur,
        borderBottom: "none",
        boxShadow: "0 8px 32px rgba(15,32,64,0.08)",
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "none",
        borderRadius: "16px",
        boxShadow: "0 16px 48px rgba(15,32,64,0.16)",
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
        margin: "2px 8px",
        "&:hover": { backgroundColor: "rgba(15,32,64,0.04)" },
        "&.Mui-selected": {
          backgroundColor: iocNextCyanPalette.alpha10,
          boxShadow: `inset 0 0 0 1px ${iocNextCyanPalette.alpha20}`,
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha20 },
        },
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "rgba(35, 40, 46, 0.92)",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 8px 28px rgba(15,32,64,0.2)",
        color: "#FFFFFF",
        fontSize: "12px",
        fontWeight: 500,
        backdropFilter: "blur(20px)",
      },
      arrow: { color: "rgba(35, 40, 46, 0.92)" },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(15,32,64,0.05)",
        border: "none",
        borderRadius: "9999px",
        color: iocNextLightTextSecondary,
        "&:hover": { backgroundColor: "rgba(15,32,64,0.09)" },
      },
      colorPrimary: {
        backgroundColor: iocNextCyanPalette.alpha20,
        color: iocNextCyanPalette[700],
        border: "none",
        boxShadow: `0 0 10px ${iocNextCyanPalette.alpha20}`,
      },
      colorSecondary: {
        backgroundColor: "rgba(58,149,255,0.16)",
        color: iocNextBluePalette[600],
        border: "none",
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        "& .MuiSwitch-track": {
          backgroundColor: "rgba(15,32,64,0.18)",
          opacity: 1,
        },
        "& .Mui-checked + .MuiSwitch-track": {
          backgroundColor: iocNextCyanPalette[500],
          opacity: 1,
        },
        "& .MuiSwitch-thumb": {
          boxShadow: `0 0 8px ${iocNextCyanPalette.alpha40}`,
        },
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: { color: iocNextCyanPalette[500] },
      rail: { backgroundColor: "rgba(15,32,64,0.14)" },
      track: { border: "none" },
      thumb: {
        backgroundColor: "#fff",
        "&:hover, &.Mui-focusVisible": { boxShadow: glowPrimary },
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: {
        "& .MuiTabs-indicator": {
          backgroundColor: iocNextCyanPalette[500],
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
        color: iocNextLightTextSecondary,
        "&.Mui-selected": { color: iocNextCyanPalette[700] },
        transition: "all 0.15s ease",
      },
    },
    defaultProps: { loading: false, type: "main" } as any,
    variants: [
      {
        props: { type: "main" } as any,
        style: {
          ...baseTheme.typography.body1,
          fontWeight: baseTheme.typography.fontWeightSemiBold,
          minHeight: "44px",
          height: "44px",
          color: iocNextLightTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: "rgba(15,32,64,0.04)" },
          "&.Mui-selected": { color: iocNextCyanPalette[700] },
        },
      },
      {
        props: { type: "subTab" } as any,
        style: {
          ...baseTheme.typography.body2,
          fontWeight: baseTheme.typography.fontWeightSemiBold,
          minHeight: "40px",
          height: "40px",
          color: iocNextLightTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: "rgba(15,32,64,0.04)" },
          "&.Mui-selected": { color: iocNextCyanPalette[700] },
        },
      },
      {
        props: { type: "toggleTab" } as any,
        style: {
          ...baseTheme.typography.caption,
          fontWeight: baseTheme.typography.fontWeightSemiBold,
          minHeight: "34px",
          height: "34px",
          borderRadius: "9999px",
          padding: "0 18px",
          backgroundColor: "transparent",
          color: iocNextLightTextSecondary,
          "&:hover": { backgroundColor: "rgba(15,32,64,0.04)" },
          "&.Mui-selected": {
            backgroundColor: iocNextCyanPalette.alpha20,
            color: iocNextCyanPalette[700],
            boxShadow: `0 0 10px ${iocNextCyanPalette.alpha20}`,
          },
        },
      },
    ],
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: glassFill,
        backdropFilter: glassBlur,
        WebkitBackdropFilter: glassBlur,
        border: "none",
        borderRadius: "16px !important",
        marginBottom: "10px",
        boxShadow: glassDepth,
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: "0 0 10px 0" },
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: "12px 18px",
        minHeight: "unset",
        gap: "4px",
        "&.Mui-expanded": { minHeight: "unset" },
      },
      content: {
        margin: "0px",
        gap: "16px",
        "&.Mui-expanded": { margin: "0px" },
      },
    },
  },

  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        padding: "8px 18px 18px 18px",
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        backgroundColor: glassFillMedium,
        backdropFilter: "blur(20px)",
        border: "none",
        borderRadius: "14px",
        boxShadow: glassDepth,
      },
      standardSuccess: { borderLeft: `3px solid ${greenPalette[500]}` },
      standardError: { borderLeft: `3px solid ${redPalette[500]}` },
      standardWarning: { borderLeft: `3px solid ${lightOrangePalette[500]}` },
      standardInfo: { borderLeft: `3px solid ${iocNextCyanPalette[500]}` },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        backgroundColor: iocNextCyanPalette[500],
        color: "#FFFFFF",
        boxShadow: `0 0 8px ${iocNextCyanPalette.alpha40}`,
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(15,32,64,0.08)",
        border: "none",
        color: iocNextLightTextPrimary,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { borderColor: glassHairline },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        "&:hover": { backgroundColor: "rgba(15,32,64,0.04)" },
        "&.Mui-selected": {
          backgroundColor: iocNextCyanPalette.alpha10,
          boxShadow: `inset 3px 0 0 ${iocNextCyanPalette[500]}`,
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha20 },
        },
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: { backgroundColor: "rgba(15,32,64,0.06)" },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(15,32,64,0.08)",
        borderRadius: "9999px",
      },
      bar: { borderRadius: "9999px" },
      barColorPrimary: {
        backgroundColor: iocNextCyanPalette[500],
      },
    },
  },
};

const iocNextLightThemeOptions: ThemeOptions = {
  shadows: iocNextLightShadows,
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
    ...iocNextLightComponentOverrides,
  },
};

export const iocNextLightTheme: Theme = createTheme(
  baseTheme,
  iocNextLightThemeOptions,
);
