# Hemobrás — Novo organograma / Hemo TV

Piloto v4 em Remotion 4.0.536, React, TypeScript e SVG. A composição
`HemobrasAbertura` tem 70 segundos, 1920 × 1080, 30 fps e nenhum áudio.

A base visual combina a abertura em vinho de `PRESIDENCIA-ORGAN-v2.mp4` com
navegação contínua, zoom, destaques e legendas de
`hemotv-video1-novo-organograma.mp4`. Na v4, cada ligação é desenhada uma única vez e a ponta para ao chegar à
área; não há pulsos repetidos nas conexões prontas. As áreas aparecem em
100% antes de reduzir sua opacidade. O Superplasma aparece na abertura,
na chamada da Presidência e no encerramento. O usuário não aprovou os pilotos anteriores. Esta revisão continua para avaliação,
sem aprovação automática do piloto. Os outros três vídeos
aguardam a aprovação explícita deste piloto.

## Instalação e Studio

Requisitos: Node.js 24, npm, Chromium em `/usr/bin/chromium`, FFmpeg,
ffprobe e Python 3. A fonte Poppins é instalada pelo npm e empacotada
localmente, sem depender de fontes externas durante a renderização.

```bash
cd /workspace/motion-graphics
npm ci --no-audit --no-fund
npm run dev -- --no-open
```

No Studio, selecione `HemobrasAbertura`. A porta é 3000. O cache npm usa
`/tmp/motion-npm-cache`. Não são necessárias credenciais da aplicação.

## Renderização e verificação

```bash
npm run typecheck
npm run check:motion
npm run build
npm run render:piloto
npm run still:piloto
npm run validate:piloto
node scripts/review-pilot.mjs
```

O comando de renderização gera um intermediário e executa
`scripts/finalize-pilot.mjs` para entregar H.264, yuv420p, faixa de vídeo
limitada BT.709, CRF 18, faststart e ausência de áudio. Concorrência 2.

- MP4 final: `out/hemobras/01-abertura-revisao.mp4`.
- Auditoria: `out/hemobras/validation.json`.
- Quadros de revisão: `out/hemobras/review/`.
- Entrega v4: `entregas/hemobras-piloto-v4.mp4` quando publicada.

A validação verifica resolução, duração, taxas média e nominal de quadros,
2.100 quadros decodificados, ausência de áudio, formato de pixel e cor.
Também decodifica integralmente o MP4 com FFmpeg. Isso não substitui a
avaliação de ritmo, leitura em TV e fidelidade institucional pelo usuário.

## Estrutura e edição

- `src/hemobras/data/organization.ts`: unidades principais e vínculos.
- `src/hemobras/data/layout.ts`: contexto oficial, posições e geração de conectores.
- `src/hemobras/data/cues.ts`: destaques, legendas e intervalos em quadros.
- `src/hemobras/camera.ts`: posições, escalas e pausas da câmera virtual.
- `src/hemobras/motion.ts`: entradas, opacidade, traçado e movimento das setas.
- `src/hemobras/components/CameraDiagram.tsx`: desenho vetorial.
- `src/hemobras/components/Hero.tsx`: abertura, chamada e encerramento.
- `src/hemobras/components/Superplasma.tsx`: apresentação do personagem.
- `src/hemobras/components/Caption.tsx`: realce de nomes nas legendas.
- `src/hemobras/Pilot.tsx`: composição e transições.
- `src/hemobras/timeline.ts`: divisões editoriais globais.
- `public/hemobras/`: recursos locais do organograma e personagem.
- `docs/`: fontes, alterações e relatórios.

Para modificar um nome, ajuste os dados e revise a quebra de linhas e o
enquadramento. Os conectores são gerados a partir dos mesmos `parent` das
unidades. Aumentar nomes pode exigir alterar largura, altura e tamanho de
fonte em `layout.ts`. A hierarquia não deve ser deduzida da posição visual. Ao acrescentar uma
unidade, registre sua entrada em `motion.ts`; assim ela não nasce esmaecida.
Os parâmetros `fullOpacityHold`, `fadeDuration` e `contextOpacity` controlam
respectivamente exposição inicial integral, fade e transparência do contexto.
O término de cada intervalo é exclusivo; 70 segundos são 2.100 quadros.

## Arte do Superplasma

A imagem local `superplasma-referencia-6s.png` é um quadro integral extraído
aos 6 segundos do vídeo `PRESIDENCIA-ORGAN-v2.mp4` enviado pelo usuário.
O componente recorta visualmente a região do personagem e suaviza apenas
as bordas do enquadramento para integrá-la ao fundo vinho. A arte não foi
redesenhada ou gerada por IA. A mesma pose é reutilizada nas três aparições;
esta revisão não simula movimentos independentes de braços ou rosto.

Para substituir por PNGs separados, coloque os arquivos em `public/` e
configure `characterAssets` nas propriedades da composição:

```json
{
  "characterAssets": {
    "invite": "hemobras/superplasma/convite.png",
    "president": "hemobras/superplasma/presidencia.png",
    "closing": "hemobras/superplasma/chamada.png"
  }
}
```

Sem propriedades adicionais, a composição já funciona com o recurso local
recuperado da referência. Não exige baixar ou localizar as imagens do chat.
Com PNGs separados, salve o JSON como `props-piloto.json` e use:

```bash
npx remotion render src/index.ts HemobrasAbertura out/hemobras/01-abertura-remotion.mp4 --props=props-piloto.json --browser-executable=/usr/bin/chromium --concurrency=2 --codec=h264 --pixel-format=yuv420p --crf=18 --muted
node scripts/finalize-pilot.mjs
npm run validate:piloto
```

## Aprovação e histórico

Os quatro roteiros são abertura, Industrial, Qualidade e Suprimentos, e
Gestão Corporativa e Financeira. Apenas o primeiro está implementado.
As versões anteriores foram preservadas em
`entregas/hemobras-piloto-revisao.mp4`, `entregas/hemobras-piloto-v2.mp4`
e `entregas/hemobras-piloto-v3.mp4`.
Veja `docs/revisao-v4.md` para o feedback e as mudanças da revisão atual. O projeto inicial `MotionIntro`
também foi preservado como composição separada.

## Verificação da ausência de repetição

```bash
node scripts/review-connections.mjs
python scripts/validate-connection-stills.py
```

A comparação opcional dos PNGs requer Pillow. Ela verifica que o gráfico
permanece idêntico em pausas com a câmera e a opacidade estáveis. O teste
`check:motion` também percorre todos os quadros posteriores à chegada das
39 conexões para impedir recomeços e pulsos.
