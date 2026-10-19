# Revisão v4 — conectar uma vez e parar

## Feedback

O usuário rejeitou o resultado da v3 e apontou setas que continuavam se
repetindo mesmo quando a ligação já estava formada. O efeito de pulsos
recorrentes havia sido acrescentado na v3 e foi removido integralmente.
O piloto continua aguardando aprovação explícita.

## Comportamento atual

Cada conexão tem um único intervalo de formação, definido por tempo absoluto
na timeline. A ponta acompanha o desenho até a borda da área. Depois disso,
o caminho fica completo e a ponta permanece na posição final.

Voltar o foco para uma área não dispara novamente o desenho. Não há círculos,
brilhos, pulsos, novas pontas ou segmentos percorrendo a ligação pronta.
A cor e a opacidade ainda acompanham o foco e o esmaecimento das áreas.

Foram preservados: conteúdo, nomenclatura, relações do organograma, tempos
de leitura, câmera, legendas, abertura, Superplasma e entrada inicial em
100% de opacidade seguida de redução gradual. A duração permanece 70 s.

## Verificação

- `npm run check:motion`: as 39 pontas permanecem na mesma posição e direção
  em todos os quadros posteriores à chegada, inclusive ao retomar o foco.
- As 40 áreas mantêm a primeira exposição em 100%; fades continuam suaves.
- `node scripts/review-connections.mjs`: renderiza quadros de formação e repouso.
- `python scripts/validate-connection-stills.py`: compara pixels do organograma
  nos quadros 875/895/915 e 990/1010, com câmera parada e opacidade estável.
  Os pares são idênticos. A região exclui a barra de progresso do vídeo.

O teste de PNGs requer Pillow, disponível no ambiente de produção. É opcional
para a renderização do vídeo e complementa o teste geométrico em JavaScript.

As máscaras SVG só existem enquanto o caminho está sendo desenhado e usam
os limites da própria conexão; caminhos concluídos são desenhados diretamente.
Isso evita recalcular grandes máscaras nos períodos de repouso.

## Entrega

A v4 será apresentada como nova revisão, sem aprovação automática do piloto.
Os demais três vídeos continuam sem implementação. As versões anteriores
foram preservadas para comparação.
