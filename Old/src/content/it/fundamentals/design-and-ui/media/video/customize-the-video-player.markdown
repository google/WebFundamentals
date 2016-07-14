---
title: "Personalizzazione del riproduttore multimediale"
description: "Ogni piattaforma visualizza i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Utilizza elementi video per caricare, decodificare e riprodurre i video del tuo sito."
    - "Crea video in diversi formati per una vasta gamma di piattaforme mobili."
    - "Dimensiona i video al meglio evitando l'overflow dei relativi contenitori."
    - "L'accessibilità è importante: aggiungi gli elementi di tracciamento come elementi secondari di quelli video."
notes:
  media-fragments:
    - "Gran parte delle piattaforme supporta l'API Media Fragments, a eccezione di iOS."
    - "Verifica che le range request siano supportate dal server in uso. Le range request vengono attivate per impostazione predefinita su gran parte dei server, anche se potrebbero essere assenti su alcuni servizi di hosting."
  dont-overflow:
    - "Non forzare il ridimensionamento dell'elemento, poiché potresti alterarne le proporzioni rispetto al video originale. Un video appiattito o allungato è sgradevole."
  accessibility-matters:
    - "Chrome per Android, Safari per iOS e tutti i browser per PC desktop a eccezione di Firefox supportano gli elementi di tracciamento (vedi <a href='http://caniuse.com/track' title='Stato del supporto degli elementi di tracciamento'>caniuse.com/track</a>). Sono disponibili anche diverse polilinee. È consigliabile l'utilizzo di <a href='//www.delphiki.com/html5/playr/' title='Polilinea dell'elemento di tracciamento Playr'>Playr</a> o <a href='//captionatorjs.com/'' title='Traccia del sottotitolatore'>Sottotitolatore</a>."
  construct-video-streams:
    - "Chrome, Opera per Android, Internet Explorer 11 e Chrome per PC desktop supportano MSE ed è previsto il supporto anche per <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Images</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Ottimizzazione dell'efficienza dei contenuti</a>"
---

<p class="intro">
  Ciascuna piattaforma visualizza i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video.
</p>

{% include shared/toc.liquid %}


Le diverse piattaforme visualizzano i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video.

## Modalità di funzionamento dell'orientamento su diversi dispositivi

L'orientamento del dispositivo non è un problema per i PC desktop o portatili, ma è importante per la progettazione delle pagine web per dispositivi mobili e tablet.

Safari per iPhone commuta in maniera eccellente l'orientamento verticale e orizzontale:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Schermata di un video riprodotto da Safari per iPhone, in verticale" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Schermata di un video riprodotto da Safari per iPhone, in orizzontale" src="images/iPhone-video-playing-landscape.png">
</div>

L'orientamento del dispositivo su iPad e Chrome per Android può diventare un problema.
Ad esempio, la riproduzione di un video su un iPad con orientamento orizzontale senza alcuna personalizzazione produce quanto segue:

<img class="center" alt="Schermata di un video riprodotto con Safari per iPad Retina, in orizzontale"
src="images/iPad-Retina-landscape-video-playing.png">

Impostando `width: 100%` o `max-witdh: 100%` sul video usando i CSS è possibile risolvere diversi problemi della disposizione dell'orientamento del dispositivo. È possibile anche prendere in considerazione alternative a schermo intero.

## Visualizzazione inline o a schermo intero

Le diverse piattaforme visualizzano i video in modo diverso. Safari per iPhone visualizza un elemento video inline in una pagina web, ma il video viene riprodotto in modalità a schermo intero:

<img class="center" alt="Schermata di elementi video su iPhone, in verticale" src="images/iPhone-video-with-poster.png">

Su Android, è possibile attivare la modalità a schermo intero facendo clic sulla relativa icona. Tuttavia, l'impostazione predefinita prevede la riproduzione inline del video:

<img class="center" alt="Schermata di un video riprodotto con Safari per iPhone, in verticale" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari per iPad prevede la riproduzione inline del video:

<img class="center" alt="Schermata di un video riprodotto con Safari per iPad Retina, in orizzontale" src="images/iPad-Retina-landscape-video-playing.png">

## Controllo della visualizzazione a schermo intero dei contenuti

Le piattaforme che non forzano la riproduzione video a schermo intero l'API Fullscreen è [ampiamente supportata](//caniuse.com/fullscreen). Utilizza l'API per il controllo della visualizzazione a schermo intero dei contenuti o della pagina.

Per visualizzare un elemento a schermo intero come un video:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Per visualizzare a schermo intero un documento intero:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Inoltre, verifica le modifiche dello stato della visualizzazione a schermo intero:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

In alternativa, verifica che l'elemento sia in modalità a schermo intero:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Inoltre, è possibile utilizzare la pseudo classe `:fullscreen` CSS per la modifica delle modalità di visualizzazione a schermo intero degli elementi.

Sui dispositivi che supportano l'API Fullscreen è possibile utilizzare immagini in miniatura come indicatori per i video:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per visionare l'esecuzione dell'operazione, consulta {% link_sample _code/fullscreen.html %}demo{% endlink_sample %}.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



