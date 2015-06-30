---
layout: article
title: "Breekpunten kiezen"
description: "Veel websites zijn niet geoptimaliseerd voor ervaringen op meerdere apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm."
introduction: "Het mag dan wel handig zijn om na te denken over het bepalen van breekpunten op basis van soorten apparaten, u moet voorzichtig zijn. Het bepalen van breekpunten op basis van specifieke apparaten, producten, merknamen of besturingssystemen die tegenwoordig worden gebruikt, kan leiden tot een nachtmerrie op het gebied van onderhoud. De inhoud zelf moet bepalen hoe de lay-out zich aan de container aanpast."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 4
authors:
  - petelepage
collection: rwd-fundamentals
key-takeaways:
  set-viewport:
    - Gebruik metatags voor de viewport om de breedte en schaling van de browserviewport te bepalen.
    - Neem <code>width=device-width</code> op om de breedte van het scherm af te stemmen in apparaatonafhankelijke pixels.
    - Neem <code>initial-scale=1</code> op om een 1:1-verhouding te verkrijgen tussen CSS-pixels en apparaatonafhankelijke pixels.
    - Zorg ervoor dat uw pagina toegankelijk is door schaling voor gebruikers niet uit te schakelen.
  size-content-to-vp:
    - Gebruik geen grote elementen met een vaste breedte.
    - Inhoud mag voor een goede weergave niet afhankelijk zijn van een specifieke viewportbreedte.
    - Gebruik CSS-mediaquery`s om voor kleine en grote schermen een andere styling toe te passen.
  media-queries:
    - Met mediaquery`s kunt u stijlen toepassen op basis van apparaatkenmerken.
    - Gebruik <code>min-width</code> boven <code>min-device-width</code> om de breedste ervaring te garanderen.
    - Gebruik relatieve grootten voor elementen om te voorkomen dat de lay-out wordt onderbroken.
  choose-breakpoints:
    - Maak breekpunten altijd op basis van de inhoud, en niet op basis van apparaten, producten of merken.
    - Begin uw ontwerp eerst voor het kleinste mobiele apparaat en breid daarna steeds verder uit naarmate er meer schermruimte beschikbaar is.
    - Beperk tekstregels tot een maximum van ongeveer 70 tot 80 tekens.
remember:
  use-commas:
    - Gebruik een komma voor het scheiden van kenmerken, zodat ook oudere browsers de kenmerken goed kunnen parseren.
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Kies grote breekpunten door klein te beginnen en deze steeds groter te maken

Ontwerp de inhoud zodat deze eerst op een klein scherm past, breid het scherm steeds uit tot een breekpunt nodig is. Hierdoor kunt u breekpunten optimaliseren op basis van inhoud en moet u zo weinig mogelijk breekpunten onderhouden.

Laten we eens kijken naar het voorbeeld dat we in het begin hebben gezien, de [weersvoorspelling]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
In de eerste stap moeten we ervoor zorgen dat de weersvoorspelling er goed uitzien op een klein scherm.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Voorbeeld van de weersvoorspelling op een klein scherm.">
  {% endlink_sample %}
</figure>

Pas vervolgens de grootte van de browser aan tot er te veel witruimte is tussen de elementen en de weersvoorspelling er gewoon niet meer goed uitziet. Deze beslissing is enigszins subjectief, maar vanaf 600 pixels is echt te breed.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Voorbeeld van de weersvoorspelling terwijl de pagina breder wordt.">
  {% endlink_sample %}
</figure>

Als u op 600 pixels een breekpunt wilt invoegen, maakt u twee nieuwe stylesheets, één om te gebruiken wanneer de browser 600 pixels en kleiner is, en één wanneer de browser breder is dan 600 pixels.

{% include_code _code/weather-2.html mqweather2 %}

Ten slotte moet u de CSS herstructureren. In dit voorbeeld hebben we de meest gebruikte stijlen, zoals lettertypen, pictogrammen, basisplaatsing, kleuren in `weather.css` geplaatst. Specifieke lay-outs voor het kleine scherm worden dan in `weather-small.css` geplaatst en stijlen voor grote schermen worden in `weather-large.css` geplaatst.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Kies zo nodig voor kleinere breekpunten

Wanneer de lay-out aanzienlijk verandert, kunt u voor grote breekpunten kiezen. Bovendien kan het handig zijn om de lay-out gewoon aan te passen voor kleinere wijzigingen. Tussen grote breekpunten kan het bijvoorbeeld nuttig zijn om de marges of vulling op een element aan te passen of het lettertype te vergroten zodat het natuurlijker aanvoelt in de lay-out.

Laten we beginnen met het optimaliseren van de lay-out voor het kleine scherm. In dit geval kunnen we het lettertype versterken wanneer de viewport breder is dan 360 pixels. Wanneer er genoeg ruimte is, kunnen we daarna de hoge en lage temperatuur van elkaar scheiden zodat ze zich op dezelfde regel bevinden, in plaats van boven elkaar. Bovendien kunnen we de weerspictogrammen een beetje groter maken.

{% include_code _code/weather-small.css mqsmallbpsm css %}

<div class="clear">
  <div class="g--half">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="g--half g--last">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Voor de grote schermen beperkt u de maximale breedte van het paneel met de voorspelling zodat dit niet de hele breedte van het scherm inneemt.

{% include_code _code/weather-large.css mqsmallbplg css %}

## Optimaliseer tekst voor het lezen

Volgens de klassieke theorie over leesbaarheid moet een ideale kolom 70 tot 80 tekens per regel bevatten (ongeveer 8 tot 10 woorden in het Engels). Telkens wanneer de breedte van een tekstvak langer wordt dan 10 woorden, is een breekpunt raadzaam.

<div class="clear">
  <div class="g-wide--1 g-medium--half">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Voordat u kleine breekpunten toevoegt.">
  </div>

  <div class="g-wide--3 g-wide--last g-medium--half g--last">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Nadat u kleine breekpunten heeft toegevoegd.">
  </div>
</div>

Laten we het bovenstaande blogbericht nader bekijken. Op kleinere schermen werkt het lettertype Roboto perfect: we zien 10 woorden per regel. Op grotere schermen is er echter een breekpunt nodig. Als de browser breder is dan 575 pixels, is de ideale breedte voor de inhoud 550 pixels.

{% include_code _code/reading.html mqreading css %}

## Verberg inhoud nooit helemaal

Let goed op wanneer u kiest welke inhoud moet worden verborgen of weergegeven op basis van het schermformaat.
Verberg niet gewoon inhoud omdat het niet op het scherm past. Het schermformaat is geen definitieve aanwijzing van wat een gebruiker wil. Als u bijvoorbeeld de hoeveelheid pollen uit de weersvoorspelling verwijdert, kan dit een ernstig probleem zijn voor mensen die in de lente lijden aan een allergie en de informatie nodig hebben om te bepalen of ze naar buiten kunnen of niet.


{% include modules/nextarticle.liquid %}

{% endwrap %}

