project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Prima che il browser possa eseguire il rendering del contenuto sullo schermo, deve costruire le strutture DOM e CSSOM. Di conseguenza, dobbiamo assicurarci di fornire al browser sia HTML che CSS nel più breve tempo possibile.

{# wf_updated_on: 2017-05-08 #}
{# wf_published_on: 2014-03-31 #}

# Costruzione del modello ad oggetti {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Prima che il browser possa eseguire il rendering della pagina, deve costruire le strutture DOM e CSSOM ad albero. Di conseguenza, dobbiamo assicurarci di fornire al browser sia HTML che CSS nel più breve tempo possibile.


### TL;DR {: .hide-from-toc }
- Byte → caratteri → token → nodi → modello a oggetti.
- Il markup HTML viene trasformato in Document Object Model (DOM), il markup CSS invece in un CSS Object Model (CSSOM).
- DOM e CSSOM rappresentano strutture dati indipendenti.
- La barra temporale (Timeline) di Chrome DevTools ci consente di acquisire e ispezionare i costi di costruzione ed elaborazione di DOM e CSSOM.


## Document Object Model (DOM)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Prova](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom.html){: target="_blank" .external }

Iniziamo con il caso più semplice possibile: una pagina HTML semplice con un po' di testo e una singola immagine. Cosa deve fare il browser per elaborare questa semplice pagina?

<img src="images/full-process.png" alt="Processo di costruzione di DOM">

1. **Conversione:** il browser legge i byte raw di HTML dal disco o dalla rete e li traduce in caratteri singoli sulla base della codifica specifica del file (ad es. UTF-8).
1. **Suddivisione in token:** il browser converte le stringhe di caratteri in token distinti specificati dallo [standard W3C HTML5](http://www.w3.org/TR/html5/){: .external }, ad es. "&lt;html&gt;", "&lt;body&gt;" ed altre stringhe all'interno di "parentesi uncinate". Ciascun token presenta un significato speciale e una serie di regole.
1. **Lessico:** i token emessi sono convertiti in "oggetti" che definiscono le loro proprietà e regole.
1. **Costruzione DOM:** infine, dato che il markup HTML definisce le relazioni tra i tag diversi (alcuni tag sono contenuti all'interno di tag), gli oggetti creati sono collegati in una struttura di dati ad albero che acquisisce anche le relazioni padre-figlio definite nel markup originario: oggetto _HTML_ è genitore dell'oggetto _body_, _body_ è genitore dell'oggetto _paragraph_, e così via.

<img src="images/dom-tree.png" class="center" alt="Struttura DOM">

**L'output finale di questo intero processo è Document Object Model, o il `DOM` della nostra pagina semplice, che il browser utilizza per tutte le ulteriori elaborazioni della pagina.**

Ogni volta che il browser deve elaborare il markup HTML deve superare tutti i passaggi di cui sopra: convertire i byte in caratteri, identificare i token, convertire i token in nodi e costruire la struttura DOM. Questo intero processo può richiedere tempo, specialmente se disponiamo di una grande quantità di HTML da elaborare.

<img src="images/dom-timeline.png" class="center" alt="Analisi della costruzione DOM in DevTools">

Note: Presumiamo che tu conosca le basi di Chrome DevTools: sai come registrare una sequenza di rete o come registrare una barra temporale. Se ti serve un rapido ripasso, dai uno sguardo alla <a href='https://developer.chrome.com/devtools'>documentazione di Chrome DevTools</a>, oppure, se non conosci bene DevTools, ti consigliamo di seguire il corso Codeschool <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a>.

Se apri Chrome DevTools e registri una barra temporale mentre la pagina viene caricata, potrai vedere il tempo effettivo richiesto all'esecuzione del passaggio &mdash; nell'esempio di cui sopra, abbiamo impiegato ~5 ms a convertire un blocco di byte HTML in una struttura DOM. Ovviamente, se la pagina fosse più grande, come nella maggioranza delle pagine, questo processo potrebbe richiedere molto più tempo. Nelle sezioni future relative alla creazione di animazioni fluide vedrai che questo può facilmente diventare un collo di bottiglia, se il browser deve elaborare grandi quantitativi di HTML.

Con la struttura DOM pronta, disponiamo di informazioni a sufficienza per eseguire il rendering della pagina sullo schermo? Non ancora. La struttura DOM acquisisce le proprietà e le relazioni del markup del documento ma non ci informa in alcun modo sull'aspetto che deve avere il documento, una volta eseguito il rendering. Questa è responsabilità di CSSOM, a cui passeremo successivamente.

## CSS Object Model (CSSOM)

Mentre il browser stava costruendo il DOM della nostra pagina semplice, ha incontrato un tag di collegamento nella sezione dell'intestazione del documento che faceva riferimento a un foglio di stile CSS esterno: style.css. Prevedendo che sia necessaria questa risorsa per eseguire il rendering della pagina, invia immediatamente una richiesta per la risorsa, che gli restituisce il seguente contenuto:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

Ovviamente, avremmo potuto dichiarare i nostri stili direttamente all'interno del markup HTML (inline), ma mantenere il nostro CSS indipendente da HTML ci consente di trattare il contenuto e il design come due questioni separate: i progettisti possono lavorare su CSS, gli sviluppatori possono concentrarsi su HTML e così via.

Proprio come nell'HTML, dobbiamo convertire le regole CSS ricevute in qualcosa che il browser comprenda e con cui possa lavorare. Quindi, ancora una volta, ripetiamo un processo molto simile a quello che abbiamo fatto con HTML:

<img src="images/cssom-construction.png" class="center" alt="Passaggi di costruzione CSSOM">

I byte CSS vengono convertiti in caratteri, quindi in token e nodi e infine vengono collegati in una struttura ad albero nota come 'CSS Object Model', o come l'abbreviazione CSSOM:

<img src="images/cssom-tree.png" class="center" alt="Struttura CSSOM">

Perché CSSOM presenta una struttura ad albero? Quando si calcola il set di stili finale di qualsiasi oggetto sulla pagina, il browser inizia con la regola più generale applicabile a quel nodo (ad es. se è un figlio dell'elemento corpo, allora si applicano tutti gli stili) e quindi ottimizza in modo ricorsivo gli stili calcolati con l'applicazione di regole più specifiche, ad esempio le regole vengono eseguite a catena.

Per rendere la cosa più concreta, tieni presente la struttura CSSOM di cui sopra. Qualsiasi testo contenuto all'interno del tag _span_ che viene posizionato all'interno dell'elemento corpo avrà una dimensione carattere di 16 pixel e il testo rosso: la direttiva delle dimensioni del font verrà eseguita a catena dal corpo allo span. Tuttavia, se il tag span è figlio di un tag paragrafo (p), allora i relativi contenuti non saranno visualizzati.

Inoltre, tieni presente che la struttura di cui sopra non rappresenta l'albero CSSOM completo e mostra solo gli stili che abbiamo deciso di sostituire nel nostro foglio di stile. Ogni browser offre il proprio set di stili predefiniti, noti anche come "user agent styles"&mdash;quello che vediamo quando non ne forniamo di nostri&mdash; e i nostri stili semplicemente si sostituiscono a questi predefiniti (ad es. [stili predefiniti IE](http://www.iecss.com/){: .external }). Se hai mai ispezionato i tuoi 'computed styles' di Chrome DevTools e ti sei mai domandato da dove provengono tutti gli stili, ora lo sai.

Sei curioso di sapere quanto è durata l'elaborazione CSS? Registra una barra temporale in DevTools e cerca l'evento 'Recalculate Style': a differenza dell'elaborazione DOM, la barra temporale non mostra una voce separata 'Parse CSS', invece acquisisce l'analisi e la costruzione della struttura CSSOM, oltre al calcolo ricorsivo dei computed style sotto questo singolo evento.

<img src="images/cssom-timeline.png" class="center" alt="Analisi della costruzione CSSOM in DevTools">

Il nostro trascurabile foglio di stile richiede ~0,6 ms per essere elaborato e interessa 8 elementi sulla pagina: non molti ma, ancora una volta, non liberi. Tuttavia, da dove provengono gli 8 elementi? CSSOM e DOM sono strutture dati indipendenti. Sembrerebbe che il browser stia nascondendo un passaggio importante. Adesso, parliamo della struttura di rendering che collega insieme DOM e CSSOM.

<a href="render-tree-construction" class="gc-analytics-event"
    data-category="CRP" data-label="Successivo / Costruzione della struttura di rendering, layout e disegno">
  <button>Successivo: Costruzione della struttura di rendering, layout e disegno</button>
</a>
