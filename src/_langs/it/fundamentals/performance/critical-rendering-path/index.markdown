---
layout: section
title: "Percorso di rendering critico"
description: "Ottimizzazione del percorso di rendering critico attraverso l'assegnazione di priorità alla visualizzazione del contenuto che è correlato all'azione principale che l'utente vuole effettuare sulla pagina."
introduction: "L'ottimizzazione del percorso di rendering critico è cruciale per il miglioramento delle prestazioni delle nostre pagine: il nostro scopo è assegnare priorità e visualizzare il contenuto relativo all'azione principale che l'utente vuole eseguire sulla pagina."
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 1
id: critical-rendering-path
collection: performance
authors:
  - ilyagrigorik
---
{% wrap content%}

La fornitura di un'esperienza di rete veloce richiede capacità elevate da parte del browser. La maggior parte di questo lavoro è nascosto a noi sviluppatori web: scriviamo il markup e la nostra pagina viene visualizzata sullo schermo. In che modo il browser passa dall'utilizzo di HTML, CSS e JavaScript al rendering dei pixel sullo schermo?

L'ottimizzazione delle prestazioni ruota intorno alla comprensione di ciò che accade in questi passaggi intermedi tra la ricezione di byte HTML, CSS e JavaScript e l'elaborazione necessaria alla trasformazione degli stessi in pixel sottoposti a rendering, il famoso **percorso di rendering critico**.

<img src="images/progressive-rendering.png" class="center" alt="rendering progressivo della pagina">

Ottimizzando il percorso di rendering critico, possiamo migliorare in modo significativo il momento in cui eseguiamo il primo rendering delle nostre pagine. Inoltre, la comprensione del nostro percorso di rendering critico fungerà anche da base per la costruzione di applicazioni interattive ben performanti. Da questo emerge che il processo per l'elaborazione degli aggiornamenti interattivi è lo stesso, solo eseguito in un loop continuo e idealmente a 60 frame al secondo. Ad ogni modo, non corriamo troppo. Innanzitutto, facciamo una panoramica rapida e completa di come il browser esegue la visualizzazione di una pagina semplice.

{% endwrap%}

