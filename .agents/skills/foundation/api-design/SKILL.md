---
name: api-design
category: foundation
maturity: stable
version: 1
description: Design a small, durable API seam that keeps the backend deep and the caller contract explicit.
---

# API Design

Use this skill when the backend needs a stable public contract. It should decide what the caller must know, what stays behind the seam, and how the contract handles errors, versioning, and evolution.

## Contract

- Input: API brief, backend context, and integration constraints.
- Output: an API seam proposal, contract guidance, and error/versioning guidance.
- Scope: design the contract, not the full implementation.
- Rule: keep the API as small as possible while still supporting the real use case.
- Rule: name errors and versioning choices explicitly when they affect callers.
- Rule: prefer a contract that can survive backend refactors without churn.

## Steps

1. Identify the caller's core job.
2. Choose the smallest seam that supports that job.
3. Define success, failure, and evolution behavior.
4. Describe what remains hidden behind the API.

## Completion criteria

- the API seam is named
- the caller contract is explicit
- the error and versioning approach is named
