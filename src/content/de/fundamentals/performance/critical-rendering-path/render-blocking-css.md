project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS wird standardmäßig als rendering-blockierende Ressource behandelt, d. h., der Browser hält das Rendering der verarbeiteten Inhalte zurück, bis das CSSOM erstellt wurde. Halten Sie Ihr CSS so knapp wie möglich, stellen Sie es sobald wie möglich bereit und heben Sie die Blockierung des Renderings mithilfe von Medientypen und Abfragen auf.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Rendering-blockierendes CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


CSS wird standardmäßig als rendering-blockierende Ressource behandelt, d. h., der Browser hält das Rendering der verarbeiteten Inhalte zurück, bis das CSSOM erstellt wurde. Halten Sie Ihr CSS so knapp wie möglich, stellen Sie es sobald wie möglich bereit und heben Sie die Blockierung des Renderings mithilfe von Medientypen und Abfragen auf.

Im vorherigen Abschnitt haben wir festgestellt, dass es für den kritischen Rendering-Pfad notwendig ist, die Rendering-Verzeichnisstruktur sowohl mit dem DOM als auch mit dem CSSOM zu erstellen. Dies führt uns zu einer wichtigen Schlussfolgerung bezüglich der Leistung: **Sowohl HTML als auch CSS sind Ressourcen, die das Rendering blockieren.** In Bezug auf HTML ist dies offensichtlich, denn ohne das DOM wäre nichts zum Rendern vorhanden, aber die Notwendigkeit von CSS ist womöglich weniger einleuchtend. Was würde geschehen, wenn wir versuchten, eine typische Seite zu rendern, ohne das Rendern im CSS-Code zu blockieren?

### TL;DR {: .hide-from-toc }
- Standardmäßig wird CSS als Ressource behandelt, die das Rendering blockiert.
- Mittels Medientypen und Medienabfragen ist es möglich, manche CSS-Ressourcen als das Rendering nicht blockierend zu kennzeichnen.
- Alle CSS-Ressourcen, sowohl blockierende als auch nicht blockierende, werden vom Browser heruntergeladen.


<figure class="attempt-left">
  <img class="center" src="images/nytimes-css-device.png" alt="NYTimes mit CSS">
  <figcaption>NYTimes mit CSS</figcaption>
</figure>

<figure class="attempt-right">
  <img src="images/nytimes-nocss-device.png" alt="NYTimes ohne CSS">
  <figcaption>NYTimes ohne CSS (FOUC)</figcaption>
</figure>

<div class="clearfix"></div>


Das obige Beispiel, bei dem die NYTimes-Website mit und ohne CSS dargestellt wird, zeigt, warum das Rendern blockiert wird, bis CSS verfügbar ist - ohne CSS wäre die Seite praktisch nicht nutzbar. Die Situation rechts wird häufig als `Flash of Unstyled Content` (FOUC) bezeichnet und bedeutet, dass eine Webseite kurz im unfertigen Zustand ausgegeben wird. Deshalb blockiert der Browser das Rendern, bis sowohl das DOM als auch das CSSOM vorliegen.

> **_CSS ist eine Ressource, die das Rendern blockiert, also laden Sie sie so schnell wie möglich auf den Client, um die Zeit bis zum ersten Rendern zu optimieren!_**

Wie verhält es sich jedoch bei CSS-Styles, die nur unter bestimmten Bedingungen verwendet werden, zum Beispiel, wenn die Seite gedruckt oder auf einen großen Bildschirm projiziert wird? Es wäre ganz gut, wenn wir das Rendern bei diesen Ressourcen nicht blockieren müssten!

Mit CSS-Mediatypen und -Medienabfragen können wir solche Anwendungsfälle in Angriff nehmen:


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

Eine [Medienabfrage](/web/fundamentals/design-and-ux/responsive/#use-media-queries) besteht aus einem Medientyp und null oder mehr Ausdrücken zur Überprüfung der Bedingungen bestimmter Medienmerkmale. Unsere erste Stylesheet-Deklaration beinhaltet beispielsweise keinen Medientyp und keine Medienabfrage, deshalb wird sie in allen Fällen angewendet, d. h., sie blockiert stets das Rendern. Andererseits wird das zweite Stylesheet nur angewendet, wenn die Inhalte gedruckt werden, damit Sie ggf. das Layout neu anordnen, die Schriftarten ändern können usw. Aus diesem Grund muss dieses Stylesheet das Rendern der Seite beim ersten Laden nicht blockieren. Die letzte Stylesheet-Deklaration sieht schließlich eine Medienabfrage vor, die vom Browser durchgeführt wird: Wenn die Bedingungen erfüllt sind, blockiert der Browser das Rendern, bis das Stylesheet heruntergeladen und verarbeitet ist.

Mithilfe von Medienabfragen kann eine Webseite auf spezifische Anwendungsfälle wie Anzeige oder Drucken zugeschnitten werden und zudem auf dynamische Bedingungen wie Änderungen der Bildschirmausrichtung, Größenänderungen usw. **Achten Sie bei der Deklaration der Stylesheet-Inhalte sorgfältig auf die Medientypen und -abfragen, da diese sich stark auf die Leistungsfähigkeit des kritischen Rendering-Pfads auswirken!**

Sehen wir uns nun einige praktische Beispiele an:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* Die erste Deklaration blockiert das Rendern und trifft auf alle Bedingungen zu.
* Die zweite Deklaration blockiert ebenfalls das Rendern: `all` ist der Standardtyp und ist voreingestellt, wenn Sie keinen Typ vorgeben. Aus diesem Grund wirken sich die erste und die zweite Deklaration gleich aus.
* Die dritte Deklaration beinhaltet eine dynamische Medienabfrage, die beim Laden der Seite ausgewertet wird. Je nach Ausrichtung des Geräts beim Laden der Seite kann portrait.css das Rendern ggf. blockieren.
* Die letzte Deklaration wird nur angewendet, wenn die Seite gedruckt wird, deshalb blockiert sie das Rendern beim erstmaligen Laden der Seite im Browser nicht.

Beachten Sie schließlich, dass sich die `Rendering-Blockade` nur darauf bezieht, ob der Browser das erste Rendern der Seite bei dieser Ressource anhalten muss. In jedem Fall wird der CSS-Inhalt weiter vom Browser heruntergeladen, wenn auch mit einer geringeren Priorität für nicht blockierende Ressourcen.



