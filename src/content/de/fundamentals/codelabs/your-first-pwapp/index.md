project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# Ihre erste Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## Einführung

### Was macht eine Web-App zu einer progressiven Web-App?

Progressive Web Apps bieten ein installierbares, App-ähnliches Erlebnis auf Desktops und Mobilgeräten, das direkt über das Web erstellt und bereitgestellt wird. Das sind Web-Apps, die schnell und zuverlässig sind. Und vor allem sind es Web-Apps, die in jedem Browser funktionieren. Wenn Sie heute eine Webanwendung erstellen, befinden Sie sich bereits auf dem Weg zur Erstellung einer progressiven Webanwendung.

#### Schnell und zuverlässig

Jedes Web-Erlebnis muss schnell sein. Dies gilt insbesondere für progressive Web-Apps. Schnell bezieht sich auf die Zeit, die benötigt wird, um aussagekräftige Inhalte auf dem Bildschirm zu erhalten, und bietet ein interaktives Erlebnis in weniger als 5 Sekunden.

Und es muss verlässlich schnell sein. Es ist schwer genug zu betonen, wie viel zuverlässiger die Leistung ist. Stellen Sie sich das so vor: Das erste Laden einer nativen App ist frustrierend. Es wird von einem App Store und einem riesigen Download überwacht, aber sobald Sie zu einem Punkt kommen, an dem die App installiert ist, werden diese Anschaffungskosten für alle App-Starts amortisiert, und keiner dieser Starts hat eine variable Verzögerung. Jeder Anwendungsstart ist so schnell wie der letzte, keine Abweichung. Eine progressive Webanwendung muss diese zuverlässige Leistung erbringen, die Benutzer von jeder installierten Erfahrung erwarten.

#### Installable

Progressive Web Apps können auf einer Browser-Registerkarte ausgeführt werden, sind aber auch installierbar. Durch das Hinzufügen von Lesezeichen zu einer Website wird lediglich eine Verknüpfung hinzugefügt. Eine installierte Progressive Web App sieht jedoch genauso aus und verhält sich wie alle anderen installierten Apps. Es wird an derselben Stelle gestartet wie andere Apps. Sie können den Startvorgang steuern, einschließlich eines benutzerdefinierten Begrüßungsbildschirms, Symbolen und mehr. Es läuft als App, in einem App-Fenster ohne Adressleiste oder einer anderen Browser-Benutzeroberfläche. Und wie bei allen anderen installierten Apps handelt es sich um eine Top-Level-App im Task-Switcher.

Denken Sie daran, dass eine installierbare PWA schnell und zuverlässig ist. Benutzer, die eine PWA installieren, erwarten, dass ihre Apps funktionieren, unabhängig von der Art der Netzwerkverbindung, mit der sie verbunden sind. Dies ist eine Grundvoraussetzung, die von jeder installierten App erfüllt werden muss.

#### Mobile &amp; Desktop

Progressive Web Apps arbeiten mit responsiven Designtechniken auf mobilen __und__ Desktop und verwenden eine einzige Codebasis zwischen Plattformen. Wenn Sie beabsichtigen, eine native App zu schreiben, werfen Sie einen Blick auf die Vorteile, die eine PWA bietet.

### Was Sie bauen werden

In diesem Codelab erstellen Sie eine Wetter-Webanwendung mit Progressive Web App-Techniken. Ihre App wird:

* Verwenden Sie responsives Design, damit es auf dem Desktop oder auf dem Handy funktioniert.
* Seien Sie schnell und nutzen Sie einen Service-Mitarbeiter, um die zur Ausführung erforderlichen App-Ressourcen (HTML, CSS, JavaScript, Bilder) vorab zu speichern und die Wetterdaten zur Laufzeit zwischenzuspeichern, um die Leistung zu verbessern.
* Installierbar sein, ein Web-App-Manifest und das `beforeinstallprompt` Ereignis verwenden, um den Benutzer darüber zu informieren, dass es installierbar ist.

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: Um dieses Codelab zu vereinfachen und die Grundlagen für die Bereitstellung eines Offline-Erlebnisses zu erläutern, verwenden wir Vanilla-JavaScript. In einer Produktions-App empfehlen wir dringend, Tools wie [Workbox](/web/tools/workbox/) zu verwenden, um Ihren Servicemitarbeiter aufzubauen. Es entfernt viele scharfe Kanten und dunkle Ecken, auf die Sie treffen können.

### Was Sie lernen werden

* Erstellen und Hinzufügen eines Web-App-Manifests
* So stellen Sie eine einfache Offline-Erfahrung bereit
* So stellen Sie eine vollständige Offline-Erfahrung bereit
* So machen Sie Ihre App installierbar

Dieses Codelab konzentriert sich auf Progressive Web Apps. Nicht relevante Konzepte und Codeblöcke werden überspielt und können einfach kopiert und eingefügt werden.

### Was du brauchst

* Eine aktuelle Version von Chrome (74 oder höher) PWAs sind nur Web-Apps und funktionieren in allen Browsern. Wir werden jedoch einige Funktionen der Chrome DevTools verwenden, um besser zu verstehen, was auf Browser-Ebene geschieht, und verwenden Sie es Testen Sie die Installationserfahrung.
* Kenntnisse in HTML, CSS, JavaScript und [Chrome DevTools](https://developer.chrome.com/devtools) .

## Erste

### Holen Sie sich einen Schlüssel für die Dark Sky-API

Unsere Wetterdaten stammen aus dem [Dark Sky API](https://darksky.net/dev). Um es verwenden zu können, müssen Sie einen API-Schlüssel anfordern. Es ist einfach zu verwenden und kostenlos für nicht kommerzielle Projekte.

[Register for API Key](https://darksky.net/dev/register)

Note: Sie können dieses Codelab noch ohne Dark Sky-API-Schlüssel abschließen. Wenn unser Server keine echten Daten von der Dark Sky API abrufen kann, werden stattdessen gefälschte Daten zurückgegeben.

#### Sie Ihr API-Schlüssel ordnungsgemäß funktioniert

Um zu testen, ob Ihr API-Schlüssel ordnungsgemäß funktioniert, senden Sie eine HTTP-Anforderung an die DarkSky-API. Aktualisieren Sie die URL unten, um `DARKSKY_API_KEY` durch Ihren API-Schlüssel zu ersetzen. Wenn alles funktioniert, sollten Sie die aktuelle Wettervorhersage für New York City sehen.

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### Holen Sie sich den Code

Wir haben alles, was Sie für dieses Projekt benötigen, in ein Git-Repo aufgenommen. Um zu beginnen, müssen Sie den Code nehmen und in Ihrer bevorzugten Entwicklungsumgebung öffnen. Für dieses Codelab empfehlen wir die Verwendung von Glitch.

#### empfohlen: Verwenden Sie Glitch, um das Repo zu importieren

Die Verwendung von Glitch ist die empfohlene Methode, um dieses Codelab durchzuarbeiten.

1. Öffnen Sie eine neue Browser-Registerkarte und gehen Sie zu [https://glitch.com](https://glitch.com).
2. Wenn Sie noch kein Konto haben, müssen Sie sich anmelden.
3. Klicken Sie auf __New Project__ und dann auf __Clone aus Git Repo .__
4. Klonen Sie __https://github.com/googlecodelabs/your-first-pwapp.git__ und klicken Sie auf OK.
5. Wenn das Repo geladen ist, bearbeiten Sie die `.env` Datei und aktualisieren Sie sie mit Ihrem DarkSky-API-Schlüssel.
6. Klicken Sie auf die Schaltfläche __Show Live__, um die PWA in Aktion anzuzeigen.

#### Alternative: Code herunterladen und lokal arbeiten

Wenn Sie den Code herunterladen und lokal arbeiten möchten, benötigen Sie eine aktuelle Version von Node und den Code-Editor, der eingerichtet und betriebsbereit ist.

Caution: Wenn Sie lokal arbeiten, werden einige Lighthouse-Audits nicht bestanden, und die Installation ist möglicherweise nicht verfügbar, da der lokale Server den Inhalt nicht über einen sicheren Kontext bereitstellt.

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. Entpacken Sie die heruntergeladene ZIP-Datei.
2. Führen Sie `npm install` , um die für die Ausführung des Servers erforderlichen Abhängigkeiten zu installieren.
3. Bearbeiten Sie `server.js` und legen Sie Ihren DarkSky-API-Schlüssel fest.
4. Führen Sie `node server.js` , um den Server an Port 8000 zu starten.
5. Öffnen Sie eine Browser-Registerkarte für [http://localhost:8000](http://localhost:8000)

## eine Basislinie fest

### Was ist unser Ausgangspunkt?

Unser Ausgangspunkt ist eine grundlegende Wetter-App für dieses Codelab. Der Code wurde zu stark vereinfacht, um die Konzepte in diesem Codelab darzustellen, und die Fehlerbehandlung ist gering. Wenn Sie diesen Code in einer Produktionsanwendung wiederverwenden möchten, stellen Sie sicher, dass Sie alle Fehler behandeln und den gesamten Code vollständig testen.

Einige Dinge zu versuchen ...

1. Fügen Sie eine neue Stadt mit dem blauen Plus-Button in der rechten unteren Ecke hinzu.
2. Aktualisieren Sie die Daten mit der Aktualisierungsschaltfläche in der oberen rechten Ecke.
3. Löschen Sie eine Stadt mit dem x oben rechts auf jeder Stadtkarte.
4. Sehen Sie, wie es auf Desktop und Mobile funktioniert.
5. Sehen Sie, was passiert, wenn Sie offline gehen.
6. Im Chrome-Fenster &quot;Netzwerk&quot; erfahren Sie, was passiert, wenn das Netzwerk auf &quot;Slow 3G&quot; eingeschränkt wird.
7. Fügen Sie dem Prognoseserver eine Verzögerung hinzu, indem Sie `FORECAST_DELAY` in `server.js`

### Audit mit Leuchtturm

[Lighthouse](/web/tools/lighthouse/#devtools) ist ein [Lighthouse](/web/tools/lighthouse/#devtools) Tool zur Verbesserung der Qualität Ihrer Websites und Seiten. Es bietet Audits für Leistung, Zugänglichkeit, progressive Webanwendungen und mehr. Jedes Audit verfügt über ein Referenzdokument, in dem erläutert wird, warum das Audit wichtig ist, und wie es zu beheben ist.

![b112675caafccef0.png](img/b112675caafccef0.png)

Wir werden Lighthouse verwenden, um unsere Wetter-App zu überprüfen und die vorgenommenen Änderungen zu überprüfen.

Note: Sie können Lighthouse in Chrome DevTools, über die Befehlszeile oder als Knotenmodul ausführen. Überlegen Sie sich [adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) für Ihren Build-Prozess, um sicherzustellen, dass Ihre Web-App nicht regressiert.

### wir Lighthouse

1. Öffnen Sie Ihr Projekt in einer neuen Registerkarte.
2. Öffnen Sie Chrome DevTools und wechseln Sie zur Registerkarte __Audits__. DevTools zeigt eine Liste der Überwachungskategorien an. Lassen Sie alle aktiviert.
3. Klicken Sie auf __Run audits__. Nach 60 bis 90 Sekunden erhalten Sie von Lighthouse einen Bericht auf der Seite.

### Progressive Web App-Prüfung

Wir werden uns auf die Ergebnisse der Progressive Web App-Prüfung konzentrieren.

![af1a64a13725428e.png](img/af1a64a13725428e.png)

Und es gibt viel Rot, auf das Sie sich konzentrieren können:

* __❗SCHEITERN:__ Die aktuelle Seite antwortet nicht mit einer 200, wenn sie offline ist.
* __❗SCHEITERN:__ `start_url` antwortet nicht mit einer 200, wenn es offline ist.
* __❗SCHEITERN:__ Registriert keinen Service Worker, der page und `start_url.` steuert
* __❗SCHEITERN:__ Das Webanwendungsmanifest erfüllt die Installationsanforderungen nicht.
* __❗SCHEITERN:__ Ist nicht für einen benutzerdefinierten Begrüßungsbildschirm konfiguriert.
* __❗SCHEITERN:__ Legt keine Farbe für die Adressleiste fest.

Lass uns einsteigen und einige dieser Probleme beheben!

## Fügen Sie ein Web-App-Manifest hinzu

Am Ende dieses Abschnitts besteht unsere Wetter-App folgende Prüfungen:

* Das Webanwendungsmanifest erfüllt nicht die Installationsanforderungen.
* Ist nicht für einen benutzerdefinierten Begrüßungsbildschirm konfiguriert.
* Legt keine Themenfarbe für die Adressleiste fest.

### Erstellen Sie das Web-App-Manifest

Das [web app manifest](/web/fundamentals/web-app-manifest) ist eine einfache JSON-Datei, mit der Sie als Entwickler steuern können, wie Ihre App dem Benutzer angezeigt wird.

Mit dem Web-App-Manifest kann Ihre Web-App:

* Sagen Sie dem Browser, dass Ihre App in einem eigenständigen Fenster ( `display` ) `display` .
* `start_url` Sie fest, welche Seite beim ersten Start der App geöffnet wird ( `start_url` ).
* Definieren Sie, wie die App im Dock oder im App-Launcher ( `short_name` , `icons` ) `icons` .
* Erstellen Sie einen `name` ( `name` , `icons` , `colors` ).
* Sagen Sie dem Browser, dass er das Fenster im `orientation` oder im Hochformatmodus ( `orientation` ) `orientation` .
* Und [plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) .

Erstellen Sie eine Datei mit dem Namen `public/manifest.json` in Ihrem Projekt und kopieren Sie den folgenden Inhalt:

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

Das Manifest unterstützt eine Reihe von Symbolen, die für verschiedene Bildschirmgrößen gedacht sind. Für dieses Code-Lab haben wir ein paar weitere hinzugefügt, seit wir sie für unsere iOS-Integration benötigten.

Note: Damit Chrome installiert werden kann, müssen Sie mindestens ein 192x192px-Symbol und ein 512x512px-Symbol angeben. Sie können aber auch andere Größen angeben. Chrome verwendet das Symbol, das am nächsten zu 48dp liegt, z. B. 96px auf einem 2x-Gerät oder 144px für ein 3x-Gerät.

### Fügen Sie einen Link zum Manifest der Web-App hinzu

Als Nächstes müssen wir den Browser über unser Manifest `<link rel="manifest"...` , indem `<link rel="manifest"...` jeder Seite in unserer App ein `<link rel="manifest"...` hinzufügen. Fügen Sie dem `<head>` Element in Ihrer `index.html` Datei die folgende Zeile `index.html` .

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools-Umweg

DevTools bietet eine schnelle und einfache Möglichkeit zum Überprüfen Ihrer `manifest.json` Datei. Öffnen Sie den Bereich __Manifest__ im Bereich __Application__. Wenn Sie die Manifestinformationen korrekt hinzugefügt haben, können Sie sie in diesem Fenster in einem benutzerfreundlichen Format analysieren und anzeigen lassen.

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### Hinzufügen von iOS-Meta-Tags und

Safari unter iOS unterstützt das Web-App-Manifest ( [yet](https://webkit.org/status/#specification-web-app-manifest) ) nicht. [yet](https://webkit.org/status/#specification-web-app-manifest) müssen Sie [traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) zum `<head>` Ihrer `index.html` Datei `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### Bonus: Einfache Lighthouse-Korrekturen

Bei unserem Leuchtturm-Audit wurden einige andere Dinge angesprochen, die ziemlich einfach zu beheben sind, also kümmern wir uns darum, während wir hier sind.

#### Sie die Meta-Beschreibung ein

Im Rahmen des SEO-Audits hat Lighthouse festgestellt, dass unsere &quot; [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot; [Document does not have a meta description.](/web/tools/lighthouse/audits/description) in den Suchergebnissen von Google angezeigt werden können. Hochwertige, eindeutige Beschreibungen können Ihre Ergebnisse relevanter für Suchbenutzer machen und Ihren Suchverkehr erhöhen.

`meta` dem `<head>` Ihres Dokuments das folgende `meta` Tag hinzu, um eine Beschreibung hinzuzufügen:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### Sie die Farbe der Adressleiste fest

Im PWA-Audit hat Lighthouse unsere App &quot; [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) &quot; [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) . Wenn Sie die Adressleiste des Browsers an die Farben Ihrer Marke anpassen, erhalten Sie eine noch tiefgreifendere Benutzererfahrung.

Um die `meta` auf dem `<head>` `meta` , fügen `meta` dem `<head>` Ihres Dokuments den folgenden `meta` Tag `<head>` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Überprüfen Sie die Änderungen mit Lighthouse

Starten Sie Lighthouse erneut (indem Sie auf das Pluszeichen in der oberen linken Ecke des Überwachungsbereichs klicken), und überprüfen Sie Ihre Änderungen.

__SEO Audit__

* __✅ BESTANDEN:__ Das Dokument hat eine Meta-Beschreibung.

__Progressive Web App-Prüfung__

* __❗SCHEITERN:__ Die aktuelle Seite antwortet nicht mit einer 200, wenn sie offline ist.
* __❗SCHEITERN:__ `start_url` antwortet nicht mit einer 200, wenn es offline ist.
* __❗SCHEITERN:__ Registriert keinen Service Worker, der page und `start_url.` steuert
* __✅ BESTANDEN:__ Das Web-App-Manifest erfüllt die Installationsanforderungen.
* __✅ BESTANDEN:__ Für einen benutzerdefinierten Begrüßungsbildschirm konfiguriert.
* __✅ BESTANDEN:__ Legt die Farbe der Adressleiste fest.

## Bereitstellung eines grundlegenden Offline-Erlebnisses

Die Benutzer erwarten, dass installierte Apps immer eine Basiserfahrung haben, wenn sie offline sind. Aus diesem Grund ist es für installierbare Web-Apps wichtig, dass Chrome&#39;s Offline-Dinosaurier niemals angezeigt wird. Die Offline-Erfahrung kann von einer einfachen Offline-Seite über eine schreibgeschützte Erfahrung mit zuvor zwischengespeicherten Daten bis hin zu einer voll funktionsfähigen Offline-Umgebung reichen, die automatisch synchronisiert wird, wenn die Netzwerkverbindung wiederhergestellt wird.

In diesem Abschnitt fügen wir unserer Wetter-App eine einfache Offline-Seite hinzu. Wenn der Benutzer versucht, die App im Offline-Modus zu laden, wird anstelle der typischen, im Browser angezeigten Offline-Seite unsere benutzerdefinierte Seite angezeigt. Am Ende dieses Abschnitts besteht unsere Wetter-App folgende Prüfungen:

* Aktuelle Seite antwortet nicht mit einer 200, wenn sie offline ist.
* `start_url` antwortet nicht mit einer 200, wenn es offline ist.
* Registriert keinen Service Worker, der Page und `start_url.` steuert

Im nächsten Abschnitt ersetzen wir unsere benutzerdefinierte Offline-Seite durch eine vollständige Offline-Erfahrung. Dies wird die Offline-Erfahrung verbessern, aber noch wichtiger ist, dass es unsere Leistung erheblich verbessert, da die meisten unserer Assets (HTML, CSS und JavaScript) lokal gespeichert und bereitgestellt werden, wodurch das Netzwerk als potenzieller Engpass beseitigt wird.

### Servicemitarbeiter zur Rettung

Wenn Sie mit Service-Mitarbeitern nicht vertraut sind, können Sie in [Introduction To Service Workers](/web/fundamentals/primers/service-worker/) ein grundlegendes Verständnis darüber gewinnen, was sie tun können, wie ihr Lebenszyklus funktioniert und vieles mehr. Nachdem Sie diese Code- [Debugging Service Workers code lab](http://goo.gl/jhXCBy) abgeschlossen haben, sollten Sie sich mit [Debugging Service Workers code lab](http://goo.gl/jhXCBy) um mehr über die Arbeit mit Servicemitarbeitern zu [Debugging Service Workers code lab](http://goo.gl/jhXCBy) .

Funktionen, die von Service-Mitarbeitern bereitgestellt werden, sollten als fortschreitende Verbesserung betrachtet und nur hinzugefügt werden, wenn sie vom Browser unterstützt werden. Mit Service-Mitarbeitern können Sie beispielsweise [app shell](/web/fundamentals/architecture/app-shell) und Daten für Ihre App zwischenspeichern, sodass sie auch dann verfügbar sind, wenn das Netzwerk nicht verfügbar ist. Wenn Service-Mitarbeiter nicht unterstützt werden, wird der Offline-Code nicht aufgerufen, und der Benutzer erhält eine Grunderfahrung. Die Verwendung der Feature-Erkennung für progressive Verbesserungen bringt wenig Aufwand mit sich und ältere Browser, die diese Funktion nicht unterstützen, werden nicht beschädigt.

Warning: Service-Worker-Funktion ist nur auf Seiten verfügbar, auf die über HTTPS zugegriffen wird (http://localhost und Äquivalente erleichtern auch das Testen).

### Registrieren Sie den Service-Mitarbeiter

Der erste Schritt ist die Registrierung des Service-Arbeiters. Fügen Sie der `index.html` Datei den folgenden Code `index.html` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

Dieser Code prüft, ob die Service-Worker-API verfügbar ist. Wenn dies der `/service-worker.js` ist, wird der Service-Worker bei `/service-worker.js` registriert, sobald die Seite [loaded](/web/fundamentals/primers/service-workers/registration) .

Beachten Sie, dass der Service-Worker vom Stammverzeichnis aus und nicht von einem `/scripts/` Verzeichnis aus bedient wird. Dies ist der einfachste Weg, um die `scope` Ihres Service-Workers `scope` . Der `scope` des Service-Workers bestimmt, welche Dateien der Service-Worker steuert, `scope` von welchem Pfad der Service-Worker Anforderungen abfängt. Der Standardwert von `scope` ist der Speicherort der Service-Worker-Datei und erstreckt sich auf alle darunter liegenden Verzeichnisse. Wenn sich `service-worker.js` im Stammverzeichnis befindet, steuert der Service Worker die Anforderungen aller Webseiten dieser Domäne.

### Precache-Offline-Seite

Zuerst müssen wir dem Servicemitarbeiter mitteilen, was er zwischenspeichern soll. Wir haben bereits ein einfaches [offline page](https://your-first-pwa.glitch.me/offline.html) ( `public/offline.html` ) erstellt, das jedes Mal angezeigt wird, wenn keine Netzwerkverbindung besteht.

`service-worker.js` Sie in `service-worker.js` `'/offline.html',` zum `FILES_TO_CACHE` Array hinzu. Das Endergebnis sollte folgendermaßen aussehen:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

Als Nächstes müssen wir das `install` Ereignis aktualisieren, damit der Service-Worker die Offline-Seite vorab zwischenspeichern kann:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: Ereignisse und Lebenszyklus von Servicemitarbeitern werden im nächsten Abschnitt behandelt.

Unser `install` Ereignis öffnet jetzt den Cache mit `caches.open()` und gibt einen Cache-Namen an. Die Angabe eines Cache-Namens ermöglicht es uns, Dateien zu versionieren oder Daten von den zwischengespeicherten Ressourcen zu trennen, sodass wir leicht eine aktualisieren können, die andere jedoch nicht beeinflussen.

Sobald der Cache geöffnet ist, können wir `cache.addAll()` , das eine Liste mit URLs entnimmt, diese vom Server abruft und die Antwort dem Cache hinzufügt. Beachten Sie, dass `cache.addAll()` ablehnt, wenn eine der einzelnen Anforderungen fehlschlägt. Das bedeutet, dass Sie garantiert sind, dass der Cache in einem konsistenten Zustand ist, wenn der Installationsschritt erfolgreich ist. Wenn dies aus irgendeinem Grund fehlschlägt, wird es beim nächsten Start des Service-Workers automatisch erneut versucht.

#### DevTools-Umweg

Lassen Sie uns einen Blick darauf werfen, wie Sie mit DevTools Service-Mitarbeiter verstehen und debuggen können. Bevor Sie Ihre Seite erneut laden, öffnen Sie DevTools. Gehen Sie zum Bereich __Service Workers__ im Bereich __Application__. Es sollte so aussehen:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

Wenn Sie eine leere Seite wie diese sehen, bedeutet dies, dass auf der aktuell geöffneten Seite keine registrierten Servicemitarbeiter vorhanden sind.

Laden Sie jetzt Ihre Seite neu. Der Bereich &quot;Service Workers&quot; sollte jetzt so aussehen:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

Wenn Sie solche Informationen sehen, bedeutet dies, dass auf der Seite ein Servicemitarbeiter ausgeführt wird.

Neben dem Status-Label gibt es eine Nummer (*34251* in diesem Fall). Behalten Sie diese Nummer im Auge, wenn Sie mit Service-Mitarbeitern arbeiten. So können Sie leicht feststellen, ob Ihr Servicemitarbeiter aktualisiert wurde.

### Bereinigen Sie alte Offline-Seiten

Wir verwenden das `activate` Ereignis, um alle alten Daten in unserem Cache zu bereinigen. Dieser Code stellt sicher, dass der Service-Mitarbeiter seinen Cache aktualisiert, wenn sich eine der App-Shell-Dateien ändert. Damit dies funktioniert, müssen Sie die `CACHE_NAME` Variable oben in Ihrer Service-Worker-Datei inkrementieren.

Fügen Sie Ihrem `activate` Ereignis den folgenden Code `activate` :

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### DevTools-Umweg

Aktualisieren Sie die Seite mit dem Fenster &quot;Service Workers&quot;. Der neue Service Worker wird installiert und die Statusnummer wird erhöht.

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

Der aktualisierte Servicemitarbeiter übernimmt sofort die Kontrolle, da unser `install` Ereignis mit `self.skipWaiting()` und das `activate` Ereignis mit `self.clients.claim()` . Ohne diese Einstellungen würde der alte Servicemitarbeiter die Seite weiterhin steuern, solange eine Registerkarte für die Seite geöffnet ist.

### fehlgeschlagene Netzwerkanforderungen

Und schließlich müssen wir mit `fetch` Ereignissen umgehen. Wir werden ein [network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) . Der Service-Worker versucht zunächst, die Ressource aus dem Netzwerk abzurufen. Wenn dies fehlschlägt, wird die Offline-Seite aus dem Cache zurückgegeben.

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

Der `fetch` Handler muss nur `fetch` behandeln, sodass andere Anforderungen aus dem Handler `fetch` können und normalerweise vom Browser verarbeitet werden. Wenn die Anforderung `.mode` ist, verwenden `fetch` `navigate` , um zu versuchen, das Element aus dem Netzwerk `fetch` . Wenn dies fehlschlägt, öffnet der `catch` Handler den Cache mit `caches.open(CACHE_NAME)` und verwendet `cache.match('offline.html')` , um die vorab im Cache gespeicherte Offline-Seite abzurufen. Das Ergebnis wird dann mit `evt.respondWith()` an den Browser `evt.respondWith()` .

Key Point: das `fetch` des `fetch` Aufrufs in [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) die standardmäßige [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) des Browsers verhindert, und der Browser wird mit der Antwort selbst beauftragt. Wenn Sie `evt.respondWith()` innerhalb eines `fetch` `evt.respondWith()` `fetch` , wird nur das Standardverhalten des Netzwerks angezeigt.
</aside>

#### DevTools-Umweg

Lassen Sie uns überprüfen, ob alles so funktioniert, wie wir es erwarten. Aktualisieren Sie die Seite mit dem Fenster &quot;Service Workers&quot;. Der neue Service Worker wird installiert und die Statusnummer wird erhöht.

Wir können auch überprüfen, was zwischengespeichert wurde. Wechseln Sie zum Bereich __Cache Storage__ im Bereich __Application__ von DevTools. Klicken Sie mit der rechten Maustaste auf __Cache Storage__, und wählen Sie __Refresh Caches__ aus. Erweitern Sie den Abschnitt. Auf der linken Seite sollte der Name Ihres statischen Caches angezeigt werden. Durch Klicken auf den Cache-Namen werden alle Dateien angezeigt, die zwischengespeichert werden.

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

Jetzt testen wir den Offline-Modus. Gehen Sie zurück zum Bereich __Service Workers__ von DevTools und aktivieren Sie das Kontrollkästchen __Offline__. Nach der Überprüfung sollte ein kleines gelbes Warnsymbol neben der Registerkarte __Network__ angezeigt werden. Dies zeigt an, dass Sie offline sind.

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

Laden Sie Ihre Seite neu und ... es funktioniert! Wir bekommen __our__ offline Panda, anstelle des Offline-Dino von Chrome!

### Tipps zum Testen von Service-Mitarbeitern

Das Debuggen von Servicemitarbeitern kann eine Herausforderung sein, und wenn es um das Zwischenspeichern geht, kann dies zu einem Albtraum werden, wenn der Cache nicht wie erwartet aktualisiert wird. Zwischen dem typischen Service-Worker-Lebenszyklus und einem Fehler in Ihrem Code werden Sie schnell frustriert. __Aber nicht .__

#### Verwenden Sie DevTools

Im Bereich Service Workers des Anwendungsfensters gibt es einige Kontrollkästchen, die Ihnen das Leben erleichtern.

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - Wenn diese Option aktiviert ist, wird eine Offline-Erfahrung simuliert und verhindert, dass Anfragen an das Netzwerk gesendet werden.
* __Update on reload__ - Wenn diese Option aktiviert ist, wird der neueste Service-Mitarbeiter abgerufen, installiert und sofort aktiviert.
* __Bypass for network__ - Wenn geprüfte Anforderungen den Service-Mitarbeiter umgehen und direkt an das Netzwerk gesendet werden.

#### Starten Sie frisch

In einigen Fällen laden Sie möglicherweise zwischengespeicherte Daten oder Dinge werden nicht wie erwartet aktualisiert. Um alle gespeicherten Daten (localStorage, indexierte Datenbankdaten, zwischengespeicherte Dateien) und alle Service-Mitarbeiter zu löschen, verwenden Sie den Bereich Speicher löschen auf der Registerkarte Anwendung. Alternativ können Sie auch in einem Inkognito-Fenster arbeiten.

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

Zusätzliche tipps:

* Wenn ein Service Worker nicht mehr registriert ist, kann er solange in der Liste bleiben, bis das zugehörige Browserfenster geschlossen wird.
* Wenn mehrere Fenster zu Ihrer App geöffnet sind, wird ein neuer Servicemitarbeiter erst wirksam, wenn alle Fenster neu geladen und auf den neuesten Servicemitarbeiter aktualisiert wurden.
* Durch das Aufheben der Registrierung eines Service Workers wird der Cache nicht gelöscht!
* Wenn ein Service-Worker vorhanden ist und ein neuer Service-Worker registriert ist, übernimmt der neue Service-Worker erst dann die Kontrolle, wenn die Seite neu geladen wird, es sei denn, Sie haben [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) .

### Überprüfen Sie die Änderungen mit Lighthouse

Starten Sie Lighthouse erneut und überprüfen Sie Ihre Änderungen. Vergessen Sie nicht, das Kontrollkästchen Offline zu deaktivieren, bevor Sie Ihre Änderungen bestätigen.

__SEO Audit__

* __✅ BESTANDEN:__ Das Dokument hat eine Meta-Beschreibung.

__Progressive Web App-Prüfung__

* __✅ BESTANDEN:__ Aktuelle Seite antwortet mit einer 200, wenn sie offline ist.
* __✅ BESTANDEN:__ `start_url` antwortet mit einer 200, wenn es offline ist.
* __✅ BESTANDEN:__ Registriert einen Servicemitarbeiter, der Page und `start_url.` steuert
* __✅ BESTANDEN:__ Das Web-App-Manifest erfüllt die Installationsanforderungen.
* __✅ BESTANDEN:__ Für einen benutzerdefinierten Begrüßungsbildschirm konfiguriert.
* __✅ BESTANDEN:__ Legt die Farbe der Adressleiste fest.

## Bieten Sie eine vollständige Offline-Erfahrung

Nehmen Sie sich einen Moment Zeit, versetzen Sie Ihr Telefon in den Flugzeugmodus und führen Sie einige Ihrer Lieblings-Apps aus. In fast allen Fällen bieten sie ein ziemlich robustes Offline-Erlebnis. Benutzer erwarten diese robuste Erfahrung von ihren Apps. Und das Web sollte nicht anders sein. Progressive Web Apps sollten als Kernszenario offline konzipiert werden.

Key Point: Design für Offline-First kann die Leistung Ihrer Web-App drastisch verbessert werden, indem die Anzahl der Netzwerkanforderungen Ihrer App reduziert wird. Stattdessen können Ressourcen im Cache zwischengespeichert und direkt aus dem lokalen Cache bereitgestellt werden. Selbst mit der schnellsten Netzwerkverbindung ist das Servieren aus dem lokalen Cache schneller!

### Lebenszyklus des

Der Lebenszyklus des Servicetechnikers ist der komplizierteste Teil. Wenn Sie nicht wissen, was es zu tun versucht und welche Vorteile es hat, kann es sich anfühlen, als würde es Sie bekämpfen. Sobald Sie wissen, wie es funktioniert, können Sie den Benutzern nahtlose, unauffällige Updates bereitstellen, die das Beste aus dem Web und den nativen Mustern kombinieren.

Key Point: Dieses Codelab deckt nur die Grundlagen des Lebenszyklus von Service-Mitarbeitern ab. [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) Informationen finden Sie im WORDS0-Artikel zu WebFundamentals.

#### `install` Ereignis

Das erste Ereignis, das ein Service-Mitarbeiter erhält, ist `install` . Es wird ausgelöst, sobald der Worker ausgeführt wird, und es wird nur einmal pro Service-Worker aufgerufen. __Wenn Sie Ihr Service-Worker-Skript ändern, betrachtet der Browser es als einen anderen Service-Worker, und er erhält ein eigenes `install` Ereignis.

![72ed77b1720512da.png](img/72ed77b1720512da.png)

Normalerweise wird das `install` Ereignis verwendet, um alles zwischenzuspeichern, das Sie für die Ausführung Ihrer App benötigen.

#### `activate` Ereignis

Der Service-Mitarbeiter erhält bei jedem Start ein `activate` Ereignis. Der Hauptzweck des `activate` Ereignisses besteht darin, das Verhalten des `activate` zu konfigurieren, bereinigte Ressourcen aus vorherigen Läufen (z. B. alte Caches) zu bereinigen und den Servicemitarbeiter für die Bearbeitung von Netzwerkanforderungen (z. B. das `fetch` beschriebene `fetch` Ereignis) `fetch` .

#### `fetch` Ereignis

Durch das Abrufereignis kann der Service-Worker alle Netzwerkanforderungen abfangen und Anforderungen verarbeiten. Sie kann zum Netzwerk gehen, um die Ressource abzurufen, sie kann sie aus dem eigenen Cache abrufen, eine benutzerdefinierte Antwort oder eine beliebige Anzahl verschiedener Optionen generieren. In [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) du verschiedene Strategien, die du verwenden kannst.

#### Aktualisieren eines Servicearbeiters

Der Browser prüft, ob bei jedem Laden der Seite eine neue Version Ihres Service-Workers vorhanden ist. Wenn eine neue Version gefunden wird, wird die neue Version heruntergeladen und im Hintergrund installiert, jedoch nicht aktiviert. Es befindet sich in einem Wartezustand, bis keine Seiten mehr geöffnet sind, die den alten Service-Mitarbeiter verwenden. Sobald alle Fenster, die den alten Servicemitarbeiter verwenden, geschlossen sind, wird der neue Servicemitarbeiter aktiviert und kann die Kontrolle übernehmen. Weitere Informationen finden Sie im [Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates) Abschnitt des Service Worker Lifecycle-Dokuments.

### Wahl der richtigen Caching-Strategie

Die Wahl des richtigen [caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/) hängt davon ab, welche Art von Ressource Sie zwischenspeichern [caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/) und wie Sie sie später benötigen. Für unsere Wetter-App teilen wir die Ressourcen, die wir für den Cache benötigen, in zwei Kategorien auf: Ressourcen, die wir vorab cachen möchten, und die Daten, die wir zur Laufzeit zwischenspeichern.

#### Statische Ressourcen zwischenspeichern

Das Abgleichen Ihrer Ressourcen ist ein ähnliches Konzept wie bei der Installation eines Desktops oder einer mobilen App durch einen Benutzer. Die für die Ausführung der App erforderlichen Schlüsselressourcen werden auf dem Gerät installiert oder zwischengespeichert, sodass sie später geladen werden können, unabhängig davon, ob eine Netzwerkverbindung besteht oder nicht.

Bei unserer App speichern wir alle unsere statischen Ressourcen vorab, wenn unser Service-Mitarbeiter installiert ist, sodass alles, was wir zum Ausführen unserer App benötigen, auf dem Gerät des Benutzers gespeichert wird. Um sicherzustellen, dass unsere App blitzschnell [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) , verwenden wir die [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) Strategie. Anstatt zum Netzwerk zu gehen, um die Ressourcen abzurufen, werden sie aus dem lokalen Cache abgerufen. Nur wenn es nicht verfügbar ist, versuchen wir es aus dem Netzwerk zu bekommen.

![44860840e2090bd8.png](img/44860840e2090bd8.png)

Durch Ziehen aus dem lokalen Cache werden Netzwerkschwankungen ausgeschlossen. Unabhängig davon, auf welchem Netzwerk sich der Benutzer befindet (WiFi, 5G, 3G oder sogar 2G), die wichtigsten Ressourcen, die wir zum Laufen brauchen, stehen fast sofort zur Verfügung.

Caution: In diesem Beispiel werden statische Ressourcen mithilfe einer [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) Strategie [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) , die dazu führt, dass eine Kopie des zwischengespeicherten Inhalts ohne Rücksprache mit dem Netzwerk zurückgegeben wird. Eine `cache-first` Strategie ist zwar leicht zu implementieren, kann jedoch zu zukünftigen Herausforderungen führen.

#### der App-Daten

Der [stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) ist ideal für bestimmte Datentypen und [stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) sich gut für unsere App. Es holt die Daten so schnell wie möglich auf den Bildschirm und aktualisiert diese, sobald das Netzwerk die neuesten Daten zurückgegeben hat. Stale-while-Revalidate bedeutet, dass wir zwei asynchrone Anforderungen starten müssen, eine an den Cache und eine an das Netzwerk.

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

Unter normalen Umständen werden die zwischengespeicherten Daten fast sofort zurückgegeben, sodass der App aktuelle Daten zur Verfügung stehen, die sie verwenden kann. Wenn die Netzwerkanforderung zurückgegeben wird, wird die App mit den neuesten Daten aus dem Netzwerk aktualisiert.

Für unsere App bietet dies eine bessere Erfahrung als das Netzwerk, indem auf die Cache-Strategie zurückgegriffen wird, da der Benutzer nicht warten muss, bis die Netzwerkanforderung abläuft, um etwas auf dem Bildschirm zu sehen. Möglicherweise sehen sie zunächst ältere Daten, aber sobald die Netzwerkanforderung zurückgegeben wird, wird die App mit den neuesten Daten aktualisiert.

### Update-App-Logik

Wie bereits erwähnt, muss die App zwei asynchrone Anforderungen starten, eine an den Cache und eine an das Netzwerk. Die App nutzt die `caches` Objekt in `window` den Cache zugreifen und die neuesten Daten abzurufen. Dies ist ein hervorragendes Beispiel für progressive Verbesserungen, da das `caches` Objekt möglicherweise nicht in allen Browsern verfügbar ist. `caches` sollte die Netzwerkanforderung trotzdem funktionieren.

Aktualisieren Sie die `getForecastFromCache()` Funktion, um zu prüfen, ob das `caches` Objekt im globalen `window` Objekt verfügbar ist. Wenn dies der `caches` ist, fordern Sie die Daten vom Cache an.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

Anschließend müssen Sie [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) so ändern, dass es zwei Aufrufe vornimmt, einen für `getForecastFromNetwork()` , um die Prognose vom Netzwerk zu erhalten, und einen für `getForecastFromCache()` , um die letzte zwischengespeicherte Prognose `getForecastFromCache()` :

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

Unsere Wetter-App führt nun zwei asynchrone Datenanfragen aus, eine aus dem Cache und eine über ein `fetch` . Wenn sich Daten im Cache befinden, werden diese zurückgegeben und extrem schnell wiedergegeben (zehn Millisekunden). Wenn der `fetch` antwortet, wird die Karte mit den neuesten Daten direkt von der Wetter-API aktualisiert.

Beachten Sie, dass sowohl die Cache-Anforderung als auch die `fetch` Anforderung mit einem Aufruf zum Aktualisieren der Prognosekarte enden. Woher weiß die App, ob sie die neuesten Daten anzeigt? Dies wird im folgenden Code von `renderForecast()` :

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

Bei jeder Aktualisierung einer Karte speichert die App den Zeitstempel der Daten in einem versteckten Attribut auf der Karte. Die App schlägt nur dann fehl, wenn der bereits auf der Karte vorhandene Zeitstempel neuer ist als die Daten, die an die Funktion übergeben wurden.

### Zwischenspeichern Sie unsere App-Ressourcen

`DATA_CACHE_NAME` im Service-Worker ein `DATA_CACHE_NAME` damit wir unsere Anwendungsdaten von der App-Shell trennen können. Wenn die App-Shell aktualisiert wird und ältere Caches gelöscht werden, bleiben unsere Daten unangetastet und stehen für ein superschnelles Laden bereit. Denken Sie daran, wenn sich Ihr Datenformat in der Zukunft ändert, benötigen Sie einen Weg, um damit umzugehen und sicherzustellen, dass die Shell und der Inhalt der App synchron bleiben.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

Vergessen Sie nicht, auch das `CACHE_NAME` zu aktualisieren. Wir werden auch alle unsere statischen Ressourcen ändern.

Damit unsere App offline arbeiten kann, müssen alle erforderlichen Ressourcen im Voraus zwischengespeichert werden. Dies wird auch unsere Leistung verbessern. Anstatt alle Ressourcen aus dem Netzwerk zu beziehen, kann die App alle Ressourcen aus dem lokalen Cache laden, wodurch jegliche Netzwerkinstabilität beseitigt wird.

Aktualisieren Sie das `FILES_TO_CACHE` Array mit der Liste der Dateien:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

Da wir die Liste der zu speichernden Dateien manuell generieren, müssen wir jedes Mal, wenn wir eine Datei aktualisieren, das `CACHE_NAME` aktualisieren. Wir konnten `offline.html` aus unserer Liste der zwischengespeicherten Dateien entfernen, da unsere App jetzt über alle erforderlichen Ressourcen verfügt, um offline zu arbeiten, und die Offline-Seite nicht mehr angezeigt wird.

Caution: In diesem Beispiel haben wir unseren eigenen Service-Mitarbeiter von Hand gerollt. Bei jeder Aktualisierung der statischen Ressourcen müssen wir den Service-Worker erneut rollen und den Cache aktualisieren. Andernfalls wird der alte Inhalt bereitgestellt. Wenn sich eine Datei ändert, wird außerdem der gesamte Cache ungültig und muss erneut heruntergeladen werden. Das bedeutet, dass durch das Beheben eines einfachen Rechtschreibfehlers mit einem einzelnen Zeichen der Cache ungültig wird und alles erneut heruntergeladen werden muss - nicht gerade effizient. [Workbox](/web/tools/workbox/) erledigt dies auf [Workbox](/web/tools/workbox/) , indem es in Ihren Build-Prozess integriert wird. Nur geänderte Dateien werden aktualisiert. Das spart Bandbreite für Benutzer und vereinfacht die Wartung für Sie!

#### Aktualisieren Sie den Aktivierungsereignishandler

Um sicherzustellen, dass unser `activate` Ereignis nicht versehentlich unsere Daten `service-worker.js` , ersetzen `if (key !== CACHE_NAME) {` im `activate` Ereignis von `service-worker.js` `if (key !== CACHE_NAME) {` durch:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### Aktualisieren Sie den

Wir müssen den Service-Worker so modifizieren, dass er Anfragen an die Wetter-API abfängt und die Antworten im Cache speichert, damit wir später problemlos darauf zugreifen können. Wir erwarten, dass die Antwort auf das Netzwerk die Quelle der Wahrheit ist und uns immer die neuesten Informationen liefert. Wenn dies nicht möglich ist, ist ein Fehler in Ordnung, da wir bereits die neuesten zwischengespeicherten Daten in unserer App abgerufen haben.

Aktualisieren Sie den `fetch` Ereignishandler, um Anforderungen an die Daten-API getrennt von anderen Anforderungen zu behandeln.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

Der Code fängt die Anfrage ab und prüft, ob es sich um eine Wettervorhersage handelt. Ist dies der `fetch` , verwenden Sie `fetch` , um die Anfrage zu stellen. Wenn die Antwort zurückgegeben wird, öffnen Sie den Cache, klonen Sie die Antwort, speichern Sie sie im Cache und senden Sie die Antwort an den ursprünglichen Anforderer zurück.

Wir müssen den `evt.request.mode !== 'navigate'` Check entfernen, da unser Servicemitarbeiter alle Anfragen (einschließlich Bilder, Skripts, CSS-Dateien usw.) behandeln soll, nicht nur Navigationen. Wenn wir den Check-In verlassen, wird nur der HTML-Code aus dem Service-Worker-Cache bereitgestellt, alles andere wird vom Netzwerk angefordert.

### Probieren Sie es aus

Die App sollte jetzt komplett offline funktionieren. Aktualisieren Sie die Seite, um sicherzustellen, dass der neueste Servicemitarbeiter installiert ist. Speichern Sie anschließend einige Städte und klicken Sie auf die Schaltfläche Aktualisieren in der App, um aktuelle Wetterdaten zu erhalten.

Gehen Sie dann zum Bereich __Cache Storage__ im Bereich __Application__ von DevTools. Erweitern Sie den Abschnitt. Auf der linken Seite sollte der Name Ihres statischen Cache und des Datencaches angezeigt werden. Beim Öffnen des Datencaches sollten die für jede Stadt gespeicherten Daten angezeigt werden.

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

Öffnen Sie dann DevTools und wechseln Sie in den Bereich Service Workers. Aktivieren Sie das Kontrollkästchen Offline, versuchen Sie dann, die Seite neu zu laden, gehen Sie dann offline und laden Sie die Seite erneut.

Wenn Sie sich in einem schnellen Netzwerk befinden und sehen möchten, wie Wettervorhersagedaten bei einer langsamen Verbindung aktualisiert werden, setzen Sie die `FORECAST_DELAY` Eigenschaft in `server.js` auf `5000` . Alle Anforderungen an die Prognose-API werden um 5000 ms verzögert.

### Überprüfen Sie die Änderungen mit Lighthouse

Es ist auch eine gute Idee, Lighthouse erneut zu starten.

__SEO Audit__

* __✅ BESTANDEN:__ Das Dokument hat eine Meta-Beschreibung.

__Progressive Web App-Prüfung__

* __✅ BESTANDEN:__ Aktuelle Seite antwortet mit einer 200, wenn sie offline ist.
* __✅ BESTANDEN:__ `start_url` antwortet mit einer 200, wenn es offline ist.
* __✅ BESTANDEN:__ Registriert einen Servicemitarbeiter, der Page und `start_url.` steuert
* __✅ BESTANDEN:__ Das Web-App-Manifest erfüllt die Installationsanforderungen.
* __✅ BESTANDEN:__ Für einen benutzerdefinierten Begrüßungsbildschirm konfiguriert.
* __✅ BESTANDEN:__ Legt die Farbe der Adressleiste fest.

## Installationserfahrung

Wenn eine progressive Webanwendung installiert wird, sieht sie aus und verhält sich wie alle anderen installierten Apps. Es wird an derselben Stelle gestartet wie andere Apps. Es wird in einer App ohne Adressleiste oder andere Browser-Benutzeroberfläche ausgeführt. Und wie bei allen anderen installierten Apps handelt es sich um eine Top-Level-App im Task-Switcher.

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

In Chrome kann eine progressive Webanwendung entweder über das dreipunktige Kontextmenü installiert werden, oder Sie können dem Benutzer eine Schaltfläche oder eine andere UI-Komponente bereitstellen, die ihn zur Installation der App auffordert.

Success: Da das Installationserlebnis im Chrome-Kontextmenü mit drei Punkten etwas verschüttet ist, empfehlen wir, dass Sie in Ihrer App einige Hinweise angeben, um den Benutzer zu informieren, dass Ihre App installiert werden kann, und eine Installationsschaltfläche, um den Installationsvorgang abzuschließen.

### Audit mit Leuchtturm

Damit ein Benutzer Ihre Progressive Web App installieren kann, muss er [certain criteria](/web/fundamentals/app-install-banners/#criteria) erfüllen. Die einfachste Möglichkeit zur Überprüfung besteht darin, Lighthouse zu verwenden und sicherzustellen, dass die installierbaren Kriterien erfüllt werden.

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

Wenn Sie dieses Codelab durchgearbeitet haben, sollte Ihre PWA diese Kriterien bereits erfüllen.

Key Point: Aktivieren Sie für diesen Abschnitt das Kontrollkästchen **Bypass for network** im Bereich **Service Workers** des Bereichs **Application** in DevTools. Wenn diese Option aktiviert ist, umgehen Anforderungen den Service-Mitarbeiter und werden direkt an das Netzwerk gesendet. Dies vereinfacht unseren Entwicklungsprozess, da wir unseren Servicemitarbeiter beim Durcharbeiten dieses Abschnitts nicht aktualisieren müssen.

### install.js zu index.html hinzu

Zuerst fügen wir der `index.html` Datei das `install.js` `index.html` .

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### Hören Sie auf das `beforeinstallprompt` Ereignis

Wenn [criteria](/web/fundamentals/app-install-banners/#criteria) zum Startbildschirm [criteria](/web/fundamentals/app-install-banners/#criteria) wird, [criteria](/web/fundamentals/app-install-banners/#criteria) Chrome ein `beforeinstallprompt` Ereignis aus, das Sie verwenden können, um anzugeben, dass Ihre App &quot;installiert&quot; werden kann, und fordert den Benutzer zur Installation auf. Fügen Sie den folgenden Code hinzu, um auf das `beforeinstallprompt` Ereignis zu hören:

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### Ereignis speichern und Installationsschaltfläche

In unserer `saveBeforeInstallPromptEvent` Funktion speichern wir einen Verweis auf das `beforeinstallprompt` Ereignis, damit wir später `prompt()` darauf aufrufen `prompt()` und unsere Benutzeroberfläche aktualisieren, um die Installationsschaltfläche anzuzeigen.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### Zeigt die Aufforderung an / ### die Schaltfläche aus

Wenn der Benutzer auf die Installationsschaltfläche klickt, müssen wir `.prompt()` für das gespeicherte `beforeinstallprompt` Ereignis `beforeinstallprompt` . Wir müssen auch die Installationsschaltfläche ausblenden, da `.prompt()` für jedes gespeicherte Ereignis nur einmal `.prompt()` kann.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

`.prompt()` Sie `.prompt()` wird dem Benutzer ein modales Dialogfeld `.prompt()` , in dem er aufgefordert wird, Ihre App zum Startbildschirm hinzuzufügen.

### Protokollieren Sie die Ergebnisse

Sie können überprüfen, wie der Benutzer auf das Installationsdialogfeld reagiert hat, indem Sie auf das Versprechen `userChoice` von der `userChoice` Eigenschaft des gespeicherten `beforeinstallprompt` Ereignisses zurückgegeben wird. Das Versprechen gibt ein Objekt mit einer `outcome` Eigenschaft zurück, nachdem die Aufforderung angezeigt wurde und der Benutzer darauf geantwortet hat.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

Ein Kommentar zu `userChoice` , dem [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) , keine Funktion, wie Sie vielleicht erwarten.

#### Alle Installationsereignisse

Neben jeder Benutzeroberfläche, die Sie zur Installation Ihrer App hinzufügen, können Benutzer Ihre PWA auch über andere Methoden installieren, beispielsweise das dreipunktige Menü von Chrome. Um diese Ereignisse zu verfolgen, warten Sie auf das installierte Ereignis.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

Dann müssen wir die `logAppInstalled` Funktion aktualisieren. Für dieses Codelab verwenden wir nur `console.log` . In einer Produktions-App möchten Sie dies jedoch wahrscheinlich mit Ihrer Analysesoftware als Ereignis protokollieren.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### Aktualisieren Sie den Service-Mitarbeiter

Vergessen Sie nicht, das `CACHE_NAME` in Ihrer `service-worker.js` Datei zu aktualisieren, da Sie Änderungen an bereits zwischengespeicherten Dateien vorgenommen haben. Das Aktivieren des Kontrollkästchens &quot;Bypass for network&quot; im Bereich &quot;Service Workers&quot; des Bedienfelds &quot;Anwendung&quot; in DevTools funktioniert in der Entwicklung, hilft aber in der Realität nicht.

### Probieren Sie es aus

Mal sehen, wie unser Installationsschritt verlief. Um sicher zu gehen, verwenden Sie die Schaltfläche __Clear site data__ im Anwendungsfenster von DevTools, um alle Daten zu löschen und sicherzustellen, dass wir neu beginnen. Wenn Sie die App zuvor installiert haben, müssen Sie sie unbedingt deinstallieren. Andernfalls wird das Installationssymbol nicht mehr angezeigt.

#### die Installationsschaltfläche sichtbar ist

Vergewissern Sie sich zunächst, dass unser Installationssymbol ordnungsgemäß angezeigt wird. Probieren Sie dies auf Desktop und Mobile aus.

1. Öffnen Sie die URL in einer neuen Chrome-Registerkarte.
2. Öffnen Sie das Drei-Punkt-Menü von Chrome (neben der Adressleiste).
▢ Stellen Sie sicher, dass im Menü &quot;* Install Weather ... *&quot; angezeigt wird.
3. Aktualisieren Sie die Wetterdaten mithilfe der Aktualisierungsschaltfläche in der oberen rechten Ecke, um sicherzustellen, dass wir die [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) erfüllen.
▢ Stellen Sie sicher, dass das Installationssymbol im App-Header angezeigt wird.

#### Überprüfen Sie, #### die Installationsschaltfläche funktioniert

Als Nächstes stellen wir sicher, dass alles ordnungsgemäß installiert ist und unsere Ereignisse ordnungsgemäß ausgelöst werden. Sie können dies entweder auf dem Desktop oder auf dem Handy tun. Wenn Sie dies auf einem mobilen Gerät testen möchten, stellen Sie sicher, dass Sie das Remote-Debugging verwenden, damit Sie sehen können, was an der Konsole angemeldet ist.

1. Öffnen Sie Chrome und navigieren Sie auf einer neuen Browserregisterkarte zu Ihrem Weather PWA.
2. Öffnen Sie DevTools und wechseln Sie in den Konsolenbereich.
3. Klicken Sie auf die Installationsschaltfläche in der oberen rechten Ecke.
▢ Vergewissern Sie sich, dass die Installationsschaltfläche nicht mehr angezeigt wird.
▢ Vergewissern Sie sich, dass der Installationsdialog für die Installation angezeigt wird.
4. Klicken Sie auf Abbrechen.
▢ Vergewissern Sie sich, dass &quot;* Der Benutzer hat die A2HS-Aufforderung * abgelehnt&quot; in der Konsolenausgabe angezeigt.
▢ Überprüfen Sie, ob die Installationsschaltfläche erneut angezeigt wird.
5. Klicken Sie erneut auf die Schaltfläche &quot;Installieren&quot; und anschließend auf die Schaltfläche &quot;Installieren&quot; im modalen Dialogfeld.
▢ Vergewissern Sie sich, dass &quot;* Der Benutzer hat die A2HS-Eingabeaufforderung * akzeptiert&quot; in der Konsolenausgabe angezeigt.
▢ Vergewissern Sie sich, dass &quot;* Weather App wurde installiert *&quot; in der Konsolenausgabe angezeigt wird.
▢ Stellen Sie sicher, dass die Wetter-App an dem Ort hinzugefügt wird, an dem Sie normalerweise Apps finden.
6. Starten Sie die Wetter-PWA.
▢ Stellen Sie sicher, dass die App als eigenständige App geöffnet wird, entweder in einem App-Fenster auf dem Desktop oder im Vollbildmodus auf dem Mobilgerät.

Wenn Sie auf dem Desktop von localhost aus arbeiten, wird in Ihrem installierten PWA möglicherweise ein Adressbanner angezeigt, da localhost nicht als sicherer Host betrachtet wird.

#### iOS-Installation ordnungsgemäß funktioniert

Lassen Sie uns auch das Verhalten unter iOS überprüfen. Wenn Sie über ein iOS-Gerät verfügen, können Sie dieses verwenden, oder wenn Sie einen Mac verwenden, probieren Sie den mit Xcode verfügbaren iOS-Simulator aus.

1. Öffnen Sie Safari und navigieren Sie in einer neuen Browser-Registerkarte zu Ihrem Wetter-PWA.
2. Klicken Sie auf das *Share*![8ac92dd483c689d3.png](img/8ac92dd483c689d3.png) Taste.
3. Scrollen Sie nach rechts und klicken Sie auf die Schaltfläche *Zum Home-Bildschirm hinzufügen*.
▢ Überprüfen Sie, ob Titel, URL und Symbol korrekt sind.
4. Klicken Sie auf *Hinzufügen.*
▢ Stellen Sie sicher, dass das App-Symbol zum Startbildschirm hinzugefügt wird.
5. Starten Sie die Wetter-PWA vom Startbildschirm aus.
▢ Stellen Sie sicher, dass die App im Vollbildmodus gestartet wird.

### Bonus: Feststellen, ob Ihre App vom Startbildschirm aus gestartet wird

Mit der `display-mode` Medienabfrage können Sie Stile anwenden, je nachdem, wie die App gestartet wurde, oder bestimmen, wie sie mit JavaScript gestartet wurde.

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

Sie können die `display-mode` Medienabfrage auch in [JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) .

### Bonus: Deinstallation Ihrer PWA

Denken Sie daran, dass das `beforeinstallevent` nicht `beforeinstallevent` wird, wenn die App bereits installiert ist. `beforeinstallevent` die App während der Entwicklung wahrscheinlich mehrmals installieren und deinstallieren, um sicherzustellen, dass alles wie erwartet funktioniert.

#### Android

Unter Android werden PWAs auf dieselbe Weise deinstalliert wie andere installierte Apps.

* Öffnen Sie die App-Schublade.
* Scrollen Sie nach unten, um das Wettersymbol zu finden.
* Ziehen Sie das App-Symbol an den oberen Bildschirmrand.
* Wählen Sie *Deinstallieren.*

#### ChromeOS

Unter Chrome OS können PWAs einfach über das Suchfeld des Starters deinstalliert werden.

* Öffnen Sie den Launcher.
* Geben Sie &quot;* Weather *&quot; in das Suchfeld ein. Ihr Wetter-PWA sollte in den Ergebnissen angezeigt werden.
* Klicken Sie mit der rechten Maustaste (Alt-Klick) auf die Wetter-PWA.
* Klicken Sie auf *Aus Chrome entfernen ...*

#### MacOS und Windows

Unter Mac und Windows müssen PWAs über Chrome deinstalliert werden.

* Öffnen Sie in einem neuen Browser-Tab die Apps Chrome: //.
* Klicken Sie mit der rechten Maustaste (Alt-Klick) auf die Wetter-PWA.
* Klicken Sie auf *Aus Chrome entfernen ...*

## Glückwünsche

Herzlichen Glückwunsch, Sie haben Ihre erste progressive Web-App erfolgreich erstellt!

Sie haben ein Web-App-Manifest hinzugefügt, um die Installation zu ermöglichen, und Sie haben einen Service-Mitarbeiter hinzugefügt, um sicherzustellen, dass Ihre PWA immer schnell und zuverlässig ist. Sie haben gelernt, wie Sie mit DevTools eine App überprüfen und wie Sie Ihre Benutzererfahrung verbessern können.

Sie kennen jetzt die wichtigsten Schritte, um eine Webanwendung in eine progressive Webanwendung umzuwandeln.

### Weitere

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### Referenzdokumente

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## gefunden oder Feedback? {: .hide-from-toc }

Helfen Sie uns, unsere Code-Labors zu [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) indem [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) heute ein [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) einreichen. Und danke!

{% include "web/_shared/translation-end.html" %}
