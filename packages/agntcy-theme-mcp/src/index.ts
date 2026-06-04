#!/usr/bin/env node
/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Entry point: starts the AGNTCY Theme MCP server over a STDIO transport.
 *
 * STDIO is chosen deliberately (per the repo's MCP security rules): a local,
 * pipe-based transport eliminates DNS-rebinding / network exposure. The server
 * makes no network calls and reads only its own bundled, read-only data files.
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { logEvent } from "./logger.js";

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logEvent("started", { transport: "stdio" });
}

main().catch((err) => {
  logEvent("fatal", {
    message: err instanceof Error ? err.message : String(err),
  });
  process.exit(1);
});
