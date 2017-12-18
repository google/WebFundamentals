project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Precaricare video e audio per una riproduzione più veloce.

{# wf_published_on: 2017-08-17 #}
{# wf_updated_on: 2017-12-18 #}
{# wf_blink_components: Blink>Media #}

# Riproduzione veloce con video preload {: .page-title}

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Un avvio più veloce della riproduzione significa che più persone possono
guardare il tuo video. Questo è un fatto noto. In questo articolo esaminerò le
tecniche che è possibile utilizzare per accelerare la riproduzione multimediale
attivando il pre-caricamento delle risorse in relazione al caso d'uso.

Note: questo articolo si applica anche all'elemento audio se non diversamente
specificato.

<figure>
<video controls controlslist="nodownload" muted playsinline style="width:
100%">
<source
src="https://storage.googleapis.com/webfundamentals-assets/videos/video-preload-hero.webm#t=1.1"
type="video/webm">
<source
src="https://storage.googleapis.com/webfundamentals-assets/videos/video-preload-hero.mp4#t=1.1"
type="video/mp4">
  </source></source></video>
  <figcaption>
<p>Credits: copyright Blender Foundation | <a
href="http://www.blender.org">www.blender.org</a> .</p>
  </figcaption>
</figure>

### TL;DR {: .hide-from-toc }

<table>
  <tbody>
    <tr>
      <th></th>
      <th>È ottimo...</th>
      <th>Ma...</th>
    </tr>
    <tr>
      <td rowspan="3" style="white-space: nowrap">
<a href="#video_preload_attribute">Attributo video preload</a>
      </td>
<td rowspan="3">Semplice da usare per un file unico ospitato su un server
web.</td>
      <td>I browser possono ignorare completamente l'attributo.</td>
    </tr>
<tr>
<td>Il recupero delle risorse inizia quando il documento HTML è stato
completamente caricato e analizzato.</td>
    </tr>
    <tr>
<td>MSE ignora l'attributo preload sugli elementi multimediali perché
l'app è responsabile della fornitura di contenuti multimediali a MSE.</td>
    </tr>
    <tr>
      <td rowspan="2" style="white-space: nowrap">
<a href="#link_preload">Link preload</a>
      </td>
<td>Forza il browser ad effettuare una richiesta per una risorsa video
senza bloccare l'evento <code>onload</code> del documento.</td>
      <td>Le richieste HTTP Range non sono compatibili.</td>
    </tr>
<tr>
      <td>Compatibile con MSE e segmenti di file.</td>
<td>Dovrebbe essere usato solo per file multimediali di piccole dimensioni
(</td>
</tr>
    <tr>
      <td>
<a href="#manual_buffering">Buffering manuale</a>
      </td>
      <td>Pieno controllo</td>
      <td>La gestione complessa degli errori è responsabilità del sito Web.</td>
    </tr>
  </tbody>
</table>

## Attributo video preload

Se la sorgente video è un file univoco ospitato su un server web potresti voler
utilizzare l'attributo video `preload` per fornire un suggerimento al browser
sulla [quantità di informazioni o contenuto da
precaricare](/web/fundamentals/media/video#preload) . Ciò significa che [Media
Source Extensions (MSE)](/web/fundamentals/media/mse/basics) non è compatibile
con  `preload`.

Il recupero delle risorse inizierà solo quando il documento HTML iniziale è
stato completamente caricato ed analizzato (ad esempio l'evento
`DOMContentLoaded` è stato attivato) mentre diversamente l'evento
`window.onload` verrà attivato quando la risorsa è stata effettivamente
recuperata.

<figure>
  <img src="/web/fundamentals/media/images/video-preload/video-preload.svg">
</figure>

L'impostazione dell'attributo `preload` sui `metadata` indica che non è previsto
che l'utente abbia bisogno del video, ma è desiderabile recuperarne i metadati
(dimensioni, elenco di brani, durata e così via).

```
<video id="video" preload="metadata" src="file.mp4" controls></video>

<script>
  video.addEventListener('loadedmetadata', function() {
    if (video.buffered.length === 0) return;

    var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');
  });
</script>
```

L'impostazione dell'attributo `preload` su `auto` indica che il browser può
memorizzare nella cache un numero sufficiente di dati per completare la
riproduzione senza richiedere arresti per ulteriore buffering.

```
<video id="video" preload="auto" src="file.mp4" controls></video>

<script>
  video.addEventListener('loadedmetadata', function() {
    if (video.buffered.length === 0) return;

    var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');
  });
</script>
```

Ci sono alcuni avvertimenti però. Poiché questo è solo un suggerimento, il
browser potrebbe ignorare completamente l'attributo `preload`. Al momento della
stesura ecco alcune regole applicate da Chrome:

- Quando [Data Saver](https://support.google.com/chrome/answer/2392284) è
abilitato Chrome impone il valore di `preload` su `none` .
- In Android 4.3 Chrome impone il valore di `preload` a `none` causa di un [bug
di Android](https://bugs.chromium.org/p/chromium/issues/detail?id=612909) .
- Su una connessione cellulare (2G, 3G e 4G) Chrome impone il valore `preload` a
`metadata`.

### Suggerimenti

Se il vostro sito contiene molte risorse video sullo stesso dominio vi consiglio
di impostare il valore `preload` su `metadata` o definire attributi `poster` ed
impostare `preload` a `none`. Facendo ciò eviterai di raggiungere il numero
massimo di connessioni HTTP allo stesso dominio (6 in base alle specifiche di
HTTP 1.1) che possono bloccare il caricamento di risorse. Tieni presente che ciò
può anche migliorare la velocità della pagina se i video non fanno parte
dell'esperienza utente principale.

## Link preload

Come [coperto](/web/updates/2016/03/link-rel-preload) in altri
[articoli](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/),
[link preload](https://w3c.github.io/preload/) è un recupero dichiarativo che
consente di forzare il browser ad effettuare la richiesta di una risorsa senza
bloccare l'evento `window.onload` e mentre la pagina viene scaricata. Le risorse
caricate tramite `<link rel="preload">` sono memorizzate localmente nel browser
e sono effettivamente inerti fino a quando non vengono esplicitamente
referenziate da DOM, JavaScript o CSS.

Il preload è diverso da prefetch in quanto si concentra sulla navigazione
corrente e recupera le risorse con priorità in base al loro tipo (script, stile,
carattere, video, audio, ecc.). Dovrebbe essere usato per riempire la cache del
browser per le sessioni correnti.

<figure>
  <img src="/web/fundamentals/media/images/video-preload/link-preload.svg">
</figure>

### Preload del video completo

Ecco come precaricare un video completo sul tuo sito Web in modo che quando il
tuo JavaScript chiede di recuperare il contenuto del video, verrà letto dalla
cache in quanto la risorsa potrebbe essere già stata memorizzata nella cache del
browser. Se la richiesta di preload non è ancora terminata si verificherà un
recupero regolare della rete.

```
<link rel="preload" as="video" href="https://cdn.com/small-file.mp4">

<video id="video" controls></video>

<script>
  // Later on, after some condition has been met, set video source to the
  // preloaded video URL.
  video.src = 'https://cdn.com/small-file.mp4';
  video.play().then(_ => {
    // If preloaded video URL was already cached, playback started immediately.
  });
</script>
```

Note: raccomanderei l'utilizzo solo per file multimediali di piccole dimensioni
(<5 MB).

Poiché la risorsa precaricata sta per essere consumata da un elemento video
nell'esempio il valore del preload link `as` è `video`. Se si trattasse di un
elemento audio sarebbe stato `as="audio"` .

### Preload del primo segmento

L'esempio seguente mostra come precaricare il primo segmento di un video con
`<link rel="preload">` e usarlo con Media Source Extensions. Se non hai
familiarità con l'API Javascript di MSE leggi le [nozioni di base di
MSE](/web/fundamentals/media/mse/basics) .

Per semplicità supponiamo che l'intero video sia stato diviso in file più
piccoli come "file_1.webm", "file_2.webm", "file_3.webm", ecc.

```
<link rel="preload" as="fetch" href="https://cdn.com/file_1.webm">

<video id="video" controls></video>

<script>
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen, { once: true });

  function sourceOpen() {
    URL.revokeObjectURL(video.src);
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');

    // If video is preloaded already, fetch will return immediately a response
    // from the browser cache (memory cache). Otherwise, it will perform a
    // regular network fetch.
    fetch('https://cdn.com/file_1.webm')
    .then(response => response.arrayBuffer())
    .then(data => {
      // Append the data into the new sourceBuffer.
      sourceBuffer.appendBuffer(data);
      // TODO: Fetch file_2.webm when user starts playing video.
    })
    .catch(error => {
      // TODO: Show "Video is not available" message to user.
    });
  }
</script>
```

Warning: per le risorse di cross-origin assicurarsi che le intestazioni CORS
siano impostate correttamente. Poiché non possiamo creare un buffer di array da
una response opaca recuperata con `fetch(videoFileUrl, { mode: 'no-cors' })` non
saremo in grado di alimentare alcun elemento video o audio.

### Supporto

Link preload non è ancora supportato in tutti i browser. Potresti voler rilevare
la sua disponibilità con i frammenti di seguito per adattare le tue metriche di
performance.

```
function preloadFullVideoSupported() {
  const link = document.createElement('link');
  link.as = 'video';
  return (link.as === 'video');
}

function preloadFirstSegmentSupported() {
  const link = document.createElement('link');
  link.as = 'fetch';
  return (link.as === 'fetch');
}
```

## Buffering manuale

Prima di approfondire [Cache
API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) ed i service worker
vediamo come eseguire il buffering manuale di un video con MSE. L'esempio
seguente presuppone che il tuo server web supporti richieste HTTP Range ma
questo sarebbe abbastanza simile con i segmenti di file. Nota che alcune
librerie middleware come [Shaka Player](https://github.com/google/shaka-player)
, [JW Player](https://developer.jwplayer.com/) e [Video.js di
Google](http://videojs.com/) sono progettate per gestire questo per te.

```
<video id="video" controls></video>

<script>
  const mediaSource = new MediaSource();
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen, { once: true });

  function sourceOpen() {
    URL.revokeObjectURL(video.src);
    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');

    // Fetch beginning of the video by setting the Range HTTP request header.
    fetch('file.webm', { headers: { range: 'bytes=0-567139' } })
    .then(response => response.arrayBuffer())
    .then(data => {
      sourceBuffer.appendBuffer(data);
      sourceBuffer.addEventListener('updateend', updateEnd, { once: true });
    });
  }

  function updateEnd() {
    // Video is now ready to play!
    var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
    console.log(bufferedSeconds + ' seconds of video are ready to play!');

    // Fetch the next segment of video when user starts playing the video.
    video.addEventListener('playing', fetchNextSegment, { once: true });
  }

  function fetchNextSegment() {
    fetch('file.webm', { headers: { range: 'bytes=567140-1196488' } })
    .then(response => response.arrayBuffer())
    .then(data => {
      const sourceBuffer = mediaSource.sourceBuffers[0];
      sourceBuffer.appendBuffer(data);
      // TODO: Fetch further segment and append it.
    });
  }
</script>
```

### Considerazioni

Dato che ora hai il controllo dell'intera esperienza di buffering multimediale
ti suggerisco di considerare il livello della batteria del dispositivo, la
preferenza utente "Modalità risparmio dati" e le informazioni di rete quando
pensi al pre-caricamento.

#### Consapevolezza della batteria

Si prega di considerare il livello di batteria dei dispositivi degli utenti
prima di pensare al preload di un video. Ciò conserverà la durata della batteria
quando il livello di potenza è basso.

Disabilita il preload o almeno esegui preload di un video con risoluzione bassa
quando il dispositivo sta esaurendo la batteria.

```
if ('getBattery' in navigator) {
  navigator.getBattery()
  .then(battery => {
    // If battery is charging or battery level is high enough
    if (battery.charging || battery.level > 0.15) {
      // TODO: Preload the first segment of a video.
    }
  });
}
```

#### Rileva "Data-Saver"

Utilizza l'intestazione della richiesta di suggerimento del client `Save-Data`
per fornire applicazioni veloci e light agli utenti che hanno optato per la
modalità "risparmio di dati" nel proprio browser. Identificando questa
intestazione della richiesta, l'applicazione può personalizzare ed offrire
un'esperienza utente ottimizzata agli utenti con limiti di costi e prestazioni.

Scopri di più leggendo la nostra guida completa alla [pubblicazione di
applicazioni veloci e light con
Save-Data](/web/updates/2016/02/save-data).

#### Caricamento intelligente basato sulle informazioni di rete

Si consiglia di controllare `navigator.connection.type` prima del
precaricamento. Quando è impostato su `cellular`, è possibile impedire il
pre-caricamento ed avvisare gli utenti che il proprio operatore di rete mobile
potrebbe addebitare la larghezza di banda ed avviare la riproduzione automatica
solo dei contenuti precedentemente memorizzati nella cache.

```
if ('connection' in navigator) {
  if (navigator.connection.type == 'cellular') {
    // TODO: Prompt user before preloading video
  } else {
    // TODO: Preload the first segment of a video.
  }
}
```

Scopri l'[esempio Network
Information](https://googlechrome.github.io/samples/network-information/) per
sapere come reagire alle modifiche di rete.

### Pre-cache primi segmenti multipli

Ora cosa succede se voglio precaricare speculativamente alcuni contenuti
multimediali senza sapere quale pezzo di media l'utente alla fine sceglierà. Se
l'utente si trova su una pagina Web che contiene 10 video, probabilmente abbiamo
abbastanza memoria per recuperare un file di segmento da ciascuno, ma non
dobbiamo assolutamente creare 10 elementi video nascosti e 10 oggetti
`MediaSource` ed iniziare a riempirli di dati.

L'esempio in due parti qui sotto mostra come pre-cache più segmenti video
utilizzando Cache API potente e facile da usare. Si noti che qualcosa di simile
può essere raggiunto anche con IndexedDB. Non stiamo ancora utilizzando i
service worker in quanto Cache API è accessibile anche dall'oggetto Window.

#### Fetch e cache

```
const videoFileUrls = [
  'bat_video_file_1.webm',
  'cow_video_file_1.webm',
  'dog_video_file_1.webm',
  'fox_video_file_1.webm',
];

// Let's create a video pre-cache and store all first segments of videos inside.
window.caches.open('video-pre-cache')
.then(cache => Promise.all(videoFileUrls.map(videoFileUrl => fetchAndCache(videoFileUrl, cache))));

function fetchAndCache(videoFileUrl, cache) {
  // Check first if video is in the cache.
  return cache.match(videoFileUrl)
  .then(cacheResponse => {
    // Let's return cached response if video is already in the cache.
    if (cacheResponse) {
      return cacheResponse;
    }
    // Otherwise, fetch the video from the network.
    return fetch(videoFileUrl)
    .then(networkResponse => {
      // Add the response to the cache and return network response in parallel.
      cache.put(videoFileUrl, networkResponse.clone());
      return networkResponse;
    });
  });
}
```

Si noti che se utilizzi richieste HTTP Range dovresti ricreare manualmente un
oggetto `Response` poiché Cache API non supporta
[ancora](https://github.com/whatwg/fetch/issues/144) le risposte Range. Tieni
presente che la chiamata `networkResponse.arrayBuffer()` recupera l'intero
contenuto della risposta in una sola volta nella memoria del renderer, motivo
per cui potresti voler utilizzare intervalli di piccole dimensioni.

Come riferimento ho modificato parte dell'esempio sopra riportato per salvare le
richieste di intervallo HTTP sulla pre-cache del video.

```
    ...
    return fetch(videoFileUrl, { headers: { range: 'bytes=0-567139' } })
    .then(networkResponse => networkResponse.arrayBuffer())
    .then(data => {
      const response = new Response(data);
      // Add the response to the cache and return network response in parallel.
      cache.put(videoFileUrl, response.clone());
      return response;
    });
```

#### Riproduci video

Quando un utente fa clic sul pulsante di riproduzione, recupereremo il primo
segmento video disponibile nella Cache API in modo che la riproduzione inizi
immediatamente se disponibile. Altrimenti, lo preleveremo semplicemente dalla
rete. Tieni presente che i browser e gli utenti possono decidere di cancellare
la [cache](/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa) .

Come visto in precedenza utilizziamo MSE per alimentare quel primo segmento di
video con l'elemento video.

```
function onPlayButtonClick(videoFileUrl) {
  video.load(); // Used to be able to play video later.

  window.caches.open('video-pre-cache')
  .then(cache => fetchAndCache(videoFileUrl, cache)) // Defined above.
  .then(response => response.arrayBuffer())
  .then(data => {
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen, { once: true });

    function sourceOpen() {
      URL.revokeObjectURL(video.src);

      const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
      sourceBuffer.appendBuffer(data);

      video.play().then(_ => {
        // TODO: Fetch the rest of the video when user starts playing video.
      });
    }
  });
}
```

Warning: per risorse cross-origin assicurarsi che le intestazioni CORS siano
impostate correttamente. Poiché non possiamo creare un buffer di array da una
risposta opaca recuperata con `fetch(videoFileUrl, { mode: 'no-cors' })` , non
saremo in grado di alimentare alcun elemento video o audio.

### Crea risposte Range con un service worker

Cosa fare dopo aver recuperato un intero file video ed averlo salvato in Cache
API . Quando il browser invia una richiesta di HTTP Range, certamente non si
desidera portare l'intero video nella memoria del renderer poiché Cache API non
supporta ancora le risposte Range.

Quindi mostriamo come intercettare queste richieste e restituire una risposta
Range personalizzata da un service worker.

```
addEventListener('fetch', event => {
  event.respondWith(loadFromCacheOrFetch(event.request));
});

function loadFromCacheOrFetch(request) {
  // Search through all available caches for this request.
  return caches.match(request)
  .then(response => {

    // Fetch from network if it's not already in the cache.
    if (!response) {
      return fetch(request);
      // Note that we may want to add the response to the cache and return
      // network response in parallel as well.
    }

    // Browser sends a HTTP Range request. Let's provide one reconstructed
    // manually from the cache.
    if (request.headers.has('range')) {
      return response.blob()
      .then(data => {

        // Get start position from Range request header.
        const pos = Number(/^bytes\=(\d+)\-/g.exec(request.headers.get('range'))[1]);
        const options = {
          status: 206,
          statusText: 'Partial Content',
          headers: response.headers
        }
        const slicedResponse = new Response(data.slice(pos), options);
        slicedResponse.setHeaders('Content-Range': 'bytes ' + pos + '-' +
            (data.size - 1) + '/' + data.size);
        slicedResponse.setHeaders('X-From-Cache': 'true');

        return slicedResponse;
      });
    }

    return response;
  }
}
```

È importante notare che l'uso di `response.blob()` per ricreare questa risposta
divisa in slice in quanto ciò mi fornisce semplicemente un handle per il file
([in Chrome](https://github.com/whatwg/fetch/issues/569)) mentre
`response.arrayBuffer()` porta l'intero file nella memoria del renderer.

La mia intestazione HTTP personalizzata `X-From-Cache` può essere utilizzata per
sapere se questa richiesta proviene dalla cache o dalla rete. Può essere usato
da un servizio come
[ShakaPlayer](https://github.com/google/shaka-player/blob/master/docs/tutorials/service-worker.md)
per ignorare il tempo di risposta come indicatore della velocità della rete.

<div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="f8EGZa32Mts"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Dai un'occhiata all'app ufficiale [Sample
Media](https://github.com/GoogleChrome/sample-media-pwa) ed in particolare al
file
[ranged-response.js](https://github.com/GoogleChrome/sample-media-pwa/blob/master/src/client/scripts/ranged-response.js)
per una soluzione completa su come gestire le richieste Range.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}

<div class="clearfix"></div>
