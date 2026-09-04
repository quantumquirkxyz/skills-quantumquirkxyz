---
name: contribution-workflow-optimizer
description: Inspect changed Skills and recommend contribution improvements across standards, docs, tests, and examples.
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
sideEffects:
  - write-docs
stopCondition: The changed Skills have prioritized findings and explicit validation recommendations.
risk: low
---

# Contribution Workflow Optimizer

Run `node .agents/skills/platform/skill-lab.mjs pr-check --base main`. Use its changed-file list as the scope, then validate each changed Skill and check for documentation and examples before recommending merge.
