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
import { iocNextLightVars } from "./ioc-next-light-vars";
import {
  iocNextCyanPalette,
  iocNextBluePalette,
} from "./ioc-next-color-palette";
import {
  iocNextLightSurfacePalette,
  iocNextLightBorderPalette,
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

export const iocNextLightShadows: Shadows = [
  "none",
  iocNextLightShadowSm,
  iocNextLightShadowMd,
  iocNextLightShadowLg,
  iocNextLightShadowLg,
  iocNextLightShadowLg,
  ...Array(19).fill("none"),
] as Shadows;

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
    paper: "#FFFFFF",
    default: iocNextLightSurfacePalette[100],
  },
  divider: iocNextLightBorderPalette[300],
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

const iocNextLightComponentOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollbarWidth: "thin",
        scrollbarColor: `${iocNextLightBorderPalette[300]} ${iocNextLightSurfacePalette[200]}`,
      },
      body: {
        background: iocNextLightPageBackground,
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      },
      ".osd-view-switcher-option": {
        backgroundColor: `${iocNextLightSurfacePalette[50]} !important`,
        borderColor: `${iocNextLightBorderPalette[300]} !important`,
        color: `${iocNextLightTextSecondary} !important`,
        "&:hover": {
          backgroundColor: `${iocNextLightSurfacePalette[200]} !important`,
          color: `${iocNextLightTextPrimary} !important`,
        },
      },
      ".osd-view-switcher-option-selected": {
        backgroundColor: `${iocNextLightSurfacePalette[300]} !important`,
        borderColor: `${iocNextCyanPalette.alpha20} !important`,
        color: `${iocNextLightTextPrimary} !important`,
      },
      "*::-webkit-scrollbar": { width: "8px", height: "8px" },
      "*::-webkit-scrollbar-track": {
        backgroundColor: iocNextLightSurfacePalette[200],
        borderRadius: 4,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: iocNextLightBorderPalette[300],
        borderRadius: 4,
        border: "2px solid transparent",
        backgroundClip: "content-box",
        "&:hover": { backgroundColor: iocNextLightBorderPalette[400] },
      },
      "::selection": {
        backgroundColor: iocNextCyanPalette.alpha20,
        color: iocNextLightTextPrimary,
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
        border: `1px solid ${iocNextLightBorderPalette[200]}`,
        borderRadius: "10px",
        boxShadow: iocNextLightShadowSm,
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
        boxShadow: iocNextLightShadowSm,
      },
      elevation2: {
        backgroundColor: iocNextLightSurfacePalette[50],
        boxShadow: iocNextLightShadowMd,
      },
      elevation3: {
        backgroundColor: iocNextLightSurfacePalette[100],
        boxShadow: iocNextLightShadowLg,
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
          background: `linear-gradient(180deg, ${iocNextCyanPalette[400]} 0%, ${iocNextCyanPalette[600]} 100%)`,
          color: "#FFFFFF",
          "&.Mui-disabled": { opacity: 0.4 },
          "&:hover": {
            background: `linear-gradient(180deg, ${iocNextCyanPalette[300]} 0%, ${iocNextCyanPalette[500]} 100%)`,
            boxShadow: `0 4px 16px ${iocNextCyanPalette.alpha20}`,
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
            boxShadow: "0 4px 16px rgba(58,149,255,0.25)",
          },
          "&:active": {
            background: `linear-gradient(180deg, ${iocNextBluePalette[600]} 0%, #1560c0 100%)`,
          },
        },
        "&.MuiButton-outlined": {
          border: `2px solid ${iocNextLightBorderPalette[400]}`,
          background: "none",
          color: iocNextCyanPalette[600],
          "&.Mui-disabled": {
            opacity: 0.35,
            borderColor: iocNextLightBorderPalette[200],
          },
          "&:hover": {
            borderColor: iocNextCyanPalette[500],
            backgroundColor: iocNextCyanPalette.alpha05,
          },
        },
        "&.MuiButton-tertariary": {
          background: "none",
          color: iocNextCyanPalette[600],
          "&.Mui-disabled": { opacity: 0.35 },
          "&:hover": { backgroundColor: iocNextCyanPalette.alpha05 },
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
          "& fieldset": { borderColor: iocNextLightBorderPalette[300] },
          "&:hover fieldset": { borderColor: iocNextLightBorderPalette[400] },
          "&.Mui-focused fieldset": {
            borderColor: iocNextCyanPalette[500],
            boxShadow: `0 0 0 3px ${iocNextCyanPalette.alpha10}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: iocNextLightTextSecondary,
          "&.Mui-focused": { color: iocNextCyanPalette[600] },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: "#FFFFFF",
        border: `1px solid ${iocNextLightBorderPalette[300]}`,
        borderRadius: "14px",
        boxShadow: iocNextLightShadowLg,
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: iocNextLightSurfacePalette[50],
        borderRight: `1px solid ${iocNextLightBorderPalette[300]}`,
        boxShadow: iocNextLightShadowLg,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid ${iocNextLightBorderPalette[300]}`,
        boxShadow: iocNextLightShadowSm,
        color: iocNextLightTextPrimary,
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: "#FFFFFF",
        border: `1px solid ${iocNextLightBorderPalette[300]}`,
        borderRadius: "10px",
        boxShadow: iocNextLightShadowLg,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        margin: "2px 6px",
        "&:hover": { backgroundColor: iocNextLightSurfacePalette[200] },
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
        backgroundColor: iocNextLightTextPrimary,
        border: "none",
        borderRadius: "6px",
        boxShadow: iocNextLightShadowMd,
        color: "#FFFFFF",
        fontSize: "12px",
        fontWeight: 500,
      },
      arrow: { color: iocNextLightTextPrimary },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextLightSurfacePalette[200],
        border: `1px solid ${iocNextLightBorderPalette[300]}`,
        color: iocNextLightTextSecondary,
        "&:hover": { backgroundColor: iocNextLightSurfacePalette[300] },
      },
      colorPrimary: {
        backgroundColor: iocNextCyanPalette[500],
        color: "#FFFFFF",
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
          backgroundColor: iocNextLightBorderPalette[400],
          opacity: 1,
        },
        "& .Mui-checked + .MuiSwitch-track": {
          backgroundColor: iocNextCyanPalette[500],
          opacity: 1,
        },
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      root: { color: iocNextCyanPalette[500] },
      rail: { backgroundColor: iocNextLightSurfacePalette[400] },
      thumb: {
        backgroundColor: "#fff",
        border: `2px solid ${iocNextCyanPalette[500]}`,
        "&:hover, &.Mui-focusVisible": {
          boxShadow: `0 0 0 8px ${iocNextCyanPalette.alpha10}`,
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
        color: iocNextLightTextSecondary,
        "&.Mui-selected": { color: iocNextCyanPalette[600] },
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
          color: iocNextLightTextSecondary,
          padding: "8px 24px",
          "&:hover": { backgroundColor: iocNextLightSurfacePalette[200] },
          "&.Mui-selected": { color: iocNextCyanPalette[600] },
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
          "&:hover": { backgroundColor: iocNextLightSurfacePalette[200] },
          "&.Mui-selected": { color: iocNextCyanPalette[600] },
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
          color: iocNextLightTextSecondary,
          "&:hover": { backgroundColor: iocNextLightSurfacePalette[200] },
          "&.Mui-selected": {
            backgroundColor: iocNextLightSurfacePalette[400],
            color: iocNextCyanPalette[600],
          },
        },
      },
    ],
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFFFF",
        border: `1px solid ${iocNextLightBorderPalette[300]}`,
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
        backgroundColor: iocNextLightSurfacePalette[100],
        border: `1px solid ${iocNextLightBorderPalette[300]}`,
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
        color: "#FFFFFF",
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextLightSurfacePalette[300],
        border: `2px solid ${iocNextLightBorderPalette[300]}`,
        color: iocNextLightTextPrimary,
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: { borderColor: iocNextLightBorderPalette[300] },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        "&:hover": { backgroundColor: iocNextLightSurfacePalette[200] },
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
      root: { backgroundColor: iocNextLightSurfacePalette[300] },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: iocNextLightSurfacePalette[300],
        borderRadius: "4px",
      },
      bar: { borderRadius: "4px" },
      barColorPrimary: { backgroundColor: iocNextCyanPalette[500] },
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
