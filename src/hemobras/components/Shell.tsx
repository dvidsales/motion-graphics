import type {ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {theme, VIDEO} from '../theme';
export function Shell({section, children, footer}: {section: string; children: ReactNode; footer?: string}) {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: theme.wash, fontFamily: theme.font, color: theme.dark}}>
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: theme.red}}/>
    <header style={{position: 'absolute', left: 96, right: 96, top: 54, height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dcd5d4', paddingBottom: 20}}>
      <div style={{fontSize: 25, fontWeight: 700, letterSpacing: 2, color: theme.red}}>HEMOBRÁS <span style={{color: theme.muted, fontWeight: 400, letterSpacing: 0}}> / Novo organograma</span></div>
      <div style={{fontSize: 24, color: theme.muted}}>Hemo TV</div>
    </header>
    <div style={{position: 'absolute', left: 96, right: 96, top: 165}}>
      <div style={{fontSize: 22, textTransform: 'uppercase', letterSpacing: 3, color: theme.red, marginBottom: 22}}>{section}</div>
      {children}
    </div>
    <footer style={{position: 'absolute', left: 96, right: 96, bottom: 54, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20, color: theme.muted}}>
      <div>{footer ?? 'Estrutura Organizacional • Aprovado CADM — 22/05/2026'}</div>
      <div style={{width: 160, height: 3, background: '#ded6d5'}}><div style={{height: 3, width: `${frame/(VIDEO.durationInFrames-1)*100}%`, background: theme.red}}/></div>
    </footer>
  </AbsoluteFill>;
}
