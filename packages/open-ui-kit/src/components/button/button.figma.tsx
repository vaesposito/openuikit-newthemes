/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

figma.connect(
  Button,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=147:182",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary: "contained",
        Secondary: "outlined",
        Ghost: "text",
        Danger: "contained",
      }),
      size: figma.enum("Size", {
        Small: "small",
        Medium: "medium",
        Large: "large",
      }),
      disabled: figma.enum("State", {
        Disabled: true,
      }),
      color: figma.enum("Variant", {
        Danger: "error",
      }),
    },
    example: ({ variant, size, disabled, color }) => (
      <Button
        variant={variant ?? "contained"}
        size={size ?? "medium"}
        disabled={disabled}
        color={color}
      >
        Button
      </Button>
    ),
  },
);

/**
 * Buttons with a leading icon — use the startIcon prop:
 *
 * <Button variant="contained" size="medium" startIcon={<AddIcon />}>
 *   Button
 * </Button>
 *
 * Buttons with a trailing icon — use the endIcon prop:
 *
 * <Button variant="contained" size="medium" endIcon={<AddIcon />}>
 *   Button
 * </Button>
 *
 * Icon-only button — use IconButton instead:
 *
 * <IconButton size="medium" color="primary">
 *   <AddIcon />
 * </IconButton>
 */
