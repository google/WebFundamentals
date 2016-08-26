project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Inhalte sind der wichtigste Aspekt jeder Website. In diesem Leitfaden erläutern wir, wie Sie Ihre erste Website für verschiedene Geräte schnell vorbereiten können.

{# wf_review_required #}
{# wf_updated_on: 2014-04-22 #}
{# wf_published_on: 2000-01-01 #}

# Inhalte und Struktur erstellen {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Inhalte sind der wichtigste Aspekt jeder Website. Erstellen wir das Design für die Inhalte und lassen wir das Design nicht die Inhalte bestimmen. In diesem Leitfaden ermitteln wir zunächst die Inhalte, die wir benötigen, anschließend erarbeiten wir eine Seitenstruktur auf Grundlage dieser Inhalte und präsentieren die Seite schließlich in einem einfachen linearen Layout, das sowohl mit schmalen als auch breiten Darstellungsbereichen gut funktioniert.


## Seitenstruktur erstellen

Wir kommen zu dem Schluss, dass wir die folgenden Inhalte benötigen:

1. einen Bereich, in dem eine allgemeine Beschreibung unseres Produkts verfügbar ist, Kurs ``CS256: Für das mobile Web entwickeln``,
2. ein Formular, über das Informationen zu Nutzern erfasst werden können, die an unserem Produkt interessiert sind,
3. eine ausführliche Beschreibung und ein Video,
4. Bilder des Produkts in Aktion und
5. eine Datentabelle mit Informationen zur Untermauerung unserer Behauptungen.

## TL;DR {: .hide-from-toc }
- 'Inhalte ermitteln, die Sie zuerst benötigen'
- Informationsarchitektur(IA)-Entwurf für schmale und breite Darstellungsbereiche erarbeiten
- Seitenstrukturansicht mit Inhalten und ohne Stile erstellen


Darüber hinaus haben wir eine Rohversion der Informationsarchitektur und ein grobes Layout für schmale und breite Darstellungsbereiche ausgearbeitet.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="IA für schmale Darstellungsbereiche">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="IA für breite Darstellungsbereiche">
</div>

Diese können einfach in die vorläufigen Abschnitte einer Seitenstruktur ohne Stile umgewandelt werden, auf die wir im weiteren Verlauf dieses Projekts zurückgreifen werden.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

## Der Seite Inhalte hinzufügen

Die Grundstruktur der Website ist fertig. Wir wissen, welche Abschnitte wir brauchen, welche Inhalte in diesen Abschnitten erscheinen und wo sie in der gesamten Informationsarchitektur positioniert werden sollen. Nun können wir mit der Erweiterung der Website beginnen.

<!-- TODO: Verify note type! -->
Note: Styling kommt später

### Titel und Formular erstellen

Der Titel und das Anfragebenachrichtigungsformular sind die kritischen Komponenten unserer Seite. Diese müssen dem Nutzer umgehend angezeigt werden.

Geben Sie als Titel einen einfachen Text zur Beschreibung des Kurses ein:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

Darüber hinaus müssen wir das Formular ausfüllen.
Das Formular soll einfach sein und die Namen und Telefonnummern der Nutzer und einen geeigneten Zeitpunkt zum Rückruf erfassen.

Alle Formulare sollten über Beschriftungen und Platzhalter verfügen, damit Nutzer Elemente einfach erkennen, sofort verstehen, was eingetragen werden soll und Eingabehilfetools die Struktur des Formulars erfassen können. Das Namensattribut sendet den Formularwert nicht nur an den Server: Es wird auch dazu verwendet, dem Browser wichtige Signale darüber zu geben, wie das Formular für den Nutzer automatisch ausgefüllt werden kann.

Wir fügen semantische Typen hinzu, damit Nutzer Angaben auf Mobilgeräten schnell und einfach eingeben können. Beispielsweise sollte dem Nutzer beim Eingeben einer Telefonnummer lediglich eine Wähltastatur angezeigt werden.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Video- und Informationsabschnitt erstellen

Der Video- und Informationsabschnitt der Inhalte ist etwas ausführlicher.
Er enthält eine Liste der Funktionen unserer Produkte und darüber hinaus einen Videoplatzhalter, in dem Nutzern die Funktionsweise unseres Produkts vorgeführt wird.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

Videos kommen oft zum Einsatz, um Inhalte auf eine interaktivere Art zu beschreiben. Meistens finden Sie Verwendung, um eine Demonstration eines Produkts oder Konzepts zu geben.

Orientieren Sie sich an den Best Practices, um Videos einfach in Ihre Website zu integrieren:

* Fügen Sie ein `controls`-Attribut hinzu, mit dem sich Nutzer das Video einfach ansehen können.
* Fügen Sie ein `poster`-Bild hinzu, um Nutzern eine Vorschau des Inhalts zu geben.
* Fügen Sie mehrere <source>-Elemente auf Grundlage unterstützter Videoformate hinzu.
* Fügen Sie Hinweistext hinzu, über den Nutzer das Video herunterladen können, falls die Wiedergabe im Fenster nicht möglich ist.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Bildabschnitt erstellen

Websites ohne Bilder können etwas langweilig sein. Es gibt zwei Bildtypen:

* Bilder zum Inhalt: Bilder, die sich im Text im Dokument befinden und dazu dienen, zusätzliche Informationen zum Inhalt zu vermitteln.
* Stilistische Bilder: Bilder, die dazu dienen, das Erscheinungsbild zu verbessern. Solche Bilder sind häufig Hintergrundbilder, Muster und Farbverläufe. Weitere Informationen hierzu finden Sie im [nächsten Artikel]({{page.nextPage.relative_url}}).

Im Bildabschnitt unserer Seite befindet sich eine Anzahl an Bildern zum Inhalt.

Bilder zum Inhalt sind sehr wichtig, um die Bedeutung der Seite zu vermitteln. Stellen Sie sich diese wie die Bilder in Zeitungsartikeln vor. Die Bilder, die wir verwenden, sind Bilder der Lehrer dieses Projekts: Chris Wilson, Peter Lubbers und Sean Bennet.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

Die Bilder sind so eingestellt, dass sie sich über 100 % der Bildschirmbreite erstrecken. Dieser Ansatz funktioniert gut auf Geräten, die einen schmalen Darstellungsbereich haben, allerdings weniger gut auf solchen mit einem breiten Darstellungsbereich, etwa auf Desktopcomputern. Dieses Problem wird im Abschnitt für responsives Design behandelt.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Viele Nutzer können sich Bilder nicht ansehen und greifen auf Hilfstechnologien wie eine Bildschirmsprachausgabe zurück, die die Daten auf der Seite analysieren und anschließend in verbaler Form ausgeben. Vergewissern Sie sich daher, dass alle Ihre Bilder zum Inhalt ein beschreibendes ``alt``-Tag aufweisen, die die Sprachausgabe dem Nutzer vorlesen kann.

Achten Sie beim Hinzufügen von ``alt``-Tags darauf, den Text so prägnant wie möglich zu halten und das Bild vollständig zu beschreiben. In unserer Demonstration formatieren wir das Attribut zum Beispiel einfach als ``Name: Rolle``. Diese Informationen reichen aus, dass der Nutzer versteht, dass sich dieser Abschnitt um die Autoren und ihre Aufgaben dreht.

### Abschnitt mit Datentabelle hinzufügen

Der letzte Abschnitt ist eine einfache Tabelle mit bestimmten Produktdaten.

Tabellen sollten nur für Tabellendaten verwendet werden, also Informationsmatrizen.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

### Fußnote hinzufügen

Für die meisten Websites ist eine Fußnote erforderlich, in der sich Inhalte wie Nutzungsbedingungen, Haftungsausschlüsse und sonstige Informationen befinden, die nicht in der Hauptnavigation oder im Hauptinhaltsbereich der Seite erscheinen sollen.

Auf unserer Website verlinken wir einfach auf die Nutzungsbedingungen, eine Kontaktseite und unsere Profile in den sozialen Medien.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

## Zusammenfassung

Wir haben einen Entwurf der Website ausgearbeitet und die wichtigsten strukturellen Elemente ermittelt. Darüber hinaus haben wir uns vergewissert, dass alle relevanten Inhalte fertig sind und für unsere geschäftlichen Anforderungen bereitstehen.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Inhalt">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Sie werden nun vielleicht denken, dass die Seite gar nicht gut aussieht. Das ist jedoch Absicht. 
Inhalte sind der wichtigste Aspekt jeder Website und wir mussten sichergehen, dass wir eine gute und solide Informationsarchitektur und Informationsdichte haben. Anhand dieses Leitfadens haben wir uns eine ausgezeichnete Grundlage geschaffen, auf der wir nun aufbauen können. Die Formatierung unserer Inhalte wird im nächsten Leitfaden behandelt.



