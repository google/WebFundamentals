project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Dopo aver eliminato le risorse non necessarie, la cosa migliore che possiamo fare per migliorare il tempo di caricamento della pagina è minimizzare la dimensione totale delle risorse da scaricare ottimizzando e comprimendo le risorse rimaste.

{# wf_updated_on: 2017-05-29 #}
{# wf_published_on: 2014-03-31 #}

# Ottimizzazione della codifica e delle dimensioni di trasferimento delle risorse di testo {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Dopo l'eliminazione dei download non necessari di risorse, la cosa migliore che possiamo fare per migliorare il tempo di carimanento della pagina è minimizzare la dimensione da scaricare mediante ottimizzazione e compressione delle rimanenti risorse.


## Compressione dei dati 101

Una volta eliminate tutte le risorse non necessarie, è necessario minimizzare le dimensioni totali delle risorse restanti che il browser deve scaricare, ovvero comprimerle. A seconda del tipo di risorsa&mdash;testo, immagine, font e così via&mdash;abbiamo diverse tecniche a nostra disposizione: strumenti generici che possono essere abilitati sul server, procedure di ottimizzazione pre-elaborazione per tipi di contenuto specifici o per specifiche risorse, che richiedono l'intervento del developer.

Per garantire le prestazioni migliori, è necessaria una combinazione delle diverse tecniche.

### TL;DR {: .hide-from-toc }
* La compressione è una procedura di codifica delle informazioni che utilizza un numero inferiore di bit
* L'eliminazione dei dati non necessari consente sempre di raggiungere i risultati migliori
* Esistono numerose tecniche e algoritmi di compressione diversi
* Per ottenere la compressione ottimale, dovrai avvalerti di più tecniche


La procedura di riduzione delle dimensioni dei dati, nota come *compressione dei dati*.
Molte persone hanno contribuito ad algoritmi, tecniche e procedure di ottimizzazione per migliorare le percentuali, la velocità di compressione ed i requisiti di memoria dei diversi compressori. Inutile dire che una discussione approfondita su tale argomento esula dal nostro ambito. Tuttavia è comunque importante comprendere ad alto livello come funziona la compressione e le tecniche che abbiamo a disposizione per ridurre le dimensioni di diverse risorse presenti nelle nostre pagine.

Per illustrare i principi chiave di tali tecniche, consideriamo il processo di ottimizzazione di un semplice messaggio di testo inventato come esempio:

    # Il seguente è un messaggio segreto, composto da un gruppo di intestazioni in
    # formato chiave-valore seguito da un ritorno a capo e dal messaggio cifrato.
    format: secret-cipher
    date: 25/08/16
    AAAZZBBBBEEEMMM EEETTTAAA

1. I messaggi possono contenere annotazioni di vario tipo, indicate dal prefisso "#". Le annotazioni non influenzano né il significato, né alcun altro aspetto del messaggio.
2. I messaggi possono contenere delle *intestazioni* composte da coppie di chiave-valore (separate da ":") che compaiono all'inizio del messaggio.
3. I messaggi contengono payload testuale.

Come potremmo ridurre le dimensioni del messaggio precedente, attualmente di 200 caratteri?

1. Il commento è interessante, ma sappiamo che non influenza di fatto il significato del messaggio. Per cui lo elimineremo nella trasmissione dello stesso.
2. Vi sono probabilmente alcune tecniche intelligenti che possiamo utilizzare per codificare le intestazioni in modo efficace. Ad esempio, se sappiamo che tutti i messaggi contengono un "format" e un "date", possiamo convertirli in ID interi brevi e inviare solo quelli. Detto ciò, non siamo sicuri che sia questo il caso, per cui lo lasceremo in sospeso per adesso.
3. Il payload è formato da solo testo, e, anche se non sappiamo quale sia il suo reale contenuto (apparentemente, utilizza un "messaggio segreto"), solo osservando il testo sembra che vi sia una notevole ridondanza. Forse, invece di mandare lettere ripetute, possiamo semplicemente contare il numero di esse e codificarle in maniera più efficace?
Per esempio "AAA" diventa "3A" che rappresenta una sequenza di tre A.


Mettendo assieme le diverse tecniche, arriviamo al risultato seguente:

    format: secret-cipher
    date: 25/08/16
    3A2Z4B3E3M 3E3T3A

Il nuovo messaggio è lungo 56 caratteri, il che significa che siamo riusciti a comprimere il messaggio originale di un sorprendente 72%.

Naturalmente, ti chiederai, tutto ciò è fantastico, ma come può aiutarci ad ottimizzare le nostre pagine web? Sicuramente non inventeremo degli algoritmi di compressione, ma come  vedrai, utilizzeremo esattamente le stesse tecniche e processi mentali quando ottimizzeremo le diverse risorse sulle nostre pagine: pre-elaborazione, ottimizzazione specifica per il contesto e algoritmi specifici per contenuti diversi.


## Minificazione: pre-elaborazione e ottimizzazione specifica per il contesto

### TL;DR {: .hide-from-toc }
- Un'ottimizzazione specifica in base ai contenuti può ridurre considerevolmente le dimensioni delle risorse offerte.
- Un'ottimizzazione specifica in base ai contenuti si applica meglio nel ciclo di build/release.


Il modo migliore per comprimere dati ridondanti o non necessari consiste nell'eliminarli in un'unica soluzione. Naturalmente, non possiamo semplicemente eliminare dei dati a caso, ma in alcuni contesti in cui disponiamo di una conoscenza specifica del contenuto dei dati e delle relative proprietà, è spesso possibile ridurre significativamente le dimensioni del payload senza inficiarne il significato.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Prova](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minify.html){: target="_blank" .external }

Considera la semplice pagina HTML precedente e i suoi tre diversi tipi di contenuto: markup HTML, stili CSS e JavaScript. Ciascun tipo di contenuto dispone di norme diverse per quanto riguarda ciò che rappresenta un contenuto valido, differenti regole per indicare commenti, ecc. Come possiamo ridurre le dimensioni di questa pagina?

* I commenti all'interno del codice sono i migliori amici di un developer, ma il browser non deve vederli! La semplice eliminazione dei commenti CSS (`/* ... */`), HTML (`<!-- ... -->`) e JavaScript (`// ...`) può ridurre significativamente le dimensioni totali della pagina.
* Un compressore CSS "intelligente" potrebbe notare che stiamo utilizzando un metodo inefficace di definizione di regole per ".awesome-container" ed accorpare i due periodi in uno senza influenzare altri stili, risparmiando altri byte.
* Gli spazi vuoti (semplici spazi e tab) sono utilizzati per comodità dai developer in HTML, CSS e JavaScript. Un ulteriore compressore potrebbe eliminare tutti i tab e gli spazi.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Prova](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/optimizing-content-efficiency/minified.html){: target="_blank" .external }

Una volta applicate tali passi, la nostra pagina passerà da 406 a 150 caratteri, riducendosi del 63%! Molto probabilmente non sarà molto leggibile, ma d'altronde non deve neanche esserlo: possiamo mantenere la pagina originale come "development version" e poi applicare le procedure precedenti quando saremo pronti a inserire la pagina sul nostro sito web.

Facendo un passo indietro, l'esempio precedente illustra un punto importante: anche un compressore generico&mdash;diciamo ideato per comprimere un qualsiasi testo&mdash; potrebbe svolgere un buon lavoro per comprimere la pagina precedente, ma non saprebbe certo come eliminare i commenti, raggruppare le regole CSS o effettuare dozzine di altre procedure di ottimizzazione specifiche. Ecco perché pre-elaborazione/minificazione/ottimizzazione basata sul contesto possono rivelarsi strumenti molto potenti.

Note: Nel caso specifico, la development version non compressa della libreria JQuery ha adesso una dimensione di ~300 KB. La stessa libreria minificata (commenti rimossi, ecc...) è più piccola ci quasi un fattore 3x: ~100 KB.

Allo stesso modo, le tecniche precedenti possono essere estese a risorse non basate sul solo testo. Immagini, video e altri tipi di contenuti contengono tutti i propri metadati e diversi payload. Ad esempio, ogni volta che scatti una foto con la tua fotocamera, la foto contiene di norma numerose informazioni extra: le impostazioni della fotocamera, il luogo, ecc... A seconda della tua applicazione, tali dati possono essere fondamentali (ad es. il sito di condivisione della foto) o perfettamente inutili; dovrai quindi valutare se valga la pena rimuoverli. In pratica, tali metadati possono aggiungere decine di kilobyte per ogni immagine.

In breve, come primo passo nell'ottimizzazione dell'efficienza delle nostre risorse, crea un inventario dei diversi tipi di contenuti e valuta quali tipi di ottimizzazioni specifiche puoi applicare per ridurne le dimensioni; potrai così ottenere risultati significativi! Poi, una volta definito ciò, automatizza tali ottimizzazioni aggiungendole alle procedure build e release; per garantire che vengano sempre effettuate.

## Compressione del testo con GZIP

### TL;DR {: .hide-from-toc }

- GZIP funziona meglio su risorse di testo: CSS, JavaScript, HTML.
- Tutti i browser moderni supportano la compressione con GZIP e la richiedono automaticamente
- Il tuo server deve essere configurato con la compressione GZIP abilitata
- Molti CDN richiedono particolare attenzione per assicurarsi che GZIP sia abilitata


[GZIP](http://en.wikipedia.org/wiki/Gzip){: .external } è un compressore generico applicabile a qualsiasi stream di byte. Sotto il codano , ricorda alcuni contenuti visti in precedenza e cerca di individuare e sostituire i frammenti di dati duplicati in maniera efficace. 
(Se sei curioso, ecco una [spiegazione a basso livello di GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s).)
Tuttavia, in pratica, GZIP funziona meglio su risorse di testo, raggiungendo spesso un tasso di compressione del 70-90% per i file più grossi, mentre su risorse già compresse tramite algoritmi alternativi (ad es. la maggior parte dei formati immagine) consente di avere qualche piccolo se non nessun miglioramento.

Tutti gli attuali browser supportano ed negoziano automaticamente la compressione GZIP per ogni richiesta HTTP. Devi solo assicurarti che il server sia configurato correttamente per fornire la risorsa compressa quando il client la richiede.


<table>
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

La tabella precedente illustra il risparmio consentito dalla compressione con GZIP per alcune delle librerie JavaScript e dei framework CSS più noti. Il risparmio va dal 60 all'88%; nota come la combinazione tra file minificati (identificati con “.min” nel nome) più GZIP offra una riduzione ancora maggiore.

1. **Applica prima le ottimizzazioni specifiche per i contenuti: minificatori CSS, JS e HTML.**
2. **Applica GZIP per comprimere il risultato minificato.**

L'attivazione di GZIP rappresenta una delle ottimizzazioni più semplici ed efficaci da applicare; sfortunatamente, molte persone si dimenticano ancora di farlo. La maggior parte dei server web comprime i contenuti per nostro conto, e resta solo da verificare che il server sia configurato correttamente per comprimere tutti i contenuti che possano beneficiare della compressione con GZIP.

Il progetto HTML5 Boilerplate contiene alcuni [file di configurazione di esempio](https://github.com/h5bp/server-configs) per tutti i principali server, con commenti dettagliati per ogni flag e impostazione di configurazione. 
Per determinare la configurazione migliore per il tuo server segui i seguenti passi:
* Cerca il tuo server preferito nell'elenco.
* Vai alla sezione GZIP.
* Assicurati che il tuo server sia configurato secondo le impostazioni raccomandate.

<img src="images/transfer-vs-actual-size.png" alt="Demo DevTools confronto dimensioni reali vs. trasferimento">

Un modo semplice e rapido di vedere GZIP in azione consiste nell'aprire Chrome DevTools e controllare la colonna “Size / Content“ nella scheda Rete: “Size“ indica le dimensioni di trasferimento della risorsa, mentre “Content“ indica le dimensioni espanse della risorsa. Per la risorsa HTML dell'esempio precedente, GZIP ha risparmiato 98.8 KB durante il trasferimento!

Note: In alcuni casi GZIP può aumentare le dimensioni di una risorsa. Di norma, ciò accade quando la risorsa è molto piccola e l'overhead del dizionario GZIP è maggiore del risparmio consentito dalla compressione, o se la risorsa è già compressa al massimo. Alcuni server consentono di specificare una dimensione minima per evitare tale problema.

Infine, nonostante la maggior parte dei server comprime automaticamente le risorse al posto tuo prima di presentarle all'utente, alcuni CDN richiedono particolare attenzione e un'azione manuale per garantire che gli oggetti GZIP siano serviti. Verifica che le risorse presenti sul tuo sito siano effettivamente [compresse](http://www.whatsmyip.org/http-compression-test/)
