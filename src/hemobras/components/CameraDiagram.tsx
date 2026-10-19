import {useCurrentFrame} from 'remotion';
import {cameraAt} from '../camera';
import {connector,diagramUnits,labelFor,layout} from '../data/layout';
import {cueAt} from '../data/cues';
const RED='#8c1228';
export const wrapLabel=(text:string,width:number,size:number)=>{
 const max=Math.floor((width-52)/(size*.58));const lines:string[]=[];let current='';
 for(const word of text.toUpperCase().split(' ')){if(current&&`${current} ${word}`.length>max){lines.push(current);current=word;}else current=current?`${current} ${word}`:word;}
 if(current)lines.push(current);return lines;
};
const firstReveal=(id:string)=>{
 const u=diagramUnits.find(n=>n.id===id)!;
 if(id==='assembleia'||id==='cadm'||id==='fiscal'||id==='executiva'||id==='presidencia')return 220;
 if(u.parent==='cadm')return 565;
 if(u.parent==='executiva')return 795;
 if(['industrial','qualidade','corporativa'].includes(id))return 1685;
 return 1210;
};
export function CameraDiagram({ghost=false}:{ghost?:boolean}){
 const frame=useCurrentFrame();const cam=cameraAt(frame);const cue=cueAt(frame);
 const focus=new Set([...(cue?.strong??[]),...(cue?.outlined??[])]);
 return <svg width={1920} height={760} viewBox="0 0 1920 760" style={{display:'block',overflow:'hidden'}}>
 <g transform={`translate(960 380) scale(${cam.scale}) translate(${-cam.x} ${-cam.y})`}>
 {layout.filter(n=>connector(n.id)).map(n=>{const active=focus.has(n.id);const reveal=Math.min(1,Math.max(0,(frame-firstReveal(n.id))/26));const d=connector(n.id);return <path key={`edge-${n.id}`} d={d} fill="none" stroke={active?RED:'#b0aaac'} strokeWidth={active?3.2:2.5} strokeDasharray={diagramUnits.find(u=>u.id===n.id)?.parent==='executiva' && diagramUnits.find(u=>u.id===n.id)?.relation==='advisory'?'9 8':undefined} style={{opacity:ghost?.16:reveal*(active?.9:.3)}}/>;})}
 {layout.map(n=>{const solid=cue?.strong.includes(n.id);const active=focus.has(n.id);const reveal=Math.min(1,Math.max(0,(frame-firstReveal(n.id))/26));
 const lines=wrapLabel(labelFor(n.id),n.w,n.size);const lineHeight=n.size*1.16;const initialY=n.y+n.h/2-(lines.length-1)*lineHeight/2;
 return <g key={n.id} data-unit={n.id} opacity={ghost?.2:reveal*(active?1:.19)}>
 <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={4} fill={solid?RED:'#fff'} stroke={active?RED:'#aaa4a6'} strokeWidth={active?3.2:2}/>
 <text x={n.x+n.w/2} y={initialY} textAnchor="middle" dominantBaseline="central" fontFamily="Poppins, sans-serif" fontSize={n.size} fontWeight={650} fill={solid?'white':'#242124'}>{lines.map((line,i)=><tspan key={i} x={n.x+n.w/2} dy={i?lineHeight:0}>{line}</tspan>)}</text>
 </g>;
 })}
 </g></svg>;
}
