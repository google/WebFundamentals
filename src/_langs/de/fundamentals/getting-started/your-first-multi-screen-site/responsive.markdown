---
layout: article
title: "Responsiv machen"
description: "Heute kann über eine extreme Vielfalt an Geräten auf das Web zugegriffen werden, von Telefonen mit sehr kleinen Displays bis hin zu Fernsehern mit riesigen Bildschirmdiagonalen. Erfahren Sie, wie Sie eine Website erstellen, die auf allen Geräten gut funktioniert."
introduction: "Heute kann über eine extreme Vielfalt an Geräten auf das Web zugegriffen werden, von Telefonen mit sehr kleinen Displays bis hin zu Fernsehern mit riesigen Bildschirmdiagonalen. Jedes dieser Geräte bringt eigene Vorteile, jedoch auch Einschränkungen mit sich. Als Webentwickler wird von Ihnen erwartet, sämtliche Geräte zu unterstützen."
key-takeaways:
  make-responsive:
    - Immer einen Darstellungsbereich verwenden
    - Immer mit einem schmalen Darstellungsbereich beginnen und nach oben skalieren
    - Übergangspunkte außerhalb platzieren, wenn Inhalte angepasst werden müssen
    - Allgemeinen Entwurf Ihres Layouts über alle primären Übergangspunkte hinweg erstellen
authors:
  - paulkinlan
translators:
related-guides:
  responsive:
    -
      title: Darstellungsbereich festlegen
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Responsives Webdesign"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Größe der Inhalte an Darstellungsbereich anpassen
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Responsives Webdesign"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Medienabfragen verwenden
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Responsives Webdesign"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Layoutmuster
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Layoutmuster"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Größtenteils dynamisches Layout
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Responsives Webdesign"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "``img``-Elemente mit ``srcset`` auf Geräten mit hohem DPI-Wert verbessern"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Bilder"
        href: media/images/
    - 
      title: "Medienabfragen zur Bereitstellung von Bildern mit hoher Auflösung oder Art Direction verwenden"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Bilder"
        href: media/images/

notes:
  styling:
    - Wir haben eine Anzahl an Stilen für Farben, Abstände und Schriftarten umgesetzt, die unseren Markenrichtlinien entsprechen.
  not-all-at-once:
    - Sie müssen nicht alle Elemente auf einmal verschieben, sondern können bei Bedarf kleinere Anpassungen vornehmen.
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 2
collection: multi-screen
id: multi-screen-responsive
---

{% wrap content %}

{% include modules/toc.liquid %}

Wir erstellen eine Website, die auf Bildschirmen verschiedener Größe und verschiedenen Gerätetypen funktioniert. Im [vorherigen Artikel]({{site.baseurl}}{{page.article.previous.url}}) haben wir die Informationsarchitektur der Seite entworfen und eine Grundstruktur erstellt.
In diesem Leitfaden nehmen wir unsere Grundstruktur mit Inhalten und verwandeln diese in eine schöne Seite, die auf einer breiten Palette an Bildschirmgrößen responsiv ist.

<div class="clear">
  <figure class="g-wide--2 g-medium--half">
    <img  src="images/content.png" alt="Inhalt" style="max-width: 100%;">
    <figcaption>{% link_sample _code/content-without-styles.html %} Inhalte und Struktur {% endlink_sample %} </figcaption>
  </figure>
  <figure class="g-wide--2 g-wide--last g-medium--half g--last">
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>{% link_sample _code/content-with-styles.html %} Fertige Website {% endlink_sample %} </figcaption>
  </figure>
</div>

Gemäß den Prinzipien der ``Mobile First``-Webentwicklung, wonach zuerst für Mobilgeräte entwickelt wird, beginnen wir mit einem schmalen Darstellungsbereich, ähnlich dem Display eines Mobiltelefons.
Anschließend skalieren wir für größere Geräteklassen nach oben.
Dazu verbreitern wir den Darstellungsbereich und überprüfen, ob Design und Layout anschließend noch passen.

Wir haben zuvor verschiedene allgemeine Designs dazu erstellt, wie unsere Inhalte dargestellt werden sollen. Nun müssen wir dafür sorgen, dass sich unsere Seite an diese verschiedenen Layouts anpasst.
Dazu müssen wir uns auf Grundlage dessen, wie die Inhalte auf den jeweiligen Bildschirm passen, entscheiden, wo unsere Übergangspunkte liegen sollen. An diesen Punkten ändern sich Layout und Stile.

{% include modules/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Darstellungsbereich einzufügen 

Selbst bei sehr einfachen Seiten ist es obligatorisch, ein Darstellungsbereich-Meta-Tag einzufügen.
Der Darstellungsbereich ist bei der Entwicklung einer Erfahrung für verschiedene Geräte die wichtigste Komponente.
Ohne ihn funktioniert Ihre Website auf Mobilgeräten nicht besonders gut.

Der Darstellungsbereich signalisiert dem Browser, dass die Seite skaliert werden muss, damit sie auf den Bildschirm passt. Es gibt viele verschiedene Konfigurationen, die Sie für Ihren Darstellungsbereich zur Steuerung der Seitendarstellung festlegen können. Wir empfehlen Folgendes als Standard:

{% include_code _code/viewport.html viewport %}

Der Darstellungsbereich befindet sich in der Kopfzeile des Dokuments und muss nur einmal deklariert werden.

{% include modules/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Bewerben einfachen Styling 

Unser Produkt und unser Unternehmen haben bereits ein ganz bestimmtes Branding und Richtlinien für die Schriftart in einem Styleguide.

### Styleguide

Ein Styleguide stellt eine gute Möglichkeit dar, ein umfassendes Verständnis für die visuelle Darstellung der Seite zu bekommen, und hilft dabei, ein konsistentes Design auf die Beine zu stellen.

#### Farben

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### In Stilistische Bilder 

Im vorherigen Leitfaden haben wir Bilder hinzugefügt, die wir als Bilder zum Inhalt bezeichnet haben. Dabei handelte es sich um Bilder, die wichtig für die Beschreibung unseres Produkts waren. Stilistische Bilder sind Bilder, die zwar nichts zu den Kerninhalten beitragen, jedoch visuelle Eleganz verleihen oder dabei helfen, die Aufmerksamkeit des Nutzers auf bestimmte Inhalte zu lenken.

Ein gutes Beispiel hierfür ist ein Titelbild für den Inhalt, der ohne Scrollen sichtbar ist. Dieses wird häufig dazu genutzt, Nutzer dafür zu gewinnen, mehr über das Produkt zu lesen.

<div class="g-wide--2 g-wide--last g-medium--half g--last">
  <img  src="images/narrowsite.png" alt="Website mit Design" style="max-width: 100%;">
</div>

Solche Bilder können sehr einfach ergänzt werden. In unserem Fall fügen wir eines als Hintergrund für die Kopfzeile ein und wenden es mithilfe von ein wenig einfachem CSS-Code an.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

Wir haben ein einfaches Hintergrundbild ausgewählt, das unscharf ist, damit es nicht vom Inhalt ablenkt. Wir haben es so konfiguriert, dass es sich stets über das gesamte Element erstreckt und dabei immer das richtige Seitenverhältnis aufweist.

<br style="clear: both;">

## Stellen Sie Ihre erste Haltepunkt

Das Design sieht ab 600 Pixeln in der Breite unvorteilhaft aus. In unserem Fall übersteigt die Länge einer Zeile sieben Wörter - die optimale Länge zum Lesen - und hier möchten wir es ändern.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Ihr Browser unterstützt keine Videos.
     <a href="videos/firstbreakpoint.mov">Video herunterladen</a>
  </p>
</video>

600 Pixel stellen eine gute Stelle für den ersten Übergangspunkt dar, da wir nun genug Platz haben, Elemente neu zu positionieren, damit sie besser auf den Bildschirm passen. Wir können dies mithilfe einer Technologie namens [Medienabfragen]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) tun.

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Auf einem größeren Bildschirm ist mehr Platz, womit mehr Flexibilität bei der Darstellung von Inhalten gegeben ist.

{% include modules/remember.liquid title="Note" list=page.notes.not-all-at-once %}

Im Kontext unserer Produktseite müssen wir Folgendes tun:

* die maximale Breite des Designs einschränken,
* die Abstände der Elemente ändern und die Textgröße reduzieren,
* das Formular verschieben, damit es sich auf gleicher Höhe mit den Inhalten der Kopfzeile ausrichtet,
* das Video so konfigurieren, dass es sich um die Inhalte herum ausrichtet, und
* die Größe der Bilder reduzieren und sie in einem optisch ansprechenderen Raster erscheinen lassen.

{% include modules/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Die maximale Breite des Designs einschränken

Wir haben uns entschieden, nur zwei Hauptlayouts zu verwenden: einen schmalen und einen breiten Darstellungsbereich, wodurch der Erstellungsprozess stark vereinfacht wird.

Darüber hinaus möchten wir randlose Abschnitte für den schmalen Darstellungsbereich erstellen, die auch im breiten Darstellungsbereich randlos bleiben. Das bedeutet, dass wir die maximale Breite der Anzeige so begrenzen sollten, dass sich Text und Absätze auf extrem breiten Bildschirmen nicht zu einer einzigen langen Zeile ausdehnen. Diese Begrenzung soll bei uns bei 800 Pixeln liegen.

Dazu müssen wir die Breite einschränken und die Elemente zentrieren. Wir müssen einen Container um die einzelnen Hauptabschnitte erstellen und ``margin: auto`` verwenden. Damit bleiben die Inhalte zentriert und werden maximal 800 Pixel breit, auch wenn die Bildschirmgröße weiter steigt.

Bei dem Container handelt es sich um ein einfaches ``div``-Tag-Paar, das die folgende Form aufweist:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code _code/fixingfirstbreakpoint.html containerhtml html %}

{% include_code _code/fixingfirstbreakpoint.html container css %}

## Abstände ändern und Textgröße reduzieren

Bei schmalen Darstellungsbereichen haben wir nur wenig Platz, den wir zur Darstellung von Inhalten nutzen können. Daher werden Größe und Breite der Typografie oft stark reduziert, damit sie auf den Bildschirm passt.

Bei größeren Darstellungsbereichen müssen wir beachten, dass Nutzer zwar eine größere Anzeige haben, sich dabei jedoch weiter weg davon befinden. Wir können die Lesbarkeit der Inhalte verbessern, indem wir die Größe und Breite der Typografie erhöhen und darüber hinaus die Abstände verändern, sodass bestimmte Bereiche auffälliger sind.

Auf unserer Produktseite erhöhen wir die Abstände für die Abschnittselemente, indem wir sie darauf einstellen, stets 5 % der Breite einzuhalten. Darüber hinaus vergrößern wir die Kopfzeilen der Abschnitte.

{% include_code _code/fixingfirstbreakpoint.html padding css %}

## Elemente an breiten Darstellungsbereich anpassen

Unser schmaler Darstellungsbereich war eine vertikale, lineare Anzeige. Alle Hauptabschnitte und die entsprechenden Inhalte darin wurden der Reihe nach von oben nach unten angezeigt.

Bei einem breiten Darstellungsbereich haben wir mehr Platz, den wir dazu nutzen können, die Inhalte auf optimale Weise für diesen Bildschirm darzustellen. Für unsere Produktseite bedeutet das, dass wir gemäß unserer IA Folgendes tun können:

* das Formular um die Kopfzeileninformationen herum verschieben,
* das Video rechts neben die wichtigsten Punkte platzieren,
* die Bilder gekachelt darstellen und
* die Tabelle erweitern.

### Das Formularelement frei verschieben

Bei einem schmalen Darstellungsbereich haben wir sehr viel weniger Platz in der Horizontalen, um Elemente bequem auf dem Bildschirm zu platzieren.

Damit wir die Horizontale effektiver nutzen können, müssen wir die lineare Darstellung der Kopfzeile auflösen und das Formular und die Liste verschieben, damit sie nebeneinander erscheinen.

{% include_code _code/fixingfirstbreakpoint.html formfloat css %}

{% include_code _code/fixingfirstbreakpoint.html padding css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Ihr Browser unterstützt keine Videos.
     <a href="videos/floatingform.mov">Video herunterladen</a>
  </p>
</video>

### Das Videoelement frei verschieben

Das Video auf der Oberfläche für den schmalen Darstellungsbereich ist so eingestellt, dass es die volle Breite des Bildschirms ausfüllt und nach den wichtigsten Funktionen erscheint. Auf einem breiten Darstellungsbereich erscheint das Video durch die Skalierung zu groß und zudem unpassend, wenn es neben unserer Liste mit Funktionen platziert wird.

Das Videoelement muss aus dem vertikalen Fluss des schmalen Darstellungsbereichs herausgenommen werden und auf einem breiten Darstellungsbereich neben der Inhaltsliste erscheinen.

{% include_code _code/fixingfirstbreakpoint.html floatvideo css %}

### Bilder gekachelt darstellen

Die Bilder sind für schmale Darstellungsbereiche, in der Regel die Displays von Mobilgeräten, so eingestellt, dass Sie die Breite des Bildschirms ausfüllen und vertikal gestapelt erscheinen. Eine Skalierung dieses Prinzips für breite Darstellungsbereiche ist nicht ratsam.

Damit die Bilder in breiten Darstellungsbereichen richtig erscheinen, werden sie auf 30 % der Container-Breite skaliert und horizontal statt vertikal ausgerichtet, wie es in schmalen Darstellungsbereichen der Fall ist. Darüber hinaus fügen wir einen Randradius und einen Feldschatten hinzu, um die Optik der Bilder zusätzlich zu verbessern.

<img src="images/imageswide.png" style="width:100%">

{% include_code _code/fixingfirstbreakpoint.html tileimages css %}

### Bilder für DPI-Werte responsiv machen

Berücksichtigen Sie bei der Verwendung von Bildern die Größe des Darstellungsbereichs und die Pixeldichte der Anzeige.

Das Web wurde für Bildschirme mit 96 DPI geschaffen. Mit der Einführung von Mobilgeräten hat sich die Pixeldichte von Bildschirmen sprunghaft erhöht, ganz abgesehen von Laptopbildschirmen der Retina-Klasse. Aus diesem Grund sehen Bilder, die auf 96 DPI codiert sind, häufig sehr schlecht auf Geräten aus, die hohe DPI-Werte unterstützen.

Dafür haben wir eine Lösung, die noch nicht sehr weit verbreitet ist.
In Browsern, die dies unterstützen, können Sie Bilder mit hoher Pixeldichte anzeigen lassen, wenn sie auf Bildschirmen mit hoher Pixeldichte aufgerufen werden.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.images %}

### Tabellen

Die korrekte Darstellung von Tabellen auf Geräten mit schmalem Darstellungsbereich ist extrem schwierig und verdient daher besondere Aufmerksamkeit.

Für schmale Darstellungsbereiche sollten Sie Ihre Tabelle in zwei Zeilen gliedern, wobei Kopfzeile und Zellen zur Darstellung der Spalte in eine Zeile verschoben werden.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Ihr Browser unterstützt keine Videos.
     <a href="videos/responsivetable.mov">Video herunterladen</a>
  </p>
</video>

Bei unserer Website mussten wir für den Inhalt der Tabelle einen zusätzlichen Übergangspunkt erstellen.
Wenn Sie zuerst für Mobilgeräte entwickeln, ist es schwieriger, angewendete Stile rückgängig zu machen. Daher müssen wir den CSS-Code für die Tabelle auf schmalen Darstellungsbereichen vom CSS-Code für breite Darstellungsbereiche trennen.
Dadurch sorgen wir für einen klaren und konsequenten Übergang.

{% include_code _code/content-with-styles.html table-css css %}

## Abschluss

** Wir gratulieren!** Wenn Sie diesen Text lesen, haben Sie Ihre erste einfache Produktzielseite erstellt, die auf vielen verschiedenen Geräten, Formfaktoren und Bildschirmgrößen richtig angezeigt wird.

Indem Sie sich an die folgenden Richtlinien halten, sorgen Sie für einen guten Start:

1. Erstellen Sie eine grundlegende IA und verstehen Sie Ihre Inhalte, bevor Sie mit der Programmierung beginnen.
2. Legen Sie immer einen Darstellungsbereich fest.
3. Erstellen Sie die Grunderfahrung anhand des ``Mobile First``-Ansatzes.
4. Wenn Sie die Erfahrung für Mobilgeräte fertiggestellt haben, erhöhen Sie die Breite der Darstellung, bis sie unvorteilhaft aussieht, und setzen Sie davor Ihren Übergangspunkt.
5. Wiederholen Sie diesen Ansatz.

{% include modules/nextarticle.liquid %}

{% endwrap %}

