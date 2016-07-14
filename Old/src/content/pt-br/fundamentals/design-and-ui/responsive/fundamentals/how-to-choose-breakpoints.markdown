---
title: "Como escolher os pontos de quebra"
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
  Embora possa ser útil pensar nos tipos de dispositivo como base para definir os pontos de quebra, tenha cuidado.  Definir pontos de quebra a partir de dispositivos, produtos, marcas ou sistemas operacionais específicos pode resultar em grandes dificuldades de manutenção. Em vez disso, o próprio conteúdo deve determinar como o layout se ajusta ao recipiente.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Escolha os principais pontos de quebra e concentre-se nos dispositivos pequenos, em seguida, amplie o tamanho da janela de visualização

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

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

Por fim, configure novamente o código CSS.  Neste exemplo, colocamos os estilos comuns como fontes, ícones, posicionamento básico e cores em `weather.css`.  Os layouts específicos para a tela pequena são colocados em `weather-small.css`, e os estilos definidos para a tela grande são inseridos em `weather-large.css`.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Escolha pontos de quebra menores, quando necessário

Além de escolher os principais pontos de quebra quando o layout é alterado de forma significativa, também é recomendável fazer ajustes em caso de mudanças menores.  Por exemplo, entre pontos de quebra importantes, pode ser útil ajustar as margens ou o espaçamento de um elemento, ou aumentar o tamanho da fonte para deixá-la mais adequada ao layout.

Começaremos otimizando o layout de tela pequena.  Neste caso, aumentaremos a fonte quando a largura da janela de visualização for maior de 360 px.  Em segundo lugar, quando houver espaço suficiente, poderemos separar as previsões de temperatura alta e baixa para que elas fiquem na mesma linha, em vez de uma sobre a outra.  E vamos aumentar levemente os ícones da página.

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Para telas grandes, é mais indicado definir a largura máxima do painel de previsão para que ele não ocupe toda a largura da tela.

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

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

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## Nunca esconda totalmente o conteúdo

Tenha cuidado ao optar por esconder ou exibir conteúdo conforme o tamanho da tela.
Não oculte conteúdo apenas porque não consegue adaptar o conteúdo à tela.  O tamanho da tela não é uma indicação definitiva daquilo em que o usuário está interessado.  Por exemplo, eliminar a contagem de pólen da previsão do tempo pode ser um problema grave para usuários com alergia à primavera que precisam dessa informação para saber se podem sair na rua.




