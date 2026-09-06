---
name: queueing
category: platform
maturity: stable
version: 1
description: Shape background processing and message flow so work is durable, observable, and recoverable.
---

# Queueing

Use this skill when work leaves the request path and becomes background processing. It should define where durability starts, how retries behave, and what happens when the queue or worker misbehaves.

## Contract

- Input: queue brief, background flow, and delivery constraints.
- Output: queue seam proposal, retry guidance, and recovery posture.
- Scope: design the queue shape, not the worker implementation.
- Rule: keep enqueue/dequeue responsibilities explicit.
- Rule: call out retry limits, dead-letter handling, and visibility requirements.
- Rule: prefer a design that survives worker restarts and partial failures.

## Steps

1. Identify the background job's lifecycle.
2. Define the enqueue/dequeue seam.
3. Specify retry and dead-letter behavior.
4. Note the observability required to keep the flow recoverable.

## Completion criteria

- the queue seam is named
- the retry policy is named
- the recovery posture is explicit
