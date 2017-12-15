project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gli utenti notano se i siti e le applicazioni non funzionano bene, perciò l'ottimizzare le prestazioni di rendering è cruciale!

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2015-03-20 #}

# Performance di rendering {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Gli utenti di oggi del web
[si aspettano che le pagine visitate siano interattive e fluide](https://paul.kinlan.me/what-news-readers-want/)
ed è qui che dovresti concentrare sempre più tempo e impegno. Le pagine
non devono solo caricarsi rapidamente, ma anche funzionare bene; lo
scorrimento deve seguire accuratamente il ditto, e le animazioni e le interazioni
devono essere morbide come la seta.

Per scrivere siti e applicazioni prestanti, è necessario comprendere
come il codice HTML, JavaScript e CSS viene gestito dal browser ed
assicurarsi che il codice scritto (e il codice di terze parti
incluso) funzioni in modo più efficiente possibile.

## 60fps e Device Refresh Rates

<div class="attempt-right">
  <figure>
    <img src="images/intro/response.jpg" alt="L'utente interagisce con un sito web.">
  </figure>
</div>

Molti dei dispositivi oggi aggiornano i loro schermi **60
volte al secondo**. Se c'è un'animazione o una transizione in esecuzione
o se l'utente scorre le pagine, il browser deve deve tenere il passo con la
frequenza di aggiornamento del dispositivo e creare una nuova immagine o
fotogramma per ciascuno di questi aggiornamenti dello schermo.

Ognuno di questi fotogrammi ha un budget di poco più di 16ms (1 secondo
/ 60 = 16.66ms). In realtà, però, il browser ha un lavoro di pulizia da
eseguire, quindi tutto il tuo lavoro deve essere completato entro
**10ms**. Quando non riesci ad adempiere a questo budget, la percentuale
di frame scende e il contenuto vibra sullo schermo. Questo è
spesso indicato come **jank** e influisce negativamente sull'esperienza
dell'utente.

## La pixel pipeline

Ci sono cinque aree principali che è necessario conoscere e tenere a
mente quando lavori. Sono le aree sulle quali hai più controllo ed i
punti chiave nella pipeline pixel-to-screen:

<img src="images/intro/frame-full.jpg"  alt="Tutta la pixel pipeline">

* **JavaScript**. Tipicamente JavaScript è utilizzato per gestire il
lavoro che determinerà le modifiche visive, che si tratti di
funzioni jQuery `animate`, ordinare set di dati o aggiungere elementi DOM
alla pagina. Non deve necessariamente essere JavaScript a innescare una modifica
visiva, anche CSS Animations, Transitions e le API Web Animations sono
comunemente utilizzate.
* **Calcoli Style**. Questo processo determina quali regole CSS si
applicano a quali elementi basati su selettori di corrispondenza, ad
esempio, `.headline` o `.nav> .nav__item`. Dopodiché, una volta note le
regole, vengono applicate e vengono calcolati gli stili finali per ogni
elemento.
* **Layout**. Una volta che il browser conosce quali regole si applicano
a un elemento, può cominciare a calcolare quanto spazio occupa e la posizione
sullo schermo. Il modello di layout web significa che un elemento può
influenzare gli altri, ad esempio la larghezza dell'elemento `body` in
genere colpisce le larghezze dei suoi figli e così via fino alla fine
dell'albero, pertanto il processo può essere abbastanza complesso
per il browser.
* **Paint**. Il Painting è il processo di riempimento di pixel. Esso
implica il disegno di testo, colori, immagini, bordi e ombre,
sostanzialmente ogni parte visiva degli elementi. Il disegno è
tipicamente eseguito su superfici multiple, spesso denominate layer.
* **Compositing**. Poiché le parti della pagina sono state disegnate in
livelli potenzialmente multipli, devono essere disegnate sullo schermo
nell'ordine giusto in modo che la pagina venga resa correttamente. Ciò è
particolarmente importante per gli elementi che si sovrappongono tra
loro, poiché un errore potrebbe causare un elemento sovrapposto in
maniera errata ad un altro.

Ognuna di queste parti della pipeline rappresenta un'occasione per
introdurre jank, quindi è importante capire esattamente quali parti
della pipeline il codice innesca.

A volte puoi aver sentito utilizzare il termine "rasterize" in
combinazione con paint. Questo avviene perché in realtà il painting è
costituito da due compiti compiti: 1) creare un elenco delle chiamate al
disegno e 2) riempimento dei pixel.

Quest'ultimo è chiamato "rasterization" e così ogni volta che vedi paint
record in DevTools, dovresti pensarli come inclusivi di rasterizzazione
(in qualche architettura la creazione delle chiamate al disegno e
rasterizing vengono eseguite in diversi thread, ma non è qualcosa sotto il
controllo degli sviluppatori).

Non dovrai necessariamente essere coinvolto in ogni parte della pipeline per ogni frame.
Infatti ci sono tre modalità in cui la pipeline _normalmente_ entra in
causa per un dato frame quando si effettua una modifica visiva, sia con
JavaScript, CSS o Web Animations:

### 1. JS / CSS > Style > Layout > Paint > Composite

<img src="images/intro/frame-full.jpg"  alt="La completa pixel pipeline">

Se si modifica una proprietà "layout" con uno dei cambiamenti della
geometria di un elemento come la sua larghezza, altezza, o posizione a
sinistra o superiore, il browser dovrà controllare tutti gli altri
elementi ed eseguire il "reflow" della pagina. Qualsiasi area
interessata dovrà eseguire il re-paint e gli elementi finali disegnati
dovranno essere composti nuovamente insieme.

### 2. JS / CSS > Style > Paint > Composite

<img src="images/intro/frame-no-layout.jpg" alt="La pixel pipeline senza layout.">

Se si modifica una proprietà "paint only" come un'immagine di sfondo, il
colore del testo o le ombre, in altre parole qualcosa che non influenza il layout
della pagina, il browser salterà il layout, ma eseguirà ancora il paint.

### 3. JS / CSS > Style > Composite

<img src="images/intro/frame-no-layout-paint.jpg" alt="La pixel pipeline senza layout e paint.">

Se si modifica una proprietà che non richiede né layout né paint, allora
il browser dovrà solo comporre.

Questa versione finale è la più economica e più desiderabile per i punti
ad alta pressione nel ciclo di vita di un'app, come le animazioni o gli
scorrimenti.

Note: Se desideri sapere quale delle tre versioni precedenti verrà
attivata da una modifica di una determinata proprietà CSS consulta
[CSS Triggers](https://csstriggers.com). E se vuoi ottenere velocemente
animazioni ad alte prestazioni consulta la sezione su [modifica delle
proprietà di sola composizione](stick-to-compositor-only-properties-and-manage-layer-count).

Performance è l'arte di evitare il lavoro e fare qualsiasi lavoro nella
maniera più efficiente possibile. In molti casi si tratta di lavorare
in sinergia con il browser e non andargli contro. Vale la pena ricordare che i
lavori sopra elencati nella pipeline differiscono in termini di costo
computazionale; alcuni compiti sono più costosi di altri!

Approfondiamo le varie parti della pipeline. Daremo un'occhiata ai
problemi comuni nonché a come diagnosticarli e risolverli.

{% include "web/_shared/udacity/ud860.html" %}

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
