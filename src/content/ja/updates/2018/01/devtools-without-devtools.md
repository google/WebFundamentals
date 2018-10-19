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

# DevToolsを開くことなくDevTools機能を使用す {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

「DevToolsの機能Xが本当に好きですが、DevToolsを閉じると機能が停止しますが、DevToolsが閉じても機能Xを実行するにはどうしたらいいですか？

短い答えは、おそらくできないことです。

しかし、Chromiumを起動し、リモートデバッグクライアントを開き、[DevToolsプロトコル][puppeteer]{:.external}を介して）あなたが好きなDevTools機能をオンにする[Puppeteer][CDP]{:.external}スクリプトを一緒にハックすることができますDevToolsを明示的に開くことはありません。

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

たとえば、下のスクリプトで見られるように、DevToolsが開かないにもかかわらず、以下のスクリプトでは、[FPSメーター][FPS]をビューポートの右上に重ねることができます。

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

これは、DevToolsの多くの機能のうちの1つで、Chrome DevToolsプロトコル経由でアクセスすることができます。

一般的な提案:DevToolsプロトコルクライアントを作成する前に[Puppeteer API][API]{:.external}をチェックしてください。 Puppeteerは、[コードカバレッジ][coverage]{:.external}と[インターセプト**コンソール**メッセージ][console]{:.external}など、DevToolsの多くの機能に専用のAPIを既に持っています。

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Puppeteerを介してDevTools機能にアクセスするための助けが必要な場合は、[Stack Overflowに関する質問をしてください][SO]{:.external}。

DevToolsプロトコルを利用したPuppeteerスクリプトを見せたいのであれば、[@ChromeDevTools][twitter]{:.external}でつぶやいてください。

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}