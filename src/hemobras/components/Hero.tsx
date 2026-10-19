import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {ease} from './Graphics';
import {Superplasma} from './Superplasma';
export function Hero({mode,src}:{mode:'opening'|'presidency'|'closing';src?:string}){
 const f=useCurrentFrame();
 const switchP=ease(f,70,25);const inP=ease(f,4,24);
 const closing=mode==='closing';const presidency=mode==='presidency';
 return <AbsoluteFill style={{background:'radial-gradient(ellipse 720px 850px at 380px 550px,#913745 0%,#75091e 68%,#69051b 100%)',color:'white',overflow:'hidden'}}>
 <div style={{position:'absolute',left:96,top:62,fontSize:24,fontWeight:500,letterSpacing:3,opacity:.85}}>HEMOBRÁS <span style={{opacity:.65}}> / </span> HEMO TV</div>
 <div style={{position:'absolute',right:96,top:62,fontSize:22,letterSpacing:3,opacity:.65}}>NOVO ORGANOGRAMA</div>
 {mode==='opening'&&<div style={{position:'absolute',left:130,right:130,top:300,opacity:1-switchP,transform:`translateY(${(1-inP)*45-switchP*25}px)`,textAlign:'center'}}>
 <div style={{width:100,height:6,background:'white',margin:'0 auto 45px',transform:`scaleX(${inP})`}}/>
 <div style={{fontSize:112,fontWeight:750,lineHeight:1.06,letterSpacing:-3}}>NOVO<br/>ORGANOGRAMA</div><div style={{fontSize:42,marginTop:28,opacity:inP}}>da Hemobrás</div>
 </div>}
 <div style={{position:'absolute',left:60,top:195,opacity:mode==='opening'?switchP:1}}><Superplasma src={src} delay={mode==='opening'?70:0} scale={1.05}/></div>
 <div style={{position:'absolute',left:760,top:presidency?300:closing?245:295,right:120,opacity:mode==='opening'?switchP:inP,transform:`translateY(${(1-inP)*24}px)`}}>
 <div style={{height:6,width:88,background:'white',opacity:.8,marginBottom:36}}/>
 <div style={{fontSize:presidency?94:closing?66:88,fontWeight:700,lineHeight:1.14,letterSpacing:-2}}>
 {presidency?<>Chegamos<br/>à Presidência!</>:closing?<>Você sabe o que faz<br/>cada uma delas?</>:<>Vamos conhecer<br/>a estrutura!</>}
 </div>
 {mode==='opening'&&<div style={{fontSize:44,lineHeight:1.35,marginTop:42}}>Novas áreas passam a fazer parte do organograma.</div>}
 {closing&&<><div style={{fontSize:38,lineHeight:1.4,marginTop:35}}>Vamos apresentar um pouco mais sobre cada diretoria e as áreas que fazem parte dessa estrutura.</div><div style={{fontSize:53,lineHeight:1.2,fontWeight:700,marginTop:45,opacity:ease(f,55,20)}}>Fique de olho na Hemo TV!</div></>}
 </div>
 <div style={{position:'absolute',left:96,right:96,bottom:64,display:'flex',justifyContent:'space-between',fontSize:20,letterSpacing:2,opacity:.65}}><span>ESTRUTURA ORGANIZACIONAL</span><span>HEMO TV</span></div>
 </AbsoluteFill>;
}
