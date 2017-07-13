project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New features and changes coming to DevTools in Chrome 60.

{# wf_updated_on: 2017-07-07 #}
{# wf_published_on: 2017-05-23 #}
{# wf_tags: chrome60,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: New features and changes coming to DevTools in Chrome 60. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 60) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Welcome! Here's the major features and changes coming to DevTools in Chrome 60.

Note: You can check what version of Chrome you're running at
`chrome://version`. Chrome auto-updates to a new major version about every 6
weeks.

## New features {: #features }

### New Audits panel, powered by Lighthouse {: #lighthouse }

The Audits panel is now powered by [Lighthouse][LH]. Lighthouse provides a
comprehensive set of tests for measuring the quality of your web pages.

[LH]: /web/tools/lighthouse

The scores at the top for [**Progressive Web App**][PWA], [**Performance**][Perf],
[**Accessibility**][a11y], and [**Best Practices**][BP] are your aggregate scores for each
of those categories. The rest of the report is a breakdown of each of the
tests that determined your scores. Improve the quality of your web page by
fixing the failing tests.

[PWA]: /web/progressive-web-apps/
[Perf]: /web/fundamentals/performance/
[a11y]: /web/fundamentals/accessibility/
[BP]: /web/fundamentals/

<figure>
  <img src="/web/updates/images/2017/05/lh-report.png"
       alt="A Lighthouse report"/>
  <figcaption>
    <b>Figure 1</b>. A Lighthouse report
  </figcaption>
</figure>

To audit a page:

1. Click the **Audits** tab.
1. Click **Perform an audit**.
1. Click **Run audit**. Lighthouse sets up DevTools to emulate a mobile
   device, runs a bunch of tests against the page, and then displays the
   results in the **Audits** panel.

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / New Audits Panel / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

#### Lighthouse at Google I/O '17 {: #lighthouse-at-io }

Check out the DevTools talk from Google I/O '17 below to learn more about Lighthouse's
integration in DevTools.

Note: The video should start playing at 32:30, which is when Paul discusses Lightouse.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="PjjlwAvV8Jg"
          data-autohide="1" data-showinfo="0" frameborder="0" 
          data-start="1948" allowfullscreen>
  </iframe>
</div>

#### Contribute to Lighthouse {: #contribute-to-lighthouse }

Lighthouse is an open-source project. To learn lots more about how it works
and how to contribute to it, check out the Lighthouse talk from Google I/O
'17 below.

[Got an idea for a Lighthouse audit? Post it here!][ideas]

[ideas]: https://groups.google.com/d/msg/google-chrome-developer-tools/Wb76dhsEll4/W8Ab2WICBAAJ

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="NoRYn6gOtVo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### Third-party badges {: #badges }

Use third-party badges to get more insight into the entities that are
making network requests on a page, logging to the Console, and executing
JavaScript.

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
entities that caused the activities. See [Get Started With Analyzing Runtime
Performance][GSRP] to learn how to analyze performance with DevTools.

[GSRP]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2017/05/group-by-product.png"
       alt="Grouping by product in the Bottom-Up tab"/>
  <figcaption>
    <b>Figure 4</b>. Grouping by product in the <b>Bottom-Up</b> tab
  </figcaption>
</figure>

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / Third-Party Badges / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var response = 'Thanks for the feedback. Please tweet us at ' +
    '<a href="https://twitter.com/chromedevtools">@ChromeDevTools</a> or start a thread in the ' +
    '<a href="https://groups.google.com/forum/#!forum/google-chrome-developer-tools">mailing ' +
    'list</a> if you\'ve got any strong opinions on the matter.';
var label = 'WNDT60 / Third-Party Badges / Should Be Enabled By Default';
var feedback = {
  "category": "DevTools",
  "question": 'Do you think Third-Party Badges should be enabled by default?',
  "choices": [
    {
      "button": {
        "text": "Yes"
      },
      "response": response,
      "analytics": {
        "label": label
      }
    },
    {
      "button": {
        "text": "No"
      },
      "response": response,
      "analytics": {
        "label": label,
        "value": 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

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

See [Get Started With Debugging JavaScript][GSDJ] to learn the basics of
debugging in DevTools.

[GSDJ]: /web/tools/chrome-devtools/javascript/

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / Continue To Here / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

### Step into async {: #step-into-async }

A big theme for the DevTools team in the near future is to make debugging
asynchronous code predictable, and to provide you a complete history of
asynchronous execution.

The [new gesture for Continue to Here](#continue) also works with asynchronous
code. When you hold <kbd>Command</kbd> (Mac) or <kbd>Control</kbd> (Windows,
Linux), DevTools highlights jumpable asynchronous destinations in green.

Check out the demo below from the DevTools talk at I/O for an example.

Note: The video should start playing at 17:40, which is when Paul discusses
the feature.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="PjjlwAvV8Jg"
          data-autohide="1" data-showinfo="0" frameborder="0" 
          data-start="1060" allowfullscreen>
  </iframe>
</div>

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / Step Into Async / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

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

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / New Object Previews UI / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

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

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / New Context Selection Menu UI / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

### Real-time updates in the Coverage tab {: #coverage }

When recording code coverage in Chrome 59, the **Coverage** tab would just
display "Recording...", with no visibility into what code was being used.
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

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / Real-Time Coverage Tab Updates / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

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

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / Simplified Network Throttling / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

### Async stacks on by default {: #async-stacks }

The **Async** checkbox has been removed from the **Sources** panel. Async
stack traces are now on by default. In the past, this option was opt-in,
because of performance overhead. The overhead is now minimal enough to enable
the feature by default. If you prefer to have async stack traces disabled,
you can turn them off in [Settings][Settings] or by running the `Do not
capture async stack traces` command in the [Command Menu][CM].

[Settings]: /web/tools/chrome-devtools/ui#settings
[CM]: /web/tools/chrome-devtools/ui#command-menu

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WNDT60 / Async Stacks On By Default / Sentiment';
{% include "web/updates/2017/05/_sentiment.js" %}
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

### DevTools at Google I/O '17 {: #io }

Check out the talk by the mythical Paul Irish below to learn more about
what the DevTools team has been working on over the past year and the big
themes that they're tackling in the near future.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="PjjlwAvV8Jg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML]. You
can also tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools) if
you're short on time.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

That's all for what's new in DevTools in Chrome 60. See you in 6 weeks for
Chrome 61!

## Links to previous release notes {: #links }

* [What's New In DevTools (Chrome 59)](/web/updates/2017/04/devtools-release-notes)
* [What's New In DevTools (Chrome 58)](/web/updates/2017/03/devtools-release-notes)
