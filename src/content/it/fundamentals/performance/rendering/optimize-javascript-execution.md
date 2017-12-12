project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript attiva spesso modifiche visive. A volte ciò avviene direttamente attraverso manipolazioni di stile e talvolta i calcoli portano a cambiamenti visivi, come la ricerca o l'ordinamento dei dati. Il JavaScript mal funzionante o di esecuzione lunga è una causa comune di problemi di prestazioni. Dovresti cercare di minimizzare il suo impatto quando possibile.

{# wf_updated_on: 2017-12-12 #}
{# wf_published_on: 2015-03-20 #}
{# wf_blink_components: Blink>JavaScript #}

# Ottimizza l'esecuzione di JavaScript {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

JavaScript spesso attiva modifiche visive. A volte ciò avviene direttamente
attraverso le manipolazioni di stile e talvolta i calcoli portano a cambiamenti
visivi, come la ricerca o l'ordinamento dei dati. Il JavaScript mal funzionante
o di lunga esecuzione è una causa comune di problemi di prestazioni. Dovresti
cercare di minimizzarne l'impatto quando possibile.

Il profiling delle prestazioni di JavaScript può essere qualcosa di artistico,
perché il codice JavaScript che scrivi non assomiglia al codice che viene
effettivamente eseguito. I browser moderni utilizzano compilatori JIT e tutti i
tipi di ottimizzazioni e trucchi per tentare di darvi l'esecuzione più veloce
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
- Sposta JavaScript di esecuzione lunga da thread principale a Web Workers.
- Utilizza micro-attività per apportare modifiche al DOM su più frame.
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

Framework o samples possono utilizzare `setTimeout` o `setInterval` per
apportare modifiche visive come animazioni, ma il problema di questo approccio è
che callback verrà eseguito in *qualche punto* del frame, probabilmente proprio
alla fine, e questo può spesso avere l'effetto di causare la mancanza di un
frame, risultando in jank.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="setTimeout
causing the browser to miss a frame.">

Infatti, jQuery utilizzava `setTimeout` per il suo comportamento `animate` . È
stato modificato per utilizzare `requestAnimationFrame` nella versione 3. Se
utilizzi la versione precedente di jQuery, è possibile <a
href="https://github.com/gnarf/jquery-requestAnimationFrame"
data-md-type="link">applicare una patch per utilizzare
`requestAnimationFrame`</a>, come fortemente consigliato.

## Riduci la complessità o utilizza Web Workers

JavaScript gira sul thread principale del browser, accanto a calcoli di stile,
layout e, in molti casi, paint. Se il tuo JavaScript viene eseguito per un lungo
periodo, bloccherà queste altre attività, causando potenzialmente la perdita dei
frame.

Dovresti essere tattico su quando eseguire JavaScript e per quanto tempo. Ad
esempio, se ti trovi in ​​un'animazione come lo scorrimento, dovresti idealmente
cercare di mantenere il tuo JavaScript pressapoco per **3-4 ms** . Esecuzioni
prolungate rischiano di perdere troppo tempo. Se sei in un periodo di idle, puoi
permetterti di essere più rilassato riguardo al tempo impiegato.

In molti casi è possibile spostare il lavoro di calcolo puro sui [Web
Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage)
se, ad esempio, non richiedi accesso DOM. La manipolazione o l'attraversamento
dei dati, come l'ordinamento o la ricerca, sono spesso adatte a questo modello,
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
un approccio di batching, in cui segmenti una grande attività in micro-task,
ognuno dei quali richiede non più di qualche millisecondo, da eseguire
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

Ci sono conseguenze UX e UI per questo approccio e dovrai assicurarti che
l'utente sappia che un compito è in fase di elaborazione, [usando un indicatore
di progresso o di
attività](https://www.google.com/design/spec/components/progress-activity.html)
. In ogni caso questo approccio manterrà libero il thread principale della tua
app, aiutandolo a rimanere reattivo alle interazioni dell'utente.

## Conosci la "frame tax" del tuo JavaScript

Quando si valuta un framework, una libreria o il proprio codice, è importante
valutare quanto costa eseguire il codice JavaScript su una base frame-by-frame.
Ciò è particolarmente importante quando si eseguono operazioni di animazione
critiche per le prestazioni come la transizione o lo scorrimento.

Il pannello delle prestazioni di Chrome DevTools è il modo migliore per misurare
il costo del tuo JavaScript. Normalmente ottieni record di basso livello come
questo:

<img src="images/optimize-javascript-execution/low-js-detail.png" alt="A
performance recording in Chrome DevTools">

La sezione **Main** fornisce una flame chart delle chiamate JavaScript in modo
da poter analizzare esattamente quali funzioni sono state chiamate e quanto
tempo è stato speso per ognuna.

Grazie a queste informazioni è possibile valutare l'impatto delle prestazioni
JavaScript sulla propria applicazione e iniziare a trovare e correggere
eventuali hotspot in cui le funzioni impiegano troppo tempo per essere eseguite.
Come accennato in precedenza dovresti cercare di rimuovere JavaScript di
esecuzione lunga o, se ciò non è possibile, spostarlo su un Web Worker liberando
il thread principale per continuare con altre attività.

Per informazioni su come utilizzare il pannello delle prestazioni consulta
[Guida introduttiva all'analisi delle prestazioni
runtime](/web/tools/chrome-devtools/evaluate-performance/) .

## Evita la micro-ottimizzazione del tuo JavaScript

Può essere interessante sapere che il browser può eseguire una versione di
un'attività 100 volte più velocemente di un'altra cosa, come una richiesta e gli
elementi `offsetTop` è più veloce del calcolo `getBoundingClientRect()` , ma è
quasi sempre userai queste funzioni un piccolo numero di volte per frame, quindi
è normalmente sprecato lo sforzo di concentrarsi su questo aspetto delle
prestazioni JavaScript. In genere risparmi solo frazioni di millisecondi.

Se stai realizzando un gioco o un'applicazione onerosa dal punto di vista
computazionale probabilmente sei un'eccezione a questa guida, dato che di solito
stai calcolando un sacco di calcoli in un singolo frame, e in tal caso tutto
aiuta.

In breve, dovresti fare molta attenzione alle micro-ottimizzazioni perché in
genere non si associano al tipo di applicazione che stai creando.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
