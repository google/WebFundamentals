---
title: "Bilder nach Möglichkeit vermeiden"
description: "Manchmal ist es besser, Bilder gar nicht zu nutzen. Verwenden Sie wann immer möglich die nativen Funktionen des Browsers, um gleiche oder ähnliche Funktionalität bereitzustellen."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - "Verzichten Sie wann immer möglich auf Bilder und nutzen Sie stattdessen Browserfunktionen für Schatten, Farbverläufe, abgerundete Ecken usw."
---

<p class="intro">
  Manchmal ist es besser, Bilder gar nicht zu nutzen. Verwenden Sie wann immer möglich die nativen Funktionen des Browsers, um gleiche oder ähnliche Funktionalität bereitzustellen.  Browser bieten heute optische Möglichkeiten, für die früher Bilder notwendig gewesen währen. So müssen Browser keine separaten Bilddateien mehr herunterladen und es besteht keine Gefahr, dass falsch skalierte Bilder erscheinen. Symbole können mithilfe von Unicode oder speziellen Symbolschriftarten dargestellt werden.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Text in Markup statt auf eingebetteten Bildern platzieren

Wann immer möglich sollte Text in Text und nicht in Bilder eingebettet sein, wie etwa bei der Nutzung von Bildern für Titel oder Kontaktinformationen wie Telefonnummern und Adressen. Von Bildern können Nutzer die Informationen nicht kopieren und einfügen, außerdem ist der Text für eine Bildschirmsprachausgabe nicht verfügbar und auch nicht responsiv. Fügen Sie den Text stattdessen in Ihr Markup ein und verwenden Sie bei Bedarf Webschriftarten, um den gewünschten Stil umzusetzen.

## CSS als Bildersatz verwenden

Moderne Browser können auf CSS-Funktionen zurückgreifen, um Stile zu erschaffen, für die zuvor Bilder erforderlich waren. So können mit der <code>background</code>-Eigenschaft komplexe Farbverläufe erstellt und mit der <code>box-shadow</code>-Eigenschaft Schatten und der <code>border-radius</code>-Eigenschaft abgerundete Ecken hinzugefügt werden.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Beachten Sie, dass bei diesen Verfahren Renderingzyklen anfallen, deren Berechnung für Mobilgeräte ein Problem darstellen kann. Bei einer übermäßigen Inanspruchnahme gehen die Vorteile verloren und die Leistung wird möglicherweise zusätzlich beeinträchtigt.



