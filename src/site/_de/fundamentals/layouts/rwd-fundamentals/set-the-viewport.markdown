---
layout: article
title: "Darstellungsbereich festlegen"
description: "Ein großer Teil des Webs ist nicht für Erfahrungen auf verschiedenen Geräten optimiert. Erlernen Sie die Grundlagen, mit denen Ihre Website auf Mobilgeräten, Desktopcomputern und jeglichen anderen Geräten mit einem Bildschirm funktioniert."
introduction: "Für verschiedene Geräte optimierte Seiten müssen ein Darstellungsbereich-Meta-Element in der Kopfzeile des Dokuments aufweisen. Ein Darstellungsbereich-Meta-Tag gibt dem Browser Anweisungen dazu, wie er Abmessungen und Skalierung der Seite steuern soll."
article:
  written_on: 2014-04-30
  updated_on: 2014-09-12
  order: 1
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

{% include modules/takeaway.liquid list=page.key-takeaways.set-viewport %}

Beim Versuch, die möglichst beste Erfahrung zu gewährleisten, stellen mobile Browser die Seite mit der Breite eines Desktopbildschirms dar, in der Regel etwa 980 Pixel, wobei sich dies von Gerät zu Gerät unterscheiden kann. Anschließend versucht der Browser, die Inhalte optisch ansprechender zu machen, indem er die Schriftgröße erhöht und die Inhalte so skaliert, dass sie den Bildschirm füllen. Für Nutzer bedeutet das, dass die Darstellung der Schriftgrößen inkonsistent ist und sie Inhalte doppelt antippen oder die Finger zusammenziehen müssen, um diese richtig sehen und damit interagieren zu können.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


Wenn Sie den Darstellungsbereich-Meta-Wert ``width=device-width`` verwenden, geben Sie der Seite die Anweisung, die Breite des Bildschirms in geräteunabhängigen Pixeln zu nutzen. Dies ermöglicht der Seite, Inhalte neu anzuordnen und sich so an verschiedene Bildschirmgrößen anzupassen, egal ob an das kleine Display eines Mobiltelefons oder den großen Bildschirm eines Desktopcomputers.

<div class="clear">
  <div class="g--half">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Seite ohne festgelegten Darstellungsbereich">
      Siehe Beispiel
    {% endlink_sample %}
  </div>

  <div class="g--half g--last">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Seite mit festgelegtem Darstellungsbereich">
      Siehe Beispiel
    {% endlink_sample %}
  </div>
</div>

Manche Browser behalten die Breite der Seite beim Drehen in das Querformat bei und zoomen, statt die Inhalte zum Füllen des Bildschirms neu anzuordnen. Indem Sie das Attribut initial-scale=1 verwenden, weisen Sie den Browser an, eine 1:1-Beziehung zwischen CSS-Pixeln und geräteunabhängigen Pixeln zu gewährleisten, unabhängig von der Geräteausrichtung. Somit kann die Seite die volle Breite im Querformat nutzen.

{% include modules/remember.liquid inline="True" list=page.remember.use-commas %}

## Zugänglichen Darstellungsbereich gewährleisten

Zusätzlich zur Festlegung von `initial-scale` können Sie die folgenden Attribute für den Darstellungsbereich konfigurieren:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Wenn festgelegt, können diese verhindern, dass der Nutzer den Darstellungsbereich heranzoomt, wodurch Probleme bei der Zugänglichkeit entstehen können.

{% include modules/nextarticle.liquid %}

{% endwrap %}

