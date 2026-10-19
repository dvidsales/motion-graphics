import {interpolateColors, useCurrentFrame} from 'remotion';
import {cameraAt} from '../camera';
import {connector, labelFor, layout} from '../data/layout';
import {connectionMotion, hasDashedConnection, nodeMotion, pointOnPath, routes} from '../motion';
const RED='#8c1228';
export const wrapLabel=(text:string,width:number,size:number)=>{
  const max=Math.floor((width-52)/(size*.58)); const lines:string[]=[]; let current='';
  for(const word of text.toUpperCase().split(' ')) {
    if(current && `${current} ${word}`.length>max) {lines.push(current); current=word;}
    else current=current?`${current} ${word}`:word;
  }
  if(current) lines.push(current);
  return lines;
};
export function CameraDiagram({ghost=false}:{ghost?:boolean}) {
  const frame=useCurrentFrame(); const cam=cameraAt(frame);
  return <svg width={1920} height={760} viewBox="0 0 1920 760" style={{display:'block',overflow:'hidden'}}>
    <defs>
      {layout.map(n=>{
        const motion=nodeMotion(frame,n.id); const edge=connectionMotion(frame,n.id); const d=connector(n.id);
        return <g key={n.id}>
          <clipPath id={`card-wipe-${n.id}`}><rect x={n.x-4} y={n.y-4} width={(n.w+8)*motion.wipe} height={n.h+8}/></clipPath>
          {d && <mask id={`edge-draw-${n.id}`} maskUnits="userSpaceOnUse" x={-2000} y={-1000} width={10000} height={7000}>
            <path d={d} fill="none" stroke="white" strokeWidth={24} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1-edge.draw}/>
          </mask>}
        </g>;
      })}
    </defs>
    <g transform={`translate(960 380) scale(${cam.scale}) translate(${-cam.x} ${-cam.y})`}>
      {layout.filter(n=>connector(n.id)).map(n=>{
        const edge=connectionMotion(frame,n.id); const node=nodeMotion(frame,n.id); const d=connector(n.id);
        const color=interpolateColors(node.accent,[0,1],['#aaa4a6',RED]);
        const pulse=edge.flow?pointOnPath(routes[n.id],edge.flow.progress):null;
        return <g key={`edge-${n.id}`} data-connection={n.id} data-draw={edge.draw} opacity={ghost?0.16:edge.opacity}>
          <path d={d} mask={`url(#edge-draw-${n.id})`} fill="none" stroke={color} strokeWidth={4.2} strokeLinejoin="round" strokeDasharray={hasDashedConnection(n.id)?'9 8':undefined}/>
          {edge.draw>0 && <g transform={`translate(${edge.tip.x} ${edge.tip.y}) rotate(${edge.tip.angle})`}>
            <path d="M-16 -7 L0 0 L-16 7" fill="none" stroke={RED} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"/>
          </g>}
          {pulse && edge.flow && <g opacity={edge.flow.opacity}>
            <circle cx={pulse.x} cy={pulse.y} r={13/cam.scale} fill={RED} opacity={0.12}/>
            <path d={d} fill="none" stroke={RED} strokeWidth={6} pathLength={1} strokeDasharray="0.055 1" strokeDashoffset={-(edge.flow.progress-0.055)}/>
            <g transform={`translate(${pulse.x} ${pulse.y}) rotate(${pulse.angle})`}>
              <path d="M-18 -8 L0 0 L-18 8" fill="none" stroke={RED} strokeWidth={4/cam.scale} strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>}
        </g>;
      })}
      {layout.map(n=>{
        const motion=nodeMotion(frame,n.id); const lines=wrapLabel(labelFor(n.id),n.w,n.size);
        const lineHeight=n.size*1.16; const initialY=n.y+n.h/2-(lines.length-1)*lineHeight/2;
        return <g key={n.id} data-unit={n.id} data-opacity={motion.opacity} opacity={ghost?0.2:motion.opacity} clipPath={`url(#card-wipe-${n.id})`}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={4}
            fill={interpolateColors(motion.solid,[0,1],['#fff',RED])}
            stroke={interpolateColors(motion.accent,[0,1],['#aaa4a6',RED])} strokeWidth={3.2}/>
          <text x={n.x+n.w/2} y={initialY} textAnchor="middle" dominantBaseline="central" fontFamily="Poppins, sans-serif" fontSize={n.size} fontWeight={650}
            fill={interpolateColors(motion.solid,[0,1],['#242124','#fff'])}>
            {lines.map((line,i)=><tspan key={i} x={n.x+n.w/2} dy={i?lineHeight:0}>{line}</tspan>)}
          </text>
        </g>;
      })}
    </g>
  </svg>;
}
