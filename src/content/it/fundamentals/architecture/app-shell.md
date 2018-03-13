project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: L'architettura della shell dell'applicazione mantiene l'interfaccia utente locale e carica il contenuto in modo dinamico senza sacrificare la capacità di collegamento e l'individuabilità del Web.

{# wf_updated_on: 2018-03-09 #}
{# wf_published_on: 2016-09-27 #}
{# wf_blink_components: N/A #}

# Il Modello App Shell {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

L'architettura della **shell** (o semplicemente shell) dell'applicazione è un modo per creare
un'applicazione Web progressiva caricabile in modo affidabile e istantaneo sugli
schermi degli utenti, simile a come viene visualizzata nelle applicazioni native.

La "shell" dell'applicazione è il frammento di HTML, CSS e JavaScript minimo indispensabile per
alimentare l'interfaccia utente e quando memorizzata in cache offline può
garantire **prestazioni immediate e affidabili** per gli utenti nelle visite
alimentare l'interfaccia utente e, quando memorizzata nella cache offline, può
rete ogni volta che l'utente visita. Solo il contenuto necessario
proviene dalla rete.

Per le [applicazioni a pagina
singola](https://en.wikipedia.org/wiki/Single-page_application) con architetture
pesanti di JavaScript, la shell dell'applicazione è l'approccio giusto, basato
su una cache aggressiva della shell (che utilizza un [service
worker](/web/fundamentals/primers/service-worker/)) per far funzionare
l'applicazione. Successivamente, il contenuto dinamico viene caricato per ogni
pagina utilizzando JavaScript. La shell dell'applicazione è utile per ottenere velocemente
un HTML iniziale sullo schermo senza la rete.

<img src="images/appshell.png" alt="Application Shell architecture">

In altre parole, la shell dell'applicazione è simile al pacchetto di codice che
pubblicheresti in un app store durante la creazione di un'app nativa. Contiene lo
scheletro dell'interfaccia utente e i componenti principali necessari per far
funzionare la tua app, ma probabilmente non conterrà i dati.

Note: prova il codelab [First Progressive Web
App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0) per
imparare come progettare e implementare la prima shell dell'applicazione per un'app
meteo. Anche il video [Instant Loading con il modello App
Shell](https://www.youtube.com/watch?v=QhUzmR8eZAo) illustra
questo schema.

### Quando utilizzare il modello App Shell

Costruire una PWA non significa partire da zero. Per creare una moderna
app a pagina singola, probabilmente stai già utilizzando qualcosa di simile a
una shell dell'applicazione, indipendentemente da come la chiami. I dettagli possono variare
leggermente a seconda delle librerie o dei framework che utilizzi ma il
concetto stesso è indipendente dal framework.

Un'architettura shell dell'applicazione ha più senso per le app e i siti con una
navigazione che rimane relativamente invariata, ma con il contenuto che cambia. Un certo
numero di moderni framework e librerie JavaScript già incoraggiano a dividere la
logica dell'applicazione dal suo contenuto, rendendo questa architettura più
semplice da applicare. Per una certa classe di siti web che hanno solo contenuto
statico, puoi comunque seguire lo stesso modello ma il sito è al 100% shell dell'applicazione.

Per scoprire come Google crea l'architettura della shell dell'applicazione, dai
un'occhiata a [Building the Google I/O 2016 Progressive Web
App](/web/showcase/2016/iowa2016). Questa app è stata creata con una SPA per
creare un PWA che pre-memorizza il contenuto nella cache utilizzando un service worker, carica
dinamicamente nuove pagine, passa facilmente da una visualizzazione all'altra e
riutilizza il contenuto dopo il primo caricamento.

### Vantaggi {: # app-shell-benefits}

I vantaggi dell'architettura della shell dell'applicazione con un service worker includono:

- **Prestazioni affidabili costantemente veloci**. Le visite ripetute
sono estremamente veloci. Le risorse statiche e l'interfaccia utente (ad esempio
HTML, JavaScript, immagini e CSS) vengono memorizzate nella cache alla prima
visita in modo che siano caricate istantaneamente durante le visite ripetute.
Il contenuto *può* essere memorizzato nella cache alla prima visita, ma in
genere viene caricato quando è necessario.

- **Interazioni di tipo nativo**. Adottando il modello App Shell, è possibile
creare esperienze con navigazione e interazioni istantanee di tipo nativo,
dotate di supporto offline.

- **Uso economico dei dati**.  Progetta utilizzando il minimo dei dati e fai
attenzione a ciò che memorizzi nella cache perché elencando file non essenziali
(ad esempio immagini di grandi dimensioni non visualizzate su ogni pagina),
i browser potrebbero scaricare più dati dello stretto necessario.
Anche se i dati sono relativamente economici nei paesi occidentali, questo non è
il caso nei mercati emergenti in cui la connettività è costosa e i dati sono
costosi.

## Requisiti {: #app-shell-requirements }

Idealmente la shell dell'applicazione deve:

- Caricare velocemente
- Usare il minor numero di dati possibile
- Usare risorse statiche da una cache locale
- Separare il contenuto dalla navigazione
- Recuperare e visualizzare il contenuto specifico della pagina (HTML, JSON ecc.)
- Memorizzare eventualmente il contenuto dinamico nella cache

La shell dell'applicazione mantiene l'UI locale e carica il contenuto in
modo dinamico attraverso un'API, ma non sacrifica l'abilità di collegamento e
individuabilità del web. La prossima volta che l'utente accede alla tua app, la
verrà visualizzata automaticamente versione più recente. Non è necessario
scaricare nuove versioni prima di utilizzarla.

Note: l'estensione di auditing
[Lighthouse](https://github.com/googlechrome/lighthouse) può essere utilizzata
per verificare se la PWA che utilizza una shell dell'applicazione ottenga le migliori
prestazioni. [To theLighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E) è
un talk che approfondisce l'ottimizzazione di una PWA utilizzando questo
strumento.

## Creazione della shell dell'applicazione {: #building-your-app-shell }

Struttura l'app in modo che ci sia una chiara distinzione tra la shell della pagina e il
contenuto dinamico. In generale, la tua app dovrebbe caricare la shell più
semplice possibile ma includere abbastanza contenuti di pagina significativi con
il download iniziale. Determina il giusto equilibrio tra velocità e
e l'aggiornamento dei dati per ciascuna delle origini dati.

<figure>
<img src="images/wikipedia.jpg" alt="Offline Wikipedia app using an
application shell with content caching">
<figcaption>L'<a
href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">applicazione
offline di Wikipedia</a> di Jake Archibald è un buon esempio di PWA che utilizza
un modello App Shell. Si carica all'istante in caso di visite ripetute ma
preleva i contenuti in modo dinamico utilizzando JS. Questo contenuto viene
quindi memorizzato nella cache offline per visite future.</figcaption>
</figure>

### Esempio di codice HTML per la shell dell'applicazione {: #example-html-for-appshell }

Questo esempio separa l'infrastruttura principale dell'app e l'UI
dai dati. È importante mantenere il caricamento iniziale il più semplice
possibile per visualizzare solo il layout della pagina non appena viene aperta
la web app. Alcuni provengono dal file indice dell'applicazione (DOM inline,
stili) e il resto viene caricato da script e fogli di stile esterni.

L'UI e l'infrastruttura sono memorizzate nella cache
localmente utilizzando un service worker in modo che nei carichi successivi
vengano recuperati solo i dati nuovi o modificati, invece di dover caricare
tutto.

Il file `index.html` nella tua directory di lavoro dovrebbe assomigliare al
seguente codice. Questo è un sottoinsieme dei contenuti effettivi e non è un
file indice completo. Diamo un'occhiata a ciò che contiene.

- HTML e CSS per lo "scheletro" dell'interfaccia utente completa di segnaposti
di navigazione e contenuti.
- Un file JavaScript esterno (app.js) per la gestione della navigazione e della
logica dell'interfaccia utente, nonché il codice per visualizzare i post
recuperati dal server e archiviarli localmente utilizzando un meccanismo di
archiviazione come IndexedDB.
- Un manifest di app web e un service worker per abilitare le funzionalità
offline.

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

Note: vai a vedere [https://app-shell.appspot.com/](https://app-shell.appspot.com/)
per vedere una PWA reale, molto semplice, che utilizza una shell
dell'applicazione e il rendering sul lato server per il contenuto. La shell dell'applicazione può
essere implementata utilizzando qualsiasi libreria o framework come descritto
nel nostro talk <a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">Progressive Web App
across all frameworks. Alcuni esempi sono disponibili usando Polymer
(<a href="https://shop.polymer-project.org">Shop</a>) e React (<a
href="https://github.com/insin/react-hn">ReactHN</a>, <a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>).

### Memorizzazione nella cache della shell dell'applicazione {: #app-shell-caching }

La shell dell'applicazione può essere memorizzata nella cache utilizzando un service worker
scritto manualmente o un service worker generato utilizzando uno strumento di
precaching di risorse statiche come
[sw-precache](https://github.com/googlechrome/sw-precache).

Note: gli esempi sono forniti solo a scopo informativo e illustrativo. Le
risorse effettive utilizzate saranno probabilmente diverse per la tua
applicazione.

#### Memorizzazione manuale della shell dell'applicazione

Di seguito è riportato un esempio di service worker che memorizza nella cache le
risorse statiche della shell dell'applicazione nella [Cache
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

#### Utilizzo della sw-precache per memorizzare nella cache la shell dell'applicazione

Il service worker generato da sw-precache memorizzerà nella cache e servirà le
risorse configurate come parte del processo di compilazione. Puoi avere nella
precache ogni file HTML, JavaScript e CSS che costituisce la shell dell'applicazione. Tutto
funzionerà offline e si caricherà velocemente nelle visite successive senza
alcuno sforzo aggiuntivo.

Ecco un esempio base dell'utilizzo di sw-precache come parte di un processo di
generazione [gulp](http://gulpjs.com):

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

Note: sw-precache è utile per la memorizzazione della cache offline delle risorse statiche. Per le
risorse runtime/dinamiche, ti consigliamo di utilizzare la nostra libreria
gratuita [sw-toolbox](https://github.com/googlechrome/sw-toolbox).

## Conclusioni {: #conclusion }

La shell dell'applicazione che utilizza un service worker è un modello efficace per la
memorizzazione della cache offline e offre anche vantaggi significativi in termini di
prestazioni nell'ambito del caricamento istantaneo per le visite ripetute alla PWA.
È possibile memorizzare nella cache la shell dell'applicazione in modo che
funzioni offline e popolare il suo contenuto utilizzando JavaScript.

Nelle visite ripetute, questo ti consente di ottenere pixel significativi sullo
schermo senza la rete, anche se i tuoi contenuti in fondo arrivano da lì.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
