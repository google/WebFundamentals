project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Een foto is evenveel waard als 1000 woorden. Afbeeldingen vormen dan ook een integraal onderdeel van elke pagina. Maar het downloaden ervan kost veel bytes.  Met responsive webdesign kunnen niet alleen onze lay-outs veranderen op basis van apparaatkenmerken, maar ook afbeeldingen.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Afbeeldingen {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Een foto is evenveel waard als 1000 woorden. Afbeeldingen vormen dan ook een integraal onderdeel van elke pagina. Maar het downloaden ervan kost veel bytes.  Met responsive webdesign kunnen niet alleen onze lay-outs veranderen op basis van apparaatkenmerken, maar ook afbeeldingen.



### Responsieve afbeeldingen

Responsive webdesign houdt in dat niet alleen lay-outs kunnen veranderen op basis van apparaatkenmerken, maar ook inhoud. Op schermen met hoge resolutie (2x) bijvoorbeeld, zijn afbeeldingen met hoge resolutie nodig zodat ze zo scherp mogelijk worden weergegeven. Een afbeelding met een breedte van 50% voldoet waarschijnlijk prima wanneer de browser 800px breed is, maar neemt op een smalle telefoon te veel ruimte in beslag en komt uit op dezelfde bandbreedte-overhead wanneer deze wordt verkleind om op een kleiner scherm te passen.

### Art direction

<img class="center" src="img/art-direction.png" alt="Voorbeeld art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Soms moeten afbeeldingen misschien wat drastischer worden gewijzigd: de proporties wijzigen, bijsnijden of zelfs de afbeelding geheel vervangen. Het wijzigen van afbeeldingen wordt dan meestal `art direction` genoemd.  Zie [responsiveimages.org/demos/](http://responsiveimages.org/demos/){: .external } voor meer voorbeelden.


{% include "web/_shared/udacity/ud882.html" %}


## Afbeeldingen in opmaak


Het element <code>img</code> is een krachtig element. U kunt er inhoud mee downloaden, decoderen en weergeven. Door moderne browsers worden veel verschillende afbeeldingsindelingen ondersteund. Het toevoegen van afbeeldingen voor mobiele apparaten gebeurt in principe op dezelfde manier als voor desktopcomputers. Er zijn slechts een paar kleine aanpassingen nodig om een goede ervaring voor mobiele gebruikers te kunnen realiseren.



### TL;DR {: .hide-from-toc }
- Gebruik relatieve grootten voor afbeeldingen zodat deze niet per abuis tot buiten de randen van de container overlopen.
- Gebruik het element <code>picture</code> als u afhankelijk van de kenmerken van een apparaat andere afbeeldingen wilt opgeven (dit wordt ook wel art direction genoemd).
- Gebruik <code>srcset</code> en de descriptor <code>x</code> in het element <code>img</code> om de browser te helpen de beste afbeelding te kiezen wanneer er uit verschillende dichtheden moet worden gekozen.



### Relatieve formaten gebruiken voor afbeeldingen

Vergeet niet om relatieve eenheden te gebruiken bij het opgeven van de breedte van afbeeldingen zodat deze niet per abuis tot buiten de randen van de viewport overlopen. Bijvoorbeeld `width: 50%;` zorgt ervoor dat de breedte van de afbeelding 50% van het omvattende element is (niet de viewport of de feitelijke pixelgrootte).

Aangezien CSS inhoud toestaat over te lopen tot buiten de begrenzing van de container, kan het nodig zijn max-width: 100% te gebruiken, zodat afbeeldingen en andere inhoud binnen de container blijven. Bijvoorbeeld:


    img, embed, object, video {
      max-width: 100%;
    }
    

Zorg voor zinvolle beschrijvingen via het kenmerk `alt` in `img`-elementen. Zo maakt u uw site beter toegankelijk door schermlezers en andere ondersteunende technologieën een context te bieden.

### Breid `img`-elementen uit met `srcset` voor high-DPI apparaten

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


Het kenmerk <code>srcset</code> verbetert het gedrag van het element <code>img</code>, waardoor het eenvoudiger wordt om meerdere afbeeldingsbestanden te leveren voor verschillende apparaatkenmerken. Net zoals de bij CSS behorende <code>image-set</code> <a href="#use_image-set_to_provide_high_res_images">CSS-functie</a>, stelt <code>srcset</code> de browser in staat de beste afbeelding te kiezen afhankelijk van de kenmerken van het apparaat, bijvoorbeeld een 2x afbeelding gebruiken op een 2x-scherm en in de toekomst wellicht een 1x afbeelding op een 2x-apparaat in een netwerk met beperkte bandbreedte.

<div class="clearfix"></div>

 
    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Op browsers die `srcset` niet ondersteunen, maakt de browser gewoon gebruik van het standaard-afbeeldingsbestand dat door het kenmerk `src` is opgegeven. Daarom is het belangrijk altijd een 1x afbeelding op te nemen die op elk willekeurig apparaat kan worden weergegeven, los van de capaciteiten.  Wanneer `srcset` wordt ondersteund, wordt de lijst met door komma`s gescheiden waarden met afbeeldingen/voorwaarden geparseerd voordat er verzoeken worden gedaan. Vervolgens wordt alleen de meest geschikte afbeelding gedownload en weergegeven.

De voorwaarden kunnen allerlei zaken omvatten, van pixeldichtheid tot breedte en hoogte. Alleen pixeldichtheid wordt momenteel goed ondersteund.  Als u het huidige gedrag wilt afstemmen op toekomstige functies, kunt u het beste de 2x afbeelding in het kenmerk opgeven.

### Art direction in responsieve afbeeldingen met `picture`

Het wijzigen van afbeeldingen op basis van apparaatkenmerken, ook wel `art direction` genoemd, kan worden gedaan met behulp van het element picture. Met het element <code>picture</code> wordt een declaratieve oplossing gedefinieerd voor het verkrijgen van meerdere versies van een afbeelding op basis van verschillende kenmerken, zoals het apparaatformaat, de apparaatresolutie, oriëntatie, enzovoort.

<img class="center" src="img/art-direction.png" alt="Voorbeeld art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Note: Het element <code>picture</code> wordt langzaamaan steeds meer toegepast in browsers. Hoewel het nog niet in iedere browser beschikbaar is, bevelen we het gebruik hiervan aan vanwege de sterke terugwaartse compatibiliteit en het mogelijke gebruik van de <a href='http://picturefill.responsiveimages.org/'>Picturefill polyfill</a>. Zie voor meer informatie de site <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Het element <code>picture</code> wordt gebruikt als een afbeeldingsbron in meerdere dichtheden voorkomt, of wanneer door een responsief design een iets afwijkende afbeelding op sommige typen scherm wordt afgedwongen. Net zoals bij het element <code>video</code> kunnen meerdere <code>source</code> -elementen worden opgenomen, waardoor het mogelijk is verschillende afbeeldingsbestanden op te geven, afhankelijk van de mediaquery`s of de afbeeldingsgrootte.

<div class="clearfix"></div>


<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" %}
</pre>

In het bovenstaande voorbeeld wordt, als de breedte van de browser ten minste 800px bedraagt, `head.jpg` of `head-2x.jpg` gebruikt, afhankelijk van de apparaatresolutie. Als de browserbreedte tussen 450px en 800px ligt, dan wordt `head-small.jpg` of `head-small-2x.jpg` gebruikt, maar ook hier is dat weer afhankelijk van de apparaatresolutie. Bij schermbreedten van minder dan 450px en compatibiliteit met eerdere versies, waarbij het element `picture` niet wordt ondersteund, geeft de browser in plaats daarvan het element `img` weer. Dit moet altijd worden gebruikt.

#### Afbeeldingen met relatieve grootte

Als de definitieve grootte van de afbeelding niet bekend is, kan het lastig zijn een dichtheidsdescriptor voor de afbeeldingsbronnen op te geven.  Dit geldt vooral voor afbeeldingen die een proportionele breedte van de browser vullen en die vloeiend zijn, afhankelijk van de grootte van de browser.

In plaats van vaste afbeeldingsformaten en dichtheden te produceren, kan de grootte van elke geleverde afbeelding worden opgegeven door een descriptor voor de breedte toe te voegen, samen met de grootte van het afbeeldingselement, waardoor de browser automatisch de effectieve pixeldichtheid kan berekenen en de beste afbeelding kan kiezen om te downloaden.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" %}
</pre>

In het voorbeeld hierboven wordt een afbeelding weergegeven die de helft van de breedte van de viewport vult (`sizes="50vw"`), afhankelijk van de breedte van de browser en de pixelverhouding van het apparaat. Dit stelt de browser in staat de juiste afbeelding te kiezen, ongeacht hoe groot het browservenster is. In onderstaande tabel ziet u welke afbeelding de browser zou kiezen:

<table>
    <thead>
    <tr>
      <th data-th="Browserbreedte">Browserbreedte</th>
      <th data-th="Pixelverhouding apparaat">Pixelverhouding apparaat</th>
      <th data-th="Gebruikte afbeelding">Gebruikte afbeelding</th>
      <th data-th="Effectieve resolutie">Effectieve resolutie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browserbreedte">400px</td>
      <td data-th="Pixelverhouding apparaat">1</td>
      <td data-th="Gebruikte afbeelding"><code>200.png</code></td>
      <td data-th="Effectieve resolutie">1x</td>
    </tr>
    <tr>
      <td data-th="Browserbreedte">400px</td>
      <td data-th="Pixelverhouding apparaat">2</td>
      <td data-th="Gebruikte afbeelding"><code>400.png</code></td>
      <td data-th="Effectieve resolutie">2x</td>
    </tr>
    <tr>
      <td data-th="Browserbreedte">320px</td>
      <td data-th="Pixelverhouding apparaat">2</td>
      <td data-th="Gebruikte afbeelding"><code>400.png</code></td>
      <td data-th="Effectieve resolutie">2,5x</td>
    </tr>
    <tr>
      <td data-th="Browserbreedte">600px</td>
      <td data-th="Pixelverhouding apparaat">2</td>
      <td data-th="Gebruikte afbeelding"><code>800.png</code></td>
      <td data-th="Effectieve resolutie">2,67x</td>
    </tr>
    <tr>
      <td data-th="Browserbreedte">640px</td>
      <td data-th="Pixelverhouding apparaat">3</td>
      <td data-th="Gebruikte afbeelding"><code>1000.png</code></td>
      <td data-th="Effectieve resolutie">3,125x</td>
    </tr>
    <tr>
      <td data-th="Browserbreedte">1100px</td>
      <td data-th="Pixelverhouding apparaat">1</td>
      <td data-th="Gebruikte afbeelding"><code>1400.png</code></td>
      <td data-th="Effectieve resolutie">1,27x</td>
    </tr>
  </tbody>
</table>


#### Rekening houden met breekpunten in responsieve afbeeldingen

Vaak kan de grootte of afbeelding veranderen, afhankelijk van de lay-outbreekpunten van de site. Op een klein scherm, bijvoorbeeld, wilt u misschien dat de afbeelding de breedte van de viewport geheel vult, terwijl deze op een groter scherm slechts een klein gedeelte in beslag zou nemen.  

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" %}
</pre>

Het kenmerk `sizes` in het bovenstaande voorbeeld maakt gebruik van diverse mediaquery`s om de grootte van de afbeelding aan te geven. Als de browserbreedte groter is dan 600px, is de afbeelding 25% van de breedte van de viewport, bij een breedte van 500px tot 600px, is de afbeelding 50% van de breedte van de viewport en onder 500px heeft de afbeelding de volle breedte.


### Productafbeeldingen uitbreidbaar maken

Klanten willen zien wat ze kopen. Op sites van online winkels verwachten gebruikers dat ze close-ups in hoge resolutie van producten kunnen bekijken om de details beter te kunnen zien en [deelnemers aan het onderzoek](/web/fundamentals/getting-started/principles/) raakten geïrriteerd als ze dat niet konden doen.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Website van J. Crew met uitbreidbare productafbeelding">
  <figcaption>Website van J. Crew met uitbreidbare productafbeelding.</figcaption>
</figure>

Een goed voorbeeld van uitbreidbare afbeeldingen waarop gebruikers kunnen tikken is te zien op de site van J. Crew. Een verdwijnende overlay geeft aan dat op een afbeelding kan worden getikt, waarna een ingezoomde afbeelding met details zichtbaar wordt.


### Andere afbeeldingstechnieken

#### Gecomprimeerde afbeeldingen

De [techniek voor afbeeldingscompressie](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) zorgt voor sterk gecomprimeerde 2x afbeeldingen op alle apparaten, ongeacht de feitelijke mogelijkheden van het apparaat. Afhankelijk van het type afbeelding en het compressieniveau, lijkt de afbeeldingskwaliteit misschien niet te veranderen, maar de bestandsgrootte wordt wel veel kleiner.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html">Voorbeeld bekijken</a>


Note: Ga verstandig om met de compressietechniek omdat deze hogere geheugen- en decoderingskosten met zich meebrengt. Het aanpassen van het formaat van grote afbeeldingen zodat ze op een kleiner scherm passen is duur en kan vooral op low-end apparaten lastig zijn omdat zowel het geheugen als de verwerkingsmogelijkheden hierop beperkt zijn.

#### JavaScript-afbeeldingsvervanging

Met JavaScript-afbeeldingsvervanging worden de mogelijkheden van het apparaat gecontroleerd en worden `de juiste afbeeldingen` gekozen. U kunt zelf de pixelverhouding van het apparaat bepalen via `window.devicePixelRatio`, de schermbreedte en -hoogte ophalen en mogelijk zelfs de netwerkverbinding controleren via `navigator.connection` of een vals verzoek uitgeven. Nadat u al deze informatie heeft verzameld, kunt u bepalen welke afbeelding u wilt laden.

Eén groot nadeel van deze benadering is dat u door het gebruik van JavaScript het laden van afbeeldingen uitstelt totdat op zijn minst de look-ahead parser gereed is. Dit betekent dat het downloaden van afbeeldingen pas begint nadat de gebeurtenis `pageload` is gestart. Daarnaast is de kans groot dat de browser zowel de 1x als de 2x afbeeldingen zal downloaden, waardoor de pagina zwaarder wordt.


## Afbeeldingen in CSS


De CSS-eigenschap `background` is een krachtige tool waarmee u complexe afbeeldingen aan elementen kunt toevoegen en gemakkelijk meerdere afbeeldingen toevoegt, ze kunt laten terugkomen, enzovoort.  In combinatie met mediaquery's wordt de eigenschap `background` nog krachtiger, waardoor het voorwaardelijke laden van afbeeldingen op basis van onder andere schermresolutie en de grootte van de viewport mogelijk wordt.


### TL;DR {: .hide-from-toc }
- Gebruik de beste afbeelding voor de kenmerken van de display, houd rekening met het formaat van het scherm, de resolutie van het apparaat en de paginalay-out.
- Wijzig de eigenschap <code>background-image</code> in CSS voor high-DPI-beeldschermen via mediaquery`s met <code>min-resolution</code> en <code>-webkit-min-device-pixel-ratio</code>.
- Gebruik srcset voor afbeeldingen met hoge resolutie naast de 1x afbeelding in opmaak.
- Houd rekening met de prestatiekosten wanneer u JavaScript-technieken gebruikt voor vervanging van afbeeldingen of wanneer u zwaar gecomprimeerde afbeeldingen met hoge resolutie op apparaten met een lagere resolutie plaatst.


### Gebruik mediaquery`s voor het voorwaardelijk laden van afbeeldingen of voor art direction

Mediaquery`s beïnvloeden niet alleen de paginalay-out, maar kunnen ook worden gebruikt om afbeeldingen voorwaardelijk te laden of om art direction te verzorgen, afhankelijk van de breedte van de viewport.

In het onderstaande voorbeeld wordt op kleine schermen alleen `small.png` gedownload en toegepast op de inhoud-`div`, terwijl op grote schermen `background-image: url(body.png)` wordt toegepast op de hoofdtekst en `background-image: url(large.png)` op de inhoud-`div`.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" %}
</pre>

### Afbeeldingsset gebruiken voor het leveren van afbeeldingen met hoge resolutie

Met de functie `image-set()` in CSS wordt de gedragseigenschap `background` verbeterd, waardoor het gemakkelijker wordt meerdere afbeeldingsbestanden voor verschillende apparaatkenmerken te maken. Zo kan de browser de beste afbeelding kiezen, afhankelijk van de kenmerken van het apparaat. Bijvoorbeeld een 2x afbeelding op een 2x scherm, of een 1x afbeelding op een 2x apparaat als het een netwerk met beperkte bandbreedte betreft.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

De browser zal niet alleen de juiste afbeelding laden, maar deze ook correct
schalen. Met andere woorden, de browser gaat er vanuit dat 2x afbeeldingen tweemaal zo groot zijn als 1x afbeeldingen en zal om die reden het 2x bestand omlaag schalen met een factor 2, waardoor de afbeelding op de papina dezelfde grootte lijkt te hebben.

Er is nog maar sinds kort ondersteuning voor `image-set()` en dit wordt alleen ondersteund in Chrome en Safari met het voorvoegsel `-webkit` van de leverancier. U moet er ook voor zorgen dat u een reserve-afbeelding toevoegt voor het geval `image-set()` niet wordt ondersteund, bijvoorbeeld:

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" %}
</pre>

De juiste asset wordt in browsers geladen die image-set ondersteunen, en kunnen bij gebrek aan ondersteuning terugvallen op de 1x asset. De logische restrictie is dat zolang `image-set()` browserondersteuning laag is, de meeste browsers de 1x asset zullen ontvangen.

### Mediaquery`s gebruiken om afbeeldingen met hoge resolutie of art direction te maken

Mediaquery`s kunnen regels maken die gebaseerd zijn op de [device pixel ratio](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), waardoor het mogelijk wordt om verschillende afbeeldingen voor 2x versus 1x schermen op te geven.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox en Opera ondersteunen alledrie de standaard `(min-resolution: 2dppx)`, terwijl voor zowel Safari als Android Browser de oudere syntax met voorvoegsel van de leverancier vereist is zonder de eenheid `dppx`. Houd er rekening mee dat deze stijlen alleen worden geladen als het apparaat overeenkomt met de mediaquery, en dat u stijlen moet opgeven voor de basiscasus. Dit biedt ook het voordeel dat er in ieder geval iets wordt weergegeven in het geval de browser geen resolutiespecifieke mediaquery`s ondersteunt.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" %}
</pre>

U kunt ook de `min-width`-syntax gebruiken voor het weergeven van alternatieve afbeeldingen, afhankelijk van de grootte van de viewport. Deze techniek heeft het voordeel dat de afbeelding niet wordt gedownload als de mediaquery er niet mee overeenkomt.  Zo wordt `bg.png` bijvoorbeeld alleen gedownload en toegepast op de `body` als de breedte van de browser 500 px of groter is:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
      

## SVG gebruiken voor pictogrammen

Gebruik bij het toevoegen van pictogrammen aan uw pagina waar mogelijk SVG-pictogrammen of, in bepaalde gevallen, unicode-tekens.


### TL;DR {: .hide-from-toc }
- Gebruik SVG of unicode voor pictogrammen in plaats van rasterafbeeldingen.


### Eenvoudige pictogrammen vervangen door unicode

Veel lettertypen bevatten ondersteuning voor de duizenden unicode-symbolen die in plaats van afbeeldingen kunnen worden gebruikt. Anders dan afbeeldingen, kunnen unicode-lettertypen zonder problemen worden geschaald en zien ze er goed uit, ongeacht hoe klein of groot ze op het scherm verschijnen.

Behalve de gebruikelijke tekenset omvat unicode soms ook symbolen voor getaltypen (&#8528;), pijlen (&#8592;), wiskundige bewerkingstekens (&#8730;), geometrische vormen (&#9733;), besturingsafbeeldingen (&#9654;), braillepatronen (&#10255;), muzieknotatie (&#9836;), Griekse letters (&#937;) en zelfs schaakstukken (&#9822;).

Het toevoegen van een unicode-teken gebeurt op dezelfde manier als bij entiteiten met een naam: `&#XXXX`, waarbij `XXXX` staat voor het nummer van het unicode-teken. Bijvoorbeeld:


    U bent een super &#9733;
    

U bent een super &#9733;

### Complexe pictogrammen vervangen door SVG
Voor meer complexe pictogramvereisten zijn SVG-pictogrammen over het algemeen licht, gebruiksvriendelijk en geschikt voor styling met CSS. Vergeleken bij rasterafbeeldingen biedt SVG een aantal voordelen:

* Het zijn vectorafbeeldingen die oneindig kunnen worden geschaald.
* CSS-effecten zoals kleur, arcering, transparantie en animaties zijn eenvoudig.
* SVG-afbeeldingen kunnen rechtstreeks in het document worden geplaatst.
* Ze zijn semantisch.
* Bieden een betere toegankelijkheid met de juiste kenmerken.



<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" %}
</pre>

### Let goed op bij het gebruik van pictogramlettertypen

Pictogramlettertypen zijn populair en kunnen soms handig zijn, maar vergeleken bij SVG-pictogrammen kennen ze ook enkele nadelen.

* Het zijn vectorafbeeldingen die oneindig kunnen worden geschaald, maar ze kunnen vloeiend zijn, wat pictogrammen kan opleveren die minder scherp zijn dan verwacht.
* Beperkte styling met CSS.
* Een perfecte positionering van pixels kan lastig zijn, afhankelijk van de regelhoogte, letterafstand, enzovoort.
* Ze zijn niet semantisch en kunnen onhandig zijn voor gebruik met schermlezers of andere ondersteunende technologie.
* Tenzij ze correct zijn gerelateerd aan een bereik, kunnen ze resulteren in een groot bestandsformaat terwijl maar een kleine subset van de beschikbare pictogrammen wordt gebruikt. 


<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Voorbeeld van een pagina waar FontAwesome is gebruikt voor de lettertypepictogrammen.">

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" %}
</pre>

Er bestaand honderden gratis en betaalde pictogramlettertypen, zoals [Font Awesome](http://fortawesome.github.io/Font-Awesome/){: .external }, [Pictos](http://pictos.cc/) en [Glyphicons](http://glyphicons.com/).

Weeg de zwaarte van het extra HTTP-verzoek en de bestandsgrootte af tegen de noodzaak van pictogrammen. Als u bijvoorbeeld maar een paar pictogrammen nodig heeft, kunt u beter gewoon een afbeelding of afbeeldingssprite gebruiken.

## Afbeeldingen optimaliseren ten behoeve van de prestaties



Afbeeldingen zijn meestal verantwoordelijk voor de meeste gedownloade bytes en nemen ook een aanzienlijke hoeveelheid van de visuele ruimte in beslag op de pagina. Het optimaliseren van afbeeldingen kan dan ook een van de grootste besparingen op bytes en prestatieverbeteringen voor uw website opleveren: hoe kleiner het aantal bytes dat de browser moet downloaden, des te minder concurrentie voor de bandbreedte van de client er is en des te sneller de browser alle assets kan downloaden en weergeven.


### TL;DR {: .hide-from-toc }
- Kies niet zomaar een afbeeldingsindeling, maar probeer inzicht te krijgen in de verschillende indelingen die beschikbaar zijn en gebruik de meest geschikte indeling.
- Gebruik ook tools voor afbeeldingsoptimalisatie en compressie in uw workflow om de grootte van bestanden te verkleinen.
- Verlaag het aantal http-verzoeken door veelgebruikte afbeeldingen in afbeeldingssprites te plaatsen.
- Denk eraan dat u afbeeldingen pas laadt nadat ze zichtbaar zijn in de weergave. Zo verbetert u de laadtijd van de eerste pagina en maakt u deze pagina minder zwaar.


### De juiste indeling kiezen

Er zijn twee typen afbeeldingen waarmee u rekening moet houden: [vectorafbeeldingen](http://en.wikipedia.org/wiki/Vector_graphics){: .external } en [rasterafbeeldingen](http://en.wikipedia.org/wiki/Raster_graphics). Voor rasterafbeeldingen moet u bovendien de juiste compressie-indeling kiezen, bijvoorbeeld: `GIF`, `PNG`, `JPG`.

**Rasterafbeeldingen**, zoals foto`s en andere afbeeldingen die worden voorgesteld als een raster met afzonderlijke puntjes of pixels. Rasterafbeeldingen zijn meestal afkomstig van een camera of scanner, of kunnen in de browser worden gemaakt met het element `canvas`. Naarmate de afbeelding groter wordt, neemt ook het bestand in grootte toe. Als rasterafbeeldingen groter worden geschaald dan hun oorspronkelijke formaat, worden ze vaag omdat de browser moet gissen hoe de ontbrekende pixels moeten worden ingevuld.

**Vectorafbeeldingen**, zoals logo`s en tekeningen worden gedefinieerd door een reeks van curven, strepen, vormen en vulkleuren. Vectorafbeeldingen worden gemaakt met programma`s zoals Adobe Illustrator of Inkscape en opgeslagen in een vectorindeling zoals [`SVG`](http://css-tricks.com/using-svg/){: .external }. Omdat vectorafbeeldingen gebouwd zijn op eenvoudige primitieven, kunnen ze worden geschaald zonder enig kwaliteitsverlies en zonder een wijziging in bestandsgrootte.

Als u de juiste indeling kiest, is het belangrijk om rekening te houden met de oorsprong van de afbeelding (raster of vector), en de inhoud (kleuren, animatie, tekst, enzovoort). Geen enkele indeling is geschikt voor alle afdelingstypen en elke indeling biedt voor- en nadelen.

Start met de volgende richtlijnen om de juiste indeling te kiezen:

* Gebruik `JPG` voor foto`s.
* Gebruik `SVG` voor vectorkunst en kleurafbeeldingen zoals logo`s en tekeningen.
  Probeer WebP of PNG als vectorkunst niet beschikbaar is.
*  Liever `PNG` dan `GIF` omdat hiermee meer kleuren mogelijk zijn en het betere compressieverhoudingen biedt.
* Overweeg voor langere animaties het gebruik van `<video>` wat een betere beeldkwaliteit biedt en de gebruiker controle geeft over het afspelen.

### De bestandsgrootte verkleinen

De bestandsgrootte van afbeeldingen kan aanzienlijk worden teruggebracht door ze `na te bewerken` na het opslaan. Er bestaan diverse tools voor afbeeldingscompressie  - lossy en lossless, online, GUI, opdrachtregel. Waar mogelijk raden we u aan afbeeldingsoptimalisatie te automatiseren zodat dit een grote rol speelt in uw workflow.

Er zijn verschillende tools beschikbaar die verdere, lossless compressie op `JPG`- en `PNG`-bestanden uitvoeren, zonder de afbeeldingskwaliteit aan te tasten. Probeer voor `JPG` [jpegtran](http://jpegclub.org/){: .external } of [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (alleen beschikbaar op Linux; uitvoeren met de optie --strip-all). Probeer voor `PNG` [OptiPNG](http://optipng.sourceforge.net/) of [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Afbeeldingssprites gebruiken

CSS spriting is een techniek waarbij een aantal afbeeldingen wordt gecombineerd in een enkele `sprite sheet`-afbeelding. Afzonderlijke afbeeldingen kunnen vervolgens worden gebruikt door de achtergrondafbeelding op te geven voor een element (het spritesheet) plus een offset om het juiste onderdeel weer te geven.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt="Afbeeldingsspritesheet gebruikt in voorbeeld"></a>

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" %}
</pre>

Spriting heeft het voordeel dat het aantal downloads wordt verminderd dat vereist is om meerdere afbeeldingen op te halen, terwijl het opslaan in cache mogelijk blijft.

### Lazy loading overwegen

Met lazy loading kunt u het laadproces van lange pagina`s met veel afbeeldingen onder de vouw aanzienlijk versnellen door ze pas te laden wanneer ze nodig zijn of nadat de primaire inhoud geladen en weergegeven is. Behalve verbeterde prestaties kan het gebruik van lazy loading ook leiden tot oneindig scrollen.

Wees voorzichtig wanneer u pagina`s met oneindig scrollen maakt, want inhoud wordt geladen als deze zichtbaar is en het kan zijn dat zoekmachines die inhoud nooit te zien krijgen.  Bovendien krijgen gebruikers de voettekst nooit te zien, omdat er voortdurend nieuwe inhoud wordt geladen, terwijl ze de gezochte informatie juist in de voettekst verwachten te vinden.


## Het gebruik van afbeeldingen geheel vermijden


Soms is de beste afbeelding geen afbeelding. Gebruik waar mogelijk de systeemeigen mogelijkheden van de browser om dezelfde of gelijkwaardige functionaliteit te verkrijgen.  Browsers genereren visuele elementen waarvoor vroeger afbeeldingen vereist waren. Dit betekent dat browsers geen afzonderlijke afbeeldingsbestanden meer hoeven te downloaden, waardoor onhandig geschaalde afbeeldingen worden voorkomen. Pictogrammen kunnen worden weergegeven met behulp van unicode of met lettertypen die speciaal voor pictogrammen zijn ontwikkeld.


### TL;DR {: .hide-from-toc }
- Vermijd waar mogelijk het gebruik van afbeeldingen. Benut liever de mogelijkheden die de browser biedt voor het maken van schaduwen, kleurovergangen, afgeronde hoeken, enzovoort.


### Plaats tekst in markeringen, in plaats van ingesloten in afbeeldingen

Tekst moet zoveel mogelijk tekst zijn en niet zijn ingesloten in afbeeldingen, bijvoorbeeld afbeeldingen gebruiken als koptekst of het plaatsen van contactgegevens zoals telefoonnummers en adressen direct in de afbeelding. Hierdoor kunnen mensen de informatie niet kopiëren en plakken, is de informatie niet toegankelijk voor schermlezers en is deze ook niet responsief. Plaats de tekst liever in uw markeringen en gebruik eventueel weblettertypen om de gewenste stijl te verkrijgen.

### CSS gebruiken in plaats van afbeeldingen

Moderne browsers kunnen gebruikmaken van CSS-functies voor het maken van stijlen waarvoor vroeger afbeeldingen vereist waren. Zo kunnen complexe kleurovergangen worden gemaakt met de eigenschap <code>background</code>, schaduwen met <code>box-shadow</code> en afgeronde hoeken kunnen worden toegevoegd met de eigenschap <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Houd er rekening mee dat het weergeven van cycli vereist is voor het gebruik van deze technieken, en dat kan belastend zijn voor een mobiele telefoon. Als u dit te vaak doet, kunnen eventuele positieve effecten verdwijnen en de prestaties achteruitgaan.




