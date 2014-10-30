---
layout: article
title: "CSS-Medienabfragen für Responsivität verwenden"
description: "Ein großer Teil des Webs ist nicht für Erfahrungen auf verschiedenen Geräten optimiert. Erlernen Sie die Grundlagen, mit denen Ihre Website auf Mobilgeräten, Desktopcomputern und jeglichen anderen Geräten mit einem Bildschirm funktioniert."
introduction: "Medienabfragen sind einfache Filter, die auf CSS-Stile angewendet werden können. Sie ermöglichen, Stile ganz einfach auf Grundlage von Charakteristiken des Geräts, das zur Anzeige der Inhalte genutzt wird, zu ändern, einschließlich Anzeigetyp, Breite, Höhe, Ausrichtung und sogar Auflösung."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 3
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

{% include modules/takeaway.liquid list=page.key-takeaways.media-queries %}


Beispielsweise können Sie alle Stile, die zum Drucken notwendig sind, in eine Druckmedienabfrage einfügen:

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

Zusätzlich zur Nutzung des Attributs `media` im Stylesheet-Link gibt es zwei weitere Möglichkeiten, Medienabfragen anzuwenden, die in eine CSS-Datei eingebettet werden können: `@media` und `@import`. Aus Leistungsgründen werden die ersten beiden Methoden statt der `@import`-Syntax empfohlen, siehe [CSS-Importe vermeiden]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html).

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

Die Logik, die für Medienabfragen gilt, schließt andere Logiken nicht aus, und der aus der Anwendung von Filtern, die diese Kriterien erfüllen, resultierende CSS-Block wird anhand der CSS-Regeln für die Reihenfolge angewendet.

## Medienabfragen auf Grundlage der Größe des Darstellungsbereichs anwenden

Medienabfragen ermöglichen uns, eine responsive Erfahrung zu schaffen, bei der bestimmte Stile für kleine Bildschirme, große Bildschirme und alle weiteren Möglichkeiten dazwischen angewendet werden. Die Syntax von Medienabfragen erlaubt die Erstellung von Regeln, die abhängig von den Gerätecharakteristiken genutzt werden können.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

Wir können zwar für viele verschiedene Elemente Abfragen erstellen, diejenigen, die am häufigsten beim responsiven Webdesign zum Einsatz kommen, sind jedoch `min-width`, `max-width`, `min-height` und `max-height`.


<table class="table-2">
  <colgroup>
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="Attribut">Attribut</th>
      <th data-th="Ergebnis">Ergebnis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribut"><code>min-width</code></td>
      <td data-th="Ergebnis">Regeln für alle Browserbreiten angewendet, die über dem in der Abfrage definierten Wert liegen</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>max-width</code></td>
      <td data-th="Ergebnis">Regeln für alle Browserbreiten angewendet, die unter dem in der Abfrage definierten Wert liegen</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>min-height</code></td>
      <td data-th="Ergebnis">Regeln für alle Browserhöhen angewendet, die über dem in der Abfrage definierten Wert liegen</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>max-height</code></td>
      <td data-th="Ergebnis">Regeln für alle Browserhöhen angewendet, die unter dem in der Abfrage definierten Wert liegen</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>orientation=portrait</code></td>
      <td data-th="Ergebnis">Regeln für alle Browser angewendet, deren Höhe der Breite entspricht oder größer als diese ist</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>orientation=landscape</code></td>
      <td data-th="Ergebnis">Regeln für alle Browser angewendet, deren Breite größer als die Höhe ist</td>
    </tr>
  </tbody>
</table>

Sehen wir uns ein Beispiel an:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Vorschau einer Seite, bei der zum Ändern der Eigenschaften auf Medienabfragen zurückgegriffen wird, während ihre Größe geändert wird">
  {% endlink_sample %}
</figure>

{% include_code _code/media-queries.html mqueries %}

* Wenn der Browser zwischen <b>0 px</b> und <b>640 px</b> breit ist, kommt `max-640px.css` zum Einsatz.
* Wenn der Browser zwischen <b>500 px</b> und <b>600 px</b> breit ist, kommt `@media` zum Einsatz.
* Wenn der Browser <b>640 px breit oder breiter</b> ist, kommt `min-640px.css` zum Einsatz.
* Wenn der Browser <b>in der Breite größer ist als in der Höhe</b>, kommt `landscape.css` zum Einsatz.
* Wenn der Browser <b>in der Höher größer ist als in der Breite</b>, kommt `portrait.css` zum Einsatz.


## Ein Hinweis zu `min-device-width`

Es ist auch möglich, Abfragen auf Grundlage von `*-device-width` zu erstellen, von dieser Praxis raten wir jedoch grundsätzlich ab.

Der Unterschied ist zwar klein, jedoch sehr wichtig: `min-width` basiert auf der Größe des Browserfensters, `min-device-width` auf der Bildschirmgröße. Leider können manche Browser, auch ältere Versionen des Android-Browsers, die Breite des Geräts falsch ausgeben. Der Browser meldet die Bildschirmgröße in Gerätepixeln statt der erwarteten Breite des Darstellungsbereichs.

Zudem kann die Verwendung von `*-device-width` verhindern, dass Inhalte richtig für Desktopcomputer oder andere Geräte, auf denen die Größe von Fenstern geändert werden kann, ausgerichtet werden, da die Abfrage auf der tatsächlichen Gerätegröße und nicht auf der Größe des Browserfensters beruht.

## Relative Einheiten verwenden

Ein Schlüsselkonzept von responsivem Design ist Flexibilität und Proportionalität, also das Gegenteil von Layouts mit fester Breite. Die Verwendung relativer Einheiten für Werte kann dazu beitragen, Layouts zu vereinfachen und zu verhindern, dass versehentlich Komponenten erstellt werden, die zu groß für den Darstellungsbereich sind.

So gewährleistet die Verwendung von `width: 100%` für einen `div`-Container auf oberster Ebene, dass er die Breite des Darstellungsbereichs ausfüllt und niemals zu groß oder zu klein wird. Der `div`-Container passt immer, unabhängig davon, ob er auf einem iPhone mit 320 px, einem Blackberry Z10 mit 342 px oder auf Nexus 5 mit 360 px Breite aufgerufen wird.

Hinzu kommt, dass die Nutzung relativer Einheiten Browsern erlaubt, Inhalte auf Grundalge der Zoomstufe des jeweiligen Nutzers darzustellen und das Hinzufügen horizontaler Scrollbalken zur Seite nicht nötig ist.

<div class="clear">
  <div class="g--half">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="g--half g--last">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

