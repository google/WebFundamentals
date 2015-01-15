---
layout: article
title: "Den kritischen Rendering-Pfad mit Navigation Timing messen"
description: "Sie können nicht optimieren, was Sie nicht messen können. Mit dem Navigation Timing API verfügen wir jedoch über alle notwendigen Tools zum Messen der einzelnen Schritte des kritischen Rendering-Pfads (Critical Rendering Path, CRP)!"
introduction: "Sie können nicht optimieren, was Sie nicht messen können. Mit dem Navigation Timing API verfügen wir jedoch über alle notwendigen Tools zum Messen der einzelnen Schritte des kritischen Rendering-Pfads (Critical Rendering Path, CRP)!"
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  featured: true
  order: 5
collection: critical-rendering-path
authors:
  - ilyagrigorik
key-takeaways:
  measure-crp:
    - Navigation Timing liefert hochauflösende Zeitstempel für die Messung des CRP.
    - Der Browser gibt Serien verarbeitbarer Ereignisse aus, die verschiedene Phasen des CRP erfassen.
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

{% include modules/takeaway.liquid list=page.key-takeaways.measure-crp %}

Die Grundlagen einer soliden Leistungsstrategie sind gute Messungen und eine geeignete Instrumentierung. Das Navigation Timing API stellt genau das zur Verfügung.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

Jede der Beschriftungen im obigen Diagramm entspricht einem hochauflösenden Zeitstempel, den der Browser für jede einzelne geladene Seite erfasst. In diesem speziellen Fall ist tatsächlich nur ein Bruchteil der unterschiedlichen Zeitstempel dargestellt. Wir ignorieren zunächst alle netzwerkbezogenen Zeitstempel, kommen aber später darauf zurück.

Was bedeuten diese Zeitstempel nun?

* **domLoading:** Dies ist der Zeitstempel am Beginn des gesamten Prozesses. Der Browser startet gleich mit dem Parsen der ersten empfangenen Bytes des HMTL-
  Dokuments.
* **domInteractive:** Markiert den Zeitpunkt, an dem der Browser mit dem Parsen des gesamten HTML-Codes fertig und die DOM-Erstellung abgeschlossen ist.
* **domContentLoaded:** Markiert den Zeitpunkt, an dem das DOM einsatzbereit ist und keine Stylesheets die JavaScript-Ausführung blockieren, d. h., wir könnten die Rendering-Baumstruktur jetzt erstellen.
    * Viele JavaScript-Frameworks warten auf dieses Ereignis, bevor sie mit der Ausführung ihrer eigenen Logik beginnen. Aus diesem Grund erfasst der Browser die Zeitstempel _EventStart_ und _EventEnd_ und wir können nachverfolgen, wie lange diese Ausführung dauerte.
* **domComplete:** Die gesamte Verarbeitung ist abgeschlossen und alle Ressourcen (Bilder usw.) auf der Seite sind heruntergeladen, d. h., der Ladekreisel dreht sich nicht mehr.
* **loadEvent:** Als finalen Schritt beim Laden jeder Seite gibt der Browser ein `onload`-Ereignis aus, das weitere Anwendungslogik starten kann.

Die HTML-Spezifikation gibt die Bedingungen für jedes einzelne Ereignis vor: wann es ausgelöst werden soll, welche Voraussetzungen erfüllt sein müssen und so weiter. Für unsere Zwecke genügt es, wenn wir uns auf einige wichtige Wegmarken in Bezug auf den kritischen Rendering-Pfad konzentrieren:

* **domInteractive** markiert die Einsatzbereitschaft des DOM.
* **domContentLoaded** markiert typischerweise den Zeitpunkt, zu dem [sowohl das DOM als auch das CSSOM einsatzbereit sind](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * Wenn kein Parser vorhanden ist, der JavaScript blockiert, dann wird _documentContentLoaded_ unmittelbar nach _domInteractive_ gestartet.
* **domComplete** markiert den Zeitpunkt, zu dem die Seite und alle ihre Unterressourcen einsatzbereit sind.

^

{% include_code _code/measure_crp.html full html %}

Das obige Beispiel erscheint vielleicht ein wenig einschüchternd, ist in Wirklichkeit jedoch ziemlich einfach.  Die Navigation Timing API erfasst alle relevanten Zeitstempel und unser Code wartet einfach auf den Start des `onload`-Ereignisses und berechnet die Differenz zwischen den verschiedenen Zeitstempeln. Beachten Sie, dass das onload-Ereignis nach domInteractive, domContentLoaded und domComplete ausgelöst wird.
<img src="images/device-navtiming-small.png" class="center" alt="NavTiming-Demo">

Wir verfügen nun über einige spezifische zu verfolgende Wegmarken und eine einfache Funktion zur Ausgabe dieser Messungen. Beachten Sie, dass Sie den Code so modifizieren können, dass anstatt der Anzeige dieser Messdaten auf der Seite diese an einen Analyse-Server gesendet werden ([Google Analytics tut dies automatisch](https://support.google.com/analytics/answer/1205784?hl=de)). Das ist eine großartige Möglichkeit, die Leistung auf Ihren Seiten zu überwachen und Seiten zu identifizieren, die von einer Optimierung profitieren würden.

{% include modules/nextarticle.liquid %}

{% endwrap%}

