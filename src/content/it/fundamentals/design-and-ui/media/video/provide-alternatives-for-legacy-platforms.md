project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Offerta di alternative per piattaforme legacy {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Non tutte le piattaforme supportano qualsiasi formato video. Verifica i formati supportati dalle principali piattaforme e assicurati che il tuo video funzioni su ciascuna di esse.



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

Per un esempio pratico, dai un'occhiata <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">alla demo</a>: per Chrome e Firefox scegli `chrome.webm` (è infatti la prima nell'elenco delle fonti potenziali supportate da questi browser), per Safari invece scegli `chrome.mp4`.



