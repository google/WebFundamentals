---
layout: article
title: "Consultazione rapida"
description: "Una rapida panoramica sulle proprietà dell'elemento video."
introduction: "Una rapida panoramica sulle proprietà dell'elemento video."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 5
collection: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Utilizza l'elemento video per caricare, decodificare e riprodurre video sul tuo sito.
    - Crea video in più formati che coprano un'ampia gamma di piattaforme mobili.
    - Ridimensiona correttamente i video e assicurati che non superino le capacità dei relativi contenitori.
    - Dato che l'accessibilità è importante, aggiungi l'elemento traccia come una componente dell'elemento video.
remember:
  media-fragments:
    - La Media Fragments API è supportata dalla maggior parte delle piattaforme, eccetto iOS.
    - Assicurati che le richieste di intervallo siano supportate dal tuo server. Le richieste di intervallo sono attivate per impostazione predefinita nella maggior parte dei server; tuttavia, alcuni servizi di hosting potrebbero disabilitarle.
  dont-overflow:
    - Non modificare la dimensione dell'elemento in modo tale che non rispetti le proporzioni del video originale. Lo schiacciamento e l'allungamento creano un effetto sgradevole.
  accessibility-matters:
    - L'elemento traccia è supportato da Chrome per Android, Safari  per iOS e tutti gli attuali browser su desktop, eccetto Firefox (vedi <a href="http://caniuse.com/track" title="Stato supporto elemento traccia">caniuse.com/track</a>). Sono disponibili anche diversi polyfill. Si consiglia di utilizzare <a href='//www.delphiki.com/html5/playr/' title='Polyfill elemento traccia Playr'>Playr</a> o <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE è supportato da Chrome e Opera su Android, Internet Explorer 11 e Chrome per desktop, con supporto pianificato per <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title="Sequenza temporale di implementazione MSE Firefox">Firefox</a>.
---

{% wrap content%}

{% include modules/toc.liquid %}

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

## Attributi dell'elemento video

Per l'elenco completo degli attributi dell'elemento video e delle relative definizioni, vedi [le specifiche dell'elemento video](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="table">
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

### Autoplay

Sul desktop, `autoplay` indica al browser di iniziare immediatamente, appena possibile, il download e la riproduzione del video. `Autoplay` non funziona su iOS e Chrome per Android; gli utenti devono toccare lo schermo per riprodurre il video.

Anche su piattaforme dove l'opzione autoplay è abilitata, devi valutare se attivarla:

* L'utilizzo dei dati può essere costoso.
* Se ai supporti multimediali viene imposto di scaricare e riprodurre i contenuti senza una richiesta antecedente, la larghezza di banda viene ridotta inaspettatamente, la CPU viene occupata e viene quindi ritardato il rendering della pagina.
* Gli utenti possono trovarsi in un contesto in cui la riproduzione di video o audio è inopportuna.

Il funzionamento dell'opzione autoplay può essere configurato in Android WebView tramite [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
L'impostazione true è predefinita, ma con l'app WebView hai la possibilità di disabilitarla.

### Precaricamento

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

## JavaScript

[L'articolo su HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) è un'ottimo riepilogo sulle proprietà, sui metodi e sugli eventi di JavaScript che è possibile utilizzare per controllare la riproduzione di video. Gli stessi contenuti sono riportati di seguito e aggiornati nei casi in cui si riferiscano ai dispositivi mobili.

### Proprietà

<table class="table">
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

I dispositivi mobili non supportano playbackRate ({% link_sample _code/scripted.html %}vedi demo{% endlink_sample %}) o volume.

### Metodi

<table class="table">
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
siano attivati dall'utente, ad esempio facendo clic su un pulsante; vedi {% link_sample _code/scripted.html %}demo{% endlink_sample %}. (allo stesso modo, non è possibile avviare la riproduzione di contenuti come i video incorporati di YouTube).

### Eventi

Esiste un unico sottoinsieme di eventi multimediali che può essere attivato. Per un elenco completo, fai riferimento alla [Eventi multimediali](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) pagina di Mozilla Developer Network.

<table class="table">
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

{% include modules/nextarticle.liquid %}

{% endwrap %}

