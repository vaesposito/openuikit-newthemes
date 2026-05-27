/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { DonutChart } from "./donut-chart";

const data = [
  { name: "Online", value: 2504 },
  { name: "Offline", value: 343 },
];

figma.connect(
  DonutChart,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:87",
  {
    example: () => <DonutChart data={data} size={300} />,
  },
);
