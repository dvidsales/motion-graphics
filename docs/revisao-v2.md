# Revisão v2 — referências e decisões

## Pedido

Combinar uma abertura semelhante a PRESIDENCIA-ORGAN-v2 com o estilo e o
dinamismo de hemotv-video1-novo-organograma. Incluir o Superplasma, ausente
na entrega anterior. Manter a informação conforme o organograma.

## Referências examinadas

- hemotv-video1-novo-organograma.mp4: 69,5 segundos, Full HD, 30 fps, sem áudio.
  Organograma em um espaço contínuo; pan e zoom; contexto esmaecido;
  realce em vermelho; legenda fixa em faixa inferior.
- PRESIDENCIA-ORGAN-v2.mp4: 50,583 segundos, Full HD, 24 fps, sem áudio.
  Abertura em vinho, tipografia geométrica branca e Superplasma real.

Os vídeos são referências de estilo. As relações e nomenclaturas continuam
baseadas no PDF oficial; eventuais diferenças das referências não são
copiadas para a estrutura.

## Implementação

- Abertura de 8 segundos: título e convite com personagem.
- Diagrama vetorial contínuo, enquadrado por câmera virtual com pausas.
- Grupos de três comitês recebem enquadramentos de leitura antes da síntese.
- Áreas da Presidência são destacadas por grupos sucessivos.
- Ramificações oficiais aparecem esmaecidas como contexto espacial,
  seguindo o exemplo aprovado pelo usuário; não são inventadas unidades.
- Legendas em faixa inferior estável, com realce de nomes.
- Mesmo personagem real na chamada da Presidência e no fechamento.
- Conteúdo da série não foi redistribuído; demais vídeos não implementados.

## Proveniência da arte

O quadro integral aos 6 segundos de PRESIDENCIA-ORGAN-v2 foi extraído com
FFmpeg, sem redesenho da arte. Foi copiado para o recurso local
`public/hemobras/superplasma-referencia-6s.png`. O enquadramento em React
usa a área x=100..720, y=200..900 do quadro Full HD para apresentar apenas
o personagem e seu fundo. Máscaras CSS nas bordas integram o fundo vinho.

Limite: essa é uma pose estática animada como um elemento inteiro. A
resolução deriva do vídeo de referência; não substitui uma matriz vetorial
da arte. Não há geração por IA nem falsa alegação de articulação do corpo.

## Fidelidade

- Assembleia Geral liga Conselho de Administração e Conselho Fiscal.
- Diretoria Executiva fica sob Conselho de Administração; Presidência,
  sob Diretoria Executiva, com conexão contínua.
- Secretaria Executiva dos Órgãos Colegiados e Corregedoria se ligam ao
  Conselho de Administração, conforme correção autorizada.
- Somente os seis comitês da Diretoria Executiva usam ligação tracejada
  nesse grupo. A conexão da Presidência é contínua.
- A grafia “contensioso” no contexto jurídico reproduz o PDF oficial.
- Afirmações históricas “agora”, “novas áreas” e “incorpora” são mantidas do
  roteiro; não há versão anterior para auditoria histórica.

## Aprovação

A revisão continua aguardando avaliação explícita do usuário sobre estilo,
ritmo, legibilidade e fidelidade. Não implica aprovação dos outros vídeos.
