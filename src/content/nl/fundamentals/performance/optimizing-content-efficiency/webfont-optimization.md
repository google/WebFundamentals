project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Typografie is een fundamenteel onderdeel van goed design, merkbekendheid, leesbaarheid en toegankelijkheid. Met weblettertypen kunt u al deze criteria en meer realiseren: de tekst kan worden geselecteerd, er kan in de tekst worden gezocht, de tekst kan worden in- en uitgezoomd en is geschikt voor hoge resoluties waarbij de tekst consistent en scherp wordt weergegeven, ongeacht de schermomvang en -resolutie.

{# wf_updated_on: 2014-09-29 #}
{# wf_published_on: 2014-09-19 #}

# Optimalisatie van weblettertypen {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



Typografie is een fundamenteel onderdeel van goed design, merkbekendheid, leesbaarheid en toegankelijkheid. Met weblettertypen kunt u al deze criteria en meer realiseren: de tekst kan worden geselecteerd, er kan in de tekst worden gezocht, de tekst kan worden in- en uitgezoomd en is geschikt voor hoge resoluties waarbij de tekst consistent en scherp wordt weergegeven, ongeacht de schermomvang en -resolutie. Weblettertypen zijn essentieel voor goed design, gebruiksvriendelijkheid en een goed resultaat.


De optimalisatie van lettertypen is een essentieel onderdeel van het algehele resultaat. Elk lettertype is een extra hulpbron en sommige lettertypen kunnen weergave van de tekst verhinderen, maar het feit alleen dat de pagina weblettertypen gebruikt, wil nog niet zeggen dat de weergave langzamer moet zijn. Een geoptimaliseerd lettertype in combinatie met een goed afgewogen strategie voor het laden en toepassen op de pagina kan eraan bijdragen om de totale pagina-omvang te reduceren en pagina`s sneller weer te geven.

## Anatomie van een weblettertype

### TL;DR {: .hide-from-toc }
- Unicode-lettertypes kunnen duizenden gliefen bevatten
- Er zijn vier bestandsindelingen voor lettertypen: WOFF2, WOFF, EOT, TTF
- Voor sommige lettertype-indelingen is compressie met GZIP nodig


Een weblettertype is een verzameling gliefen, en elke glief is een vectorvorm die staat voor een letter of een symbool. De omvang van een lettertypebestand is daarom afhankelijk van twee variabelen: de complexiteit van de vectorpaden van elke glief en het aantal gliefen in het lettertype. Open Sans bijvoorbeeld, een van de populairste weblettertypen, bestaat uit 897 gliefen, waaronder tekens uit het Latijnse, Griekse en Cyrillische alfabet.

<img src="images/glyphs.png" class="center" alt="Tabel lettertypegliefen">

Wanneer u een lettertype uitkiest, moet u er rekening mee houden welke verzamelingen tekens worden ondersteund. Voor de vertaling van uw pagina in meerdere talen, kiest u een lettertype met een consistente look en gebruiksvriendelijkheid voor uw gebruikers. [De lettertypefamilie Noto van Google](https://www.google.com/get/noto/){: .external } ondersteunt alle talen ter wereld. De totale omvang van Noto, met alle talen, is dan ook meer dan 130 MB als ZIP-bestand. 

Lettertypen op internet moeten dus zorgvuldig worden ontwikkeld om ervoor te zorgen dat de typografie geen belemmering vormt voor de weergave van pagina`s. Internet biedt gelukkig alle noodzakelijke standaardbenodigdheden en later in deze leidraad zullen we bespreken hoe we het beste van beide kanten kunnen combineren.

### Bestandsindelingen voor lettertypen

Er bestaan tegenwoordig vier containerindelingen op internet: [EOT](http://en.wikipedia.org/wiki/Embedded_OpenType){: .external }, [TTF](http://nl.wikipedia.org/wiki/TrueType), [WOFF](http://en.wikipedia.org/wiki/Web_Open_Font_Format) en [WOFF2](http://www.w3.org/TR/WOFF2/). Ondanks de uitgebreide keuzemogelijkheid, bestaat er geen enkele universele indeling die werkt voor alle oude en nieuwe browsers: EOT is [alleen IE](http://caniuse.com/#feat=eot), TTF heeft [gedeeltelijke IE-ondersteuning](http://caniuse.com/#search=ttf), WOFF heeft de breedste ondersteuning, maar is [niet beschikbaar in sommige oudere browsers](http://caniuse.com/#feat=woff), en ondersteuning voor WOFF 2.0 is [voor de meeste browsers nog in ontwikkeling](http://caniuse.com/#feat=woff2).

Wat houdt dit voor ons in? Er is geen enkele indeling die in alle browsers werkt, wat betekent dat we meerdere indelingen moeten aanbieden voor een consistent resultaat:

* Bied WOFF 2.0 aan als variant voor browsers die deze indeling ondersteunen
* Bied WOFF aan als variant voor het merendeel van de browsers
* Bied TTF aan als variant voor verouderde Android-browsers (lager dan 4.4)
* Bied EOT aan als variant voor verouderde IE-browsers (lager dan IE9)
^

Note: Er is in principe ook nog de <a href='http://caniuse.com/svg-fonts'>SVG `font container`</a>, maar deze werd nooit ondersteund in IE of Firefox, en wordt nu ook afgewezen in Chrome. Deze is daarom van weining praktisch nut en wordt in deze leidraad weggelaten.

### De omvang van lettertypen verlagen door compressie

Een lettertype is een verzameling gliefen, die elk bestaan uit paden die de vorm van de letter beschrijven. De afzonderlijke gliefen zijn natuurlijk verschillend, maar ze bevatten toch veel vergelijkbare informatie die kan worden gecomprimeerd met GZIP of een andere geschikte compressor: 

* De indelingen EOT en TTF worden standaard niet gecomprimeerd. Zorg ervoor dat uw servers zijn geconfigureerd voor toepassen van [GZIP-compressie](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) wanneer deze bestandsindelingen worden aangeboden.
* WOFF heeft ingebouwde compressie - controleer of uw WOFF-compressor optimaal is ingesteld. 
* WOFF2 maakt gebruik van aangepaste voorverwerkings- en compressie-algoritmen waarmee een ongeveer 30% grotere reductie wordt behaald in vergelijking tot andere bestandsindelingen - zie [rapport](http://www.w3.org/TR/WOFF20ER/){: .external }.

Sommige lettertype-indelingen bevatten extra metadata, zoals informatie voor [hinten](http://nl.wikipedia.org/wiki/Hinten){: .external } en [overhang](http://nl.wikipedia.org/wiki/Overhang_(typografie)) die niet noodzakelijk is op sommige platformen, waardoor de bestandsgrootte verder kan worden geoptimaliseerd. Controleer uw lettertypecompressor op beschikbare optimalisatie-opties en zorg dat u over de juiste infrastructuur beschikt om deze geoptimaliseerde lettertypen aan elke afzonderlijke browser te leveren. Google Fonts bevat bijvoorbeeld meer dan 30 geoptimaliseerde varianten voor elk lettertype en ontdekt en levert automatisch de optimale variant voor elk platform en elke browser.

Note: Gebruik <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli-compressie</a> voor de bestandsindelingen EOT, TTF en WOFF. Zopfli is een compressor die geschikt is voor zlib en biedt een ongeveer 5% grotere reductie in bestandsgrootte dan Gzip.

## De lettertypefamilie definiëren met @font-face

### TL;DR {: .hide-from-toc }
- Gebruik de hint format() om meerdere lettertype-indelingen aan te geven
- Deel grote unicode-lettertypen in in deelverzamelingen en houd een handmatig in te stellen reservedeelverzameling achter de hand voor oudere browsers
- Verlaag het aantal stilistische lettertypen, zodat pagina''s en tekst beter kan worden weergegeven


Met de @font-face CSS-regel kunnen we de locatie van een bepaalde lettertype-hulpbron definiëren, samen met de stijleigenschappen en de Unicode-codepoints waarvoor de hulpbron dient te worden gebruikt. Een combinatie van dergelijke @font-face-regels kan worden gebruikt om een `lettertypefamilie` samen te stellen die de browser gebruikt om vast te stellen welke lettertype-hulpbronnen moeten worden gedownload en toegepast op de actuele pagina. Laten we hier nader op ingaan.

###Selectie van een lettertype

Elke @font-face-regel bevat de naam van de lettertypefamilie, die fungeert als logische groep met meerdere regels [eigenschappen van het lettertype](http://www.w3.org/TR/css3-fonts/#font-prop-desc), zoals stijl, gewicht en stretch, en de [src-descriptor](http://www.w3.org/TR/css3-fonts/#src-desc) die een lijst met voorrangslocaties definieert voor de lettertype-hulpbron.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('ttf'),
           url('/fonts/awesome.eot') format('eot');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('ttf'),
           url('/fonts/awesome-i.eot') format('eot');
    }


In bovenstaand voorbeeld wordt een enkele _Awesome Font-familie weergegeven met twee verschillende stijlen (normal en _italic_). Beide verwijzen naar een andere verzameling lettertype-hulpbronnen. Elke `src`-descriptor bevat een door een komma gescheiden lijst met voorrangsvarianten van hulpbronnen: 

* de regel `local()` laat ons lokaal opgeslagen lettertypen laden, gebruiken en ernaar verwijzen.
* de regel `url()` laat ons externe lettertypen laden die de optionele hint `format()` kunnen hebben om de bestandsindeling van het lettertype aan te geven waarnaar in de URL wordt verwezen.

^
Note: Tenzij u verwijst naar een van de standaard systeemlettertypen, komt het zelden voor dat gebruikers Zopfli hebben geïnstalleerd, met name op mobiele apparaten waarop het onmogelijk is om extra lettertypen te installeren. U moet daarom altijd een lijst verstrekken met de locatie van externe lettertypen.

Wanneer de browser vaststelt dat het lettertype nodig is, gaat deze de lijst met hulpbronnen in de aangegeven volgorde af en probeert de browser de juiste hulpbron te laden. Zoals in bovenstaand voorbeeld:

1. Browser geeft de lay-out van de pagina weer en bepaalt welke varianten van de lettertypes nodig zijn om de tekst op de pagina weer te geven.
2. Voor elk benodigd lettertype controleert de browser of het lettertype lokaal aanwezig is.
3. Als het bestand niet lokaal is opgeslagen, zoekt de browser naar externe definities:
  * Als een hint aanwezig is, controleert de browser vóór de download of deze het aanbevolen lettertype ondersteunt en gaat anders door naar het volgende lettertype.
  * Als er geen hints voor bestandsindelingen zijn, downloadt de browser de hulpbron.

Dankzij de combinatie van lokale en externe regels met hints voor de juiste bestandsindeling kunnen we alle beschikbare lettertype-indelingen specificeren en doet de browser de rest: de browser stelt vast welke hulpbronnen nodig zijn en selecteert voor ons de optimale bestandsindeling.

Note: De volgorde waarin de verschillende lettertypen worden genoemd is van belang. De browser kiest namelijk het eerste lettertype dat wordt ondersteund. Wanneer u wilt dat nieuwe browsers WOFF2 gebruiken, moet u WOFF2 boven WOFF plaatsen, enzovoort.

### Deelverzameling Unicode-bereik

Naast eigenschappen van het lettertype als stijl, gewicht en stretch kunnen we aan de hand van de @font-face-regel ook een verzameling Unicode-codepoints definiëren die door elke afzonderlijke hulpbron worden ondersteund. Hierdoor kunnen we een groot Unicode-lettertype opsplitsen in kleinere deelverzamelingen (bijv. Latijnse, Griekse en Cyrillische deelverzamelingen) en hoeven we alleen de gliefen te downloaden die nodig zijn om de tekst op een bepaalde pagina weer te geven.

De [descriptor voor het Unicode-bereik](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) laat ons een lijst met door een komma gescheiden waarden specificeren. Elke waarde kan een van drie vormen aannemen:

* Enkel codepoint (bijv. U+416)
* Intervalbereik (bijv. U+400-4ff): bevat de codepoints voor begin en eind van het bereik
* Wildcard (bijv. U+4??): '?' de tekens staan voor hexadecimale getallen

We kunnen onze _Awesome Font-familie bijvoorbeeld opsplitsen in Latijnse en Japanse deelverzamelingen die elk door de browser worden gedownload wanneer dit nodig is: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('ttf'),
           url('/fonts/awesome-jp.eot') format('eot');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: Deelverzamelingen voor unicode-lettertypen zijn met name belangrijk voor Aziatische talen. Het aantal gliefen is namelijk een stuk groter dan in Westerse talen en een volledig lettertype neemt al gauw enkele megabytes in beslag, in plaats van enkele tientallen kilobytes.

Omdat we deelverzamelingen voor Unicode-bereik en aparte bestanden gebruiken voor elke stilistische variant van het lettertype, kunnen we een lettertypefamilie gebruiken die zowel sneller, als efficiënter kan worden gedownload - de bezoeker downloadt alleen de varianten en deelverzamelingen die nodig zijn en hoeft geen deelverzamelingen te downloaden die hij of zij toch nooit ziet of gebruikt op de pagina. 

Er is een klein nadeel met Unicode-bereik: [het wordt nog niet door alle browsers ondersteund](http://caniuse.com/#feat=font-unicode-range). Sommige browsers negeren de hint voor Unicode-bereik en downloaden alle varianten, andere verwerken de @font-face-regel helemaal niet. Om dit op te lossen, moeten we voor oudere browsers terugvallen op de "handmatige deelverzameling".

Oudere browsers zijn niet slim genoeg om alleen de benodigde deelverzamelingen te selecteren en kunnen geen samengesteld lettertype maken. We moeten daarom een enkele lettertype-hulpbron gebruiken die alle benodigde deelverzamelingen bevat, en de rest moeten we voor de browser verbergen. Als de pagina bijvoorbeeld alleen Latijnse tekens gebruikt, kunnen we andere gliefen verwijderen en kunnen we die deelverzameling aanbieden als alleenstaande hulpbron. 

1. **Hoe bepalen we welke deelverzamelingen nodig zijn?** 
  - Wanneer deelverzamelingen voor Unicode-bereik worden ondersteund door de browser, selecteert deze automatisch de juiste deelverzameling. De pagina hoeft alleen de bestanden van de deelverzameling te verstrekken en het juiste Unicode-bereik te specificeren in de @font-face-regels.
  - Wanneer Unicode-bereik niet wordt ondersteund, moet de pagina alle onnodige deelverzamelingen verbergen - d.w.z. de ontwikkelaar moet de vereiste deelverzamelingen specificeren.
2. **Hoe genereren we deelverzamelingen van lettertypen?**
  - Gebruik de open source [pyftsubset-tool](https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16) om deelverzamelingen te maken en uw lettertypen te optimaliseren.
  - Bij sommige lettertypeservices kunt u handmatig deelverzamelingen maken aan de hand van aangepaste zoekparameters. Op deze manier kunt u handmatig de vereiste deelverzameling voor uw pagina specificeren. Raadpleeg de documentatie van de leverancier van uw lettertypen.


### Selectie en synthese van lettertypen

Elke lettertypefamilie bestaat uit meerdere stilistische varianten (normaal, vet, cursief) en meerdere gewichten voor elke stijl die elk zeer verschillende gliefvormen kunnen hebben - bijv. verschillende spaties, grootte, of een geheel andere vorm. 

<img src="images/font-weights.png" class="center" alt="Gewichten van lettertypen">

Bovenstaand diagram toont dat een lettertypefamilie drie verschillende gewichten voor vet kan hebben: 400 (normaal), 700 (vet) en 900 (extra vet). Alle andere varianten (in het grijs) worden door de browser automatisch aangepast aan de dichtstbijzijnde variant. 

> Wanneer een gewicht wordt opgegeven waarvoor geen lettertype bestaat, wordt het gewicht gebruikt dat het meest in de buurt komt. Grote gewichten corresponderen over het algemeen met lettertypen met grotere gewichten en lichte gewichten met lettertypen met lichtere gewichten.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">Algoritme voor corresponderende CSS3-lettertypen</a>

Iets vergelijkbaars geldt voor varianten van _italic_. De ontwerper van het lettertype bepaalt welke varianten worden gemaakt, en wij bepalen welke varianten we op onze pagina gebruiken - elke variant moet apart worden gedownload, dus het is een goed idee om het aantal varianten beperkt te houden. We kunnen bijvoorbeeld twee varianten definiëren voor onze _Awesome Font-familie: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('ttf'),
           url('/fonts/awesome-l-700.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

Bovenstaand voorbeeld beschrijft de _Awesome Font-familie die is samengesteld uit twee hulpbronnen met dezelfde verzameling Latijnse gliefen (U+000-5FF) maar die twee verschillende "gewichten" heeft: normaal (400) en vet (700). Wat gebeurt er als een van onze CSS-regels een ander lettertypegewicht specificeert, of de eigenschap van de lettertypestijl instelt op cursief?

* Als geen lettertype wordt gevonden dat exact overeenkomt, kiest de browser de overeenkomst die het meest in de buurt komt.
* Als er geen stilistische overeenkomst wordt gevonden (bijv. we hebben in bovenstaand voorbeeld geen cursieve varianten beschreven), synthetiseert de browser zijn eigen lettertypevariant. 

<img src="images/font-synthesis.png" class="center" alt="Synthese van lettertypen">

> Auteurs dienen ook op te letten dat synthetische lettertypen mogelijk niet geschikt zijn voor het Cyrillische alfabet, waar cursieve tekens een heel andere vorm hebben. Het is altijd beter om een echt cursief lettertype te gebruiken dan een synthetische versie.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3-lettertype</a>

Bovenstaand voorbeeld toont het verschil tussen het echte en synthetische lettertype Open-Sans. Alle synthetische varianten zijn gebaseerd op een enkel lettertype met een gewicht van 400. Zoals u ziet is er een groot verschil tussen de twee versies. Er is geen informatie gespecificeerd voor de vette en schuine varianten. De resultaten zullen daarom van de ene tot de andere browser verschillen, en hangen sterk af van het lettertype.

Note: Voor de beste consistentie en visuele resultaten kunt u beter geen gebruikmaken van lettertype-synthese. Beperk het aantal gebruikte lettertypen en geef de locatie van de lettertypen op, zodat de browser de lettertypen kan downloaden wanneer deze op de pagina worden gebruikt. In sommige gevallen kan een synthetische variant <a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>een optie zijn</a> - gebruik deze met zorg.


## Laden en renderen optimaliseren

### TL;DR {: .hide-from-toc }
- Verzoeken om lettertypen worden pas behandeld wanneer de render-boom is opgebouwd, wat tot vertraagde tekstweergave kan leiden
- In de Font Loading API kunnen we strategieën voor aangepaste lettertypen en rendering implementeren die voorrang krijgen boven standaard 'lazyload' laden van lettertypen
- Met `inlining` van lettertypen kunnen we standaard `lazyload` laden in oudere browsers overschrijven


Een volledig weblettertype met alle stilistische varianten, die we mogelijk niet nodig hebben, plus alle gliefen, die we mogelijk niet gebruiken, kan al snel oplopen tot een download van meerdere megabytes. De @font-face CSS-regel is speciaal ontwikkeld om de lettertypefamilie op te splitsen in een verzameling hulpbronnen: Unicode-deelverzamelingen, stijlvarianten, enzovoort. 

Aan de hand van deze regels bepaalt de browser welke deelverzamelingen en varianten nodig zijn en downloadt vervolgens het kleinste aantal benodigde gegevens om de tekst weer te geven. Dit is erg nuttig, maar als we niet oppassen, kan dit problemen opleveren met het kritieke render-pad en kan dit leiden tot vertraagde tekstweergave - iets dat we absoluut willen vermijden. 

### Weblettertypen en het kritieke render-pad

Wanneer we lettertypen `lazyloaden`, is er een belangrijk verborgen aspect dat de tekstweergave kan vertragen: de browser moet [de render-boom samenstellen](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), die afhankelijk is van de DOM- en CSSOM-bomen. Pas dan weet de browser welke lettertype-hulpbronnen nodig zijn om de tekst weer te geven. Verzoeken om lettertypen worden dus pas na andere kritieke hulpbronnen behandeld, en de browser wordt mogelijk verhinderd om de tekst weer te geven tot de benodigde hulpbron is opgehaald.

<img src="images/font-crp.png" class="center" alt="Kritiek render-pad lettertypen">

1. Browser verzoekt om een HTML-document
2. Browser begint HTML-antwoord te parsen en de DOM samen te stellen
3. Browser ontdekt CSS, JS en andere hulpbronnen en verstuurt verzoeken
4. Browser stelt de CSSOM samen wanneer alle CSS-inhoud is ontvangen en combineert dit met de DOM-boom om de render-boom samen te stellen
  * Verzoeken om lettertypen worden verstuurd wanneer de render-boom aangeeft welke lettertypevarianten nodig zijn om de gespecificeerde tekst op de pagina weer te geven
5. Browser geeft lay-out weer en vult scherm op met inhoud
  * Als het lettertype nog niet beschikbaar is, kan de browser geen tekstpixels weergeven
  * Wanneer het lettertype beschikbaar is, vult de browser de tekstpixels in

Door de volgorde waarin de pagina wordt ingevuld en weergegeven, van de eerste inhoud die kort na samenstelling van de render-boom wordt weergegeven, tot het verzoek om het lettertype, veroorzaakt `lege tekst`, wanneer de browser de lay-out gereed heeft, maar nog moet wachten om de tekst in te vullen. Dit gedrag verschilt per browser:

* Safari wacht met de tekstweergave tot het lettertype is gedownload.
* Chrome en Firefox wachten 3 seconden, waarna ze terugvallen op het handmatige lettertype. Wanneer het lettertype is gedownload, wordt de tekst opnieuw weergegeven in het nieuwe lettertype.
* IE geeft de tekst direct met het handmatige lettertype weer als het opgevraagde lettertype nog niet beschikbaar is, en geeft de tekst weer met het nieuwe lettertype wanneer dit is gedownload.

Al deze strategieën hebben hun voor- en nadelen: sommige mensen vinden het houterig wanneer de tekst opnieuw wordt weergegeven, anderen zien graag direct resultaat en vinden het niet erg wanneer de pagina ververst wordt als het lettertype is gedownload. We zullen hier niet nader op ingaan. Belangrijk is dat `lazyloading` het aantal bytes reduceert, maar ook vertraging kan opleveren voor de tekstweergave. Hoe kunnen we dit gedrag optimaliseren?

### Tekstweergave optimaliseren met Font Loading API

[Font Loading API](http://dev.w3.org/csswg/css-font-loading/){: .external } biedt een script-interface waarin CSS-lettertypen kunnen worden gedefinieerd en aangepast, de downloadvoortgang kan worden bijgehouden en het standaard "lazyload"-gedrag kan worden gewijzigd. Als we bijvoorbeeld zeker weten dat een bepaalde lettertypevariant nodig is, kunnen we deze definiëren en de browser instrueren om de lettertype-hulpbron onmiddellijk op te halen:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for render tree, initiate immediate fetch!
    
    font.ready().then(function() {
      // apply the font (which may rerender text and cause a page reflow)
      // once the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default content is hidden, and rendered once font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply own render strategy here... 
    });
    

Voorts kunnen we de status van het lettertype controleren (via [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) en de downloadvoortgang bijhouden, waardoor we ook een aangepaste strategie kunnen definiëren voor de tekstweergave op onze pagina's: 

* We kunnen alle tekstweergave onderbreken tot het lettertype beschikbaar is.
* We kunnen een aangepaste time-out voor elk lettertype implementeren.
* We kunnen het handmatige lettertype gebruiken om de onderbreking van de tekstweergave op te heffen en een nieuwe stijl in te voegen die het nieuwe lettertype gebruikt, zodra dit beschikbaar is.

We kunnen bovenstaande strategieën bovendien ook combineren voor verschillende inhoud op de pagina - bijv. tekstweergave onderbreken in sommige onderdelen tot het lettertype beschikbaar is, een handmatig lettertype gebruiken en de tekst opnieuw weergeven wanneer het nieuwe lettertype is gedownload, verschillende time-outs opgeven, enzovoort. 

Note: Font Loading API is <a href='http://caniuse.com/#feat=font-loading'>voor sommige browsers nog in ontwikkeling</a>. Gebruik de <a href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a>, of de <a href='https://github.com/typekit/webfontloader'>webfontloader-bibliotheek</a> om vergelijkbare functionaliteit te leveren, met als nadeel dat u afhankelijk bent van JavaScript.

### Tekstweergave optimaliseren met `inlining`

Een eenvoudige alternatieve strategie voor Font Loading API om lege tekst op te lossen, is de inhoud van het lettertype invoeren in een CSS-stylesheet:

* CSS-stylesheets met corresponderende zoekopdrachten voor media worden automatisch met hoge prioriteit gedownload door de browser, omdat deze vereist zijn om de CSSOM samen te stellen.
* Door de gegevens van het lettertype in te voeren in een CSS-stylesheet wordt de browser gedwongen om het lettertype met hoge prioriteit te downloaden, zonder te wachten op de render-boom - dit werkt als een handmatige ingreep waarmee het standaard `lazyload`-gedrag wordt overschreven.

De invoerstrategie is niet zo flexibel en we kunnen geen aangepaste time-outs instellen of weergavestrategieën maken voor verschillende inhoud, maar het is een eenvoudige en degelijke oplossing die werkt voor alle browsers. Voor het beste resultaat werkt u ingevoerde lettertypen uit op zelfstandige stylesheets en biedt u deze aan met een lange `max-age` - zo dwingt u uw bezoekers niet om de lettertypen opnieuw te downloaden wanneer u uw CSS bijwerkt. 

Note: Maak selectief gebruik van `inlining`. De reden dat @font-face gebruikmaakt van `lazyload` is om downloaden van overbodige lettertypevarianten en deelverzamelingen te voorkomen. Als u de omvang van uw CSS via agressieve `inlining` vergroot, heeft dit negatieve gevolgen voor uw <a href='/web/fundamentals/performance/critical-rendering-path/'>kritieke render-pad</a> - de browser moet alle CSS downloaden voordat deze de CSSOM en render-boom kan opstellen, en pagina-inhoud op het scherm kan weergeven.

### Hergebruik van lettertypen optimaliseren met HTTP-caching

Lettertype-hulpbronnen zijn meestal statische hulpbronnen die weinig updates krijgen. Ze zijn daarom ideaal voor een lange `max-age` - zorg ervoor dat u zowel een [voorwaardelijke ETag-header](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags), als een [optimaal Cache-Control-beleid](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) specificeert voor alle lettertype-hulpbronnen. 
    
U hoeft lettertypen niet op te slaan in het lokale geheugen of via andere methoden - deze hebben elk op hun beurt enige nadelen voor het resultaat. De HTTP-cache van de browser, samen met Font Loading API of de webfontloader-bibliotheek bieden de beste en degelijkste methode om lettertype-hulpbronnen aan de browser te leveren.


## Optimalisatiechecklist

Het is een misverstand dat weblettertypen per definitie de paginaweergave vertragen of negatieve gevolgen hebben voor andere resultaten. Goed geoptimaliseerd gebruik van lettertypen kan een veel gebruiksvriendelijker resultaat opleveren: geweldige merkbekendheid, verbeterde leesbaarheid, gebruiksgemak en zoekfunctie. Daarnaast levert u een schaalbare oplossing met meerder resoluties die zich aanpast aan schermen van alle afmetingen en resoluties. Wees niet bang om weblettertypen te gebruiken. 

Gebruik ze wel met verstand, anders krijgt u te maken met grote downloads en onnodige vertragingen. We moeten de browser helpen door de lettertype-items zelf te optimaliseren, en daarnaast te optimaliseren hoe ze worden opgehaald en gebruikt op onze pagina`s. 

1. **Controleer en monitor hoe u lettertypen gebruikt:** gebruik niet te veel lettertypen op uw pagina`s en beperk het aantal varianten voor elk lettertype. Op die manier kunt u uw pagina`s consistenter en sneller aan uw gebruikers leveren.
2. **Splits uw lettertype-hulpbronnen op in deelverzamelingen:** veel lettertypen kunnen worden ingedeeld in deelverzamelingen of in meerdere Unicode-bereiken, zodat u precies de gliefen levert die voor een bepaalde pagina nodig zijn. Hierdoor beperkt u de bestandsgrootte en verbetert u de downloadsnelheid van de hulpbron. Als u deelverzamelingen maakt, kunt u deze het beste direct optimaliseren voor hergebruik: u wilt niet op elke pagina een andere verzameling met overlappende tekens downloaden. Een goede werkwijze is om deelverzamelingen te maken op basis van alfabetten - bijv. Latijns, Cyrillisch, enzovoort.
3. **Lever lettertypen voor elke browser in geoptimaliseerde bestandsindelingen:** elk lettertype moet worden geleverd in de indelingen WOFF2, WOFF, EOT en TTF. Comprimeer EOT- en TTF-bestanden met GZIP, want deze bestandsindelingen worden standaard niet gecomprimeerd.
4. **Definieer een revalidatie- en een optimaal cachebeleid:** lettertypen zijn statische hulpbronnen die zelden worden bijgewerkt. Zorg ervoor dat uw servers een lange tijdstempel vor `max-age` verstrekken en een revalidatietoken voor efficiënt hergebruik van lettertypen op verschillende pagina`s.
5. **Gebruik Font Loading API om het kritieke render-pad te optimaliseren:** standaard `lazyload`-gedrag kan vertraagde tekstweergave veroorzaken. Met Font Loading API kunt u dit gedrag voor bepaalde lettertypen wijzigen en kunt u aangepaste strategieën voor renderen en time-outs specificeren voor verschillende inhoud op de pagina. U kunt de webfontloader JavaScript-bibliotheek of CSS-`inlining` gebruiken voor oudere browsers die de API niet ondersteunen.


