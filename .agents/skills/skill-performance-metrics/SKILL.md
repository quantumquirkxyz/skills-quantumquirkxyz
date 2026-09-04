---
name: skill-performance-metrics
description: Summarize Skill execution duration, success rate, and available run evidence.
version: 1
capabilities:
  - measure-skill-duration
  - calculate-success-rate
  - summarize-execution-runs
inputs:
  - runs-directory
  - execution-records
outputs:
  - performance-report
  - average-duration
  - success-rate
dependencies:
  - agent-observability
sideEffects:
  - write-docs
stopCondition: A report contains sample count, average duration, and success rate or clearly states that data is unavailable.
risk: low
---

# Skill Performance Metrics

Run `node .agents/skills/platform/skill-lab.mjs metrics`. Use enough execution records to avoid drawing conclusions from one run; report missing duration data instead of treating it as zero.
