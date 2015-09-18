---
layout: article
title: "Utilizzo delle media query CSS per ridurre i tempi di risposta"
description: "Gran parte dei siti web non è ottimizzata per l'accesso di diversi dispositivi. Scopri concetti fondamentali per rendere il tuo sito compatibile con dispositivi mobili, computer desktop e altri dispositivi dotati di schermo."
introduction: "Le media query sono filtri intuitivi applicabili agli stili CSS che aiutano a modificarli in base alle caratteristiche al dispositivo che esegue il rendering di contenuti, come ad esempio tipo, larghezza, altezza, orientamento e risoluzione del display."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 3
authors:
  - petelepage
collection: rwd-fundamentals
key-takeaways:
  set-viewport:
    - Utilizza metatag del viewport per il controllo della larghezza e il ridimensionamento del viewport dei browser. 
    - Inserisci <code>width=device-width</code> per associare la larghezza dello schermo usando pixel indipendenti dal dispositivo.
    - Inserisci <code>initial-scale=1</code> per stabilire un rapporto 1:1 fra i pixel CSS e quelli indipendenti dal dispositivo.
    - Verifica l'accessibilità della pagina disattivando il ridimensionamento utente.
  size-content-to-vp:
    - "Non utilizzare elementi fissi dall'elevata larghezza."
    - "Per un rendering ottimale, non utilizzare contenuti basati su una particolare larghezza del viewport."
    - "Utilizzare le media query CSS per applicare diversi stili a schermi di piccole e grandi dimensioni."
  media-queries:
    - "Le media query consentono l'applicazione degli stili in base alle caratteristiche del dispositivo."
    - "Utilizza <code>min-width</code> su <code>min-device-width</code> per un'esperienza ottimale."
    - "Utilizza le dimensioni relative degli elementi per non alterare la disposizione."
  choose-breakpoints:
    - "Crea breakpoint basati sui contenuti e non su dispositivi, prodotti o marchi specifici."
    - "Realizza un progetto per dispositivi mobili di dimensioni ridotte e migliora l'esperienza con l'aumentare delle dimensioni degli schermi."
    - "Le linee di testo non devono superare i 70/80 caratteri."
remember:
  use-commas:
    - "Utilizza la virgola come separatore degli attributi in modo da eseguire un'analisi corretta anche con browser meno recenti."
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>


{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.media-queries %}


Ad esempio, posiziona gli stili necessari per la stampa in una media query di stampa:

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

Oltre all'utilizzo dell'attributo `media` nel link del foglio di stile, esistono altri due modi per applicare le media query che è possibile incorporare in un file CSS, ovvero `@media` e `@import`. Per motivi di rendimento, i primi due metodi offrono maggiori risultati rispetto alla sintassi `@import` (consultare 'Evita le importazioni CSS'{{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html).

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

La logica applicata alle media query non è reciprocamente esclusiva, mentre ai filtri che soddisfano tali criteri viene applicato il blocco di CSS risultante utilizzando le regole standard di precedenza dei CSS.

## Applicazione delle media query in base alle dimensioni del viewport

Le media query offrono un'esperienza reattiva con l'applicazione di stili specifici agli schermi di piccole, medie e grandi dimensioni. La sintassi delle media query consente la creazione di regole applicabili in base alle caratteristiche del dispositivo.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

Anche se esistono diversi elementi a cui applicare le query, i più adatti all'ottimizzazione dei tempi di risposta della grafica web sono `min-width`, `max-width`, `min-height` e `max-height`.


<table class="table-2">
  <colgroup>
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="attribute">attributo</th>
      <th data-th="Result">Risultato</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
     <td data-th="Result">Regole applicate per  qualsiasi larghezza del browser superiore al valore definito nella query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
     <td data-th="Result">Regole applicate per qualsiasi larghezza del browser inferiore al valore definito nella query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
     <td data-th="Result">Regole applicate per qualsiasi altezza del browser superiore al valore definito in query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
     <td data-th="Result">Regole applicate per qualsiasi altezza del browser inferiore al valore definito nella query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Regole applicate per qualsiasi browser di altezza superiore o uguale alla larghezza.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Regole per qualsiasi browser di larghezza superiore all'altezza.</td>
    </tr>
  </tbody>
</table>

Di seguito viene indicato un esempio:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Anteprima di una pagina che utilizza le media query per la modifica delle proprietà con il progressivo ridimensionamento.">
  {% endlink_sample %}
</figure>

{% include_code _code/media-queries.html mqueries %}

* Se il browser ha una dimensione compresa fra <b>0 pixel</b> e <b>640 pixel</b> viene applicato `max-640px.css`.
* Se il browser ha una dimensione compresa fra <b>500 pixel</b> e <b>600 pixel</b> vengono applicati gli stili in `maxpx.css`.
* Se il browser ha una dimensione di almeno <b>640 pixel</b> viene applicato `min-640px.css`.
* Se la larghezza del browser <b>è superiore all'altezza</b> viene applicato `landscape.css`.
* Se l'altezza del browser <b>è superiore all larghezza</b> viene applicato `portrait.css`.


##Nota su `min-device-width`

È possibile creare query basate su `*-device-width` anche se si tratta di un'operazione **caldamente sconsigliata**.

La differenza è piccola ma importante: `min-width` si basa sulla dimensione della finestra del browser, mentre `min-device-width` su quella dello schermo. Alcuni browser Android di precedente generazione potrebbero non indicare in modo corretto la larghezza del dispositivo, restituendo la dimensione dello schermo usando i pixel del dispositivo invece della larghezza del viewport prevista.

Inoltre, l'utilizzo di `*-device-width` previene l'adattamento dei contenuti su computer desktop o altri dispositivi che consentono il ridimensionamento delle finestre, poiché la query si basa sulle dimensioni effettive del dispositivo e non su quelle della finestra del browser.

## Utilizzo di unità relative

Due importanti concetti di design reattivo sono la fluidità e la proporzionalità, condizioni opposte alle disposizioni a larghezza fissa. L'utilizzo di unità di misura relative semplifica la creazione delle disposizioni ed evita la creazione involontaria di componenti troppo grandi per il viewport.

Ad esempio, l'impostazione di una larghezza del 100% per un `div` superiore consente di non superare la larghezza e le dimensioni del viewport.  Il `div` viene visualizzato in modo corretto anche su iPhone da 320 pixel, Blackberry Z10 da 342 pixel o Nexus 5 da 360 pixel.

Inoltre, usando le unità relative è possibile eseguire il rendering dei contenuti nel browser in base al livello di zoom selezionato, evitando l'aggiunta di barre di scorrimento orizzontali alla pagina.

<div class="clear">
  <div class="g--half">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="g--half g--last">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

