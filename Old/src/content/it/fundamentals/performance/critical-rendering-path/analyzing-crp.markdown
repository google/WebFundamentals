---
title: "Analisi della performance del percorso di rendering critico"
description: "L'identificazione e la risoluzione dei colli di bottiglia della performance del percorso di rendering critico richiede una buona conoscenza delle insidie comuni. Facciamo un tour pratico ed estraiamo i pattern di performance comuni che faciliteranno l'ottimizzazione delle tue pagine."
updated_on: 2014-04-28
---
<p class="intro">
  L'identificazione e la risoluzione dei colli di bottiglia della performance del percorso di rendering critico richiede una buona conoscenza delle insidie comuni. Facciamo un tour pratico ed estraiamo i pattern di performance comuni che faciliteranno l'ottimizzazione delle tue pagine.
</p>


{% include shared/toc.liquid %}

L'obiettivo di ottimizzare il percorso di rendering critico è quello di consentire al browser di disegnare la pagina il più rapidamente possibile: pagine più veloci offrono un impegno superiore, un maggior numero di pagine visualizzate e [conversione migliore](http://www.google.com/think/multiscreen/success.html). Di conseguenza, vogliamo ridurre il tempo che il visitatore deve trascorrere fissando una pagina vuota attraverso l'ottimizzazione delle risorse che sono caricate e nel relativo ordine.

Per facilitare l'illustrazione di questo processo, iniziamo con il caso più semplice possibile e costruiamo in modo incrementale la nostra pagina affinché includa risorse aggiuntive, stili e logica di applicazione. Durante questo processo, vedremo in che modo le cose possono andare storte e come poter ottimizzare ciascuno di questi casi.

Infine, un'ultima cosa prima di iniziare... finora ci siamo concentrati esclusivamente su ciò che accade nel browser una volta che la risorsa (file CSS, JS, o HTML) è disponibile per l'elaborazione e abbiamo ignorato il tempo necessario al recupero dalla cache o dalla rete. Nella prossima lezione approfondiremo come ottimizzare gli aspetti di networking della nostra applicazione con maggior dettaglio, ma nel frattempo (per rendere le cose più realistiche) daremo per scontato quanto segue:

* Il roundtrip della rete (latenza di propagazione) al server costerà 100 ms
* Il tempo di risposta del server sarà 100 ms per il documento HTML e 10 ms per tutti gli altri file

## L'esperienza Ciao mondo

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

Inizieremo con un markup HTML di base e un'immagine singola, senza CSS o JavaScript, quindi il massimo della semplicità. Adesso dai Chrome DevTools apriamo la barra temporale dell'attività di rete e ispezioniamo la sequenza delle risorse:

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

Come previsto, il download del file HTML ha richiesto ~200 ms. La parte trasparante della linea blu indica il tempo in cui il browser sta attendendo sulla rete, quindi che non sono stati ancora ricevuti byte di risposta, mentre la parte solida mostra il tempo per completare il download dopo che sono stati ricevuti i primi byte di risposta. Nel nostro esempio di cui sopra, il download HTML è piccolo (<4 K), quindi ci serve un singolo roundtrip per il recupero dell'intero file. Di conseguenza, il recupero del documento HTML richiede ~200 ms, con la metà trascorsa in attesa sulla rete e l'altra metà per la risposta del server.

Una volta che il contenuto HTML è disponibile, il browser deve analizzare i byte, convertirli in token e costruire la struttura DOM. DevTools segnala in modo pratico l'orario dell'evento DOMContentLoaded nella parte inferiore (216 ms), che corrisponde anche alla linea blu verticale. La distanza tra la fine del download HTML e la linea blu verticale (DOMContentLoaded) corrisponde al tempo che il browser ha impiegato per la costruzione della struttura DOM, in questo caso, solo pochi millisecondi.

Infine, noterai qualcosa d'interessante: la nostra 'incredibile foto' non ha bloccato l'evento domContentLoaded. Ne emerge che possiamo costruire la struttura di rendering e addirittura disegnare la pagina senza dover attendere ogni asset sulla pagina: **non tutte le risorse sono cruciali alla fornitura della fast first paint**. In realtà, come vedremo, quando parliamo di percorso di rendering critico solitamente parliamo di markup HTML, CSS e JavaScript. Le immagini non bloccano il rendering iniziale della pagina, sebbene, ovviamente, dovremmo cercare di assicurarci di ottenere le immagini disegnate anche il prima possibile.

Detto questo, l'evento di `load` (noto comunemente anche come `onload`) viene bloccato sull'immagine: DevTools segnala l'evento di onload a 335 ms. Ricorda che l'evento di onload segna il punto in cui **tutte le risorse** necessarie alla pagina sono state scaricate ed elaborate, questo è il punto in cui il rotante di caricamento può interrompere la rotazione nel browser e viene contrassegnato dalla linea verticale rossa nella sequenza.


## Aggiunta di JavaScript e CSS all'insieme

La nostra pagina 'Esperienza ciao mondo' potrebbe sembrare semplice in apparenza, ma ci sono molte cose in ballo in sottofondo per metterla in atto. Detto questo, in pratica ci servirà anche molto più di HTML: è possibile che avremo un foglio di stile CSS e uno o più script per aggiungere interattività alla nostra pagina. Aggiungiamo entrambe le cose all'insieme e vediamo che succede:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Prima di aggiungere JavaScript e CSS:_

<img src="images/waterfall-dom.png" alt="DOM CRP" class="center">

_Con JavaScript e CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

L'aggiunta di file esterni CSS e JavaScript ha aggiunto due richieste ulteriori alla nostra cascata e tutte sono state inviate nel medesimo momento dal browser; fin qui tutto bene. Tuttavia, **tieni presente che adesso vi è una differenza di tempo molto più piccola tra gli eventi domContentLoaded e onload. Cosa è successo?**

* A differenza del nostro esempio di HTML semplice, adesso dobbiamo anche recuperare e analizzare il file CSS per costruire CSSOM e sappiamo che ci serve sia DOM che CSSOM per costruire la struttura di rendering.
* Dato che sulla nostra pagina abbiamo anche un parser che blocca il file JavaScript sulla nostra pagina, l'evento domContentLoaded viene bloccato finché il file CSS non è stato scaricato e analizzato: JavaScript potrebbe eseguire una query a CSSOM, per questo motivo dobbiamo bloccare e aspettare CSS prima di poter eseguire JavaScript.

**Cosa accadrebbe se sostituissimo il nostro script esterno con uno script inline?** Una domanda apparentemente irrilevante ma in realtà molto complicata. Sembrerebbe che, sebbene lo script sia stato reso inline direttamente nella pagina, l'unico modo affidabile di sapere ciò che lo script intende fare è eseguirlo e, come già sappiamo, non possiamo farlo finché CSSOM è costruito.  In breve, il JavaScript reso inline è anch'esso blocco parser.

Detto questo, nonostante il blocco su CSS, rendere inline lo script accelererà il rendering della pagina? Se l'ultimo scenario era complicato, allora questo lo è ancora di più. Proviamo e vediamo cosa succede...

_JavaScript esterno:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript inline:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM e JS inline" class="center">

Stiamo eseguendo una richiesta di meno, ma i nostri tempi di onload e domContentLoaded sono effettivamente i medesimi, perché? Sappiamo che non importa se JavaScript sia inline o caricato esternamente, perché non appena il browser arriverà al tag script si bloccherà e attenderà la costruzione di CSSOM. Inoltre, nel nostro primo esempio, sia CSS che JavaScript vengono scaricati in parallelo dal browser e termineranno più o meno nello stesso momento. Di conseguenza, in questa istanza particolare, rendere inline il codice JavaScript non ci aiuta molto. Dunque siamo bloccati e non c'è niente che possiamo fare per accelerare il rendering della pagina? In realtà disponiamo di numerose strategie differenti.

Innanzitutto, ricorda che tutti gli script inline bloccano il parser, ma per gli script esterni possiamo aggiungere la parola chiave `async` per sbloccare il parser. Annulliamo il nostro inline e facciamo una prova:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_JavaScript (esterno) con blocco parser:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript (esterno) async:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, JS async " class="center">

Molto meglio. L'evento parte poco dopo l'analisi dell'HTML: il browser sa che non deve bloccarsi su JavaScript e dato che non vi sono altri script di blocco parser, la costruzione CSSOM può anch'essa procedere in parallelo.

In alternativa, avremmo potuto provare un approccio differente e rendere inline sia CSS che JavaScript:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, CSS inline, JS inline" class="center">

Nota che il tempo di _domContentLoaded_ è effettivamente lo stesso dell'esempio precedente: invece di contrassegnare il nostro JavaScript come async, abbiamo reso inline sia CSS che JS all'interno della pagina stessa. Questo ha reso la nostra pagina HTML molto più grande, ma il lato positivo è che il browser non deve aspettare per il recupero di risorse esterne, tutto è già lì nella pagina.

Come puoi vedere, persino con una pagina molto semplice, l'ottimizzazione del percorso di rendering critico è un esercizio non irrilevante: dobbiamo capire il grafico di dipendenze tra le varie risorse, identificare le risorse critiche e scegliere tra le diverse strategie la modalità di inclusione di quelle risorse sulla pagina. Non esiste una sola soluzione al problema: ogni pagina è diversa e dovrai seguire un processo simile per conto tuo per scoprire la strategia ottimale.

Detto questo, vediamo se possiamo fare un passo indietro e identificare alcuni pattern di performance generali...


## Pattern di performance

La pagina più semplice possibile è costituita solo da markup HTML: niente CSS, JavaScript o altri tipi di risorse. Per eseguire il rendering di questa pagina, il browser deve avviare la richiesta, attendere l'arrivo del documento HTML, analizzarlo, costruire il DOM e infine eseguirne il rendering sullo schermo:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="Ciao mondo CRP" class="center">

**Il tempo tra T<sub>0</sub> e T<sub>1</sub> acquisisce i tempi di elaborazione della rete e del server.** Nel caso migliore (se il file HTML è piccolo), tutto quello che ci servirà è un roundtrip di rete per recuperare l'intero documento: a causa delle modalità di funzionamento dei protocolli TCP, i file di maggiori dimensioni potrebbero richiedere più roundtrip, questo è un argomento su cui torneremo in una lezione futura. **Di conseguenza, possiamo dire che la pagina di cui sopra, nel caso migliore, ha un percorso di rendering critico del roundtrip (minimo).**

Adesso, valutiamo la stessa pagina con un file CSS esterno:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

Ancora una volta, affrontiamo un roundtrip di rete per recuperare il documento HTML, quindi il markup recuperato ci informa che ci servirà anche il file CSS: questo significa che il browser deve tornare al server e ottenere il CSS prima che possa eseguire il rendering della pagina sullo schermo. **Di conseguenza, questa pagina affronterà un minimo di due roundtrip prima di poter visualizzare la pagina**: ancora una volta, il file CSS potrebbe eseguire multipli roundtrip, da qui l'enfasi su 'minimo'.

Definiamo il vocabolario che utilizzeremo per descrivere il percorso di rendering critico:

* **Risorsa critica:** risorsa che potrebbe bloccare il rendering iniziale della pagina.
* **Lunghezza percorso critico:** numero di roundtrip, o il tempo totale necessario a recuperare tutte le risorse critiche.
* **Byte critici:** quantità totale di byte necessari a ottenere il primo rendering della pagina, che è la somma delle dimensioni file di trasferimento di tutte le risorse critiche.
Il nostro primo esempio con una singola pagina HTML conteneva un'unica risorsa critica (il documento HTML), la lunghezza del percorso critico era inoltre uguale a un roundtrip di rete (presumendo che il file sia piccolo) e i byte totali critici erano poco più delle dimensioni di trasferimento del documento HTML stesso.

Adesso confrontiamolo alle caratteristiche del percorso critico degli esempi HTML e CSS di cui sopra:

<img src="images/analysis-dom-css.png" alt="DOM e CSSOM CRP" class="center">

* **2** risorse critiche
* **2** o più roundtrip per la lunghezza del percorso critico minima
* **9** KB di byte critici

Ci serve sia HTML che CSS per costruire la struttura di rendering, di conseguenza sia HTML che CSS sono risorse critiche: CSS viene recuperato solo dopo che il browser ottiene il documento HTML, dunque la lunghezza del percorso critico è come minimo due roundtrip, entrambe le risorse aggiungono un totale di 9 KB di byte critici.

Ok, adesso aggiungiamo un altro file JavaScript all'insieme.

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

Abbiamo aggiunto app.js, che è un asset JavaScript esterno della pagina e, come ormai sappiamo, è una risorsa per il blocco del parser (dunque critica). Ancora peggio, per poter eseguire il file JavaScript dovremo anche bloccare e aspettare CSSOM, ricorda che JavaScript può eseguire una query a CSSOM e quindi il browser si fermerà finché non sarà stato scaricato `style.css` e CSSOM non sarà stato costruito.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript CRP" class="center">

Detto questo, in pratica, se guardiamo alla 'sequenza di rete' di questa pagina, noterai che sia le richieste CSS che JavaScript saranno avviate più o meno nello stesso momento: il browser ottiene l'HTML, scopre entrambe le risorse e avvia le due richieste. Di conseguenza, la pagina di cui sopra presenta le seguenti caratteristiche del percorso critico:

* **3** risorse critiche
* **2** o più roundtrip per la lunghezza del percorso critico minima
* **11** KB di byte critici

Adesso abbiamo tre risorse critiche che arrivano a 11 KB di byte critici, ma la nostra lunghezza del percorso critico è ancora due roundtrip perché possiamo trasferire CSS e JavaScript in parallelo. **Individuare le caratteristiche del tuo percorso di rendering critico significa essere in grado di identificare le risorse critiche e anche comprendere le modalità in cui il browser ne pianificherà il recupero.** Procediamo con il nostro esempio...

Dopo aver parlato con i nostri sviluppatori del sito, ci siamo resi conto che il JavaScript che abbiamo incluso sulla nostra pagina non deve bloccare: è presente analisi e altro codice che non deve bloccare il rendering della pagina. Sapendo questo, possiamo aggiungere l'attributo `async` al tag script per sbloccare il parser:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, async JavaScript CRP" class="center">

Rendere lo script asincrono presenta numerosi vantaggi:

* Lo script non blocca più il parser e non fa parte del percorso di rendering critico
* Dato che non ci sono altri script critici, nemmeno CSS deve bloccare l'evento domContentLoaded
* Prima viene avviato l'evento domContentLoaded, prima l'altra logica delle applicazioni potrà iniziare l'esecuzione

Di conseguenza, la nostra pagina ottimizzata è tornata a due risorse critiche (HTML e CSS), con una lunghezza del percorso critico di due roundtrip e un totale di 9 KB di byte critici.

Infine, poniamo che il foglio di stile CSS fosse necessario solo per la stampa. Che aspetto avrebbe?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, CSS non bloccante e CRP JavaScript async" class="center">

Dato che la risorsa style.css viene utilizzata solo per la stampa, il browser non la deve bloccarsi su di esso per eseguire il rendering della pagina. Quindi, non appena la costruzione DOM è completa, il browser dispone di informazioni sufficienti per eseguire il rendering della pagina. Di conseguenza, questa pagina presenta solamente una singola risorsa critica (il documento HTML) e la lunghezza minima del percorso di rendering critico è un roundtrip.



