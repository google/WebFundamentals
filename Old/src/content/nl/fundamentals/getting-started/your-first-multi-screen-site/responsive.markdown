---
title: "De pagina responsief maken"
description: "Internet is toegankelijk op tal van apparaten, van telefoons met kleine schermen tot televisies met grote schermen. Ontdek hoe u een website maakt die op al deze apparaten goed werkt."
key-takeaways:
  make-responsive:
    - Gebruik altijd een viewport.
    - Begin altijd met een smalle viewport en pas daarna de schaal aan.
    - Plaats uw breekpunten daar waar u de inhoud moet aanpassen.
    - Stel een gedegen visie op van uw lay-out in grote breekpunten.
related-guides:
  responsive:
    -
      title: De viewport instellen
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Responsive webdesign"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Inhoud aanpassen aan de viewport
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Responsive webdesign"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Mediaquery's gebruiken
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Responsive webdesign"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Lay-outpatronen
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Lay-outpatronen"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Meestal vloeiende lay-out
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Responsive webdesign"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "Img's verbeteren met srcset voor apparaten met hoge dpi"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Afbeeldingen"
        href: media/images/
    -
      title: "Mediaquery's gebruiken om afbeeldingen met hoge resolutie of art direction te bieden"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Afbeeldingen"
        href: media/images/

notes:
  styling:
    - We zijn uitgegaan van enkele stijlen met kleuren, opvullingen en lettertypen die overeenkomen met onze merkrichtlijnen.
  not-all-at-once:
    - U hoeft niet alle elementen tegelijk te verplaatsen. U kunt zo nodig kleine aanpassingen doorvoeren.
updated_on: 2014-04-23
---

<p class="intro">
  Internet is toegankelijk op tal van apparaten, van telefoons met kleine schermen tot televisies met grote schermen. Elk apparaat biedt eigen unieke voordelen en beperkingen. Als webontwikkelaar wordt van u verwacht dat u voor alle soorten apparaten ondersteuning kunt bieden.
</p>

{% include shared/toc.liquid %}

We bouwen een website die werkt op verschillende schermformaten en uiteenlopende apparaten. In het [vorige artikel]({{page.previousPage.relative_url}}) vormden we de informatiearchitectuur van de pagina en maakten we een basisstructuur.
In deze gids toveren we onze basisstructuur met inhoud om tot een mooie pagina die responsief is op een groot aantal schermformaten.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Inhoud">
    <figcaption>{% link_sample _code/content-without-styles.html %} Inhoud en structuur {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} Uiteindelijke website {% endlink_sample %} </figcaption>
  </figure>
</div>

Volgens de principes van Mobile First-webontwikkeling beginnen we met een smalle viewport (vergelijkbaar met een mobiele telefoon) en bouwen we eerst voor die ervaring.
Daarna passen we de schaal aan grotere apparaten aan.
Dit kan door onze viewport breder te maken en te bepalen of het design en de lay-out er goed uitzien.

We hebben eerder enkele verschillende hoogwaardige ontwerpen gemaakt voor de manier waarop onze inhoud moet worden weergegeven. Nu moeten we ervoor zorgen dat onze pagina zich aanpast aan deze verschillende lay-outs.
We doen dit door te bepalen waar we onze breekpunten (een punt waar de lay-out en stijlen veranderen) plaatsen op basis van de manier waarop de inhoud in het schermformaat past.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Voeg een viewport in

Zelfs voor een basispagina **moet** u altijd een viewport-metatag invoegen.
De viewport is het belangrijkste onderdeel dat u nodig heeft om ervaringen op meerdere apparaten te bouwen.
Zonder viewport werkt uw website niet goed op een mobiel apparaat.

De viewport vertelt de browser dat de pagina moet worden aangepast om in het scherm te passen. Er zijn veel verschillende configuraties voor uw viewport die u kunt gebruiken zodat u de weergave van de pagina kunt beheren. Standaard raden we het volgende aan:

{% include_code src=_code/viewport.html snippet=viewport %}

De viewport bevindt zich in de kop van het document en moet slechts eenmaal worden gedeclareerd.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Pas eenvoudige stijl toe

Ons product en bedrijf heeft al erg specifieke richtlijnen voor merk en lettertype die in een stijlgids zijn opgenomen.

### Stijlgids

Een stijlgids is een erg handige manier om een goed inzicht te krijgen in de visuele weergave van de pagina en helpt u ervoor te zorgen dat u consistent blijft in het hele design.

#### Kleuren

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Voeg stilistische afbeeldingen

In de vorige gids voegden we `inhoudsafbeeldingen` toe. Deze afbeeldingen waren belangrijk voor het verhaal van ons product. Stilistische afbeeldingen zijn afbeeldingen die niet noodzakelijk zijn als onderdeel van de kerninhoud maar die visuele flare toevoegen of de aandacht van de gebruiker op een specifiek gedeelte van de inhoud helpen vestigen.

Een goed voorbeeld hiervan is een kopafbeelding voor de `above the fold`-inhoud. Deze wordt vaak gebruikt om de gebruiker te overhalen om meer over het product te lezen.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Ontworpen website">
</div>

Het kan erg eenvoudig zijn om ze in te voegen. In ons voorbeeld wordt deze afbeelding de achtergrond van de kop en passen we deze toe via eenvoudige CSS.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

We hebben een eenvoudige achtergrondafbeelding gekozen die wazig is zodat de aandacht op de inhoud blijft gevestigd en we hebben ingesteld dat deze het hele element bedekt, zodat de hoogte-breedteverhouding ook tijdens het uitrekken blijft behouden.

<br style="clear: both;">

## Stel uw eerste breekpunt in

Het ontwerp ziet er pas slecht uit vanaf een breedte van 600 pixels. In ons voorbeeld is de regel langer dan 10 woorden (de optimale leeslengte) en dat willen we aanpassen.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Uw browser biedt geen ondersteuning voor video.
     <a href="videos/firstbreakpoint.mov">Download de video</a>.
  </p>
</video>

600 pixels blijkt een goede plaats voor ons eerste breekpunt, want het biedt ons het bereik om elementen te verplaatsen zodat ze beter op het scherm passen. We kunnen dit met behulp van de technologie [Mediaquery`s]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Er is meer ruimte op een groter scherm, waardoor u flexibeler kunt zijn in de manier waarop inhoud wordt weergegeven.

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

In de context van onze productpagina moeten we:

*  De maximale breedte van het ontwerp beperken.
*  De opvulling van elementen aanpassen en de tekstgrootte verkleinen.
*  Het formulier verplaatsen zodat het op een lijn met de kop zweeft.
*  De video rond de inhoud laten zweven.
*  Het formaat van de afbeeldingen verkleinen en ze in een mooier rooster weergeven.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## De maximale breedte van het ontwerp beperken

We hebben gekozen voor slechts twee hoofdlay-outs: een smalle viewport en een brede viewport, waardoor ons bouwproces aanzienlijk eenvoudiger is.

We hebben ook beslist om aflopende gedeelten te maken in de smalle viewport die ook aflopend blijven in het brede viewport. Dit betekent dat we de maximale breedte van het scherm moeten beperken zodat de tekst en alinea`s op heel brede schermen niet één lange regel worden. We hebben ervoor gekozen dat dit punt op ongeveer 800 pixels ligt.

Om dit te bereiken moeten we de breedte beperken en de elementen centreren. We moeten rond elk groot gedeelte een container maken en een `marge:
auto` toepassen. Hierdoor kan het scherm groter worden maar blijft de inhoud gecentreerd en op een maximumgrootte van 800 pixels.

De container is een eenvoudige `div` in het volgende formulier:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## De vulling aanpassen en de tekstgrootte verkleinen

In de smalle viewport hebben we niet veel ruimte om inhoud weer te geven, waardoor de grootte en het gewicht van de typografie vaak aanzienlijk worden verkleind om op het scherm te passen.

Bij een bredere viewport moeten we er rekening mee houden dat de gebruiker waarschijnlijk een groter scherm gebruikt, maar er verder van verwijderd is. Om de leesbaarheid van de inhoud te vergroten kunnen we de grootte en het gewicht van de typografie vergroten en bovendien de vulling aanpassen zodat afzonderlijke gebieden duidelijker opvallen.

Op onze productpagina verhogen we de vulling van de elementen in het gebied door in te stellen dat deze altijd 5% van de breedte behoudt. Bovendien vergroten we de grootte van de koppen voor elk gedeelte.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## Elementen aan een brede viewport aanpassen

Onze smalle viewport was een gestapelde lineaire weergave. Elk groot gedeelte en de inhoud ervan werd weergegeven in volgorde van boven naar beneden.

Een brede viewport biedt ons extra ruimte zodat we de inhoud op een optimale manier voor dat scherm kunnen weergeven. Voor onze productpagina betekent dit dat we volgens onze IA:

*  Het formulier naar de kopinformatie kunnen verplaatsen.
*  De video naar de rechterkant van de belangrijke punten kunnen verplaatsen.
*  De afbeeldingen naast elkaar kunnen plaatsen.
*  De tabel kunnen uitbreiden.

### Het Formulierelement laten zweven

De smalle viewport biedt ons veel minder horizontale ruimte om elementen op het scherm te plaatsen.

Om op een efficiëntere manier gebruik te maken van de horizontale ruimte van het scherm moeten we de lineaire flow van de kop doorbreken en het formulier en de lijst naast elkaar plaatsen.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Uw browser biedt geen ondersteuning voor video.
     <a href="videos/floatingform.mov">Download de video</a>.
  </p>
</video>

### Het Video-element laten zweven

De video in de interface met smalle viewport is ontworpen zodat deze de volledige breedte van het scherm inneemt en zich achter de lijst van belangrijke functies bevindt. In een brede viewport wordt de video te groot en ziet deze er niet goed uit wanneer we deze naast onze lijst van functies plaatsen.

Het video-element moet in een brede viewport uit de verticale flow van de smalle viewport worden gehaald en naast de lijst met opsommingstekens van inhoud worden weergegeven.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### De afbeeldingen naast elkaar plaatsen

De afbeeldingen in de interface met de smalle viewport (vooral mobiele apparaten) zijn ingesteld zodat ze de volledige breedte van het scherm innemen en verticaal worden gestapeld. Dit wordt niet goed aangepast in een brede viewport.

Opdat de afbeeldingen er goed uitzien in een brede viewport, worden ze aangepast tot 30% van de breedte van de container en horizontaal weergegeven (in plaats van verticaal in de smalle viewport). We voegen ook randradius en schaduw voor vak toe zodat de afbeeldingen er aantrekkelijker uitzien.

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### Afbeeldingen responsief voor dpi maken

Wanneer u afbeeldingen gebruikt, moet u rekening houden met de grootte van de viewport en de dichtheid van de weergave.

Het internet werd gebouwd voor schermen met 96 dpi. Toen de mobiele apparaten werden geïntroduceerd, zagen we een aanzienlijke verhoging van de pixeldichtheid van schermen, waarbij we geen rekening houden met Retina-schermen op laptops. Afbeeldingen die zijn gecodeerd voor 96 dpi zien er vaak niet uit op een apparaat met veel dpi.

We hebben een oplossing die nog niet op grote schaal wordt gevolgd.
Voor browsers die het ondersteunen, kunt u een afbeelding met hoge dichtheid weergeven op een scherm met hoge dichtheid.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Tabellen

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

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## Afronden

**GEFELICITEERD.** Wanneer u dit leest, heeft u uw eerste eenvoudige landingspagina voor een product gemaakt die op veel verschillende apparaten, modellen en schermformaten werkt.

Als u deze richtlijnen volgt, maakt u een goed begin:

1.  Maak een basis-IA en zorg dat u eerst de inhoud en dan uw code begrijpt.
2.  Stel altijd een viewport in.
3.  Maak uw basiservaring volgens een aanpak voor mobiele apparaten eerst.
4.  Als u uw mobiele ervaring heeft, maakt u de weergave breder tot deze niet meer juist is en stelt u uw breekpunt daar in.
5.  Blijf herhalen.



