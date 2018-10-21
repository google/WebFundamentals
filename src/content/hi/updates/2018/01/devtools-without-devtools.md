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

# DevTools खोले बिना DevTools सुविधाओं का उपयोग करना {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

मैं आमतौर पर &quot;मुझे वास्तव में DevTools की विशेषता एक्स पसंद है, लेकिन यह DevTools बंद करते समय काम करना बंद कर देता है। मैं DevTools बंद होने पर भी सुविधा एक्स को कैसे चला सकता हूं?&quot;

संक्षिप्त जवाब है: आप शायद नहीं कर सकते हैं।

हालांकि, आप * [Puppeteer][puppeteer]{:.external} स्क्रिप्ट को एक साथ जोड़ सकते हैं जो क्रोमियम लॉन्च करता है, एक रिमोट डीबगिंग क्लाइंट खोलता है, फिर DevTools को स्पष्ट रूप से खोलने के बिना, जिसे आप पसंद करते हैं ( [Chrome DevTools Protocol][CDP]{:.external} माध्यम से) DevTools सुविधा को चालू करता है।

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

उदाहरण के लिए, नीचे दी गई स्क्रिप्ट मुझे व्यूपोर्ट के ऊपरी दाएं [FPS Meter][FPS] पर [FPS Meter][FPS] को ओवरले करने [FPS Meter][FPS] , भले ही DevTools कभी नहीं खुलती है, जैसा कि आप नीचे दिए गए वीडियो में देख सकते हैं।

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

यह केवल कई में से एक है, कई देवटूल की विशेषताएं हैं जिन्हें आप संभावित रूप से क्रोम देवटूल प्रोटोकॉल के माध्यम से एक्सेस कर सकते हैं।

एक सामान्य सुझाव: DevTools प्रोटोकॉल क्लाइंट बनाने का सहारा लेने से पहले [Puppeteer API][API]{:.external} । Puppeteer पहले से ही कई DevTools सुविधाओं, जैसे [code coverage][coverage]{:.external} और [intercepting **Console** messages][console]{:.external} लिए समर्पित एपीआई है।

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

यदि आपको [ask a question on Stack Overflow][SO]{:.external} , [ask a question on Stack Overflow][SO]{:.external} माध्यम से DevTools सुविधा तक पहुंचने में सहायता [ask a question on Stack Overflow][SO]{:.external} ।

यदि आप एक Puppeteer स्क्रिप्ट को दिखाना चाहते हैं जो DevTools प्रोटोकॉल का उपयोग करता है, तो हमें [@ChromeDevTools][twitter]{:.external} पर ट्वीट करें।

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}