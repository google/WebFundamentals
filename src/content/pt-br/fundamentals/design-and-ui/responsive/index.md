project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Grande parte da Web não está otimizada para experiências em múltiplos dispositivos. Conheça os princípios fundamentais para fazer seu site funcionar de maneira otimizada em dispositivos móveis, computadores ou qualquer aparelho com tela.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Princípios básicos de Web design responsivo {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


O uso de dispositivos móveis para navegar pela Web está aumentando em ritmo astronômico. No entanto, grande parte da Web não está otimizada para esses dispositivos. Os dispositivos móveis muitas vezes são limitados pelo tamanho da tela e exigem uma abordagem diferente em relação à forma como o conteúdo será disposto na tela.


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


### Responsive Web Design Fundamentals
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }




Existem inúmeros tamanhos de tela em diferentes celulares, `phablets`, tablets, computadores, consoles de videogame, TVs e até mesmo telas incorporadas em acessórios pessoais.  Os tamanhos das telas estão em constante evolução, por isso, é importante que seu site possa se adaptar a qualquer tamanho disponível hoje e no futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Web design responsivo, definido originalmente por [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/), relaciona-se às necessidades dos usuários e aos dispositivos que eles usam.  O layout é alterado de acordo com o tamanho e os recursos do dispositivo.  Por exemplo, em um celular, os usuários veem o conteúdo disposto em uma única coluna. Um tablet possivelmente exibirá o mesmo conteúdo em duas colunas.


## Definir a janela de visualização

É preciso que as páginas otimizadas para diversos dispositivos incluam um elemento meta de janela de visualização no título do documento.  Uma metatag de janela de visualização fornece ao navegador as instruções de como controlar as dimensões e o redimensionamento da página.

### TL;DR {: .hide-from-toc }
- Use uma metatag de janela de visualização para controlar a largura e o dimensionamento da janela de visualização dos navegadores.
- 'Inclua <code>width=device-width</code> para corresponder à largura da tela em número de pixels, independentemente do dispositivo.'
- 'Inclua <code>initial-scale=1</code> para estabelecer uma relação de 1:1 entre os pixels do CSS e os pixels independentes do dispositivo.'
- Mantenha ativo o redimensionamento de usuários para garantir que a página seja acessível.


Para tentar fornecer a melhor experiência possível, os navegadores de dispositivos móveis processarão a página na largura da tela de um computador (geralmente cerca de 980 px, embora esse número varie conforme o dispositivo) e, em seguida, aumentarão o tamanho das fontes e redimensionarão o conteúdo para adequá-lo à tela e tentar fazer com que ele seja exibido de forma mais eficaz.  Para os usuários, o tamanho das fontes pode parecer inconsistente, e talvez eles tenham que tocar duas vezes ou aumentar o zoom na página a fim de visualizar corretamente e interagir com o conteúdo.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Ao usar o valor meta de janela de visualização `width=device-width`, você faz com que a página corresponda à largura da tela em um número de pixels independentes do dispositivo. Assim, a página poderá reorganizar o conteúdo para adequar-se a diferentes tamanhos de tela, sejam processados em um pequeno celular ou em um grande monitor de computador.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Página sem uma janela de segmentação definida">
      Ver o exemplo
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Página com uma janela de segmentação definida">
      Ver o exemplo
    {% endlink_sample %}
  </div>
</div>

Alguns navegadores mantêm a largura da página constante, aumentando o zoom em vez de mudar a organização do conteúdo para preencher a tela no modo paisagem. O atributo `initial-scale=1` orienta os navegadores a estabelecer uma relação de 1:1 entre os pixels do código CSS e os pixels independentes do dispositivo, seja qual for a orientação da tela. Isso permite que a página aproveite a largura total do modo paisagem.

Note: Use uma vírgula para separar atributos e garantir que os navegadores mais antigos possam analisá-los corretamente.

### Estabeleça uma janela de visualização acessível

Além de definir um atributo `initial-scale`, você também pode definir os seguintes atributos na janela de visualização:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Quando definidos, esses atributos podem impedir o usuário de aumentar o zoom na janela de visualização, causando possíveis problemas de acessibilidade.


## Dimensione o conteúdo conforme a janela de visualização

Tanto em computadores quanto em dispositivos móveis, os usuários estão acostumados a rolar as páginas em sentido vertical, não em sentido horizontal. Ao forçar o usuário a rolar uma página horizontalmente ou diminuir o zoom para ver todo o conteúdo da página, você gera uma experiência insatisfatória.


### TL;DR {: .hide-from-toc }
- Não use elementos grandes de largura fixa.
- O conteúdo não deve depender de uma largura específica da janela de visualização para que seja processado adequadamente.
- Use consultas de mídia de CSS para aplicar diferentes formatações de estilo a telas pequenas e grandes.


Ao desenvolver um site para dispositivos móveis com uma metatag de janela de visualização, é fácil criar de forma acidental um conteúdo inadequado à largura da janela de visualização especificada. Por exemplo, uma imagem exibida em uma largura maior que a janela de visualização pode fazer com que a página tenha que ser rolada em sentido horizontal. Ajuste esse conteúdo para adequar-se à largura da janela de visualização, de forma que o usuário não precise rolar em sentido horizontal.

Como as dimensões e a largura da tela nos pixels do código CSS variam enormemente conforme os dispositivos (entre celulares e tablets, e mesmo entre diferentes celulares), o conteúdo não deve depender de uma largura de janela específica para ser corretamente processado.

A definição de elementos com grandes larguras absolutas no código CSS (como no exemplo abaixo) fará com que o div seja largo demais para a janela de visualização em um dispositivo mais estreito (por exemplo, um dispositivo com uma largura de 320 pixels no CSS, como um iPhone). Em vez disso, considere usar valores de largura relativos, como `width: 100%`.  Da mesma forma, cuidado ao usar grandes valores absolutos para definir posicionamento, já que eles podem fazer com que o elemento fique fora da janela de visualização em dispositivos com telas pequenas.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Página com um elemento fixo de 344 px de largura em um iPhone.">
      Ver o exemplo
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Página com um elemento fixo de 344 px em um Nexus 5.">
      Ver o exemplo
    {% endlink_sample %}
  </div>
</div>


## Use as consultas de mídia no código CSS para produzir um layout responsivo

As consultas de mídia são filtros simples que podem ser aplicados a estilos de CSS. Elas facilitam a alteração de estilos com base nas características do dispositivo que processa o conteúdo, incluindo tipo de tela, largura, altura, orientação e até mesmo resolução.




### TL;DR {: .hide-from-toc }
- As consultas de mídia podem ser usadas para aplicar estilos com base nas características dos dispositivos.
- Use <code>min-width</code> sobre <code>min-device-width</code> para proporcionar uma experiência eficiente em telas mais largas.
- Use tamanhos relativos para elementos a fim de evitar quebra do layout.



Por exemplo, é possível incluir todos os estilos necessários para impressão em uma consulta de mídia de impressão:


    <link rel="stylesheet" href="print.css" media="print">
    

Além de usar o atributo `media` no link da planilha de estilo, existem duas outras formas de aplicar consultas de mídia que podem ser incorporadas em um arquivo CSS: `@media` e `@import`.  Para fins de desempenho, qualquer um desses dois métodos é mais indicado que a sintaxe `@import` (veja [Evite importações de CSS]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

A lógica aplicada às consultas de mídia não é mutuamente exclusiva e, se qualquer filtro atender aos critérios, o bloco CSS resultante será aplicado usando as regras padrão de precedência no CSS.

### Aplique as consultas de mídia com base no tamanho da janela de visualização

As consultas de mídia permitem criar uma experiência responsiva, em que estilos específicos são aplicados em telas pequenas e grandes e em qualquer tamanho intermediário.  A sintaxe da consulta de mídia permite a criação de regras que podem ser aplicadas conforme as características do dispositivo.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Embora existam diversos itens sobre os quais podem ser criadas consultas, `min-width`, `max-width`, `min-height` e `max-height` são utilizados com mais frequência para a criação de Web design responsivo.


<table>
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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

* Quando o navegador tiver entre <b>0 px</b> e <b>640 px</b> de largura, o atributo `max-640px.css` será aplicado.
* Quando o navegador tiver entre <b>500 px</b> e <b>600 px</b> de largura, serão aplicados estilos no atributo `@media`.
* Quando o navegador tiver <b>640 px ou mais de largura</b>, o atributo `min-640px.css` será aplicado.
* Quando o navegador <b>tiver a largura maior que a altura</b>, o atributo `landscape.css` será aplicado.
* Quando o navegador <b>tiver a altura maior que a largura</b>, o atributo `portrait.css` será aplicado.


### Observação sobre `min-device-width`

Também é possível criar consultas com base em `*-device-width`, embora essa prática seja fortemente desencorajada**.

A diferença é sutil, mas muito importante: o atributo `min-width` é baseado no tamanho da janela do navegador, enquanto `min-device-width` é baseado no tamanho da tela.  Alguns navegadores, incluindo o navegador Android legado, podem não relatar corretamente a largura do dispositivo. Eles informam o tamanho da tela de acordo com o número de pixels do dispositivo, em vez de seguir a largura esperada da janela de visualização.

Além disso, o uso de `*-device-width` pode impedir o conteúdo de adaptar-se a computadores e a outros dispositivos que permitem o redimensionamento de janelas, já que a consulta está baseada no tamanho real do dispositivo, não no tamanho da janela do navegador.

### Use unidades relativas

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


## Como escolher os pontos de quebra 

Embora possa ser útil pensar nos tipos de dispositivo como base para definir os pontos de quebra, tenha cuidado.  Definir pontos de quebra a partir de dispositivos, produtos, marcas ou sistemas operacionais específicos pode resultar em grandes dificuldades de manutenção. Em vez disso, o próprio conteúdo deve determinar como o layout se ajusta ao recipiente.



### TL;DR {: .hide-from-toc }
- 'Crie pontos de quebra com base no conteúdo, nunca em dispositivos, marcas ou produtos específicos.'
- Elabore o projeto primeiramente para o menor dispositivo móvel e amplie a experiência de modo progressivo à medida que ela for disponibilizada em telas maiores.
- Mantenha as linhas de texto em no máximo 70 ou 80 caracteres.


### Escolha os principais pontos de quebra e concentre-se nos dispositivos pequenos, em seguida, amplie o tamanho da janela de visualização

Projete o layout do conteúdo para adequar-se inicialmente a uma tela pequena, depois amplie a tela até que seja necessário usar um ponto de quebra.  Com isso, será possível otimizar os pontos de quebra com base no conteúdo e manter o menor número possível de pontos de quebra.

Vamos trabalhar no exemplo que vimos anteriormente, a [previsão do tempo]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
O primeiro passo é fazer com que a previsão seja exibida de forma adequada em uma tela pequena.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Visualização da previsão do tempo exibida em uma tela pequena.">
  {% endlink_sample %}
</figure>

Em seguida, redimensione o navegador até que haja muitos espaços em branco entre os elementos e a previsão esteja desagradável visualmente.  A decisão é relativamente subjetiva, mas acima de 600 px a página fica excessivamente larga.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Visualização da previsão do tempo à medida que a página fica mais larga.">
  {% endlink_sample %}
</figure>

Para inserir um ponto de quebra em 600 pixels, crie duas novas planilhas de estilo, uma para usar quando o navegador tiver 600 px ou menos, outra para quando ele tiver mais de 600 px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/weather-2.html" region_tag="mqweather2" %}
</pre>

Por fim, configure novamente o código CSS.  Neste exemplo, colocamos os estilos comuns como fontes, ícones, posicionamento básico e cores em `weather.css`.  Os layouts específicos para a tela pequena são colocados em `weather-small.css`, e os estilos definidos para a tela grande são inseridos em `weather-large.css`.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

### Escolha pontos de quebra menores, quando necessário

Além de escolher os principais pontos de quebra quando o layout é alterado de forma significativa, também é recomendável fazer ajustes em caso de mudanças menores.  Por exemplo, entre pontos de quebra importantes, pode ser útil ajustar as margens ou o espaçamento de um elemento, ou aumentar o tamanho da fonte para deixá-la mais adequada ao layout.

Começaremos otimizando o layout de tela pequena.  Neste caso, aumentaremos a fonte quando a largura da janela de visualização for maior de 360 px.  Em segundo lugar, quando houver espaço suficiente, poderemos separar as previsões de temperatura alta e baixa para que elas fiquem na mesma linha, em vez de uma sobre a outra.  E vamos aumentar levemente os ícones da página.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Para telas grandes, é mais indicado definir a largura máxima do painel de previsão para que ele não ocupe toda a largura da tela.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

## Otimize o texto para aumentar a legibilidade

A teoria clássica da legibilidade sugere que uma coluna ideal deve conter 70 a 80 caracteres por linha (cerca de 8 a 10 palavras em inglês), por isso, sempre que a largura de um bloco de texto contiver mais de 10 palavras, deve-se considerar a inclusão de um ponto de quebra.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Antes de adicionar pontos de quebra menores.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Depois de adicionar pontos de quebra menores.">
  </div>
</div>

Vamos analisar em mais detalhes o exemplo de postagem de blog acima.  Em telas pequenas, a fonte Roboto com um em funciona de forma otimizada, formando dez palavras por linha, mas telas maiores exigem um ponto de quebra. Nesse caso, se a largura do navegador for superior a 575 px, a largura ideal para o conteúdo é 550 px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### Nunca esconda totalmente o conteúdo

Tenha cuidado ao optar por esconder ou exibir conteúdo conforme o tamanho da tela.
Não oculte conteúdo apenas porque não consegue adaptar o conteúdo à tela.  O tamanho da tela não é uma indicação definitiva daquilo em que o usuário está interessado.  Por exemplo, eliminar a contagem de pólen da previsão do tempo pode ser um problema grave para usuários com alergia à primavera que precisam dessa informação para saber se podem sair na rua.
