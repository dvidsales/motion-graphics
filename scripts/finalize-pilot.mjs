import {spawnSync} from 'node:child_process';
import {renameSync} from 'node:fs';
const source='out/hemobras/01-abertura-remotion.mp4';
const temporary='out/hemobras/01-abertura-encoding.mp4';
const final='out/hemobras/01-abertura-revisao.mp4';
// Usa os metadados de faixa da entrada; saída limitada BT.709 para TVs.
const result=spawnSync('ffmpeg',[
 '-hide_banner','-y','-i',source,'-an',
 '-vf','scale=in_range=auto:out_range=tv:out_color_matrix=bt709,format=yuv420p',
 '-c:v','libx264','-preset','fast','-crf','18',
 '-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709',
 '-movflags','+faststart',temporary,
],{stdio:'inherit'});
if(result.error) throw result.error;
if(result.status!==0) process.exit(result.status??1);
renameSync(temporary,final);
console.log(`MP4 finalizado: ${final}`);
