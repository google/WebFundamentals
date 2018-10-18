project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use Puppeteer to launch Chromium with DevTools features enabled.

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-22 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Use Puppeteer to launch Chromium with DevTools features enabled. #}
{# wf_blink_components: Platform>DevTools, Internals>Headless #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Verwenden von DevTools-Funktionen ohne Öffnen von DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Ich sehe häufig Fragen in der Art von "Ich mag Feature X von DevTools wirklich, aber es funktioniert nicht mehr, wenn ich DevTools schließe. Wie kann ich Feature X laufen lassen, selbst wenn DevTools geschlossen ist?"

Die kurze Antwort ist: Sie können wahrscheinlich nicht.

Sie können * jedoch * ein [Puppenspieler][puppeteer]{:.external}-Skript zusammenhacken, das Chromium startet, einen Remote-Debugging-Client öffnet und dann die DevTools-Funktion aktiviert, die Ihnen gefällt (über das [Chrome DevTools Protocol][CDP] PRAGMAS1), ohne jemals DevTools explizit zu öffnen.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Mit dem folgenden Skript kann ich zum Beispiel das [FPS Meter][FPS] oben rechts im Ansichtsfenster überlagern, obwohl DevTools niemals geöffnet wird, wie Sie im folgenden Video sehen können.

[FPS]: /web/tools/chrome-devtools/evaluate-performance/reference#fps-meter

    // Node.js version: 8.9.4
    const puppeteer = require('puppeteer'); // version 1.0.0

    (async () => {
      // Prevent Puppeteer from showing the "Chrome is being controlled by automated test
      // software" prompt, but otherwise use Puppeteer's default args.
      const args = await puppeteer.defaultArgs().filter(flag => flag !== '--enable-automation');
      const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: true,
        args
      });
      const page = await browser.newPage();
      const devtoolsProtocolClient = await page.target().createCDPSession();
      await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });
      await page.goto('https://developers.google.com/web/tools/chrome-devtools');
    })();

<style>   video { width: 100%; } </style>

<video controls>   <source src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/devtools.mp4"> </video>

Dies ist nur eine von vielen, vielen DevTools-Funktionen, auf die Sie möglicherweise über das Chrome DevTools-Protokoll zugreifen können.

Ein allgemeiner Vorschlag: Überprüfen Sie die [Puppeteer-API][API]{:.external}, bevor Sie einen DevTools-Protokoll-Client erstellen. Puppeteer verfügt bereits über dedizierte APIs für viele DevTools-Funktionen, wie [Code coverage][coverage] PRAGMAS1 und [abfangende ** Konsolen ** -Nachrichten][console] PRAGMAS2.

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Wenn Sie Hilfe beim Zugriff auf eine DevTools-Funktion über Puppenspieler benötigen, [stellen Sie eine Frage zu Stapelüberlauf][SO]{:.external}.

Wenn Sie ein Puppenspieler-Skript, das das DevTools-Protokoll verwendet, vorführen möchten, senden Sie uns eine Nachricht unter [@ChromeDevTools][twitter]{:.external}.

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}
