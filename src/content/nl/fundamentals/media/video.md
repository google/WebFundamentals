project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Lees wat de eenvoudigste manieren zijn om video toe te toevoegen aan uw website en gebruikers op alle apparaten de meest optimale ervaring te bieden.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Gebruikers houden van video's; ze kunnen leuk en informatief zijn. Op mobiele apparaten kunt u informatie soms gemakkelijker tot u nemen door middel van een video. Video's verbruiken echter wel bandbreedte en werken niet altijd op alle platforms hetzelfde. Gebruikers haken af als ze moeten wachten tot een video is geladen of er niets gebeurt als ze op 'afspelen' drukken.  Lees meer informatie over de eenvoudigste manieren om video toe te voegen aan uw website en gebruikers op alle apparaten de meest optimale ervaring te bieden.

<div class="clearfix"></div>


## Een video toevoegen 


Bekijk informatie over hoe u video aan uw site toevoegt en ervoor zorgt dat gebruikers op elk apparaat een optimale ervaring hebben.



### TL;DR {: .hide-from-toc }
- Gebruik het video-element om video op uw site te laden, decoderen en af te spelen.
- Maak video's in meerdere indelingen zodat ze op allerlei verschillende mobiele platforms kunnen worden afgespeeld.
- Maak video's met het juiste formaat; zorg ervoor dat ze niet overlopen tot buiten de container.
- Toegankelijkheid is belangrijk; voeg het track-element toe als onderliggend element van het video-element.


### Het video-element toevoegen

Voeg het video-element toe om video op uw site te laden, decoderen en af te spelen.

<video controls>
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>


    <video src="chrome.webm" type="video/webm">
         <p>Het video-element wordt niet ondersteund door uw browser.</p>
    </video>
    

### Meerdere bestandsindelingen opgeven

Niet alle browsers ondersteunen dezelfde video-instellingen.
Met het element `<source>` kunt u meerdere formaten opgeven als oplossing voor het geval de browser van de gebruiker een van de formaten niet ondersteunt.
Bijvoorbeeld:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

Als de browser de `<source>` tags parseert, wordt via het optionele kenmerk `type` bepaald welk bestand moet worden gedownload en afgespeeld. Als de browser WebM ondersteunt, wordt chrome.webm afgespeeld. In het andere geval wordt er gecontroleerd of MPEG-4-video`s kunnen worden afgespeeld.
Bekijk <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a> voor meer informatie over hoe video en audio op het web werken.

Deze benadering heeft diverse voordelen vergeleken bij het aanbieden van verschillende HTML- of serverscripts, vooral op mobiele telefoons:

* Ontwikkelaars kunnen formaten vermelden in volgorde van voorkeur.
* Systeemeigen switching van de client vermindert de wachttijd; er wordt slechts één verzoek gedaan om inhoud op te halen.
* De browser een formaat laten kiezen is eenvoudiger, sneller en mogelijk betrouwbaarder dan een server-ondersteuningsdatabase te gebruiken met gebruikersagentdetectie.
* Door het opgeven van het type van elke bestandsbron wordt het netwerk sneller. De browser kan dan een videobron selecteren zonder een gedeelte van de video te hoeven downloaden om het indelingstype vast te kunnen stellen.

Al de genoemde punten zijn met name van belang voor mobiele telefoons, waar bandbreedte en wachttijd een grote rol spelen en de gebruiker snel wil worden bediend. 
Het niet opgeven van een type-kenmerk kan de prestaties beïnvloeden wanneer er meerdere bronnen met niet-ondersteunde typen zijn.

Vergelijk terwijl u uw developertools voor mobiele browsers gebruikt de netwerkactiviteit <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">met type-kenmerken</a> en <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">zonder type-kenmerken</a>.
Controleer ook de reactieheaders in uw browser-developertools om u ervan te [verzekeren dat uw server het juiste MIME-type rapporteert](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types); anders zullen controles van videobrontypen niet werken.

### Een start- en eindtijd opgeven

Spaar bandbreedte en zorg ervoor dat uw site sneller reageert: gebruik de Media Fragments API om een start- en eindtijd toe te voegen aan het video-element.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>

Als u een mediafragment wilt toevoegen, hoeft u slechts `#t=[start_time][,end_time]` toe te voegen aan de media-URL. Als u bijvoorbeeld de video wilt afspelen tussen seconde 5 en seconde 10, geeft u het volgende op:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

U kunt de Media Fragments API ook gebruiken voor het leveren van meerdere weergaven op dezelfde video &ndash; zoals cue points in een dvd &ndash; zonder meerdere bestanden te hoeven coderen en uitvoeren.

Note: - De Media Fragments API wordt door de meeste platforms ondersteund, maar niet door iOS. Controleer of bereikaanvragen door uw server worden ondersteund. Bereikaanvragen worden op de meeste servers standaard ingeschakeld, maar ze kunnen door bepaalde hostingservices worden uitgeschakeld.


Controleer met uw browser-developertools `Accept-Ranges: bytes` in de reactieheaders:

<img class="center" alt="Screenshot Chrome Dev Tools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Een posterafbeelding toevoegen

Voeg een posterkenmerk aan het video-element toe zodat uw gebruikers een indruk van de inhoud krijgen zodra het element wordt geladen, zonder dat de video hoeft te worden gedownload of het afspelen hoeft te worden gestart.


    <video poster="poster.jpg" ...>
        ...
    </video>
    

Een poster kan ook een noodoplossing zijn als de video `src` defect is of als geen van de geleverde video-indelingen worden ondersteund. Het enige nadeel van posterafbeeldingen is dat er een extra bestandsverzoek moet worden gedaan, wat enige bandbreedte kost en rendering vereist. Zie voor meer informatie [Afbeeldingsoptimalisatie](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Hier volgt een vergelijking van video`s zonder en met een posterafbeelding &ndash; we geven de posterafbeelding in grijstinten weer om aan te geven dat het hier niet om de video gaat:

<img class="center" alt="Screenshot Android Chrome, staand: zonder poster" src="images/Chrome-Android-video-no-poster.png" class="attempt-left">
<img class="center" alt="Screenshot Android Chrome, staand: met poster" src="images/Chrome-Android-video-poster.png" class="attempt-right">
<div class="clearfix"></div>



## Alternatieven voor verouderde platforms 




Niet alle video-indelingen worden op alle platforms ondersteund. Controleer welke indelingen worden ondersteund op de belangrijkste platforms en zorg ervoor dat uw video in al deze indelingen correct kan worden afgespeeld.



### Ondersteunde indelingen controleren

Gebruik `canPlayType()` om te controleren welke video-indelingen worden ondersteund. De methode kijkt naar een tekenreeksargument die bestaat uit een `mime-type` en optionele codecs en retourneert een van de volgende waarden:

<table>
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


<table>
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


### Video`s maken in meerdere indelingen

Er bestaan veel hulpprogramma`s waarmee u dezelfde video in verschillende indelingen kunt opslaan:

* Desktopprogramma`s: [FFmpeg](//ffmpeg.org/)
* GUI-toepassingen: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Online coderings-/transcoderingsservices: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### De gebruikte indeling controleren

Wilt u weten welke video-indeling de browser heeft gebruikt?

In JavaScript kunt u de gebruikte bron achterhalen met de eigenschap `currentSrc` van de video.

Bekijk <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">dit voorbeeld</a> om te zien hoe dit in de praktijk werkt: Chrome en Firefox gebruiken `chrome.webm` (omdat deze boven aan de lijst staat van bronnen die door deze browsers worden ondersteund) terwijl Safari `chrome.mp4` gebruikt.


## Juiste videoformaat 




Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk.



### Videoformaat controleren

Het feitelijk gecodeerde frameformaat van de video kan afwijken van de afmetingen in het video-element (net zoals een afbeelding niet altijd wordt weergegeven op het werkelijke formaat).

Met de eigenschappen `videoWidth` en `videoHeight` van het video-element kunt u controleren wat het gecodeerde formaat is van een video. De eigenschappen `width` en `height` retourneren de afmetingen van het video-element, waarvan het formaat kan zijn gecreëerd met CSS- of inline breedte- of hoogtekenmerken.

### Zorg ervoor dat videocontainers niet te vol raken

Als een video-element te groot is voor de viewport, kan de videocontainer te vol raken. Hierdoor kan de gebruiker de inhoud niet meer bekijken of de bedieningselementen
niet meer gebruiken.


<img class="attempt-left" alt="Android Chrome-screenshot, staand: viewport raakt te vol door unstyled video-element" src="images/Chrome-Android-portrait-video-unstyled.png">
<img class="attempt-right" alt="Android Chrome-screenshot, liggend: viewport raakt te vol door unstyled video-element" src="images/Chrome-Android-landscape-video-unstyled.png">
<div class="clearfix"></div>


U kunt de afmetingen van uw video regelen met JavaScript of CSS. Met behulp van JavaScript-bibliotheken en plugins zoals [FitVids](//fitvidsjs.com/) kunt u de juiste beeldverhouding behouden, zelf voor Flash-video`s van YouTube of andere bronnen.

Gebruik [CSS-mediaquery's](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness) om het formaat van elementen op te geven afhankelijk van de afmetingen van de viewport; `max-width: 100%` is uw vriend.

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

Probeer voor media-inhoud in iframes (zoals YouTube-video's) een responsieve aanpak te hanteren (zoals de aanpak [van John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

Note: Forceer het aanpassen van de grootte van het element niet als dit resulteert in een beeldverhouding die afwijkt van de oorspronkelijke video. Samengeperste of uitgerekte beelden zien er slecht uit.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

Vergelijk het <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">responsieve voorbeeld</a> met de <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">niet-responsieve versie</a>.


## De videospeler aanpassen 




Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven.



Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven.

### Hoe apparaatoriëntatie werkt voor verschillende apparaten

Apparaatoriëntatie is niet van toepassing voor desktopmonitors of laptops, maar is wel heel belangrijk wanneer u webpagina`s wilt ontwerpen voor mobiele telefoons en tablets.

Safari op iPhone kan uitstekend schakelen tussen de staande en liggende oriëntatie:

<img class="attempt-left" alt="Screenshot van video die wordt afgespeeld in Safari op de iPhone, in staande modus" src="images/iPhone-video-playing-portrait.png">
<img class="attempt-right" alt="" src="images/iPhone-video-playing-landscape.png">Screenshot van video die wordt afgespeeld in Safari op de iPad Retina, in liggende modus
<div class="clearfix"></div>


De apparaatoriëntatie op een iPad en bij Chrome op Android kan lastig zijn.
Zonder aanpassingen ziet bijvoorbeeld een video die op een iPad in liggende modus wordt afgespeeld er zo uit:

<img class="center" alt="Screenshot van video die wordt afgespeeld in Safari op de iPad Retina, in liggende modus"
src="images/iPad-Retina-landscape-video-playing.png">

Door in CSS `width: 100%` of `max-width: 100%` voor een video in te stellen, kunnen veel lay-outproblemen met apparaatoriëntatie worden opgelost. U kunt ook beeldvullende alternatieven overwegen.

### Inline- of fullscreenweergave

Video wordt op elk platform anders weergegeven. Safari op de iPhone geeft een video-element inline weer op een webpagina, maar speelt video af in beeldvullende modus:

<img class="center" alt="Screenshot of video-element op de iPhone, staande modus" src="images/iPhone-video-with-poster.png">

Op Android kunnen gebruikers de beeldvullende modus opvragen door op het pictogram beeldvullend te klikken. Maar normaal gesproken wordt de video inline afgespeeld:

<img class="center" alt="Screenshot van video die in Chrome op Android wordt afgespeeld, in staande modus" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Bij Safari op een iPad wordt video inline afgespeeld:

<img class="center" alt="Screenshot van video die wordt afgespeeld in Safari op de iPad Retina, in liggende modus" src="images/iPad-Retina-landscape-video-playing.png">

### Beeldvullende weergave van inhoud instellen

Voor platforms die het beeldvullend afspelen van video niet afdwingen, wordt de Fullscreen API [breed ondersteund](//caniuse.com/fullscreen). Gebruik deze API om de beeldvullende weergave van inhoud, of de pagina, in te stellen.

Een element, zoals een video:, beeldvullend weergeven:

    elem.requestFullScreen();
    

Het hele document beeldvullend weergeven:

    document.body.requestFullScreen();
    

U kunt ook luisteren naar wijzigingen in de beeldvullende status:

    video.addEventListener("fullscreenchange", handler);
    

Of controleren of het element momenteel in beeldvullende modus is:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

U kunt ook de CSS-pseudoklasse `:fullscreen` gebruiken om de manier te veranderen waarop elementen in de beeldvullende modus worden weergegeven.

Op apparaten die de Fullscreen API ondersteunen, kunt u miniatuurafbeeldingen gebruiken als placeholders voor video:

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>

Bekijk de demo <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html"></a> om te zien hoe dit in het echt werkt.

Note: `requestFullScreen()` is currently vendor prefixed and may require extra code for full cross browser compatibility.


## Toegankelijkheid is belangrijk 




Toegankelijkheid is geen functie. Gebruikers met een visuele beperking of beperking van het gehoor hebben zonder ondertitels of beschrijvingen helemaal niets aan een video. Hoewel het tijd kost om deze elementen aan uw video toe te voegen, hoeft u op deze manier niemand teleur te stellen. Zorg ervoor dat iedere gebruiker iets aan uw video heeft.




### Ondertiteling toevoegen voor meer toegankelijkheid

Als u media toegankelijker wilt maken op mobiele telefoons, kunt u ondertitels of beschrijvingen toevoegen.

Note: Het track-element wordt ondersteund door Chrome voor Android, iOS Safari en alle bekende browsers op desktop met uitzondering van Firefox (zie <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Ook zijn er verschillende polyfills beschikbaar. We kunnen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> of <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a> aanbevelen.

Als u het track-element gebruikt, worden ondertitels als volgt weergegeven:

 <img class="center" alt="Screenshot toont ondertitels die worden weergegeven via het track-element in Chrome op Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

### Track-element toevoegen

Het toevoegen van ondertitels aan uw video is erg gemakkelijk &ndash; voeg een track-element gewoon toe als onderliggend element van het video-element:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track"   adjust_indentation="auto" %}
</pre>

Het `src`-kenmerk van het track-element geeft de locatie van het trackbestand.

### Ondertitels in trackbestand definiëren

Een trackbestand bestaat uit getimede `cues` in WebVTT-indeling:

    WEBVTT

    00:00.000 --> 00:04.000
    Man zit met een laptop op een boomtak.

    00:05.000 --> 00:08.000
    De tak breekt af en de man valt.

    ...

## Snelle naslaggids 




Een handig overzicht van eigenschappen in het video-element.



### Kenmerken van video-elementen

Ga voor een volledig overzicht van de kenmerken van video-elementen en de beschrijving hiervan naar [specificaties video-element](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
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

#### Autoplay

In een desktopomgeving zorgt `autoplay` (automatisch afspelen) ervoor dat de browser onmiddellijk start met het downloaden van de video en deze afspeelt zodra dit mogelijk is. In iOS en Chrome voor Android werkt `autoplay` niet; gebruikers moeten op het scherm tikken om de video af te spelen.

Ook op platforms waarop automatisch afspelen mogelijk is, kunt u zich afvragen of het een goed idee is om deze optie te activeren:

* Het dataverbruik kan kostbaar zijn.
* Door zonder vragen meteen te beginnen met downloaden en afspelen kan onverwacht te veel beslag worden gelegd op de bandbreedte en de processor, waardoor pagina`s minder snel worden geladen.
* Gebruikers kunnen zich in een situatie bevinden waarin het afspelen van beeld of geluid als hinderlijk wordt ervaren.

Automatisch afspelen kan worden geconfigureerd in Android WebView via de [API WebSettings](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)).
Standaard staat deze optie ingesteld op `true`, maar een WebView-app kan ervoor kiezen dit uit te schakelen.

#### Preload

Het kenmerk `preload` vertelt de browser in hoeverre informatie of inhoud moet worden geladen bij het openen van de pagina.

<table>
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

### JavaScript

[Het artikel HTML5 Rocks Video](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) bevat een prima overzicht van de JavaScript-eigenschappen, -methodes en -events die beschikbaar zijn voor het afspelen van video. We hebben deze informatie hier opgenomen. Deze wordt waar relevant bijgewerkt met mobielspecifieke zaken.

#### Eigenschappen

<table>
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

Afspeelsnelheid (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">zie voorbeeld</a>) en volume worden beide niet ondersteund op mobiel.

#### Methodes

<table>
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
ze worden aangeroepen in reactie op een gebruikersactie, zoals het klikken op een knop: zie het <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">voorbeeld</a>. (Op dezelfde manier kan afspelen niet worden gestart voor inhoud zoals geïntegreerde YouTube-video`s.)

#### Gebeurtenissen

Dit is alleen een subset van de mediagebeurtenissen die mogelijk worden geactiveerd. Ga naar de pagina [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) op het Mozilla Developer Network voor een volledig overzicht.

<table>
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



