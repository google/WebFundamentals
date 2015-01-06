---
layout: article
title: "Dimensione o tamanho dos vídeos corretamente"
description: "Quando a satisfação de seus usuários está em jogo, o tamanho importa."
introduction: "Quando a satisfação de seus usuários está em jogo, o tamanho importa."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - Evite veicular vídeos que tenham um tamanho de quadro maior ou uma qualidade superior ao que é compatível com a plataforma.
    - Não exagere na duração de seus vídeos.
    - Vídeos longos podem causar interrupções no download e na busca. Alguns navegadores podem precisar aguardar até que o download do vídeo seja feito antes de poder reproduzi-lo.
remember:
  media-fragments:
    - A Media Fragments API é compatível com a maioria das plataformas, exceto o iOS.
    - Certifique-se de que o recurso Range Requests é compatível com seu servidor. Por padrão, o recurso Range Requests é ativado na maioria dos servidores, mas alguns serviços de hospedagem podem tê-lo desativado.
  dont-overflow:
    - Não force a dimensão de um elemento que pode resultar em uma proporção diferente do vídeo        original. O resultado visual de uma dimensão achatada ou esticada não é bom.
  accessibility-matters:
    - O elemento de faixa é compatível com o Google Chrome para Android, Safari no iOS e todos os navegadores para computador, exceto o Firefox (consulte <a href="http://caniuse.com/track" title="Rastrear o status de suporte do elemento">caniuse.com/track</a>). Também há vários códigos polyfill disponíveis. Recomendamos <a href='//www.delphiki.com/html5/playr/' title='Polyfill do elemento de rastreamento do playr'>Playr</a> ou <a href='//captionatorjs.com/' title='Faixa do captionator'>Captionator</a>.
  construct-video-streams:
    - No Android, MSE é compatível com os navegadores Google Chrome e Opera. Em computadores, MSE é compatível com o Internet Explorer 11 e o Google Chrome. A compatibilidade com o <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='cronograma de implementação de Extensões de fonte de mídia do Firefox'>Firefox</a> está prevista para versões futuras.
  optimize:
    - <a href="../images/">Imagens</a>
    - <a href="../../performance/optimizing-content-efficiency/">Como otimizar a eficiência do conteúdo</a>
related:
  media:
  -
      title: "Use consultas de mídia CSS para ter agilidade"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Noções básicas de Web design responsivo"
        href: layouts/rwd-fundamentals/
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.size-matters %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

## Verifique o tamanho do vídeo

O tamanho de quadro real do vídeo quando estiver codificado pode ser diferente das dimensões do elemento de vídeo (assim como uma imagem pode não ser exibida usando suas dimensões reais).

Para verificar o tamanho codificado de um vídeo, use as propriedades do elemento de vídeo `videoWidth` e `videoHeight`. As propriedades `width` e `height` retornam as dimensões do elemento de vídeo, que podem ter sido dimensionadas usando CSS ou atributos de altura e largura in-line.

## Certifique-se de que os vídeos não ultrapassem o tamanho da janela de visualização

Quando os elementos de vídeos são muito grandes para a janela de visualização, eles podem se expandir demasiadamente, impossibilitando que os usuários vejam seu conteúdo ou usem
os controles.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Captura de tela do Google Chrome para Android, retrato. O elemento de vídeo não estilizado ultrapassa o tamanho da janela de visualização" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Captura de tela do Google Chrome para Android, paisagem. O elemento de vídeo não estilizado ultrapassa o tamanho da janela de visualização" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Controle as dimensões do vídeo usando o JavaScript e CSS. As bibliotecas e os plug-ins do JavaScript como [FitVids](//fitvidsjs.com/) possibilitam manter o tamanho e a proporção adequados, até mesmo para vídeos em Flash do YouTube e outras fontes.

Use [consultas de mídia CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) para especificar o tamanho dos elementos dependendo das dimensões da janela de visualização: `max-width: 100%` é seu braço direito.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

Para conteúdo de mídia em iframe (como vídeos do YouTube), tente uma abordagem ágil (como a que foi [proposta por John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Compare a {% link_sample _code/responsive_embed.html %}amostra ágil{% endlink_sample %} com a {% link_sample _code/unyt.html %}versão não ágil{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

