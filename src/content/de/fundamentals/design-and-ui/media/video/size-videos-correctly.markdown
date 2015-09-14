---
title: "Videogröße richtig wählen"
description: "Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle."
updated_on: 2014-09-19
key-takeaways:
  size-matters:
    - "Achten Sie darauf, dass Framegröße und Qualität Ihrer Videos nicht die Möglichkeiten der Plattform übersteigen."
    - "Machen Sie Ihre Videos nicht länger als unbedingt nötig."
    - "Lange Videos können beim Download und bei der Suche zu Problemen führen. Einige Browser müssen unter Umständen warten, bis das Video heruntergeladen wurde, bevor sie es abspielen können."
notes:
  dont-overflow:
    - "Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus."
related-guides:
  media:
  -
      title: "CSS-Medienabfragen für eine verbesserte Reaktionsfähigkeit verwenden"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Grundlagen des Responsive Webdesign"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}

## Videogröße ermitteln

Die tatsächlich codierte Framegröße des Videos kann von den Abmessungen des Videoelements abweichen, ebenso wie ein Bild möglicherweise nicht in seiner tatsächlichen Größe angezeigt wird.

Die codierte Größe eines Videos lässt sich anhand der Eigenschaften `videoWidth` und `videoHeight` des Videoelements ermitteln. `width` und `height` geben die Größe des Videoelements zurück, die möglicherweise anhand von CSS oder Inline-Breiten- und -Höhenattributen festgelegt wurde.

## Sicherstellen, dass Videos nicht die Größe der Container sprengen

Wenn Videoelemente für den Darstellungsbereich zu groß sind, sprengen sie möglicherweise die Größe der Container. Die Folge: Nutzer können sich weder den Inhalt ansehen noch
die Steuerelemente nutzen.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Screenshot von Chrome für Android, Hochformat: Größe des Videoelements ohne CSS übersteigt Darstellungsbereich" src="images/Chrome-Android-portrait-video-unstyled.png">
  <img class="mdl-cell mdl-cell--6--col" alt="Screenshot von Chrome für Android, Querformat: Größe des Videoelements ohne CSS übersteigt Darstellungsbereich" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Die Videogröße lässt sich mit JavaScript oder CSS steuern. JavaScript-Bibliotheken und Plug-ins wie [FitVids](//fitvidsjs.com/) ermöglichen die Beibehaltung der richtigen Größe und des richtigen Formats, selbst für Flash-Videos von YouTube und anderen Quellen.

Mithilfe von [CSS-Medienabfragen](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) lässt sich die Größe von Elementen je nach Größe des Darstellungsbereichs angeben. Mit `max-width: 100%` liegen Sie nie falsch.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

Für Medieninhalte in iframes, zum Beispiel YouTube-Videos, sollten Sie einen responsiven Ansatz wie den von [John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)) versuchen.

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Vergleichen Sie das Beispiel {% link_sample _code/responsive_embed.html %}mit{% endlink_sample %} und ohne {% link_sample _code/unyt.html %}Responsive Webdesign{% endlink_sample %}.




