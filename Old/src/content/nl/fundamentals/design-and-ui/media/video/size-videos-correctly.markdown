---
title: "Juiste videoformaat"
description: "Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk."
updated_on: 2014-09-19
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
related-guides:
  media:
  -
      title: "CSS-mediaquery's gebruiken voor responsiveness"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Basisbeginselen van responsive webdesign"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## Videoformaat controleren

Het feitelijk gecodeerde frameformaat van de video kan afwijken van de afmetingen in het video-element (net zoals een afbeelding niet altijd wordt weergegeven op het werkelijke formaat).

Met de eigenschappen `videoWidth` en `videoHeight` van het video-element kunt u controleren wat het gecodeerde formaat is van een video. De eigenschappen `width` en `height` retourneren de afmetingen van het video-element, waarvan het formaat kan zijn gecreëerd met CSS- of inline breedte- of hoogtekenmerken.

## Zorg ervoor dat videocontainers niet te vol raken

Als een video-element te groot is voor de viewport, kan de videocontainer te vol raken. Hierdoor kan de gebruiker de inhoud niet meer bekijken of de bedieningselementen
niet meer gebruiken.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Android Chrome-screenshot, staand: viewport raakt te vol door unstyled video-element" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Android Chrome-screenshot, liggend: viewport raakt te vol door unstyled video-element" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

U kunt de afmetingen van uw video regelen met JavaScript of CSS. Met behulp van JavaScript-bibliotheken en plugins zoals [FitVids](//fitvidsjs.com/) kunt u de juiste beeldverhouding behouden, zelf voor Flash-video`s van YouTube of andere bronnen.

Gebruik [CSS-mediaquery`s](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) om het formaat van elementen op te geven afhankelijk van de afmetingen van de viewport; `max-width: 100%` is uw vriend.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Probeer voor media-inhoud in iframes (zoals YouTube-video`s) een responsieve aanpak te hanteren (zoals de aanpak [van John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Vergelijk het {% link_sample _code/responsive_embed.html %}responsieve voorbeeld{% endlink_sample %} met de {% link_sample _code/unyt.html %}niet-responsieve versie{% endlink_sample %}.




