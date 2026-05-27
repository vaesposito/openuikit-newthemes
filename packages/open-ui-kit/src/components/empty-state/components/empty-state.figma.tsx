/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { EmptyState } from "./empty-state";
import { GeneralSize } from "@/common";

figma.connect(
  EmptyState,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:65",
  {
    example: () => (
      <EmptyState
        variant="info"
        size={GeneralSize.Large}
        title="Nothing here yet"
        description="No data to display."
      />
    ),
  },
);

figma.connect(
  EmptyState,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=12:69",
  {
    example: () => (
      <EmptyState
        variant="negative"
        size={GeneralSize.Large}
        title="Something went wrong"
        description="We could not load the data. Please try again."
      />
    ),
  },
);
