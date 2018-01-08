project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Le risorse più veloci e ottimizzate sono quelle non inviate. Hai verificato le tue risorse di recente? Dovresti farlo periodicamente, per assicurarti che tutte le risorse consentano di offrire all'utente un'esperienza migliore.

{# wf_updated_on: 2017-11-10 #}
{# wf_published_on: 2014-03-31 #}

# Eliminazione dei download non necessari {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

### TL;DR {: .hide-from-toc }
-  Inventariare tutte le risorse, proprie e di terzi, sulle proprie pagine
-  Valutare le performance di ogni risorsa: il suo valore e le performance
   tecniche
-  Stabilire se le risorse offrono sufficiente valore

Le risorse più veloci e ottimizzate al massimo sono quelle non inviate. Dovresti
rimuovere le risorse non necessarie dalla tua applicazione.
È buona norma rimettere in dubbio e rivedere periodicamente ogni presupposto
implicito ed esplicito del tuo team. Di segiuto alcuni esempi:

*  Abbiamo sempre incluso la risorsa X nelle nostre pagine, ma il costo di
   download e visualizzazione di tale risorsa corrisponde al valore che questa
   offre all'utente? Siamo in grado di misurarne e verificarne il valore?
*  La risorsa (in particolare se di terzi) garantisce performance costanti? La
   risorsa è inserita nel percorso critico o dovrebbe esserlo? Se la risorsa si
   trova sul percorso critico, potrebbe rappresentare un single point of failure
   per il sito? Ad esempio, se la risorsa non fosse disponibile, ciò
   comprometterebbe le prestazioni e l'esperienza dell'utente sulle nostre
   pagine?
*  La risorsa ha bisogno o ha uno SLA? La risorsa soddisfa le best practice di
   performance: compressione, caching e così via?

Molto spesso le nostre pagine contengono risorse non necessarie o che, peggio
ancora, rallentano l'esecuzione delle pagine senza offrire alcun valore aggiunto
all'utente o al sito su cui sono in hosting. Ciò si applica sia a risorse e
widget propri che di terzi:

*  Il sito A ha deciso di inserire una slideshow carosello di foto sulla
   homepage per consentire al visitatore di visualizzare un'anteprima di più
   foto con un semplice click.  Tutte le foto vengono caricate al caricamento
   della pagina e scorse dall'utente.
    * **Domanda:** hai misurato il numero di utenti che visualizzano le foto
    dello slideshow? Potresti incorrere in costi elevati scaricando risorse non
    necessarie che non vengono mai visualizzate dai visitatori.
*  Il sito B ha deciso di installare un widget di terzi per visualizzare
   contenuti, migliorare il social engagement o fornire altri servizi.
    * **Domanda:** hai tracciato il numero di visitatori che utilizzano il
    widget o fanno clic sui contenuti forniti tramite esso? L'engagement
    generato dal widget è tale da giustificarne i costi?

Determinare se eliminare i download non necessari necessita un bel po' di
attenta riflessione e misura. Per ottenere risultati migliori dovresti
periodicamente inventariare e riesaminare queste domande per ogni singola
risorsa presente nelle tue pagine.
