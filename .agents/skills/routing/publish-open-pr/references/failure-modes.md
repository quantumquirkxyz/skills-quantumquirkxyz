# Failure Modes Reference

Use this reference when troubleshooting issues with the `publish-open-pr` skill. This documents common failure modes and how to address them.

## Common Failure Modes

### 1. Branch Not Ready for PR
**Symptom**: GitHub rejects the PR creation attempt
**Common Causes**:
- Branch not pushed to origin
- Authentication issues with GitHub
- Branch protection rules preventing direct pushes
**Resolution**:
- Ensure branch is pushed: `git push -u origin <branch-name>`
- Verify authentication: `gh auth status`
- Check branch protection settings in repository settings

### 2. PR Title or Body Issues
**Symptom**: PR created but with incorrect metadata
**Common Causes**:
- Template rendering issues
- Missing or incorrect metadata in the bundle
- Manual override errors
**Resolution**:
- Check the temporary files used for PR creation
- Verify metadata bundle contains correct information
- Manually adjust PR title/body if needed after creation

### 3. Validation Failures
**Symptom**: Validation checks fail before PR creation
**Common Causes**:
- Code doesn't build or has errors
- Tests are failing
- Linting or type checking issues
**Resolution**:
- Address the specific validation failures
- Do not proceed with PR creation until validation passes
- Consider if the failure indicates a deeper issue

### 4. Metadata Mismatch
**Symptom**: PR has incorrect labels, assignees, or milestone
**Common Causes**:
- Linked issue metadata not properly resolved
- Template issues in metadata bundle
- Manual errors in metadata setup
**Resolution**:
- Verify linked issue exists and has expected metadata
- Check metadata bundle generation process
- Manually correct PR metadata after creation if needed

### 5. Push Rejection
**Symptom**: Unable to push branch to origin
**Common Causes**:
- Lack of write permissions to repository
- Branch already exists with conflicting history
- Network or authentication issues
**Resolution**:
- Verify write permissions to repository
- If branch exists, consider force pushing only if absolutely necessary
- Check network connection and authentication
- Use `git push --help` for troubleshooting

## Guidance

When encountering failures:
1. **Do not guess at issue traceability** when the reference is not already clear
2. **Do not guess at reviewer handles** - if the workflow cannot resolve a required reviewer from repository context, stop and report the missing configuration
3. **Never use a vague title** like `Update` or `Misc fixes` unless the diff is genuinely broad and unavoidable
4. **Never create or amend commits** here; that belongs to `implement`
5. **Never implement new issue work** in this skill; only package, push, and publish the branch that `implement` already prepared
6. **Never merge the PR or close the issue** here; that belongs to `ship-subissue`
7. **Never override the linked issue's labels or milestone** unless the user explicitly asked for a metadata change

[Remember: If the workflow stalls, follow this reference before trying to push through the problem.]