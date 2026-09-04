#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';

const root = process.cwd();
const skillsRoot = path.join(root, '.agents', 'skills');
const sandboxRoot = path.join(root, '.skill-sandbox');
const required = ['name', 'description', 'version', 'capabilities', 'outputs'];

async function read(file) { return fs.readFile(file, 'utf8'); }
async function exists(file) { try { await fs.access(file); return true; } catch { return false; } }
function frontmatter(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const data = {};
  if (!match) return data;
  let key;
  for (const line of match[1].split(/\r?\n/)) {
    const scalar = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    const item = line.match(/^\s+-\s+(.+)$/);
    if (scalar) {
      key = scalar[1];
      data[key] = scalar[2] ? scalar[2].replace(/^['"]|['"]$/g, '') : [];
    } else if (item && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(item[1].replace(/^['"]|['"]$/g, ''));
    }
  }
  return data;
}
async function skillFiles(base = skillsRoot) {
  const entries = await fs.readdir(base, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'platform') continue;
    const file = path.join(base, entry.name, 'SKILL.md');
    if (await exists(file)) out.push(file);
  }
  return out.sort();
}
async function manifest(file) { return frontmatter(await read(file)); }
function array(value) { return Array.isArray(value) ? value : !value || value === '[]' ? [] : [value]; }
function json(value) { console.log(JSON.stringify(value, null, 2)); }
function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
}
function usage() {
  console.log(`skill-lab commands:
  template <name> [--domain domain] [--description text]
  validate [path] [--json]
  graph [--format mermaid|json]
  rules [--json]
  diff <old/SKILL.md> <new/SKILL.md>
  tutorial <skill-name|SKILL.md>
  metrics [runs-directory]
  playground [--output directory] [--command command]
  pr-check [--base ref]`);
}
async function template() {
  const name = process.argv[3];
  if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) throw new Error('name must be kebab-case');
  const domain = arg('--domain', 'general');
  const description = arg('--description', `A focused skill for ${domain} workflows.`);
  const directory = path.join(sandboxRoot, name);
  await fs.mkdir(directory, { recursive: true });
  const file = path.join(directory, 'SKILL.md');
  if (await exists(file)) throw new Error(`refusing to overwrite ${file}`);
  await fs.writeFile(file, `---
name: ${name}
description: ${description}
version: 1
capabilities:
  - define-${name}-workflow
inputs:
  - user-request
outputs:
  - ${name}-result
dependencies: []
sideEffects:
  - write-docs
stopCondition: The requested ${name} result is complete and its validation evidence is recorded.
risk: low
---

# ${name}

## Contract

- Input: user request and relevant repository context
- Output: a concrete ${name} result with validation evidence
- Scope: solve one focused ${domain} problem

## Process

1. Clarify the input and success condition.
2. Perform the smallest safe analysis or change.
3. Report the output and evidence.

## Guardrails

- Preserve existing repository conventions.
- Surface uncertainty and failures explicitly.
`, 'utf8');
  json({ status: 'created', file: path.relative(root, file) });
}
async function validate() {
  const requested = process.argv.slice(3).find((value) => !value.startsWith('--'));
  const files = requested
    ? [path.resolve(root, requested.endsWith('.md') ? requested : path.join(requested, 'SKILL.md'))]
    : await skillFiles();
  const names = new Set((await skillFiles()).map((file) => path.basename(path.dirname(file))));
  const results = [];
  for (const file of files) {
    const name = path.basename(path.dirname(file));
    const text = await read(file).catch(() => '');
    const fm = frontmatter(text);
    const errors = [];
    const warnings = [];
    for (const key of required) if (!fm[key] || (Array.isArray(fm[key]) && !fm[key].length)) errors.push(`missing ${key}`);
    if (fm.name !== name) errors.push(`frontmatter name must be ${name}`);
    if (!/^#\s+/.test(text.replace(/^---[\s\S]*?---\s*/, ''))) warnings.push('missing Markdown title');
    for (const dependency of array(fm.dependencies)) {
      if (!names.has(dependency)) errors.push(`unknown dependency ${dependency}`);
    }
    for (const pattern of [/TODO\b/i, /replace this/i, /lorem ipsum/i]) {
      if (pattern.test(text)) warnings.push(`anti-pattern: ${pattern}`);
    }
    if (array(fm.sideEffects).includes('write-code') && fm.risk === 'low') warnings.push('write-code should not be low risk');
    results.push({ skill: name, file: path.relative(root, file), status: errors.length ? 'fail' : 'pass', errors, warnings });
  }
  const report = { status: results.some((item) => item.status === 'fail') ? 'fail' : 'pass', results };
  if (process.argv.includes('--json')) json(report);
  else console.log(`${report.status}: ${results.length} skill(s), ${results.filter((item) => item.status === 'fail').length} failure(s)`);
  if (report.status === 'fail') process.exitCode = 1;
}
async function graph() {
  const nodes = await Promise.all((await skillFiles()).map(async (file) => ({ name: path.basename(path.dirname(file)), dependencies: array((await manifest(file)).dependencies) })));
  if (arg('--format', 'mermaid') === 'json') return json({ nodes, cycles: findCycles(nodes) });
  console.log('graph TD');
  for (const node of nodes) for (const dep of node.dependencies) console.log(`  ${node.name} --> ${dep}`);
}
function findCycles(nodes) {
  const edges = new Map(nodes.map((node) => [node.name, node.dependencies]));
  const cycles = new Map();
  function visit(name, stack) {
    if (stack.includes(name)) {
      const cycle = stack.slice(stack.indexOf(name));
      const rotations = cycle.map((_, index) => cycle.slice(index).concat(cycle.slice(0, index)));
      const canonical = rotations.sort().at(0).join(' -> ');
      cycles.set(canonical, [...rotations[0], rotations[0][0]]);
      return;
    }
    for (const dep of edges.get(name) ?? []) visit(dep, [...stack, name]);
  }
  for (const name of edges.keys()) visit(name, []);
  return [...cycles.values()];
}
async function rules() {
  const counts = new Map();
  const bySkill = [];
  for (const file of await skillFiles()) {
    const text = await read(file);
    const rulesFound = text.split(/\r?\n/).filter((line) => /^\s*-\s+Rule:\s*/i.test(line) || /^\s*-\s+.+\bmust\b/i.test(line));
    bySkill.push({ skill: path.basename(path.dirname(file)), rules: rulesFound.map((line) => line.replace(/^\s*-\s+/, '')) });
    for (const rule of rulesFound) counts.set(rule, (counts.get(rule) ?? 0) + 1);
  }
  const catalog = [...counts].sort((a, b) => b[1] - a[1]).map(([rule, frequency]) => ({
  rule,
  frequency,
  type: /structure|frontmatter|format/i.test(rule) ? 'structure' : /test|valid|evidence|quality/i.test(rule) ? 'quality' : 'process',
  applicationArea: /test|valid|fixture|evidence/i.test(rule) ? 'testing' : /doc|report|artifact/i.test(rule) ? 'documentation' : 'implementation',
  }));
  const result = { catalog, bySkill };
  if (process.argv.includes('--json')) json(result);
  else console.table(catalog);
}
async function diff() {
  const oldFile = process.argv[3]; const newFile = process.argv[4];
  if (!oldFile || !newFile) throw new Error('diff requires old and new SKILL.md paths');
  const oldText = await read(path.resolve(root, oldFile)); const newText = await read(path.resolve(root, newFile));
  const oldFm = frontmatter(oldText); const newFm = frontmatter(newText);
  const fields = [...new Set([...Object.keys(oldFm), ...Object.keys(newFm)])];
  const changes = fields.filter((field) => JSON.stringify(oldFm[field]) !== JSON.stringify(newFm[field])).map((field) => ({ field, from: oldFm[field] ?? null, to: newFm[field] ?? null }));
  const removed = oldText.split(/\r?\n/).filter((line) => !newText.includes(line)).slice(0, 20);
  const added = newText.split(/\r?\n/).filter((line) => !oldText.includes(line)).slice(0, 20);
  json({ status: 'complete', changes, added, removed, impact: changes.some((item) => ['dependencies', 'sideEffects', 'risk'].includes(item.field)) ? 'review-required' : 'low' });
}
async function tutorial() {
  const requested = process.argv[3]; if (!requested) throw new Error('tutorial requires a skill name');
  const file = requested.endsWith('.md') ? path.resolve(root, requested) : path.join(skillsRoot, requested, 'SKILL.md');
  const fm = await manifest(file);
  console.log(`# Tutorial: ${fm.name}\n\n${fm.description}\n\n## Learning goals\n\n${array(fm.capabilities).map((x) => `- ${x}`).join('\n')}\n\n## Exercise\n\nProvide an input satisfying: ${array(fm.inputs).join(', ') || 'the documented contract'}.\n\n## Expected result\n\n${array(fm.outputs).map((x) => `- ${x}`).join('\n')}\n\n## Checkpoint\n\n${fm.stopCondition || 'Confirm the output and validation evidence.'}\n`);
}
async function metrics() {
  const directory = path.resolve(root, process.argv[3] ?? '.agents/skills/platform/runs');
  const files = (await fs.readdir(directory).catch(() => [])).filter((file) => file.endsWith('.json'));
  const records = [];
  for (const file of files) {
    const data = JSON.parse(await read(path.join(directory, file)));
    const duration = Number(data.durationMs ?? data.duration ?? data.metrics?.durationMs);
    if (Number.isFinite(duration)) records.push({ file, status: data.status, durationMs: duration });
  }
  const average = records.length ? records.reduce((sum, x) => sum + x.durationMs, 0) / records.length : 0;
  const skillComplexity = [];
  for (const file of await skillFiles()) {
    const text = await read(file);
    const fm = frontmatter(text);
    skillComplexity.push({
      skill: fm.name,
      cognitiveComplexity: text.split(/\r?\n/).length + array(fm.capabilities).length * 2 + array(fm.dependencies).length * 3,
    });
  }
  json({ samples: records.length, averageDurationMs: Math.round(average), successRate: records.length ? records.filter((x) => x.status === 'pass').length / records.length : null, skillComplexity, records });
}
async function playground() {
  const output = path.resolve(root, arg('--output', path.join(os.tmpdir(), 'qquirk-skill-playground')));
  await fs.rm(output, { recursive: true, force: true }); await fs.mkdir(path.join(output, 'filesystem'), { recursive: true });
  await fs.writeFile(path.join(output, 'filesystem', 'fixture.txt'), 'isolated fixture\n');
  await fs.writeFile(path.join(output, 'api.json'), JSON.stringify({ status: 'ok', items: [] }, null, 2));
  await fs.writeFile(path.join(output, 'database.json'), JSON.stringify({ users: [{ id: 1, name: 'fixture-user' }] }, null, 2));
  const command = arg('--command');
  let result = { status: 'created', output: path.relative(root, output), command: null };
  if (command) {
    const child = spawn('sh', ['-c', command], { cwd: output, env: { ...process.env, QQUIRK_PLAYGROUND: output }, stdio: ['ignore', 'pipe', 'pipe'] });
    const stdout = []; const stderr = []; child.stdout.on('data', (x) => stdout.push(x)); child.stderr.on('data', (x) => stderr.push(x));
    const code = await new Promise((resolve) => child.on('close', resolve));
    result = { ...result, status: code === 0 ? 'pass' : 'fail', command, stdout: Buffer.concat(stdout).toString(), stderr: Buffer.concat(stderr).toString(), exitCode: code };
  }
  json(result);
}
async function prCheck() {
  const { stdout } = await new Promise((resolve, reject) => {
    const child = spawn('git', ['diff', '--name-only', arg('--base', 'HEAD~1')], { cwd: root });
    let out = ''; child.stdout.on('data', (x) => { out += x; }); child.on('close', (code) => code ? reject(new Error('git diff failed')) : resolve({ stdout: out }));
  });
  const changed = stdout.split(/\r?\n/).filter((file) => /SKILL\.md$/.test(file));
  const validation = changed.length ? 'Run skill-lab validate on each changed skill.' : 'No skill files changed.';
  json({ changedSkills: changed, checks: ['contract/frontmatter', 'documentation', 'dependencies', 'examples'], recommendation: validation });
}

const command = process.argv[2];
try {
  if (command === 'template') await template();
  else if (command === 'validate') await validate();
  else if (command === 'graph') await graph();
  else if (command === 'rules') await rules();
  else if (command === 'diff') await diff();
  else if (command === 'tutorial') await tutorial();
  else if (command === 'metrics') await metrics();
  else if (command === 'playground') await playground();
  else if (command === 'pr-check') await prCheck();
  else usage();
} catch (error) { console.error(error.message); process.exitCode = 1; }
