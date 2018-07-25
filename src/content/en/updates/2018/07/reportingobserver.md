project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: ReportingObserver gives developers insight into what their code is doing in the wild. ReportingObserver surfaces information on issues likes deprecations, interventions, and crashes, messages that were previously only available in the DevTools console.

{# wf_updated_on: 2018-07-25 #}
{# wf_published_on: 2018-07-25 #}
{# wf_tags: chrome69,reporting-observer,analytics,reports #}
{# wf_featured_image: /web/updates/images/generic/send.png #}
{# wf_featured_snippet: ReportingObserver gives developers insight into what their code is doing in the wild. ReportingObserver surfaces information on issues likes deprecations, interventions, and crashes, messages that were previously only available in the DevTools console. #}
{# wf_blink_components: Blink>ReportingObserver #}

# ReportingObserver: know your code health {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-style: italic;
}
</style>

#### TL;DR {: #tldr .hide-from-toc }

There's a new observer in town! `ReportingObserver` is a new API that lets you know when a site uses a
deprecated API or runs into a browser intervention. Previously, these messages
were only available in the DevTools console.

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    console.log(report.type, report.url, report.body);
  }
}, {buffered: true});

observer.observe();
```

Use the callback to send reports to a backend or analytics provider
for further analysis.

Caution: `ReportingObserver` shipped in Chrome 69. It is being considered by other browsers.

## Introduction {: #intro }

A while back, I wrote a blog post ("[Observing your web app](https://ericbidelman.tumblr.com/post/149032341876/observing-your-web-app)")
because I found it fascinating how many APIs there are for monitoring the
"stuff" that happens in a web app. For example, there APIs that can observe
information about the DOM: `ResizeObserver`,
`IntersectionObserver`, `MutationObserver`. There are APIs for capturing
performance measurements: `PerformanceObserver`. Other
APIs like `window.onerror` and `window.onunhandledrejection` even let us know
when something goes wrong.

However, there are other types of warnings which are not captured by these
existing APIs. When your site crashes, uses a deprecated API, or runs up
against a [browser intervention](https://www.chromestatus.com/features#intervention),
DevTools is first to tell you about them:

<figure>
  <img src="/web/updates/images/2018/07/reporting/consolewarnings.png"
       class="screenshot" alt="DevTools console warnings for deprecations and interventions."
       title="DevTools console warnings for deprecations and interventions.">
  <figcaption>Browser-initiated warnings in the DevTools console.</figcaption>
</figure>

One would naturally think `window.onerror` captures these warnings. It does not!
That's because `window.onerror` does not fire for warnings
generated directly by the user agent itself. It fires for runtime errors
(JS exceptions and syntax errors) caused by executing your code.

`ReportingObserver` picks up the slack. It provides a programmatic way to be
notified about browser-issued warnings such as deprecations and interventions.
You can use it as a reporting tool—lose less sleep wondering if users are
hitting unexpected issues on your site.

`ReportingObserver` is part of a larger spec, the [Reporting API][spec],
which provides a common way to send these different reports to a backend.
The Reporting API is basically a generic framework to specify a set of server
endpoints to report issues to.
{: .key-point }

## The API {: #api }

The API is not unlike the other "observer" APIs such
as `IntersectionObserver` and `ResizeObserver`. You give it a callback;
it gives you information. The information that the callback receives is a
list of issues that the page caused:

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    // → report.id === 'XMLHttpRequestSynchronousInNonWorkerOutsideBeforeUnload'
    // → report.type === 'deprecation'
    // → report.url === 'https://reporting-observer-api-demo.glitch.me'
    // → report.body.message === 'Synchronous XMLHttpRequest is deprecated...'
    // → report.body.lineNumber === 11
    // → report.body.columnNumber === 22
    // → report.body.sourceFile === 'https://reporting-observer-api-demo.glitch.me'
    // → report.body.anticipatedRemoval === <JS_DATE_STR> or null
  }
}});

observer.observe();
```

#### Filtered reports {: #filtered }

Reports can be pre-filter to only observe certain report types:

```js
const observer = new ReportingObserver((reports, observer) => {
  ...
}, {types: ['deprecation']});
```

Right now, there are two report types: `'deprecation'` and `'intervention'`.
{: .key-point }

#### Buffered reports {: #buff }

The `buffered: true` option is really useful when you want to see the
reports that were generated before the observer was created:

```js
const observer = new ReportingObserver((reports, observer) => {
  ...
}, {types: ['intervention'], buffered: true});
```

It is great for situations like lazy-loading a library that uses
a `ReportingObserver`. The observer gets added late but you
**don't miss out on anything that happened earlier in the page load**.

#### Stop observing {: #stop }

Yep! It's got a `disconnect` method:

```js
observer.disconnect(); // Stop the observer from collecting reports.
```

## Examples {: #examples }

**Example** - report browser interventions to an analytics provider:

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    sendReportToAnalytics(JSON.stringify(report.body));
  }
}, {types: ['intervention'], buffered: true});

observer.observe();
```

**Example** - be notified when APIs are going to be removed:

```js
const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    if (report.type === 'deprecation') {
      sendToBackend(`Using a deprecated API in ${report.body.sourceFile} which will be
                     removed on ${report.body.anticipatedRemoval}. Info: ${report.body.message}`);
    }
  }
});

observer.observe();
```

## Conclusion

`ReportingObserver` gives us an additional way for discovering and monitoring
potential issues in your web app. It's even a useful tool for understanding the
health of your code base (or lack thereof). Send reports to a backend,
know about the real-world issues users are hitting on your site, update
code, profit!

### Future work {: #future }

In the future, my hope is that `ReportingObserver` becomes the de-facto API
for catching all types of issues in JS. Imagine one API to catch everything
that goes wrong in your app:

- Browser interventions
- Browser crashes
- Deprecations
- CSP policy violations (currently serviced by the `securitypolicyviolation` event)
- [Feature Policy][featurepolicy] violations
- JS exceptions and errors (currently serviced by `window.onerror`).
- Unhandled JS promise rejections (currently serviced by `window.onunhandledrejection`)

I'm also excited about tools integrating `ReportingObserver` into
their workflows. [Lighthouse](/web/tools/lighthouse/) is an example of a tool
that already flags browser deprecations when you run its
"[Avoids deprecated APIs](/web/tools/lighthouse/audits/deprecated-apis)" audit:

<figure>
  <img src="/web/updates/images/2018/07/reporting/lighthouse_deprecations.png"
       class="screenshot" alt="Lighthouse audit for using deprecated APIs."
       title="Lighthouse audit for using deprecated APIs.">
  <figcaption>The Lighthouse audit for using deprecated APIs could use ReportingObserver.</figcaption>
</figure>

Lighthouse currently uses the [DevTools protocol](https://chromedevtools.github.io/devtools-protocol/)
to scrape console messages and report these issues to developers. Instead, it
might be interesting to [switch to `ReportingObserver`](https://github.com/GoogleChrome/lighthouse/issues/5707)
for its well structured deprecation reports and additional metadata like
`anticipatedRemoval` date.

**Additional resources**:

- [W3c spec][reportingobserver]
- [chromestatus.com entry][chromestatus]

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

[spec]: https://w3c.github.io/reporting
[reportingobserver]: https://w3c.github.io/reporting/#observers
[explainer]: https://github.com/W3C/reporting/blob/master/EXPLAINER.md
[chromestatus]: https://www.chromestatus.com/feature/4691191559880704
[featurepolicy]: /web/updates/2018/06/feature-policy
