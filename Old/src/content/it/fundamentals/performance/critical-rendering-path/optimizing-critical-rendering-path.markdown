---
title: "Ottimizzazione del percorso di rendering critico"
description: "Per fornire il tempo più rapido possibile al primo rendering, dobbiamo ottimizzare tre variabili: ridurre il numero di risorse critiche, diminuire il numero di byte critici e ridurre la lunghezza del percorso critico."
updated_on: 2014-04-28
---

Per fornire il tempo più rapido possibile al primo rendering, dobbiamo ottimizzare tre variabili:

* **Ridurre il numero di risorse critiche.**
* **Ridurre il numero di byte critici.**
* **Ridurre la lunghezza del percorso critico.**

Una risorsa critica è una qualsiasi risorsa che potrebbe bloccare il rendering della pagina. Minore è il numero di queste risorse sulla pagina, minore sarà il lavoro che dovrà eseguire il browser per portare il contenuto sullo schermo e si verificherà anche minore conflitto per la CPU e per le altre risorse.

Similmente, minore è il numero di byte critici che il browser deve scaricare, più velocemente potrà arrivare a elaborare il contenuto e renderlo visibile sullo schermo. Per ridurre il numero di byte possiamo diminuire il numero di risorse (eliminarle o renderle non critiche) e anche assicurarci di ridurre le dimensioni di trasferimento attraverso la compressione e l'ottimizzazione di ciascuna risorsa.

Infine, la lunghezza del percorso critico varia in base a un grafico di dipendenza tra tutte le risorse critiche necessarie alla pagina e le relative dimensioni in byte: alcuni download delle risorse possono essere avviati solo una volta che è stata elaborata una risorsa precedente, e più grande è la risorsa maggiore sarà il numero di roundtrip necessari a scaricarla.

In altre parole, il numero di risorse, le loro dimensioni in byte e la lunghezza del percorso critico sono correlate tra di loro ma non sono esattamente la stessa cosa. Ad esempio, potresti non essere in grado di ridurre il numero di risorse critiche o di abbreviare la lunghezza del percorso critico, ma la diminuzione del numero di byte critici rappresenta comunque un'importante ottimizzazione &mdash; e viceversa.

**La sequenza generale di passaggi per l'ottimizzazione del percorso di rendering critico è:**

1. Analizzare e caratterizzare il tuo percorso critico: numero di risorse, byte e lunghezza.
2. Ridurre il numero di risorse critiche: eliminarle, rinviarne il download, segnarle come async, e così via.
3. Ottimizzare l'ordine in cui le risorse critiche rimanenti vengono caricate: vuoi scaricare il prima possibile tutti gli asset critici per ridurre la lunghezza del percorso critico.
4. Ottimizzare il numero di byte critici per ridurre il tempo di download (numero di roundtrip).



