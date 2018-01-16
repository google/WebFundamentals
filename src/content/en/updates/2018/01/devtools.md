project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.

{# wf_updated_on: 2018-01-17 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around early-March 2018.

New features coming to DevTools in Chrome 65 include:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New performance and SEO audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Local Overrides {: #overrides }

Suppose you're editing some CSS or JavaScript in DevTools. You want to see how the page looks or behaves
when you reload the page, but DevTools erases your changes when you reload. With **Local
Overrides**, you can now instruct DevTools to override network requests and serve local resources on your
filesystem instead.

1. Open the **Sources** panel.
1. Open the **Overrides** tab.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 1</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Click **Setup Overrides**.
1. Select which directory you want to save your changes to.
1. At the top of your viewport, click **Allow** to give DevTools read and write access to the
   directory.
1. Make your changes.

**Figure 2** shows how **Local Overrides** persists a CSS change across page loads.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 2</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

Limitations:

* DevTools doesn't save changes made in the **DOM Tree** of the **Elements** panel. Edit HTML in
  the **Sources** panel instead.
* If you edit CSS in the **Styles** pane, and the source of that CSS is an HTML file, DevTools
  won't save the change. Edit the HTML file in the **Sources** panel instead.

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
accessible to users with low-vision impairments or color-deficiencies.

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

Note: The **Accessibility** pane launched in Chrome 64.

### Contrast ratio in the Color Picker {: #contrast }

The [Color Picker][CP] now shows you the contrast ratio of text elements. Increasing the
contrast ratio of text elements makes your site more accessible to users with low-vision
impairments or color deficiencies. See [Color and contrast][contrast] to learn more about how
contrast ratio affects accessibility.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

Click **Show More** ![Show More][SM]{:.cdt-inl} to expand the **Contrast Ratio** section.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

Note: The **Audits** panel has an automated accessibility audit for ensuring that
each text element on a page has a sufficient contrast ratio. See [Run Lighthouse in Chrome
DevTools][audit] to get started with the **Audits** panel.

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png
[audit]: /web/tools/lighthouse/#devtools

## New audits {: #audits }

Chrome 65 ships with [new performance audits][perfaudits]:

* JavaScript boot-up time is high
* Uses inefficient cache policy on static assets
* Avoids page redirects

And a [new category of SEO audits][seoaudits]:

* Document doesn't use legible font sizes
* Has a `<meta name="viewport">` tag with `width` or `initial-scale`
* Document has a `<title>` element
* Document has a `meta` description
* Page has successful HTTP status code
* Links have descriptive text
* Page isn't blocked from indexing
* Document has a valid `hreflang`

Other updates include:

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] to make it more inclusive of other next-generation image formats
* [A rehaul of the accessibility score][a11yscore]

Note: The **Audits** panel is powered by [Lighthouse][LH]. Chrome 64 runs Lighthouse version 2.5.
Chrome 65 runs Lighthouse version 2.8. So this section is simply a summary of the Lighthouse
updates from 2.6, 2.7, and 2.8.

[perfaudits]: /web/updates/2017/12/lighthouse#perf
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

For example, the app in **Figure 7** passes a message between the main thread and the
worker thread. After stepping into the `postMessage()` call on the main thread,
DevTools pauses in the `onmessage` handler in the worker thread. The `onmessage`
handler itself posts a message back to the main thread. Stepping into *that* call
pauses DevTools back in the main thread.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 7</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

When you stepped into code like this in earlier versions of Chrome, Chrome only
showed you the main-thread-side of the code, as you can see in **Figure 8**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### Stepping into asynchronous code {: #async }

When stepping into asynchronous code, DevTools now assumes that you want to pause in the
the asynchronous code that eventually runs.

For example, in **Figure 9** after stepping into `setTimeout()`, DevTools runs all of the code
leading up to that point behind the scenes, and then pauses in the function that's passed
to `setTimeout()`.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

When you stepped into code like this in Chrome 63, DevTools paused in code as it chronologically
ran, as you can see in **Figure 10**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Multiple recordings in the Performance panel {: #recordings }

The **Performance** panel now lets you temporarily save up to 5 recordings. The recordings are
deleted when you close your DevTools window.

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 11</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

## A request from the DevTools team: consider Canary {: #canary }

If you're on Mac or Windows, please consider using [Chrome Canary][canary] as your default
development browser. If you report a bug or a change that you don't like while it's still in
Canary, the DevTools team can address your feedback significantly faster.

The typical version of Chrome that most people use is called Chrome Stable. It's called Stable
because it goes through rigorous testing. It's very difficult and time-consuming
for the DevTools team to ship changes to Stable. In practice, this means that the only updates
that get shipped to Stable are critical bug fixes.

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
