# Observability Data Analysis Guide

This reference document shows how to analyze the execution records captured by the agent-observability skill. The observation skill itself only collects and redacts data - analysis is performed separately.

## Data Format

Execution records are stored as JSON files in `.agents/skills/agent-observability/runs/` with the following structure:

```json
{
  "id": "execution-unique-id",
  "skill": "skill-name",
  "version": "1",
  "contextPack": "context-pack-name-used",
  "tools": ["tool1", "tool2", ...],
  "startedAt": "ISO timestamp",
  "finishedAt": "ISO timestamp", 
  "durationMs": 1234,
  "inputs": {
    "input-name": "input-value-or-description"
  },
  "outputs": {
    "output-name": "output-value-or-description"
  },
  "sideEffects": ["write-docs", "write-code", ...],
  "status": "success|failure",
  "redacted": true,
  "analysisReady": true
}
```

## Common Analysis Patterns

### 1. Skill Usage Frequency
```javascript
// Count invocations per skill
const skillCounts = {};
executionRecords.forEach(record => {
  skillCounts[record.skill] = (skillCounts[record.skill] || 0) + 1;
});
```

### 2. Success Rate Analysis
```javascript
// Calculate success rates by skill
const skillStats = {};
executionRecords.forEach(record => {
  if (!skillStats[record.skill]) {
    skillStats[record.skill] = { total: 0, success: 0 };
  }
  skillStats[record.skill].total++;
  if (record.status === "success") {
    skillStats[record.skill].success++;
  }
});

// Calculate percentages
const successRates = {};
for (const skill in skillStats) {
  successRates[skill] = (skillStats[skill].success / skillStats[skill].total) * 100;
}
```

### 3. Performance Analysis
```javascript
// Average execution time by skill
const skillTimings = {};
executionRecords.forEach(record => {
  if (!skillTimings[record.skill]) {
    skillTimings[record.skill] = { total: 0, count: 0 };
  }
  skillTimings[record.skill].total += record.durationMs;
  skillTimings[record.skill].count++;
});

// Calculate averages
const averageTimings = {};
for (const skill in skillTimings) {
  averageTimings[skill] = skillTimings[skill].total / skillTimings[skill].count;
}
```

### 4. Dependency Analysis
```javascript
// Track which skills call which other skills
const dependencyMap = {};
executionRecords.forEach(record => {
  // This would require parsing tool invocations or skill-to-skill calls
  // For direct skill calls, you might see them in the "tools" field or need special tracking
});
```

### 5. Error Pattern Analysis
```javascript
// Group failures by skill and look for common patterns
const failurePatterns = {};
executionRecords
  .filter(record => record.status === "failure")
  .forEach(record => {
    const key = record.skill;
    if (!failurePatterns[key]) {
      failurePatterns[key] = [];
    }
    failurePatterns[key].push({
      timestamp: record.finishedAt,
      duration: record.durationMs,
      // Would need to capture error details in a real implementation
    });
  });
```

## Recommended Analysis Tools

For performing these analyses, consider:

1. **Simple Scripts**: Node.js or Python scripts for ad-hoc analysis
2. **Spreadsheet Tools**: CSV export for pivot tables and charting
3. **BI Tools**: Tableau, Power BI, or similar for dashboarding
4. **Logging Platforms**: ELK stack, Datadog, or similar for production monitoring

## Example Analysis Script (Node.js)

```javascript
const fs = require('fs');
const path = require('path');

const runsDir = path.join(__dirname, '.agents', 'skills', 'agent-observability', 'runs');

// Load all execution records
const executionRecords = fs.readdirSync(runsDir)
  .filter(file => file.endsWith('.json'))
  .map(file => {
    const content = fs.readFileSync(path.join(runsDir, file), 'utf8');
    return JSON.parse(content);
  });

// Generate basic report
console.log(`=== Skill Observability Report ===`);
console.log(`Total executions: ${executionRecords.length}`);

// Skill usage counts
const skillCounts = {};
executionRecords.forEach(record => {
  skillCounts[record.skill] = (skillCounts[record.skill] || 0) + 1;
});

console.log(`\nSkill Usage:`);
Object.entries(skillCounts)
  .sort(([,a], [,b]) => b - a)
  .forEach(([skill, count]) => {
    console.log(`  ${skill}: ${count}`);
  });

// Success rates
const skillStats = {};
executionRecords.forEach(record => {
  if (!skillStats[record.skill]) {
    skillStats[record.skill] = { total: 0, success: 0 };
  }
  skillStats[record.skill].total++;
  if (record.status === "success") {
    skillStats[record.skill].success++;
  }
});

console.log(`\nSuccess Rates:`);
Object.entries(skillStats)
  .map(([skill, stats]) => [
    skill,
    (stats.success / stats.total) * 100,
    stats.total
  ])
  .sort(([,aRate], [,bRate]) => bRate - aRate)
  .forEach(([skill, rate, total]) => {
    console.log(`  ${skill}: ${rate.toFixed(1)}% (${stats.success}/${total})`);
  });
```

## Analysis Best Practices

1. **Start Simple**: Begin with basic counts and success rates before complex analysis
2. **Look for Trends**: Analyze data over time to identify improving or degrading patterns
3. **Correlate with Changes**: Link analysis results to skill updates or process changes
4. **Protect Privacy**: Never share raw execution records - only share aggregated, anonymized insights
5. **Validate Insights**: Use analysis to form hypotheses, then validate through controlled experiments

## Integration with Skill Improvement Process

Analysis results can inform:

1. **Skill Retirement**: Identify rarely used or consistently failing skills
2. **Skill Improvement**: Focus efforts on skills with low success rates or high variability
3. **Training Needs**: Identify skills that teams struggle to use effectively
4. **Process Optimization**: Discover common skill combinations that could be streamlined
5. **Risk Management**: Identify skills that frequently produce undesirable side effects

Remember: The agent-observability skill provides the data - the insights come from thoughtful analysis of that data by humans or separate analytical tools.