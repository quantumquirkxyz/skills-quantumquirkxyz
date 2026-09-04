---
name: integration-playground
description: Create a disposable fixture environment for safely exercising Skills against local APIs, data, and files.
version: 1
capabilities:
  - create-isolated-fixtures
  - run-sandboxed-command
  - preserve-playground-evidence
inputs:
  - fixture-definition
  - command
  - output-directory
outputs:
  - playground-directory
  - execution-result
  - stdout-and-stderr
dependencies:
  - skill-sandbox
sideEffects:
  - write-code
  - write-docs
stopCondition: The command ran in the disposable fixture directory and its exit status and output are recorded.
risk: medium
---

# Integration Playground

Run `node .agents/skills/platform/skill-lab.mjs playground --output <directory>`. The fixture contains only test data and exposes `QQUIRK_PLAYGROUND`; never point it at a production directory or pass credentials into a playground command.
