project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Saiba como o navegador cria as árvores do DOM e do CSSOM

{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# Desenvolvimento do modelo de objeto {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Para conseguir renderizar a página, o navegador precisa construir as árvores do DOM e do CSSOM. Como resultado, precisamos garantir a entrega mais rápida possível do HTML e do CSS ao navegador.


### TL;DR {: .hide-from-toc }
- Bytes → caracteres → tokens → nós → modelos de objeto.
- A marcação HTML é transformada em um Document Object Model (DOM). A marcação CSS é transformada em um CSS Object Model (CSSOM).
- DOM e CSSOM são estruturas de dados independentes.
- A "Timeline" do Chrome DevTools permite registrar e avaliar os recursos usados para a criação e o processamento do DOM e do CSSOM.


## Document Object Model (DOM)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom.html){: target="_blank" .external }

Vamos começar com o caso mais simples possível: uma página HTML simples com texto e uma única imagem. Como o navegador processa essa página?

<img src="images/full-process.png" alt="Processo de construção do DOM">

1. **Conversão:** O navegador lê os bytes brutos do HTML fora do disco ou da rede e converte-os em caracteres individuais com base na codificação especificada do arquivo (por exemplo, UTF-8).
1. **Tokenização:** O navegador converte sequências de caracteres em tokens distintos &mdash; como especificado pelo [padrão HTML5 do W3C](http://www.w3.org/TR/html5/){: .external }. Por exemplo, "&lt;html&gt;", "&lt;body&gt;" &mdash; e outras strings entre sinais de "maior que" e "menor que". Cada token tem um significado especial e seu próprio conjunto de regras.
1. **Regras:** Os tokens emitidos são convertidos em "objetos", que definem suas propriedades e regras.
1. **Criação do DOM:** Por fim, como a marcação HTML cria relacionamentos entre tags diferentes (algumas tags estão contidas dentro de tags), os objetos criados são vinculados em uma estrutura de dados em árvore que também identifica os relacionamentos hierárquicos definidos na marcação original: o objeto _HTML_ é primário ao objeto _body_, o objeto _body_ é primário ao objeto _paragraph_, e assim por diante.

<img src="images/dom-tree.png"  alt="árvore do DOM">

**O resultado final de todo esse processo é o Document Object Model, ou "DOM", da nossa página simples, que é usado pelo navegador para todos os demais processamentos da página.**

Sempre que o navegador processa marcação HTML, ele precisa executar todas as etapas acima: converter bytes em caracteres, identificar tokens, converter tokens em nós e criar a árvore do DOM. Esse processo todo pode demorar um pouco, particularmente se houver uma grande quantidade de HTML a processar.

<img src="images/dom-timeline.png"  alt="Rastrear a construção do DOM no DevTools">

Observação: Presumimos que você conheça o básico do Chrome DevTools. Ou seja, você sabe como capturar uma cascata de rede ou registrar uma linha do tempo. Caso precise de um resumo para recapitular, consulte a <a href='/web/tools/chrome-devtools/'>documentação do Chrome DevTools</a> ou, se ainda não conhece bem o DevTools, faça o curso <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a>."

Se você abrir o Chrome DevTools e registrar uma linha do tempo durante o carregamento da página, verá o tempo realmente necessário para se executar essa etapa &mdash; no exemplo acima, foram necessários cerca de 5 ms para converter um bloco de HTML em uma árvore do DOM. Para páginas maiores, esse processo pode ser bem mais demorado. Ao criar animações fluidas, essa parte pode facilmente se tornar um gargalo se o navegador tiver que processar muito HTML.

A árvore do DOM captura as propriedades e os relacionamentos da marcação do documento, mas não nos diz nada sobre a aparência do elemento quando renderizado. Isso é responsabilidade do CSSOM.

## CSS Object Model (CSSOM)

Quando o navegador estava construindo o DOM da nossa página simples, encontrou uma tag link na seção de cabeçalho do documento que referenciava uma folha de estilo CSS externa: style.css. Prevendo que esse recurso será necessário para renderizar a página, o navegador envia imediatamente uma solicitação desse recurso, que é devolvida com o seguinte conteúdo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

Poderíamos ter declarado os estilos diretamente na marcação HTML (embutida), mas a manutenção do CSS independente do HTML nos permite tratar conteúdo e design como assuntos separados. Os designers podem trabalhar no CSS, os desenvolvedores podem se concentrar no HTML, e assim por diante.

Assim como no HTML, precisamos converter as regras CSS recebidas em algo que o navegador consiga entender e usar. Portanto, repetimos o processo do HTML, mas para o CSS dessa vez:

<img src="images/cssom-construction.png"  alt="Etapas de construção do CSSOM">

Os bytes do CSS são convertidos em caracteres, depois em tokens, nós e, por fim, são vinculados em uma estrutura de árvore conhecida como "CSS Object Model", ou, abreviando, CSSOM:

<img src="images/cssom-tree.png"  alt="Árvore do CSSOM">

Por que o CSSOM tem uma estrutura de árvore? Para calcular o conjunto final de estilos de um objeto da página, o navegador começa com a regra mais geral aplicável a esse nó (por exemplo, se é secundário a um elemento "body", todos os estilos de "body" se aplicam). Em seguida, refina com recursos os estilos calculados aplicando regras mais específicas, ou seja, as regras são aplicadas em "cascata de cima para baixo".

Para sermos mais claros, vamos considerar a árvore do CSSOM acima. Todo o texto dentro da tag _span_ colocado dentro do elemento "body" tem fonte de tamanho 16 pixels na cor vermelha. A instrução de tamanho de fonte é aplicada em cascata de "body" a "span". No entanto, se uma tag span for filha de uma tag paragraph (P), seu conteúdo não será exibido.

Além disso, observe que a árvore acima não é a árvore do CSSOM completa e mostra apenas os estilos que decidimos modificar na nossa folha de estilo. Todo navegador oferece um conjunto padrão de estilos, também denominado "estilos de user-agent", que é o que vemos quando não fornecemos um próprio conjunto de estilos próprio. Nossos estilos simplesmente substituem esses padrões (por exemplo, [estilos padrão do IE](http://www.iecss.com/){: .external }).

Para descobrir quanto tempo o processamento do CSS leva, registre uma linha do tempo no DevTools e procure pelo evento "Recalculate Style". Ao contrário da análise do DOM, a linha do tempo não mostra uma entrada "Parse CSS" separada. Em vez disso, captura a análise e a construção da árvore do CSSOM, além do cálculo recursivo dos estilos calculados nesse único evento.

<img src="images/cssom-timeline.png"  alt="Rastrear a construção do CSSOM no DevTools">

Nossa folha de estilo comum leva cerca de 0,6 ms para ser processada e afeta oito elementos da página &mdash; não muito, mas, mais uma vez, nada que possa ser ignorado. Porém, de onde vieram os oito elementos? O CSSOM e o DOM são estruturas de dados independentes. O que acontece é que o navegador está escondendo uma etapa importante. Em seguida, vamos falar sobre a [árvore de renderização](/web/fundamentals/performance/critical-rendering-path/render-tree-construction) que vincula o DOM e o CSSOM entre si.

<a href="render-tree-construction" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Tree Construction">
  <button>A seguir: Construção, layout e gravação da árvore de renderização</button>
</a>


{# wf_devsite_translation #}
