project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ogni piattaforma visualizza i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Personalizzazione del riproduttore multimediale {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Ciascuna piattaforma visualizza i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video.



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

    elem.requestFullScreen();
    

Per visualizzare a schermo intero un documento intero:

    document.body.requestFullScreen();
    

Inoltre, verifica le modifiche dello stato della visualizzazione a schermo intero:

    video.addEventListener("fullscreenchange", handler);
    

In alternativa, verifica che l'elemento sia in modalità a schermo intero:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Inoltre, è possibile utilizzare la pseudo classe `:fullscreen` CSS per la modifica delle modalità di visualizzazione a schermo intero degli elementi.

Sui dispositivi che supportano l'API Fullscreen è possibile utilizzare immagini in miniatura come indicatori per i video:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per visionare l'esecuzione dell'operazione, consulta <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">demo</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



