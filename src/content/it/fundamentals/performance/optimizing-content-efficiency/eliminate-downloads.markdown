---
title: "Eliminazione dei download non necessari"
description: "Le risorse più veloci e ottimizzate sono quelle non inviate. Hai verificato le tue risorse di recente? Dovresti farlo periodicamente, per assicurarti che tutte le risorse consentano di offrire all'utente un'esperienza migliore."
updated_on: 2014-04-29
key-takeaways:
  eliminate-downloads:
    - "Inventariare tutte le risorse, proprie e di terzi, sulle proprie pagine"
    - "Valutare il rendimento di ogni risorsa: opzioni e performance tecniche"
    - "Stabilire se le risorse offrono opzioni sufficienti"
---

<p class="intro">
  Le risorse più veloci e ottimizzate sono quelle non inviate. Hai verificato le tue risorse di recente? Dovresti farlo periodicamente, per assicurarti che tutte le risorse consentano di offrire all'utente un'esperienza migliore.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.eliminate-downloads %}

Le risorse più veloci e ottimizzate sono quelle non inviate. Questa potrebbe sembrare un'affermazione ovvia, ma di fatto viene troppo spesso sottovalutata: in qualità di performance engineer, spetta a te valutare con occhio critico la possibilità di eliminare eventuali risorse non necessarie dalla tua applicazione. È buona norma rimettere in dubbio e rivedere periodicamente ogni presupposto implicito ed esplicito con il tuo team. Alcuni esempi:

* Abbiamo sempre incluso la risorsa X nelle nostre pagine, ma il costo di download e visualizzazione di tale risorsa corrisponde al valore che questa offre all'utente? Siamo in grado di misurarne e verificarne il valore?
* La risorsa &mdash; in particolare se di terzi &mdash; garantisce un rendimento costante? La risorsa è inserita nel percorso critico o dovrebbe esserlo? Se la risorsa si trova sul percorso critico, potrebbe rappresentare un single point of failure per il nostro sito? Ad esempio, se la risorsa non fosse disponibile, ciò comprometterebbe le prestazioni e l'esperienza dell'utente sulle nostre pagine?
* La risorsa deve avere uno SLA? La risorsa soddisfa le best practice di rendimento (compressione, caching e così via)?

Molto spesso le nostre pagine contengono risorse non necessarie o che, peggio ancora, rallentano l'esecuzione delle pagine senza offrire alcun valore aggiunto all'utente o al sito su cui sono hostate. Ciò si applica a risorse e widget sia propri che di terzi:

* Il sito A ha deciso di inserire uno slideshow sulla homepage per consentire al visitatore di visualizzare un'anteprima di più foto con un semplice click &mdash; tutte le foto vengono caricate al caricamento della pagina e scorse dall'utente.
    * **Domanda:** hai calcolato il numero di utenti che visualizzano più foto nello slideshow? Potresti incorrere in costi elevati scaricando risorse non necessarie che non vengono mai visualizzate dai visitatori.
* Il sito B ha deciso di installare un widget di terzi per visualizzare contenuti, migliorare il social engagement o fornire altri servizi.
    * **Domanda:** hai tracciato il numero di visitatori che utilizzano il widget o fanno clic sui contenuti forniti tramite esso? L'engagement generato dal widget è tale da giustificarne i costi?

Come puoi vedere, benché quella di eliminare i download non necessari possa sembrare un'affermazione banale, in realtà non lo è affatto, poiché spesso la decisione richiede una valutazione e ponderazione attenta. Per ottenere risultati migliori dovresti inventariare e riesaminare periodicamente le domande precedenti per ogni singola risorsa presente sulle tue pagine.



