/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Tabs } from "./tabs";
import { Tab } from "./tab";

figma.connect(
  Tabs,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:109",
  {
    example: () => (
      <Tabs type="main" value={0}>
        <Tab label="Overview" />
        <Tab label="Details" />
        <Tab label="Settings" />
      </Tabs>
    ),
  },
);

figma.connect(
  Tabs,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:119",
  {
    example: () => (
      <Tabs type="toggleTab" value={0}>
        <Tab label="List" />
        <Tab label="Grid" />
      </Tabs>
    ),
  },
);
