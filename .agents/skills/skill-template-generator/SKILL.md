---
name: skill-template-generator
description: Generate an interactive, contract-complete Skill template in the sandbox.
version: 1
capabilities:
  - generate-skill-template
  - guide-skill-contract
  - prepare-validation-scaffold
inputs:
  - skill-name
  - domain
  - capabilities
outputs:
  - sandbox-skill
  - completed-frontmatter
  - next-validation-command
dependencies:
  - skill-creator
  - skill-sandbox
sideEffects:
  - write-code
  - write-docs
stopCondition: A valid sandbox Skill exists with an explicit contract and a command to validate it.
risk: medium
---

# Skill Template Generator

## Contract

- Input: skill name, domain, description, and optional capability list.
- Output: a non-overwriting sandbox Skill, completed frontmatter, and validation command.
- Boundary: generate only under `.skill-sandbox/`; promotion remains a separate decision.

Use `node .agents/skills/platform/skill-lab.mjs template <name> --domain <domain>` to create a safe starting point in `.skill-sandbox/`. Ask for the problem, users, capabilities, outputs, dependencies, and risk before generating; never overwrite an existing template.

Validate the result with `node .agents/skills/platform/skill-lab.mjs validate .skill-sandbox/<name> --json`, then promote only after the sandbox checks pass.
