# Review Fix Plan

Use this template when creating a review fix plan with the `plan-review-fixes` skill. This converts review findings into a concrete remediation plan.

## Review Fix Plan
Status: planned
PR: [PR number or link]
Source review: [Link to or summary of source review]
Severity: [Severity level of the findings being addressed]
Scope guard: [Description of how scope is limited to only what's necessary to address the findings]

## The Plan

[Group work into the smallest correction steps that can be implemented and verified independently. For each step, include:]

### Step 1: [Brief description]
- **Source axis**: [Standards or Spec]
- **Finding summary**: [Brief description of the finding being addressed]
- **Target files or symbols**: [Specific files, functions, classes, etc. being modified]
- **Intended fix**: [What specific changes will be made]
- **Validation command or observable check**: [How we'll verify the fix works]

### Step 2: [Brief description]
- **Source axis**: [Standards or Spec]
- **Finding summary**: [Brief description of the finding being addressed]
- **Target files or symbols**: [Specific files, functions, classes, etc. being modified]
- **Intended fix**: [What specific changes will be made]
- **Validation command or observable check**: [How we'll verify the fix works]

[Continue for additional steps as needed]

## Ordering Guidance

Steps should be ordered with blockers first: spec correctness, failing behavior, hard standards, then design smells.

## Execution Notes

[Any special considerations for implementing this plan, such as:
- Dependencies on other work
- Required validation steps
- Conditions that would invalidate the plan
- How to handle conflicts if they arise]

[Remember: Do not prescribe a broad refactor unless the finding truly requires it. Prefer a plan shape that can be executed in one review-fix loop pass without guessing at scope.]