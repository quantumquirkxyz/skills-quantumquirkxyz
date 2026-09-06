---
name: contribution-workflow-optimizer
description: Inspect changed Skills and recommend contribution improvements across standards, docs, tests, and examples; use when evaluating a Skill pull request before publication.
version: 1
capabilities:
  - audit-skill-pull-request
  - assess-documentation-completeness
  - recommend-test-and-example-improvements
inputs:
  - pull-request-diff
  - base-reference
  - repository-guidelines
outputs:
  - contribution-report
  - prioritized-findings
  - validation-recommendations
dependencies:
  - skill-testing-framework
  - code-review
sideEffects: []
stopCondition: The changed Skills have prioritized findings and explicit validation recommendations.
risk: low
trustTier: 2
---

# Contribution Workflow Optimizer

## Contract

- Input: a pull-request base reference and changed Skill files.
- Output: prioritized checks for contract, documentation, dependencies, tests, and examples.
- Boundary: recommend changes only; implementation and merge remain separate workflows.

Run `node .agents/skills/platform/skill-lab.mjs pr-check --base main`. Use its changed-file list as the scope, then validate each changed Skill and check for documentation and examples before recommending merge.
