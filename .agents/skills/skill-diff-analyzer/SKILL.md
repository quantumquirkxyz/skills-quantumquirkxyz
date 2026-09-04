---
name: skill-diff-analyzer
description: Compare Skill versions and explain contract, dependency, and behavior impact.
version: 1
capabilities:
  - compare-skill-versions
  - report-significant-changes
  - assess-dependency-impact
inputs:
  - old-skill-path
  - new-skill-path
outputs:
  - change-report
  - dependency-impact
  - improvement-suggestions
dependencies: []
sideEffects:
  - write-docs
stopCondition: The report identifies frontmatter changes, content changes, and whether review is required.
risk: low
---

# Skill Diff Analyzer

Run `node .agents/skills/platform/skill-lab.mjs diff <old>/SKILL.md <new>/SKILL.md`. Treat changes to dependencies, side effects, or risk as review-required, and inspect additions/removals for accidental contract drift.
