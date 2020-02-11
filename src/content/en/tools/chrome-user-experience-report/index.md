project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2020-02-11 #}
{# wf_published_on: 2017-10-23 #}
{# wf_blink_components: N/A #}

# Chrome User Experience Report {: .page-title }

<img src="images/logo.png" class="attempt-right" alt="CrUX logo" style="max-width: 250px">

The Chrome User Experience Report provides user experience metrics for how 
real-world Chrome users experience popular destinations on the web.

## Methodology {: #methodology }

The Chrome User Experience Report is powered by real user measurement of key 
user experience metrics across the public web, aggregated from users who have 
opted-in to syncing their browsing history, have not set up a Sync passphrase, 
and have [usage statistic reporting](https://www.google.com/chrome/browser/privacy/whitepaper.html#usagestats) 
enabled. The resulting data is made available via:

1. [PageSpeed Insights](/speed/pagespeed/insights/),
which provides URL-level user experience metrics for popular URLs that are 
known by Google's web crawlers.
2. [Public Google BigQuery project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all), 
which aggregates user experience metrics by origin, for all origins that are 
known by Google's web crawlers, and split across multiple dimensions 
outlined below.


### Metrics {: #metrics }

Metrics provided by the public Chrome User Experience Report hosted on 
Google BigQuery are powered by standard web platform APIs exposed by modern 
browsers and aggregated to origin-resolution. Site owners that want more 
detailed (URL level resolution) analysis and insight into their site 
performance and can use the same APIs to gather detailed real user measurement 
(RUM) data for their own origins.

Note: Currently the Chrome User Experience Report is focused on 
loading performance. With time, we hope to add more metrics and dimensions, 
both to provide more insight into loading and other [critical factors that 
most affect user experience](/web/updates/2017/06/user-centric-performance-metrics).

For guidance on which metrics to track and optimize for, and best practices on 
how to interpret real user measurement data, refer to our 
[user centric performance](/web/updates/2017/06/user-centric-performance-metrics) 
documentation.

#### First Paint {: #first-paint }

Defined by the 
[Paint Timing API](https://w3c.github.io/paint-timing/#first-paint) 
and 
[available in Chrome M60+](https://www.chromestatus.com/feature/5688621814251520):

> “First Paint reports the time when the browser first rendered after 
navigation. This excludes the default background paint, but includes 
non-default background paint. This is the first key moment developers care 
about in page load – when the browser has started to render the page.”

#### First Contentful Paint {: #first-contentful-paint }

Defined by the 
[Paint Timing API](https://w3c.github.io/paint-timing/#first-contentful-paint) 
and 
[available in Chrome M60+](https://www.chromestatus.com/feature/5688621814251520):

> “First Contentful Paint reports the time when the browser first rendered any 
text, image (including background images), non-white canvas or SVG. This 
includes text with pending webfonts. This is the first time users could start 
consuming page content.”

#### DOMContentLoaded {: #domcontentloaded }

Defined by the 
[HTML specification](https://html.spec.whatwg.org/#event-domcontentloaded):

> “The DOMContentLoaded reports the time when the initial HTML document has 
been completely loaded and parsed, without waiting for stylesheets, images, and 
subframes to finish loading.” - 
[MDN](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded).

#### onload {: #onload }

Defined by the [HTML specification](https://html.spec.whatwg.org/#event-load):

> “The load event is fired when the page and its dependent resources have 
finished loading.” - 
[MDN](https://developer.mozilla.org/en-US/docs/Web/Events/load).

#### First Input Delay {: #first-input-delay }

> “First Input Delay (FID) is an important, user-centric metric for measuring load responsiveness 
because it quantifies the experience users feel when trying to interact with unresponsive pages—a 
low FID helps ensure that the page is usable.” -
[web.dev/fid/](https://web.dev/fid/)

#### Largest Contentful Paint {: #largest-contentful-paint }

> “Largest Contentful Paint (LCP) is an important, user-centric metric for measuring perceived 
load speed because it marks the point in the page load timeline when the page's main content has 
likely loaded—a fast LCP helps reassure the user that the page is useful.” -
[web.dev/lcp/](https://web.dev/lcp/)

#### Cumulative Layout Shift {: #cumulative-layout-shift }

> “Cumulative Layout Shift (CLS) is an important, user-centric metric for measuring visual 
stability because it helps quantify how often users experience unexpected layout shifts—a low CLS 
helps ensure that the page is delightful.” -
[web.dev/cls/](https://web.dev/cls/)

#### Time to First Byte {: #time-to-first-byte }

> “Time to first byte (TTFB) is a measurement used as an indication of the responsiveness of a 
webserver or other network resource. TTFB measures the duration from the user or client making an 
HTTP request to the first byte of the page being received by the client's browser. This time is 
made up of the socket connection time, the time taken to send the HTTP request, and the time taken 
to get the first byte of the page.” -
[Wikipedia](https://en.wikipedia.org/wiki/Time_to_first_byte)

#### Notification Permissions

Defined by the [Notifications API](https://notifications.spec.whatwg.org/) and explained by [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API):

> “The Notifications API allows web pages to control the display of system notifications to the end user. These are outside the top-level browsing context viewport, so therefore can be displayed even when the user has switched tabs or moved to a different app. The API is designed to be compatible with existing notification systems, across different platforms.” -
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

Chrome will show users a prompt to grant the active website permission to show notifications when initiated by the website. Users can take actively or passively take one of four actions:

- Accept
    - If the user has explicitly allowed the website to show them notifications.
- Deny
    - If the user has explicitly disallowed the website from showing them notifications.
- Dismiss
    - If the user closes the permission prompt without giving any explicit response.
- Ignore
    - If the user does not interact with the prompt at all.

### Dimensions {: #dimensions }

Performance of web content can vary significantly based on device type, 
properties of the network, and other variables. To help segment and understand 
user experience across such key segments, the Chrome User Experience Report 
provides the following dimensions.

#### Effective Connection Type {: #effective-connection-type }

Defined by the 
[Network Information API](https://wicg.github.io/netinfo/#dfn-effective-connection-types) 
and 
[available in Chrome M62+](https://www.chromestatus.com/feature/5108786398232576):

> “Provides the effective connection type 
(“slow-2g”, “2g”, “3g”, “4g”, or “offline”) as determined by round-trip and 
bandwidth values based on real user measurement observations.”

#### Device Type {: #device-type }

Coarse device classification (“phone”, “tablet”, or “desktop”), as 
[communicated via User-Agent](https://developer.chrome.com/multidevice/user-agent).

#### Country

Geographic location of users at the country-level, inferred by their 
IP address. Countries are identified by their respective 
[ISO 3166-1 alpha-2 codes](https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements).

### Data format {: #data-format }

The report is provided via 
[Google BigQuery](https://cloud.google.com/bigquery/) as a collection of 
datasets containing user experience metrics aggregated to origin-resolution.
Each dataset represents a single country, `country_rs` captures user 
experience data for users in Serbia (`rs` is the 
[ISO 31611-1](https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements) 
code for Serbia). Additionally, there is a globally aggregated dataset (`all`) 
that captures the world-wide experience. Each row in the dataset contains a 
nested record of user experience for a particular origin, split by key 
dimensions.

<table class="green responsive">
  <tr>
    <th colspan="2">Dimension</th>
  </tr>
  <tr>
    <td><code>origin</code></td>
    <td>"https://example.com"</td>
  </tr>
  <tr>
    <td><code>effective_connection_type.name</code></td>
    <td>4G</td>
  </tr>
  <tr>
    <td><code>form_factor.name</code></td>
    <td>"phone"</td>
  </tr>
  <tr>
    <td><code>first_paint.histogram.start</code></td>
    <td>1000</td>
  </tr>
  <tr>
    <td><code>first_paint.histogram.end</code></td>
    <td>1200</td>
  </tr>
  <tr>
    <td><code>first_paint.histogram.density</code></td>
    <td>0.123</td>
  </tr>
</table>

For example, the above shows a sample record from the 
Chrome User Experience Report, which indicates that 12.3% of page loads had a 
“first paint time” measurement in the range of 1000-1200 milliseconds when 
loading “http://example.com” on a “phone” device over a ”4G”-like connection. 
To obtain a cumulative value of users experiencing a first paint time below 
1200 milliseconds, you can add up all records whose histogram’s “end” value is 
less than or equal to 1200. 

Note: The Chrome User Experience Report does not provide quantile values 
(e.g. median). Such values can be approximated from the provided data, but 
are not exposed directly by the report.

## Getting started {: #getting-started }

The Chrome User Experience Report is provided as a public project on 
[Google BigQuery](https://cloud.google.com/bigquery/). To access the project, 
you’ll need a Google account and a Google Cloud Project: 
[refer to our step by step guide](getting-started#access-dataset) and 
[the guided tour of how to query the project](getting-started#example-queries).

## Analysis tips & best practices {: #best-practices }

### Consider population differences across origins {: #population-differences }

The metrics provided by the Chrome User Experience Report are powered by 
real user measurement data. As a result, the data reflects how real users 
experienced the visited origin and, unlike synthetic or local testing where 
the test is performed under fixed and simulated conditions, captures the full 
range of external factors that shape and contribute to the final user experience.

For example, differences in population of users accessing a particular origin 
can contribute meaningful differences to the user experience. If the site is 
frequented by more visitors with more modern devices or via a faster network, 
the results may appear “fast” even if the site is not well optimized. 
Conversely, a well optimized site that attracts a wider population of users, or 
a population with larger fraction of users on slower devices or networks, 
may appear “slow”.

When performing head-to-head comparisons across origins, it is important to 
account and control for the population differences: segment by provided 
dimensions, such as device type and connection type, and consider external 
factors such as size of the population, countries from which the origin is 
accessed, and so on.

### Consider population size differences across origins {: #population-size }

The Chrome User Experience Report aggregates data for each origin, with the 
“density” values across all dimension-metric histograms summing to a value of 
“1.0”. This provides insight into the distribution of experiences across the 
key dimensions for a single origin.

However, when aggregating data from multiple origins, for example within an 
industry vertical or geographic regions, be careful with the types of 
conclusions being drawn: adding up densities for the same metric across 
multiple origins does not account for relative population differences across 
origins. 

For example, site A may have ten million visitors, while site B has ten 
thousand. In both cases, the histogram densities for each origin sum to “1.0”, 
and the dataset does not provide any absolute metrics about the population 
size of individual origins, or relative population size differences across 
origins. As a result, if you add together the densities from A and B, and 
average the results, you will treat them as equals even though A has three 
orders of magnitude more traffic.

### Consider Chrome population differences {: #chrome-population }

The Chrome User Experience report is powered by real user measurement 
aggregated from Chrome users who have opted-in to syncing their browsing 
history, have not set up a Sync passphrase, and have usage statistic reporting 
enabled. This population may not be representative of the broader user base 
for a particular origin and many origins may have population differences among 
each other. Further, this data does not account for users with different
browsers and differences in browser adoption in different geographic regions.

As a result, be careful with the types of conclusions being drawn when looking 
at a cross-section of origins, and when comparing individual origins: avoid 
using absolute comparisons and consider other population factors outlined in 
the sections above.

## Feedback and suggestions {: #feedback }

We would love to hear your feedback, questions, and suggestions to help us 
improve the Chrome User Experience Report. Please join the conversation on our 
[public Google Group](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report).

## License

"Chrome User Experience Report" datasets by Google are licensed under a 
[Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
