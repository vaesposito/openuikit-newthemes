/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Toast } from "./toast";

figma.connect(
  Toast,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:75",
  {
    example: () => <Toast type="default" title="Notification" />,
  },
);

figma.connect(
  Toast,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:83",
  {
    example: () => (
      <Toast
        type="success"
        title="Changes saved"
        description="Your changes have been saved successfully."
      />
    ),
  },
);

figma.connect(
  Toast,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:87",
  {
    example: () => (
      <Toast
        type="warning"
        title="Session expiring"
        description="You will be logged out in 5 minutes."
      />
    ),
  },
);

figma.connect(
  Toast,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:91",
  {
    example: () => (
      <Toast
        type="error"
        title="Error"
        description="Something went wrong. Please try again."
      />
    ),
  },
);
