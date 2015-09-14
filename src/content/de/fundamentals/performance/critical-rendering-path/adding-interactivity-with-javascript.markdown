---
title: "Interaktivität dank JavaScript"
description: "Mit JavaScript lässt sich nahezu jeder Aspekt einer Seite anpassen: vom Inhalt über das Layout und Verhalten bis hin zu Nutzerinteraktionen. JavaScript kann jedoch auch die DOM-Erstellung blockieren und Verzögerungen beim Rendern der Seite verursachen. Machen Sie JavaScript asynchron und entfernen Sie unnötigen Ballast aus dem kritischen Rendering-Pfad, um die Leistung zu optimieren."
updated_on: 2014-09-18
key-takeaways:
  adding-interactivity:
    - "JavaScript kann das DOM und CSSOM abfragen und ändern."
    - "Die Ausführung von JavaScript blockiert das CSSOM."
    - "JavaScript blockiert die DOM-Erstellung, sofern es nicht explizit als asynchron festgelegt wird."
---
<p class="intro">
  Mit JavaScript lässt sich nahezu jeder Aspekt einer Seite anpassen: vom Inhalt über das Layout und Verhalten bis hin zu Nutzerinteraktionen. JavaScript kann jedoch auch die DOM-Erstellung blockieren und Verzögerungen beim Rendern der Seite verursachen. Machen Sie JavaScript asynchron und entfernen Sie unnötigen Ballast aus dem kritischen Rendering-Pfad, um die Leistung zu optimieren.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript ist eine dynamische Sprache, die im Browser ausgeführt wird. Damit lassen sich nahezu alle Verhaltensaspekte einer Seite ändern, zum Beispiel können wir den Inhalt einer Seite anpassen, indem wir Elemente aus der DOM-Struktur entfernen oder ihr Elemente hinzufügen. Darüber hinaus lassen sich die CSSOM-Eigenschaften der einzelnen Elemente ändern, die Nutzereingabe handhaben und vieles mehr. Als Praxisbeispiel erweitern wir unser vorheriges `Hallo Welt`-Beispiel durch ein einfaches Inline-Skript:

{% include_code src=_code/script.html snippet=full %}

* Mit JavaScript erhalten wir Zugriff auf das DOM und können den Verweis auf den ausgeblendeten Span-Knoten abrufen. Dieser ist zwar in der Renderstruktur möglicherweise nicht sichtbar, aber dennoch im DOM vorhanden! Sobald wir diesen Verweis haben, können wir den Text über `.textContent` anpassen und sogar die berechnete Eigenschaft für den Anzeigestil von `none` in `inline` ändern. Anschließend wird auf unserer Seite `**Hello interactive students!**` angezeigt.

* Mit JavaScript lassen sich auch neue Elemente im DOM erstellen, gestalten, aus dem DOM entfernen oder diesem hinzufügen. Tatsächlich könnte unsere gesamte Seite technisch gesehen aus einer einzigen großen JavaScript-Datei bestehen, die die Elemente nacheinander erstellt und gestaltet. Das würde funktionieren, die Verwendung von HTML und CSS ist in der Praxis jedoch viel einfacher. Im zweiten Teil unserer JavaScript-Funktion erstellen wir ein neues Div-Element, legen den Textinhalt fest, gestalten es und hängen es an den Textkörper an.

<img src="images/device-js-small.png" class="center" alt="Seitenvorschau">

Damit haben wir den Inhalt und CSS-Stil eines vorhandenen DOM-Knotens angepasst und dem Dokument einen neuen Knoten hinzugefügt. Zwar gewinnen wir mit unserer Seite keinen Designpreis, jedoch lassen sich damit die Möglichkeiten und Flexibilität von JavaScript aufzeigen.

Allerdings lauert hier ein großer Leistungsvorbehalt. JavaScript eröffnet uns viele Möglichkeiten, gleichzeitig erlegt es uns aber auch eine Vielzahl zusätzlicher Beschränkungen im Hinblick darauf auf, wie und wann die Seite gerendert wird.

Zunächst ist festzustellen, dass sich unser Inline-Skript im oben stehenden Beispiel am Ende der Seite befindet. Warum? Probieren Sie es doch selbst einmal aus. Wenn wir das Skript oberhalb des _span_-Elements platzieren, wird das Skript fehlschlagen und melden, dass es keinen Verweis auf irgendwelche _span_-Elemente im Dokument finden kann, d. h., _getElementsByTagName('span')_ wird den Wert _null_ zurückgeben. Damit wird eine wesentliche Eigenschaft verdeutlicht: Unser Skript wird exakt an der Stelle ausgeführt, an der es im Dokument eingefügt wurde. Wenn der HTML-Parser ein Skript-Tag findet, wird die Erstellung des DOMs unterbrochen und die Kontrolle an die JavaScript-Engine übergeben. Sobald die JavaScript-Engine fertig ist, fährt der Browser an der jeweiligen Stelle mit der DOM-Erstellung fort.

Mit anderen Worten: Unser Skript-Block kann keine Elemente finden, die sich weiter unten auf der Seite befinden, weil diese noch nicht verarbeitet wurden! Oder aus einer anderen Perspektive betrachtet: **Durch das Ausführen unseres Inline-Skripts wird die DOM-Erstellung blockiert, was wiederum das erste Rendern verzögert.**

Ein weiterer raffinierter Vorteil bei der Verwendung von Skripts auf unserer Seite: Diese können nicht nur das DOM lesen und ändern, sondern auch die CSSOM-Eigenschaften. Genau das tun wir in unserem Beispiel, wenn wir die Anzeigeeigenschaft des Span-Elements von `none` in `inline` ändern. Das Ergebnis? Eine Racebedingung.

Was passiert, wenn wir unser Skript ausführen möchten und der Browser das CSSOM noch nicht vollständig heruntergeladen und erstellt hat? Die Antwort ist einfach und schlecht für die Leistung: **Der Browser verzögert die Skriptausführung, bis das CSSOM vollständig heruntergeladen und erstellt wurde. Während wir warten, wird darüber hinaus die DOM-Erstellung blockiert!**

Kurz gesagt: JavaScript stellt eine Vielzahl neuer Abhängigkeiten zwischen dem DOM, CSSOM und der JavaScript-Ausführung her und kann merkliche Verzögerungen im Hinblick darauf mit sich bringen, wie schnell der Browser unsere Seite auf dem Bildschirm verarbeiten und rendern kann:

1. Die Position des Skripts im Dokument ist entscheidend.
2. Die DOM-Erstellung wird unterbrochen, wenn ein Skript-Tag gefunden wird, und erst nach Ausführung des Skripts fortgeführt.
3. JavaScript kann das DOM und CSSOM abfragen und ändern.
4. Die Ausführung von JavaScript erfolgt erst, wenn das CSSOM fertig ist.

Wenn wir über die Optimierung des kritischen Rendering-Pfads sprechen, geht es größtenteils um das Verständnis und die Optimierung des Abhängigkeitsdiagramms von HTML, CSS und JavaScript.


## Parser-Blockierung vs. asynchrones JavaScript

Durch die Ausführung von JavaScript wird generell das Parsing blockiert: Findet der Browser ein Skript im Dokument, muss er die DOM-Erstellung unterbrechen, die Kontrolle an die JavaScript-Engine übergeben und die Ausführung des Skripts abwarten, bevor er mit der DOM-Erstellung fortfahren kann. Das haben wir in unserem vorherigen Beispiel bereits mit einem Inline-Skript in der Praxis gezeigt. Tatsächlich wird durch Inline-Skripts immer das Parsing blockiert, sofern Sie nicht besondere Vorkehrungen treffen und zusätzlichen Code schreiben, um die Ausführung zu verzögern.

Wie sieht es mit Skripts aus, die über ein Skript-Tag eingefügt werden? Nehmen wir unser vorheriges Beispiel und extrahieren unseren Code in eine separate Datei:

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

Würde sich die Reihenfolge bei der Ausführung Ihrer Ansicht nach ändern, wenn wir anstelle eines Inline-JavaScript-Snippets ein `<script>`-Tag verwenden würden? Natürlich lautet die Antwort nein, da beide identisch sind und das gleiche bewirken sollten. In beiden Fällen muss der Browser pausieren und das Skript ausführen, bevor er das restliche Dokument verarbeiten kann. **Im Falle einer externen JavaScript-Datei muss der Browser jedoch ebenfalls pausieren und warten, bis das Skript von der Festplatte, einem Remote-Server oder aus dem Cache abgerufen wurde, was weitere Dutzende bis Tausende Millisekunden Verzögerung für den kritischen Rendering-Pfad bedeuten kann.**

Die gute Nachricht: Wir haben einen Rettungsanker! JavaScript blockiert generell das Parsing und der Browser weiß nicht, was das Skript auf dieser Seite vorhat. Daher wird vom Worst-Case-Szenario ausgegangen und der Parser blockiert. Was wäre jedoch, wenn wir dem Browser signalisieren und ihn anweisen könnten, dass das Skript nicht genau an der Stelle ausgeführt werden muss, an der im Dokument darauf verwiesen wird? Dadurch könnte der Browser mit der DOM-Erstellung fortfahren und die Skriptausführung auf einen späteren Zeitpunkt verschieben, zum Beispiel, sobald die Datei aus dem Cache oder von einem Remote-Server abgerufen wurde.

Wie funktioniert das? Ganz einfach! Wir können unser Skript als _async_ kennzeichnen:

{% include_code src=_code/split_script_async.html snippet=full %}

Durch Hinzufügen des Schlüsselworts `async` zum Skript-Tag weiß der Browser, dass die DOM-Erstellung nicht blockiert werden soll, während auf die Verfügbarkeit des Skripts gewartet wird. Das ist ein großer Leistungsgewinn!



