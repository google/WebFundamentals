---
title: "Bilder auf Leistung optimieren"
description: "Bilder belegen in der Regel die meiste Bandbreite und darüber hinaus oft auch einen großen Teil des visuellen Bereichs einer Seite."
updated_on: 2014-04-30
key-takeaways:
  optimize-images:
    - "Verwenden Sie nicht einfach irgendein Bildformat. Setzen Sie sich mit den verschiedenen verfügbaren Formaten auseinander und nutzen Sie das am besten geeignete."
    - "Nehmen Sie Schritte zur Bildoptimierung und -komprimierung in Ihren Prozess auf, um die Größe der Dateien zu reduzieren."
    - "Reduzieren Sie die Anzahl an HTTP-Anfragen, indem Sie häufig genutzte Bilder in Bild-Sprites platzieren."
    - "Ziehen Sie in Betracht, Bilder erst dann laden zu lassen, wenn sie sichtbar sind. So kann die Seite schneller geladen werden und belegt zu Anfang weniger Speicher."
notes:
  compressive:
    - "Bei der Nutzung der Komprimierung ist aufgrund der erhöhten Speicherbelastung und des erhöhten Aufwands beim Codieren Vorsicht geboten. Die Änderung der Größe für kleinere Bildschirme ist rechenintensiv und kann besonders auf Low-End-Geräten mit wenig Speicher und geringer Rechenkapazität Probleme verursachen."
related-guides:
  optimize:
  -
      title: "Bildoptimierung"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        title: "Effizienz von Inhalten optimieren"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  Bilder belegen in der Regel die meiste Bandbreite und darüber hinaus oft auch einen großen Teil des visuellen Bereichs einer Seite. Aus diesem Grund kann die Bandbreite oft durch die Optimierung von Bildern am besten entlastet und so die Leistung Ihrer Website erhöht werden: Je weniger der Browser herunterladen muss, desto weniger Bandbreitebelastung entsteht, wodurch der Browser sämtliche Inhalte schneller herunterladen und anzeigen kann.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Das richtige Format wählen

Es bestehen zwei relevante Bildtypen: [Vektorbilder](http://de.wikipedia.org/wiki/Vektorgrafik) and [Rasterbilder](http://de.wikipedia.org/wiki/Rastergrafik). Für Rasterbilder muss zudem das richtige Kompressionsformat gewählt werden, etwa GIF, PNG oder JPG.

Rasterbilder sind zum Beispiel Fotos und andere Bilder, die aus einem Raster einzelner Punkte oder Pixel bestehen. Sie stammen in der Regel von einer Kamera oder einem Scanner oder können in einem Browser mithilfe des `canvas`-Elements erstellt werden. Je größer das Bild, desto größer auch die Dateigröße. Wenn Rasterbilder hochskaliert werden, werden Sie verschwommen, da der Browser nicht weiß, womit die fehlenden Pixel aufgefüllt werden sollen.

Vektorbilder wie Logos und Grafiken werden durch eine Anzahl an Kurven, Linien, Formen und Füllfarben definiert. Vektorbilder können mit Programmen wie Adobe Illustrator oder Inkscape erstellt und in einem Vektorformat wie [SVG](http://css-tricks.com/using-svg/) gespeichert werden. Da Vektorbilder auf einfachen Grundtypen basieren, können sie beliebig skaliert werden, ohne dass sich die Qualität oder Dateigröße ändert.

Beim Auswählen des Formats ist es wichtig, sowohl den Ursprung des Bilds - Raster oder Vektor - als auch die Inhalte - Farben, Animation, Text usw. - zu berücksichtigen. Ein Format stellt niemals die Ideallösung für sämtliche Bildtypen dar. Jedes hat seine Stärken und Schwächen.

Orientieren Sie sich an den folgenden Richtlinien, wenn Sie das Format wählen:

* Verwenden Sie JPG für Fotos.
* Verwenden Sie SVG für Vektorgrafiken und Grafiken mit Volltonfarbe wie etwa Logos.
* Verwenden Sie WebP oder PNG, falls Vektorgrafiken nicht zur Verfügung stehen.
* Verwenden Sie PNG statt GIF, da das Format mehr Farben unterstützt und eine bessere Kompression bietet.
* Verwenden Sie für längere Animationen das `<video>`-Element, da dieses eine bessere Bildqualität und Funktionen zur Wiedergabesteuerung auf Nutzerseite bietet.

## Dateigröße reduzieren

Die Dateigröße von Bildern kann stark reduziert werden, indem sie nach dem Speichern zusätzlich komprimiert werden. Es besteht eine große Auswahl an Tools zur Bildkompression: verlustbehaftete und verlustfreie, online, GUI, Befehlszeile. Wann immer möglich sollte die Bildoptimierung automatisch erfolgen, damit sie problemlos in Ihren Prozess integriert werden kann.

Viele Tools bieten die Möglichkeit, eine weitere, verlustfreie Komprimierung für JPG- und PNG-Dateien vorzunehmen, was sich nicht weiter auf die Bildqualität auswirkt. Für JPG kann [jpegtran](http://jpegclub.org/) oder [jpegoptim](http://freshmeat.net/projects/jpegoptim/) verwendet werden. Diese Programme stehen nur unter Linux zur Verfügung und sollten mit der Option `--strip-all` ausgeführt werden. Für PNG kann [OptiPNG](http://optipng.sourceforge.net/) oder [PNGOUT](http://www.advsys.net/ken/util/pngout.htm) verwendet werden.

## Bild-Sprites verwenden

CSS-Spriting ist eine Methode, bei der eine Anzahl an Bildern zu einem einzelnen Sprite-Block zusammengefügt wird. Einzelne Bilder können anschließend verwendet werden, indem das Hintergrundbild - der Sprite-Block - für ein Element angegeben und um eine Positionsangabe ergänzt wird, damit der richtige Abschnitt erscheint.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="Im Beispiel verwendeter Sprite-Block">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

Spriting hat den Vorteil, dass die Anzahl an einzelnen Downloads reduziert wird, die bei mehreren Bildern anfallen, während eine Zwischenspeicherung weiterhin möglich ist.

## Lazy Loading in Betracht ziehen

Lazy Loading kann die Ladezeiten für lange Seiten mit vielen Bildern, die nur beim Scrollen sichtbar werden, stark reduzieren, indem Bilder entweder nur bei Bedarf oder erst dann geladen werden, wenn die Hauptinhalte fertig heruntergeladen und dargestellt wurden. Zusätzlich zur Leistungsverbesserung kann Lazy Loading Erfahrungen bieten, bei denen unbegrenztes Scrollen möglich ist.

Achten Sie beim Erstellen von Seiten mit unbegrenztem Scrollen jedoch darauf, dass Inhalte erst dann geladen werden, wenn sie sichtbar werden. Suchmaschinen finden diese Inhalte möglicherweise nicht. Zudem bekommen Nutzer, die nach Informationen in der Fußzeile suchen, diese nie zu Gesicht, da ständig weitere Inhalte geladen werden.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




