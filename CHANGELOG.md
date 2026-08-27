# Changelog

All notable changes to `qquirk Skills` are recorded here.

This project follows semantic versioning once releases are cut:

- `MAJOR` for breaking workflow or artifact contract changes.
- `MINOR` for new skills, new validators, new scenarios, or compatible workflow extensions.
- `PATCH` for documentation fixes, template clarifications, and non-breaking validator fixes.

## 0.1.0 - 2026-08-27

Initial qquirk-owned skills bundle baseline.

### Added

- Canonical `.agents/skills/` bundle with `.claude/skills/` compatibility links.
- qquirk method, authorship, provenance, adoption, and template-standard docs.
- Scenario evaluation fixtures and deterministic scenario runner.
- Semantic audit runner and unified platform validation commands.
- Internal case-study structure.

### Changed

- Person-branded and retired routing names were removed from active workflow routing.
- `review-fix-loop` became the canonical PR remediation loop between `review-pr` and `ship-subissue`.
- Templates were hardened for traceability, metadata, acceptance criteria, validation, and scope boundaries.

### Validation

Expected release checks:

```bash
node .agents/skills/platform/check-all.mjs
```
