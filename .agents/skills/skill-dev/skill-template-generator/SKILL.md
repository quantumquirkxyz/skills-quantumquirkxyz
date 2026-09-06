---
name: skill-template-generator
category: skill-dev
maturity: sandbox
version: 1
description: Generate an interactive, contract-complete Skill template in the sandbox; use when starting a new Skill with the lab's s
---

# Skill Template Generator

## Contract

- Input: skill name, domain, description, and optional capability list.
- Output: a non-overwriting sandbox Skill, completed frontmatter, and validation command.
- Boundary: generate only under `.skill-sandbox/`; promotion remains a separate decision.

Use `node .agents/skills/platform/skill-lab.mjs template <name> --domain <domain>` to create a safe starting point in `.skill-sandbox/`. Ask for the problem, users, capabilities, outputs, dependencies, and risk before generating; never overwrite an existing template.

Validate the result with `node .agents/skills/platform/skill-lab.mjs validate .skill-sandbox/<name> --json`, then promote only after the sandbox checks pass.
