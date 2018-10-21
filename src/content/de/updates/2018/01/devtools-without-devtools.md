project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use Puppeteer to launch Chromium with DevTools features enabled.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-22 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Use Puppeteer to launch Chromium with DevTools features enabled. #}
{# wf_blink_components: Platform>DevTools, Internals>Headless #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Verwenden von DevTools-Funktionen ohne Öffnen von DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Ich sehe häufig Fragen in der Art von &quot;Ich mag Feature X von DevTools wirklich, aber es funktioniert nicht mehr, wenn ich DevTools schließe. Wie kann ich Feature X laufen lassen, selbst wenn DevTools geschlossen ist?&quot;

Die kurze Antwort ist: Sie können wahrscheinlich nicht.

Sie können * jedoch * ein [Puppeteer][puppeteer]{:.external} Skript zusammenhacken, das Chromium startet, einen Remote-Debugging-Client öffnet und anschließend die DevTools-Funktion aktiviert, die Ihnen gefällt (über [Chrome DevTools Protocol][CDP]{:.external} ), ohne DevTools explizit zu öffnen.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Mit dem unten stehenden Skript kann ich zum Beispiel die [FPS Meter][FPS] über der rechten oberen [FPS Meter][FPS] des Ansichtsfensters überlagern, obwohl DevTools niemals geöffnet wird, wie Sie im folgenden Video sehen können.

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

<style>
  video { width: 100%; }
</style>

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/devtools.mp4">
</video>

Dies ist nur eine von vielen, vielen DevTools-Funktionen, auf die Sie möglicherweise über das Chrome DevTools-Protokoll zugreifen können.

Ein allgemeiner Vorschlag: Überprüfen Sie die [Puppeteer API][API]{:.external} bevor Sie einen DevTools-Protokoll-Client erstellen. Puppenspieler verfügt bereits über dedizierte APIs für viele DevTools-Funktionen wie [code coverage][coverage]{:.external} und [intercepting **Console** messages][console]{:.external} .

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Wenn Sie Hilfe benötigen, um eine DevTools-Funktion über Puppeteer, [ask a question on Stack Overflow][SO]{:.external} , zu [ask a question on Stack Overflow][SO]{:.external} .

Wenn Sie ein Puppenspieler-Skript, das das DevTools-Protokoll verwendet, zeigen möchten, twittern Sie uns unter [@ChromeDevTools][twitter]{:.external} .

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}