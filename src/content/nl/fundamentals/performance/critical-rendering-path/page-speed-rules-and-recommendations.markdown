---
title: "Regels en aanbevelingen voor PageSpeed"
description: "Regels van PageSpeed Insights in context: waar moet u op letten bij het optimaliseren van het kritieke weergavepad en waarom."
updated_on: 2014-04-28
---
<p class="intro">
  Regels van PageSpeed Insights in context: waar moet u op letten bij het optimaliseren van het kritieke weergavepad en waarom.
</p>

## Weergaveblokkerend JavaScript en CSS elimineren

Voor de snelste eerste weergave moet u het aantal kritieke bronnen op een pagina minimaliseren en (indien mogelijk) elimineren, het aantal gedownloade bytes minimaliseren en de kritieke padlengte optimaliseren.

## Het gebruik van JavaScript optimaliseren

JavaScript-bronnen zijn standaard parserblokkerend, tenzij deze zijn gemarkeerd als _async_ of zijn toegevoegd via een speciale JavaScript-snippet. Parserblokkerend JavaScript dwingt de browser te wachten op het CSSOM en pauzeert de DOM-opbouw. Dit kan zorgen voor een aanzienlijke vertraging in de tijd voor de eerste weergave.

### **De voorkeur geven aan asynchrone JavaScript-bronnen**

Asynchrone bronnen deblokkeren de documentparser en zorgen dat de browser niet blokkeert bij CSSOM voordat het script wordt uitgevoerd. Als een script asynchroon kan worden gemaakt, betekent dit vaak ook dat het niet essentieel is voor de eerste weergave. Overweeg daarom om asynchrone scripts te laden na de initiële weergave.

### **Het parseren van JavaScript uitstellen**

Alle niet-essentiële scripts, die niet kritiek zijn voor het opbouwen van zichtbare inhoud voor de initiële weergave moeten worden uitgesteld om de hoeveelheid werk te minimaliseren die de browser moet uitvoeren om de pagina weer te geven.

### **Lange JavaScipts vermijden**

Lange JavaScripts blokkeren de browser bij het opbouwen van het DOM en CSSOM, en bij de weergave van de pagina. Daarom moet alle initialisatielogistiek en -functionaliteit die niet essentieel is voor de eerste weergave worden uitgesteld naar een later moment. Als een lange initialisatiereeks moet worden uitgevoerd, kunt u overwegen deze in verschillende fasen op te splitsen, zodat de browser de mogelijkheid krijgt om andere gebeurtenissen tussendoor te verwerken.

## Het CSS-gebruik optimaliseren

Het CSS is nodig om de weergaveboomstructuur op te bouwen en JavaScript blokkeert vaak op CSS tijdens de initiële opbouw van de pagina. U moet ervoor zorgen dat alle niet-essentiële CSS is gemarkeerd als niet-essentieel (bijvoorbeeld als afdrukken of andere mediaquery`s) en dat de hoeveelheid kritieke CSS en de tijd die nodig is om deze te leveren, zo klein mogelijk is.

### **Het CSS in de documentkop plaatsen**

Alle CSS-bonnen moeten zo snel mogelijk in het HTML-document worden aangegeven, zodat de browser de tags `<link>` zo snel mogelijk kan ontdekken en gelijk de aanvraag voor de CSS kan uitsturen.

### **CSS-imports vermijden**

De opdracht voor CSS-import (@import) zorgt ervoor dat een stijlblad regels van een ander stijlbladbestand kan importeren. Maar dit soort opdrachten moet worden vermeden omdat hierdoor extra roundtrips aan het kritieke pad worden toegevoegd: de geïmporteerde CSS-bronnen worden pas ontdekt nadat het CSS-stijlblad met de @import-regel zelf is ontvangen en geparseerd.

### **Weergaveblokkerende CSS inline plaatsen**

Voor de beste prestatie kunt u overwegen om kritieke CSS direct inline in het HTML-document te plaatsen. Hierdoor worden extra roundtrips in het kritieke pad geëlimineerd. Als dit op een goede manier wordt gedaan, kan dit worden gebruikt om een kritieke padlengte van één roundtrip te leveren waarbij alleen de HTML een blokkerende bron is.



