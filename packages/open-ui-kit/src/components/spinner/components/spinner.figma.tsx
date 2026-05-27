/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Spinner } from "./spinner";

figma.connect(
  Spinner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:96",
  {
    example: () => <Spinner size={20} />,
  },
);

figma.connect(
  Spinner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:100",
  {
    example: () => <Spinner size={40} />,
  },
);

figma.connect(
  Spinner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:104",
  {
    example: () => <Spinner size={64} />,
  },
);
