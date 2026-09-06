---
name: skill-performance-metrics
category: skill-dev
maturity: experimental
version: 1
description: Summarize Skill execution duration, success rate, and available run evidence; use when measuring Skill performance from 
---

# Skill Performance Metrics

## Contract

- Input: an execution-record directory.
- Output: sample count, explicit duration availability, average duration, success rate, and cognitive-complexity estimates.
- Boundary: report only available evidence; missing duration data is not zero.

Run `node .agents/skills/platform/skill-lab.mjs metrics`. Use enough execution records to avoid drawing conclusions from one run; report missing duration data instead of treating it as zero.
