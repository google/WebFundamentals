project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Veel websites zijn niet geoptimaliseerd voor ervaringen op meerdere apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Inhoud aanpassen aan de viewport {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Op desktops en mobiele apparaten scrollen gebruikers altijd verticaal op websites, niet horizontaal. Als u de gebruiker verplicht om horizontaal te scrollen of uit te zoomen om de hele pagina te kunnen zien, zal de gebruikerservaring negatief zijn.


## TL;DR {: .hide-from-toc }
- Gebruik geen grote elementen met een vaste breedte.
- Inhoud mag voor een goede weergave niet afhankelijk zijn van een specifieke viewportbreedte.
- Gebruik CSS-mediaquery`s om voor kleine en grote schermen een andere styling toe te passen.


Wanneer u een mobiele website met een `meta viewport`-tag ontwikkelt, maakt u gemakkelijk pagina-inhoud die niet helemaal binnen de opgegeven viewport past. Een afbeelding die breder wordt weergegeven dan de viewport kan er bijvoorbeeld voor zorgen dat de gebruiker horizontaal moet scrollen in de viewport. U moet deze inhoud aanpassen zodat deze in de breedte van de viewport past, zodat de gebruiker niet horizontaal hoeft te scrollen.

Omdat de afmetingen en breedte van het scherm in CSS-pixels sterk variëren per apparaat (bijv. tussen telefoons en tablets, en zelfs tussen verschillende telefoons), mag inhoud voor een goede weergave niet afhankelijk zijn van een specifieke viewportbreedte.

Als u voor pagina-elementen grote absolute CSS-breedtes instelt (zoals het onderstaande voorbeeld), zal de `div` te breed zijn voor de viewport op een smaller scherm (bijv. een apparaat met een breedte van 320 CSS-pixels, zoals een iPhone). U kunt relatieve breedtewaarden gebruiken, zoals `width: 100%`.  Wees voorzichtig bij het gebruik van grote absolute positiewaarden die ervoor kunnen zorgen dat het element op kleine schermen buiten de viewport valt.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Pagina met een element met vaste breedte van 344 pixels op een iPhone.">
      Voorbeeld bekijken
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Pagina met een element met vaste breedte van 344 pixels op een Nexus 5.">
      Voorbeeld bekijken
    {% endlink_sample %}
  </div>
</div>



