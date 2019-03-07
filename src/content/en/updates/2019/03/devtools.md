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

TODO

## Highlight all nodes affected by CSS property {: #highlight }

Hover over a CSS property that affects a node's box model, such as `padding` or `margin`, to
highlight all nodes affected by that declaration.

<figure>
  <img src="/web/updates/images/2019/03/highlight.png"
       alt="Hovering over a margin property highlights all nodes affected by that
            declaration"/>
  <figcaption>
    <b>Figure X</b>. Hovering over a <code>margin</code> property highlights the margins of
    all nodes affected by that declaration
  </figcaption>
</figure>

## Lighthouse v4 in the Audits panel {: #lighthouse }

The new *Tap targets are not sized appropriately* audit checks that interactive elements like
buttons and links are appropriately large and spaced apart on mobile devices.

<figure>
  <img src="/web/tools/lighthouse/audits/images/tap-targets.png"
       alt="The tap targets audit"/>
  <figcaption>
    <b>Figure X</b>. The tap targets audit
  </figcaption>
</figure>

The PWA category of an audit now uses a badge scoring system.

<figure>
  <img src="/web/updates/images/2019/03/lighthouse1.png"
       alt="The new badge scoring system for the PWA category"/>
  <figcaption>
    <b>Figure X</b>. The new badge scoring system for the PWA category
  </figcaption>
</figure>

## WebSocket binary message viewer {: #binary }

To view the contents of a binary WebSocket message:

1. Open the **Network** panel.

     <figure>
       <img src="/web/updates/images/2019/03/binary1.png"
            alt="The Network panel"/>
       <figcaption>
         <b>Figure X</b>. The Network panel
       </figcaption>
     </figure>

1. Click **WS** to filter out all resources that aren't WebSocket connections.

     <figure>
       <img src="/web/updates/images/2019/03/binary2.png"
            alt="After clicking WS only WebSockety connections are shown"/>
       <figcaption>
         <b>Figure X</b>. After clicking WS only WebSockety connections are shown
       </figcaption>
     </figure>

1. Click the **Name** of a WebSocket connection to inspect it.

     <figure>
       <img src="/web/updates/images/2019/03/binary3.png"
            alt="Inspecting a WebSocket connection"/>
       <figcaption>
         <b>Figure X</b>. Inspecting a WebSocket connection
       </figcaption>
     </figure>

1. Click the **Messages** tab.

     <figure>
       <img src="/web/updates/images/2019/03/binary6.png"
            alt="The Messages tab"/>
       <figcaption>
         <b>Figure X</b>. The Messages tab
       </figcaption>
     </figure>

1. Click one of the **Binary Message** entries to inspect it.

     <figure>
       <img src="/web/updates/images/2019/03/binary4.png"
            alt="Inspecting a binary message"/>
       <figcaption>
         <b>Figure X</b>. Inspecting a binary message
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
    <b>Figure X</b>. Viewing a binary message as Base64
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
         <b>Figure X</b>. The Command Menu
       </figcaption>
     </figure>

1. Start typing `area`, select **Capture area screenshots**, then press <kbd>Enter</kbd>.

1. Drag your mouse over the section of the viewport that you want to screenshot.

     <figure>
       <img src="/web/updates/images/2019/03/screenshot1.png"
            alt="Selecting the portion of viewport to screenshot"/>
       <figcaption>
         <b>Figure X</b>. Selecting the portion of viewport to screenshot
       </figcaption>
     </figure>

## Service worker filters in the Network panel {: #swfilters }

Type `is:service-worker-initiated` or `is:service-worker-intercepted` in the Network panel filter text box
to view requests that were caused by (`initiated`) or modified by (`intercepted`) a service worker.

<figure>
  <img src="/web/updates/images/2019/03/swfilters1.png"
       alt="Filtering by is:service-worker-initiated"/>
  <figcaption>
    <b>Figure X</b>. Filtering by <code>is:service-worker-initiated</code>
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/03/swfilters2.png"
       alt="Filtering by is:service-worker-intercepted"/>
  <figcaption>
    <b>Figure X</b>. Filtering by <code>is:service-worker-intercepted</code>
  </figcaption>
</figure>

## Long tasks in Performance recordings {: #longtasks }

Performance recordings now show long tasks.

<figure>
  <img src="/web/updates/images/2019/03/longtasks1.png"
       alt="Hovering over a long task in a Performance recording"/>
  <figcaption>
    <b>Figure X</b>. Hovering over a long task in a Performance recording
  </figcaption>
</figure>

See [Task queues](https://www.w3.org/TR/2016/WD-html51-20160310/webappapis.html#task-queues) and 
[Tasks, microtasks, queues, and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/).

## First Paint in the Timings section {: #FP }

The [Timings section](/web/updates/2018/11/devtools#metrics) now marks First Paint.

<figure>
  <img src="/web/updates/images/2019/03/fp.png"
       alt="First Paint in the Timings section"/>
  <figcaption>
    <b>Figure X</b>. First Paint in the Timings section
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
