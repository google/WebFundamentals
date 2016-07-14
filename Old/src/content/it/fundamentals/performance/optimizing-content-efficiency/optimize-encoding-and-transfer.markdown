---
title: "Ottimizzazione della codifica e delle dimensioni di trasferimento delle risorse di testo"
description: "Dopo aver eliminato le risorse non necessarie, il passo successivo è minimizzare le dimensioni totali delle risorse restanti che il browser deve scaricare, ad esempio comprimendole attraverso l'applicazione di algoritmi di compressione specifici e generici per i contenuti (GZip)."
updated_on: 2014-09-12
key-takeaways:
  compression-101:
    - "La compressione è una procedura di codifica delle informazioni che utilizza un numero inferiore di bit"
    - "L'eliminazione dei dati non necessari consente sempre di raggiungere i risultati migliori"
    - "Esistono numerose tecniche e algoritmi di compressione diversi"
    - "Per ottenere la compressione ottimale, dovrai avvalerti di più tecniche"
  minification:
    - "Un'ottimizzazione specifica in base ai contenuti può ridurre considerevolmente le dimensioni delle risorse offerte."
    - "Un'ottimizzazione specifica in base ai contenuti si applica meglio nel ciclo di build/release."
  text-compression:
    - "GZIP funziona meglio su risorse di testo: CSS, JavaScript, HTML"
    - "Tutti gli attuali browser supportano la compressione con GZIP e la richiedono automaticamente"
    - "Il tuo server deve essere configurato per consentire la compressione con GZIP"
    - "Alcuni CDN richiedono particolare attenzione per assicurarsi che GZIP sia abilitato"
notes:
  jquery-minify:
    - "Nel caso specifico, la development version estratta della libreria JQuery ha adesso una dimensione di ~300 KB. La stessa libreria minimizzata (commenti rimossi, ecc...) è circa 3x più piccola: ~100 KB"
  gzip:
    - "Che tu ci creda o meno, in alcuni casi GZIP può aumentare le dimensioni di una risorsa. Di norma, ciò accade quando la risorsa è molto piccola e l'overhead del dizionario GZIP è maggiore del risparmio consentito dalla compressione, o se la risorsa è già compressa al massimo. Alcuni server consentono di specificare una 'dimensione minima' per evitare tale problema."
---

<p class="intro">
  La nostra applicazione web continua a crescere in termini di ambito di applicazione, ambizioni e funzionalità, ed è un bene. Tuttavia, la marcia inarrestabile verso un web sempre più ricco porta con sé un'altra tendenza: la quantità di dati scaricati da ogni applicazione continua a crescere incessantemente. Per garantire prestazioni ottimali dobbiamo ottimizzare l'utilizzo di ogni singolo byte di dati!
</p>

{% include shared/toc.liquid %}


## Compressione dei dati 101

Una volta eliminate tutte le risorse non necessarie, è necessario minimizzare le dimensioni totali delle risorse restanti che il browser deve scaricare, ovvero comprimerle. A seconda del tipo di risorsa -testo, immagine, font e così via - abbiamo diverse tecniche a nostra disposizione: strumenti generici che possono essere abilitati sul server, procedure di ottimizzazione pre-elaborazione per tipi di contenuto specifici o per specifiche risorse, che richiedono l'intervento del developer.

Per garantire le prestazioni migliori, è necessaria una combinazione delle diverse tecniche.

{% include shared/takeaway.liquid list=page.key-takeaways.compression-101 %}

La procedura di riduzione delle dimensioni dei dati, nota come 'compressione dei dati', è un vasto campo di ricerca: in molti hanno trascorso l'intera carriera ad elaborare algoritmi, tecniche e procedure di ottimizzazione per migliorare le percentuali, la velocità di compressione e i requisiti di memoria dei diversi compressori. Inutile dire che una discussione approfondita su tale argomento esula dal nostro ambito, ma è comunque importante comprendere ad un certo livello come funziona la compressione e le tecniche che abbiamo a disposizione per ridurre le dimensioni di diverse risorse presenti nelle nostre pagine.

Per illustrare i principi chiave di tali tecniche in azione, vediamo ad esempio fino a dove possiamo arrivare per ottimizzare un semplice messaggio di testo che inventeremo a tale scopo:

    # Il seguente è un messaggio segreto, composto da un gruppo di intestazioni in
    # formato valore chiave. Dopo il punto, segue il messaggio cifrato.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. I messaggi possono contenere annotazioni di vario tipo, indicate dal prefisso `#`. Le annotazioni non influenzano né il significato, né alcun altro aspetto del messaggio.
2- I messaggi possono contenere delle 'intestazioni' composte da coppie di valori chiave (separate da `:`) e devono comparire all'inizio del messaggio.
3. I messaggi contengono payload di testo.

Come potremmo ridurre le dimensioni del messaggio precedente, di circa 200 caratteri?

1. Il commento è interessante, ma sappiamo che non influenza di fatto il significato del messaggio, per cui lo elimineremo nella trasmissione dello stesso.
2. Vi sono probabilmente alcune tecniche intelligenti che possiamo utilizzare per codificare le intestazioni in modo efficace; ad es., non sappiamo se tutti i messaggi contengono un 'formato' e una 'data', ma in tal caso, potremmo convertirli in ID interi più brevi e inviare solo quelli! Detto ciò, non siamo sicuri che sia questo il caso, per cui lo lasceremo in sospeso per adesso.
3. Il payload è formato da solo testo, e, anche se non sappiamo quale sia il suo reale contenuto (apparentemente, utilizza un 'messaggio segreto'), solo osservando il testo sembra che vi sia una notevole ridondanza. Forse, invece di mandare lettere ripetute, possiamo semplicemente contare il numero di esse e codificarle in maniera più efficace?
    * Ad es. `AAA` diventa `3A` - o sequenza di tre A.


Mettendo assieme le diverse tecniche, arriviamo al risultato seguente:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

Il nuovo messaggio è lungo 56 caratteri, il che significa che siamo riusciti a comprimere il messaggio originale di un sorprendente 72%; non male, se consideriamo tutti gli aspetti e il fatto che abbiamo appena iniziato!

Naturalmente, ti chiederai, tutto ciò è fantastico, ma come può aiutarci ad ottimizzare le nostre pagine web? Sicuramente non inventeremo degli algoritmi di compressione, giusto? La risposta è no, non lo faremo, ma, come vedrai, utilizzeremo esattamente le stesse tecniche e prospettive nell'ottimizzazione di diverse risorse sulle nostre pagine: pre-elaborazione, ottimizzazione specifica per il contesto e algoritmi diversi per contenuti diversi.


## Minimizzazione: pre-elaborazione e ottimizzazione specifica per il contesto

{% include shared/takeaway.liquid list=page.key-takeaways.minification %}

Il modo migliore per comprimere dati ridondanti o non necessari consiste nell'eliminarli in un'unica soluzione. Naturalmente, non possiamo semplicemente eliminare dei dati a caso, ma in alcuni contesti in cui disponiamo di una conoscenza specifica del contenuto dei dati e delle relative proprietà, è spesso possibile ridurre significativamente le dimensioni del payload senza inficiarne il significato.

{% include_code src=_code/minify.html snippet=full %}

Considera la semplice pagina HTML precedente e i suoi tre diversi tipi di contenuto: markup HTML, stili CSS e JavaScript. Ciascuno di essi dispone di norme diverse per quanto riguarda ciò che rappresenta un markup valido, norme CSS o contenuti JavaScript, regole diverse per indicare i commenti, e così via. Come potremmo ridurre le dimensioni di questa pagina?

* I commenti all'interno del codice sono i migliori amici di un developer, ma il browser non deve vederli! La semplice eliminazione dei commenti CSS (`/* ... */`), HTML (`<!-- ... -->`) e JavaScript (`// ...`) può ridurre significativamente le dimensioni totali della pagina.
* Un compressore CSS 'intelligente' potrebbe notare che stiamo utilizzando un metodo inefficace di definizione di regole per `.awesome-container` e accorpare i due periodi in uno senza influenzare altri stili, risparmiando altri byte.
* Gli whitespace (spazi vuoti e tab) sono utilizzati per comodità dai developer in HTML, CSS e JavaScript. Un ulteriore compressore potrebbe eliminare ogni spazio e tab.

^
{% include_code src=_code/minified.html snippet=full %}

Una volta applicate tali procedure, la nostra pagina passerà da 406 a 150 caratteri, riducendosi del 63%! Molto probabilmente non sarà molto leggibile, ma d'altronde non deve neanche esserlo: possiamo mantenere la pagina originale come 'development version' e poi applicare le procedure precedenti quando saremo pronti a inserire la pagina sul nostro sito web.

Facendo un passo indietro, l'esempio precedente illustra un punto importante: anche un compressore con finalità generiche, diciamo ideato per comprimere del testo qualsiasi, potrebbe svolgere un ottimo lavoro per comprimere la pagina di esempio, ma non saprebbe certo come eliminare i commenti, raggruppare le regole CSS o effettuare decine di altre procedure di ottimizzazione specifiche. Ecco perché pre-elaborazione / minimizzazione / ottimizzazione basata sul contesto possono rivelarsi strumenti tanto potenti.

{% include shared/remember.liquid list=page.notes.jquery-minify %}

Allo stesso modo, le tecniche precedenti possono essere estese a risorse non basate sul solo testo. Immagini, video e altri tipi di contenuti contengono tutti i propri metadati e diversi payload. Ad esempio, ogni volta che scatti una foto con la tua fotocamera, la foto contiene di norma numerose altre informazioni: le impostazioni della fotocamera, il luogo, ecc... A seconda della tua applicazione, tali dati possono essere fondamentali (ad es. il sito di condivisione della foto) o perfettamente inutili; dovrai quindi valutare se non valga la pena rimuoverli. In pratica, tali metadati possono aggiungere decine di kylobite per ogni immagine!

In breve, come primo passo nell'ottimizzazione dell'efficienza delle nostre risorse, crea un inventario dei diversi tipi di contenuti e valuta quali tipi di ottimizzazioni specifiche puoi applicare per ridurne le dimensioni; potrai così ottenere risultati significativi! Poi, una volta definito ciò, automatizza tali ottimizzazioni aggiungendole alle procedure build and release; è l'unico modo per garantire che vengano sempre effettuate.

## Compressione del testo con GZIP

{% include shared/takeaway.liquid list=page.key-takeaways.text-compression %}

[GZIP](http://en.wikipedia.org/wiki/Gzip) è un compressore generico applicabile a qualsiasi stream di byte: in pratica, ricorda alcuni contenuti visti in precedenza e cerca di individuare e sostituire i frammenti di dati duplicati in maniera efficace; se sei curioso, ecco una [spiegazione perfetta di GZIP per chi è alle prime armi](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). In pratica, tuttavia, GZIP funziona meglio su risorse di testo, raggiungendo spesso un tasso di compressione del 70-90% per i file più grossi, mentre su risorse già compresse tramite algoritmi alternativi (ad es. la maggior parte dei formati immagine) non consente di ottenere grossi miglioramenti.

Tutti gli attuali browser supportano ed eseguono automaticamente la compressione GZIP per ogni richiesta HTTP: il nostro lavoro consiste nel garantire che il server sia configurato correttamente per fornire la risorsa compressa quando viene richiesta dal client.


<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th>Libreria</th>
    <th>Dimensioni</th>
    <th>Dimensioni compresse</th>
    <th>Percentuale di compressione</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

La tabella precedente illustra il risparmio consentito dalla compressione con GZIP per alcune delle librerie JavaScript e dei framework CSS più noti. Il risparmio va dal 60 all'88%; nota che la combinazione tra file minimizzati (identificati con `.min` nel nome) e GZIP offre una riduzione ancora maggiore.

1. **Applica prima le ottimizzazioni specifiche per i contenuti: minifier CSS, JS e HTML.**
2. **Applica GZIP per comprimere il risultato minimizzato.**

L'aspetto migliore è che l'attivazione di GZIP rappresenta una delle ottimizzazioni più semplici ed efficaci da applicare; sfortunatamente, molte persone si dimenticano ancora di farlo. La maggior parte dei server web comprime i contenuti per nostro conto, e resta solo da verificare che il server sia configurato correttamente per comprimere qualsiasi tipo di contenuto che possa beneficiare della compressione con GZIP.

Qual è la configurazione migliore per il tuo server? Il progetto HTML5 Boilerplate contiene alcuni [file di configurazione semplificativi](https://github.com/h5bp/server-configs) per tutti i principali server, con commenti dettagliati per ogni flag e impostazione di configurazione: cerca il tuo server preferito nell'elenco, vai alla sezione GZIP e assicurati di avervi configurato le impostazioni raccomandate.

<img src="images/transfer-vs-actual-size.png" class="center" alt="Demo DevTools demo per dimensioni reali vs. di trasferimento">

Un modo semplice e rapido di vedere GZIP in azione consiste nell'aprire Chrome DevTools e controllare la colonna 'Dimensioni/Contenuto' nella scheda Rete: 'Dimensioni' indica le dimensioni di trasferimento della risorsa, mentre 'Content' indica le dimensioni espanse della risorsa. Per la risorsa HTML dell'esempio precedente, GZIP ha risparmiato 24,8 KB durante il trasferimento!

{% include shared/remember.liquid list=page.notes.gzip %}

Infine, ti invitiamo a fare attenzione: mentre la maggior parte dei server comprime automaticamente le risorse al posto tuo prima di presentarle all'utente, alcuni CDN richiedono particolare attenzione e un'azione manuale per garantire che GZIP mantengale impostazioni predefinite. Verifica che le risorse presenti sul tuo sito vengano effettivamente [compresse](http://www.whatsmyip.org/http-compression-test/)!





