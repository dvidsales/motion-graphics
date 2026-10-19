import {Img, staticFile} from 'remotion';
export type CharacterAssets = {invite?: string; president?: string; closing?: string};
// Ausência do arquivo não gera personagem substituto nem imagem inventada.
export function Character({src, width = 470}: {src?: string; width?: number}) {
  return src ? <Img src={staticFile(src)} style={{width, maxHeight: 650, objectFit: 'contain'}}/> : null;
}
