---
layout: article
title: "Impostazione del viewport"
description: "Gran parte del Web non è ottimizzata per l'utilizzo di dispositivi multipli. Apprendi i concetti fondamentali e ottimizza il sito per dispositivi mobili, PC desktop o su qualsiasi altro dispositivo dotato di schermo."
introduction: "Le pagine ottimizzate per dispositivi multipli devono contenere un elemento meta viewport nella sezione 'head' del documento, che indica al browser come controllare dimensioni e scala della pagina."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 1
authors:
  - petelepage
collection: rwd-fundamentals
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

{% include modules/takeaway.liquid list=page.key-takeaways.set-viewport %}

Per ottenere un'esperienza ideale, i browser mobili effettuano il rendering della pagina alla larghezza della schermata del desktop (di solito circa 980 pixel, ma variabile in base al dispositivo), quindi migliorano l'aspetto dei contenuti ingrandendo i caratteri e scalando i contenuti per adattarli allo schermo. Gli utenti potrebbero riscontrare una certa incoerenza nelle dimensioni dei caratteri e toccare due volte lo schermo o zoomare con due dita per visualizzare e interagire con i contenuti.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


Il valore meta viewport `width=device-width` garantisce la corrispondenza della pagina alla larghezza dello schermo in pixel indipendenti dal dispositivo. Pertanto, la pagina potrà riordinare il contenuto in modo da adattarlo ai diversi formati dello schermo, da quello di piccole dimensioni dei cellulari ai monitor desktop più ampi.

<div class="clear">
  <div class="g--half">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Pagina senza viewport">
      Vedi esempio
    {% endlink_sample %}
  </div>

  <div class="g--half g--last">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Pagina con viewport">
      Vedi esempio
    {% endlink_sample %}
  </div>
</div>

In caso di rotazione orizzontale, alcuni browser mantengono costante la larghezza della pagina eseguendo uno zoom invece di riordinare i contenuti su schermo. L'attributo `initial-scale=1` impone al browser di definire una relazione univoca fra i pixel del CSS e quelli indipendenti dal dispositivo con qualsiasi orientamento, consentendo alla pagina di sfruttare appieno la larghezza orizzontale.

{% include modules/remember.liquid inline='True' list=page.remember.use-commas %}

## Garantire l'accessibilità del viewport

Oltre a impostare il valore `initial-scale` puoi anche impostare i seguenti attributi del viewport:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Se impostati, possono impedire all'utente di zoomare nel viewport a causa di potenziali problemi di accessibilità.

{% include modules/nextarticle.liquid %}

{% endwrap %}

