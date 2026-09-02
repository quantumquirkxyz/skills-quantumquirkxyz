# qquirk Skill Tutor Glossary

## Core Concepts

**Skill**: A modular, self-contained package that extends an agent's capabilities by providing specialized knowledge, workflows, or tool integrations.

**qquirk Method**: The workflow philosophy that governs how skills route work, preserve context, produce artifacts, review changes, repair findings, and ship work predictably.

**Predictability**: The agent taking the same _process_ every run, not producing the same output — this is the root virtue of the qquirk method.

**Context Pack**: A bounded set of fresh reads and provenance that gives the next skill enough evidence to act.

**Seam**: The public boundary where design, implementation, testing, or operations become explicit.

**Tracer Bullet**: A ticket that makes one narrow end-to-end behavior work (vertical slice through all layers).

**Artifact**: A durable output produced by a skill that can be consumed by other skills or humans (specs, tickets, plans, reports, etc.).

**Stop Condition**: Clear, checkable criteria that tell when a skill is done working.

## Skill Components

**YAML Frontmatter**: The metadata section at the top of SKILL.md enclosed in --- lines that defines the skill's properties.

**Capabilities**: What a skill can do - the specific functions or behaviors it provides.

**Inputs**: What a skill consumes to do its work - information, files, or context it needs.

**Outputs**: What a skill produces - the artifacts, files, or modifications it creates.

**Dependencies**: Other skills that this skill relies on to provide certain capabilities.

**Side Effects**: The repository modifications a skill makes (documented honestly in the YAML frontmatter).

**Risk Level**: An honest assessment of the potential impact of a skill's side effects (low/medium/high).

## Common Terminology

**Canonical Skill**: A skill folder under `.agents/skills/` with a `SKILL.md` entrypoint and matching lockfile entry.

**Compatibility View**: The `.claude/skills/` symlink tree that exposes canonical skills to consumers expecting that layout.

**Provenance**: The recorded origin and redesign status of a skill, name, or workflow.

**Progressive Disclosure**: The technique of moving detailed information behind context pointers (links) so the main SKILL.md stays legible.

**Leading Word**: A compact concept already living in the model's pretraining that the agent thinks with while running the skill (e.g. _relentless_, _tight_, _fog of war_).

**Information Hierarchy**: A ladder ranking skill content by how immediately the agent needs the material:
1. In-skill step (what agent does, in order)
2. In-skill reference (consulted on demand)
3. External reference (loaded only when pointer fires)

**No-Op**: A line that the model already obeys by default, so you pay load to say nothing (detected by asking: does removing this line change behavior?).

## Workflow Terms

**Spec**: Short for specification - a document describing what to build and why (output of to-spec skill).

**Ticket**: A unit of work representing a tracer-bullet vertical slice (output of to-tickets skill).

**Review Fix Plan**: A durable PR comment that converts review findings into scoped, validated fixes (output of plan-review-fixes skill).

**Implementation Note**: A document that applies a review fix plan and reports completion (output of implement-review-fixes skill).

**PR Body**: The main text of a GitHub pull request explaining what changed and why (used by publish-open-pr skill).

## Design Principles

**Artifacts over Vibes**: Valuing durable, shareable outputs over transient impressions or feelings.

**Vertical Slices over Horizontal Dumps**: Preferring narrow, complete-path tickets over broad, shallow task lists.

**Questions before Commitments**: Using structured questioning (grill/grill-with-docs) for ambiguous work instead of guessing.

**Context before Action**: Building fresh context packs before engaging in broad work.

**Branch-state before Repair**: Resolving conflicts in a branch state before attempting review or repair.

**Fail Closed on Uncertainty**: Rather than making assumptions when information is missing, stopping and requesting clarification.

**Repo-local Specialization**: Each project owning its own domain language, tracker configuration, commands, and risk boundaries.

## Evaluation Terms

**Scenario Fixture**: A JSON file defining expected routes through skills and static assertions for validating skill behavior.

**Behavioral Fixture**: A markdown file defining expected output formats for skill artifacts.

**Regression**: A return to a previous, less desirable state in skill behavior or output quality.

**Skill Manifest**: The YAML frontmatter of a skill that declares its properties and contract.

This glossary is adapted from the qquirk method documentation and skill style guide. For complete definitions, refer to the official documents in `docs/agents/`.