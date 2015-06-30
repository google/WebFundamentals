---
layout: article
title: "SVG für Symbole verwenden"
description: "Wenn Sie Ihrer Seite Symbole hinzufügen, sollten Sie falls möglich SVG-Symbole oder gegebenenfalls Unicode-Zeichen verwenden."
introduction: "Wenn Sie Ihrer Seite Symbole hinzufügen, sollten Sie falls möglich SVG-Symbole oder gegebenenfalls Unicode-Zeichen verwenden."
authors:
  - petelepage
article:
  written_on: 2014-06-10
  updated_on: 2014-06-10
  order: 3
collection: images
key-takeaways:
  avoid-images:
    - Verwenden Sie anstelle von Rasterbildern SVG oder Unicode für Symbole.
---

{% wrap content%}

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

{% include modules/toc.liquid %}


{% include modules/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Einfache Symbole durch Unicode ersetzen

Viele Schriftarten unterstützen die unzähligen Unicode-Glyphen, die anstelle von Bildern verwendet werden können. Im Gegensatz zu Bildern lassen sich Unicode-Schriftarten gut skalieren und sehen immer gut aus, egal, wie klein oder groß sie auf dem Bildschirm dargestellt werden.

Neben dem normalen Zeichensatz kann Unicode Symbole für Zahlzeichen (&#8528;), Pfeile (&#8592;), mathematische Operatoren (&#8730;), geometrische Formen (&#9733;), Steuerzeichen (&#9654;), Brailleschrift (&#10255;), Notenschrift (&#9836;), griechische Buchstaben (&#937;) und sogar Schachfiguren (&#9822;) enthalten.

Unicode-Zeichen werden wie benannte Zeichen verwendet: `&#XXXX`, wobei `XXXX` der Zahl des Unicode-Zeichens entspricht. Beispiel:

{% highlight html %}
Du bist ein echter &#9733;
{% endhighlight %}

Du bist ein echter &#9733;

## Komplexe Symbole durch SVG ersetzen
Für komplexere Symbolanforderungen eignen sich SVG-Symbole. Sie sind in der Regel simpel, nutzerfreundlich und können mit CSS gestaltet werden. SVG bietet im Vergleich zu Rasterbildern folgende Vorteile:

* Die Vektorgrafiken lassen sich unendlich skalieren.
* CSS-Effekte wie Farbe, Schattierung, Transparenz und Animationen sind unkompliziert.
* SVG-Bilder können in direkt in das Dokument integriert werden.
* Die Vektorgrafiken sind semantisch.
* Mit den passenden Attributen sind sie besser zugänglich.

&nbsp;

{% include_code _code/icon-svg.html iconsvg html %}

## Symbolschriften mit Vorsicht verwenden

Symbolschriften sind zwar beliebt und leicht anwendbar, einige bergen jedoch im Vergleich zu SVG-Symbolen Nachteile.

* Es handelt sich um Vektorgrafiken, die unendlich skalierbar sind. Es kann jedoch zu einer Kantenglättung kommen, in deren Folge die Symbole nicht so scharf dargestellt werden wie erwartet.
* Die Gestaltungsmöglichkeiten mit CSS sind begrenzt.
* Die perfekte Positionierung der Pixel kann schwierig sein, je nach Zeilenhöhe, Buchstabenabstand usw.
* Sie sind nicht semantisch und die Verwendung mit Screenreadern oder anderen Bedienungshilfen kann sich als schwierig erweisen.
* Wenn der Bereich nicht ordnungsgemäß festgelegt ist, kann die Datei riesig werden, obwohl nur eine kleine Teilmenge der verfügbaren Symbole verwendet wird. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Beispiel einer Seite, die Font Awesome für die Schriftartensymbole verwendet">
{% endlink_sample %}
{% include_code _code/icon-font.html iconfont html %}

Es gibt Hunderte kostenloser und kostenpflichtiger Symbolschriften, darunter [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) und [Glyphicons](http://glyphicons.com/).

Achten Sie darauf, dass die Last der zusätzlichen HTTP-Anfrage und Dateigröße mit dem Symbolbedarf im Verhältnis steht. Wenn Sie zum Beispiel nur eine Handvoll Symbole benötigen, ist ein Bild oder Sprite unter Umständen die bessere Wahl.

{% include modules/nextarticle.liquid %}

{% endwrap %}

