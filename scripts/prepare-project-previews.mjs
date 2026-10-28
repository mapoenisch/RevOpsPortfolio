import fs from 'node:fs/promises';
import path from 'node:path';

const destination = path.join(process.cwd(), 'tmp/project-previews');
await fs.mkdir(destination, { recursive: true });
const leadSource = '/Users/marcpoenisch/Projekte/LeadPilot Dashboard-CRMv2/leadpilot-dashboard-crm-v2';
const leadTarget = path.join(destination, 'leadpilot');
await fs.mkdir(leadTarget, { recursive: true });
// Copy application sources only. Never copy credentials, Git internals or user data.
for (const name of ['src', 'public', 'index.html', 'package.json', 'package-lock.json', 'vite.config.ts', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'postcss.config.js', 'tailwind.config.js', 'tailwind.config.ts']) {
  try { await fs.cp(path.join(leadSource, name), path.join(leadTarget, name), { recursive: true }); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
const jobSource = '/Users/marcpoenisch/Projekte/JobScout';
const jobTarget = path.join(destination, 'jobscout');
await fs.mkdir(jobTarget, { recursive: true });
for (const name of ['app', 'jobscout_app.py', 'job_scout.py', 'cv_editor.py', 'unterlagen.py', 'skill_radar.py', 'linkedin_bridge.py']) {
  await fs.cp(path.join(jobSource, name), path.join(jobTarget, name), { recursive: true });
}
console.log('Unveränderte Anwendungskopien für lokale Aufnahmen vorbereitet.');
