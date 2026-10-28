import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const hash = async(file) => createHash('sha256').update(await fs.readFile(file)).digest('hex');
await fs.mkdir('docs/evidence/project-captures',{recursive:true});
const captures=[];
for(const name of ['jobscout-dashboard','jobscout-pipeline']){
 const file=`tmp/captures/${name}.png`;
 const output=`docs/evidence/project-captures/${name}.png`;
 await fs.copyFile(file,output);
 captures.push({file:output,sha256:await hash(file),capturedAt:(await fs.stat(file)).mtime.toISOString(),application:'JobScout, unveränderte lokale Anwendungskopie',data:'Explizit synthetische Demodaten; keine echten Bewerbungen',method:'Chrome, 1440 x 1000, echte gerenderte Oberfläche; keine API-Interception und keine Bildretusche'});
}
const sources=JSON.parse(await fs.readFile('docs/evidence/certificate-sources.json','utf8'));
const certificates=JSON.parse(await fs.readFile('src/content/certificates.json','utf8'));
for(const item of sources){
 const certificate=certificates.find(c=>c.id===item.id);
 const original=path.join('/Users/marcpoenisch/Projekte/Jobsuche 2026/Zertifikate',item.source);
 if(await hash(original)!==await hash(path.join('public',certificate.file))) throw new Error(`Certificate copy mismatch: ${item.id}`);
}
const codeEvidence=[];
for(const name of ['jobscout_app.py','job_scout.py']){
 const original=await hash(`/Users/marcpoenisch/Projekte/JobScout/${name}`);
 const copy=await hash(`tmp/project-previews/jobscout/${name}`);
 if(original!==copy) throw new Error(`App source changed: ${name}`);
 codeEvidence.push({file:name,sha256:original,copyMatchesOriginal:true});
}
await fs.writeFile('docs/evidence/project-captures.json',JSON.stringify({captures,codeEvidence,pending:['LeadPilot: aktuelle Dashboard-Aufnahmen nach echter Anmeldung']},null,2)+'\n');
console.log(`Nachweise: ${captures.length} frische Original-Screenshots archiviert; ${sources.length} Zertifikatskopien bytegleich; JobScout-Code unverändert.`);
