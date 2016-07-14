---
title: "Effizienz der Inhalte optimieren"
description: "Die Menge der Daten, die von den einzelnen Anwendungen heruntergeladen wird, steigt beständig an. Im Sinne einer hohen Leistungsfähigkeit muss die Bereitstellung eines jeden Bytes optimiert werden!"
updated_on: 2014-04-29
---

<p class="intro">
  Die Webanwendungen werden immer umfangreicher, ehrgeiziger und funktionsreicher - das ist eine gute Sache. Allerdings bewirkt die ungebremste Entwicklung hin zu einem üppigerem Web einen weiteren Trend: die Datenmengen, die von den einzelnen Anwendungen heruntergeladen werden, nehmen kontinuierlich zu. Im Sinne einer hohen Leistungsfähigkeit muss die Bereitstellung eines jeden Datenbytes optimiert werden!
</p>


Wie sieht eine moderne Webanwendung aus? Das [HTTP Archive](http://httparchive.org/) kann uns bei der Beantwortung dieser Frage helfen. Mit dem Projekt wird die Entwicklung des Internet verfolgt. Dazu werden die beliebtesten Websites (mehr als 300.000 aus der Liste `Alexa Top 1M`) durchsucht und Analysen zur Anzahl der Ressourcen, zu den Inhaltstypen und zu anderen Metadaten aufgezeichnet und zusammengetragen.

<img src="images/http-archive-trends.png" class="center" alt="Trends laut HTTP Archive">

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th></th>
    <th>50. Perzentil</th>
    <th>75. Perzentil</th>
    <th>90. Perzentil</th>
  </tr>
</thead>
<tr>
  <td data-th="Typ">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="Typ">Bilder</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="Typ">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="Typ">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="Typ">Sonstige</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="Typ"><strong>Gesamt</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

Mit den obigen Daten wird die Zunahme der Zahl der heruntergeladenen Bytes für populäre Ziele im Internet zwischen Januar 2013 und Januar 2014 aufgezeigt. Natürlich wächst nicht jede Website mit derselben Geschwindigkeit und benötigt nicht dieselbe Datenmenge. Aus diesem Grund haben wir die verschiedenen Quantile innerhalb der Verteilung hervorgehoben: das 50. (Median), 75. und 90.

Eine mediane Website Anfang 2014 besteht aus 75 Anfragen, die zusammen 1054 KB an übertragenen Bytes ergeben, und die Gesamtzahl der Bytes und Anfragen hat während des gesamten vorigen Jahres mit konstanter Geschwindigkeit zugenommen. Diese Tatsache an sich ist nicht allzu überraschend, aber sie führt zu wichtigen Schlussfolgerungen bezüglich der Leistung: Zum einen wird das Internet schneller, allerdings unterscheidet sich dieser Geschwindigkeitszuwachs in den einzelnen Ländern und viele Nutzer müssen immer noch Datenobergrenzen und teuere Tarife in Kauf nehmen - vor allem auf Mobilgeräten.

Im Gegensatz zu ihren Desktop-Pendants erfordern Webanwendungen keine Installation: Einfach die URL eingeben und schon kann`s losgehen - das ist ein Hauptmerkmal des Internets. Damit dies jedoch möglich wird, **müssen oftmals Dutzende und manchmal Hunderte verschiedener Ressourcen abgerufen werden, die zusammen Megabytes an Daten ergeben können und in Hunderten von Millisekunden zusammengetragen werden müssen, um die unmittelbare Weberfahrung bereitzustellen, die angestrebt wird.**

Angesichts dieser Anforderungen ist die Umsetzung einer unmittelbaren Weberfahrung keine einfache Aufgabe und deshalb ist die Optimierung der Effizienz der Inhalte entscheidend, die folgende Maßnahmen umfasst: Vermeidung unnötiger Downloads, Optimierung der Übertragungscodierung der einzelnen Ressourcen über diverse Komprimierungstechniken und die Nutzung des Cachespeichers wann immer möglich, um redundante Downloads zu eliminieren.


