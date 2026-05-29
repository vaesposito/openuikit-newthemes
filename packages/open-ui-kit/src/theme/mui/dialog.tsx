/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Components, Theme } from "@mui/material";

export const dialogComponent = (theme: Theme): Components => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          background: theme.palette.vars.controlBackgroundDefault,
          // Scope dialog-specific padding to dialog papers only
          "&.MuiDialog-paper": {
            padding: "24px",
          },
          "&.MuiDialog-paperWidthMd": {
            maxWidth: "480px",
          },
          "&.MuiDialog-paperWidthLg": {
            maxWidth: "720px",
          },
          "&.MuiDialog-paperWidthXl": {
            maxWidth: "1200px",
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "8px 0 0 0",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "20px 0 0 0",
          gap: "8px",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          color: theme.palette.vars.baseTextDefault,
        },
      },
    },
  };
};
