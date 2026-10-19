# Revisão técnica — piloto v3

O piloto v2 foi rejeitado pelo usuário quanto ao resultado visual. O tempo
de leitura foi considerado bom. O piloto continua **não aprovado**.

## Verificações da revisão

- `npm run typecheck`: aprovado.
- `npm run check:motion`: aprovado para 40 áreas e 39 conexões.
- `npm run build`: aprovado.
- `node scripts/review-pilot.mjs`: gerou 41 amostras de quadros.
- `npm run render:piloto`: exportação e finalização do MP4.
- `npm run validate:piloto`: resultado corrente em `validacao-render.json`.

As amostras incluem quadros próximos para comparação temporal: 280/310/350
(exposição integral e esmaecimento do topo), 578/586/598/622 (conexões se
formando), 650/690/720 (áreas apresentadas e depois reduzindo opacidade),
792/808/824/850/875 e 940/964/990 (comitês), e entrada e foco dos grupos da
Presidência. Também foram geradas amostras das diretorias e do fechamento.

A inspeção visual verificou linhas parcialmente desenhadas, pontas avançando
nos caminhos, presença das áreas com opacidade integral e estados de fade.
A verificação geométrica automatizada confirma que o movimento percorre
somente os segmentos das conexões existentes e termina na borda dos cartões.

## Preservação

Câmera, intervalos editoriais e legendas não mudaram em relação à v2. Nomes
e relações também permanecem os mesmos. A duração total continua sendo
2.100 quadros a 30 fps, sem áudio. A validação técnica do MP4 é registrada
separadamente da aprovação editorial.

A abertura, a chamada e o encerramento mantêm o Superplasma real recuperado
da referência, como documentado em `revisao-v2.md`. Trata-se de uma pose
animada como elemento inteiro, sem alegar articulação independente do corpo.

## Avaliação pendente

A adequação do dinamismo, estilo e resultado geral continua dependente da
avaliação explícita do usuário. Passar nos testes não aprova o piloto.
Os demais três vídeos não foram iniciados.

## Resultado da exportação

MP4 v3 decodificado integralmente com sucesso: H.264, 1920 × 1080,
30 fps, 2.100 quadros, 70 segundos, sem áudio, yuv420p, BT.709 e faixa
limitada. Quadros 280, 310 e 350 foram extraídos do MP4 final e inspecionados
para confirmar o traçado parcial, a exposição integral e o esmaecimento.

As fontes foram extraídas em diretório separado, reinstaladas com `npm ci`
e verificadas com TypeScript e `check:motion`. Todos passaram.
