---
title: "Leistung des kritischen Rendering-Pfads analysieren"
description: "Zur Erkennung und Behebung von Leistungsengpässen beim kritischen Rendering-Pfad müssen Sie die häufigen Probleme kennen. Bei unserer interaktiven Tour picken wir häufige Leistungsmuster heraus, die Ihnen bei der Optimierung Ihrer Seiten helfen."
updated_on: 2014-04-28
---
<p class="intro">
  Zur Erkennung und Behebung von Leistungsengpässen beim kritischen Rendering-Pfad müssen Sie die häufigen Probleme kennen. Bei unserer interaktiven Tour picken wir häufige Leistungsmuster heraus, die Ihnen bei der Optimierung Ihrer Seiten helfen.
</p>

{% include shared/toc.liquid %}

Durch die Optimierung des kritischen Rendering-Pfads soll erreicht werden, dass der Browser die Seite so schnell wie möglich zeichnet, denn ein schnellerer Seitenaufbau führt zu größerem Interesse, einer höheren Anzahl aufgerufener Seiten und einer [besseren Conversion-Rate](http://www.google.com/think/multiscreen/success.html). Aus diesem Grund möchten wir den Zeitraum, in dem ein Besucher auf einen leeren Bildschirm starren muss, auf ein Minimum beschränken. Dazu nehmen wir Optimierungen im Hinblick darauf vor, welche Ressourcen in welcher Reihenfolge geladen werden.

Zur Veranschaulichung dieses Prozesses beginnen wir mit dem einfachsten möglichen Fall und bauen unsere Seite nach und nach anhand von zusätzlichen Ressourcen, Stilen und Anwendungslogik auf. Dabei sehen wir auch, was schieflaufen kann und wie sich jedes dieser Fallbeispiele optimieren lässt.

Noch eine letzte Anmerkung, bevor es losgeht: Bisher haben wir ausschließlich darüber gesprochen, was im Browser passiert, sobald die Ressource (CSS-, JS- oder HTML-Datei) verarbeitet werden kann, und die Zeit ignoriert, die für den Abruf aus dem Cache oder von einem Netzwerk erforderlich ist. Details zur Optimierung der Netzwerkaspekte unserer Anwendung finden Sie im nachfolgenden Modul. Bis dahin setzen wir für ein realistischeres Szenario Folgendes voraus:

* Die Netzwerkumlaufzeit (Gatterlaufzeit) zum Server beträgt 100 ms.
* Die Antwortzeit des Servers beträgt 100 ms für das HTML-Dokument und 10 ms für alle anderen Dateien.

## Das `Hallo Welt`-Erlebnis

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

Wir beginnen ganz unkompliziert mit grundlegendem HTML-Markup und einem einzelnen Bild - ohne CSS oder JavaScript. Nun öffnen wir unsere Netzwerkzeitachse in den Chrome-Entwicklertools und sehen uns den daraus resultierenden Ressourcenwasserfall an:

<img src="images/waterfall-dom.png" alt="" class="center" alt="Kritischer Rendering-Pfad">

Wie erwartet dauerte das Herunterladen der HTML-Datei ungefähr 200 ms. Beachten Sie, dass der transparente Teil der blauen Linie die Zeit angibt, die der Browser auf das Netzwerk wartet - es wurden also noch keine Antwortbytes erhalten - während der restliche Teil die Zeit bis zum Abschluss des Downloads angibt, nachdem die ersten Antwortbytes erhalten wurden. In unserem Beispiel oben ist der HTML-Download winzig (<4 K), zum Abruf der gesamten Datei ist also nur ein einziger Umlauf nötig. Daher dauert der Abruf des HTML-Dokuments ungefähr 200 ms, wobei die Hälfte der Zeit auf das Netzwerk und die andere Hälfte auf die Antwort des Servers gewartet wurde.

Sobald der HTML-Inhalt verfügbar ist, muss der Browser die Bytes parsen, in Token konvertieren und die DOM-Struktur erstellen. Beachten Sie, dass die Entwicklertools praktischerweise die Dauer des DOMContentLoaded-Ereignisses unten angeben (216 ms), was ebenfalls der blauen vertikalen Linie entspricht. Die Lücke zwischen dem Ende des HTML-Downloads und der blauen vertikalen Linie (DOMContentLoaded) ist die Zeit, die der Browser für die Erstellung der DOM-Struktur benötigt hat. In diesem Fall sind das nur wenige Millisekunden.

Zuletzt noch etwas Interessantes: Unser `awesome photo` hat das domContentLoaded-Ereignis nicht blockiert! Es hat sich also herausgestellt, dass wir die Renderstruktur erstellen und sogar die Seite zeichnen können, ohne auf jede einzelne Ressource der Seite warten zu müssen: **Für eine schnelle erste Zeichnung sind nicht alle Ressourcen erforderlich**. Vielmehr sprechen wir, wenn wir über den kritischen Rendering-Pfad sprechen, in der Regel über das HTML-Markup, CSS und JavaScript. Bilder blockieren das erste Rendern der Seite nicht, obwohl wir natürlich versuchen sollten, die Bilder ebenfalls schnellstmöglich zu zeichnen!

Das Ladeereignis - auch bekannt als `onload` - für das Bild wird blockiert: Laut Entwicklertools erfolgt das Onload-Ereignis bei 335 ms. Noch einmal zur Erinnerung: Das Onload-Ereignis markiert den Punkt, an dem **alle Ressourcen**, die die Seite benötigt, heruntergeladen und verarbeitet wurden. Das ist der Punkt, an dem die Ladeanimation im Browser aufhört, sich zu drehen. Dies wird durch die rote vertikale Linie im Wasserfall gekennzeichnet.


## Mischung aus JavaScript und CSS hinzufügen

Unsere `'Hallo Welt'-Erlebnis`-Seite sieht zwar auf den ersten Blick einfach aus, es steckt jedoch eine Menge dahinter! In der Praxis benötigen wir mehr als nur HTML: Wahrscheinlich haben wir ein CSS-Stylesheet und ein oder mehrere Skripts, um unsere Seite interaktiver zu gestalten. Fügen wir beides hinzu und sehen, was passiert:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Vor dem Hinzufügen von JavaScript und CSS:_

<img src="images/waterfall-dom.png" alt="DOM - kritischer Rendering-Pfad" class="center">

_Mit JavaScript und CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Durch das Hinzufügen von externen CSS- und JavaScript-Dateien wurde unser Wasserfall um zwei zusätzliche Anforderungen erweitert, die alle etwa zur gleichen Zeit vom Browser gesendet werden - so weit so gut. **Beachten Sie jedoch den um ein Vielfaches kleineren Zeitunterschied zwischen den Ereignissen `domContentLoaded` und `onload`. Was ist passiert?**

* Im Gegensatz zu unserem reinen HTML-Beispiel müssen wir zur Erstellung des CSSOM nun zusätzlich die CSS-Datei abrufen und parsen. Außerdem wissen wir, dass wir sowohl das DOM als auch das CSSOM zur Erstellung der Renderstruktur benötigen.
* Da sich auf unserer Seite auch eine JavaScript-Datei befindet, die das Parsen blockiert, wird das domContentLoaded-Ereignis blockiert, bis die CSS-Datei heruntergeladen und geparst wurde: JavaScript fragt das CSSOM möglicherweise ab, sodass wir dies blockieren und auf CSS warten müssen, bevor wir JavaScript ausführen können.

**Was würde passieren, wenn wir unsere externes Skript durch ein Inline-Skript ersetzen?** Eine auf den ersten Blick triviale Frage, die jedoch sehr knifflig ist. Wie sich herausstellt, besteht, selbst wenn das Skript direkt in die Seite integriert wird, die einzig verlässliche Möglichkeit für den Browser, die Absichten des Skripts herauszufinden, in der Ausführung des Skripts, und das ist, wie wir bereits wissen, erst nach Erstellung des CSSOM möglich. Kurz gesagt: Das Inlining von JavaScript blockiert ebenfalls das Parsen.

Beschleunigt das Inlining des Skripts also, trotz Blockieren von CSS, das Rendern der Seite? Wenn das letzte Szenario bereits knifflig war, ist dieses hier umso kniffliger! Versuchen wir es und lassen uns überraschen!

_Externes JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Inline-JavaScript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM und Inline-JS" class="center">

Trotz einer Anforderung weniger sind die Zeiten für `onload` und `domContentLoaded` praktisch gleich geblieben. Woran liegt das? Nun ja, wir wissen, dass es keine Rolle spielt, ob JavaScript inline oder extern bereitgestellt wird, weil der Browser, sobald er auf das Skript-Tag trifft, blockiert wird und wartet, bis das CSSOM erstellt wurde. Darüber hinaus werden CSS und JavaScript in unserem ersten Beispiel parallel vom Browser heruntergeladen und sind etwa zur gleichen Zeit fertig. Daher hilft uns das Inlining des JavaScript-Codes in diesem bestimmten Fall nicht viel! Befinden wir uns also in einer Sackgasse und haben keine Möglichkeit, das Rendern unserer Seite zu beschleunigen? Falsch! Denn tatsächlich können wir auf mehrere unterschiedliche Strategien zurückgreifen.

Zunächst rufen wir uns noch einmal ins Gedächtnis, dass alle Inline-Skripts den Parser blockieren, wir für externe Skripts die Blockierung des Parsers durch Hinzufügen des Schlüsselworts `async` jedoch verhindern können. Machen wir das Inlining also rückgängig und versuchen es:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_Externes JavaScript mit Parser-Blockierung:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Asynchrones externes JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, asynchrones JS" class="center">

Viel besser! Das domContentLoaded-Ereignis wird unmittelbar nach Parsen der HTML ausgelöst: Der Browser weiß, das JavaScript nicht blockiert werden soll, und da keine anderen Skripts vorhanden sind, die das Parsen blockieren, kann auch die CSSOM-Erstellung parallel laufen.

Alternativ hätten wir einen anderen Ansatz versuchen und CSS und JavaScript inline bereitstellen können:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, Inline-CSS, Inline-JS" class="center">

Beachten Sie, dass die _domContentLoaded_-Zeit praktisch nicht vom vorherigen Beispiel abweicht: Anstatt unser JavaScript als asynchron zu kennzeichnen, haben wir CSS und JS in die Seite selbst integriert. Dadurch wird unsere HTML-Seite zwar um einiges größer, der Browser muss jedoch nicht mehr auf den Abruf externer Ressourcen warten: Alles befindet sich direkt in der Seite.

Wie man sieht, ist die Optimierung des kritischen Rendering-Pfads selbst bei einer sehr einfachen Seite eine keinesfalls triviale Aufgabe. Wir müssen das Abhängigkeitsdiagramm der verschiedenen Ressourcen verstehen, herausfinden, welche Ressourcen als `kritisch` anzusehen sind, und aus unterschiedlichen Strategien wählen, wenn es um die Einbindung dieser Ressourcen auf der Seite geht. Für dieses Problem gibt es keine Standardlösung. Jede Seite ist unterschiedlich und Sie müssen die optimale Strategie selbst herausfinden, indem Sie diesen Prozess als Anhaltspunkt verwenden.

Lassen Sie uns vor diesem Hintergrund einen Schritt zurückgehen und versuchen, einige allgemeine Leistungsmuster zu erkennen.


## Leistungsmuster

Die einfachste Seite besteht lediglich aus dem HTML-Markup: weder CSS noch JavaScript oder andere Arten von Ressourcen. Zum Rendern dieser Seite muss der Browser die Anforderung initiieren, auf das Eintreffen de HTML-Dokuments warten, es parsen, das DOM erstellen und es schließlich auf dem Bildschirm rendern:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt=""Hallo Welt" - kritischer Rendering-Pfad" class="center">

**Die Zeit zwischen T<sub>0</sub> und T<sub>1</sub> erfasst die Verarbeitungsdauer von Netzwerk und Server.** Bestenfalls (wenn die HTML-Datei klein ist), benötigen wir nur einen Netzwerkumlauf zum Abrufen des gesamten Dokuments. Aufgrund der Funktionsweise der TCP-Transportprotokolle sind bei größeren Dateien möglicherweise mehr Umläufe nötig. Darauf kommen wir später noch einmal zurück. **Folglich lässt sich sagen, dass der (minimale) kritische Rendering-Pfad der oben stehenden Seite bestenfalls aus einem Umlauf besteht.**

Sehen wir uns einmal die gleiche Seite mit einer externen CSS-Datei an:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM - kritischer Rendering-Pfad" class="center">

Wieder benötigen wir einen Netzwerkumlauf, um das HTML-Dokument abzurufen, und das abgerufene Markup verrät uns, dass wir auch die CSS-Datei benötigen. Das bedeutet: Der Browser muss die CSS vom Server abrufen, bevor er die Seite auf dem Bildschirm rendern kann. **Infolgedessen muss diese Seite mindestens zwei Umläufe durchführen, bevor die Seite angezeigt werden kann**. Noch einmal zur Erinnerung: Im Falle der CSS-Datei sind unter Umständen mehrere Umläufe nötig, daher die Betonung auf `mindestens`.

Klären wir die Begriffe, mit denen wir den kritischen Rendering-Pfad beschreiben: 

* **Kritische Ressource:** die Ressource, die unter Umständen das erste Rendern der Seite blockiert.
* **Länge des kritischen Pfads:** die zum Abrufen alle kritischen Ressourcen erforderliche Anzahl an Umläufen oder die erforderliche Dauer.
* **Kritische Bytes:** die Anzahl der Bytes, die für das erste Rendern der Seite erforderlich sind, also die Summe der Transfer-Dateigrößen aller kritischen Ressourcen.
Unser erstes Beispiel mit einer einzigen HTML-Seite enthielt eine kritische Ressource, nämlich das HTML-Dokument. Die Länge des kritischen Pfads entsprach einem Netzwerkumlauf, vorausgesetzt, es handelt sich um eine kleine Datei, und die Gesamtzahl der kritischen Bytes belief sich lediglich auf die Transfergröße des HTML-Dokuments selbst.

Vergleichen wir das nun mit den Charakteristiken des kritischen Pfads für das HTML- und CSS-Beispiel oben:

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM - kritischer Rendering-Pfad" class="center">

* **2** kritische Ressourcen
* **2** oder mehr Umläufe als minimale Länge des kritischen Pfads
* **9** KB kritische Bytes

Wir benötigen HTML und CSS, um die Renderstruktur zu erstellen, daher sind beide als kritische Ressourcen einzustufen. CSS wird erst abgerufen, nachdem der Browser das HTML-Dokument erhalten hat, sodass der kritische Pfad aus mindestens zwei Umläufen besteht. Für beide Ressourcen kommen wir auf insgesamt 9 KB kritische Bytes.

Nun bringen wir noch eine zusätzliche JavaScript-Datei ins Spiel!

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

Wir haben `app.js` hinzugefügt, eine externe JavaScript-Ressource auf der Seite, und wie wir jetzt wissen, handelt es sich hierbei um eine Ressource, die den Parser blockiert, also eine kritische Ressource. Schlimmer noch: Zum Ausführen der JavaScript-Datei müssen wir auch das CSSOM blockieren und darauf warten. Noch einmal zur Erinnerung: JavaScript kann das CSSOM abfragen, wodurch der Browser solange pausiert, bis `style.css` heruntergeladen und das CSSOM erstellt wurde.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript - kritischer Rendering-Pfad" class="center">

Wenn wir uns vor diesem Hintergrund den `Netzwerkwasserfall` dieser Seite in der Praxis ansehen, werden Sie feststellen, dass die CSS- und JavaScript-Anforderungen etwa zur gleichen Zeit initiiert werden. Der Browser erhält das HTML-Dokument, findet beide Ressourcen und initiiert beide Anforderungen. Folglich weist die oben stehende Seite im Hinblick auf den kritischen Pfad diese Charakteristiken auf:

* **3** kritische Ressourcen
* **2** oder mehr Umläufe als minimale Länge des kritischen Pfads
* **11** KB kritische Bytes

Nun haben wir drei kritische Ressourcen und insgesamt 11 KB kritische Bytes, während die Länge unseres kritischen Pfads weiterhin zwei Umläufe beträgt, weil CSS und JavaScript parallel übertragen werden können! **Die Charakteristiken unseres kritischen Rendering-Pfads herauszufinden bedeutet, die kritischen Ressourcen identifizieren zu können und zu verstehen, wie der Browser deren Abrufe plant.** Fahren wir mit unserem Beispiel fort...

Bei einem Gespräch mit unseren Website-Entwicklern haben wir herausgefunden, dass der JavaScript-Inhalt, den wir auf unserer Seite eingefügt haben, keine Blockierungsfunktion übernehmen muss: Der darin befindliche Analyse- und sonstige Code erfordert keine Blockierung des Renderings unserer Seite. Vor diesem Hintergrund können wir dem Skript-Tag das Attribut `async` hinzufügen, um die Blockierung des Parsers aufzuheben:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, asynchrones JavaScript - kritischer Rendering-Pfad" class="center">

Ein asynchrones Skript bietet mehrere Vorteile:

* Das Skript blockiert den Parser nicht mehr und ist kein Bestandteil des kritischen Rendering-Pfads.
* Da keine anderen kritischen Skripts vorhanden sind, muss das CSS auch nicht das domContentLoaded-Ereignis blockieren.
* Je eher das domContentLoaded-Ereignis ausgelöst wird, desto eher können andere Anwendungslogiken ausgeführt werden. 

Infolgedessen ist unsere optimierte Seite wieder bei zwei kritischen Ressourcen (HTML und CSS) mit einer minimalen Länge des kritischen Pfads von zwei Umläufen und insgesamt 9 KB kritischen Bytes.

Nehmen wir zuletzt an, das CSS-Stylesheet wurde nur zum Drucken benötigt. Wie würde das aussehen?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, CSS ohne Blockierungsfunktion, asynchrones JavaScript - kritischer Rendering-Pfad" class="center">

Da die Ressource `style.css` nur zum Drucken verwendet wird, muss der Browser diese zum Rendern der Seite nicht blockieren. Somit verfügt der Browser nach Abschluss der DOM-Erstellung über ausreichend Informationen zum Rendern der Seite! Das bedeutet, dass die Seite lediglich eine kritische Ressource (das HTML-Dokument) aufweist und die minimale Länge des kritischen Rendering-Pfads einem Umlauf entspricht.



