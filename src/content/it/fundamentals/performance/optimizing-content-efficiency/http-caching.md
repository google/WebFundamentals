project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Memorizzare in cache e riutilizzare risorse precedentemente scaricate costituisce un aspetto fondamentale nell'ottimizzazione delle prestazioni.

{# wf_updated_on: 2017-07-14 #}
{# wf_published_on: 2013-12-31 #}

# Caching HTTP {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

Recuperare qualcosa dalla rete è un'azione lenta e costosa. Risposte 
consistenti richiedono numerosi scambi tra client e server, 
rallentandone la disponibilità ed elaborazione da parte del browser, 
oltre a comportare dei costi per il visitatore. Di conseguenza, la 
possibilità di mettere in cache e riutilizzare risorse recuperate in 
precedenza costituisce un aspetto fondamentale nell'ottimizzazione 
delle prestazioni.


La buona notizia è che ogni browser viene fornito con una cache HTTP 
integrata. Tutto ciò che dobbiamo fare è assicurarci che ogni risposta 
del server fornisca l'intestazione HTTP corretta per comunicare al 
browser quando e per quanto tempo la risposta può essere messa in cache.

Note: Se utilizzi una Webview per recuperare e visualizzare contenuti 
web nella tua applicazione, è possibile che tu debba fornire ulteriori 
flag di configurazione per garantire che la cache HTTP sia attiva, le 
dimensioni impostate siano idonee per l'utilizzo e la cache sia 
persistente. Consulta la documentazione relativa alla piattaforma e 
salva le impostazioni.

<img src="images/http-request.png" alt="Richiesta HTTP">

Quando il server invia una risposta, genera contemporaneamente un certo 
numero di intestazioni HTTP, con la descrizione dei contenuti, della 
lunghezza, delle indicazioni di caching, dei token di convalida e altro.
Ad esempio, nello scambio di cui sopra, il server invia una risposta a 
1024 byte, indica al client di metterla in cache fino a 120 secondi e 
fornisce un token di convalida ("x234dff") utilizzabile allo scadere 
della risposta per verificare se la risorsa abbia subito modifiche.


## Convalida di risposte messe in cache con ETag

### TL;DR {: .hide-from-toc }
* Il server usa l'intestazione HTTP ETag per comunicare un token di 
convalida.
* Il token di convalida consente di effettuare una verifica efficiente 
dell'aggiornamento delle risorse: nessun dato viene trasferito se la 
risorsa non ha subito modifiche.


Supponiamo siano trascorsi 120 secondi dal recupero e che il browser 
abbia inviato una nuova richiesta per la medesima risorsa. Prima di 
tutto il browser verifica innanzitutto la cache locale e individua la 
risposta precedente. Sfortunatamente però non può utilizzarla, poiché 
ormai scaduta. A questo punto, il browser può semplicemente inviare una 
nuova richiesta e recuperare la nuova risposta. Tuttavia, questo è 
inefficiente, poiché se la risposta non è cambiata, non c'è motivo di 
riscaricare gli stessi byte già in cache!

È proprio per risolvere questo tipo di problema che sono stati crearti 
i token di convalida e nello specifico le intestazioni ETag. Il server 
genera e invia un token casuale, di norma un cancelletto o un 
fingerprint dei contenuti del file. Al client non serve sapere come sia 
stata generato il fingerprint; deve solo inviarlo al server alla 
successiva richiesta: se il fingerprint è sempre uguale, allora la 
risorsa non è stata modificata, ed è quindi possibile saltare il 
download.

<img src="images/http-cache-control.png" alt="Esempio di Cache-Control
 HTTP">

Nell'esempio precedente, il client fornisce automaticamente il token 
ETag nell'intestazione di richiesta HTTP "If-None-Match"; il server 
confronta nuovamente il token con la risorsa corrente e, se questa non 
è cambiata, invia una risposta "304 Not Modified", che indica al browser 
che la risposta che ha in cache non è cambiata e può essere rinnovata 
per altri 120 secondi. Nota che non è necessario salvare ancora una 
volta la risposta, risparmiando tempo e larghezza di banda.

In qualità di sviluppatore web, in che modo puoi trarre vantaggio da 
una riconvalida efficace? Il browser esegue tutto il lavoro per conto 
nostro: individua automaticamente ogni token di convalida già 
specificato in precedenza, lo aggiunge a una richiesta in corso e 
aggiorna il timestamp della cache in base alla risposta ricevuta dal 
server. **L'unica cosa che ci resta da fare è assicurarci che il server 
stia effettivamente fornendo i token ETag necessari: per le flag di 
configurazione necessarie, consulta la documentazione del tuo server.**

Note: Suggerimento: il progetto HTML5 Boilerplate contiene 
<a href='https://github.com/h5bp/server-configs'>dei file di 
configurazione di esempio</a> per tutti i principali server, con 
commenti dettagliati per ogni flag e impostazione di configurazione: 
cerca il server desiderato nell'elenco, individua le impostazioni 
idonee e copiale/conferma che il server sia configurato come 
raccomandato.


## Cache-Control

### TL;DR {: .hide-from-toc }
* La modalità di caching di ogni risorsa può essere definita tramite 
l'intestazione HTTP Cache-Control
* Le direttive Cache-Control determinano chi può mettere in cache la 
risposta, a quali condizioni e per quanto tempo.


Dal un punto di vista dell'ottimizzazione delle performance, la 
richiesta migliore è quella che non richiede comunicazione con il 
server: una copia locale della risposta ci consente di eliminare 
qualsiasi latenza di rete ed evitare eventuali sovraccarichi nel 
trasferimento dei dati. A tal fine, la specifica HTTP consente al 
server di inviare [diverse direttive Cache-Control] 
(http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) 
che controllano come e per quanto tempo ogni singola risposta può essere 
messa in cache dal browser e altre cache intermedie.

Note: L'intestazione Cache-Control è stata definita all'interno delle 
specifiche HTTP/1.1 e sostituisce ogni intestazione precedente (ad es. 
Expires) utilizzate per definire le policy di caching delle risposte. 
Cache-Control è supportato da tutti gli attuali browser; non abbiamo 
quindi bisogno di altro.

<img src="images/http-cache-control-highlight.png" alt="Esempio di 
Cache-Control HTTP">

### "no-cache" e "no-store"

"no-cache" indica che la risposta ricevuta non può essere utilizzata 
per soddisfare una richiesta successiva per il medesimo URL senza 
prima verificare con il server se la risposta è cambiata. Di 
conseguenza, se è presente un token di convalida (ETag) idoneo, il 
no-cache effettuerà un roundtrip per convalidare la risposta in cache, 
ma potrà annullare il download se la risorsa non è cambiata.

Al contrario, 'no-store' è molto più semplice, poiché si limita a 
impedire al browser e a tutte le cache intermedie di memorizzare 
qualsiasi versione della risposta ricevuta, ad es. contenente dati 
sensibili o bancari. Ogni volta che l'utente richiede tale attività, la 
richiesta viene inviata al server e scaricata una risposta completa 
ogni volta.

### "public" vs. "private"

Se la risposta è contrassegnata come "public", può essere messa in 
cache anche se ad essa è associata un'autenticazione HTTP, e anche 
quando lo status code della risposta non può di norma essere messo in 
cache. La maggior parte delle volte, "public" non è necessario, perché 
il caching esplicito di informazioni (ad es. "max-age") indica
che la risposta può comunque essere messa in cache.

Al contrario, le risposte "private" possono essere messe in cache dal 
browser ma sono di norma rivolte a un singolo utente e non possono 
quindi essere messe in una cache intermedia; ad esempio, una pagina 
HTML con informazioni sensibili dell'utente può essere messa in cache 
dal browser dell'utente stesso, ma non da un CDN.

### "max-age"

Questa direttiva specifica il tempo massimo espresso in secondi durante 
il quale la risposta recuperata può essere riutilizzata a partire dalla 
richiesta; ad esempio, "max-age=60" indica che la risposta può essere 
messa in cache e riutilizzata per i successivi 60 secondi.

## Definizione di un metodo di Cache-Control ottimale

<img src="images/http-cache-decision-tree.png" alt="Albero decisionale 
di caching">

Segui l'albero decisionale sopra riportato per definire il metodo di 
caching ottimale per una determinata risorsa o un insieme di risorse 
utilizzate dalla tua applicazione. Idealmente, lo scopo dovrebbe essere 
quello di mettere in cache più risposte possibili sul client per il 
periodo più lungo possibile, nonché fornire dei token di convalida per 
ogni risposta per consentire una riconvalida efficace.

<table class="responsive">
<thead>
  <tr>
    <th colspan="2">Direttive di Cache-Control &amp; Spiegazione</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="explanation">La risposta può essere messa in cache dal 
  browser e in cache intermedie (ad es. è "public") per 1 giorno (60 
  secondi x 60 minuti x 24 ore)</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="explanation">La risposta può essere messa in cache dal 
  browser del client solo per un massimo di 10 minuti (60 secondi x 10 
  minuti)</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="explanation">La risposta non può essere messa in cache 
  e deve essere recuperata per intero a ogni richiesta.</td>
</tr>
</table>

Secondo HTTP Archive, tra i principali 300.000 siti (valutazione Alexa), 
[circa la metà di tutte le risposte scaricate può essere messa in cache](http://httparchive.org/trends.php#maxage0) dal 
browser, dato che si traduce in una quantità enorme di salvataggi per 
visualizzazioni e visite ripetute! Ciò naturalmente non significa che 
la tua particolare applicazione disponga di un 50% di risorse che 
possono essere messe in cache: alcuni siti raggiungono il 90% o più 
delle proprie risorse, mentre altri possono contenere molti dati 
privati o time-sensitive che non possono essere messi in cache.

**Controlla le tue pagine per individuare le risorse che possono essere 
messe in cache e assicurarti che forniscano intestazioni ETag e 
Cache-Control corrette.**


## Annullare e aggiornare le risposte in cache

### TL;DR {: .hide-from-toc }
* Le risposte messe nella cache locale vengono utilizzate fino a 
"scadenza" della risorsa.
* L'inclusione del fingerprint di un file nell'URL consente di forzare 
il client ad aggiornare la risposta.
* Ogni applicazione deve definire gerarchicamente la propria cache per 
garantire prestazioni ottimali.


Tutte le richieste HTTP del browser vengono prima inviate alla cache 
del browser per verificare se in essa sia presente una risposta valida 
utilizzabile per soddisfare la richiesta. In caso di corrispondenza, 
la risposta viene letta dalla cache, eliminando sia la latenza di 
rete, sia i costi di trasferimento dei dati. 

**Ma cosa succede se desideriamo aggiornare o annullare una risposta 
in cache?** Supponiamo ad esempio di avere detto ai nostri visitatori 
di mettere in cache un foglio stile CSS fino a 24 ore (max-age=86400), 
ma che il nostro designer abbia realizzato un aggiornamento che 
desideriamo mettere a disposizione di tutti gli utenti. Come possiamo 
comunicare a tutti i visitatori qual è ormai una copia cache 
"obsoleta" del nostro CSS per poter aggiornare le loro cache? Si 
tratta di una domanda a trabocchetto: non possiamo farlo, a meno che 
non modifichiamo l'URL della risorsa.

Una volta messa in cache dal browser, la versione verrà utilizzata 
fino a quando è valida, come determinato da max-age, o non scade, o 
fino a quando non viene eliminata dalla cache per qualche altra 
ragione, ad esempio la cancellazione della cache del browser da parte 
dell'utente. Di conseguenza, è possibile che utenti diversi si trovino 
ad utilizzare versioni diverse del file quando la pagina viene 
costruita; gli utenti che hanno appena recuperato la risposta 
utilizzeranno la nuova versione, mentre quelli che hanno messo in 
cache una copia precedente (ma sempre valida) useranno una versione 
precedente di tale risposta. 

**Come possiamo quindi trarre il massimo vantaggio da entrambi i 
mondi, ovvero dal caching lato client e dagli aggiornamenti?** 
Semplice: possiamo modificare l'URL della risorsa e forzare l'utente a 
scaricare la nuova risposta ogni volta che il contenuto cambia. Di 
norma ciò è possibile includendo un fingerprint del file o un numero 
versione nel filename, ad es. style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png" alt="Gerarchia di caching">

La possibilità di definire delle politiche di caching per singola 
risorsa ci consente di definire delle "gerarchie di caching" che ci 
permettono di controllare non solo i tempi di conservazione in cache, 
ma anche le modalità di visualizzazione delle nuove versioni da parte 
dell'utente. Per illustrare questo analizziamo l'esempio precedente:

* L'HTML è contrassegnato come "no-cache"; che significa che il 
browser dovrà quindi riconvalidare sempre il documento a ogni 
richiesta e recuperarne l'ultima versione se i contenuti cambiano. 
Inoltre, nel markup HTML, abbiamo inserito dei fingerprint negli URL 
per CSS e JavaScript: se il contenuto di tali file cambia, allora 
cambierà anche l'HTML della pagina e verrà scaricata una nuova copia 
della risposta HTML.
* Il CSS può essere messo in cache da browser e cache intermediarie 
(ad es., un CDN) ed è impostato con scadenza a un 1 anno. Nota che 
possiamo utilizzare senza problemi "far future expires" di 1 anno 
perché abbiamo incluso un fingerprint del file: se il CSS viene 
aggiornato, cambia anche l'URL.
* Anche la scadenza del JavaScript è impostata a 1 anno, ma è 
contrassegnata come "private", probabilmente perché contiene dei dati 
sensibili dell'utente che il CDN non può mettere in cache.
* L'immagine è messa in cache senza versione o fingerprint univoca, 
con scadenza 1 giorno.

La combinazione di ETag, Cache-Control e URL univoci ci consente di 
offrire il massimo da entrambi i lati: tempi di scadenza lunghi, 
controllo sul percorso di messa in cache della risposta e 
aggiornamenti on-demand.

## Checklist di caching

Non esiste un metodo di caching migliore di altri. A seconda del tuo 
schema di traffico, del tipo di dati scambiati e dei requisiti 
specifici dell'applicazione per l'aggiornamento dei dati, dovrai 
definire e configurare le impostazioni idonee per ogni risorsa, oltre 
alla "gerarchia di caching" generale.

Alcuni suggerimenti e tecniche da tenere a mente nel definire la strategia di caching:

* **Utilizza URL coerenti:** se offri il medesimo contenuto su URL 
diversi, tale contenuto verrà recuperato e memorizzato più volte. 
Suggerimento: ricorda che [gli URL sono case 
sensitive](http://www.w3.org/TR/WD-html40-970708/htmlweb.html)
* **Assicurati che il server fornisca un token di convalida (ETag):** 
con i token di convalida non è più necessario trasferire gli stessi 
byte se la risorsa sul server non è cambiata.
* **Individua le risorse che possono essere messe in cache da 
intermediari:** quelle con risposte identiche per tutti gli utenti 
sono perfette per essere messe in cache da un CDN e altri intermediari.
* **Stabilisci la durata ottimale della cache per ogni risorsa:**
risorse diverse possono avere esigenze di refresh diverse. Verifica e 
stabilisci il valore max-age idoneo per ciascuna.
* **Stabilisci la gerarchia di caching migliore per il tuo sito:** la 
combinazione tra URL della risorsa, fingerprint dei contenuti e cache 
brevi o nessuna cache per i documenti HTML ti consentono di 
controllare la frequenza degli aggiornamenti eseguiti dal client.
* **Riduci al minimo il rischio di perdita del cliente:** alcune 
risorse sono aggiornate più frequentemente di altre. Se una 
determinata parte di una risorsa (ad es. la funzione JavaScript o 
l'insieme degli stili CSS) viene aggiornata di frequente, valuta 
l'invio di tale codice come file separato. Così facendo, il promemoria 
dei contenuti (ad es. il codice libreria, che non cambia molto spesso) 
può essere recuperato dalla cache, minimizzando i contenuti scaricati 
ad ogni aggiornamento.

