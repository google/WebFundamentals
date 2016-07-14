---
title: "Afbeeldingen optimaliseren ten behoeve van de prestaties"
description: "Afbeeldingen zijn meestal verantwoordelijk voor de meeste gedownloade bytes en nemen ook een aanzienlijke hoeveelheid van de visuele ruimte in beslag op de pagina."
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
related-guides:
  optimize:
  -
      title: "Optimalisatie van afbeeldingen"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Efficiëntie van inhoud optimaliseren"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  Afbeeldingen zijn meestal verantwoordelijk voor de meeste gedownloade bytes en nemen ook een aanzienlijke hoeveelheid van de visuele ruimte in beslag op de pagina. Het optimaliseren van afbeeldingen kan dan ook een van de grootste besparingen op bytes en prestatieverbeteringen voor uw website opleveren: hoe kleiner het aantal bytes dat de browser moet downloaden, des te minder concurrentie voor de bandbreedte van de client er is en des te sneller de browser alle assets kan downloaden en weergeven.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## De juiste indeling kiezen

Er zijn twee typen afbeeldingen waarmee u rekening moet houden: [vectorafbeeldingen](http://en.wikipedia.org/wiki/Vector_graphics) en [rasterafbeeldingen](http://en.wikipedia.org/wiki/Raster_graphics). Voor rasterafbeeldingen moet u bovendien de juiste compressie-indeling kiezen, bijvoorbeeld: `GIF`, `PNG`, `JPG`.

**Rasterafbeeldingen**, zoals foto`s en andere afbeeldingen die worden voorgesteld als een raster met afzonderlijke puntjes of pixels. Rasterafbeeldingen zijn meestal afkomstig van een camera of scanner, of kunnen in de browser worden gemaakt met het element `canvas`. Naarmate de afbeelding groter wordt, neemt ook het bestand in grootte toe. Als rasterafbeeldingen groter worden geschaald dan hun oorspronkelijke formaat, worden ze vaag omdat de browser moet gissen hoe de ontbrekende pixels moeten worden ingevuld.

**Vectorafbeeldingen**, zoals logo`s en tekeningen worden gedefinieerd door een reeks van curven, strepen, vormen en vulkleuren. Vectorafbeeldingen worden gemaakt met programma`s zoals Adobe Illustrator of Inkscape en opgeslagen in een vectorindeling zoals [`SVG`](http://css-tricks.com/using-svg/). Omdat vectorafbeeldingen gebouwd zijn op eenvoudige primitieven, kunnen ze worden geschaald zonder enig kwaliteitsverlies en zonder een wijziging in bestandsgrootte.

Als u de juiste indeling kiest, is het belangrijk om rekening te houden met de oorsprong van de afbeelding (raster of vector), en de inhoud (kleuren, animatie, tekst, enzovoort). Geen enkele indeling is geschikt voor alle afdelingstypen en elke indeling biedt voor- en nadelen.

Start met de volgende richtlijnen om de juiste indeling te kiezen:

* Gebruik `JPG` voor foto`s.
* Gebruik `SVG` voor vectorkunst en kleurafbeeldingen zoals logo`s en tekeningen.
  Probeer WebP of PNG als vectorkunst niet beschikbaar is.
*  Liever `PNG` dan `GIF` omdat hiermee meer kleuren mogelijk zijn en het betere compressieverhoudingen biedt.
* Overweeg voor langere animaties het gebruik van `<video>` wat een betere beeldkwaliteit biedt en de gebruiker controle geeft over het afspelen.

## De bestandsgrootte verkleinen

De bestandsgrootte van afbeeldingen kan aanzienlijk worden teruggebracht door ze `na te bewerken` na het opslaan. Er bestaan diverse tools voor afbeeldingscompressie  - lossy en lossless, online, GUI, opdrachtregel. Waar mogelijk raden we u aan afbeeldingsoptimalisatie te automatiseren zodat dit een grote rol speelt in uw workflow.

Er zijn verschillende tools beschikbaar die verdere, lossless compressie op `JPG`- en `PNG`-bestanden uitvoeren, zonder de afbeeldingskwaliteit aan te tasten. Probeer voor `JPG` [jpegtran](http://jpegclub.org/) of [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (alleen beschikbaar op Linux; uitvoeren met de optie --strip-all). Probeer voor `PNG` [OptiPNG](http://optipng.sourceforge.net/) of [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

## Afbeeldingssprites gebruiken

CSS spriting is een techniek waarbij een aantal afbeeldingen wordt gecombineerd in een enkele `sprite sheet`-afbeelding. Afzonderlijke afbeeldingen kunnen vervolgens worden gebruikt door de achtergrondafbeelding op te geven voor een element (het spritesheet) plus een offset om het juiste onderdeel weer te geven.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="Afbeeldingsspritesheet gebruikt in voorbeeld">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

Spriting heeft het voordeel dat het aantal downloads wordt verminderd dat vereist is om meerdere afbeeldingen op te halen, terwijl het opslaan in cache mogelijk blijft.

## Lazy loading overwegen

Met lazy loading kunt u het laadproces van lange pagina`s met veel afbeeldingen onder de vouw aanzienlijk versnellen door ze pas te laden wanneer ze nodig zijn of nadat de primaire inhoud geladen en weergegeven is. Behalve verbeterde prestaties kan het gebruik van lazy loading ook leiden tot oneindig scrollen.

Wees voorzichtig wanneer u pagina`s met oneindig scrollen maakt, want inhoud wordt geladen als deze zichtbaar is en het kan zijn dat zoekmachines die inhoud nooit te zien krijgen.  Bovendien krijgen gebruikers de voettekst nooit te zien, omdat er voortdurend nieuwe inhoud wordt geladen, terwijl ze de gezochte informatie juist in de voettekst verwachten te vinden.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




