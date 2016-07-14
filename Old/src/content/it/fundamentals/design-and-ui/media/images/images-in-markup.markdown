---
title: "Immagini nel markup"
description: "Il potente elemento 'img' consente di scaricare, decodificare e renderizzare i contenuti, mentre i browser odierni supportano numerosi formati di immagine."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Utilizza le dimensioni relative delle immagini per evitare l'overflow involontario del contenitore."
    - "Utilizza l'elemento <code>picture</code> per specificare immagini diverse in base alle caratteristiche del dispositivo (operazione detta 'direzione artistica')."
    - "Utilizza <code>srcset</code> e il descrittore <code>x</code> nell'elemento <code>img</code> per indicare al browser l'immagine da utilizzare in presenza di diverse densità."
notes:
  picture-support:
     - "L'elemento <code>picture</code> inizia a essere supportato dai browser. Anche se non è disponibile in tutti i browser, è consigliabile utilizzarlo grazie alla retroattività e alla possibilità di utilizzare una <a href='http://picturefill.responsiveimages.org/'>polilinea Picturefill</a>. Consulta il sito <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a> per maggiori informazioni."
  compressive:
    - "Utilizza con parsimonia le tecniche di compressione, poiché aumentano i costi in termini di decodifica e memoria. Il ridimensionamento delle immagini di grandi dimensioni per gli schermi di dimensioni ridotte è un'attività costosa che riduce le prestazioni dei dispositivi di fascia bassa con limiti di memoria e di capacità di calcolo."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  Il potente elemento<code>img</code> consente di scaricare, decodificare e renderizzare i contenuti, mentre i browser odierni supportano numerosi formati di immagine. La procedura di inserimento delle immagini compatibili con diversi dispositivi è simile a quella usata con i computer desktop e richiede minime regolazioni per offrire un'esperienza ottimale.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Utilizzo delle dimensioni relative per le immagini

L'utilizzo delle unità relative per la larghezza delle immagine previene l'overflow involontario del viewport. Ad esempio, con `width: 50%` si ottiene una larghezza dell'immagine pari al 50% dell'elemento contenitore e non della dimensione effettiva dei pixel o del viewport.

Poiché CSS consente l'overflow del contenitore dei contenuti, può essere necessario utilizzare `max-width: 100%` per evitare l'overflow di immagini e altri contenuti. Ad esempio:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Inserisci descrizioni dettagliate con l'attributo `alt` degli elementi `img` per ottimizzare l'accessibilità del sito e fornire contesto ai lettori di schermo o altre tecnologie assistive.

## Ottimizzazione di `img` con `srcset` per dispositivi a DPI elevati

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      L'attributo <code>srcset</code> ottimizza l'azione dell'elemento <code>img</code> semplificando la fornitura di diversi file di immagine in base alle caratteristiche dei dispositivi. In maniera analoga alla funzione nativa CSS <code>image-set</code> <a href='images-in-css.html#use-image-set-to-provide-high-res-images'> </a>, <code>srcset</code> indica al browser l'immagine ottimale in base alle caratteristiche del dispositivo, ad esempio un'immagine 2x su un display 2x e un'immagine 1x su dispositivi 2x con limiti di larghezza di banda.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

I browser che non supportano `srcset` utilizzano il file di immagine predefinito indicato dall'attributo `src`. Per questo motivo fondamentale inserire sempre un'immagine 1x visualizzabile su qualsiasi dispositivo, indipendentemente dalle funzionalità. Se `srcset` è supportato, l'elenco di immagini/condizioni separato da virgole viene analizzato prima dell'esecuzione delle richieste, quindi viene scaricata e visualizzata solo l'immagine più appropriata.

Anche se le condizioni possono includere diverse caratteristiche, dalla densità dei pixel fino a larghezza e altezza, al momento solo la densità pixel gode di un supporto ottimale. Per equilibrare il comportamento attuale con le funzionalità future, prova a inserire l'immagine 2x nell'attributo.

## Direzione artistica nelle immagini reattive con `picture`

La modifica delle immagini in base alle caratteristiche del dispositivo, detta anche direzione artistica, avviene mediante l'elemento `picture`. L'elemento <code>picture</code> definisce una soluzione dichiarativa per la fornitura di diverse versioni di un'immagine in base a caratteristiche come dimensioni e risoluzione del dispositivo, orientamento e via dicendo.

<img class="center" src="img/art-direction.png" alt="Esempio di direzione artistica"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Utilizzare l'elemento <code>picture</code> quando esiste un'origine dell'immagine a densità multiple o quando una grafica reattiva impone l'utilizzo di un'immagine diversa su alcuni tipi di schermi. Così come avviene per l'elemento <code>video</code>, è possibile inserire diversi elementi <code>source</code> per specificare diversi file d'immagine in base alle media query o al formato dell'immagine.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

Nell'esempio precedente, se la larghezza del browser è di almeno 800 pixel, in base alla risoluzione del dispositivo viene utilizzato `head.jpg` o `head-2x.jpg`. Se la larghezza del browser è compresa fra 450 e 800 pixel, anche in questo caso viene utilizzato `head.jpg` o `head-2x.jpg` a seconda della risoluzione del dispositivo. Con schermi di larghezze inferiori a 450 pixel e retrocompatibilità nei casi in cui l'elemento `picture` non sia supportato, il browser esegue il rendering dell'elemento `img` (che occorre includere sempre). 

### Immagini con dimensioni relative

Se non si conosce la dimensione finale dell'immagine può essere difficile indicare un descrittore di densità per le origini dell'immagine. In particolare, ciò avviene con le immagini fluide e distribuite sulla larghezza proporzionale del browser in base alle dimensioni dello stesso.

Invece di indicare densità e dimensioni fisse dell'immagine, è possibile specificare le dimensioni di ciascuna immagine fornita aggiungendo un descrittore di larghezza contenente la dimensione dell'elemento dell'immagine, consentendo al browser di calcolare la densità di pixel effettiva e scegliere l'immagine migliore da scaricare.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

Nell'esempio precedente viene eseguito il rendering di un'immagine di dimensione pari alla metà della larghezza del viewport (sizes="50vw"), basata sulla larghezza del browser e sulle proporzioni in pixel del dispositivo, consentendo al browser di utilizzare l'immagine corretta indipendentemente dalla larghezza della finestra del browser. Ad esempio, la tabella sottostante indica l'immagine che verrà utilizzata dal browser:

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Browser width">Larghezza del browser</th>
      <th data-th="Device pixel ratio">Proporzioni in pixel del dispositivo</th>
      <th data-th="Image used">Immagine utilizzata</th>
      <th data-th="Effective resolution">Risoluzione effettiva</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400 pixel</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400 pixel</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2,67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640 px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3,125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


### Attenzione ai breakpoint nelle immagini reattive

In alcuni casi, le dimensioni o l'immagine potrebbero variare in base ai breakpoint della disposizione del sito. Ad esempio, con schermi di dimensioni ridotte l'immagine potrebbe coprire l'intera larghezza del viewport, mentre su schermi più grandi potrebbe occuparne solo una piccola parte. 

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

L'attributo `size` dell'esempio precedente utilizza diverse media query per indicare le dimensioni dell'immagine. Se la larghezza del browser è superiore a 600 pixel, l'immagine occuperà il 25% della larghezza del viewport, mentre con una larghezza compresa fra 500 e 600 pixel l'immagine occuperà il 50% della larghezza del viewport. Infine, con una larghezza inferiore a 500 pixel l'immagine apparirà a larghezza piena.


## Possibilità di ingrandire le immagini dei prodotti

I clienti desiderano visualizzare al meglio gli articoli da acquistare. Nei siti di vendita al dettaglio, gli utenti devono poter visualizzare ingrandimenti ad alta risoluzione dei prodotti per analizzarne i dettagli e i [partecipanti allo studio](/web/fundamentals/principles/research-study.html) non gradirebbero certo l'impossibilità di utilizzare questa funzione.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Sito web di J. Crews con immagini dei prodotti dotate di funzione di zoom">
  <figcaption>Sito web di J. Crews con immagini dei prodotti dotate di funzione di zoom</figcaption>
</figure>

Il sito di J. Crews è un buon esempio di immagini interattive e dotate di funzione di zoom. L'overlay a scomparsa indica la possibilità di analizzare dell'immagine mediante una visualizzazione ingrandita e nitida.


## Ulteriori tecniche per le immagini

### Compressione delle immagini

La [tecnica di compressione
delle immagini] (http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) invia un'immagine 2x a elevata compressione a tutti i dispositivi, indipendentemente dalle funzionalità. In base al tipo d'immagine e al livello di compressione, la qualità dell'immagine potrebbe restare inalterata anche con una significativa riduzione delle dimensioni del file.

{% link_sample _code/compressive.html %}
Vedi esempio
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.notes.compressive %}

### Sostituzione dell'immagine JavaScript

La sostituzione dell'immagine JavaScript verifica le funzionalità del dispositivo ed esegue l'operazione in maniera ottimale. È possibile determinare la proporzione dei pixel del dispositivo con `window.devicePixelRatio`, ottenere altezza e larghezza dello schermo ed eseguire lo sniffing della connessione di rete con `navigator.connection` o una richiesta fasulla. Una volta raccolte queste informazioni è possibile scegliere l'immagine da caricare.

L'approccio è caratterizzato da un aspetto negativo: l'utilizzo di JavaScript rallenta il caricamento dell'immagine fino alla conclusione dell'attività del parser look-ahead e il download delle immagini non avrà luogo prima dell'attivazione dell'evento `pageload`. Inoltre, il browser scarica l'immagine 1x e 2x causando un aumento del peso della pagina.



