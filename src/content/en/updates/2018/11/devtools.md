project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Visualize performance metrics, highlight text nodes, copy the JS path to a DOM node, and Audits panel updates.

{# wf_updated_on: 2018-12-03 #}
{# wf_published_on: 2018-11-27 #}
{# wf_tags: chrome72, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Visualize performance metrics, highlight text nodes, copy the JS path to a node, and Audits panel updates. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 72) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: We'll publish the video version of this page in early February 2019.

New features and major changes coming to Chrome DevTools in Chrome 72 include:

* [Visualize performance metrics](#metrics) in the Performance panel.
* [Highlight text nodes](#highlight) in the DOM Tree.
* [Copy the JS path](#copy) to a DOM node from the DOM Tree.
* [Audits panel updates](#audits), including a new audit that detects JS libraries and new
  keywords for accessing the Audits panel from the Command Menu.
  
## Video version of these release notes {: #video }

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="XVJxlEdB230"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Visualize performance metrics {: #metrics }

[FMP]: /web/fundamentals/performance/user-centric-performance-metrics#first_meaningful_paint_and_hero_element_timing

After [recording a page load](/web/tools/chrome-devtools/speed/get-started), DevTools now
marks performance metrics like `DOMContentLoaded` and [First Meaningful Paint][FMP] in the **Timings** section.

<figure>
  <img src="/web/updates/images/2018/11/metrics.png"
       alt="First Meaningful Paint in the Timing section"/>
  <figcaption>
    <b>Figure 1</b>. First Meaningful Paint in the Timing section
  </figcaption>
</figure>

## Highlight text nodes {: #highlight }

When you hover over a text node in the DOM Tree, DevTools now highlights that text node
in the viewport.

<figure>
  <img src="/web/updates/images/2018/11/text.png"
       alt="Highlighting a text node"/>
  <figcaption>
    <b>Figure 2</b>. Highlighting a text node
  </figcaption>
</figure>

## Copy JS path {: #copy }

[click]: https://pptr.dev/#?product=Puppeteer&version=v1.9.0&show=api-pageclickselector-options
[shadow]: /web/fundamentals/web-components/shadowdom

Suppose you're writing an automation test that involves clicking a node (using Puppeteer's
[`page.click()`][click]{: .external } function, perhaps) and you want to quickly get a reference
to that DOM node. The usual workflow is to go to the Elements panel, right-click the node in the
DOM Tree, select **Copy** > **Copy selector**, and then pass that CSS selector to
`document.querySelector()`. But if the node is in a [Shadow DOM][shadow]{: .external }
this approach doesn't work because the selector yields a path from within the shadow tree.

To quickly get a reference to a DOM node, right-click the DOM node and select
**Copy** > **Copy JS path**. DevTools copies to your clipboard a `document.querySelector()`
expression that points to the node. As mentioned above, this is particularly helpful when
working with Shadow DOM, but you can use it for any DOM node.

<figure>
  <img src="/web/updates/images/2018/11/copyjs.png"
       alt="Copy JS path"/>
  <figcaption>
    <b>Figure 3</b>. Copy JS path
  </figcaption>
</figure>

DevTools copies an expression like the one below to your clipboard:

    document.querySelector('#demo1').shadowRoot.querySelector('p:nth-child(2)')

## Audits panel updates {: #audits }

[lighthouse]: https://github.com/GoogleChrome/lighthouse/releases/tag/v3.2.0

The Audits panel is now running [Lighthouse 3.2][lighthouse]{: .external }. Version
3.2 includes a new audit called **Detected JavaScript libraries**. This audit
lists out what JS libraries Lighthouse has detected on the page. You can find this audit
in your report under **Best Practices** > **Passed audits**.

<figure>
  <img src="/web/updates/images/2018/11/libs.png"
       alt="Detected JavaScript libraries"/>
  <figcaption>
    <b>Figure 4</b>. Detected JavaScript libraries
  </figcaption>
</figure>

Also, you can now access the Audits panel from the Command Menu by typing `Lighthouse` or `PWA`.

<figure>
  <img src="/web/updates/images/2018/11/lighthouse.png"
       alt="Typing 'lighthouse' into the Command Menu"/>
  <figcaption>
    <b>Figure 5</b>. Typing <code>lighthouse</code> into the Command Menu
  </figcaption>
</figure>

## Feedback {: #feedback }

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File bug reports at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss features and changes on the [Mailing List][ML]{:.external}. Please don't use the mailing
  list for support questions. Use Stack Overflow, instead.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}. Please don't file bugs
  on Stack Overflow. Use Chromium Bugs, instead.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this doc in the [Web Fundamentals][WF]{:.external} repository.

## Consider Canary {: #canary }

[canary]: https://www.google.com/chrome/browser/canary.html

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
