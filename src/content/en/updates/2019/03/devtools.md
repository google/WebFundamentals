project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Highlight nodes affected by a CSS property, Lighthouse v4, WebSocket binary message viewer, and more.

{# wf_updated_on: 2019-03-07 #}
{# wf_published_on: 2019-03-07 #}
{# wf_tags: chrome74, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Highlight nodes affected by a CSS property, Lighthouse v4, WebSocket binary message viewer, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 74) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Welcome back! Here's what's new.

## Video version of this page {: #video }

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="I14fXc7sXdU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Highlight all nodes affected by CSS property {: #highlight }

Hover over a CSS property that affects a node's box model, such as `padding` or `margin`, to
highlight all nodes affected by that declaration.

<figure>
  <img src="/web/updates/images/2019/03/highlight.png"
       alt="Hovering over a margin property highlights all nodes affected by that
            declaration"/>
  <figcaption>
    <b>Figure 1</b>. Hovering over a <code>margin</code> property highlights the margins of
    all nodes affected by that declaration
  </figcaption>
</figure>

## Lighthouse v4 in the Audits panel {: #lighthouse }

The new [Tap targets are not sized appropriately](/web/tools/lighthouse/audits/tap-targets) audit
checks that interactive elements like buttons and links are appropriately large and spaced
apart on mobile devices.

<figure>
  <img src="/web/tools/lighthouse/audits/images/tap-targets.png"
       alt="The tap targets audit"/>
  <figcaption>
    <b>Figure 2</b>. The tap targets audit
  </figcaption>
</figure>

The PWA category of a report now uses a badge scoring system.

<figure>
  <img src="/web/updates/images/2019/03/lighthouse1.png"
       alt="The new badge scoring system for the PWA category"/>
  <figcaption>
    <b>Figure 3</b>. The new badge scoring system for the PWA category
  </figcaption>
</figure>

<aside class="note">
  <b>What's Lighthouse?</b> <a href="/web/tools/lighthouse">Lighthouse</a> is the auditing engine
  that powers the Audits panel. It also powers <a href="https://web.dev/measure">web.dev/measure</a>
  and <a href="/speed/pagespeed/insights/">PageSpeed Insights</a>. You can also run Lighthouse as
  a Node module, a Chrome Extension, or from the command line. See 
  <a href="/web/tools/lighthouse/#devtools">Run Lighthouse in Chrome DevTools</a> to get started.
</aside>

## WebSocket binary message viewer {: #binary }

To view the contents of a binary WebSocket message:

1. Open the **Network** panel. See [Inspect Network Activity](/web/tools/chrome-devtools/network/) to
   learn the basics of analyzing network activity.

     <figure>
       <img src="/web/updates/images/2019/03/binary1.png"
            alt="The Network panel"/>
       <figcaption>
         <b>Figure 4</b>. The Network panel
       </figcaption>
     </figure>

1. Click **WS** to filter out all resources that aren't WebSocket connections.

     <figure>
       <img src="/web/updates/images/2019/03/binary2.png"
            alt="After clicking WS only WebSockety connections are shown"/>
       <figcaption>
         <b>Figure 5</b>. After clicking WS only WebSockety connections are shown
       </figcaption>
     </figure>

1. Click the **Name** of a WebSocket connection to inspect it.

     <figure>
       <img src="/web/updates/images/2019/03/binary3.png"
            alt="Inspecting a WebSocket connection"/>
       <figcaption>
         <b>Figure 6</b>. Inspecting a WebSocket connection
       </figcaption>
     </figure>

1. Click the **Messages** tab.

     <figure>
       <img src="/web/updates/images/2019/03/binary6.png"
            alt="The Messages tab"/>
       <figcaption>
         <b>Figure 7</b>. The Messages tab
       </figcaption>
     </figure>

1. Click one of the **Binary Message** entries to inspect it.

     <figure>
       <img src="/web/updates/images/2019/03/binary4.png"
            alt="Inspecting a binary message"/>
       <figcaption>
         <b>Figure 8</b>. Inspecting a binary message
       </figcaption>
     </figure>

[copy]: /web/tools/chrome-devtools/images/shared/copy-to-clipboard.png

Use the dropdown menu at the bottom of the viewer to convert the message into
Base64 or UTF-8. Click **Copy to clipboard** ![Copy to clipboard][copy]{: .inline-icon }
to copy the binary message to your clipboard.

<figure>
  <img src="/web/updates/images/2019/03/binary5.png"
       alt="Viewing a binary message as Base64"/>
  <figcaption>
    <b>Figure 9</b>. Viewing a binary message as Base64
  </figcaption>
</figure>

## Capture area screenshot in the Command Menu {: #screenshot }

Area screenshots let you capture a screenshot of a portion of the viewport. This feature
has been around for a while, but the workflow for accessing it was quite hidden. Area
screenshots are now available from the Command Menu.

1. Focus DevTools and then press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

     <figure>
       <img src="/web/tools/chrome-devtools/images/shared/command-menu.png"
            alt="The Command Menu"/>
       <figcaption>
         <b>Figure 10</b>. The Command Menu
       </figcaption>
     </figure>

1. Start typing `area`, select **Capture area screenshots**, then press <kbd>Enter</kbd>.

1. Drag your mouse over the section of the viewport that you want to screenshot.

     <figure>
       <img src="/web/updates/images/2019/03/screenshot1.png"
            alt="Selecting the portion of viewport to screenshot"/>
       <figcaption>
         <b>Figure 11</b>. Selecting the portion of viewport to screenshot
       </figcaption>
     </figure>

## Service worker filters in the Network panel {: #swfilters }

Type `is:service-worker-initiated` or `is:service-worker-intercepted` in the Network panel filter text box
to view requests that were caused (`initiated`) or potentially modified (`intercepted`) by a service worker.

<figure>
  <img src="/web/updates/images/2019/03/swfilters1.png"
       alt="Filtering by is:service-worker-initiated"/>
  <figcaption>
    <b>Figure 12</b>. Filtering by <code>is:service-worker-initiated</code>
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/03/swfilters2.png"
       alt="Filtering by is:service-worker-intercepted"/>
  <figcaption>
    <b>Figure 13</b>. Filtering by <code>is:service-worker-intercepted</code>
  </figcaption>
</figure>

See [Filter resources](/web/tools/chrome-devtools/network/#filter) for more on filtering network logs.

## Performance panel updates {: #perf }

Performance recordings now mark up long tasks and First Paint.

Check out [Do less main thread work](/web/tools/chrome-devtools/speed/get-started#main) for an example
of using the Performance panel to analyze page load performance.

## Long tasks in Performance recordings {: #longtasks }

[tasks]: https://w3c.github.io/longtasks/#sec-terminology

Performance recordings now show long [tasks][tasks]{: .external }.

<figure>
  <img src="/web/updates/images/2019/03/longtasks1.png"
       alt="Hovering over a long task in a Performance recording"/>
  <figcaption>
    <b>Figure 14</b>. Hovering over a long task in a Performance recording
  </figcaption>
</figure>

## First Paint in the Timings section {: #FP }

The [Timings section](/web/updates/2018/11/devtools#metrics) of a Performance recording
now marks First Paint.

<figure>
  <img src="/web/updates/images/2019/03/fp.png"
       alt="First Paint in the Timings section"/>
  <figcaption>
    <b>Figure 15</b>. First Paint in the Timings section
  </figcaption>
</figure>

## New DOM tutorial {: #dom }

Check out [Get Started With Viewing And Changing The DOM](/web/tools/chrome-devtools/dom/) for
a hands-on tour of DOM-related features.

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
