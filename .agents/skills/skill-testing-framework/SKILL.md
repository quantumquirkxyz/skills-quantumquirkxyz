---
name: skill-testing-framework
description: Validate Skill structure, contracts, dependencies, anti-patterns, and isolated execution; use when checking a Skill before promotion or publication.
version: 1
capabilities:
  - validate-skill-contract
  - detect-skill-anti-patterns
  - validate-sandbox-execution
inputs:
  - skill-path
  - test-scenarios
  - validation-criteria
outputs:
  - validation-report
  - structural-findings
  - promotion-recommendation
dependencies:
  - skill-sandbox
  - evaluate-skill
sideEffects: []
stopCondition: The target Skill has a pass/fail report with every structural and contract check accounted for.
risk: low
trustTier: 2
---

# Skill Testing Framework

## Contract

- Input: a Skill path and optional sandbox execution request.
- Output: structural findings and, for sandbox Skills, execution evidence and a promotion recommendation.
- Boundary: use existing repository validators; do not silently mutate canonical Skills.

Run the shared validator with `node .agents/skills/platform/skill-lab.mjs validate <path> --json`, then run the existing sandbox and behavioral validators for execution evidence. Treat unknown dependencies, missing outputs, placeholder text, and contradictory risk declarations as failures or warnings rather than silently accepting them.
