---
title: "Use as consultas de mídia no código CSS para produzir um layout responsivo"
description: "Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela."
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - "Use uma metatag de janela de visualização para controlar a largura e o dimensionamento da janela de visualização dos navegadores."
    - "Inclua <code>width=device-width</code> para corresponder à largura da tela em número de pixels, independentemente do dispositivo."
    - "Inclua <code>initial-scale=1</code> para estabelecer uma relação de 1:1 entre os pixels do CSS e os pixels independentes do dispositivo."
    - "Mantenha ativo o redimensionamento de usuários para garantir que a página seja acessível."
  size-content-to-vp:
    - "Não use elementos grandes de largura fixa."
    - "O conteúdo não deve depender de uma largura específica da janela de visualização para que seja processado adequadamente."
    - "Use consultas de mídia de CSS para aplicar diferentes formatações de estilo a telas pequenas e grandes."
  media-queries:
    - "As consultas de mídia podem ser usadas para aplicar estilos com base nas características dos dispositivos."
    - "Use <code>min-width</code> sobre <code>min-device-width</code> para proporcionar uma experiência eficiente em telas mais largas."
    - "Use tamanhos relativos para elementos a fim de evitar quebra do layout."
  choose-breakpoints:
    - "Crie pontos de quebra com base no conteúdo, nunca em dispositivos, marcas ou produtos específicos."
    - "Elabore o projeto primeiramente para o menor dispositivo móvel e amplie a experiência de modo progressivo à medida que ela for disponibilizada em telas maiores."
    - "Mantenha as linhas de texto em no máximo 70 ou 80 caracteres."
notes:
  use-commas:
    - "Use uma vírgula para separar atributos e garantir que os navegadores mais antigos possam analisá-los corretamente."
---
<p class="intro">
  As consultas de mídia são filtros simples que podem ser aplicados a estilos de CSS. Elas facilitam a alteração de estilos com base nas características do dispositivo que processa o conteúdo, incluindo tipo de tela, largura, altura, orientação e até mesmo resolução.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


Por exemplo, é possível incluir todos os estilos necessários para impressão em uma consulta de mídia de impressão:

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

Além de usar o atributo `media` no link da planilha de estilo, existem duas outras formas de aplicar consultas de mídia que podem ser incorporadas em um arquivo CSS: `@media` e `@import`.  Para fins de desempenho, qualquer um desses dois métodos é mais indicado que a sintaxe `@import` (veja [Evite importações de CSS]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

A lógica aplicada às consultas de mídia não é mutuamente exclusiva e, se qualquer filtro atender aos critérios, o bloco CSS resultante será aplicado usando as regras padrão de precedência no CSS.

## Aplique as consultas de mídia com base no tamanho da janela de visualização

As consultas de mídia permitem criar uma experiência responsiva, em que estilos específicos são aplicados em telas pequenas e grandes e em qualquer tamanho intermediário.  A sintaxe da consulta de mídia permite a criação de regras que podem ser aplicadas conforme as características do dispositivo.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

Embora existam diversos itens sobre os quais podem ser criadas consultas, `min-width`, `max-width`, `min-height` e `max-height` são utilizados com mais frequência para a criação de Web design responsivo.


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="atributo">atributo</th>
      <th data-th="Resultado">Resultado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="atributo"><code>min-width</code></td>
      <td data-th="Resultado">As regras são aplicadas a qualquer largura de navegador acima do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="atributo"><code>max-width</code></td>
      <td data-th="Resultado">As regras são aplicadas a qualquer largura de navegador abaixo do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="atributo"><code>min-height</code></td>
      <td data-th="Resultado">As regras são aplicadas a qualquer altura de navegador acima do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="atributo"><code>max-height</code></td>
      <td data-th="Resultado">As regras são aplicadas a qualquer altura de navegador abaixo do valor definido na consulta.</td>
    </tr>
    <tr>
      <td data-th="atributo"><code>orientation=portrait</code></td>
      <td data-th="Resultado">As regras são aplicadas a qualquer navegador em que a altura é maior ou igual à largura.</td>
    </tr>
    <tr>
      <td data-th="atributo"><code>orientation=landscape</code></td>
      <td data-th="Resultado">As regras são aplicadas a qualquer navegador em que a largura é maior que a altura.</td>
    </tr>
  </tbody>
</table>

Vamos analisar um exemplo:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Visualização de uma página com consultas de mídia para alterar suas propriedades à medida que for redimensionada.">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* Quando o navegador tiver entre <b>0 px</b> e <b>640 px</b> de largura, o atributo `max-640px.css` será aplicado.
* Quando o navegador tiver entre <b>500 px</b> e <b>600 px</b> de largura, serão aplicados estilos no atributo `@media`.
* Quando o navegador tiver <b>640 px ou mais de largura</b>, o atributo `min-640px.css` será aplicado.
* Quando o navegador <b>tiver a largura maior que a altura</b>, o atributo `landscape.css` será aplicado.
* Quando o navegador <b>tiver a altura maior que a largura</b>, o atributo `portrait.css` será aplicado.


## Observação sobre `min-device-width`

Também é possível criar consultas com base em `*-device-width`, embora essa prática seja fortemente desencorajada**.

A diferença é sutil, mas muito importante: o atributo `min-width` é baseado no tamanho da janela do navegador, enquanto `min-device-width` é baseado no tamanho da tela.  Alguns navegadores, incluindo o navegador Android legado, podem não relatar corretamente a largura do dispositivo. Eles informam o tamanho da tela de acordo com o número de pixels do dispositivo, em vez de seguir a largura esperada da janela de visualização.

Além disso, o uso de `*-device-width` pode impedir o conteúdo de adaptar-se a computadores e a outros dispositivos que permitem o redimensionamento de janelas, já que a consulta está baseada no tamanho real do dispositivo, não no tamanho da janela do navegador.

## Use unidades relativas

Dois conceitos fundamentais associados ao design ágil são fluidez e proporcionalidade, em oposição aos layouts com largura fixa.  O uso de unidades de medida relativas pode ajudar a simplificar os layouts e impedir a criação inadvertida de componentes com tamanhos excessivos para a janela de visualização.

Por exemplo, ao definir a largura em 100% em um div de nível superior, você garante que o componente ocupará a largura da janela de visualização e nunca ficará excessivamente grande ou pequeno para essa janela.  O div se adaptará ao tamanho, mesmo que seja um iPhone com 320 px, um Blackberry com 342 px ou um Nexus 5 com 360 px de largura.

Além disso, a utilização de unidades relativas permite aos navegadores processar o conteúdo com base no nível de zoom dos usuários, sem a necessidade de adicionar à página barras de rolagem horizontais.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



