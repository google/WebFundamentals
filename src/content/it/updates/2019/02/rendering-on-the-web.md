project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags:
fundamentals, performance, app-shell #} {# wf_featured_image:
/web/updates/images/2019/02/rendering-on-the-web/icon.png #} {#
wf_featured_snippet: Where should we implement logic and rendering in our
applications? Should we use Server Side Rendering? What about Rehydration? Let's
find some answers! #} {# wf_blink_components: N/A #}

# Rendering sul Web {: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include
"web/_shared/contributors/addyosmani.html" %}

Come sviluppatori, siamo spesso di fronte a decisioni che influenzeranno
l'intera architettura delle nostre applicazioni. Una delle decisioni
fondamentali che gli sviluppatori Web devono prendere è dove implementare la
logica e il rendering nella loro applicazione. Questo può essere difficile, dal
momento che esistono diversi modi per creare un sito Web.

La nostra comprensione di questo spazio è influenzata dal nostro lavoro in
Chrome che parla con grandi siti negli ultimi anni. In generale, incoraggiamo
gli sviluppatori a considerare il rendering del server o il rendering statico su
un approccio di reidratazione completo.

Per comprendere meglio le architetture che scegliamo quando prendiamo questa
decisione, dobbiamo avere una solida conoscenza di ogni approccio e una
terminologia coerente da usare quando ne parliamo. Le differenze tra questi
approcci aiutano a illustrare i compromessi del rendering sul web attraverso
l'obiettivo delle prestazioni.

## Terminologia {: #terminology }

**Rendering**

- **SSR:** Rendering lato server **:** rendering di un'app lato client o
universale in HTML sul server.
- **CSR:** Rendering lato client **:** rendering di un'app in un browser,
generalmente utilizzando il DOM.
- **Reidratazione:** "avvio" delle viste JavaScript sul client in modo tale da
riutilizzare l'albero e i dati DOM del codice HTML renderizzati dal server.
- **Prerendering:** esecuzione di un'applicazione lato client al momento della
creazione per acquisire il suo stato iniziale come HTML statico.

**Prestazione**

- **TTFB:** Time to First Byte - visto come il tempo tra il clic di un
collegamento e il primo bit di contenuto in arrivo.
- **FP:** First Paint - la prima volta che un pixel diventa visibile all'utente.
- **FCP:** First Contentful Paint - il momento in cui diventa visibile il
contenuto richiesto (corpo dell'articolo, ecc.).
- **TTI:** Time To Interactive - l'ora in cui una pagina diventa interattiva
(eventi collegati, ecc.).

## Rendering del server {: #server-rendering }

*Il rendering del server genera l'HTML completo per una pagina sul server in
risposta alla navigazione. Ciò evita ulteriori round trip per il recupero e la
creazione di modelli di dati sul client, poiché vengono gestiti prima che il
browser ottenga una risposta.*

Il rendering del server generalmente produce un [First
Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FP) e un [First Contentful
Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint)
(FCP) veloci. L'esecuzione della logica della pagina e il rendering sul server
consentono di evitare di inviare molti JavaScript al client, il che consente di
ottenere un [Time to
Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)
(TTI) veloce. Questo ha senso, dal momento che con il rendering del server stai
davvero solo inviando testo e collegamenti al browser dell'utente. Questo
approccio può funzionare bene per un ampio spettro di dispositivi e condizioni
di rete e apre interessanti ottimizzazioni del browser come l'analisi dei
documenti in streaming.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

Con il rendering del server, è improbabile che gli utenti rimangano in attesa
dell'elaborazione di JavaScript associato alla CPU prima di poter utilizzare il
sito. Anche quando [JS di terze
parti](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)
non può essere evitato, l'uso del rendering del server per ridurre i propri
[costi JS
di](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)
terze parti può darti più "
[budget](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)
" per il resto. Tuttavia, questo approccio presenta uno svantaggio principale:
la generazione di pagine sul server richiede tempo, che spesso può portare a un
[Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) (TTFB)
più lento.

Se il rendering del server è sufficiente per la tua applicazione dipende in gran
parte dal tipo di esperienza che stai creando. C'è un dibattito di vecchia data
sulle applicazioni corrette del rendering server rispetto al rendering lato
client, ma è importante ricordare che è possibile scegliere di utilizzare il
rendering server per alcune pagine e non altre. Alcuni siti hanno adottato con
successo tecniche di rendering ibrido.
[Il](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
server
[Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
esegue il rendering delle sue pagine di destinazione relativamente statiche,
mentre
[preleva](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)
il JS per le pagine ad alta interazione, offrendo a queste pagine più pesanti
rese dal client una maggiore possibilità di caricamento rapido.

Molti framework, librerie e architetture moderne rendono possibile il rendering
della stessa applicazione sia sul client che sul server. Queste tecniche possono
essere utilizzate per il rendering del server, tuttavia è importante notare che
le architetture in cui il rendering avviene sia sul server ***che*** sul client
sono la loro classe di soluzione con caratteristiche prestazionali e compromessi
molto diversi. Gli utenti di React possono usare [renderToString
()](https://reactjs.org/docs/react-dom-server.html) o soluzioni costruite su di
esso come [Next.js](https://nextjs.org) per il rendering del server. Gli utenti
di Vue possono consultare la [guida al rendering](https://ssr.vuejs.org) del
[server](https://ssr.vuejs.org) di Vue o [Nuxt](https://nuxtjs.org) . Angular ha
[Universal](https://angular.io/guide/universal) . Le soluzioni più popolari
impiegano tuttavia una qualche forma di idratazione, quindi sii consapevole
dell'approccio in uso prima di selezionare uno strumento.

## Rendering statico {: #static-rendering }

[Il rendering
statico](https://frontarm.com/articles/static-vs-server-rendering/) avviene al
momento della creazione e offre una prima pittura veloce, una prima pittura
soddisfacente e un tempo interattivo, supponendo che la quantità di JS sul lato
client sia limitata. A differenza del rendering server, riesce anche a ottenere
un Time To First Byte costantemente veloce, poiché l'HTML per una pagina non
deve essere generato al volo. Generalmente, il rendering statico significa
produrre in anticipo un file HTML separato per ciascun URL. Con le risposte HTML
generate in anticipo, i rendering statici possono essere distribuiti su più CDN
per sfruttare la memorizzazione nella cache dei bordi.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Le soluzioni per il rendering statico sono disponibili in tutte le forme e
dimensioni. Strumenti come [Gatsby](https://www.gatsbyjs.org) sono progettati
per far credere agli sviluppatori che la loro applicazione venga renderizzata in
modo dinamico piuttosto che generata come fase di creazione. Altri, come
[Jekyl](https://jekyllrb.com) e [Metalsmith](https://metalsmith.io) abbracciano
la loro staticità, fornendo un approccio più template-driven.

Uno degli svantaggi del rendering statico è che i singoli file HTML devono
essere generati per ogni possibile URL. Questo può essere impegnativo o
addirittura impossibile quando non puoi prevedere quali URL saranno anticipati o
per i siti con un gran numero di pagine uniche.

Gli utenti di React potrebbero avere familiarità con l' [esportazione statica
di](https://nextjs.org/learn/excel/static-html-export/)
[Gatsby](https://www.gatsbyjs.org) ,
[Next.js](https://nextjs.org/learn/excel/static-html-export/) o
[Navi](https://frontarm.com/navi/) : tutto ciò rende conveniente l'autore
utilizzando i componenti. Tuttavia, è importante comprendere la differenza tra
rendering statico e prerendering: le pagine con rendering statico sono
interattive senza la necessità di eseguire molti JS sul lato client, mentre il
prerendering migliora il primo disegno o il primo disegno contento di
un'applicazione a singola pagina su cui deve essere avviato il client affinché
le pagine siano veramente interattive.

Se non sei sicuro che una determinata soluzione sia il rendering statico o il
prerendering, prova questo test: disabilita JavaScript e carica le pagine Web
create. Per le pagine con rendering statico, la maggior parte delle funzionalità
continuerà a esistere senza JavaScript abilitato. Per le pagine prerenderizzate,
potrebbero esserci ancora alcune funzionalità di base come i collegamenti, ma la
maggior parte della pagina sarà inerte.

Un altro test utile è rallentare la rete utilizzando Chrome DevTools e osservare
la quantità di JavaScript scaricata prima che una pagina diventi interattiva. Il
prerendering richiede generalmente più JavaScript per essere interattivo e
JavaScript tende a essere più complesso dell'approccio [Progressive
Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
utilizzato dal rendering statico.

## Rendering server vs rendering statico {: #server-vs-static }

Il rendering del server non è un proiettile d'argento: la sua natura dinamica
può
[comportare](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
costi [generali di calcolo
significativi](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)
. Molte soluzioni di rendering del server non si scaricano in anticipo, possono
ritardare il TTFB o raddoppiare i dati inviati (ad esempio, lo stato inline
utilizzato da JS sul client). In React, renderToString () può essere lento in
quanto sincrono e a thread singolo. Rendere "corretto" il rendering del server
può comportare la ricerca o la creazione di una soluzione per la [memorizzazione
nella cache dei
componenti](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
, la gestione del consumo di memoria, l'applicazione di tecniche di
[memoization](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
e molte altre problematiche. In genere stai elaborando / ricostruendo la stessa
applicazione più volte, una volta sul client e una volta sul server. Solo perché
il rendering del server può far apparire qualcosa prima, all'improvviso non
significa che hai meno lavoro da fare.

Il rendering del server produce HTML su richiesta per ciascun URL, ma può essere
più lento della semplice pubblicazione di contenuto con rendering statico. Se è
possibile aggiungere ulteriori legwork, il rendering del server + la
[memorizzazione nella cache
HTML](https://freecontent.manning.com/caching-in-react/) può ridurre
notevolmente i tempi di rendering del server. L'aspetto positivo del rendering
server è la capacità di estrarre più dati "live" e rispondere a una serie più
completa di richieste di quanto sia possibile con il rendering statico. Le
pagine che richiedono personalizzazione sono un esempio concreto del tipo di
richiesta che non funzionerebbe bene con il rendering statico.

Il rendering del server può anche presentare decisioni interessanti durante la
creazione di un [PWA](https://developers.google.com/web/progressive-web-apps/) .
È preferibile utilizzare la memorizzazione nella cache del [lavoratore del
servizio
a](https://developers.google.com/web/fundamentals/primers/service-workers/)
pagina intera o semplicemente rendere singoli contenuti del server?

## Rendering lato client (CSR) {: #csr }

*Rendering lato client (CSR) significa rendering delle pagine direttamente nel
browser utilizzando JavaScript. Tutta la logica, il recupero dei dati, il
templating e il routing sono gestiti sul client anziché sul server.*

Il rendering sul lato client può essere difficile da ottenere e mantenere veloce
per i dispositivi mobili. Può avvicinarsi alle prestazioni del puro rendering
del server se fa un lavoro minimo, mantenendo un [budget JavaScript
limitato](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144) e
offrendo valore nel minor numero di
[RTT](https://en.wikipedia.org/wiki/Round-trip_delay_time) possibile. Script e
dati critici possono essere consegnati prima usando il [Server HTTP / 2
Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) o
`<link rel=preload>` , che fa funzionare il parser per te prima. Vale la pena
valutare modelli come
[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
per garantire che le navigazioni iniziali e successive siano istantanee.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

Il principale svantaggio del rendering lato client è che la quantità di
JavaScript richiesta tende a crescere man mano che un'applicazione cresce. Ciò
diventa particolarmente difficile con l'aggiunta di nuove librerie JavaScript,
polyfill e codice di terze parti, che competono per la potenza di elaborazione e
spesso devono essere elaborati prima di poter visualizzare il contenuto di una
pagina. Le esperienze sviluppate con CSR che si basano su grandi bundle
JavaScript dovrebbero prendere in considerazione la [suddivisione aggressiva del
codice](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/)
ed essere sicuri di caricare lentamente JavaScript: "serve solo ciò di cui hai
bisogno, quando ne hai bisogno". Per esperienze con poca o nessuna
interattività, il rendering del server può rappresentare una soluzione più
scalabile a questi problemi.

Per le persone che creano un'applicazione a pagina singola, identificare le
parti principali dell'interfaccia utente condivise dalla maggior parte delle
pagine significa che è possibile applicare la tecnica di [memorizzazione nella
cache dell'applicazione
Shell](https://developers.google.com/web/updates/2015/11/app-shell) . In
combinazione con gli addetti all'assistenza, questo può migliorare notevolmente
le prestazioni percepite durante le visite ripetute.

## Combinazione di rendering server e CSR tramite reidratazione {: #rehydration }

Spesso definito Universal Rendering o semplicemente "SSR", questo approccio
tenta di appianare i compromessi tra il rendering lato client e il rendering
server eseguendo entrambi. Le richieste di navigazione come caricamenti di
pagine complete o ricariche vengono gestite da un server che esegue il rendering
dell'applicazione in HTML, quindi JavaScript e i dati utilizzati per il
rendering vengono incorporati nel documento risultante. Se implementato con
cura, ciò consente di ottenere una prima vernice contenta rapida proprio come il
rendering server, quindi "riprende" eseguendo nuovamente il rendering sul client
utilizzando una tecnica chiamata [(ri)
idratazione](https://docs.electrode.io/guides/general/server-side-data-hydration)
. Questa è una soluzione innovativa, ma può avere alcuni notevoli svantaggi
prestazionali.

Il principale svantaggio di SSR con reidratazione è che può avere un impatto
negativo significativo su Time To Interactive, anche se migliora First Paint. Le
pagine SSR sembrano spesso caricate in modo ingannevole e interattivo, ma non
possono effettivamente rispondere all'input fino a quando non viene eseguita la
JS sul lato client e i gestori di eventi sono stati collegati. Questo può
richiedere secondi o addirittura minuti sul cellulare.

Forse lo hai sperimentato tu stesso - per un periodo di tempo dopo che sembra
che una pagina sia stata caricata, facendo clic o toccando non fa nulla. Questo
diventa rapidamente frustrante ... *“Perché non succede nulla? Perché non riesco
a scorrere? "*

### Un problema di reidratazione: un'app al prezzo di due {: #rehydration-issues }

I problemi di reidratazione possono spesso essere peggiori dell'interattività
ritardata dovuta a JS. Affinché JavaScript sul lato client sia in grado di
"riprendere" con precisione da dove il server è stato interrotto senza dover
richiedere nuovamente tutti i dati utilizzati dal server per eseguire il
rendering del suo HTML, le attuali soluzioni SSR generalmente serializzano la
risposta da un'interfaccia utente dipendenze dei dati nel documento come tag di
script. Il documento HTML risultante contiene un alto livello di duplicazione:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

Come puoi vedere, il server sta restituendo una descrizione dell'interfaccia
utente dell'applicazione in risposta a una richiesta di navigazione, ma sta
anche restituendo i dati di origine utilizzati per comporre quell'interfaccia
utente e una copia completa dell'implementazione dell'interfaccia utente che
quindi si avvia sul client . Solo dopo che bundle.js ha terminato il caricamento
e l'esecuzione dell'interfaccia utente diventa interattiva.

Le metriche delle prestazioni raccolte da siti Web reali utilizzando la
reidratazione SSR indicano che il suo utilizzo dovrebbe essere fortemente
scoraggiato. In definitiva, la ragione sta nella User Experience: è estremamente
facile finire per lasciare gli utenti in una "valle misteriosa".

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

Tuttavia, c'è speranza per SSR con reidratazione. A breve termine, l'utilizzo
dell'SSR solo per contenuti altamente memorizzabili nella cache può ridurre il
ritardo TTFB, producendo risultati simili al prerendering. Reidratare in modo
[incrementale](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html)
, progressivo o parziale può essere la chiave per rendere questa tecnica più
praticabile in futuro.

## Rendering del server streaming e reidratazione progressiva {: #progressive-rehydration }

Il rendering dei server ha avuto una serie di sviluppi negli ultimi anni.

[Il rendering del server di
streaming](https://zeit.co/blog/streaming-server-rendering-at-spectrum) consente
di inviare HTML in blocchi che il browser può visualizzare progressivamente
quando viene ricevuto. Ciò può fornire una prima vernice veloce e una prima
vernice soddisfacente man mano che il markup arriva agli utenti più velocemente.
In React, i flussi essendo asincroni in [renderToNodeStream
()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) -
rispetto a renderToString sincrono - significa che la contropressione è gestita
bene.

Vale anche la pena tenere d'occhio la reidratazione progressiva e qualcosa che
React ha [esplorato](https://github.com/facebook/react/pull/14717) . Con questo
approccio, i singoli pezzi di un'applicazione renderizzata dal server vengono
“avviati” nel tempo, piuttosto che l'attuale approccio comune di
inizializzazione dell'intera applicazione in una sola volta. Ciò può aiutare a
ridurre la quantità di JavaScript richiesta per rendere interattive le pagine,
poiché l'aggiornamento sul lato client di parti a bassa priorità della pagina
può essere rinviato per impedire il blocco del thread principale. Può anche
aiutare a evitare una delle insidie di reidratazione SSR più comuni, in cui un
albero DOM renderizzato dal server viene distrutto e quindi immediatamente
ricostruito - molto spesso perché il rendering sincrono iniziale sul lato client
richiede dati che non erano del tutto pronti, forse in attesa di Promessa
risoluzione.

### Reidratazione parziale {: #partial-rehydration }

La reidratazione parziale si è rivelata difficile da attuare. Questo approccio è
un'estensione dell'idea di reidratazione progressiva, in cui vengono analizzati
i singoli pezzi (componenti / viste / alberi) da reidratare progressivamente e
vengono identificati quelli con scarsa interattività o nessuna reattività. Per
ciascuna di queste parti prevalentemente statiche, il codice JavaScript
corrispondente viene quindi trasformato in riferimenti inerti e funzionalità
decorative, riducendo il loro footprint lato client a quasi zero. L'approccio di
idratazione parziale comporta problemi e compromessi. Presenta alcune sfide
interessanti per la memorizzazione nella cache e la navigazione sul lato client
significa che non possiamo supporre che l'HTML renderizzato dal server per parti
inerti dell'applicazione sia disponibile senza un caricamento completo della
pagina.

### Rendering trisomorfo {: #trisomorphic }

Se gli [addetti
all'assistenza](https://developers.google.com/web/fundamentals/primers/service-workers/)
sono un'opzione per te, anche il rendering "trisomorfo" può essere interessante.
È una tecnica in cui è possibile utilizzare il rendering del server di streaming
per le navigazioni iniziali / non JS e quindi fare in modo che il personale
dell'assistenza assuma il rendering dell'HTML per le navigazioni dopo
l'installazione. Ciò può mantenere aggiornati i componenti e i modelli
memorizzati nella cache e abilitare le navigazioni in stile SPA per il rendering
di nuove viste nella stessa sessione. Questo approccio funziona in modo ottimale
quando è possibile condividere lo stesso codice di modello e routing tra il
server, la pagina client e il lavoratore del servizio.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## Considerazioni SEO {: #seo }

I team spesso tengono conto dell'impatto del SEO quando scelgono una strategia
per il rendering sul Web. Il rendering del server viene spesso scelto per
offrire un'esperienza "completa" che i crawler possono interpretare con
facilità. I crawler [possono comprendere
JavaScript](https://web.dev/discoverable/how-search-works) , ma spesso ci sono
[limitazioni che](/search/docs/guides/rendering) vale la pena conoscere nel modo
in cui vengono visualizzate. Il rendering sul lato client può funzionare ma
spesso non senza ulteriori test e leg-work. Più recentemente [il rendering
dinamico](/search/docs/guides/dynamic-rendering) è diventato anche un'opzione
che vale la pena considerare se la tua architettura è fortemente guidata da
JavaScript lato client.

In caso di dubbio, lo strumento [Mobile Friendly
Test](https://search.google.com/test/mobile-friendly) è prezioso per testare che
l'approccio scelto fa quello che speri. Mostra un'anteprima visiva di come ogni
pagina appare al crawler di Google, il contenuto HTML serializzato trovato (dopo
l'esecuzione di JavaScript) e qualsiasi errore riscontrato durante il rendering.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## In conclusione ... {: #wrapup }

Quando si decide un approccio al rendering, misurare e comprendere quali sono i
colli di bottiglia. Valuta se il rendering statico o il rendering del server
possono arrivare al 90% del percorso. Va benissimo distribuire principalmente
HTML con JS minimo per un'esperienza interattiva. Ecco una pratica infografica
che mostra lo spettro server-client:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">

## Crediti {: #credits }

Grazie a tutti per le recensioni e l'ispirazione:

Jeffrey Posnick, Houssein Djirdeh, Shubhie Panicker, Chris Harrelson e Sebastian
Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
