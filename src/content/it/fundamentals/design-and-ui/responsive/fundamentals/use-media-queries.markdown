---
title: "Utilizzo delle media query CSS per ridurre i tempi di risposta"
description: "Gran parte dei siti web non è ottimizzata per l'accesso di diversi dispositivi. Scopri concetti fondamentali per rendere il tuo sito compatibile con dispositivi mobili, computer desktop e altri dispositivi dotati di schermo."
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - "Utilizza i meta viewport tag per controllare larghezza e scala dei viewport dei browser."
    - "Inserisci <code>width=device-width</code> per ottenere una corrispondenza con la larghezza dello schermo in pixel indipendenti dal dispositivo."
    - "Inserisci <code>initial-scale=1</code> per stabilire una relazione 1:1 fra i pixel del CSS e quelli indipendenti dal dispositivo."
    - "Controlla l'accessibilità della pagina senza disabilitare l'opzione di scalabilità dell'utente."
  size-content-to-vp:
    - "Non utilizzare elementi di grandi dimensioni e larghezza fissa."
    - "La resa ottimale dei contenuti non deve essere legata alla larghezza di un viewport specifico."
    - "Utilizza i media query CSS per applicare diversi stili per gli schermi ampi e ristretti."
  media-queries:
    - "Puoi usare le media query per applicare gli stili in base alle caratteristiche del dispositivo."
    - "Utilizza <code>min-width</code> al posto di <code>min-device-width</code> per ottenere un'esperienza adatta al maggior numero di dispositivi possibile."
    - "Usa dimensioni relative degli elementi per evitare interruzioni della disposizione."
  choose-breakpoints:
    - "Crea breakpoint in base ai contenuti e non a dispositivi, prodotti o brand specifici."
    - "Progetta per i dispositivi mobili più piccoli, quindi incrementa l'esperienza con la progressiva disponibilità di spazio su schermo."
    - "Mantieni le linee di testo a un massimo di 70 o 80 caratteri."
notes:
  use-commas:
    - "Utilizza virgole per separare gli attributi per consentire anche ai browser meno aggiornati di analizzarli in modo corretto."
---
<p class="intro">
  Le media query sono filtri intuitivi applicabili agli stili CSS che aiutano a modificarli in base alle caratteristiche al dispositivo che esegue il rendering di contenuti, come ad esempio tipo, larghezza, altezza, orientamento e risoluzione del display.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


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


<table class="mdl-data-table mdl-js-data-table">
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

{% include_code src=_code/media-queries.html snippet=mqueries %}

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

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



