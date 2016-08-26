project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# Videogröße richtig wählen {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle.


## TL;DR {: .hide-from-toc }
- 'Achten Sie darauf, dass Framegröße und Qualität Ihrer Videos nicht die Möglichkeiten der Plattform übersteigen.'
- Machen Sie Ihre Videos nicht länger als unbedingt nötig.
- 'Lange Videos können beim Download und bei der Suche zu Problemen führen. Einige Browser müssen unter Umständen warten, bis das Video heruntergeladen wurde, bevor sie es abspielen können.'


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

<!-- TODO: Verify note type! -->
Note: Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Vergleichen Sie das Beispiel <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">mit</a> und ohne <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">Responsive Webdesign</a>.




