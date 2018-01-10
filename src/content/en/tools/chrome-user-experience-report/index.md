project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2018-01-10 #}
{# wf_published_on: 2017-10-23 #}
{# wf_blink_components: N/A #}

# Chrome User Experience Report {: .page-title }

<img src="images/dataset.png" class="attempt-right" alt="">

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
2. [Public Google BigQuery dataset](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all), 
which aggregates user experience metrics by origin, for all origins that are 
known by Google's web crawlers, and split across multiple dimensions 
outlined below.


### Metrics {: #metrics }

Metrics provided by the Chrome User Experience Report are powered by standard 
web platform APIs exposed by modern browsers and aggregated to 
origin-resolution. Site owners that want more detailed (URL level resolution) 
analysis and insight into their site performance and can use the same APIs to 
gather detailed real user measurement (RUM) data for their own origins.

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
[communicated via User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop).

### Data format {: #data-format }

The report is provided as a public 
[Google BigQuery](https://cloud.google.com/bigquery/) dataset containing the 
aggregated user experience metrics for a sample of origins on the web. 
Each row in the dataset contains a nested record of user experience for a 
particular origin, split by key dimensions.

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

The Chrome User Experience Report is provided as a public dataset on 
[Google BigQuery](https://cloud.google.com/bigquery/). To access the dataset, 
you’ll need a Google account and a Google Cloud Project: 
[refer to our step by step guide](getting-started#access-dataset) and 
[the guided tour of how to query the dataset](getting-started#example-queries).

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
industry vertical, be careful with the types of conclusions being drawn: 
adding up densities for the same metric across multiple origins does not 
account for relative population differences across origins. 

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
browsers. 

As a result, be careful with the types of conclusions being drawn when looking 
at a cross-section of origins, and when comparing individual origins: avoid 
using absolute comparisons and consider other population factors outlined in 
the sections above.

## Feedback and suggestions {: #feedback }

We would love to hear your feedback, questions, and suggestions to help us 
improve the Chrome User Experience Report. Please join the conversation on our 
[public Google Group](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report).
