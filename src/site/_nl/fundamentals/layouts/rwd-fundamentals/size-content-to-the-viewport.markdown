---
layout: article
title: "Inhoud aanpassen aan de viewport"
description: "Veel websites zijn niet geoptimaliseerd voor ervaringen op meerdere apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm."
introduction: "Op desktops en mobiele apparaten scrollen gebruikers altijd verticaal op websites, niet horizontaal. Als u de gebruiker verplicht om horizontaal te scrollen of uit te zoomen om de hele pagina te kunnen zien, zal de gebruikerservaring negatief zijn."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 2
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
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
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

{% include modules/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

Wanneer u een mobiele website met een `meta viewport`-tag ontwikkelt, maakt u gemakkelijk pagina-inhoud die niet helemaal binnen de opgegeven viewport past. Een afbeelding die breder wordt weergegeven dan de viewport kan er bijvoorbeeld voor zorgen dat de gebruiker horizontaal moet scrollen in de viewport. U moet deze inhoud aanpassen zodat deze in de breedte van de viewport past, zodat de gebruiker niet horizontaal hoeft te scrollen.

Omdat de afmetingen en breedte van het scherm in CSS-pixels sterk variëren per apparaat (bijv. tussen telefoons en tablets, en zelfs tussen verschillende telefoons), mag inhoud voor een goede weergave niet afhankelijk zijn van een specifieke viewportbreedte.

Als u voor pagina-elementen grote absolute CSS-breedtes instelt (zoals het onderstaande voorbeeld), zal de `div` te breed zijn voor de viewport op een smaller scherm (bijv. een apparaat met een breedte van 320 CSS-pixels, zoals een iPhone). U kunt relatieve breedtewaarden gebruiken, zoals `width: 100%`.  Wees voorzichtig bij het gebruik van grote absolute positiewaarden die ervoor kunnen zorgen dat het element op kleine schermen buiten de viewport valt.

<div class="clear">
  <div class="g--half">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Pagina met een element met vaste breedte van 344 pixels op een iPhone.">
      Voorbeeld bekijken
    {% endlink_sample %}
  </div>

  <div class="g--half g--last">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Pagina met een element met vaste breedte van 344 pixels op een Nexus 5.">
      Voorbeeld bekijken
    {% endlink_sample %}
  </div>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

