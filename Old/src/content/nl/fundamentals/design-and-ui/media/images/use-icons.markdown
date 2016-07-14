---
title: "SVG gebruiken voor pictogrammen"
description: "Gebruik bij het toevoegen van pictogrammen aan uw pagina waar mogelijk SVG-pictogrammen of, in bepaalde gevallen, unicode-tekens."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - "Gebruik SVG of unicode voor pictogrammen in plaats van rasterafbeeldingen."
---

<p class="intro">
  Gebruik bij het toevoegen van pictogrammen aan uw pagina waar mogelijk SVG-pictogrammen of, in bepaalde gevallen, unicode-tekens.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Eenvoudige pictogrammen vervangen door unicode

Veel lettertypen bevatten ondersteuning voor de duizenden unicode-symbolen die in plaats van afbeeldingen kunnen worden gebruikt. Anders dan afbeeldingen, kunnen unicode-lettertypen zonder problemen worden geschaald en zien ze er goed uit, ongeacht hoe klein of groot ze op het scherm verschijnen.

Behalve de gebruikelijke tekenset omvat unicode soms ook symbolen voor getaltypen (&#8528;), pijlen (&#8592;), wiskundige bewerkingstekens (&#8730;), geometrische vormen (&#9733;), besturingsafbeeldingen (&#9654;), braillepatronen (&#10255;), muzieknotatie (&#9836;), Griekse letters (&#937;) en zelfs schaakstukken (&#9822;).

Het toevoegen van een unicode-teken gebeurt op dezelfde manier als bij entiteiten met een naam: `&#XXXX`, waarbij `XXXX` staat voor het nummer van het unicode-teken. Bijvoorbeeld:

{% highlight html %}
U bent een super &#9733;
{% endhighlight %}

U bent een super &#9733;

## Complexe pictogrammen vervangen door SVG
Voor meer complexe pictogramvereisten zijn SVG-pictogrammen over het algemeen licht, gebruiksvriendelijk en geschikt voor styling met CSS. Vergeleken bij rasterafbeeldingen biedt SVG een aantal voordelen:

* Het zijn vectorafbeeldingen die oneindig kunnen worden geschaald.
* CSS-effecten zoals kleur, arcering, transparantie en animaties zijn eenvoudig.
* SVG-afbeeldingen kunnen rechtstreeks in het document worden geplaatst.
* Ze zijn semantisch.
* Bieden een betere toegankelijkheid met de juiste kenmerken.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## Let goed op bij het gebruik van pictogramlettertypen

Pictogramlettertypen zijn populair en kunnen soms handig zijn, maar vergeleken bij SVG-pictogrammen kennen ze ook enkele nadelen.

* Het zijn vectorafbeeldingen die oneindig kunnen worden geschaald, maar ze kunnen vloeiend zijn, wat pictogrammen kan opleveren die minder scherp zijn dan verwacht.
* Beperkte styling met CSS.
* Een perfecte positionering van pixels kan lastig zijn, afhankelijk van de regelhoogte, letterafstand, enzovoort.
* Ze zijn niet semantisch en kunnen onhandig zijn voor gebruik met schermlezers of andere ondersteunende technologie.
* Tenzij ze correct zijn gerelateerd aan een bereik, kunnen ze resulteren in een groot bestandsformaat terwijl maar een kleine subset van de beschikbare pictogrammen wordt gebruikt. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Voorbeeld van een pagina waar FontAwesome is gebruikt voor de lettertypepictogrammen.">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

Er bestaand honderden gratis en betaalde pictogramlettertypen, zoals [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) en [Glyphicons](http://glyphicons.com/).

Weeg de zwaarte van het extra HTTP-verzoek en de bestandsgrootte af tegen de noodzaak van pictogrammen. Als u bijvoorbeeld maar een paar pictogrammen nodig heeft, kunt u beter gewoon een afbeelding of afbeeldingssprite gebruiken.



