project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Iets via het netwerk ophalen kost tijd en geld: zoekopdrachten met veel resultaten leveren veel verkeer op tussen client en server, wat vertragingen kan veroorzaken tijdens verwerking in de browser en tevens tot datakosten kan leiden voor gebruikers. Om dit proces te optimaliseren, is het essentieel dat eerder opgehaalde hulpbronnen in het cachegeheugen worden opgeslagen en opnieuw worden gebruikt.


{# wf_updated_on: 2014-01-04 #}
{# wf_published_on: 2013-12-31 #}

# HTTP-caching {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



Iets via het netwerk ophalen kost tijd en geld: zoekopdrachten met veel resultaten leveren veel verkeer op tussen client en server, wat vertragingen kan veroorzaken tijdens verwerking in de browser en tevens tot datakosten kan leiden voor gebruikers. Om dit proces te optimaliseren, is het essentieel dat eerder opgehaalde hulpbronnen in het cachegeheugen worden opgeslagen en opnieuw worden gebruikt.



Elke browser beschikt over een implementatie van een HTTP-cache. We hoeven er alleen voor te zorgen dat elke keer dat een server een antwoord verstuurt, dit de juiste HTTP-header bevat met aanwijzingen over hoe lang de browser het antwoord kan opslaan in het cachegeheugen.

Note: Als u een Webview gebruikt om inhoud van internet in uw applicatie weer te geven, zijn er mogelijk extra configuratiestappen nodig om HTTP-caching in te schakelen, de omvang van het cachegeheugen te bepalen en om in te stellen hoe lang de gegevens worden bewaard. Raadpleeg de documentatie voor het betreffende platform en controleer uw instellingen.

<img src="images/http-request.png" class="center" alt="HTTP-verzoek">

Wanneer de server dit verzoek beantwoordt, stuurt deze tevens een aantal HTTP-headers die informatie bevatten over het type inhoud, de lengte, instructies voor het cachegeheugen, validatietoken en meer. In bovenstaand voorbeeld stuurt de server een antwoord van 1024 bytes, instrueert de client om dit antwoord gedurende 120 seconden in het cachegeheugen op te slaan en verstrekt de server een validatietoken (`x234dff`) dat na vervallen van het antwoord kan worden gebruikt om te controleren of de hulpbron is gewijzigd.


## Antwoorden in het cachegeheugen valideren met ETags

### TL;DR {: .hide-from-toc }
- Validatietoken wordt door de server gecommuniceerd via de HTTP-header ETag
- Validatietoken maakt efficiënte updatecontroles voor hulpbronnen mogelijk: geen gegevensoverdracht wanneer de hulpbron niet is gewijzigd.


Laten we ervan uitgaan dat er 120 seconden zijn verstreken sinds ons eerste verzoek en dat de browser een nieuw verzoek voor dezelfde hulpbron heeft verstuurd. De browser controleert eerst het lokale cachegeheugen en vindt het eerste antwoord. Omdat het antwoord is `vervallen` kan het niet meer worden gebruikt. De browser kan nu een nieuw verzoek versturen en het volledige antwoord ophalen, maar als de hulpbron niet is gewijzigd, is het overbodig om dezelfde bytes die zich in het cachegeheugen bevinden nogmaals te downloaden.

Om dit te voorkomen zijn validatietokens ontworpen. Deze maken deel uit van de ETag-header. De server genereert een willekeurig token, meestal een hash of een andere vingerafdruk van de inhoud van het bestand, en verstuurt deze. Het is voor de client niet van belang hoe de vingerafdruk is gemaakt. De client hoeft deze bij het volgende verzoek slechts te versturen aan de server: als de vingerafdruk dezelfde is, is de hulpbron niet gewijzigd en hoeft het antwoord niet opnieuw te worden gedownload.

<img src="images/http-cache-control.png" class="center" alt="Voorbeeld HTTP Cache-Control">

In bovenstaand voorbeeld verstrekt de client de ETag bij het verzoek automatisch in de HTTP-header `If-None-Match`, vergelijkt de server het token met de huidige hulpbron en stuurt het antwoord `304 Not Modified` terug. Hieruit maakt de browser op dat het antwoord in het cachegeheugen niet is gewijzigd en gedurende 120 seconden vernieuwd kan worden. We hoeven het antwoord nu niet nog eens te downloaden. Dit bespaart tijd en bandbreedte.

Hoe maakt u als webontwikkelaar gebruik van efficiënte revalidatie? De browser doet al het werk voor ons: de browser detecteert automatisch of een validatietoken al eerder is gepecificeerd, koppelt het aan een uitgaand verzoek en werkt de tijdstempels in het cachegeheugen bij op basis van het ontvangen antwoord van de server. **Het enige dat wij nog moeten doen, is garanderen dat de server de benodigde ETags verstrekt. Raadpleeg de serverdocumentatie voor de vereiste configuratiestappen.**

Note: Tip: het project HTML5 Boilerplate bevat <a href='https://github.com/h5bp/server-configs'>voorbeelden van configuratiebestanden</a> voor de meest gebruikte servers met gedetailleerde beschrijvingen voor elke configuratiestap. Zoek de gewenste server op in de lijst en neem de vermelde instellingen over op uw server, zodat deze is geconfigureerd met de aanbevolen instellingen.


## Cache-Control

### TL;DR {: .hide-from-toc }
- Het cachebeleid voor elke hulpbron kan worden ingesteld via de HTTP-header Cache-Control
- De configuratie van Cache-Control bepaalt wie het antwoord van de server kan opslaan in het cachegeheugen, onder welke voorwaarden en hoe lang de gegevens worden bewaard


Het beste verzoek is een verzoek waarvoor niet met de server hoeft te worden gecommuniceerd: een lokaal opgeslagen antwoord voorkomt netwerkvertragingen en datakosten voor de gegevensoverdracht. Om dit te realiseren, staat de HTTP-specificatie toe dat de server [een aantal verschillende Cache-Control-instructies] (http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) terugstuurt die bepalen hoe en hoe lang dit specifieke antwoord door de browser of de tussenopslag in het cachegeheugen mag worden bewaard.

Note: De header Cache-Control is onderdeel van de specificaties voor HTTP/1.1. Deze header vervangt voorgaande headers (bijv. Expires) die worden gebruikt in het cachebeleid voor antwoorden. Alle moderne browsers ondersteunen Cache-Control, dus dit is de enige header die we nodig hebben.

<img src="images/http-cache-control-highlight.png" class="center" alt="Voorbeeld HTTP Cache-Control">

### `no-cache` en `no-store`

`no-cache` geeft aan dat een teruggestuurd antwoord pas kan worden gebruikt voor een volgend verzoek naar dezelfde URL wanneer eerst op de server wordt gecontroleerd of het antwoord is gewijzigd. Wanneer een geschikt validatietoken (ETag) aanwezig is, wordt het antwoord dat zich in het cachegeheugen bevindt vergeleken met de gegevens op de server. De download wordt gestaakt indien het antwoord niet is gewijzigd.

`no-store` werkt een stuk eenvoudiger: de browser en de tussenopslag mogen geen enkele versie van het antwoord opslaan in het cachegeheugen. Dit kan bijvoorbeeld het geval zijn voor een antwoord dat persoonlijke gegevens of bankgegevens bevat. Elke keer dat de gebruiker om dit item verzoekt, wordt een verzoek verstuurd naar de server en wordt opnieuw een volledig antwoord gedownload.

### `public` en `private`

Als een antwoord is gemarkeerd als `public`, kan het worden opgeslagen in het cachegeheugen, zelfs als HTTP-verificatie is vereist en zelfs wanneer de statuscode van het antwoord normaal gsproken niet kan worden opgeslagen in het cachegeheugen. In de meeste gevallen is `public` niet nodig, omdat expliciete cache-informatie (als `max-age`) al aangeeft
dat het antwoord kan worden opgeslagen in het cachegeheugen.

Antwoorden die zijn gemarkeerd als `private` kunnen door de browser worden opgeslagen in het cachegeheugen, maar zijn meestal bedoeld voor een individuele gebruiker en mogen daarom niet door tussenopslag worden opgeslagen. Dit is bijvoorbeeld het geval bij een HTML-pagina met gebruikersinformatie die wel door de browser van de gebruiker kan worden opgeslagen, maar niet door een CDN.

### `max-age`

Dit is een instructie voor de maximale periode in seconden dat het opgehaalde antwoord opnieuw mag worden gebruikt vanaf het moment dat het werd opgevraagd. `max-age=60` geeft bijvoorbeeld aan dat het antwoord gedurende de volgende 60 seconden in het cachegeheugen mag worden opgeslagen en opnieuw mag worden gebruikt.

## Het optimale Cache-Control-beleid bepalen

<img src="images/http-cache-decision-tree.png" class="center" alt="Beslissingenboom cachegeheugen">

Gebruik de bovenstaande beslissingenboom om het optimale cachebeleid voor een bepaalde hulpbron of een verzameling hulpbronnen te bepalen die door uw applicatie wordt of worden gebruikt. De ideale strategie is om zoveel mogelijk antwoorden zo lang mogelijk op de client op te slaan en voor elk antwoord een validatietoken te verstrekken voor efficiënte revalidatie.

<table>
<thead>
  <tr>
    <th width="30%">Cache-Control-instructies</th>
    <th>Uitleg</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="uitleg">Antwoord kan door de browser en de tussenopslag worden opgeslagen (d.w.z. het is `public`) gedurende maximaal 1 dag (60 seconden x 60 minuten x 24 uur)</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="uitleg">Antwoord kan gedurende maximaal 10 minuten (60 seconden x 10 minuten) door de browser van de client worden opgeslagen</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="uitleg">Antwoord mag niet worden opgeslagen en moet bij ieder verzoek opnieuw volledig worden opgehaald.</td>
</tr>
</table>

Volgens HTTP Archive kan voor de 300.000 grootste websites (op basis van de rangschikking door Alexa) [bijna de helft van alle gedownloade antwoorden in het cachegeheugen worden opgeslagen](http://httparchive.org/trends.php#maxage0) door de browser, wat een enorme besparing inhoudt voor herhaaldelijke paginaweergaven en -bezoeken. Dat betekent niet dat 50% van de hulpbronnen op uw applicatie in het cachegeheugen kunnen worden opgeslagen: sommige sites kunnen meer dan 90% van hun hulpbronnen opslaan, andere sites bevatten veel persoonlijke of tijdgevoelige gegevens die helemaal niet kunnen worden opgeslagen.

**Beoordeel welke hulpbronnen op uw pagina`s in het cachegeheugen kunnen worden opgeslagen en controleer of deze correcte Cache-Control- en ETag-headers terugsturen.**


## Antwoorden in het cachegeheugen ongeldig maken en bijwerken

### TL;DR {: .hide-from-toc }
- Lokaal opgeslagen zoekopdrachten worden gebruikt totdat de hulpbron 'vervalt'
- We kunnen een vingerafdruk voor de bestandsinhoud in de URL integreren, waardoor de client wordt gedwongen om het antwoord bij te werken
- Voor optimale resultaten moet voor elke applicatie een eigen cache-hiërarchie worden ingesteld


Alle HTTP-verzoeken door de browser worden eerst naar de cache van de browser doorgestuurd waar gecontroleerd wordt of er een geldig antwoord in het cachegeheugen aanwezig is dat kan worden gebruikt. Als een overeenkomst wordt gevonden, wordt het antwoord uit de cache gelezen, waardoor netwerkvertraging en datakosten voor de gegevensoverdracht worden omzeild. **Wat als we een antwoord in het cachegeheugen willen bijwerken of ongeldig willen maken?**

Laten we er bijvoorbeeld van uitgaan dat we onze bezoekers hebben geïnstrueerd om een CSS-stylesheet gedurende 24 uur (max-age=86400) in het cachegeheugen op te slaan, maar onze ontwikkelaar zojuist een update heeft geüpload die we graag aan alle gebruikers beschikbaar stellen. Hoe stellen we al onze bezoekers ervan op de hoogte dat ze hun oude cachegeheugen van onze CSS dienen bij te werken? Het is een strikvraag: dat is niet mogelijk, ten minste niet zonder de URL van de hulpbron te wijzigen.

Wanneer het antwoord door de browser in het cachegeheugen is opgeslagen, wordt deze opgeslagen versie gebruikt tot deze niet meer actueel is op basis van max-age of vervalt, of tot deze om een andere reden uit het cachegeheugen wordt verwijderd, bijvoorbeeld wanneer de gebruiker het cachegeheugen van de browser wist. Hierdoor kan het voorkomen dat verschillende gebruikers verschillende versies van het bestand gebruiken: gebruikers die de hulpbron net hebben opgevraagd, beschikken over de nieuwste versie, terwijl gebruikers die het antwoord eerder hebben opgehaald een oudere (maar nog steeds geldige) versie gebruiken.

**Hoe krijgen we het beste van beide kanten: opslaan in het cachegeheugen bij de client en snelle updates?** We kunnen eenvoudigweg de URL van de hulpbron wijzigen en de gebruiker dwingen om het nieuwe antwoord te downloaden indien de inhoud is gewijzigd. Dit wordt meestal bereikt door een vingerafdruk van het bestand of een versienummer in de bestandsnaam te integreren, bijvoorbeeld:**x234dff**.css.

<img src="images/http-cache-hierarchy.png" class="center" alt="Cache-hiërarchie">

Aangezien we afzonderlijk cachebeleid voor elke hulpbron kunnen instellen, kunnen we cache-hiërarchieën instellen waardoor we niet alleen kunnen bepalen hoe lang gegevens voor elke hulpbron mogen worden opgeslagen, maar ook hoe snel nieuwe versies zichtbaar zijn voor bezoekers. Laten we bovenstaand voorbeeld analyseren:

* De HTML is gemarkeerd als `no-cache`, wat betekent dat de browser het document bij elk verzoek opnieuw valideert en de nieuwste versie van de inhoud downloadt indien deze is gewijzigd. Daarnaast integreren we in de HTML vingerafdrukken in de URL`s voor CSS- en JavaScript-items: als de inhoud van deze bestanden wordt gewijzigd, wordt ook de HTML van de pagina gewijzigd en wordt een nieuwe versie van het HTML-antwoord gedownload.
* De CSS mag door browsers en tussenopslag (bijv. een CDN) in het cachegeheugen worden opgeslagen en vervalt na 1 jaar. We kunnen voor de markering `far future expires` 1 jaar gebruiken, omdat we de vingerafdruk in de bestandsnaam integreren: als de CSS wordt bijgewerkt, wordt ook de URL gewijzigd.
* Het JavaScript vervalt ook na 1 jaar, maar is gemarkeerd als `private`, bijvoorbeeld omdat het om persoonlijke gebruikersgegevens gaat die niet door de CDN mogen worden opgeslagen.
* De afbeelding wordt zonder versienummer of vingerafdruk in het cachegeheugen opgeslagen en vervalt na 1 dag.

Dankzij de combinatie van ETag, Cache-Control en unieke URL`s kunnen we de beste aspecten combineren: lange vervalperiodes, controle over de locatie waar het antwoord kan worden opgeslagen en snelle updates.

## Cache-checklist

Er bestaat geen cachebeleid dat in alle gevallen het beste is. U moet voor elke hulpbron de juiste instellingen en de algehele cache-hiërarchie bepalen aan de hand van uw verkeerspatronen, het type gegevens dat wordt verstuurd en vereisten voor behoud van de actualiteit van de gegevens.

Enkele tips en technieken waarmee u rekening kunt houden wanneer u uw cachestrategie bepaalt:

1. **Gebruik consistente URL`s:** als u op verschillende URL`s dezelfde inhoud beheert, wordt deze inhoud meermaals opgehaald en opgeslagen. Tip: [URL`s zijn hoofdlettergevoelig](http://www.w3.org/TR/WD-html40-970708/htmlweb.html){: .external }.
2. **Zorg ervoor dat de server een validatietoken (ETag) vertrekt:** dankzij validatietokens hoeven dezelfde bytes niet opnieuw te worden verstuurd indien een hulpbron niet is gewijzigd op de server.
3. **Bepaal welke hulpbronnen door tussenopslag kunnen worden opgeslagen:** hulpbronnen met antwoorden die hetzelfde zijn voor alle gebruikers kunnen worden opgeslagen door een CDN of andere tussenopslag.
4. **Bepaal de optimale cacheperiode voor elke hulpbron:** deze kan voor elke hulpbron anders zijn. Controleer en bepaal de juiste `max-age` voor elke hulpbron.
5. **Bepaal de beste cache-hiërarchie voor uw site:** dankzij de combinatie van hulpbron-URL`s met vingerafdrukken van de inhoud en korte of `no-cache` periodes voor HTML-documenten kunt u beheren hoe snel de client over updates kan beschikken.
6. **Beperk overbodig downloaden tot een minimum:** sommige hulpbronnen worden vaker bijgewerkt dan andere. Wanneer een bepaald onderdeel van een hulpbron (bijv. JavaScript-functionaliteit of SCC-stylesheets) vaak worden bijgewerkt, kunt u ervoor kiezen die specifieke code apart te leveren. Hierdoor kan de rest van de inhoud (bijv. bibliotheekcode die slechts zelden wordt gewijzigd) uit het cachegeheugen worden opgehaald en beperkt u de hoeveelheid gedownloade inhoud wanneer een update wordt opgehaald.




