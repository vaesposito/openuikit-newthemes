/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Badge } from "./badge";

figma.connect(
  Badge,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:4",
  {
    example: () => <Badge type="default" content="Label" />,
  },
);

figma.connect(
  Badge,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:16",
  {
    example: () => <Badge type="success" content="Active" />,
  },
);

figma.connect(
  Badge,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:10",
  {
    example: () => <Badge type="error" content="Error" />,
  },
);

figma.connect(
  Badge,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:12",
  {
    example: () => <Badge type="warning" content="Warning" />,
  },
);
