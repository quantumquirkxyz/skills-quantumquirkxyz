---
name: skill-dependency-graph
category: skill-dev
maturity: experimental
version: 1
description: Build a dependency graph that exposes central Skills, cycles, and unnecessary coupling; use when analyzing Skill modular
---

# Skill Dependency Graph

## Contract

- Input: the canonical Skills directory.
- Output: Mermaid or JSON graph, cycle list, central Skills, and modularity findings.
- Boundary: analyze declared dependencies only; do not rewrite Skill contracts.

Run `node .agents/skills/platform/skill-lab.mjs graph --format mermaid` for a diagram or `--format json` for analysis input. Use incoming-edge counts to identify central Skills and inspect every cycle before adding another dependency.
