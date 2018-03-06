project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

New features coming to DevTools in Chrome 65 include:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Read on, or watch the video version of these release notes, below.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Local Overrides {: #overrides }

**Local Overrides** let you make changes in DevTools, and keep those changes across page loads.
Previously, any changes that you made in DevTools would be lost when you reloaded the page.
**Local Overrides** work for most file types, with a couple of exceptions. See
[Limitations](#overrides-limitations).

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

How it works:

* You specify a directory where DevTools should save changes.
* When you make changes in DevTools, DevTools saves a copy of the modified file to your
  directory.
* When you reload the page, DevTools serves the local, modified file, rather than the network
  resource.

To set up **Local Overrides**:

1. Open the **Sources** panel.
1. Open the **Overrides** tab.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Click **Setup Overrides**.
1. Select which directory you want to save your changes to.
1. At the top of your viewport, click **Allow** to give DevTools read and write access to the
   directory.
1. Make your changes.

### Limitations {: #overrides-limitations }

* DevTools doesn't save changes made in the **DOM Tree** of the **Elements** panel. Edit HTML in
  the **Sources** panel instead.
* If you edit CSS in the **Styles** pane, and the source of that CSS is an HTML file, DevTools
  won't save the change. Edit the HTML file in the **Sources** panel instead.

### Related features {: #overrides-related }

* [Workspaces][WS]. DevTools automatically maps network resources to a local repository. Whenever
  you make a change in DevTools, that change gets saved to your local repository, too.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## The Changes tab {: #changes }

Track changes that you make locally in DevTools via the new **Changes** tab.

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## New accessibility tools {: #a11y }

Use the new **Accessibility** pane to inspect the accessibility properties of an element, and
inspect the contrast ratio of text elements in the **Color Picker** to ensure that they're
accessible to users with low-vision impairments or color-vision deficiencies.

### Accessibility pane {: #a11y-pane }

Use the **Accessibility** pane on the **Elements** panel to investigate the accessibility
properties of the currently-selected element.

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

Check out Rob Dodson's A11ycast on labeling below to see the **Accessibility** pane in action.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### Contrast ratio in the Color Picker {: #contrast }

The [Color Picker][CP] now shows you the contrast ratio of text elements. Increasing the
contrast ratio of text elements makes your site more accessible to users with low-vision
impairments or color-vision deficiencies. See [Color and contrast][contrast] to learn more about
how contrast ratio affects accessibility.

Improving the color contrast of your text elements makes your site more usable for <i>all</i>
users. In other words, if your text is grey with a white background, that's hard for anyone to
read.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

In **Figure 5**, the two checkmarks next to **4.61** means that this element meets the
[enhanced recommended contrast ratio (AAA)][enhanced]{:.external}. If it only had one checkmark,
that would mean it met the [minimum recommended contrast ratio (AA)][minimum]{:.external}.

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Click **Show More** ![Show More][SM]{:.cdt-inl} to expand the **Contrast Ratio** section.
The white line in the **Color Spectrum** box represents the boundary between colors that meet
the recommended contrast ratio, and those that don't. For example, since the grey color in
**Figure 6** meets recommendations, that means that all of the colors below the white line also
meet recommendations.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Related features {: #contrast-related }

The **Audits** panel has an automated accessibility audit for ensuring that
*every* text element on a page has a sufficient contrast ratio.

See [Run Lighthouse in Chrome DevTools][audit], or watch the A11ycast below, to learn how to
use the **Audits** panel to test accessibility.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## New audits {: #audits }

Chrome 65 ships with a whole new category of SEO audits, and many new performance audits.

Note: The **Audits** panel is powered by [Lighthouse][LH]. Chrome 64 runs Lighthouse version 2.5.
Chrome 65 runs Lighthouse version 2.8. So this section is simply a summary of the Lighthouse
updates from 2.6, 2.7, and 2.8.

### New SEO audits {: #seo }

Ensuring that your pages pass each of the audits in the new **SEO** category may help improve
your search engine rankings.

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### New performance audits {: #performance }

Chrome 65 also ships with many new performance audits:

* JavaScript boot-up time is high
* Uses inefficient cache policy on static assets
* Avoids page redirects
* Document uses plugins
* Minify CSS
* Minify JavaScript

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### Other updates {: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] to make it more inclusive of other next-generation image
  formats
* [A rehaul of the accessibility score][a11yscore]
* If an accessibility audit is not applicable for a page, that audit no longer counts towards
  the accessibility score
* Performance is now the top section in reports

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## Reliable code stepping with workers and asynchronous code {: #stepping }

Chrome 65 brings updates to the **Step Into** ![Step Into][into]{:.cdt-inl} button
when stepping into code that passes messages between threads, and asynchronous code.
If you want the previous stepping behavior, you can use the new **Step**
![Step][step]{:.cdt-inl} button, instead.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### Stepping into code that passes messages between threads {: #workers }

When you step into code that passes messages between threads, DevTools now shows you
what happens in each thread.

For example, the app in **Figure 8** passes a message between the main thread and the
worker thread. After stepping into the `postMessage()` call on the main thread,
DevTools pauses in the `onmessage` handler in the worker thread. The `onmessage`
handler itself posts a message back to the main thread. Stepping into *that* call
pauses DevTools back in the main thread.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

When you stepped into code like this in earlier versions of Chrome, Chrome only
showed you the main-thread-side of the code, as you can see in **Figure 9**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### Stepping into asynchronous code {: #async }

When stepping into asynchronous code, DevTools now assumes that you want to pause in the
the asynchronous code that eventually runs.

For example, in **Figure 10** after stepping into `setTimeout()`, DevTools runs all of the code
leading up to that point behind the scenes, and then pauses in the function that's passed
to `setTimeout()`.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

When you stepped into code like this in Chrome 63, DevTools paused in code as it chronologically
ran, as you can see in **Figure 11**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Multiple recordings in the Performance panel {: #recordings }

The **Performance** panel now lets you temporarily save up to 5 recordings. The recordings are
deleted when you close your DevTools window. See [Get Started with Analyzing Runtime
Performance][runtime] to get comfortable with the **Performance** panel.

[runtime]: /tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

## Bonus: Automate DevTools actions with Puppeteer 1.0 {: #puppeteer }

Note: This section isn't related to Chrome 65.

Version 1.0 of Puppeteer, a browser automation tool maintained by the Chrome DevTools team,
is now out. You can use Puppeteer to automate many tasks that were previously only available
via DevTools, such as capturing screenshots:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

It also has APIs for lots of generally useful automation tasks, such as generating PDFs:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

See [Quick Start][quickstart] to learn more.

[quickstart]: /web/tools/puppeteer/get-started

You can also use Puppeteer to expose DevTools features while browsing without ever explicitly
opening DevTools. See [Using DevTools Features Without Opening DevTools][without] for an
example.

[without]: /web/updates/2018/01/devtools-without-devtools

## A request from the DevTools team: consider Canary {: #canary }

If you're on Mac or Windows, please consider using [Chrome Canary][canary] as your default
development browser. If you report a bug or a change that you don't like while it's still in
Canary, the DevTools team can address your feedback significantly faster.

Note: Canary is the bleeding-edge version of Chrome. It's released as soon as its built, without
testing. This means that Canary breaks from time-to-time, about once-a-month, and it's usually
fixed within a day. You can go back to using Chrome Stable when Canary breaks.

[canary]: https://www.google.com/chrome/browser/canary.html

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML]. You
can also tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools) if
you're short on time. If you're sure that you've encountered a bug in
DevTools, please [open an issue](https://crbug.com/new).

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Previous release notes {: #links }

See the [devtools-whatsnew][tag] tag for links to all previous DevTools
release notes.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}
