# Início rápido — Hemo TV

Na raiz de `/workspace/motion-graphics`:

```bash
npm ci --no-audit --no-fund
npm run dev -- --no-open
```

No Studio, selecione **HemobrasAbertura**: piloto institucional de 70 segundos,
Full HD, 30 fps e sem áudio. A revisão v2 já inclui o Superplasma recuperado
do vídeo de referência e navegação contínua pelo organograma.

```bash
npm run typecheck
npm run build
npm run render:piloto
npm run validate:piloto
```

O resultado é `out/hemobras/01-abertura-revisao.mp4`. Instruções completas,
estrutura editável, arte do personagem e parâmetros de exportação estão no
[README](README.md). Veja `docs/revisao-v2.md` para a direção visual.

Requisitos: Node.js 24, Chromium em `/usr/bin/chromium`, FFmpeg/ffprobe e
Python 3. A fonte Poppins é instalada localmente pelo npm. Não são
necessárias credenciais. O cache npm usa `/tmp/motion-npm-cache`.

A composição `MotionIntro` e os comandos antigos `render` e `still` foram
preservados como exemplo independente de 6 segundos. Para o piloto Hemobrás,
use os comandos com sufixo `:piloto`.

Consulte os termos de licença do Remotion antes do uso comercial:
https://www.remotion.dev/license
