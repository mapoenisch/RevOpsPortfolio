import fs from 'node:fs/promises';
// Reuse the user's existing public browser-side Supabase configuration locally.
// Never log values and never copy to public/ or the static export.
const source = '/Users/marcpoenisch/Projekte/LeadPilot Dashboard-CRM/.env.local';
const raw = await fs.readFile(source, 'utf8');
const allowed = raw.split('\n').filter((line) => /^(VITE_SUPABASE_URL|VITE_SUPABASE_ANON_KEY)=/.test(line));
if (allowed.length !== 2) throw new Error('Existing public Supabase configuration incomplete');
await fs.writeFile('tmp/project-previews/leadpilot/.env.local', allowed.join('\n')+'\n', { mode: 0o600 });
console.log('Vorhandene lokale Browser-Konfiguration übernommen. Keine Werte ausgegeben.');
