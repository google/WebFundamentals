project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use Puppeteer to launch Chromium with DevTools features enabled.
{% include "web/_shared/translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-22 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Use Puppeteer to launch Chromium with DevTools features enabled. #}
{# wf_blink_components: Platform>DevTools, Internals>Headless #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools {: .page-title } திறந்து இல்லாமல் DevTools அம்சங்கள் பயன்படுத்தி

{% include "web/_shared/contributors/kaycebasques.html" %}

DevTools இன் அம்சம் X ஐ நான் விரும்புகிறேன், ஆனால் நான் DevTools ஐ மூடும்போது அது பணிபுரியும். DevTools மூடப்பட்டிருக்கும்போதே இயங்கும் X ஐ எவ்வாறு வைத்திருக்கிறேன்? "

குறுகிய பதில்: நீங்கள் ஒருவேளை முடியாது.

எனினும், நீங்கள் Chromium ஐ துவக்கும் {:.external} ஸ்கிரிப்ட், ஒரு ரிமோட் டெப்கேஜிங் க்ளையன்ட்டைத் திறந்து, நீங்கள் (Chrome DevTools Protocol [1] PRGMS1 வழியாக) விரும்பும் DevTools அம்சத்தைத் திறக்கும் போது, ​​* [Puppeteer][puppeteer] வெளிப்படையாக எப்போதும் DevTools ஐ திறக்கவில்லை.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

உதாரணமாக, கீழே உள்ள ஸ்கிரிப்ட் கீழே உள்ள வீடியோவில் பார்க்கும் போது DevTools ஒருபோதும் திறக்காத போதிலும், கீழே உள்ள ஸ்கிரிப்ட் என்னை [FPS Meter][FPS] மேலோட்டப் பார்வைக்கு மேலடுக்கில் அனுமதிக்கிறது.

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

இது Chrome DevTools நெறிமுறை வழியாக நீங்கள் அணுகக்கூடிய பல DevTools அம்சங்களில் ஒன்றாகும்.

ஒரு பொது ஆலோசனை: DevTools நெறிமுறை கிளையன்னை உருவாக்குவதற்கு முன்னர் {:.external} [Puppeteer API][API] ஐப் பார்க்கவும். PRPMSMS [PRGMS1 [PRGMS1] மற்றும் [கன்சோல் ** செய்திகளை இடைமறிக்கும் [PRGMS2] போன்ற பல DevTools அம்சங்களுக்கான API களை ஏற்கனவே பப்ளிடியர் அர்ப்பணித்துள்ளது.

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

நீங்கள் ஒரு DevTools அம்சத்தை Puppeteer வழியாக அணுக வேண்டுமென்றால், [{:.external}][Stack Overflow] இல் ஒரு கேள்வியை கேளுங்கள்.

DevTools நெறிமுறையைப் பயன்படுத்துகின்ற ஒரு நாய்க்குட்டி ஸ்கிரிப்ட்டை நீங்கள் காட்ட விரும்பினால், [@ChromeDevTools][twitter]{:.external} இல் எங்களுக்கு ட்வீட் செய்யுங்கள்.

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}