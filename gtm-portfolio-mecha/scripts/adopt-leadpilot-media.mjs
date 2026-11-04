import { readFile, writeFile, stat, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';

const directory=path.resolve('evidence/captures');
const session=JSON.parse(await readFile(`${directory}/leadpilot-session.json`,'utf8'));
const manifest=JSON.parse(await readFile('public/data/media.json','utf8'));
const captures=JSON.parse(await readFile('evidence/captures.json','utf8'));
await mkdir('public/media/videos',{recursive:true});
const selections=[
  ['dashboard','http://127.0.0.1:4175/dashboard','Executive Dashboard · historische Stammdaten des fiktiven Unternehmens · reguläre Testsitzung'],
  ['contacts','http://127.0.0.1:4175/crm/leads','CRM-Kontaktansicht · reguläre Supabase-Abfrage mit synthetischen Seed-Daten'],
  ['deals-filtered','http://127.0.0.1:4175/crm/deals?suche=Enterprise','Deal-Pipeline · Suchfilter „Enterprise“ · synthetischer Testdatensatz'],
  ['arr-details',session.detailUrl,'ARR im Detail · Definition, Zeitraum und historische Datenquelle'],
];
const screenshots=[];
for(const [view,url,caption]of selections){
  const original=`evidence/captures/leadpilot-${view}.jpg`;
  const data=await readFile(original);const info=await sharp(data).metadata();
  const src=`/media/leadpilot-${view}.webp`;
  await sharp(data).webp({quality:92}).toFile(`public${src}`);
  screenshots.push({src,alt:caption,caption});
  const entry={slug:'leadpilot',view,source:session.source,session:session.session,url,capturedAt:(await stat(original)).mtime.toISOString(),viewport:{width:info.width,height:info.height},original,sha256:createHash('sha256').update(data).digest('hex'),synthetic:true,dataNote:session.data};
  const old=captures.findIndex(c=>c.slug==='leadpilot'&&c.view===view);
  if(old>=0)captures[old]=entry;else captures.push(entry);
}
const videoDir=path.resolve('.cache/leadpilot-walkthrough');
const timeline=JSON.parse(await readFile(videoDir+'/timeline.json','utf8'));
if(timeline.frames.length<20)throw new Error('Zu wenige tatsächliche Browserframes.');
// Entfernt ausschließlich Wartepausen zwischen Aufnahmeblöcken. Keine UI-Bilder werden erzeugt.
const weights=timeline.frames.map((f,i)=>Math.min(2,Math.max(.05,((timeline.frames[i+1]?.atMs??f.atMs+500)-f.atMs)/1000)));
const factor=90/weights.reduce((a,b)=>a+b,0);let position=0;
const frameTimes=weights.map(weight=>{const at=position;position+=weight*factor;return at;});
const concat=timeline.frames.map((f,i)=>`file '${path.join(videoDir,f.file)}'\nduration ${(weights[i]*factor).toFixed(6)}`).join('\n')+`\nfile '${path.join(videoDir,timeline.frames.at(-1).file)}'\n`;
await writeFile(videoDir+'/concat.txt',concat);
const output='public/media/videos/leadpilot.mp4';
const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',videoDir+'/concat.txt','-t','90','-vf','fps=24,pad=1600:900:80:0:color=0x0c1a17','-c:v','libx264','-preset','fast','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart','-an',output],{encoding:'utf8'});
if(result.status!==0)throw new Error(result.stderr);
const probe=JSON.parse(spawnSync('ffprobe',['-v','quiet','-show_format','-of','json',output],{encoding:'utf8'}).stdout);
const cueStarts=timeline.actions.map(action=>{const i=timeline.frames.findIndex(f=>f.atMs>=action.at);return i<0?89:frameTimes[i];});
const format=seconds=>{const ms=Math.round(seconds*1000);return `${String(Math.floor(ms/60000)).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;};
const cueTexts=[
  'LeadPilot: regulär angemeldete lokale Anwendung. Die Zahlen sind Stammdaten eines fiktiven Unternehmens.',
  'Kontakte werden mandantengebunden aus Supabase abgefragt. Zu sehen ist ein synthetischer Seed-Datensatz.',
  'Die Suche filtert die Deal-Pipeline auf „Enterprise“. Keine produktiven Kundendaten.',
  'Die Detailansicht erklärt Definition, Zeitraum und Quelle der Kennzahl. Die Simulation bleibt pausiert.',
];
const vtt='WEBVTT\n\n'+cueStarts.map((start,i)=>`${format(start)} --> ${format(cueStarts[i+1]??90)}\n${cueTexts[i]}`).join('\n\n')+'\n';
await writeFile('public/media/videos/leadpilot.vtt',vtt);
manifest.leadpilot={...manifest.leadpilot,screenshots,video:{src:'/media/videos/leadpilot.mp4',poster:'/media/leadpilot-dashboard.webp',subtitles:'/media/videos/leadpilot.vtt',duration:Number(probe.format.duration)}};
await writeFile('public/data/media.json',JSON.stringify(manifest,null,2));
await writeFile('evidence/captures.json',JSON.stringify(captures,null,2));
const videos=JSON.parse(await readFile('evidence/video-results.json','utf8'));
const entry={slug:'leadpilot',duration:Number(probe.format.duration),bytes:Number(probe.format.size),source:'Zeitlich geschnittener Bildschirm-Walkthrough aus tatsächlichen Browserframes der regulär angemeldeten Originalanwendung.',recordedAt:timeline.startedAt,originalFrameCount:timeline.frames.length,recordingViewport:timeline.viewport,outputViewport:{width:1600,height:900},editing:'Wartepausen zwischen Aufnahmeblöcken gekürzt; Zeitablauf auf 90 Sekunden angepasst; keine Daten oder Ansichten nachgebaut.',sections:timeline.actions.map((a,i)=>({startSeconds:cueStarts[i],view:a.view}))};
const old=videos.findIndex(v=>v.slug==='leadpilot');if(old>=0)videos[old]=entry;else videos.push(entry);
await writeFile('evidence/video-results.json',JSON.stringify(videos,null,2));
console.log(JSON.stringify({screenshots:screenshots.length,videoSeconds:entry.duration,sourceFrames:timeline.frames.length,sections:entry.sections},null,2));
