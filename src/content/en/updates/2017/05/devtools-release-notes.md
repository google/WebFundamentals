project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New features and changes coming to DevTools in Chrome 60.

{# wf_updated_on: 2017-05-23 #}
{# wf_published_on: 2017-05-23 #}
{# wf_tags: chrome60,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New features and changes coming to DevTools in Chrome 60. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 60) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Welcome! Here's what's new in DevTools in Chrome 60. You can check what
version of Chrome you're running at `chrome://version`.

Google I/0 '17 is a wrap. Check out Paul Irish's "DevTools: State of the
Union" talk below to learn more about what the team has been working on.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="PjjlwAvV8Jg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## New features {: #features }

### New Audits panel, powered by Lighthouse {: #lighthouse }

The Audits panel is now powered by [Lighthouse][LH]. Lighthouse provides a
comprehensive set of tests for measuring the quality of your web pages.

<figure>
  <img src="/web/updates/images/2017/05/lh-report.png"
       alt="A Lighthouse report"/>
  <figcaption>
    <b>Figure 1</b>. A Lighthouse report
  </figcaption>
</figure>

Check out the DevTools talk from Google I/O '17 below to learn more. Lighthouse
is discussed at 32:30.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="PjjlwAvV8Jg"
          data-autohide="1" data-showinfo="0" frameborder="0" 
          data-start="1948" allowfullscreen>
  </iframe>
</div>

To audit a page:

1. Click the **Audits** tab.
1. Click **Perform an audit**.
1. Click **Run audit**. Lighthouse sets up DevTools to emulate a mobile
   device, runs a bunch of tests against the page, and then displays the
   results in the **Audits** panel.

The scores at the top for **Progressive Web App**, **Performance**,
**Accessibility**, and **Best Practices** are your aggregate scores for each
of those categories. The rest of the report is a breakdown of each of the
tests that determined your scores. Improve the quality of your web page by
fixing the failing tests.

[LH]: /web/tools/lighthouse

Lighthouse is an open-source project. To learn lots more about how it works
and how to contribute to it, check out the Lighthouse talk from Google I/O
'17 below.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="NoRYn6gOtVo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### Third-party badges {: #badges }

Use third-party badges to get more insight into the entities that are
making network requests on a page and logging to the Console.

<figure>
  <img src="/web/updates/images/2017/05/network-badges.png"
       alt="Hovering over a third-party badge in the Network panel"/>
  <figcaption>
    <b>Figure 2</b>. Hovering over a third-party badge in the Network panel
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2017/05/console-badges.png"
       alt="Hovering over a third-party badge in the Console"/>
  <figcaption>
    <b>Figure 3</b>. Hovering over a third-party badge in the Console
  </figcaption>
</figure>

To enable third-party badges:

1. Open the [Command Menu][CM].
1. Run the `Show third party badges` command.

Use the **Group by product** option in the **Call Tree** and
**Bottom-Up** tabs to group performance recording activity by the third-party
entities that caused the activities.

<figure>
  <img src="/web/updates/images/2017/05/group-by-product.png"
       alt="Grouping by product in the Bottom-Up tab"/>
  <figcaption>
    <b>Figure 4</b>. Grouping by product in the <b>Bottom-Up</b> tab
  </figcaption>
</figure>

### A new gesture for Continue to Here {: #continue }

Say you're paused on line 25 of a script, and you want to jump to line 50. In
the past, you could set a breakpoint on line 50, or right-click the line and
select **Continue to here**. But now, there's a faster gesture for handling
this workflow.

When stepping through code, hold <kbd>Command</kbd> (Mac) or <kbd>Control</kbd>
(Windows, Linux) and then click to continue to that line of code. DevTools
highlights the jumpable destinations in blue.

<figure>
  <img src="/web/updates/images/2017/05/continue.gif"
       alt="Continue to Here"/>
  <figcaption>
    <b>Figure 5</b>. Continue To Here
  </figcaption>
</figure>

### Step into async {: #step-into-async }

A big theme for the DevTools team in the near future is to make debugging
asynchronous code predictable, and to provide you a complete history of
asynchronous execution.

The [new gesture for Continue to Here](#continue) also works with asynchronous
code. When you hold <kbd>Command</kbd> (Mac) or <kbd>Control</kbd> (Windows,
Linux), DevTools highlights jumpable asynchronous destinations in green.

Check out the demo below from the DevTools talk at I/O for an example.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="PjjlwAvV8Jg"
          data-autohide="1" data-showinfo="0" frameborder="0" 
          data-start="1060" allowfullscreen>
  </iframe>
</div>

## Changes {: #changes }

### More informative object previews in the Console {: #object-previews }

Previously, when you logged or evaluated an object in the Console, the Console
would only display `Object`, which is not particularly helpful.
Now, the Console provides more information about the contents of the object.

<figure>
  <img src="/web/updates/images/2017/05/oldobjpreview.png"
       alt="How the Console used to preview objects"/>
  <figcaption>
    <b>Figure 6</b>. How the Console used to preview objects
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2017/05/newobjpreview.png"
       alt="How the Console now previews objects"/>
  <figcaption>
    <b>Figure 7</b>. How the Console now previews objects
  </figcaption>
</figure>

### More informative context selection menu in the Console {: #context }

The Console's Context Selection menu now provides more information about
available contexts.

* The title describes what each item is.
* The subtitle below the title describes the domain where the item came from.
* Hover over an iframe context to highlight it in the viewport.

<figure>
  <img src="/web/updates/images/2017/05/context.png"
       alt="The new Context Selection menu"/>
  <figcaption>
    <b>Figure 8</b>. Hovering over an iframe in the new Context Selection
    menu highlights it in the viewport
  </figcaption>
</figure>

### Real-time updates in the Coverage tab {: #coverage }

When recording code coverage in Chrome 59, the **Coverage** tab would just
display **Recording**, with no visibility into what code was being used.
Now, the **Coverage** tab shows you in real-time what code is being used.

<figure>
  <img src="/web/updates/images/2017/05/oldcoverage.gif"
       alt="Loading and interacting with a page using the old Coverage tab"/>
  <figcaption>
    <b>Figure 9</b>. Loading and interacting with a page using the old
    <b>Coverage</b> tab
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2017/05/codecoverage.gif"
       alt="Loading and interacting with a page using the new Coverage tab"/>
  <figcaption>
    <b>Figure 10</b>. Loading and interacting with a page using the new
    <b>Coverage</b> tab
  </figcaption>
</figure>

### Simpler network throttling options {: #network-throttling }

The network throttling menus in the **Network** and **Performance** panels
have been simplified to include only three options: **Offline**, **Slow 3G**,
which is common in places like India, and **Fast 3G**, which is common in
places like the United States.

<figure>
  <img src="/web/updates/images/2017/05/throttling.png"
       alt="The new network throttling options"/>
  <figcaption>
    <b>Figure 11</b>. The new network throttling options
  </figcaption>
</figure>

The throttling options have been tweaked to match other, kernel-level
throttling tools. DevTools no longer shows the latency, download, and upload
metrics next to each option, because those values were misleading. The goal
is to match the true experience of each option.

### Async stacks on by default {: #async-stacks }

The **Async** checkbox has been removed from the **Sources** panel. Async
stack traces are now on by default. In the past, this option was opt-in,
because of performance overhead. The overhead is now minimal enough to enable
the feature by default. If you prefer to have async stack traces disabled,
you can turn them off in [Settings][Settings] or by running the `Do not
capture async stack traces` command in the [Command Menu][CM].

[Settings]: /web/tools/chrome-devtools/ui#settings
[CM]: /web/tools/chrome-devtools/ui#command-menu

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML].

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

That's all for what's new in DevTools in Chrome 60. See you in 6 weeks!
