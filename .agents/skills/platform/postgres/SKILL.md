---
name: postgres
category: platform
maturity: stable
version: 1
description: Shape PostgreSQL schema and query decisions so the data model stays durable and reviewable.
---

# Postgres

Use this skill when PostgreSQL is the persistence layer and the schema or query shape matters. It should make the data model durable and the query seam explicit so changes can be migrated safely.

## Contract

- Input: postgres brief, data model, and persistence constraints.
- Output: schema guidance, query guidance, and data durability notes.
- Scope: design the persistence shape, not the full implementation.
- Rule: keep the schema honest to the domain model.
- Rule: make the query seam explicit when it affects performance or correctness.
- Rule: flag data-loss risk and migration coupling early.

## Steps

1. Identify the persisted concepts and their boundaries.
2. Decide what belongs in schema versus derived data.
3. Note the query and migration constraints.
4. Describe the durability tradeoffs clearly.

## Completion criteria

- the schema shape is named
- the query seam is named
- the durability risks are explicit
