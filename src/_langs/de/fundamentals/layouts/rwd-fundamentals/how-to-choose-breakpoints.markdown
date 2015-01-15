---
layout: article
title: "Übergangspunkte festlegen"
description: "Ein großer Teil des Webs ist nicht für Erfahrungen auf verschiedenen Geräten optimiert. Erlernen Sie die Grundlagen, mit denen Ihre Website auf Mobilgeräten, Desktopcomputern und jeglichen anderen Geräten mit einem Bildschirm funktioniert."
introduction: "Zwar kann es hilfreich sein, über Übergangspunkte auf Grundlage von Geräteklassen nachzudenken, hierbei ist jedoch Vorsicht geboten. Das Festlegen von Übergangspunkten auf Grundlage von bestimmten Geräten, Produkten, Markennamen oder Betriebssystemen, die heute gängig sind, kann schnell zum Wartungsalbtraum werden. Stattdessen sollte der Inhalt selbst bestimmen, wie sich das Layout an seinen Container anpasst."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 4
authors:
  - petelepage
collection: rwd-fundamentals
key-takeaways:
  set-viewport:
    - Verwenden Sie das Darstellungsbereich-Meta-Tag zur Steuerung der Breite und Skalierung des Darstellungsbereichs im Browser.
    - Verwenden Sie <code>width=device-width</code> zur Abstimmung auf die Breite des Bildschirms in geräteunabhängigen Pixeln.
    - Verwenden Sie <code>initial-scale=1</code>, um eine 1:1-Beziehung zwischen CSS-Pixeln und geräteunabhängigen Pixeln zu gewährleisten.
    - Stellen Sie sicher, dass Ihre Seite zugänglich ist, indem Sie die Nutzerskalierung beibehalten.
  size-content-to-vp:
    - Verwenden Sie keine großen Elemente mit fester Breite.
    - Inhalte sollten für eine gute Darstellung nicht auf eine bestimmte Breite des Darstellungsbereichs ausgerichtet werden.
    - Verwenden Sie CSS-Medienabfragen, um verschiedene Stile für große und kleine Bildschirme anzuwenden.
  media-queries:
    - Medienabfragen können dazu verwendet werden, Stile auf Grundlage von Gerätecharakteristiken anzuwenden.
    - Verwenden Sie <code>min-width</code> statt <code>min-device-width</code>, um möglichst viele Breiten abzudecken.
    - Verwenden Sie relative Größen für Elemente, damit das Layout harmonisch bleibt.
  choose-breakpoints:
    - Erstellen Sie Übergangspunkte auf Grundlage der Inhalte und niemals auf Grundlage bestimmter Geräte, Produkte oder Marken.
    - Erstellen Sie das Design zuerst für die kleinsten Mobilgeräte und erweitern Sie die Erfahrung anschließend auf den zusätzlichen Platz, der auf größeren Anzeigen verfügbar ist.
    - Achten Sie darauf, dass Zeilen immer maximal 70 bis 80 Zeichen enthalten.
remember:
  use-commas:
    - Verwenden Sie Kommas zum Trennen von Attributen, damit gewährleistet ist, dass auch ältere Browser diese Attribute richtig verarbeiten können.
---
{% wrap content %}

<style>
  .smaller-img {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  video.responsiveVideo {
    width: 100%;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Bei der Auswahl von primären Übergangspunkten klein beginnen und nach oben arbeiten

Erstellen Sie Inhalte zunächst so, dass sie auf kleine Bildschirme passen, und erweitern Sie den Bildschirm anschließend, bis ein Übergangspunkt erforderlich wird. So können Sie Übergangspunkte auf Grundlage der Inhalte optimieren und die erforderliche Anzahl dieser Punkte so gering wie möglich halten.

Gehen wir das Beispiel durch, das Sie zu Anfang gesehen haben, die [Wettervorhersage]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
Im ersten Schritte sorgen wir dafür, dass die Vorhersage auf kleinen Bildschirmen gut aussieht.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Vorschau der Wettervorhersage auf einem kleinen Bildschirm">
  {% endlink_sample %}
</figure>

Ändern Sie anschließend die Größe des Browsers, bis zu viel leere Fläche zwischen den Elementen ist und die Vorschau einfach nicht mehr gut aussieht. Diese Entscheidung ist auch eine Geschmacksfrage, ab 600 Pixeln werden die Abstände jedoch definitiv zu groß.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Vorschau der Wettervorhersage bei einer zunehmend breiteren Seite">
  {% endlink_sample %}
</figure>

Fügen Sie einen Übergangspunkt bei 600 Pixeln ein, indem Sie zwei neue Stylesheets erstellen. Eines davon kommt zum Einsatz, wenn der Browser 600 Pixel oder weniger in der Breite aufweist, das andere, wenn das Browserfenster über 600 Pixel breit ist.

{% include_code _code/weather-2.html mqweather2 %}

Gestalten Sie die CSS-Datei anschließend um. In diesem Beispiel haben wir die gängigen Stile wie Schriftarten, Symbole, grundlegende Platzierung, Farben usw. in `weather.css` zusammengefasst. Spezielle Layouts für kleine Bildschirme werden anschließend in `weather-small.css`, solche für große Bildschirme in `weather-large.css` platziert.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Bei Bedarf sekundäre Übergangspunkte bestimmen

Zusätzlich zu den primären Übergangspunkten, die zum Einsatz kommen, wenn sich das Layout stark ändert, kann es nützlich sein, Anpassungen für kleinere Veränderungen vorzunehmen. So kann es zwischen primären Übergangspunkten hilfreich sein, die Ränder oder Abstände für einzelne Elemente anzupassen oder die Schriftgröße zu erhöhen, damit der Text im Layout natürlicher wirkt.

Beginnen wir mit der Optimierung des Layouts für kleine Bildschirme. Erhöhen wir in diesem Fall die Schriftgröße, wenn die Breite des Darstellungsbereichs 360 Pixel übersteigt. Als Zweites können wir die Höchst- und Mindesttemperatur trennen, wenn genug Platz ist, damit sie in derselben Zeile und nicht übereinander erscheinen. Darüber hinaus können wir die Wettersymbole etwas vergrößern.

{% include_code _code/weather-small.css mqsmallbpsm css %}

<div class="clear">
  <div class="g--half">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="g--half g--last">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Für große Bildschirme sollte zudem die maximale Breite des Vorhersagefensters begrenzt werden, damit es nicht die gesamte Breite ausfüllt.

{% include_code _code/weather-large.css mqsmallbplg css %}

## Text zum lesen optimieren

Die klassische Theorie zur Lesbarkeit besagt, dass die ideale Spalte 70 bis 80 Zeichen pro Zeile enthalten sollte, was etwa sieben Wörtern in der deutschen Sprache entspricht. Daher sollte immer dann, wenn die Breite eines Textbausteins sieben Wörter übersteigt, ein Übergangspunkt in Betracht gezogen werden.

<div class="clear">
  <div class="g-wide--1 g-medium--half">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Vor dem Hinzufügen sekundärer Übergangspunkte">
  </div>

  <div class="g-wide--3 g-wide--last g-medium--half g--last">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Nach dem Hinzufügen sekundärer Übergangspunkte">
  </div>
</div>

Sehen wir uns das vorherige Beispiel eines Blogposts etwas genauer an. Auf kleineren Bildschirmen funktioniert die Roboto-Schriftart mit 1 em bei sieben Wörtern pro Zeile perfekt, für größere Bildschirme ist jedoch ein Übergangspunkt erforderlich. Wenn die Breite des Browsers 575 Pixel übersteigt, stellen in diesem Fall 550 Pixel die ideale Breite für den Inhalt dar.

{% include_code _code/reading.html mqreading css %}

## Inhalte niemals vollständig ausblenden

Lassen Sie bei der Entscheidung, welche Inhalte auf Grundlage der Bildschirmgröße ein- oder ausgeblendet werden sollen, Vorsicht walten.
Lassen Sie Inhalte nicht einfach verschwinden, wenn sie nicht auf den Bildschirm passen. Die Bildschirmgröße ist kein zuverlässiger Indikator dafür, was der Nutzer möglicherweise sehen möchte. Beispielsweise wäre es für Frühjahrsallergiker, die wissen möchten, ob sie ins Freie gehen können oder nicht, ein ernstes Problem, wenn der Pollenflug nicht in der Wettervorhersage erscheinen würde.


{% include modules/nextarticle.liquid %}

{% endwrap %}

