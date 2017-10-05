project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Un'immagine vale più di mille parole e ricopre un ruolo chiave per tutte le pagine. Tuttavia, le immagini richiedono il download di numerosi dati. Il Web design reattivo consente di modificare disposizione e immagini in base alle caratteristiche del dispositivo.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Immagini {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



Un'immagine vale più di mille parole e ricopre un ruolo chiave per tutte le pagine. Tuttavia, le immagini richiedono il download di numerosi dati. Con il Web design reattivo, la disposizione e le immagini possono adattarsi alle caratteristiche del dispositivo.



### Immagini reattive

Il Web design reattivo consente di modificare disposizione e contenuti in base alle caratteristiche del dispositivo. Ad esempio, devi utilizzare elementi grafici ad alta risoluzione sui display (2x) ad alta risoluzione per ottenere una buona nitidezza. Un'immagine con una larghezza del 50% rende rendere al meglio su un browser di larghezza pari a 800 pixel, ma utilizzerebbe risorse eccessive su un cellulare dallo schermo ridotto e consumerebbe la stessa larghezza di banda anche se scalata per uno schermo piccolo.

### Direzione artistica

<img class="center" src="img/art-direction.png" alt="Esempio di direzione artistica"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

In altre circostanze potrebbe essere necessario modificare drasticamente l'immagine, come ad esempio ridimensionarla, ritagliarla o persino sostituirla. In questi casi, le modifiche all'immagine vengono definite 'direzione artistica'. Consulta [responsiveimages.org/demos/](http://responsiveimages.org/demos/){: .external } per ulteriori esempi.


{% include "web/_shared/udacity/ud882.html" %}







## Immagini nel markup 




Il potente elemento<code>img</code> consente di scaricare, decodificare e renderizzare i contenuti, mentre i browser odierni supportano numerosi formati di immagine. La procedura di inserimento delle immagini compatibili con diversi dispositivi è simile a quella usata con i computer desktop e richiede minime regolazioni per offrire un'esperienza ottimale.



### TL;DR {: .hide-from-toc }
- Utilizza le dimensioni relative delle immagini per evitare l'overflow involontario del contenitore.
- Utilizza l'elemento <code>picture</code> per specificare immagini diverse in base alle caratteristiche del dispositivo (operazione detta 'direzione artistica').
- Utilizza <code>srcset</code> e il descrittore <code>x</code> nell'elemento <code>img</code> per indicare al browser l'immagine da utilizzare in presenza di diverse densità.



### Utilizzo delle dimensioni relative per le immagini

L'utilizzo delle unità relative per la larghezza delle immagine previene l'overflow involontario del viewport. Ad esempio, con `width: 50%` si ottiene una larghezza dell'immagine pari al 50% dell'elemento contenitore e non della dimensione effettiva dei pixel o del viewport.

Poiché CSS consente l'overflow del contenitore dei contenuti, può essere necessario utilizzare `max-width: 100%` per evitare l'overflow di immagini e altri contenuti. Ad esempio:


    img, embed, object, video {
      max-width: 100%;
    }
    

Inserisci descrizioni dettagliate con l'attributo `alt` degli elementi `img` per ottimizzare l'accessibilità del sito e fornire contesto ai lettori di schermo o altre tecnologie assistive.

### Ottimizzazione di `img` con `srcset` per dispositivi a DPI elevati

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

L'attributo <code>srcset</code> ottimizza l'azione dell'elemento <code>img</code> semplificando la fornitura di diversi file di immagine in base alle caratteristiche dei dispositivi. In maniera analoga alla funzione nativa CSS <code>image-set</code> <a href='#use_image-set_to_provide_high_res_images'> </a>, <code>srcset</code> indica al browser l'immagine ottimale in base alle caratteristiche del dispositivo, ad esempio un'immagine 2x su un display 2x e un'immagine 1x su dispositivi 2x con limiti di larghezza di banda.

<div class="clearfix"></div>



    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

I browser che non supportano `srcset` utilizzano il file di immagine predefinito indicato dall'attributo `src`. Per questo motivo fondamentale inserire sempre un'immagine 1x visualizzabile su qualsiasi dispositivo, indipendentemente dalle funzionalità. Se `srcset` è supportato, l'elenco di immagini/condizioni separato da virgole viene analizzato prima dell'esecuzione delle richieste, quindi viene scaricata e visualizzata solo l'immagine più appropriata.

Anche se le condizioni possono includere diverse caratteristiche, dalla densità dei pixel fino a larghezza e altezza, al momento solo la densità pixel gode di un supporto ottimale. Per equilibrare il comportamento attuale con le funzionalità future, prova a inserire l'immagine 2x nell'attributo.

### Direzione artistica nelle immagini reattive con `picture`

La modifica delle immagini in base alle caratteristiche del dispositivo, detta anche direzione artistica, avviene mediante l'elemento `picture`. L'elemento <code>picture</code> definisce una soluzione dichiarativa per la fornitura di diverse versioni di un'immagine in base a caratteristiche come dimensioni e risoluzione del dispositivo, orientamento e via dicendo.

<img class="center" src="img/art-direction.png" alt="Esempio di direzione artistica"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Note: L'elemento <code>picture</code> inizia a essere supportato dai browser. Anche se non è disponibile in tutti i browser, è consigliabile utilizzarlo grazie alla retroattività e alla possibilità di utilizzare una <a href='http://picturefill.responsiveimages.org/'>polilinea Picturefill</a>. Consulta il sito <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a> per maggiori informazioni.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Utilizzare l'elemento <code>picture</code> quando esiste un'origine dell'immagine a densità multiple o quando una grafica reattiva impone l'utilizzo di un'immagine diversa su alcuni tipi di schermi. Così come avviene per l'elemento <code>video</code>, è possibile inserire diversi elementi <code>source</code> per specificare diversi file d'immagine in base alle media query o al formato dell'immagine.

<div class="clearfix"></div>


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture"   adjust_indentation="auto" %}
</pre>

Nell'esempio precedente, se la larghezza del browser è di almeno 800 pixel, in base alla risoluzione del dispositivo viene utilizzato `head.jpg` o `head-2x.jpg`. Se la larghezza del browser è compresa fra 450 e 800 pixel, anche in questo caso viene utilizzato `head.jpg` o `head-2x.jpg` a seconda della risoluzione del dispositivo. Con schermi di larghezze inferiori a 450 pixel e retrocompatibilità nei casi in cui l'elemento `picture` non sia supportato, il browser esegue il rendering dell'elemento `img` (che occorre includere sempre). 

#### Immagini con dimensioni relative

Se non si conosce la dimensione finale dell'immagine può essere difficile indicare un descrittore di densità per le origini dell'immagine. In particolare, ciò avviene con le immagini fluide e distribuite sulla larghezza proporzionale del browser in base alle dimensioni dello stesso.

Invece di indicare densità e dimensioni fisse dell'immagine, è possibile specificare le dimensioni di ciascuna immagine fornita aggiungendo un descrittore di larghezza contenente la dimensione dell'elemento dell'immagine, consentendo al browser di calcolare la densità di pixel effettiva e scegliere l'immagine migliore da scaricare.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture"   adjust_indentation="auto" %}
</pre>

Nell'esempio precedente viene eseguito il rendering di un'immagine di dimensione pari alla metà della larghezza del viewport (sizes="50vw"), basata sulla larghezza del browser e sulle proporzioni in pixel del dispositivo, consentendo al browser di utilizzare l'immagine corretta indipendentemente dalla larghezza della finestra del browser. Ad esempio, la tabella sottostante indica l'immagine che verrà utilizzata dal browser:

<table>
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


#### Attenzione ai breakpoint nelle immagini reattive

In alcuni casi, le dimensioni o l'immagine potrebbero variare in base ai breakpoint della disposizione del sito. Ad esempio, con schermi di dimensioni ridotte l'immagine potrebbe coprire l'intera larghezza del viewport, mentre su schermi più grandi potrebbe occuparne solo una piccola parte. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture"   adjust_indentation="auto" %}
</pre>

L'attributo `size` dell'esempio precedente utilizza diverse media query per indicare le dimensioni dell'immagine. Se la larghezza del browser è superiore a 600 pixel, l'immagine occuperà il 25% della larghezza del viewport, mentre con una larghezza compresa fra 500 e 600 pixel l'immagine occuperà il 50% della larghezza del viewport. Infine, con una larghezza inferiore a 500 pixel l'immagine apparirà a larghezza piena.


### Possibilità di ingrandire le immagini dei prodotti

I clienti desiderano visualizzare al meglio gli articoli da acquistare. Nei siti di vendita al dettaglio, gli utenti devono poter visualizzare ingrandimenti ad alta risoluzione dei prodotti per analizzarne i dettagli e i [partecipanti allo studio](/web/fundamentals/getting-started/principles/) non gradirebbero certo l'impossibilità di utilizzare questa funzione.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Sito web di J. Crews con immagini dei prodotti dotate di funzione di zoom">
  <figcaption>Sito web di J. Crews con immagini dei prodotti dotate di funzione di zoom</figcaption>
</figure>

Il sito di J. Crews è un buon esempio di immagini interattive e dotate di funzione di zoom. L'overlay a scomparsa indica la possibilità di analizzare dell'immagine mediante una visualizzazione ingrandita e nitida.


### Ulteriori tecniche per le immagini

#### Compressione delle immagini

La [tecnica di compressione
delle immagini](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) invia un'immagine 2x a elevata compressione a tutti i dispositivi, indipendentemente dalle funzionalità. In base al tipo d'immagine e al livello di compressione, la qualità dell'immagine potrebbe restare inalterata anche con una significativa riduzione delle dimensioni del file.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html">Vedi esempio</a>

Note: Utilizza con parsimonia le tecniche di compressione, poiché aumentano i costi in termini di decodifica e memoria. Il ridimensionamento delle immagini di grandi dimensioni per gli schermi di dimensioni ridotte è un'attività costosa che riduce le prestazioni dei dispositivi di fascia bassa con limiti di memoria e di capacità di calcolo.

#### Sostituzione dell'immagine JavaScript

La sostituzione dell'immagine JavaScript verifica le funzionalità del dispositivo ed esegue l'operazione in maniera ottimale. È possibile determinare la proporzione dei pixel del dispositivo con `window.devicePixelRatio`, ottenere altezza e larghezza dello schermo ed eseguire lo sniffing della connessione di rete con `navigator.connection` o una richiesta fasulla. Una volta raccolte queste informazioni è possibile scegliere l'immagine da caricare.

L'approccio è caratterizzato da un aspetto negativo: l'utilizzo di JavaScript rallenta il caricamento dell'immagine fino alla conclusione dell'attività del parser look-ahead e il download delle immagini non avrà luogo prima dell'attivazione dell'evento `pageload`. Inoltre, il browser scarica l'immagine 1x e 2x causando un aumento del peso della pagina.





## Immagini in CSS 




La proprietà 'background' CSS è un potente strumento per l'aggiunta di immagini complesse agli elementi in modo da semplificare l'inserimento di immagini multiple, la ripetizione modulare delle stesse e molto altro.  Se utilizzata con le media query, la proprietà background è ancor più utile grazie alla possibilità di eseguire il caricamento condizionale delle immagini in base a risoluzione dello schermo, dimensioni del viewport e così via.



### TL;DR {: .hide-from-toc }
- Utilizza immagini adatte alle caratteristiche del display, prendendo in considerazione dimensioni dello schermo, risoluzione del dispositivo e disposizione della pagina.
- Modifica la proprietà <code>background-image</code> dei CSS per i display ad alta risoluzione utilizzando le media query con <code>min-resolution</code> e <code>-webkit-min-device-pixel-ratio</code>.
- Utilizza `scrset` per fornire immagini ad alta risoluzione oltre all'immagine 1x nel markup.
- Valuta i costi in termini di rendimento dovuti all'utilizzo di tecniche di sostituzione delle immagini via JavaScript o di immagini compresse ad alta risoluzione per i dispositivi a risoluzioni inferiori.


### Utilizzo delle media query per il caricamento delle immagini adattabili o la direzione artistica

Le media query influiscono sulla disposizione della pagina e consentono anche il caricamento condizionale delle immagini o la gestione della direzione artistica in base alla larghezza del viewport.

Nell'esempio sottostante, con schermi di dimensioni ridotte viene scaricato e applicato solo `small.png` al contenuto `div`, mentre con schermi di dimensioni elevate `background-image: url(body.png)` viene applicato al corpo e `background-image: url(large.png)` al `div` del contenuto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional"   adjust_indentation="auto" %}
</pre>

### Utilizzo di image-set per la fornitura di immagini ad alta risoluzione

La funzione `image-set()` dei CSS ottimizza la proprietà di comportamento `background` in modo da semplificare la fornitura di file di immagini multipli in base alle diverse caratteristiche dei dispositivi. In questo modo, il browser seleziona l'immagine ottimale in base alle caratteristiche del dispositivo, ad esempio un'immagine 2x su un display 2x o un'immagine 1x su un dispositivo 2x con larghezza di banda limitata.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Oltre al caricamento dell'immagine appropriata, il browser ne esegue un ridimensionamento
adeguato. In altri termini, il browser suppone che le immagini 2x abbiano larghezza doppia rispetto a quelle 1x e ridimensiona l'immagine 2x riducendola di 2 volte, in modo che venga visualizzata nella pagina con la stesse dimensioni.

Il supporto di `image-set()` non è ancora diffuso ed è disponibile solo su Chrome e Safari usando il prefisso del fornitore `-webkit`. Attenzione a includere un'immagine alternativa in caso di assenza di supporto di `image-set()`. Ad esempio:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset"   adjust_indentation="auto" %}
</pre>

In questo caso vengono caricate le corrette risorse nei server che supportano image-set o in alternativa la risorsa 1x. Poiché il supporto di `image-set()` non è ancora diffuso, la maggior parte dei browser utilizza la risorsa 1x.

### Utilizzo delle media query per fornire immagini ad alta risoluzione o la direzione artistica

Le media query possono creare regole basate sulle [proporzioni dei pixel del dispositivo](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg) per indicare diverse immagini per la visualizzazione 2x o 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox e Opera supportano lo standard `(min-resolution: 2dppx)`, mentre Safari e il browser di Android richiedono una sintassi prefissata del fornitore meno recente, senza l'unità `dppx`. Questi stili vengono caricati solo se il dispositivo corrisponde alla media query e richiedono la specifica dello stile per il caso di base. L'operazione consente di eseguire comunque il rendering anche se il browser non supporta la media query specifica della risoluzione.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx"   adjust_indentation="auto" %}
</pre>

È possibile utilizzare la sintassi `min-width` per la visualizzazione di immagini alternative basate sulla dimensione del viewport. Si tratta di una tecnica vantaggiosa che non richiede il download dell'immagine in caso di mancata corrispondenza con la media query. Ad esempio, `bg.png` viene scaricato e applicato a `body` solo se la larghezza del browser è di almeno 500 pixel:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	





## Utilizzo di SVG per le icone 




Per aggiungere icone alla pagina cerca di utilizzare icone SVG o i caratteri unicode.




### TL;DR {: .hide-from-toc }
- Utilizza SVG o unicode per le icone al posto delle immagini raster.


### Sostituzione delle icone semplici con caratteri unicode

Numerosi caratteri contengono glifi unicode che è possibile utilizzare al posto delle immagini. A differenza delle immagini, è possibile scalare i caratteri unicode ottenendo una qualità ottimale in qualsiasi dimensione.

Oltre al normale insieme set di caratteri, l'unicode inlcude simboli per forme numeriche (&#8528;), frecce (&#8592;), operatori matematici (&#8730;), forme geometriche (&#9733;), immagini di controllo (&#9654;), schemi braille (&#10255;), note musicali (&#9836;), lettere greche (&#937;) e pezzi degli scacchi (&#9822;).

La procedura per l'inserimento dei caratteri unicode è identica a quella per le named entity, ovvero l'utilizzo del codice `&#XXXX`, in cui `XXXX` è il numero del carattere unicode. Ad esempio:


    Sei un super&#9733;
    

Sei un super&#9733;

### Sostituzione delle icone complesse con SVG
Per creare icone più complesse, SVG offre un risultato più leggero, intuitivo e personalizzabile con CSS. SVG offre diversi vantaggi rispetto alle immagini raster:

* Si tratta di elementi grafici vettoriali scalabili all'infinito.
* Effetti CSS come colori, ombreggiature, trasparenze e animazioni sono molto semplici da utilizzare.
* È possibile visualizzare immagini SVG inline nel documento.
* È un formato semantico.
* Offrono un'accessibilità ottimale con gli i corretti attributi.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg"   adjust_indentation="auto" %}
</pre>

### Utilizza i caratteri per icone con attenzione

I caratteri per icone sono diffusi e intuitivi, ma presentano alcuni svantaggi rispetto alle icone SVG.

* Si tratta di elementi grafici vettoriali scalabili all'infinito, ma un eventuale anti-aliasing potrebbe ridurne la nitidezza.
* Personalizzazione con CSS limitata.
* L'esatto posizionamento dei pixel potrebbe essere difficile, essendo basato su altezza delle linee, spaziatura delle lettere e così via.
* Non essendo elementi semantici, sono inadatti a lettori dello schermo o altre tecnologie di assistenza.
* Se non utilizzati al meglio possono creare file di grandi dimensioni anche con l'utilizzo di un gruppo ridotto di icone. 



<img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Esempio di pagina che utilizza FontAwesome come icone dei caratteri.">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont"   adjust_indentation="auto" %}
</pre>

Esistono diversi caratteri per icone gratuiti e a pagamento come [Font Awesome](http://fortawesome.github.io/Font-Awesome/){: .external }, [Pictos](http://pictos.cc/) e [Glyphicons](http://glyphicons.com/).

Equilibra il peso delle richieste HTTP aggiuntive e le dimensioni del file con le esigenze in termini di icone. Ad esempio, se occorrono poche icone è consigliabile l'utilizzo di un'immagine o di uno sprite di immagine.





## Ottimizzazione delle immagini per un rendimento ottimale 




Spesso le immagini richiedono il download di molti dati e occupano una parte rilevante dello spazio di visualizzazione della pagina. L'ottimizzazione delle immagini consente di risparmiare byte e migliorare il rendimento del sito web: il consumo della larghezza di banda del client e la velocità di download e visualizzazione delle risorse nel browser sono inversamente proporzionali al numero di byte da scaricare.


### TL;DR {: .hide-from-toc }
- Non scegliere un formato a caso per le immagini, ma analizza quelli disponibili e utilizza il più adatto alle tue esigenze.
- Inserisci strumenti di ottimizzazione delle immagini e compressione al flusso di lavoro per la riduzione delle dimensioni dei file.
- Riduci il numero delle richieste HTTP inserendo immagini di utilizzo comune negli sprite immagine.
- Valuta se caricare le immagini solo al momento della visualizzazione, in modo da ottimizzare tempi di caricamento e peso iniziale della pagina.


### Scelta del formato corretto

Esistono due tipi di immagini da prendere in considerazione: [immagini vettoriali](http://it.wikipedia.org/wiki/Grafica_vettoriale){: .external } e [immagini raster](http://it.wikipedia.org/wiki/Grafica_raster). Per le immagini raster occorre selezionare il formato di compressione appropriato, come ad esempio GIF, PNG e JPG.

Le **immagini raster** sono simili alle fotografie e alle altre immagini costituite da una griglia di pixel o punti singoli. Di solito, le immagini raster vengono prodotte da fotocamere o scanner ed è possibile crearle nel browser con l'elemento `canvas`. La dimensione del file è direttamente proporzionale alla dimensione dell'immagine. Aumentando le dimensioni delle immagini raster rispetto a quelle originali si ottiene un effetto sfocato poiché il browser deve riempire in qualche modo i pixel mancanti.

Le **immagini vettoriali**, come logo e line art, vengono definite da un insieme di curve, linee, forme e colori di riempimento, create con programmi come Adobe Illustrator o Inkscape e salvate in un formato vettoriale come ad esempio [SVG](http://css-tricks.com/using-svg/){: .external }. Le immagini vettoriali vengono realizzate con semplici primitive ed è possibile ridimensionarle senza perdite di qualità o modifiche della dimensione del file.

Per la scelta del formato corretto è importante prendere in considerazione l'origine dell'immagine (raster o vettoriale) e i contenuti (colori, animazioni, testo e così via). Non esiste un formato adatto a tutti i tipi di immagini: ciascun formato presenta vantaggi e svantaggi.

Per scegliere il formato corretto attieniti alle linee guida seguenti: 

* Utilizza il JPG per le fotografie.
* Utilizza l'SVG per gli elementi grafici vettoriali e a tinta unita come logo ed disegni al tratto.
  Se non sono disponibili elementi grafici vettoriali usa WebP o PNG.
* Utilizza il PNG e non il GIF poiché il primo formato offre colori e rapporto di compressione ottimali.
* Per le animazioni di maggiore durata utilizza i `<video>`, che offrono una qualità dell'immagine ottimale e un efficace controllo della riproduzione.

### Riduzione della dimensione dei file

È possibile ridurre le dimensioni del file utilizzando il 'post-processing' una volta concluso il salvataggio. Esistono diversi strumenti per la compressione delle immagini: con o senza perdita di informazioni, online, GUI e con riga di comando. È consigliabile eseguire un'ottimizzazione automatizzata dell'immagine come elemento principale del flusso di lavoro in uso.

Esistono diversi strumenti per eseguire un'ulteriore compressione senza perdita di informazioni dei file JPG e PNG senza compromettere la qualità dell'immagine. Per il formato JPG, prova [jpegtran](http://jpegclub.org/){: .external } o [jpegoptim](http://freshmeat.net/projects/jpegoptim/), disponibile solo su Linux e da eseguire con l'opzione `strip-all`. Per il formato PNG, prova [OptiPNG](http://optipng.sourceforge.net/) o [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

##Utilizzo degli sprite immagine

Lo spriting CSS è una tecnica che unisce diverse immagini in una singola immagine di 'foglio di sprite'. Quindi è possibile utilizzare singole immagini specificando l'immagine di sfondo di un elemento (foglio di sprite) e un offset per la visualizzazione della parte corretta.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt=" Foglio di sprite immagine utilizzato nell'esempio"></a>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite"   adjust_indentation="auto" %}
</pre>

Lo spriting riduce il numero dei download necessari per ottenere immagini multiple senza disattivare il caching.

### Valuta il caricamento ritardato

Il caricamento ritardato velocizza il caricamento delle pagine di grandi dimensioni con diverse immagini caricate secondo necessità o al termine del caricamento e del rendering del contenuto primario. Oltre ai miglioramenti in termini di rendimento, il caricamento ritardato consente di eseguire lo scorrimento infinito della pagina.

Attenzione nel creare pagine a scorrimento infinito, poiché i contenuti vengono caricati al momento della visualizzazione e i motori di ricerca potrebbero non indicizzarli. Inoltre, gli utenti in cerca delle informazioni visualizzate nei piè di pagina non riusciranno a visualizzare questa parte della pagina a causa del continuo caricamento dei nuovi contenuti.

{# include shared/related_guides.liquid inline=true list=page.related-guides.optimize #}






## Evitare le immagini 




In alcuni casi, è consigliabile evitare l'utilizzo delle immagini. Se possibile, utilizza le funzionalità native del browser per offrire funzionalità analoghe. I browser possono creare elementi grafici che un tempo richiedevano l'utilizzo dei file d'immagine. In altre parole, il browser non deve più scaricare file di immagine separati in modo da evitare la visualizzazione di immagini ridimensionate in modo non ottimale. È possibile effettuare il rendering delle icone usando unicode o i caratteri speciali per icone.





### Posiziona i testi in un markup senza incorporarli nelle immagini

Se possibile, usa il testo e non incorporarlo nelle immagini. Ad esempio, evita l'utilizzo delle immagini per le intestazioni o l'inserimento di informazioni di contatto come numeri telefonici o indirizzi, poiché in questo modo è impossibile copiare e incollare le informazioni, utilizzare gli screen reader e ottenere buone prestazioni. Al contrario, inserisci i testi in un markup e utilizza i webfont per ottenere lo stile desiderato.

### Utilizzo di CSS per la sostituzione delle immagini

I browser moderni utilizzano le funzionalità CSS per la creazione di stili che un tempo richiedevano l'utilizzo delle immagini. Ad esempio, è possibile creare gradienti complessi con la proprietà <code>background</code>, ombre con <code>box-shadow</code> e angoli smussati con <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Inoltre, l'utilizzo di queste tecniche non richiede cicli di rendering, cosa molto importante per i dispositivi mobili. Attenzione a non esagerare, poiché potresti sacrificare i vantaggi ottenuti e ottenere un basso rendimento.



