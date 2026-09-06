# Skill Design Worksheet Template

Use this template to guide your skill creation process. Fill in each section completely.

## Worksheet 1.1: Core Concept Definition
```
Skill Name (proposed): ________________________________
One-sentence description: ________________________________________________________
________________________________________________________

What specific problem does this solve? ___________________________________________
________________________________________________________

Is this a new capability or improvement to existing? [ ] New  [ ] Improvement
If improvement, which existing skill(s) does it relate to? ________________________
________________________________________________________
```

## Worksheet 1.2: Use Case Validation
```
List 3 concrete use cases where this skill would be valuable:
1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

Who are the primary users/agent types that would benefit?
_________________________________________________________

What would happen if this skill didn't exist? (Describe the workaround complexity)
_________________________________________________________
_________________________________________________________

How do you know this addresses a repeatedly useful behavior?
_________________________________________________________
```

## Worksheet 1.3: Capability Definition
```
List the specific capabilities this skill will provide (use - capability-name format):
- _________________________________________________
- _________________________________________________
- _________________________________________________

For each capability, specify:
Capability: ________________________
  Inputs required: ________________________________________
  Outputs produced: _______________________________________
  
Capability: ________________________
  Inputs required: ________________________________________
  Outputs produced: _______________________________________
```

## Worksheet 2.1: Skill Contract Design
```
Description (following quirk skill-style-guide):
_________________________________________________________
_________________________________________________________
_________________________________________________________

Explicit Inputs (what the skill consumes):
- ________________________________________
- ________________________________________
- ________________________________________

Explicit Outputs (what the skill produces):
- ________________________________________
- ________________________________________
- ________________________________________

Dependencies (minimal and intentional):
- ________________________________________ (why: ____________________)
- ________________________________________ (why: ____________________)

Side Effects (honest repository modifications):
- ________________________________________
- ________________________________________

Stop Condition (clear, checkable completion criteria):
_________________________________________________________
_________________________________________________________

Risk Level (honest assessment): [ ] low  [ ] medium  [ ] high
Justification: ___________________________________________
```

## Worksheet 2.2: Skill Body Structure Plan
```
Approach: [ ] step-based  [ ] reference-based  [ ] hybrid

What goes in SKILL.md (essential procedural instructions):
_________________________________________________________
_________________________________________________________

What goes in references/ (detailed reference material):
_________________________________________________________
_________________________________________________________

How does this skill integrate with the work-item system (if relevant):
_________________________________________________________
_________________________________________________________
```

## Worksheet 2.3: Evaluatability Design Plan
```
How will this skill be tested with the evaluate-skill system?

Scenario Fixtures needed (describe expected routes):
_________________________________________________________
_________________________________________________________

Behavioral Fixtures needed (expected output formats):
_________________________________________________________
_________________________________________________________
```

## Worksheet 3.1: Skill Generation
```
Follow these steps to generate your skill:
1. Create directory: .skill-sandbox/<your-skill-name>/
2. Create SKILL.md with proper YAML frontmatter from Worksheet 2.1
3. Create references/ directory and add any needed templates
4. Set up basic scripts/ and assets/ directories if needed
5. Add helpful TODO comments guiding completion

Use the templates in this skill's references/ as starting points.
```

## Worksheet 3.2: Validation Integration
```
Create validation artifacts for your skill:

Scenario Fixtures (in .skill-sandbox/<skill-name>/scenarios/):
- [ ] Basic functionality test scenario
- [ ] Edge case scenario  
- [ ] Error condition scenario

Behavioral Fixtures (in .skill-sandbox/<skill-name>/behavioral-fixtures/):
- [ ] Expected output format for primary artifact
- [ ] Expected output format for secondary artifact (if applicable)

Run validation:
- node .skill-sandbox/validations/validate-sandbox-skills.mjs
- node .agents/skills/platform/evaluate-scenarios.mjs (when scenarios ready)
- node .agents/skills/platform/evaluate-behavioral-fixtures.mjs (when fixtures ready)
```