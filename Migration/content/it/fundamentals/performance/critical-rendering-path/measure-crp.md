---
title: "Misurazione del percorso di rendering critico con Navigation Timing"
description: "Non puoi ottimizzare ciò che non puoi misurare. Fortunatamente, la Navigation Timing API ci offre tutti gli strumenti necessari per misurare ciascun passaggio del percorso di rendering critico."
updated_on: 2014-09-18
key-takeaways:
  measure-crp:
    - Navigation Timing offre informazioni cronologiche ad alta risoluzione per la misurazione di CRP.
    - Il browser emette una serie di eventi non riproducibili che registrano varie fasi di CRP.
---
<p class="intro">
  Non puoi ottimizzare ciò che non puoi misurare. Fortunatamente, Navigation Timing API ci offre tutti gli strumenti necessari per misurare ciascun passaggio del percorso di rendering critico.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.measure-crp %}

La base di ogni strategia prestazionale solida è una buona misurazione e strumentazione. A quanto pare è esattamente ciò che offre Navigation Timing API.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

Ciascuna delle etichette del diagramma di cui sopra corrisponde a un'informazione cronologica ad alta risoluzione di cui il browser tiene traccia per ogni pagina che carica. In realtà, in questo caso specifico stiamo mostrando solo una parte di tutte le informazioni cronologiche &mdash; per adesso stiamo ignorando tutte le informazioni cronologiche relative alla rete, ma ci torneremo in una lezione futura.

Quindi cosa significano queste informazioni cronologiche?

* **domLoading:** questa è l'informazione cronologica di inizio dell'intero processo, il browser sta per iniziare ad analizzare i primi byte ricevuti del documento
  HTML.
* **domInteractive:** segna il punto in cui il browser ha completato l'analisi di tutto l'HTML e la costruzione DOM è completa.
* **domContentLoaded:** segna il punto in cui il DOM è pronto e non ci sono fogli di stile che bloccano l'esecuzione di JavaScript, quindi adesso possiamo (idealmente) costruire la struttura di rendering.
    * Molti framework di JavaScript attendono questo evento prima di iniziare ad eseguire la propria logica. Per questo motivo, il browser acquisisce le informazioni temporali _EventStart_ e _EventEnd_ per consentirci di monitorare la durata dell'esecuzione.
* **domComplete:** come implica il nome, l'intera elaborazione è completa e tutte le risorse sulla pagina (immagini e così via) hanno terminato il download, ad esempio il rotante di caricamento ha smesso di girare.
* **loadEvent:** come passaggio finale in ogni caricamento della pagina, il browser lancia un evento di `onload` che può attivare un'ulteriore logica dell'applicazione.

La specifica HTML detta condizioni precise per ogni evento: quando deve essere attivato, quali condizioni devono essere soddisfatte e così via. Per i nostri scopi, ci concentreremo solo su alcuni traguardi relativi al percorso di rendering critico:

* **domInteractive** segna quando DOM è pronto.
* **domContentLoaded** solitamente segna quando [sia DOM che CSSOM sono pronti](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * In assenza di JavaScript con blocco parser, _DOMContentLoaded_ verrà attivato immediatamente dopo _domInteractive_.
* **domComplete** segna quando la pagina e tutte le relative sottorisorse sono pronte.

^

{% include_code src=_code/measure_crp.html snippet=full lang=html %}

L'esempio di cui sopra potrebbe sembrare leggermente scoraggiante a prima vista, ma in realtà è davvero abbastanza semplice. Navigation Timing API acquisisce tutte le informazioni temporali pertinenti e il nostro codice attende semplicemente che l'evento `onload` sia attivato &mdash; ricorda che l'evento onload si attiva dopo domInteractive, domContentLoaded e domComplete &mdash e calcola la differenza tra le varie informazioni cronologiche.
<img src="images/device-navtiming-small.png" class="center" alt="Demo di NavTiming">

Detto questo, adesso disponiamo di traguardi specifici da monitorare e una funzione semplice per l'output di queste misurazioni. Invece di stampare queste metriche sulla pagina, puoi anche modificare il codice così da inviarle a una server di analisi ([Google Analytics esegue l'operazione automaticamente](https://support.google.com/analytics/answer/1205784?hl=en)), che rappresenta un ottimo modo per controllare le performance delle tue pagine che possono trarre beneficio da un lavoro di ottimizzazione.



