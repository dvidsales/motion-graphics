import {cues, type Cue} from './data/cues';
import {connector, diagramUnits, layout} from './data/layout';

// Valores em quadros, a 30 fps. Texto e câmera mantêm os tempos da revisão v2.
export const MOTION = {
  fullOpacityHold: 72,
  fadeDuration: 32,
  focusRise: 16,
  contextOpacity: 0.20,
  cardWipe: 12,
  flowDuration: 32,
  flowSpacing: 56,
};
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const ramp = (frame: number, start: number, duration: number) => {
  const t = clamp((frame - start) / duration);
  return t * t * (3 - 2 * t);
};
export type Arrival = {show: number; edgeStart: number; edgeDuration: number};
const arrival = (edgeStart: number, edgeDuration = 28): Arrival => ({
  edgeStart, edgeDuration, show: edgeStart + edgeDuration,
});
const explicit: Record<string, Arrival> = {
  assembleia: {show: 240, edgeStart: 240, edgeDuration: 0},
  cadm: {...arrival(252, 32), show: 240},
  executiva: {...arrival(273, 32), show: 240},
  presidencia: {...arrival(294, 32), show: 240},
  fiscal: {...arrival(266, 42), show: 240},
  secretaria: arrival(570, 32), corregedoria: arrival(584, 32),
  'auditoria-comite': arrival(580, 30), 'pessoas-comite': arrival(588, 30),
  'tecnico-comite': arrival(596, 30), auditoria: arrival(604, 30), ouvidoria: arrival(612, 30),
  seguranca: arrival(786, 30), tecnologia: arrival(794, 30), asg: arrival(802, 30),
  diversidade: arrival(920, 24), integridade: arrival(926, 24), etica: arrival(932, 24),
  gabinete: arrival(1200, 28), procuradoria: arrival(1208, 28),
  conformidade: arrival(1290, 28), negocios: arrival(1296, 28),
  assessoria: arrival(1390, 28), comunicacao: arrival(1400, 28), estrategica: arrival(1410, 28),
  industrial: arrival(1640, 48), qualidade: arrival(1640, 48), corporativa: arrival(1640, 48),
  'relacoes-institucionais': arrival(1234, 24), 'relacoes-internacionais': arrival(1242, 24),
  inovacao: arrival(1250, 24), 'juridica-contencioso': arrival(1248, 24),
  'juridica-consultivo': arrival(1256, 24),
  'inteligencia-mercado': arrival(1330, 24), parcerias: arrival(1338, 24),
  eventos: arrival(1440, 24), 'planejamento-orcamento': arrival(1520, 24),
  escritorio: arrival(1528, 24), pmo: arrival(1558, 24), processos: arrival(1566, 24),
};
export const arrivalFor = (id: string) => {
  const value = explicit[id];
  if (!value) throw new Error(`Unidade sem plano de animação: ${id}`);
  return value;
};
type Interval = {start: number; end: number};
const primary = (cue: Cue, id: string) => cue.strong.includes(id) ||
  (cue.strong.length === 0 && cue.outlined.includes(id));
const intervalsFor = (id: string, kind: 'primary' | 'solid' | 'reference'): Interval[] => {
  const intervals: Interval[] = [];
  for (const cue of cues) {
    const matches = kind === 'solid' ? cue.strong.includes(id) :
      kind === 'primary' ? primary(cue, id) : cue.outlined.includes(id);
    if (!matches) continue;
    const last = intervals.at(-1);
    if (last?.end === cue.start) last.end = cue.end;
    else intervals.push({start: cue.start, end: cue.end});
  }
  return intervals;
};
const intervals = Object.fromEntries(layout.map(({id}) => [id, {
  primary: intervalsFor(id, 'primary'), solid: intervalsFor(id, 'solid'),
  reference: intervalsFor(id, 'reference'),
}]));
const envelope = (frame: number, windows: Interval[]) => Math.max(0, ...windows.map(w =>
  ramp(frame, w.start, MOTION.focusRise) * (1 - ramp(frame, w.end, MOTION.fadeDuration)),
));
export function nodeMotion(frame: number, id: string) {
  const plan = arrivalFor(id);
  if (frame < plan.show) return {opacity: 0, wipe: 0, accent: 0, solid: 0, intro: 0};
  // A primeira exposição é obrigatoriamente a 100%; só depois começa o fade.
  const intro = 1 - ramp(frame, plan.show + MOTION.fullOpacityHold, MOTION.fadeDuration);
  const focus = envelope(frame, intervals[id].primary);
  const reference = envelope(frame, intervals[id].reference);
  const opacity = Math.max(
    MOTION.contextOpacity + (1 - MOTION.contextOpacity) * intro,
    MOTION.contextOpacity + (1 - MOTION.contextOpacity) * focus,
    MOTION.contextOpacity + 0.15 * reference,
  );
  return {
    opacity, intro, wipe: ramp(frame, plan.show, MOTION.cardWipe),
    accent: Math.max(intro, focus, reference * 0.65),
    solid: envelope(frame, intervals[id].solid),
  };
}
export type Point = {x: number; y: number};
export function pathPoints(d: string): Point[] {
  if (!d) return [];
  const tokens = d.match(/[MHV]|-?\d+(?:\.\d+)?/g) ?? [];
  let x = 0; let y = 0; const points: Point[] = [];
  for (let i = 0; i < tokens.length;) {
    const command = tokens[i++];
    if (command === 'M') {x = Number(tokens[i++]); y = Number(tokens[i++]);}
    else if (command === 'H') x = Number(tokens[i++]);
    else if (command === 'V') y = Number(tokens[i++]);
    else throw new Error(`Comando de conector não suportado: ${command}`);
    points.push({x, y});
  }
  return points;
}
export function pointOnPath(points: Point[], progress: number) {
  if (points.length < 2) return {x: points[0]?.x ?? 0, y: points[0]?.y ?? 0, angle: 0};
  const lengths = points.slice(1).map((b, i) => Math.hypot(b.x-points[i].x, b.y-points[i].y));
  let distance = lengths.reduce((a, b) => a+b, 0) * clamp(progress);
  for (let i=0; i<lengths.length; i++) {
    if (lengths[i] === 0) continue;
    if (distance <= lengths[i] || i === lengths.length-1) {
      const a=points[i]; const b=points[i+1]; const t=clamp(distance/lengths[i]);
      return {x:a.x+(b.x-a.x)*t, y:a.y+(b.y-a.y)*t, angle:Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI};
    }
    distance -= lengths[i];
  }
  const last=points.at(-1)!; return {...last, angle:0};
}
export const routes = Object.fromEntries(layout.map(n => [n.id, pathPoints(connector(n.id))]));
export function connectionMotion(frame: number, id: string) {
  const plan = arrivalFor(id); const node = nodeMotion(frame, id);
  const draw = ramp(frame, plan.edgeStart, Math.max(1, plan.edgeDuration));
  const opacity = frame < plan.edgeStart ? 0 : frame < plan.show ? 1 : node.opacity;
  let flow: null | {progress: number; opacity: number} = null;
  for (const window of intervals[id].primary) {
    const first = Math.max(window.start + 6, plan.edgeStart + plan.edgeDuration + 6);
    for (let start=first; start+MOTION.flowDuration <= window.end; start+=MOTION.flowSpacing) {
      if (frame >= start && frame < start+MOTION.flowDuration) {
        const progress=(frame-start)/MOTION.flowDuration;
        flow={progress, opacity:Math.min(1, progress*8, (1-progress)*8)};
      }
    }
  }
  return {draw, opacity, flow, tip:pointOnPath(routes[id], draw)};
}
export const hasDashedConnection = (id: string) => {
  const unit=diagramUnits.find(u=>u.id===id)!;
  return unit.parent==='executiva' && unit.relation==='advisory';
};
