const response = await fetch('http://127.0.0.1:11435/api/pull', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({model:'qwen3:1.7b',stream:false}),signal:AbortSignal.timeout(300000) });
if(!response.ok) throw new Error(`MODEL_DOWNLOAD_${response.status}`);
console.log(await response.json());
