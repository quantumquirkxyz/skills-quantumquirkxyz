---
name: contribution-workflow-optimizer
category: delivery
maturity: experimental
version: 1
description: Inspect changed Skills and recommend contribution improvements across standards, docs, tests, and examples; use when eva
---

# Contribution Workflow Optimizer

## Contract

- Input: a pull-request base reference and changed Skill files.
- Output: prioritized checks for contract, documentation, dependencies, tests, and examples.
- Boundary: recommend changes only; implementation and merge remain separate workflows.

Run `node .agents/skills/platform/skill-lab.mjs pr-check --base main`. Use its changed-file list as the scope, then validate each changed Skill and check for documentation and examples before recommending merge.
