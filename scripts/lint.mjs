import {readFile} from 'node:fs/promises';
const required=['index.html','styles.css','app.js'];
for(const file of required){const text=await readFile(file,'utf8');if(!text.trim())throw new Error(`${file} is empty`);}
const html=await readFile('index.html','utf8');
for(const marker of ['<main','id="composer"','aria-label','app.js','styles.css']) if(!html.includes(marker)) throw new Error(`Missing required marker: ${marker}`);
const js=await readFile('app.js','utf8');
if(js.includes('eval(')) throw new Error('eval is not allowed');
console.log('Static lint checks passed.');
