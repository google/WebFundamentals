---
title: "Ottimizzazione delle immagini per un rendimento ottimale"
description: "Spesso le immagini richiedono il download di molti dati e occupano una parte rilevante dello spazio di visualizzazione della pagina."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Utilizza immagini adatte alle caratteristiche del display, prendendo in considerazione dimensioni dello schermo, risoluzione del dispositivo e disposizione della pagina."
    - "Modifica la proprietà <code>background-image</code> dei CSS per i display ad alta risoluzione utilizzando le media query con <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>."
    - "Utilizza <code>scrset</code> per fornire immagini ad alta risoluzione oltre all'immagine 1x nel markup."
    - "Valuta i costi in termini di rendimento dovuti all'utilizzo di tecniche di sostituzione delle immagini via JavaScript o di immagini compresse ad alta risoluzione per i dispositivi a risoluzioni inferiori."
  avoid-images:
    - "Se possibile, evita le immagini, sfrutta le funzionalità del browser, utilizza caratteri unicode al posto delle immagini e sostituisci icone complesse con i caratteri per icone."
  optimize-images:
    - "Non scegliere un formato a caso per le immagini, ma analizza quelli disponibili e utilizza il più adatto alle tue esigenze."
    - "Inserisci strumenti di ottimizzazione delle immagini e compressione al flusso di lavoro per la riduzione delle dimensioni dei file."
    - "Riduci il numero delle richieste HTTP inserendo immagini di utilizzo comune negli sprite immagine."
    - "Valuta se caricare le immagini solo al momento della visualizzazione, in modo da ottimizzare tempi di caricamento e peso iniziale della pagina."
notes:
  compressive:
    - "Utilizza con parsimonia le tecniche di compressione, poiché aumentano i costi in termini di decodifica e memoria. Il ridimensionamento delle immagini di grandi dimensioni per gli schermi di dimensioni ridotte è un'attività costosa che riduce le prestazioni dei dispositivi di fascia bassa con limiti di memoria e di capacità di calcolo."
related-guides:
  optimize:
  -
      title: "Ottimizzazione delle immagini"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Ottimizzazione dell'efficienza dei contenuti"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  Spesso le immagini richiedono il download di molti dati e occupano una parte rilevante dello spazio di visualizzazione della pagina. L'ottimizzazione delle immagini consente di risparmiare byte e migliorare il rendimento del sito web: il consumo della larghezza di banda del client e la velocità di download e visualizzazione delle risorse nel browser sono inversamente proporzionali al numero di byte da scaricare.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Scelta del formato corretto

Esistono due tipi di immagini da prendere in considerazione: [immagini vettoriali](http://it.wikipedia.org/wiki/Grafica_vettoriale) e [immagini raster](http://it.wikipedia.org/wiki/Grafica_raster). Per le immagini raster occorre selezionare il formato di compressione appropriato, come ad esempio GIF, PNG e JPG.

Le **immagini raster** sono simili alle fotografie e alle altre immagini costituite da una griglia di pixel o punti singoli. Di solito, le immagini raster vengono prodotte da fotocamere o scanner ed è possibile crearle nel browser con l'elemento `canvas`. La dimensione del file è direttamente proporzionale alla dimensione dell'immagine. Aumentando le dimensioni delle immagini raster rispetto a quelle originali si ottiene un effetto sfocato poiché il browser deve riempire in qualche modo i pixel mancanti.

Le **immagini vettoriali**, come logo e line art, vengono definite da un insieme di curve, linee, forme e colori di riempimento, create con programmi come Adobe Illustrator o Inkscape e salvate in un formato vettoriale come ad esempio [SVG](http://css-tricks.com/using-svg/). Le immagini vettoriali vengono realizzate con semplici primitive ed è possibile ridimensionarle senza perdite di qualità o modifiche della dimensione del file.

Per la scelta del formato corretto è importante prendere in considerazione l'origine dell'immagine (raster o vettoriale) e i contenuti (colori, animazioni, testo e così via). Non esiste un formato adatto a tutti i tipi di immagini: ciascun formato presenta vantaggi e svantaggi.

Per scegliere il formato corretto attieniti alle linee guida seguenti: 

* Utilizza il JPG per le fotografie.
* Utilizza l'SVG per gli elementi grafici vettoriali e a tinta unita come logo ed disegni al tratto.
  Se non sono disponibili elementi grafici vettoriali usa WebP o PNG.
* Utilizza il PNG e non il GIF poiché il primo formato offre colori e rapporto di compressione ottimali.
* Per le animazioni di maggiore durata utilizza i `<video>`, che offrono una qualità dell'immagine ottimale e un efficace controllo della riproduzione.

## Riduzione della dimensione dei file

È possibile ridurre le dimensioni del file utilizzando il 'post-processing' una volta concluso il salvataggio. Esistono diversi strumenti per la compressione delle immagini: con o senza perdita di informazioni, online, GUI e con riga di comando. È consigliabile eseguire un'ottimizzazione automatizzata dell'immagine come elemento principale del flusso di lavoro in uso.

Esistono diversi strumenti per eseguire un'ulteriore compressione senza perdita di informazioni dei file JPG e PNG senza compromettere la qualità dell'immagine. Per il formato JPG, prova [jpegtran](http://jpegclub.org/) o [jpegoptim](http://freshmeat.net/projects/jpegoptim/), disponibile solo su Linux e da eseguire con l'opzione `strip-all`. Per il formato PNG, prova [OptiPNG] (http://optipng.sourceforge.net/) o [PNGOUT] (http://www.advsys.net/ken/util/pngout.htm).

##Utilizzo degli sprite immagine

Lo spriting CSS è una tecnica che unisce diverse immagini in una singola immagine di 'foglio di sprite'. Quindi è possibile utilizzare singole immagini specificando l'immagine di sfondo di un elemento (foglio di sprite) e un offset per la visualizzazione della parte corretta.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt=" Foglio di sprite immagine utilizzato nell'esempio">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

Lo spriting riduce il numero dei download necessari per ottenere immagini multiple senza disattivare il caching.

## Valuta il caricamento ritardato

Il caricamento ritardato velocizza il caricamento delle pagine di grandi dimensioni con diverse immagini caricate secondo necessità o al termine del caricamento e del rendering del contenuto primario. Oltre ai miglioramenti in termini di rendimento, il caricamento ritardato consente di eseguire lo scorrimento infinito della pagina.

Attenzione nel creare pagine a scorrimento infinito, poiché i contenuti vengono caricati al momento della visualizzazione e i motori di ricerca potrebbero non indicizzarli. Inoltre, gli utenti in cerca delle informazioni visualizzate nei piè di pagina non riusciranno a visualizzare questa parte della pagina a causa del continuo caricamento dei nuovi contenuti.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




