---
name: skill-diff-analyzer
category: skill-dev
maturity: experimental
version: 1
description: Compare Skill versions and explain contract, dependency, and behavior impact; use when assessing changes between two Ski
---

# Skill Diff Analyzer

## Contract

- Input: two readable `SKILL.md` files.
- Output: frontmatter changes, content additions/removals, dependency impact, and review recommendation.
- Boundary: compare files without editing either version.

Run `node .agents/skills/platform/skill-lab.mjs diff <old>/SKILL.md <new>/SKILL.md`. Treat changes to dependencies, side effects, or risk as review-required, and inspect additions/removals for accidental contract drift.
