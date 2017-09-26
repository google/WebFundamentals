project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: De CSSOM- en DOM-boomstructuren worden gecombineerd in een weergaveboomstructuur. Deze nieuwe structuur wordt vervolgens gebruikt om de opmaak van elk zichtbaar element te berekenen en biedt invoer voor het kleurproces waarbij pixels op het scherm worden weergegeven. Het is cruciaal om elk van deze stappen te optimaliseren voor een optimale weergaveprestatie.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# De opbouw van de weergaveboomstructuur, de opmaak en het kleuren {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


De CSSOM- en DOM-boomstructuren worden gecombineerd in een weergaveboomstructuur. Deze nieuwe structuur wordt vervolgens gebruikt om de opmaak van elk zichtbaar element te berekenen en biedt invoer voor het kleurproces waarbij pixels op het scherm worden weergegeven. Het is cruciaal om elk van deze stappen te optimaliseren voor een optimale weergaveprestatie.


In het vorige gedeelte over het opbouwen van het objectmodel hebben we de DOM- en de CSSOM-boomstructuren opgebouwd op basis van de HTML- en CSS-invoer. Maar beide structuren zijn onafhankelijke objecten die de verschillende aspecten van het document vastleggen: de een beschrijft de inhoud en de ander de stijlregels die moeten worden toegepast op het document. Hoe brengen we deze twee structuren samen en zorgen we dat de browser pixels op het scherm weergeeft?

### TL;DR {: .hide-from-toc }
- De DOM- en CSSOM-boomstructuren worden gecombineerd om de weergaveboomstructuur op te bouwen.
- De weergaveboomstructuur bevat alleen nodes die nodig zijn om de pagina weer te geven.
- De opmaak berekent de precieze positie en grootte van elk object.
- Het kleuren is de laatste stap waarbij de weergaveboomstructuur wordt gebruikt. Bij deze stap worden de pixels op het scherm weergegeven.


De eerste stap is dat de browser het DOM en CSSOM in een 'weergaveboomstructuur' combineert. Hierin wordt alle zichtbare DOM-inhoud en alle CSSOM-stijlinformatie voor elke node vastgelegd.

<img src="images/render-tree-construction.png" alt="DOM en CSSOM worden gecombineerd om de weergaveboomstructuur te maken" class="center">

Kort gezegd doet de browser het volgende om de weergaveboomstructuur op te bouwen:

1. Elke zichtbare node wordt nagelopen vanaf de root van de DOM-boomstructuur.
  * Bepaalde nodes zijn helemaal niet zichtbaar (bijvoorbeeld scripttags, metatags, enzovoort) en worden weggelaten aangezien deze niet worden afgebeeld in de weergegeven uitvoer.
  * Bepaalde nodes zijn verborgen via CSS en worden ook weggelaten uit de weergaveboomstructuur. De span-node in het bovenstaande voorbeeld wordt bijvoorbeeld weggelaten uit de weergaveboomstructuur, omdat er een expliciete regel is die de eigenschap 'display: none' op deze node instelt.
1. Voor elke zichtbare node worden de van toepassing zijnde CSSOM-regels gezocht en deze regels worden toegepast.
2. Zichtbare nodes met inhoud en de berekende stijlen worden uitgezonden.

Note: Een kleine kanttekening: Let op dat 'visibility: hidden' niet hetzelfde is als 'display: none'. Het eerste zorgt ervoor dat het element onzichtbaar is, maar het element neemt nog altijd ruimte in de opmaak in (dat wil zeggen dat dit wordt weergegeven als een leeg vak), terwijl het laatste (display: none) het element volledig uit de weergaveboomstructuur verwijderd, waardoor het element onzichtbaar is en geen deel uitmaakt van de opmaak.

De uiteindelijke uitvoer is een weergaveboomstructuur die zowel de inhoud als de stijlinformatie voor alle zichtbare inhoud op het scherm bevat. We zijn er nog niet helemaal, maar het begint er al op te lijken.  **Wanneer de weergaveboomstructuur af is, kunnen we verder gaan met de 'opmaak'-fase.**

Tot nu toe hebben we berekend welke nodes en de bijbehorende berekende stijlen zichtbaar moeten zijn, maar we hebben de exacte positie en grootte binnen de [viewport](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) van het apparaat niet berekend. Dit is de 'opmaak'-fase, ook wel bekend als de 'reflow'.

De browser begint aan de root van de weergaveboomstructuur en loopt de hele structuur af om de geometrie van elk object op de pagina te berekenen om de precieze grootte en positie ervan uit te zoeken. Laten we een eenvoudig praktijkvoorbeeld bekijken:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

De body van de pagina hierboven bevat twee geneste div-elementen: de eerste (ouder-)div stelt de weergavegrootte van de node in op 50% van de viewportbreedte en de tweede div die door de ouder wordt omvat, stelt de breedte in op 50% van de breedte van de ouder, dat wil zeggen 25% van de viewportbreedte.

<img src="images/layout-viewport.png" alt="Opmaakinformatie berekenen" class="center">

De uitvoer van het opmaakproces is een 'vakmodel' waarin de exacte positie en afmeting van elk element in de viewport wordt vastgelegd: alle relatieve afmetingen worden geconverteerd naar absolute pixelposities op het scherm, enzovoort.

Nu we weten welke nodes zichtbaar zijn en de bijbehorende berekende stijlen en de geometrie kennen, kan deze informatie tot slot worden doorgeven aan de laatste fase waarin elke node in de weergaveboomstructuur wordt geconverteerd naar pixels op het scherm. Deze laatste stap wordt vaak 'kleuren' of 'rasteren' genoemd.

Heeft u dit allemaal kunnen volgen? Voor elke stap moest de browser een flinke hoeveelheid werk verzetten. Dit betekent ook dat het behoorlijk wat tijd kan kosten. Gelukkig kan Chrome DevTools ons helpen bepaalde inzichten te verkrijgen in alle drie de fasen die we zojuist hebben beschreven. Laten we de opmaakfase voor ons oorspronkelijke 'hallo wereld'-voorbeeld bekijken:

<img src="images/layout-timeline.png" alt="De opmaak meten in DevTools" class="center">

* De opbouw van de weergaveboomstructuur en de berekening van de positie en grootte worden vastgelegd in de gebeurtenis 'Layout' (Opmaak) in de Timeline (Tijdlijn).
* Zodra de opmaak is voltooid, geeft de browser de gebeurtenissen 'Paint setup' (Instelling kleuren) en 'Paint' (Schilderen) vrij waardoor de weergaveboomstructuur wordt geconverteerd naar pixels op het scherm.

De tijd die nodig is voor de opbouw van de weergaveboomstructuur, de opmaak en het kleuren kan verschillen op basis van de grootte van het document, de toegepaste stijlen en natuurlijk het apparaat waarop de pagina wordt weergegeven: hoe groter het document, hoe meer de browser moet doen; hoe ingewikkelder de stijlen, hoe meer tijd wordt ingenomen door het kleuren (een massieve kleur is eenvoudig te kleuren, maar een klein beetje schaduw is veel 'zwaarder' te berekenen en weer te geven).

Maar na dit hele proces is onze pagina eindelijk zichtbaar in de viewport.

<img src="images/device-dom-small.png" alt="Weergegeven pagina Hallo wereld" class="center">

Laten we nog een korte samenvatting maken van alle stappen die de browser heeft genomen:

1. De HTML verwerken en de DOM-boomstructuur opbouwen.
2. Het CSS verwerken en de CSSOM-boomstructuur opbouwen.
3. Het DOM en CSSOM combineren in een weergaveboomstructuur.
4. De opmaak uitvoeren op de weergaveboomstructuur om de geometrie voor elke node te berekenen.
5. De individuele nodes op het scherm kleuren.

Onze voorbeeldpagina ziet er misschien eenvoudig uit, maar het kost nog behoorlijk wat werk. Wilt u een gokje wagen wat er gebeurt wanneer het DOM of CSSOM wordt aangepast? We zouden het gehele proces opnieuw moeten doorlopen om uit te zoeken welke pixels opnieuw moeten worden weergegeven op het scherm.

**Het optimaliseren van het kritieke weergavepad bestaat uit het minimaliseren van de totale tijd die wordt gebruikt om stap 1 tot en met 5 in de bovenstaande volgorde uit te voeren.** Door dit proces kunnen we inhoud zo snel mogelijk op het scherm weergeven en de hoeveelheid tijd tussen schermupdates na de initiële weergave ook verminderen. Dit laatste betekent een hogere vernieuwingssnelheid behalen voor interactieve inhoud.



