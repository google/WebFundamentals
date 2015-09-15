---
title: "Construção, layout e pintura da árvore de renderização"
description: "A árvore do CSSOM e do DOM se combinam em uma árvore de renderização, que é usada para computar o layout de cada elemento visível e serve como entrada para o processo de pintura, que renderiza os pixels na tela. A otimização de cada uma dessas etapas é essencial para obter um ótimo desempenho de renderização."
updated_on: 2014-09-18
key-takeaways:
  render-tree-construction:
    - A árvore do DOM e do CSSOM se combinam para formar a árvore de renderização.
    - A árvore de renderização contém apenas os nós necessários para renderizar a página.
    - O layout computa a posição e o tamanho exatos de cada objeto.
    - "A pintura é a última etapa, que capta a árvore de renderização final e renderiza os pixels na tela."
notes:
  hidden:
    - "Observação: `visibilidade: oculta` é diferente de `exibir: nenhum'`. O primeiro torna o elemento invisível, mas o elemento ainda ocupa espaço no layout (por exemplo, ele é renderizado como uma caixa vazia), enquanto o segundo (exibir: nenhum) remove o elemento totalmente da árvore de renderização, de forma que ele fique invisível e não faça parte do layout."
---
<p class="intro">
  A árvore do CSSOM e do DOM se combinam em uma árvore de renderização, que é usada para computar o layout de cada elemento visível e serve como entrada para o processo de pintura, que renderiza os pixels na tela. A otimização de cada uma dessas etapas é essencial para obter um ótimo desempenho de renderização.
</p>


Na seção anterior sobre a construção do modelo do objeto, construímos as árvores do DOM e do CSSOM com base nas entradas HTML e CSS. No entanto, ambos são objetos independentes, que capturam diferentes aspectos do documento: um descreve o conteúdo e o outro, as regras de estilo que devem ser aplicadas ao documento. Como combinamos os dois e fazemos com que o navegador renderize pixels na tela?

{% include shared/takeaway.liquid list=page.key-takeaways.render-tree-construction %}

A primeira etapa é que o navegador combine o DOM e o CSSOM em uma `árvore de renderização` que capture todo o conteúdo do DOM visível na página, além de toda a informação de estilo do SDDOM para cada nó.

<img src="images/render-tree-construction.png" alt="O DOM e o CSSOM são combinados para criar a árvore de renderização" class="center">

Para construir a árvore de renderização, o navegador basicamente faz o seguinte:

1. Começando na raiz da árvore do DOM, analisa todos os nós visíveis.
  * Alguns nós são totalmente invisíveis (por exemplo, tags de script, metatags etc.) e são omitidos, pois não são refletidos no resultado renderizado.
  * Alguns nós são ocultos via CSS e também são omitidos da árvore de renderização, por exemplo, o nó de extensão do exemplo acima está ausente da árvore de renderização porque temos uma regra explícita que define a propriedade `exibir: nenhum`.
1. Para cada nó visível, encontra as regras do CSSOM apropriadas e as aplica.
2. Emite nós visíveis com conteúdo e seus estilos computados.

{% include shared/remember.liquid list=page.notes.hidden %}

O resultado final é uma renderização que contém as informações de conteúdo e de estilo de todo o conteúdo visível na tela. Estamos quase lá.  **Com a árvore de renderização pronta, podemos passar para a etapa do `layout`.**

Nesse momento, já calculamos que nós devem ser visíveis e seus estilos computados, mas ainda não calculamos sua posição e tamanho exatos dentro do [viewport]({{site.fundamentals}}/layouts/rwd-fundamentals/set-the-viewport.html) do dispositivo: a etapa de `layout`, também conhecida como `refluxo`.

Para determinar o tamanho e a posição exata de cada objeto, o navegador começa na raiz da árvore de renderização e a analisa para computar a geometria de cada objeto da página. Analisaremos um exemplo prático:

{% include_code src=_code/nested.html snippet=full %}

O corpo da página acima contém dois divs aninhados: o primeiro div (primário) define o tamanho da exibição do nó como 50% da largura da janela de visão, e o segundo div contido pelo primário define sua largura como 50% da largura do primário, ou seja 25% da largura da janela de visão.

<img src="images/layout-viewport.png" alt="Como calcular informações do layout" class="center">

O resultado do processo de layout é um `modelo de caixa`, que precisamente captura a posição e o tamanho exatos de cada elemento da janela de visão: todas as medidas relativas são convertidas em posições absolutas de pixels na tela, e assim por diante.

Finalmente, agora que sabemos que nós são visíveis, seus estilos computados e geometria, finalmente podemos passar essas informações para a etapa final, que transformará cada nó da árvore de renderização nos pixels reais na tela. Essa etapa muitas vezes é chamada de `pintura` ou `rasterização`.

Você entendeu tudo isso? Cada uma dessas etapas exige muito trabalho do navegador, o que também significa que isso pode demorar bastante. A boa notícia é que o DevTools do Chrome pode nos ajudar a entender melhor as três etapas que explicamos. Analisaremos a etapa de layout de nosso exemplo original `olá, mundo`:

<img src="images/layout-timeline.png" alt="Medir o layout no DevTools" class="center">

* A construção da árvore de renderização e o cálculo da posição e do tamanho são capturados com o evento `Layout` no cronograma.
* Quando o layout é concluído, o navegador emite eventos `Configuração da pintura` e `Pintura` que transformam a árvore de renderização em pixels na tela.

O tempo necessário para a construção da árvore de renderização, o layout e a pintura varia de acordo com o tamanho do documento, os estilos aplicados e, é claro, o dispositivo em que ele está sendo executado: quanto maior o documento, maior será o trabalho do navegador; quanto mais complicados os estilos, mais tempo será consumido para a pintura (por exemplo, é `fácil` pintar uma cor sólida, e uma cor sombreada é muito mais `difícil` de computar e renderizar).

Quando tudo estiver pronto, nossa página finalmente poderá ser visualizada na janela de visão. Oba!

<img src="images/device-dom-small.png" alt="Página "Olá, mundo" renderizada" class="center">

Faremos uma recapitulação rápida de todas as etapas pelas quais o navegador passou:

1. Processar a marcação HTML e construir a árvore de DOM.
2. Processar a marcação CSS e construir a árvore de CSSOM.
3. Combinar o DOM e o CSSOM em uma árvore de renderização.
4. Executar o layout na árvore de renderização para computar a geometria de cada nó.
5. Pintar cada nó na tela.

Nossa página de demonstração pode parecer simples, mas exige muito trabalho. O que você acha que aconteceria se o DOM ou o CSSOM fosse modificado? Teríamos que repetir o mesmo processo para descobrir que pixels precisam ser renderizados novamente na tela.

**Otimizar o caminho de processamento essencial é o processo de minimizar o tempo total das etapas 1 a 5 na sequência mencionada acima.** Fazer isso permite renderizar o conteúdo na tela o mais rápido possível, além de reduzir o tempo entre as atualizações da tela depois da renderização inicial, ou seja, obter uma taxa de atualização mais alta para conteúdo interativo.



