project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Juiste videoformaat {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Als u uw gebruikers tevreden wilt houden, is het formaat zeker belangrijk.


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



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

<!-- TODO: Verify note type! -->
Note: Forceer het aanpassen van de grootte van het element niet als dit resulteert in een beeldverhouding die afwijkt van de oorspronkelijke video. Samengeperste of uitgerekte beelden zien er slecht uit.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Vergelijk het <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">responsieve voorbeeld</a> met de <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">niet-responsieve versie</a>.




