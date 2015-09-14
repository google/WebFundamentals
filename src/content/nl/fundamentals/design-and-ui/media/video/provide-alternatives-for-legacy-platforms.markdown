---
title: "Alternatieven voor verouderde platforms"
description: "Niet alle video-indelingen worden op alle platforms ondersteund. Controleer welke indelingen worden ondersteund op de belangrijkste platforms en zorg ervoor dat uw video in al deze indelingen correct kan worden afgespeeld."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Gebruik het video-element om video op uw site te laden, decoderen en af te spelen."
    - "Maak video's in meerdere indelingen zodat ze op allerlei verschillende mobiele platforms kunnen worden afgespeeld."
    - "Maak video's met het juiste formaat; zorg ervoor dat ze niet overlopen tot buiten de container."
    - "Toegankelijkheid is belangrijk; voeg het track-element toe als onderliggend element van het video-element."
notes:
  media-fragments:
    - "De Media Fragments API wordt door de meeste platforms ondersteund, maar niet door iOS."
    - "Controleer of bereikaanvragen door uw server worden ondersteund. Bereikaanvragen worden op de meeste servers standaard ingeschakeld, maar ze kunnen door bepaalde hostingservices worden uitgeschakeld."
  dont-overflow:
    - "Forceer het aanpassen van de grootte van het element niet als dit resulteert in een beeldverhouding die afwijkt van de oorspronkelijke video. Samengeperste of uitgerekte beelden zien er slecht uit."
  accessibility-matters:
    - "Het track-element wordt ondersteund door Chrome voor Android, iOS Safari en alle bekende browsers op desktop met uitzondering van Firefox (zie <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Ook zijn er verschillende polyfills beschikbaar. We kunnen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> of <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a> aanbevelen."
  construct-video-streams:
    - "MSE wordt ondersteund door Chrome en Opera op Android, en in Internet Explorer 11 en Chrome for desktop, met toekomstige ondersteuning voor <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Afbeeldingen</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Efficiëntie van inhoud optimaliseren</a>"
---

<p class="intro">
  Niet alle video-indelingen worden op alle platforms ondersteund. Controleer welke indelingen worden ondersteund op de belangrijkste platforms en zorg ervoor dat uw video in al deze indelingen correct kan worden afgespeeld.
</p>

{% include shared/toc.liquid %}


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

Bekijk {% link_sample _code/video-main.html %}dit voorbeeld{% endlink_sample %} om te zien hoe dit in de praktijk werkt: Chrome en Firefox gebruiken `chrome.webm` (omdat deze boven aan de lijst staat van bronnen die door deze browsers worden ondersteund) terwijl Safari `chrome.mp4` gebruikt.



