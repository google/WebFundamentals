project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Internet is toegankelijk op tal van apparaten, van telefoons met kleine schermen tot televisies met grote schermen. Ontdek hoe u een website maakt die op al deze apparaten goed werkt.

{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# Uw eerste website voor meerdere apparaten {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Het bouwen van websites voor meerdere apparaten is niet zo moeilijk als het lijkt. Met behulp van deze gids bouwen we een voorbeeld van een landingspagina voor een product voor onze cursus <a href='https://www.udacity.com/course/mobile-web-development--cs256'>CS256 Mobile Web Development</a> die goed werkt op alle verschillende apparaten.

<img src="images/finaloutput-2x.jpg" alt="verschillende apparaten die het eindproduct weergeven">

Het bouwen voor meerdere apparaten met uiteenlopende mogelijkheden, erg verschillende schermformaten en interactiemethodes lijkt een lastige taak, zo niet onmogelijk.

Het is niet zo moeilijk om volledig responsieve websites te maken als u misschien denkt. Om dit te bewijzen biedt deze gids uw stappen die u kunt volgen om aan de slag te gaan. We hebben alles in twee eenvoudige stappen verdeeld:

1.  De informatiearchitectuur (ook IA genoemd) en structuur van de pagina bepalen, 2.  ontwerpelementen toevoegen zodat de pagina responsief is en er op alle apparaten goed uitziet.




## Uw eigen inhoud en structuur maken 




Inhoud is het belangrijkste aspect van een website. We moeten dus het design afstemmen op de inhoud en niet andersom. In deze gids bepalen we eerst de inhoud die we nodig hebben, maken we een paginastructuur op basis van deze inhoud en geven we de pagina weer in een eenvoudige lineaire lay-out die ideaal is voor smalle en brede viewports.


### De paginastructuur maken

We hebben bepaald dat we het volgende nodig hebben:

1.  Een gedeelte waarin ons product `CS256: Mobile web development`-cursus uitvoerig wordt beschreven
2.  Een formulier om informatie te verzamelen van gebruikers die interesse hebben voor ons product
3.  Een uitgebreide beschrijving en video
4.  Afbeeldingen van het product in actie
5.  Een gegevenstabel met informatie als back-up van de claims

### TL;DR {: .hide-from-toc }
- Bepaal eerst de inhoud die u nodig heeft.
- Stel Information Architecture (IA) op voor smalle en brede viewports.
- Maak een geraamte van de pagina met inhoud maar zonder styling.


We hebben ook een architectuur van onbewerkte informatie en lay-out verkregen voor zowel de smalle als brede viewports.

<img class="attempt-left" src="images/narrowviewport.png" alt="Smalle viewport IA">
<img  class="attempt-right" src="images/wideviewport.png" alt="Brede viewport IA">
<div class="clearfix"></div>


U kunt dit gemakkelijk converteren naar de onbewerkte gedeelten van een geraamtepagina die we voor de rest van het project zullen gebruiken.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### Inhoud aan de pagina toevoegen

De basisstructuur van de website is klaar. We weten welke gedeelten we nodig hebben, de inhoud die we in deze gedeelten willen weergeven en waar we deze in de algemene informatie-architectuur willen plaatsen. We kunnen nu beginnen aan het bouwen van de website.

Note: stijl komt later

#### De kop en het formulier maken

De kop en het aanmeldingsformulier vormen de essentiële onderdelen van onze pagina. Deze moeten onmiddellijk aan de gebruiker worden weergegeven.

Voeg aan de kop eenvoudige tekst toe om de cursus te beschrijven:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

We moeten ook het formulier invullen.
Het formulier is eenvoudig en verzamelt de namen en telefoonnummers van de gebruikers en een goed moment om hen terug te bellen.

Alle formulieren moeten labels en placeholders bevatten zodat gebruikers zich gemakkelijk op elementen kunnen richten en kunnen begrijpen wat zo is bedoeld, en zodat toegankelijkheidstools de structuur van het formulier kunnen begrijpen. Het naamkenmerk stuurt niet alleen de formulierwaarde naar de server, het wordt ook gebruikt om de browser belangrijke hints te geven over het automatisch invullen van het formulier voor de gebruiker.

We voegen semantische typen toe zodat gebruikers snel en eenvoudig inhoud kunnen invoeren op een mobiel apparaat. Wanneer de gebruiker bijvoorbeeld een telefoonnummer invoert, wordt alleen een toetsenblok weergegeven.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Het gedeelte Video en informatie

Het gedeelte Video en informatie van inhoud is meer uitgebreid.
Het bevat een lijst met opsommingstekens van kenmerken van onze producten en ook een placeholder voor video die weergeeft hoe ons product voor de gebruiker werkt.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

Video`s worden vaak gebruikt om inhoud op een interactievere manier te beschrijven en om een product of een concept te demonstreren.

Door de best practices te volgen kunt u video gemakkelijk in uw website integreren:

*  Voeg een kenmerk `controls` toe zodat gebruikers de video gemakkelijk kunnen afspelen.
*  Voeg een `poster`-afbeelding toe zodat gebruikers een voorbeeld van de inhoud kunnen weergeven.
*  Voeg meerdere `<source>`-elementen toe op basis van ondersteunde videoindelingen.
*  Voeg `fall-back`-tekst toe zodat gebruikers de video kunnen downloaden als ze deze niet in het venster kunnen afspelen.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Het gedeelte Afbeeldingen maken

Websites zonder afbeeldingen kunnen saai zijn. Er zijn twee soorten afbeeldingen:

*  Inhoudsafbeeldingen &mdash; afbeeldingen die in het document staan en worden gebruikt om extra informatie over de inhoud weer te geven.
*  Stilistische afbeeldingen &mdash; afbeeldingen die worden gebruikt om de website mooier te maken. Dit zijn vaak achtergrondafbeeldingen, patronen en kleurovergangen. We bespreken dit in het [volgende artikel](#).

Het gedeelte Afbeeldingen in onze pagina is een verzameling van inhoudsafbeeldingen.

Inhoudsafbeeldingen zijn heel belangrijk om de betekenis van de pagina weer te geven. Vergelijk ze met de afbeeldingen die in krantenartikelen worden gebruikt. De afbeeldingen die we gebruiken zijn foto`s van de lesgevers van het project: Chris Wilson, Peter Lubbers en Sean Bennet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

De afbeeldingen zijn ingesteld om aan te passen naar 100% van de breedte van het scherm. Dit werkt goed op apparaten met een smalle viewport, maar minder goed op apparaten met een brede viewport (bijvoorbeeld een desktop). We bespreken dit in het gedeelte over responsive design.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

Vaak kunnen mensen geen afbeeldingen weergeven en gebruiken ze een ondersteunende technologie zoals een schermlezer die de gegevens op de pagina parseert en verbaal aan de gebruiker doorgeeft. U moet ervoor zorgen dat al uw inhoudsafbeeldingen een beschrijvende `alt`-tag hebben die de schermlezer aan de gebruiker kan doorgeven.

Wanneer u `alt`-tags toevoegt, moet u erop letten dat de alt-tekst de afbeelding zo beknopt mogelijk volledig beschrijft. In onze demo gebruiken we bijvoorbeeld het kenmerk `Name: Role`, dat genoeg informatie bevat zodat de gebruiker begrijpt dat in dit gedeelte de auteurs en hun functie worden besproken.

#### Het gedeelte Tabelgegevens toevoegen

Het laatste gedeelte is een eenvoudige tabel die wordt gebruikt om specifieke statistieken over het product weer te geven.

Tabellen mogen alleen worden gebruikt voor tabelgegevens, bijvoorbeeld matrices van informatie.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### Een voettekst toevoegen

De meeste websites hebben een voettekst nodig voor inhoud zoals Algemene voorwaarden, Vrijwaringen, en andere inhoud die niet past in de hoofdnavigatie of in het hoofdinhoud-gebied van de pagina.

Op onze website maken we gewoon een koppeling naar Algemene voorwaarden, een pagina Contact en onze sociale mediaprofielen.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### Samenvatting

We hebben overzicht van de website gemaakt en we hebben alle belangrijke structurele elementen bepaald. We hebben er ook voor gezorgd dat alle relevante inhoud klaar is en op de juiste plaats staat om aan onze zakelijke behoeften te voldoen.

<img class="attempt-left" src="images/content.png" alt="inhoud">
<img  class="attempt-right" src="images/narrowsite.png" alt="">
<div class="clearfix"></div>


Het is u misschien opgevallen dat de pagina helemaal niet mooi is. Dat is de bedoeling. 
Inhoud is het belangrijkste aspect van een website en we moesten ervoor zorgen dat we een goede solide informatiearchitectuur en -dichtheid hebben. Dankzij deze gids hebben we een uitstekende basis waarop we kunnen bouwen. In de volgende gids zullen we onze inhoud vormgeven.





## De pagina responsief maken 




Internet is toegankelijk op tal van apparaten, van telefoons met kleine schermen tot televisies met grote schermen. Elk apparaat biedt eigen unieke voordelen en beperkingen. Als webontwikkelaar wordt van u verwacht dat u voor alle soorten apparaten ondersteuning kunt bieden.


We bouwen een website die werkt op verschillende schermformaten en uiteenlopende apparaten. In het [vorige artikel](#) vormden we de informatiearchitectuur van de pagina en maakten we een basisstructuur.
In deze gids toveren we onze basisstructuur met inhoud om tot een mooie pagina die responsief is op een groot aantal schermformaten.


<figure class="attempt-left">
  <img  src="images/content.png" alt="Inhoud">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Inhoud en structuur </a>
  </figcaption>
</figure>
<figure class="attempt-right">
  <img  src="images/narrowsite.png" alt="Designed site">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Uiteindelijke website </a> </figcaption>
</figure>
<div class="clearfix"></div>


Volgens de principes van Mobile First-webontwikkeling beginnen we met een smalle viewport (vergelijkbaar met een mobiele telefoon) en bouwen we eerst voor die ervaring.
Daarna passen we de schaal aan grotere apparaten aan.
Dit kan door onze viewport breder te maken en te bepalen of het design en de lay-out er goed uitzien.

We hebben eerder enkele verschillende hoogwaardige ontwerpen gemaakt voor de manier waarop onze inhoud moet worden weergegeven. Nu moeten we ervoor zorgen dat onze pagina zich aanpast aan deze verschillende lay-outs.
We doen dit door te bepalen waar we onze breekpunten (een punt waar de lay-out en stijlen veranderen) plaatsen op basis van de manier waarop de inhoud in het schermformaat past.

### TL;DR {: .hide-from-toc }
- Gebruik altijd een viewport.
- Begin altijd met een smalle viewport en pas daarna de schaal aan.
- Plaats uw breekpunten daar waar u de inhoud moet aanpassen.
- Stel een gedegen visie op van uw lay-out in grote breekpunten.


### Voeg een viewport in

Zelfs voor een basispagina **moet** u altijd een viewport-metatag invoegen.
De viewport is het belangrijkste onderdeel dat u nodig heeft om ervaringen op meerdere apparaten te bouwen.
Zonder viewport werkt uw website niet goed op een mobiel apparaat.

De viewport vertelt de browser dat de pagina moet worden aangepast om in het scherm te passen. Er zijn veel verschillende configuraties voor uw viewport die u kunt gebruiken zodat u de weergave van de pagina kunt beheren. Standaard raden we het volgende aan:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

De viewport bevindt zich in de kop van het document en moet slechts eenmaal worden gedeclareerd.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### Pas eenvoudige stijl toe

Ons product en bedrijf heeft al erg specifieke richtlijnen voor merk en lettertype die in een stijlgids zijn opgenomen.

#### Stijlgids

Een stijlgids is een erg handige manier om een goed inzicht te krijgen in de visuele weergave van de pagina en helpt u ervoor te zorgen dat u consistent blijft in het hele design.

##### Kleuren

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Voeg stilistische afbeeldingen

In de vorige gids voegden we `inhoudsafbeeldingen` toe. Deze afbeeldingen waren belangrijk voor het verhaal van ons product. Stilistische afbeeldingen zijn afbeeldingen die niet noodzakelijk zijn als onderdeel van de kerninhoud maar die visuele flare toevoegen of de aandacht van de gebruiker op een specifiek gedeelte van de inhoud helpen vestigen.

Een goed voorbeeld hiervan is een kopafbeelding voor de `above the fold`-inhoud. Deze wordt vaak gebruikt om de gebruiker te overhalen om meer over het product te lezen.


<img  src="images/narrowsite.png" alt="Ontworpen website">


Het kan erg eenvoudig zijn om ze in te voegen. In ons voorbeeld wordt deze afbeelding de achtergrond van de kop en passen we deze toe via eenvoudige CSS.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

We hebben een eenvoudige achtergrondafbeelding gekozen die wazig is zodat de aandacht op de inhoud blijft gevestigd en we hebben ingesteld dat deze het hele element bedekt, zodat de hoogte-breedteverhouding ook tijdens het uitrekken blijft behouden.

<br style="clear: both;">

### Stel uw eerste breekpunt in

Het ontwerp ziet er pas slecht uit vanaf een breedte van 600 pixels. In ons voorbeeld is de regel langer dan 10 woorden (de optimale leeslengte) en dat willen we aanpassen.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Uw browser biedt geen ondersteuning voor video.
     <a href="videos/firstbreakpoint.mov">Download de video</a>.
  </p>
</video>

600 pixels blijkt een goede plaats voor ons eerste breekpunt, want het biedt ons het bereik om elementen te verplaatsen zodat ze beter op het scherm passen. We kunnen dit met behulp van de technologie [Mediaquery`s](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

Er is meer ruimte op een groter scherm, waardoor u flexibeler kunt zijn in de manier waarop inhoud wordt weergegeven.

Note: U hoeft niet alle elementen tegelijk te verplaatsen. U kunt zo nodig kleine aanpassingen doorvoeren.

In de context van onze productpagina moeten we:

*  De maximale breedte van het ontwerp beperken.
*  De opvulling van elementen aanpassen en de tekstgrootte verkleinen.
*  Het formulier verplaatsen zodat het op een lijn met de kop zweeft.
*  De video rond de inhoud laten zweven.
*  Het formaat van de afbeeldingen verkleinen en ze in een mooier rooster weergeven.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### De maximale breedte van het ontwerp beperken

We hebben gekozen voor slechts twee hoofdlay-outs: een smalle viewport en een brede viewport, waardoor ons bouwproces aanzienlijk eenvoudiger is.

We hebben ook beslist om aflopende gedeelten te maken in de smalle viewport die ook aflopend blijven in het brede viewport. Dit betekent dat we de maximale breedte van het scherm moeten beperken zodat de tekst en alinea`s op heel brede schermen niet één lange regel worden. We hebben ervoor gekozen dat dit punt op ongeveer 800 pixels ligt.

Om dit te bereiken moeten we de breedte beperken en de elementen centreren. We moeten rond elk groot gedeelte een container maken en een `marge:
auto` toepassen. Hierdoor kan het scherm groter worden maar blijft de inhoud gecentreerd en op een maximumgrootte van 800 pixels.

De container is een eenvoudige `div` in het volgende formulier:

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### De vulling aanpassen en de tekstgrootte verkleinen

In de smalle viewport hebben we niet veel ruimte om inhoud weer te geven, waardoor de grootte en het gewicht van de typografie vaak aanzienlijk worden verkleind om op het scherm te passen.

Bij een bredere viewport moeten we er rekening mee houden dat de gebruiker waarschijnlijk een groter scherm gebruikt, maar er verder van verwijderd is. Om de leesbaarheid van de inhoud te vergroten kunnen we de grootte en het gewicht van de typografie vergroten en bovendien de vulling aanpassen zodat afzonderlijke gebieden duidelijker opvallen.

Op onze productpagina verhogen we de vulling van de elementen in het gebied door in te stellen dat deze altijd 5% van de breedte behoudt. Bovendien vergroten we de grootte van de koppen voor elk gedeelte.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### Elementen aan een brede viewport aanpassen

Onze smalle viewport was een gestapelde lineaire weergave. Elk groot gedeelte en de inhoud ervan werd weergegeven in volgorde van boven naar beneden.

Een brede viewport biedt ons extra ruimte zodat we de inhoud op een optimale manier voor dat scherm kunnen weergeven. Voor onze productpagina betekent dit dat we volgens onze IA:

*  Het formulier naar de kopinformatie kunnen verplaatsen.
*  De video naar de rechterkant van de belangrijke punten kunnen verplaatsen.
*  De afbeeldingen naast elkaar kunnen plaatsen.
*  De tabel kunnen uitbreiden.

#### Het Formulierelement laten zweven

De smalle viewport biedt ons veel minder horizontale ruimte om elementen op het scherm te plaatsen.

Om op een efficiëntere manier gebruik te maken van de horizontale ruimte van het scherm moeten we de lineaire flow van de kop doorbreken en het formulier en de lijst naast elkaar plaatsen.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Uw browser biedt geen ondersteuning voor video.
     <a href="videos/floatingform.mov">Download de video</a>.
  </p>
</video>

#### Het Video-element laten zweven

De video in de interface met smalle viewport is ontworpen zodat deze de volledige breedte van het scherm inneemt en zich achter de lijst van belangrijke functies bevindt. In een brede viewport wordt de video te groot en ziet deze er niet goed uit wanneer we deze naast onze lijst van functies plaatsen.

Het video-element moet in een brede viewport uit de verticale flow van de smalle viewport worden gehaald en naast de lijst met opsommingstekens van inhoud worden weergegeven.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### De afbeeldingen naast elkaar plaatsen

De afbeeldingen in de interface met de smalle viewport (vooral mobiele apparaten) zijn ingesteld zodat ze de volledige breedte van het scherm innemen en verticaal worden gestapeld. Dit wordt niet goed aangepast in een brede viewport.

Opdat de afbeeldingen er goed uitzien in een brede viewport, worden ze aangepast tot 30% van de breedte van de container en horizontaal weergegeven (in plaats van verticaal in de smalle viewport). We voegen ook randradius en schaduw voor vak toe zodat de afbeeldingen er aantrekkelijker uitzien.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### Afbeeldingen responsief voor dpi maken

Wanneer u afbeeldingen gebruikt, moet u rekening houden met de grootte van de viewport en de dichtheid van de weergave.

Het internet werd gebouwd voor schermen met 96 dpi. Toen de mobiele apparaten werden geïntroduceerd, zagen we een aanzienlijke verhoging van de pixeldichtheid van schermen, waarbij we geen rekening houden met Retina-schermen op laptops. Afbeeldingen die zijn gecodeerd voor 96 dpi zien er vaak niet uit op een apparaat met veel dpi.

We hebben een oplossing die nog niet op grote schaal wordt gevolgd.
Voor browsers die het ondersteunen, kunt u een afbeelding met hoge dichtheid weergeven op een scherm met hoge dichtheid.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Tabellen

Het is heel moeilijk om tabellen juist weer te geven op apparaten met een smalle viewport en u moet er bijzondere aandacht aan besteden.

In een smalle viewport raden we u aan om uw tabel in twee rijen te maken, waarbij de kop en cellen in een rij worden omgezet om de kolomvorm te vormen.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Uw browser biedt geen ondersteuning voor video.
     <a href="videos/responsivetable.mov">Download de video</a>.
  </p>
</video>

Op onze website moesten we een extra breekpunt maken voor de tabelinhoud alleen.
Wanneer u eerst voor een mobiel apparaat bouwt, is het moeilijker om toegepaste stijlen ongedaan te maken. We moeten dus de tabel-CSS van de smalle viewport uit de CSS van de brede viewport halen.
We verkrijgen dan een duidelijke en consistente onderbreking.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### Afronden

**GEFELICITEERD.** Wanneer u dit leest, heeft u uw eerste eenvoudige landingspagina voor een product gemaakt die op veel verschillende apparaten, modellen en schermformaten werkt.

Als u deze richtlijnen volgt, maakt u een goed begin:

1.  Maak een basis-IA en zorg dat u eerst de inhoud en dan uw code begrijpt.
2.  Stel altijd een viewport in.
3.  Maak uw basiservaring volgens een aanpak voor mobiele apparaten eerst.
4.  Als u uw mobiele ervaring heeft, maakt u de weergave breder tot deze niet meer juist is en stelt u uw breekpunt daar in.
5.  Blijf herhalen.



