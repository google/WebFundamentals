project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-11-24 #}
{# wf_published_on: 2017-11-01 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

<!--
  Aspect ratio CSS, Copyright 2017 Google Inc
  Maintains aspect ratio in blocks that use the class, so that content doesn't
  move around as media loads.

  Adapted from https://github.com/sgomes/css-aspect-ratio
-->
<style>
.aspect-ratio {
  /* aspect-ratio custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --aspect-ratio-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --aspect-ratio-h: 1;

  position: relative;
  max-width: 100%;
  margin-bottom: 1ex;
}

.aspect-ratio > *:first-child {
  width: 100%;
}

@supports (--custom-props: "true") {
  .aspect-ratio::before {
    display: block;
    padding-top: calc(var(--aspect-ratio-h, 1) /
        var(--aspect-ratio-w, 1) * 100%);
    content: "";
  }

  .aspect-ratio > *:first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

# Priorizzare le Risorse – Fare in modo che il Browser ti aiuti {: .page-title }

{% include "web/_shared/contributors/sgomes.html" %}

Non tutti i byte inviati dal cavo al browser hanno lo stesso livello di
importanza ed il browser lo sa. I browser hanno delle euristiche che tentano di
individuare le risorse più importanti da caricare prima - come ad esempio
CSS prima di script ed immagini.

Detto questo, come in ogni euristica, non sempre funziona; il browser potrebbe
prendere la decisione sbagliata, di solito perché non dispone di informazioni
sufficienti in quel momento. Questo articolo spiega come influenzare la priorità
del contenuto adeguatamente nei moderni browser facendo loro sapere di cosa
avrai bisogno più avanti.

## Priorità predefinite nel browser

Come accennato in precedenza, il browser assegna diverse priorità relative
diversi tipi di risorse in base a quanto possano essere critici. Così per
ad esempio, un tag `<script>` in `<head>` della pagina verrà caricato in Chrome
a priorità **Alta** (dopo i CSS ad **Altissima**), ma quella priorità
cambierebbe in **Bassa** se ha l'attributo async (significa che può essere caricato
ed eseguito in modo asincrono).

Le priorità diventano importanti quando esaminano le prestazioni di caricamento
del tuo sito.
Al di là delle solite tecniche di
[misura](/web/fundamentals/performance/critical-rendering-path/measure-crp)
e
[analisi del percorso di rendering critico](/web/fundamentals/performance/critical-rendering-path/analyzing-crp),
è utile conoscere le priorità di Chrome per ogni risorsa. Puoi trovarle
all'interno del pannello di rete in Chrome Developer Tools. Ecco come si
presenta:


<figure>
  <div class="aspect-ratio"
       style="width: 1810px; --aspect-ratio-w: 1810; --aspect-ratio-h: 564">
    <img src="images/res-prio-priorities.png"
    alt="Un esempio di come vengono visualizzate le priorità in Chrome Developer Tools">
  </div>
  <figcaption><b>Figura 1</b>: Priorità in Chrome Developer Tools. Potrebbe
  essere necessario attivare la colonna Priorità facendo clic con il pulsante
  destro del mouse sulle intestazioni di colonna.
  </figcaption>
</figure>


Queste priorità ti danno un'idea dell'importanza relativa ad ogni attributo del
browser per ciascuna risorsa. Ricordate che le sottili differenze sono
sufficienti perché il browser assegni una priorità diversa; ad esempio,
un'immagine che fa parte del rendering iniziale è maggiormente prioritaria
rispetto ad un'immagine che inizia fuori dallo schermo. Se vuoi approfondire le
priorità,
[questo articolo di Addy Osmani](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf){: .external}
è molto approfondito sullo stato attuale delle priorità in Chrome.

Allora, cosa puoi fare se trovi delle risorse contrassegnate da una priorità
diversa da quella che si desidera?

Questo articolo esamina tre diverse soluzioni dichiarative, tutte
relative ai nuovi tipi `<link>`. Se le risorse sono fondamentali per
l'esperienza utente, ma vengono caricate a una priorità troppo bassa, puoi
provare a risolvere questo problema in uno dei due modi: *preload* o *preconnect*.
Se invece preferisci che sia il browser a recuperare le risorse solo quando ha
terminato di gestire il resto prova *prefetch*.

Esaminiamo tutte e tre!

## Preload

`<link rel="preload">` informa il browser che una risorsa è necessaria come
parte della navigazione corrente, e che dovrebbe iniziare ad essere recuperata
al più presto possibile. Ecco come usarlo:

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

La maggior parte di questo codice è probabilmente quello che ti aspetteresti,
tranne forse per l'attributo "as". Ciò consente di informare il browser del tipo
di risorsa che si sta caricando, in modo che possa essere gestita correttamente.
Il browser non utilizza la risorsa precaricata se non viene impostato il tipo
corretto. La risorsa è caricata con la stessa priorità, ma ora il browser lo sa
in anticipo, permettendo al download di iniziare prima.

Attenzione che `<link rel="preload">` è un'istruzione obbligatoria per il
browser; a differenza degli altri suggerimenti sulle risorse di cui parleremo,
è qualcosa che il browser deve fare, piuttosto che un semplice suggerimento
opzionale. È particolarmente importante testare con attenzione questo aspetto,
per assicurarsi di non recuperare accidentalmente due volte lo stesso oggetto o
di recuperare qualcosa che non è necessario.

Le risorse che vengono scaricate usando `<link rel="preload">`, ma non
vengono utilizzate dalla pagina corrente entro 3 secondi attiveranno un
avvertimento nella Console in Strumenti per sviluppatori di Chrome, quindi
assicuratevi di tenerle sott'occhio!

<figure>
  <div class="aspect-ratio"
       style="width: 1050px; --aspect-ratio-w: 1050; --aspect-ratio-h: 244">
    <img src="images/res-prio-timeout.png"
    alt="Un esempio di errore di timeout del preload in Chrome Developer Tools">
  </div>
</figure>

### Caso d'uso: Fonts

I caratteri sono un ottimo esempio di risorse scoperte in ritardo che devono
essere recuperate, spesso al termine di uno dei numerosi file CSS caricati da
una pagina.

Per ridurre la quantità di tempo che l'utente deve attendere per il contenuto
testuale del tuo sito e per evitare fastidiosi flash tra i font di sistema e
quelli preferiti puoi usare `<link rel="preload">` nel tuo HTML per far sapere
immediatamente al browser che è necessario un font.

    <link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">

Si noti che l'uso di `crossorigin` qui è importante; senza questo attributo,
il font precaricato viene ignorato dal browser e viene eseguito un nuovo
recupero. Questo perché i caratteri dovrebbero essere recuperati in modo
anonimo dal browser, e la richiesta di preload è resa anonima solo usando il
attributo `crossorigin`.

Caution: se stai utilizzando un CDN, come Google Fonts, assicurati che i file
dei font che stai pre-caricando corrispondano a quelli del CSS, il che può
essere complicato a causa di intervalli di unicode, pesi e varianti di
carattere. I font possono anche essere aggiornati regolarmente, e se stai
pre-caricando una vecchia versione mentre nel CSS usi il più recente, potresti
finire per scaricare due versioni dello stesso font e sprecare la larghezza di
banda degli utenti. Potresti usare `<link rel="preconnect">` invece per una
manutenzione più semplice.

### Caso d'uso: Percorso critico CSS e JavaScript

Quando si parla di performance della pagina, un concetto utile è il "percorso
critico". Il percorso critico si riferisce alle risorse che devono essere
scaricate prima del rendering iniziale. Queste risorse, come i CSS, sono
fondamentali per ottenere i primi pixel sullo schermo dell'utente.

In precedenza, la raccomandazione consisteva nell'integrare questo contenuto
all'interno del codice HTML. Tuttavia, in uno scenario di rendering
multi-pagina o lato server questo cresce rapidamente in molti byte sprecati.
Rende anche più difficile il controllo delle versioni, poiché qualsiasi modifica
nel codice critico invalida qualsiasi pagina in cui è stata inserita.

`<link rel="preload">` consente di mantenere i vantaggi del controllo delle
versioni dei singoli file e della cache, fornendo allo stesso tempo il
meccanismo per richiedere la risorsa il prima possibile.

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

Con preload c'è uno svantaggio: sei ancora soggetto ad un ulteriore roundtrip.
Questo roundtrip extra deriva dal fatto che il browser deve prima recuperare il file
HTML, e solo allora scopre le risorse successive.

Un modo per aggirare il roundtrip extra è quello di utilizzare
[HTTP/2](/web/fundamentals/performance/http2/#server_push)
push, per trasportare preventivamente le risorse critiche all'interno della
stessa connessione con cui si invia l'HTML. Ciò garantisce che non vi siano
tempi di inattività tra il browser dell'utente che recupera l'HTML e l'avvio
del download delle risorse critiche. Siate consapevoli quando si utilizza
HTTP/2 push però, dato che è un modo molto forzato per controllare l'utilizzo
della larghezza di banda dell'utente ("server knows best") perché lascia al
browser poco spazio per prendere le proprie decisioni come non recuperare uno
stesso file già nella sua cache!

## Preconnect

`<link rel="preconnect">` informa il browser che la tua pagina intende stabilire
una connessione con un'altra origine e che vorresti che il processo iniziasse il
prima possibile.

Stabilire connessioni spesso comporta un tempo significativo con reti lente, in
particolare quando si tratta di connessioni sicure, poiché potrebbe comportare
ricerche DNS, reindirizzamenti e diversi roundtrip sul server finale che
gestisce la richiesta dell'utente. Prendersi cura di tutto ciò in anticipo può
rendere la tua applicazione molto più accattivante per l'utente senza influire
negativamente sull'utilizzo della larghezza di banda. La maggior parte del tempo
per stabilire una connessione è speso in attesa, piuttosto che per scambiare
dati.

Informare il browser della tua intenzione è semplice come aggiungere un tag link
alla tua pagina:

    <link rel="preconnect" href="https://example.com">

In questo caso, stiamo facendo sapere al browser che intendiamo connetterci a
`example.com` e recuperare i contenuti da lì.

Ricorda che mentre `<link rel="preconnect">` è piuttosto economico, può comunque
richiedere tempo prezioso per la CPU, in particolare su connessioni sicure. Ciò
è particolarmente grave se la connessione non viene utilizzata entro 10 secondi,
poiché il browser la chiude, sprecando tutto il lavoro di connessione iniziale.

In generale, prova ad usare `<link rel="preload">` ovunque sia possibile, in
quanto è una modifica più completa delle prestazioni, ma tieni
`<link rel="preconnect">` nella tua cassetta degli strumenti per i casi limite.
Diamo un'occhiata ad un paio di questi.

Note: esiste un altro tipo di `<link>` relativo alle connessioni:
`<link rel="dns-prefetch">`. Questo gestisce solo la ricerca DNS, quindi è un
piccolo sottoinsieme di `<link rel="preconnect">`, ma ha un supporto browser più
ampio, quindi può essere un bel fallback. Lo usi nello stesso modo:
`<link rel="dns-prefetch" href="https://example.com">`

### Caso d'uso: Conoscere *Da Dove*, ma non *Cosa* recuperi

A causa delle dipendenze con versioni, a volte finisci in una situazione in cui
sai che recupererai una risorsa da un dato CDN, ma non il percorso esatto. In
altri casi, è possibile recuperare una delle numerose risorse, in base alle
media queries o ai controlli delle funzionalità di runtime sul browser
dell'utente.

In queste situazioni, se la risorsa che stai recuperando è importante, potresti
voler risparmiare il maggior tempo possibile pre-connettendoti al server. Il
browser non inizierà il recupero del file prima che ne abbia bisogno (ovvero,
una volta che la richiesta viene effettuata dalla tua pagina in qualche modo),
ma almeno sei in grado di gestire gli aspetti della connessione in anticipo,
salvando l'utente dall'attesa di diversi roundtrip.

### Caso d'uso: Streaming Media

Un altro esempio in cui si potrebbe desiderare di risparmiare un po' di tempo
nella fase di connessione, ma non necessariamente iniziare immediatamente a
recuperare il contenuto, è lo streaming multimediale da un'origine diversa.

A seconda di come la tua pagina gestisce il contenuto in streaming, potresti
voler aspettare che gli script siano caricati e pronti per elaborare il flusso.
Preconnect ti aiuta a ridurre i tempi di attesa per un singolo roundtrip una
volta che sei pronto per iniziare il recupero.

## Prefetch

`<link rel="prefetch">` è in qualche modo diverso da `<link rel="preload">` e
`<link rel="preconnect">`, nel senso che non tenta di far succedere qualcosa di
critico più velocemente; invece, cerca di far succedere qualcosa di non critico
prima, se possibile.

Lo fa informando il browser di una risorsa che dovrebbe essere necessaria come
parte di una futura navigazione o interazione dell'utente, ad esempio,
qualcosa che *potrebbe* essere necessario in seguito, se l'utente intraprende
l'azione che siamo aspettando. Queste risorse vengono recuperate con la priorità
**più bassa** in Chrome, quando viene caricata la pagina corrente e c'è
larghezza di banda disponibile.

Ciò significa che `prefetch` è più adatto a prevedere ciò che l'utente potrebbe
fare in seguito e prepararsi, come recuperare la prima pagina dei dettagli del
prodotto in un elenco di risultati o recuperare la pagina successiva in
contenuto impaginato.

    <link rel="prefetch" href="page-2.html">

Tieni comunque presente che prefetch non funziona in modo ricorsivo.
Nell'esempio precedente recupereresti l'HTML ma qualsiasi risorsa di cui 
abbia bisogno `page-2.html` non viene scaricata prima del tempo a meno che tu
non espliciti prefetch anche su di essa.

### Prefetch non funziona come Override

È importante notare che non è possibile utilizzare `<link rel="prefetch">` come
metodo per ridurre la priorità di una risorsa esistente. Nel seguente HTML, si
potrebbe pensare che dichiarare `optional.css` in un prefetch riduca la sua
priorità del successivo `<link rel="stylesheet">`:

    <html>
      <head>
        <link rel="prefetch" href="optional.css">
        <link rel="stylesheet" href="optional.css">
      </head>
      <body>
        Hello!
      </body>
    </html>

Tuttavia, questo farà sì che il tuo foglio di stile venga prelevato due volte
(anche con un potenziale cache hit la seconda volta), una volta con priorità
predefinita **Massima** e una volta con priorità **Più bassa**, come prefetch
per un recupero successivo:

<figure>
  <div class="aspect-ratio"
       style="width: 1374px; --aspect-ratio-w: 1374; --aspect-ratio-h: 190">
    <img src="images/res-prio-prefetch.png"
         alt="Uno screenshot di Chrome Developer Tools che mostra optional.css che
              viene recuperato due volte">
  </div>
</figure>

Il doppio recupero può essere negativo per gli utenti. In questo caso, non solo
avrebbero dovuto attendere il CSS che bloccava il rendering, ma avrebbero anche
potenzialmente perso larghezza di banda scaricando il file due volte. Ricorda
che la loro larghezza di banda potrebbe essere contabilizzata. Assicurati di
analizzare a fondo le richieste della tua rete e fai attenzione a quelle doppie!

## Altre tecniche e strumenti

`<link rel="preload">`, `<link rel="preconnect">` e `<link rel="prefetch">`
(ed il bonus `<link rel="dns-prefetch">`) sono ottimi strumenti per informare
in anticipo il browser in modo dichiarativo riguardo a risorse e connessioni ed
ottimizzare l'ordine delle attività in relazione alle reali necessità.

Esistono numerosi altri strumenti e tecniche che è possibile utilizzare per
modificare la priorità ed i tempi di caricamento delle risorse. Assicurati di
leggere
[HTTP/2 server push](/web/fundamentals/performance/http2/#server_push);
[utilizzare `IntersectionObserver` per carimanto lazy di immagini ed altri media](/web/updates/2016/04/intersectionobserver);
[evitare CSS che bloccano il render](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)
con media queries e librerie come
[loadCSS](https://github.com/filamentgroup/loadCSS){: .external};
e ritardare il recupero, la compilazione e l'esecuzione di JavaScript con
[async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){: .external}
e
[defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer){: .external}.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
