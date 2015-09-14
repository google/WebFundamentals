---
title: "Bilder im Markup"
description: "Das ''img''-Element erfüllt viele Funktionen. Es lädt Inhalte herunter, decodiert sie und zeigt sie an. Darüber hinaus unterstützen moderne Browser eine große Anzahl an Bildformaten."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Nutzen Sie relative Größen für Bilder, um zu verhindern, dass diese sich versehentlich über die Container-Grenzen hinweg erstrecken."
    - "Verwenden Sie das <code>picture</code>-Element, wenn Sie verschiedene Bilder auf Grundlage von Gerätecharakteristiken festlegen, auch Art Direction genannt."
    - "Verwenden Sie <code>srcset</code> und den <code>x</code>-Deskriptor im <code>img</code>-Element, um den Browser darauf hinzuweisen, welches das am besten geeignete Bild bei der Auswahl aus verschiedenen Pixeldichten ist."
notes:
  picture-support:
    - "Das <code>picture</code>-Element wird von Browsern zunehmend unterstützt. Es ist zwar noch nicht in allen Browsern verfügbar, wir empfehlen aufgrund seiner guten Rückwärtskompatibilität und der möglichen Nutzung von <a href='http://picturefill.responsiveimages.org/'>Picturefill/Polyfill</a> aber dennoch seinen Einsatz. Weitere Informationen erhalten Sie auf der Website <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>."
  compressive:
    - "Bei der Nutzung der Komprimierung ist aufgrund der erhöhten Speicherbelastung und des erhöhten Aufwands beim Codieren Vorsicht geboten. Die Änderung der Größe für kleinere Bildschirme ist rechenintensiv und kann besonders auf Low-End-Geräten mit wenig Speicher und geringer Rechenkapazität Probleme verursachen."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  Das `img`-Element erfüllt viele Funktionen. Es lädt Inhalte herunter, decodiert sie und zeigt sie an. Darüber hinaus unterstützen moderne Browser eine große Anzahl an Bildformaten. Die Nutzung von Bildern, die auf allen Geräten funktionieren, unterscheidet sich im Vergleich zu Desktopcomputern nicht. Es sind lediglich ein paar kleinere Handgriffe nötig, um eine gute Erfahrung zu gewährleisten.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Relative Größen für Bilder verwenden

Denken Sie daran, relative Größen zu nutzen, wenn Sie Breiten für Bilder festlegen, um zu verhindern, dass sie sich über die Grenzen des Darstellungsbereichs hinweg erstrecken. So bleibt die Bildgröße bei `width: 50%` stets bei 50 % des Container-Elements - nicht des Darstellungsbereichs oder der tatsächlichen Pixelgröße.

Da es die CSS-Syntax zulässt, dass sich Inhalte über Container-Grenzen hinweg erstrecken, kann es erforderlich sein, die Angabe `max-width: 100%` einzufügen, damit Bilder und andere Inhalte innerhalb des Containers bleiben. Beispiel:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Achten Sie darauf, dem `alt`-Attribut des `img`-Elements aussagekräftige Beschreibungen hinzuzufügen. Hierdurch wird Ihre Website zugänglicher, denn die Beschreibungen bieten einer Bildschirmsprachausgabe und anderen Hilfstechnologien Kontext.

## Bilddarstellung mit `srcset` auf Geräten mit hohem DPI-Wert verbessern

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Das <code>srcset</code>-Attribut erweitert das <code>img</code>-Element, indem es dafür sorgt, dass auf einfache Weise mehrere Bilddateien für verschiedene Gerätecharakteristiken bereitgestellt werden können. Ähnlich wie die native <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS-Funktion</a> <code>image-set</code> erlaubt <code>srcset</code> Browsern, abhängig von den Charakteristiken des jeweiligen Geräts das beste Bild auszuwählen, zum Beispiel ein 2x-Bild für ein 2x-Display, und in Zukunft möglicherweise auch ein 1x-Bild für ein 2x-Gerät, wenn nur eine geringe Bandbreite zur Verfügung steht.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

Browser, die `srcset` nicht unterstützen, nutzen einfach die Standardbilddatei, die im `src`-Attribut festgelegt ist. Aus diesem Grund ist es wichtig, immer ein 1x-Bild zur Verfügung zu stellen, das auf allen Geräten unabhängig von jeglichen Funktionen angezeigt werden kann. Bei `srcset`-Unterstützung wird die kommagetrennte Liste mit Bild/Bedingungen vor dem Senden von Anfragen analysiert und nur das am besten geeignete Bild heruntergeladen und angezeigt.

Während die Bedingungen viele verschiedene Elemente wie Pixeldichte, Breite und Höhe enthalten können, ist aktuell nur die Unterstützung der Pixeldichte weit verbreitet. Der beste Kompromiss zwischen aktuellem Verhalten und künftigen Funktionen ist es, einfach das 2x-Bild im Attribut anzugeben.

## Art Direction in responsiven Bildern mit `picture`

Das Ändern von Bildern auf Grundlage von Gerätecharakteristiken ist auch als Art Direction bekannt und kann mithilfe des `picture`-Elements bewerkstelligt werden. Das <code>picture</code>-Element definiert eine deklarative Lösung für die Bereitstellung verschiedener Versionen eines Bilds auf Grundlage verschiedener Charakteristiken wie Gerätegröße, Geräteauflösung, Ausrichtung usw.

<img class="center" src="img/art-direction.png" alt="Beispiel für Art Direction"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Das <code>picture</code>-Element sollte verwendet werden, wenn eine Bildquelle mit verschiedenen Pixeldichten verfügbar ist oder ein responsives Design nach leicht unterschiedlichen Bildern auf einigen Bildschirmarten verlangt. Ähnlich wie beim <code>video</code>-Element können mehrere <code>source</code>-Elemente verwendet werden, wodurch abhängig von Medienabfragen oder dem Bildformat die Angabe verschiedener Bilddateien möglich wird.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

Im vorherigen Beispiel wird bei einer Browserbreite von mindestens 800 Pixeln entweder `head.jpg` oder `head-2x.jpg` verwendet, abhängig von der Auflösung des Geräts. Wenn der Browser zwischen 450 und 800 Pixeln breit ist, kommt entweder `head-small.jpg` oder `head-small-2x.jpg` zum Einsatz, wieder abhängig von der Auflösung des Geräts. Für Bildschirmbreiten mit weniger als 450 Pixeln und Rückwärtskompatibilität, bei denen das `picture`-Element nicht unterstützt wird, stellt der Browser stattdessen das `img`-Element dar, das immer verwendet werden sollte.

### Bilder mit relativer Größe

Wenn die endgültige Größe des Bilds nicht bekannt ist, kann es schwierig sein, einen Deskriptor für die Pixeldichte der Bildquellen anzugeben. Dies gilt vor allem für Bilder, die sich über eine proportionale Breite des Browsers erstrecken und abhängig von der Größe des Browsers frei verschiebbar sind.

Statt eine feste Größe und Pixeldichte für Bilder festzulegen, kann die Größe aller bereitgestellten Bilder über das Hinzufügen eines Breitendeskriptors zusammen mit der Größe des Bildelements angegeben werden. So kann der Browser die effektive Pixeldichte automatisch berechnen und das beste Bild zum Herunterladen auswählen.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

Im vorherigen Beispiel wird ein Bild dargestellt, das die Hälfte der Breite des Darstellungsbereichs (sizes=50vw) aufweist. Abhängig von der Breite des Browsers und seinem Gerätepixelverhältnis wird ihm ermöglicht, das richtige Bild unabhängig davon auszuwählen, wie groß das Browserfenster ist. In der folgenden Tabelle ist zu sehen, welches Bild er Browser auswählen würde:

<table class="mdl-data-table mdl-js-data-table">
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


### Übergangspunkte in responsiven Bildern berücksichtigen

In vielen Fällen ändert sich die Größe oder das Bild abhängig von den Layoutübergangspunkten der Website. So kann es bei kleinen Bildschirmen wünschenswert sein, die volle Breite des Darstellungsbereichs mit einem Bild abzudecken, während auf größeren Bildschirmen nur ein kleiner proportionaler Teil genutzt werden sollte. 

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

Das `sizes`-Attribut im vorherigen Beispiel nutzt mehrere Medienabfragen, um die Größe des Bilds festzulegen. Wenn die Breite des Browsers über 600 Pixeln liegt, wird das Bild mit 25 % der Breite des Darstellungsbereichs angezeigt. Bei einer Breite zwischen 500 und 600 Pixeln nimmt es 50 % der Breite des Darstellungsbereichs ein. Unter 500 Pixeln wird die volle Breite in Anspruch genommen.


## Produktbilder maximierbar machen

Kunden möchten sehen, was sie kaufen. Auf Einzelhändler-Websites erwarten Nutzer, sich Nahaufnahmen von Produkten in hoher Auflösung ansehen zu können, um einen besseren Eindruck von Einzelheiten zu bekommen. [Studienteilnehmer](/web/fundamentals/principles/research-study.html) wurden frustriert, wenn sie dazu keine Gelegenheit erhielten.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Website von J. Crews mit maximierbarem Produktbild">
  <figcaption>Website von J. Crews mit maximierbarem Produktbild</figcaption>
</figure>

Ein gutes Beispiel für ein maximierbares Bild, das angetippt werden kann, lässt sich auf der Website von J. Crew finden. Ein Overlay, das verschwindet, gibt einen Hinweis darauf, dass das Bild angetippt werden kann. Beim Antippen erhält der Nutzer anschließend ein gezoomtes Bild, auf dem Einzelheiten betrachtet werden können.


## Andere Bildmethoden

### Komprimierte Bilder

Die [Methode für Komprimierte
Bilder](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) stellt ein stark komprimiertes 2x-Bild für alle Geräte bereit, unabhängig von den tatsächlichen Funktionen des Geräts. Abhängig vom Bildtyp und der Komprimierungsstufe ist möglicherweise keine Veränderung am Bild wahrnehmbar, die Dateigröße verringert sich jedoch beträchtlich.

{% link_sample _code/compressive.html %}
      Siehe Beispiel
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.notes.compressive %}

### JavaScript-Bildersetzung

Die JavaScript-Bildersetzung prüft die Funktionen des Geräts und entscheidet sich dann für das passende Bild. Sie können das Gerätepixelverhältnis mithilfe von `window.devicePixelRatio` ermitteln, die Bildschirmhöhe und -breite abrufen und mit `navigator.connection` oder einer Fake-Anfrage möglicherweise sogar mehr über die Netzwerkverbindung herausfinden. Nachdem Sie diese Informationen gesammelt haben, können Sie entscheiden, welches Bild geladen werden soll.

Ein großer Nachteil dieses Ansatzes ist, dass das Bild bei der Verwendung von JavaScript erst dann geladen wird, wenn zumindest der `look-ahead`-Parser durchlaufen wurde. Das bedeutet, dass der Ladevorgang für das Bild nicht einmal gestartet wird, bis das `pageload`-Ereignis ausgelöst wurde. Zudem lädt der Browser mit hoher Wahrscheinlichkeit sowohl die 1x- als auch die 2x-Varianten des Bilds herunter, wodurch die Seite zusätzlich Speicher belegt.



