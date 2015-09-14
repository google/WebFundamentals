---
title: "Immagini in CSS"
description: "La proprietà 'background' CSS è un potente strumento per l'aggiunta di immagini complesse agli elementi in modo da semplificare l'inserimento di immagini multiple, la ripetizione modulare delle stesse e molto altro."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Utilizza immagini adatte alle caratteristiche del display, prendendo in considerazione dimensioni dello schermo, risoluzione del dispositivo e disposizione della pagina."
    - "Modifica la proprietà <code>background-image</code> dei CSS per i display ad alta risoluzione utilizzando le media query con <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>."
    - "Utilizza 'scrset' per fornire immagini ad alta risoluzione oltre all'immagine 1x nel markup."
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
---

<p class="intro">
  La proprietà 'background' CSS è un potente strumento per l'aggiunta di immagini complesse agli elementi in modo da semplificare l'inserimento di immagini multiple, la ripetizione modulare delle stesse e molto altro.  Se utilizzata con le media query, la proprietà background è ancor più utile grazie alla possibilità di eseguire il caricamento condizionale delle immagini in base a risoluzione dello schermo, dimensioni del viewport e così via.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.use-right-image %}

## Utilizzo delle media query per il caricamento delle immagini adattabili o la direzione artistica

Le media query influiscono sulla disposizione della pagina e consentono anche il caricamento condizionale delle immagini o la gestione della direzione artistica in base alla larghezza del viewport.

Nell'esempio sottostante, con schermi di dimensioni ridotte viene scaricato e applicato solo `small.png` al contenuto `div`, mentre con schermi di dimensioni elevate `background-image: url(body.png)` viene applicato al corpo e `background-image: url(large.png)` al `div` del contenuto.

{% include_code src=_code/conditional-mq.html snippet=conditional lang=css %}

## Utilizzo di image-set per la fornitura di immagini ad alta risoluzione

La funzione `image-set()` dei CSS ottimizza la proprietà di comportamento `background` in modo da semplificare la fornitura di file di immagini multipli in base alle diverse caratteristiche dei dispositivi. In questo modo, il browser seleziona l'immagine ottimale in base alle caratteristiche del dispositivo, ad esempio un'immagine 2x su un display 2x o un'immagine 1x su un dispositivo 2x con larghezza di banda limitata.

{% highlight css %}
background-image: image-set(
  url(icon1x.jpg) 1x,
  url(icon2x.jpg) 2x
);
{% endhighlight %}

Oltre al caricamento dell'immagine appropriata, il browser ne esegue un ridimensionamento
adeguato. In altri termini, il browser suppone che le immagini 2x abbiano larghezza doppia rispetto a quelle 1x e ridimensiona l'immagine 2x riducendola di 2 volte, in modo che venga visualizzata nella pagina con la stesse dimensioni.

Il supporto di `image-set()` non è ancora diffuso ed è disponibile solo su Chrome e Safari usando il prefisso del fornitore `-webkit`. Attenzione a includere un'immagine alternativa in caso di assenza di supporto di `image-set()`. Ad esempio:

{% include_code src=_code/image-set.html snippet=imageset lang=css %}

In questo caso vengono caricate le corrette risorse nei server che supportano image-set o in alternativa la risorsa 1x. Poiché il supporto di `image-set()` non è ancora diffuso, la maggior parte dei browser utilizza la risorsa 1x.

## Utilizzo delle media query per fornire immagini ad alta risoluzione o la direzione artistica

Le media query possono creare regole basate sulle [proporzioni dei pixel del dispositivo](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg) per indicare diverse immagini per la visualizzazione 2x o 1x.

{% highlight css %}
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  /* High dpi styles & resources here */
}
{% endhighlight %}

Chrome, Firefox e Opera supportano lo standard `(min-resolution: 2dppx)`, mentre Safari e il browser di Android richiedono una sintassi prefissata del fornitore meno recente, senza l'unità `dppx`. Questi stili vengono caricati solo se il dispositivo corrisponde alla media query e richiedono la specifica dello stile per il caso di base. L'operazione consente di eseguire comunque il rendering anche se il browser non supporta la media query specifica della risoluzione.

{% include_code src=_code/media-query-dppx.html snippet=mqdppx lang=css %}

È possibile utilizzare la sintassi `min-width` per la visualizzazione di immagini alternative basate sulla dimensione del viewport. Si tratta di una tecnica vantaggiosa che non richiede il download dell'immagine in caso di mancata corrispondenza con la media query. Ad esempio, `bg.png` viene scaricato e applicato a `body` solo se la larghezza del browser è di almeno 500 pixel:

{% highlight css %}
@media (min-width: 500px) {
  body {
    background-image: url(bg.png);
  }
}
{% endhighlight %}	



