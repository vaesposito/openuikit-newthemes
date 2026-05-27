/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { GaugeChart } from "./gauge-chart";

figma.connect(
  GaugeChart,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:94",
  {
    example: () => <GaugeChart value={72} size={220} label="Score" />,
  },
);
