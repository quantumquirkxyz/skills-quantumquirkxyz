---
name: artifact-handoff
category: routing
maturity: stable
version: 1
description: Transfer structured artifacts between Skills and sessions.
---

# Artifact Handoff

Use this skill to move a result from one Skill to another without flattening it into prose.

## Steps

1. Package the artifact with id, type, producer, status, summary, evidence, and consumers.
2. Include the minimal context pointer required by the consumer.
3. Preserve provenance and redaction by default.

## Completion criteria

- the artifact validates against the shared envelope
- the next consumer is explicit