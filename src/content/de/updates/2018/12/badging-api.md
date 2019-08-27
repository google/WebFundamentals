project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Die Badging-API ist eine neue Webplattform-API, mit der installierte
  Web-Apps ein anwendungsweites Badge festlegen können, das an einem betriebssystemspezifischen
  Ort angezeigt wird, der der Anwendung zugeordnet ist, z. B. im Regal oder auf dem
  Startbildschirm.

{# wf_published_on: 2018-12-11 #} {# wf_updated_on: 2019-08-21 #} {#
wf_featured_image: /web/updates/images/generic/notifications.png #} {# wf_tags:
capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials
#} {# wf_featured_snippet: The Badging API is a new web platform API that allows
installed web apps to set an application-wide badge, shown in an
operating-system-specific place associated with the application, such as the
shelf or home screen. Badging makes it easy to subtly notify the user that there
is some new activity that might require their attention, or it can be used to
indicate a small amount of information, such as an unread count. #} {#
wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# Badging für App-Symbole {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">Wir arbeiten derzeit im Rahmen des neuen <a
href="/web/updates/capabilities">Capabilities-Projekts</a> an dieser API. Ab
Chrome 73 ist sie als <a href="#ot"><b>Origin-Testversion</b></a> verfügbar.
Dieser Beitrag wird mit der Weiterentwicklung der Badging-API aktualisiert. <br>
<b>Zuletzt aktualisiert:</b> 21. August 2019</aside>

## Was ist die Badging-API? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
<figcaption>Beispiel für Twitter mit 8 Benachrichtigungen und einer weiteren
App, die ein Kennzeichentyp-Abzeichen zeigt.</figcaption>
</figure>

Die Badging-API ist eine neue Webplattform-API, mit der installierte Web-Apps
ein anwendungsweites Badge festlegen können, das an einem
betriebssystemspezifischen Ort angezeigt wird, der der Anwendung zugeordnet ist
(z. B. im Regal oder auf dem Startbildschirm).

Mit der Badging-Funktion können Sie den Benutzer auf subtile Weise darüber
informieren, dass neue Aktivitäten erforderlich sind, oder eine kleine Menge an
Informationen angeben, z. B. eine ungelesene Anzahl.

Ausweise sind in der Regel benutzerfreundlicher als Benachrichtigungen und
können häufiger aktualisiert werden, da sie den Benutzer nicht unterbrechen. Und
weil sie den Benutzer nicht unterbrechen, ist keine spezielle Erlaubnis
erforderlich, um sie zu verwenden.

[Erklärung lesen](https://github.com/WICG/badging/blob/master/explainer.md) {:
.button .button-primary }

<div class="clearfix"></div>

### Vorgeschlagene Anwendungsfälle für die Badging-API {: #use-cases }

Beispiele für Websites, die diese API verwenden können, sind:

- Chat, E-Mail und soziale Apps, um zu signalisieren, dass neue Nachrichten
eingegangen sind, oder um die Anzahl der ungelesenen Nachrichten anzuzeigen.
- Produktivitäts-Apps, um anzuzeigen, dass eine lang andauernde
Hintergrundaufgabe (z. B. das Rendern eines Bilds oder Videos) abgeschlossen
wurde.
- Spiele, um anzuzeigen, dass eine Spieleraktion erforderlich ist (z. B. im
Schach, wenn der Spieler an der Reihe ist).

## Aktueller Status {: #status }

Schritt | Status
--- | ---
1. Erklärer erstellen | [Komplett](https://github.com/WICG/badging/blob/master/explainer.md)
2. Erstellen Sie einen ersten Entwurf der Spezifikation | [Komplett](https://wicg.github.io/badging/)
**3. Sammeln Sie Feedback und wiederholen Sie das Design** | [**In Bearbeitung**](#feedback)
**4. Origin-Studie** | [**In Bearbeitung**](#ot)
5. Starten Sie | Nicht angefangen

### Sehen Sie es in Aktion

1. Öffnen [Sie](https://badging-api.glitch.me/) mit Chrome 73 oder höher unter
Windows oder Mac die [Demo](https://badging-api.glitch.me/) der
[Badging-API](https://badging-api.glitch.me/) .
2. Wenn Sie dazu aufgefordert werden, klicken **Sie** auf Installieren, um die
App zu installieren, oder verwenden Sie das Chrome-Menü, um sie zu installieren,
und öffnen Sie sie als installierte PWA. Beachten Sie, dass es als installiertes
PWA ausgeführt werden muss (in Ihrer Taskleiste oder im Dock).
3. Klicken Sie auf die Schaltfläche **Festlegen** oder **Löschen** , um das
Abzeichen über das App-Symbol festzulegen oder zu löschen. Sie können auch eine
Nummer für den *Ausweiswert eingeben* .

Hinweis: Während für die Badging-API *in Chrome* eine installierte App mit einem
Symbol erforderlich ist, das tatsächlich als Badge gekennzeichnet werden kann,
wird davon abgeraten, die Badging-API abhängig vom Installationsstatus
aufzurufen. Das Badging API kann *überall* ein Browser anwenden könnte ein
Abzeichen zeigen will, so dass Entwickler sollten keine Annahmen darüber, in
welchen Situationen die Browser - Abzeichen Arbeit machen. Rufen Sie einfach die
API auf, wenn sie existiert. Wenn es funktioniert, funktioniert es. Wenn nicht,
tut es einfach nicht.

## Verwendung der Badging-API {: #use }

Ab Chrome 73 ist die Badging-API als Origin-Testversion für Windows (7+) und
MacOS verfügbar. [Mithilfe von
Origin-Tests](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md)
können Sie neue Funktionen ausprobieren und uns und der Community für
Webstandards Feedback zu Benutzerfreundlichkeit, Praktikabilität und
Effektivität geben. Weitere Informationen finden Sie im [Origin Trials-Handbuch
für
Webentwickler](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
.

### Unterstützung für plattformübergreifendes Badging

Die Badging-API wird (in einer ursprünglichen Testversion) unter Windows und
MacOS unterstützt. Android wird nicht unterstützt, da Sie dazu aufgefordert
werden, eine Benachrichtigung anzuzeigen. Dies kann sich jedoch in Zukunft
ändern. Für die Unterstützung von Chrome OS steht die Implementierung von
Badging auf der Plattform noch aus.

### Registrieren Sie sich für den Ursprungsversuch {: #ot }

1. [Fordern Sie ein
Token](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
für Ihre Herkunft an.
2. Fügen Sie das Token zu Ihren Seiten hinzu. Es gibt zwei Möglichkeiten, dieses
Token auf allen Seiten in Ihrem Ursprung bereitzustellen:
-  Fügen Sie ein `origin-trial` `<meta>` -Tag am Kopf einer beliebigen Seite
hinzu. Dies könnte beispielsweise so aussehen: `<meta http-equiv="origin-trial"
content="TOKEN_GOES_HERE">`
-  Wenn Sie Ihren Server konfigurieren können, können Sie das Token auch
über einen `Origin-Trial` HTTP-Header auf Seiten bereitstellen. Der
resultierende `Origin-Trial: TOKEN_GOES_HERE` so aussehen: `Origin-Trial:
TOKEN_GOES_HERE`

### Alternativen zum Ursprungsversuch

Wenn Sie ohne eine ursprüngliche Testversion lokal mit der Badging-API
experimentieren möchten, aktivieren Sie das Flag
`#enable-experimental-web-platform-features` in `chrome://flags` .

### Verwenden der Badging-API während des Ursprungsversuchs

Hundefutter: Während des Ursprungsversuchs wird die API über
`window.ExperimentalBadge` verfügbar `window.ExperimentalBadge` . Der folgende
Code basiert auf dem aktuellen Design und wird geändert, bevor er als
standardisierte API im Browser landet.

Um die Badging-API verwenden zu können, muss Ihre Web-App [die
Installationskriterien von Chrome
erfüllen](/web/fundamentals/app-install-banners/#criteria) und ein Nutzer muss
sie seinem Startbildschirm hinzufügen.

Die `ExperimentalBadge` Schnittstelle ist ein Member-Objekt in `window` . Es
enthält zwei Methoden:

- `set([number])` : Legt das Abzeichen der App fest. Wenn ein Wert angegeben
wird, stellen Sie das Abzeichen auf den angegebenen Wert ein, andernfalls wird
ein weißer Punkt (oder eine andere für die Plattform geeignete Flagge)
angezeigt.
- `clear()` : Entfernt das App-Abzeichen.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` und `ExperimentalBadge.clear()` können von einer
Vordergrundseite oder möglicherweise in Zukunft von einem Servicemitarbeiter
aufgerufen werden. In beiden Fällen betrifft dies die gesamte App und nicht nur
die aktuelle Seite.

In einigen Fällen lässt das Betriebssystem möglicherweise nicht die exakte
Darstellung des Ausweises zu. In diesem Fall versucht der Browser, die beste
Darstellung für dieses Gerät bereitzustellen. Während beispielsweise die
Badging-API unter Android nicht unterstützt wird, zeigt Android immer nur einen
Punkt anstelle eines numerischen Werts an.

Hinweis: Gehen Sie nicht davon aus, wie der Benutzeragent das Abzeichen anzeigen
möchte. Wir erwarten, dass einige Benutzerprogramme eine Zahl wie "4000"
annehmen und als "99+" umschreiben. Wenn Sie es selbst sättigen (zum Beispiel
auf "99"), wird das "+" nicht angezeigt. `Badge.set(unreadCount)` der
tatsächlichen Anzahl setzen `Badge.set(unreadCount)` einfach
`Badge.set(unreadCount)` und `Badge.set(unreadCount)` Sie es dem
Benutzeragenten, diese entsprechend anzuzeigen.

## Feedback {: #feedback }

Wir benötigen Ihre Hilfe, um sicherzustellen, dass die Badging-API Ihren
Anforderungen entspricht und wir keine Schlüsselszenarien verpassen.

<aside class="key-point"><b>Wir brauchen deine Hilfe!</b> - Wird das aktuelle
Design (entweder eine Ganzzahl oder einen Flag-Wert zulassen) Ihren
Anforderungen entsprechen? Wenn dies nicht der <a
href="https://github.com/WICG/badging/issues">Fall ist, reichen</a> Sie bitte
ein Problem im <a href="https://github.com/WICG/badging/issues">WICG /
Badging-Repo ein</a> und geben Sie so viele Details wie möglich an. Darüber
hinaus werden noch einige <a
href="https://github.com/WICG/badging/blob/master/choices.md">offene Fragen</a>
diskutiert, und wir würden uns über Ihr Feedback freuen.</aside>

Wir sind auch interessiert zu erfahren, wie Sie die Badging-API verwenden
möchten:

- Haben Sie eine Idee für einen Anwendungsfall oder eine Idee, wo Sie ihn
verwenden würden?
- Planen Sie dies zu verwenden?
- Gefällt es dir und willst du deine Unterstützung zeigen?

Teilen Sie Ihre Gedanken in der Diskussion zum [Badging
API-WICG-Diskurs](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900)
mit.

{% include "web/_shared/helpful.html" %}

## Hilfreiche Links {: #helpful }

- [Öffentlicher
Erklärer](https://github.com/WICG/badging/blob/master/explainer.md)
- [Badging API Demo](https://badging-api.glitch.me/) | [Badging API
Demo-Quelle](https://glitch.com/edit/#!/badging-api?path=demo.js)
-
[Tracking-Fehler](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
-
[ChromeStatus.com-Eintrag](https://www.chromestatus.com/features/6068482055602176)
- Fordern Sie ein [Origin-Test-Token
an](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481)
- [So verwenden Sie ein
Origin-Test-Token](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- Blink-Komponente: `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
