# Validation Reference

Use this reference when validating branches with the `publish-open-pr` skill. This outlines the validation steps to run before opening a PR.

## Validation Steps

Run these checks to ensure the branch is ready for review:

### 1. Basic Repository State
- [ ] `git status -sb` shows only expected changes
- [ ] No unexpected files in working directory
- [ ] Current branch matches the dedicated issue branch

### 2. Code Quality
- [ ] No linting errors (run appropriate linter for your stack)
- [ ] No type checking errors (run type checker if applicable)
- [ ] Code follows project formatting standards

### 3. Functional Validation
- [ ] Application builds successfully
- [ ] Core functionality related to changes works as expected
- [ ] No regressions in related functionality

### 4. Test Validation
- [ ] Unit tests pass for modified code
- [ ] Integration tests pass for affected components
- [ ] End-to-end tests pass for critical user flows (if applicable)

### 5. Dependency Validation
- [ ] No broken imports or dependencies
- [ ] External service connections work as expected (if applicable)
- [ ] Configuration changes are valid and complete

[Remember: Follow the smallest relevant validation first. If validation fails, stop and report it rather than changing the branch here.]