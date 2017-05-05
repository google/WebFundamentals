project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Informazioni su come aggiungere in modo semplice video al tuo sito e assicurare la migliore esperienza agli utenti, su qualsiasi dispositivo.

{# wf_updated_on: 2017-05-05 #}
{# wf_published_on: 2014-04-15 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Gli utenti amano i video; possono essere divertenti e informativi. Sui 
dispositivi mobili, i video possono essere un modo più immediato per 
acquisire informazioni. Tuttavia, i video consumano larghezza di banda 
e non funzionano allo stesso modo su tutte le piattaforme. Agli utenti 
non piace attendere troppo il caricamento dei video o premere Riproduci 
senza che nulla accada. Scopri di più sul modo più semplice per 
aggiungere video al tuo sito ed assicurare la migliore esperienza agli 
utenti su qualsiasi dispositivo.


## Aggiungere un video 

### TL;DR {: .hide-from-toc }
- Utilizza elementi `video` per caricare, decodificare e riprodurre i video del tuo sito.
- Crea video in diversi formati per una vasta gamma di piattaforme mobili.
- Dimensiona i video al meglio evitando l'overflow dei relativi contenitori.
- L'accessibilità è importante: aggiungi elementi `track` figli dell'elemento `video`.


### Aggiunta di elementi video

Aggiungi l'elemento `video` per caricare, decodificare e riprodurre i video sul tuo sito.

<video controls>
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Il browser in uso non supporta l'elemento video.</p>
    </video>
    

### Specifica di diversi formati di file

Non tutti i browser supportano gli stessi formati video. L'elemento 
`<source>` consente di specificare diversi formati sostitutivi nel caso 
in cui il browser dell'utente non ne supporti qualcuno.

Ad esempio:

<pre class="prettyprint">
{% includecode 
content_path="web/fundamentals/media/_code/video-main.html" 
region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[Prova](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/media/video-main.html){: target="_blank" .external }

Quando il browser analizza i tag `<source>` utilizza l'attributo 
opzionale `type` per decidere quale file scaricare e riprodurre. Se il 
browser supporta `WebM`, riprodurrà chrome.webm. In alternativa, 
verifica la possibilità di riprodurre video MPEG-4.

Consulta [Una guida ai video digitali per Geek](//www.xiph.org/video/vid1.shtml) 
per ulteriori informazioni sulle modalità di funzionamento di audio e video sul Web.

Questo approccio offre diversi vantaggi rispetto all'utilizzo dell'HTML 
differente o dello scripting lato server, in particolare per i 
dispositivi mobili:

* Consente agli sviluppatori di elencare i formati in ordine di preferenza.
* La selezione nativa lato client riduce la latenza; una sola richiesta 
per il recupero del contenuto.
* Lasciare al browser la scelta del formato è più semplice, veloce e 
potenzialmente più affidabile rispetto all'utilizzo di un database di 
supporto dal lato server con rilevamento dell'user-agent.
* Indicando ciascun tipo di file di origine migliora il rendimento di 
rete; il browser più selezionare una sorgente video senza dover 
scaricare parte dello video per lo sniffing del formato.
* È possibile ottimizzare il rendimento di rete indicando ciascun tipo 
di origine del file: il browser individua l'origine del video senza 
scaricare parte dello video per lo "sniff" del formato.

Tutte queste considerazioni sono importanti nel contesto mobile, dove 
larghezza di banda e latenza sono un bene premium mentre la pazienza 
degli utenti è limitata. Il mancato inserimento di un attributo di tipo 
riduce il rendimento in presenza di origini multiple con tipi non supportati.

Usando gli strumenti di sviluppo del browser del dispositivo mobile, confronta l'attività di rete <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">con gli attributi di tipo </a> e <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">senza attributi di tipo</a>.
Controlla anche le intestazioni della risposta usando gli strumenti di sviluppo del tuo browser per [verificare che il server restituisca il corretto tipo MIME] (//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). In caso contrario, i controlli del tipo dell'origine video non funzioneranno.

### Specifica tempi di inizio e fine

Risparmia larghezza di banda ed ottimizza la reattività del sito usando 
API Media Fragments aggiungendo i tempi di inizio e fine all'elemento 
video.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per aggiungere un 'media fragment', è sufficiente inserire 
`#t=[start_time][,end_time]` all'URL del contenuto multimediale. Ad 
esempio, per riprodurre un video dal secondo 5 fino al 10 specificare:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Inoltre, è possibile utilizzare API Media Fragments per creare diverse 
visualizzazioni dello stesso video&ndash;come i cue point di un 
DVD&ndash;senza codificare e distribuire diversi file.


Caution: Molte piattaforme tranne iOS supportano API Media Fragments.
Assicurati che il tuo server supporti le Range Requests. Per 
impostazione predefinita la maggiore parte parte dei server
Le range request vengono attivate per impostazione predefinita su gran 
parte dei server, ma molti servizi di hosting potrebbero averli 
disattivati.

Usando gli strumenti di sviluppo del tuo browser, controlla la presenza 
di `Accept-Ranges: bytes` nelle intestazioni della risposta:

<img class="center" alt="Schermata degli strumenti di sviluppo di Chrome: Accept-Ranges: bytes"
src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Inserimento di un'immagine poster

Aggiungi un attributo poster all'elemento `video` così i tuoi utenti 
avreanno un'indicazione dei contenuti non appena si caricherà l'elemento, 
senza scaricare il video o avviarne la riproduzione.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Un poster può essere un sostituto nel caso in cui il video `src` sia 
danneggiato oppure nessuno dei formati video forniti via supportato.
L'unico svantaggio legato all'utilizzo delle immagini poster è che si 
tratta di un'ulteriore richiesta di file, che consuma larghezza di banda 
e richiede un rendering.
Per ulteriori informazioni consulta [Ottimizzazione delle immagini](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization).

Segue un confronto fianco a fianco dei video con e senza immagine 
poster&ndash;abbiamo realizzato l'immagine poster in  bianco e nero per 
dimostrare che non si tratta del video:

<div class="attempt-left">
  <figure>
    <img alt="Schermata di Chrome per Android, verticale: senza poster"
    src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Schermata Android Chrome, verticale: senza poster
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Schermata di Chrome per Android, verticale: con poster"
    src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Schermata Android Chrome, verticale: con poster
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


## Fornire alternative per piattaforme legacy

Non tutti i formati video sono supportati su tutte le piattaforme. 
Verifica quali formati sono supportati dalle principali piattaforme ed 
assicurati che il tuo video funzioni su ciascuna di esse.


### Verifica i formati supportati {: #check-formats }

Utilizza `canPlayType()` per trovare quali formati video sono supportati. 
Il metodo accetta un argomento stringa `mime-type` e un codec facoltativo 
e restituisce uno dei seguenti valori:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Valore restituito e Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(stringa vuota)</td>
      <td data-th="Description">Contenitore e/o codec non supportato.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        Contenitore e codec potrebbero essere supportati, ma il browser
        richiede una verifica tramite il download di alcuni video.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">Il formato sembra essere supportato.
      </td>
    </tr>
  </tbody>
</table>

Di seguito sono riportati alcuni esempi di `canPlayType()` con i relativi 
argomenti e valori restituiti tramite l'utilizzo di Chrome:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Tipo e Risposta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">(stringa vuota)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">(stringa vuota)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">(stringa vuota)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Crea video in più formati

Esistono diversi strumenti che consentono di salvare lo stesso video in 
formati diversi:

* Strumenti desktop: [FFmpeg](//ffmpeg.org/)
* Applicazioni GUI: [Miro](//www.mirovideoconverter.com/), 
[HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Servizi di codifica/transcodifica online: 
[Zencoder](//en.wikipedia.org/wiki/Zencoder), 
[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Verifica il formato utilizzato

Desideri conoscere il formato video attualmente selezionato dal browser?

In JavaScript, utilizza la proprietà `currentSrc` del video che ritorna 
la sorgente utilizzata.

Per un esempio pratico, dai un'occhiata <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">alla demo</a>: per Chrome e Firefox scegli `chrome.webm` (è infatti la prima nell'elenco delle fonti potenziali supportate da questi browser), per Safari invece scegli `chrome.mp4`.


## Dimensionamento corretto dei video 


Per ottenere un prodotto che piaccia agli utenti, le dimensioni del file 
sono importanti.


### TL;DR {: .hide-from-toc }
- Non servire video con una dimensione maggiore del frame o di una 
qualità superiore rispetto gestibile dalla piattaforma.
- Non realizzare video più lunghi di quanto non sia necessario.
- I video lunghi causano download e seeking a singhiozzo; Alcuni browser 
potrebbero dover attendere il download del video prima di iniziare la 
riproduzione.


### Verifica le dimensioni del video

Le dimensioni effettive del video codificato potrebbero non 
corrispondere alle dimensioni dell'elemento video (come nel caso di 
un'immagine che non può essere visualizzata utilizzando le sue 
dimensioni reali).

Per verificare le dimensioni di un video codificato, utilizza le 
proprietà dell'elemento video: `videoWidth` e `videoHeight`. Le 
proprietà `width` e `height` restituiscono le dimensioni dell'elemento 
video, che potrebbero essere state dimensionate utilizzando CSS o gli 
attributi larghezza e altezza inline.

### Assicurati che i video non siano più grandi dei contenitori

Quando gli elementi video sono troppo grandi per il viewport, possono 
eccedere dai rispettivi contenitori, impedendo la visualizzazione oppure 
l'utilizzo dei controlli da parte degli utenti.

<div class="attempt-left">
  <figure>
    <img alt="Screenshot verticale di Android Chrome: l'elemento video 
    senza stile supera il viewport" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Screenshot verticale di Android Chrome: l'elemento video senza 
      stile supera il viewport
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Screenshot orizzontale di Android Chrome: l'elemento video 
    senza stile supera il viewport" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Screenshot orizzontale di Android Chrome: l'elemento video senza 
      stile supera il viewport
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Puoi controllare le dimensioni del video con JavaScript o CSS. Le 
librerie ed i plugin di JavaScript, come [FitVids](//fitvidsjs.com/), 
consentono di rispettare le dimensioni e le proporzioni corrette, anche 
nel caso dei video Flash di YouTube e di altre fonti.

Utilizza [CSS media queries](/web/fundamentals/design-and-ui/responsive/#css-media-queries) 
per specificare la dimensione degli elementi in base alle dimensioni del 
viewport; `max-width: 100%` è ideale.

Per contenuti multimediali in iframes (come i video di YouTube), opta 
per un approccio responsive (come quello [proposto da John Surdakowski](http://avexdesigns.com/responsive-youtube-embed/)).


Caution: Non forzare il ridimensionamento dell'elemento, poiché 
potresti alterarne le proporzioni rispetto al video originale. Un video 
appiattito o allungato è sgradevole.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

Confronta l'<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">esempio reattivo</a> con <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">con la versione non reattiva</a>.


## Personalizzazione del riproduttore multimediale 

Contronta [esempio responsive ](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/media/responsive_embed.html)
con l'[esempio non responsive](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/media/unyt.html).


## Personalizzazione del riproduttore multimediale 

Ciascuna piattaforma visualizza i video in modo diverso. Le soluzioni per 
dispositivi mobili devono valutare anche l'orientamento del dispositivo. 
Utilizza l'API Fullscreen per il controllo della visualizzazione a 
schermo intero dei contenuti video.


### Modalità di funzionamento dell'orientamento su diversi dispositivi

L'orientamento del dispositivo non è un problema per i PC desktop o 
portatili, ma è importante per la progettazione delle pagine web per 
dispositivi mobili e tablet.

Safari per iPhone commuta in maniera eccellente l'orientamento verticale 
e orizzontale:

<div class="attempt-left">
  <figure>
    <img  alt="Schermata di un video riprodotto da Safari per iPhone, in verticale"
    src="images/iPhone-video-playing-portrait.png">
    <figcaption>Schermata di un video riprodotto da Safari per iPhone, in verticale</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Schermata di un video riprodotto da Safari per iPhone, in orizzontale"
    src="images/iPhone-video-playing-landscape.png">
    <figcaption>Schermata di un video riprodotto da Safari per iPhone, in orizzontale</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

L'orientamento del dispositivo su iPad e Chrome per Android può 
diventare un problema.
Ad esempio, senza alcuna personalizzazione la riproduzione di un video 
su un iPad con orientamento orizzontale  produce quanto segue:

<img alt="Schermata di un video riprodotto con Safari per iPad Retina, in orizzontale"
src="images/iPad-Retina-landscape-video-playing.png">

Impostando `width: 100%` o `max-witdh: 100%` sul video usando i CSS è 
possibile risolvere diversi problemi della disposizione dell'orientamento 
del dispositivo. È possibile anche prendere in considerazione alternative 
a schermo intero.

### Visualizzazione inline o a schermo intero

<img class="attempt-right" alt="Schermata di un elemento video su iPhone, in verticale"
src="images/iPhone-video-with-poster.png">

Le diverse piattaforme visualizzano i video in modo diverso. Safari per iPhone visualizza un elemento video inline in una pagina web, ma il video viene riprodotto in modalità a schermo intero:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Schermata di un video riprodotto in Chrome su Android, in verticale" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Su Android, è possibile attivare la modalità a schermo intero facendo clic sulla relativa icona. Tuttavia, l'impostazione predefinita prevede la riproduzione inline del video:

<div style="clear:both;"></div>

<img class="attempt-right" alt="Schermata di un video riprodotto in Safari su iPad Retina, in verticale" src="images/iPad-Retina-landscape-video-playing.png">

Safari per iPad prevede la riproduzione inline del video:

<div style="clear:both;"></div>

### Controllo della visualizzazione a schermo intero dei contenuti

Per le piattaforme che non forzano la riproduzione video a schermo intero 
l'API Fullscreen è [ampiamente supportata](//caniuse.com/fullscreen). 
Utilizza l'API per il controllo della visualizzazione a schermo intero 
dei contenuti o della pagina.

Per visualizzare un elemento a schermo intero come un video:

    elem.requestFullScreen();
    

Per visualizzare a schermo intero un documento intero:

    document.body.requestFullScreen();
    

Inoltre, puoi metterti in ascolto dei cambiamenti di stato della 
visualizzazione a schermo intero:

    video.addEventListener("fullscreenchange", handler);
    

In alternativa, verifica che l'elemento sia in modalità a schermo intero:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Inoltre, è possibile utilizzare la pseudo classe `:fullscreen` CSS per 
modificare la modalità di visualizzazione a schermo intero degli elementi.

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per visionare l'esecuzione dell'operazione, consulta <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">demo</a>.

Per visionarlo in azione, consulta la [demo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/media/fullscreen.html).

Dogfood: `requestFullScreen()` può richiedere un prefisso a seconda del 
fornitore e può richiedere del codice extra per garantire una piena 
compatibilità cross browser.

<div style="clear:both;"></div>




## L'importanza dell'accessibilità 

L'accessibilità non è una funzionalità. Gli utenti audiolesi o 
ipovedenti non possono guardare un video senza didascalie o descrizioni. 
Il tempo necessario per aggiungere queste caratteristiche ai tuoi video 
è molto inferiore della scarsa esperienza utente che fornirai. Consenti 
almeno l'esperienza base a tutti gli utenti.


### Inserimento delle didascalie per una maggiore accessibilità

<img class="attempt-right" alt="Schermata con didascalie visualizzate 
con l'elemento track in Chrome per Android" 
src="images/Chrome-Android-track-landscape-5x3.jpg">

Per aumentare l'accessibilità degli elementi multimediali sui 
dispositivi mobili, inserisci didascalie o descrizioni mediante 
l'elemento track.

<div style="clear:both;"></div>

### Aggiungere un elemento track

È molto semplice aggiungere didascalie ai tuoi video&ndash;semplicemente 
aggiungi un elemento track come figlio dell'elemento video.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[Prova](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/media/track.html)

L'attributo track dell'elemento `src` indica la posizione del file track.

### Inserire didascalie nel file track

Un file track è costituito da indicatori "cue" temporizzati in formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Uomo seduto sul ramo di un albero che utilizza un portatile.

    00:05.000 --> 00:08.000
    Ramo che si spezza facendo cadere l'uomo.

    ...

Dogfood: L'elemento track è supportato in Chrome per Android, iOS Safari, 
e tutti i browser per desktop ad eccezione di Firefox (si veda
[caniuse.com/track](http://caniuse.com/track)).
Ci sono molti polyfill disponibili. Raccomandiamo
[Captionator](http://captionatorjs.com/).




## Consultazione rapida 

### Attributi dell'elemento video

Per l'elenco completo degli attributi dell'elemento video e delle 
relative definizioni, si veda [le specifiche dell'elemento video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
  <thead>
      <th>Attributo</th>
      <th>Disponibilità</th>
      <th>Descrizione</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">Tutti i browser</td>
      <td data-th="Description">Indirizzo (URL) del video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">Tutti i browser</td>
      <td data-th="Description">Indirizzo (URL) di un file di immagine 
      mostrato dal browser quando l'elemento video viene visualizzato 
      senza che il relativo contenuto venga scaricato.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">Tutti i browser per dispositivi mobili 
      ignorano il precaricamento.</td>
      <td data-th="Description">Indica al browser l'utilità di 
      precaricare i metadati (o i video) prima dell'effettiva 
      riproduzione. Le opzioni sono: nessuno, metadati o auto (vedi la 
      sezione relativa al <a href="#preload">Precaricamento</a> per ulteriori dettagli). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">Non supportato da iPhone o Android; 
      supportato da tutti i browser desktop, iPad, Firefox e Opera per 
      Android.</td>
      <td data-th="Description">Avvia il download e la riproduzione il 
      prima possibile (vedi la sezione relativa 
      all'<a href="#autoplay">Autoplay</a>).</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">Tutti i browser</td>
      <td data-th="Description">Esegui il loop del video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">Tutti i browser</td>
      <td data-th="Description">Mostra i controlli video predefiniti 
      (riproduci, pausa, ecc.)</td>
    </tr>
  </tbody>
</table>

#### Autoplay {: #autoplay }

Sul desktop, `autoplay` indica al browser di iniziare immediatamente, 
appena possibile, il download e la riproduzione del video. `autoplay` 
non funziona su iOS e Chrome per Android; gli utenti devono toccare lo 
schermo per riprodurre il video.

Anche su piattaforme dove l'opzione autoplay è possibile, devi valutare 
attentamente se attivarla:

* L'utilizzo dei dati può essere costoso.
* A causa del download di contenuti multimediali senza richiesta, la 
larghezza di banda viene ridotta inaspettatamente, la CPU viene occupata 
e viene quindi ritardato il rendering della pagina.
* Gli utenti possono trovarsi in un contesto in cui la riproduzione di 
video o audio è inopportuna.

Il funzionamento dell'opzione autoplay può essere configurato in Android 
WebView attraverso [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
L'impostazione predefinita è true, ma una app WebView hai la possibilità 
di disabilitarla.

#### Precaricamento {: #preload }

L'attributo `preload` suggerisce al browser il quantitativo di 
informazioni o contenuti da precaricare.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Valore e Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">L'utente può anche decidere di non 
      vedere il video e di non precaricare nulla</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">I metadati (durata, dimensioni, 
      tracce di testo) dovrebbero essere precaricati, ma con video di 
      dimensioni ridotte.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">È opportuno eseguire direttamente il 
      download dell'intero video.</td>
    </tr>
  </tbody>
</table>

L'attributo `preload` ha effetti diversi sulle varie piattaforme.
Ad esempio, mentre sui computer desktop Chrome esegue il buffering di 
25 secondi di video, ciò non avviene in iOS o Android. Ciò significa 
che, a differenza dei computer desktop, sui dispositivi mobili 
potrebbero esserci ritardi nell'avvio della riproduzione. Per tutti i 
dettagli, si veda la [pagina di prova di Steve Souders](//stevesouders.com/tests/mediaevents.php).

### JavaScript

[L'articolo su HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) è un ottimo riepilogo sulle proprietà, sui metodi e sugli eventi di JavaScript 
che è possibile utilizzare per controllare la riproduzione di video. Gli 
stessi contenuti sono riportati di seguito e aggiornati nei casi in cui 
si riferiscano ai dispositivi mobili.

#### Proprietà

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Property &amp; Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">Accedi o imposta la posizione di 
      riproduzione in secondi.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Accedi o imposta il volume attuale per 
      il video.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Accedi o imposta l'audio muto.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Accedi o imposta la velocità di 
      riproduzione; 1 è la velocità di riproduzione normale.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Informazioni su quanto contenuto del 
      video è stato sottoposto a buffering e può essere riprodotto.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">L'indirizzo del video in riproduzione.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">Larghezza del video in pixel (potrebbe 
      essere diversa da quella dell'elemento video).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">Altezza del video in pixel (potrebbe 
      essere diversa da quella dell'elemento video).</td>
    </tr>
  </tbody>
</table>

I dispositivi mobili non supportano `playbackRate` né `volume` ([vedi  demo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html)).

#### Metodi

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">Metodo e Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">Carica o ricarica una fonte video senza 
      avviare la riproduzione: ad esempio, quando il video src viene 
      modificato utilizzando JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Riproduzione del video dalla posizione 
      attuale.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Pausa del video nella posizione 
      attuale.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Trova i formati riproducibili (vedi 
      <a href="#check-formats">Verifica i formati supportati</a>).</td>
    </tr>
  </tbody>
</table>

Sui dispositivi mobili (eccetto Opera su Android), i metodi play() e pause() non funzionano a meno che
siano attivati dall'utente, ad esempio facendo clic su un pulsante; vedi <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">demo</a>. (allo stesso modo, non è possibile avviare la riproduzione di contenuti come i video incorporati di YouTube).

#### Eventi

Esiste un unico sottoinsieme di eventi multimediali che può essere 
attivato. Per un elenco completo, fai riferimento alla pagina [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) di 
Mozilla Developer Network.

<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">Evento e Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">Attivato non appena ci sono sufficienti 
      dati disponibili, necessari al browser per riprodurre l'intero 
      video senza interruzioni.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Attivato quando termina la riproduzione 
      del video.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Attivato quando si verifica un errore.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Attivato durante la prima riproduzione 
      del video, dopo una pausa o al riavvio.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Attivato periodicamente per indicare lo 
      stato del download.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Attivato quando un'azione viene 
      ritardata in attesa del completamento di un'altra azione.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Attivato quando il browser completa il 
      caricamento dei metadati per il video: durata, dimensioni e 
      track di testo.</td>
    </tr>
  </tbody>
</table>


