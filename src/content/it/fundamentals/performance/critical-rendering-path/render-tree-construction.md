project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Le strutture CSSOM e DOM vengono unite in una struttura di rendering, che viene poi utilizzata per calcolare il layout di ciascun elemento visibile e che serve da input al processo di disegno che esegue il rendering dei pixel sullo schermo. Ottimizzare ciascuno di questi passaggi è cruciale per ottenere una performance di rendering ottimale.

{# wf_updated_on: 2017-11-10 #}
{# wf_published_on: 2014-03-31 #}

# Costruzione della struttura di rendering, layout e disegno {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Le strutture CSSOM e DOM vengono unite in una struttura di rendering, che viene
poi utilizzata per calcolare il layout di ciascun elemento visibile e che serve
da input al processo di disegno che esegue il rendering dei pixel sullo schermo.
Ottimizzare ciascuno di questi passaggi è cruciale per ottenere una performance
di rendering ottimale.

Nella sezione precedente sulla costruzione del modello oggetto, abbiamo
costruito le strutture DOM e CSSOM sulla base dell'input HTML e CSS. Tuttavia,
entrambi sono oggetti indipendenti che possono registrare aspetti diversi del
documento: uno descrive il contenuto e l'altro quali regole di stile devono
essere applicate al documento. Come uniamo questi due oggetti e portiamo il
browser a eseguire il rendering dei pixel sullo schermo?

### TL;DR {: .hide-from-toc }
- Le strutture DOM e CSSOM vengono unite per formare la struttura di rendering.
- La struttura di rendering contiene solo i nodi richiesti per eseguire il
  rendering della pagina.
- Il layout calcola la posizione e dimensione esatta di ogni oggetto.
- Il disegno è l'ultimo passaggio che include la struttura di rendering finale
  e ne esegue il rendering dei pixel sullo schermo.


Il primo passaggio prevede che il browser unisca DOM e CSSOM in una "struttura
di rendering" che registra l'intero contenuto DOM visibile sulla pagina, oltre
a tutte le informazioni di stile CSSOM per ciascun nodo.

![DOM e CSSOM vengono uniti per creare la struttura di
rendering](images/render-tree-construction.png)

Per costruire la struttura di rendering, il browser esegue approssimativamente
le seguenti operazioni:

1. Partendo dalla radice della struttura DOM, attraversa ogni nodo visibile.
  * Alcuni nodi non sono ancora affatto visibili (ad es. tag dello script, meta
    tag e così via) e vengono omessi dato che non sono riflessi nell'output
    sottoposto a rendering.
  * Alcuni nodi sono nascosti tramite CSS e sono anche omessi dalla struttura di
    rendering, ad esempio il nodo span di cui sopra manca dalla struttura di
    rendering per via della nostra regola esplicita che applica la
    proprietà `display: none`.
1. Per ciascun nodo visibile, trova le regole CSSOM corrispondenti e le applica.
1. Produce nodi visibili con contenuto e i relativi computed style.

Note: Come breve commento, nota che `visibility: hidden` è diverso da 
`display: none`. Il primo rende l'elemento invisibile, ma l'elemento occupa
comunque spazio nel layout (ad es. ne viene eseguito il rendering come scatola
vuota), mentre l'ultimo `display: none` rimuove completamente l'elemento dalla
struttura di rendering così che questo sia invisibile e non parte del layout.

L'output finale è un rendering che contiene sia il contenuto che le informazioni
di stile di tutto il contenuto visibile sullo schermo. **Una
volta completata la struttura di rendering, possiamo procedere alla fase
di `layout`.**

Fino ad adesso abbiamo calcolato i nodi che devono essere visibili e i relativi
computed style ma non abbiamo calcolato la loro posizione precisa e dimensione
all'interno [viewport](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)
del dispositivo: questa è la fase `layout`,  anche denominata `reflow.`

Per individuare la posizione e le dimensioni esatte di ciascun oggetto, il browser
inizia dalla radice della struttura di rendering e la attraversa.
la geometria di ogni oggetto sulla pagina. Analizziamo un semplice esempio
pratico:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Prova](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/nested.html){: target="_blank" .external }

Il corpo della pagina di cui sopra contiene due div nidificati: il primo `div`
(padre) imposta le dimensioni del display del nodo al 50% della larghezza del
riquadro di visualizzazione del secondo `div` &mdash;contenuto dal padre&mdash;
ne imposta la larghezza al 50% del padre, dunque al 25% della larghezza del
riquadro di visualizzazione.

![Calcolo informazioni layout](images/layout-viewport.png)

L'output del processo del layout è un "box model" che cattura in modo preciso la
posizione e dimensione esatte di ciascun elemento all'interno del riquadro di
visualizzazione: tutte le misure relative sono convertiti in posizioni assolute
dei pixel sullo schermo e così via.

Infine, ora che sappiamo quali nodi sono visibili, i relativi computed style e
geometria, possiamo finalmente passare queste informazioni alla nostra fase
finale che convertirà ogni nodo nella struttura di rendering in pixel effettivi
sullo schermo: questo passaggio viene spesso definito come "painting" o
"rasterizing".

Hai seguito tutto? Ciascuno di questi passaggi richiede una quantità di lavoro
non semplice per il browser e quindi può spesso richiedere un bel
po' di tempo. Per fortuna, Chrome DevTools può aiutarci a chiarire tutte e tre
le fasi che abbiamo descritto sopra. Esaminiamo la fase di layout per il nostro
esempio originale "hello world (ciao mondo)":

![Misurazione del layout in DevTools](images/layout-timeline.png)

* La costruzione, il posizionamento e il calcolo delle dimensioni della
  struttura di rendering sono registrati con l'evento "Layout" della barra
  temporale.
* Al completamento del layout, il browser produce un evento "Paint Setup" e
  "Paint" che converte la struttura di rendering in pixel effettivi sullo
  schermo.

Il tempo necessario ad eseguire la costruzione della struttura di rendering, il
layout e il disegno varierà in base alle dimensioni del documento, agli stili
applicati e, ovviamente, al dispositivo su cui è in esecuzione: più grande sarà
il documento, maggiore sarà la quantità di lavoro che dovrà eseguire il browser,
più complicati saranno gli stili, maggiore sarà il tempo utilizzato anche per il
disegno (ad esempio una tinta unita è "economica" da disegnare e
un'ombreggiatura è molto più "costosa" in termini di calcolo e rendering).

Al termine di queste operazioni, la nostra pagina è finalmente visibile nel
riquadro di visualizzazione.

![Rendering pagina Ciao mondo](images/device-dom-small.png)

Facciamo un breve riepilogo di tutti i passaggi eseguiti dal browser:

1. Elaborare il markup HTML e costruire la struttura DOM.
1. Elaborare il markup CSS e costruire la struttura CSSOM.
1. Unire DOM e CSSOM in una struttura di rendering.
1. Eseguire il layout sulla struttura di rendering per calcolare la geometria di
   ciascun nodo.
1. Disegnare i singoli nodi sullo schermo.

La nostra pagina demo potrà sembrare molto semplice, ma richiede un po' di
lavoro. Vuoi indovinare cosa accadrebbe modificando DOM o CSSOM? Dovremmo
ripetere la medesima procedura più volte per capire quali pixel devono subire un
nuovo rendering sullo schermo.

**_L'ottimizzazione del percorso di rendering critico_ è il processo di
riduzione della quantità totale di tempo trascorso nei passaggi da 1 a 5 della
sequenza di qui sopra.** Questo ci permette di eseguire il rendering del
contenuto sullo schermo il prima possibile e riduce anche la quantità di tempo
tra aggiornamenti dello schermo in seguito al rendering iniziale, ovvero
ottenere una frequenza di aggiornamento superiore per il contenuto interattivo.

<a href="render-blocking-css" class="gc-analytics-event"
    data-category="CRP" data-label="Successivo / CSS del blocco di rendering">
  <button>Successivo: CSS del blocco di rendering</button>
</a>
