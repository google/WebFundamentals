---
title: "CSS-mediaquery's gebruiken voor responsiveness"
description: "Veel onderdelen van het web zijn niet geoptimaliseerd voor ervaringen op verschillende soorten apparaten. Ontdek de basisbeginselen zodat uw website werkt op mobiele apparaten, desktops of iets anders met een scherm."
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - Gebruik metatags voor de viewport om de breedte en schaling van de browserviewport te bepalen.
    - Voeg <code>width=device-width</code> toe om de breedte van het scherm te matchen in apparaatonafhankelijke pixels.
    - Voeg <code>initial-scale=1</code> toe om een 1:1 relatie te leggen tussen CSS-pixels en apparaatonafhankelijke pixels.
    - Zorg ervoor dat uw pagina toegankelijk is door schaling voor gebruikers niet uit te schakelen.
  size-content-to-vp:
    - Gebruik geen grote elementen met een vaste breedte.
    - Inhoud mag voor een goede weergave niet afhankelijk zijn van een specifieke viewportbreedte.
    - Gebruik CSS-mediaquery's om voor kleine en grote schermen een andere styling toe te passen.
  media-queries:
    - Met mediaquery's kunt u stijlen toepassen op basis van apparaatkenmerken.
    - Gebruik <code>min-width</code> in plaats van <code>min-device-width</code> voor het meest brede resultaat.
    - Gebruik relatieve grootten voor elementen om te voorkomen dat de lay-out wordt onderbroken.
  choose-breakpoints:
    - "Maak breekpunten altijd op basis van de inhoud, en niet op basis van apparaten, producten of merken."
    - Begin uw ontwerp eerst voor het kleinste mobiele apparaat en breid daarna steeds verder uit naarmate er meer schermruimte beschikbaar is.
    - Beperk tekstregels tot een maximum van ongeveer 70 tot 80 tekens.
notes:
  use-commas:
    - "Gebruik een komma voor het scheiden van kenmerken, zodat ook oudere browsers de kenmerken goed kunnen parseren."
---
<p class="intro">
  Mediaquery's zijn eenvoudige filters die op CSS-stijlen kunnen worden toegepast. Hiermee kunt u vlot stijlen wijzigen op basis van de kenmerken van het apparaat waarop de inhoud wordt weergegeven, zoals het schermtype, de breedte, hoogte, oriëntatie en zelfs resolutie.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


U kunt bijvoorbeeld alle stijlen die nodig zijn voor afdrukken in een mediaquery voor afdrukken plaatsen:

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

Naast het gebruik van het kenmerk `media` in de link van het CSS-opmaakmodel, zijn er nog twee manieren om mediaquery`s toe te passen die in een CSS-bestand kunnen worden ingesloten: `@media` en `@import`. Met het oog op de prestaties, kunt u beter een van de eerste twee methoden kiezen dan de `@import`-syntax (zie [CSS-importbewerkingen vermijden]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

De logica die van toepassing is op mediaquery`s is niet wederzijds exclusief en elk filter dat aan de criteria voldoet, zorgt ervoor dat het uiteindelijke CSS-blok wordt toegepast met behulp van de standaardregels voor bewerkingsvolgorde in CSS.

## Mediaquery`s toepassen op basis van de grootte van de viewport

Met mediaquery`s kunt u een responsieve ervaring creëren, waarbij bepaalde stijlen worden toegepast op kleine en grote schermen en alles daartussenin.  Door de syntax van de mediaquery ontstaan regels die vervolgens kunnen worden toegepast, afhankelijk van de kenmerken van het apparaat.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

Er zijn verschillende items waarvoor een query kan worden uitgevoerd, maar de meestgebruikte in webdesign zijn `min-width`, `max-width`, `min-height` en `max-height`


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="kenmerk">kenmerk</th>
      <th data-th="Resultaat">Resultaat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="kenmerk"><code>min-width</code></td>
      <td data-th="Resultaat">Regels die worden toegepast voor elke browserbreedte boven de in de query gedefinieerde waarde.</td>
    </tr>
    <tr>
      <td data-th="kenmerk"><code>max-width</code></td>
      <td data-th="Resultaat">Regels die worden toegepast voor elke browserbreedte onder de in de query gedefinieerde waarde.</td>
    </tr>
    <tr>
      <td data-th="kenmerk"><code>min-height</code></td>
      <td data-th="Resultaat">Regels die worden toegepast voor elke browserhoogte boven de in de query gedefinieerde waarde.</td>
    </tr>
    <tr>
      <td data-th="kenmerk"><code>max-height</code></td>
      <td data-th="Resultaat">Regels die worden toegepast voor elke browserhoogte onder de in de query gedefinieerde waarde.</td>
    </tr>
    <tr>
      <td data-th="kenmerk"><code>orientation=portrait</code></td>
      <td data-th="Resultaat">Regels die worden toegepast voor elke browser waarvan de hoogte groter is dan of gelijk is aan de breedte.</td>
    </tr>
    <tr>
      <td data-th="kenmerk"><code>orientation=landscape</code></td>
      <td data-th="Resultaat">Regels die worden toegepast voor elke browser waarvan de breedte groter is dan de hoogte.</td>
    </tr>
  </tbody>
</table>

Een voorbeeld:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Met behulp van mediaquery's een voorbeeld bekijken van een pagina om eigenschappen te kunnen wijzigen tijdens het aanpassen van de grootte.">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* Als de browser tussen <b>0px</b> en <b>640px</b> breed is, wordt `max-640px.css` toegepast.
* Als de browser tussen <b>500px</b> en <b>600px</b> breed is, worden stijlen binnen de `@media` toegepast.
* Als de browser <b>640px of breder</b> is, wordt `min-640px.css` toegepast.
* Als de breedte van de browser <b>groter is dan de hoogte</b>, wordt `landscape.css` toegepast.
* Als de hoogte van de browser <b>groter is dan de breedte</b>, wordt `portrait.css` toegepast.


## Een opmerking over `min-device-width`

Het is ook mogelijk query`s te maken op basis van de `*-device-width`, maar deze methode wordt **sterk ontraden**.

Het verschil is subtiel, maar erg belangrijk: `min-width` is gebaseerd op de grootte van het browservenster, terwijl `min-device-width` is gebaseerd op de grootte van het scherm. De breedte van het apparaat wordt door enkele browsers, bijvoorbeeld de oude Android-browser, niet correct gerapporteerd. In plaats van dat de breedte van de viewport wordt gerapporteerd, zoals verwacht, wordt de schermgrootte in apparaatpixels weergegeven.

Bovendien kunt u door het gebruik van `*-device-width` voorkomen dat inhoud wordt aangepast op desktopcomputers of andere apparaten waarop de grootte van vensters kan worden gewijzigd, omdat de query is gebaseerd op de feitelijke grootte van het apparaat en niet op de grootte van het browservenster.

## Relatieve eenheden gebruiken

Een cruciaal concept in responsive design zijn de vloeiende en proportionele kwaliteiten ten opzichte van lay-outs met vaste breedte. Het gebruik van relatieve eenheden voor maten kan de lay-out helpen vereenvoudigen en voorkomt dat er ongewild componenten worden gemaakt die te groot zijn voor de viewport.

Door bijvoorbeeld breedte: 100% op een bovenste div in te stellen, weet u zeker dat de breedte van de viewport geheel wordt omvat en dat de waarde nooit te groot of te klein is voor de viewport. De div zal altijd passen, ongeacht of het gaat om een 320 px brede iPhone, 342 px brede Blackberry Z10 of een 360 px brede Nexus 5.

Bovendien kunnen browsers dankzij relatieve eenheden de inhoud weergeven op basis van het zoomniveau van de gebruiker zonder dat horizontale schuifbalken op de pagina nodig zijn.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



