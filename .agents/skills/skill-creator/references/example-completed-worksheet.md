# Example Completed Skill Design Worksheet

This example shows how to fill out the skill design worksheets for a hypothetical "file-organizer" skill that helps organize files in a project directory.

## Worksheet 1.1: Core Concept Definition
```
Skill Name (proposed): file-organizer
One-sentence description: Analyzes project directory structure and recommends organization improvements based on established conventions.

What specific problem does this solve? Helps developers maintain clean, predictable project structures by analyzing current organization and suggesting improvements that follow community and project-specific conventions.

Is this a new capability or improvement to existing? [x] New  [ ] Improvement
If improvement, which existing skill(s) does it relate to? Could complement existing skills like codebase-design by focusing on file organization rather than code structure.
```

## Worksheet 1.2: Use Case Validation
```
List 3 concrete use cases where this skill would be valuable:
1. Onboarding new developers to understand project structure quickly
2. Preparing a repository for open source release by ensuring conventional organization
3. Recovering from a chaotic refactor where files were moved inconsistently

Who are the primary users/agent types that would benefit?
Developers, tech leads, and DevOps engineers responsible for maintaining project health

What would happen if this skill didn't exist? (Describe the workaround complexity)
Teams would rely on manual inspection, tribal knowledge, or inconsistent documentation to understand project structure, leading to confusion, slower onboarding, and difficulty maintaining standards.

How do you know this addresses a repeatedly useful behavior?
File organization is a recurring concern in virtually every software project, especially as teams grow and projects evolve over time.
```

## Worksheet 1.3: Capability Definition
```
List the specific capabilities this skill will provide (use - capability-name format):
- analyze-directory-structure
- recommend-organization-improvements
- generate-organization-report

For each capability, specify:
Capability: analyze-directory-structure
  Inputs required: project root path, optional exclusion patterns
  Outputs produced: structured representation of current directory organization
  
Capability: recommend-organization-improvements
  Inputs required: current directory structure analysis, project conventions, team preferences
  Outputs produced: specific recommendations for file/directory moves, renames, and restructuring
  
Capability: generate-organization-report
  Inputs required: analysis results and recommendations
  Outputs produced: human-readable report with before/after visualization and effort estimates
```

## Worksheet 2.1: Skill Contract Design
```
Description (following qquirk skill-style-guide):
This skill analyzes a project's directory structure and recommends organization improvements that follow established conventions and improve maintainability. Use when you need to assess or improve project file organization without making automatic changes.

Explicit Inputs (what the skill consumes):
- Project root directory path
- Optional file/directory exclusion patterns (e.g., node_modules, .git)
- Project-specific organization conventions (if any)
- Team preferences for organization style

Explicit Outputs (what the skill produces):
- Current directory structure analysis (tree format with file types)
- Specific organization recommendations (move, rename, restructure actions)
- Organization improvement report with visualizations and effort estimates
- Priority ranking of recommended changes

Dependencies (minimal and intentional):
- codebase-design (why: to understand what constitutes good structural organization)
- domain-modeling (why: to use appropriate terminology for file types and organizational concepts)

Side Effects (honest repository modifications):
- write-docs (creates organization analysis and recommendation documents)

Stop Condition (clear, checkable completion criteria):
The user has received a prioritized list of specific, actionable organization recommendations with clear before/after visualizations, effort estimates, and explanations of how each recommendation improves maintainability or follows conventions.

Risk Level (honest assessment): [x] low  [ ] medium  [ ] high
Justification: This skill only reads directory structures and writes recommendation documents - it never moves, renames, or deletes actual files, making it safe to use.
```

## Worksheet 2.2: Skill Body Structure Plan
```
Approach: [x] reference-based  [ ] step-based  [ ] hybrid

What goes in SKILL.md (essential procedural instructions):
- How to invoke the skill with required inputs
- Explanation of the three main capabilities and when to use each
- How to interpret the outputs and recommendations
- Guidance on validating recommendations before implementation
- References to the detailed analysis methods and conventions in references/

What goes in references/ (detailed reference material):
- Detailed explanation of directory analysis algorithms
- Common project organization conventions (by language/framework)
- Examples of good and poor organization patterns
- Templates for organization reports
- Glossary of file organization terminology

How does this skill integrate with the work-item system (if relevant):
This skill doesn't directly create work items but its outputs can inform:
- to-spec: for creating organization improvement specifications
- to-tickets: for breaking down organization work into tracer-bullet tickets
- codebase-design: for understanding how file organization affects code structure
```

## Worksheet 2.3: Evaluatability Design Plan
```
How will this skill be tested with the evaluate-skill system?

Scenario Fixtures needed (describe expected routes):
- Basic organization analysis: User provides a simple project structure, skill should identify standard conventions and suggest improvements
- Complex reorganization: User provides a poorly organized structure, skill should suggest specific moves and groupings
- Convention-specific analysis: User provides structure following specific framework conventions, skill should recognize and validate or suggest improvements within that convention

Behavioral Fixtures needed (expected output formats):
- Directory analysis output: tree structure with file type annotations
- Recommendations list: prioritized actions with effort estimates and impact descriptions
- Organization report: before/after visualization, explanation of improvements, and implementation guidance
```