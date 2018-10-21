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

# Использование функций DevTools без открытия DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Я часто встречаю вопросы по строкам «Мне очень нравится функция X DevTools, но она перестает работать, когда я закрываю DevTools. Как мне сохранить функцию X, даже когда DevTools закрыт?»

Короткий ответ: вы, вероятно, не можете.

Однако вы можете * взломать скрипт [Puppeteer][puppeteer]{:.external} который запускает Chromium, открывает удаленный отладочный клиент, а затем включает функцию DevTools, которая вам нравится (через [Chrome DevTools Protocol][CDP]{:.external} ), без явного открытия DevTools.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Например, приведенный ниже сценарий позволяет мне накладывать [FPS Meter][FPS] поверх правого окна просмотра, хотя DevTools никогда не открывается, как вы можете видеть в видео ниже.

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

Это всего лишь одна из многих функций DevTools, доступ к которой вы можете получить через протокол Chrome DevTools.

Общее предложение: ознакомьтесь с [Puppeteer API][API]{:.external} прежде чем [Puppeteer API][API]{:.external} к созданию клиента протокола DevTools. Puppeteer уже имеет специальные API для многих функций DevTools, таких как [code coverage][coverage]{:.external} и [intercepting **Console** messages][console]{:.external} .

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Если вам нужна помощь в доступе к функции DevTools через Puppeteer, [ask a question on Stack Overflow][SO]{:.external} .

Если вы хотите показать сценарий Puppeteer, который использует протокол DevTools, [@ChromeDevTools][twitter]{:.external} нам на [@ChromeDevTools][twitter]{:.external} .

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}