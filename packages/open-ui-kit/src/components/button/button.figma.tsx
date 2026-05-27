/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Button } from "@mui/material";

figma.connect(
  Button,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:13",
  {
    example: () => <Button variant="contained">Primary</Button>,
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:38",
  {
    example: () => (
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    ),
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:63",
  {
    example: () => <Button variant="outlined">Outlined</Button>,
  },
);

figma.connect(
  Button,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=8:88",
  {
    example: () => <Button variant="text">Tertiary</Button>,
  },
);
