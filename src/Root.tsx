import {Composition} from 'remotion';
import {MotionIntro} from './MotionIntro';
import {HemobrasPilot} from './hemobras/Pilot';
import {VIDEO} from './hemobras/theme';
export const RemotionRoot = () => <>
  <Composition id="HemobrasAbertura" component={HemobrasPilot} durationInFrames={VIDEO.durationInFrames}
    fps={VIDEO.fps} width={VIDEO.width} height={VIDEO.height} defaultProps={{characterAssets: {}}}/>
  <Composition id="MotionIntro" component={MotionIntro} durationInFrames={180}
    fps={30} width={1920} height={1080}
    defaultProps={{title: 'IDEIAS EM', subtitle: 'MOVIMENTO', accent: '#b8ff65'}} />
</>;
