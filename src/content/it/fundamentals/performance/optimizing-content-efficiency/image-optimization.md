project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Le immagini costituiscono la maggior parte dei byte scaricati su una pagina Web e occupano spesso una parte significativa di spazio visivo. Di conseguenza, ottimizzare le immagini consente spesso di risparmiare byte e migliorare le prestazioni del sito Web: meno byte deve scaricare il browser, meno traffico si crea sulla larghezza di banda del client, più rapidamente il browser è in grado di scaricare e renderizzare contenuti utili sul monitor.

{# wf_updated_on: 2017-11-10 #}
{# wf_published_on: 2014-05-06 #}

# Ottimizzazione delle immagini {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Le immagini costituiscono la maggior parte dei byte scaricati da una pagina Web
e occupano spesso una parte significativa di spazio visivo. Di conseguenza,
ottimizzare le immagini consente spesso di risparmiare byte e migliorare le
prestazioni del sito Web: meno byte deve scaricare il browser, meno traffico si
crea sulla larghezza di banda del client, più rapidamente il browser è in grado
di scaricare e renderizzare contenuti utili sullo schermo.

L'ottimizzazione delle immagini è al contempo un'arte e una scienza: è un'arte,
perché non esiste una risposta definitiva su quale sia il miglior modo di
comprimere una determinata immagine, ma è anche una scienza, perché tecniche e
algoritmi in grado di ridurre significativamente le dimensioni di un'immagine
sono davvero numerosi. Per trovare le impostazioni ottimali per un'immagine è
necessaria un'analisi attenta di diversi fattori: proprietà del formato,
contenuto dei dati codificati, dimensioni in pixel e altro ancora.

## Eliminazione e sostituzione di immagini

### TL;DR {: .hide-from-toc }
- Eliminare immagini non necessarie
- Sfruttare effetti CSS3, laddove possibile
- Utilizzare font web invece di codificare il testo in immagini


La prima domanda che dovresti porti riguarda la capacità di un'immagine di
ottenere di fatto l'effetto che desideri. Un design corretto è semplice e
garantisce sempre il risultato migliore. Se puoi eliminare un'immagine, che
spesso richiede un numero elevato di byte relativi a risorse HTML, CSS,
JavaScript e di altra natura sulla pagina, questa sarà sempre la migliore
strategia di ottimizzazione. Detto ciò, un'immagine ben posizionata può anche
comunicare più di mille parole; spetta dunque a te trovare un equilibrio.

Dovrai poi valutare se vi sia una tecnologia alternativa in grado di raggiungere
i risultati desiderati, ma in maniera più efficace:

* **Effetti CSS** (gradienti, ombreggiature, ecc... ) e animazioni CSS possono
essere utilizzati per produrre risorse indipendenti dalla risoluzione, che
appaiano sempre nitide a qualsiasi risoluzione e livello di ingrandimento,
spesso a una frazione dei byte necessari per un file immagine.
* **font web** consentono di utilizzare caratteri splendidi mantenendo al
contempo la possibilità di selezionare, cercare e ridimensionare il testo, con
un miglioramento significativo dell'usabilutà.

Ogni volta che ti trovi a codificare del testo in immagine, fermati e rifletti.
Una tipografia di alta qualità è fondamentale per un buon design, un branding e
una leggibilità idonei, ma il text-in-images rende l'esperienza dell'utente
un'esperienza negativa: il testo non è selezionabile, non ricercabile, non
ingrandibile, non accessibile e non idoneo a dispositivi high-DPI. L'utilizzo di
font web richiede un [insieme di ottimizzazioni
proprio](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/),
ma risolve tutte le problematiche suddette e rappresenta sempre una scelta
migliore per la visualizzare del testo.


## Immagini Vettoriali vs. Raster

### TL;DR {: .hide-from-toc }
-  Le immagini vettoriali sono ideali per le forme geometriche
-  Le immagini vettoriali sono indipendenti da zoom e risoluzione
-  Le immagini raster sono consigliabili per visualizzazioni complesse e
   dettagliate, contenenti numerose forme irregolari


Una volta stabilito che un'immagine è il formato ottimale per ottenere l'effetto
desiderato, la successiva scelta critica riguarda la selezione del formato
idoneo:

<div class="attempt-left">
  <figure>
  <img src="images/vector-zoom.png" alt="Immagine vettoriale ingrandita">
  <figcaption>Vettoriale</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
  <img src="images/raster-zoom.png" alt="Immagine raster ingrandita">
  <figcaption>Raster</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

*  La [grafica vettoriale](http://en.wikipedia.org/wiki/Vector_graphics)
   utilizza linee, punti e poligoni per creare un'immagine.
*  La [grafica raster](http://en.wikipedia.org/wiki/Raster_graphics) crea
   un'immagine codificando i singoli valori di ogni pixel entro una griglia
   rettangolare.

Ciascun formato presenta vantaggi e svantaggi. I formati vettoriali sono ideali
per immagini composte da forme geometriche semplici (ad es. loghi, testi, icone
e così via), e garantiscono risultati nitidi con qualsiasi risoluzione e
impostazione di zoom; ciò li rende ideali per i monitor ad alta risoluzione e le
risorse che devono essere visualizzate con dimensioni variabili.

Tuttavia, i formati vettoriali risultano insufficienti per immagini complesse
(ad es. una foto): il livello di markup SVG necessario a descrivere tutte le
forme può rivelarsi eccessivamente elevato e il risultato rischia di non
apparire sempre 'fotorealistico'. In tal caso, è consigliabile utilizzare un
formato raster, come GIF, PNG, JPEG o uno dei formati più recenti, come
JPEG-XR e WebP.

Le immagini raster non dispongono della medesima, comoda indipendenza da
risoluzione e zoom; eseguendo lo scaling di un'immagine raster, si otterrà una
grafica sfocata e frastagliata. Di conseguenza, potrebbe essere necessario
salvarne più versioni con risoluzioni diverse per offrire agli utenti
un'esperienza ottimale.


## Implicazioni dei monitor ad alta risoluzione

### TL;DR {: .hide-from-toc }
-  I monitor ad alta risoluzione contengono più device pixel  dei pixel CSS
-  Le immagini ad alta risoluzione richiedono un numero significativamente più
   alto di pixel e byte
-  Le tecniche di ottimizzazione delle immagini sono le stesse,
   indipendentemente dalla risoluzione


Quando si parla di pixel immagine, dobbiamo fare una distinzione tra diversi
tipi di pixel: CSS pixel e device pixel. Un solo CSS pixel può contenere più
device pixel; ad esempio, un solo CSS pixel può corrispondere a un unico device
pixel o a più device pixel. Qual è la differenza? Più device pixel ci sono,
maggiore sarà il dettaglio dei contenuti visualizzati sul monitor.

![CSS vs device pixels](images/css-vs-device-pixels.png)

I monitor High DPI (HiDPI) offrono risultati splendidi, ma ad un ovvio
compromesso: le nostre immagini richiederanno maggiori dettagli per poter trarre
vantaggio dal maggior numero di pixel. La buona notizia è che le immagini
vettoriali sono ideali per tale obiettivo, poiché se ne può eseguire il
rendering a qualsiasi risoluzione, con risultati sempre nitidi; certo, potremmo
dover sostenere costi maggiori di elaborazione per affinare i dettagli, ma la
risorsa sottostante è la medesima ed è indipendente dalla risoluzione.

Dall'altro lato, le immagini raster presentano una sfida molto più ampia, poiché
codifica i dati immagine sulla base del singolo pixel. Di conseguenza, maggiore
è il numero di pixel, maggiori sono le dimensioni file di un'immagine raster.
Prendiamo ad esempio la differenza tra una foto visualizzata a 100x100 (CSS)
pixel:

<table>
<thead>
  <tr>
    <th>Risoluzione monitor</th>
    <th>Pixel totali</th>
    <th>Dimensioni file senza compressione (4 byte per pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolution">1x</td>
  <td data-th="total pixels">100 x 100 = 10.000</td>
  <td data-th="filesize">40.000 byte</td>
</tr>
<tr>
  <td data-th="resolution">2x</td>
  <td data-th="total pixels">100 x 100 x 4 = 40.000</td>
  <td data-th="filesize">160.000 byte</td>
</tr>
<tr>
  <td data-th="resolution">3x</td>
  <td data-th="total pixels">100 x 100 x 9 = 90.000</td>
  <td data-th="filesize">360.000 byte</td>
</tr>
</tbody>
</table>

Raddoppiando la risoluzione del monitor, il numero totale di pixel aumenta del
fattore quattro: il doppio del numero di pixel orizzontali moltiplicato per il
doppio del numero di pixel verticali. Di conseguenza, un monitor '2x' non solo
raddoppia, ma quadruplica il numero di pixel necessari!

Che cosa significa dunque in pratica? I monitor ad alta risoluzione ci
consentono di visualizzare immagini splendide, in grado di valorizzare al
massimo un prodotto. Tuttavia, essi richiedono anche delle immagini ad alta
risoluzione: scegli immagini vettoriali laddove possibile, poiché sono
indipendenti dalla risoluzione e offrono sempre risultati nitidi. Nel caso in
cui sia invece necessaria un'immagine raster, utilizza e ottimizza più varianti
di imagewith con l'aiuto di 
[`srcset` and `picture`](/web/fundamentals/design-and-ui/media/images#images-in-markup).

## Ottimizzazione di immagini vettoriali

### TL;DR {: .hide-from-toc }
- SVG è un formato immagine basato su XML
- È consigliabile minificare i file SVG per ridurne le dimensioni
- È consigliabile comprimere i file SVG con GZIP


Tutti i moderni browser supportano la Scalable Vector Graphics (SVG), ovvero un
formato immagine basato su XML per la grafica bidimensionale: possiamo
incorporare il markup SVG direttamente nella pagina, o come risorsa esterna.
Un file SVG può essere creato sia dalla maggior parte dei software di disegno
vettoriale, sia manualmente, direttamente nel tuo editor di testi preferito.


    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
    <g id="XMLID_1_">
      <g>
        <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
      </g>
    </g>
    </svg>
    

L'esempio precedente mostra la creazione di una forma circolare semplice con una
linea nera di contorni e sfondo rosso, esportata da Adobe illustrator. Come puoi
vedere, essa contiene molti metadati, quali informazioni sul layer, commenti e
namespace XML, spesso non necessari per il rendering della risorsa nel browser.
Di conseguenza, è sempre buona norma minimizzare i file SVG con uno strumento
come [svgo](https://github.com/svg/svgo){: .external }.

Nel caso illustrato, svgo riduce le dimensioni del file SVG generato con
Illustrator del 58%, portandolo da 470 a 199 byte. Inoltre, dato che SVG è un
formato basato su XML, possiamo applicare anche una compressione GZIP per
ridurne le dimensioni per il trasferimento - assicurati che il server sia
configurato per comprimere risorse SVG!


## Ottimizzazione di immagini raster

### TL;DR {: .hide-from-toc }
-  Un'immagine raster è costituita da una griglia di pixel
-  Ogni pixel contiene informazioni sul colore e la trasparenza
-  I compressori di immagini si avvalgono di diverse tecniche per ridurre il
   numero di bit necessari per pixel, riducendo quindi le dimensioni del file
   immagine


Un'immagine raster consiste semplicemente in una griglia bidimensionale di
singoli 'pixel'; ad es., un'immagine di 100x100 pixel è una sequenza di
10.000 pixel. Ogni pixel contiene a sua volta i valori
"[RGBA](http://en.wikipedia.org/wiki/RGBA_color_space)": (R) canale rosso (red
channel), (G) canale verde (green channel), (B) canale blu (blue channel e (A)
canale alfa (della trasparenza - alpha channel).

Internamente, il browser attribuisce 256 valori (colori) a ogni canale, che si
traducono in 8 bit per canale (2 ^ 8 = 256) e 4 byte per pixel (4 canali x 8 bit
= 32 bit = 4 byte). Di conseguenza, conoscendo le dimensioni della griglia,
possiamo facilmente calcolare le dimensioni del file.

* Un'immagine di 100 x 100px è composta da 10.000 pixel
* 10.000 pixel x 4 byte = 40.000 byte
* 40.000 byte / 1024 = 39 KB


Note: Oltre a ciò, indipendentemente dal formato immagine utilizzato per il
trasferimento dei dati dal server al client, quando l'immagine viene
decodificata dal browser, ogni pixel occupa sempre 4 byte di memoria. Ciò può
rappresentare un limite notevole per le immagini di grandi dimensioni e i
dispositivi che non dispongono di memoria sufficiente, come ad esempio i
dispositivi mobili entry level.

<table>
<thead>
  <tr>
    <th>Dimensioni</th>
    <th>Pixel</th>
    <th>Dimensioni file</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="dimensions">100 x 100</td>
  <td data-th="pixels">10,000</td>
  <td data-th="file size">39 KB</td>
</tr>
<tr>
  <td data-th="dimensions">200 x 200</td>
  <td data-th="pixels">40,000</td>
  <td data-th="file size">156 KB</td>
</tr>
<tr>
  <td data-th="dimensions">300 x 300</td>
  <td data-th="pixels">90.000</td>
  <td data-th="file size">351 KB</td>
</tr>
<tr>
  <td data-th="dimensions">500 x 500</td>
  <td data-th="pixels">250.000</td>
  <td data-th="file size">977 KB</td>
</tr>
<tr>
  <td data-th="dimensions">800 x 800</td>
  <td data-th="pixels">640.000</td>
  <td data-th="file size">2500 KB</td>
</tr>
</tbody>
</table>

39 KB per un'immagine di 100x100 pixel possono non sembrare molti, ma le
dimensioni del file aumentano rapidamente per immagini più grandi, rendendo tali
risorse sia lente che costose da scaricare. Per fortuna, quello che abbiamo
descritto finora è il formato immagine "non compresso". Che cosa possiamo fare
per ridurre le dimensioni del file immagine?

Una strategia semplice consiste nel ridurre la profondità di bit ("bit depth")
dell'immagine da 8 bit per canale a una palette di colori inferiore: 8 bit per
canale significa 256 valori per canale, per un totale di 16.777.216 (2563)
colori. Che cosa succederebbe se riducessimo la palette a 256 colori? Avremmo
bisogno di soli 8 bit totali per i canali RGB, risparmiando immediatamente due
byte per pixel, ovvero con un risparmio di compressione del 50% rispetto ai 4
byte per pixel originali!

<img src="images/artifacts.png" alt="Artefatti di compressione">

Note: Da sinistra a destra (PNG): 32-bit (16M di colori), 7-bit (128 colori),
5-bit (32 colori). Immagini complesse con transizioni di colore graduali
(gradienti, cielo, ecc... ) richiedono palette di colori più ampie per evitare
artefatti visivi come l'effetto pixel del cielo nella visualizzazione a 5 bit.
Al contrario, se l'immagine utilizza soltanto alcuni colori, una palette ampia
spreca soltanto bit preziosi!

Una volta ottimizzati i dati memorizzati nei singoli pixel, possiamo farci
ancora più furbi e osservare anche i pixel vicini: scopriremo così che molte
immagini, in particolare le foto, hanno molti pixel vicini con colori simili, ad
esempio per il cielo, per trame ripetitive, e così via. Utilizzando queste
informazioni a nostro vantaggio, il compressore può applicare una "[codifica
delta](http://en.wikipedia.org/wiki/Delta_encoding)", grazie alla quale, invece
di immagazzinare i singoli valori per ogni pixel, possiamo immagazzinare la
differenza tra pixel vicini: se i pixel adiacenti sono uguali, delta sarà
'zero', e dovremo immagazzinare un solo bit! Ma perché fermarsi qui?

L'occhio umano ha diversi livelli di sensibilità a colori diversi: possiamo
ottimizzare i nostri colori tenendo conto di ciò e riducendo o aumentando la
relativa palette.
I pixel 'adiacenti' formano una griglia bidimensionale, il che significa che
ogni pixel ha più vicini: questo ci consente di migliorare ulteriormente la
codifica delta.
Invece di guardare soltanto ai vicini diretti di ogni pixel, possiamo
considerare interi blocchi di pixel vicini e codificare blocchi diversi con
impostazioni diverse. E così via...

Come vedi, l'ottimizzazione delle immagini si fa rapidamente complessa (o
divertente, a seconda della tua prospettiva) e rappresenta un'area attiva di
ricerca accademica e commerciale. Le immagini occupano molti byte e si può
ottenere molto sviluppando tecniche di compressione migliori! Se sei curioso di
saperne di più, visita la [pagina
Wikipedia](http://en.wikipedia.org/wiki/Image_compression) o consulta il
[WebP compression techniques whitepaper](/speed/webp/docs/compression) per un 
esempio pratico.

In conclusione, ci troviamo di nuovo davanti ad argomenti molto interessanti ma
prettamente accademici: in che modo tutto ciò può aiutarci ad ottimizzare le
immagini sulle nostre pagine? Non siamo certamente in grado di poter inventare
nuove tecniche di compressione, ma è importante capire le dimensioni del
problema: pixel RGBA, profondità di bit e diverse tecniche di ottimizzazione.
Tali concetti sono tutti fondamentali da comprendere e tenere a mente prima di
discutere dei diversi formati di immagni raster.


## Compressione delle immagini lossless vs lossy

### TL;DR {: .hide-from-toc }
-  In base al funzionamento della nostra vista, le immagini sono perfette per la
   compressione lossy
-  L'ottimizzazione delle immagini è una funzione di compressione lossy e 
   lossless
-  Le differenze tra i diversi formati immagine sono dovute alle diverse
   modalità e tipologie di algoritmi lossy e lossless utilizzati per
   l'ottimizzazione
-  Non esiste un formato o un "quality setting" migliore in assoluto per tutte
   le immagini: ogni combinazione tra compressore e immagini produce un
   risultato unico


Per alcuni tipi di dati, quali il codice sorgente di una pagina o un file
eseguibile, è fondamentale che un compressore non alteri né perda alcuna
informazione originale: un singolo bit di dati mancante o sbagliato può
modificare completamente il contenuto del file o, ancora peggio, corromperlo
irrimediabilmente. Per alcuni altri tipi di dati, quali immagini, audio e video,
può essere assolutamente sufficiente fornire una rappresentazione
"approssimativa" dei dati originali.

Di fatto, per la modalità di funzionamento della vista, spesso possiamo
cavarcela eliminando alcune informazioni su ogni pixel per poter ridurre le
dimensioni file di un'immagine; ad es., i nostri occhi hanno una sensibilità
diversa ai diversi colori, per cui possiamo utilizzare meno bit per codificarne
alcuni. Di conseguenza, una tipica pipeline di ottimizzazione delle immagini è
composta da due fasi:

1. L'immagine viene elaborata con un filtro
   "[lossy](http://en.wikipedia.org/wiki/Lossy_compression)" che elimina alcuni
   dati dei pixel
1. L'immagine viene elaborata con un filtro 
   "[lossless](http://en.wikipedia.org/wiki/Lossless_compression)" che comprime
   i dati dei pixel

**La prima fase è facoltativa, e l'algoritmo esatto dipende dal particolare
formato immagine, ma è importante capire che qualsiasi immagine può essere
sottoposta a compressione lossy per ridurne le dimensioni.** Di fatto, la
differenza tra i diversi formati immagine, quali GIF, PNG, JPEG e altri, risiede
nella combinazione degli algoritmi specifici che utilizzano (o omettono)
nell'applicazione delle fasi lossy e lossless.

Dunque, qual è la configurazione 'ottimale' dell'ottimizzazione lossy e
lossless? La risposta dipende dal contenuto dell'immagine e dai tuoi stessi
criteri, quale il rapporto tra dimensioni del file e artefatti introdotti dalla
compressione lossy: in alcuni casi, è possibile che tu preferisca saltare
l'ottimizzazione lossy per comunicare ogni dettaglio in modo fedele, mentre in
altri potrai applicare un'ottimizzazione lossy incisiva per ridurre le
dimensioni del file immagine. Dipende tutto dal tuo giudizio e dal contesto; non
esiste una regola universale.

<img src="images/save-for-web.png" class="attempt-right" alt="Salvataggio per il
web">

Per dare un esempio pratico, quando si utilizza un formato lossy come il JPEG,
il compressore di norma offre un'impostazione 'qualità' personalizzabile (ad
es. lo slider Qualità offerto dalla funzione 'Save for Web' in Adobe Photoshop),
che di norma è un numero compreso tra 1 e 100 che controlla il funzionamento
interno dell'insieme specifico di algoritmi lossy e lossless. Per un risultato
migliore, prova a testare diverse impostazioni di qualità sulle tue immagini, e
non temere di diminuirla: i risultati visivi sono spesso ottimi e le dimensioni
del file possono ridursi notevolmente.

Note: Nota che la qualità dei diversi formati immagine non è direttamente
paragonabile per via delle differenze presenti tra gli algoritmi utilizzati per
la codificazione delle immagini: una qualità 90 JPEG produrrà un risultato molto
diverso da una qualità 90 WebP. Di fatto, persino i livelli di qualità relativi
al medesimo formato immagine possono produrre risultati visibilmente diversi in
base al compressore utilizzato.


## Selezione del formato immagine corretto

### TL;DR {: .hide-from-toc }
-  Selezione iniziale del formato universale corretto: GIF, PNG, JPEG'
-  Test e selezione delle impostazioni idonee per ogni formato: qualità,
   dimensioni palette, ecc...'
-  Eventuale aggiunta di risorse WebP e JPEG XR per le immagini scalate per i
   client attuali


Oltre ai vari algoritmi di compressione lossy e lossless, formati immagine
diversi supportano funzioni diverse, quali i canali di animazione e trasparenza
(alfa). Di conseguenza, la scelta del 'formato giusto' per una data immagine
risulta dalla combinazione tra i risultati visivi e i requisiti funzionali
desiderati.


<table>
<thead>
  <tr>
    <th>Formato</th>
    <th>Trasparenza</th>
    <th>Animazione</th>
    <th>Browser</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparency">Sì</td>
  <td data-th="animation">Sì</td>
  <td data-th="browser">Tutti</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparency">Sì</td>
  <td data-th="animation">No</td>
  <td data-th="browser">Tutti</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="transparency">No</td>
  <td data-th="animation">No</td>
  <td data-th="browser">Tutti</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparency">Sì</td>
  <td data-th="animation">Sì</td>
  <td data-th="browser">IE</td>
</tr>
<tr>
  <td data-th="format"><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparency">Sì</td>
  <td data-th="animation">Sì</td>
  <td data-th="browser">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

I formati immagine supportati universalmente sono tre: GIF, PNG e JPEG. Oltre a
questi, alcuni browser supportano anche formati più recenti, come WebP e JPEG
XR, che offrono una compressione complessivamente migliore e ulteriori funzioni.
Dunque, quale formato dovremmo utilizzare?

<img src="images/format-tree.png" class="center" alt="Salvataggio per il web">

1. **Hai bisogno dell'animazione? In caso affermativo, il formato GIF è l'unica
  scelta universale.**
  * Il formato GIF limita la palette di colori a 256 al massimo, rendendola una
  scelta insufficiente per la maggior parte delle immagini. Inoltre, PNG-8 offre
  una compressione migliori per immagini con una palette ridotta. Di
  conseguenza, il formato GIF è la risposta giusta solo quando è necessaria
  l'animazione.
1. **Hai necessità di preservare ogni minimo dettaglio alla risoluzione
  maggiore? Utilizza il formato PNG.**
  * Il formato PNG non applica alcun algoritmo di compressione lossy oltre alla
  scelta delle dimensioni della palette di colori. Di conseguenza, produce
  un'immagine di altissima qualità, ma con dimensioni file di gran lunga
  superiori rispetto ad altri formati. utilizzalo con giudizio.
  * Se la risorsa contiene immagini composte da forme geometriche, valuta la
  possibilità di convertirla in formato vettoriale (SVG)!
  * Se l'immagine contiene del testo, fermati a riflettere. Il testo in immagini
  non è selezionabile, ricercabile né 'ingrandibile'. Se devi riprodurre un
  elemento personalizzato (ad esempio per motivi di branding o altro), utilizza
  invece un font web.
1. **Stai ottimizzando una foto, uno screenshot o una risorsa simile? Utilizza
  il formato JPEG.**
  * Il formato JPEG si avvale di una combinazione tra ottimizzazione lossy e
  lossless per ridurre le dimensioni del file immagine. Prova diversi livelli di
  qualità JPEG per trovare il miglior compromesso tra qualità e dimensioni file
  per la risorsa.

Infine, una volta stabilito il formato immagine ottimale e le relative
impostazioni per ogni risorsa, valuta se aggiungere un'ulteriore variante
codificata in WebP e JPEG XR. Entrambi i formati sono nuovi e, sfortunatamente,
non sono (ancora) universalmente supportati da tutti i browser, ma possono
comunque offrire risparmi non indifferenti ai nuovi client; ad esempio, in media
WebP offre una
[diminuzione del 30% delle dimensioni file] (/speed/webp/docs/webp_study)
rispetto a un'immagine JPEG analoga.

Poiché né il WebP, né il JPEG XR sono universalmente supportati, dovrai
aggiungere ulteriori operazioni logiche alla tua applicazione o ai tuoi server
per fornire la risorsa corretta:

*  Alcuni CDN offrono un servizio di ottimizzazione delle immagini, incluso il
   salvataggio come JPEG XR e WebP.
*  Alcuni strumenti open-source (ad es. PageSpeed per Apache o Nginx)
   automatizzano ottimizzazione, conversione e fornitura di risorse idonee.
*  Puoi aggiungere ulteriori operazioni logiche per individuare il client,
   verificare i formati supportati e fornire il miglior formato immagine
   disponibile.

Ricorda infine che, se stai utilizzando una Webview per il rendering dei
contenuti nella tua applicazione nativa, allora hai il pieno controllo del
client e puoi utilizzare esclusivamente WebP! Facebook, Google+ e molti altri
utilizzano il formato WebP per tutte le immagini contenute nelle proprie
applicazioni; i risparmi rendono la scelta decisamente conveniente. Per saperne
di più sul formato WebP, guarda la presentazione
[WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE)
di Google I/O 2013.


## Regolazione di parametri e strumenti

Non esiste un formato immagine, uno strumento o un insieme di parametri di
ottimizzazione perfetto, applicabile a qualunque immagine. Per ottenere
risultati migliori, dovrai scegliere il formato e le relative impostazioni in
base ai contenuti dell'immagine, nonché ai relativi requisiti visivi e tecnici.

<table>
<thead>
  <tr>
    <th>Strumento</th>
    <th>Descrizione</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="tool"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="description">create and optimize GIF images</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="description">optimize JPEG images</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="description">lossless PNG optimization</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="description">lossy PNG optimization</td>
</tr>
</tbody>
</table>


Non avere timore di sperimentare diversi parametri per ogni compressore. Riduci
la qualità, guarda il risultato, quindi annulla e ripeti. Una volta trovato un
insieme di impostazioni idoneo, potrai applicarlo ad altre immagini simili sul
tuo sito, ma non dare per scontato che tutte le immagini debbano essere
compresse con le medesime impostazioni.


## Utilizzo di immagini scalate

### TL;DR {: .hide-from-toc }
- L'utilizzo di immagini scalate rappresenta una delle modalità di
  ottimizzazione più semplice ed efficace
- Fai molta attenzione alle risorse consistenti, che possono comportare costi
  elevati
- Riduci il numero di pixel non necessari scalando le immagini in base alle
  dimensioni del display


L'ottimizzazione delle immagini si basa su due criteri: ottimizzare il numero di
byte utilizzato per codificare ogni pixel e ottimizzare il numero totale di
pixel: le dimensioni del file immagine risultano semplicemente dal numero di
pixel totali moltiplicato per il numero di byte utilizzati per codificare ogni
pixel. Né più, né meno.

Di conseguenza, una delle tecniche di ottimizzazione delle immagini più semplice
ed efficace consiste nell'assicurarsi di non utilizzare più pixel di quelli
necessari per visualizzare la risorsa alle dimensioni desiderate sul browser.
Semplice, vero? Sfortunatamente, la maggior parte delle pagine non passa il test
per molte delle immagini in esse contenute: di norma, le risorse sono troppo
grosse e si affidano allo scaling del browser, che consuma anche risorse CPU
extra, visualizzandole con una risoluzione inferiore.

<img src="images/resized-image.png" class="center" alt="Immagine ridimensionata">

Note: Scorrendo il mouse sull'immagine in Chrome DevTools, verranno visualizzate
le dimensioni sia 'natural' che 'display' dell'immagine. Nell'esempio
precedente, l'immagine da 300x260 pixel viene scaricata per poi essere tuttavia
downscaled (ridotta) sul client alla visualizzazione.

L'utilizzo di pixel non necessari solo per lasciare al browser lo scaling
dell'immagine al posto nostro si traduce in un'enorme opportunità mancata di
ridurre e ottimizzare il numero di byte totali richiesti per il rendering della
pagina. Nota inoltre che il ridimensionamento non interessa solo il numero di
pixel di cui l'immagine viene ridotta, ma anche le sue dimensioni 'natural'.

<table>
<thead>
  <tr>
    <th>Dimensioni "natural"</th>
    <th>Dimensioni "display"</th>
    <th>Pixel non necessari</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="natural">110 x 110</td>
  <td data-th="display">100 x 100</td>
  <td data-th="overhead">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="natural">410 x 410</td>
  <td data-th="display">400 x 400</td>
  <td data-th="overhead">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="natural">810 x 810</td>
  <td data-th="display">800 x 800</td>
  <td data-th="overhead">810 x 810 - 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

Nota che, in tutti e tre i casi precedenti, la dimensione display è 'più piccola
di soli 10 pixel' rispetto alla dimensione natural dell'immagine. Tuttavia, il
numero di pixel extra che dovremmo codificare e inviare è di gran lunga
superiore a quelli massimi per le dimensioni natural! Di conseguenza, mentre
potresti non riuscire a garantire che ogni singola risorsa venga visualizzata
alle dimensioni display corrette, **dovresti assicurarti che il numero di pixel
non necessari sia minimo e che le risorse più consistenti, in particolare, siano
visualizzate con dimensioni il più vicine possibile alle dimensioni display.**

## Checklist di ottimizzazione delle immagini

L'ottimizzazione delle immagini è al contempo un'arte e una scienza: è un'arte,
perché non esiste una risposta definitiva su quale sia il miglior modo di
comprimere una determinata immagine, ma è anche una scienza, perché esistono
tecniche e algoritmi in grado di ridurre significativamente le dimensioni di
un'immagine.

Alcuni suggerimenti e tecniche da tenere a mente nell'ottimizzazione di
immagini:

* **Prediligi i formati vettoriali:** le immagini vettoriali sono indipendenti
  da risoluzione e scaling e sono quindi perfette per il mondo dell'alta
  risoluzione e dei multi-device.
* **Minimizza e comprimi le risorse SVG:** Il markup XML prodotto dalla maggior
  parte dei software di progettazione contiene spesso metadati non necessari che
  possono essere rimossi; assicurati che i tuoi server siano configurati per
  applicare la compressione GZIP alle risorse SVG.
* **Scegli il formato raster migliore:** definisci i tuoi requisiti funzionali
  e seleziona quello idoneo per ogni singola risorsa.
* **Effettua dei test per trovare la qualità ottimale per i formati raster:**
  non avere timore di ridurre le impostazioni 'qualità'; i risultati sono spesso
  ottimi e i byte possono ridursi notevolmente.
* **Rimuovi i metadati delle immagini non necessari:** molte immagini raster
  contengono metadati non necessari riguardanti la risorsa: geoinformazioni,
  informazioni video, e così via. Utilizza gli strumenti idonei per rimuovere
  tali dati.
* **Utilizza immagini scalate:** ridimensiona le immagini sul server e
  assicurati che le dimensioni 'display' siano il più vicine possibile alle
  dimensioni 'natural' dell'immagine. Presta particolare attenzione alle
  immagini grandi, che comportano costi maggiori una volta ridimensionate!
* **Automatizza, automatizza, automatizza:** investi in infrastrutture e
  strumenti automatizzati, in grado di garantirti che le tue immagini siano
  sempre ottimizzate.
