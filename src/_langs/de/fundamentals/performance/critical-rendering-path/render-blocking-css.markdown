---
layout: article
title: "Rendering-blockierendes CSS"
description: "CSS wird standardmäßig als rendering-blockierende Ressource behandelt, d. h., der Browser hält das Rendering der verarbeiteten Inhalte zurück, bis das CSSOM erstellt wurde. Halten Sie Ihr CSS so knapp wie möglich, stellen Sie es sobald wie möglich bereit und heben Sie die Blockierung des Renderings mithilfe von Medientypen und Abfragen auf."
introduction: "CSS wird standardmäßig als rendering-blockierende Ressource behandelt, d. h., der Browser hält das Rendering der verarbeiteten Inhalte zurück, bis das CSSOM erstellt wurde. Halten Sie Ihr CSS so knapp wie möglich, stellen Sie es sobald wie möglich bereit und heben Sie die Blockierung des Renderings mithilfe von Medientypen und Abfragen auf."
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  order: 3
collection: critical-rendering-path
authors:
  - ilyagrigorik
related-guides:
  media-queries:
    -
      title: Mit CSS-Medienabfragen die Reaktionsfähigkeit erhöhen
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Responsives Webdesign"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - Standardmäßig wird CSS als Ressource behandelt, die das Rendering blockiert.
    - Mittels Medientypen und Medienabfragen ist es möglich, manche CSS-Ressourcen als das Rendering nicht blockierend zu kennzeichnen.
    - Alle CSS-Ressourcen, sowohl blockierende als auch nicht blockierende, werden vom Browser heruntergeladen.
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


Im vorherigen Abschnitt haben wir festgestellt, dass es für den kritischen Rendering-Pfad notwendig ist, die Rendering-Verzeichnisstruktur sowohl mit dem DOM als auch mit dem CSSOM zu erstellen. Dies führt uns zu einer wichtigen Schlussfolgerung bezüglich der Leistung: **Sowohl HTML als auch CSS sind Ressourcen, die das Rendering blockieren.** In Bezug auf HTML ist dies offensichtlich, denn ohne das DOM wäre nichts zum Rendern vorhanden, aber die Notwendigkeit von CSS ist womöglich weniger einleuchtend. Was würde geschehen, wenn wir versuchten, eine typische Seite zu rendern, ohne das Rendern im CSS-Code zu blockieren?

{% include modules/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="clear">
  <div class="g--half">
    <b>NYTimes mit CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes mit CSS">

  </div>

  <div class="g--half g--last">
    <b>NYTimes ohne CSS (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes ohne CSS">

  </div>
</div>

{% comment %}
<table>
<tr>
<td>NYTimes mit CSS</td>
<td>NYTimes ohne CSS (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="NYTimes mit CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="NYTimes ohne CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

Das obige Beispiel, bei dem die NYTimes-Website mit und ohne CSS dargestellt wird, zeigt, warum das Rendern blockiert wird, bis CSS verfügbar ist - ohne CSS wäre die Seite praktisch nicht nutzbar. Die Situation rechts wird häufig als `Flash of Unstyled Content` (FOUC) bezeichnet und bedeutet, dass eine Webseite kurz im unfertigen Zustand ausgegeben wird. Deshalb blockiert der Browser das Rendern, bis sowohl das DOM als auch das CSSOM vorliegen.

> **_CSS ist eine Ressource, die das Rendern blockiert, also laden Sie sie so schnell wie möglich auf den Client, um die Zeit bis zum ersten Rendern zu optimieren!_**

Wie verhält es sich jedoch bei CSS-Styles, die nur unter bestimmten Bedingungen verwendet werden, zum Beispiel, wenn die Seite gedruckt oder auf einen großen Bildschirm projiziert wird? Es wäre ganz gut, wenn wir das Rendern bei diesen Ressourcen nicht blockieren müssten!

Mit CSS-Mediatypen und -Medienabfragen können wir solche Anwendungsfälle in Angriff nehmen:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

Eine [Medienabfrage]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) besteht aus einem Medientyp und null oder mehr Ausdrücken zur Überprüfung der Bedingungen bestimmter Medienmerkmale. Unsere erste Stylesheet-Deklaration beinhaltet beispielsweise keinen Medientyp und keine Medienabfrage, deshalb wird sie in allen Fällen angewendet, d. h., sie blockiert stets das Rendern. Andererseits wird das zweite Stylesheet nur angewendet, wenn die Inhalte gedruckt werden, damit Sie ggf. das Layout neu anordnen, die Schriftarten ändern können usw. Aus diesem Grund muss dieses Stylesheet das Rendern der Seite beim ersten Laden nicht blockieren. Die letzte Stylesheet-Deklaration sieht schließlich eine Medienabfrage vor, die vom Browser durchgeführt wird: Wenn die Bedingungen erfüllt sind, blockiert der Browser das Rendern, bis das Stylesheet heruntergeladen und verarbeitet ist.

Mithilfe von Medienabfragen kann eine Webseite auf spezifische Anwendungsfälle wie Anzeige oder Drucken zugeschnitten werden und zudem auf dynamische Bedingungen wie Änderungen der Bildschirmausrichtung, Größenänderungen usw. **Achten Sie bei der Deklaration der Stylesheet-Inhalte sorgfältig auf die Medientypen und -abfragen, da diese sich stark auf die Leistungsfähigkeit des kritischen Rendering-Pfads auswirken!**

{% include modules/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Sehen wir uns nun einige praktische Beispiele an:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="screen">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* Die erste Deklaration blockiert das Rendern und trifft auf alle Bedingungen zu.
* Die zweite Deklaration blockiert ebenfalls das Rendern: `screen` ist der Standardtyp und ist voreingestellt, wenn Sie keinen Typ vorgeben. Aus diesem Grund wirken sich die erste und die zweite Deklaration gleich aus.
* Die dritte Deklaration beinhaltet eine dynamische Medienabfrage, die beim Laden der Seite ausgewertet wird. Je nach Ausrichtung des Geräts beim Laden der Seite kann portrait.css das Rendern ggf. blockieren.
* Die letzte Deklaration wird nur angewendet, wenn die Seite gedruckt wird, deshalb blockiert sie das Rendern beim erstmaligen Laden der Seite im Browser nicht.

Beachten Sie schließlich, dass sich die `Rendering-Blockade` nur darauf bezieht, ob der Browser das erste Rendern der Seite bei dieser Ressource anhalten muss. In jedem Fall wird der CSS-Inhalt weiter vom Browser heruntergeladen, wenn auch mit einer geringeren Priorität für nicht blockierende Ressourcen.

{% include modules/nextarticle.liquid %}

{% endwrap%}

