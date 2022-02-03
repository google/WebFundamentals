project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Handling Heavy Ad Interventions

{# wf_published_on: 2020-05-14 #}
{# wf_updated_on: 2022-02-03 #}
{# wf_featured_image: /web/updates/images/generic/security.png #}
{# wf_tags: devtools,performance #}
{# wf_featured_snippet: Chrome’s Heavy Ad Intervention will unload ads that exceed their allowance for CPU or network usage. Learn how to monitor these with the Reporting API and update your ads to avoid issues. #}
{# wf_blink_components: UI>Browser>AdFilter #}

# Handling Heavy Ad Interventions {: .page-title }

{% include "web/_shared/contributors/rowanmerewood.html" %}

<div class="clearfix"></div>

Ads that consume a disproportionate amount of resources on a device negatively
impact the user’s experience—from the obvious effects of degrading performance
to less visible consequences such as draining the battery or eating up bandwidth
allowances. These ads range from the actively malicious, such as cryptocurrency
miners, through to genuine content with inadvertent bugs or performance issues.

Chrome sets limits on the resources an ad may use and unloads that ad if the
limits are exceeded. You can read [the announcement on the Chromium
blog](https://blog.chromium.org/2020/05/resource-heavy-ads-in-chrome.html) for
more details. The mechanism used for unloading ads is the [Heavy Ad
Intervention](https://github.com/johnivdel/heavy-ad-intervention).

## Heavy Ad criteria

An ad is considered heavy **if the user has not interacted with it** (for
example, has not tapped or clicked it) and it meets any of the following
criteria:

- Uses the main thread for **more than 60 seconds in total**
- Uses the main thread for **more than 15 seconds in any 30 second window**
- Uses **more than 4 megabytes of network bandwidth**

All resources used by any descendant iframes of the ad frame count against the
limits for intervening on that ad. It’s important to note that the main thread
time limits are not the same as elapsed time since loading the ad. The limits
are on how long the CPU takes to execute the ad's code.

## Testing the intervention

The intervention shipped  in Chrome 85, but by default there is some noise and
variability added to the thresholds to protect user privacy.

Setting `chrome://flags/#heavy-ad-privacy-mitigations` to **Disabled** removes
those protections, meaning the restrictions are applied deterministically,
purely according to the limits. This should make debugging and testing easier.

Note: Earlier versions of Chrome included the
`#heavy-ad-privacy-mitigations-opt-out`  and `#enable-heavy-ad-intervention`
flags for initial testing. These flags are no longer required and have been
removed.

When the intervention is triggered you should see the content in the iframe for
a heavy ad replaced with an **Ad removed** message. If you follow the included
_Details_ link, you will see a message explaining: "_This ad uses too many
resources for your device, so Chrome removed it._"

You can see the intervention applied to sample content on
[heavy-ads.glitch.me](https://heavy-ads.glitch.me) You can also use this test
site to load an arbitrary URL as a quick way of testing your own content.

Be aware when testing that there are a number of reasons that may prevent an
intervention being applied.

- Reloading the same ad within the same page will exempt that combination from
  the intervention. Clearing your browsing history and opening the page in a new
  tag can help here.
- Ensure the page remains in focus - backgrounding the page (switching to
  another window) will pause task queues for the page, and so will not trigger
  the CPU intervention.
- Ensure you do not tap or click ad content while testing - the intervention
  will not be applied to content that receives any user interaction.

## What do you need to do?

### You show ads from a third-party provider on your site

No action needed, just be aware that users may see ads that exceed the limits
removed when on your site.

### You show first-party ads on your site or you provide ads for third-party display

Continue reading to ensure you implement the necessary monitoring via the
Reporting API for Heavy Ad interventions.

### You create ad content or you maintain a tool for creating ad content

Continue reading to ensure that you are aware of how to test your content for
performance and resource usage issues. You should also refer to the guidance on
the ad platforms of your choice as they may provide additional technical advice
or restrictions, for example, see the Google
[Guidelines for display creatives](https://support.google.com/displayvideo/answer/3017252).
Consider building configurable thresholds directly into your authoring tools to
prevent poor performing ads escaping into the wild.

## What happens when an ad is removed?

An intervention in Chrome is reported via the aptly named
[Reporting API](https://github.com/W3C/reporting/blob/main/EXPLAINER.md#interventions)
with an `intervention` report type. You can use the Reporting API to be notified
about interventions either by a `POST` request to a reporting endpoint or within
your JavaScript.

These reports are triggered on the root ad-tagged iframe along with all of its
descendants, i.e. every frame unloaded by the intervention. This means that if
an ad comes from a third-party source, i.e. a cross-site iframe, then it’s up to
that third-party (for example, the ad provider) to handle the report.

To configure the page for HTTP reports, the response should include the
`Report-To` header:

```js
Report-To: { "url": "https://example.com/reports", "max_age": 86400 }
```

The POST request triggered will include a report like this:

```js
POST /reports HTTP/1.1
Host: example.com
…
Content-Type: application/report

[{
 "type": "intervention",
 "age": 60,
 "url": "https://example.com/url/of/ad.html",
 "body": {
   "sourceFile": null,
   "lineNumber": null,
   "columnNumber": null,
   "id": "HeavyAdIntervention",
   "message": "Ad was removed because its CPU usage exceeded the limit. See https://www.chromestatus.com/feature/4800491902992384"
 }
}]
```

Note: The `null` values are expected. The intervention will trigger when the
limits are reached, but that particular point in the code is not necessarily the
problem.

The JavaScript API provides the `ReportingObserver` with an `observe()` method
that can be used to trigger a provided callback on interventions. This can be
useful if you want to attach additional information to the report to aid in
debugging.

```js
// callback that will handle intervention reports
function sendReports(reports) {
  for (let report of reports) {
    // Log the `report` json via your own reporting process
    navigator.sendBeacon('https://report.example/your-endpoint', report);
  }
}

// create the observer with the callback
const observer = new ReportingObserver(
  (reports, observer) => {
    sendReports(reports);
  },
  { buffered: true }
);

// start watching for interventions
observer.observe();
```

However, because the intervention will literally remove the page from the
iframe, you should add a failsafe to ensure that the report is definitely
captured before the page is gone completely, for example, an ad within an
iframe. For this, you can hook your same callback into the `pagehide` event.

```js
window.addEventListener('pagehide', (event) => {
  // pull all pending reports from the queue
  let reports = observer.takeRecords();
  sendReports(reports);
});
```

Remember that, to protect the user experience, the `pagehide` event restricts
the amount of work that can happen within it. For example, trying to send a
`fetch()` request with the reports will result in that request being canceled.
You should use `navigator.sendBeacon()` to send that report and even then, this
is only best-effort by the browser not a guarantee.

Caution: [**Do not use** the `unload` and `beforeunload`
events](https://web.dev/bfcache/#never-use-the-unload-event) here. This will
actively hurt your page caching and performance across multiple browsers.

The resulting JSON from the JavaScript is similar to that sent on the `POST`
request:

```js
[
  {
    type: 'intervention',
    url: 'https://example.com/url/of/ad.html',
    body: {
      sourceFile: null,
      lineNumber: null,
      columnNumber: null,
      id: 'HeavyAdIntervention',
      message:
        'Ad was removed because its network usage exceeded the limit. See https://www.chromestatus.com/feature/4800491902992384',
    },
  },
];
```

## Diagnosing the cause of an intervention

Ad content is just web content, so make use of tools like
[Lighthouse](/web/tools/lighthouse/) to audit the overall performance of your
content. The resulting audits provide inline guidance on improvements. You can
also refer to the [web.dev/fast](https://web.dev/fast/) collection.

You may find it helpful to test your ad in a more isolated context. You can use
the custom URL option on https://heavy-ads.glitch.me to test this with a
ready-made, ad-tagged iframe. You can use Chrome DevTools to validate content
has been tagged as an ad. In the **Rendering** panel (accessible via the three
dot **⋮** menu then **More Tools** > **Rendering**) select "**Highlight Ad
Frames**". If testing content in the top-level window or other context where it
is not tagged as an ad the intervention will not be triggered, but you can still
manually check against the thresholds.

A frame's ad status is also displayed in the **Elements** pane where an `ad`
annotation is added after the opening `<iframe>` tag. This is also visible in
the **Application** pane under the **Frames** section, where ad-tagged frames
will include an "**Ad Status**" attribute.

### Network usage

Bring up the **Network** panel in Chrome DevTools to see the overall network
activity for the ad. You will want to ensure the "**Disable cache**" option is
checked to get consistent results over repeated loads.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-01.png"
      alt="Network panel in DevTools."/>
 <figcaption>
   <em>Network panel in DevTools.</em>
 </figcaption>
</figure>

The transferred value at the bottom of the page will show you the amount
transferred for the entire page. Consider using the
[Filter](/web/tools/chrome-devtools/network/reference#filter) input at the top
to restrict the requests just to the ones related to the ad.

If you find the initial request for the ad, for example, the source for the
iframe, you can also use the _Initiator_ tab within the request to see all of
the requests it triggers.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-02.png"
      alt="Initiator tab for a request."/>
 <figcaption>
   <em>Initiator tab for a request.</em>
 </figcaption>
</figure>

Sorting the overall list of requests by size is a good way to spot overly large
resources. Common culprits include images and videos that have not been
optimized.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-03.png"
      alt="Sort requests by response size."/>
 <figcaption>
   <em>Sort requests by response size.</em>
 </figcaption>
</figure>

Additionally, sorting by name can be a good way to spot repeated requests. It
may not be a single large resource triggering the intervention, but a large
number of repeated requests that incrementally go over the limit.

### CPU usage

The **Performance** panel in DevTools will help diagnose CPU usage issues. The
first step is to open up the
[Capture Settings menu](]/web/tools/chrome-devtools/evaluate-performance/reference#settings).
Use the **CPU** dropdown to slow down the CPU as much as possible. The
interventions for CPU are far more likely to trigger on lower-powered devices
than high-end development machines.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-04.png"
      alt="Enable network and CPU throttling in the Performance panel."/>
 <figcaption>
   <em>Enable network and CPU throttling in the Performance panel.</em>
 </figcaption>
</figure>

Next, click the **Record** button to begin recording activity. You may want to
experiment with when and how long you record for, as a long trace can take quite
a while to load. Once the recording is loaded you can use the top timeline to
[select a portion of the recording](/web/tools/chrome-devtools/evaluate-performance/reference#select).
Focus on areas on the graph in solid yellow, purple, or green that represent
scripting, rendering, and painting.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-05.png"
      alt="Summary of a trace in the Performance panel."/>
 <figcaption>
   <em>Summary of a trace in the Performance panel.</em>
 </figcaption>
</figure>

Explore the
[Bottom-Up](/web/tools/chrome-devtools/evaluate-performance/reference#bottom-up),
[Call Tree](/web/tools/chrome-devtools/evaluate-performance/reference#call-tree),
and
[Event Log](/web/tools/chrome-devtools/evaluate-performance/reference#event-log)
tabs at the bottom. Sorting those columns by **Self Time** and **Total Time**
can help identify bottlenecks in the code.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-06.png"
      alt="Sort by Self Time in the Bottom-Up tab."/>
 <figcaption>
   <em>Sort by Self Time in the Bottom-Up tab.</em>
 </figcaption>
</figure>

The associated source file is also linked there, so you can follow it through to
the **Sources** panel to examine the cost of each line.

<figure>
 <img src="/web/updates/images/2020/05/heavy-ad-07.png"
      alt="Execution time shown in the Sources panel."/>
 <figcaption>
   <em>Execution time shown in the Sources panel.</em>
 </figcaption>
</figure>

Note: DevTools may not always display the timing information if the frame has
already been unloaded, so you may want to capture the traces with the ad
isolated or with the intervention disabled.

Common issues to look for here are
[poorly optimized animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
that are triggering continuous layout and paint or costly operations that are
hidden within an included library.

## How to report incorrect interventions

Chrome
[tags content as an ad by matching resource requests against a filter list](https://chromium.googlesource.com/chromium/src.git/+/master/docs/ad_tagging.md).
If non-ad content has been tagged, consider changing that code to avoid matching
the filtering rules. If you suspect an intervention has been incorrectly
applied, then you can
[raise an issue via this template](https://goo.gle/heavy-ads-crbug). Please
ensure you have captured an example of the intervention report and have a sample
URL to reproduce the issue.

{% include "web/_shared/rss-widget-updates.html" %}
{% include "web/_shared/helpful.html" %}
