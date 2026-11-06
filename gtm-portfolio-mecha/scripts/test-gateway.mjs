import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const key=randomBytes(24).toString('hex');const suffix=Date.now().toString(36);
const child=spawn(process.execPath,['demos/routing/server.mjs'],{env:{...process.env,ROUTING_MODE:'local',ROUTING_API_KEY:key},stdio:['ignore','pipe','pipe']});
let childError='';child.stderr.on('data',b=>childError+=b.toString());
const request=(data,auth=key)=>fetch('http://127.0.0.1:5680/route',{method:'POST',headers:{'Content-Type':'application/json','X-Demo-Key':auth},body:JSON.stringify(data)});
const outcomes=[];
try{
  for(let i=0;i<40;i++){if(child.exitCode!==null)throw new Error('Eigenes Test-Gateway konnte nicht starten: '+childError.slice(0,300));try{const r=await fetch('http://127.0.0.1:5680/health');if(r.ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  const lead={eventId:`http-${suffix}`,email:`test-${suffix}@portfolio.example`,company:'Synthetische Testfirma',employees:42,source:'demo'};
  const cases=[['unauthorized',lead,'wrong',401],['accepted',lead,key,201],['duplicate',lead,key,200],['missing',{...lead,eventId:`missing-${suffix}`,email:`missing-${suffix}@portfolio.example`,company:''},key,422],['real-domain-blocked',{...lead,email:'do-not-send@real-business.invalid'},key,422],['large-body',{...lead,padding:'x'.repeat(17000)},key,413]];
  for(const[name,input,auth,expected]of cases){const r=await request(input,auth);const result=await r.json();assert.equal(r.status,expected,name);outcomes.push({name,status:r.status,result});}
  await writeFile('evidence/gateway-results.json',JSON.stringify({generatedAt:new Date().toISOString(),mode:'local',externalCalls:0,cases:outcomes},null,2));
  console.log(JSON.stringify(outcomes.map(r=>({name:r.name,status:r.status})),null,2));
}finally{if(child.exitCode===null){child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));}}
