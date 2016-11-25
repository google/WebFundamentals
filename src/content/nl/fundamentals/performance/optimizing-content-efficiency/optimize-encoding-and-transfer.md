project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Nadat we alle overbodige hulpbronnen hebben verwijderd, moeten we de totale omvang reduceren van de resterende hulpbronnen die de browser moet downloaden. We moeten deze dus comprimeren met behulp van specifieke en algemene (GZip) algoritmen.


{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# Codering en omvang van tekstitems optimaliseren {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Onze internetapplicaties krijgen een steeds groter bereik, grotere ambities en meer functies, en dat is goed. Met een steeds rijker internet ontstaat echter ook een andere trend: de hoeveelheid gegevens die door elke app wordt gedownload, wordt almaar groter. Om geweldige inhoud te kunnen blijven leveren, moeten we elke byte optimaliseren.



## Gegevenscompressie 

Nadat we alle overbodige hulpbronnen hebben verwijderd, moeten we de totale omvang reduceren van de hulpbronnen die de browser moet downloaden. We moeten deze comprimeren. Er staan ons verschillende methoden ter beschikking, afhankelijk van het type hulpbron - tekst, afbeeldingen, lettertypen, enzovoort. Er zijn universele tools die op de server kunnen worden ingeschakeld, optimalisatiemethoden vóór de verwerking van specifieke inhoudstypen en hulpbronspecifieke optimalisatiemethoden waarvoor input van de ontwikkelaar nodig is.

Het beste resultaat bereiken we door al deze methoden te combineren.

### TL;DR {: .hide-from-toc }
- Compressie is de codering van informatie waardoor minder bits nodig zijn
- Het beste resultaat krijgen we altijd door overbodige gegevens te verwijderen
- Er bestaan veel verschillende compressiemethoden en -algoritmen
- U heeft verschillende methoden nodig om de beste compressie te behalen


`Gegevenscompressie` is het terugbrengen van de gegevensomvang en hier is veel onderzoek aan gewijd. Veel mensen hebben hun hele carrière gewerkt aan oplossingen met algoritmen, technieken en optimalisatiemethoden om het compressiepercentage, de snelheid en het benodigde geheugen van verschillende compressors te verbeteren. We zullen in dit onderwerp niet ingaan op de gehele discussie over gegevenscompressie, maar het is wel belangrijk om te weten hoe compressie werkt en welke methoden we kunnen gebruiken om de omvang van verschillende items op onze pagina's te reduceren.

We zullen de basisprincipes van deze methoden illustreren aan de hand van een verzonnen tekstbericht:

    # Hieronder staat een geheim bericht, dat bestaat uit een set headers
    # in een indeling met sleutelwaarden, gevolgd door een regelovergang en het versleutelde bericht.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. Berichten kunnen willekeurige annotaties bevatten, die worden aageduid met het voorvoegsel `#`. Annotaties hebben geen invloed op de betekenis of andere gedragingen van het bericht.
2. Berichten kunnen `headers` bevatten. Dit zijn paren van sleutelwaarden (gescheiden door `:`) die aan het begin van het bericht worden getoond.
3. Berichten bevatten tekst-payloads.

Wat kunnen we doen om de omvang van het bovenstaande bericht van 200 tekens te reduceren?

1. Het commentaar is interessant, maar is niet van invloed op de betekenis van het bericht. We verwijderen de opmerking daarom wanneer we het bericht versturen.
2. Er bestaan waarschijnlijk handige methoden om de headers op efficiënte wijze te coderen. We weten bijvoorbeeld niet of alle berichten altijd `indeling` en `datum` bevatten, maar als dat zo is, kunnen we die converteren naar korte integer-ID's en hoeven we alleen deze ID's te versturen. Aangezien we niet zeker weten of dit het geval is, laten we het voorlopig buiten beschouwing.
3. De payload bestaat volledig uit tekst en hoewel we niet weten wat de daadwerkelijke inhoud is (er wordt een `geheim bericht` gebruikt), kunnen we uit de tekst zo al opmaken dat deze veel overbodige elementen bevat. Misschien hoeven we dezelfde brieven niet steeds opnieuw te sturen, maar kunnen we het aantal herhaalde brieven tellen en deze efficiënter coderen?
    * Bijv. `AAA` wordt `3A` - of, opeenvolging van drie A's.


Als we onze methoden combineren, krijgen we het volgende resultaat:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

Het nieuwe bericht heeft 56 tekens, wat betekent dat we het oorspronkelijke bericht met 72% hebben gecomprimeerd. Niet slecht, en dat is pas onze eerste stap!

U vraagt zich misschien af wat we hieraan hebben voor optimalisatie van onze internetpagina's. We gaan waarschijnlijk niet onze eigen compressie-algoritmen ontwerpen. Nee, we zullen niet onze eigen algoritmen ontwikkelen, maar we gaan wel dezelfde technieken en methoden gebruiken voor de optimalisatie van verschillende hulpbronnen op onze pagina`s: voorverwerking, inhoudspecifieke optimalisate en verschillende algoritmen voor verschillende inhoud.


## Verkleinen: voorverwerking en inhoudspecifieke optimalisatie

### TL;DR {: .hide-from-toc }
- Met optimalisatie die op de inhoud is aangepast, kunt u de omvang van geleverde hulpbronnen aanzienlijk terugbrengen
- Inhoudspecifieke optimalisatie kunt u het beste tijdens de samenstelling/publicatie van de hulpbron toepassen


De beste manier om overbodige of dubbele gegevens te comprimeren, is deze in zijn geheel te verwijderen. We kunnen natuurlijk niet zomaar willekeurige gegevens verwijderen, maar in sommige contexten beschikken we over kennis van de gegevensindeling en de eigenschappen en is het vaak mogelijk om de omvang van de payload aanzienlijk te reduceren, zonder de de betekenis negatief te beïnvloeden.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Kijk eens naar de eenvoudige HTML-pagina hierboven en de drie verschillende inhoudstypen die op de pagina voorkomen: HTML-opmaak, CSS-stijlen en JavaScript. Elk van deze inhoudstypen heeft andere regels die bepalen wat geldige HTML-opmaak is, CSS-regels of JavaScript-inhoud, regels voor het aanduiden van commentaar, enzovoort. Hoe kunnen we omvang van deze pagina reduceren?

* Commentaar in code is nuttig voor ontwikkelaars, maar hoeven niet in de browser te worden weergegeven. Als u de CSS (`/* ... */`), HTML (`<!-- ... -->`) en JavaScript (`// ...`) commentaren verwijdert, kunt u de totale omvang van de pagina aanzienlijk terugbrengen.
* Een `slimme` CSS-compressor kan detecteren dat we een inefficiënte manier gebruiken om regels te definiëren voor `.awesome-container` en kan de twee termen samenvoegen zonder overige stijlen te beïnvloeden. Hierdoor worden nog meer bytes bespaard.
* Whitespace (spaties en tabs) is een programmeertaal die kan worden gebruikt in HTML, CSS en JavaScript. Met een extra compressor kunnen alle tabs en spaties worden verwijderd.

^
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Onze pagina wordt na bovenstaande stappen teruggebracht van 406 naar 150 tekens - een besparing van 63%. Het resultaat is niet erg leesbaar, maar dat is ook niet nodig: we kunnen de oorspronkelijke pagina houden als onze `ontwikkelaarsversie` en vervolgens bovenstaande stappen toepassen waneer we de pagina willen publiceren op onze website.

Dit voorbeeld toont aan dat een universele compressor, bijv. een die is ontwikkeld om willekeurige tekst te comprimeren, bovenstaande pagina waarschijnlijk ook best goed kan comprimeren, maar deze zou niet het commentaar kunnen verwijderen, de CSS-regels kunnen samenvoegen, naast tientallen andere inhoudspecifieke optimalisaties. Hierom is voorverwerking, verkleining en contextspecifieke optimalisatie zo nuttig.

Note: De ongecomprimeerde ontwikkelaarsversie van de JQuery-bibliotheek neemt op dit moment ongeveer 300 KB in beslag. De verkleinde versie van dezelfde bibliotheek (zonder commentaar, enzovoort) is ongeveer 3x zo klein: 100 KB.

Bovenstaande technieken kunnen op meer dan alleen tekstitems worden toegepast. Afbeeldingen, video en andere inhoudstypen bevatten allemaal hun eigen vorm van metadata en payloads. Wanneer u bijvoorbeeld een foto maakt met een camera, wordt er naast de foto ook veel extra informatie opgeslagen: camera-instelling, locatie, enzovoort. Deze gegevens kunnen, afhankelijk van uw applicatie, belangrijk zijn (bijv. voor het delen van foto's op een website), of overbodig. Het is aan u om te bepalen of het de moeite waard is deze gegevens te verwijderen. De metadata kunnen in de praktijk neerkomen op tientallen kilobytes per foto.

Inventariseer daarom als eerste stap voor de optimalisatie van de efficiëntie van uw items de verschillende inhoudstypen die u gebruikt en bedenk welke inhoudspecifieke optimalisatie u kunt toepassen om de omvang te reduceren. Dit kan u aanzienlijke besparingen opleveren. Wanneer u de optimalisatiemethoden heeft bepaald, kunt u deze automatiseren door ze toe te voegen tijdens de samenstelling en publicatie van de inhoud. Dit is de enige manier waarop u kunt garanderen dat de optimalisaties consequent worden toegepast.

## Tekstcompressie met GZIP

### TL;DR {: .hide-from-toc }
- GZIP werkt het beste met tekstitems: CSS, JavaScript, HTML
- Alle moderne browsers ondersteunen GZIP-compressie en passen deze standaard toe
- GZIP moet zijn ingeschakeld in de configuratie van uw server
- Voor sommige CDN's zijn speciale stappen nodig om GZIP in te schakelen


[GZIP](http://nl.wikipedia.org/wiki/Gzip){: .external } is een universele compressor die op elke verzameling bytes kan worden toegepast. Deze compressor onthoudt bekende inhoud en probeert op efficiënte manier dubbele gegevens te vinden en te vervangen. Bekijk voor een [goede basisuitleg van GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). In de praktijk werkt GZIP het beste met tekstinhoud, waarbij voor grotere bestanden compressiepercentages van 70-90% worden behaald. Als u GZIP toepast op items die al gecomprimeerd zijn met andere algoritmen (bijv. de meeste afbeeldingen) levert dit weinig tot geen verbetering op.

Alle moderne browser ondersteunen GZIP en gebruiken deze compressor standaard voor alle HTTP-verzoeken: het is aan ons om ervoor te zorgen dat de server juist is geconfigureerd, zodat de gecomprimeerde hulpbron aangeboden kan worden wanneer de client erom vraagt.


<table>
<thead>
  <tr>
    <th>Bibliotheek</th>
    <th>Omvang</th>
    <th>Gecomprimeerde omvang</th>
    <th>Compressiepercentage</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="bibliotheek">jquery-1.11.0.js</td>
  <td data-th="omvang">276 KB</td>
  <td data-th="gecomprimeerd">82 KB</td>
  <td data-th="besparing">70%</td>
</tr>
<tr>
  <td data-th="bibliotheek">jquery-1.11.0.min.js</td>
  <td data-th="omvang">94 KB</td>
  <td data-th="gecomprimeerd">33 KB</td>
  <td data-th="besparing">65%</td>
</tr>
<tr>
  <td data-th="bibliotheek">angular-1.2.15.js</td>
  <td data-th="omvang">729 KB</td>
  <td data-th="gecomprimeerd">182 KB</td>
  <td data-th="besparing">75%</td>
</tr>
<tr>
  <td data-th="bibliotheek">angular-1.2.15.min.js</td>
  <td data-th="omvang">101 KB</td>
  <td data-th="gecomprimeerd">37 KB</td>
  <td data-th="besparing">63%</td>
</tr>
<tr>
  <td data-th="bibliotheek">bootstrap-3.1.1.css</td>
  <td data-th="omvang">118 KB</td>
  <td data-th="gecomprimeerd">18 KB</td>
  <td data-th="besparing">85%</td>
</tr>
<tr>
  <td data-th="bibliotheek">bootstrap-3.1.1.min.css</td>
  <td data-th="omvang">98 KB</td>
  <td data-th="gecomprimeerd">17 KB</td>
  <td data-th="besparing">83%</td>
</tr>
<tr>
  <td data-th="bibliotheek">foundation-5.css</td>
  <td data-th="omvang">186 KB</td>
  <td data-th="gecomprimeerd">22 KB</td>
  <td data-th="besparing">88%</td>
</tr>
<tr>
  <td data-th="bibliotheek">foundation-5.min.css</td>
  <td data-th="omvang">146 KB</td>
  <td data-th="gecomprimeerd">18 KB</td>
  <td data-th="besparing">88%</td>
</tr>
</tbody>
</table>

Bovenstaande tabel toont voor enkele van de populairste JavaScript-bibliotheken en CSS-frameworks aan hoeveel u met GZIP-compressie kunt besparen. De besparingen lopen uiteen van 60 tot 88% en met de combinatie van verkleinde bestanden (aangeduid met `min.` in de bestandsnaam) en GZIP kunt u nog meer bytes besparen.

1. **Voer eerst inhoudspecifieke optimalisatiestappen uit: CSS, JS en HTML-verkleiners.**
2. **Gebruik GZIP om de verkleinde output te comprimeren.**

GZIP is een van de eenvoudigste en effectiefste optimalisatiemiddelen, maar er zijn nog steeds veel mensen die dit vergeten te implementeren. De meeste servers comprimeren inhoud voor u, en u hoeft er meestal alleen voor te zorgen dat de server zo is configureerd dat deze alle inhoudstypen comprimeert die geschikt zijn voor compressie met GZIP.

Wat is de beste configuratie voor uw server? Het project HTML5 Boilerplate bevat [voorbeelden van configuratiebestanden](https://github.com/h5bp/server-configs){: .external } voor de meest gebruikte servers met gedetailleerde beschrijvingen voor elke configuratiestap. Zoek de gewenste server op in de lijst, zoek naar de sectie over GZIP en neem de vermelde instellingen over op uw server, zodat deze is geconfigureerd met de aanbevolen instellingen.

<img src="images/transfer-vs-actual-size.png" class="center" alt="DevTools-demo van daadwerkelijke grootte tegenover overdrachtsgrootte">

Een snelle en eenvoudige manier om GZIP in actie te zien, is door Chrome DevTools te openen en de kolom `Size` / `Content` te inspecteren in het netwerkpaneel; onder `Size` vindt u de overdrachtsgrootte van het item en onder `Content` vindt u de ongecomprimeerde grootte van het item. Voor het HTML-item in bovenstaand voorbeeld bespaarde GZIP tijdens de overdracht 24,8 KB.

Note: Er zijn gevallen waar GZIP de omvang van het item kan doen toenemen. Dit komt meestal voor wanneer het item erg klein is en het overschot aan informatie in het GZIP-woordenboek groter is dan het aantal bytes dat wordt bespaard door compressie, of als de hulpbron al goed is gecomprimeerd. Op sommige servers kunt u een `minimum gegevensomvang` instellen om dit probleem te vermijden.

Ten slotte een waarschuwing: de meeste servers comprimeren de items automatisch voor u wanneer deze aan gebruikers worden aangeboden, maar voor sommige CDN's moeten handmatige stappen worden uitgevoerd om te garanderen dat items met GZIP als set worden aangeboden. Controleer uw site en zorg ervoor dat uw items daadwerkelijk [worden gecomprimeerd](http://www.whatsmyip.org/http-compression-test/){: .external }.





