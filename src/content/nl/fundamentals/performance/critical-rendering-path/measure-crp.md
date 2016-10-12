project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Als het niet meetbaar is, kan het ook niet geoptimaliseerd worden. Gelukkig geeft de Navigation Timing API ons alle nodige hulpmiddelen om elke stap van het kritieke weergavepad te meten.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Het kritieke weergavepad meten met navigatietiming {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Als het niet meetbaar is, kan het ook niet geoptimaliseerd worden. Gelukkig geeft de Navigation Timing API ons alle nodige hulpmiddelen om elke stap van het kritieke weergavepad te meten.


### TL;DR {: .hide-from-toc }
- Navigation Timing biedt gedetailleerde tijdstempels voor het meten van het CRP (Critical Rendering Pad, kritieke weergavepad).
- De browser zendt een aantal bruikbare gebeurtenissen uit waarin de verschillende fasen van het CRP worden vastgelegd.


De basis van elke steekhoudende prestatiestrategie is een degelijke meting en goede apparatuur. En dat is precies wat de Navigation Timing API biedt.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

Elk label in het bovenstaande diagram komt overeen met een gedetailleerd tijdstempel dat de browser bijhoudt voor elke pagina die wordt geladen. In dit specifieke geval laten we maar een klein gedeelte zien van alle verschillende tijdstempels: we slaan voor nu alle netwerkgerelateerde tijdstempels over, maar we zullen hier in een latere les op terugkomen.

Dus, wat betekenen deze tijdstempels?

* **domLoading:** dit is de starttijdstempel van het gehele proces, de browser begint met het parseren van de eerste ontvangen bytes van het HTML-
  document.
* **domInteractive:** dit markeert het punt waarop de browser klaar is met het parseren van het volledige HTML-document en de DOM-opbouw is voltooid.
* **domContentLoaded:** dit markeert het punt waarop zowel de DOM-opbouw klaar is en er geen stijlbladen meer zijn die de JavaScript-uitvoer blokkeren. Dat betekent dat we nu (in principe) de weergaveboomstructuur kunnen opbouwen.
    * Veel JavaScript-frameworks wachten op deze gebeurtenis voordat de eigen logistiek wordt uitgevoerd. Daarom legt de browser de tijdstempels _EventStart_ en _EventEnd_ vast zodat wij kunnen volgen hoe lang het uitvoeren van deze taak duurde.
* **domComplete:** zoals de naam al aangeeft, betekent dit tijdstempel dat de volledige verwerking voltooid is en dat alle bronnen op de pagina (afbeeldingen, enzovoort) zijn gedownload, dat wil zeggen dat de laadspinner is gestopt met spinnen.
* **loadEvent:** de laatste stap bij het laden van elke pagina is dat de browser de gebeurtenis `onload` lanceert. Deze gebeurtenis kan aanvullende app-logistiek activeren.

De HTML-specificatie geeft bepaalde voorwaarden voor elke gebeurtenis: wanneer de gebeurtenis moet worden gelanceerd, aan welke voorwaarden moet worden voldaan, enzovoort. Voor ons doeleinde zullen we ons richten op een paar belangrijke punten in verband met het kritieke weergavepad:

* **domInteractive** markeert wanneer de DOM-opbouw klaar is.
* **domContentLoaded** markeert gewoonlijk wanneer [zowel de DOM- als de CSSOM-opbouw klaar zijn](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/){: .external }.
    * Als er geen parserblokkerend JavaScript bestaat, wordt _DOMContentLoaded_ direct na _domInteractive_ gelanceerd.
* **domComplete** markeert wanneer de pagina, inclusief alle subbronnen, klaar is.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full"   adjust_indentation="auto" %}
</pre>

Het bovenstaande voorbeeld lijkt op het eerste gezicht een behoorlijke uitdaging, maar in werkelijkheid is het vrij simpel. De Navigation Timing API legt alle relevante tijdstempels vast en onze code wacht gewoon tot de gebeurtenis `onload` wordt gelanceerd (onthoud dat de gebeurtenis `onload` na domInteractive, domContentLoaded en domComplete wordt gelanceerd). Daarnaast berekent de Navigation Timing API het verschil tussen de verschillende tijdstempels.
<img src="images/device-navtiming-small.png" class="center" alt="Demonstratie van NavTiming">

We beschikken nu over een aantal specifieke punten om te volgen en over een eenvoudige functie om deze berekeningen uit te voeren. Onthoud dat u in plaats van de code af te drukken deze ook kunt aanpassen zodat de metingen naar een analyseserver worden gestuurd ([Google Analytics doet dit automatisch](https://support.google.com/analytics/answer/1205784){: .external }). Dit is een goede manier om de prestaties van uw pagina's bij te houden en mogelijke pagina's te identificeren waarvoor optimalisatie voordelig zou kunnen zijn.



