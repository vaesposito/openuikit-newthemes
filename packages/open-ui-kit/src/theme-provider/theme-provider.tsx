/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@mui/material";
import { darkTheme } from "@/theme/dark/dark-theme";
import { lightTheme } from "@/theme/light/light-theme";
import { glassTheme } from "@/theme/glass/glass-theme";
import { glassLightTheme } from "@/theme/glass/glass-light-theme";

export type ThemeMode = "light" | "dark" | "glass" | "glass-light";

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * @deprecated Use `mode` prop instead. Will be removed in future versions.
   */
  isDarkMode?: boolean;
  /**
   * Theme mode to use: "light", "dark", "glass" (dark), or "glass-light"
   * When provided, takes precedence over isDarkMode
   */
  mode?: ThemeMode;
  /**
   * Custom theme to override the default themes
   */
  customTheme?: Theme;
}

const getTheme = (mode: ThemeMode): Theme => {
  switch (mode) {
    case "glass":
      return glassTheme;
    case "glass-light":
      return glassLightTheme;
    case "dark":
      return darkTheme;
    case "light":
    default:
      return lightTheme;
  }
};

export const ThemeProvider = ({
  children,
  isDarkMode = false,
  mode,
  customTheme,
}: ThemeProviderProps) => {
  // Determine the theme to use
  const resolvedMode: ThemeMode = mode ?? (isDarkMode ? "dark" : "light");
  const theme = customTheme ?? getTheme(resolvedMode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

// Export individual themes for direct usage
export { lightTheme, darkTheme, glassTheme, glassLightTheme };
