---
title: "Basisbeginselen voor responsive webdesign"
description: "Veel websites zijn niet geoptimaliseerd voor ervaringen op meerdere apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm."
updated_on: 2014-04-30
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
    - "Maak breekpunten altijd op basis van de inhoud, en niet op basis van apparaten, producten of merken."
    - Begin uw ontwerp eerst voor het kleinste mobiele apparaat en breid daarna steeds verder uit naarmate er meer schermruimte beschikbaar is.
    - Beperk tekstregels tot een maximum van ongeveer 70 tot 80 tekens.
notes:
  use-commas:
    - "Gebruik een komma voor het scheiden van kenmerken, zodat ook oudere browsers de kenmerken goed kunnen parseren."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
<p class="intro">
  Het gebruik van mobiele apparaten om op internet te browsen neemt enorm snel toe. Veel websites zijn echter nog niet geoptimaliseerd voor die mobiele apparaten. Mobiele apparaten zijn vaak beperkt door de grootte van het scherm en vereisen een andere aanpak voor de manier waarop de inhoud op het scherm wordt weergegeven.
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Er bestaan heel veel verschillende schermformaten op telefoons, `phablets`, tablets, desktops, gameconsoles, tv`s, zelfs wearables. De schermformaten zullen altijd wijzigen en daarom is het belangrijk dat uw website zich aan elk formaat kan aanpassen, nu en in de toekomst.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Responsive webdesign, oorspronkelijk gedefinieerd door [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/) beantwoordt aan de behoeften van de gebruikers en de apparaten die zij gebruiken. De lay-out verandert op basis van de grootte en mogelijkheden van het apparaat. Op een telefoon zien gebruikers inhoud bijvoorbeeld in één kolom, terwijl een tablet dezelfde inhoud misschien in twee kolommen weergeeft.



