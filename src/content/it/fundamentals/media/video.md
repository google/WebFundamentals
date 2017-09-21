project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Informazioni su come aggiungere in modo semplice video al tuo sito e assicurare la migliore esperienza agli utenti, su qualsiasi dispositivo.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Gli utenti amano i video; possono essere divertenti e informativi. Sui dispositivi mobili, i video possono essere un modo più immediato per acquisire informazioni. Tuttavia, i video consumano larghezza di banda e non funzionano allo stesso modo su tutte le piattaforme. Agli utenti non piace attendere troppo durante il caricamento dei video o premere Riproduci senza che nulla accada. Scopri di più sul modo più semplice per aggiungere video al tuo sito e assicurare la migliore esperienza agli utenti su qualsiasi dispositivo.




## Aggiungere un video 




Scopri i modi più semplici per aggiungere video al tuo sito e offrire agli utenti un'esperienza ottimale con qualsiasi dispositivo.



### TL;DR {: .hide-from-toc }
- Utilizza elementi video per caricare, decodificare e riprodurre i video del tuo sito.
- Crea video in diversi formati per una vasta gamma di piattaforme mobili.
- Dimensiona i video al meglio evitando l'overflow dei relativi contenitori.
- L'accessibilità è importante: aggiungi gli elementi di tracciamento come elementi secondari di quelli video.


### Aggiunta di elementi video

Aggiungi elementi video per caricare, decodificare e riprodurre i video sul tuo sito.

<video controls>
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Il browser in uso non supporta l'elemento video.</p>
    </video>
    

### Specifica di diversi formati di file

Non tutti i browser supportano gli stessi formati video.
L'elemento `<source>` consente di specificare diversi formati sostitutivi nel caso in cui il browser dell'utente non supporti alcuni formati.
Ad esempio:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

Se il browser analizza i tag `<source>` utilizza l'attributo `type` opzionale per individuare il file da scaricare e riprodurre. Se il browser supporta WebM, riprodurrà chrome.webm. In alternativa, verifica la possibilità di riprodurre video MPEG-4.
Consulta <a href="//www.xiph.org/video/vid1.shtml" title="Una guida utile e divertente ai video digitali">Manuale di base per i contenuti multimediali digitali per geek</a> per ulteriori informazioni sulle modalità di funzionamento di audio e video sul Web.

Questo approccio offre diversi vantaggi rispetto all'utilizzo dell'HTML diverso o dello scripting lato server, in particolare per i dispositivi mobili:

* Consente agli sviluppatori di elencare i formati in ordine di preferenza.
* Lo switching dal lato client nativo riduce la latenza e consente di eseguire una sola richiesta per il recupero del contenuto.
* È più semplice, veloce e affidabile lasciare al browser l'individuazione del formato ideale rispetto all'utilizzo di un database di supporto dal lato server con rilevamento dell'user-agent.
* È possibile ottimizzare il rendimento di rete indicando ciascun tipo di origine del file: il browser individua l'origine del video senza scaricare parte dello video per lo sniffing del formato.

Queste considerazioni sono importanti per i dispositivi mobili, prodotti con limiti di larghezza di banda e latenza e utenti in cerca di reattività. 
Il mancato inserimento di un attributo di tipo riduce il rendimento in presenza di origini multiple con tipi non supportati.

Usando gli strumenti di sviluppo del browser del dispositivo mobile, confronta l'attività di rete <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">con gli attributi di tipo </a> e <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">senza attributi di tipo</a>.
Controlla anche le intestazioni della risposta usando gli strumenti di sviluppo del tuo browser per [verificare che il server restituisca il corretto tipo MIME] (//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). In caso contrario, i controlli del tipo dell'origine video non funzioneranno.

### Specifica di un tempo di inizio e fine

Risparmia larghezza di banda e ottimizza la reattività del sito usando l'API Media Fragments per l'aggiunta di un tempo di inizio e fine all'elemento video.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per aggiungere un 'media fragment', è sufficiente inserire `#t=[start_time][,end_time]` all'URL del contenuto multimediale. Ad esempio, per riprodurre un video dal quinto al decimo secondo specificare:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Inoltre, è possibile utilizzare l'API Media Fragments per creare diverse visualizzazioni dello stesso video (es. i cue point di un DVD) senza codificare e distribuire diversi file.

Note: - Gran parte delle piattaforme supporta l''API Media Fragments, a eccezione di iOS.
- Verifica che le range request siano supportate dal server in uso. Le range request vengono attivate per impostazione predefinita su gran parte dei server, anche se potrebbero essere assenti su alcuni servizi di hosting.


Usando gli strumenti di sviluppo del tuo browser, controlla la presenza di `Accept-Ranges: bytes` nelle intestazioni della risposta:

<img class="center" alt="Schermata degli strumenti di sviluppo di Chrome: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Inserimento di un'immagine poster

Aggiungi un attributo poster all'elemento video per fornire un'indicazione dei contenuti all'inizio del caricamento dell'elemento, senza scaricare il video o avviare la riproduzione.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Inoltre, è possibile utilizzare un poster come elemento sostitutivo in caso di mancato funzionamento del codice `src` del video o del mancato supporto dei formati video disponibili. L'unico svantaggio legato all'utilizzo delle immagini poster è un'ulteriore richiesta del file, elemento che utilizza larghezza di banda e richiede un rendering. Per ulteriori informazioni consulta [Ottimizzazione delle immagini] (../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Segue un confronto diretto dei video con e senza immagine poster, visualizzata in bianco e nero per dimostrarne la diversa natura rispetto al video:

<img class="attempt-left" alt="Schermata di Chrome per Android, verticale: senza poster" src="images/Chrome-Android-video-no-poster.png">
<img class="attempt-right" alt="Schermata di Chrome per Android, verticale: con poster" src="images/Chrome-Android-video-poster.png">
<div class="clearfix"></div>


## Offerta di alternative per piattaforme legacy 




Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse.



### Verifica i formati supportati

Utilizza `canPlayType()` per trovare i formati video supportati. Questo metodo accetta un argomento stringa costituito da codec di `tipo MIME` e da codec facoltativi e restituisce uno dei seguenti valori:

<table>
  <thead>
    <tr>
      <th>Valore restituito</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">(stringa vuota)</td>
      <td data-th="Description">Contenitore e/o codec non supportato.</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>forse</code></td>
      <td data-th="Description">
        Contenitore e codec potrebbero essere supportati, ma il browser
        richiede una verifica tramite il download di alcuni video.
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probabilmente</code></td>
      <td data-th="Description">Il formato sembra essere supportato.
      </td>
    </tr>
  </tbody>
</table>

Di seguito sono riportati alcuni esempi di argomenti `canPlayType()` e di valori restituiti tramite l'utilizzo di Chrome:


<table>
  <thead>
    <tr>
      <th>Tipo</th>
      <th>Risposta</th>
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
      <td data-th="Response"><code>probabilmente</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>forse</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probabilmente</code></td>
    </tr>
  </tbody>
</table>


### Crea video in più formati

Esistono diversi strumenti che consentono di salvare lo stesso video in formati diversi:

* Strumenti desktop: [FFmpeg](//ffmpeg.org/)
* Applicazioni GUI: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Servizi di codifica/transcodifica online: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Verifica il formato utilizzato

Desideri conoscere il formato video utilizzato dal browser?

In JavaScript, utilizza la proprietà `currentSrc` del video per tornare alla fonte utilizzata.

Per un esempio pratico, dai un'occhiata <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">alla demo</a>: per Chrome e Firefox scegli `chrome.webm` (è infatti la prima nell'elenco delle fonti potenziali supportate da questi browser), per Safari invece scegli `chrome.mp4`.


## Dimensionamento corretto dei video 




Per ottenere un prodotto che piaccia agli utenti, le proporzioni hanno un loro peso.


### Verifica le dimensioni del video

Le dimensioni effettive del video codificato potrebbero non corrispondere alle dimensioni dell'elemento video (come nel caso di un'immagine che non può essere visualizzata utilizzando le sue dimensioni reali).

Per verificare le dimensioni codificate di un video, utilizza le proprietà dell'elemento video: `videoWidth` e `videoHeight`. Le proprietà `width` e `height` restituiscono le dimensioni dell'elemento video, che potrebbero essere state dimensionate utilizzando CSS o gli attributi larghezza e altezza incorporati.

### Assicurati che i video non siano più grandi dei contenitori

Quando gli elementi video sono troppo grandi per il riquadro di visualizzazione, possono eccedere dai rispettivi contenitori, impedendo la visualizzazione e 
l'utilizzo dei controlli da parte degli utenti.

<img class="attempt-left" alt="Screenshot verticale di Android Chrome: l'elemento video senza stile supera il riquadro di visualizzazione" src="images/Chrome-Android-portrait-video-unstyled.png">
<img class="attempt-right" alt="Screenshot orizzontale di Android Chrome: l'elemento video senza stile supera il riquadro di visualizzazione" src="images/Chrome-Android-landscape-video-unstyled.png">
<div class="clearfix"></div>


Puoi controllare le dimensioni del video con JavaScript o CSS. Le librerie e i plugin di JavaScript, come [FitVids](//fitvidsjs.com/), consentono di rispettare le dimensioni e le proporzioni corrette, anche nel caso dei video Flash di YouTube e di altre fonti.

Utilizza [query supporti CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) per specificare la dimensione degli elementi in base alle dimensioni del riquadro di visualizzazione; `max-width: 100%` è ideale.

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

Per contenuti multimediali in iframes (come i video di YouTube), opta per un approccio reattivo (come quello [proposto da by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

Note: Non forzare il ridimensionamento dell'elemento, poiché potresti alterarne le proporzioni rispetto al video originale. Un video appiattito o allungato è sgradevole.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling"   adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup"   adjust_indentation="auto" %}
</pre>

Confronta l'<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">esempio reattivo</a> con <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">con la versione non reattiva</a>.


## Personalizzazione del riproduttore multimediale 




Ciascuna piattaforma visualizza i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video.



Le diverse piattaforme visualizzano i video in modo diverso. Le soluzioni per dispositivi mobili devono valutare anche l'orientamento del dispositivo. Utilizza l'API Fullscreen per il controllo della visualizzazione a schermo intero dei contenuti video.

### Modalità di funzionamento dell'orientamento su diversi dispositivi

L'orientamento del dispositivo non è un problema per i PC desktop o portatili, ma è importante per la progettazione delle pagine web per dispositivi mobili e tablet.

Safari per iPhone commuta in maniera eccellente l'orientamento verticale e orizzontale:

<img class="attempt-left" alt="Schermata di un video riprodotto da Safari per iPhone, in verticale" src="images/iPhone-video-playing-portrait.png">
<img class="attempt-right" alt="Schermata di un video riprodotto da Safari per iPhone, in orizzontale" src="images/iPhone-video-playing-landscape.png">
<div class="clearfix"></div>


L'orientamento del dispositivo su iPad e Chrome per Android può diventare un problema.
Ad esempio, la riproduzione di un video su un iPad con orientamento orizzontale senza alcuna personalizzazione produce quanto segue:

<img class="center" alt="Schermata di un video riprodotto con Safari per iPad Retina, in orizzontale"
src="images/iPad-Retina-landscape-video-playing.png">

Impostando `width: 100%` o `max-witdh: 100%` sul video usando i CSS è possibile risolvere diversi problemi della disposizione dell'orientamento del dispositivo. È possibile anche prendere in considerazione alternative a schermo intero.

### Visualizzazione inline o a schermo intero

Le diverse piattaforme visualizzano i video in modo diverso. Safari per iPhone visualizza un elemento video inline in una pagina web, ma il video viene riprodotto in modalità a schermo intero:

<img class="center" alt="Schermata di elementi video su iPhone, in verticale" src="images/iPhone-video-with-poster.png">

Su Android, è possibile attivare la modalità a schermo intero facendo clic sulla relativa icona. Tuttavia, l'impostazione predefinita prevede la riproduzione inline del video:

<img class="center" alt="Schermata di un video riprodotto con Safari per iPhone, in verticale" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari per iPad prevede la riproduzione inline del video:

<img class="center" alt="Schermata di un video riprodotto con Safari per iPad Retina, in orizzontale" src="images/iPad-Retina-landscape-video-playing.png">

### Controllo della visualizzazione a schermo intero dei contenuti

Le piattaforme che non forzano la riproduzione video a schermo intero l'API Fullscreen è [ampiamente supportata](//caniuse.com/fullscreen). Utilizza l'API per il controllo della visualizzazione a schermo intero dei contenuti o della pagina.

Per visualizzare un elemento a schermo intero come un video:

    elem.requestFullScreen();
    

Per visualizzare a schermo intero un documento intero:

    document.body.requestFullScreen();
    

Inoltre, verifica le modifiche dello stato della visualizzazione a schermo intero:

    video.addEventListener("fullscreenchange", handler);
    

In alternativa, verifica che l'elemento sia in modalità a schermo intero:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Inoltre, è possibile utilizzare la pseudo classe `:fullscreen` CSS per la modifica delle modalità di visualizzazione a schermo intero degli elementi.

Sui dispositivi che supportano l'API Fullscreen è possibile utilizzare immagini in miniatura come indicatori per i video:

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per visionare l'esecuzione dell'operazione, consulta <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">demo</a>.

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## L'importanza dell'accessibilità 




L'accessibilità è fondamentale. Gli utenti audiolesi o ipovedenti non possono guardare un video senza didascalie o descrizioni. Il tempo necessario per aggiungere questi elementi al video è ridotto e consente di migliorare l'esperienza degli utenti. Devi consentire a tutti gli utenti di fruire in qualche modo dei tuoi contenuti.




### Inserimento delle didascalie per una maggiore accessibilità

Per aumentare l'accessibilità degli elementi multimediali sui dispositivi mobili, inserisci didascalie o descrizioni mediante l'elemento di tracciamento.

Note: Chrome per Android, Safari per iOS e tutti i browser per PC desktop a eccezione di Firefox supportano gli elementi di tracciamento (vedi <a href='http://caniuse.com/track' title='Stato del supporto degli elementi di tracciamento'>caniuse.com/track</a>). Sono disponibili anche diverse polilinee. È consigliabile l'utilizzo di <a href='//www.delphiki.com/html5/playr/' title='Polilinea dell'elemento di tracciamento Playr'>Playr</a> o <a href='//captionatorjs.com/'' title='Traccia del sottotitolatore'>Sottotitolatore</a>.

L'elemento di tracciamento visualizza le didascalie nel modo seguente:

 <img class="center" alt="Schermata con didascalie visualizzate con l'elemento di tracciamento in Chrome per Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

### Aggiungere l'elemento di tracciamento

È molto semplice aggiungere didascalie ai video: è sufficiente inserire un elemento di tracciamento come elemento secondario di un video.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track"   adjust_indentation="auto" %}
</pre>

L'attributo dell'elemento della traccia `src` indica la posizione del file di tracciamento.

### Inserire didascalie nel file di tracciamento

Un file di tracciamento è costituito da `indicazioni` temporizzate in formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Uomo seduto sul ramo di un albero che utilizza un portatile.

    00:05.000 --> 00:08.000
    Ramo che si spezza facendo cadere l'uomo.

    .


## Consultazione rapida 




Una rapida panoramica sulle proprietà dell'elemento video.



### Attributi dell'elemento video

Per l'elenco completo degli attributi dell'elemento video e delle relative definizioni, vedi [le specifiche dell'elemento video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

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
      <td data-th="Description">Indirizzo (URL) di un file di immagine mostrato dal browser quando l'elemento video viene visualizzato senza che il relativo contenuto venga scaricato.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>precaricamento</code></td>
      <td data-th="Availability">Tutti i browser per dispositivi mobili ignorano il precaricamento.</td>
      <td data-th="Description">Indica al browser l'utilità di precaricare i metadati (o i video) prima dell'effettiva riproduzione. Le opzioni sono: nessuno, metadati o auto (vedi la sezione relativa al precaricamento per ulteriori dettagli). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">Non supportato da iPhone o Android; supportato da tutti i browser desktop, iPad, Firefox e Opera per Android.</td>
      <td data-th="Description">Avvia il download e la riproduzione il prima possibile (vedi la sezione relativa all'autoplay). </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">Tutti i browser</td>
      <td data-th="Description">Esegui il loop del video.</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controlli</code></td>
      <td data-th="Availability">Tutti i browser</td>
      <td data-th="Description">Mostra i controlli video predefiniti (riproduci, sospendi e così via)</td>
    </tr>
  </tbody>
</table>

#### Autoplay

Sul desktop, `autoplay` indica al browser di iniziare immediatamente, appena possibile, il download e la riproduzione del video. `Autoplay` non funziona su iOS e Chrome per Android; gli utenti devono toccare lo schermo per riprodurre il video.

Anche su piattaforme dove l'opzione autoplay è abilitata, devi valutare se attivarla:

* L'utilizzo dei dati può essere costoso.
* Se ai supporti multimediali viene imposto di scaricare e riprodurre i contenuti senza una richiesta antecedente, la larghezza di banda viene ridotta inaspettatamente, la CPU viene occupata e viene quindi ritardato il rendering della pagina.
* Gli utenti possono trovarsi in un contesto in cui la riproduzione di video o audio è inopportuna.

Il funzionamento dell'opzione autoplay può essere configurato in Android WebView tramite [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
L'impostazione true è predefinita, ma con l'app WebView hai la possibilità di disabilitarla.

#### Precaricamento

L'attributo `precaricamento` suggerisce al browser il quantitativo di informazioni o contenuti da precaricare.

<table>
  <thead>
    <tr>
      <th>Valore</th>
      <th>Descrizione</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>nessuno</code></td>
      <td data-th="Description">L'utente può anche decidere di non vedere il video e di non precaricare nulla</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadati</code></td>
      <td data-th="Description">I metadati (durata, dimensioni, tracce di testo) dovrebbero essere precaricati, ma con video di dimensioni ridotte.</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">È opportuno eseguire direttamente il download dell'intero video.</td>
    </tr>
  </tbody>
</table>

L'attributo `precaricamento` ha effetti diversi sulle varie piattaforme.
Ad esempio, mentre sui computer desktop Chrome esegue il buffering di 25 secondi di video, ciò non avviene in iOS o Android. Ciò significa che, a differenza dei computer desktop, sui dispositivi mobili potrebbero esserci ritardi nell'avvio della riproduzione. Per tutti i dettagli, vedi [pagina di prova di Steve Souders](//stevesouders.com/tests/mediaevents.php).

### JavaScript

[L'articolo su HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) è un'ottimo riepilogo sulle proprietà, sui metodi e sugli eventi di JavaScript che è possibile utilizzare per controllare la riproduzione di video. Gli stessi contenuti sono riportati di seguito e aggiornati nei casi in cui si riferiscano ai dispositivi mobili.

#### Proprietà

<table>
  <thead>
    <th>Proprietà</th>
      <th>Descrizione</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">Acquisisci o imposta la posizione di riproduzione in secondi.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">Acquisisci o imposta il volume attuale per il video.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">Acquisisci o imposta l'audio disattivato.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">Acquisisci o imposta la velocità di riproduzione; 1 è la velocità di riproduzione normale.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">Informazioni su quanto contenuto del video è stato sottoposto a buffering e può essere riprodotto (vedi <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo con visualizzazione della quantità di video sottoposta a buffering in un elemento canvas">demo</a>).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">L'indirizzo del video riprodotto.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">Larghezza del video in pixel (potrebbe essere diversa da quella dell'elemento video).</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">Altezza del video in pixel (potrebbe essere diversa da quella dell'elemento video).</td>
    </tr>
  </tbody>
</table>

I dispositivi mobili non supportano playbackRate (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">vedi demo</a>) o volume.

#### Metodi

<table>
  <thead>
    <th>Metodo</th>
      <th>Descrizione</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">Carica o ricarica una fonte video senza avviare la riproduzione: ad esempio, quando il video src viene modificato utilizzando JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">Riproduzione del video dalla sua posizione attuale.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">Riproduzione del video sospesa dalla sua posizione attuale.</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">Trova i formati supportati (vedi Verifica i formati supportati).</td>
    </tr>
  </tbody>
</table>

Sui dispositivi mobili (eccetto Opera su Android), i metodi play() e pause() non funzionano a meno che
siano attivati dall'utente, ad esempio facendo clic su un pulsante; vedi <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">demo</a>. (allo stesso modo, non è possibile avviare la riproduzione di contenuti come i video incorporati di YouTube).

#### Eventi

Esiste un unico sottoinsieme di eventi multimediali che può essere attivato. Per un elenco completo, fai riferimento alla [Eventi multimediali](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) pagina di Mozilla Developer Network.

<table>
  <thead>
    <th>Evento</th>
      <th>Descrizione</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">Attivato appena ci sono sufficienti dati disponibili, necessari al browser per riprodurre l'intero video senza interruzioni.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">Attivato quando termina la riproduzione del video.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">Attivato quando si verifica un errore.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">Attivato durante la prima riproduzione del video, dopo una sospensione o al riavvio.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">Attivato periodicamente per indicare lo stato del download.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">Attivato quando un'azione viene ritardata a causa di un'altra azione in corso.</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">Attivato quando il browser termina il caricamento dei metadati per il video: durata, dimensioni e tracce di testo.</td>
    </tr>
  </tbody>
</table>



