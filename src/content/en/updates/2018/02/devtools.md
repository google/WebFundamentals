project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2018-02-26 #}
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
* TODO auto-pretty-print
* TODO breakpoint manager?

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

<figure>
  <img src="/web/updates/images/2018/02/wrapper.png"
       alt="The Initiator column shows that all of the requests were initiated by line 2
            of requests.js."/>
  <figcaption>
    <b>Figure X</b>. The <b>Initiator</b> column shows that all of the requests were initiated
    by line 2 of <code>requests.js</code>
  </figcaption>
</figure>

What you really want in this scenario is to see the application code that causes the request.
That's now possible:

1. Hover over the **Initiator** column. The call stack that caused the request appears in a
   pop-up.
1. Right-click the call that you want to hide from the initiator results.
1. Select **Blackbox script**. The **Initiator** column now hides any call from the script that
   you blackboxed.

<figure>
  <img src="/web/updates/images/2018/02/blackbox.png"
       alt="Blackboxing requests.js."/>
  <figcaption>
    <b>Figure X</b>. Blackboxing <code>requests.js</code>
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2018/02/resolved.png"
       alt="After blackboxing requests.js, the Initiator column now shows more
            helpful results."/>
  <figcaption>
    <b>Figure X</b>. After blackboxing <code>requests.js</code>, the
    <b>Initiator</b> column now shows more helpful results
  </figcaption>
</figure>

Manage your blackboxed scripts from the **Blackboxing** tab in [Settings][settings].

[settings]: /web/tools/chrome-devtools/ui#settings

See [Ignore a script or pattern of scripts][blackboxing] to learn more about blackboxing.

[blackboxing]: /web/tools/chrome-devtools/javascript/reference#blackbox

## Previews of HTML content in the Preview tab {: #previews }

Previously, the **Preview** tab in the **Network** panel showed the code of an HTML resource
in certain situations, while rendering a preview of the HTML in others. The **Preview** tab
now always does a basic rendering of the HTML. It's not intended to be a full browser, so it may
not display HTML exactly as you expect. If you want to see the HTML code, click the **Response**
tab, or right-click a resource and select **Open in Sources panel**.

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

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="OCXQem0YaJM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## New performance audits {: #audits }

TODO check if 66 has a new version

## Local Overrides now works with some styles defined in HTML {: #overrides }

TODO issues w/ https://spotless-drop.glitch.me/

Back when DevTools launched **Local Overrides** in Chrome 65, one limitation was that it couldn't
track changes to styles defined within HTML.


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
