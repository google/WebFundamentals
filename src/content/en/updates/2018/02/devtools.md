project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2018-02-23 #}
{# wf_published_on: 2018-03-23 #}
{# wf_tags: chrome66,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 66) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around mid-April 2018.

New features and major changes coming to DevTools in Chrome 66 include:

* [Blackboxing in the Network panel](#blackboxing)
* [Auto-adjust zooming in Device Mode](#auto-adjust)
* [New performance audits](#audits)
* [Previews of HTML content in the Preview tab](#previews)
* [Local Overrides with styles inside of HTML](#overrides)

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Blackboxing in the Network panel {: #blackboxing }

The **Initiator** column in the **Network** panel tells you why a resource was requested.
For example, if a `link` element is declared in some HTML, the **Initiator** column next to the
request for that `link` element shows you the line of HTML where the `link` element is
declared. If JavaScript causes the request, the **Initiator** column shows you the line of
JavaScript code.

Previously, if your framework wrapped network requests in a wrapper, the **Initiator** column
wouldn't be that helpful. All network requests pointed to the same line of wrapper code.

What you really want in this scenario is to see the application code that causes the request.
That's now possible.



## Previews of HTML content in the Preview tab {: #previews }

When you preview an HTML resource in the **Preview** tab of the **Network** panel, the tab
now always does a basic rendering of the HTML. It's not intended to be a full browser, so you
it may not display exactly as you expect. Previously, the tab showed the HTML code in certain
situations while rendering a preview in others. If you want to see the HTML code, use the
**Response** tab, or right-click a resource and select **Open in Sources panel**.

<figure>
  <img src="/web/updates/images/2018/02/preview.png"
       alt="Previewing HTML in the Preview tab."/>
  <figcaption>
    <b>Figure X</b>. Previewing HTML in the <b>Preview</b> tab
  </figcaption>
</figure>

## Auto-adjust zooming in Device Mode {: #auto-adjust }

When in [**Device Mode**][DM], open the **Zoom** dropdown and select **Auto-adjust zoom** to
automatically resize the viewport whenever you change device orientation.

[DM]: /web/tools/chrome-devtools/device-mode/

The video below first shows the behavior when **Auto-adjust zoom** is turned off. When the
viewport is displayed in landscape mode, the device hardware overlows the window. After
turning on **Auto-adjust zoom**, the viewport always resizes so that it takes up the maximum
amount of space without overflowing.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="OCXQem0YaJM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## New performance audits {: #audits }

## Local Overrides with styles inside of HTML {: #overrides }

Back when DevTools launched **Local Overrides** in Chrome 65, one limitation was that


## Bonus tip: blackboxing + frameworks + event listener breakpoints

Note: This section is not related to Chrome 66. It's just a bonus tip about an existing feature
that you may find useful.

Back when I wrote Get Started Debuggign JS, viewers commented that event listener breakpoints
aren't useufl with frameworks, because they resolve to teh framework wrapper. If you blackbox
the file containing the wrapper then devtools pauses where you want it to.

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
