project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-14 #}
{# wf_published_on: 2016-09-28 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

# Il modello PRPL {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Dogfood: PRPL è un nuovo modello con un grande potenziale. A questo punto,
iniziamo a sperimentarlo mentre iteriamo sulle idee del modello e raccogliamo
più dati su dove offre i maggiori vantaggi.

Il web mobile è troppo lento. Nel corso degli anni il web si è evoluto da una
piattaforma centrata sul documento verso una piattaforma di applicazioni di
primo livello. Grazie ai progressi nella piattaforma stessa (ad esempio
[Service Workers](/web/fundamentals/getting-started/primers/service-workers))
e negli strumenti e le tecniche che utilizziamo per creare app, gli utenti
possono fare praticamente qualsiasi cosa sul web che possono fare in
un'applicazione nativa.

Allo stesso tempo, la maggior parte dei nostri computer si sono spostati da
potenti macchine da tavolo con connessioni di rete veloci e affidabili a
dispositivi mobili con relativamente meno potenza e connessioni che sono spesso
lente, altalenanti o entrambi. Ciò è particolarmente vero in alcune parti del
mondo in cui il prossimo miliardo di utenti stanno arrivando in linea.

Purtroppo, i modelli che abbiamo ideato per la creazione e la distribuzione di
applicazioni web potenti e ricche di funzionalità nell'era del desktop generano
in genere applicazioni che richiedono molto tempo di caricamento sui dispositivi
mobili - tanto che molti utenti semplicemente rinunciano.

Questo rappresenta un'opportunità per creare nuovi modelli che sfruttino le
moderne funzionalità della piattaforma web per fornire granularmente le
esperienze di web mobile più rapidamente. Il PRPL è uno di questi modelli.

## Il modello PRPL

PRPL è un modello per la strutturazione e la pubblicazione di Applicazioni Web
Progressive (PWA), con particolare attenzione alle prestazioni di distribuzione
e nell'avvio delle applicazioni. Significa:

* **Push** risorse critiche per l'iniziale instradamento dell'URL.
* **Render** percorso iniziale.
* **Pre-cache** percorsi rimanenti.
* **Lazy-load** e creare i percorsi rimanenti su richiesta.

Oltre a raggiungere gli obiettivi e gli standard fondamentali di PWA, PRPL si
sforza di ottimizzare per:

* minimo tempo-di-interazione
     * Soprattutto al primo utilizzo (indipendentemente dal punto di ingresso)
     * Soprattutto nei dispositivi mobili del mondo reale
* Massima efficienza di memorizzazione nella cache, soprattutto nel tempo in
cui gli aggiornamenti vengono rilasciati
* Semplicità di sviluppo e implementazione

PRPL è ispirato da una suite di moderne funzionalità della piattaforma web, ma
è possibile applicare il modello senza utilizzare ogni lettera nell'acronimo o
utilizzare tutte le funzionalità.

Infatti, PRPL è più una mentalità e una visione a lungo termine per migliorare
le prestazioni del web mobile rispetto a tecnologie o tecniche specifiche. Le
idee dietro PRPL non sono nuove, ma l'approccio è stato incorniciato e nominato
dalla squadra di Polymer e svelato al [Google I/O 
2016](https://www.youtube.com/watch?v=J4i0xJnQUzU).

Il [negozio](https://shop.polymer-project.org) demo di Polymer è un esempio di
primo livello di un'applicazione che utilizza PRPL per servire granularmente le
risorse. Realizza interattività per ogni percorso incredibilmente in fretta sui
dispositivi mobili del mondo reale:

![La demo del Polymer Shop è interattivo in 1.75s](images/app-build-prpl-shop.jpg)

Per la maggior parte dei progetti del mondo reale, è francamente troppo presto
per realizzare la visione PRPL nella sua forma più pura e completa - ma non è
certo troppo presto per adottare la mentalità o per iniziare a cercare la
visione da varie angolazioni. Ci sono molti passi pratici che gli sviluppatori
di applicazioni, gli sviluppatori di tool e i produttori di browser possono
intraprendere oggi in ottica PRPL.

## Struttura App

PRPL può funzionare bene se si dispone di un'Applicazione a Singola Pagina (SPA)
con la seguente struttura:

-   Il principale _entrypoint_ dell'applicazione in cui viene fornito ogni
    percorso valido. Questo file dovrebbe essere molto piccolo, poiché
    verrà servito da URL diversi e quindi essere memorizzato più volte. Tutti
    gli URL di risorsa nel punto di ingresso devono essere assoluti, in quanto
    possono essere raggiunti da URL non-top-level.

-   La _shell_ o app-shell, che include la logica dell'applicazione ad alto
    livello, il router e così via.
    
-   I _fragments_ caricati in modalità lazy dall'app. Un frammento può
    rappresentare il codice per una vista particolare oppure altro codice che
    può essere caricato lazy (ad esempio, parti dell'app principale non
    necessaria per la prima visualizzazione, come i menu che non vengono
    visualizzati finché un utente non interagisce con l'applicazione). La shell
    è responsabile dell'importazione dinamica dei frammenti secondo necessità.

Il server e il service worker lavorano insieme per precare le risorse per i
percorsi inattivi.

Quando l'utente cambia percorsi, l'applicazione carica in modalità lazy le
risorse necessarie che non erano ancora state memorizzate nella cache e crea le
viste necessarie. Le visite ripetute agli itinerari devono essere
immediatamente interattive. I Service Worker aiutano molto qui.

Il diagramma seguente mostra i componenti di un'applicazione semplice che
potrebbe essere strutturata utilizzando [Web
Components](http://webcomponents.org/):

![diagramma di un'applicazione che dispone di due viste, che hanno sia dipendenze individuali che condivise](images/app-build-components.png)

Note: nonostante la strategia di bundling preferita di Polymer sia
l'Importazione HTML, è possibile utilizzare il code-splitting e il route-based
chunking per ottenere un'impostazione simile con i moderni moduli di bundle JavaScript.

In questo diagramma, le righe continue rappresentano _dipendenze statiche_:
le risorse esterne identificate nei file usando i tag `<link>` e `<script>`. Le
linee tratteggiate rappresentano dipendenze _dynamic_ o _demand-loaded_: file
caricati al bisogno dalla shell.

Il processo di build costruisce un grafico di tutte queste dipendenze e il
server utilizza queste informazioni per servire i file in modo efficiente. Crea
inoltre un insieme di bundle vulcanized, per i browser che non supportano
HTTP/2.

### App entrypoint

L'entrypoint deve importare ed istanziare la shell, nonché caricare
condizionalmente tutti i polyfill necessari.

Le principali considerazioni per l'entrypoint sono:

-   Ha dipendenze statiche minime, in altre parole, non molto oltre l'app-shell
    stessa.
-   Carica costantemente i polyfill richiesti.
-   Utilizza percorsi assoluti per tutte le dipendenze.

### App shell

La shell è responsabile dell'instradamento e solitamente include l'interfaccia
utente principale di navigazione per l'applicazione.

L'applicazione dovrebbe caricare i fragments in maniera lazy quando sono
richiesti. Ad esempio, quando l'utente richiede un nuovo percorso, importa i
frammenti associati per tale itinerario. Questo può avviare una nuova richiesta
al server oppure semplicemente caricare la risorsa dalla cache.

La shell (incluse le sue dipendenze statiche) dovrebbe contenere tutto il
necessario per la prima impaginazione.

## Output di build

Anche se non è un requisito ferreo per utilizzare PRPL, il processo di
build potrebbe produrre due build:

-   Una build unbundled progettata per combinazioni server/browser che
    supportano HTTP/2 per fornire le risorse necessarie al browser per una
    prima impaginazione veloce e ottimizzando la memorizzazione nella cache. La
    consegna di queste risorse può essere attivata in modo efficace
    [`<link rel="preload">`][Resource hints] or [HTTP/2 Push].

-   Una build bundle progettata per ridurre al minimo il numero di viaggi di
    andata e ritorno necessari per ottenere l'applicazione in esecuzione su
    combinazioni server/browser che non supportano il server push.

La logica del server dovrebbe fornire la build pià appropriata per ogni browser.

### Bundled build

Per i browser che non gestiscono HTTP/2, il processo di build potrebbe produrre
un insieme di diversi pacchetti: un bundle per la shell e un pacchetto per ogni
frammento. Il diagramma seguente mostra come una semplice applicazione sia in
bundle, utilizzando ancora Web Components:

![schema della stessa applicazione precedente, dove ci sono tre bundle di
dipendenze](images/app-build-bundles.png)

Ogni dipendenza condivisa di due o più frammenti è in bundle con la shell e le
sue dipendenze statiche.

Ogni frammento e le sue dipendenze statistiche _non condivise_ sono raggruppate
in un unico pacchetto. Il server dovrebbe restituire la versione appropriata
del frammento (bundle o unbundle), a seconda del browser. Ciò significa che il
codice della shell può caricare lazy `detail-view.html` _senza sapere se è
bundle o unbundle_. Si basa sul server e sul browser per caricare le dipendenze
nel modo più efficiente.

## Background: HTTP/2 e HTTP/2 server push

[HTTP/2] Consente di scaricare _in multiplex_ su una singola connessione, in
modo che i file più piccoli  possano essere scaricati in modo più efficiente.

[HTTP/2 server push][HTTP/2 Push] consente al server di inviare preventivamente
le risorse al browser.

Un esempio di come HTTP/2 server push acceleri i download, considerate come il
browser recupera un file HTML con un foglio di stile collegato.

In HTTP/1:

*   Il browser richiede il file HTML.
*   Il server restituisce il file HTML e il browser inizia a analizzarlo.
*   Il browser incontra il tag `<link rel="stylesheet">` e inizia una nuova
    richiesta per il foglio di stile.
*   Il browser riceve il foglio di stile.

Con HTTP/2 push:

*   Il browser richiede il file HTML.
*   Il server restituisce il file HTML ed invia il foglio di stile
    contemporaneamente.
*   Il browser inizia ad analizzare l'HTML. Nel momento in cui si incontra il
    `<link rel="stylesheet">`, il foglio di stile è già nella cache.

Nel caso più semplice, HTTP/2 server push elimina una singola richiesta e
risposta HTTP.

Con HTTP/1, gli sviluppatori uniscono le risorse per ridurre il numero di
richieste HTTP necessarie per il rendering di una pagina. Tuttavia, il
raggruppamento può ridurre l'efficienza della cache del browser. Se le risorse
per ogni pagina vengono combinate in un unico pacchetto, ogni pagina ha il
proprio pacchetto e il browser non è in grado di identificare le risorse
condivise.

La combinazione di HTTP/2 e HTTP/2 server push fornisce i _vantaggi_ del
bundling (riduzione della latenza) senza l'effettivo impacchettamento.
Mantenere le risorse separate significa che possono essere memorizzate in modo
efficiente e condivise tra le pagine.

HTTP/2 Push deve essere utilizzato con cautela, in quanto si forzano i dati nel
browser, anche se il file è già nella cache locale del browser o la larghezza
di banda è già satura. Se fatto nella maniera sbagliata, le prestazioni possono
ridursi. [`<link rel="preload">`][Resource hints] potrebbe essere una buona
alternativa per consentire al browser di prendere decisioni intelligenti sulla
priorità di queste richieste.

## Conclusione

Caricando il codice per i percorsi in maniera più granulare e consentendo ai
browser di pianificare meglio il lavoro si raggiunge il potenziale per
migliorare notevolmente l'interattività nelle applicazioni al più presto.
Abbiamo bisogno di **architetture migliori che consentano rapidamente
l'interattività** e il modello PRPL è un interessante esempio di come
realizzare questo obiettivo su veri dispositivi mobili.

Tutto è nella testa e di sviluppare abbastanza astrazioni. Se il tap su un
collegamento è ritardato da secondi di script che impedisce agli eventi di
ingresso di essere recapitati, è una forte indicazione che esiste un lavoro da
eseguire sulle prestazioni. Questo è un problema comune con applicazioni
realizzate utilizzando librerie JavaScript grandi odierne, dove l'interfaccia
utente è disegnata e sembra funzionare ma non funziona.

PRPL può contribuire a fornire il codice funzionale minimo necessario per
rendere il percorso che i tuoi utenti percorrono interattivo, affrontando
questa sfida.

[HTTP/2]: /web/fundamentals/performance/http2/
[Resource hints]: https://developers.google.com/web/updates/2016/03/link-rel-preload
[HTTP/2 Push]: /web/fundamentals/performance/http2/#server-push
