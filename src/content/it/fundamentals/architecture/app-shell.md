<div data-md-type="front_matter" class="front_matter">
<table>
<tr>
<td class="locki-notrack">project_path</td>
<td data-parent-segment-id="3512864">/web/fundamentals/_project.yaml</td>
</tr>
<tr>
<td class="locki-notrack">book_path</td>
<td data-parent-segment-id="3512865">/web/fundamentals/_book.yaml</td>
</tr>
<tr>
<td class="locki-notrack">description</td>
<td data-parent-segment-id="3512866">Application shell architecture keeps your
UI local and loads content dynamically without sacrificing the linkability and
discoverability of the web.</td>
</tr>
</table>
</div>

<p data-md-type="paragraph" data-parent-segment-id="2886627">{# wf_updated_on:
2019-05-02 #} {# wf_published_on: 2016-09-27 #} {# wf_blink_components: N/A
#}</p>
<h1 data-md-type="header" data-md-header-level="1"
data-parent-segment-id="475146">Il Modello App Shell {: .page-title }</h1>
<p data-md-type="paragraph" data-parent-segment-id="487748">{% include
"web/_shared/contributors/addyosmani.html" %}</p>
<p data-md-type="paragraph" data-parent-segment-id="973826">L'architettura della
<strong data-md-type="double_emphasis">shell</strong> (o semplicemente shell)
dell'applicazione è un modo per creare un'applicazione Web progressiva
caricabile in modo affidabile e istantaneo sugli schermi degli utenti, simile a
come viene visualizzata nelle applicazioni native.</p>
<p data-md-type="paragraph" data-parent-segment-id="973827">La "shell"
dell'applicazione è il frammento di HTML, CSS e JavaScript minimo indispensabile
per alimentare l'interfaccia utente e quando memorizzata in cache offline può
garantire <strong data-md-type="double_emphasis">prestazioni immediate e
affidabili</strong> per gli utenti nelle visite alimentare l'interfaccia utente
e, quando memorizzata nella cache offline, può rete ogni volta che l'utente
visita. Solo il contenuto necessario proviene dalla rete.</p>
<p data-md-type="paragraph" data-parent-segment-id="973828">Per le <a
href="https://en.wikipedia.org/wiki/Single-page_application"
data-md-type="link">applicazioni a pagina singola</a> con architetture pesanti
di JavaScript, la shell dell'applicazione è l'approccio giusto, basato su una
cache aggressiva della shell (che utilizza un <a
href="/web/fundamentals/primers/service-worker/" data-md-type="link">service
worker</a>) per far funzionare l'applicazione. Successivamente, il contenuto
dinamico viene caricato per ogni pagina utilizzando JavaScript. La shell
dell'applicazione è utile per ottenere velocemente un HTML iniziale sullo
schermo senza la rete.</p>
<div data-md-type="block_html">
<img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/architecture/images/appshell.png?raw=true"
alt="Application Shell architecture">
</div>
<p data-md-type="paragraph" data-parent-segment-id="973829">In altre parole, la
shell dell'applicazione è simile al pacchetto di codice che pubblicheresti in un
app store durante la creazione di un'app nativa. Contiene lo scheletro
dell'interfaccia utente e i componenti principali necessari per far funzionare
la tua app, ma probabilmente non conterrà i dati.</p>
<p data-md-type="paragraph" data-parent-segment-id="973830">Note: prova il
codelab <a
href="https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0"
data-md-type="link">First Progressive Web App</a> per imparare come progettare e
implementare la prima shell dell'applicazione per un'app meteo. Anche il video
<a href="https://www.youtube.com/watch?v=QhUzmR8eZAo"
data-md-type="link">Instant Loading con il modello App Shell</a> illustra questo
schema.</p>
<h3 data-md-type="header" data-md-header-level="3"
data-parent-segment-id="475154">Quando utilizzare il modello app shell</h3>
<p data-md-type="paragraph" data-parent-segment-id="973831">Costruire una PWA
non significa partire da zero. Per creare una moderna app a pagina singola,
probabilmente stai già utilizzando qualcosa di simile a una shell
dell'applicazione, indipendentemente da come la chiami. I dettagli possono
variare leggermente a seconda delle librerie o dei framework che utilizzi ma il
concetto stesso è indipendente dal framework.</p>
<p data-md-type="paragraph" data-parent-segment-id="973806">Un'architettura
shell dell'applicazione ha più senso per le app e i siti con una navigazione che
rimane relativamente invariata, ma con il contenuto che cambia. Un certo numero
di moderni framework e librerie JavaScript già incoraggiano a dividere la logica
dell'applicazione dal suo contenuto, rendendo questa architettura più semplice
da applicare. Per una certa classe di siti web che hanno solo contenuto statico,
puoi comunque seguire lo stesso modello ma il sito è al 100% shell
dell'applicazione.</p>
<p data-md-type="paragraph" data-parent-segment-id="973807">Per scoprire come
Google crea l'architettura della shell dell'applicazione, dai un'occhiata a <a
href="/web/showcase/2016/iowa2016" data-md-type="link">Building the Google I/O
2016 Progressive Web App</a>. Questa app è stata creata con una SPA per creare
un PWA che pre-memorizza il contenuto nella cache utilizzando un service worker,
carica dinamicamente nuove pagine, passa facilmente da una visualizzazione
all'altra e riutilizza il contenuto dopo il primo caricamento.</p>
<h3 data-md-type="header" data-md-header-level="3"
data-parent-segment-id="475156">Vantaggi {: # app-shell-benefits}</h3>
<p data-md-type="paragraph" data-parent-segment-id="475171">I vantaggi
dell'architettura della shell dell'applicazione con un service worker
includono:</p>
<ul data-md-type="list" data-md-list-type="unordered"
data-md-list-tight="false">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph" data-parent-segment-id="973837"><strong
data-md-type="double_emphasis">Prestazioni affidabili costantemente
veloci</strong>. Le visite ripetute sono estremamente veloci. Le risorse
statiche e l'interfaccia utente (ad esempio HTML, JavaScript, immagini e CSS)
vengono memorizzate nella cache alla prima visita in modo che siano caricate
istantaneamente durante le visite ripetute. Il contenuto <em
data-md-type="emphasis">può</em> essere memorizzato nella cache alla prima
visita, ma in genere viene caricato quando è necessario.</p>
</li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph" data-parent-segment-id="973838"><strong
data-md-type="double_emphasis">Interazioni di tipo nativo</strong>. Adottando il
modello app shell, è possibile creare esperienze con navigazione e interazioni
istantanee e native dell'applicazione, complete di supporto offline.</p>
</li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph" data-parent-segment-id="973839"><strong
data-md-type="double_emphasis">Uso economico dei dati</strong>.  Progetta
utilizzando il minimo dei dati e fai attenzione a ciò che memorizzi nella cache
perché elencando file non essenziali (ad esempio immagini di grandi dimensioni
non visualizzate su ogni pagina), i browser potrebbero scaricare più dati dello
stretto necessario. Anche se i dati sono relativamente economici nei paesi
occidentali, questo non è il caso nei mercati emergenti in cui la connettività è
costosa e i dati sono costosi.</p>
</li>
</ul>
<h2 data-md-type="header" data-md-header-level="2"
data-parent-segment-id="475148">Requisiti {: #app-shell-requirements }</h2>
<p data-md-type="paragraph" data-parent-segment-id="475173">Una app shell
dovrebbe idealmente:</p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475216">Caricare velocemente</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475218">Usare il minor numero di dati possibile</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475219">Usare risorse statiche da una cache locale</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475221">Separare il contenuto dalla navigazione</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475223">Recuperare e visualizzare il contenuto specifico
della pagina (HTML, JSON ecc.)</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475224">Memorizzare eventualmente il contenuto dinamico
nella cache</li>
</ul>
<p data-md-type="paragraph" data-parent-segment-id="973808">La shell
dell'applicazione mantiene l'UI locale e carica il contenuto in modo dinamico
attraverso un'API, ma non sacrifica l'abilità di collegamento e individuabilità
del web. La prossima volta che l'utente accede alla tua app, la verrà
visualizzata automaticamente versione più recente. Non è necessario scaricare
nuove versioni prima di utilizzarla.</p>
<p data-md-type="paragraph" data-parent-segment-id="973809">Note: l'estensione
di auditing <a href="https://github.com/googlechrome/lighthouse"
data-md-type="link">Lighthouse</a> può essere utilizzata per verificare se la
PWA che utilizza una shell dell'applicazione ottenga le migliori prestazioni. <a
href="https://www.youtube.com/watch?v=LZjQ25NRV-E" data-md-type="link">To
theLighthouse</a> è un talk che approfondisce l'ottimizzazione di una PWA
utilizzando questo strumento.</p>
<h2 data-md-type="header" data-md-header-level="2"
data-parent-segment-id="475150">Costruisci la tua app shell {:
#building-your-app-shell }</h2>
<p data-md-type="paragraph" data-parent-segment-id="973810">Struttura l'app in
modo che ci sia una chiara distinzione tra la shell della pagina e il contenuto
dinamico. In generale, la tua app dovrebbe caricare la shell più semplice
possibile ma includere abbastanza contenuti di pagina significativi con il
download iniziale. Determina il giusto equilibrio tra velocità e e
l'aggiornamento dei dati per ciascuna delle origini dati.</p>
<div data-md-type="block_html">
<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/architecture/images/wikipedia.jpg?raw=true"
alt="Offline Wikipedia app using an application shell with content caching">
  <figcaption data-parent-segment-id="475225">L'<a
href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">applicazione
offline di Wikipedia</a> di Jake Archibald è un buon esempio di PWA che utilizza
un modello App Shell. Si carica all'istante in caso di visite ripetute ma
preleva i contenuti in modo dinamico utilizzando JS. Questo contenuto viene
quindi memorizzato nella cache offline per visite future.</figcaption>
</figure>
</div>
<h3 data-md-type="header" data-md-header-level="3"
data-parent-segment-id="475158">Esempio di codice HTML per una app shell {:
#example-html-for-appshell }</h3>
<p data-md-type="paragraph" data-parent-segment-id="973811">Questo esempio
separa l'infrastruttura principale dell'app e l'UI dai dati. È importante
mantenere il caricamento iniziale il più semplice possibile per visualizzare
solo il layout della pagina non appena viene aperta la web app. Alcuni
provengono dal file indice dell'applicazione (DOM inline, stili) e il resto
viene caricato da script e fogli di stile esterni.</p>
<p data-md-type="paragraph" data-parent-segment-id="973812">L'UI e
l'infrastruttura sono memorizzate nella cache localmente utilizzando un service
worker in modo che nei carichi successivi vengano recuperati solo i dati nuovi o
modificati, invece di dover caricare tutto.</p>
<p data-md-type="paragraph" data-parent-segment-id="973813">Il file <code
data-md-type="codespan">index.html</code> nella tua directory di lavoro dovrebbe
assomigliare al seguente codice. Questo è un sottoinsieme dei contenuti
effettivi e non è un file indice completo. Diamo un'occhiata a ciò che
contiene.</p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="973835">HTML e CSS per lo "scheletro" dell'interfaccia
utente completa di segnaposti di navigazione e contenuti.</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="973836">Un file JavaScript esterno (app.js) per la
gestione della navigazione e della logica dell'interfaccia utente, nonché il
codice per visualizzare i post recuperati dal server e archiviarli localmente
utilizzando un meccanismo di archiviazione come IndexedDB.</li>
<li data-md-type="list_item" data-md-list-type="unordered"
data-parent-segment-id="475244">Un manifest di app web e un service worker per
abilitare le funzionalità offline.</li>
</ul>
<div data-md-type="block_html">
<div class="clearfix"></div>
</div>
<pre data-md-type="block_code" data-md-language=""><code
data-parent-segment-id="2886628">


  <meta charset="utf-8">
  <title>App Shell</title>
  <link rel="manifest" href="/manifest.json">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="styles/inline.css">

</code></pre>


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


  <script src="app.js" async=""></script>

  <script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ',
registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
  </script>



'/offline.html',

'/', ];

self.addEventListener('install', function(e) { console.log('[ServiceWorker]
Install'); e.waitUntil( caches.open(cacheName).then(function(cache) {
console.log('[ServiceWorker] Caching app shell'); return
cache.addAll(filesToCache); }) ); });

<h4 data-md-type="header" data-md-header-level="4"
data-parent-segment-id="475163">Utilizzo della sw-precache per memorizzare nella
cache la shell dell'applicazione</h4>
<p data-md-type="paragraph" data-parent-segment-id="973819">Il service worker
generato da sw-precache memorizzerà nella cache e servirà le risorse configurate
come parte del processo di compilazione. Puoi avere nella precache ogni file
HTML, JavaScript e CSS che costituisce la shell dell'applicazione. Tutto
funzionerà offline e si caricherà velocemente nelle visite successive senza
alcuno sforzo aggiuntivo.</p>
<p data-md-type="paragraph" data-parent-segment-id="1538917">Ecco un esempio
base dell'utilizzo di sw-precache come parte di un processo di generazione <a
href="http://gulpjs.com" data-md-type="link">gulp</a>:</p>
<pre data-md-type="block_code" data-md-language=""><code
data-parent-segment-id="973834">gulp.task('generate-service-worker',
function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';
</code></pre>

swPrecache.write(path.join(rootDir, 'service-worker.js'), { staticFileGlobs:
[rootDir + '/**/*.{js,html,css,png,jpg,gif}'], stripPrefix: rootDir },
callback); });

<p data-md-type="paragraph" data-parent-segment-id="973821">Per ulteriori
informazioni sulla memorizzazione nella cache delle risorse statiche consultare
il codelab <a
href="https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0"
data-md-type="link">Adding a Service Worker with sw-precache</a>.</p>
<p data-md-type="paragraph" data-parent-segment-id="973822">Note: sw-precache è
utile per il caching offline delle risorse statiche. Per le risorse
runtime/dinamiche, ti consigliamo di utilizzare la nostra libreria gratuita <a
href="https://github.com/googlechrome/sw-toolbox"
data-md-type="link">sw-toolbox</a> .</p>
<h2 data-md-type="header" data-md-header-level="2"
data-parent-segment-id="475152">Conclusione {: #conclusion }</h2>
<p data-md-type="paragraph" data-parent-segment-id="973823">La shell
dell'applicazione che utilizza un service worker è un modello efficace per la
memorizzazione della cache offline e offre anche vantaggi significativi in
termini di prestazioni nell'ambito del caricamento istantaneo per le visite
ripetute alla PWA. È possibile memorizzare nella cache la shell
dell'applicazione in modo che funzioni offline e popolare il suo contenuto
utilizzando JavaScript.</p>
<p data-md-type="paragraph" data-parent-segment-id="973824">Nelle visite
ripetute, questo ti consente di ottenere pixel significativi sullo schermo senza
la rete, anche se i tuoi contenuti arrivano da lì.  Translated by {% include
"web/_shared/contributors/lucaberton.html" %}</p>
<h2 data-md-type="header" data-md-header-level="2"
data-parent-segment-id="1927320">Feedback {: #feedback }</h2>
<p data-md-type="paragraph" data-parent-segment-id="1927322">Translated by {%
include "web/_shared/contributors/lucaberton.html" %}</p>
