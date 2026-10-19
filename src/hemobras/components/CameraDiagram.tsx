import {interpolateColors, useCurrentFrame} from 'remotion';
import {cameraAt} from '../camera';
import {connector, labelFor, layout} from '../data/layout';
import {connectionMotion, hasDashedConnection, nodeMotion, routes} from '../motion';
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
          {d && edge.draw>0 && edge.draw<1 && <mask id={`edge-draw-${n.id}`} maskUnits="userSpaceOnUse"
            x={Math.min(...routes[n.id].map(p=>p.x))-24} y={Math.min(...routes[n.id].map(p=>p.y))-24}
            width={Math.max(...routes[n.id].map(p=>p.x))-Math.min(...routes[n.id].map(p=>p.x))+48}
            height={Math.max(...routes[n.id].map(p=>p.y))-Math.min(...routes[n.id].map(p=>p.y))+48}>
            <path d={d} fill="none" stroke="white" strokeWidth={24} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1-edge.draw}/>
          </mask>}
        </g>;
      })}
    </defs>
    <g transform={`translate(960 380) scale(${cam.scale}) translate(${-cam.x} ${-cam.y})`}>
      {layout.filter(n=>connector(n.id)).map(n=>{
        const edge=connectionMotion(frame,n.id); const node=nodeMotion(frame,n.id); const d=connector(n.id);
        const color=interpolateColors(node.accent,[0,1],['#aaa4a6',RED]);
        if(edge.draw<=0 || edge.opacity<=0) return null;
        return <g key={`edge-${n.id}`} data-connection={n.id} data-draw={edge.draw} opacity={ghost?0.16:edge.opacity}>
          <path d={d} mask={edge.draw<1?`url(#edge-draw-${n.id})`:undefined} fill="none" stroke={color} strokeWidth={4.2} strokeLinejoin="round" strokeDasharray={hasDashedConnection(n.id)?'9 8':undefined}/>
          {edge.draw>0 && <g transform={`translate(${edge.tip.x} ${edge.tip.y}) rotate(${edge.tip.angle})`}>
            <path d="M-16 -7 L0 0 L-16 7" fill="none" stroke={RED} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round"/>
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
