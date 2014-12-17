---
layout: article
title: "Offerta di alternative per piattaforme legacy"
description: "Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse."
introduction: "Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
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
  optimize:
    - <a href="../images/">Immagini</a>
    - <a href="../../performance/optimizing-content-efficiency/">Ottimizzazione dell'efficienza nei contenuti</a>
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

## Verifica i formati supportati

Utilizza `canPlayType()` per trovare i formati video supportati. Questo metodo accetta un argomento stringa costituito da codec di `tipo MIME` e da codec facoltativi e restituisce uno dei seguenti valori:

<table class="table">
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


<table class="table">
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


## Crea video in più formati

Esistono diversi strumenti che consentono di salvare lo stesso video in formati diversi:

* Strumenti desktop: [FFmpeg](//ffmpeg.org/)
* Applicazioni GUI: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Servizi di codifica/transcodifica online: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Verifica il formato utilizzato

Desideri conoscere il formato video utilizzato dal browser?

In JavaScript, utilizza la proprietà `currentSrc` del video per tornare alla fonte utilizzata.

Per un esempio pratico, dai un'occhiata {% link_sample _code/video-main.html %}alla demo{% endlink_sample %}: per Chrome e Firefox scegli `chrome.webm` (è infatti la prima nell'elenco delle fonti potenziali supportate da questi browser), per Safari invece scegli `chrome.mp4`.

{% include modules/nextarticle.liquid %}

{% endwrap %}

