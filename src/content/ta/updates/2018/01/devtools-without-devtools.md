project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use Puppeteer to launch Chromium with DevTools features enabled.
<span lang="ta-x-mtfrom-en">

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

இருப்பினும், நீங்கள் Chromium ஐ துவக்கும் {:.external} ஸ்கிரிப்ட், ஒரு ரிமோட் டெப்கேஜிங் க்ளையன்ட்டைத் திறந்து, நீங்கள் விரும்பும் DevTools அம்சத்தை ([Chrome DevTools Protocol][puppeteer] PRAGMAS1 வழியாக) இயக்கும் போது, ​​நீங்கள் * [Puppeteer] வெளிப்படையாக எப்போதும் DevTools ஐ திறக்கவில்லை.

____DEFS__ 0
____DEFS__ 0

உதாரணமாக, கீழே உள்ள ஸ்கிரிப்ட் கீழே உள்ள வீடியோவில் பார்க்கும் போது DevTools ஒருபோதும் திறக்காத போதிலும், கீழே உள்ள ஸ்கிரிப்ட் என்னை [FPS Meter][FPS] மேலோட்டப் பார்வைக்கு மேலடுக்கில் அனுமதிக்கிறது.

____DEFS__ 0

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

இது Chrome DevTools நெறிமுறை வழியாக நீங்கள் அணுகக்கூடிய பல DevTools அம்சங்களில் ஒன்றாகும்.

ஒரு பொது ஆலோசனையை: ஒரு DevTools நெறிமுறை கிளையன்னை உருவாக்குவதற்கு முன்னர் [Puppeteer API][API] PRAGMAS ஐப் பார்க்கவும். Puppeteer ஏற்கனவே பல DevTools அம்சங்களுக்கான API களை அர்ப்பணித்துள்ளது, [குறியீடு கவரேஜ்][coverage]{:.external} மற்றும் [குறுக்கீடு ** கன்சோல் ** செய்திகளை][console] PRAGMAS2 போன்றவை.

____DEFS__ 0
____DEFS__ 0
____DEFS__ 0

நீங்கள் ஒரு DevTools அம்சத்தை Puppeteer வழியாக அணுக விரும்பினால், [0] {:.external} [Stack Overflow] இல் ஒரு கேள்வியை கேளுங்கள்.

DevTools நெறிமுறையைப் பயன்படுத்தும் ஒரு நாய்க்குட்டி ஸ்கிரிப்ட்டை நீங்கள் காட்ட விரும்பினால், [@ChromeDevTools][twitter] PRAGMAS இல் எங்களுக்கு ட்வீட் செய்கிறீர்கள்.

____DEFS__ 0
____DEFS__ 0

{% include "web/_shared/rss-widget-updates.html" %}

</span>