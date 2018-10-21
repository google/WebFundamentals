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

# Menggunakan Fitur DevTools Tanpa Membuka DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Saya biasanya melihat pertanyaan di sepanjang baris &quot;Saya sangat suka fitur X DevTools, tetapi berhenti bekerja ketika saya menutup DevTools. Bagaimana cara menjaga fitur X berjalan bahkan ketika DevTools ditutup?&quot;

Jawaban singkatnya adalah: Anda mungkin tidak bisa.

Namun, Anda * dapat * meretas skrip [Puppeteer][puppeteer]{:.external} yang meluncurkan Chromium, membuka klien debug jarak jauh, lalu mengaktifkan fitur DevTools yang Anda sukai (melalui [Chrome DevTools Protocol][CDP]{:.external} ), tanpa pernah secara eksplisit membuka DevTools.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Misalnya, skrip di bawah ini memungkinkan saya menghamparkan [FPS Meter][FPS] di atas kanan atas area pandang, meskipun DevTools tidak pernah terbuka, seperti yang dapat Anda lihat dalam video di bawah ini.

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

Ini hanyalah salah satu dari sekian banyak fitur DevTools yang dapat Anda akses secara potensial melalui Chrome DevTools Protocol.

Saran umum: periksa [Puppeteer API][API]{:.external} sebelum beralih ke membuat klien Protokol DevTools. Dalang sudah memiliki API khusus untuk banyak fitur DevTools, seperti [code coverage][coverage]{:.external} dan [intercepting **Console** messages][console]{:.external} .

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Jika Anda membutuhkan bantuan mengakses fitur DevTools melalui Puppeteer, [ask a question on Stack Overflow][SO]{:.external} .

Jika Anda ingin memamerkan skrip Puppeteer yang memanfaatkan Protokol DevTools, tweet kami di [@ChromeDevTools][twitter]{:.external} .

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}