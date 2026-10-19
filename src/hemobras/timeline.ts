export const scenes = [
  {id: 'abertura', start: 0, end: 240, label: 'Novo organograma da Hemobrás'},
  {id: 'topo', start: 240, end: 570, label: 'Topo da estrutura'},
  {id: 'vinculos', start: 570, end: 780, label: 'Conselho de Administração'},
  {id: 'comites', start: 780, end: 1080, label: 'Diretoria Executiva'},
  {id: 'chamada', start: 1080, end: 1200, label: 'Presidência'},
  {id: 'presidencia', start: 1200, end: 1680, label: 'Estrutura da Presidência'},
  {id: 'diretorias', start: 1680, end: 1860, label: 'Diretorias da Hemobrás'},
  {id: 'encerramento', start: 1860, end: 2100, label: 'Fique de olho na Hemo TV!'},
] as const;
export const sceneAt = (frame: number) => scenes.find((s) => frame >= s.start && frame < s.end)!;
