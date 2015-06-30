---
layout: article
title: "Het gebruik van afbeeldingen geheel vermijden"
description: "Soms is de beste afbeelding geen afbeelding. Gebruik waar mogelijk de systeemeigen mogelijkheden van de browser om dezelfde of gelijkwaardige functionaliteit te verkrijgen."
introduction: "Soms is de beste afbeelding geen afbeelding. Gebruik waar mogelijk de systeemeigen mogelijkheden van de browser om dezelfde of gelijkwaardige functionaliteit te verkrijgen.  Browsers genereren visuele elementen waarvoor vroeger afbeeldingen vereist waren. Dit betekent dat browsers geen afzonderlijke afbeeldingsbestanden meer hoeven te downloaden, waardoor onhandig geschaalde afbeeldingen worden voorkomen. Pictogrammen kunnen worden weergegeven met behulp van unicode of met lettertypen die speciaal voor pictogrammen zijn ontwikkeld."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-06-10
  order: 5
collection: images
key-takeaways:
  avoid-images:
    - Vermijd waar mogelijk het gebruik van afbeeldingen. Benut liever de mogelijkheden die de browser biedt voor het maken van schaduwen, kleurovergangen, afgeronde hoeken, enzovoort.
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

## Plaats tekst in markeringen, in plaats van ingesloten in afbeeldingen

Tekst moet zoveel mogelijk tekst zijn en niet zijn ingesloten in afbeeldingen, bijvoorbeeld afbeeldingen gebruiken als koptekst of het plaatsen van contactgegevens zoals telefoonnummers en adressen direct in de afbeelding. Hierdoor kunnen mensen de informatie niet kopiëren en plakken, is de informatie niet toegankelijk voor schermlezers en is deze ook niet responsief. Plaats de tekst liever in uw markeringen en gebruik eventueel weblettertypen om de gewenste stijl te verkrijgen.

## CSS gebruiken in plaats van afbeeldingen

Moderne browsers kunnen gebruikmaken van CSS-functies voor het maken van stijlen waarvoor vroeger afbeeldingen vereist waren. Zo kunnen complexe kleurovergangen worden gemaakt met de eigenschap <code>background</code>, schaduwen met <code>box-shadow</code> en afgeronde hoeken kunnen worden toegevoegd met de eigenschap <code>border-radius</code>.

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

Houd er rekening mee dat het weergeven van cycli vereist is voor het gebruik van deze technieken, en dat kan belastend zijn voor een mobiele telefoon. Als u dit te vaak doet, kunnen eventuele positieve effecten verdwijnen en de prestaties achteruitgaan.

{% include modules/nextarticle.liquid %}

{% endwrap %}

