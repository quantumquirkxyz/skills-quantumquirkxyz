---
name: workflow-improvement-tester
description: A test skill to validate that the skill-creator and agent-observability improvements work together.
version: 1
capabilities:
  - test-skill-creation-workflow
  - test-observability-data-collection
inputs:
  - test-scenario
outputs:
  - test-results
  - observability-data
dependencies:
  - skill-creator
  - agent-observability
sideEffects:
  - write-docs
stopCondition: The test skill has been created, used to create another test skill in the sandbox, and both have generated observability data.
risk: low
---

# Workflow Improvement Tester

This test skill validates that the improvements to skill-creator and agent-observability work together effectively.

## Contract

- Input: test-scenario
- Output: test-results, observability-data
- Scope: testing the integrated workflow of skill creation and observation
- Rule: this is a test skill to validate the improvements

## Completion Criteria

- The test skill has been created in the sandbox
- The skill-creator has been used to generate another test skill in the sandbox
- Both skills have generated observability data through agent-observability
- The workflow demonstrates the improved capabilities working together