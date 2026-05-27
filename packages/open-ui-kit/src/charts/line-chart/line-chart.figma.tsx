/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { LineChart } from "./line-chart";

const data = [
  { name: "Mon", threats: 72, resolved: 35 },
  { name: "Tue", threats: 48, resolved: 55 },
  { name: "Wed", threats: 82, resolved: 40 },
  { name: "Thu", threats: 60, resolved: 65 },
  { name: "Fri", threats: 90, resolved: 45 },
];

figma.connect(
  LineChart,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:91",
  {
    example: () => (
      <LineChart
        data={data}
        lines={[
          { dataKey: "threats", name: "Active Threats" },
          { dataKey: "resolved", name: "Resolved" },
        ]}
        width={500}
        height={300}
      />
    ),
  },
);
