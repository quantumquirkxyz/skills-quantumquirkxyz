---
name: quant-backtest
category: skill-dev/sandbox
maturity: experimental
version: 1
description: Run a backtest with full audit hygiene — biases, costs, out-of-sample, regime splits — and produce a verdict on whether a strategy is robust.
capabilities:
  - execute the core process defined in the skill body
  - produce a Markdown artifact satisfying completion criteria
outputs:
  - Markdown artifact with all process steps completed
sideEffects: []
dependencies: []
stopCondition: All process steps executed; artifact saved with all required sections present.
risk: low
trustTier: 1
maxIterations: 6
---

## Contract

- **Input:** problem description and inputs defined by the skill body.
- **Output:** Markdown artifact with completed process steps.
- **Side effects:** none.
- **Dependencies:** none.
- **Stop condition:** all process steps executed; artifact saved with required sections.
- **Risk:** low.
- **Boundary:** produces reasoning artifact only; no system changes.


# Quant Backtest Audit

Take a **strategy** and produce a **backtest result you can defend**. A backtest that can't survive audit is decoration.

## When to use

- The user has a strategy (rules, model, signal) and wants its historical performance.
- A claimed alpha or Sharpe needs independent verification.
- A live-trading decision will be made from the result.

## Process

### 1. Spec the strategy

Capture in writing:

- **Signal(s)** — input → score → decision.
- **Universe** — assets and any filtering rules.
- **Schedule** — rebalance dates, holding period.
- **Sizing** — equal weight, vol-targeted, Kelly-fraction.
- **Costs** — commissions, spread, borrow, impact.

No ambiguity. If a parameter is unspecified, ask.

**Completion criterion:** the strategy could be re-implemented from the spec alone.

### 2. Audit the data

- Point-in-time dataset, not a survivor-only snapshot.
- Adjustments for splits, dividends, mergers consistent with provider.
- Look-ahead traps: features only use data available at the decision timestamp.
- Corporate actions and delistings reflected in returns (delisting return ≠ 0).

**Completion criterion:** each bias named and the dataset policy is documented in code.

