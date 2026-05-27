/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Toggle } from "./toggle";

figma.connect(
  Toggle,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:126",
  {
    example: () => <Toggle />,
  },
);

figma.connect(
  Toggle,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:129",
  {
    example: () => <Toggle defaultChecked />,
  },
);

figma.connect(
  Toggle,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:132",
  {
    example: () => <Toggle disabled />,
  },
);
