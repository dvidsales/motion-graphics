import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {title: string; subtitle: string; accent: string};

export const MotionIntro = ({title, subtitle, accent}: Props) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const enter = spring({frame: frame - 12, fps, config: {damping: 18}});
  const second = spring({frame: frame - 25, fps, config: {damping: 18}});
  const fade = interpolate(frame, [durationInFrames - 20, durationInFrames - 1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: '#101217', color: '#f8f7ef', fontFamily: 'Arial, sans-serif', overflow: 'hidden', opacity: fade}}>
      <div style={{position: 'absolute', width: 850, height: 850, border: `2px solid ${accent}`, borderRadius: '50%', right: -150, top: -250, transform: `scale(${0.8 + frame / 600})`}} />
      <div style={{position: 'absolute', width: 570, height: 570, background: accent, borderRadius: 100, right: -220, bottom: -280, transform: `rotate(${frame / 2 - 20}deg)`}} />
      <div style={{position: 'absolute', top: 88, left: 110, fontSize: 26, letterSpacing: 8, color: accent}}>MOTION LAB / 001</div>
      <div style={{position: 'absolute', left: 110, top: 340}}>
        <div style={{fontSize: 130, fontWeight: 800, letterSpacing: -6, lineHeight: 1.05, opacity: enter, transform: `translateY(${(1 - enter) * 90}px)`}}>{title}</div>
        <div style={{fontSize: 155, fontWeight: 900, letterSpacing: -8, color: accent, lineHeight: 1.05, opacity: second, transform: `translateY(${(1 - second) * 100}px)`}}>{subtitle}</div>
        <div style={{marginTop: 42, fontSize: 28, letterSpacing: 3, opacity: second}}>DESIGN. RITMO. POSSIBILIDADES.</div>
      </div>
      <div style={{position: 'absolute', left: 110, right: 110, bottom: 90, height: 3, background: '#34373c'}}>
        <div style={{width: `${100 * frame / (durationInFrames - 1)}%`, height: '100%', background: accent}} />
      </div>
    </AbsoluteFill>
  );
};
