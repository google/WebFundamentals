---
title: "Toegankelijkheid is belangrijk"
description: "Toegankelijkheid is geen functie."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Gebruik het video-element om video op uw site te laden, decoderen en af te spelen."
    - "Maak video's in meerdere indelingen zodat ze op allerlei verschillende mobiele platforms kunnen worden afgespeeld."
    - "Maak video's met het juiste formaat; zorg ervoor dat ze niet overlopen tot buiten de container."
    - "Toegankelijkheid is belangrijk; voeg het track-element toe als onderliggend element van het video-element."
notes:
  media-fragments:
    - "De Media Fragments API wordt door de meeste platforms ondersteund, maar niet door iOS."
    - "Controleer of bereikaanvragen door uw server worden ondersteund. Bereikaanvragen worden op de meeste servers standaard ingeschakeld, maar ze kunnen door bepaalde hostingservices worden uitgeschakeld."
  dont-overflow:
    - "Forceer het aanpassen van de grootte van het element niet als dit resulteert in een beeldverhouding die afwijkt van de oorspronkelijke video. Samengeperste of uitgerekte beelden zien er slecht uit."
  accessibility-matters:
    - "Het track-element wordt ondersteund door Chrome voor Android, iOS Safari en alle bekende browsers op desktop met uitzondering van Firefox (zie <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Ook zijn er verschillende polyfills beschikbaar. We kunnen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> of <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a> aanbevelen."
  construct-video-streams:
    - "MSE wordt ondersteund door Chrome en Opera op Android, en in Internet Explorer 11 en Chrome for desktop, met toekomstige ondersteuning voor <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Afbeeldingen</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Efficiëntie van inhoud optimaliseren</a>"
---

<p class="intro">
  Toegankelijkheid is geen functie. Gebruikers met een visuele beperking of beperking van het gehoor hebben zonder ondertitels of beschrijvingen helemaal niets aan een video. Hoewel het tijd kost om deze elementen aan uw video toe te voegen, hoeft u op deze manier niemand teleur te stellen. Zorg ervoor dat iedere gebruiker iets aan uw video heeft.
</p>

{% include shared/toc.liquid %}



## Ondertiteling toevoegen voor meer toegankelijkheid

Als u media toegankelijker wilt maken op mobiele telefoons, kunt u ondertitels of beschrijvingen toevoegen.

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

Als u het track-element gebruikt, worden ondertitels als volgt weergegeven:

 <img class="center" alt="Screenshot toont ondertitels die worden weergegeven via het track-element in Chrome op Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Track-element toevoegen

Het toevoegen van ondertitels aan uw video is erg gemakkelijk &ndash; voeg een track-element gewoon toe als onderliggend element van het video-element:

{% include_code src=_code/track.html snippet=track lang=html %}

Het `src`-kenmerk van het track-element geeft de locatie van het trackbestand.

## Ondertitels in trackbestand definiëren

Een trackbestand bestaat uit getimede `cues` in WebVTT-indeling:

    WEBVTT

    00:00.000 --> 00:04.000
    Man zit met een laptop op een boomtak.

    00:05.000 --> 00:08.000
    De tak breekt af en de man valt.

    ...



