import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
const out = 'out/hemobras/review';
await mkdir(out, {recursive:true});
const serveUrl = await bundle({entryPoint:'src/index.ts'});
const browser = await openBrowser('chrome', {browserExecutable:'/usr/bin/chromium'});
try {
 const composition=await selectComposition({serveUrl,id:'HemobrasAbertura',puppeteerInstance:browser});
 for(const frame of [0,60,140,220,300,400,540,640,720,870,1000,1060,1150,1280,1380,1500,1640,1800,1980,2099]) {
  await renderStill({serveUrl,composition,frame,output:`${out}/${String(frame).padStart(4,'0')}.png`,puppeteerInstance:browser,imageFormat:'png'});
  console.log(`Quadro ${frame}: exportado`);
 }
} finally {await browser.close({silent:true});}
