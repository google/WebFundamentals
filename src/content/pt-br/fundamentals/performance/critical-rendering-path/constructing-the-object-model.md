project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Antes de o navegador renderizar conteúdo para a tela, ele precisa criar as árvores DOM e CSSOM. Para isso, precisamos garantir que o HTML e o CSS sejam entregues ao navegador o mais rápido possível.

{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# Criação do modelo de objeto {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Antes de o navegador renderizar a página, ele precisa criar as árvores DOM e CSSOM. Para isso, precisamos garantir que o HTML e o CSS sejam entregues ao navegador o mais rápido possível.



### TL;DR {: .hide-from-toc }
- Bytes → caracteres → tokens → nós → modelo de objeto.
- A marcação HTML é transformada em um modelo de objeto de documento (DOM, na sigla em inglês), a marcação CSS é transformada em um modelo de objeto de CSS (CSSOM, na sigla em inglês).
- DOM e CSSOM são estruturas de dados independentes.
- O Chrome DevTools Timeline possibilita capturar e inspecionar os custos de criação e processamento de DOM e CSSOM.


## Document Object Model (DOM)


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Comecemos com o caso mais simples possível: uma página HTML sem formatação com texto e uma única imagem. O que o navegador precisa fazer para processar esta simples página?

<img src="images/full-process.png" alt="Processo de criação do DOM">

1. **Conversão:** o navegador lê os bytes brutos do HTML do disco ou da rede e os traduz em caracteres individuais baseados na codificação determinada do arquivo (por exemplo, UTF-8).
2. **Criação de tokens:** o navegador converte as strings de caracteres em tokens distintos especificados pelo [padrão W3C HTML5](http://www.w3.org/TR/html5/){: .external }, por exemplo, `<html>`, `<body>` e outras strings nos `colchetes angulares`. Cada token tem um significado e conjunto de regras especiais.
3. **Lexicalização:** os tokens emitidos são convertidos em `objetos` que definem suas propriedades e regras.
4. **Criação do DOM:** por último, como a marcação de HTML define as relações entre diferentes tags (algumas tags estão contidas em outras tags), os objetos criados são vinculados em uma estrutura de dados em forma de árvore que também captura as relações pai-filho definidas na marcação original: o objeto _HTML_ é pai do objeto _body_, _body_ é pai do objeto _paragraph_ e assim por diante.

<img src="images/dom-tree.png" class="center" alt="Árvore DOM">

**O resultado final deste processo é o Document Object Model, ou o `DOM` de nossa página simples, que o navegador usa para todo o processamento restante da página.**

Sempre que o navegador tem de processar a marcação HTML, ele precisa concluir as etapas acima: converter bytes em caracteres, identificar tokens, converter tokens em nós e criar a árvore de DOM. O processo completo pode levar algum tempo, especialmente se for necessário processar uma grande quantidade de HTML.

<img src="images/dom-timeline.png" class="center" alt="Como mapear a criação do DOM no DevTools">

Note: Suporemos que você sabe um pouco de Chrome DevTools, ou seja, que sabe como capturar uma cascata de rede ou gravar uma linha do tempo. Se você precisa de um atualizador rápido, confira a <a href='https://developer.chrome.com/devtools'>documentação do Chrome DevTools</a>, ou se você é novo no DevTools, recomendamos fazer o curso <a href='http://discover-devtools.codeschool.com/'>Explore e domine Chrome DevTools</a>, da Codeschool.

Se você abrir o Chrome DevTools e gravar uma linha do tempo enquanto a página é carregada, poderá ver o tempo real necessário para que essa etapa seja realizada. No exemplo acima, levamos aproximadamente 5 ms para converter um bloco de bytes de HTML em uma árvore de DOM. Logicamente, se a página fosse maior, como a maioria das páginas costuma ser, esse processo poderia levar muito mais tempo. Você verá em nossas sessões futuras sobre a criação de animações suaves que isso pode se tornar um recurso de afunilamento se o navegador tiver de processar grandes quantidades de HTML.

Com a árvore de DOM criada, será que temos informações o suficiente para renderizar a página para a tela? Ainda não. A árvore de DOM captura as propriedades e as relações da marcação do documento, mas não diz nada sobre a aparência que o elemento deve ter quando for renderizado. Isso é de responsabilidade do CSSOM, que nós conheceremos a seguir.

## CSS Object Model (CSSOM)

Enquanto o navegador criava o DOM de nossa página simples, ele encontrou uma tag de link na seção de cabeçalho do documento fazendo referência a uma folha de estilos CSS externa: style.css. Ao perceber que precisaria desse recurso para renderizar a página, o navegador imediatamente envia uma solicitação para esse recurso, que volta com o seguinte conteúdo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full"   adjust_indentation="auto" %}
</pre>

Poderíamos ter declarado nossos estilos diretamente na marcação de HTML (in-line), mas manter a CSS independente do HTML nos possibilita abordar conteúdo e design como preocupações distintas: os designers podem trabalhar em CSS enquanto os desenvolvedores podem focar-se em HTML e assim por diante.

Assim como ocorre com HTML, precisamos converter as regras de CSS recebidas em algo que o navegador possa entender e com o qual consiga trabalhar. Portanto, novamente, repetimos um processo muito semelhante ao usado com HTML:

<img src="images/cssom-construction.png" class="center" alt="Etapas de criação de CSSOM">

Os bytes de CSS são convertidos em caracteres, depois em tokens e nós e, por último, são vinculados em uma estrutura de árvore conhecida como `objeto de modelo de CSS` ou CSSOM:

<img src="images/cssom-tree.png" class="center" alt="Árvore de CSSOM">

Por que o CSSOM tem uma estrutura de árvore? Ao computar o conjunto final de estilos para qualquer objeto na página, o navegador começa pela regra mais geral que pode ser aplicada àquele nó (por exemplo, caso seja o filho de um elemento de corpo, então todos os estilos de corpo podem ser aplicados) e repetidamente refina os estilos computados aplicando regras mais específicas, ou seja, as regras se aplicam em uma cascata para baixo.

Para tornar isso mais palpável, considere a árvore CSSOM acima. Qualquer texto contido na tag _span_ que esteja posicionado no elemento de corpo terá um tamanho de fonte de 16 pixels e será vermelho. A diretiva font-size adota a forma de cascata para baixo do corpo para a dimensão. No entanto, se uma tag de dimensão for filha de uma tag de parágrafo (p), seus conteúdos não serão exibidos.

Além disso, a árvore acima não é a árvore CSSOM completa e só mostra os estilos que decidimos substituir em nossa folha de estilos. Cada navegador fornece um conjunto padrão de estilos, também conhecidos como `estilos de user-agent`. Isso é o que vemos ao deixar de fornecer um conjunto próprio, e nossos estilos simplesmente substituem esses padrões (por exemplo, [estilos IE padrão](http://www.iecss.com/){: .external }). Se você já inspecionou seus `estilos computados` no Chrome DevTools e se perguntou de onde surgiram todos esses estilos, aí está a sua resposta.

Curioso para saber quanto tempo levou o processamento de CSS? Grave uma linha do tempo no DevTools e procure o evento `Recalculate Style` (Recalcular estilo): diferentemente da análise de DOM, a linha do tempo não exibe uma entrada `Parse CSS` (Analisar CSS) separada. Em vez disso, ela captura a análise e a criação da árvore CSSOM mais o cálculo repetido dos estilos computados nesse evento único.

<img src="images/cssom-timeline.png" class="center" alt="Como mapear a criação do CSSOM no DevTools">

Nossa folha de estilos trivial leva aproximadamente 0,6 ms para ser processada e afeta oito elementos na página. Não é muito, mas não está livre. Entretanto, de onde vieram os oito elementos? CSSOM e DOM são estruturas de dados independentes. Acontece que o navegador oculta uma etapa muito importante. A seguir, falaremos sobre a árvore de renderização que vincula o DOM e o CSSOM um ao outro.



