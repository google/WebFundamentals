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

# Utilisation des fonctionnalités de DevTools sans ouvrir DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Je vois souvent des questions du type "J'aime beaucoup la fonctionnalité X de DevTools, mais elle cesse de fonctionner lorsque je ferme DevTools. Comment faire pour que la fonctionnalité X reste active même lorsque DevTools est fermé?"

La réponse courte est: vous ne pouvez probablement pas.

Cependant, vous * pouvez * pirater un script {:.external} [Puppeteer][puppeteer] qui lance Chromium, ouvre un client de débogage distant, puis active la fonctionnalité DevTools que vous aimez (via le [Protocole Chrome DevTools][CDP]{:.external}), sans jamais ouvrir explicitement DevTools.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Par exemple, le script ci-dessous me permet de superposer le [mètre FPS][FPS] en haut à droite de la fenêtre, même si DevTools ne s'ouvre jamais, comme le montre la vidéo ci-dessous.

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

<style>  video { width: 100%; } </style>

<video controls>  <source src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/devtools.mp4"> </video>

Il ne s'agit que de l'une des nombreuses fonctionnalités de DevTools auxquelles vous pouvez potentiellement accéder via le protocole Chrome DevTools.

Une suggestion générale: consultez l'API [Puppeteer][API]{:.external} avant de créer un client de protocole DevTools. Puppeteer dispose déjà d’API dédiées à de nombreuses fonctionnalités de DevTools, telles que [couverture de code][coverage]{:.external} et [messages interceptant ** Console **][console]{:.external}.

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Si vous avez besoin d'aide pour accéder à une fonctionnalité de DevTools via Puppeteer, [posez une question sur le dépassement de capacité de la pile][SO]{:.external}.

Si vous voulez montrer un script Puppeteer qui utilise le protocole DevTools, envoyez-nous un tweet à l'adresse [@ChromeDevTools][twitter]{:.external}.

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}