---
layout: article
title: "Juiste videoformaat"
description: "Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk."
introduction: "Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - Biedt geen video`s aan met een groter frameformaat of hogere kwaliteit dan het platform aankan.
    - Maak uw video`s niet langer dan nodig is.
    - Lange video`s kunnen haperingen veroorzaken tijdens het downloaden en zoeken; sommige browsers moeten wachten tot de video is gedownload voordat de video kan worden afgespeeld.
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
related:
  media:
  -
      title: "CSS-mediaquery's gebruiken voor responsiveness"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Basisbeginselen van responsive webdesign"
        href: layouts/rwd-fundamentals/
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.size-matters %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

## Videoformaat controleren

Het feitelijk gecodeerde frameformaat van de video kan afwijken van de afmetingen in het video-element (net zoals een afbeelding niet altijd wordt weergegeven op het werkelijke formaat).

Met de eigenschappen `videoWidth` en `videoHeight` van het video-element kunt u controleren wat het gecodeerde formaat is van een video. De eigenschappen `width` en `height` retourneren de afmetingen van het video-element, waarvan het formaat kan zijn gecreëerd met CSS- of inline breedte- of hoogtekenmerken.

## Zorg ervoor dat videocontainers niet te vol raken

Als een video-element te groot is voor de viewport, kan de videocontainer te vol raken. Hierdoor kan de gebruiker de inhoud niet meer bekijken of de bedieningselementen
niet meer gebruiken.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Android Chrome-screenshot, staand: viewport raakt te vol door unstyled video-element" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Android Chrome-screenshot, liggend: viewport raakt te vol door unstyled video-element" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

U kunt de afmetingen van uw video regelen met JavaScript of CSS. Met behulp van JavaScript-bibliotheken en plugins zoals [FitVids](//fitvidsjs.com/) kunt u de juiste beeldverhouding behouden, zelf voor Flash-video`s van YouTube of andere bronnen.

Gebruik [CSS-mediaquery`s](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) om het formaat van elementen op te geven afhankelijk van de afmetingen van de viewport; `max-width: 100%` is uw vriend.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

Probeer voor media-inhoud in iframes (zoals YouTube-video`s) een responsieve aanpak te hanteren (zoals de aanpak [van John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Vergelijk het {% link_sample _code/responsive_embed.html %}responsieve voorbeeld{% endlink_sample %} met de {% link_sample _code/unyt.html %}niet-responsieve versie{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

