/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Tag } from "./tag";
import { TagStatus } from "../types";
import { GeneralSize } from "@/common";

figma.connect(
  Tag,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:26",
  {
    example: () => <Tag size={GeneralSize.Large} label="Tag" />,
  },
);

figma.connect(
  Tag,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:28",
  {
    example: () => (
      <Tag
        size={GeneralSize.Large}
        status={TagStatus.Positive}
        label="Success"
      />
    ),
  },
);

figma.connect(
  Tag,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:32",
  {
    example: () => (
      <Tag
        size={GeneralSize.Large}
        status={TagStatus.Negative}
        label="Negative"
      />
    ),
  },
);

figma.connect(
  Tag,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:30",
  {
    example: () => (
      <Tag
        size={GeneralSize.Large}
        status={TagStatus.Warning}
        label="Warning"
      />
    ),
  },
);
