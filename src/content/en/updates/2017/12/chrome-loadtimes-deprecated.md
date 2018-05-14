project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The non-standard chrome.loadTimes() API will be deprecated in Chrome 64 now that standards-based equivalents exist for all of its useful features.

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-12-14 #}
{# wf_tags: performance,deprecations,removals,chrome64 #}
{# wf_blink_components: Blink>PerformanceAPIs #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: The non-standard chrome.loadTimes() API will be deprecated in Chrome 64 now that standards-based equivalents exist for all of its useful features. #}
{# wf_blink_components: Blink>PerformanceAPIs #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Chrome 64 to deprecate the chrome.loadTimes() API {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

`chrome.loadTimes()` is a non-standard API that exposes loading metrics and
network information to developers in order to help them better understand their
site's performance in the real world.

Since this API was implemented in 2009, all of the useful information it reports can be
found in standardized APIs such as:

* [Navigation Timing 2](https://www.w3.org/TR/navigation-timing-2/)
* [Paint Timing](https://www.w3.org/TR/paint-timing/)
* The [`nextHopProtocol`](https://www.w3.org/TR/resource-timing-2/#dom-performanceresourcetiming-nexthopprotocol)
  addition to Navigation Timing 2 and
  [Resource Timing 2](https://www.w3.org/TR/resource-timing-2/).

These standardized APIs are being implemented by multiple browser vendors. As a
result, `chrome.loadTimes()` is being deprecated in Chrome 64.

## The deprecated API

The `chrome.loadTimes()` function returns a single object containing all of its
loading and network information. For example, the following object is the result
of calling `chrome.loadTimes()` on [www.google.com](https://www.google.com):

```
{
  "requestTime": 1513186741.847,
  "startLoadTime": 1513186741.847,
  "commitLoadTime": 1513186742.637,
  "finishDocumentLoadTime": 1513186742.842,
  "finishLoadTime": 1513186743.582,
  "firstPaintTime": 1513186742.829,
  "firstPaintAfterLoadTime": 0,
  "navigationType": "Reload",
  "wasFetchedViaSpdy": true,
  "wasNpnNegotiated": true,
  "npnNegotiatedProtocol": "h2",
  "wasAlternateProtocolAvailable": false,
  "connectionInfo": "h2"
}
```

## Standardized replacements

You can now find each of the above values using standardized APIs. The following
table matches each value to its standardized API, and the sections below show
code examples of how to get each value in the old API with modern equivalents.

<table>
  <tr>
    <th><code>chrome.loadTimes()</code> feature</td>
    <th>Standardized API replacement</th>
  </tr>
  <tr>
    <td><code>requestTime</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
    </td>
  </tr>
  <tr>
    <td><code>startLoadTime</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
    </td>
  </tr>
  <tr>
    <td><code>commitLoadTime</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
  </td>
  </tr>
  <tr>
    <td><code>finishDocumentLoadTime</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
  </td>
  </tr>
  <tr>
    <td><code>finishLoadTime</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
  </td>
  </tr>
  <tr>
    <td><code>firstPaintTime</code></td>
    <td>
      <a href="https://www.w3.org/TR/paint-timing/">
        Paint Timing
      </a>
  </td>
  </tr>
  <tr>
    <td><code>firstPaintAfterLoadTime</code></td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>navigationType</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
  </td>
  </tr>
  <tr>
    <td><code>wasFetchedViaSpdy</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
  </td>
  </tr>
  <tr>
    <td><code>wasNpnNegotiated</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
  </td>
  </tr>
  <tr>
    <td><code>npnNegotiatedProtocol</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
    </td>
  </tr>
  <tr>
    <td><code>wasAlternateProtocolAvailable</code></td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>connectionInfo</code></td>
    <td>
      <a href="https://www.w3.org/TR/navigation-timing-2/">
        Navigation Timing 2
      </a>
    </td>
  </tr>
</table>

<aside>
  <strong>Note:</strong> some of the features of the original API were
  never implemented or only apply to deprecated features. These are marked "N/A"
  in the table above.
</aside>

The code examples below return equivalent values to those returned by
`chrome.loadTimes()`. However, for new code these code examples are not
recommended. The reason is `chrome.loadTimes()` gives times values in [epoch
time](https://en.wikipedia.org/wiki/Unix_time) in seconds whereas new performance APIs
typically report values in milliseconds relative to a page's
[time origin](https://www.w3.org/TR/hr-time-2/#time-origin), which tends to
be more useful for performance analysis.

Several of the examples also favor [Performance Timeline
2](https://www.w3.org/TR/performance-timeline-2/) APIs (e.g.
`performance.getEntriesByType()`) but provide fallbacks for the older
[Navigation Timing 1](https://www.w3.org/TR/navigation-timing/) API as it has
wider browser support. Going forward, Performance Timeline APIs are preferred
and are typically reported with higher precision.

### `requestTime`

```
function requestTime() {
  // If the browser supports the Navigation Timing 2 and HR Time APIs, use
  // them, otherwise fall back to the Navigation Timing 1 API.
  if (window.PerformanceNavigationTiming && performance.timeOrigin) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return (ntEntry.startTime + performance.timeOrigin) / 1000;
  } else {
    return performance.timing.navigationStart / 1000;
  }
}
```

### `startLoadTime`

```
function startLoadTime() {
  // If the browser supports the Navigation Timing 2 and HR Time APIs, use
  // them, otherwise fall back to the Navigation Timing 1 API.
  if (window.PerformanceNavigationTiming && performance.timeOrigin) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return (ntEntry.startTime + performance.timeOrigin) / 1000;
  } else {
    return performance.timing.navigationStart / 1000;
  }
}
```

### `commitLoadTime`

```
function commitLoadTime() {
  // If the browser supports the Navigation Timing 2 and HR Time APIs, use
  // them, otherwise fall back to the Navigation Timing 1 API.
  if (window.PerformanceNavigationTiming && performance.timeOrigin) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return (ntEntry.responseStart + performance.timeOrigin) / 1000;
  } else {
    return performance.timing.responseStart / 1000;
  }
}
```

### `finishDocumentLoadTime`

```
function finishDocumentLoadTime() {
  // If the browser supports the Navigation Timing 2 and HR Time APIs, use
  // them, otherwise fall back to the Navigation Timing 1 API.
  if (window.PerformanceNavigationTiming && performance.timeOrigin) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return (ntEntry.domContentLoadedEventEnd + performance.timeOrigin) / 1000;
  } else {
    return performance.timing.domContentLoadedEventEnd / 1000;
  }
}
```

### `finishLoadTime`

```
function finishLoadTime() {
  // If the browser supports the Navigation Timing 2 and HR Time APIs, use
  // them, otherwise fall back to the Navigation Timing 1 API.
  if (window.PerformanceNavigationTiming && performance.timeOrigin) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return (ntEntry.loadEventEnd + performance.timeOrigin) / 1000;
  } else {
    return performance.timing.loadEventEnd / 1000;
  }
}
```

### `firstPaintTime`

```
function firstPaintTime() {
  if (window.PerformancePaintTiming) {
    const fpEntry = performance.getEntriesByType('paint')[0];
    return (fpEntry.startTime + performance.timeOrigin) / 1000;
  }
}
```

### `firstPaintAfterLoadTime`

```
function firstPaintTimeAfterLoad() {
  // This was never actually implemented and always returns 0.
  return 0;
}
```

### `navigationType`

```
function navigationType() {
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ntEntry.type;
  }
}
```

### `wasFetchedViaSpdy`

```
function wasFetchedViaSpdy() {
  // SPDY is deprecated in favor of HTTP/2, but this implementation returns
  // true for HTTP/2 or HTTP2+QUIC/39 as well.
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol);
  }
}
```

### `wasNpnNegotiated`

```
function wasNpnNegotiated() {
  // NPN is deprecated in favor of ALPN, but this implementation returns true
  // for HTTP/2 or HTTP2+QUIC/39 requests negotiated via ALPN.
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol);
  }
}
```

### `npnNegotiatedProtocol`

```
function npnNegotiatedProtocol() {
  // NPN is deprecated in favor of ALPN, but this implementation returns the
  // HTTP/2 or HTTP2+QUIC/39 requests negotiated via ALPN.
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol) ?
        ntEntry.nextHopProtocol : 'unknown';
  }
}
```

### `wasAlternateProtocolAvailable`

```
function wasAlternateProtocolAvailable() {
  // The Alternate-Protocol header is deprecated in favor of Alt-Svc
  // (https://www.mnot.net/blog/2016/03/09/alt-svc), so technically this
  // should always return false.
  return false;
}
```

### `connectionInfo`

```
function connectionInfo() {
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ntEntry.nextHopProtocol;
  }
}
```

## Removal plan

The `chrome.loadTimes()` API will be deprecated in Chrome 64 and is targeted to be
removed in late 2018. Developers should migrate their code as soon as possible
to avoid any loss in data.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/QqvFGFgoTyI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5637885046816768) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=621512)

{% include "comment-widget.html" %}
