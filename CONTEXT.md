# Context

This repository contains the canonical qquirk Skills bundle in `.agents/skills/`.

Use the repository-local docs in `docs/agents/` to understand issue tracking, work-item format, domain-doc layout, and triage labels before using the workflow skills.

## Language

**qquirk Skills**
: The author-owned skills bundle in this repository.
_Use when_: referring to the whole workflow system.
_Avoid_: generic prompts, copied skills

**qquirk Method**
: The workflow philosophy that governs how the skills route work, preserve context, produce artifacts, review changes, repair findings, and ship.
_Use when_: discussing why the skills behave the way they do.
_Avoid_: ad hoc workflow, prompt stack

**Canonical skill**
: A skill folder under `.agents/skills/` with a `SKILL.md` entrypoint and matching lockfile entry.
_Use when_: distinguishing real skills from compatibility symlinks.
_Avoid_: Claude link, alias

**Compatibility view**
: The `.claude/skills/` symlink tree that exposes canonical skills to consumers expecting that layout.
_Use when_: discussing installation or parity.
_Avoid_: source of truth

**Provenance**
: The recorded origin and redesign status of a skill, name, or workflow.
_Use when_: discussing authorship, influence, retired aliases, or renamed skills.
_Avoid_: branding note
