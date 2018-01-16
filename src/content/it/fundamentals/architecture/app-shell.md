project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: L'architettura shell dell'applicazione mantiene l'interfaccia
utente locale e carica il contenuto in modo dinamico senza sacrificare la
capacità di collegamento e la reperibilità del Web.

{# wf_updated_on: 2018-01-16 #}
{# wf_published_on: 2016-09-27 #}

# Il Modello App Shell {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

Un'architettura **shell** (o app shell) dell'applicazione è un modo per creare
un'applicazione Web progressiva caricabile in modo affidabile e istantaneo sugli
schermi degli utenti, simile a ciò che si vede nelle applicazioni native.

L'app "shell" racchiude HTML minimale , CSS e JavaScript necessari per
alimentare l'interfaccia utente e quando memorizzata in cache offline può
garantire **prestazioni immediate e affidabili** per gli utenti nelle visite
ripetute. Ciò significa che la shell dell'applicazione non viene caricata dalla
rete ogni volta che l'utente visita. Solo necessario il contenuto necessario
proviene dalla rete.

Per le [applicazioni a pagina
singola](https://en.wikipedia.org/wiki/Single-page_application) con architetture
pesanti di JavaScript, una shell di applicazioni è un approccio go-to. Questo
approccio si basa su una cache aggressiva della shell (utilizzando un [service
worker](/web/fundamentals/primers/service-worker/) ) per far funzionare
l'applicazione. Successivamente, il contenuto dinamico viene caricato per ogni
pagina utilizzando JavaScript. Una shell di app è utile per ottenere velocemente
un HTML iniziale sullo schermo senza la rete.

<img src="images/appshell.png" alt="Application Shell architecture">

In altre parole, la shell dell'app è simile al pacchetto di codice che
pubblicheresti in un app store durante la creazione di un'app nativa. È lo
scheletro dell'interfaccia utente e i componenti principali necessari per far
decollare la tua app, ma probabilmente non contiene i dati.

Note: prova il codelab [First Progressive Web
App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0) per
imparare come progettare e implementare la prima applicazione shell per un'app
meteo. [Instant Loading con modello App
Shelll](https://www.youtube.com/watch?v=QhUzmR8eZAo) dei video passa anche
attraverso questo schema.

### Quando utilizzare il modello app shell

Costruire un PWA non significa partire da zero. Se stai costruendo una moderna
app a pagina singola, probabilmente stai già utilizzando qualcosa di simile a
una shell di app che tu chiami così oppure no. I dettagli potrebbero variare
leggermente a seconda delle librerie o dei framework che si utilizzi, ma il
concetto stesso è indipendente dal framework.

Un'architettura shell dell'applicazione ha più senso per le app e i siti con una
navigazione relativamente invariata, ma che modifica il contenuto. Un certo
numero di moderni framework e librerie JavaScript già incoraggiano a dividere la
logica dell'applicazione dal suo contenuto, rendendo questa architettura più
semplice da applicare. Per una certa classe di siti web che hanno solo contenuto
statico, puoi comunque seguire lo stesso modello ma il sito è al 100% app shell.

Per vedere come Google ha creato un'architettura di shell per app, dai
un'occhiata a [Creazione della Google I/O 2016 Progressive Web
App](/web/showcase/2016/iowa2016). Questa app è stata creata con una SPA per
creare un PWA che precarizza il contenuto utilizzando un service worker, carica
dinamicamente nuove pagine, transizioni garbate tra le visualizzazioni e
riutilizza il contenuto dopo il primo caricamento.

### Vantaggi {: # app-shell-benefits}

I vantaggi di un'architettura shell di app con un service worker includono:

- **Prestazioni affidabili che sono costantemente veloci**. Le visite ripetute
sono estremamente veloci. Le risorse statiche e l'interfaccia utente (ad esempio
HTML, JavaScript, immagini e CSS) vengono memorizzate nella cache alla prima
visita in modo che vengano caricate istantaneamente durante le visite ripetute.
Il contenuto *può* essere memorizzato nella cache alla prima visita, ma in
genere viene caricato quando è necessario.

- **Interazioni di tipo nativo**. Adottando il modello app shell, è possibile
creare esperienze con navigazione e interazioni istantanee e native
dell'applicazione, complete di supporto offline.

- **Uso economico dei dati**. Progettate con un utilizzo minimo dei dati e siate
prudenti in ciò che memorizzate nella cache perché elencando file non essenziali
(immagini di grandi dimensioni che non vengono mostrate su ogni pagina, ad
esempio), i browser scaricano più dati di quanto sia strettamente necessario.
Anche se i dati sono relativamente economici nei paesi occidentali, questo non è
il caso nei mercati emergenti in cui la connettività è costosa e i dati sono
costosi.

## Requisiti {: #app-shell-requirements }

Una app shell dovrebbe idealmente:

- Caricare velocemente
- Usa il minor numero di dati possibile
- Usa risorse statiche da una cache locale
- Separa il contenuto dalla navigazione
- Recupera e visualizza il contenuto specifico della pagina (HTML, JSON, ecc.)
- Opzionalmente, memorizza il contenuto dinamico nella cache

L'app shell mantiene la tua interfaccia utente locale e carica il contenuto in
modo dinamico attraverso un'API, ma non sacrifica l'abilità di collegamento e la
scopribilità del web. La prossima volta che l'utente accede alla tua app, la
versione più recente viene visualizzata automaticamente. Non è necessario
scaricare nuove versioni prima di utilizzarla.

Note: l'estensione di auditing
[Lighthouse](https://github.com/googlechrome/lighthouse) può essere utilizzata
per verificare se il tuo PWA che utilizza una app shell raggiunge le migliori
prestazioni. [To theLighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E) è
un talk che approfondisce l'ottimizzazione di un PWA utilizzando questo
strumento.

## Costruisci la tua app shell {: #building-your-app-shell }

Struttura la tua app per una chiara distinzione tra la shell della pagina e il
contenuto dinamico. In generale, la tua app dovrebbe caricare la shell più
semplice possibile ma includere abbastanza contenuti di pagina significativi con
il download iniziale. Determina il giusto equilibrio tra velocità e freschezza
dei dati per ciascuna delle tue origini dati.

<figure>
<img src="images/wikipedia.jpg" alt="Offline Wikipedia app using an
application shell with content caching">
<figcaption>L'<a
href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">applicazione
offline di Wikipedia</a> di Jake Archibald è un buon esempio di PWA che utilizza
un modello di shell di app. Si carica all'istante in caso di visite ripetute, ma
preleva i contenuti in modo dinamico utilizzando JS. Questo contenuto viene
quindi memorizzato nella cache offline per visite future.</figcaption>
</figure>

### Esempio di codice HTML per una app shell {: #example-html-for-appshell }

Questo esempio separa l'infrastruttura applicativa principale e l'interfaccia
utente dai dati. È importante mantenere il caricamento iniziale il più semplice
possibile per visualizzare solo il layout della pagina non appena viene aperta
la web app. Alcuni provengono dal file indice dell'applicazione (DOM inline,
stili) e il resto viene caricato da script e fogli di stile esterni.

Tutta l'interfaccia utente e l'infrastruttura sono memorizzate nella cache
localmente utilizzando un service worker in modo che nei carichi successivi
vengano recuperati solo i dati nuovi o modificati, invece di dover caricare
tutto.

Il tuo file `index.html` nella tua directory di lavoro dovrebbe assomigliare al
seguente codice. Questo è un sottoinsieme dei contenuti effettivi e non è un
file indice completo. Diamo un'occhiata a ciò che contiene.

- HTML e CSS per lo "scheletro" dell'interfaccia utente completa di segnaposti
di navigazione e contenuti.
- Un file JavaScript esterno (app.js) per la gestione della navigazione e della
logica dell'interfaccia utente, nonché il codice per visualizzare i post
recuperati dal server e archiviarli localmente utilizzando un meccanismo di
archiviazione come IndexedDB.
- Un manifest di app web e un service worker per abilitare le funzionalità
off-line.

<div class="clearfix"></div>

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>App Shell</title>
  <link rel="manifest" href="/manifest.json">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Shell</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>

<body>
  <header class="header">
    <h1 class="header__title">App Shell</h1>
  </header>
  
  <nav class="nav">
  ...
  </nav>
  
  <main class="main">
  ...
  </main>

  <div class="dialog-container">
  ...
  </div>

  <div class="loader">
    <!-- Show a spinner or placeholders for content -->
  </div>

  <script src="app.js" async></script>
  <script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
  </script>
</body>
</html>
```

<div class="clearfix"></div>

Note: si veda [https://app-shell.appspot.com/](https://app-shell.appspot.com/)
per un aspetto realistico in un PWA molto semplice che utilizza una shell di
applicazione e un rendering lato server per il contenuto. Una shell di app può
essere implementata utilizzando qualsiasi libreria o framework come descritto
nel nostro talk <a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">Progressive Web App
attraverso tutti i framework</a>. Alcuni esempi sono disponibili usando Polymer
(<a href="https://shop.polymer-project.org">Shop</a> ) e React (<a
href="https://github.com/insin/react-hn">ReactHN</a> , <a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>).

### Memorizzazione nella cache della shell dell'applicazione {: #app-shell-caching }

Una app shell può essere memorizzata nella cache utilizzando un service worker
scritto manualmente o un service worker generato utilizzando uno strumento di
precaching di asset statici come
[sw-precache](https://github.com/googlechrome/sw-precache).

Note: gli esempi sono forniti solo a scopo informativo e illustrativo. Le
risorse effettive utilizzate saranno probabilmente diverse per la tua
applicazione.

#### Memorizzazione manuale della app shell

Di seguito è riportato un esempio di service worker che memorizza nella cache le
risorse statiche dell'app shell nella [Cache
API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) utilizzando
l'evento `install` del service worker:

```
var cacheName = 'shell-content';
var filesToCache = [
  '/css/styles.css',
  '/js/scripts.js',
  '/images/logo.svg',

  '/offline.html’,

  '/’,
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

#### Utilizza sw-precache per memorizzare nella cache l'app shell

Il service worker generato da sw-precache memorizzerà nella cache e servirà le
risorse configurate come parte del processo di generazione. Puoi avere in
precache ogni file HTML, JavaScript e CSS che costituisce app shell. Tutto
funzionerà offline e si caricherà velocemente nelle visite successive senza
alcuno sforzo aggiuntivo.

Ecco un esempio di base dell'utilizzo di sw-precache come parte di un processo
di generazione di [gulp](http://gulpjs.com) :

```
gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});
```

Per ulteriori informazioni sulla memorizzazione nella cache delle risorse
statiche consultare il codelab [Adding a Service Worker with
sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0).

Note: sw-precache è utile per il caching offline delle risorse statiche. Per le
risorse runtime/dinamiche, ti consigliamo di utilizzare la nostra libreria
gratuita [sw-toolbox](https://github.com/googlechrome/sw-toolbox) .

## Conclusione {: #conclusion }

Una shell di app che utilizza Service worker è un modello efficace per il
caching offline, ma offre anche vantaggi significativi in ​​termini di
prestazioni sotto forma di caricamento istantaneo per le visite ripetute di PWA.
È possibile memorizzare nella cache la shell dell'applicazione in modo che
funzioni offline e popolare il suo contenuto utilizzando JavaScript.

Nelle visite ripetute, questo ti consente di ottenere pixel significativi sullo
schermo senza la rete, anche se i tuoi contenuti arrivano da lì.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
