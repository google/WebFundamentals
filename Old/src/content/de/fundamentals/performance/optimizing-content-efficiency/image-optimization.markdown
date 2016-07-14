---
title: "Bildoptimierung"
description: "Bilder stellen oftmals den größten Teil der heruntergeladenen Bytes auf einer Webseite dar und belegen zudem einen erheblichen Teil des sichtbaren Bereichs. Deshalb lassen sich mit der Optimierung von Bildern häufig die größten Bytemengen einsparen und die bedeutendsten Leistungsverbesserungen für eine Website erzielen. Je weniger Bytes der Browser herunterladen muss, desto weniger umkämpft ist die Bandbreite des Clients und desto schneller kann der Browser nützliche Inhalte herunterladen und auf dem Bildschirm darstellen."
updated_on: 2014-05-10
key-takeaways:
  replace:
    - "Eliminieren Sie unnötige Bildressourcen."
    - "Nutzen Sie wo immer möglich CSS3-Effekte."
    - "Verwenden Sie Webschriftarten, anstatt Text in Bildern zu codieren."
  vector-raster:
    - "Vektorgrafiken eignen sich ideal für Bilder, die aus geometrischen Formen bestehen."
    - "Vektorgrafiken sind unabhängig von Zoomfaktor und Auflösung."
    - "Für komplexe Darstellungen mit vielen unregelmäßigen Formen und Details sollten Rastergrafiken verwendet werden."
  hidpi:
    - "Hochauflösende Monitore verfügen über mehrere Gerätepixel pro CSS-Pixel."
    - "Hochauflösende Bilder erfordern eine erheblich größere Anzahl von Pixel und Bytes."
    - "Die Verfahren zur Bildoptimierung sind für jede Auflösung gleich."
  optimizing-vector:
    - "SVG ist ein XML-basiertes Bildformat."
    - "SVG-Dateien sollten zur Verkleinerung minimiert werden."
    - "SVG-Dateien sollten mit GZIP komprimiert werden."
  optimizing-raster:
    - "Eine Rastergrafik besteht aus einem Raster aus Pixeln."
    - "In jedem Pixel sind Farb- und Transparenzinformationen codiert."
    - "Bildkomprimierer nutzen eine Vielzahl von Methoden zur Reduktion der Anzahl der erforderlichen Bits pro Pixel, um die Dateigröße von Bildern zu verkleinern."
  lossless-lossy:
    - "Aufgrund der Funktionsweise unserer Augen eignen sich Bilder hervorragend für die verlustbehaftete Komprimierung."
    - "Bei der Bildoptimierung werden die verlustbehaftete und die verlustfreie Komprimierung gemeinsam angewendet."
    - "Unterschiede bei Bildformaten beruhen darauf, welche unterschiedlichen verlustbehafteten und verlustfreien Algorithmen angewendet und wie sie zur Optimierung der Bilder eingesetzt werden."
    - "Es gibt nicht das beste Format oder die beste Qualitätseinstellung für alle Bilder. Jede Kombination eines bestimmten Komprimierungsprogramms mit spezifischen Bildinhalten führt zu einem einmaligen Ergebnis."
  formats:
    - "Beginnen Sie mit der Auswahl des richtigen universellen Formats: GIF, PNG, JPEG."
    - "Experimentieren Sie und wählen Sie dann die besten Einstellungen für die einzelnen Formate aus: Qualität, Palettengröße usw."
    - "Erwägen Sie das Hinzufügen von WebP- und JPEG XR-Ressourcen für skalierte Bilder auf modernen Clients"
  scaled-images:
    - "Die Bereitstellung skalierter Bilder stellt eine der einfachsten und effektivsten Optimierungsmethoden dar."
    - "Achten Sie auf große Objekte, weil diese hohe Unkosten verursachen."
    - "Reduzieren Sie die Anzahl unnötiger Pixel über die Skalierung Ihrer Bilder auf Darstellungsgröße."
notes:
  decompressed:
    - "Übrigens belegt jedes Pixel stets 4 Bytes im Speicher - unabhängig vom Bildformat, das zur Übertragung der Daten vom Server zum Client verwendet wird, wenn das Bild vom Browser decodiert wird. Das kann bei großen Bildern und Geräten, die über keinen großen Speicher verfügen, z. B. einfachen Mobilgeräten, eine bedeutende Einschränkung darstellen."
  artifacts:
    - "Von links nach rechts (PNG): 32-Bit (16 Mio. Farben), 7-Bit (128 Farben), 5-Bit (32 Farben). Komplexe Darstellungen mit graduellen Farbverläufen (Gradienten, Himmel usw.) erfordern größere Farbpaletten zur Vermeidung von visuellen Artefakten wie dem verpixelten Himmel im 5-Bit-Objekt. Wenn im Bild andererseits nur wenige Farben verwendet werden, dann werden mit einer großen Palette nur wertvolle Bits verschwendet!"
  quality:
    - "Beachten Sie, dass Qualitätsstufen für unterschiedliche Bildformate aufgrund der verschiedenen Algorithmen zur Codierung der Bilder nicht direkt vergleichbar sind: JPEG mit Qualitätsstufe 90 unterscheidet sich erheblich von WebP mit Qualitätsstufe 90. Tatsächlich kann auch eine Qualitätsstufe für dasselbe Bildformat aufgrund der Implementierung des Komprimierungsprogramms zu einem visuell unterschiedlichen Ergebnis führen!"
  resized:
    - "Wenn die Maus über das Bildelement in Chrome DevTools bewegt wird, werden die `originale` und die `dargestellte` Größe des Bildobjekts eingeblendet. Im obigen Beispiel wird das Bild mit 300 x 260 Pixeln heruntergeladen, aber für die Anzeige auf dem Client auf 245 x 212 herunterskaliert."
---

<p class="intro">
  Bilder stellen oftmals den größten Teil der heruntergeladenen Bytes auf einer Webseite dar und belegen zudem einen erheblichen Teil des sichtbaren Bereichs. Deshalb lassen sich mit der Optimierung von Bildern häufig die größten Bytemengen einsparen und die bedeutendsten Leistungsverbesserungen für eine Website erzielen. Je weniger Bytes der Browser herunterladen muss, desto weniger umkämpft ist die Bandbreite des Clients und desto schneller kann der Browser nützliche Inhalte herunterladen und auf dem Bildschirm darstellen.
</p>


{% include shared/toc.liquid %}

Die Bildoptimierung hat sowohl einen künstlerischen als auch einen wissenschaftlichen Aspekt: einen künstlerischen, weil es keine definitiv beste Art für die Komprimierung eines einzelnen Bildes gibt, und einen wissenschaftlichen, weil viele gut konzipierte Methoden und Algorithmen verfügbar sind, mit denen die Größe eines Bildes erheblich reduziert werden kann. Die Ermittlung der optimalen Einstellungen für Ihr Bild erfordert eine sorgfältige Analyse auf zahlreichen Ebenen: Eigenschaften des Formats, Inhalt der codierten Daten, Qualität, Pixelabmessungen und mehr.

## Bilder entfernen und ersetzen

{% include shared/takeaway.liquid list=page.key-takeaways.replace %}

Als Erstes sollten Sie sich fragen, ob ein Bild tatsächlich benötigt wird, um die gewünschte Wirkung zu erzielen. Eine gute Gestaltung ist immer einfach und liefert darüber hinaus die beste Leistung. Wenn es möglich ist, eine Bildressource zu entfernen, die häufig eine große Zahl von Bytes im Zusammenhang mit HTML-, CSS-, JavaScript- und anderen Elementen auf der Seite erfordert, stellt dies stets die beste Optimierungsstrategie dar. Andererseits kann ein gut platziertes Bild auch mehr Informationen vermitteln als tausend Wörter - es ist Ihre Aufgabe, hier abzuwägen.

Als Nächstes sollten Sie alternative Technologien in Betracht ziehen, mit denen die gewünschten Resultate auf effizientere Weise erzielt werden können:

* **CSS-Effekte** (Farbverläufe, Schatten usw.) und CSS-Animationen können zur Erstellung von Objekten herangezogen werden, die bei jeder Auflösung und Zoomstufe scharf sind und häufig nur einen Bruchteil der Bytes einer Bilddatei benötigen.
* Mit **Webschriftarten** lassen sich wunderschöne Schriftbilder erstellen, wobei es weiterhin möglich ist, Text auszuwählen, zu durchsuchen und in der Größe zu verändern - eine deutliche Verbesserung der Nutzbarkeit.

Fall Sie sich dabei ertappen, dass Sie Text in einem Bildobjekt codieren, halten Sie inne und überlegen Sie noch einmal. Ein gutes Schriftbild ist für eine gute Gestaltung, gutes Branding und gute Lesbarkeit wichtig, aber Text im Bild liefert eine schlechte Nutzererfahrung: Es ist nicht möglich, den Text auszuwählen, zu durchsuchen, zu vergrößern/zu verkleinern oder anderweitig darauf zuzugreifen und er eignet sich nicht für Geräte mit hohen DPI-Werten. Die Nutzung von Webschriftarten erfordert zwar eine [Reihe eigener Optimierungen](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), ermöglicht jedoch alle diese Vorgänge und ist deshalb stets eine bessere Wahl für die Darstellung von Text.


## Vektor- und Rastergrafiken im Vergleich

{% include shared/takeaway.liquid list=page.key-takeaways.vector-raster %}

Wenn Sie festgestellt haben, dass Sie die gewünschte Wirkung am besten mit einem Bild erzielen, besteht der nächste Schritt in der Auswahl des passenden Formats:

&nbsp;

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>Vektor</b>
    <img class="center" src="images/vector-zoom.png" alt="Vergrößerte Vektorgrafik">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>Raster</b>
    <img src="images/raster-zoom.png" alt="Vergrößerte Rastergrafik">
  </div>
</div>

* [Vektorgrafiken](http://de.wikipedia.org/wiki/Vektorgrafik) nutzen Linien, Punkte und Vielecke zur Darstellung eines Bildes.
* [Rastergrafiken](http://de.wikipedia.org/wiki/Rastergrafik) codieren die einzelnen Werte eines jeden Pixels innerhalb eines rechteckigen Rasters zur Darstellung eines Bildes.

Jedes Format hat eigene Vor- und Nachteile. Vektorformate eignen sich ideal für Bilder, die aus einfachen geometrischen Formen, z. B. Logos, Text, Symbole usw., bestehen und liefern bei jeder Auflösung und Zoomeinstellung scharfe Bilder. Diese Formate sind somit optimal für hochauflösende Bildschirme und Objekte geeignet, die in verschiedenen Größen angezeigt werden sollen.

Allerdings sind Vektorformate für komplexen Darstellungen, z. B. Fotos, unzureichend: Die Menge des SVG-Markups zur Beschreibung aller Formen kann untragbar hoch werden und das Ergebnis sieht dennoch nicht `fotorealistisch` aus. In einem solchen Fall sollten Sie ein Rastergrafikformat wie GIF, PND, JPEG oder eines der neueren Formate wie JPEG-XR und WebP verwenden.

Rastergrafiken haben den Nachteil, dass sie nicht auflösungs- oder zoomunabhängig sind: Wenn Sie eine Rastergrafik hochskalieren, entstehen gezackte und verschwommene Elemente. Deshalb ist es ggf. erforderlich, mehrere Versionen einer Rastergrafik in verschiedenen Auflösungen zu speichern, um die optimale Nutzererfahrung bereitzustellen.


## Implikationen hochauflösender Bildschirme

{% include shared/takeaway.liquid list=page.key-takeaways.hidpi %}

In Bezug auf Bildpixel ist zwischen verschiedenen Pixelarten zu unterscheiden: CSS-Pixel und Gerätepixel. Ein einzelnes CSS-Pixel kann mehrere Gerätepixel umfassen: Es kann beispielsweise direkt einem einzelnen Gerätepixel entsprechen oder mehreren Gerätepixeln zugeordnet sein. Wie wirkt sich das aus? Je mehr Gerätepixel vorhanden sind, desto detailtreuer werden die Inhalte auf dem Bildschirm dargestellt.

<img src="images/css-vs-device-pixels.png" class="center" alt="CSS und Gerätepixel im Vergleich">

High DPI (HiDPI)-Bildschirme liefern wunderschöne Resultate, haben jedoch einen offensichtlichen Nachteil: Die Bildobjekte müssen detailreicher sein, um von den höheren Gerätepixelzahlen profitieren zu können. Positiv ist zu bewerten, dass Vektorgrafiken sich für diese Aufgabe ideal eignen, da sie in jeder Auflösung scharf dargestellt werden können. Zwar können für das Rendern der feineren Details höhere Verarbeitungskosten anfallen, aber das zugrundeliegende Objekt ist identisch und auflösungsunabhängig.

Auf der anderen Seite stellen Rastergrafiken eine wesentlich größere Herausforderung dar, weil sie Bilddaten pixelspezifisch codieren. Aus diesem Grund nimmt die Anzahl der Pixel mit der Dateigröße einer Rastergrafik zu. Zur Veranschaulichung wollen wir den Unterschied bei einem Fotoobjekt betrachten, das mit 100 x 100 (CSS) Pixeln dargestellt wird:

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Bildschirmauflösung</th>
    <th>Gesamtzahl der Pixel</th>
    <th>Unkomprimierte Dateigröße (4 Bytes pro Pixel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="Auflösung">1x</td>
  <td data-th="Gesamtzahl der Pixel">100 x 100 = 10.000</td>
  <td data-th="Dateigröße">40.000 Byte</td>
</tr>
<tr>
  <td data-th="Auflösung">2x</td>
  <td data-th="Gesamtzahl der Pixel">100 x 100 x 4 = 40.000</td>
  <td data-th="Dateigröße">160.000 Byte</td>
</tr>
<tr>
  <td data-th="Auflösung">3x</td>
  <td data-th="Gesamtzahl der Pixel">100 x 100 x 9 = 90.000</td>
  <td data-th="Dateigröße">360.000 Byte</td>
</tr>
</tbody>
</table>

Wenn wir die Auflösung des Monitors verdoppeln, nimmt die Gesamtzahl der Pixel um den Faktor vier zu: die doppelte Anzahl der horizontalen Pixel mal der doppelten Anzahl der vertikalen Pixel. Bei einem Bildschirm mit doppelter Auflösung vervierfacht sich also die Zahl der erforderlichen Pixel!

Was bedeutet dies für die Praxis? Hochauflösende Bildschirme ermöglichen die Darstellung wunderschöner Bilder, was ein großartiges Produktmerkmal sein kann. Allerdings erfordern hochauflösende Bildschirme auch hochauflösende Bilder. Ziehen Sie deshalb wann immer möglich Vektorgrafiken vor, weil diese auflösungsunabhängig sind und stets scharfe Resultate bieten. Wenn eine Rastergrafik benötigt wird, liefern und optimieren Sie für jedes Bild mehrere Varianten. Näheres erfahren Sie im Folgenden.


## Vektorgrafiken optimieren

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-vector %}

Alle modernen Browser unterstützen Scalable Vector Graphics (SVG), ein XML-basiertes Bildformat für zweidimensionale Grafiken. Das SVG-Markup wird direkt auf der Seite oder als externe Ressource eingebettet. Eine SVG-Datei lässt sich mit den meisten vektorbasierten Zeichenprogrammen erstellen oder manuell direkt in Ihrem bevorzugten Textverarbeitungsprogramm.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
<g id="XMLID_1_">
  <g>
    <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
  </g>
</g>
</svg>
{% endhighlight %}

Im obigen Beispiel wird eine einfache Kreisform mit einem schwarzen Umriss und einem roten Hintergrund dargestellt. Es wurde aus Adobe Illustrator exportiert. Wie Sie sich vorstellen können, enthält es einem Menge Metadaten wie Schichtinformationen, Kommentare und XML-Namensräume, die für das Rendern des Objekts im Browser oftmals unnötig sind. Deshalb empfiehlt es sich immer, SVG-Dateien mithilfe eines Tools wie [SVGO](https://github.com/svg/svgo) zu minimieren.

In unserem Fall reduziert SVGO die Größe der obigen von Illustrator erzeugten SVG-Datei um 58 % von 470 auf 199 Byte. Weil es sich bei SVG um ein XML-basiertes Format handelt, können wir mithilfe der GZIP-Komprimierung die Übertragungsgröße weiter verringern. Achten Sie darauf, dass Ihr Server für die Komprimierung von SVG-Objekten konfiguriert ist!


## Rastergrafiken optimieren

{% include shared/takeaway.liquid list=page.key-takeaways.optimizing-raster %}

Bei einer Rastergrafik handelt es sich einfach um ein zweidimensionales Raster aus einzelnen `Pixeln`. So besteht eine Pixelgrafik mit 100 x 100 Pixeln beispielsweise aus einer Abfolge von 10.000 Pixeln. In jedem Pixel sind wiederum die `[RGBA](http://en.wikipedia.org/wiki/RGBA_color_space)`-Werte gespeichert: roter Kanal (R), grüner Kanal (G), blauer Kanal (B) und der Alpha- oder Transparenzkanal (A).

Intern ordnet der Browser jedem Kanal 256 Werte (Schattierungen) zu, was umgerechnet 8 Bits pro Kanal (2 ^ 8 = 256) und 4 Bytes pro Pixel entspricht (4 Kanäle x 8 Bits = 32 Bits = 4 Bytes). Wenn wir die Abmessungen des Rasters kennen, können wir folglich die Dateigröße einfach berechnen:

* Eine Grafik mit 100 x 100 Pixeln besteht aus 10.000 Pixeln.
* 10.000 Pixel x 4 Bytes = 40.000 Bytes
* 40.000 Bytes / 1024 = 39 KB

^

{% include shared/remember.liquid title="Note" list=page.notes.decompressed %}

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Abmessungen</th>
    <th>Pixel</th>
    <th>Dateigröße</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="Abmessungen">100 x 100</td>
  <td data-th="Pixel">10.000</td>
  <td data-th="Dateigröße">39 KB</td>
</tr>
<tr>
  <td data-th="Abmessungen">200 x 200</td>
  <td data-th="Pixel">40.000</td>
  <td data-th="Dateigröße">156 KB</td>
</tr>
<tr>
  <td data-th="Abmessungen">300 x 300</td>
  <td data-th="Pixel">90.000</td>
  <td data-th="Dateigröße">351 KB</td>
</tr>
<tr>
  <td data-th="Abmessungen">500 x 500</td>
  <td data-th="Pixel">250.000</td>
  <td data-th="Dateigröße">977 KB</td>
</tr>
<tr>
  <td data-th="Abmessungen">800 x 800</td>
  <td data-th="Pixel">640.000</td>
  <td data-th="Dateigröße">2500 KB</td>
</tr>
</tbody>
</table>

39 KB für ein Bild mit 100 x 100 Pixeln mögen nicht sehr beeindruckend erscheinen, allerdings explodiert die Dateigröße bei größeren Bildern schnell und führt dazu, dass Bildobjekte langsam und der Download teuer werden. Glücklicherweise haben wir jedoch bisher das unkomprimierte Bildformat beschrieben. Was könnten wir tun, um die Größe der Bilddateien zu verringern?

Eine einfache Strategie bestünde darin, die `Bittiefe` des Bildes von 8 Bits pro Kanal auf eine kleinere Farbpalette zu reduzieren: 8 Bits pro Kanal entsprechen 256 Werten pro Kanal und 16.777.216 (2563) Farben insgesamt. Was würde sich ändern, wenn wir die Palette auf 256 Farben reduzierten? Wir würden dann nur insgesamt 8 Bits für die RGB-Kanäle benötigen und sofort zwei Bytes pro Pixel einsparen, d. h. wir würden im Vergleich zu den ursprünglichen 4 Bytes pro Pixel durch die Komprimierung die Größe um 50 % reduzieren!

<img src="images/artifacts.png" class="center" alt="Komprimierungsartefakte">

{% include shared/remember.liquid title="Note" list=page.notes.artifacts %}

Nachdem wir die in einzelnen Pixeln gespeicherten Daten jetzt optimiert haben, können wir uns als Nächstes auch mit den angrenzenden Pixeln befassen. Dabei stellt sich heraus, dass viele Bilder, insbesondere Fotos, zahlreiche angrenzende Pixel mit ähnlichen Farben aufweisen, z. B. den Himmel, sich wiederholende Texturen und so weiter. Diese Informationen können wir nutzen, indem wir das Komprimierungsprogramm anweisen, die `[Deltacodierung](http://en.wikipedia.org/wiki/Delta_encoding)` anzuwenden, bei der anstelle der Speicherung der einzelnen Werte für jedes Pixel der Unterschied zwischen angrenzenden Pixeln gespeichert wird.  Wenn die benachbarten Pixel identisch sind, beträgt der Deltawert null und es muss nur ein einzelnes Bit gespeichert werden! Doch warum sollten wir uns damit zufrieden geben...

Das menschliche Auge nimmt die verschiedenen Farben mit unterschiedlicher Empfindlichkeit wahr. Wir können die Farbcodierung optimieren, indem wir die Palette für diese Farben reduzieren oder vergrößern, um diesem Umstand zu entsprechen.
`Benachbarte` Pixel bilden ein zweidimensonales Raster, d. h., jedes Pixel hat mehrere Nachbarn. Aufgrund dieser Tatsache können wir die Deltacodierung weiter verbessern.
Statt uns nur mit den unmittelbaren Nachbarn der einzelnen Pixel zu befassen, können wir größere Blöcke aus angrenzenden Pixeln unterschiedlich codieren. Und so fort...

Wie Sie schon gemerkt haben, wird die Bildoptimierung schnell ziemlich kompliziert - oder interessant, je nach Sichtweise. Es ist ein Feld, in dem auf akademischer und kommerzieller Ebene aktiv geforscht wird. Bilder umfassen eine Menge Bytes und die Entwicklung besserer Bildkomprimierungsmethoden hat großes Potenzial! Wenn Sie mehr erfahren möchten, besuchen Sie die [Wikipedia-Seite](http://en.wikipedia.org/wiki/Image_compression) oder lesen Sie das praktische Beispiel im [White Paper über WebP-Komprimierungsmethoden](https://developers.google.com/speed/webp/docs/compression).

Das klingt ja wieder alles ganz gut, ist aber sehr theoretisch. Wie kann uns dieses Wissen nützen, die Bilder auf unseren Seiten zu optimieren? Wir sind ja definitiv nicht in der Lage, neue Komprimierungstechniken zu erfinden, aber es ist wichtig, die Problemstellung zu verstehen: RGBA-Pixel, Bittiefe und verschiedene Optimierungsmethoden. Diese Konzepte müssen unbedingt verstanden und verinnerlicht werden, bevor wir uns mit den diversen Rastergrafikformaten befassen.


## Verlustfreie und verlustbehaftete Komprimierung im Vergleich

{% include shared/takeaway.liquid list=page.key-takeaways.lossless-lossy %}

Bei bestimmten Datentypen wie dem Quellcode einer Seite oder ausführbaren Dateien ist es wichtig, dass das Komprimierungsprogramm die ursprünglichen Informationen nicht verändert oder entfernt. Ein einziges fehlendes oder falsches Datenbit kann die Bedeutung des Dateiinhalts komplett ändern oder, schlimmer noch, die ganze Datei unbrauchbar machen. Bei anderen Datentypen wie Bildern sowie Audio- und Videodateien kann es absolut akzeptabel sein, eine `näherungsweise` Darstellung der ursprünglichen Daten zu liefern.

Aufgrund der Funktionsweise des Auges ist es häufig möglich, einige Informationen über die einzelnen Pixel zu verwerfen, um die Dateigröße eines Bildes zu reduzieren. So besitzen unsere Augen beispielsweise eine unterschiedliche Sensitivität für verschiedene Farben, d. h., wir können manche Farben mit weniger Bits codieren. Aus obigen Gründen besteht ein typischer Bildoptimierungsprozess aus zwei grundsätzlichen Arbeitsschritten:

1. Das Bild wird mit einem `[verlustbehafteten](http://en.wikipedia.org/wiki/Lossy_compression)` Filter verarbeitet, der einige Pixeldaten entfernt.
1. Das Bild wird mit einem `[verlustfreien](http://en.wikipedia.org/wiki/Lossy_compression)` Filter verarbeitet, der die Pixeldaten komprimiert.

**Der erste Schritt ist optional und der genaue Algorithmus hängt vom jeweiligen Bildformat ab, aber es ist wichtig, sich im Klaren darüber zu sein, dass ein Bild einer verlustbehafteten Komprimierung unterzogen werden kann, um die Größe zu verringern.** Der Unterschied zwischen den verschiedenen Bildformaten wie GIF, PNG, JPEG und anderen besteht in der Kombination der jeweiligen Algorithmen, die bei Anwendung der verlustbehafteten und verlustfreien Arbeitsschritte verwendet bzw. weggelassen werden.

Welches ist nun die `optimale` Konfiguration bezüglich der verlustbehafteten und verlustfreien Optimierung? Die Antwort hängt von den Bildinhalten und Ihren eigenen Kriterien, z. B. bezüglich des Kompromisses zwischen Dateigröße und den durch die verlustbehaftete Komprimierung eingeführten Artefakten, ab. In manchen Fällen soll die verlustbehaftete Komprimierung weggelassen werden, um komplizierte Details mit absoluter Wiedergabetreue zu übermitteln, und in anderen Fällen ist es möglich, die Dateigröße des Bildobjekts über eine aggressive verlustbehaftete Optimierung zu reduzieren. Dabei ist es Ihre Aufgabe, dies im jeweiligen Kontext selbst zu beurteilen - es gibt keine universelle Einstellung.

<img src="images/save-for-web.png" class="center" alt="Für das Web speichern">

Bei Verwendung eines verlustbehafteten Formats wie JPEG steht im Komprimierungsprogramm im Regelfall eine anpassbare `Qualitätseinstellung` zur Verfügung, z. B. in Form eines Schiebereglers der Funktion `Save for Web` (Für das Web speichern) in Adobe Photoshop. Dabei handelt es sich typischerweise um eine Zahl von 1 bis 100, mit der die interne Funktionalität der jeweiligen Zusammenstellung von verlustbehafteten und verlustfreien Algorithmen gesteuert wird. Experimentieren Sie mit verschiedenen Qualitätseinstellungen für Ihre Bilder und schrecken Sie nicht davor zurück, die Qualität herabzusetzen: Die visuellen Resultate sind oftmals sehr gut und die Verringerung der Dateigröße kann erheblich sein.

{% include shared/remember.liquid title="Note" list=page.notes.quality %}


## Das richtige Bildformat auswählen

{% include shared/takeaway.liquid list=page.key-takeaways.formats %}

Neben unterschiedlichen verlustbehafteten und verlustfreien Komprimierungsalgorithmen unterstützen die verschiedenen Bildformate Funktionsmerkmale wie Animations- und Transparenz- (Alpha) Kanäle. Die Wahl des `richtigen Formats` für ein Bild ist folglich immer ein Kompromiss zwischen gewünschten visuellen Ergebnissen und funktionellen Anforderungen.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Format</th>
    <th>Transparenz</th>
    <th>Animation</th>
    <th>Browser</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="Format"><a href="http://de.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="Transparenz">Ja</td>
  <td data-th="Animation">Ja</td>
  <td data-th="Browser">Alle</td>
</tr>
<tr>
  <td data-th="Format"><a href="http://de.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="Transparenz">Ja</td>
  <td data-th="Animation">Nein</td>
  <td data-th="Browser">Alle</td>
</tr>
<tr>
  <td data-th="Format"><a href="http://de.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="Transparenz">Nein</td>
  <td data-th="Animation">Nein</td>
  <td data-th="Browser">Alle</td>
</tr>
<tr>
  <td data-th="Format"><a href="http://de.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="Transparenz">Ja</td>
  <td data-th="Animation">Ja</td>
  <td data-th="Browser">IE</td>
</tr>
<tr>
  <td data-th="Format"><a href="http://de.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="Transparenz">Ja</td>
  <td data-th="Animation">Ja</td>
  <td data-th="Browser">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Es gibt drei universell unterstützte Bildformate: GIF, PNG und JPEG. Neben diesen Formaten unterstützen manche Browser auch neuere Formate wie WebP und JPEG XR, die eine insgesamt bessere Komprimierung und weitere Funktionen bieten. Welches Format sollten Sie also verwenden?

<img src="images/format-tree.png" class="center" alt="Für das Web speichern">

1. **Benötigen Sie Animation? Wenn ja, ist GIF die einzige universelle Option.**
  * Bei GIF ist die Farbpalette auf maximal 256 Farben begrenzt, was für die meisten Bilder unzureichend ist. Außerdem bietet PNG-8 eine bessere Komprimierung für Bilder mit einer kleinen Farbpalette. Das bedeutet, dass GIF nur dann das richtige Format ist, wenn eine Animation benötigt wird.
1. **Müssen feine Details mit höchster Auflösung beibehalten werden? Verwenden Sie PNG.**
  * PNG wendet über die Wahl der Farbpalettengröße hinaus keine verlustbehafteten Komprimierungsalgorithmen an. Deshalb erzeugt es die hochwertigsten Bilder, allerdings auf Kosten erheblich größerer Dateien als andere Formate. Setzen Sie es mit Bedacht ein.
  * Wenn das Bildobjekt Elemente aus geometrischen Formen enthält, erwägen Sie die Konvertierung in ein Vektorformat wie SVG!
  * Enthält das Bildobjekt jedoch Text, halten Sie inne und überlegen Sie noch einmal. Text in Bildern kann nicht ausgewählt, durchsucht oder vergrößert bzw. verkleinert werden. Wenn Sie z. B. für das Branding oder aus anderen Gründen eine kundenspezifische Darstellung benötigen, verwenden Sie stattdessen eine Webschriftart.
1. **Optimieren Sie ein Foto, einen Screenshot oder ein ähnliches Bildobjekt? Verwenden Sie JPEG.**
  * JPEG nutzt eine Kombination aus verlustbehafteter und verlustfreier Optimierung, um die Dateigröße des Bildobjekts zu verringern. Probieren Sie mehrere JPEG-Qualitätsstufen aus, um den besten Kompromiss aus Qualität und Dateigröße für Ihr Objekt zu ermitteln.

Nachdem Sie schließlich das optimale Bildformat und die entsprechenden Einstellungen für Ihre Objekte bestimmt haben, erwägen Sie, eine zusätzliche Variante im WebP- und JPEG XR-Format hinzuzufügen. Diese beiden Formate sind neu und werden bedauerlicherweise nicht bzw. noch nicht von allen Browsern universell unterstützt, sie können aber erhebliche Einsparungen für neuere Clients mit sich bringen. So bewirkt WebP im Durchschnitt eine [Verringerung der Dateigröße um 30 %](https://developers.google.com/speed/webp/docs/webp_study) gegenüber einem vergleichbaren JPEG-Bild.

Da weder WebP noch JPEG XR universell unterstützt werden, ist es erforderlich, Ihrer Anwendung oder Ihren Servern zusätzliche Logik hinzuzufügen, um die jeweilige Ressource bereitzustellen:

* Einige CDNs bieten Bildoptimierung als Dienstleistung an, einschließlich der Lieferung im JPEG XR- und WebP-Format.
* Einige Open-Source-Tools, z. B. PageSpeed for Apache oder Nginx, automatisieren die Optimierung, Konvertierung und Bereitstellung entsprechender Objekte.
* Sie können zusätzliche Anwendungslogik für folgende Zwecke hinzufügen: Erkennung des Clients, Überprüfung der unterstützten Formate und Bereitstellung des besten verfügbaren Bildformats.

Wenn Sie schließlich eine Webansicht zur Darstellung von Inhalten in Ihrer nativen Anwendung nutzen, besitzen Sie die volle Kontrolle über den Client und können ausschließlich WebP verwenden! Facebook, Google+ und viele andere Portale nutzen WebP zur Bereitstellung aller ihrer Bilder innerhalb ihrer Anwendungen - die Einsparungen sind es mit Sicherheit wert. Weitere Informationen über WebP finden Sie in der Präsentation [WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE) von Google I/O 2013.


## Tools und Einstellung von Parametern

Es gibt kein perfektes Bildformat oder Tool und keine ideale Zusammenstellung von Optimierungsparametern, die auf alle Bilder anwendbar sind. Für optimale Ergebnisse sind das Format und die Einstellungen je nach Inhalt des Bildes sowie dessen visuellen und anderen technischen Anforderungen auszuwählen.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Tool</th>
    <th>Beschreibung</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="Tool"><a href="http://www.lcdf.org/gifsicle/">Gifsicle</a></td>
  <td data-th="Beschreibung">GIF-Bilder erstellen und optimieren</td>
</tr>
<tr>
  <td data-th="Tool"><a href="http://jpegclub.org/jpegtran/">Jpegtran</a></td>
  <td data-th="Beschreibung">JPEG-Bilder optimieren</td>
</tr>
<tr>
  <td data-th="Tool"><a href="http://optipng.sourceforge.net/">Optipng</a></td>
  <td data-th="Beschreibung">Verlustfreie PNG-Optimierung</td>
</tr>
<tr>
  <td data-th="Tool"><a href="http://pngquant.org/">Pngquant</a></td>
  <td data-th="Beschreibung">Verlustbehaftete PNG-Optimierung</td>
</tr>
</tbody>
</table>


Schrecken Sie nicht davor zurück, mit den Parametern der einzelnen Komprimierungsprogramme zu experimentieren. Setzen Sie die Qualität herab, sehen Sie sich das Resultat an, passen Sie die Einstellungen an und wiederholen Sie dann den Vorgang. Wenn Sie eine Reihe guter Einstellungen gefunden haben, können Sie diese auf ähnliche Bilder auf Ihrer Website anwenden. Gehen Sie jedoch nicht davon aus, dass alle Bilder mit denselben Einstellungen komprimiert werden sollten.


## Skalierte Bildobjekte bereitstellen

{% include shared/takeaway.liquid list=page.key-takeaways.scaled-images %}

Bei der Bildoptimierung kommt es letzten Endes auf zwei Kriterien an: die Optimierung der Bytezahl zur Codierung der einzelnen Bildpixel und die Optimierung der Gesamtzahl an Pixeln. Die Dateigröße eines Bildes setzt sich aus der Gesamtzahl der Pixel mal der Anzahl der Bytes zur Codierung der einzelnen Pixel zusammen. Nicht mehr und nicht weniger.

Aus diesem Grund besteht eine der einfachsten und effektivsten Bildoptimierungsmethoden darin, nicht mehr Pixel, als für die Darstellung des Objekts mit der gewünschten Größe im Browser nötig sind, zu übertragen. Klingt doch eigentlich ganz einfach, oder? Leider trifft dies bei den meisten Seiten auf viele der Bildobjekte nicht zu. Typischerweise werden größere Objekte übertragen, die der Browser dann umskalieren - benötigt zusätzliche CPU-Ressourcen - und mit einer geringeren Auflösung darstellen soll.

<img src="images/resized-image.png" class="center" alt="Bild mit geänderter Größe">

{% include shared/remember.liquid title="Note" list=page.notes.resized %}

Die Übertragung unnötiger Pixel, die der Browser unseretwegen umskalieren muss, stellt eine verpasste Chance dar, die Gesamtzahl der Bytes zu reduzieren und zu optimieren, die für das Rendern der Seite erforderlich sind. Beachten Sie außerdem, dass bei einer Verkleinerung nicht nur die Pixelzahl des Bildes verringert wird, sondern dass dabei auch die ursprüngliche Bildgröße herabgesetzt wird.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Ursprüngliche Größe</th>
    <th>Angezeigte Größe</th>
    <th>Unnötige Pixel</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="Ursprünglich">110 x 110</td>
  <td data-th="Anzeige">100 x 100</td>
  <td data-th="Unnötig">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="Ursprünglich">410 x 410</td>
  <td data-th="Anzeige">400 x 400</td>
  <td data-th="Unnötig">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="Ursprünglich">810 x 810</td>
  <td data-th="Anzeige">800 x 800</td>
  <td data-th="Unnötig">810 x 810 - 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

Beachten Sie, dass in allen drei Fällen die angezeigte Größe `lediglich um 10 Pixel kleiner` als die ursprüngliche Größe des Bildes ausfällt. Allerdings ist die Zahl der zusätzlichen Pixel, die zu codieren und zu übertragen sind, umso höher, je größer das ursprüngliche Bild ist! Deshalb können Sie zwar nicht sicherstellen, dass jedes einzelne Objekt mit der exakten Darstellungsgröße übermittelt wird, **sie sollten jedoch dafür sorgen, dass die Anzahl der unnötigen Pixel minimal ist und dass insbesondere große Objekte so genau wie möglich in Darstellungsgröße geliefert werden.**

## Checkliste zur Bildoptimierung

Die Bildoptimierung hat sowohl einen künstlerischen als auch einen wissenschaftlichen Aspekt: einen künstlerischen, weil es keine definitiv beste Art für die Komprimierung eines einzelnen Bildes gibt, und einen wissenschaftlichen, weil gut konzipierte Methoden und Algorithmen verfügbar sind, mit denen die Größe eines Bildes erheblich reduziert werden kann.

Einige Tipps und Methoden für die Optimierung Ihrer Bilder:

* **Vektorformate bevorzugen:** Vektorgrafiken sind unabhängig von Auflösung und Größe und eignen sich deshalb ideal für die heutigen Gegebenheiten mit vielen Geräten und hoher Auflösung.
* **SVG-Objekte minimieren und komprimieren:** Das XML-Markup, das von den meisten Zeichenprogrammen erzeugt wird, enthält häufig unnötige Metadaten, die entfernt werden können. Achten Sie darauf, dass Ihre Server für die Anwendung der GZIP-Komprimierung auf SVG-Objekte konfiguriert sind.
* **Das beste Rastergrafikformat auswählen:** Ermitteln Sie Ihre funktionalen Anforderungen und wählen Sie dasjenige Format aus, das sich für das jeweilige Objekt eignet.
* **Mit den Qualitätseinstellungen für Rasterformate experimentieren:** Schrecken Sie nicht davor zurück, die `Qualitätseinstellungen` herabzusetzen. Die Resultate sind häufig sehr gut und die Einsparungen an Bytes signifikant.
* **Unnötige Metadaten von Bildern entfernen:** Viele Rastergrafiken enthalten unnötige Metadaten zum Objekt: geografische Informationen, Kamerainformationen und so weiter. Entfernen Sie diese Daten mit geeigneten Tools.
* **Skalierte Bilder bereitstellen:** Ändern Sie die Größe der Bilder auf dem Server und stellen Sie sicher, dass die angezeigte Größe so weit wie möglich der ursprünglichen Größe des jeweiligen Bildes entspricht. Achten Sie insbesondere auf große Bilder, da diese bei einer Größenänderung die meisten unnötigen Daten beinhalten!
* **Automatisieren, automatisieren, automatisieren:** Investieren Sie in automatisierte Tools und Infrastruktur, mit denen sichergestellt wird, dass alle Ihre Bildobjekte stets optimiert sind.




