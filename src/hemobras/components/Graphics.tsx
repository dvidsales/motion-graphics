import type {ReactNode} from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';
import {unit} from '../data/organization';

export const ease = (frame: number, start: number, length = 20) => interpolate(frame, [start, start + length], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1)});
export function Reveal({children, delay = 0}: {children: ReactNode; delay?: number}) {
  const f = useCurrentFrame(); const p = ease(f, delay);
  return <div style={{opacity: p, transform: `translateY(${(1-p)*18}px)`}}>{children}</div>;
}
export function Card({id, x, y, w, h = 110, delay = 0, strong = false, size = 36}: {id: string; x: number; y: number; w: number; h?: number; delay?: number; strong?: boolean; size?: number}) {
  const frame = useCurrentFrame(); const p = ease(frame, delay);
  return <div data-unit={id} style={{position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', boxSizing: 'border-box', background: strong ? theme.red : theme.paper, color: strong ? 'white' : theme.dark, border: `2px solid ${strong ? theme.red : theme.line}`, borderRadius: 8, fontSize: size, fontWeight: strong ? 700 : 600, lineHeight: 1.16, textAlign: 'center', opacity: p, transform: `translateY(${(1-p)*12}px)`, boxShadow: '0 8px 20px rgba(70,25,25,0.035)'}}>{unit(id).name}</div>;
}
export function Line({d, delay = 0, dashed = false}: {d: string; delay?: number; dashed?: boolean}) {
  const p = ease(useCurrentFrame(), delay, 24);
  return <path d={d} fill="none" stroke={theme.line} strokeWidth={3} pathLength={dashed ? undefined : 1} strokeDasharray={dashed ? '8 7' : 1} strokeDashoffset={dashed ? 0 : 1-p} opacity={dashed ? p : 1}/>;
}
export const Lines = ({children}: {children: ReactNode}) => <svg width={1728} height={700} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>{children}</svg>;
