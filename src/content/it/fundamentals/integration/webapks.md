project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Quando l'utente aggiunge la tua Progressive Web App alla schermata
iniziale Android, Chrome genera automaticamente un APK per te, che a volte
chiamiamo WebAPK. L'installazione tramite un APK rende possibile che la tua app
venga visualizzata nell'app launcher, nelle impostazioni di Android e per
registrare un set di filtri di intent.

{# wf_updated_on: 2018-10-31 #}
{# wf_published_on: 2017-05-21 #}
{# wf_blink_components: Mobile>WebAPKs #}
{# wf_previous_url: /web/updates/2017/02/improved-add-to-home-screen #}

# WebAPKs su Android {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

[Aggiungi alla schermata iniziale](/web/fundamentals/app-install-banners/) su
Android fa molto di più che aggiungere la Progressive Web App alla schermata
iniziale dell'utente. Chrome genera e installa automaticamente un APK speciale
della tua app. A volte ci riferiamo a questo come **WebAPK** . L'installazione
tramite un APK rende possibile che la tua app venga visualizzata nell'app
launcher, nelle impostazioni di Android e per registrare un set di filtri di
intent.

Per [generare un
WebAPK](https://chromium.googlesource.com/chromium/src/+/master/chrome/android/webapk/README)
Chrome si basa sul [manifest della web app](/web/fundamentals/web-app-manifest/)
ed altri metadati. Ogni volta che il manifest cambia, Chrome dovrà generare un
nuovo APK.

Note: poiché il WebAPK viene generato ogni volta che il manifest cambia, ti
consigliamo di cambiarlo solo quando necessario. Non utilizzarlo per memorizzare
identificatori specifici dell'utente o altri dati che cambiano frequentemente.
La modifica frequente del file manifest aumenterà il tempo di installazione
perché il WebAPK dovrà essere rigenerato ad ogni modifica.

## Filtri intent Android

Quando una Progressive Web App è installata su Android, registra una serie di
[filtri intent](https://developer.android.com/guide/components/intents-filters)
per tutti gli URL nell'ambito dell'app. Quando un utente fa clic su un link che
rientra nell'ambito dell'applicazione, l'app verrà aperta al posto di una scheda
del browser.

Considera il seguente `manifest.json`, una volta eseguita dall'app launcher,
avvia `https://example.com/` come app standalone, senza alcun browser chrome.

```
"start_url": "/",
"display": "standalone",
```

Il WebAPK include i seguenti filtri di intent:

```
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="https"
    android:host="example.com"
    android:pathPrefix="/" />
</intent-filter>
```

Se l'utente fa clic su un collegamento all'interno di un'app installata su
`https://example.com/read` , verrà catturato dall'intent ed aperto nella
Progressive Web App.

Note: la navigazione direttamente su `https://example.com/app/` dalla barra
degli indirizzi funzionerà esattamente come con le app native che hanno un
filtro intent. Chrome presuppone che l'utente <b>intende</b> visitare il sito e
aprirà questo sito.

### Utilizzo `scope` per limitare i filtri di intent

Se non vuoi che la tua Progressive Web App gestisca tutti gli URL all'interno
del tuo sito, puoi aggiungere la proprietà
[`scope`](/web/fundamentals/web-app-manifest/#scope) al manifest della tua app
Web. La proprietà `scope` dice ad Android di aprire la tua web app solo se l'URL
corrisponde `origin` + `scope` e limita quali URL saranno gestiti dalla tua app
e quali dovrebbero essere aperti nel browser. Questo è utile quando hai la tua
app e altri contenuti non-app sullo stesso dominio.

Considera il seguente `manifest.json`, una volta lanciato dall'app launcher,
avvia `https://example.com/app/` come app standalone, senza alcun browser
chrome.

```
"scope": "/app/",
"start_url": "/",
"display": "standalone",
```

Come prima, il WebAPK generato include un filtro di intent, ma modifica
l'attributo `android:pathPrefix` dell'APK `AndroidManifest.xml`:

```
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="https"
    android:host="example.com"
    android:pathPrefix="/app/" />
</intent-filter>
```

Diamo un'occhiata ad alcuni esempi: <br> <span
class="compare-yes"><code>https://example.com/app/</code> - all'interno di
<code>/app/</code> </span><br> <span
class="compare-yes"><code>https://example.com/app/read/book</code> - all'interno
di <code>/app/</code> </span><br> <span
class="compare-no"><code>https://example.com/help/</code> - non in
<code>/app/</code> </span><br> <span
class="compare-no"><code>https://example.com/about/</code> - non in
<code>/app/</code></span>

Consulta [`scope`](/web/fundamentals/web-app-manifest/) per ulteriori
informazioni a proposito di `scope`, su cosa accade quando non lo imposti e su
come utilizzarlo per definire il perimetro della tua app.

## Gestione delle autorizzazioni

Le autorizzazioni funzionano allo stesso modo delle altre web app e non possono
essere richieste al momento dell'installazione, ma devono essere richieste in
fase di esecuzione, idealmente solo quando ne hai veramente bisogno. Ad esempio,
non chiedere l'autorizzazione della videocamera al primo caricamento, ma attendi
fino a quando l'utente non tenta di scattare una foto.

Note: Android concede normalmente un'autorizzazione immediata per mostrare le
notifiche per le app installate, ma le app installate tramite WebAPK non sono
concesse al momento dell'installazione, è necessario richiederle in fase di
runtime all'interno della tua app.

## Gestione dello stato di archiviazione e app

Anche se la Progressive Web App viene installata tramite un APK, Chrome utilizza
il profilo corrente per archiviare tutti i dati e non verrà separato. Ciò
consente un'esperienza condivisa tra il browser e l'app installata. I cookie
sono condivisi ed attivi, qualsiasi spazio di archiviazione lato client è
accessibile ed i service workersono installati e pronti all'uso.

Tuttavia, questo può essere un problema se l'utente cancella il proprio profilo
Chrome o sceglie di cancellare i dati del sito.

## Aggiornamento di WebAPK {: #update-webapk }

Quando viene eseguito WebAPK, Chrome controlla il manifest attualmente
installato con il manifest live. Se una delle proprietà nel manifest richieste
per aggiungere la PWA alla schermata iniziale è cambiata, Chrome richiederà un
WebAPK aggiornato. La richiesta può essere accodata fino a quando il dispositivo
è collegato e ha una connessione WiFi.

Vedere
[`UpdateReason`](https://cs.chromium.org/chromium/src/chrome/browser/android/webapk/webapk.proto?l=35)
enum all'interno di `message WebApk` per i motivi che potrebbero richiedere
aggiornamenti di WebAPK.

Note: è possibile che le icone vengano memorizzate nella cache, pertanto
potrebbe essere utile modificare i nomi dei file durante l'aggiornamento delle
icone o di altri elementi grafici.

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

## Domande frequenti

Se viene modificata una delle proprietà manifest. Per tutti i dettagli

<dl>
  <dt>Cosa succede se l'utente ha già installato l'app nativa per il sito?</dt>
<dd>Ad oggi tramite aggiungi alla schermata iniziale, gli utenti saranno in
grado di aggiungere un sito indipendente da qualsiasi app nativa. Se prevedi che
gli utenti possano installare entrambe, ti consigliamo di differenziare l'icona
o il nome del tuo sito dall'app nativa.</dd>
</dl>

<dt>Quando un utente apre un sito installato tramite l'aggiunta avanzata alla
schermata Home, Chrome sarà in esecuzione?</dt>
<dd>Sì, una volta che il sito è stato aperto dalla schermata principale,
l'attività principale è ancora Chrome. I cookie, le autorizzazioni e tutti gli
altri stati del browser saranno condivisi.</dd>


<dt>Lo spazio di archiviazione del mio sito installato verrà cancellato se
l'utente cancella la cache di Chrome?</dt>
  <dd>Sì.</dd>


  <dt>La mia app verrà reinstallata quando avrò un nuovo dispositivo?</dt>
<dd>Non in questo momento, ma riteniamo che sia un'area importante e stiamo
studiando i modi per farlo funzionare.</dd>


<dt>Sarò in grado di registrarmi per gestire schemi e protocolli URL
personalizzati?</dt>
  <dd>No.</dd>


<dt>Come vengono gestite le autorizzazioni? Verrà visualizzato il prompt di
Chrome o Android?</dt>
<dd>Le autorizzazioni saranno comunque gestite tramite Chrome. Gli utenti
vedranno le richieste di Chrome di concedere le autorizzazioni e potranno
modificarle nelle impostazioni di Chrome.</dd>


  <dt>Su quali versioni di Android funzionerà?</dt>
<dd>Le Progressive Web App possono essere installate su tutte le versioni di
Android che eseguono Chrome per Android, in particolare Jelly Bean e versioni
successive.</dd>


  <dt>Questo usa WebView?</dt>
<dd>No, il sito si apre nella versione di Chrome da cui l'utente ha aggiunto
il sito.</dd>


  <dt>Possiamo caricare gli APK creati nel Play Store?</dt>
<dd>No. Non sono fornite informazioni sulla firma delle chiavi per consentire
all'utente di creare il proprio PWA anziché dallo store.</dd>


  <dt>Sono elencati nel Play Store?</dt>
  <dd>No.</dd>


<dt>Sono uno sviluppatore di un altro browser su Android, posso avere questo
processo di installazione senza interruzioni?</dt>
<dd>Ci stiamo lavorando. Ci impegniamo a renderlo disponibile a tutti i
browser su Android e avremo presto maggiori dettagli.</dd>





## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
