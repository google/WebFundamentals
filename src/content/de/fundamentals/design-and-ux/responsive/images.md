project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Ein Bild sagt mehr als 1000 Worte, und Bilder spielen eine sehr wichtige Rolle auf jeder einzelnen Seite. Leider stellen sie aber ebenso einen Großteil des Volumens dar, das heruntergeladen wird. Mit einem responsiven Webdesign können sich nicht nur unsere Layouts Gerätecharakteristiken anpassen, sondern ebenso die Bilder.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# Bilder {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



Ein Bild sagt mehr als 1000 Worte, und Bilder spielen eine sehr wichtige Rolle auf jeder einzelnen Seite. Leider stellen sie aber ebenso einen Großteil des Volumens dar, das heruntergeladen wird. Mit einem responsiven Webdesign können sich nicht nur unsere Layouts Gerätecharakteristiken anpassen, sondern ebenso die Bilder.


### Responsive Bilder

Mit responsivem Webdesign können sich nicht nur unsere Layouts Gerätecharakteristiken anpassen, sondern ebenso die Inhalte. So sind zum Beispiel auf Anzeigen mit hoher Auflösung (2x) Grafiken mit hoher Auflösung nötig, um eine scharfe Darstellung zu gewährleisten. Ein Bild, das 50 % der Breite einnimmt, ist gut geeignet, wenn der Browser 800 Pixel in der Breite aufweist. So ein Bild belegt auf einem Telefon mit kleinem Display jedoch zu viel Platz und verursacht darüber hinaus die gleiche Belastung der Bandbreite, wenn es zur Anzeige auf kleineren Bildschirmen herunterskaliert wird.

### Art Direction

<img class="center" src="img/art-direction.png" alt="Beispiel für Art Direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

In anderen Fällen sind möglicherweise noch drastischere Änderungen erforderlich: Änderung der Proportionen, Zuschneiden und sogar der Austausch des gesamten Bilds. In solchen Fällen wir der Prozess zur Änderung des Bilds in der Regel als Art Direction bezeichnet. Weitere Beispiele finden Sie unter [responsiveimages.org/demos/](http://responsiveimages.org/demos/).


{% include "web/_shared/udacity/ud882.html" %}



## Bilder im Markup 

Das `img`-Element erfüllt viele Funktionen. Es lädt Inhalte herunter, decodiert sie und zeigt sie an. Darüber hinaus unterstützen moderne Browser eine große Anzahl an Bildformaten. Die Nutzung von Bildern, die auf allen Geräten funktionieren, unterscheidet sich im Vergleich zu Desktopcomputern nicht. Es sind lediglich ein paar kleinere Handgriffe nötig, um eine gute Erfahrung zu gewährleisten.



### TL;DR {: .hide-from-toc }
- Nutzen Sie relative Größen für Bilder, um zu verhindern, dass diese sich versehentlich über die Container-Grenzen hinweg erstrecken.
- Verwenden Sie das <code>picture</code>-Element, wenn Sie verschiedene Bilder auf Grundlage von Gerätecharakteristiken festlegen, auch Art Direction genannt.
- Verwenden Sie <code>srcset</code> und den <code>x</code>-Deskriptor im <code>img</code>-Element, um den Browser darauf hinzuweisen, welches das am besten geeignete Bild bei der Auswahl aus verschiedenen Pixeldichten ist.



### Relative Größen für Bilder verwenden

Denken Sie daran, relative Größen zu nutzen, wenn Sie Breiten für Bilder festlegen, um zu verhindern, dass sie sich über die Grenzen des Darstellungsbereichs hinweg erstrecken. So bleibt die Bildgröße bei `width: 50%` stets bei 50 % des Container-Elements - nicht des Darstellungsbereichs oder der tatsächlichen Pixelgröße.

Da es die CSS-Syntax zulässt, dass sich Inhalte über Container-Grenzen hinweg erstrecken, kann es erforderlich sein, die Angabe `max-width: 100%` einzufügen, damit Bilder und andere Inhalte innerhalb des Containers bleiben. Beispiel:


    img, embed, object, video {
      max-width: 100%;
    }
    

Achten Sie darauf, dem `alt`-Attribut des `img`-Elements aussagekräftige Beschreibungen hinzuzufügen. Hierdurch wird Ihre Website zugänglicher, denn die Beschreibungen bieten einer Bildschirmsprachausgabe und anderen Hilfstechnologien Kontext.

### Bilddarstellung mit `srcset` auf Geräten mit hohem DPI-Wert verbessern

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Das <code>srcset</code>-Attribut erweitert das <code>img</code>-Element, indem es dafür sorgt, dass auf einfache Weise mehrere Bilddateien für verschiedene Gerätecharakteristiken bereitgestellt werden können. Ähnlich wie die native <a href="#use_image-set_to_provide_high_res_images">CSS-Funktion</a> <code>image-set</code> erlaubt <code>srcset</code> Browsern, abhängig von den Charakteristiken des jeweiligen Geräts das beste Bild auszuwählen, zum Beispiel ein 2x-Bild für ein 2x-Display, und in Zukunft möglicherweise auch ein 1x-Bild für ein 2x-Gerät, wenn nur eine geringe Bandbreite zur Verfügung steht.

<div class="clearfix"></div>



    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Browser, die `srcset` nicht unterstützen, nutzen einfach die Standardbilddatei, die im `src`-Attribut festgelegt ist. Aus diesem Grund ist es wichtig, immer ein 1x-Bild zur Verfügung zu stellen, das auf allen Geräten unabhängig von jeglichen Funktionen angezeigt werden kann. Bei `srcset`-Unterstützung wird die kommagetrennte Liste mit Bild/Bedingungen vor dem Senden von Anfragen analysiert und nur das am besten geeignete Bild heruntergeladen und angezeigt.

Während die Bedingungen viele verschiedene Elemente wie Pixeldichte, Breite und Höhe enthalten können, ist aktuell nur die Unterstützung der Pixeldichte weit verbreitet. Der beste Kompromiss zwischen aktuellem Verhalten und künftigen Funktionen ist es, einfach das 2x-Bild im Attribut anzugeben.

### Art Direction in responsiven Bildern mit `picture`

Das Ändern von Bildern auf Grundlage von Gerätecharakteristiken ist auch als Art Direction bekannt und kann mithilfe des `picture`-Elements bewerkstelligt werden. Das <code>picture</code>-Element definiert eine deklarative Lösung für die Bereitstellung verschiedener Versionen eines Bilds auf Grundlage verschiedener Charakteristiken wie Gerätegröße, Geräteauflösung, Ausrichtung usw.

<img class="center" src="img/art-direction.png" alt="Beispiel für Art Direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">


Note: Das <code>picture</code>-Element wird von Browsern zunehmend unterstützt. Es ist zwar noch nicht in allen Browsern verfügbar, wir empfehlen aufgrund seiner guten Rückwärtskompatibilität und der möglichen Nutzung von <a href='http://picturefill.responsiveimages.org/'>Picturefill/Polyfill</a> aber dennoch seinen Einsatz. Weitere Informationen erhalten Sie auf der Website <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Das <code>picture</code>-Element sollte verwendet werden, wenn eine Bildquelle mit verschiedenen Pixeldichten verfügbar ist oder ein responsives Design nach leicht unterschiedlichen Bildern auf einigen Bildschirmarten verlangt. Ähnlich wie beim <code>video</code>-Element können mehrere <code>source</code>-Elemente verwendet werden, wodurch abhängig von Medienabfragen oder dem Bildformat die Angabe verschiedener Bilddateien möglich wird.

<div class="clearfix"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

Im vorherigen Beispiel wird bei einer Browserbreite von mindestens 800 Pixeln entweder `head.jpg` oder `head-2x.jpg` verwendet, abhängig von der Auflösung des Geräts. Wenn der Browser zwischen 450 und 800 Pixeln breit ist, kommt entweder `head-small.jpg` oder `head-small-2x.jpg` zum Einsatz, wieder abhängig von der Auflösung des Geräts. Für Bildschirmbreiten mit weniger als 450 Pixeln und Rückwärtskompatibilität, bei denen das `picture`-Element nicht unterstützt wird, stellt der Browser stattdessen das `img`-Element dar, das immer verwendet werden sollte.

#### Bilder mit relativer Größe

Wenn die endgültige Größe des Bilds nicht bekannt ist, kann es schwierig sein, einen Deskriptor für die Pixeldichte der Bildquellen anzugeben. Dies gilt vor allem für Bilder, die sich über eine proportionale Breite des Browsers erstrecken und abhängig von der Größe des Browsers frei verschiebbar sind.

Statt eine feste Größe und Pixeldichte für Bilder festzulegen, kann die Größe aller bereitgestellten Bilder über das Hinzufügen eines Breitendeskriptors zusammen mit der Größe des Bildelements angegeben werden. So kann der Browser die effektive Pixeldichte automatisch berechnen und das beste Bild zum Herunterladen auswählen.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

Im vorherigen Beispiel wird ein Bild dargestellt, das die Hälfte der Breite des Darstellungsbereichs (sizes=50vw) aufweist. Abhängig von der Breite des Browsers und seinem Gerätepixelverhältnis wird ihm ermöglicht, das richtige Bild unabhängig davon auszuwählen, wie groß das Browserfenster ist. In der folgenden Tabelle ist zu sehen, welches Bild er Browser auswählen würde:

<table>
    <thead>
    <tr>
      <th data-th="Browserbreite">Browserbreite</th>
      <th data-th="Gerätepixelverhältnis">Gerätepixelverhältnis</th>
      <th data-th="Verwendetes Bild">Verwendetes Bild</th>
      <th data-th="Effektive Auflösung">Effektive Auflösung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browserbreite">400 px</td>
      <td data-th="Gerätepixelverhältnis">1</td>
      <td data-th="Verwendetes Bild"><code>200.png</code></td>
      <td data-th="Effektive Auflösung">1x</td>
    </tr>
    <tr>
      <td data-th="Browserbreite">400 px</td>
      <td data-th="Gerätepixelverhältnis">2</td>
      <td data-th="Verwendetes Bild"><code>400.png</code></td>
      <td data-th="Effektive Auflösung">2x</td>
    </tr>
    <tr>
      <td data-th="Browserbreite">320 px</td>
      <td data-th="Gerätepixelverhältnis">2</td>
      <td data-th="Verwendetes Bild"><code>400.png</code></td>
      <td data-th="Effektive Auflösung">2,5x</td>
    </tr>
    <tr>
      <td data-th="Browserbreite">600 px</td>
      <td data-th="Gerätepixelverhältnis">2</td>
      <td data-th="Verwendetes Bild"><code>800.png</code></td>
      <td data-th="Effektive Auflösung">2,67x</td>
    </tr>
    <tr>
      <td data-th="Browserbreite">640 px</td>
      <td data-th="Gerätepixelverhältnis">3</td>
      <td data-th="Verwendetes Bild"><code>1000.png</code></td>
      <td data-th="Effektive Auflösung">3,125x</td>
    </tr>
    <tr>
      <td data-th="Browserbreite">1100 px</td>
      <td data-th="Gerätepixelverhältnis">1</td>
      <td data-th="Verwendetes Bild"><code>1400.png</code></td>
      <td data-th="Effektive Auflösung">1,27x</td>
    </tr>
  </tbody>
</table>


#### Übergangspunkte in responsiven Bildern berücksichtigen

In vielen Fällen ändert sich die Größe oder das Bild abhängig von den Layoutübergangspunkten der Website. So kann es bei kleinen Bildschirmen wünschenswert sein, die volle Breite des Darstellungsbereichs mit einem Bild abzudecken, während auf größeren Bildschirmen nur ein kleiner proportionaler Teil genutzt werden sollte. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

Das `sizes`-Attribut im vorherigen Beispiel nutzt mehrere Medienabfragen, um die Größe des Bilds festzulegen. Wenn die Breite des Browsers über 600 Pixeln liegt, wird das Bild mit 25 % der Breite des Darstellungsbereichs angezeigt. Bei einer Breite zwischen 500 und 600 Pixeln nimmt es 50 % der Breite des Darstellungsbereichs ein. Unter 500 Pixeln wird die volle Breite in Anspruch genommen.


### Produktbilder maximierbar machen

Kunden möchten sehen, was sie kaufen. Auf Einzelhändler-Websites erwarten Nutzer, sich Nahaufnahmen von Produkten in hoher Auflösung ansehen zu können, um einen besseren Eindruck von Einzelheiten zu bekommen. [Studienteilnehmer](/web/fundamentals/getting-started/principles/) wurden frustriert, wenn sie dazu keine Gelegenheit erhielten.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Website von J. Crews mit maximierbarem Produktbild">
  <figcaption>Website von J. Crews mit maximierbarem Produktbild</figcaption>
</figure>

Ein gutes Beispiel für ein maximierbares Bild, das angetippt werden kann, lässt sich auf der Website von J. Crew finden. Ein Overlay, das verschwindet, gibt einen Hinweis darauf, dass das Bild angetippt werden kann. Beim Antippen erhält der Nutzer anschließend ein gezoomtes Bild, auf dem Einzelheiten betrachtet werden können.


### Andere Bildmethoden

#### Komprimierte Bilder

Die [Methode für Komprimierte
Bilder](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) stellt ein stark komprimiertes 2x-Bild für alle Geräte bereit, unabhängig von den tatsächlichen Funktionen des Geräts. Abhängig vom Bildtyp und der Komprimierungsstufe ist möglicherweise keine Veränderung am Bild wahrnehmbar, die Dateigröße verringert sich jedoch beträchtlich.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html">Siehe Beispiel</a>

Note: Bei der Nutzung der Komprimierung ist aufgrund der erhöhten Speicherbelastung und des erhöhten Aufwands beim Codieren Vorsicht geboten. Die Änderung der Größe für kleinere Bildschirme ist rechenintensiv und kann besonders auf Low-End-Geräten mit wenig Speicher und geringer Rechenkapazität Probleme verursachen.

#### JavaScript-Bildersetzung

Die JavaScript-Bildersetzung prüft die Funktionen des Geräts und entscheidet sich dann für das passende Bild. Sie können das Gerätepixelverhältnis mithilfe von `window.devicePixelRatio` ermitteln, die Bildschirmhöhe und -breite abrufen und mit `navigator.connection` oder einer Fake-Anfrage möglicherweise sogar mehr über die Netzwerkverbindung herausfinden. Nachdem Sie diese Informationen gesammelt haben, können Sie entscheiden, welches Bild geladen werden soll.

Ein großer Nachteil dieses Ansatzes ist, dass das Bild bei der Verwendung von JavaScript erst dann geladen wird, wenn zumindest der `look-ahead`-Parser durchlaufen wurde. Das bedeutet, dass der Ladevorgang für das Bild nicht einmal gestartet wird, bis das `pageload`-Ereignis ausgelöst wurde. Zudem lädt der Browser mit hoher Wahrscheinlichkeit sowohl die 1x- als auch die 2x-Varianten des Bilds herunter, wodurch die Seite zusätzlich Speicher belegt.





## Bilder in CSS 




Die CSS-Eigenschaft `background` ist ein leistungsstarkes Tool für das Hinzufügen von komplexen Bildern zu Elementen. Es können damit mehrere Bilder hinzugefügt und vervielfältigt werden und vieles mehr.  Wenn die Eigenschaft zusammen mit Medienabfragen genutzt wird, ergeben sich sogar noch weitere Möglichkeiten. So können Bilder nur unter bestimmten Bedingungen auf Grundlage von Bildschirmauflösung, Größe des Darstellungsbereichs oder anderen Faktoren geladen werden.



### TL;DR {: .hide-from-toc }
- Verwenden Sie das am besten zu den Charakteristiken der Anzeige passende Bild. Berücksichtigen Sie die Bildschirmgröße, die Geräteauflösung und das Seitenlayout.
- Ändern Sie für Anzeigen mit hohem DPI-Wert die <code>background-image</code>-Eigenschaft in CSS, indem Sie Medienabfragen mit <code>min-resolution</code> und <code>-webkit-min-device-pixel-ratio</code> verwenden.
- Verwenden Sie `srcset` zur Bereitstellung von Bildern mit hoher Auflösung zusätzlich zu den 1x-Bildern im Markup.
- Berücksichtigen Sie den Berechnungsaufwand beim Einsatz von JavaScript-Methoden zum Ersetzen von Bildern oder der Bereitstellung von stark komprimierten Bildern mit hoher Auflösung auf Geräten mit geringerer Auflösung.


### Medienabfragen für das bedingte Laden von Bildern oder Art Direction verwenden

Medienabfragen wirken sich nicht nur auf das Seitenlayout aus, sondern können auch dazu genutzt werden, Bilder unter bestimmten Bedingungen zu laden oder Art Direction auf Grundlage der Breite des Darstellungsbereichs bereitzustellen.

So wird im folgenden Beispiel für kleinere Bildschirme nur `small.png` heruntergeladen und auf die Inhalte des `div`-Containers angewendet, während für größere `background-image: url(body.png)` auf den Hauptteil und `background-image: url(large.png)` auf den Inhalt im `div`-Container angewendet wird.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

### `image-set` zur Bereitstellung von Bildern mit hoher Auflösung verwenden

Die CSS-Funktion `image-set()` erweitert die Funktionalität der `background`-Eigenschaft, sodass die Bereitstellung mehrerer Bilddateien für verschiedene Gerätecharakteristiken problemlos bewerkstelligt werden kann. Damit kann der Browser das für die Charakteristiken des jeweiligen Geräts am besten geeignete Bild auswählen, etwa ein 2x-Bild für ein 2x-Display oder ein 1x-Bild für ein 2x-Gerät, falls nur eine geringe Bandbreite zur Verfügung steht.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Der Browser lädt das richtige Bild nicht nur, sondern skaliert es auch
entsprechend. Anders ausgedrückt: Der Browser geht davon aus, dass 2x-Bilder doppelt so groß wie 1x-Bilder sind und reduziert das 2x-Bild um den Faktor 2, sodass das Bild in der gleichen Größe auf der Seite erscheint.

Die Unterstützung für `image-set()` ist relativ neu und wird aktuell nur von Chrome und Safari mit dem Anbieterpräfix `-webkit` unterstützt. Darüber hinaus muss Sorge dafür getragen werden, dass ein Ersatzbild zur Verfügung steht, falls `image-set()` nicht unterstützt wird. Beispiel:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

Im vorherigen Beispiel wird das passende Element in Browsern, die `image-set` unterstützen, und ansonsten das 1x-Element geladen. Das Problem hierbei ist natürlich, dass in den meisten Browsern das 1x-Element geladen wird, solange die `image-set()`-Unterstützung bei Browsern gering ist.

### Medienabfragen für die Bereitstellung von Bildern mit hoher Auflösung oder Art Direction verwenden

Medienabfragen können Regeln auf Grundlage des [Gerätepixelverhältnisses](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg) erstellen, womit verschiedene Bilder für 2x- und 1x-Displays festgelegt werden können.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox und Opera unterstützen alle standardmäßig `(min-resolution: 2dppx)`, während Safari und Android-Browser beide die ältere Syntax mit Anbieterpräfix ohne `dppx`-Einheit benötigen. Denken Sie daran, dass diese Stile nur dann geladen werden, wenn das Gerät der Medienabfrage entspricht, und Sie Stile für den Grundfall festlegen müssen. Dies hat den Vorteil, dass eine Darstellung auch in dem Fall gewährleistet ist, dass der Browser keine auflösungsspezifischen Medienabfragen unterstützt.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

Sie können auch die `min-width`-Syntax nutzen, um abhängig von der Größe des Darstellungsbereichs alternative Bilder anzeigen zu lassen. Der Vorteil bei dieser Methode ist, dass das Bild nicht heruntergeladen wird, wenn keine Übereinstimmung mit der Medienabfrage gegeben ist. So wird `bg.png` nur dann heruntergeladen und auf das `body`-Element angewendet, wenn die Browserbreite mindestens 500 Pixel beträgt:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	





## SVG für Symbole verwenden 




Wenn Sie Ihrer Seite Symbole hinzufügen, sollten Sie falls möglich SVG-Symbole oder gegebenenfalls Unicode-Zeichen verwenden.



### TL;DR {: .hide-from-toc }
- Verwenden Sie anstelle von Rasterbildern SVG oder Unicode für Symbole.


### Einfache Symbole durch Unicode ersetzen

Viele Schriftarten unterstützen die unzähligen Unicode-Glyphen, die anstelle von Bildern verwendet werden können. Im Gegensatz zu Bildern lassen sich Unicode-Schriftarten gut skalieren und sehen immer gut aus, egal, wie klein oder groß sie auf dem Bildschirm dargestellt werden.

Neben dem normalen Zeichensatz kann Unicode Symbole für Zahlzeichen (&#8528;), Pfeile (&#8592;), mathematische Operatoren (&#8730;), geometrische Formen (&#9733;), Steuerzeichen (&#9654;), Brailleschrift (&#10255;), Notenschrift (&#9836;), griechische Buchstaben (&#937;) und sogar Schachfiguren (&#9822;) enthalten.

Unicode-Zeichen werden wie benannte Zeichen verwendet: `&#XXXX`, wobei `XXXX` der Zahl des Unicode-Zeichens entspricht. Beispiel:


    Du bist ein echter &#9733;
    

Du bist ein echter &#9733;

### Komplexe Symbole durch SVG ersetzen
Für komplexere Symbolanforderungen eignen sich SVG-Symbole. Sie sind in der Regel simpel, nutzerfreundlich und können mit CSS gestaltet werden. SVG bietet im Vergleich zu Rasterbildern folgende Vorteile:

* Die Vektorgrafiken lassen sich unendlich skalieren.
* CSS-Effekte wie Farbe, Schattierung, Transparenz und Animationen sind unkompliziert.
* SVG-Bilder können in direkt in das Dokument integriert werden.
* Die Vektorgrafiken sind semantisch.
* Mit den passenden Attributen sind sie besser zugänglich.

&nbsp;

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

### Symbolschriften mit Vorsicht verwenden

Symbolschriften sind zwar beliebt und leicht anwendbar, einige bergen jedoch im Vergleich zu SVG-Symbolen Nachteile.

* Es handelt sich um Vektorgrafiken, die unendlich skalierbar sind. Es kann jedoch zu einer Kantenglättung kommen, in deren Folge die Symbole nicht so scharf dargestellt werden wie erwartet.
* Die Gestaltungsmöglichkeiten mit CSS sind begrenzt.
* Die perfekte Positionierung der Pixel kann schwierig sein, je nach Zeilenhöhe, Buchstabenabstand usw.
* Sie sind nicht semantisch und die Verwendung mit Screenreadern oder anderen Bedienungshilfen kann sich als schwierig erweisen.
* Wenn der Bereich nicht ordnungsgemäß festgelegt ist, kann die Datei riesig werden, obwohl nur eine kleine Teilmenge der verfügbaren Symbole verwendet wird. 



<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Beispiel einer Seite, die Font Awesome für die Schriftartensymbole verwendet">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

Es gibt Hunderte kostenloser und kostenpflichtiger Symbolschriften, darunter [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) und [Glyphicons](http://glyphicons.com/).

Achten Sie darauf, dass die Last der zusätzlichen HTTP-Anfrage und Dateigröße mit dem Symbolbedarf im Verhältnis steht. Wenn Sie zum Beispiel nur eine Handvoll Symbole benötigen, ist ein Bild oder Sprite unter Umständen die bessere Wahl.





## Bilder auf Leistung optimieren 




Bilder belegen in der Regel die meiste Bandbreite und darüber hinaus oft auch einen großen Teil des visuellen Bereichs einer Seite. Aus diesem Grund kann die Bandbreite oft durch die Optimierung von Bildern am besten entlastet und so die Leistung Ihrer Website erhöht werden: Je weniger der Browser herunterladen muss, desto weniger Bandbreitebelastung entsteht, wodurch der Browser sämtliche Inhalte schneller herunterladen und anzeigen kann.


### TL;DR {: .hide-from-toc }
- Verwenden Sie nicht einfach irgendein Bildformat. Setzen Sie sich mit den verschiedenen verfügbaren Formaten auseinander und nutzen Sie das am besten geeignete.
- Nehmen Sie Schritte zur Bildoptimierung und -komprimierung in Ihren Prozess auf, um die Größe der Dateien zu reduzieren.
- Reduzieren Sie die Anzahl an HTTP-Anfragen, indem Sie häufig genutzte Bilder in Bild-Sprites platzieren.
- Ziehen Sie in Betracht, Bilder erst dann laden zu lassen, wenn sie sichtbar sind. So kann die Seite schneller geladen werden und belegt zu Anfang weniger Speicher.


### Das richtige Format wählen

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

### Dateigröße reduzieren

Die Dateigröße von Bildern kann stark reduziert werden, indem sie nach dem Speichern zusätzlich komprimiert werden. Es besteht eine große Auswahl an Tools zur Bildkompression: verlustbehaftete und verlustfreie, online, GUI, Befehlszeile. Wann immer möglich sollte die Bildoptimierung automatisch erfolgen, damit sie problemlos in Ihren Prozess integriert werden kann.

Viele Tools bieten die Möglichkeit, eine weitere, verlustfreie Komprimierung für JPG- und PNG-Dateien vorzunehmen, was sich nicht weiter auf die Bildqualität auswirkt. Für JPG kann [jpegtran](http://jpegclub.org/) oder [jpegoptim](http://freshmeat.net/projects/jpegoptim/) verwendet werden. Diese Programme stehen nur unter Linux zur Verfügung und sollten mit der Option `--strip-all` ausgeführt werden. Für PNG kann [OptiPNG](http://optipng.sourceforge.net/) oder [PNGOUT](http://www.advsys.net/ken/util/pngout.htm) verwendet werden.

### Bild-Sprites verwenden

CSS-Spriting ist eine Methode, bei der eine Anzahl an Bildern zu einem einzelnen Sprite-Block zusammengefügt wird. Einzelne Bilder können anschließend verwendet werden, indem das Hintergrundbild - der Sprite-Block - für ein Element angegeben und um eine Positionsangabe ergänzt wird, damit der richtige Abschnitt erscheint.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt="Im Beispiel verwendeter Sprite-Block"></a>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

Spriting hat den Vorteil, dass die Anzahl an einzelnen Downloads reduziert wird, die bei mehreren Bildern anfallen, während eine Zwischenspeicherung weiterhin möglich ist.

### Lazy Loading in Betracht ziehen

Lazy Loading kann die Ladezeiten für lange Seiten mit vielen Bildern, die nur beim Scrollen sichtbar werden, stark reduzieren, indem Bilder entweder nur bei Bedarf oder erst dann geladen werden, wenn die Hauptinhalte fertig heruntergeladen und dargestellt wurden. Zusätzlich zur Leistungsverbesserung kann Lazy Loading Erfahrungen bieten, bei denen unbegrenztes Scrollen möglich ist.

Achten Sie beim Erstellen von Seiten mit unbegrenztem Scrollen jedoch darauf, dass Inhalte erst dann geladen werden, wenn sie sichtbar werden. Suchmaschinen finden diese Inhalte möglicherweise nicht. Zudem bekommen Nutzer, die nach Informationen in der Fußzeile suchen, diese nie zu Gesicht, da ständig weitere Inhalte geladen werden.



## Bilder nach Möglichkeit vermeiden 




Manchmal ist es besser, Bilder gar nicht zu nutzen. Verwenden Sie wann immer möglich die nativen Funktionen des Browsers, um gleiche oder ähnliche Funktionalität bereitzustellen.  Browser bieten heute optische Möglichkeiten, für die früher Bilder notwendig gewesen währen. So müssen Browser keine separaten Bilddateien mehr herunterladen und es besteht keine Gefahr, dass falsch skalierte Bilder erscheinen. Symbole können mithilfe von Unicode oder speziellen Symbolschriftarten dargestellt werden.




### TL;DR {: .hide-from-toc }
- Verzichten Sie wann immer möglich auf Bilder und nutzen Sie stattdessen Browserfunktionen für Schatten, Farbverläufe, abgerundete Ecken usw.


### Text in Markup statt auf eingebetteten Bildern platzieren

Wann immer möglich sollte Text in Text und nicht in Bilder eingebettet sein, wie etwa bei der Nutzung von Bildern für Titel oder Kontaktinformationen wie Telefonnummern und Adressen. Von Bildern können Nutzer die Informationen nicht kopieren und einfügen, außerdem ist der Text für eine Bildschirmsprachausgabe nicht verfügbar und auch nicht responsiv. Fügen Sie den Text stattdessen in Ihr Markup ein und verwenden Sie bei Bedarf Webschriftarten, um den gewünschten Stil umzusetzen.

### CSS als Bildersatz verwenden

Moderne Browser können auf CSS-Funktionen zurückgreifen, um Stile zu erschaffen, für die zuvor Bilder erforderlich waren. So können mit der <code>background</code>-Eigenschaft komplexe Farbverläufe erstellt und mit der <code>box-shadow</code>-Eigenschaft Schatten und der <code>border-radius</code>-Eigenschaft abgerundete Ecken hinzugefügt werden.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Beachten Sie, dass bei diesen Verfahren Renderingzyklen anfallen, deren Berechnung für Mobilgeräte ein Problem darstellen kann. Bei einer übermäßigen Inanspruchnahme gehen die Vorteile verloren und die Leistung wird möglicherweise zusätzlich beeinträchtigt.



