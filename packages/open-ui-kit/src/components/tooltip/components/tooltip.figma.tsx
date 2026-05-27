/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Tooltip } from "./tooltip";
import { Button } from "@mui/material";
import { TooltipSize } from "../types";

figma.connect(
  Tooltip,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:36",
  {
    example: () => (
      <Tooltip title="Helpful information" placement="top">
        <Button>Hover me</Button>
      </Tooltip>
    ),
  },
);

figma.connect(
  Tooltip,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:34",
  {
    example: () => (
      <Tooltip
        size={TooltipSize.Small}
        title="Helpful information"
        placement="top"
      >
        <Button>Hover me</Button>
      </Tooltip>
    ),
  },
);
