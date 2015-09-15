---
title: "Personalize o player de vídeo"
description: "Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo."
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
  Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo.
</p>

{% include shared/toc.liquid %}


Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo.

## Como funciona a orientação dos dispositivos

A orientação dos dispositivos não é um problema relacionado a laptops e a monitores de computadores, mas é extremamente importante para o design de páginas para celulares e tablets.

O Safari do iPhone executa com eficiência a alternância entre as orientações de retrato e paisagem:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela de um vídeo reproduzido no Safari do iPhone em modo retrato" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Captura de tela de um vídeo reproduzido no Safari do iPhone em modo paisagem" src="images/iPhone-video-playing-landscape.png">
</div>

A orientação no iPad e no Google Chrome para Android pode ser problemática.
Por exemplo, sem qualquer personalização, um vídeo reproduzido no iPad em modo paisagem tem esta aparência:

<img class="center" alt="Captura de tela de um vídeo reproduzido no Safari do iPad Retina em modo paisagem"
src="images/iPad-Retina-landscape-video-playing.png">

Definir o vídeo com `width: 100%` ou `max-width: 100%` com CSS pode resolver diversos problemas de layout nas orientações dos dispositivos. Também recomendamos levar em consideração opções de tela cheia.

## Exibição in-line ou em tela cheia

Plataformas diferentes exibem os vídeos de maneiras diferentes. O Safari em um iPhone exibe um elemento de vídeo in-line em uma página da Web, mas reproduz o vídeo em modo tela cheia.

<img class="center" alt="Captura de tela de um elemento de vídeo no iPhone em modo retrato" src="images/iPhone-video-with-poster.png">

No Android, os usuários podem ativar o modo tela cheia clicando no ícone de tela cheia. No entanto, o padrão é reproduzir o vídeo in-line:

<img class="center" alt="Captura de tela de um vídeo reproduzido no Google Chrome do Android em modo retrato" src="images/Chrome-Android-video-playing-portrait-3x5.png">

O Safari em um iPad reproduz os vídeos in-line:

<img class="center" alt="Captura de tela de um vídeo reproduzido no Safari do iPad Retina em modo paisagem" src="images/iPad-Retina-landscape-video-playing.png">

## Controle a exibição de conteúdo em tela cheia

Para plataformas que não forçam a reprodução de vídeo em tela cheia, a API de tela cheia é [amplamente aceita](//caniuse.com/fullscreen). Use essa API para controlar a exibição de conteúdo ou de páginas em tela cheia.

Para exibir em tela cheia um elemento, como video:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Para exibir em tela cheia todo o documento:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Também é possível ouvir mudanças no estado de tela cheia:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Ou verificar se o elemento está atualmente em modo tela cheia:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Você também pode usar a pseudoclasse `:fullscreen` de CSS para modificar a forma como os elementos são exibidos em modo tela cheia.

Nos dispositivos compatíveis com a API de tela cheia, considere o uso de imagens em miniatura como marcadores de posição dos vídeos:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>

Para ver isto em ação, confira a {% link_sample _code/fullscreen.html %}demonstração{% endlink_sample %}.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



