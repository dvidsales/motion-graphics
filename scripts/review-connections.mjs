import {bundle} from '@remotion/bundler';
import {selectComposition, renderStill, openBrowser} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
const output='out/hemobras/review-v4';
await mkdir(output,{recursive:true});
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium'});
try {
  const composition=await selectComposition({serveUrl,id:'HemobrasAbertura',puppeteerInstance:browser});
  for(const frame of [140,280,310,350,586,622,690,808,824,875,895,915,990,1010,1280,1640,1800,1980]) {
    await renderStill({serveUrl,composition,frame,output:`${output}/${frame}.png`,puppeteerInstance:browser,imageFormat:'png'});
    console.log(`Quadro ${frame}: exportado`);
  }
} finally {await browser.close({silent:true});}
