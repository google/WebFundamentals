---
layout: section
title: "Bilder"
description: "Ein Bild sagt mehr als 1000 Worte, und Bilder spielen eine sehr wichtige Rolle auf jeder einzelnen Seite. Leider stellen sie aber ebenso einen Großteil des Volumens dar, das heruntergeladen wird. Mit einem responsiven Webdesign können sich nicht nur unsere Layouts Gerätecharakteristiken anpassen, sondern ebenso die Bilder."
introduction: "Ein Bild sagt mehr als 1000 Worte, und Bilder spielen eine sehr wichtige Rolle auf jeder einzelnen Seite. Leider stellen sie aber ebenso einen Großteil des Volumens dar, das heruntergeladen wird. Mit einem responsiven Webdesign können sich nicht nur unsere Layouts Gerätecharakteristiken anpassen, sondern ebenso die Bilder."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
id: images
key-takeaways:
  use-right-image:
    - Verwenden Sie das am besten zu den Charakteristiken der Anzeige passende Bild. Berücksichtigen Sie die Bildschirmgröße, die Geräteauflösung und das Seitenlayout.
    - Ändern Sie für Anzeigen mit hohem DPI-Wert die <code>background-image</code>-Eigenschaft in CSS, indem Sie Medienabfragen mit <code>min-resolution</code> und <code>-webkit-min-device-pixel-ratio</code> verwenden.
    - Verwenden Sie `srcset` zur Bereitstellung von Bildern mit hoher Auflösung zusätzlich zu den 1x-Bildern im Markup.
    - Berücksichtigen Sie den Berechnungsaufwand beim Einsatz von JavaScript-Methoden zum Ersetzen von Bildern oder der Bereitstellung von stark komprimierten Bildern mit hoher Auflösung auf Geräten mit geringerer Auflösung.
  avoid-images:
    - Verzichten Sie wann immer möglich auf Bilder und nutzen Sie stattdessen Browserfunktionen und Unicode-Zeichen. Ersetzen Sie komplexe Symbole mit Symbolschriftarten.
  optimize-images:
    - Verwenden Sie nicht einfach irgendein Bildformat. Setzen Sie sich mit den verschiedenen verfügbaren Formaten auseinander und nutzen Sie das am besten geeignete.
    - Nehmen Sie Schritte zur Bildoptimierung und -komprimierung in Ihren Prozess auf, um die Größe der Dateien zu reduzieren.
    - Reduzieren Sie die Anzahl an HTTP-Anfragen, indem Sie häufig genutzte Bilder in Bild-Sprites platzieren.
    - Ziehen Sie in Betracht, Bilder erst dann laden zu lassen, wenn sie sichtbar sind. So kann die Seite schneller geladen werden und belegt zu Anfang weniger Speicher.
remember:
  compressive:
    - Bei der Nutzung der Komprimierung ist aufgrund der erhöhten Speicherbelastung und des erhöhten Aufwands beim Codieren Vorsicht geboten. Die Änderung der Größe für kleinere Bildschirme ist rechenintensiv und kann besonders auf Low-End-Geräten mit wenig Speicher und geringer Rechenkapazität Probleme verursachen.
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

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

### Responsive Bilder

Mit responsivem Webdesign können sich nicht nur unsere Layouts Gerätecharakteristiken anpassen, sondern ebenso die Inhalte. So sind zum Beispiel auf Anzeigen mit hoher Auflösung (2x) Grafiken mit hoher Auflösung nötig, um eine scharfe Darstellung zu gewährleisten. Ein Bild, das 50 % der Breite einnimmt, ist gut geeignet, wenn der Browser 800 Pixel in der Breite aufweist. So ein Bild belegt auf einem Telefon mit kleinem Display jedoch zu viel Platz und verursacht darüber hinaus die gleiche Belastung der Bandbreite, wenn es zur Anzeige auf kleineren Bildschirmen herunterskaliert wird.

### Art Direction

<img class="center" src="img/art-direction.png" alt="Beispiel für Art Direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

In anderen Fällen sind möglicherweise noch drastischere Änderungen erforderlich: Änderung der Proportionen, Zuschneiden und sogar der Austausch des gesamten Bilds. In solchen Fällen wir der Prozess zur Änderung des Bilds in der Regel als Art Direction bezeichnet. Weitere Beispiele finden Sie unter [responsiveimages.org/demos/](http://responsiveimages.org/demos/).

{% include modules/nextarticle.liquid %}

{% endwrap %}

