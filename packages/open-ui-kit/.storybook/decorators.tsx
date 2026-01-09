import "./css/typography.css";

import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { darkTheme } from "../src/theme/dark/dark-theme";
import { lightTheme } from "../src/theme/light/light-theme";
import { glassTheme } from "../src/theme/glass/glass-theme";
import { glassLightTheme } from "../src/theme/glass/glass-light-theme";
import { glassAuroraBackground } from "../src/theme/glass/glass-color-palette";
import { glassLightAuroraBackground } from "../src/theme/glass/glass-light-color-palette";
import { Decorator } from "@storybook/react";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";

// Theme map for easy switching
const themes = {
  light: lightTheme,
  dark: darkTheme,
  glass: glassTheme,
  "glass-light": glassLightTheme,
};

// Background colors for each theme mode
const themeBackgrounds: Record<string, string> = {
  light: "#EFF3FC",
  dark: "#00142B",
  glass: glassAuroraBackground,
  "glass-light": glassLightAuroraBackground,
};

// Themes that need special glass styling
const isGlassTheme = (mode: string) => mode === "glass" || mode === "glass-light";

const ThemeDecorator: Decorator = (Story, context) => {
  const isDark = useDarkMode();
  // Check for theme in globals or use dark mode toggle as fallback
  const themeMode = context.globals?.theme || (isDark ? "dark" : "light");
  const theme =
    themes[themeMode as keyof typeof themes] ||
    (isDark ? darkTheme : lightTheme);
  const background = themeBackgrounds[themeMode] || themeBackgrounds.light;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: background,
          backgroundAttachment: isGlassTheme(themeMode) ? "fixed" : undefined,
          p: 2,
        }}
      >
        <Story />
      </Box>
    </ThemeProvider>
  );
};

export { ThemeDecorator, themes };
