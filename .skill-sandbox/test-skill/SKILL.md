---
name: test-skill
description: A test skill for validating the skill-sandbox workflow.
version: 1
capabilities:
  - test-capability
inputs:
  - test-input
outputs:
  - test-output
dependencies: []
sideEffects:
  - write-docs
stopCondition: The test skill has been created and validated.
risk: low
---

# Test Skill

This is a test skill to validate the skill-sandbox workflow.

## Contract

- Input: test-input
- Output: test-output
- Scope: testing the skill-sandbox workflow
- Rule: this is a test skill for validation purposes

## Completion Criteria

- The test skill has been created in the sandbox
- The skill has been validated using sandbox validation tools