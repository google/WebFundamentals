project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Personalize o player de vídeo {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Plataformas diferentes exibem os vídeos de maneiras diferentes. As soluções para dispositivos móveis precisam levar em conta a orientação do dispositivo. Use a API de tela cheia para controlar a visualização em tela cheia do conteúdo de vídeo.



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

    elem.requestFullScreen();
    

Para exibir em tela cheia todo o documento:

    document.body.requestFullScreen();
    

Também é possível ouvir mudanças no estado de tela cheia:

    video.addEventListener("fullscreenchange", handler);
    

Ou verificar se o elemento está atualmente em modo tela cheia:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Você também pode usar a pseudoclasse `:fullscreen` de CSS para modificar a forma como os elementos são exibidos em modo tela cheia.

Nos dispositivos compatíveis com a API de tela cheia, considere o uso de imagens em miniatura como marcadores de posição dos vídeos:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Este navegador não oferece suporte ao elemento de vídeo.</p>
</video>

Para ver isto em ação, confira a <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demonstração</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



