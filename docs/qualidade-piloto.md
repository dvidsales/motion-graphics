# Revisão técnica — piloto v4

O piloto permanece sem aprovação. Esta revisão remove os pulsos recorrentes
que faziam as setas continuarem em movimento depois de prontas.

## Verificações executadas

- TypeScript e bundle: aprovados.
- `check:motion`: aprovado para 40 áreas e 39 conexões.
- Pontas verificadas quadro a quadro após a chegada até o fim da composição:
  permanecem na mesma posição e direção; não existem emissores de pulsos.
- Renderizados 18 quadros de entrada, traçado parcial, repouso e encerramento.
- Comparação de pixels em pausas: 875/895, 895/915 e 990/1010 são idênticos
  na região do organograma, sem barra de progresso nem legenda.
- Câmera, intervalos, legendas e abertura não mudaram em relação à v3.

A exportação e a auditoria do MP4 são registradas em `validacao-render.json`.
A aprovação visual continua sendo uma decisão do usuário. Os três vídeos
seguintes permanecem sem implementação.

Exportação completa validada: 2.100 quadros decodificados, 70 segundos,
H.264, 1920×1080, 30 fps, yuv420p, BT.709 e sem áudio.
Trecho de revisão confirmado: 300 quadros e 10 segundos.
