/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import "./typography.css";
import "./types/theme";

export * from "./templates";
export * from "./components";
export * from "./charts";
export * as Icons from "./custom-icons";
export * from "./custom-illustrations";
export * from "./common";
export * from "./common/utils";
export { OS_LIGHT_COLORS } from "./theme/color-palette";
export { gradientsPalette } from "./theme/gradients";
export {
  ThemeProvider,
  lightTheme,
  darkTheme,
  glassTheme,
  glassLightTheme,
} from "./theme-provider/theme-provider";

// Glass theme exports (dark)
export * from "./theme/glass/glass-color-palette";
export { glassVars } from "./theme/glass/glass-vars";

// Glass light theme exports
export * from "./theme/glass/glass-light-color-palette";
export { glassLightVars } from "./theme/glass/glass-light-vars";

export type { GradientsPalette, Gradient } from "./types/palette";
export type {
  ThemeProviderProps,
  ThemeMode,
} from "./theme-provider/theme-provider";
export * from "./types/select-tree";
