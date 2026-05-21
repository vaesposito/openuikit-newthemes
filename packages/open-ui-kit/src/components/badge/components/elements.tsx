/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge as MuiBadge, styled, Theme } from "@mui/material";
import { BadgeType } from "../types";

const getBadgeColor = (
  theme: Theme,
  type?: BadgeType,
  isNotification?: boolean,
) => {
  if (isNotification) {
    return "inherit";
  }
  // Use per-type "textIn" tokens so text is legible on each badge background
  switch (type) {
    case "warning":
      return theme.palette.vars.warningTextInDefault;
    case "moderate":
      return theme.palette.vars.moderateTextInDefault;
    case "excellent":
      return theme.palette.vars.excellentTextInDefault;
    case "neutral":
      return theme.palette.vars.neutralTextInDefault;
    case "error":
      return theme.palette.vars.negativeTextInDefault;
    case "info":
      return theme.palette.vars.infoTextInDefault;
    case "success":
      return theme.palette.vars.successTextInDefault;
    case "inactive":
      return theme.palette.vars.inactiveTextInDefault;
    case "severe":
      return theme.palette.vars.severeWarningTextInDefault;
    case "default":
    default:
      return theme.palette.vars.baseTextStrong;
  }
};

const getBadgeBackgroundColor = (theme: Theme, type?: BadgeType) => {
  switch (type) {
    case "default":
      return "none";
    case "excellent":
      return theme.palette.vars.excellentBackgroundDefault;
    case "neutral":
      return theme.palette.vars.neutralBackgroundDefault;
    case "error":
      return theme.palette.vars.negativeBackgroundDefault;
    case "warning":
      return theme.palette.vars.warningBackgroundDefault;
    case "info":
      return theme.palette.vars.infoBackgroundDefault;
    case "success":
      return theme.palette.vars.successBackgroundDefault;
    case "inactive":
      return theme.palette.vars.inactiveBackgroundDefault;
    case "moderate":
      return theme.palette.vars.moderateBackgroundDefault;
    case "severe":
      return theme.palette.vars.severeWarningBackgroundDefault;
    default:
      return "none";
  }
};

export const StyledBadge = styled(MuiBadge, {
  shouldForwardProp: (prop) => prop !== "type",
})<{ type?: BadgeType; isNotification?: boolean }>(
  ({ theme, type, isNotification = false }) => ({
    color: getBadgeColor(theme, type, isNotification),
    backgroundColor: getBadgeBackgroundColor(theme, type),
    width: "19px",
    height: "16px",
    borderRadius: "64px",
    paddingLeft: "6.5px",
    paddingRight: "6.5px",
    ...(isNotification && {
      backgroundColor: "none",
      padding: 0,
      width: "18px",
      height: "18px",
      "& > svg": {
        width: "18px",
        height: "18px",
      },
      "& .MuiBadge-badge": {
        right: 0,
        top: 0,
        width: "19px",
        height: "16px",
        paddingLeft: "6.5px",
        paddingRight: "6.5px",
        backgroundColor: getBadgeBackgroundColor(theme, type),
        color: getBadgeColor(theme, type, false),
      },
    }),
  }),
);
