# Revisão v3 — movimento das conexões e opacidade

## Estado de aprovação

O usuário confirmou que o tempo de leitura está bom, mas rejeitou o
resultado visual do piloto v2. O piloto continua **não aprovado**.
Os três vídeos seguintes não foram iniciados.

## Pedido atendido nesta revisão

1. Conexões se desenham ao longo do caminho hierárquico existente.
2. As pontas das setas acompanham o traçado, inclusive nas curvas de 90 graus.
3. Durante o foco, um pulso percorre a conexão até a área, em vez de deixar
   a linha inteiramente imóvel durante a leitura.
4. Toda área tem a primeira exposição com opacidade 100%, inclusive aquelas
   que depois se tornam contexto. Não nasce mais em 19% de opacidade.
5. A opacidade inicial permanece em 100% por pelo menos 72 quadros
   (2,4 segundos, incluindo a revelação lateral do cartão). O foco
   mantém a unidade em 100% durante seu período de leitura.
6. Ao perder o foco, a opacidade reduz continuamente, em até 32 quadros
   (aproximadamente 1,07 segundo), até o estado de contexto em 20%.
7. Quando uma área volta ao foco, opacidade, contorno e preenchimento são
   interpolados; não há troca instantânea entre estados de cor e atenção.
8. Os cartões entram com revelação lateral de 12 quadros, sem distorcer texto.

As relações, os nomes, a duração total de 70 segundos, os intervalos das
cenas, as legendas e os movimentos de câmera da v2 foram preservados.
As entradas dos elementos são escalonadas dentro dos mesmos intervalos.
A abertura e o Superplasma também foram preservados.

## Configuração

`src/hemobras/motion.ts` concentra:

- Instante de entrada de cada área e de início de cada ligação.
- Tempos de permanência e redução de opacidade.
- Intervalos de foco derivados de `data/cues.ts`.
- Leitura geométrica dos caminhos ortogonais.
- Posição e direção da ponta de cada seta ao longo do caminho.
- Passagens do pulso durante o foco.

O desenho usa uma máscara SVG com traçado normalizado para revelar cada
conector. As ligações tracejadas mantêm seu padrão durante a animação.
As pontas e pulsos usam o mesmo caminho da relação oficial, não outro
trajeto livre ou decorativo.

## Validação de movimento

`npm run check:motion` verifica propriedades temporais e geométricas:

- 40 áreas iniciam a exposição com 100% de opacidade.
- 39 conexões têm início, traçado intermediário e término distintos.
- Pontas percorrem os segmentos corretos e terminam na borda do cartão.
- Redução de opacidade tem valores intermediários e não salta para 20%.
- Retomadas de foco também são contínuas.
- Existe pulso em movimento durante o período de leitura dos comitês.

A inspeção de quadros sucessivos cobre traçado parcial, chegada dos cartões,
exposição integral e redução da opacidade. A aprovação estética permanece
exclusivamente com o usuário, independentemente dos testes técnicos.
