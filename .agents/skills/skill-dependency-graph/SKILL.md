---
name: skill-dependency-graph
description: Build a dependency graph that exposes central Skills, cycles, and unnecessary coupling.
version: 1
capabilities:
  - build-skill-dependency-graph
  - detect-dependency-cycles
  - identify-central-skills
inputs:
  - skills-directory
outputs:
  - mermaid-graph
  - graph-json
  - modularity-findings
dependencies: []
sideEffects:
  - write-docs
stopCondition: The graph is generated and cycles or high-coupling nodes are explicitly reported.
risk: low
---

# Skill Dependency Graph

## Contract

- Input: the canonical Skills directory.
- Output: Mermaid or JSON graph, cycle list, central Skills, and modularity findings.
- Boundary: analyze declared dependencies only; do not rewrite Skill contracts.

Run `node .agents/skills/platform/skill-lab.mjs graph --format mermaid` for a diagram or `--format json` for analysis input. Use incoming-edge counts to identify central Skills and inspect every cycle before adding another dependency.
