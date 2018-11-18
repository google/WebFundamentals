project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Blackboxing in the Network panel, auto-adjust zooming in Device Mode, and more.

{# wf_updated_on: 2018-04-17 #}
{# wf_published_on: 2018-02-26 #}
{# wf_tags: chrome66,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Blackboxing in the Network panel, auto-adjust zooming in Device Mode, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 66) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

New features and major changes coming to DevTools in Chrome 66 include:

* [Blackboxing in the **Network** panel](#blackboxing)
* [Auto-adjust zooming in **Device Mode**](#auto-adjust)
* [Pretty-printing in the **Preview** and **Response** tabs](#pretty-printing)
* [Previewing HTML content in the **Preview** tab](#previews)
* [**Local Overrides** with styles inside of HTML](#overrides)

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

Read on, or watch the video version of the release notes below.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="eaYXFTJVewA"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Blackboxing in the Network panel {: #blackboxing }

The **Initiator** column in the **Network** panel tells you why a resource was requested.
For example, if JavaScript causes an image to be fetched, the **Initiator** column shows you the
line of JavaScript code that caused the request.

Note: You can hide or show columns in the **Network** panel by right-clicking the table header.

Previously, if your framework wrapped network requests in a wrapper, the **Initiator** column
wouldn't be that helpful. All network requests pointed to the same line of wrapper code.

<figure>
  <img src="/web/updates/images/2018/02/wrapper.png"
       alt="The Initiator column shows that all of the requests were initiated by line 2
            of requests.js."/>
  <figcaption>
    <b>Figure 1</b>. The <b>Initiator</b> column shows that all of the requests were initiated
    by line 2 of <code>requests.js</code>
  </figcaption>
</figure>

What you really want in this scenario is to see the application code that causes the request.
That's now possible:

1. Hover over the **Initiator** column. The call stack that caused the request appears in a
   pop-up.
1. Right-click the call that you want to hide from the initiator results.
1. Select **Blackbox script**. The **Initiator** column now hides any calls from the script that
   you blackboxed.

<figure>
  <img src="/web/updates/images/2018/02/blackbox.png"
       alt="Blackboxing requests.js."/>
  <figcaption>
    <b>Figure 2</b>. Blackboxing <code>requests.js</code>
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2018/02/resolved.png"
       alt="After blackboxing requests.js, the Initiator column now shows more
            helpful results."/>
  <figcaption>
    <b>Figure 3</b>. After blackboxing <code>requests.js</code>, the
    <b>Initiator</b> column now shows more helpful results
  </figcaption>
</figure>

Manage your blackboxed scripts from the **Blackboxing** tab in [Settings][settings].

[settings]: /web/tools/chrome-devtools/ui#settings

See [Ignore a script or pattern of scripts][blackboxing] to learn more about blackboxing.

[blackboxing]: /web/tools/chrome-devtools/javascript/reference#blackbox

## Pretty-printing in the Preview and Response tabs {: #pretty-printing }

The **Preview** tab in the **Network** panel now pretty-prints resources by default when it
detects that those resources have been minified.

<figure>
  <img src="/web/updates/images/2018/02/preview-prettyprint.png"
       alt="The Preview tab pretty-printing the contents of analytics.js by default."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Preview</b> tab pretty-printing the contents of
    <code>analytics.js</code> by default
  </figcaption>
</figure>

To view the unminified version of a resource, use the **Response** tab. You can also
manually pretty-print resources from the **Response** tab, via the new **Format** button.

<figure>
  <img src="/web/updates/images/2018/02/response-prettyprint.png"
       alt="Manually pretty-printing the contents of analytics.js via the Format button."/>
  <figcaption>
    <b>Figure 5</b>. Manually pretty-printing the contents of <code>analytics.js</code> via the
    <b>Format</b> button
  </figcaption>
</figure>

## Previewing HTML content in the Preview tab {: #previews }

Previously, the **Preview** tab in the **Network** panel showed the code of an HTML resource
in certain situations, while rendering a preview of the HTML in others. The **Preview** tab
now always does a basic rendering of the HTML. It's not intended to be a full browser, so it may
not display HTML exactly as you expect. If you want to see the HTML code, click the **Response**
tab, or right-click a resource and select **Open in Sources panel**.

<figure>
  <img src="/web/updates/images/2018/02/preview.png"
       alt="Previewing HTML in the Preview tab."/>
  <figcaption>
    <b>Figure 6</b>. Previewing HTML in the <b>Preview</b> tab
  </figcaption>
</figure>

## Auto-adjust zooming in Device Mode {: #auto-adjust }

When in [**Device Mode**][DM], open the **Zoom** dropdown and select **Auto-adjust zoom** to
automatically resize the viewport whenever you change device orientation.

[DM]: /web/tools/chrome-devtools/device-mode/

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="OCXQem0YaJM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Local Overrides now works with some styles defined in HTML {: #overrides }

Back when DevTools launched [**Local Overrides**][LO] in Chrome 65, one limitation was that it
couldn't track changes to styles defined within HTML. For example, in **Figure 7** there's a
style rule in the `head` of the document that declares `font-weight: bold` for `h1` elements.

[LO]: /web/updates/2018/01/devtools#overrides

<figure>
  <img src="/web/updates/images/2018/02/overrides.png"
       alt="An example of styles defined within HTML"/>
  <figcaption>
    <b>Figure 7</b>. An example of styles defined within HTML
  </figcaption>
</figure>

In Chrome 65, if you changed the `font-weight` declaration via the DevTools **Style** pane,
**Local Overrides** wouldn't track the change. In other words, on the next reload, the
style would revert back to `font-weight: bold`. But in Chrome 66, changes like this now persist
across page loads.

Caution: **Local Overrides** can track changes like this *so long as the style is defined in
the HTML document that was sent over the network*. If you have a script that dynamically adds
styles to an HTML document, **Local Overrides** still won't be able to detect those changes.

## Bonus tip: Blackbox framework scripts to make Event Listener Breakpoints more useful {: #tip }

Note: This section is not related to Chrome 66. It's just a bonus tip about an existing feature
that you may find useful.

Back when I created the [Get Started With Debugging JavaScript][JS]{:.external} video, some
viewers commented that event listener breakpoints aren't useful for apps built on top of
frameworks, because the event listeners are often wrapped in framework code. For example, in
**Figure 8** I've set up a `click` breakpoint in DevTools. When I click the button in the demo,
DevTools automatically pauses in the first line of listener code. In this case, it
pauses in Vue.js's wrapper code on line 1802, which isn't that helpful.

[JS]: https://youtu.be/H0XScE08hy8

<figure>
  <img src="/web/updates/images/2018/02/click-breakpoint.png"
       alt="The click breakpoint pauses in Vue.js' wrapper code."/>
  <figcaption>
    <b>Figure 8</b>. The <code>click</code> breakpoint pauses in Vue.js' wrapper code
  </figcaption>
</figure>

Since the Vue.js script is in a separate file, I can blackbox that script from the **Call Stack**
pane in order to make this `click` breakpoint more useful.

<figure>
  <img src="/web/updates/images/2018/02/blackbox-framework.png"
       alt="Blackboxing the Vue.js script from the Call Stack pane."/>
  <figcaption>
    <b>Figure 9</b>. Blackboxing the Vue.js script from the <b>Call Stack</b> pane
  </figcaption>
</figure>

The next time I click the button and trigger the `click` breakpoint, it executes the Vue.js
code without pausing in it, and then pauses on the first line of code in my app's listener,
which is where I really wanted to pause all along.

<figure>
  <img src="/web/updates/images/2018/02/blackboxed-results.png"
       alt="The click breakpoint now pauses on the app's listener code."/>
  <figcaption>
    <b>Figure 10</b>. The <code>click</code> breakpoint now pauses on the app's listener code
  </figcaption>
</figure>

## A request from the DevTools team: consider Canary {: #canary }

If you're on Mac or Windows, please consider using [Chrome Canary][canary] as your default
development browser. If you report a bug or a change that you don't like while it's still in
Canary, the DevTools team can address your feedback significantly faster.

Note: Canary is the bleeding-edge version of Chrome. It's released as soon as its built, without
testing. This means that Canary breaks from time-to-time, about once-a-month, and it's usually
fixed within a day. You can go back to using Chrome Stable while Canary is broken.

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
