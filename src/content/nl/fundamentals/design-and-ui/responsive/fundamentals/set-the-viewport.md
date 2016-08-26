project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Veel websites zijn niet geoptimaliseerd voor ervaringen op meerdere apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# De viewport instellen {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Pagina's die voor verschillende apparaten zijn geoptimaliseerd moeten een meta-viewport-element bevatten in de kop van het document. Een metatag voor viewport geeft de browser instructies over de manier waarop de afmetingen en schaalbaarheid van de pagina moeten worden beheerd.




## TL;DR {: .hide-from-toc }
- Gebruik metatags voor de viewport om de breedte en schaling van de browserviewport te bepalen.
- Neem <code>width=device-width</code> op om de breedte van het scherm af te stemmen in apparaatonafhankelijke pixels.
- 'Neem <code>initial-scale=1</code> op om een 1:1-verhouding te verkrijgen tussen CSS-pixels en apparaatonafhankelijke pixels.'
- Zorg ervoor dat uw pagina toegankelijk is door schaling voor gebruikers niet uit te schakelen.


In een poging om de beste ervaring te leveren geven mobiele browsers de pagina weer met de breedte van een desktopscherm (doorgaans ongeveer 980 pixels, maar dit varieert per apparaat) en proberen ze de inhoud dan beter weer te geven door de tekengrootte te vergroten en de inhoud aan het scherm aan te passen. Gebruikers zien dat de tekengrootten niet consistent zijn en moeten dubbeltikken of knijpen om te zoomen zodat ze de inhoud kunnen zien en er op kunnen reageren.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Door het gebruik van de metawaarde voor viewport `width=device-width` krijgt de pagina de instructie om de breedte van het scherm af te stemmen in apparaatonafhankelijke pixels. Hierdoor kan de pagina de inhoud dynamisch aanpassen zodat deze in verschillende schermformaten past, zowel op een kleine mobiele telefoon als op een groot desktopscherm.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Pagina waarvoor geen viewport is ingesteld">
      Voorbeeld bekijken
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Pagina waarvoor een viewport is ingesteld">
      Voorbeeld bekijken
    {% endlink_sample %}
  </div>
</div>

Wanneer naar de liggende modus wordt geschakeld, behouden sommige browsers de breedte van de pagina en zoomen ze in op de inhoud in plaats van deze dynamisch aan te passen om het scherm te vullen. Het kenmerk `initial-scale=1` geeft browsers de instructie om een 1:1-verhouding in te stellen tussen CSS-pixels en apparaatonafhankelijke pixels, ongeacht de apparaatoriëntatie. De pagina kan dan optimaal gebruikmaken van de volledige liggende breedte.

<!-- TODO: Verify note type! -->
Note: Gebruik een komma voor het scheiden van kenmerken, zodat ook oudere browsers de kenmerken goed kunnen parseren.

## Zorg voor een toegankelijke viewport

Naast het instellen van een `initial-scale` kunt u ook de volgende kenmerken voor de viewport instellen:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Wanneer deze zijn ingesteld, kunnen ze ervoor zorgen dat de gebruiker niet kan in- en uitzoomen op de viewport, waardoor toegankelijkheidsproblemen kunnen ontstaan.



