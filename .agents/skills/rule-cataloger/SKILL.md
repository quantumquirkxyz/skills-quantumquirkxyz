---
name: rule-cataloger
description: Extract and classify rules across Skills by type, frequency, and application area.
version: 1
capabilities:
  - extract-skill-rules
  - classify-rule-types
  - rank-rule-frequency
inputs:
  - skills-directory
outputs:
  - rule-catalog
  - frequency-report
  - application-area-summary
dependencies: []
sideEffects:
  - write-docs
stopCondition: Every discovered rule is listed with its source Skill, type, and frequency.
risk: low
---

# Rule Cataloger

Run `node .agents/skills/platform/skill-lab.mjs rules --json`. Review inferred categories as a starting point, then refine application areas from the Skill sections (implementation, testing, documentation) before publishing the catalog.
