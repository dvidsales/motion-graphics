import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
const out = 'out/hemobras/review';
await mkdir(out, {recursive:true});
const serveUrl = await bundle({entryPoint:'src/index.ts'});
const browser = await openBrowser('chrome', {browserExecutable:'/usr/bin/chromium'});
try {
 const composition=await selectComposition({serveUrl,id:'HemobrasAbertura',puppeteerInstance:browser});
 for(const frame of [140,280,310,328,350,400,578,586,598,622,650,690,720,792,808,824,850,875,940,964,990,1150,1220,1240,1260,1300,1340,1370,1420,1450,1480,1540,1580,1620,1660,1680,1710,1760,1800,1980,2099]) {
  await renderStill({serveUrl,composition,frame,output:`${out}/${String(frame).padStart(4,'0')}.png`,puppeteerInstance:browser,imageFormat:'png'});
  console.log(`Quadro ${frame}: exportado`);
 }
} finally {await browser.close({silent:true});}
