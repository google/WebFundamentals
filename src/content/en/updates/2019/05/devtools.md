project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-05-24 #}
{# wf_published_on: 2019-05-23 #}
{# wf_tags: chrome76, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 76) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Hello! Here's what's new in [Chrome DevTools](/web/tools/chrome-devtools/) in Chrome 76.

## Autocomplete with CSS values {: #values }

When adding style declarations to a DOM node sometimes the declaration value is easier to
remember than the declaration name. For example, when making a `<p>` node bold, the value
`bold` might be easier to remember than the name `font-weight`. The Style pane's autocomplete UI now
supports CSS values. If you remember what keyword value you want, but can't remember the property
name, try typing the value and autocomplete should help you find the name you're looking
for.

<figure>
  <img src="/web/updates/images/2019/05/values.png"
       alt="After typing 'bold' the Styles pane autocompletes to 'font-weight: bold'."/>
  <figcaption>
    Figure X. After typing <code>bold</code> the Styles pane autocompletes to 
    <code>font-weight: bold</code>.
  </figcaption>
</figure>

Chromium issue [#931145](https://crbug.com/931145)

## Network settings {: #settings }

[settings]: /web/tools/chrome-devtools/images/shared/settings.png

The Network panel previously had a usability issue where options like the throttling
menu were unreachable when the DevTools window was narrow. To fix this issue and
de-clutter the Network panel, a few lesser-used options have been moved behind the new
**Network Settings** ![Network Settings][settings]{: .inline-icon } pane.

<figure>
  <img src="/web/updates/images/2019/05/settings.png"
       alt="Network Settings."/>
  <figcaption>
    Figure X. Network Settings.
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/05/mapping.png"
       alt="Mapping the old locations to the new."/>
  <figcaption>
    Figure X. Mapping the old locations to the new.
  </figcaption>
</figure>

Chromium issue [#892969](https://crbug.com/892969)

## WebSocket messages in HAR exports {: #websocket }

When [exporting a HAR file from the Network panel](#HAR) to share network logs with your
colleagues, your HAR file now includes WebSocket messages. The `_webSocketMessages`
property begins with an underscore to indicate that it's a custom field.

    ...
    "_webSocketMessages": [
      {
        "type": "send",
        "time": 1558730482.5071473,
        "opcode": 1,
        "data": "Hello, WebSockets!"
      },
      {
        "type": "receive",
        "time": 1558730482.5883863,
        "opcode": 1,
        "data": "Hello, WebSockets!"
      }
    ]
    ...

Chromium issue [#496006](https://crbug.com/496006)

## HAR import and export buttons {: #HAR }

[export]: /web/tools/chrome-devtools/images/shared/export.png
[import]: /web/tools/chrome-devtools/images/shared/import.png

Share network logs with colleagues more easily with the new **Export All As HAR With Content**
![Export][export]{: .inline-icon } and **Import HAR File** ![Import][import]{: .inline-icon }
buttons. HAR importing and exporting have existed in DevTools for a while. The more 
discoverable buttons are the new change.

<figure>
  <img src="/web/updates/images/2019/05/har-buttons.png"
       alt="The new HAR buttons."/>
  <figcaption>
    Figure X. The new HAR buttons.
  </figcaption>
</figure>

Chromium issue [#904585](https://crbug.com/904585)

## Real-time total memory usage {: #memory }

The Memory panel now shows total memory usage in real-time.

<figure>
  <img src="/web/updates/images/2019/05/memory.png"
       alt="Real-time total memory usage."/>
  <figcaption>
    Figure X. The bottom of the Memory panel shows that the page
    is using <b>43.4 MB</b> of memory in total. <b>209 KB/s</b> indicates that
    total memory usage is increasing 209 KB per second.
  </figcaption>
</figure>

See also the [Performance Monitor](/web/updates/2017/11/devtools-release-notes#perf-monitor).

Chromium issue [#958177](https://crbug.com/958177)

## Puppeteer for Firefox {: #puppeteer }

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="YSni7t2ktMA"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="MbnATLCuKI4"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Inspect Background Fetch and Background Sync events {: #background }

[fetch]: https://medium.com/google-developer-experts/background-fetch-api-get-ready-to-use-it-69cca522cd8f
[sync]: /web/updates/2015/12/background-sync

Use the new **Background Services** section of the **Application** panel to monitor
[Background Fetch][fetch] and [Background Sync][sync] events.

<figure>
  <img src="/web/updates/images/2019/05/fetch.png"
       alt="The Background Fetch pane."/>
  <figcaption>
    Figure X. The Background Fetch pane. <a href="https://background-fetch.glitch.me">Demo</a>
    by <a href="https://twitter.com/webmaxru">Maxim Salnikov</a>.
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/05/sync.png"
       alt="The Background Sync pane."/>
  <figcaption>
    Figure X. The Background Sync pane.
  </figcaption>
</figure>

Chromium issue [#927726](https://crbug.com/927726)

## Service worker registration port numbers {: #ports }

The **Service Workers** pane now includes port numbers in its titles to make it 
easier to keep track of which service worker you're debugging.

<figure>
  <img src="/web/updates/images/2019/05/sw-ports.png"
       alt="Service worker ports."/>
  <figcaption>
    Figure X. Service worker ports.
  </figcaption>
</figure>

Chromium issue [#601286](https://crbug.com/601286)

## Portals in the DOM Tree {: #portals }

[portals]: https://web.dev/hands-on-portals

[Portal][portals] nodes now show up in the **DOM Tree** as expected.

<figure>
  <img src="/web/updates/images/2019/05/portals.png"
       alt="A portal node in the DOM Tree."/>
  <figcaption>
    Figure X. A portal node in the DOM Tree.
  </figcaption>
</figure>

Portals are currently only supported in Chrome. Enable the `chrome://flags/#enable-portals`
experiment and go to [Portals Demo](https://uskay-portals-demo.glitch.me) to try them out.

## Feedback {: #feedback }

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File definite bug reports and feature requests at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss possible features, changes, and bugs on the [Mailing List][ML]{:.external}.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this document in the [Web Fundamentals][WF]{:.external} repository.

## Consider Canary {: #canary }

[canary]: https://www.google.com/chrome/browser/canary.html

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
