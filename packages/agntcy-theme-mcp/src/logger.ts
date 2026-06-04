/*
 * Copyright 2025 Cisco Systems, Inc. and its affiliates
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Minimal structured logger.
 *
 * Security: logs are written to STDERR only. On a STDIO MCP transport, STDOUT
 * is reserved for the JSON-RPC protocol stream, so anything logged to STDOUT
 * would corrupt it. We log the tool name and (allow-listed, non-sensitive)
 * params for auditability per the MCP logging guidance, and never log secrets
 * because this server handles none.
 */
export function logEvent(event: string, data?: Record<string, unknown>): void {
  const record = {
    ts: new Date().toISOString(),
    level: "info",
    server: "agntcy-theme-mcp",
    event,
    ...(data ?? {}),
  };
  // eslint-disable-next-line no-console
  process.stderr.write(`${JSON.stringify(record)}\n`);
}
