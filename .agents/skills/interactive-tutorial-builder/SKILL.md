---
name: interactive-tutorial-builder
description: Generate a focused tutorial with goals, exercise inputs, expected outputs, and checkpoints for any Skill.
version: 1
capabilities:
  - generate-skill-tutorial
  - derive-learning-goals
  - create-tutorial-checkpoints
inputs:
  - skill-name
  - learner-context
outputs:
  - interactive-tutorial
  - exercise
  - checkpoint
dependencies:
  - skill-tutor
sideEffects:
  - write-docs
stopCondition: The learner has a runnable exercise and a checkable checkpoint derived from the target Skill contract.
risk: low
---

# Interactive Tutorial Builder

Run `node .agents/skills/platform/skill-lab.mjs tutorial <skill-name>`. Adapt the generated exercise to the learner's context, keep the target Skill's stop condition intact, and require evidence at the checkpoint.
