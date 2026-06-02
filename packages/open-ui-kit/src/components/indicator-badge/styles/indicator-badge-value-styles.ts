/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const indicatorBadgeValueStyles = (
  color: string,
  isActive?: boolean,
) => ({
  backgroundColor: color,
  height: 3,
  width: 12,
  // Use a fixed, small radius (px) so the bars stay crisp rectangles instead of
  // resolving to theme.shape.borderRadius — which over-rounds a 3px bar into a
  // blurry oval and makes the stacked meter look like a cramped barcode.
  borderRadius: "1.5px",
  opacity: isActive ? 1 : 0.28,
});
