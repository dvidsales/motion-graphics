import {Easing, interpolate} from 'remotion';
export type Camera = {frame:number;x:number;y:number;scale:number};
// Trechos de movimento curtos alternam com permanências estáveis para leitura.
export const cameraKeys: Camera[] = [
 {frame:0,x:2090,y:800,scale:1.05},{frame:240,x:2090,y:800,scale:1.05},
 {frame:278,x:2240,y:450,scale:.78},{frame:560,x:2240,y:450,scale:.78},
 {frame:606,x:1290,y:620,scale:.80},{frame:768,x:1290,y:620,scale:.80},
 {frame:800,x:2090,y:530,scale:1.08},{frame:831,x:3175,y:630,scale:1.02},
 {frame:919,x:3175,y:630,scale:1.02},{frame:954,x:4675,y:630,scale:1.02},
 {frame:1020,x:4675,y:630,scale:1.02},{frame:1063,x:3900,y:610,scale:.54},
 {frame:1200,x:2090,y:850,scale:.95},{frame:1235,x:1470,y:1540,scale:.70},
 {frame:1300,x:1470,y:1540,scale:.70},{frame:1335,x:1460,y:2340,scale:.88},
 {frame:1410,x:1460,y:2340,scale:.88},{frame:1450,x:2800,y:1550,scale:.78},
 {frame:1540,x:2800,y:1550,scale:.78},{frame:1575,x:2910,y:1690,scale:.72},
 {frame:1650,x:2910,y:1690,scale:.72},{frame:1710,x:2100,y:3260,scale:.52},
 {frame:2100,x:2100,y:3260,scale:.52},
];
export function cameraAt(frame:number) {
 const keys=cameraKeys.map(k=>k.frame);
 const options={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const,easing:Easing.bezier(.65,0,.2,1)};
 return {x:interpolate(frame,keys,cameraKeys.map(k=>k.x),options),y:interpolate(frame,keys,cameraKeys.map(k=>k.y),options),scale:interpolate(frame,keys,cameraKeys.map(k=>k.scale),options)};
}
