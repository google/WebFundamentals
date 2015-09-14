---
title: "Objektmodell erstellen"
description: "Bevor der Browser Inhalte auf dem Bildschirm darstellen kann, müssen die DOM- und CSSOM-Baumstrukturen erstellt werden. Deshalb sind sowohl die HTML- als auch die CSS-Elemente dem Browser unverzüglich zur Verfügung zu stellen."
updated_on: 2014-09-12
key-takeaways:
  Objektmodell erstellen:
    - "Bytes → Zeichen → Token → Knoten → Objektmodell"
    - "Das HTML-Markup wird in ein Document Object Model (DOM), das CSS-Markup in ein CSS Object Model (CSSOM) umgewandelt."
    - "DOM und CSSOM sind unabhängige Datenstrukturen."
    - "Chrome DevTools Timeline ermöglicht die Erfassung und Kontrolle der Erstellungs- und Verarbeitungskosten von DOM und CSSOM."
notes:
  devtools:
    - "Wir gehen davon aus, dass Sie mit den Chrome DevTools grundlegend vertraut sind, d. h., Sie wissen, wie eine Netzwerkkaskade erfasst oder eine Zeitleiste aufgezeichnet wird. Wenn Sie eine Auffrischung benötigen, lesen Sie die <a href='https://developer.chrome.com/devtools'>Chrome DevTools-Dokumentation</a>. Sollten Sie sich erstmalig mit DevTools befassen, empfehlen wir den Codeschool-Kurs <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> (DevTools entdecken)."
---
<p class="intro">
  Bevor der Browser die Seite darstellen kann, müssen die DOM- und CSSOM-Baumstrukturen erstellt werden. Deshalb sind sowohl die HTML- als auch die CSS-Elemente dem Browser unverzüglich zur Verfügung zu stellen.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## Document Object Model (DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code src=_code/basic_dom.html snippet=full %}

Beginnen wir mit dem einfachsten Fall: eine reine HTML-Seite mit Text und einem Bild. Was benötigt der Browser, um diese einfache Seite zu verarbeiten?

<img src="images/full-process.png" alt="DOM-Erstellung">

1. **Konvertierung:** Der Browser liest die Rohbytes des HTML-Codes von der Festplatte oder aus dem Netzwerk ein und übersetzt diese basierend auf der angegebenen Dateicodierung, z. B. UTF-8, in einzelne Zeichen.
1. **Tokenisierung:** Der Browser konvertiert Zeichenfolgen in eindeutige Token, die vom [W3C HTML5-Standard](http://www.w3.org/TR/html5/) vorgegeben sind, z. B. `<html>`, `<body>` und andere Strings in `spitzen Klammern`. Jedes Token hat eine spezielle Bedeutung und mehrere Regeln.
1. **Lexing:** Die ausgegebenen Token werden in Objekte umgewandelt, die ihre Eigenschaften und Regeln festlegen.
1. **DOM-Erstellung:** Weil das HTML-Markup Beziehungen zwischen unterschiedlichen Tags definiert (manche Tags sind in anderen Tags enthalten), werden die erstellten Objekte in einer Baumstruktur verknüpft, die die hierarchischen Beziehungen berücksichtigt, die im ursprünglichen Markup vorgegeben sind: _HTML_ object ist _body_ object übergeordnet, _body_ ist _paragraph_ object übergeordnet und so weiter.

<img src="images/dom-tree.png" class="center" alt="DOM-Baumstruktur">

**Das finale Ergebnis des gesamten Vorgangs ist das Document Object Model (`DOM`) unserer einfachen Seite, das der Browser für die gesamte weitere Verarbeitung der Seite nutzt.**

Jedes Mal, wenn der Browser HTML-Markup verarbeiten muss, sind alle obigen Schritte zu durchlaufen: Bytes in Zeichen konvertieren, Token bestimmen, Token in Knoten umwandeln und die DOM-Baumstruktur erstellen. Der ganze Prozess kann einige Zeit in Anspruch nehmen, insbesondere wenn viel HTML-Code zu verarbeiten ist.

<img src="images/dom-timeline.png" class="center" alt="DOM-Erstellung in DevTools verfolgen">

{% include shared/remember.liquid title="Note" list=page.notes.devtools %}

Wenn Sie Chrome DevTools öffnen und eine Zeitleiste aufzeichnen, während eine Seite geladen wird, können Sie die Zeit sehen, die für die Durchführung dieses Schritts benötigt wird. Im obigen Beispiel dauerte es circa 5 ms, um eine Anzahl von HTML-Bytes in eine DOM-Baumstruktur umzuwandeln. Wenn die Seite größer ist, was in der Regel zutrifft, kann dieser Vorgang erheblich länger dauern. In den nächsten Abschnitten über die Erstellung flüssiger Animationen werden Sie feststellen, wie leicht die Verarbeitung großer HTML-Mengen durch den Browser zu Engpässen führen kann.

Verfügen wir nach Fertigstellung der DOM-Baumstruktur über genügend Informationen, um die Seite auf dem Bildschirm darzustellen? Noch nicht! Die DOM-Baumstruktur enthält zwar die Eigenschaften und Beziehungen des Dokumenten-Markups, sagt jedoch nichts darüber aus, wie das Element auf dem Bildschirm aussehen soll. Das ist die Aufgabe des CSSOM, das wir als Nächstes in Angriff nehmen!

## CSS Object Model (CSSOM)

Bei der Erstellung des DOM unserer einfachen Seite im Browser wurde ein Link-Tag im Kopfteil des Dokuments festgestellt, das auf ein externes CSS-Stylesheet verwies: style.css. In der Annahme, dass diese Ressource zur Darstellung der Seite benötigt wird, wurde diese Ressource umgehend angefordert und mit dem folgenden Inhalt zurückgesendet:

{% include_code src=_code/style.css snippet=full lang=css %}

Natürlich hätten wir unsere Styles direkt im HTML-Markup (inline) deklarieren können, aber wenn unser CSS unabhängig von HTML bleibt, ist es möglich, die Inhalte und das Layout getrennt zu behandeln und die Grafiker können am CSS arbeiten, die Entwickler sich auf HTML konzentrieren und so weiter.

Wie bei HTML müssen die empfangenen CSS-Regeln in ein Format umgewandelt werden, das im Browser verarbeitet werden kann. Der Prozess ähnelt sehr der Vorgehensweise bei HTML:

<img src="images/cssom-construction.png" class="center" alt="CSSOM-Erstellung">

Die CSS-Bytes werden in Zeichen konvertiert, dann in Token und Knoten und schließlich in einer Baumstruktur verknüpft, die als `CSS Object Model` oder abgekürzt CSSOM bezeichnet wird:

<img src="images/cssom-tree.png" class="center" alt="CSSOM-Baumstruktur">

Warum besitzt das CSSOM eine Baumstruktur? Bei der Berechnung der finalen Styles für die einzelnen Objekte auf der Seite beginnt der Browser mit der allgemeinsten Regel, die auf diesen Knoten anzuwenden ist, z. B. gelten für das untergeordnete Element eines body-Elements alle body-Styles. Anschließend werden die berechneten Styles rekursiv verfeinert, indem spezifischere Regeln angewendet werden, d. h., die Regeln werden nachrangig abgearbeitet.

Betrachten Sie zur Verdeutlichung die obige CSSOM-Baumstruktur. Sämtlicher Text innerhalb von _span_ tag, der im body-Element platziert wird, besitzt eine Schriftgröße von 16 Pixeln und ist rot, weil die Anweisung für die Schriftgröße für den Textkörper (body) und somit auch für das nachrangige span-Tag gilt. Wenn ein span-Tag jedoch einem Absatz-Tag (p) untergeordnet ist, dann wird sein Inhalt nicht angezeigt.

Beachten Sie auch, dass die obige CSSOM-Baumstruktur nicht vollständig ist und nur die Styles aufweist, die wir in unserem Stylesheet überschreiben wollten. Jeder Browser stellt eine Reihe von Standard-Styles bereit, die als `User Agent Styles` bezeichnet und dargestellt werden, wenn wir keine eigenen vorgeben. Mit unseren Styles werden diese Standard-Styles, z. B. [Standard-IE-Styles](http://www.iecss.com/) überschrieben. Wenn Sie sich jemals die `computed Styles` in Chrome DevTools angesehen und sich gewundert haben, wo all diese Styles herkommen, wissen Sie jetzt Bescheid!

Sind Sie neugierig, wie lange die CSS-Verarbeitung gedauert hat? Zeichnen Sie eine Zeitleiste in DevTools auf und suchen Sie das Ereignis `Recalculate Style` (Style neu berechnen): Im Gegensatz zum DOM-Parsing enthält die Zeitleiste keinen Eintrag `Parse CSS` (CSS parsen) und erfasst stattdessen das Parsing und die Erstellung der CSSOM-Baumstruktur sowie die rekursive Berechnung der `computed` (berechneten) Styles im Rahmen dieses einen Ereignisses.

<img src="images/cssom-timeline.png" class="center" alt="CSSOM-Erstellung in DevTools verfolgen">

Die Verarbeitung unseres trivialen Stylesheets dauert ca. 0,6 ms und es wirkt sich auf 8 Elemente auf der Seite aus – nicht viel, aber auch nicht völlig unbedeutend. Wo kommen eigentlich die 8 Elemente her? CSSOM und DOM sind unabhängige Datenstrukturen! Der Browser blendet also einen wichtigen Schritt aus. Als Nächstes wollen wir uns mit der Rendering-Baumstruktur befassen, die das DOM und das CSSOM miteinander verknüpft.



