import fs from 'node:fs/promises';
import path from 'node:path';
import { recordExecution } from './record-execution.mjs';

const repoRoot = process.cwd();
const agentsSkillsDir = path.join(repoRoot, '.skill-sandbox');
const claudeSkillsDir = path.join(repoRoot, '.claude', 'skills'); // Still check .claude for symlinks to canonical
const lockPath = path.join(repoRoot, 'skills-lock.json');
const ignored = new Set(['validations', 'scenarios', 'behavioral-fixtures']);

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const entries = await fs.readdir(agentsSkillsDir, { withFileTypes: true });
  const skillDirs = entries.filter((entry) => entry.isDirectory() && !ignored.has(entry.name));
  const errors = [];
  const warnings = [];

  for (const entry of skillDirs) {
    const skillDir = path.join(agentsSkillsDir, entry.name);
    const skillMd = path.join(skillDir, 'SKILL.md');
    if (!(await exists(skillMd))) {
      errors.push(`missing SKILL.md for ${entry.name}`);
    }
    // In sandbox, we don't require .claude links or lockfile entries
  }

  const skills = skillDirs.length;
  const runPath = await recordExecution({
    repoRoot,
    skill: 'skill-sandbox',
    tool: 'skills:validate-sandbox',
    contextPack: 'sandbox-default',
    status: errors.length ? 'fail' : 'pass',
    warnings: [],
    errors,
    extra: { skills },
  });

  console.log(JSON.stringify({
    skills,
    warnings: [],
    errors,
    status: errors.length ? 'fail' : 'pass',
    executionRecord: path.relative(repoRoot, runPath)
  }, null, 2));

  if (errors.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
