---
layout: article
title: "Bilder nach Möglichkeit vermeiden"
description: "Manchmal ist es besser, Bilder gar nicht zu nutzen. Verwenden Sie wann immer möglich die nativen Funktionen des Browsers, um gleiche oder ähnliche Funktionalität bereitzustellen."
introduction: "Manchmal ist es besser, Bilder gar nicht zu nutzen. Verwenden Sie wann immer möglich die nativen Funktionen des Browsers, um gleiche oder ähnliche Funktionalität bereitzustellen.  Browser bieten heute optische Möglichkeiten, für die früher Bilder notwendig gewesen währen. So müssen Browser keine separaten Bilddateien mehr herunterladen und es besteht keine Gefahr, dass falsch skalierte Bilder erscheinen. Symbole können mithilfe von Unicode oder speziellen Symbolschriftarten dargestellt werden."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-06-10
  order: 5
collection: images
key-takeaways:
  avoid-images:
    - Verzichten Sie wann immer möglich auf Bilder und nutzen Sie stattdessen Browserfunktionen für Schatten, Farbverläufe, abgerundete Ecken usw.
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

{% include modules/toc.liquid %}


{% include modules/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Text in Markup statt auf eingebetteten Bildern platzieren

Wann immer möglich sollte Text in Text und nicht in Bilder eingebettet sein, wie etwa bei der Nutzung von Bildern für Titel oder Kontaktinformationen wie Telefonnummern und Adressen. Von Bildern können Nutzer die Informationen nicht kopieren und einfügen, außerdem ist der Text für eine Bildschirmsprachausgabe nicht verfügbar und auch nicht responsiv. Fügen Sie den Text stattdessen in Ihr Markup ein und verwenden Sie bei Bedarf Webschriftarten, um den gewünschten Stil umzusetzen.

## CSS als Bildersatz verwenden

Moderne Browser können auf CSS-Funktionen zurückgreifen, um Stile zu erschaffen, für die zuvor Bilder erforderlich waren. So können mit der <code>background</code>-Eigenschaft komplexe Farbverläufe erstellt und mit der <code>box-shadow</code>-Eigenschaft Schatten und der <code>border-radius</code>-Eigenschaft abgerundete Ecken hinzugefügt werden.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
  
  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>
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

{% include modules/nextarticle.liquid %}

{% endwrap %}

