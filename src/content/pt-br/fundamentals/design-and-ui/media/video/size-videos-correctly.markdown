---
title: "Dimensione o tamanho dos vídeos corretamente"
description: "Quando a satisfação de seus usuários está em jogo, o tamanho importa."
updated_on: 2014-09-19
key-takeaways:
  size-matters:
    - "Evite veicular vídeos que tenham um tamanho de quadro maior ou uma qualidade superior ao que é compatível com a plataforma."
    - "Não exagere na duração de seus vídeos."
    - "Vídeos longos podem causar interrupções no download e na busca. Alguns navegadores podem precisar aguardar até que o download do vídeo seja feito antes de poder reproduzi-lo."
notes:
  media-fragments:
    - "A API dos fragmentos de mídia é compatível com a maioria das plataformas, mas não com iOS."
    - "Certifique-se de que as solicitações de faixa sejam compatíveis com seu servidor. As solicitações de faixa são habilitadas por padrão na maioria dos servidores, mas alguns serviços de hospedagem podem desativá-las."
  dont-overflow:
    - "Não force o dimensionamento de elementos se isso resultar em uma proporção diferente do vídeo original. Uma imagem achatada ou alongada tem aparência feia."
  accessibility-matters:
    - "O elemento de faixa é aceito no Google Chrome para Android, Safari (iOS) e em todos os navegadores atuais para computador, exceto Firefox (veja <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Também existem diversas opções de polyfill disponíveis. Recomendamos o <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> ou o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>."
  construct-video-streams:
    - "A especificação MSE é compatível com Google Chrome e Opera para Android e com o Internet Explorer 11 e Google Chrome para computador, com suporte planejado para <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Imagens</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Como otimizar a eficiência do conteúdo</a>"
related-guides:
  media:
  -
      title: "Use consultas de mídia CSS para ter agilidade"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        title: "Noções básicas de Web design responsivo"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Quando a satisfação de seus usuários está em jogo, o tamanho importa.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## Verifique o tamanho do vídeo

O tamanho de quadro real do vídeo quando estiver codificado pode ser diferente das dimensões do elemento de vídeo (assim como uma imagem pode não ser exibida usando suas dimensões reais).

Para verificar o tamanho codificado de um vídeo, use as propriedades do elemento de vídeo `videoWidth` e `videoHeight`. As propriedades `width` e `height` retornam as dimensões do elemento de vídeo, que podem ter sido dimensionadas usando CSS ou atributos de altura e largura in-line.

## Certifique-se de que os vídeos não ultrapassem o tamanho da janela de visualização

Quando os elementos de vídeos são muito grandes para a janela de visualização, eles podem se expandir demasiadamente, impossibilitando que os usuários vejam seu conteúdo ou usem
os controles.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela do Google Chrome para Android, retrato. O elemento de vídeo não estilizado ultrapassa o tamanho da janela de visualização" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela do Google Chrome para Android, paisagem. O elemento de vídeo não estilizado ultrapassa o tamanho da janela de visualização" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Controle as dimensões do vídeo usando o JavaScript e CSS. As bibliotecas e os plug-ins do JavaScript como [FitVids](//fitvidsjs.com/) possibilitam manter o tamanho e a proporção adequados, até mesmo para vídeos em Flash do YouTube e outras fontes.

Use [consultas de mídia CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) para especificar o tamanho dos elementos dependendo das dimensões da janela de visualização: `max-width: 100%` é seu braço direito.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Para conteúdo de mídia em iframe (como vídeos do YouTube), tente uma abordagem ágil (como a que foi [proposta por John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Compare a {% link_sample _code/responsive_embed.html %}amostra ágil{% endlink_sample %} com a {% link_sample _code/unyt.html %}versão não ágil{% endlink_sample %}.




