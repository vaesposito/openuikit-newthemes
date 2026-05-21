/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Sub-path imports from the package (e.g. @open-ui-kit/core/typography.css)
      { find: /^@open-ui-kit\/core\/(.+)$/, replacement: path.resolve(__dirname, "../../packages/open-ui-kit/src/$1") },
      // Main package entry — point directly to source so changes are reflected without a full rollup build
      { find: "@open-ui-kit/core", replacement: path.resolve(__dirname, "../../packages/open-ui-kit/src/index.ts") },
      // Resolve the package's internal @/* alias
      { find: /^@\/(.*)/, replacement: path.resolve(__dirname, "../../packages/open-ui-kit/src/$1") },
    ],
  },
});
