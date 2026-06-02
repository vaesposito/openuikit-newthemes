/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const indicatorBadgeValueContainerStyles = {
  container: {
    height: 24,
    width: 28,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const indicatorBadgeBackdropStyles = (color: string) => ({
  backgroundColor: color,
  // Fixed radius (px) keeps the backdrop pill consistent regardless of the
  // theme's shape.borderRadius, which themes like IoC set large.
  borderRadius: "6px",
  height: "inherit",
  opacity: 0.12,
  width: "inherit",
});
