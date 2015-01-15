---
layout: section
title: "Nozioni di base sul Responsive Web Design"
description: "Gran parte del Web non è ottimizzata per l'utilizzo di dispositivi multipli. Apprendi i concetti fondamentali e ottimizza il sito per dispositivi mobili, PC desktop o su qualsiasi altro dispositivo dotato di schermo."
introduction: "L'impiego di dispositivi mobili per la navigazione sul Web è in forte aumento, ma gran parte del Web non è ancora ottimizzata in tal senso. Spesso i dispositivi mobili soffrono di limitazioni in termini di formato dello schermo e richiedono un nuovo approccio per la disposizione dei contenuti."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
authors:
  - petelepage
id: rwd-fundamentals
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - Utilizza i meta viewport tag per controllare larghezza e scala dei viewport dei browser.
    - Inserisci <code>width=device-width</code> per ottenere una corrispondenza con la larghezza dello schermo in pixel indipendenti dal dispositivo.
    - Inserisci <code>initial-scale=1</code> per stabilire una relazione 1:1 fra i pixel del CSS e quelli indipendenti dal dispositivo.
    - Controlla l'accessibilità della pagina senza disabilitare l'opzione di scalabilità dell'utente.
  size-content-to-vp:
    - Non utilizzare elementi di grandi dimensioni e larghezza fissa.
    - La resa ottimale dei contenuti non deve essere legata alla larghezza di un viewport specifico.
    - Utilizza i media query CSS per applicare diversi stili per gli schermi ampi e ristretti.
  media-queries:
    - Puoi usare le media query per applicare gli stili in base alle caratteristiche del dispositivo.
    - Utilizza <code>min-width</code> al posto di <code>min-device-width</code> per ottenere un'esperienza adatta al maggior numero di dispositivi possibile.
    - Usa dimensioni relative degli elementi per evitare interruzioni della disposizione.
  choose-breakpoints:
    - Crea breakpoint in base ai contenuti e non a dispositivi, prodotti o brand specifici.
    - Progetta per i dispositivi mobili più piccoli, quindi incrementa l'esperienza con la progressiva disponibilità di spazio su schermo.
    - Mantieni le linee di testo a un massimo di 70 o 80 caratteri.
remember:
  use-commas:
    - Utilizza virgole per separare gli attributi per consentire anche ai browser meno aggiornati di analizzarli in modo corretto.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
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

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/oK09n_PGhTo?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

I formati dello schermo utilizzati da telefoni, 'phablet', tablet, desktop, console per videogiochi, TV e dispositivi indossabili sono molteplici. I formati dello schermo sono in continua evoluzione ed è quindi importante creare un sito capace di adattarsi a qualsiasi formato futuro.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Il Responsive Web Design, creato da [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/) risponde alle esigenze di utenti e dispositivi impiegati. La disposizione dei contenuti varia in base alle dimensioni e alle caratteristiche del dispositivo. Ad esempio, un telefono visualizza i contenuti su una sola colonna mentre un tablet ne adopera due.

{% include modules/nextarticle.liquid %}

{% endwrap %}

