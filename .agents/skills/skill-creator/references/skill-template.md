---
name: <skill-name>
description: <One-sentence description following qquirk skill-style-guide - states what the skill does and when to use it>
version: 1
capabilities:
  - <capability-name-1>
  - <capability-name-2>
  - <capability-name-3>
inputs:
  - <input-description-1>
  - <input-description-2>
  - <input-description-3>
outputs:
  - <output-description-1>
  - <output-description-2>
  - <output-description-3>
dependencies:
  - <dependency-1>
  - <dependency-2>
sideEffects:
  - <side-effect-1>
  - <side-effect-2>
stopCondition: <Clear, checkable completion criteria that tells when the skill is done>
risk: <honest-assessment: low/medium/high>
---

# <Skill Name>

Start with purpose and boundary - what this skill does and doesn't do.

## Contract

Explicitly state:
- Input: what the skill consumes (be specific about types and formats)
- Output: what the skill produces (be specific about types and formats)
- Scope: what the skill does and doesn't do (boundaries)
- Rules: specific constraints that govern the skill's behavior

## [Main Section - varies by skill]

[Add sections specific to your skill's purpose here. Follow the principle of progressive disclosure - put only essential procedural instructions here, move detailed reference material to references/.]

## Completion Criteria

Clear, observable criteria that tell when the skill is done. Each criterion should be checkable by the agent and tied to your stopCondition above.