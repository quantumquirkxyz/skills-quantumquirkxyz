# Quick Skill Creation Reference

## Skill Structure
Every skill consists of:
1. **SKILL.md** (required) - Contains YAML frontmatter and instructions
2. **Optional directories**: scripts/, references/, assets/

## YAML Frontmatter Essentials
- **name**: Must match directory name (kebab-case)
- **description**: One sentence stating what it does and when to use it
- **version**: Start with "1"
- **capabilities**: List of what the skill can do (use - capability-name format)
- **inputs**: What the skill consumes
- **outputs**: What the skill produces
- **dependencies**: Other skills this skill relies on (be minimal)
- **sideEffects**: Honest list of repository modifications (use execution-policy categories)
- **stopCondition**: Clear, checkable criteria for when skill is done
- **risk**: Honest assessment (low/medium/high)

## Skill Design Principles
1. **Progressive Disclosure**: Keep SKILL.md lean, move details to references/
2. **Explicit Contracts**: Be clear about inputs, outputs, dependencies, side effects
3. **Single Source of Truth**: Each concept defined in one place
4. **Predictability Focus**: Design for consistent process, not identical outputs
5. **Artifacts over Vibes**: Produce durable outputs others can depend on

## Common Capability Patterns
- analyze-[something]: Takes input, produces analysis
- generate-[something]: Creates new artifact
- validate-[something]: Checks something, returns pass/fail
- transform-[something]: Changes input to output
- guide-[something]: Provides structured assistance
- recommend-[something]: Suggests options with rationale

## Common Side Effects (use execution-policy categories)
- read-only: Safe, no modifications
- write-docs: Creates or modifies documentation files
- write-code: Creates or modifies code files
- write-tests: Creates or modifies test files
- run-tests: Executes test suites
- push-branch: Pushes git branches
- create-pr: Creates GitHub pull requests
- merge-pr: Merges GitHub pull requests
- close-issue: Closes GitHub issues

## Risk Level Guidelines
- **low**: Read-only operations, documentation only, no repository modifications
- **medium**: Modifies files in predictable ways, has clear rollback path
- **high**: Can cause data loss, complex modifications, irreversible actions

## Stop Condition Guidelines
Good stop conditions are:
- Checkable (agent can verify true/false)
- Explicit (specific, measurable outcomes)
- Tied to validation (when possible)
- Not vague or subjective

Examples of good stop conditions:
- "The acceptance criteria are satisfied in the repo state and validated locally"
- "The user has a validated skill concept, generated skill template, and plan for integration"
- "A durable Review Fix Plan comment is posted"

Examples of poor stop conditions to avoid:
- "Do a thorough job" (vague, not checkable)
- "Provide good guidance" (subjective)
- "Help the user understand" (not checkable)

## Quick Validation Checklist
Before considering a skill complete:
- [ ] Skill name matches directory name
- [ ] Description follows format: "Does X when Y"
- [ ] Capabilities use - capability-name format
- [ ] Inputs and outputs are explicit and meaningful
- [ ] Dependencies are minimal and justified
- [ ] Side effects are honestly declared
- [ ] Stop condition is checkable and explicit
- [ ] Risk level is honestly assessed
- [ ] No placeholder text or TODOs in published content