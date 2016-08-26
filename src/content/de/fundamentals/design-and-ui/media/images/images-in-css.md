project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Die CSS-Eigenschaft `background` ist ein leistungsstarkes Tool für das Hinzufügen von komplexen Bildern zu Elementen. Es können damit mehrere Bilder hinzugefügt und vervielfältigt werden und vieles mehr.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Bilder in CSS {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Die CSS-Eigenschaft `background` ist ein leistungsstarkes Tool für das Hinzufügen von komplexen Bildern zu Elementen. Es können damit mehrere Bilder hinzugefügt und vervielfältigt werden und vieles mehr.  Wenn die Eigenschaft zusammen mit Medienabfragen genutzt wird, ergeben sich sogar noch weitere Möglichkeiten. So können Bilder nur unter bestimmten Bedingungen auf Grundlage von Bildschirmauflösung, Größe des Darstellungsbereichs oder anderen Faktoren geladen werden.



## TL;DR {: .hide-from-toc }
- 'Verwenden Sie das am besten zu den Charakteristiken der Anzeige passende Bild. Berücksichtigen Sie die Bildschirmgröße, die Geräteauflösung und das Seitenlayout.'
- 'Ändern Sie für Anzeigen mit hohem DPI-Wert die <code>background-image</code>-Eigenschaft in CSS, indem Sie Medienabfragen mit <code>min-resolution</code> und <code>-webkit-min-device-pixel-ratio</code> verwenden.'
- Verwenden Sie `srcset` zur Bereitstellung von Bildern mit hoher Auflösung zusätzlich zu den 1x-Bildern im Markup.
- Berücksichtigen Sie den Berechnungsaufwand beim Einsatz von JavaScript-Methoden zum Ersetzen von Bildern oder der Bereitstellung von stark komprimierten Bildern mit hoher Auflösung auf Geräten mit geringerer Auflösung.


## Medienabfragen für das bedingte Laden von Bildern oder Art Direction verwenden

Medienabfragen wirken sich nicht nur auf das Seitenlayout aus, sondern können auch dazu genutzt werden, Bilder unter bestimmten Bedingungen zu laden oder Art Direction auf Grundlage der Breite des Darstellungsbereichs bereitzustellen.

So wird im folgenden Beispiel für kleinere Bildschirme nur `small.png` heruntergeladen und auf die Inhalte des `div`-Containers angewendet, während für größere `background-image: url(body.png)` auf den Hauptteil und `background-image: url(large.png)` auf den Inhalt im `div`-Container angewendet wird.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## `image-set` zur Bereitstellung von Bildern mit hoher Auflösung verwenden

Die CSS-Funktion `image-set()` erweitert die Funktionalität der `background`-Eigenschaft, sodass die Bereitstellung mehrerer Bilddateien für verschiedene Gerätecharakteristiken problemlos bewerkstelligt werden kann. Damit kann der Browser das für die Charakteristiken des jeweiligen Geräts am besten geeignete Bild auswählen, etwa ein 2x-Bild für ein 2x-Display oder ein 1x-Bild für ein 2x-Gerät, falls nur eine geringe Bandbreite zur Verfügung steht.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Der Browser lädt das richtige Bild nicht nur, sondern skaliert es auch
entsprechend. Anders ausgedrückt: Der Browser geht davon aus, dass 2x-Bilder doppelt so groß wie 1x-Bilder sind und reduziert das 2x-Bild um den Faktor 2, sodass das Bild in der gleichen Größe auf der Seite erscheint.

Die Unterstützung für `image-set()` ist relativ neu und wird aktuell nur von Chrome und Safari mit dem Anbieterpräfix `-webkit` unterstützt. Darüber hinaus muss Sorge dafür getragen werden, dass ein Ersatzbild zur Verfügung steht, falls `image-set()` nicht unterstützt wird. Beispiel:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

Im vorherigen Beispiel wird das passende Element in Browsern, die `image-set` unterstützen, und ansonsten das 1x-Element geladen. Das Problem hierbei ist natürlich, dass in den meisten Browsern das 1x-Element geladen wird, solange die `image-set()`-Unterstützung bei Browsern gering ist.

## Medienabfragen für die Bereitstellung von Bildern mit hoher Auflösung oder Art Direction verwenden

Medienabfragen können Regeln auf Grundlage des [Gerätepixelverhältnisses](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg) erstellen, womit verschiedene Bilder für 2x- und 1x-Displays festgelegt werden können.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox und Opera unterstützen alle standardmäßig `(min-resolution: 2dppx)`, während Safari und Android-Browser beide die ältere Syntax mit Anbieterpräfix ohne `dppx`-Einheit benötigen. Denken Sie daran, dass diese Stile nur dann geladen werden, wenn das Gerät der Medienabfrage entspricht, und Sie Stile für den Grundfall festlegen müssen. Dies hat den Vorteil, dass eine Darstellung auch in dem Fall gewährleistet ist, dass der Browser keine auflösungsspezifischen Medienabfragen unterstützt.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

Sie können auch die `min-width`-Syntax nutzen, um abhängig von der Größe des Darstellungsbereichs alternative Bilder anzeigen zu lassen. Der Vorteil bei dieser Methode ist, dass das Bild nicht heruntergeladen wird, wenn keine Übereinstimmung mit der Medienabfrage gegeben ist. So wird `bg.png` nur dann heruntergeladen und auf das `body`-Element angewendet, wenn die Browserbreite mindestens 500 Pixel beträgt:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	



