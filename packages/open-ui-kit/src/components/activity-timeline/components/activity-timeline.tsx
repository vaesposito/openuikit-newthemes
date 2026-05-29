/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Timeline as MuiTimeline,
  TimelineProps as MuiTimelineProps,
  TimelineItem as MuiTimelineItem,
  TimelineSeparator as MuiTimelineSeparator,
  TimelineConnector as MuiTimelineConnector,
  TimelineContent as MuiTimelineContent,
} from "@mui/lab";
import { ActivityTimelineDot } from "./activity-timeline-dot";
import { ActivityTimelineStep, ActivityTimelineStepStatus } from "../types";
import { setStepColor } from "../utils/utils";
import { useCallback } from "react";
import { Typography, useTheme } from "@mui/material";
import { Accordion } from "@/components";

export interface ActivityTimelineProps
  extends Omit<MuiTimelineProps, "children" | "ref"> {
  automaticProgress?: boolean;
  steps: ActivityTimelineStep[];
}

export const ActivityTimeline = ({
  automaticProgress = false,
  steps,
  ...props
}: ActivityTimelineProps) => {
  const theme = useTheme();

  const setPercent = useCallback(
    (stepIdx: number): number => {
      const percent = Math.round((stepIdx / (steps.length - 1)) * 100);
      return percent > 100 ? 100 : percent;
    },
    [steps.length],
  );

  return (
    <MuiTimeline
      position="right"
      sx={{ padding: 0, margin: 0, ...((props as { sx?: object }).sx ?? {}) }}
      {...props}
    >
      {steps.map((step, index) => (
        <MuiTimelineItem
          key={index}
          sx={{
            // Remove the default ::before pseudo-element that creates dead space
            "&::before": { flex: 0, padding: 0 },
          }}
        >
          <MuiTimelineSeparator sx={{ marginTop: "2px" }}>
            <ActivityTimelineDot
              automaticProgress={automaticProgress}
              status={step.status}
              {...(automaticProgress && { percent: setPercent(index) })}
            />
            {index < steps.length - 1 && (
              <MuiTimelineConnector
                sx={{
                  backgroundColor: setStepColor(
                    automaticProgress
                      ? ActivityTimelineStepStatus.InProgress
                      : step.status,
                    theme,
                  ),
                }}
              />
            )}
          </MuiTimelineSeparator>
          <MuiTimelineContent
            sx={{
              padding: "0px 0px 24px 16px",
              flex: 1,
              minWidth: 0,
            }}
          >
            {step.content ? (
              <Accordion
                title={step.title}
                subTitle={step.subTitle}
                sx={{ width: "100%" }}
              >
                {step.content}
              </Accordion>
            ) : (
              <Typography variant="h6">{step.title}</Typography>
            )}
          </MuiTimelineContent>
        </MuiTimelineItem>
      ))}
    </MuiTimeline>
  );
};
