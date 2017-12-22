project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La composizione è il momento in cui vengono raggruppate le parti della pagina disegnate per la visualizzazione sullo schermo.

{# wf_updated_on: 2017-11-29 #}
{# wf_published_on: 2015-03-20 #}

# Utilizza proprietà del componente di composizione e gestisci il conteggio dei livelli {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

La composizione è il momento in cui vengono raggruppate le parti della pagina
disegnate per la visualizzazione sullo schermo.

Esistono due fattori chiave in quest'area che influiscono sulle prestazioni
della pagina: il numero di livelli di composizione che devono essere gestiti e
le proprietà che si utilizzano per le animazioni.

### TL;DR {: .hide-from-toc }

- Preferisci cambiamenti di trasformazione e opacità per le tue animazioni.
- Promuovi elementi in movimento con `will-change` o `translateZ` .
- Evitare l'uso eccessivo delle regole di promozione: i livelli richiedono
memoria e gestione.

## Utilizza le modifiche di trasformazione e opacità per le animazioni

La versione più performante della pixel  pipeline evita sia il layout che il
paint e richiede solo modifiche di composizione:

<img
src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg"
alt="The pixel pipeline with no layout or paint.">

Per raggiungere questo obiettivo è necessario attenersi alle proprietà
modificabili che il compositore può gestire da solo. Oggi ci sono solo due
proprietà per le quali è vero: `transform` e `opacity` :

<img
src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg"
alt="The properties you can animate without triggering layout or paint.">

Il limite d'uso di `transform` e `opacity` è che l'elemento su cui si modificano
queste proprietà deve trovarsi sul *proprio livello di composizione* . Per
creare un livello devi promuovere l'elemento, che tratteremo in seguito.

Note: se sei preoccupato che potresti non essere in grado di limitare le tue
animazioni solo a queste proprietà, dai un'occhiata al [principio
FLIP](https://aerotwist.com/blog/flip-your-animations) , che può aiutarti a
rimappare le animazioni in cambiamenti di trasformazioni e opacità da proprietà
più onerose.

## Promuovi elementi che pensi di animare

Come accennato nella sezione " [Semplifica la complessità di paint e riduci le 
aree soggette a paint](simplify-paint-complexity-and-reduce-paint-areas) ",
dovresti promuovere elementi che hai intenzione di animare (entro limiti
ragionevoli, non esagerare!) Sul loro stesso livello:

```
.moving-element {
  will-change: transform;
}
```

Oppure, per i browser meno recenti o per quelli che non supportano la modifica:

```
.moving-element {
  transform: translateZ(0);
}
```

Questo segnala al browser l'avviso che i cambiamenti sono in arrivo e, a seconda
di ciò che si prevede di cambiare, il browser può potenzialmente fare
predisposizioni, come creare livelli di composizione.

## Gestisci i livelli ed evita troppi livelli

È molto allettante sapere che i livelli spesso aiutano le prestazioni per
promuovere tutti gli elementi della pagina con qualcosa di simile al seguente:

```
* {
  will-change: transform;
  transform: translateZ(0);
}
```

Il che è un modo indiretto per dire che vorresti promuovere ogni singolo
elemento della pagina. Il problema qui è che ogni livello creato richiede
memoria e risorse per la gestione che non sono gratuite. In effetti, su
dispositivi con memoria limitata l'impatto sulle prestazioni può superare di
gran lunga qualsiasi vantaggio derivante dalla creazione di un livello. Le
texture di ogni livello devono essere caricate nella GPU quindi ci sono
ulteriori limiti in termini di larghezza di banda tra CPU e GPU e memoria
disponibile per le texture nella GPU.

Warning: non promuovere elementi non necessari.

## Utilizza Chrome DevTools per comprendere i livelli nella tua app

<div class="attempt-right">
  <figure>
<img
src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg"
alt="The toggle for the paint profiler in Chrome DevTools.">
  </figure>
</div>

Per avere una comprensione dei livelli nell'applicazione e perché un elemento ha
un determinato livello devi abilitare il Paint profiler nella timeline degli
Strumenti per Sviluppatori di Chrome:

<div style="clear:both;"></div>

Con questo abilitato dovresti fare una registrazione. Al termine della
registrazione potrai fare clic sui singoli frame che si trovano tra le barre dei
frame per secondo ed i dettagli:

<img
src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg"
alt="A frame the developer is interested in profiling.">

Cliccando su questo ti verrà fornita una nuova opzione nei dettagli: il layer
tab.

<img
src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg"
alt="The layer tab button in Chrome DevTools.">

Questa opzione mostrerà una nuova vista che ti consente di eseguire una
panoramica, una scansione e uno zoom su tutti i livelli durante quel fotogramma,
insieme ai motivi per cui ogni livello è stato creato.

<img
src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg"
alt="The layer view in Chrome DevTools.">

Usando questa vista puoi tenere traccia del numero di livelli che hai. Se stai
spendendo molto tempo nel compositing durante azioni critiche per le prestazioni
come lo scorrimento o le transizioni (dovresti mirare a circa **4-5 ms** ). Puoi
usare queste informazioni per vedere quanti livelli sono in uso e perché sono
stati creati e da lì gestire il conteggio dei livelli della tua app.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
