---
title: "A acessibilidade é importante"
description: "A acessibilidade não é um recurso."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Use o elemento de vídeo para carregar, decodificar e reproduzir vídeos no seu site."
    - "Produza vídeos em diversos formatos para disponibilizá-los em várias plataformas de dispositivos móveis."
    - "Dimensione os vídeos corretamente e assegure-se de que eles não transbordem os recipientes."
    - "A acessibilidade é importante. Adicione o elemento de faixa como um derivado do elemento de vídeo."
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
---

<p class="intro">
  A acessibilidade não é um recurso. Os usuários com dificuldades de visão e escuta não poderão desfrutar de um vídeo sem legendas ou descrições. O tempo necessário para adicionar esses recursos ao vídeo é muito menor do que o custo da experiência negativa fornecida aos usuários. Forneça pelo menos uma experiência básica a todos os usuários.
</p>

{% include shared/toc.liquid %}



## Inclua legendas para melhorar a acessibilidade

Para tornar os recursos de mídia mais acessíveis nos dispositivos móveis, inclua legendas ou descrições usando o elemento de faixa.

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

Com o elemento de faixa, as legendas aparecem desta forma:

 <img class="center" alt="Captura de tela mostrando as legendas em exibição com o elemento de faixa no Google Chrome para Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Adicione o elemento de faixa

É fácil adicionar legendas a um vídeo, basta adicionar um elemento de faixa como derivado do elemento de vídeo:

{% include_code src=_code/track.html snippet=track lang=html %}

O atributo "src" do elemento de faixa fornece a localização do arquivo de faixa.

## Defina as legendas no arquivo de faixa

Um arquivo de faixa consiste em informações de tempo de inserção no formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Homem sentado em um galho, usando um laptop.

    00:05.000 --> 00:08.000
    O galho quebra, e o homem cai.

    ...



