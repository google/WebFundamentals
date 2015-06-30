---
layout: article
title: "Dimensionamento corretto dei video"
description: "Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso."
introduction: "Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - Non pubblicare video di dimensioni o qualità superiori alla capacità della piattaforma utilizzata.
    - La lunghezza del video non deve eccedere quella necessaria.
    - Se i video sono troppo lunghi, il download procede a singhiozzo e le operazioni di ricerca sono rallentate; prima di eseguire la riproduzione, alcuni browser potrebbero dover attendere l'intero download del video.
remember:
  media-fragments:
    - La Media Fragments API è supportata dalla maggior parte delle piattaforme, eccetto iOS.
    - Assicurati che le richieste di intervallo siano supportate dal tuo server. Le richieste di intervallo sono attivate per impostazione predefinita nella maggior parte dei server; tuttavia, alcuni servizi di hosting potrebbero disabilitarle.
  dont-overflow:
    - Non modificare la dimensione dell'elemento in modo tale che non rispetti le proporzioni del video originale. Lo schiacciamento e l'allungamento creano un effetto sgradevole.
  accessibility-matters:
    - L'elemento traccia è supportato da Chrome per Android, Safari  per iOS e tutti gli attuali browser su desktop, eccetto Firefox (vedi <a href="http://caniuse.com/track" title="Stato supporto elemento traccia">caniuse.com/track</a>). Sono disponibili anche diversi polyfill. Si consiglia di utilizzare <a href='//www.delphiki.com/html5/playr/' title='Polyfill elemento traccia Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE è supportato da Chrome e Opera su Android, Internet Explorer 11 e Chrome per desktop, con supporto pianificato per <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title="Sequenza temporale di implementazione MSE Firefox">Firefox</a>.
  optimize:
    - <a href="../images/">Immagini</a>
    - <a href="../../performance/optimizing-content-efficiency/">Ottimizzazione dell'efficienza nei contenuti</a>
related:
  media:
  -
      title: "Utilizzo delle query supporti CSS per una migliore reattività"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Nozioni di base su Responsive Web Design"
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

## Verifica le dimensioni del video

Le dimensioni effettive del video codificato potrebbero non corrispondere alle dimensioni dell'elemento video (come nel caso di un'immagine che non può essere visualizzata utilizzando le sue dimensioni reali).

Per verificare le dimensioni codificate di un video, utilizza le proprietà dell'elemento video: `videoWidth` e `videoHeight`. Le proprietà `width` e `height` restituiscono le dimensioni dell'elemento video, che potrebbero essere state dimensionate utilizzando CSS o gli attributi larghezza e altezza incorporati.

## Assicurati che i video non siano più grandi dei contenitori

Quando gli elementi video sono troppo grandi per il riquadro di visualizzazione, possono eccedere dai rispettivi contenitori, impedendo la visualizzazione e 
l'utilizzo dei controlli da parte degli utenti.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Screenshot verticale di Android Chrome: l'elemento video senza stile supera il riquadro di visualizzazione" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Screenshot orizzontale di Android Chrome: l'elemento video senza stile supera il riquadro di visualizzazione" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Puoi controllare le dimensioni del video con JavaScript o CSS. Le librerie e i plugin di JavaScript, come [FitVids](//fitvidsjs.com/), consentono di rispettare le dimensioni e le proporzioni corrette, anche nel caso dei video Flash di YouTube e di altre fonti.

Utilizza [query supporti CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) per specificare la dimensione degli elementi in base alle dimensioni del riquadro di visualizzazione; `max-width: 100%` è ideale.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

Per contenuti multimediali in iframes (come i video di YouTube), opta per un approccio reattivo (come quello [proposto da by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include modules/remember.liquid title="Important" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Confronta l'{% link_sample _code/responsive_embed.html %}esempio reattivo{% endlink_sample %} con {% link_sample _code/unyt.html %}con la versione non reattiva{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

