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
import { iocNextVars } from "./ioc-next-vars";
import {
  iocNextCyanPalette,
  iocNextBluePalette,
  iocNextSurfacePalette,
  iocNextBackdropPalette,
  iocNextBorderPalette,
  iocNextTextPrimary,
  iocNextTextSecondary,
  iocNextTextDisabled,
  iocNextPageBackground,
  iocNextBackdropBlur,
  iocNextShadowSm,
  iocNextShadowMd,
  iocNextShadowLg,
} from "./ioc-next-color-palette";
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

export const iocNextShadows: Shadows = [
  "none",
  iocNextShadowSm,
  iocNextShadowMd,
  iocNextShadowLg,
  iocNextShadowLg,
  iocNextShadowLg,
  ...Array(19).fill("none"),
] as Shadows;

const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    ...iocNextCyanPalette,
    main: iocNextCyanPalette[500],
    light: iocNextCyanPalette[300],
    dark: iocNextCyanPalette[700],
    contrastText: iocNextBackdropPalette[900],
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
  vars: iocNextVars,
  text: {
    primary: iocNextTextPrimary,
    secondary: iocNextTextSecondary,
    disabled: iocNextTextDisabled,
  },
  background: {
    paper: iocNextSurfacePalette[50],
    default: iocNextBackdropPalette[700],
  },
  action: {
    hoverOpacity: 0.08,
    selectedOpacity: 0.14,
    focusOpacity: 0.1,
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

// IoC (OXP) specific component overrides
const iocNextComponentOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: `${iocNextSurfacePalette[300]} ${iocNextBackdropPalette[800]}`,
      },
      body: {
        background: iocNextPageBackground,
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      },
      ".osd-view-switcher-option": {
        backgroundColor: `${iocNextSurfacePalette[100]} !important`,
        borderColor: `${iocNextBorderPalette[200]} !important`,
        color: `${iocNextTextSecondary} !important`,
        "&:hover": {
          backgroundColor: `${iocNextSurfacePalette[300]} !important`,
          color: `${iocNextTextPrimary} !important`,
        },
      },
      ".osd-view-switcher-option-selected": {
        backgroundColor: `${iocNextSurfacePalette[500]} !important`,
        borderColor: `${iocNextCyanPalette.alpha20} !important`,
        color: `${iocNextTextPrimary} !important`,
      },
      "*::-webkit-scrollbar": { width: "8px", height: "8px" },
      "*::-webkit-scrollbar-track": {
        backgroundColor: iocNextBackdropPalette[800],
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: iocNextSurfacePalette[300],
        borderRadius: 4,
        border: "2px solid transparent",
        backgroundClip: "content-box",
        "&:hover": { backgroundColor: iocNextSurfacePalette[400] },
      },
      "::selection": {
        backgroundColor: iocNextCyanPalette.alpha20,
        color: "#ffffff",
      },
    },
  },

  // Table cells: transparent so rows read against the solid navy card surface
  MuiTableCell: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent !important",
      },
    },
  },

  // Cards: solid navy surface with a subtle blue border
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextSurfacePalette[50],
        backgroundImage: "none",
        backdropFilter: iocNextBackdropBlur,
        border: `1px solid ${iocNextBorderPalette[200]}`,
        borderRadius: "10px",
        boxShadow: "none",
        position: "relative" as const,
        padding: "16px",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backgroundColor: iocNextSurfacePalette[50],
        backdropFilter: iocNextBackdropBlur,
      },
      elevation1: {
        backgroundColor: iocNextSurfacePalette[50],
        backdropFilter: iocNextBackdropBlur,
        boxShadow: iocNextShadowSm,
      },
      elevation2: {
        backgroundColor: iocNextSurfacePalette[100],
        backdropFilter: iocNextBackdropBlur,
        boxShadow: iocNextShadowMd,
      },
      elevation3: {
        backgroundColor: iocNextSurfacePalette[200],
        backdropFilter: iocNextBackdropBlur,
        boxShadow: iocNextShadowLg,
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
        borderRadius: "8px",
        fontWeight: 600,
        transition: "all 0.18s ease",
        color: baseTheme.palette.vars.baseTextInverse,
        "& .MuiButton-startIcon": { marginLeft: 0 },
        "& .MuiButton-endIcon": { marginRight: 0 },
        "&.MuiButton-sizeLarge": {
          ...baseTheme.typography.subtitle1,
          height: "40px",
        },
        "&.MuiButton-sizeMedium": {
          ...baseTheme.typography.subtitle2,
          height: "32px",
        },
        "&.MuiButton-sizeSmall": {
          ...baseTheme.typography.subtitle2,
          height: "24px",
          padding: "2px 12px",
        },
        "&.MuiButton-primarySizeLarge, &.MuiButton-primarySizeMedium": {
          paddingRight: "16px",
          paddingLeft: "16px",
        },
        "&.MuiButton-primary": {
          background: `linear-gradient(180deg, ${iocNextCyanPalette[400]} 0%, ${iocNextCyanPalette[600]} 100%)`,
          color: iocNextBackdropPalette[900],
          "&.Mui-disabled": { opacity: 0.4 },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocNextCyanPalette[300]} 0%, ${iocNextCyanPalette[500]} 100%)`,
            boxShadow: `0 0 16px ${iocNextCyanPalette.alpha20}`,
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocNextCyanPalette[500]} 0%, ${iocNextCyanPalette[700]} 100%)`,
          },
        },
        "&.MuiButton-secondary": {
          background: `linear-gradient(180deg, ${iocNextBluePalette[500]} 0%, ${iocNextBluePalette[600]} 100%)`,
          color: "#ffffff",
          "&.Mui-disabled": { opacity: 0.4 },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocNextBluePalette[400]} 0%, ${iocNextBluePalette[500]} 100%)`,
            boxShadow: "0 0 16px rgba(58,149,255,0.25)",
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocNextBluePalette[600]} 0%, #1560c0 100%)`,
          },
        },
        "&.MuiButton-outlined": {
          border: `2px solid ${iocNextBorderPalette[300]}`,
          background: "none",
          color: iocNextCyanPalette[400],
          "&.Mui-disabled": {
            opacity: 0.35,
            borderColor: iocNextBorderPalette[200],
          },
          "&:hover": {
            borderColor: iocNextCyanPalette[500],
            backgroundColor: iocNextCyanPalette.alpha05,
          },
        },
        "&.MuiButton-tertariary": {
          background: "none",
          color: iocNextCyanPalette[400],
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha05 },
        },
        "&.MuiButton-primaryNegative": {
          background: `linear-gradient(180deg, ${baseTheme.palette.vars.negativeBackgroundHover} 0%, ${baseTheme.palette.vars.negativeBackgroundDefault} 100%)`,
          color: "#ffffff",
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": {
            background: `linear-gradient(180deg, ${baseTheme.palette.vars.negativeBackgroundWeak ?? baseTheme.palette.vars.negativeBackgroundHover} 0%, ${baseTheme.palette.vars.negativeBackgroundHover} 100%)`,
          },
          "&:active": {
            background: baseTheme.palette.vars.negativeBackgroundActive,
          },
        },
        "&.MuiButton-outlinedNegative": {
          border: `2px solid ${baseTheme.palette.vars.negativeBorderDefault}`,
          background: "none",
          color: baseTheme.palette.vars.negativeTextDefault,
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": {
            border: `2px solid ${baseTheme.palette.vars.negativeBackgroundHover}`,
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
          backgroundColor: iocNextSurfacePalette[50],
          backdropFilter: "blur(12px)",
          borderRadius: "8px",
          "& fieldset": { borderColor: iocNextBorderPalette[300] },
          "&:hover fieldset": { borderColor: iocNextBorderPalette[400] },
          "&.Mui-focused fieldset": {
            borderColor: iocNextCyanPalette[500],
            boxShadow: `0 0 0 3px ${iocNextCyanPalette.alpha10}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: iocNextTextSecondary,
          "&.Mui-focused": { color: iocNextCyanPalette[400] },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: iocNextBackdropPalette[400],
        backdropFilter: iocNextBackdropBlur,
        border: `1px solid ${iocNextBorderPalette[300]}`,
        borderRadius: "14px",
        boxShadow: iocNextShadowLg,
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
        backgroundColor: iocNextBackdropPalette[500],
        backdropFilter: iocNextBackdropBlur,
        borderRight: `1px solid ${iocNextBorderPalette[200]}`,
        boxShadow: iocNextShadowLg,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextBackdropPalette[600],
        backdropFilter: iocNextBackdropBlur,
        borderBottom: `1px solid ${iocNextBorderPalette[200]}`,
        boxShadow: "none",
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: iocNextBackdropPalette[400],
        backdropFilter: iocNextBackdropBlur,
        border: `1px solid ${iocNextBorderPalette[300]}`,
        borderRadius: "10px",
        boxShadow: iocNextShadowLg,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        margin: "2px 6px",
        "&:hover": { backgroundColor: iocNextSurfacePalette[200] },
        "&.Mui-selected": {
          backgroundColor: iocNextCyanPalette.alpha10,
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha20 },
        },
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: iocNextBackdropPalette[300],
        border: `1px solid ${iocNextBorderPalette[300]}`,
        borderRadius: "6px",
        boxShadow: iocNextShadowMd,
        color: iocNextTextPrimary,
        fontSize: "12px",
        fontWeight: 500,
        backdropFilter: "blur(16px)",
      },
      arrow: { color: iocNextBackdropPalette[300] },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextSurfacePalette[200],
        border: `1px solid ${iocNextBorderPalette[200]}`,
        color: iocNextTextSecondary,
        "&:hover": { backgroundColor: iocNextSurfacePalette[300] },
      },
      colorPrimary: {
        backgroundColor: iocNextCyanPalette[500],
        color: iocNextBackdropPalette[900],
        border: "none",
      },
      colorSecondary: {
        backgroundColor: iocNextBluePalette[500],
        color: "#fff",
        border: "none",
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        "& .MuiSwitch-track": {
          backgroundColor: iocNextSurfacePalette[400],
          opacity: 1,
        },
        "& .Mui-checked + .MuiSwitch-track": {
          backgroundColor: iocNextCyanPalette[600],
          opacity: 1,
        },
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: { color: iocNextCyanPalette[500] },
      rail: { backgroundColor: iocNextSurfacePalette[300] },
      thumb: {
        backgroundColor: "#fff",
        "&:hover, &.Mui-focusVisible": {
          boxShadow: `0 0 16px ${iocNextCyanPalette.alpha20}`,
        },
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
        color: iocNextTextSecondary,
        "&.Mui-selected": { color: iocNextCyanPalette[400] },
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
          minHeight: "42px",
          height: "42px",
          color: iocNextTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: iocNextSurfacePalette[200] },
          "&.Mui-selected": { color: iocNextCyanPalette[400] },
        },
      },
      {
        props: { type: "subTab" } as any,
        style: {
          ...baseTheme.typography.body2,
          fontWeight: baseTheme.typography.fontWeightSemiBold,
          minHeight: "40px",
          height: "40px",
          color: iocNextTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: iocNextSurfacePalette[200] },
          "&.Mui-selected": { color: iocNextCyanPalette[400] },
        },
      },
      {
        props: { type: "toggleTab" } as any,
        style: {
          ...baseTheme.typography.caption,
          fontWeight: baseTheme.typography.fontWeightSemiBold,
          minHeight: "32px",
          height: "32px",
          borderRadius: "20px",
          padding: "0 16px",
          backgroundColor: "transparent",
          color: iocNextTextSecondary,
          "&:hover": { backgroundColor: iocNextSurfacePalette[200] },
          "&.Mui-selected": {
            backgroundColor: iocNextSurfacePalette[500],
            color: iocNextCyanPalette[400],
          },
        },
      },
    ],
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextSurfacePalette[50],
        border: `1px solid ${iocNextBorderPalette[200]}`,
        borderRadius: "10px !important",
        marginBottom: "8px",
        boxShadow: "none",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: "0 0 8px 0" },
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        padding: "12px 16px",
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
        padding: "12px 16px 16px 16px",
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextSurfacePalette[200],
        backdropFilter: "blur(12px)",
        border: `1px solid ${iocNextBorderPalette[200]}`,
        borderRadius: "10px",
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
        borderLeftColor: iocNextCyanPalette[500],
        borderLeftWidth: "4px",
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        backgroundColor: iocNextCyanPalette[500],
        color: iocNextBackdropPalette[900],
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextSurfacePalette[300],
        border: `2px solid ${iocNextBorderPalette[300]}`,
        color: iocNextTextPrimary,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { borderColor: iocNextBorderPalette[200] },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": { backgroundColor: iocNextSurfacePalette[200] },
        "&.Mui-selected": {
          backgroundColor: iocNextCyanPalette.alpha10,
          borderLeft: `3px solid ${iocNextCyanPalette[500]}`,
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha20 },
        },
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: { backgroundColor: iocNextSurfacePalette[200] },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextSurfacePalette[200],
        borderRadius: "4px",
      },
      bar: { borderRadius: "4px" },
      barColorPrimary: { backgroundColor: iocNextCyanPalette[500] },
    },
  },
};

const iocNextThemeOptions: ThemeOptions = {
  shadows: iocNextShadows,
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
    // IoC (OXP) specific overrides
    ...iocNextComponentOverrides,
  },
};

export const iocNextTheme: Theme = createTheme(baseTheme, iocNextThemeOptions);
