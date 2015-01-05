---
layout: article
title: "Alternativen für veraltete Plattformen anbieten"
description: "Nicht alle Videoformate werden auf allen Plattformen unterstützt. Informieren Sie sich, welche Formate auf den gängigen Plattformen unterstützt werden, und stellen Sie sicher, dass sich Ihr Video dort abspielen lässt."
introduction: "Nicht alle Videoformate werden auf allen Plattformen unterstützt. Informieren Sie sich, welche Formate auf den gängigen Plattformen unterstützt werden, und stellen Sie sicher, dass sich Ihr Video dort abspielen lässt."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Verwenden Sie das Videoelement zum Laden, Decodieren und Abspielen von Videos auf Ihrer Website.
    - Erstellen Sie die Videoinhalte in verschiedenen Formaten, um eine Reihe mobiler Plattformen abzudecken.
    - Achten Sie auf die richtige Größe der Videos, damit diese nicht ihre Container sprengen.
    - Achten Sie auf Zugänglichkeit. Fügen Sie das Track-Element hinzu und ordnen Sie es dem Videoelement unter.
remember:
  media-fragments:
    - Die Media Fragments-API wird auf den meisten Plattformen mit Ausnahme von iOS unterstützt.
    - Vergewissern Sie sich, dass Ihr Server Bereichsanforderungen unterstützt. Bereichsanforderungen sind auf den meisten Servern standardmäßig aktiviert, einige Hostingdienste können diese jedoch deaktivieren.
  dont-overflow:
    - Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus.
  accessibility-matters:
    - Das Track-Element wird in Chrome für Android, iOS Safari sowie allen aktuellen Desktop-Browsern mit Ausnahme von Firefox (siehe <a href="http://caniuse.com/track" title="Track element support status">caniuse.com/track</a>) unterstützt. Darüber hinaus sind auch mehrere Polyfiller verfügbar. Wir empfehlen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> oder <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE wird von Chrome und Opera unter Android sowie in Internet Explorer 11 und Chrome für Desktopgeräte unterstützt. Auch <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a> soll in Zukunft unterstützt werden.
  optimize:
    - <a href="../images/">Bilder</a>
    - <a href="../../performance/optimizing-content-efficiency/">Inhaltseffizienz optimieren</a>
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

## Unterstützte Formate ermitteln

Mit `canPlayType()` können Sie herausfinden, welche Videoformate unterstützt werden. Bei dieser Methode wird auf der Grundlage eines Zeichenfolgenarguments bestehend aus `mime-type` und optionalen Codecs einer der folgenden Werte zurückgegeben:

<table class="table">
  <thead>
    <tr>
      <th>Zurückgegebener Wert</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Zurückgegebener Wert">(leere Zeichenfolge)</td>
      <td data-th="Beschreibung">Der Container bzw. Codec wird nicht unterstützt.</td>
    </tr>
    <tr>
      <td data-th="Zurückgegebener Wert"><code>maybe</code></td>
      <td data-th="Beschreibung">
        Container und Codec(s) werden möglicherweise unterstützt, der Browser
        muss jedoch einen Teil des Videos herunterladen, um dies zu überprüfen.
      </td>
    </tr>
    <tr>
      <td data-th="Zurückgegebener Wert"><code>probably</code></td>
      <td data-th="Beschreibung">Das Format wird anscheinend unterstützt.
      </td>
    </tr>
  </tbody>
</table>

Im Folgenden finden Sie einige Beispiele für `canPlayType()`-Argumente und zurückgegebene Werte in Chrome:


<table class="table">
  <thead>
    <tr>
      <th>Typ</th>
      <th>Antwort</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Typ"><code>video/xyz</code></td>
      <td data-th="Antwort">(leere Zeichenfolge)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Antwort">(leere Zeichenfolge)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Antwort">(leere Zeichenfolge)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Antwort"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/webm</code></td>
      <td data-th="Antwort"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Antwort"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## Videos in mehreren Formaten erstellen

Es gibt viele Tools, mit denen Sie dasselbe Video in unterschiedlichen Formaten speichern können:

* Desktop-Tools: [FFmpeg](//ffmpeg.org/)
* GUI-Anwendungen: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Onlinedienste zur Codierung/Transcodierung: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## Verwendetes Format ermitteln

Sie möchten wissen, für welches Videoformat sich der Browser letztlich entschieden hat?

In JavaScript können Sie anhand der Eigenschaft `currentSrc` des Videos feststellen, welche Quelle verwendet wurde.

Wie das in der Praxis aussieht, erfahren Sie in {% link_sample _code/video-main.html %}dieser Demo{% endlink_sample %}: Chrome und Firefox haben sich für `chrome.webm` entschieden, weil diese Datei in der Liste der potenziell von diesen Browsern unterstützten Quellen ganz oben steht, während Safari `chrome.mp4` ausgewählt hat.

{% include modules/nextarticle.liquid %}

{% endwrap %}

