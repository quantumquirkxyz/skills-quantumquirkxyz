---
name: frontend-design
category: frontend
maturity: stable
version: 1
description: Shape frontend work into a clear visual system, interaction model, and implementation seam.
---

# Frontend Design

Use this skill when the project needs a clear frontend shape before implementation. It should decide what the user sees first, which interactions matter, and where the seam should sit so the rest of the UI can stay deep rather than shallow.

## Contract

- Input: UI brief, current interface, and design context.
- Output: a frontend seam proposal, interaction model, and visual system guidance.
- Scope: design the frontend shape, not the full implementation.
- Rule: prefer one user-facing seam that covers the important interaction path.
- Rule: call out when the UI is too dense or too shallow for the requested flow.
- Rule: keep the design grounded in the project vocabulary, not generic design jargon.

## Steps

1. Read the minimum context needed to understand the interface and brand constraints.
2. Identify the primary user path and the seam where it becomes observable.
3. Shape the interaction model around that seam.
4. Describe the visual direction in implementation-ready terms.

## Completion criteria

- the primary UI path is named
- the seam is named
- the visual direction is concrete enough to test against
