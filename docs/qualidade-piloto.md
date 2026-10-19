# Revisão técnica — piloto v2

## Verificações

- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.
- `node scripts/review-pilot.mjs`: gerou 20 quadros distribuídos pela timeline.
- `npm run still:piloto`: gerou o convite com o Superplasma.
- `npm run render:piloto`: exportação e finalização do MP4.
- `npm run validate:piloto`: resultado corrente em `validacao-render.json`.

Amostras geradas: 0, 60, 140, 220, 300, 400, 540, 640, 720, 870, 1000,
1060, 1150, 1280, 1380, 1500, 1640, 1800, 1980 e 2099. A inspeção visual
abrangeu convite, topo, Conselho de Administração, os dois grupos de comitês,
chamada da Presidência, os grupos da Presidência, diretorias e encerramento.

Na inspeção, corrigiu-se o enquadramento do Conselho de Administração para
manter os cartões do foco dentro da tela. A conexão Diretoria Executiva →
Presidência é contínua; apenas os comitês desse grupo usam linha tracejada.
Os nós esmaecidos são contexto espacial e podem sair do enquadramento;
os nomes que são alvo de leitura recebem enquadramentos próprios estáveis.

## Recursos do personagem

O Superplasma está efetivamente renderizado em três momentos, usando a
arte do vídeo de referência. É uma pose estática com entrada e movimento
do elemento inteiro. Não foi substituído por texto ou marcador genérico.
A origem e o enquadramento são documentados em `revisao-v2.md`.

## Revisão humana pendente

O conforto de leitura à distância, ritmo, estilo e fidelidade institucional
continuam sujeitos à avaliação explícita do usuário. A apresentação geral
dos seis comitês é uma síntese após os enquadramentos de leitura em grupos
de três. Unidades menores em cinza não dependem de leitura nessa síntese.

A expressão histórica de novas áreas permanece a do roteiro: não foi
fornecido um organograma anterior que permita comparar datas de criação.

Os demais três vídeos não foram iniciados. A revisão v2 não representa
aprovação automática do piloto nem autorização para avançar na série.

## Reprodutibilidade do projeto

O ZIP foi extraído em diretório separado em `/tmp`; `npm ci` com lockfile
e `npm run typecheck` passaram. O arquivo ZIP teve sua integridade verificada.
