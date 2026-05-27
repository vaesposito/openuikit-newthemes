/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Banner } from "./banner";

figma.connect(
  Banner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:59",
  {
    example: () => (
      <Banner status="negative" text="An error occurred. Please try again." />
    ),
  },
);

figma.connect(
  Banner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:62",
  {
    example: () => (
      <Banner status="warning" text="Your session is about to expire." />
    ),
  },
);

figma.connect(
  Banner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:65",
  {
    example: () => (
      <Banner status="success" text="Changes saved successfully." />
    ),
  },
);

figma.connect(
  Banner,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:68",
  {
    example: () => <Banner status="info" text="A new version is available." />,
  },
);
