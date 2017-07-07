project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: È importante capire come si comporta l'applicazione o il sito come quando la connettività è scarsa o inaffidabile, e costruirlo di conseguenza. Una gamma di strumenti può aiutarti.

{# wf_updated_on: 2017-07-06 #}
{# wf_published_on: 2016-05-09 #}

# Comprendere la Bassa Larghezza di Banda e la Latenza Elevata {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

È importante capire come si comporta l'applicazione o il sito come 
quando la connettività è scarsa o inaffidabile, e costruirlo di 
conseguenza. Una gamma di strumenti può aiutarti.

## Test con bassa larghezza di banda e alta latenza {: #testing }

Una 
[quantità crescente](http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html) 
di persone utilizza la rete sui dispositivi mobili. Anche a casa, 
[molte persone stanno abbandonando la banda larga fissa per il mobile](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/).

In questo contesto, è importante capire come si comporta l'applicazione 
o il sito quando la connettività è scarsa o inaffidabile. Una gamma di 
strumenti software può aiutarti 
[emulare e simulare](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-differenza) 
bassa larghezza di banda e alta 
[latenza](https: //www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/).

### Emulare un rallentamento di rete

Durante la creazione o l'aggiornamento di un sito, è necessario 
assicurare prestazioni adeguate in una varietà di condizioni di 
connettività. Diversi strumenti possono aiutarti.

#### Strumenti del browser

[Chrome DevTools](/web/tools/chrome-devtools) ti consente di testare il tuo sito con 
varie velocità di upload/download e [tempi di round-trip] [rtt], utilizzando impostazioni 
preimpostate o personalizzate dal pannello di rete. Vedere 
[Iniziare con l'Analisi delle Performance di Rete](/web/tools/chrome-devtools/network-performance/) 
per imparare le basi.

![Chrome DevTools throttling](images/chrome-devtools-throttling.png)

[rtt]: https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/

#### Strumenti di sistema

Network Link Conditioner è un pannello di preferenze disponibile su Mac 
installando 
[Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) 
per Xcode: 
![pannello di controllo Mac Network Link Conditioner](images/network-link-conditioner-control-panel.png)

![impostazioni Mac Network Link Conditioner](images/network-link-conditioner-settings.png)

![impostazioni personalizzate Mac Network Link Conditioner](images/network-link-conditioner-custom.png)

#### Emulazione del dispositivo

[Emulatore Android](http://developer.android.com/tools/devices/emulator.html#netspeed) 
consente di simulare le varie condizioni di rete durante l'esecuzione di 
applicazioni (compresi browser web e applicazioni web ibride) su Android:

![Emulatore Android](images/android-emulator.png)

![Impostazioni dell'Emulatore Android](images/android-emulator-settings.png)

Per iPhone, il Network Link Conditioner può essere utilizzato per 
simulare le condizioni di rete scarsa (vedi sopra).

### Test da diversi luoghi e reti

Le prestazioni della connettività dipendono dalla posizione del server 
e dal tipo di rete.

[WebPagetest](https://webpagetest.org) è un servizio online che consente 
di eseguire un set di test di prestazioni per il tuo sito utilizzando 
una vasta gamma di reti e località di hosting. Ad esempio, puoi provare 
il tuo sito da un server in India su una rete 2G o su un cavo da una 
città negli Stati Uniti.

![Impostazioni di WebPagetest](images/webpagetest.png)

Selezionare una posizione e, dalle impostazioni avanzate, selezionare un 
tipo di connessione. Puoi anche automatizzare i test utilizzando 
[scripts](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) 
(ad esempio, per fare login a un sito) o utilizzando 
[RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). 
Questo ti aiuta a includere test di connettività nei processi di 
generazione o nella registrazione delle prestazioni.

[Fiddler](http://www.telerik.com/fiddler) supporta il proxy Globale 
tramite [GeoEdge](http://www.geoedge.com/faq) e le sue regole 
personalizzate possono essere utilizzate per simulare le velocità del 
modem:

![Fiddler proxy](images/fiddler.png)

### Prova una rete altalenante

I proxy software e hardware consentono di emulare condizioni di reti 
mobili problematiche, come la limitazione della larghezza di banda, il 
ritardo dei pacchetti e la perdita casuale dei pacchetti. Un proxy 
condiviso o una rete scarsa possono consentire a un team di sviluppatori 
di includere test di rete del mondo reale nel loro flusso di lavoro.

Il sistema Facebook di [Augmented Traffic Control](http://facebook.githubith.io/augmented-traffic-control/) 
(ATC) è un insieme di applicazioni con licenza BSD che possono essere 
utilizzate per modificare il traffico e emulare le condizioni di rete scarse:

![Augmented Traffic Control di Facebook](images/augmented-traffic-control.png)

> Facebook ha anche istituito i 
[Martedì 2G](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) 
per aiutare a capire come le persone su 2G utilizzano Il loro prodotto. 
Il martedì, i dipendenti ottengono un pop-up che offre loro la 
possibilità di simulare una connessione 2G.

Il proxy [Charles](https://www.charlesproxy.com/){:. external} HTTP/HTTPS 
può essere utilizzato per 
[regolare la larghezza di banda e la latenza](http://www.charlesproxy.com/documentation/proxying/throttling/). 
Charles è un software commerciale, ma è disponibile un trial gratuito.

![Impostazioni della larghezza di banda e latenza del proxy Charles](images/charles.png)

Ulteriori informazioni su Charles sono disponibili su 
[codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/).

## Gestire connessioni non affidabili e "lie-fi" {: #lie-fi }

### Che cos'è il lie-fi?

Il termine [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi")
risale almeno al 2008 (quando i telefoni sembravano 
[Immagini di telefoni dal 2008](https://www.mobilegazette.com/2008-phones-wallchart.htm)), 
e si riferisce alla connettività che non è ciò che sembra. Il tuo browser 
si comporta come se avesse connettività quando, per qualunque motivo, 
non è così.

La connettività errata può provocare una scarsa esperienza d'uso poiché 
il browser (o JavaScript) persiste nel tentativo di recuperare risorse 
anziché abbandonare e scegliere un fallimento comprensibile. Lie-fi può 
in realtà essere peggio dell'offline; almeno se un dispositivo è offline 
è al sicuro, il tuo JavaScript può adottare un'opportuna azione 
evasiva.

Lie-fi è probabile che diventi un problema più grande in quanto più 
persone si muovono in mobilità e lontano dalla banda larga fissa. Recenti 
[dati del censimento degli Stati Uniti](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use) 
mostrano un [allontanamento dalla banda larga fissa](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/). 
Il seguente grafico mostra l'utilizzo di internet mobile a casa nel 2015 rispetto al 2013:

<img src="images/home-broadband.png" class="center" alt="Grafico dai dati 
del censimento degli Stati Uniti che mostrano il passaggio al mobile a 
partire dalla banda larga fissa, in particolare nelle famiglie a basso 
reddito">

### Utilizzare timeout per gestire la connettività intermittente

In passato, i [metodi Hacky che utilizzano XHR](http://stackoverflow.com/questions/189430/detect-that-internet-connection-is-offline) 
sono stati utilizzati per verificare la connettività intermittente, ma 
il service worker consente metodi più affidabili per impostare 
i timeout di rete. Jeff Posnick spiega come raggiungere questo obiettivo 
usando i timeout [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) 
nel suo discorso [Caricamento istantaneo con i Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s):


    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );
    
È inoltre prevista una 
[opzione di timeout](https://github.com/whatwg/fetch/issues/20) per 
l'[API Fetch](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) 
e l'[API Streams](https://www.w3.org/TR/streams-api/) che dovrebbero 
aiutare ad ottimizzare la distribuzione dei contenuti ed evitare richieste 
monolitiche. Jake Archibald fornisce maggiori dettagli su come affrontare 
il lie-fi nel 
[Supercharging page load](https://youtu.be/d5_6yHixpsQ?t=6m42s).
