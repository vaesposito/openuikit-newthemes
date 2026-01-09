/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Dark Glass Theme
export { glassTheme } from "./glass-theme";
export { glassVars } from "./glass-vars";
export * from "./glass-color-palette";

// Light Glass Theme
export { glassLightTheme } from "./glass-light-theme";
export { glassLightVars } from "./glass-light-vars";
export * from "./glass-light-color-palette";

// Convenient re-exports for dark background presets
export {
  glassBackgroundPresets,
  glassAuroraBackground,
  glassMeshBackground,
  glassCosmicBackground,
  glassVibrantAurora,
  glassSunsetAurora,
  glassOceanDepth,
  glassNebula,
} from "./glass-color-palette";

// Convenient re-exports for light background presets
export {
  glassLightBackgroundPresets,
  glassLightAuroraBackground,
  glassLightMeshBackground,
  glassLightCosmicBackground,
  glassLightVibrantAurora,
  glassLightSunsetAurora,
  glassLightOceanDepth,
  glassLightNebula,
  glassLightMintFresh,
  glassLightRoseGold,
} from "./glass-light-color-palette";
