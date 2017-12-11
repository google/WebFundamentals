project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: TODO

{# wf_updated_on: 2015-08-20 #}
{# wf_published_on: 2014-03-31 #}

# Construção, layout e gravação da árvore de renderização {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

As árvores do CSSOM e do DOM são combinadas em uma árvore de renderização, que é usada para 
processar o layout de cada elemento visível e atua como mecanismo de entrada para o 
processo de gravação, que renderiza os pixels na tela. A otimização de cada uma dessas 
etapas é essencial para se obter o desempenho de renderização ideal.

Na seção anterior sobre a construção do modelo de objetos, criamos as árvores do DOM
e do CSSOM de acordo com os recursos HTML e CSS. No entanto, ambos são objetos
independentes que capturam aspectos diferentes do documento: um descreve o conteúdo
e o outro, as regras de estilo que devem ser
aplicadas ao documento. Como podemos mesclar os dois para que o navegador
renderize os pixels na tela?

### TL;DR {: .hide-from-toc }
- As árvores DOM e CSSOM são combinadas para formar a árvore de renderização.
- A árvore de renderização contém apenas os nós necessários para renderizar a página.
- O layout calcula a posição e o tamanho exatos de cada objeto.
- A gravação é a última etapa, em que a árvore de renderização final é usada para renderizar os pixels na tela.


Primeiro, o navegador combina o DOM e o CSSOM em uma "árvore de renderização" que captura todo o conteúdo visível do DOM e todas as informações de estilo do CSSOM de cada nó.

<img src="images/render-tree-construction.png" alt="DOM e o CSSOM combinados para criar a árvore de renderização" >

Para construir a árvore de renderização, em termos gerais, o navegador executa as seguintes atividades:

1. A partir da raiz da árvore DOM, percorre cada nó visível.

    * Alguns nós não são visíveis (por exemplo, tags script, tags meta e assim por diante) e são omitidos, pois não são refletidos no resultado da renderização.
    * Alguns nós foram ocultados via CSS e também são omitidos da árvore de renderização, como por exemplo, o nó "span"---do exemplo acima---não está presente na árvore de renderização porque temos uma regra explícita que define a propriedade "display: none" nela.

1. Para cada nó visível, encontre as regras do CSSOM correspondentes adequadas e aplique-as.
1. Emita nós visíveis com conteúdo e seus estilos processados.

Observação: um outro ponto que vale destacar é que `visibility: hidden` é diferente de `display: none`. O primeiro torna o elemento invisível, mas o elemento ainda ocupa espaço no layout (ou seja, é renderizado como uma caixa vazia), enquanto que o segundo (`display: none`) remove completamente o elemento da árvore de renderização: o elemento fica invisível e não faz parte do layout."

O resultado final é uma renderização com o conteúdo e as informações de estilo de todo o conteúdo visível na tela.  **Com a árvore de renderização concluída, podemos prosseguir para a fase de layout.**

Até agora, calculamos que nós devem ser visíveis e seus estilos processados. Mas ainda não calculamos a posição e o tamanho exatos na [janela de visualização](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) do dispositivo---essa é a fase do layout, também conhecida como "reflow".

Para determinar o tamanho e a posição exatos de cada objeto, o navegador começa na raiz da árvore de renderização e passa por toda ela. Vamos analisar um exemplo prático simples:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/nested.html){: target="_blank" .external }

O corpo da página acima contém dois divs aninhados. O primeiro div (primário) define o tamanho do nó na tela como 50% da largura da janela de visualização. O segundo div---que fica dentro do primário---define sua largura como 50% do seu primário, ou seja, 25% da largura da janela de visualização.

<img src="images/layout-viewport.png" alt="Calculando informações de layout" >

O resultado do processo de layout é um "modelo de caixa" que captura a posição e o tamanho exatos de cada elemento dentro da janela de visualização. Todas as medições relativas são convertidas em pixels absolutos na tela.

Agora que conhecemos os nós visíveis, seus estilos processados e sua geometria, podemos finalmente passar essas informações para a última fase, que converte cada nó da árvore de renderização em pixels reais na tela. Essa etapa é frequentemente chamada de "gravação" ou "rasterização".

Esse processo pode demorar um pouco porque o navegador tem bastante trabalho a fazer. No entanto, o Chrome DevTools pode fornecer algumas ideias para as três etapas descritas acima. Vamos examinar a fase de layout do nosso exemplo original "hello world":

<img src="images/layout-timeline.png" alt="Medindo layout no DevTools" >

* O evento "Layout" captura a construção, a posição e o cálculo de tamanho da árvore de renderização na "Timeline".
* Quando o layout é concluído, o navegador emite eventos "Paint Setup" e "Paint", que convertem a árvore de renderização em pixels na tela.

O tempo necessário para se executar a construção, o layout e a gravação da árvore de renderização varia de acordo com o tamanho do documento, dos estilos aplicados e, naturalmente, do dispositivo em que tudo isso é executado. Quanto maior o documento, maior o trabalho a ser executado pelo navegador. Quanto mais complexos os estilos, mais tempo será necessário para a gravação (por exemplo, o "custo" da gravação de uma cor sólida é pequeno, enquanto que o cálculo e a renderização de uma sombra projetada têm "custo" muito maior).

E finalmente, a página está visível na janela de visualização:

<img src="images/device-dom-small.png" alt="Página Hello World renderizada" >

Vamos recapitular as etapas do navegador:

1. Processar a marcação HTML e criar a árvore do DOM.
1. Processar a marcação CSS e criar a árvore do CSSOM.
1. Combinar o DOM e o CSSOM em uma árvore de renderização.
1. Executar o layout na árvore de renderização para calcular a geometria de cada nó.
1. Pintar os nós individuais na tela.

A nossa página de demonstração pode parecer bastante simples, mas exige bom tempo de trabalho. Se o DOM ou o CSSOM forem modificados, você teria que repetir o processo para descobrir que pixels precisariam ser renderizados novamente na tela.

**_A otimização do caminho crítico de renderização_ é o processo de minimizar o total de tempo gasto nas etapas 1 a 5 da sequência acima.** Isso permite renderizar conteúdo na tela o mais cedo possível, além de reduzir o tempo entre as atualizações da tela após a renderização inicial, ou seja, atingir uma taxa de atualização mais alta para conteúdo interativo.

<a href="render-blocking-css" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Blocking CSS">
  <button>A seguir: </button>CSS bloqueador de renderização
</a>


{# wf_devsite_translation #}
