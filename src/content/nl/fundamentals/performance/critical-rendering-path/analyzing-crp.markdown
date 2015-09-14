---
title: "Het kritieke weergavepad analyseren"
description: "Het identificeren en oplossen van knelpunten in de prestatie van het kritieke weergavepad vereist een goede kennis van de gebruikelijke struikelblokken. Laten we een praktijkgerichte rondleiding nemen en de gebruikelijke prestatiepatronen eruit lichten waarmee u uw pagina's kunt optimaliseren."
updated_on: 2014-04-28
---

<p class="intro">
  Het identificeren en oplossen van knelpunten in de prestatie van het kritieke weergavepad vereist een goede kennis van de gebruikelijke struikelblokken. Laten we een praktijkgerichte rondleiding nemen en de gebruikelijke prestatiepatronen eruit lichten waarmee u uw pagina's kunt optimaliseren.
</p>


{% include shared/toc.liquid %}

Het doel van het kritieke weergavepad optimaliseren is om de browser de mogelijkheid te bieden de pagina zo snel mogelijk te kleuren: snellere pagina`s zorgen voor grotere betrokkenheid, meer bekeken pagina`s en [verbeterde conversie] (http://www.google.com/think/multiscreen/success.html). Daarom willen we de tijd die een bezoeker naar een blanco scherm moet staren minimaliseren door een optimalisatie van welke bronnen worden geladen en in welke volgorde.

Ter illustratie van dit proces zullen we beginnen met het meest eenvoudige voorbeeld en zullen we onze pagina`s incrementeel opbouwen en extra bronnen, stijlen en app-structuur toevoegen. We zullen in dit proces ook zien waar het verkeerd kan gaan en hoe we elk van deze gevallen kunnen optimaliseren.

Tot slot nog één ding voordat we van start gaan... Tot nu toe hebben we ons enkel gericht op wat er in de browser gebeurt wanneer de bron (CSS-, JS- of HTML-bestand) beschikbaar is voor verwerking. We hebben de tijd die nodig is om deze bestanden op te halen van het cache of netwerk genegeerd. In de volgende les zullen we gedetailleerd ingaan op hoe we het netwerkaspect van onze app kunnen optimaliseren, maar ondertussen (om alles realistischer te maken) zullen we van het volgende uitgaan:

* Een netwerkroundtrip (propogatievertraging) naar de server kost 100 ms
* De serverresponstijd is 100 ms voor het HTML-document en 10 ms voor alle andere bestanden

## De Hallo wereld-ervaring

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

We beginnen met basis HTML-opmaak en een enkele afbeelding, geen CSS of JavaScript. Dit is het meest eenvoudige voorbeeld. Laten we nu de `Network timeline` (Netwerktijdlijn) openen in Chrome DevTools en de volgende bronwaterval bekijken:

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

Zoals verwacht kost het ongeveer 200 ms voordat het HTML-bestand is gedownload. Het transparante gedeelte van de blauwe lijn geeft de tijd aan die de browser heeft gewacht op het netwerk, dat wil zeggen dat er nog geen responsbytes zijn ontvangen. Het vaste gedeelte geeft de tijd aan die nodig is om de download te voltooien nadat de eerste responsbytes zijn ontvangen. In ons bovenstaande voorbeeld is de HTML-download minuscuul (<4 K), dus is er maar één roundtrip nodig om het volledige bestand op te halen. Daarom duurt het ongeveer 200 ms om het bestand op te halen, waarvan de helft van de tijd is gewacht op het netwerk en de andere helft op de serverrespons.

Zodra de HTML-inhoud beschikbaar wordt, moet de browser de bytes parseren, omzetten in tokens en de DOM-boomstructuur opbouwen. Merk hierbij op dat Chrome DevTools heel handig de tijd weergeeft die de gebeurtenis DOMContentLoaded onderaan nodig heeft (216 ms). Dit komt ook overeen met de blauwe verticale lijn. Het gat tussen het einde van de HTML-download en de blauwe verticale lijn (DOMContentLoaded) staat voor de tijd die de browser nodig had om de DOM-boomstructuur te bouwen, in dit geval slecht een paar milliseconden.

Let tot slot nog op iets interessants: onze `awesome-foto` heeft de gebeurtenis DOMContentloaded niet geblokkeerd. Het blijkt dus dat we de weergaveboomstructuur kunnen opbouwen en zelfs de pagina kunnen kleuren zonder dat er hoeft te worden gewacht op elk item van de pagina: **niet alle bronnen zijn essentieel om de snelle eerste weergave te bieden**. Wanneer we praten over het kritieke weergavepad, hebben we het normaal gesproken over de HTML-opmaak, CSS en JavaScript. Afbeeldingen blokkeren de initiële weergave van de pagina niet, hoewel we natuurlijk wel moeten zorgen dat de afbeeldingen ook zo snel mogelijk worden weergegeven.

De gebeurtenis `load` (ook bekend als `onload`) wordt geblokkeerd bij de afbeelding: DevTools geeft de `onload`-gebeurtenis aan op 335 ms. Misschien herinnert u zich nog de `onload`-gebeurtenis het punt markeert waarop **alle bronnen** die de pagina nodig heeft, zijn gedownload en verwerkt. Dit is het punt waarop de laadspinner kan stoppen met draaien en dit punt is gemarkeerd met de rode verticale lijn in de waterval.


## JavaScript en CSS toevoegen aan de mix

Onze pagina `Hallo Wereld-ervaring` ziet er misschien eenvoudig uit aan de oppervlakte, maar voordat de pagina wordt weergeven, worden er een heleboel stappen uitgevoerd die u niet kunt zien. In de praktijk hebben we ook meer nodig dan alleen de HTML: het is waarschijnlijk dat we een CCS-stijldocument en één of meer scripts hebben om enige interactie aan onze pagina toe te voegen. Laten beide aan de mix toevoegen en kijken wat er gebeurt:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Voor het toevoegen van JavaScript en CSS:_

<img src="images/waterfall-dom.png" alt="DOM CRP" class="center">

_Met JavaScript en CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Het toevoegen van externe CSS- en JavaScript-bestanden heeft ook twee extra aanvragen aan onze waterval toegevoegd. Deze zijn ongeveer tegelijkertijd door de browser verzonden. Dus tot zover gaat het goed. **Let er hierbij wel op dat er nu een veel kleiner tijdsverschil zit tussen de DOMContentLoaded en de 'onload'-gebeurtenissen. Wat is er gebeurd?**

* Anders dan bij ons eenvoudige HTML-voorbeeld moet nu ook het CSS-bestand worden opgehaald en geparseerd om het CSSOM op te bouwen, en we weten dat we zowel het DOM als het CSSOM nodig hebben om de weergaveboomstructuur op te bouwen.
* Omdat we ook een parserblokkerend JavaScript-bestand in onze pagina hebben staan, wordt de gebeurtenis DOMContentLoaded geblokkeerd totdat het CSS-bestand is gedownload en geparseerd: het JavaScript kan het CSSOM opvragen, dus moet de opbouw worden geblokkeerd en wordt er gewacht op het CSS-bestand totdat we het JavaScript kunnen uitvoeren.

**Wat gebeurt er als we ons externe script vervangen met een inline script?** Een onbenullige vraag zo op het eerste gezicht, maar het is eigenlijk een netelige situatie. Zelfs wanneer het script als inline script direct in de pagina wordt toegevoegd, is de enige betrouwbare manier waarop de browser kan weten wat de bedoeling van het script is, het script alsnog uit te voeren en zoals we inmiddels weten, kunnen we dat niet doen totdat het CSSOM is opgebouwd.  Kortom, inline JavaScript is ook parserblokkerend.

Zal het inline script, ondanks de blokkering op CSS, zorgen dat de pagina sneller wordt weergegeven? Het laatste scenario was al ingewikkeld, maar dit scenario is zelfs nog erger. Laten kijken wat er gebeurt...

_Externe JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Inline JavaScript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM en inline JS" class="center">

Er wordt één aanvraag minder gedaan, maar onze `onload`- en `DOMContentLoaded`-tijden zijn in feite gelijk. Waarom is dat? Nou, zoals we weten, maakt het niet uit of het JavaScript inline of extern is, omdat de browser, zodra deze browser bij de scripttag aankomt, blokkeert en wacht totdat het CSSOM is opgebouwd. Daarnaast worden CSS en JavaScript in ons eerste voorbeeld parallel gedownload door de browser en is deze download ongeveer tegelijkertijd voltooid. Het resultaat is dat een inline JavaScript-code in dit geval niet veel helpt. Dus, zitten we nu vast en is er niets wat wij kunnen doen om onze pagina sneller te laten weergeven? Nee, we hebben verschillende strategieën tot onze beschikking.

Bedenk ten eerste dat alle inline scripts parserblokkerend zijn, maar dat we voor externe scripts het sleutelwoord `async` kunnen zetten om de parser te deblokkeren. Laten we het inline script eruit halen en dit eens proberen:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_Parserblokkerend (extern) JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Asynchroon (extern) JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, asynchroon JS" class="center">

Dat is veel beter. De gebeurtenis domContentLoaded begint kort nadat de HTML is geparseerd: de browser weet dat deze het JavaScript niet moet blokkeren en aangezien er geen andere parserblokkerende scripts zijn, kan de CSSOM-opbouw ook parallel plaatsvinden.

Er is ook nog een andere aanpak die we kunnen proberen: zowel CCS als JavaScript inline toevoegen:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, inline CSS, inline JS" class="center">

Merk hier op dat de tijd voor _domContentLoaded_ vrijwel hetzelfde is als in het vorige voorbeeld: in plaats van ons JavaScript als asynchroon te markeren, hebben we zowel het CSS als JS inline aan de pagina zelf toegevoegd. Hierdoor is onze HTML-pagina veel groter geworden, maar het voordeel is dat browser niet hoeft te wachten totdat een externe bron is opgehaald, alles staat al klaar in de pagina.

Zoals u ziet, is het optimaliseren van het kritieke weergavepad geen sinecure, zelfs met een zeer eenvoudige pagina. We moeten het afhankelijkheidsschema begrijpen tussen de verschillende bronnen, we moeten identificeren welke bronnen `kritiek` zijn en we moeten een keuze maken uit verschillende strategieën om deze bronnen aan de pagina toe te voegen. Er is geen eenduidige oplossing voor dit probleem: elke pagina is anders en u zult zelf een vergelijkbaar proces moeten doorlopen om uw eigen optimale strategie te ontdekken.

Laten we nu kijken of we een stap terug kunnen nemen en een aantal algemene prestatiepatronen kunnen identificeren...


## Prestatiepatronen

De meest eenvoudige pagina bestaat enkel uit HTML-opmaak: geen CSS, geen JavaScript of andere soorten bronnen. Om deze pagina weer te geven moet de browser de aanvraag starten, wachten tot het HTML-bestand binnenkomt, dit parseren, het DOM opbouwen en tot slot de pagina weergeven op het scherm:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="Hallo wereld CRP" class="center">

**De tijd tussen T<sub>0</sub> en T<sub>1</sub> legt de netwerk- en serververwerkingstijden vast.** In het beste geval (als het HTML-bestand klein is) hebben we slechts één netwerkroundtrip nodig om het volledige document op te halen. Vanwege de manier waarop TCP-transportprotocols werken, kunnen voor grotere bestanden meerdere roundtrips nodig zijn. Dit is een onderwerp waar we in een latere les op terug zullen komen. **Daarom kunnen we zeggen dat de pagina hierboven, in het beste geval één roundtrip (minimum) kritiek weergavepad heeft.**

Laten we nu dezelfde pagina bekijken, maar met een extern CSS-bestand:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

Op deze manier hebben we weer een netwerkroundtrip nodig om het HTML-document op te halen en vervolgens vertelt de opgehaalde opmaak ons dat we ook het CSS-bestand nodig hebben: dit betekent dat de browsers terug naar de server moet gaan en het CSS moet ophalen voordat de pagina op het scherm kan worden weergegeven. **Het gevolg is dat de pagina minimaal twee roundtrips nodig heeft voordat deze kan worden weergegeven.** Hier geldt weer dat het CSS-bestand meerdere roundtrips nodig kan hebben, vandaar met nadruk op `minimaal`.

Laten we de termen definiëren die we gebruiken om het kritieke weergavepad te beschrijven:

* **Kritieke bron:** bron die de initiële weergave van de pagina kan blokkeren.
* **Kritieke padlengte:** aantal roundtrips of de totale tijd die vereist is om alle kritieke bronnen op te halen.
* **Kritieke bytes:** totaal aantal bytes dat vereist is om een eerste weergave van de pagina te krijgen, dit betekent de som van de grootte van alle opgehaalde bestanden voor alle kritieke bronnen.
Ons eerste voorbeeld met een enkele HTML-pagina bevat een enkele kritieke bron (het HTML-bestand), de kritieke padlengte was ook gelijk aan één netwerkroundtrip (waarbij we aannemen dat het bestand klein is) en het totale aantal kritieke bytes was alleen de overdrachtsgrootte van het HTML-document zelf.

Laten we dit vergelijken met de kritieke padkenmerken van het HTML- en CSS-voorbeeld hierboven:

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

* **2** kritieke bronnen
* **2** of meer roundtrips voor de minimale lengte voor het kritieke pad
* **9** KB aan kritieke bytes

We hebben zowel de HTML als het CSS nodig om de weergaveboomstructuur op te bouwen. Daarom zijn zowel de HTML als het CSS kritieke bronnen. Het CSS wordt opgehaald nadat de browser het HTML-document heeft opgehaald. Hierdoor is de kritieke padlengte minimaal twee roundtrips. Deze twee bronnen bevatten samen totaal 9 KB aan kritieke bytes.

Laten we nu een extra JavaScript-bestand aan de mix toevoegen.

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

We hebben app.js toegevoegd. Dit is een extern JavaScript-item op de pagina en zoals we weten, is dit een parserblokkerende (dat wil zeggen kritieke) bron. Het is zelfs nog erger: om het JavaScript-bestand uit te voeren, wordt het proces weer geblokkeerd terwijl we wachten op het CSSOM. Onthoud dat JavaScript het CSSOM kan aanvragen en dat de browser daarom pauzeert totdat `style.css` is gedownload en het CSSOM is opgebouwd.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript CRP" class="center">

Als we in de praktijk kijken naar de `netwerkwaterval` van deze pagina, ziet u dat zowel de CSS- als de JavaScript-aanvragen op ongeveer dezelfde tijd worden geïnitieerd: de browser haalt de HTML op, ontdekt beide bronnen en initieert beide aanvragen. De pagina hierboven heeft daarom de volgende kritieke padkenmerken:

* **3** kritieke bronnen
* **2** of meer roundtrips voor de minimale lengte voor het kritieke pad
* **11** KB aan kritieke bytes

We hebben nu drie kritieke bronnen die in het totaal 11 KB aan kritieke bytes opleveren, maar onze kritieke padlengte is nog altijd twee roundtrips omdat het CSS en het JavaScript parallel kunnen worden overdragen. **Het uitpluizen van de kenmerken van uw kritieke weergavepad betekent dat u kunt identificeren wat kritieke bronnen zijn en ook begrijpt hoe de browser het ophalen hiervan inplant.** Laten we verder gaan met ons voorbeeld...

Na het gesprek met de site-ontwikkelaars begrepen we dat het JavaScript dat we aan onze pagina hebben toegevoegd, niet blokkerend hoeft te zijn: we hebben een aantal analyses en andere code tot onze beschikking die de weergave van onze pagina helemaal niet hoeven te blokkeren. Nu we dit weten, kunnen we het kenmerk 'async' aan de scripttag toevoegen om de parser te deblokkeren:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, asynchroon JavaScript CRP" class="center">

Het script asynchroon maken heeft een aantal voordelen:

* Het script is niet langer parserblokkerend en is ook geen onderdeel van het kritieke weergavepad
* Omdat er geen andere kritieke scripts zijn, hoeft het CSS de gebeurtenis `domContentLoaded` niet te blokkeren
* Hoe sneller de gebeurtenis domContentLoaded wordt gestart, hoe eerder de overige app-logistiek kan worden uitgevoerd

Hierdoor heeft onze geoptimaliseerde pagina opnieuw maar twee kritieke bronnen (HTLM en CSS) met een kritieke padlengte van minimaal twee roundtrips en totaal 9 KB aan kritieke bytes.

Laten we tot slot zeggen dat het CSS-stijlblad alleen nodig was voor het afdrukken. Wat zou dat betekenen?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, niet-blokkerende CSS en asynchroon JavaScript CRP" class="center">

Omdat de bron style.css alleen gebruikt wordt voor afdrukken, hoeft de browser hierbij niet te blokkeren om de pagina weer te geven. Daarom heeft de browser zodra de DOM-opbouw voltooid is, voldoende informatie om de pagina weer te geven. De pagina heeft hierdoor maar één kritieke bron (het HTML-document) en de minimale kritieke padlengte is één roundtrip.



