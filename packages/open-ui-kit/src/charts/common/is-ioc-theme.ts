/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from "@mui/material";

/**
 * Brand primaries that should receive the "IoC" chart treatment — glow,
 * rounded caps, thicker strokes and gradient fills.
 *
 * Both Cisco brand themes share this look:
 *   • C1D primary          → #00BCEB
 *   • IoC / OXP (ioc-next)  → #17C7FF
 *
 * Charts previously hard-compared against "#00BCEB" only, so the OXP theme
 * (primary #17C7FF) never received the treatment. Use this helper everywhere
 * instead of inline string comparisons.
 */
const IOC_PRIMARY_MAINS = ["#00BCEB", "#17C7FF"];

export const isIocTheme = (theme: Theme): boolean => {
  const main = theme.palette.primary?.main ?? "";
  return IOC_PRIMARY_MAINS.includes(main.toUpperCase());
};
