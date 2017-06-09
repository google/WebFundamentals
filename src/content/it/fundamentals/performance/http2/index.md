project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: HTTP/2 (o h2) è un protocollo binario che porta gli stream push, multiplex con controllo dei frame sul web.

{# wf_updated_on: 2017-06-09 #}
{# wf_published_on: 2016-09-29 #}

# Introduzione a HTTP/2 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}
{% include "web/_shared/contributors/surma.html" %}

Note: Il seguetne contenuto è estratto da [High Performance Browser
Networking](http://shop.oreilly.com/product/0636920028048.do) (O'Reilly, Ilya
Grigorik). Per la versione completa e relativi contenuti, vedere
[hpbn.co](https://hpbn.co/){: .external }.

HTTP/2 renderà le nostre applicazioni più veloci, più semplici e 
robuste — una combinazione rara — permettendoci di annullare molte 
delle soluzioni HTTP/1.1 precedentemente eseguite nelle nostre 
applicazioni e affrontare queste preoccupazioni all'interno del 
livello di trasporto stesso. Ancora meglio, apre anche una serie di 
nuove opportunità per ottimizzare le nostre applicazioni e migliorare 
le prestazioni!

Gli obiettivi primari per HTTP/2 sono ridurre la latenza attivando il 
multiplexing di richiesta e risposta, minimizzare il sovraccarico di 
protocollo tramite la compressione efficiente dei campi di 
intestazione HTTP e aggiungere il supporto per la priorità delle 
richieste e il server  push.
Per implementare questi requisiti, esiste un grande supporto di altri 
miglioramenti del protocollo, come il nuovo controllo del flusso, il 
trattamento degli errori e i meccanismi di aggiornamento, ma queste 
sono le caratteristiche più importanti che ogni sviluppatore web deve 
comprendere e sfruttare nelle proprie applicazioni.

HTTP/2 non modifica in alcun modo la semantica dell'applicazione di 
HTTP. Tutti i concetti fondamentali, come metodi HTTP, codici di 
stato, URI e campi di intestazione, rimangono in vigore. Invece, 
HTTP/2 modifica come i dati vengono formattati (framed) e trasportati 
tra il client e il server, che gestiscono l'intero processo e 
nascondono tutta la complessità delle nostre applicazioni all'interno 
del nuovo livello di framing. Di conseguenza, tutte le applicazioni 
esistenti possono essere consegnate senza modifiche.

*Perché non HTTP/1.2?*

Per raggiungere gli obiettivi di performance impostati dal gruppo di 
lavoro HTTP, HTTP/2 introduce un nuovo livello di framing binario che 
non è compatibile con i server e i client precedenti HTTP/1.x, da qui 
l'incremento maggiore della versione di protocollo in HTTP/2.

Detto questo, a meno che non si stia implementando un server web (o un 
client personalizzato) lavorando con socket TCP raw, non si vedrà 
alcuna differenza: tutte le novità e il framing di basso livello viene 
eseguito dal client e dal server per tuo conto. Le uniche differenze 
osservabili saranno un miglioramento delle prestazioni e la 
disponibilità di nuove funzionalità come la priorità nelle richieste, 
il controllo del flusso e il server push.

## Una breve storia di SPDY e HTTP/2

SPDY è stato un protocollo sperimentale, sviluppato da Google e 
annunciato a metà del 2009, il cui obiettivo primario era quello di 
cercare di ridurre la latenza di caricamento delle pagine web, 
affrontando alcune delle famose limitazioni di prestazioni di 
HTTP/1.1.
In particolare, gli obiettivi del progetto sono 
stati i seguenti:

* Obiettivo una riduzione del 50% del tempo di caricamento della 
pagina (PLT).
* Evitare la necessità di modifiche al contenuto dagli autori del sito 
web.
* Ridurre al minimo la complessità di distribuzione e evitare le 
modifiche delle infrastrutture di rete.
* Sviluppare questo nuovo protocollo in collaborazione con la comunità 
open-source.
* Raccogliere dati reali di prestazioni per convalidare o meno il 
protocollo sperimentale.

Note: Per ottenere il miglioramento del PLT del 50%, SPDY mirava a 
rendere più efficiente l'utilizzo della connessione TCP sottostante 
introducendo un nuovo livello di framing binario abilitando il multiplex 
della richiesta e della risposta, la priorità e la compressione 
dell'intestazione; vedere
[La latenza come collo di bottiglia delle performance](https://hpbn.co/primer-on-web-performance/#latency-as-a-performance-bottleneck){: .external}.

Non molto tempo dopo l'annuncio iniziale, Mike Belshe e Roberto Peon, 
entrambi software engineers di Google, hanno condiviso i loro primi 
risultati, la loro documentazione e il codice sorgente per 
l'implementazione sperimentale del nuovo protocollo SPDY:

> Finora abbiamo testato solo SPDY in condizioni di laboratorio. I 
> risultati iniziali sono molto incoraggianti: quando scarichiamo i 25 
> siti web più importanti sulle connessioni di rete simulate, 
> riscontrando un miglioramento significativo nei tempi di caricamento 
> delle pagine fino al 55% più veloci.
> [*(Chromium Blog)*](https://blog.chromium.org/2009/11/2x-faster-web.html)

Andando avanti velocemente al 2012 il nuovo protocollo sperimentale è 
supportato da Chrome, Firefox e Opera, e da un numero crescente di 
siti, sia grandi (ad esempio, Google, Twitter, Facebook) che piccoli, 
attivando SPDY all'interno della loro infrastruttura. In effetti, SPDY 
stava per diventare uno standard de facto attraverso l'adozione in 
massa nel settore.

Osservando questa tendenza, il Gruppo di lavoro HTTP (HTTP-WG) ha 
lanciato un nuovo sforzo per apprendere dalle lezioni da SPDY, 
costruire e migliorarle e sviluppare uno standard ufficiale "HTTP/2". 
È stato redatto un nuovo atto costitutivo, è stata fatta una chiamata 
aperta per le proposte HTTP/2 e dopo molte discussioni all'interno del 
gruppo di lavoro, la specifica SPDY è stata adottata come punto di 
partenza per il nuovo protocollo HTTP/2.

Negli anni successivi SPDY e HTTP/2 continuavano ad evolvere in 
parallelo, con SPDY che agiva come un ramo sperimentale utilizzato per 
testare nuove funzionalità e proposte per lo standard HTTP/2. Quello 
che sembra buono sulla carta potrebbe non funzionare in pratica e 
viceversa, e SPDY ha offerto un percorso per testare e valutare ogni 
proposta prima della sua inclusione nello standard HTTP/2. Alla fine, 
questo processo è durato tre anni e ha portato a più di una dozzina di 
progetti intermedi:

* Marzo 2012: Invito a presentare proposte per HTTP/2
* Novembre 2012: Prima bozza di HTTP/2 (basato su SPDY)
* Agosto 2014: Pubblicazione HTTP/2 draft-17 e HPACK draft-12
* Agosto 2014: Ultima chiamata per il gruppo di lavoro di HTTP/2
* Febbraio 2015: IESG approva bozze HTTP/2 e HPACK
* Maggio 2015: Pubblicazione RFC 7540 (HTTP/2) e RFC 7541 (HPACK)

All'inizio del 2015 l'IESG ha esaminato e approvato il nuovo standard 
HTTP/2 per la pubblicazione. Subito dopo, la squadra di Google Chrome 
ha annunciato il proprio programma per deprecare l'estensione SPDY e 
NPN per TLS:

> Le modifiche principali di HTTP/2 rispetto a HTTP/1.1 si concentrano 
> sul miglioramento delle prestazioni. Alcune funzionalità chiave come 
> il multiplexing, la compressione delle intestazioni, la priorità e 
> la negoziazione del protocollo si sono evolute dal lavoro eseguito 
> in un precedente protocollo aperto ma non standard, denominato 
> SPDY. Chrome ha supportato SPDY da Chrome 6, ma poiché la maggior 
> parte dei vantaggi sono presenti in HTTP/2, è tempo di dirgli addio. 
> Prevediamo di rimuovere il supporto per SPDY all'inizio del 2016 e 
> rimuovere anche il supporto per l'estensione TLS denominata NPN a 
> favore di ALPN in Chrome contemporaneamente. Gli sviluppatori dei 
> server sono fortemente incoraggiati a passare a HTTP/2 e ALPN.

> Siamo lieti di aver contribuito al processo di standard aperti che 
> ha portato a HTTP/2 e spero di vedere un'ampia adozione data l'ampio 
> impegno del settore sulla standardizzazione e l'implementazione. 
> [*(Chromium  Blog)*](https://blog.chromium.org/2015/02/hello-http2-goodbye-spdy.html)

L'evoluzione parallela di SPDY e HTTP/2 ha consentito a server, 
browser e sviluppatori di siti di acquisire esperienza nel mondo reale 
con il nuovo protocollo mentre era ancora in fase di sviluppo.
Di conseguenza, lo standard HTTP/2 è uno dei migliori e più ampiamente 
testati standard già appena uscito. Quando HTTP/2 è stato approvato 
dall'IESG, c'erano decine di client e server accuratamente testati e 
pronti per la produzione già implementati. Infatti, già poche 
settimane dopo l'approvazione finale del protocollo, molti utenti 
stavano beneficiando dei suoi vantaggi con diversi browser popolari (e 
molti siti) distribuiti con il supporto completo a HTTP/2.

## Obiettivi di design e tecnici

Le versioni precedenti del protocollo HTTP sono state progettate 
intenzionalmente per semplicità di implementazione: HTTP/0.9 è stato 
un protocollo di una linea per il bootstrap del World Wide Web; 
HTTP/1.0 ha documentato le estensioni popolari a HTTP/0.9 in uno 
standard informativo; HTTP / 1.1 ha introdotto uno standard ufficiale 
IETF; vedere [Breve storia di HTTP](https://hpbn.co/brief-history-of-http/){: .external}.
In quanto tali, HTTP/0.9-1.x hanno realizzato esattamente il loro 
obiettivo: HTTP è uno dei protocolli applicativi più ampiamente 
adottati su Internet.

Purtroppo, anche la semplicità d'implementazione è avvenuta a 
discapito delle prestazioni dell'applicazione: i client HTTP/1.x 
devono utilizzare più connessioni per ottenere la concorrenza e 
ridurre la latenza; HTTP/1.x non comprime le intestazioni di richiesta 
e di risposta, causando un traffico di rete superfluo; HTTP/1.x non 
consente una efficace priorità di risorse, con conseguenza uno scarso 
utilizzo della connessione TCP sottostante; e così via.

Queste limitazioni non erano fatali, ma visto che le applicazioni web 
continuavano a crescere nella loro portata, complessità e importanza 
nella nostra vita quotidiana, hanno imposto un crescente carico sia per 
gli sviluppatori che gli utenti del web, il che è esattamente ciò che 
HTTP/2 è stato progettato per affrontare:

> HTTP / 2 consente di utilizzare in modo più efficiente le risorse di 
> rete e di ridurre la percezione della latenza introducendo la 
> compressione del campo di intestazione e consentendo più scambi 
> simultanei sulla stessa connessione… Specifica che consente di 
> intervallare messaggi di richiesta e di risposta sulla stessa 
> connessione e utilizza un codifica efficiente per i campi di 
> intestazione HTTP. Consente inoltre di priorizzare le richieste, 
> consentendo di completare più rapidamente le richieste più 
> importanti, migliorando ulteriormente le prestazioni.

> Il protocollo risultante è più amico della rete, perché possono 
> essere utilizzate meno connessioni TCP in confronto a HTTP/1.x. Ciò 
> significa meno concorrenza con altri flussi e connessioni a lungo 
> termine, che a sua volta porta a una migliore utilizzazione della 
> capacità di rete disponibile. Infine, HTTP / 2 consente anche 
> un'elaborazione più efficiente dei messaggi tramite l'uso di framing 
> dei messaggi binari.> [*(Hypertext Transfer Protocol versione 2, Draft
> 17)*](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17)


È importante notare che HTTP/2 sta estendendo, non sostituendo, i 
precedenti standard HTTP. La semantica dell'applicazione di HTTP è la 
stessa e non sono state apportate modifiche alle funzionalità o ai 
concetti principali come i metodi HTTP, i codici di stato, gli URI e 
i campi delle intestazioni. Queste modifiche erano esplicitamente 
fuori dallo scopo di HTTP/2. Detto questo, mentre l'API di alto 
livello rimane la stessa, è importante capire come le modifiche a 
basso livello riguardano le limitazioni delle prestazioni dei 
precedenti protocolli. Facciamo un breve giro del livello binario di 
framing e le sue caratteristiche.

## Livello binario di framing

Al centro di tutti i miglioramenti delle prestazioni di HTTP/2 c'è il 
nuovo livello di framing binario, che è responsabile della modalità di 
incapsulamento e trasferimento dei messaggi HTTP tra il client e il 
server.

![HTTP/2 binary framing layer](images/binary_framing_layer01.svg)

Il "livello" si riferisce ad una scelta di progettazione per 
introdurre un nuovo meccanismo di codifica ottimizzato tra 
l'interfaccia socket e l'API HTTP esposta verso alto alle nostre 
applicazioni: la semantica HTTP, come i verbi, i metodi e le 
intestazioni, è invariata; mentre la codifica quando sono in transito 
è differente.
A differenza del protocollo HTTP/1.x delimitato da fine linea, tutte 
le comunicazioni HTTP/2 sono suddivise in messaggi e frame più piccoli, 
ognuno dei quali codificato in formato binario.

Di conseguenza, sia il client che il server devono utilizzare il nuovo 
meccanismo di codifica binario per capirsi tra loro: un client 
HTTP/1.x non comprende un server HTTP/2 e viceversa. Fortunatamente, 
le nostre applicazioni rimangono inconsapevolmente ignare di tutte 
queste modifiche, in quanto il cliente e il server eseguono tutto il 
lavoro di framing necessario per nostro conto.

## Stream, messaggi e frames

L'introduzione del nuovo meccanismo di framing binario cambia come i 
dati vengono scambiati tra il client e il server. Per descrivere 
questo processo, familiarizziamo con la terminologia HTTP/2:

* *Stream*: un flusso bidirezionale di byte all'interno di una 
connessione stabilita, che possono portare uno o più messaggi.
* *Messaggio*: una sequenza completa di frame che mappano a una 
richiesta logica o un messaggio di risposta.
* *Frame*: La più piccola unità di comunicazione in HTTP/2, ognuno 
contenente una intestazione di frame, che come minimo identifica il 
flusso a cui appartiene il fotogramma.

La relazione di questi termini può essere riassunta come segue:

* Tutte le comunicazioni vengono eseguite al'linterno di una singola 
connessione TCP che può portare qualsiasi numero di flussi bidirezionali.
* Ogni flusso ha un identificativo univoco e le informazioni di 
priorità opzionali utilizzate per il trasporto di messaggi bidirezionali.
* Ogni messaggio è un messaggio HTTP logico, come una richiesta o una 
risposta, che consiste di uno o più fotogrammi.
* Il frame è la più piccola unità di comunicazione che porta un tipo 
specifico di dati, ad esempio, intestazioni HTTP, payload del 
messaggio e così via. I frame di diversi flussi possono essere 
interposti e quindi riassemblati tramite l'identificatore di flusso 
incorporato nell'intestazione di ciascun frame.
![HTTP/2 stream, messaggi e frame](images/streams_messages_frames01.svg)

In breve, HTTP/2 spezza la comunicazione del protocollo HTTP in 
uno scambio di frame codificati in binario, che vengono poi mappati a 
messaggi che appartengono a un flusso particolare, tutti questi vengono 
poi multiplepliati all'interno di una singola connessione TCP. Questa 
è la base che consente tutte le altre funzioni e le ottimizzazioni 
delle prestazioni fornite dal protocollo HTTP/2.

## Multiplexing di richieste e risposte

Con HTTP/1.x, se il client desiderava fare più richieste parallele per 
migliorare le prestazioni, doveva utilizzare più connessioni TCP (vedi
[Utilizzo di più connessioni  TCP](https://hpbn.co/http1x/#using-multiple-tcp-connections)). 
Questo comportamento è una conseguenza diretta del modello di consegna 
HTTP/1.x, che assicura che una sola risposta possa essere consegnata 
per volta (risposta alla coda) per connessione. Peggio ancora, ciò 
comporta anche il blocco della linea diretta e l'uso inefficiente 
della connessione TCP sottostante.

Il nuovo livello di framing binario in HTTP/2 rimuove queste 
limitazioni e consente la completa richiesta di multiplexing e la 
risposta, consentendo al client e al server di dividere un 
messaggio HTTP in frame indipendenti, di intervallarli e di 
ricomporarli all'altro capo.

![HTTP/2 multiplex di richieste e risposte all'interno di una connessione condivisa](images/multiplexing01.svg)

L'istantanea mostra più flussi in viaggio all'interno della stessa 
connessione. Il client sta trasmettendo un frame DATA (stream 5) al 
server, mentre il server trasmette una sequenza di frame 
intervallati al client per i flussi 1 e 3. Di conseguenza, sono 
presenti tre flussi paralleli in viaggio.

La possibilità di rompere un messaggio HTTP in frame indipendenti, di 
intervallarli e di ricomporarli all'altro capo è il miglioramento più 
importante di HTTP/2. Infatti, presenta un effetto onda per numerosi 
vantaggi prestazionali su tutta la pila delle tecnologie web, 
consentendoci di:

* Richiamare molteplici richieste in parallelo senza bloccare nessuno.
* intervallare molteplici risposte in parallelo senza bloccare nessuno.
* Utilizzare una singola connessione per fornire più richieste e 
risposte in parallelo.
* Eliminare i workaround HTTP/1.x non necessari (vedere
   [Ottimizzazione per HTTP / 1.x](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x),
come file concatenati, immagini sprite e sharding di dominio.
* Consente di ridurre i tempi di caricamento della pagina eliminando la 
latenza non necessaria e migliorare l'utilizzo della capacità di rete 
disponibile.
* *E altro ancora…*

Il nuovo livello di framing binario in HTTP/2 risolve il problema di 
blocco della head-of-line trovato in HTTP/1.x ed elimina la necessità 
di più connessioni per consentire l'elaborazione parallela e la 
consegna delle richieste e delle risposte. Di conseguenza, questo 
rende le applicazioni più veloci, più semplici e più economiche da 
implementare.

## Priorità dello Stream

Una volta che un messaggio HTTP può essere suddiviso in molti frame 
singoli e permettiamo a frame di steam multipli, l'ordine in cui i 
frame vengono interposti e consegnati sia dal client che dal server 
diventa una considerazione di prestazioni critica. Per facilitare 
questo, lo standard HTTP/2 consente a ciascun flusso di avere un peso 
e una dipendenza associati:

* Ogni stream può avere assegnato un peso intero compreso tra 1 e 256.
* Ogni stream può avere una dipendenza esplicita su un altro flusso.

La combinazione di dipendenze e pesi di flusso consente al client di 
costruire e comunicare un "albero di priorità" che esprime come 
preferirebbe ricevere risposte. A sua volta, il server può utilizzare 
queste informazioni per dare priorità all'elaborazione del flusso 
controllando l'allocazione della CPU, della memoria e di altre risorse 
e, una volta che i dati di risposta sono disponibili, l'allocazione 
della larghezza di banda per garantire una distribuzione ottimale 
delle risposte ad alta priorità per il client.

![HTTP/2 stream dependencies and weights](images/stream_prioritization01.svg)

Una dipendenza dello stream all'interno di HTTP/2 viene dichiarata 
facendo riferimento all'identificativo univoco di un altro stream come 
suo padre; Se l'identificatore viene omesso, viene detto che il stream 
dipende dallo "stream radice". La dichiarazione di una dipendenza dal 
stream indica che, se possibile, il flusso principale dovrebbe essere 
assegnato risorse prima delle sue dipendenze. In altre parole, "per 
favore elaborare e consegnare la risposta D prima della risposta C".

Gli steam che condividono lo stesso genitore (cioè i flussi di fratelli) 
dovrebbero essere assegnati risorse in proporzione al loro peso. Ad 
esempio, se il flusso A ha un peso di 12 e il suo figlio B ha un peso 
di 4, allora per determinare la proporzione delle risorse che ciascuno 
di questi stream deve ricevere:

1. Somma tutti i pesi: `4 + 12 = 16`
1. Dividere ogni peso del flusso con il peso totale: `A = 12/16, B = 4 / 16`

Pertanto, lo stream A dovrebbe ricevere tre quarti e lo stream B 
dovrebbe ricevere un quarto delle risorse disponibili; Lo stream B 
dovrebbe ricevere un terzo delle risorse allocate per lo stream A. 
Esaminiamo alcuni esempi pratici nell'immagine sopra. Da sinistra a destra:

1. Né lo stream A né B specifica una dipendenza padre e si dice che 
dipendono dallo "stream radice" implicito; A ha un peso di 12 e B ha un 
peso di 4. Quindi, sulla base di pesi proporzionali: lo stream B 
dovrebbe ricevere un terzo delle risorse assegnate allo stream A.
1. Lo stream D dipende dallo stream radice; C è dipendente da D. Quindi, 
D dovrebbe ricevere una piena allocazione di risorse prima di C. I pesi 
sono incongruenti perché la dipendenza di C comunica una preferenza più 
forte.
1. Lo stream D dovrebbe ricevere un'assegnazione completa delle risorse 
prima di C; C dovrebbe ricevere l'assegnazione completa delle risorse 
prima di A e B; Lo stream B dovrebbe ricevere un terzo delle risorse 
assegnate allo stream A.
1. Lo stream D dovrebbe ricevere la piena allocazione delle risorse 
prima di E e C; E e C dovrebbero ricevere una ripartizione pari prima 
di A e B; A e B dovrebbero ricevere un'assegnazione proporzionale 
basata sui loro pesi.

Come illustrato di seguito, la combinazione di dipendenze e pesi degli 
stream fornisce una lingua espressiva per la priorità delle risorse, 
che è una caratteristica fondamentale per migliorare le prestazioni di 
navigazione in cui abbiamo molti tipi di risorse con diverse 
dipendenze e pesi. Ancora meglio, il protocollo HTTP/2 consente 
inoltre al client di aggiornare queste preferenze in qualsiasi 
momento, che consente ulteriori ottimizzazioni nel browser. In altre 
parole, possiamo cambiare le dipendenze e riallocare i pesi in 
risposta all'interazione dell'utente e ad altri segnali.

Note: Le dipendenze ed i pesi degli stream esprimono una preferenza di 
trasporto, non un requisito, e in quanto tale non garantiscono un 
particolare ordine di elaborazione o trasmissione. Cioè il client non 
può obbligare il server a elaborare uno stream in un particolare ordine 
utilizzando la priorità dello stream. Mentre questo può sembrare 
controproducente, è in realtà il comportamento desiderato. Non 
vogliamo bloccare il server per fare progressi su una risorsa di 
priorità inferiore se una risorsa di priorità superiore è bloccata.

## Una connessione per origine

Con il nuovo meccanismo di framing binario interno, HTTP/2 non ha più 
bisogno di più connessioni TCP per eseguire multiplex di stream in 
parallelo; ogni stream è suddiviso in molti frame, che possono essere 
intervallati e priorizzati. Di conseguenza, tutte le connessioni 
HTTP/2 sono persistenti e si rende necessaria solo una connessione per 
origine, che offre numerosi vantaggi.

> Sia in SPDY che in HTTP/2 la funzionalità più importante è il 
> multiplex arbitrario su un solo canale ben controllato con 
> controllo della congestione. Mi stupisce quanto sia importante e 
> quanto funzioni bene. Una grande metrica che piace a me attorno a 
> questo è la frazione di connessioni create che trasportano solo una 
> singola transazione HTTP (e quindi fa sì che la transazione 
> sopporti tutto il sovraccarico). Per HTTP/1 il 74% delle 
> nostre connessioni attive trasporta solo una singola transazione - le 
> connessioni persistenti non sono così utili come invece vorremmo. Ma 
> in HTTP/2 tale numero scende al 25%. Questa è una grande vittoria per 
> la riduzione dell'overhead in generale. [*(HTTP/2 is Live in Firefox, Patrick McManus)*](http://bitsup.blogspot.co.uk/2015/02/http2-is-live-in-firefox.html)

La maggior parte dei trasferimenti HTTP sono brevi e prorompenti, 
mentre TCP è ottimizzato per trasferimenti di dati a lungo termine e 
in massa. Riutilizzando la stessa connessione, HTTP/2 è in grado di 
utilizzare più efficacemente ogni connessione TCP e di ridurre 
notevolmente l'overhead complessivo del protocollo. Inoltre, 
l'utilizzo di meno connessioni riduce l'utilizzo di memoria e tempo di 
elaborazione lungo tutto il periodo di connessione (in altre parole, 
client, intermediari e server di origine). Ciò riduce i costi 
operativi complessivi e migliora l'utilizzo e la capacità della rete. 
Di conseguenza, il passaggio a HTTP/2 non dovrebbe solo ridurre la 
latenza della rete, ma anche contribuire a migliorare la banda 
passante e ridurre i costi operativi.

Note: Il numero ridotto di connessioni è una caratteristica 
particolarmente importante per migliorare le prestazioni delle 
implementazioni HTTPS: questo si traduce in handshake TLS meno costosi, 
un migliore riutilizzo della sessione e una riduzione complessiva 
delle risorse richieste di client e server.

## Controllo del flusso

Il controllo del flusso è un meccanismo per impedire al mittente di 
sovraffollare il ricevitore con i dati che potrebbero non essere 
desiderati o essere in grado di elaborare: il ricevitore può essere 
occupato, sotto carico pesante o può essere disposto solo a assegnare 
una quantità fissa di risorse per un determinato flusso. Ad esempio, 
il client potrebbe aver richiesto un flusso video di grandi dimensioni 
con priorità elevata, ma l'utente ha interrotto il video e il client 
vuole ora mettere in pausa o limitare la consegna dal server per 
evitare di recuperare e bufferizzare i dati non necessari. In 
alternativa, un server proxy può avere connessioni veloci in downstream 
e lente in upstream e in maniera analoga desidera regolare quanto 
velocemente il downstream fornisce i dati in relazione alla velocità 
di upstream per controllare l'utilizzo delle risorse; e così via.

I requisiti di cui sopra ti ricordano il controllo del flusso TCP? 
Dovrebbero, in quanto il problema è effettivamente identico (vedi 
[Flow Control](https://hpbn.co/building-blocks-of-tcp/#flow-control)). 
Tuttavia, poiché i flussi HTTP/2 sono multiplexati in una singola 
connessione TCP, il controllo del flusso TCP non è sufficientemente 
granulare e non fornisce le API necessarie a livello di applicazione 
per regolare la distribuzione di singoli flussi. Per risolvere questo 
problema, HTTP/2 fornisce un insieme di blocchi di costruzione 
semplici che consentono al client e al server di implementare il 
proprio controllo di flusso a livello di stream e connessione:

* Il controllo del flusso è direzionale. Ogni ricevitore può scegliere 
di impostare qualsiasi dimensione di finestra che desidera per ogni 
flusso e l'intera connessione.
* Il controllo del flusso è basato su crediti. Ogni ricevitore 
pubblicizza la relativa connessione iniziale e la finestra di 
controllo del flusso per stream (in byte), che viene ridotta ogni 
volta che il mittente emette un frame `DATA` e incrementata tramite un 
frame `WINDOW_UPDATE` inviato dal ricevitore.
* Il controllo del flusso non può essere disattivato. Quando viene 
stabilita la connessione HTTP/2, il client e il server si scambiano un 
frame `SETTINGS`, che imposta le dimensioni della finestra di 
controllo del flusso in entrambe le direzioni. Il valore predefinito 
della finestra di controllo del flusso è impostato a 65.535 byte, ma 
il ricevitore può impostare una finestra più grande fino alla dimensione 
massima (`2 ^ 31-1` byte) e mantenerla inviando un frame` WINDOW_UPDATE` 
ogni volta che vengono ricevuti dati.
* Il controllo del flusso è hop-by-hop, non end-to-end. Cioè, un 
intermediario può utilizzarlo per controllare l'utilizzo delle risorse 
e implementare meccanismi di allocazione delle risorse basati su 
propri criteri ed euristiche.

HTTP/2 non specifica alcun particolare algoritmo per l'implementazione 
del controllo del flusso. Invece, fornisce dei semplici blocchi ed 
ne lascia l'implementazione al client e al server, che può utilizzarlo 
per implementare strategie personalizzate per regolare l'utilizzo e 
l'allocazione delle risorse, nonché implementare nuove funzionalità di 
consegna che possono contribuire a migliorare sia le prestazioni reali 
che quelle percepite (vedere [velocità, prestazioni e la percezione umana](https://hpbn.co/primer-on-web-performance/#speed-performance-and-human-perception))
delle nostre applicazioni web.
Ad esempio, il controllo del flusso a livello di applicazione consente 
al browser di recuperare solo una parte di una risorsa particolare, 
mettere in attesa il download riducendo la finestra di controllo del 
flusso di flusso a zero e quindi riprenderla in un secondo momento. In 
altre parole, consente al browser di recuperare un'anteprima o una 
prima scansione di un'immagine, visualizzarla e consentire ad altri 
download di alta priorità di procedere e riprendere il recupero una 
volta che le risorse critiche hanno terminato il caricamento.

## Server push

Un'altra funzionalità potente di HTTP/2 è la capacità del server di 
inviare più risposte per una singola richiesta di client. Cioè, oltre 
alla risposta alla richiesta originale, il server può inviare risorse 
aggiuntive al client (Figura 12-5), senza che il client debba richiederle esplicitamente.

![Il server intraprende nuovi stream (promises) per le risorse push
](images/push01.svg)

Note: HTTP/2 rompe dalla semantica rigorosa di richiesta-risposta e 
abilita i flussi di lavoro push-to-many e server-initiated che aprono 
un mondo di nuove possibilità di interazione sia all'interno che 
all'esterno del browser. Questa è una caratteristica abilitativa che 
avrà importanti conseguenze a lungo termine sia per come pensiamo al 
protocollo, sia dove e come viene utilizzato.

Perché abbiamo bisogno di un tale meccanismo in un browser? Una tipica 
applicazione web è costituita da decine di risorse, tutte scoperte dal 
cliente esaminando il documento fornito dal server. Di conseguenza, 
perché non eliminare la latenza supplementare e lasciare che il server 
invii le risorse associate in anticipo? Il server sa già quali 
risorse il client richiederà; È il server push.

Infatti, se hai mai inserito inline un CSS, un JavaScript o qualsiasi 
altra risorsa tramite un URI di dati (vedi [Risorse Inline](https://hpbn.co/http1x/#resource-inlining)),
allora hai già esperienza pratica con il server push. Inserendo  
manualmente la risorsa inline nel documento, in pratica spingiamo 
questa risorsa al client, senza aspettare che il client lo richieda. 
Con HTTP/2 possiamo ottenere gli stessi risultati, ma con ulteriori 
vantaggi in termini di prestazioni. Le risorse push possono essere:

* Nella cache del client
* Riutilizzate su diverse pagine
* Multiplexate vicino ad altre risorse
* Priorizzate dal server
* Rifiutate dal cliente

### Introduzione alle `PUSH_PROMISE`

Tutti gli stream server push vengono avviati tramite i frame 
`PUSH_PROMISE` che indicano l'intenzione del server eseguire push delle 
risorse descritte al client e devono essere consegnate prima dei dati 
di risposta che richiedono le risorse push. Questo ordine di 
consegna è fondamentale: il client deve sapere quali risorse il server 
intende inviare push per evitare di creare richieste duplicate per 
queste risorse. La strategia più semplice per soddisfare questo 
requisito consiste nell'invio di tutti i frame `PUSH_PROMISE` che 
contengono solo le intestazioni HTTP della risorsa promessa, prima
della risposta del genitore (in altre parole, i frame `DATA`).

Una volta che il client riceve un frame `PUSH_PROMISE`, ha la 
possibilità di rifiutare il flusso (tramite un frame `RST_STREAM`) se 
lo desidera. (Ciò potrebbe accadere ad esempio perché la risorsa è già 
in cache.) Questo è un importante miglioramento rispetto a HTTP/1.x. 
Al contrario, l'utilizzo di risorse inline, che è una "ottimizzazione" 
popolare per HTTP/1.x, equivale a un "push forzato": il client non 
può fare opt-out, annullarla o elaborare individualmente la risorsa 
inline.

Con HTTP/2 il client ha il pieno controllo di come viene utilizzato il 
server push. Il client può limitare il numero di stream push 
contemporanei; Regolare la finestra di controllo dello stream iniziale 
per controllare quanti dati vengono spinti quando lo stream viene 
aperto; O disattivare completamente il server push. Queste preferenze 
vengono comunicate tramite i frame `SETTINGS` all'inizio della 
connessione HTTP/2 e possono essere aggiornati in qualsiasi momento.

Ogni risorsa push è uno stream che, a differenza di una risorsa 
inline, consente di essere singolarmente multiplexata, prioritizzata 
ed elaborata dal client. L'unica limitazione della sicurezza, come 
rafforzato dal browser, è che le risorse push devono rispettare la  
politica della stessa origine: il server deve essere autoritativo per 
il contenuto fornito.

## Compressione dell'intestazione

Ogni trasferimento HTTP trasporta un insieme di intestazioni che 
descrivono la risorsa trasferita e le sue proprietà. In HTTP/1.x, 
questo metadato viene sempre inviato come testo normale e aggiunge  
500-800 byte di overhead per trasferimento e talvolta più kilobyte se 
vengono utilizzati i cookie HTTP. (Vedere 
[Misurazione e controllo dell'overhead di protocollo ](https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead)
). Per ridurre tale overhead e migliorare le prestazioni, HTTP/2 
comprime i metadati delle intestazioni di richiesta e risposta 
utilizzando il formato di compressione HPACK che utilizza due tecniche 
semplici ma potenti:

1. Permette di codificare i campi dell'intestazione trasmessa tramite 
un codice statico Huffman, che riduce le singole dimensioni di 
trasferimento.
1. Richiede che sia il client che il server mantengano e aggiornino un 
elenco indicizzato di campi di intestazione precedentemente 
visualizzati (in altre parole, stabilisce un contesto di compressione 
condiviso) che viene quindi utilizzato come riferimento per codificare 
in modo efficiente i valori precedentemente trasmessi.

La codifica di Huffman consente di comprimere i singoli valori quando 
vengono trasferiti e l'elenco indicizzato di valori precedentemente 
trasferiti ci consente di codificare i valori duplicati trasferendo i 
valori di indice che possono essere utilizzati per esaminare e 
ricostruire efficacemente le chiavi e valori completi dell'intestazione.

![HPACK: Compressione delle intestazoni per  HTTP/2](images/header_compression01.svg)

Come ulteriore ottimizzazione, il contesto di compressione HPACK 
consiste in una tabella statica e dinamica: la tabella statica è 
definita nella specifica e fornisce un elenco di campi di intestazione 
HTTP comune che tutte le connessioni possono utilizzare (ad esempio, 
nomi di intestazione validi); La tabella dinamica è inizialmente vuota 
e viene aggiornata in base ai valori scambiati all'interno di una 
connessione particolare. Di conseguenza, la dimensione di ogni 
richiesta viene ridotta usando la codifica statica di Huffman per 
valori che non sono stati visti prima e la sostituzione di indici per 
i valori che sono già presenti nelle tabelle statiche o dinamiche da ciascuna parte.

Note: le definizioni dei campi dell'intestazione di richiesta e di 
risposta in HTTP/2 rimangono invariati, con alcune eccezioni minori: 
tutti i nomi dei campi di intestazione sono minuscoli e la "request 
line" è ora divisa in singoli campi `:method`, `:scheme`, `:authority` 
e `:path` di pseudo-intestazione.

### Sicurezza e prestazioni di HPACK

Le versioni precedenti di HTTP/2 e SPDY usavano zlib, con un 
dizionario personalizzato, per comprimere tutte le intestazioni HTTP. 
Ciò ha consentito una riduzione dall'85% all'88% la dimensione dei 
dati dell'intestazione trasferita e un significativo miglioramento 
della latenza di caricamento della pagina:

> Sul un collegamento DSL a bassa banda passante, in cui l'upload è 
> solo 375 Kbps, in particolare la compressione delle intestazioni, ha 
> determinato miglioramenti significativi del tempo di caricamento 
> delle pagine per alcuni siti (ovvero quelli che hanno generato un 
> gran numero di richieste di risorse). Abbiamo trovato una riduzione 
> di 45-1142 ms nel tempo di caricamento della pagina semplicemente a 
> causa della compressione di intestazione. 
([*Whitepaper SPDY, chromium.org*](https://www.chromium.org/spdy/spdy-whitepaper))

Tuttavia, nell'estate del 2012, è stato pubblicato un attacco di 
sicurezza "CRIME" contro gli algoritmi di compressione TLS e SPDY, che 
potrebbero causare la disconnessione di sessioni. Di conseguenza, 
l'algoritmo di compressione zlib è stato sostituito da HPACK, 
specificamente progettato per: affrontare le problematiche di 
sicurezza rilevate, essere efficiente e semplice da implementare 
correttamente e, ovviamente, consentire una buona compressione dei 
metadati delle intestazioni HTTP.

Per i dettagli completi dell'algoritmo di compressione HPACK, vedere
<https://tools.ietf.org/html/draft-ietf-httpbis-header-compression>.

## Ulteriori letture:

* [“HTTP/2”](https://hpbn.co/http2/){: .external } 
    – L'articolo completo di Ilya Grigorik
* [“Impostare HTTP/2”](https://surma.link/things/h2setup/){: .external } 
    – Come impostare HTTP/2 nei diversi backend di Surma
* [“HTTP/2 è qui, ottimizziamo!”](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19) 
    – Presentazione di Ilya Grigorik al Velocity 2015
* [“Rules of Thumb for HTTP/2 Push”](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit) 
    – Un'analisi di Tom Bergan, Simon Pelchat e Michael Buettner su 
    quando e come usare il push.
