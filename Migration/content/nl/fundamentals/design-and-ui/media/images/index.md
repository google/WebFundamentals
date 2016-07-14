---
title: "Afbeeldingen"
description: "Een foto is evenveel waard als 1000 woorden. Afbeeldingen vormen dan ook een integraal onderdeel van elke pagina. Maar het downloaden ervan kost veel bytes.  Met responsive webdesign kunnen niet alleen onze lay-outs veranderen op basis van apparaatkenmerken, maar ook afbeeldingen."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Gebruik de beste afbeelding voor de kenmerken van de display, houd rekening met het formaat van het scherm, de resolutie van het apparaat en de paginalay-out."
    - "Wijzig de eigenschap <code>background-image</code> in CSS voor high-DPI-beeldschermen via mediaquery`s met <code>min-resolution</code> en <code>-webkit-min-device-pixel-ratio</code>."
    - "Gebruik srcset voor afbeeldingen met hoge resolutie naast de 1x afbeelding in opmaak."
    - "Houd rekening met de prestatiekosten wanneer u JavaScript-technieken gebruikt voor vervanging van afbeeldingen of wanneer u zwaar gecomprimeerde afbeeldingen met hoge resolutie op apparaten met een lagere resolutie plaatst."
  avoid-images:
    - "Vermijd afbeeldingen zoveel mogelijk. Maak liever gebruik van de mogelijkheden van de browser, gebruik unicode-tekens in plaats van afbeeldingen en vervang complexe pictogrammen door pictogramlettertypen."
  optimize-images:
    - "Kies niet zomaar een afbeeldingsindeling, maar probeer inzicht te krijgen in de verschillende indelingen die beschikbaar zijn en gebruik de meest geschikte indeling."
    - "Gebruik ook tools voor afbeeldingsoptimalisatie en compressie in uw workflow om de grootte van bestanden te verkleinen."
    - "Verlaag het aantal http-verzoeken door veelgebruikte afbeeldingen in afbeeldingssprites te plaatsen."
    - "Denk eraan dat u afbeeldingen pas laadt nadat ze zichtbaar zijn in de weergave. Zo verbetert u de laadtijd van de eerste pagina en maakt u deze pagina minder zwaar."
notes:
  compressive:
    - "Ga verstandig om met de compressietechniek omdat deze hogere geheugen- en decoderingskosten met zich meebrengt. Het aanpassen van het formaat van grote afbeeldingen zodat ze op een kleiner scherm passen is duur en kan vooral op low-end apparaten lastig zijn omdat zowel het geheugen als de verwerkingsmogelijkheden hierop beperkt zijn."
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  Een foto is evenveel waard als 1000 woorden. Afbeeldingen vormen dan ook een integraal onderdeel van elke pagina. Maar het downloaden ervan kost veel bytes.  Met responsive webdesign kunnen niet alleen onze lay-outs veranderen op basis van apparaatkenmerken, maar ook afbeeldingen.
</p>



### Responsieve afbeeldingen

Responsive webdesign houdt in dat niet alleen lay-outs kunnen veranderen op basis van apparaatkenmerken, maar ook inhoud. Op schermen met hoge resolutie (2x) bijvoorbeeld, zijn afbeeldingen met hoge resolutie nodig zodat ze zo scherp mogelijk worden weergegeven. Een afbeelding met een breedte van 50% voldoet waarschijnlijk prima wanneer de browser 800px breed is, maar neemt op een smalle telefoon te veel ruimte in beslag en komt uit op dezelfde bandbreedte-overhead wanneer deze wordt verkleind om op een kleiner scherm te passen.

### Art direction

<img class="center" src="img/art-direction.png" alt="Voorbeeld art direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Soms moeten afbeeldingen misschien wat drastischer worden gewijzigd: de proporties wijzigen, bijsnijden of zelfs de afbeelding geheel vervangen. Het wijzigen van afbeeldingen wordt dan meestal `art direction` genoemd.  Zie [responsiveimages.org/demos/](http://responsiveimages.org/demos/) voor meer voorbeelden.

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}



