---
title: "Snelle naslaggids"
description: "Een handig overzicht van eigenschappen in het video-element."
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
  Een handig overzicht van eigenschappen in het video-element.
</p>

{% include shared/toc.liquid %}


## Kenmerken van video-elementen

Ga voor een volledig overzicht van de kenmerken van video-elementen en de beschrijving hiervan naar [specificaties video-element](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>Kenmerk</th>
      <th>Beschikbaarheid</th>
      <th>Beschrijving</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Kenmerk"><code>src</code></td>
      <td data-th="Beschikbaarheid">Alle browsers</td>
      <td data-th="Beschrijving">Adres (URL) van de video.</td>
    </tr>
    <tr>
      <td data-th="Kenmerk"><code>poster</code></td>
      <td data-th="Beschikbaarheid">Alle browsers</td>
      <td data-th="Beschrijving">Adres (URL) van een afbeeldingsbestand dat de browser kan laten zien zodra het video-element wordt weergegeven, zonder dat de inhoud van de video wordt gedownload.</td>
    </tr>
    <tr>
      <td data-th="Kenmerk"><code>preload</code></td>
      <td data-th="Beschikbaarheid">In alle mobiele browsers wordt het kenmerk `preload` genegeerd.</td>
      <td data-th="Beschrijving">Vertelt de browser dat het de moeite waard is om metadata (of sommige video`s) eerst te laden voordat ze worden afgespeeld. Opties zijn `none`, `metadata` of `auto` (zie het gedeelte Vooraf laden voor meer informatie). </td>
    </tr>
    <tr>
      <td data-th="Kenmerk"><code>autoplay</code></td>
      <td data-th="Beschikbaarheid">Niet ondersteund voor iPhone of Android; ondersteund voor alle desktopbrowsers, iPad, Firefox en Opera voor Android.</td>
      <td data-th="Description">Zorgt ervoor dat er zo snel mogelijk wordt begonnen met downloaden en afspelen (zie het gedeelte Automatisch afspelen). </td>
    </tr>
    <tr>
      <td data-th="Kenmerk"><code>loop</code></td>
      <td data-th="Beschikbaarheid">Alle browsers</td>
      <td data-th="Beschrijving">Zorgt ervoor dat de video steeds opnieuw wordt afgespeeld.</td>
    </tr>
    <tr>
      <td data-th="Kenmerk"><code>controls</code></td>
      <td data-th="Beschikbaarheid">Alle browsers</td>
      <td data-th="Beschrijving">Geeft de standaard bedieningselementen van de video weer (afspelen, pauzeren, etc.)</td>
    </tr>
  </tbody>
</table>

### Autoplay

In een desktopomgeving zorgt `autoplay` (automatisch afspelen) ervoor dat de browser onmiddellijk start met het downloaden van de video en deze afspeelt zodra dit mogelijk is. In iOS en Chrome voor Android werkt `autoplay` niet; gebruikers moeten op het scherm tikken om de video af te spelen.

Ook op platforms waarop automatisch afspelen mogelijk is, kunt u zich afvragen of het een goed idee is om deze optie te activeren:

* Het dataverbruik kan kostbaar zijn.
* Door zonder vragen meteen te beginnen met downloaden en afspelen kan onverwacht te veel beslag worden gelegd op de bandbreedte en de processor, waardoor pagina`s minder snel worden geladen.
* Gebruikers kunnen zich in een situatie bevinden waarin het afspelen van beeld of geluid als hinderlijk wordt ervaren.

Automatisch afspelen kan worden geconfigureerd in Android WebView via de [API WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
Standaard staat deze optie ingesteld op `true`, maar een WebView-app kan ervoor kiezen dit uit te schakelen.

### Preload

Het kenmerk `preload` vertelt de browser in hoeverre informatie of inhoud moet worden geladen bij het openen van de pagina.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Waarde</th>
      <th>Beschrijving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Waarde"><code>none</code></td>
      <td data-th="Beschrijving">De gebruiker bekijkt de video mogelijk niet eens&ndash; er wordt niets geladen bij het openen van de pagina</td>
    </tr>
    <tr>
      <td data-th="Waarde"><code>metadata</code></td>
      <td data-th="Beschrijving">Metadata (duur, formaat, tekstsporen) moeten worden geladen bij het openen van de pagina, maar met zo min mogelijk beeld.</td>
    </tr>
    <tr>
      <td data-th="Waarde"><code>auto</code></td>
      <td data-th="Beschrijving">Het is wenselijk dat de video meteen in zijn geheel wordt gedownload.</td>
    </tr>
  </tbody>
</table>

Afhankelijk van het platform heeft het kenmerk `preload` verschillende effecten.
In Chrome bijvoorbeeld wordt in een desktopomgeving 25 seconden beeld gebufferd, in iOS of Android niets. Dit betekent dat op mobiele platforms soms sprake is van een opstartvertraging bij het afspelen die niet voorkomt in een desktopomgeving. Zie [Steve Souders` testpagina](//stevesouders.com/tests/mediaevents.php) voor volledige informatie.

## JavaScript

[Het artikel HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) bevat een prima overzicht van de JavaScript-eigenschappen, -methodes en -events die beschikbaar zijn voor het afspelen van video. We hebben deze informatie hier opgenomen. Deze wordt waar relevant bijgewerkt met mobielspecifieke zaken.

### Eigenschappen

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Eigenschap</th>
      <th>Beschrijving</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Eigenschap"><code>currentTime</code></td>
      <td data-th="Beschrijving">Afspeelpositie in seconden ophalen of instellen.</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>volume</code></td>
      <td data-th="Beschrijving">Huidige volume voor video ophalen of instellen.</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>muted</code></td>
      <td data-th="Beschrijving">Geluiddemping ophalen of instellen.</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>playbackRate</code></td>
      <td data-th="Beschrijving">Afspeelsnelheid ophalen of instellen; 1 is normale snelheid vooruit.</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>buffered</code></td>
      <td data-th="Beschrijving">Informatie over welk gedeelte van de video in de buffer is opgeslagen en klaar is om te worden afgespeeld (zie <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">demo</a>).</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>currentSrc</code></td>
      <td data-th="Beschrijving">Het adres van de video die wordt afgespeeld.</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>videoWidth</code></td>
      <td data-th="Beschrijving">Breedte van de video in pixels (deze kan afwijken van de breedte in het video-element).</td>
    </tr>
    <tr>
      <td data-th="Eigenschap"><code>videoHeight</code></td>
      <td data-th="Beschrijving">Hoogte van de video in pixels (deze kan afwijken van de hoogte in het video-element).</td>
    </tr>
  </tbody>
</table>

Afspeelsnelheid ({% link_sample _code/scripted.html %}zie voorbeeld{% endlink_sample %}) en volume worden beide niet ondersteund op mobiel.

### Methodes

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Methode</th>
    <th>Beschrijving</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Methode"><code>load()</code></td>
      <td data-th="Beschrijving">Een videobron laden of opnieuw laden zonder dat de video wordt gestart: bijvoorbeeld als de videobron wordt gewijzigd met JavaScript.</td>
    </tr>
    <tr>
      <td data-th="Methode"><code>play()</code></td>
      <td data-th="Beschrijving">De video afspelen vanaf diens huidige locatie.</td>
    </tr>
    <tr>
      <td data-th="Methode"><code>pause()</code></td>
      <td data-th="Beschrijving">De video pauzeren op diens huidige locatie.</td>
    </tr>
    <tr>
      <td data-th="Methode"><code>canPlayType('format')</code></td>
      <td data-th="Beschrijving">Overzicht van ondersteunde indelingen (zie Ondersteunde indelingen controleren).</td>
    </tr>
  </tbody>
</table>

Op mobiel werken play() en pause() niet (afgezien van Opera in Android) tenzij
ze worden aangeroepen in reactie op een gebruikersactie, zoals het klikken op een knop: zie het {% link_sample _code/scripted.html %}voorbeeld{% endlink_sample %}. (Op dezelfde manier kan afspelen niet worden gestart voor inhoud zoals geïntegreerde YouTube-video`s.)

### Gebeurtenissen

Dit is alleen een subset van de mediagebeurtenissen die mogelijk worden geactiveerd. Ga naar de pagina [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) op het Mozilla Developer Network voor een volledig overzicht.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Event</th>
      <th>Beschrijving</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gebeurtenis"><code>canplaythrough</code></td>
      <td data-th="Beschrijving">Wordt actief als de browser voldoende gegevens heeft ontvangen om de video in zijn geheel zonder onderbrekingen af te spelen.</td>
    </tr>
    <tr>
      <td data-th="Gebeurtenis"><code>ended</code></td>
      <td data-th="Beschrijving">Wordt actief als de video helemaal is afgespeeld.</td>
    </tr>
    <tr>
      <td data-th="Gebeurtenis"><code>error</code></td>
      <td data-th="Beschrijving">Wordt actief als er een fout optreedt.</td>
    </tr>
    <tr>
      <td data-th="Gebeurtenis"><code>playing</code></td>
      <td data-th="Beschrijving">Wordt actief als de video voor de eerste keer wordt afgespeeld, opnieuw wordt gestart na te zijn gepauzeerd, of opnieuw wordt gestart.</td>
    </tr>
    <tr>
      <td data-th="Gebeurtenis"><code>progress</code></td>
      <td data-th="Beschrijving">Wordt met regelmatige tussenpozen actief om de downloadvoortgang aan te geven.</td>
    </tr>
    <tr>
      <td data-th="Gebeurtenis"><code>waiting</code></td>
      <td data-th="Beschrijving">Wordt actief als een actie wordt uitgesteld in afwachting van voltooiing van een andere actie.</td>
    </tr>
    <tr>
      <td data-th="Gebeurtenis"><code>loadedmetadata</code></td>
      <td data-th="Beschrijving">Wordt actief als de browser klaar is met het laden van de metadata voor de video: duur, formaat en tekstsporen.</td>
    </tr>
  </tbody>
</table>



