---
title: "Dimensionamento corretto dei video"
description: "Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso."
updated_on: 2014-09-19
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
related-guides:
  media:
  -
      title: "Utilizzo delle query supporti CSS per una migliore reattività"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Nozioni di base su Responsive Web Design"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## Verifica le dimensioni del video

Le dimensioni effettive del video codificato potrebbero non corrispondere alle dimensioni dell'elemento video (come nel caso di un'immagine che non può essere visualizzata utilizzando le sue dimensioni reali).

Per verificare le dimensioni codificate di un video, utilizza le proprietà dell'elemento video: `videoWidth` e `videoHeight`. Le proprietà `width` e `height` restituiscono le dimensioni dell'elemento video, che potrebbero essere state dimensionate utilizzando CSS o gli attributi larghezza e altezza incorporati.

## Assicurati che i video non siano più grandi dei contenitori

Quando gli elementi video sono troppo grandi per il riquadro di visualizzazione, possono eccedere dai rispettivi contenitori, impedendo la visualizzazione e 
l'utilizzo dei controlli da parte degli utenti.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Screenshot verticale di Android Chrome: l'elemento video senza stile supera il riquadro di visualizzazione" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Screenshot orizzontale di Android Chrome: l'elemento video senza stile supera il riquadro di visualizzazione" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Puoi controllare le dimensioni del video con JavaScript o CSS. Le librerie e i plugin di JavaScript, come [FitVids](//fitvidsjs.com/), consentono di rispettare le dimensioni e le proporzioni corrette, anche nel caso dei video Flash di YouTube e di altre fonti.

Utilizza [query supporti CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) per specificare la dimensione degli elementi in base alle dimensioni del riquadro di visualizzazione; `max-width: 100%` è ideale.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Per contenuti multimediali in iframes (come i video di YouTube), opta per un approccio reattivo (come quello [proposto da by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Important" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Confronta l'{% link_sample _code/responsive_embed.html %}esempio reattivo{% endlink_sample %} con {% link_sample _code/unyt.html %}con la versione non reattiva{% endlink_sample %}.




