project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Mantieni bassi i costi di trasmissione di rete e di analisi/compilazione per JavaScript per garantire che le pagine diventino interattive rapidamente.

{# wf_updated_on: 2018-05-29 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# Ottimizzazione dell'avvio JavaScript {: .page-title}

{% include "web/_shared/contributors/addyosmani.html" %}

Anche se creiamo siti che si basano molto su JavaScript, a volte
paghiamo per ciò che produciamo in modi non sempre facilmente prevedibili.
In questo articolo spiegheremo perché un po' di **disciplina** potrebbe aiutarti
se desideri che il tuo sito venga caricato e sia interattivo rapidamente sui
dispositivi mobili. Offrire meno JavaScript può significare meno tempo di
trasmissione di rete, meno codice da decomprimere e meno tempo per l'analisi e
la compilazione di questo JavaScript.

## Rete

Quando la maggior parte degli sviluppatori considera il costo di JavaScript, pensa
in termini di **costi di download e di esecuzione**. L'invio di diversi byte di
JavaScript richiede più tempo se la connessione dell'utente
è lenta.

<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="When a browser requests a
resource, that resource needs to be fetched and then decompressed. In the case
of resources like JavaScript, they must be parsed and compiled prior to
execution.">

Questo può essere un problema, anche nei paesi del primo mondo, se l'**effettivo
tipo di connessione di rete** che l'utente usa non è 3G, 4G o Wi-Fi.
Puoi trovarti in un bar con Wi-Fi, ma essere collegato a un hotspot cellulare con
velocità 2G.

Puoi **ridurre** il costo del trasferimento di rete di JavaScript attraverso:

* **Invio solo del codice necessario all'utente**.
    * Usa il [code-splitting](/web/updates/2017/06/supercharged-codesplit) per
    separare in JavaScript ciò che è critico da ciò che non lo è. I module bundler come [webpack](https://webpack.js.org)
    supportano il [code-splitting](https://webpack.js.org/guides/code-splitting/).
    * Usa il caricamento lazily per il codice non-critico.
* **Minimizzazione**
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
    ~[q11](https://twitter.com/paulcalvano/status/924660429846208514). Brotli
    ottimizza il rapporto di compressione rispetto a gzip. Ha aiutato CertSimple a
    risparmiare il
    [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30)
    sulle dimensioni dei byte JS compressi e LinkedIn a risparmiare il
    [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression)
    sui tempi di caricamento.
* **Rimozione del codice inutilizzato**.
    * Identifica il codice che può essere rimosso o caricato lazily con [DevTools
    code coverage](/web/updates/2017/04/devtools-release-notes#coverage).
    * Usa [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) e
    browserlist per evitare la funzionalità di transpiling dei browser moderni. Gli
    sviluppatori avanzati possono trovare utile l'[analisi dei webpack
    bundle](https://github.com/webpack-contrib/webpack-bundle-analyzer) per
    identificare opportunità di eliminazione delle dipendenze non necessarie.
    * Per rimuovere il codice,
    vedi [tree-shaking](https://webpack.js.org/guides/tree-shaking/),
    le ottimizzazioni avanzate e i plug-in di    
    ritaglio di libreria del [compilatore Closure](/closure/compiler/)
    come [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash) o
    [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js) di
    webpack per librerie come Moment.js.
* **Cache del codice per ridurre i tempi di rete**
    * Usa l'[HTTP
    caching](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
    per garantire che i browser memorizzino le risposte in modo efficace.
    Determina la durata ottimale degli script (max-age) e fornisci token di
    convalida (ETag) per evitare il trasferimento di byte invariati.
    * La memorizzazione nella cache dei Service Worker può rendere resiliente la rete dell'app e
    darti accesso a funzionalità come [la cache del codice di
    V8](https://v8project.blogspot.com/2015/07/code-caching.html).
    * Usa la memorizzazione nella cache a lungo termine per evitare di
    dover recuperare nuovamente le risorse che non sono state modificate. Se
    utilizzi Webpack, consulta [hashing del nome del
    file](https://webpack.js.org/guides/caching/).

## Analisi/Compilazione

Una volta scaricato, uno dei costi **maggiori** di JavaScript è il tempo impiegato dal
motore JS di **analisi/compilazione** di questo codice. In [Chrome
DevTools](web/tools/chrome-devtools/), queste due operazioni rientrano nel tempo
giallo di "Scripting" del pannello Performance.

<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png">

Le schede Bottom-Up e Call Tree mostrano gli esatti tempi di analisi/
compilazione:

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"> <figcaption>Pannello
Chrome DevTools Performance > Bottom-Up. Con le Runtime Call Stats di
V8 abilitate, possiamo vedere il tempo trascorso per fasi come l'Analisi e
la Compilazione.</figcaption> </figure>

Note: il supporto del pannello delle prestazioni per Runtime Call Stats è
per ora sperimentale. Per abilitarlo, vai in Chrome:
//flags/#enable-devtools-experiments -> riavvia Chrome -> vai a DevTools ->
Impostazioni -> Esperimenti -> premi Maiusc 6 volte -> seleziona l'opzione
chiamata `Timeline: V8 Runtime Call Stats on Timeline` e chiudi quindi riapri
DevTools.

Ma perché questo è importante?

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png">

Trascorrere parecchio tempo ad analizzare/compilare il codice può ritardare
parecchio il momento in cui l'utente viene a interagire con il tuo sito. Più
JavaScript invii, più tempo ci vorrà per analizzare e compilare prima che il tuo
sito sia interattivo.

> Byte-per-byte, ** JavaScript è più costoso da elaborare per il browser
rispetto ad una immagine di dimensioni equivalenti o un Web Font ** - Tom Dale

Rispetto a JavaScript, ci sono numerosi costi coinvolti nell'elaborazione di
immagini di dimensioni equivalenti (devono ancora essere decodificate!) ma su un
hardware mobile medio, JS ha maggiori probabilità di avere un impatto negativo
sull'interattività di una pagina.

<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"> <figcaption>I byte di
JavaScript e di immagine hanno costi molto diversi. Le immagini di solito non
bloccano il thread principale né impediscono l'interazione con le interfacce
mentre vengono decodificate e rasterizzate. Invece, JS può ritardare
l'interattività a causa di analisi, compilazione e costi di
esecuzione.</figcaption> </figure>

Quando ci riferiamo ad analisi e compilazione lente il contesto è importante:
stiamo parlando di telefoni cellulari **medi**. **Gli utenti medi possono avere
telefoni con CPU e GPU lente, senza cache L2/L3 e potrebbero avere anche vincoli
di memoria.**

> Le funzionalità di rete e le funzionalità del dispositivo non sempre
corrispondono. Un utente con una straordinaria connessione in fibra ottica non
ha necessariamente la migliore CPU per analizzare e valutare il codice
JavaScript inviato al proprio dispositivo. Questo è vero anche in caso
inverso... una terribile connessione di rete ma con una CPU molto veloce.
Kristofer Baxter, LinkedIn

Qui sotto possiamo vedere il costo di analisi di ~1MB di JavaScript decompresso
(semplice) su hardware di fascia bassa e di fascia alta. **C'è una differenza di
2-5 volte nei tempi di analisi/compilazione del codice tra i telefoni più
veloci sul mercato e quelli medi**.

<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"> <figcaption>Questo
grafico evidenzia i tempi di analisi per un bundle di 1 MB di JavaScript
(circa 250 KB in formato gzip) su dispositivi desktop e mobili di classi
diverse. Quando si considera il costo di analisi, sono le cifre decompresse da
considerare, ad esempio 250KB gzip di JS si decomprime in ~1 MB di
codice.</figcaption> </figure>

Che dire di un sito reale, come CNN.com?

**Sull'iPhone 8 di fascia alta ci vogliono solo ~4 secondi per
analizzare/compilare JS della CNN rispetto ai ~13 secondi per un telefono medio
(Moto G4)**. Ciò può avere un impatto significativo sulla velocità con cui un
utente interagisce con questo sito.

<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"> <figcaption>Sopra
vediamo i tempi di analisi paragonando le prestazioni del chip Apple A11 Bionic
allo Snapdragon 617 in un hardware Android medio.</figcaption> </figure>

Ciò evidenzia l'importanza del test su hardware **medio** (come il Moto G4)
invece solo del telefono che potresti avere in tasca. Il contesto conta
comunque: **ottimizzare il dispositivo e le condizioni di rete degli
utenti.**

<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"> <figcaption>Google
Analytics può fornire informazioni sulle <a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">classi
di dispositivi mobili</a> con cui gli utenti reali accedono al tuo sito.
Questo può fornire l'opportunità di comprendere i reali vincoli CPU/GPU con cui
stanno operando.</figcaption> </figure>

**Stiamo inviando davvero troppo JavaScript? Probabilmente :)**

Utilizzando l'archivio HTTP (primi ~500mila siti) per analizzare lo stato di
[JavaScript sui dispositivi
mobili](http://beta.httparchive.org/reports/state-of-javascript#bytesJs),
possiamo vedere che il 50% dei siti richiede più di 14 secondi per essere
interattivo. Questi siti passano fino a 4 secondi solo per analizzare e
compilare JS.

<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png">

Calcola il tempo necessario per recuperare ed elaborare JS e le altre risorse.
Forse non ti sorprenderà sapere che gli utenti devono aspettare un bel po'
prima di poter interagire con le pagine che desiderano usare. Possiamo sicuramente migliorare
la situazione.

**La rimozione di JavaScript non critico dalle tue pagine può ridurre i tempi di
trasmissione, l'analisi e la compilazione intensiva della CPU e il potenziale
sovraccarico della memoria. Questo aiuta anche a rendere interattive le tue
pagine più velocemente.**

## Tempo di esecuzione

Non sono solo le fasi di analisi e compilazione ad avere un costo.
**L'esecuzione di JavaScript** (il codice in esecuzione una volta
analizzato/compilato) è una delle operazioni che devono verificarsi sul thread
principale. Lunghi tempi di esecuzione possono anche condizionare quanto tempo
un utente necessita per interagire con il tuo sito.

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png">

> Se lo script viene eseguito per più di 50 ms, il tempo per divenire interattivo viene
ritardato *dall'intero* periodo di tempo necessario per scaricare, compilare ed
eseguire il JS - Alex Russell

Per risolvere questo problema, JavaScript beneficia di essere in **piccoli
blocchi** per evitare di bloccare il thread principale. Cerca di scoprire se puoi
ridurre la quantità di lavoro svolto durante l'esecuzione.

## Altri costi

JavaScript può influire sulle prestazioni della pagina in altri modi:

- Memoria. Le pagine possono apparire come jank o essere messe in pausa frequentemente a
causa di GC (garbage collection). Quando un browser recupera la memoria,
l'esecuzione di JS viene messa in pausa, quindi un browser che raccoglie spesso
garbage può sospendere l'esecuzione più frequentemente di quanto vorremmo. Evita
[perdite di memoria](/web/tools/chrome-devtools/memory-problems/) e frequenti
pause gc per mantenere libere le pagine.
- Durante il runtime, JavaScript di lunga esecuzione può bloccare il thread principale
che non fa rispondere le pagine. Ridurre il lavoro in blocchi più
piccoli (utilizzando <code><a data-parent-segment-tag-id="1353935"
data-md-type="raw_html"
href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
o <code><a data-parent-segment-tag-id="1353937" data-md-type="raw_html"
href="web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
per la pianificazione) può ridurre al minimo i problemi di reattività.

## Modelli per ridurre i costi di JavaScript

Se cerchi di mantenere analisi/compilazione e tempi di trasmissione
di rete per JavaScript lenti, ci sono schemi che possono essere d'aiuto come il
chunking basato su route o [PRPL](/web/fundamentals/performance/prpl-pattern/).

### PRPL

PRPL (Push, Render, Pre-cache, Lazy-load) è un pattern che ottimizza
l'interattività attraverso il code-splitting e la memorizzazione nella cache aggressivi:

<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png">

Vediamo l'impatto che può avere.

Analizziamo il tempo di caricamento dei popolari siti per dispositivi mobili e
delle Progressive Web App utilizzando Runtime Call Stats di V8. Come possiamo vedere,
il tempo di analisi (mostrato in arancione) è una parte significativa di dove
molti di questi siti trascorrono il loro tempo:

<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png">

[Wego](https://wego.com), un sito che utilizza PRPL, riesce a mantenere un tempo
di analisi basso per i loro percorsi, diventando interattivo molto rapidamente.
Molti degli altri siti hanno adottato il code-splitting e performance budget per
provare a ridurre i costi del JS.

### Progressive Bootstrapping

Molti siti ottimizzano la visibilità dei contenuti a scapito dell'interattività.
Per ottenere un primo paint veloce quando hanno bundle JavaScript di
grandi dimensioni, gli sviluppatori a volte impiegano il rendering sul lato server;
quindi lo "aggiornano" per collegare i gestori di eventi quando il codice
JavaScript viene finalmente scaricato.

Attenzione: questo ha i suoi costi. 1) Puoi inviare una risposta HTML *più
ampia* che potrebbe influire sull'interattività, 2) Puoi lasciare l'utente in una situazione
nella quale la metà dell'esperienza non può essere interattiva fino a quando
JavaScript non finisce l'elaborazione.

Il Progressive Bootstrapping può essere un approccio migliore. Invia una pagina
minimamente funzionale (composta solo dai HTML/JS/CSS necessari per il percorso
corrente). Con l'arrivo di altre risorse, l'app può caricare e sbloccare più
funzioni.

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">Progressive
Bootstrapping</a> di Paul Lewis </figcaption> </figure>

Caricare il codice proporzionalmente a ciò che è visibile è il risultato ideale.
PRPL e Progressive Bootstrapping sono schemi che possono aiutare a raggiungere
questo obiettivo.

## Conclusioni

**La dimensione della trasmissione è critica per reti di fascia bassa. Il tempo
di analisi è significativo per i dispositivi con CPU. Mantenere questi indici
bassi è significativo.**

Molti team sono riusciti ad adottare rigorosi budget di prestazioni per mantenere bassi
i tempi di trasmissione e analisi/compilazione di JavaScript. Consulta "[Can You
Afford It?: Real Web World
Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)"
di Alex Russell come guida sui budget per dispositivi mobili.

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"> <figcaption>È utile
considerare quanto le decisioni architettoniche sulla capacità aggiuntiva di JS influiscano
su quella della logica dell'app.</figcaption> </figure>

Se stai creando un sito per dispositivi mobili, fai del tuo meglio per
sviluppare utilizzando hardware rappresentativo, mantieni tempi bassi di
analisi//compilazione per JavaScript e adotta un Performance Budget per garantire
al tuo team di tenere d'occhio i costi di JavaScript.

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
- [I risultati per Cloudflare ottenuti sperimentando con
Brotli](https://blog.cloudflare.com/results-experimenting-brotli/) per la
compressione (è da notare che Brotli dinamico di qualità più alta può ritardare il
rendering della pagina iniziale ed è quindi da valutare attentamente.
Probabilmente è preferibile comprimerla staticamente).
- [Performance Futures](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)
— Sam Saccone

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
