---
name: skill-testing-framework
category: skill-dev
maturity: stable
version: 1
description: Validate Skill structure, contracts, dependencies, anti-patterns, and isolated execution; use when checking a Skill befo
---

# Skill Testing Framework

## Contract

- Input: a Skill path and optional sandbox execution request.
- Output: structural findings and, for sandbox Skills, execution evidence and a promotion recommendation.
- Boundary: use existing repository validators; do not silently mutate canonical Skills.

Run the shared validator with `node .agents/skills/platform/skill-lab.mjs validate <path> --json`, then run the existing sandbox and behavioral validators for execution evidence. Treat unknown dependencies, missing outputs, placeholder text, and contradictory risk declarations as failures or warnings rather than silently accepting them.
