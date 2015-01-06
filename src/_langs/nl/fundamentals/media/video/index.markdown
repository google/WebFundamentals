---
layout: section
title: "Video"
description: "Lees wat de eenvoudigste manieren zijn om video toe te toevoegen aan uw website en gebruikers op alle apparaten de meest optimale ervaring te bieden."
introduction: "Gebruikers houden van video's; ze kunnen leuk en informatief zijn. Op mobiele apparaten kunt u informatie soms gemakkelijker tot u nemen door middel van een video. Video's verbruiken echter wel bandbreedte en werken niet altijd op alle platforms hetzelfde. Gebruikers haken af als ze moeten wachten tot een video is geladen of er niets gebeurt als ze op 'afspelen' drukken.  Lees meer informatie over de eenvoudigste manieren om video toe te voegen aan uw website en gebruikers op alle apparaten de meest optimale ervaring te bieden."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
id: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Gebruik het video-element om video op uw site te laden, decoderen en af te spelen.
    - Maak video`s in meerdere indelingen zodat ze op allerlei verschillende mobiele platforms kunnen worden afgespeeld.
    - Maak video`s met het juiste formaat; zorg ervoor dat ze niet overlopen tot buiten de container.
    - Toegankelijkheid is belangrijk; voeg het track-element toe als onderliggend element van het video-element.
remember:
  media-fragments:
    - De Media Fragments API wordt door de meeste platforms ondersteund, maar niet door iOS.
    - Controleer of bereikaanvragen door uw server worden ondersteund. Bereikaanvragen worden op de meeste servers standaard ingeschakeld, maar ze kunnen door bepaalde hostingservices worden uitgeschakeld.
  dont-overflow:
    - Forceer het aanpassen van de grootte van het element niet als dit resulteert in een beeldverhouding die afwijkt van de oorspronkelijke video. Samengeperste of uitgerekte beelden zien er slecht uit.
  accessibility-matters:
    - Het track-element wordt ondersteund in Chrome voor Android, iOS Safari en alle huidige browsers in een desktopomgeving behalve Firefox (zie <a href="http://caniuse.com/track" title="Status van ondersteuning voor track-elementen">caniuse.com/track</a>). Ook zijn er verschillende polyfills beschikbaar. Wij raden <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> of <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a> aan.
  construct-video-streams:
    - MSE wordt ondersteund door Chrome en Opera in Android, in Internet Explorer 11 en Chrome voor desktop en er is ondersteuning in de planning voor <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>.
  optimize:
    - <a href="../images/">Afbeeldingen</a>
    - <a href="../../performance/optimizing-content-efficiency/">Efficiëntie van inhoud optimaliseren</a>
---

{% wrap content%}

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/j5fYOYrsocs?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

