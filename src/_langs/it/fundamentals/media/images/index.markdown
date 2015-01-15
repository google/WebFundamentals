---
layout: section
title: "Immagini"
description: "Un'immagine vale più di mille parole e ricopre un ruolo chiave per tutte le pagine. Tuttavia, le immagini richiedono il download di numerosi dati. Il Web design reattivo consente di modificare disposizione e immagini in base alle caratteristiche del dispositivo."
introduction: "Un'immagine vale più di mille parole e ricopre un ruolo chiave per tutte le pagine. Tuttavia, le immagini richiedono il download di numerosi dati. Con il Web design reattivo, la disposizione e le immagini possono adattarsi alle caratteristiche del dispositivo."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
id: images
key-takeaways:
  use-right-image:
    - Utilizza immagini adatte alle caratteristiche del display, prendendo in considerazione dimensioni dello schermo, risoluzione del dispositivo e disposizione della pagina.
    - Modifica la proprietà <code>background-image</code> dei CSS per i display ad alta risoluzione utilizzando le media query con <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>.
    - Utilizza `scrset` per fornire immagini ad alta risoluzione oltre all'immagine 1x nel markup.
    - Valuta i costi in termini di rendimento dovuti all'utilizzo di tecniche di sostituzione delle immagini via JavaScript o di immagini compresse ad alta risoluzione per i dispositivi a risoluzioni inferiori.
  avoid-images:
    - Se possibile, evita le immagini, sfrutta le funzionalità del browser, utilizza caratteri unicode al posto delle immagini e sostituisci icone complesse con i caratteri per icone.
  optimize-images:
    - Non scegliere un formato a caso per le immagini, ma analizza quelli disponibili e utilizza il più adatto alle tue esigenze.
    - Inserisci strumenti di ottimizzazione delle immagini e compressione al flusso di lavoro per la riduzione delle dimensioni dei file.
    - Riduci il numero delle richieste HTTP inserendo immagini di utilizzo comune negli sprite immagine.
    - Valuta se caricare le immagini solo al momento della visualizzazione, in modo da ottimizzare tempi di caricamento e peso iniziale della pagina.
remember:
  compressive:
    - Utilizza con parsimonia le tecniche di compressione, poiché aumentano i costi in termini di decodifica e memoria. Il ridimensionamento delle immagini di grandi dimensioni per gli schermi di dimensioni ridotte è un'attività costosa che riduce le prestazioni dei dispositivi di fascia bassa con limiti di memoria e di capacità di calcolo.
---

{% wrap content%}

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

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

### Immagini reattive

Il Web design reattivo consente di modificare disposizione e contenuti in base alle caratteristiche del dispositivo. Ad esempio, devi utilizzare elementi grafici ad alta risoluzione sui display (2x) ad alta risoluzione per ottenere una buona nitidezza. Un'immagine con una larghezza del 50% rende rendere al meglio su un browser di larghezza pari a 800 pixel, ma utilizzerebbe risorse eccessive su un cellulare dallo schermo ridotto e consumerebbe la stessa larghezza di banda anche se scalata per uno schermo piccolo.

### Direzione artistica

<img class="center" src="img/art-direction.png" alt="Esempio di direzione artistica"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

In altre circostanze potrebbe essere necessario modificare drasticamente l'immagine, come ad esempio ridimensionarla, ritagliarla o persino sostituirla. In questi casi, le modifiche all'immagine vengono definite 'direzione artistica'. Consulta [responsiveimages.org/demos/] (http://responsiveimages.org/demos/) per ulteriori esempi.

{% include modules/nextarticle.liquid %}

{% endwrap %}

