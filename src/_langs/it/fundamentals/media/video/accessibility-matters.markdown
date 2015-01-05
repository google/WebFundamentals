---
layout: article
title: "L'importanza dell'accessibilità"
description: "L'accessibilità è fondamentale."
introduction: "L'accessibilità è fondamentale. Gli utenti audiolesi o ipovedenti non possono guardare un video senza didascalie o descrizioni. Il tempo necessario per aggiungere questi elementi al video è ridotto e consente di migliorare l'esperienza degli utenti. Devi consentire a tutti gli utenti di fruire in qualche modo dei tuoi contenuti."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 4
collection: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Utilizza elementi video per caricare, decodificare e riprodurre i video del tuo sito.
    - Crea video in diversi formati per una vasta gamma di piattaforme mobili.
    - Dimensiona i video al meglio evitando l'overflow dei relativi contenitori.
    - L'accessibilità è importante: aggiungi gli elementi di tracciamento come elementi secondari di quelli video.
remember:
  media-fragments:
    - Gran parte delle piattaforme supporta l'API Media Fragments, a eccezione di iOS.
    - Verifica che le range request siano supportate dal server in uso. Le range request vengono attivate per impostazione predefinita su gran parte dei server, anche se potrebbero essere assenti su alcuni servizi di hosting.
  dont-overflow:
    - Non forzare il ridimensionamento dell'elemento, poiché potresti alterarne le proporzioni rispetto al video originale. Un video appiattito o allungato è sgradevole.
  accessibility-matters:
    - Chrome per Android, Safari per iOS e tutti i browser per PC desktop a eccezione di Firefox supportano gli elementi di tracciamento (vedi <a href="http://caniuse.com/track" title="Stato del supporto degli elementi di tracciamento">caniuse.com/track</a>). Sono disponibili anche diverse polilinee. È consigliabile l'utilizzo di <a href="//www.delphiki.com/html5/playr/" title="Polilinea dell'elemento di tracciamento Playr">Playr</a> o <a href="//captionatorjs.com/" title="Traccia del sottotitolatore">Sottotitolatore</a>.
  construct-video-streams:
    - Chrome, Opera per Android, Internet Explorer 11 e Chrome per PC desktop supportano MSE ed è previsto il supporto anche per <a href="http://wiki.mozilla.org/Platform/MediaSourceExtensions" title="Firefox Media Source Extensions implementation timeline">Firefox</a>.
  optimize:
    - <a href="../images/">Images</a>
    - <a href="../../performance/optimizing-content-efficiency/">Ottimizzazione dell'efficienza dei contenuti</a>
---

{% wrap content%}

{% include modules/toc.liquid %}

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


## Inserimento delle didascalie per una maggiore accessibilità

Per aumentare l'accessibilità degli elementi multimediali sui dispositivi mobili, inserisci didascalie o descrizioni mediante l'elemento di tracciamento.

{% include modules/remember.liquid title="Remember" list=page.remember.accessibility-matters %}

L'elemento di tracciamento visualizza le didascalie nel modo seguente:

 <img class="center" alt="Schermata con didascalie visualizzate con l'elemento di tracciamento in Chrome per Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Aggiungere l'elemento di tracciamento

È molto semplice aggiungere didascalie ai video: è sufficiente inserire un elemento di tracciamento come elemento secondario di un video.

{% include_code _code/track.html track html %}

L'attributo dell'elemento della traccia `src` indica la posizione del file di tracciamento.

## Inserire didascalie nel file di tracciamento

Un file di tracciamento è costituito da `indicazioni` temporizzate in formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Uomo seduto sul ramo di un albero che utilizza un portatile.

    00:05.000 --> 00:08.000
    Ramo che si spezza facendo cadere l'uomo.

    .

{% include modules/nextarticle.liquid %}

{% endwrap %}

