---
name: nextjs
category: frontend
maturity: experimental
version: 1
description: Shape Next.js projects around routes, server/client seams, and data flow that stay deep rather than tangled.
---

# Next.js

Use this skill when the project is built on Next.js and the route tree or rendering model needs to be shaped with intent. Keep the route surface small, the server/client split explicit, and the data flow easy to reason about.

## Contract

- Input: Next.js brief, route map, and rendering constraints.
- Output: a Next.js seam proposal, route guidance, and server/client split guidance.
- Scope: design the route and rendering shape, not the full implementation.
- Rule: identify which logic belongs on the server and which must stay client-side.
- Rule: keep route structure aligned with the primary user paths.
- Rule: avoid shallow wrappers that only move data around.

## Steps

1. Identify the primary user path and route shape.
2. Decide the server/client split at the seam.
3. Note any data-fetching or rendering constraints.
4. Describe the smallest route structure that still fits the flow.

## Completion criteria

- the route shape is named
- the server/client seam is named
- the rendering constraints are explicit
