import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import {AbsoluteFill,Sequence,useCurrentFrame} from 'remotion';
import {CameraDiagram} from './components/CameraDiagram';
import {Hero} from './components/Hero';
import {Caption} from './components/Caption';
import {cueAt} from './data/cues';
import {ease} from './components/Graphics';
import type {CharacterAssets} from './components/Character';
export type PilotProps={characterAssets:CharacterAssets};
export function HemobrasPilot({characterAssets}:PilotProps){
 const f=useCurrentFrame();const cue=cueAt(f);
 const progress=f/2099;
 return <AbsoluteFill style={{fontFamily:'Poppins, sans-serif',background:'#f7f6f4',color:'#262226'}}>
 <div style={{position:'absolute',top:0,left:0,right:0,height:6,background:'#8c1228'}}/>
 <header style={{position:'absolute',left:96,right:96,top:47,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
 <div style={{fontSize:25,color:'#8c1228',fontWeight:700,letterSpacing:1}}>Hemo TV <span style={{fontWeight:400,color:'#777075'}}> / Novo organograma da Hemobrás</span></div>
 <div style={{fontSize:23,color:'#8c1228',fontWeight:500}}>{cue?.section??'Hemobrás'}</div>
 </header>
 <div style={{position:'absolute',top:112,left:0,right:0,height:800,overflow:'hidden'}}><CameraDiagram/></div>
 <div style={{position:'absolute',left:72,right:72,bottom:64,minHeight:142,padding:'24px 36px',boxSizing:'border-box',background:'#fff',border:'1px solid #ece7e7',boxShadow:'0 5px 28px rgba(60,15,30,.03)',display:'flex',alignItems:'center'}}>
 <div style={{position:'absolute',left:0,top:24,bottom:24,width:6,background:'#8c1228'}}/>
 <div style={{fontSize:f>=1680?34:37,fontWeight:500,lineHeight:1.33,whiteSpace:'pre-line',maxWidth:1670}}><Caption text={cue?.caption??''}/></div>
 </div>
 <div style={{position:'absolute',bottom:29,left:96,right:96,height:3,background:'#e5dedf'}}><div style={{height:3,width:`${progress*100}%`,background:'#8c1228'}}/></div>
 <Sequence from={0} durationInFrames={240}><Hero mode="opening" src={characterAssets.invite}/></Sequence>
 <Sequence from={1080} durationInFrames={120}><Hero mode="presidency" src={characterAssets.president}/></Sequence>
 <Sequence from={1860} durationInFrames={240}><Hero mode="closing" src={characterAssets.closing}/></Sequence>
 {/* Passagens rápidas em vinho conectam os cartões de abertura ao mapa. */}
 {[240,1080,1200,1860].map(at=>{
 const local=f-at;if(local<0||local>=18)return null;
 return <AbsoluteFill key={at} style={{background:'#75091e',pointerEvents:'none',transform:`translateX(${ease(local,0,17)*100}%)`}}/>;
 })}
 </AbsoluteFill>;
}
