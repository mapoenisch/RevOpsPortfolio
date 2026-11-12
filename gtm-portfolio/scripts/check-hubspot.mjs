import { writeFile } from 'node:fs/promises';
try { process.loadEnvFile('.env.local'); } catch {}
const token=process.env.HUBSPOT_ACCESS_TOKEN;
const expected=process.env.HUBSPOT_TEST_PORTAL_ID;
const report={checkedAt:new Date().toISOString(),mode:'read-only-preflight',configured:Boolean(token&&expected),portalMatches:false,status:'not-configured',checks:[]};
async function check(label,path) {
  try {
    const response=await fetch('https://api.hubapi.com'+path,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(15000)});
    report.checks.push({label,httpStatus:response.status});
    if(!response.ok)return null;
    return await response.json();
  }catch{report.checks.push({label,error:'NETWORK_ERROR'});return null;}
}
if(report.configured){
  const account=await check('account','/account-info/v3/details');
  report.portalMatches=Boolean(account&&String(account.portalId)===String(expected));
  report.status=account?(report.portalMatches?'portal-verified':'portal-mismatch'):'account-check-failed';
  if(report.portalMatches){
    for(const [label,key]of [['small-owner','HUBSPOT_OWNER_SMALL'],['large-owner','HUBSPOT_OWNER_LARGE']]){
      const id=process.env[key];
      if(!/^\d+$/.test(id||'')){report.checks.push({label,error:'NOT_CONFIGURED'});continue;}
      const owner=await check(label,'/crm/v3/owners/'+encodeURIComponent(id));
      report.checks.at(-1).matches=Boolean(owner&&String(owner.id)===String(id)&&!owner.archived);
    }
    if(report.checks.some(c=>c.matches===false)){
      const all=await check('owner-directory','/crm/v3/owners?limit=100');
      const active=(all?.results||[]).filter(o=>!o.archived);
      report.availableActiveOwners=active.length;
      report.possibleUserIdMixup={};
      for(const [label,key]of [['small-owner','HUBSPOT_OWNER_SMALL'],['large-owner','HUBSPOT_OWNER_LARGE']]){
        const value=String(process.env[key]||'');
        report.possibleUserIdMixup[label]=active.some(o=>String(o.userId)===value||String(o.userIdIncludingInactive)===value);
      }
      report.ownerDirectoryComplete=Boolean(all&&!all.paging?.next);
    }
  }
}
await writeFile('evidence/hubspot-preflight.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.status!=='portal-verified'||report.checks.some(c=>c.matches===false||c.error))process.exitCode=1;
