import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {createRequire} from 'node:module';
import {buildSync} from 'esbuild';
mkdirSync('out/hemobras/checks',{recursive:true});
const output=resolve('out/hemobras/checks/motion.cjs');
buildSync({entryPoints:['src/hemobras/motion.ts'],bundle:true,platform:'node',format:'cjs',outfile:output});
const motion=createRequire(import.meta.url)(output);
const {arrivalFor,nodeMotion,connectionMotion,pointOnPath,routes,MOTION}=motion;
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
let nodes=0,edges=0;
for(const id of Object.keys(routes)) {
  const plan=arrivalFor(id);
  close(nodeMotion(plan.show-1,id).opacity,0);
  for(let f=plan.show+1;f<plan.show+MOTION.fullOpacityHold;f++) close(nodeMotion(f,id).opacity,1);
  // A primeira exposição não pode vir do antigo estado esmaecido.
  nodes++;
  const points=routes[id];
  if(points.length<2) continue;
  const a=connectionMotion(plan.edgeStart,id),b=connectionMotion(plan.edgeStart+plan.edgeDuration/2,id),c=connectionMotion(plan.edgeStart+plan.edgeDuration,id);
  close(a.draw,0);assert.ok(b.draw>0 && b.draw<1);close(c.draw,1);
  close(c.tip.x,points.at(-1).x);close(c.tip.y,points.at(-1).y);
  assert.ok(Math.hypot(a.tip.x-b.tip.x,a.tip.y-b.tip.y)>1,'Ponta da seta não se move');
  for(const p of [.2,.4,.6,.8]) {
    const tip=pointOnPath(points,p);
    assert.ok(points.slice(1).some((end,i)=>{
      const start=points[i];
      return tip.x>=Math.min(start.x,end.x)-1e-6 && tip.x<=Math.max(start.x,end.x)+1e-6 &&
        tip.y>=Math.min(start.y,end.y)-1e-6 && tip.y<=Math.max(start.y,end.y)+1e-6 &&
        (Math.abs(start.x-end.x)<1e-6?Math.abs(tip.x-start.x)<1e-6:Math.abs(tip.y-start.y)<1e-6);
    }),'Ponta saiu da conexão hierárquica');
  }
  edges++;
}
const id='pessoas-comite';const show=arrivalFor(id).show;const start=show+MOTION.fullOpacityHold;
const opacity=[0,8,16,24,32].map(offset=>nodeMotion(start+offset,id).opacity);
close(opacity[0],1);close(opacity.at(-1),.2);
for(let i=1;i<opacity.length;i++) assert.ok(opacity[i]<opacity[i-1],'A redução de opacidade não é progressiva');
// Limita saltos no fade e na retomada do foco, que eram instantâneos na v2.
for(const id of ['pessoas-comite','cadm','secretaria','gabinete','estrategica']) {
  const from=arrivalFor(id).show+MOTION.cardWipe+1;
  for(let frame=from;frame<1860;frame++) assert.ok(Math.abs(nodeMotion(frame,id).opacity-nodeMotion(frame-1,id).opacity)<.08,`Salto de opacidade em ${id}: ${frame}`);
}
// Regressão da v3: não deve haver pulsos ou reinício depois de conectar.
let frozen=0;
for(const [id,points] of Object.entries(routes)) {
  if(points.length<2) continue;
  const plan=arrivalFor(id);const end=plan.edgeStart+plan.edgeDuration;
  const connected=connectionMotion(end,id);
  for(let f=end;f<2100;f++) {
    const current=connectionMotion(f,id);
    close(current.draw,1);
    close(current.tip.x,connected.tip.x);close(current.tip.y,connected.tip.y);
    close(current.tip.angle,connected.tip.angle);
    assert.ok(!('flow' in current),'Conexão concluída não deve emitir pulsos');
  }
  frozen++;
}
console.log(`Movimento validado: ${nodes} áreas iniciam em 100%; ${edges} conexões desenham uma vez; ${frozen} pontas permanecem imóveis após conectar; fades contínuos.`);
