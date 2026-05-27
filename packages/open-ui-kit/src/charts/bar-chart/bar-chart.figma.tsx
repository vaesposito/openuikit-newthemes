/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { BarChart } from "./bar-chart";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

figma.connect(
  BarChart,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:79",
  {
    example: () => (
      <BarChart
        data={data}
        bars={[{ dataKey: "value", name: "Value" }]}
        width={500}
        height={300}
      />
    ),
  },
);
