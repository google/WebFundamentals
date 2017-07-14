project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: RAIL è un modello di performance con l'utente al centro. Ogni applicazione web ha questi quattro distinti aspetti all'interno del suo ciclo di vita e le performance centrano in diversi modi: Response, Animation, Idle, Load.

{# wf_updated_on: 2017-07-14 #}
{# wf_published_on: 2015-06-07 #}

# Misurazione performance con il modello RAIL {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

RAIL è un modello di performance con l'utente al centro. Ogni 
applicazione web ha questi quattro distinti aspetti all'interno del 
suo ciclo di vita e le performance centrano in diversi modi:

![RAIL performance model](images/rail.png)


### TL;DR {: .hide-from-toc }

- focus sull'utente; l'obiettivo finale non è rendere il sito 
performante su tutti i dispositivi, ma alla fine soddisfare l'utente.
- Rispondere agli utenti immediatamente; reagire agli input in meno di 
100ms
- in presenza di animazioni o gli scorrrimenti, produrre un fotogramma 
in meno di 10ms.
- Massimizzare il tempo di inattività del thread principale.
- Tenere gli utenti nel sistema; trasportare contenuti interattivi in 
meno di 1000 ms.


## Focus sull'utente

Rendere gli utenti il punto focale del tuo sforzo di performance.
La maggior parte degli utenti che spendono nel tuo sito non è in 
attesa di caricarsi, ma in attesa che risponda mentre lo si usa.
Capire come gli utenti percepiscono i ritardi delle prestazioni:

<table class="responsive">
  <thead>
      <th colspan="2">Ritardo &amp; Reazione dell'utente</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16ms</td>
      <td data-th="User Reaction">Le persone sono eccezionalmente 
      brave nel monitorare il movimento, e non lo apprezzano quando le 
      animazioni non sono fluide. Gli utenti percepiscono le 
      animazioni fluide finché vengono generati 60 nuovi frame ogni 
      secondo. Questo inplica 16 ms per frame, compreso il tempo 
      necessario per il browser di dipingere il nuovo fotogramma nello 
      schermo, lasciando all'applicazione circa 10 ms per produrre un 
      fotogramma.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 - 100ms</td>
      <td data-th="User Reaction">Rispondere a un'azione dell'utente 
      entro questa finestra di tempo e gli utenti percepiscono come il 
      risultato immediato. Maggiore tempo incorre tra azione e reazione 
      rompe questa connessione.</td>
    </tr>
    <tr>
      <td data-th="Delay">100 - 300ms</td>
      <td data-th="User Reaction">Gli utenti percepiscono un leggero 
      ritardo.</td>
    </tr>
    <tr>
      <td data-th="Delay">300 - 1000 ms</td>
      <td data-th="User Reaction">All'interno di questa finestra, le 
      cose si percepiscono come parte di una progressione naturale e 
      continua dei compiti. Per la maggior parte degli utenti sul web, 
      caricare pagine o modificare le viste rappresenta un'attività.</td>
    </tr>
    <tr>
      <td data-th="Delay">1000+ms</td>
      <td data-th="User Reaction">Oltre 1 secondo, l'utente perde la 
      messa a fuoco sull'attività che stanno eseguendo.</td>
    </tr>
    <tr>
      <td data-th="Delay">10,000+ms</td>
      <td data-th="User Reaction">L'utente è frustrato e può 
      abbandonare l'attività; potrebbe o non potrebbe tornare più 
      tardi.</td>
    </tr>
  </tbody>
</table>

## Response: rispondere in meno di 100ms {: #response }

Hai 100 ms per rispondere prima che dell'utente possa notare un 
ritardo. Ciò vale per la maggior parte degli input, ad esempio i 
pulsanti cliccabili, i controlli di modulo commutabili, oppure le 
animazioni di avvio. Non si applica ai trascinamenti touch o agli 
scorrimenti.

Se non rispondi, la connessione tra azione e reazione viene rotta. Gli 
utenti lo noteranno.

Mentre può sembrare ovvio rispondere immediatamente alle azioni degli 
utenti, non è sempre la cosa migliore.
Utilizza questa finestra di 100 ms per eseguire altri lavori onerosi, 
ma fai attenzione a non bloccare l'utente.
Se possibile, esegui il lavoro in background.

Per azioni che richiedono più di 500 ms per terminare, fornire sempre 
un feedback.

## Animation: produrre un frame in 10 ms {: #animation }

Le animazioni non sono solo effetti di UI di fantasia. Ad esempio, gli 
scorrimenti ed i trascinamenti touch sono tipi di animazioni.

Gli utenti notano quando la frequenza del frame animazione varia.
Il tuo obiettivo è quello di produrre 60 fotogrammi al secondo, e ogni 
fotogramma deve attraversare tutti questi passaggi:

![Steps to render a frame](images/render-frame.png)

Da un punto di vista puramente matematico, ogni fotogramma ha un 
budget di circa 16 ms (1000 ms / 60 fotogrammi al secondo = 16,66 ms 
per fotogramma). Tuttavia, poiché i browser hanno bisogno di un po 'di 
tempo per disegnare il nuovo fotogramma sullo schermo, **il tuo codice 
dovrebbe terminare l'esecuzione in meno di 10 ms**.

Nei punti ad alta pressione come le animazioni, la chiave è quella di 
non fare niente quando puoi, e il minimo assoluto dove non puoi. Quando 
possibile, utilizzare la risposta di 100 ms per pre-calcolare il lavoro 
oneroso in modo da massimizzare le tue possibilità di colpire 60 fps.

Per ulteriori informazioni, vedere
[Performance di Rendering](/web/fundamentals/performance/rendering/).

## Idle: massimizzare il tempo di inattività {: #idle }

Utilizzare il tempo di inattività per completare il lavoro differito. 
Ad esempio, mantenere i dati di pre-caricamento al minimo in modo che 
l'applicazione si carichi velocemente e utilizzare il tempo di 
inattività per caricare i dati rimanenti.

Il lavoro differito dovrebbe essere raggruppato in blocchi di circa 50 
ms. Se un utente comincia a interagire, la priorità più alta è quella 
di rispondere a questo.

Per consentire una risposta <100 ms, l'applicazione deve restituire 
il controllo al thread principale ogni <50ms, in modo tale da poter 
eseguire la pipeline dei pixel, reagire all'input dell'utente e così 
via.

Lavorare nei blocchi di 50ms consente di completare l'attività pur 
garantendo una risposta istantanea.

## Load: consegnare contenuti in meno di 1000ms {: #load }

Carica il tuo sito in meno di 1 secondo. Se non lo fai, l'attenzione 
dell'utente cala, e la sua percezione di completare l'attività viene 
meno.

Focus sull'
[ottimizzazione del percorso di rendering critico](/web/fundamentals/performance/critical-rendering-path/)
per sbloccare il rendering.

Non è necessario caricare tutto in meno di un secondo per produrre la 
percezione di un caricamento completato. Abilitare il rendering 
progressivo ed eseguire qualche lavoro in background. Deferire i 
caricamenti non essenziali a periodi di inattività (guarda [Corso Udacity di ottimizzazione delle prestazioni del sito web](https://www.udacity.com/course/website-performance-optimization--ud884) 
per maggiori informazioni).

## Sommario delle metriche RAIL

Per valutare il tuo sito secondo le metriche RAIL, utilizzare Chrome 
DevTools [strumento Timeline ](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)
per registrare le azioni degli utenti. Controllare quindi i tempi 
registrati nella linea temporale confrontandoli con le metriche RAIL:

<table>
  <thead>
      <th>Fase RAIL</th>
      <th>Metrica</th>
      <th>Azioni Utente</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Response</strong></td>
      <td data-th="Key Metric">Latenza input (dal tocco al 
      disegno) < 100ms.</td>
      <td data-th="User Test">L'utente fa click su un pulsante (ad 
      esempio, apre la navigazione).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animation</strong></td>
      <td data-th="Key Metric">Ogni lavoro del fotogramma (da JS al 
      disegno) termina <16ms.</td>
      <td data-th="User Test">L'utente scorre la pagina, trascina un 
      dito (per aprire un menu, ad esempio) o vede un'animazione. 
      Quando si trascina, la risposta dell'applicazione è associata 
      alla posizione del cursore, ad esempio tirando per aggiornare 
      o spostando un'animazione carosello. Questa metrica si applica 
      solo alla fase continua dei trascinamenti, non all'avvio.
      </td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Idle</strong></td>
      <td data-th="Key Metric">I pezzi di lavoro del thread principale 
      JS non sono più grandi di 50ms.</td>
      <td data-th="User Test">L'utente non interagisce con la pagina, 
      ma con il thread principale dovrebbe essere sufficentemente 
      disponibile per gestire il successivo input utente.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Load</strong></td>
      <td data-th="Key Metric">Pagina ritenuta pronta per l'uso in 1000 
      ms.</td>
      <td data-th="User Test">L'utente carica la pagina e visualizza il 
      contenuto del percorso critico.</td>
    </tr>
  </tbody>
</table> 


