project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mantieni bassi i costi di trasmissione di rete e di analisi/compilazione per JavaScript per garantire che le pagine diventino interattive rapidamente.

{# wf_updated_on: 2018-01-09 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# Ottimizzazione avvio JavaScript {: .page-title}

{% include "web/_shared/contributors/addyosmani.html" %}

Mentre costruiamo siti che fanno molto affidamento su JavaScript, a volte
paghiamo per ciò che inviamo in modi che non sempre possiamo facilmente vedere.
In questo articolo, spiegheremo perché una piccola **disciplina** può aiutarti a
far in modo che il tuo sito venga caricato e sia interattivo rapidamente sui
dispositivi mobili. Offrire meno JavaScript può significare meno tempo di
trasmissione di rete, meno codice da decomprimere e meno tempo per l'analisi e
la compilazione di questo JavaScript.

## Rete

Quando la maggior parte degli sviluppatori pensa al costo di JavaScript, pensano
in termini di **costi di download e di esecuzione** . L'invio di più byte di
JavaScript sulla linea richiede più tempo, rallentando la connessione di un
utente.

<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="When a browser requests a
resource, that resource needs to be fetched and then decompressed. In the case
of resources like JavaScript, they must be parsed and compiled prior to
execution.">

Questo può essere un problema, anche nei paesi del primo mondo, se l'**effettivo
tipo di connessione di rete** che un utente usa non è in realtà 3G, 4G o Wi-Fi.
Puoi trovarti in una caffetteria Wi-Fi, ma collegati ad un hotspot cellulare con
velocità 2G.

Puoi **ridurre** il costo del trasferimento di rete di JavaScript attraverso:

* **Invia solo il codice necessario ad un utente**.
    * Usa il [code-splitting](/web/updates/2017/06/supercharged-codesplit) per
    dividere il tuo JavaScript in ciò che è critico e in ciò che non lo è. I module bundlers come [webpack](https://webpack.js.org) supportano il
[code-splitting](https://webpack.js.org/guides/code-splitting/).
    * Usa il caricamento lazily per il codice non-critico.
* **Minification**
    * Usa [UglifyJS](https://github.com/mishoo/UglifyJS) per [minimizzare
il](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)
    codice ES5.
    * Usa [babel-minify](https://github.com/babel/minify) o
[uglify-es](https://www.npmjs.com/package/uglify-es) per minimizzare ES2015+.
* **Compressione**
    * Come minimo, usa
    [gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip)
    per comprimere le risorse basate sul testo.
    * Valuta l'utilizzo di
    [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
    ~[q11](https://twitter.com/paulcalvano/status/924660429846208514) . Brotli
    migliora il rapporto di compressione di gzip. Ha aiutato CertSimple a
    risparmiare il
    [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30)
    sulle dimensioni dei byte JS compressi e LinkedIn a risparmiare il
    [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression)
    sui tempi di caricamento.
* **Rimuovi il codice inutilizzato**.
    * Identifica il codice che può essere rimosso o caricato lazy con [ DevTools
    code coverage](/web/updates/2017/04/devtools-release-notes#coverage).
    * Usa [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) e
    browserlist per evitare la funzionalità di transpiling dei browser moderni.Gli
    sviluppatori avanzati possono trovare utile l'[analisi dei webpack
    bundle](https://github.com/webpack-contrib/webpack-bundle-analyzer) per
    identificare opportunità di eliminazione delle dipendenze non necessarie.
    * Per rimuovere il codice,
    vedere [tree-shaking](https://webpack.js.org/guides/tree-shaking/), per il
    [compilatore Closure](/closure/compiler/) ottimizzazioni avanzate e plug-in di
    ritaglio di libreria
    come[lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash)o per
    webpack[ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js)per
    librerie come Moment.js.
* **Cache del codice per ridurre i tempi di rete.**
    * Usa [HTTP
    caching](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
    per garantire che i browser memorizzino le risposte in modo efficace.
    Determinare la durata ottimale degli script (max-age) e fornire i token di
    convalida (ETag) per evitare il trasferimento di byte invariati.
    * Il caching di Service Worker può rendere resiliente alla rete la tua app e
    darti accesso a funzionalità come [la cache del codice di
V8](https://v8project.blogspot.com/2015/07/code-caching.html) .
    * Utilizzare la memorizzazione nella cache a lungo termine per evitare di
    dover recuperare nuovamente le risorse che non sono state modificate. Se si
    utilizza Webpack, consultare [hashing del nome del
    file](https://webpack.js.org/guides/caching/) .

## Parse / Compile

Una volta scaricato, uno dei costi **maggiori** di JavaScript è il tempo del
motore JS di **analisi/compilazione** di questo codice. In [Chrome
DevTools](web/tools/chrome-devtools/), parse e compile fanno parte del tempo
giallo "Scripting" nel pannello Performance.

<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png">

Le schede Bottom-Up e Call Tree mostrano esatte frequenze di analisi /
compilazione:

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"> <figcaption>Pannello
delle prestazioni di Chrome DevTools > Bottom-Up. Con le Runtime Call Stats di
V8 abilitate, possiamo vedere il tempo trascorso per fasi come Parse e
Compile</figcaption> </figure>

Note: il supporto del pannello delle prestazioni per Runtime Call Stats è
attualmente sperimentale. Per abilitarlo, vai in chrome:
//flags/#enable-devtools-experiments -> restart Chrome -> vai a DevTools ->
Impostazioni -> Esperimenti -> premi shift 6 volte -> seleziona l'opzione
chiamata `Timeline: V8 Runtime Call Stats on Timeline` e chiudi quindi riapri
DevTools.

Ma perché questo è importante?

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png">

Spendere parecchio tempo a elaborare/compilare il codice può ritardare
pesantemente la possibilità che un utente possa interagire con il tuo sito. Più
JavaScript invii, più tempo ci vorrà per analizzare e compilare prima che il tuo
sito sia interattivo.

> Byte-per-byte, ** JavaScript è più costoso da elaborare per il browser
rispetto ad una immagine di dimensioni equivalenti o un Web Font ** - Tom Dale

Rispetto a JavaScript, ci sono numerosi costi coinvolti nell'elaborazione di
immagini di dimensioni equivalenti (devono ancora essere decodificate!) Ma su
hardware mobile medio, JS ha maggiori probabilità di avere un impatto negativo
sull'interattività di una pagina.

<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"> <figcaption>I byte di
JavaScript e di immagine hanno costi molto diversi. Le immagini di solito non
bloccano il thread principale o impediscono l'interazione con le interfacce
mentre vengono decodificate e rasterizzate. Invece, JS può ritardare
l'interattività a causa di analisi, compilazione e costi di
esecuzione.</figcaption> </figure>

Quando parliamo di analisi e compilazione lenta il contesto è importante -
stiamo parlando di telefoni cellulari **medi**. **Gli utenti medi possono avere
telefoni con CPU e GPU lente, senza cache L2/L3 e potrebbero avere anche vincoli
di memoria.**

> Le funzionalità di rete e le funzionalità del dispositivo non sempre
corrispondono. Un utente con una straordinaria connessione in fibra ottica non
ha necessariamente la migliore CPU per analizzare e valutare il codice
JavaScript inviato al proprio dispositivo. Questo è vero anche in caso
inverso...una terribile connessione di rete, ma con una CPU molto veloce. -
Kristofer Baxter, LinkedIn

Qui sotto possiamo vedere il costo di analisi di ~1MB di JavaScript decompresso
(semplice) su hardware di fascia bassa e di fascia alta. **C'è una differenza di
2-5x volte nel tempo per analizzare/compilare il codice tra i telefoni più
veloci sul mercato e quelli medi** .

<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"> <figcaption>Questo
grafico evidenzia i tempi di analisi per un pacchetto di 1 MB di JavaScript
(circa 250 KB in formato gzip) su dispositivi desktop e mobili di classi
diverse. Quando si considera il costo di analisi, sono le cifre decompresse da
considerare ad esempio  250KB gzip di JS si decomprime in ~1MB di
codice.</figcaption> </figure>

Che dire di un sito reale, come CNN.com?

**Sull'iPhone 8 di fascia alta ci vogliono solo ~4 secondi per
analizzare/compilare JS della CNN rispetto ai ~13 secondi per un telefono medio
(Moto G4)** . Ciò può avere un impatto significativo sulla velocità con cui un
utente può interagire pienamente con questo sito.

<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"> <figcaption>Sopra
vediamo tempi di analisi paragonando le prestazioni del chip Apple A11 Bionic
allo Snapdragon 617 in un hardware Android medio.</figcaption> </figure>

Ciò evidenzia l'importanza del test su hardware **medio** (come il Moto G4)
invece del solo telefono che potrebbe essere nella tua tasca. Il contesto conta
comunque: **ottimizza per il dispositivo e le condizioni di rete dei tuoi
utenti.**

<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"> <figcaption>Google
Analytics può fornire informazioni sulle <a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">classi
di dispositivi mobili con cui i</a> tuoi utenti reali accedono al tuo sito.
Questo può fornire l'opportunità di comprendere i reali vincoli CPU/GPU con cui
stanno operando.</figcaption> </figure>

**Stiamo inviando davvero troppo JavaScript? Err, possibilmente :)**

Utilizzando l'archivio HTTP (primi ~500K siti) per analizzare lo stato di
[JavaScript sui dispositivi
mobili](http://beta.httparchive.org/reports/state-of-javascript#bytesJs) ,
possiamo vedere che il 50% dei siti richiede più di 14 secondi per essere
interattivi. Questi siti trascorrono fino a 4 secondi solo per analizzare e
compilare JS.

<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png">

Calcola il tempo necessario per recuperare ed elaborare JS e altre risorse e
forse non sorprende che gli utenti possano essere lasciati ad aspettare un po
'prima di sentire le pagine pronte all'uso. Possiamo sicuramente fare meglio
qui.

**La rimozione di JavaScript non critico dalle tue pagine può ridurre i tempi di
trasmissione, l'analisi e la compilazione intensiva della CPU e il potenziale
sovraccarico della memoria. Questo aiuta anche a rendere più veloci le tue
pagine interattive.**

## Tempo di esecuzione

Non è solo le fasi di parse e compilazione possono avere un costo.
**L'esecuzione di JavaScript** (il codice in esecuzione una volta
analizzato/compilato) è una delle operazioni che devono verificarsi sul thread
principale. Lunghi tempi di esecuzione possono anche condizionare quanto tempo
un utente può interagire con il tuo sito.

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png">

> Se lo script viene eseguito per più di 50ms, il time-to-interactive viene
ritardato *dall'intero* periodo di tempo necessario per scaricare, compilare ed
eseguire il JS - Alex Russell

Per risolvere questo problema, JavaScript beneficia di essere in **piccoli
pezzi** per evitare di bloccare il thread principale. Approfondisci se puoi
ridurre la quantità di lavoro svolto durante l'esecuzione.

## Altri costi

JavaScript può influire sulle prestazioni della pagina in altri modi:

- Memoria. Le pagine possono apparire come jank o sospendere frequentemente a
causa di GC (garbage collection). Quando un browser recupera la memoria,
l'esecuzione di JS viene messa in pausa, quindi un browser che raccoglie spesso
garbage può sospendere l'esecuzione più frequentemente di quanto vorremmo. Evita
[perdite di memoria](/web/tools/chrome-devtools/memory-problems/) e frequenti
pause gc per mantenere libere le pagine.
- Durante il runtime, JavaScript di lunga esecuzione può bloccare le pagine che
causano il thread principale che non rispondono. Ridurre il lavoro in pezzi più
piccoli (utilizzando <code><a data-parent-segment-tag-id="1353935"
data-md-type="raw_html"
href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
o <code><a data-parent-segment-tag-id="1353937" data-md-type="raw_html"
href="web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
per la pianificazione) può ridurre al minimo i problemi di reattività.

## Modelli per ridurre i costi di consegna di JavaScript

Quando stai cercando di mantenere analisi/compilazione e i tempi di trasmissione
di rete per JavaScript lenti, ci sono schemi che possono essere d'aiuto come lo
chunking basato su route o [PRPL](/web/fundamentals/performance/prpl-pattern/).

### PRPL

PRPL (Push, Render, Pre-cache, Lazy-load) è un pattern che ottimizza
l'interattività attraverso il code-splitting e il caching aggressivo:

<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png">

Vediamo l'impatto che può avere.

Analizziamo il tempo di caricamento dei popolari siti per dispositivi mobili e
delle app Web progressive utilizzando le Call Call di V8. Come possiamo vedere,
il tempo di analisi (mostrato in arancione) è una parte significativa di dove
molti di questi siti trascorrono il loro tempo:

<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png">

[Wego](https://wego.com), un sito che utilizza PRPL, riesce a mantenere un tempo
di analisi basso per i loro percorsi, diventando interattivo molto rapidamente.
Molti degli altri siti hanno adottato code-splitting e performance budget per
provare a ridurre i costi del JS.

### Progressive Bootstrapping

Molti siti ottimizzano la visibilità dei contenuti a seconda dell'interattività.
Per ottenere un primo paint veloce quando si dispone di pacchetti JavaScript di
grandi dimensioni, gli sviluppatori a volte impiegano il rendering lato server;
quindi lo "aggiornano" per collegare i gestori di eventi quando il codice
JavaScript viene finalmente scaricato.

Stai attento: questo ha i suoi costi. 1) in genere invia una risposta HTML *più
ampia* che può spingere l'interattività, 2) può lasciare l'utente in uncanny
valley in cui metà dell'esperienza non può essere interattiva fino a quando
JavaScript non finisce l'elaborazione.

Il Progressive Bootstrapping può essere un approccio migliore. Invia una pagina
minimamente funzionale (composta solo da HTML/JS/CSS necessari per il percorso
corrente). Con l'arrivo di altre risorse, l'app può caricare e sbloccare più
funzioni.

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">Progressive
Bootstrapping</a> di Paul Lewis </figcaption> </figure>

Il codice di caricamento proporzionale a ciò che è visibile è il Santo Graal.
PRPL e Progressive Bootstrapping sono schemi che possono aiutare a raggiungere
questo obiettivo.

## Conclusioni

**La dimensione della trasmissione è critica per reti di fascia bassa. Il tempo
di analisi è significativo per i dispositivi con CPU. Mantenere questi indici
bassi è significativo.**

I team di successo adottando rigorosi budget di prestazioni per mantenere bassi
i tempi di trasmissione e analisi/compilazione di JavaScript. Si veda "[Can You
Afforrd It?: Real Web World
Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)"
di Alex Russell come guida a proposito di budget per dispositivi mobili.

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"> <figcaption>È utile
considerare quanto JS sia la "stanza principale" delle decisioni architetturali
che prendiamo per la logica dell'app.</figcaption> </figure>

Se stai costruendo un sito rivolto ai dispositivi mobili, fai del tuo meglio per
sviluppare su hardware rappresentativo, mantieni tempi bassi di
parse/compilazione per  JavaScript e adotta un Performance Budget per garantire
al tuo team di essere in grado di tenere sott'occhio i costi di JavaScript.

## Per saperne di più

- [Chrome Dev Summit 2017 - Modern Loading Best
    Practices](https://www.youtube.com/watch?v=_srJ7eHS3IM)
- [JavaScript Start-up
Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
- [Solving the web performance
    crisis](https://nolanlawson.github.io/frontendday-2016/) — Nolan Lawson
- [Can you afford it? Real-world performance
budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)—
Alex Russell
- [Evaluating web frameworks and
libraries](https://twitter.com/kristoferbaxter/status/908144931125858304)
—Kristofer Baxter
- [I risultati di Cloudflare sulla sperimentazione di
Brotli](https://blog.cloudflare.com/results-experimenting-brotli/) per la
compressione (si noti che il Brotli dinamico ad alta qualità può ritardare il
rendering della pagina iniziale ed è quindi da valutare attentamente.
Probabilmente invece preferisci comprimerla staticamente).
- [Performance Futures](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)
— Sam Saccone

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
