project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: De hoeveelheid gegevens die door elke app wordt gedownload, blijft gestaag toenemen. Om geweldige inhoud te kunnen blijven leveren, moeten we elke byte optimaliseren.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-03-31 #}

# Inhoudsefficiëntie optimaliseren {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Onze internetapplicaties krijgen een steeds groter bereik, grotere ambitie en meer functies, en dat is goed. Met een steeds rijker internet ontstaat echter ook een andere trend: de hoeveelheid gegevens die door elke app wordt gedownload, wordt almaar groter. Om geweldige inhoud te kunnen blijven leveren, moeten we elke byte optimaliseren.


Hoe ziet een moderne internetapplicatie eruit? [HTTP Archive](http://httparchive.org/){: .external } kan ons hierbij helpen. Dit project monitort internet door regelmatig de populairste websites (meer dan 300.000 sites uit de lijst van Alexa Top 1M) te crawlen en analysegegevens te verzamelen over het aantal hulpbronnen, inhoudstypen en andere metadata voor elke pagina.

<img src="images/http-archive-trends.png" class="center" alt="Trends opgesteld door HTTP Archive">

<table>
<thead>
  <tr>
    <th></th>
    <th>50e percentiel</th>
    <th>75e percentiel</th>
    <th>90e percentiel</th>
  </tr>
</thead>
<tr>
  <td data-th="type">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="type">Afbeeldingen</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="type">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="type">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="type">Overig</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="type"><strong>Totaal</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

Bovenstaande gegevens geven de groeitrend weer van het aantal gedownloade bytes voor populaire bestemmingen op internet tussen januari 2013 en januari 2014. Niet elke site groeit even snel of gebruikt evenveel gegevens, daarom hebben we de verschillende aantallen weergegeven als percentiel van de gegevensdistributie: het 50e (mediaan), 75e en 90e.

Een site op mediaan-niveau bestaat aan het begin van 2014 uit 75 verzoeken die corresponderen met 1054 KB totale, overgedragen bytes, en het totale aantal bytes (en verzoeken) is gedurende het voorgaande jaar gestaag toegenomen. Dit is geen grote verrassing, maar heeft wel enkele belangrijke gevolgen: hoewel internetproviders sneller internet leveren, is de beschikbare snelheid en bandbreedte niet in elk land even groot en hebben veel gebruikers te maken met gegevenslimieten en dure abonnementen, vooral voor mobiel internet.

Internetapplicaties hoeven, in tegenstelling tot applicaties op pc`s, niet geïnstalleerd te worden. U hoeft slechts de URL in te typen om de website te bekijken. Dit is een belangrijk voordeel van internet. Om dit te bereiken, **moeten we echter vaak tientallen, soms honderden verschillende hulpbronnen ophalen, waarvoor we meerdere megabytes aan gegevens moeten downloaden. Dit moet in honderdsten van milliseconden gebeuren als we de website snel willen laden.**

Er zijn heel wat processen nodig om een internetpagina snel te laden en daarom is het belangrijk om de inhoudsefficiëntie te optimaliseren: overbodige downloads verwijderen, de codering van elke hulpbron optimaliseren via verschillende compressiemethoden en gebruikmaken van gegevens in het cachegeheugen om overbodige downloads te vermijden.


