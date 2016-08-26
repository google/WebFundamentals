project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Niet alle video-indelingen worden op alle platforms ondersteund. Controleer welke indelingen worden ondersteund op de belangrijkste platforms en zorg ervoor dat uw video in al deze indelingen correct kan worden afgespeeld.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Alternatieven voor verouderde platforms {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Niet alle video-indelingen worden op alle platforms ondersteund. Controleer welke indelingen worden ondersteund op de belangrijkste platforms en zorg ervoor dat uw video in al deze indelingen correct kan worden afgespeeld.



## Ondersteunde indelingen controleren

Gebruik `canPlayType()` om te controleren welke video-indelingen worden ondersteund. De methode kijkt naar een tekenreeksargument die bestaat uit een `mime-type` en optionele codecs en retourneert een van de volgende waarden:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Retourwaarde</th>
      <th>Beschrijving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Retourwaarde">(lege tekenreeks)</td>
      <td data-th="Beschrijving">De container en/of codec worden niet ondersteund.</td>
    </tr>
    <tr>
      <td data-th="Retourwaarde"><code>misschien</code></td>
      <td data-th="Beschrijving">
        De container en codec(s) worden mogelijk ondersteund, maar de browser
        moet een video downloaden om dit te controleren.
      </td>
    </tr>
    <tr>
      <td data-th="Retourwaarde"><code>misschien</code></td>
      <td data-th="Beschrijving">De indeling lijkt te worden ondersteund.
      </td>
    </tr>
  </tbody>
</table>

Hier volgen enkele voorbeelden van `canPlayType()`-argumenten en retourwaarden bij uitvoering in Chrome:


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Respons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Respons">(lege tekenreeks)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Respons">(lege tekenreeks)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsens, ruis"</code></td>
      <td data-th="Respons">(lege tekenreeks)</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Respons"><code>waarschijnlijk</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Respons"><code>misschien</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Respons"><code>waarschijnlijk</code></td>
    </tr>
  </tbody>
</table>


## Video`s maken in meerdere indelingen

Er bestaan veel hulpprogramma`s waarmee u dezelfde video in verschillende indelingen kunt opslaan:

* Desktopprogramma`s: [FFmpeg](//ffmpeg.org/)
* GUI-toepassingen: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Online coderings-/transcoderingsservices: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## De gebruikte indeling controleren

Wilt u weten welke video-indeling de browser heeft gebruikt?

In JavaScript kunt u de gebruikte bron achterhalen met de eigenschap `currentSrc` van de video.

Bekijk <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">dit voorbeeld</a> om te zien hoe dit in de praktijk werkt: Chrome en Firefox gebruiken `chrome.webm` (omdat deze boven aan de lijst staat van bronnen die door deze browsers worden ondersteund) terwijl Safari `chrome.mp4` gebruikt.



