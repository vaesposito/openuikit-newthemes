/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import figma from "@figma/code-connect";
import { Accordion } from "./accordion";
import { AccordionSummary, AccordionDetails } from "@mui/material";

figma.connect(
  Accordion,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:127",
  {
    example: () => (
      <Accordion>
        <AccordionSummary>Section title</AccordionSummary>
        <AccordionDetails>Content goes here.</AccordionDetails>
      </Accordion>
    ),
  },
);

figma.connect(
  Accordion,
  "https://www.figma.com/design/tr8d5x1nW9yKXvJ14Sjuag?node-id=10:130",
  {
    example: () => (
      <Accordion defaultExpanded>
        <AccordionSummary>Section title</AccordionSummary>
        <AccordionDetails>Content goes here.</AccordionDetails>
      </Accordion>
    ),
  },
);
