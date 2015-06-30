---
layout: article
title: "Videogröße richtig wählen"
description: "Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle."
introduction: "Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - Achten Sie darauf, dass Framegröße und Qualität Ihrer Videos nicht die Möglichkeiten der Plattform übersteigen.
    - Machen Sie Ihre Videos nicht länger als unbedingt nötig.
    - Lange Videos können beim Download und bei der Suche zu Problemen führen. Einige Browser müssen unter Umständen warten, bis das Video heruntergeladen wurde, bevor sie es abspielen können.
remember:
  media-fragments:
    - Die Media Fragments-API wird auf den meisten Plattformen mit Ausnahme von iOS unterstützt.
    - Vergewissern Sie sich, dass Ihr Server Bereichsanforderungen unterstützt. Bereichsanforderungen sind auf den meisten Servern standardmäßig aktiviert, einige Hostingdienste können diese jedoch deaktivieren.
  dont-overflow:
    - Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus.
  accessibility-matters:
    - Das Track-Element wird in Chrome für Android, iOS Safari sowie allen aktuellen Desktop-Browsern mit Ausnahme von Firefox (siehe <a href="http://caniuse.com/track" title="Track element support status">caniuse.com/track</a>) unterstützt. Darüber hinaus sind auch mehrere Polyfiller verfügbar. Wir empfehlen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> oder <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE wird von Chrome und Opera unter Android sowie in Internet Explorer 11 und Chrome für Desktopgeräte unterstützt. Auch <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a> soll in Zukunft unterstützt werden.
  optimize:
    - <a href="../images/">Bilder</a>
    - <a href="../../performance/optimizing-content-efficiency/">Inhaltseffizienz optimieren</a>
related:
  media:
  -
      title: "CSS-Medienabfragen für eine verbesserte Reaktionsfähigkeit verwenden"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Grundlagen des Responsive Webdesign"
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

## Videogröße ermitteln

Die tatsächlich codierte Framegröße des Videos kann von den Abmessungen des Videoelements abweichen, ebenso wie ein Bild möglicherweise nicht in seiner tatsächlichen Größe angezeigt wird.

Die codierte Größe eines Videos lässt sich anhand der Eigenschaften `videoWidth` und `videoHeight` des Videoelements ermitteln. `width` und `height` geben die Größe des Videoelements zurück, die möglicherweise anhand von CSS oder Inline-Breiten- und -Höhenattributen festgelegt wurde.

## Sicherstellen, dass Videos nicht die Größe der Container sprengen

Wenn Videoelemente für den Darstellungsbereich zu groß sind, sprengen sie möglicherweise die Größe der Container. Die Folge: Nutzer können sich weder den Inhalt ansehen noch
die Steuerelemente nutzen.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Screenshot von Chrome für Android, Hochformat: Größe des Videoelements ohne CSS übersteigt Darstellungsbereich" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Screenshot von Chrome für Android, Querformat: Größe des Videoelements ohne CSS übersteigt Darstellungsbereich" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Die Videogröße lässt sich mit JavaScript oder CSS steuern. JavaScript-Bibliotheken und Plug-ins wie [FitVids](//fitvidsjs.com/) ermöglichen die Beibehaltung der richtigen Größe und des richtigen Formats, selbst für Flash-Videos von YouTube und anderen Quellen.

Mithilfe von [CSS-Medienabfragen](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) lässt sich die Größe von Elementen je nach Größe des Darstellungsbereichs angeben. Mit `max-width: 100%` liegen Sie nie falsch.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

Für Medieninhalte in iframes, zum Beispiel YouTube-Videos, sollten Sie einen responsiven Ansatz wie den von [John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)) versuchen.

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Vergleichen Sie das Beispiel {% link_sample _code/responsive_embed.html %}mit{% endlink_sample %} und ohne {% link_sample _code/unyt.html %}Responsive Webdesign{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

