project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript attiva spesso modifiche visive. A volte ciò avviene direttamente attraverso le manipolazioni di stile e talvolta i calcoli portano a cambiamenti visivi, come la ricerca o l'ordinamento dei dati. Il JavaScript eseguito al momento sbagliato o di lunga durata è una delle cause comuni dei problemi di prestazioni. Dovresti cercare di minimizzarne l'impatto quando possibile.

{# wf_updated_on: 2017-12-12 #}
{# wf_published_on: 2015-03-20 #}
{# wf_blink_components: Blink>JavaScript #}

# Ottimizza l'esecuzione di JavaScript {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

JavaScript spesso attiva modifiche visive. A volte ciò avviene direttamente
attraverso le manipolazioni di stile e talvolta i calcoli portano a cambiamenti
visivi, come la ricerca o l'ordinamento dei dati. Il JavaScript eseguito al
momento sbagliato o di lunga durata è una delle cause comuni dei problemi di
prestazioni. Dovresti cercare di minimizzarne l'impatto quando possibile.

Il profiling delle prestazioni di JavaScript può essere qualcosa di artistico,
perché il codice JavaScript che scrivi non assomiglia al codice che viene
effettivamente eseguito. I browser moderni utilizzano compilatori JIT e tutti i
tipi di ottimizzazioni e trucchi per tentare di offrire un'esecuzione più veloce
possibile, e questo cambia sostanzialmente le dinamiche del codice.

Note: se vuoi davvero vedere JIT in azione, dai un'occhiata a <a
href="http://mrale.ph/irhydra/2/">IRHydra <sup>2</sup> di Vyacheslav Egorov</a>
. Mostra lo stato intermedio del codice JavaScript quando il motore JavaScript
di Chrome, V8, lo sta ottimizzando.

Detto questo, tuttavia, ci sono alcune cose che puoi sicuramente fare per
aiutare le tue app a eseguire bene JavaScript.

### TL;DR {: .hide-from-toc }

- Evita setTimeout o setInterval per gli aggiornamenti visivi; usa sempre
requestAnimationFrame.
- Sposta il JavaScript di lunga esecuzione dal thread principale ai Web Workers.
- Utilizza le microattività per apportare modifiche al DOM su più frame.
- Utilizza Timeline e JavaScript Profiler di Chrome DevTools per valutare
l'impatto di JavaScript.

## Utilizza `requestAnimationFrame` per le modifiche visive

Quando i cambiamenti visivi stanno accadendo sullo schermo, vuoi fare il tuo
lavoro al momento giusto per il browser, che è proprio all'inizio del frame.
L'unico modo per garantire che il tuo JavaScript venga eseguito all'inizio di un
frame è utilizzare `requestAnimationFrame` .

```
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
```

I framework o samples possono utilizzare `setTimeout` o `setInterval` per
apportare modifiche visive come animazioni, ma il problema di questo approccio è
che il callback verrà eseguito ad un *certo punto* del frame, probabilmente proprio
alla fine, e questo può spesso avere l'effetto di far saltare un
frame, risultando in jank.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="setTimeout
causing the browser to miss a frame.">

Infatti, jQuery utilizzava `setTimeout` per il suo comportamento `animate` . È
stato modificato per utilizzare `requestAnimationFrame` nella versione 3. Se
utilizzi la versione precedente di jQuery, è possibile <a
href="https://github.com/gnarf/jquery-requestAnimationFrame"
data-md-type="link">applicare una patch per utilizzare
`requestAnimationFrame`</a>, che è fortemente consigliato.

## Riduci la complessità o utilizza Web Workers

JavaScript gira sul thread principale del browser, accanto a calcoli di stile,
layout e, in molti casi, paint. Se il tuo JavaScript viene eseguito per un lungo
periodo, bloccherà queste altre attività, causando la potenziale perdita dei
frame.

Cerca di vagliare quando eseguire JavaScript e per quanto tempo. Ad
esempio, se ti trovi in un'animazione come lo scorrimento, dovresti idealmente
provare a mantenere il tuo JavaScript pressapoco per **3-4 ms**. Esecuzioni più
prolungate rischiano di richiedere troppo tempo. Se sei in un periodo di idle, puoi
concederti un approccio più rilassato riguardo al tempo impiegato.

In molti casi è possibile spostare il lavoro di calcolo puro sui [Web
Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage)
se, ad esempio, non richiede l'accesso DOM. La manipolazione o l'attraversamento
dei dati, come l'ordinamento o la ricerca, sono spesso adatti a questo modello,
così come il caricamento e la generazione del modello.

```
var dataSortWorker = new Worker("sort-worker.js");
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
   var sortedData = evt.data;
   // Update data on screen...
});
```

Non tutto il lavoro può adattarsi a questo modello: i Web Workers non hanno
accesso DOM. Laddove il tuo lavoro deve essere sul thread principale, considera
un approccio di batching, in cui segmenti una grande attività in microattività,
ognuna delle quali richiede non più di qualche millisecondo, da eseguire
all'interno dei gestori `requestAnimationFrame` su ogni frame.

```
var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

function processTaskList(taskStartTime) {
  var taskFinishTime;

  do {
    // Assume the next task is pushed onto a stack.
    var nextTask = taskList.pop();

    // Process nextTask.
    processTask(nextTask);

    // Go again if there’s enough time to do the next task.
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);

  if (taskList.length > 0)
    requestAnimationFrame(processTaskList);

}
```

Questo approccio ha delle conseguenze sull'UX e sull'UI, quindi dovrai assicurarti che
l'utente sappia quando un'attività è in fase di elaborazione, [usando un indicatore
di progresso o di
attività](https://www.google.com/design/spec/components/progress-activity.html)
. In ogni caso questo approccio manterrà libero il thread principale della tua
app, consentendole di rimanere reattiva alle interazioni con l'utente.

## Conosci la "frame tax" del tuo JavaScript

Quando si valuta un framework, una libreria o il proprio codice, è importante
determinare le risorse necessarie per eseguire il codice JavaScript su base frame-by-frame.
Ciò è particolarmente importante quando si eseguono operazioni di animazione
critiche per le prestazioni come la transizione o lo scorrimento.

Il pannello delle prestazioni di Chrome DevTools è il modo migliore per misurare
come si comporta il tuo JavaScript. Normalmente ottieni record di basso livello come
questo:

<img src="images/optimize-javascript-execution/low-js-detail.png" alt="A
performance recording in Chrome DevTools">

La sezione **Main** fornisce il Flame Chart delle chiamate JavaScript in modo
da poter analizzare esattamente quali funzioni sono state chiamate e il
tempo impiegato per ognuna.

Grazie a queste informazioni, puoi valutare l'impatto delle prestazioni
JavaScript sulla tua applicazione e iniziare a trovare e correggere
eventuali hotspot in cui le funzioni impiegano troppo tempo per essere eseguite.
Come accennato in precedenza dovresti cercare di rimuovere JavaScript di
esecuzione lunga o, se ciò non è possibile, spostarlo su un Web Worker liberando
il thread principale per continuare con altre attività.

Per informazioni su come utilizzare il pannello delle prestazioni consulta
[Guida introduttiva all'analisi delle prestazioni
runtime](/web/tools/chrome-devtools/evaluate-performance/) .

## Evita la micro-ottimizzazione del tuo JavaScript

Potresti trovare interessante che il browser può eseguire una versione di
un'attività 100 volte più velocemente di un'altra, come una richiesta e
`offsetTop` dell'elemento sono più veloci del calcolo `getBoundingClientRect()` , ma è
quasi sempre vero che userai queste funzioni poche volte per ogni frame, quindi
spesso non vale la pena concentrarsi su questo aspetto delle
prestazioni JavaScript. In genere risparmi solo frazioni di millisecondi.

Se stai realizzando un gioco o un'applicazione onerosa dal punto di vista
computazionale, probabilmente non dovrai seguire questi consigli, dato che invece di solito
si cerca di includere tutti i possibili calcoli in ogni singolo frame, e in tal caso tutto
aiuta.

In breve, dovresti fare molta attenzione alle micro-ottimizzazioni perché in
genere non si associano al tipo di applicazione che stai creando.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
