project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Afbeeldingen nemen vaak het grootste aantal gedownloade bytes op een internetpagina voor hun rekening en nemen daarnaast een aanzienlijke hoeveelheid visuele ruimte in beslag. Door afbeeldingen te optimaliseren, kunt u een grote hoeveelheid bytes besparen en de gebruiksvriendelijkheid van uw website aanzienlijk verbeteren. 

{# wf_updated_on: 2014-05-09 #}
{# wf_published_on: 2014-05-06 #}

# Beeldoptimalisatie {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



Afbeeldingen nemen vaak het grootste aantal gedownloade bytes op een internetpagina voor hun rekening en nemen daarnaast een aanzienlijke hoeveelheid visuele ruimte in beslag. Door afbeeldingen te optimaliseren, kunt u een grote hoeveelheid bytes besparen en de gebruiksvriendelijkheid van uw website aanzienlijk verbeteren. Hoe minder bytes een browser hoeft te downloaden, des te minder concurrentie is er voor de bandbreedte van de client en des te sneller kan de browser inhoud downloaden en weergeven op het scherm.



Beeldoptimalisatie is zowel een kunst als een wetenschap: een kunst omdat er geen definitief antwoord is op de vraag hoe je een afbeelding het beste comprimeert, en een wetenschap omdat er veel goed ontwikkelde technieken en algoritmen bestaan waarmee de omvang van afbeeldingen aanzienlijk kan worden verkleind. U vindt de optimale instellingen voor uw afbeelding door verschillende dimensies zorgvuldig te analyseren: de mogelijkheden van de beschikbare bestandsindelingen, de inhoud van de gecodeerde gegevens, de kwaliteit, het aantal pixels en meer.

## Afbeeldingen uitsluiten en vervangen

### TL;DR {: .hide-from-toc }
- Verwijder overbodige beeldbronnen
- Pas waar mogelijk CSS3-effecten toe
- Gebruik weblettertypes in plaats van gecodeerde tekst in afbeeldingen


De eerste vraag die u zich dient te stellen is of een afbeelding echt nodig is om het gewenste effect te behalen. Goed ontwerp is eenvoudig en levert altijd de beste resultaten op. De beste optimalisatiestrategie is altijd om beeldbronnen indien mogelijk te verwijderen. Deze bevatten immers een relatief groot aantal bytes, in vergelijking tot HTML, CSS, JavaScript en andere items op de pagina. Aan de andere kant kan een goed geplaatste afbeelding meer zeggen dan duizend woorden. De keuze is aan u.

Vervolgens dient u zich af te vragen of er een alternatieve technologie is waarmee u het gewenste resultaat op een efficiëntere manier kunt bereiken:

* **CSS-effecten** (overgangen, schaduwen, enzovoort) en CSS-animaties kunnen worden gebruikt om items te maken die er altijd scherp uitzien, ongeacht resolutie of zoomfactor, en vaak met een fractie van het aantal bytes dat voor een afbeelding nodig is.
* **Weblettertypen** zijn er in fraaie varianten en bieden de mogelijkheid om tekst te selecteren, op te zoeken en te verkleinen - een aanzienlijke verbetering van de gebruiksvriendelijkheid.

Als u ooit tekst moet coderen voor een afbeeldingitem, is het waarschijnlijk eenvoudiger om weblettertypen te gebruiken. Het is belangrijk om een gepast lettertype te kiezen voor goed design, merkbekendheid en leesbaarheid, maar tekst in een afbeelding is vaak weinig gebruiksvriendelijk. De tekst kan niet worden geselecteerd, er kan niet in de tekst worden gezocht, niet gezoomd en de tekst is niet toegankelijk voor apparaten met hoge DPI-capaciteit. Weblettertypen hebben hun [eigen instellingen voor optimalisatie](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/){: .external } voor alle bovenstaande aspecten. Weblettertypes zijn altijd de betere keuze voor tekstweergave.


## Vector- en rasterafbeeldingen

### TL;DR {: .hide-from-toc }
- Vectorafbeeldingen zijn ideaal voor afbeeldingen van geometrische vormen
- Vectorafbeeldingen zijn afhankelijk van zoomfactor en resolutie
- Gebruik rasterafbeeldingen voor complexe scenes met veel onregelmatige vormen en details


Wanneer u de optimale bestandsindeling voor een afbeelding heeft gevonden waarmee het gewenste resultaat wordt bereikt, is de volgende stap om het type afbeelding te selecteren:


<figure class="attempt-left">
  <img class="center" src="images/vector-zoom.png" alt="Ingezoomde vectorafbeelding">
  <figcaption>Vector</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/raster-zoom.png" alt="Ingezoomde rasterafbeelding">
  <figcaption>Raster</figcaption>
</figure>

* [Vectorafbeeldingen](http://nl.wikipedia.org/wiki/Vectorafbeelding){: .external } maken gebruik van lijnen, punten en polygonen om een afbeelding weer te geven.
* [Rasterafbeeldingen](http://nl.wikipedia.org/wiki/Rasterafbeelding){: .external } geven een afbeelding weer door de afzonderlijke waarden van elke pixel in een rechthoekig rooster te coderen.

Beide typen afbeeldingen hebben hun eigen voor- en nadelen. Vectorafbeeldingen zijn ideaal voor de weergave van eenvoudige geometrische vormen (bijv. logo's, tekst, pictogrammen, enzovoort) en leveren scherpe resultaten op in elke resolutie en zoomfactor. Hierdoor zijn vectorafbeeldingen bij uitstek geschikt voor schermen met hoge resolutie en voor items die in verschillende groottes moeten worden weergegeven.

Vectorafbeeldingen zijn echter niet geschikt voor de weergave van complexe scenes, zoals foto`s. De vereiste hoeveelheid SVG-opmaak voor alle vormen kan enorm zijn, zonder dat dit altijd tot realistische resultaten leidt. Als dit het geval is, kunt u beter kiezen voor een rasterafbeelding, zoals GIF, PNG, JPEG of een van de nieuwere bestandstypen als JPEG-XR en WebP.

Rasterafbeeldingen zijn in tegenstelling tot vectorafbeeldingen wel gevoelig voor wijzigingen in resolutie of zoomfactor. Als u een rasterafbeelding vergroot, worden de voorwerpen blokkerig en wazig. Hierdoor kan het zijn dat u meerdere versies van een rasterafbeelding met verschillende resoluties nodig heeft om aan de vereisten van uw gebruikers tegemoet te komen.


## Gevolgen van schermen met hoge resoluties

### TL;DR {: .hide-from-toc }
- Schermen met hoge resolutie hebben meerdere apparaatpixels per CSS-pixel
- Afbeeldingen met een hoge resolutie hebben een aanzienlijk hoger aantal pixels en bytes
- Optimalisatietechnieken voor afbeeldingen zijn hetzelfde voor lage en hoge resolutie


Wanneer we het hebben over pixels in een afbeelding, moeten we onderscheid maken tussen verschillende soorten pixels: CSS-pixels en apparaatpixels. Een enkele CSS-pixel kan meerdere apparaatpixels bevatten. Een enkele CSS-pixel kan corresponderen met een enkele of meerdere apparaatpixels. Hoe werkt dit? Hoe meer apparaatpixels er zijn, des te gedetailleerder de inhoud op het scherm wordt weergegeven.

<img src="images/css-vs-device-pixels.png" class="center" alt="CSS-pixels en apparaatpixels">

Schermen met hoge resolutie leveren prachtige beelden, maar dit houdt wel in dat onze afbeeldingitems gedetailleerder moeten zijn om te kunnen profiteren van het grote aantal apparaatpixels. Het goede nieuws is dat vectorafbeeldingen uitermate geschikt zijn voor deze taak, omdat ze op vrijwel elke resolutie scherpe resultaten opleveren. De verwerkingskosten voor het fijnere detail kunnen wat hoger uitvallen, maar het item blijft hetzelfde en is niet afhankelijk van de resolutie.

Rasterafbeeldingen vormen een groter probleem, omdat de afbeelding pixel voor pixel moet worden gecodeerd. Hoe groter het aantal pixels, des te groter het bestand wordt. Laten we als voorbeeld het verschil bekijken voor een foto-item met 100x100 (CSS) pixels:

<table>
<thead>
  <tr>
    <th>Schermresolutie</th>
    <th>Totaal aantal pixels</th>
    <th>Ongecomprimeerde bestandsgrootte (4 bytes per pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="resolutie">1x</td>
  <td data-th="totaal aantal pixels">100 x 100 = 10.000</td>
  <td data-th="bestandsgrootte">40.000 bytes</td>
</tr>
<tr>
  <td data-th="resolutie">2x</td>
  <td data-th="totaal aantal pixels">100 x 100 x 4 = 40.000</td>
  <td data-th="bestandsgrootte">160.000 bytes</td>
</tr>
<tr>
  <td data-th="resolutie">3x</td>
  <td data-th="totaal aantal pixels">100 x 100 x 9 = 90.000</td>
  <td data-th="bestandsgrootte">360.000 bytes</td>
</tr>
</tbody>
</table>

Wanneer we de resolutie van het scherm verdubbelen, neemt het totale aantal pixels toe met een factor vier: verdubbel het aantal horizontale pixels en vermenig dit met het dubbele aantal verticale pixels. Dus 2x de resolutie van het scherm, betekent 4x het vereiste aantal pixels.

Wat houdt dit in de praktijk in? Schermen met een hoge resolutie leveren prachtige beelden op, wat een product goed van pas kan komen. Schermen met een hoge resolutie vergen echter ook afbeeldingen met een hoge resolutie: kies daarom wanneer mogelijk voor vectorafbeeldingen, want deze zijn niet afhankelijk van de resolutie en leveren altijd scherpe resultaten op. Als een rasterafbeelding vereist is, kunt u het beste meerdere, geoptimaliseerde versies van elk afbeelding leveren. Lees verder voor meer informatie.


## Vectorafbeeldingen optimaliseren

### TL;DR {: .hide-from-toc }
- SVG is een bestandsindeling voor XML-afbeeldingen
- SVG-bestanden moeten worden verkleind om de omvang te reduceren
- SVG-bestanden moeten worden gecomprimeerd met GZIP


Alle moderne browsers ondersteunen Scalable Vector Graphics (SVG), een XML-bestandsindeling voor tweedimensionele afbeeldingen. We kunnen de SVG-opmaak rechtstreeks in de pagina integreren, of als externe hulpbron aanbieden. Een SVG-bestand kan met de meeste tekensoftware voor vectorafbeeldingen worden gemaakt, of handmatig in uw favoriete tekstverwerkingsprogramma.


    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
    <g id="XMLID_1_">
      <g>
        <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
      </g>
    </g>
    </svg>
    

Bovenstaand voorbeeld is een eenvoudige zwarte cirkel met zwarte contour en rode achtergrond. De afbeelding werd geëxporteerd uit Adobe Illustrator. Zoals u kunt zien, bevat het item veel metadata, zoals layer-informatie , commentaar en XML-namen die vaak niet nodig zijn om de afbeelding in de browser weer te geven. Het is daarom altijd een goed idee om uw SVG-bestanden te verkleinen met behulp van een tool als [svgo](https://github.com/svg/svgo){: .external }.

In dit geval kan het SVG-bestand uit Illustrator met 58% worden verkleind en wordt de omvang van 470 bytes teruggebracht naar 199 bytes. Omdat SVG een XML-indeling is, kunnen we de overdrachtsgrootte ook met GZIP terugbrengen - zorg ervoor dat uw server is geconfigureerd voor compressie van SVG-items.


## Rasterafbeeldingen optimaliseren

### TL;DR {: .hide-from-toc }
- Een rasterafbeelding is een raster met pixels
- Elke pixel bevat informatie over kleur en transparantie
- Programma's voor beeldcompressie gebruiken verscheidene technieken om het aantal benodigde bits per pixel te verlagen en zo de omvang van de afbeelding te verkleinen


Een rasterafbeelding is een eenvoudig tweedimensionaal raster met afzonderlijke pixels. Een afbeelding van 100 x 100 pixels bestaat uit 10.000 pixels. In elke pixel zijn de [RGBA](http://en.wikipedia.org/wiki/RGBA_color_space){: .external } waarden opgeslagen: (R) rood kanaal, (G) groen kanaal, (B) blauw kanaal en (A) alfa (transparant) kanaal.

De browser kent aan elk kanaal 256 kleuren (tinten) toe. Dit zijn 8 bits per kanaal (2 ^ 8 = 256) en 4 bytes per pixel (4 kanalen x 8 bits = 32 bits = 4 bytes). Als we de afmetingen van het raster weten, kunnen we eenvoudig de bestandsgrootte berekenen:

* Afbeelding van 100 x 100px bestaat uit 10.000 pixels
* 10.000 pixels x 4 bytes = 40.000 bytes
* 40.000 bytes / 1024 = 39 KB



Note: Ongeacht de bestandsindeling van de afbeelding die van de server naar de client wordt gedownload, neemt elke pixel tijdens decodering door de browser altijd 4 bytes aan geheugen in beslag. Dit kan een belangrijke beperking zijn voor grote afbeeldingen of voor apparaten die niet veel geheugen hebben, bijv. eenvoudige mobiele telefoons.

<table>
<thead>
  <tr>
    <th>Afmetingen</th>
    <th>Pixels</th>
    <th>Bestandsgrootte</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="afmetingen">100 x 100</td>
  <td data-th="pixels">10.000</td>
  <td data-th="bestandsgrootte">39 KB</td>
</tr>
<tr>
  <td data-th="afmetingen">200 x 200</td>
  <td data-th="pixels">40.000</td>
  <td data-th="bestandsgrootte">156 KB</td>
</tr>
<tr>
  <td data-th="afmetingen">300 x 300</td>
  <td data-th="pixels">90.000</td>
  <td data-th="bestandsgrootte">351 KB</td>
</tr>
<tr>
  <td data-th="afmetingen">500 x 500</td>
  <td data-th="pixels">250.000</td>
  <td data-th="bestandsgrootte">977 KB</td>
</tr>
<tr>
  <td data-th="afmetingen">800 x 800</td>
  <td data-th="pixels">640.000</td>
  <td data-th="bestandsgrootte">2500 KB</td>
</tr>
</tbody>
</table>

39 KB lijkt voor een afbeelding van 100x100 pixels niet veel, maar de bestandsgrootte neemt voor grotere afbeeldingen enorm toe, waardoor extra tijd en kosten nodig zijn om afbeeldingitems te downloaden. Wat we tot nu beschreven hebben, is de niet-gecomprimeerde bestandsindeling. Wat kunnen we doen om de bestandsgrootte te reduceren?

Een eenvoudige strategie is om de bitdiepte van de afbeelding van 8-bits per kanaal te verlagen naar een beperkter kleurenspectrum: 8 bits per kanaal levert 256 waarden per kanaal op en 16.777.216 (2563) kleuren in totaal. Wat gebeurt er als we het spectrum terugbrengen naar 256 kleuren? We hebben dan in totaal slechts 8 bits nodig voor de RGB-kanalen en besparen direct 2 bytes per pixel. Dat is een besparing van 50% tegenover de 4 bytes per pixel vóór compressie.

<img src="images/artifacts.png" class="center" alt="Vervorming door compressie">

Note: Links naar rechts (PNG): 32-bits (16 M kleuren), 7-bits (128 kleuren), 5-bits (32 kleuren). Voor complexe scenes met geleidelijk kleurverloop (overgangen, lucht, enzovoort) is een groter kleurenspectrum vereist om vervorming zoals de geblokte lucht in het 5-bits item te voorkomen. Als in de afbeelding echter slechts een paar kleuren aanwezig zijn, is het zonde van de extra bits om een groot kleurenspectrum te gebruiken.

Wanneer we de opgeslagen gegevens in afzonderlijke pixels hebben geoptimaliseerd, dienen we ook naar naburige pixels te kijken: veel afbeeldingen, inclusief foto`s, hebben veel naburige pixels met vergelijkbare kleuren, zoals afbeeldingen van de lucht, herhaalde texturen, enzovoort. We kunnen hiervan profiteren door de compressor `[delta-coderen](http://en.wikipedia.org/wiki/Delta_encoding){: .external }` toe te laten passen, waarbij niet de individuele waarden voor elke pixel worden opgeslagen, maar het verschil tussen naburige pixels. Als de naburige pixels hetzelfde zijn, is de delta `nul` en hoeven we slechts een enkele bit op te slaan. Maar er is meer...

Het menselijk oog is niet voor elke kleur even gevoelig: we kunnen het spectrum voor de betreffende kleuren vergroten of verkleinen om onze kleurcodering te optimaliseren.
Naburige pixels vormen een tweedimensionaal raster. Dit betekent dat pixels meerdere buren hebben. We kunnen dit feit gebruiken om deltacodering verder te verbeteren.
We hoeven niet per se naar de directe buren van elke pixel te kijken, maar kunnen ons concentreren op grotere blokken naburige pixels en verschillende blokken verschillend coderen. Enzovoorts...

Zoals u zich kunt voorstellen, kan beeldoptimalisatie al snel ingewikkeld worden (of interessant, hoe u het bekijkt). Dit is dan ook een actief onderwerp voor wetenschappelijk en commercieel onderzoek. Afbeeldingen nemen een hoop bytes in beslag en het is daarom belangrijk om betere beeldcompressietechnieken te ontwikkelen. Ga voor meer informatie naar de [Wikipedia-pagina](http://nl.wikipedia.org/wiki/Beeldcompressie){: .external }, of lees het [WebP witboek over compressietechnieken](/speed/webp/docs/compression) voor een praktijkvoorbeeld.

Dit is allemaal erg interessant, maar ook vrij wetenschappelijk: hoe kunnen we in de praktijk afbeeldingen op onze pagina's optimaliseren? We zullen geen nieuwe compressietechnieken ontwikkelen, maar het is nuttig om te weten uit welke aspecten het probleem bestaat: RGBA-pixels, bitdiepte en verschillende optimalisatietechnieken. Dit zijn essentiële concepten die we moeten begrijpen en in gedachten moeten houden voordat we het gaan hebben over verschillende typen rasterafbeeldingen.


## Compressie met en zonder verlies

### TL;DR {: .hide-from-toc }
- Vanwege de werking van onze ogen kunnen afbeeldingen goed met verlies worden gecomprimeerd - Beeldoptimalisatie wordt bereikt door compressietechnieken met en zonder verlies - De bestandsindeling van geoptimaliseerde afbeeldingen is afhankelijk van de algoritmen die worden gebruikt om de afbeeldingen te comprimeren - Er bestaat geen universele beste bestandsindeling of `kwaliteitsinstelling` die voor alle afbeeldingen werkt. Elke combinatie van compressievoorkeur en afbeelding levert een uniek resultaat op


Voor bepaalde gegevenstypen, zoals broncode voor een pagina of een uitvoerbaar bestand, is het erg belangrijk dat een compressor de oorspronkelijke gegevens niet wijzigt of verliest: een enkele ontbrekende of gewijzigde bit kan de betekenis van de bestandsinhoud volledig wijzigen, of zelfs onbruikbaar maken. Voor sommige typen gegevens, zoals afbeeldingen, audio en video, kan het geen kwaad om een minder dan exacte weergave van de oorspronkelijke gegevens aan te bieden.

Onze ogen vullen sommige deeltjes van de informatie over elke pixel van nature op, zodat we de bestandsgrootte van een afbeelding kunnen reduceren. Onze ogen zijn bijvoorbeeld niet voor alle kleuren even gevoelig. Dit houdt in dat we minder bits hoeven te gebruiken om sommige kleuren te coderen. Een typisch beeldoptimalisatieproces bestaat daarom uit twee stappen:

1. De afbeelding wordt `[met verlies](http://en.wikipedia.org/wiki/Lossy_compression){: .external }` verwerkt door een filter dat sommige pixelgegevens verwijdert
2. De afbeelding wordt `[zonder verlies](http://en.wikipedia.org/wiki/Lossless_compression){: .external }` verwerkt door een filter dat de pixelgegevens comprimeert

**De eerste stap is optioneel en het exacte algoritme is afhankelijk van de bestandsindeling. Wat belangrijk is om te weten, is dat elke afbeelding met verlies kan worden gecomprimeerd om de bestandsgrootte te reduceren.**Het verschil tussen verschillende bestandsindelingen zoals GIF, PNG, JPEG en andere zit hem in de combinatie van de specifieke algoritmen die worden gebruikt (of weggelaten) tijdens de verwerkingsstappen met of zonder verlies.

Wat is de optimale configuratie voor optimalisatie met en zonder verlies? Het antwoord is afhankelijk van de inhoud van de afbeelding en uw eigen criteria, zoals de afweging tussen bestandsgrootte en vervorming die optreedt bij compressie met verlies. In sommige gevallen zult u kiezen voor compressie zonder verlies om fijne details met de beste kwaliteit weer te geven, in andere gevallen kunt u er de voorkeur aan geven om de bestandsgrootte van een afbeeldingitem te reduceren met behulp van compressie met verlies. Deze afweging moet u zelf maken, er bestaat geen universele instelling.

<img src="images/save-for-web.png" class="center" alt="Opslaan voor internet">

Als u bijvoorbeeld een bestandsindeling met verlies kiest, zoals JPEG, kunt u het kwaliteitsniveau handmatig instellen (bijv. met behulp van de schuifbalk voor de functie `Opslaan voor internet` in Adobe Photoshop). Dit is meestal een getal tussen 1 en 100 waarmee tussen een aantal algoritmen met en zonder verlies wordt gekozen. Voor de beste resultaten kunt u experimenteren met verschillende kwaliteitsinstellingen voor uw afbeeldingen. Probeer gerust de kwaliteit te verlagen - het zichtbare resultaat is vaak erg goed en u kunt de bestandsgrootte flink verkleinen.

Note: U kunt kwaliteitsniveaus van verschillende bestandsindelingen niet met elkaar vergelijken, vanwege de verschillende algoritmes die worden gebruikt om de afbeelding te coderen: een JPEG-afbeelding met kwaliteit 90 levert een heel ander resultaat op dan een WebP-afbeelding met kwaliteit 90. Zelfs gelijke kwaliteitsniveaus voor dezelfde bestandsindeling kunnen met dezelfde compressor zichtbaar andere resultaten opleveren.


## De juiste bestandsindeling voor uw afbeelding kiezen

### TL;DR {: .hide-from-toc }
- Begin met selectie van de juiste algemene bestandsindeling: GIF, PNG, JPEG
- Experimenteer met de instellingen voor elke bestandsindeling en selecteer de beste instellingen: voor kwaliteit, kleurenspectrum, enzovoort.
- U kunt overwegen om WebP- en JPEG XR-items toe te voegen aan geschaalde afbeeldingen voor moderne clients: null
- Items schalen is een van de eenvoudigste en effectiefste optimalisatiemethoden
- Let goed op met grote items, omdat deze tot een aanzielijk overschot kunnen leiden
- Verlaag het aantal overbodige pixels door uw afbeeldingen te verkleinen naar de schaal waarop ze worden weergegeven op het scherm


Naast verschillende algoritmen met en zonder verlies ondersteunen verschillende bestandsindelingen andere functies, zoals animatie- en transparatie (alfa) kanalen. De keuze voor de `juiste` bestandsindeling is dan ook een combinatie van het gewenste visuele effect en de vereiste functionaliteit.


<table>
<thead>
  <tr>
    <th>Bestandsindeling</th>
    <th>Transparantie</th>
    <th>Animatie</th>
    <th>Browser</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="bestandsindeling"><a href="http://nl.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="transparantie">Ja</td>
  <td data-th="animatie">Ja</td>
  <td data-th="browser">Alle</td>
</tr>
<tr>
  <td data-th="bestandsindeling"><a href="http://nl.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="transparantie">Ja</td>
  <td data-th="animatie">Nee</td>
  <td data-th="browser">Alle</td>
</tr>
<tr>
  <td data-th="bestandsindeling"><a href="http://nl.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="transparantie">Nee</td>
  <td data-th="animatie">Nee</td>
  <td data-th="browser">Alle</td>
</tr>
<tr>
  <td data-th="bestandsindeling"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="transparantie">Ja</td>
  <td data-th="animatie">Ja</td>
  <td data-th="browser">IE</td>
</tr>
<tr>
  <td data-th="bestandsindeling"><a href="http://nl.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="transparantie">Ja</td>
  <td data-th="animatie">Ja</td>
  <td data-th="browser">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Er zijn drie algemeen ondersteunde bestandsindelingen: GIF, PNG en JPEG. Naast deze bestandsindelingen ondersteunen sommige browsers ook nieuwere indelingen, zoals WebP en JPEG XR, die een betere algehele compressie en meer functies bieden. Welke bestandsindeling kunt u het beste gebruiken?

<img src="images/format-tree.png" class="center" alt="Opslaan voor internet">

1. **Heeft u animatie nodig? Zo ja, dan is GIF de enige universele keuze.**
  * GIF beperkt het kleurenspectrum tot maximaal 256 kleuren. Deze indeling is daarom een slechte keuze voor de meeste afbeeldingen. Bovendien levert PNG-8 betere compressie voor afbeeldingen met een klein kleurenspectrum. GIF is daarom alleen de beste keuze wanneer u animatie nodig heeft.
1. **Wilt u fijne details behouden met de hoogste resolutie? Gebruik PNG.**
  * PNG past geen algoritmen met verlies toe, afgezien van de keuze voor de omvang van het kleurenspectrum. Dit levert afbeeldingen van de hoogste kwaliteit op met een aanzienlijk grotere omvang dan andere bestandsindelingen. Weeg de keuze voor deze indeling goed af.
  * Als het afbeeldingitem uit geometrische figuren bestaat, kunt u het het beste eerst converteren naar een vector (SVG) indeling.
  * Let op als het afbeeldingitem tekst bevat. Tekst in afbeeldingen kan niet worden geselecteerd, opgezocht of in- of uitgezoomd. Als u een aangepaste look wilt (voor merkbekendheid of om andere redenenen), kunt u beter een weblettertype gebruiken.
1. **Wilt u een foto, screenshot of vergelijkbaar afbeeldingitem optimaliseren? Gebruik dan JPEG.**
  * JPEG maakt gebruik van een combinatie van compressie met en zonder verlies om de bestandsgrootte van het item te reduceren. Probeer verschillende kwaliteitsniveaus uit om de beste middenweg te vinden tussen kwaliteit en bestandsgrootte.

Wanneer u de optimale bestandsindeling voor elk van uw items heeft bepaald, kunt u overwegen om een extra variant toe te voegen in WebP- of JPEG XR-indeling. Dit zijn twee nieuwe indelingen die (nog) niet universeel worden ondersteund door alle browsers. Toch kunnen deze u voor nieuwere clients aanzienlijke besparingen opleveren. Zo biedt WebP een [30% kleinere bestandsgrootte](/speed/webp/docs/webp_study) dan een vergelijkbare JPEG-afbeelding.

Aangezien WebP en JPEG XR niet algemeen worden ondersteund, moet u extra logaritmen aan uw applicatie of server toevoegen om afbeeldingen in deze indelingen aan te bieden:

* Sommige CDN's bieden beeldoptimalisatie aan, onder andere voor JPEG XR en WebP.
* Sommige open source tools (bijv. PageSpeed voor Apache of Nginx) automatiseren de optimalisatie, conversie en levering van items.
* U kunt extra logaritmen aan de applicatie toevoegen om de client te ontdekken, te controleren welke indelingen worden ondersteund en het best beschikbare afbeeldingitem te leveren.

Indien u een Webview gebruikt om inhoud op uw applicatie te renderen, heeft u volledige controle over de client en heeft u de mogelijkheid om uitsluitend WebP te gebruiken. Facebook, Google+ en vele anderen gebruiken WebP voor alle afbeeldingen in hun applicaties. Het aantal bytes dat u bespaart is het absoluut waard. Bekijk de presentatie [WebP: Deploying Faster, Smaller, and More Beautiful Images (WebP: Snellere, kleinere en mooiere afbeeldingen leveren)](https://www.youtube.com/watch?v=pS8udLMOOaE) van Google I/O 2013.


## Afstellen van tools en parameters

Er is geen perfecte bestandsindeling voor afbeeldingen, geen perfecte tool of perfecte verzameling optimalisatieparameters die voor alle afbeeldingen werken. Voor het beste resultaat moet u de bestandsindeling en instellingen kiezen die het beste passen bij de inhoud van de afbeelding en de visuele en andere technische vereisten.

<table>
<thead>
  <tr>
    <th>Tool</th>
    <th>Beschrijving</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="tool"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="beschrijving">GIF-afbeeldingen maken en optimaliseren</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="beschrijving">JPEG-afbeeldingen optimaliseren</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="beschrijving">PNG-optimalisatie zonder verlies</td>
</tr>
<tr>
  <td data-th="tool"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="beschrijving">PNG-optimalisatie met verlies</td>
</tr>
</tbody>
</table>


Experimenteer naar wens met de parameters van elke compressor. Verlaag de kwaliteit, bekijk het resultaat en probeer het indien nodig met een andere instelling. Heeft u eenmaal de juiste instellingen gevonden, kunt u deze op andere, vergelijkbare afbeeldingen op uw site toepassen. Ga er echter niet vanuit dat alle afbeeldingen met dezelfde instellingen kunnen worden gecomprimeerd.


## Geschaalde afbeeldingitems leveren



Beeldoptimalisatie komt neer op twee criteria: het aantal bytes optimaliseren dat wordt gebruikt om elke pixel te coderen, en het totale aantal pixels optimaliseren. De bestandsgrootte van de afbeelding is het totale aantal pixels vermenigvuldigd met het aantal bytes dat gebruikt wordt om elk pixel te coderen. Niet meer en niets minder.

Een van de eenvoudigste en meest effectieve optimalisatietechnieken is daarom ervoor te zorgen dat we niet meer pixels aanbieden dan nodig zijn om het item op de bedoelde grootte in de browser weer te geven. Klinkt simpel, toch? Veel afbeeldingen op de meeste pagina's slagen niet voor deze test. Vaak worden grotere items aangeboden en wordt ervan uitgegaan dat de browser deze wel zal verkleinen en op een lagere resolutie zal weergeven, wat extra CPU-gebruik vergt.

<img src="images/resized-image.png" class="center" alt="Verkleinde afbeelding">

Note: Als u in Chrome DevTools de muiscursor op de afbeelding plaatst, worden de "natuurlijke" en de "scherm"grootte van het afbeeldingitem getoond. In bovenstaand voorbeeld wordt een afbeelding met 300x260 pixels gedownload en vervolgens verkleind naar 245x212 pixels op de client waarop de afbeelding wordt weergegeven.

Wanneer we overbodige pixels leveren die vervolgens door de browser voor ons worden verwijderd, lopen we een grote kans mis om het totale aantal vereiste bytes te verlagen en optimaliseren. Verkleinen heeft niet alleen te maken met het aantal pixels waarmee de omvang van de afbeelding wordt teruggebracht, maar ook met de natuurlijke grootte van de afbeelding.

<table>
<thead>
  <tr>
    <th>Natuurlijke grootte</th>
    <th>Schermgrootte</th>
    <th>Overbodige pixels</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="natuurlijk">110 x 110</td>
  <td data-th="scherm">100 x 100</td>
  <td data-th="overschot">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="natuurlijk">410 x 410</td>
  <td data-th="scherm">400 x 400</td>
  <td data-th="overschot">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="natuurlijk">810 x 810</td>
  <td data-th="scherm">800 x 800</td>
  <td data-th="overschot">810 x 810 - 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

In alle bovenstaande gevallen is de schermgrootte `slechts 10 pixels kleiner` dan de natuurlijke grootte van de afbeelding. Het aantal extra pixels dat gecodeerd en gedownload moet worden is echter aanzienlijk groter dan de natuurlijke grootte. U kunt niet garanderen dat elk item op de exacte schermgrootte wordt aangeboden, en daarom **moet u ervoor zorgen dat het aantal overbodige pixels tot een minimum wordt beperkt en dat met name uw grootste items zo mogelijk op de schermgrootte worden aangeboden.**

## Checklist voor beeldoptimalisatie

Beeldoptimalisatie is zowel een kunst als een wetenschap: een kunst omdat er geen definitief antwoord is op de vraag hoe je een afbeelding het beste comprimeert, en een wetenschap omdat er veel goed ontwikkelde technieken en algoritmen bestaan waarmee de omvang van afbeeldingen aanzienlijk kan worden verkleind.

Enkele tips en technieken om rekening mee te houden als u uw afbeeldingen wilt optimaliseren:

* **Geef de voorkeur aan vectorafbeeldingen:** vectorafbeeldingen zijn niet afhankelijk van resolutie en schaal, waardoor ze ideaal zijn voor verschillende apparaten en hoge resoluties.
* **Verklein en comprimeer SVG-items:** XML-opmaak in de meeste tekenapplicaties bevat vaak overbodige metadata die u kunt verwijderen. Controleer of uw servers zijn geconfigureerd voor GZIP-compressie van SVG-items.
* **Kies de beste bestandsindeling voor rasterafbeeldingen:** bepaal de vereiste functies en selecteer de bestandsindeling die het best geschikt is voor elk afzonderlijk item.
* **Experimenteer met de optimale kwaliteitsinstellingen voor rasterafbeeldingen:** probeer lagere kwaliteitsinstellingen, de resultaten zijn vaak erg goed en u kunt een aanzienlijke hoeveelheid bytes besparen.
* **Verwijder overbodige metadata van afbeeldingen:** veel rasterafbeeldingen bevatten onnodige metadata over het item: geografische informatie, camera-informatie, enzovoort. Gebruik de juiste tools om deze informatie te verwijderen.
* **Bied geschaalde afbeeldingen aan:** verklein afbeeldingen op de server en zorg ervoor dat de schermgrootte zo dicht mogelijk bij de natuurlijke grootte van de afbeelding ligt. Let goed op grote afbeeldingen, omdat deze de grootste besparingen kunnen opleveren wanneer ze worden verkleind.
* **Automatiseer, automatiseer, automatiseer:** investeer in automatiseringstools en -infrastructuur om te garanderen dat al uw afbeeldingitems altijd geoptimaliseerd zijn.




