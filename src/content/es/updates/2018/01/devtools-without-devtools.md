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

# Uso de las funciones de DevTools sin abrir DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Normalmente veo preguntas en la línea de "Realmente me gusta la función X de DevTools, pero deja de funcionar cuando cierro DevTools. ¿Cómo mantengo la función X en funcionamiento incluso cuando DevTools está cerrado?"

La respuesta corta es: probablemente no puedas.

Sin embargo, usted * puede * piratear una secuencia de comandos de [Puppeteer][puppeteer]{:.external} que inicia Chromium, abre un cliente de depuración remoto y luego activa la función DevTools que le gusta (a través del [Protocolo de Chrome DevTools][CDP]{:.external}), sin nunca abrir explícitamente DevTools.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Por ejemplo, la siguiente secuencia de comandos me permite superponer [FPS Meter][FPS] sobre la parte superior derecha de la ventana gráfica, aunque DevTools nunca se abre, como puede ver en el video a continuación.

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

Esta es solo una de las muchas, muchas características de DevTools a las que potencialmente puede acceder a través del protocolo de Chrome DevTools.

Una sugerencia general: echa un vistazo a la [Puppeteer API][API]{:.external} antes de volver a crear un cliente de protocolo DevTools. Puppeteer ya tiene API dedicadas para muchas funciones de DevTools, como [cobertura de código][coverage]{:.external} y [interceptación ** de la consola ** mensajes][console]{:.external}.

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Si necesita ayuda para acceder a una función de DevTools a través de Puppeteer, [haga una pregunta sobre el desbordamiento de pila][SO]{:.external}.

Si desea mostrar un script de Puppeteer que hace uso del Protocolo de DevTools, envíenos un tweet a [@ChromeDevTools][twitter]{:.external}.

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}