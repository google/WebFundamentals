project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Voordat de inhoud op het scherm kan worden weergegeven, moet de browser de DOM- en CSSOM-boomstructuren opbouwen. Daarom moeten we ervoor zorgen dat zowel de HTML als het CSS zo snel mogelijk aan de browser worden geleverd.


{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# Het Objectmodel opbouwen {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Voordat de inhoud op het scherm kan worden weergegeven, moet de browser de DOM- en CSSOM-boomstructuren opbouwen. Daarom moeten we ervoor zorgen dat zowel de HTML als het CSS zo snel mogelijk aan de browser worden geleverd.



### TL;DR {: .hide-from-toc }
- Bytes → tekens → tokens → nodes → objectmodel.
- HTML-opmaak wordt verwerkt in een Documentobjectmodel (DOM), CSS-opmaak wordt verwerkt in een CSS-objectmodel (CSSOM).
- DOM en CSSOM zijn onafhankelijke gegevensstructuren.
- De Timeline (Tijdlijn) in Chrome DevTools biedt ons de mogelijkheid om de opbouw en verwerking van het DOM en CCSOM vast te leggen en te controleren.


## Documentobjectmodel (DOM)


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Laten we beginnen met het meest eenvoudige geval: een platte HTML-pagina met een beetje tekst en één afbeelding. Wat heeft de browser nodig om deze eenvoudige pagina te verwerken?

<img src="images/full-process.png" alt="DOM-opbouwproces">

1. **Conversie:** de browser leest de onbewerkte bytes van de HTML van de schijf of van het netwerk en vertaalt deze naar individuele tekens op basis van de codering die in het bestand wordt opgegeven (bijvoorbeeld UTF-8).
1. **Tokens maken:** de browser converteert tekenstrings naar specifieke tokens, zoals deze door de [W3C HTML5-standaard](http://www.w3.org/TR/html5/){: .external } worden voorgeschreven (bijvoorbeeld `<html>`, `<body>` en andere strings in `punthaken`). Elke token heeft een speciale betekenis en een eigen set met regels.
1. **Lexeren:** de ontstane tokens worden geconverteerd in `objecten` waarmee de eigenschappen en regels worden gedefinieerd.
1. **DOM-opbouw:** omdat de HTML-opmaak de relatie tussen de verschillende tags (bepaalde tags staan binnen andere tags) definieert, worden tot slot de gemaakte objecten aan elkaar verbonden in een boomstructuur waarin ook de ouder-kindrelatie van de oorspronkelijke opmaak wordt gedefinieerd: het object _HTML_ is een ouder van het object _body_, _body_ is een ouder van het object _paragraph_ enzovoorts.

<img src="images/dom-tree.png" class="center" alt="DOM-boomstructuur">

**De uiteindelijke uitvoer van dit hele proces is het Documentobjectmodel of het `DOM` van onze eenvoudige pagina. De browser gebruikt deze structuur voor alle verdere verwerking van de pagina.**

Elke keer dat een browser de HTML-opmaak moet verwerken, moet deze alle bovenstaande stappen doorlopen: bytes converteren naar tekens, tokens identificeren, tokens converteren naar nodes en de DOM-boomstructuur opbouwen. Dit volledige proces kan even duren, helemaal wanneer er een grote hoeveelheid HTML moet worden verwerkt.

<img src="images/dom-timeline.png" class="center" alt="DOM-opbouw volgen in DevTools">

Note: We gaan ervan uit dat u beschikt over de basisvaardigheden voor Chrome DevTools, dat wil zeggen dat u weet hoe u een netwerkwaterval moet vastleggen of een tijdlijn moet opnemen. Als u uw kennis snel wilt opfrissen, kunt u de cursus <a href='https://developer.chrome.com/devtools'>Chrome DevTools documentation</a>, or if you're new to DevTools, we recommend taking the Codeschool <a href='http://discover-devtools.codeschool.com/'>Chrome DevTools ontdekken</a> bekijken.

Als u Chrome DevTools opent en een tijdlijn opneemt terwijl de pagina wordt geladen, kunt u de werkelijke tijd zien die nodig is om deze stap uit te voeren: in het bovenstaande voorbeeld kostte het ongeveer 5 ms om een stuk HTML-bytes te converteren naar een DOM-boomstructuur. Als de pagina natuurlijk groter was geweest, zoals de meeste pagina`s zijn, kan dit proces aanzienlijk langer duren. In de volgende onderdelen zult u zien hoe u vloeiendere animaties kunt maken, aangezien dit al snel een knelpunt kan worden wanneer de browser grote hoeveelheden HTML moet verwerken.

Hebben we genoeg informatie om de pagina op het scherm weer te geven wanneer de DOM-boomstructuur klaar is? Nog niet. De DOM-boomstructuur legt de eigenschappen en relaties van de documentopmaak vast, maar het zegt niets over hoe de elementen eruit moeten komen te zien wanneer deze worden weergegeven. Dat is de verantwoordelijkheid van het CSSOM. Dit onderwerp gaan we nu behandelen.

## CSS-objectmodel (CSSOM)

Terwijl de browser de DOM-boomstructuur van onze eenvoudige pagina heeft opgebouwd, kwam deze een linktag in het hoofdgedeelte van het document tegen, die verwees naar een extern CSS-stijlblad: style.css. De browser ging ervan uit dat deze bron nodig was om de pagina weer te geven en heeft daarom gelijk een aanvraag voor dit document uitgezonden. Deze aanvraag kwam met de volgende inhoud terug:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

We hadden onze stijlen direct in de HTML-opmaak (inline) kunnen opgeven, maar door het CSS onafhankelijk van de HTML te houden, kunnen we de inhoud en het ontwerp als afzonderlijke taken behandelen: ontwerpers kunnen werken aan het CSS en ontwikkelaars kunnen zich richten op de HTML.

Net als bij de HTML moeten de ontvangen CSS-regels worden geconverteerd in iets waarmee de browser kan werken. Daarom wordt een vergelijkbaar proces als het HTML-proces herhaald:

<img src="images/cssom-construction.png" class="center" alt="Stappen van de CSSOM-opbouw">

De CSS-bytes worden geconverteerd in tekens, vervolgens in tokens en nodes en tot slot verbonden in een boomstructuur die het `CSS-objectmodel` of CSSOM in het kort wordt genoemd:

<img src="images/cssom-tree.png" class="center" alt="CSSOM-boomstructuur">

Waarom heeft het CSSOM een boomstructuur? Wanneer de uiteindelijk set met stijlen voor elk object van de pagina wordt berekend, start de browser met de meest algemene, van toepassing zijnde regel op die node (bijvoorbeeld als het een kind van het body-element is, gelden alle stijlen van het body-element). De berekende stijlen worden vervolgens recursief verfijnd door steeds meer specifieke regels toe te passen, dat wil zeggen de regels worden trapsgewijs toegepast.

Bekijk de CSSOM-boomstructuur hierboven voor een concreet voorbeeld. Alle tekst binnen de tag _span_ die binnen het body-element wordt geplaatst, heeft een lettertypegrootte van 16 pixels en heeft rode tekst: de richtlijn voor de lettertypegrootte wordt vanaf de body trapsgewijs toegepast tot de span-tag. Als een span-tag echter het kind is van een paragraaftag (p), wordt de inhoud ervan niet weergegeven.

Merk ook op dat de bovenstaande boomstructuur niet de gehele CSSOM-boomstructuur is en alleen de stijlen weergeeft die we hebben overschreven in ons stijlblad. Elke browser levert een standaardset met stijlen. Dit wordt het `stijlblad gebruikersagent` (user agent style sheet) genoemd. Dit zijn de stijlen die u ziet wanneer u geen eigen stijlblad opgeeft. Onze eigen stijlen overschrijven gewoon deze standaardstijlen (bijvoorbeeld [standaard IE-stijlen](http://www.iecss.com/){: .external }). Heeft u ooit de `computed styles` (berekende stijlen) in Chrome DevTools bekeken en u afgevraagd waar al deze stijlen vandaan komen? Dat weet u dan nu.

Bent u ook nieuwsgierig hoe lang de verwerking van het CSS duurde? Neem een tijdlijn op in Chrome DevTools en zoek de gebeurtenis `Recalculate Style` (Stijl herberekenen): anders dan bij DOM-parsering geeft de tijdlijn geen aparte invoer `Parse CSS` (CSS parseren), maar legt de tijdlijn parseren en opbouwen van de CSSOM-boomstructuur, plus de recursieve berekening van de berekende stijlen onder deze enkele gebeurtenis vast.

<img src="images/cssom-timeline.png" class="center" alt="CSSOM-opbouw volgen in DevTools">

0ns eenvoudige stijlblad kostte ongeveer 0,6 ms om te verwerken en had invloed op acht elementen op de pagina. Dat is misschien niet veel, maar het is ook niet niets. Maar waar komen de acht elementen vandaan? De CSSOM- en de DOM-boomstructuren zijn onafhankelijke gegevensstructuren. Het blijkt dus dat de browser een belangrijke stap verbergt. In het volgende gedeelte gaan we het hebben over de weergaveboomstructuur waardoor de DOM- en CSSOM-boomstructuur samen worden gekoppeld.



