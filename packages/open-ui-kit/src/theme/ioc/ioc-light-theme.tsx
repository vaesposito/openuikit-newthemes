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
import { iocLightVars } from "./ioc-light-vars";
import { iocTealPalette, iocBluePalette } from "./ioc-color-palette";
import {
  iocLightSurfacePalette,
  iocLightBorderPalette,
  iocLightTextPrimary,
  iocLightTextSecondary,
  iocLightTextDisabled,
  iocLightPageBackground,
  iocLightShadowSm,
  iocLightShadowMd,
  iocLightShadowLg,
} from "./ioc-light-color-palette";
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

export const iocLightShadows: Shadows = [
  "none",
  iocLightShadowSm,
  iocLightShadowMd,
  iocLightShadowLg,
  iocLightShadowLg,
  iocLightShadowLg,
  ...Array(19).fill("none"),
] as Shadows;

const palette: PaletteOptions = {
  mode: "light",
  primary: {
    ...iocTealPalette,
    main: iocTealPalette[500],
    light: iocTealPalette[400],
    dark: iocTealPalette[700],
    contrastText: "#FFFFFF",
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
  vars: iocLightVars,
  text: {
    primary: iocLightTextPrimary,
    secondary: iocLightTextSecondary,
    disabled: iocLightTextDisabled,
  },
  background: {
    paper: "#FFFFFF",
    default: iocLightSurfacePalette[100],
  },
  divider: iocLightBorderPalette[300],
  action: {
    hoverOpacity: 0.06,
    selectedOpacity: 0.1,
    focusOpacity: 0.08,
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

const iocLightComponentOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: `${iocLightBorderPalette[300]} ${iocLightSurfacePalette[200]}`,
      },
      body: {
        background: iocLightPageBackground,
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      },
      ".osd-view-switcher-option": {
        backgroundColor: `${iocLightSurfacePalette[50]} !important`,
        borderColor: `${iocLightBorderPalette[300]} !important`,
        color: `${iocLightTextSecondary} !important`,
        "&:hover": {
          backgroundColor: `${iocLightSurfacePalette[200]} !important`,
          color: `${iocLightTextPrimary} !important`,
        },
      },
      ".osd-view-switcher-option-selected": {
        backgroundColor: `${iocLightSurfacePalette[300]} !important`,
        borderColor: `${iocTealPalette.alpha20} !important`,
        color: `${iocLightTextPrimary} !important`,
      },
      "*::-webkit-scrollbar": { width: "8px", height: "8px" },
      "*::-webkit-scrollbar-track": {
        backgroundColor: iocLightSurfacePalette[200],
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: iocLightBorderPalette[300],
        borderRadius: 4,
        border: "2px solid transparent",
        backgroundClip: "content-box",
        "&:hover": { backgroundColor: iocLightBorderPalette[400] },
      },
      "::selection": {
        backgroundColor: iocTealPalette.alpha20,
        color: iocLightTextPrimary,
      },
    },
  },

  // Table cells: transparent so they match the card surface
  MuiTableCell: {
    styleOverrides: {
      root: {
        backgroundColor: "transparent !important",
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(255,255,255,0.82)",
        backgroundImage: "none",
        backdropFilter: "blur(16px)",
        border: `1px solid ${iocLightBorderPalette[200]}`,
        borderRadius: "10px",
        boxShadow: iocLightShadowSm,
        position: "relative" as const,
        padding: "16px",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(16px)",
      },
      elevation1: {
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(16px)",
        boxShadow: iocLightShadowSm,
      },
      elevation2: {
        backgroundColor: iocLightSurfacePalette[50],
        boxShadow: iocLightShadowMd,
      },
      elevation3: {
        backgroundColor: iocLightSurfacePalette[100],
        boxShadow: iocLightShadowLg,
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
          background: `linear-gradient(180deg, ${iocTealPalette[400]} 0%, ${iocTealPalette[600]} 100%)`,
          color: "#FFFFFF",
          "&.Mui-disabled": { opacity: 0.4 },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocTealPalette[300]} 0%, ${iocTealPalette[500]} 100%)`,
            boxShadow: `0 4px 16px ${iocTealPalette.alpha20}`,
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocTealPalette[500]} 0%, ${iocTealPalette[700]} 100%)`,
          },
        },
        "&.MuiButton-secondary": {
          background: `linear-gradient(180deg, ${iocBluePalette[500]} 0%, ${iocBluePalette[600]} 100%)`,
          color: "#ffffff",
          "&.Mui-disabled": { opacity: 0.4 },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocBluePalette[400]} 0%, ${iocBluePalette[500]} 100%)`,
            boxShadow: "0 4px 16px rgba(43,130,246,0.25)",
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocBluePalette[600]} 0%, #1560c0 100%)`,
          },
        },
        "&.MuiButton-outlined": {
          border: `2px solid ${iocLightBorderPalette[400]}`,
          background: "none",
          color: iocTealPalette[600],
          "&.Mui-disabled": {
            opacity: 0.35,
            borderColor: iocLightBorderPalette[200],
          },
          "&:hover": {
            borderColor: iocTealPalette[500],
            backgroundColor: iocTealPalette.alpha05,
          },
        },
        "&.MuiButton-tertariary": {
          background: "none",
          color: iocTealPalette[600],
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": { backgroundColor: iocTealPalette.alpha05 },
        },
        "&.MuiButton-primaryNegative": {
          background: `linear-gradient(180deg, ${redPalette[400]} 0%, ${redPalette[500]} 100%)`,
          color: "#ffffff",
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": {
            background: `linear-gradient(180deg, ${redPalette[300]} 0%, ${redPalette[400]} 100%)`,
          },
          "&:active": { background: redPalette[600] },
        },
        "&.MuiButton-outlinedNegative": {
          border: `2px solid ${redPalette[500]}`,
          background: "none",
          color: redPalette[600],
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": {
            border: `2px solid ${redPalette[600]}`,
            color: redPalette[700],
          },
        },
        "&.MuiButton-tertariaryNegative": {
          background: "none",
          color: redPalette[600],
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": { color: redPalette[700] },
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
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          "& fieldset": { borderColor: iocLightBorderPalette[300] },
          "&:hover fieldset": { borderColor: iocLightBorderPalette[400] },
          "&.Mui-focused fieldset": {
            borderColor: iocTealPalette[500],
            boxShadow: `0 0 0 3px ${iocTealPalette.alpha10}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: iocLightTextSecondary,
          "&.Mui-focused": { color: iocTealPalette[600] },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: "#FFFFFF",
        border: `1px solid ${iocLightBorderPalette[300]}`,
        borderRadius: "14px",
        boxShadow: iocLightShadowLg,
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: iocLightSurfacePalette[50],
        borderRight: `1px solid ${iocLightBorderPalette[300]}`,
        boxShadow: iocLightShadowLg,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid ${iocLightBorderPalette[300]}`,
        boxShadow: iocLightShadowSm,
        color: iocLightTextPrimary,
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: "#FFFFFF",
        border: `1px solid ${iocLightBorderPalette[300]}`,
        borderRadius: "10px",
        boxShadow: iocLightShadowLg,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        margin: "2px 6px",
        "&:hover": { backgroundColor: iocLightSurfacePalette[200] },
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
        backgroundColor: iocLightTextPrimary,
        border: "none",
        borderRadius: "6px",
        boxShadow: iocLightShadowMd,
        color: "#FFFFFF",
        fontSize: "12px",
        fontWeight: 500,
      },
      arrow: { color: iocLightTextPrimary },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: iocLightSurfacePalette[200],
        border: `1px solid ${iocLightBorderPalette[300]}`,
        color: iocLightTextSecondary,
        "&:hover": { backgroundColor: iocLightSurfacePalette[300] },
      },
      colorPrimary: {
        backgroundColor: iocTealPalette[500],
        color: "#FFFFFF",
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
        "& .MuiSwitch-track": {
          backgroundColor: iocLightBorderPalette[400],
          opacity: 1,
        },
        "& .Mui-checked + .MuiSwitch-track": {
          backgroundColor: iocTealPalette[500],
          opacity: 1,
        },
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: { color: iocTealPalette[500] },
      rail: { backgroundColor: iocLightSurfacePalette[400] },
      thumb: {
        backgroundColor: "#fff",
        border: `2px solid ${iocTealPalette[500]}`,
        "&:hover, &.Mui-focusVisible": {
          boxShadow: `0 0 0 8px ${iocTealPalette.alpha10}`,
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
        color: iocLightTextSecondary,
        "&.Mui-selected": { color: iocTealPalette[600] },
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
          color: iocLightTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: iocLightSurfacePalette[200] },
          "&.Mui-selected": { color: iocTealPalette[600] },
        },
      },
      {
        props: { type: "subTab" } as any,
        style: {
          ...baseTheme.typography.body2,
          fontWeight: baseTheme.typography.fontWeightSemiBold,
          minHeight: "40px",
          height: "40px",
          color: iocLightTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: iocLightSurfacePalette[200] },
          "&.Mui-selected": { color: iocTealPalette[600] },
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
          color: iocLightTextSecondary,
          "&:hover": { backgroundColor: iocLightSurfacePalette[200] },
          "&.Mui-selected": {
            backgroundColor: iocLightSurfacePalette[400],
            color: iocTealPalette[600],
          },
        },
      },
    ],
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFFFF",
        border: `1px solid ${iocLightBorderPalette[300]}`,
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
        backgroundColor: iocLightSurfacePalette[100],
        border: `1px solid ${iocLightBorderPalette[300]}`,
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
        borderLeftColor: iocTealPalette[500],
        borderLeftWidth: "4px",
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        backgroundColor: iocTealPalette[500],
        color: "#FFFFFF",
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: iocLightSurfacePalette[300],
        border: `2px solid ${iocLightBorderPalette[300]}`,
        color: iocLightTextPrimary,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { borderColor: iocLightBorderPalette[300] },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": { backgroundColor: iocLightSurfacePalette[200] },
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
      root: { backgroundColor: iocLightSurfacePalette[300] },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: iocLightSurfacePalette[300],
        borderRadius: "4px",
      },
      bar: { borderRadius: "4px" },
      barColorPrimary: { backgroundColor: iocTealPalette[500] },
    },
  },
};

const iocLightThemeOptions: ThemeOptions = {
  shadows: iocLightShadows,
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
    ...iocLightComponentOverrides,
  },
};

export const iocLightTheme: Theme = createTheme(
  baseTheme,
  iocLightThemeOptions,
);
