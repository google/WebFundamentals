project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Dimensionamento corretto dei video {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso.


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



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

<!-- TODO: Verify note type! -->
Note: Non forzare il ridimensionamento dell'elemento, poiché potresti alterarne le proporzioni rispetto al video originale. Un video appiattito o allungato è sgradevole.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Confronta l'<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">esempio reattivo</a> con <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">con la versione non reattiva</a>.




