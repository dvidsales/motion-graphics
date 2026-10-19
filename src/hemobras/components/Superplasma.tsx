import {Img,staticFile,useCurrentFrame} from 'remotion';
import {ease} from './Graphics';
export function Superplasma({src,delay=0,scale=1}:{src?:string;delay?:number;scale?:number}){
 const f=useCurrentFrame();const p=ease(f,delay,25);
 const movement=(1-p)*60;
 // O quadro original permanece intacto. Apenas o enquadramento de apresentação
 // recorta a região do personagem; não há redesenho ou substituição por IA.
 return <div style={{width:620,height:700,opacity:p,transform:`translateX(${-movement}px) translateY(${Math.sin(Math.max(0,f-delay)/45)*2}px) scale(${scale*(.96+.04*p)})`,transformOrigin:'center center'}}>
 {src?<Img src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:
 <div style={{position:'relative',width:620,height:700,overflow:'hidden',maskImage:'linear-gradient(to right,transparent,black 6%,black 94%,transparent),linear-gradient(to bottom,transparent,black 6%,black 94%,transparent)',maskComposite:'intersect'}}>
 <Img src={staticFile('hemobras/superplasma-referencia-6s.png')} style={{position:'absolute',width:1920,height:1080,maxWidth:'none',left:-100,top:-200}}/>
 </div>}
 </div>;
}
