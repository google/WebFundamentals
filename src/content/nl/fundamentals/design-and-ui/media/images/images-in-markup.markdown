---
title: "Afbeeldingen in opmaak"
description: "Het element img is een krachtig element. U kunt er inhoud mee downloaden, decoderen en weergeven. Door moderne browsers worden veel verschillende afbeeldingsindelingen ondersteund."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Gebruik relatieve grootten voor afbeeldingen zodat deze niet per abuis tot buiten de randen van de container overlopen."
    - "Gebruik het element <code>picture</code> als u afhankelijk van de kenmerken van een apparaat andere afbeeldingen wilt opgeven (dit wordt ook wel art direction genoemd)."
    - "Gebruik <code>srcset</code> en de descriptor <code>x</code> in het element <code>img</code> om de browser te helpen de beste afbeelding te kiezen wanneer er uit verschillende dichtheden moet worden gekozen."
notes:
  picture-support:
    - "Het element <code>picture</code> wordt langzaamaan steeds meer toegepast in browsers. Hoewel het nog niet in iedere browser beschikbaar is, bevelen we het gebruik hiervan aan vanwege de sterke terugwaartse compatibiliteit en het mogelijke gebruik van de <a href='http://picturefill.responsiveimages.org/'>Picturefill polyfill</a>. Zie voor meer informatie de site <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>."
  compressive:
    - "Ga verstandig om met de compressietechniek omdat deze hogere geheugen- en decoderingskosten met zich meebrengt. Het aanpassen van het formaat van grote afbeeldingen zodat ze op een kleiner scherm passen is duur en kan vooral op low-end apparaten lastig zijn omdat zowel het geheugen als de verwerkingsmogelijkheden hierop beperkt zijn."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  Het element <code>img</code> is een krachtig element. U kunt er inhoud mee downloaden, decoderen en weergeven. Door moderne browsers worden veel verschillende afbeeldingsindelingen ondersteund. Het toevoegen van afbeeldingen voor mobiele apparaten gebeurt in principe op dezelfde manier als voor desktopcomputers. Er zijn slechts een paar kleine aanpassingen nodig om een goede ervaring voor mobiele gebruikers te kunnen realiseren.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Relatieve formaten gebruiken voor afbeeldingen

Vergeet niet om relatieve eenheden te gebruiken bij het opgeven van de breedte van afbeeldingen zodat deze niet per abuis tot buiten de randen van de viewport overlopen. Bijvoorbeeld `width: 50%;` zorgt ervoor dat de breedte van de afbeelding 50% van het omvattende element is (niet de viewport of de feitelijke pixelgrootte).

Aangezien CSS inhoud toestaat over te lopen tot buiten de begrenzing van de container, kan het nodig zijn max-width: 100% te gebruiken, zodat afbeeldingen en andere inhoud binnen de container blijven. Bijvoorbeeld:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Zorg voor zinvolle beschrijvingen via het kenmerk `alt` in `img`-elementen. Zo maakt u uw site beter toegankelijk door schermlezers en andere ondersteunende technologieën een context te bieden.

## Breid `img`-elementen uit met `srcset` voor high-DPI apparaten

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Het kenmerk <code>srcset</code> verbetert het gedrag van het element <code>img</code>, waardoor het eenvoudiger wordt om meerdere afbeeldingsbestanden te leveren voor verschillende apparaatkenmerken. Net zoals de bij CSS behorende <code>image-set</code> <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS-functie</a>, stelt <code>srcset</code> de browser in staat de beste afbeelding te kiezen afhankelijk van de kenmerken van het apparaat, bijvoorbeeld een 2x afbeelding gebruiken op een 2x-scherm en in de toekomst wellicht een 1x afbeelding op een 2x-apparaat in een netwerk met beperkte bandbreedte.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

Op browsers die `srcset` niet ondersteunen, maakt de browser gewoon gebruik van het standaard-afbeeldingsbestand dat door het kenmerk `src` is opgegeven. Daarom is het belangrijk altijd een 1x afbeelding op te nemen die op elk willekeurig apparaat kan worden weergegeven, los van de capaciteiten.  Wanneer `srcset` wordt ondersteund, wordt de lijst met door komma`s gescheiden waarden met afbeeldingen/voorwaarden geparseerd voordat er verzoeken worden gedaan. Vervolgens wordt alleen de meest geschikte afbeelding gedownload en weergegeven.

De voorwaarden kunnen allerlei zaken omvatten, van pixeldichtheid tot breedte en hoogte. Alleen pixeldichtheid wordt momenteel goed ondersteund.  Als u het huidige gedrag wilt afstemmen op toekomstige functies, kunt u het beste de 2x afbeelding in het kenmerk opgeven.

## Art direction in responsieve afbeeldingen met `picture`

Het wijzigen van afbeeldingen op basis van apparaatkenmerken, ook wel `art direction` genoemd, kan worden gedaan met behulp van het element picture. Met het element <code>picture</code> wordt een declaratieve oplossing gedefinieerd voor het verkrijgen van meerdere versies van een afbeelding op basis van verschillende kenmerken, zoals het apparaatformaat, de apparaatresolutie, oriëntatie, enzovoort.

<img class="center" src="img/art-direction.png" alt="Voorbeeld art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Het element <code>picture</code> wordt gebruikt als een afbeeldingsbron in meerdere dichtheden voorkomt, of wanneer door een responsief design een iets afwijkende afbeelding op sommige typen scherm wordt afgedwongen. Net zoals bij het element <code>video</code> kunnen meerdere <code>source</code> -elementen worden opgenomen, waardoor het mogelijk is verschillende afbeeldingsbestanden op te geven, afhankelijk van de mediaquery`s of de afbeeldingsgrootte.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

In het bovenstaande voorbeeld wordt, als de breedte van de browser ten minste 800px bedraagt, `head.jpg` of `head-2x.jpg` gebruikt, afhankelijk van de apparaatresolutie. Als de browserbreedte tussen 450px en 800px ligt, dan wordt `head-small.jpg` of `head-small-2x.jpg` gebruikt, maar ook hier is dat weer afhankelijk van de apparaatresolutie. Bij schermbreedten van minder dan 450px en compatibiliteit met eerdere versies, waarbij het element `picture` niet wordt ondersteund, geeft de browser in plaats daarvan het element `img` weer. Dit moet altijd worden gebruikt.

### Afbeeldingen met relatieve grootte

Als de definitieve grootte van de afbeelding niet bekend is, kan het lastig zijn een dichtheidsdescriptor voor de afbeeldingsbronnen op te geven.  Dit geldt vooral voor afbeeldingen die een proportionele breedte van de browser vullen en die vloeiend zijn, afhankelijk van de grootte van de browser.

In plaats van vaste afbeeldingsformaten en dichtheden te produceren, kan de grootte van elke geleverde afbeelding worden opgegeven door een descriptor voor de breedte toe te voegen, samen met de grootte van het afbeeldingselement, waardoor de browser automatisch de effectieve pixeldichtheid kan berekenen en de beste afbeelding kan kiezen om te downloaden.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

In het voorbeeld hierboven wordt een afbeelding weergegeven die de helft van de breedte van de viewport vult (`sizes="50vw"`), afhankelijk van de breedte van de browser en de pixelverhouding van het apparaat. Dit stelt de browser in staat de juiste afbeelding te kiezen, ongeacht hoe groot het browservenster is. In onderstaande tabel ziet u welke afbeelding de browser zou kiezen:

<table class="mdl-data-table mdl-js-data-table">
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


### Rekening houden met breekpunten in responsieve afbeeldingen

Vaak kan de grootte of afbeelding veranderen, afhankelijk van de lay-outbreekpunten van de site. Op een klein scherm, bijvoorbeeld, wilt u misschien dat de afbeelding de breedte van de viewport geheel vult, terwijl deze op een groter scherm slechts een klein gedeelte in beslag zou nemen.  

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

Het kenmerk `sizes` in het bovenstaande voorbeeld maakt gebruik van diverse mediaquery`s om de grootte van de afbeelding aan te geven. Als de browserbreedte groter is dan 600px, is de afbeelding 25% van de breedte van de viewport, bij een breedte van 500px tot 600px, is de afbeelding 50% van de breedte van de viewport en onder 500px heeft de afbeelding de volle breedte.


## Productafbeeldingen uitbreidbaar maken

Klanten willen zien wat ze kopen. Op sites van online winkels verwachten gebruikers dat ze close-ups in hoge resolutie van producten kunnen bekijken om de details beter te kunnen zien en [deelnemers aan het onderzoek](/web/fundamentals/principles/research-study.html) raakten geïrriteerd als ze dat niet konden doen.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Website van J. Crew met uitbreidbare productafbeelding">
  <figcaption>Website van J. Crew met uitbreidbare productafbeelding.</figcaption>
</figure>

Een goed voorbeeld van uitbreidbare afbeeldingen waarop gebruikers kunnen tikken is te zien op de site van J. Crew. Een verdwijnende overlay geeft aan dat op een afbeelding kan worden getikt, waarna een ingezoomde afbeelding met details zichtbaar wordt.


## Andere afbeeldingstechnieken

###Gecomprimeerde afbeeldingen

De [techniek voor afbeeldingscompressie
](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) zorgt voor sterk gecomprimeerde 2x afbeeldingen op alle apparaten, ongeacht de feitelijke mogelijkheden van het apparaat. Afhankelijk van het type afbeelding en het compressieniveau, lijkt de afbeeldingskwaliteit misschien niet te veranderen, maar de bestandsgrootte wordt wel veel kleiner.

{% link_sample _code/compressive.html %}
Voorbeeld bekijken
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

### JavaScript-afbeeldingsvervanging

Met JavaScript-afbeeldingsvervanging worden de mogelijkheden van het apparaat gecontroleerd en worden `de juiste afbeeldingen` gekozen. U kunt zelf de pixelverhouding van het apparaat bepalen via `window.devicePixelRatio`, de schermbreedte en -hoogte ophalen en mogelijk zelfs de netwerkverbinding controleren via `navigator.connection` of een vals verzoek uitgeven. Nadat u al deze informatie heeft verzameld, kunt u bepalen welke afbeelding u wilt laden.

Eén groot nadeel van deze benadering is dat u door het gebruik van JavaScript het laden van afbeeldingen uitstelt totdat op zijn minst de look-ahead parser gereed is. Dit betekent dat het downloaden van afbeeldingen pas begint nadat de gebeurtenis `pageload` is gestart. Daarnaast is de kans groot dat de browser zowel de 1x als de 2x afbeeldingen zal downloaden, waardoor de pagina zwaarder wordt.



