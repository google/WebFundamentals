---
title: "PageSpeed-Regeln und Empfehlungen"
description: "PageSpeed Insights-Regeln im Kontext: worauf bei der Optimierung des kritischen Rendering-Pfads zu achten ist und warum"
updated_on: 2014-04-28
---

<p class="intro">
  PageSpeed Insights-Regeln im Kontext: worauf bei der Optimierung des kritischen Rendering-Pfads zu achten ist und warum
</p>

## JavaScript- und CSS-Code, die das Rendern blockieren, eliminieren

Im Sinne der kürzesten Zeit bis zum ersten Rendern sollte die Anzahl der kritischen Ressourcen auf der Seite minimiert und, soweit möglich, eliminiert, die Zahl der heruntergeladenen kritischen Bytes minimiert und die Länge des kritischen Pfads optimiert werden.

## JavaScript-Nutzung optimieren

JavaScript-Ressourcen blockieren standardmäßig den Parser, es sei denn, sie sind als as _async_ gekennzeichnet oder werden über ein spezielles JavaScript-Snippet hinzugefügt. JavaScript, das den Parser blockiert, zwingt den Browser, auf das CSSOM zu warten und hält die Erstellung des DOM auf, was wiederum das erste Rendern erheblich verzögern kann.

### **Asynchrone JavaScript-Ressourcen bevorzugen**

Asynchrone Ressourcen heben die Blockierung des Dokumenten-Parsers auf und ermöglichen es dem Browser, die Blockierung im CSSOM vor der Ausführung des Skripts zu vermeiden. Wenn das Skript asynchron ausgeführt werden kann, bedeutet dies häufig, dass es für das erste Rendern nicht unbedingt benötigt wird. Erwägen Sie deshalb, asynchrone Skripts nach dem ersten Rendern zu laden.

### **Parsen von JavaScript zurückstellen**

Alle Skripts, die nicht unbedingt für die Erstellung der sichtbaren Inhalte für das erste Rendern nötig sind, sollten zurückgestellt werden, um den Arbeitsaufwand des Browsers für die Darstellung der Seite zu minimieren.

### **Lang ausgeführten JavaScript-Code vermeiden**

Lang ausgeführter JavaScript-Code hindert den Browser an der Erstellung des DOM und des CSSOM und am Rendern der Seite. Deshalb sollte sämtliche Initialisierungslogik und Funktionalität, die nicht unbedingt für das erste Rendern benötigt wird, auf später verschoben werden. Wenn eine lange Initialisierungssequenz ausgeführt werden muss, erwägen Sie deren Aufteilung in mehrere Phasen, damit der Browser zwischenzeitlich andere Ereignisse verarbeiten kann.

## CSS-Nutzung optimieren

CSS wird für die Erstellung der Rendering-Baumstruktur benötigt und JavaScript blockiert häufig die CSS-Nutzung während der ersten Erstellung der Seite. Sie sollten nicht absolut erforderlichen CSS-Code, z. B. Druck- und sonstige Medienanforderungen, unbedingt als nicht-kritisch kennzeichnen und sicherstellen, dass die Menge kritischer CSS-Elemente und die Zeit für deren Bereitstellung so gering wie möglich ausfällt.

### **CSS in den Dokumentenkopf einfügen**

Sämtliche CSS-Ressourcen sollten innerhalb des HTML-Dokuments so bald wie möglich spezifiziert werden, damit der Browser die <link>-Tags möglichst frühzeitig erkennen und die CSS-Anforderung ausgeben kann.

### **CSS-Importe vermeiden**

Mithilfe der CSS-Import-Anweisung (@import) kann ein Stylesheet Regeln aus einer anderen Stylesheet-Datei importieren. Allerdings sollten diese Anweisungen vermieden werden, weil sie zusätzliche Paketumläufe im kritischen Pfad bedeuten: Die importierten CSS-Ressourcen werden erst erkannt, nachdem das CSS-Stylesheet mit der @import-Regel selbst empfangen und geparst wurde.

### **Rendering-blockierendes CSS inline einfügen**

Für optimale Leistung empfiehlt es sich, das kritische CSS direkt in das HTML-Dokument einzubetten. Damit vermeiden Sie zusätzliche Paketumläufe im kritischen Pfad und können bei korrekter Verwendung die Länge des kritischen Pfads auf einen Paketumlauf begrenzen, wobei nur der HTML-Code eine blockierende Ressource darstellt.



