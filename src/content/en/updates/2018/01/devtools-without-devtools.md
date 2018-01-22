project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use Puppeteer to launch Chromium with DevTools features enabled.

{# wf_updated_on: 2018-01-22 #}
{# wf_published_on: 2018-01-22 #}
{# wf_tags: devtools,puppeteer #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Use Puppeteer to launch Chromium with DevTools features enabled. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Using DevTools Features Without Opening DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

I commonly see questions along the lines of "I really like X feature of DevTools, but it
stops working when I close DevTools. How do I keep that feature running even when DevTools
is closed?"

The short answer is: you probably can't.

However, you *can* hack together a [Puppeteer][puppeteer]{:.external} script that launches
Chromium, opens a remote debugging client, then turns on the DevTools feature that you like
(via the [Chrome DevTools Protocol][CDP]{:.external}), without ever explicitly opening DevTools.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

For example, the script below lets me overlay the [FPS Meter][FPS] on top of the viewport,
even though DevTools never opens, as you can see in the video below.

[FPS]: /web/tools/chrome-devtools/evaluate-performance/reference#fps-meter

    // Node.js version: 8.9.4
    const puppeteer = require('puppeteer'); // version 1.0.0
    
    (async () => {
      // Prevent Puppeteer from showing the "Chrome is being controlled by automated test
      // software" prompt, but otherwise use Puppeteer's default args.
      const args = puppeteer.defaultArgs().filter(flag => flag !== '--enable-automation');
      const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: true,
        args: args
      });
      const page = await browser.newPage();
      const client = await page.target().createCDPSession();
      client.send('Overlay.setShowFPSCounter', { show: true });
      await page.goto('https://developers.google.com/web/tools/chrome-devtools');
    })();

<div class="video-wrapper-full-width">
  <video controls>
    <source src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/devtools.mp4">
  </video>
</div>
