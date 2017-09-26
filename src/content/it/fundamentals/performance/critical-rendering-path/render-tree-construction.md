project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Le strutture CSSOM e DOM vengono unite in una struttura di rendering, che viene poi utilizzata per calcolare il layout di ciascun elemento visibile e che serve da input al processo di disegno che esegue il rendering dei pixel sullo schermo. Ottimizzare ciascuno di questi passaggi è cruciale per ottenere una performance di rendering ottimale.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Costruzione della struttura di rendering, layout e disegno {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Le strutture CSSOM e DOM vengono unite in una struttura di rendering, che viene poi utilizzata per calcolare il layout di ciascun elemento visibile e che serve da input al processo di disegno che esegue il rendering dei pixel sullo schermo. Ottimizzare ciascuno di questi passaggi è cruciale per ottenere una performance di rendering ottimale.


Nella sezione precedente sulla costruzione del modello oggetto, abbiamo costruito le strutture DOM e CSSOM sulla base dell'input HTML e CSS. Tuttavia, entrambi sono oggetti indipendenti che possono registrare aspetti diversi del documento: uno descrive il contenuto e l'altro che regole di stile che devono esservi applicate. Come uniamo i due e portiamo il browser a eseguire il rendering dei pixel sullo schermo?

### TL;DR {: .hide-from-toc }
- Le strutture DOM e CSSOM vengono unite per formare la struttura di rendering.
- La struttura di rendering contiene solo i nodi richiesti per eseguire il rendering della pagina.
- Il layout calcola la posizione e dimensione esatta di ogni oggetto.
- Il disegno è l'ultimo passaggio che include la struttura di rendering finale e ne esegue il rendering dei pixel sullo schermo.


Il primo passaggio prevede che il browser unisca DOM e CSSOM in una 'struttura di rendering' che registra l'intero contenuto DOM visibile sulla pagina, oltre a tutte le informazioni di stile CSSOM per ciascun nodo.

<img src="images/render-tree-construction.png" alt="DOM e CSSOM vengono uniti per creare la struttura di rendering" class="center">

Per costruire la struttura di rendering, il browser più o meno esegue quanto segue:

1. Partendo dalla radice della struttura DOM, attraversa ogni nodo visibile.
  * Alcuni nodi non sono ancora affatto visibili (ad es. tag dello script e così via) e vengono omessi dato che non sono riflessi nell'output sottoposto a rendering.
  * Alcuni nodi sono nascosti tramite CSS e sono anche omessi dalla struttura di rendering, ad esempio il nodo span di cui sopra manca dalla struttura di rendering perché disponiamo di una regola esplicita che vi applica la proprietà `display: none`.
1. Per ciascun nodo visibile, trova le regole CSSOM corrispondenti e le applica.
2. Produce nodi visibili con contenuto e i relativi computed style.

Note: Come breve commento, nota che <code>visibility: hidden</code> è diverso da <code>display: none</code>. Il primo rende l'elemento invisibile, ma l'elemento occupa comunque spazio nel layout (ad es. ne viene eseguito il rendering come scatola vuota), mentre l'ultimo <code>display: none</code> rimuove completamente l'elemento dalla struttura di rendering così che questo sia invisibile e non parte del layout.

L'output finale è un rendering che contiene sia il contenuto che le informazioni di stile di tutto il contenuto visibile sullo schermo. Siamo vicini.  **Una volta posizionata la struttura di rendering, possiamo procedere alla fase `layout`.**

Fino ad adesso abbiamo calcolato i nodi che devono essere visibili e i relativi computed style ma non abbiamo calcolato la loro posizione precisa e dimensione all'interno [viewport](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) del dispositivo: questa è la fase `layout`, a volte denominata anche come `reflow.`

Per individuare le dimensioni e posizione esatta di ciascun oggetto, il browser inizia dalla radice della struttura di rendering e la attraversa per calcolare la geometria di ogni oggetto sulla pagina. Analizziamo un semplice esempio pratico:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Il corpo della pagina di cui sopra contiene due div nidificati: il primo div (padre) imposta le dimensioni del display del nodo al 50% della larghezza del riquadro di visualizzazione e il secondo div contenuto dal padre ne imposta la larghezza al 50% del padre, dunque al 25% della larghezza del riquadro di visualizzazione.

<img src="images/layout-viewport.png" alt="Calcolo informazioni layout" class="center">

L'output del processo del layout è un `box model` che cattura in modo preciso la posizione e dimensione esatta di ciascun elemento all'interno del riquadro di visualizzazione: tutte le misure relative sono convertiti in posizioni assolute dei pixel sullo schermo e così via.

Infine, ora che sappiamo quali nodi sono visibili, i relativi computed style e geometria, possiamo finalmente passare queste informazioni alla nostra fase finale che convertirà ogni nodo nella struttura di rendering in pixel effettivi sullo schermo: questo passaggio viene spesso definito come 'painting' o 'rasterizing.'

Hai seguito tutto? Ciascuno di questi passaggi richiede una quantità di lavoro non semplice al browser, il che significa anche che può spesso richiedere un bel po' di tempo. Per fortuna, Chrome DevTools può aiutarci a chiarire tutte e tre le fasi che abbiamo descritto sopra. Esaminiamo la fase di layout per il nostro esempio originale 'ciao mondo':

<img src="images/layout-timeline.png" alt="Misurazione del layout in DevTools" class="center">

* La costruzione, il posizionamento e il calcolo delle dimensioni della struttura di rendering sono registrati con l'evento 'Layout' della barra temporale.
* Al completamento del layout, il browser produce un evento 'Paint Setup' e 'Paint' che converte la struttura di rendering in pixel effettivi sullo schermo.

Il tempo necessario ad eseguire la costruzione della struttura di rendering, il layout e il disegno varierà in base alle dimensioni del documento, agli stili applicati e, ovviamente, al dispositivo su cui è in esecuzione: più grande sarà il documento, maggiore sarà la quantità di lavoro che dovrà eseguire il browser, più complicati saranno gli stili maggiore sarà il tempo utilizzato anche per il disegno (ad esempio una tinta unita è economica da disegnare e un'ombreggiatura è molto più costosa da calcolare ed eseguirne il rendering).

Alla fine di tutto, la nostra pagina è finalmente visibile nel riquadro di visualizzazione.

<img src="images/device-dom-small.png" alt="Rendering pagina Ciao mondo" class="center">

Facciamo un breve riepilogo di tutti i passaggi eseguiti dal browser:

1. Elaborare il markup HTML e costruire la struttura DOM.
2. Elaborare il markup CSS e costruire la struttura CSSOM.
3. Unire DOM e CSSOM in una struttura di rendering.
4. Eseguire il layout sulla struttura di rendering per calcolare la geometria di ciascun nodo.
5. Disegnare i singoli nodi sullo schermo.

La nostra pagina demo potrà sembrare molto semplice, ma richiede un po' di lavoro. Vuoi indovinare cosa accadrebbe modificando DOM o CSSOM? Dovremmo ripetere la medesima procedura più volte per capire quali pixel devono subire un nuovo rendering sullo schermo.

**L'ottimizzazione del percorso di rendering critico è il processo di riduzione della quantità totale di tempo trascorso nei passaggi da 1 a 5 della sequenza di cui sopra.** Questo ci permette di eseguire il rendering del contenuto sullo schermo il prima possibile e riduce anche la quantità di tempo tra aggiornamenti dello schermo in seguito al rendering iniziale, ovvero ottenere una frequenza di aggiornamento superiore per il contenuto interattivo.



