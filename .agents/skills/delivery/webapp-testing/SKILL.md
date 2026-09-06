---
name: webapp-testing
category: delivery
maturity: stable
version: 1
description: Choose the right test seam for a web app and describe how to verify it at unit, integration, and end-to-end levels.
---

# Webapp Testing

Use this skill when the project needs guidance on how to test a frontend or full-stack web app. The goal is to select the right seam and keep each test level honest about what it proves.

## Contract

- Input: web app surface, behavior under test, and test stack.
- Output: a test seam recommendation, verification plan, and coverage boundaries.
- Scope: choose testing strategy, not implementation details.
- Rule: keep unit, integration, and end-to-end tests distinct in purpose.
- Rule: avoid testing private UI internals when the public seam can prove the behavior.
- Rule: identify the smallest observable check that proves the user-facing contract.

## Steps

1. Identify the public behavior that needs proof.
2. Map that behavior to the smallest useful seam.
3. Decide which level owns the check: unit, integration, or end-to-end.
4. Define the boundary so tests do not overreach into internals.

## Completion criteria

- the best test seam is named
- the test level is named
- the observable behavior is clear enough to automate
