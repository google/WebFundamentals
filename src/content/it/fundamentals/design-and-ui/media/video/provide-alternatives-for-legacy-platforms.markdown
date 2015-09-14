---
title: "Offerta di alternative per piattaforme legacy"
description: "Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Utilizza elementi video per caricare, decodificare e riprodurre i video del tuo sito."
    - "Crea video in diversi formati per una vasta gamma di piattaforme mobili."
    - "Dimensiona i video al meglio evitando l'overflow dei relativi contenitori."
    - "L'accessibilità è importante: aggiungi gli elementi di tracciamento come elementi secondari di quelli video."
notes:
  media-fragments:
    - "Gran parte delle piattaforme supporta l'API Media Fragments, a eccezione di iOS."
    - "Verifica che le range request siano supportate dal server in uso. Le range request vengono attivate per impostazione predefinita su gran parte dei server, anche se potrebbero essere assenti su alcuni servizi di hosting."
  dont-overflow:
    - "Non forzare il ridimensionamento dell'elemento, poiché potresti alterarne le proporzioni rispetto al video originale. Un video appiattito o allungato è sgradevole."
  accessibility-matters:
    - "Chrome per Android, Safari per iOS e tutti i browser per PC desktop a eccezione di Firefox supportano gli elementi di tracciamento (vedi <a href='http://caniuse.com/track' title='Stato del supporto degli elementi di tracciamento'>caniuse.com/track</a>). Sono disponibili anche diverse polilinee. È consigliabile l'utilizzo di <a href='//www.delphiki.com/html5/playr/' title='Polilinea dell'elemento di tracciamento Playr'>Playr</a> o <a href='//captionatorjs.com/'' title='Traccia del sottotitolatore'>Sottotitolatore</a>."
  construct-video-streams:
    - "Chrome, Opera per Android, Internet Explorer 11 e Chrome per PC desktop supportano MSE ed è previsto il supporto anche per <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Images</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Ottimizzazione dell'efficienza dei contenuti</a>"
---

<p class="intro">
  Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse.
</p>

{% include shared/toc.liquid %}


## Verifica i formati supportati

Utilizza `canPlayType()` per trovare i formati video supportati. Questo metodo accetta un argomento stringa costituito da codec di `tipo MIME` e da codec facoltativi e restituisce uno dei seguenti valori:

<table class="mdl-data-table mdl-js-data-table">
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


<table class="mdl-data-table mdl-js-data-table">
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



