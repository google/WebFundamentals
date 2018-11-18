project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the addition of the First Input Delay (FID) experimental metric to the Chrome User Experience Report.

{# wf_updated_on: 2018-07-10 #}
{# wf_published_on: 2018-07-10 #}
{# wf_tags: ux,performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}
{# wf_featured_image: /web/updates/images/misc/first-input-delay.png #}
{# wf_featured_snippet: Announcing the addition of the First Input Delay (FID) experimental metric to the Chrome User Experience Report. #}

# Experimenting with First Input Delay in the Chrome UX Report {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

The goal of the 
[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) 
is to help the web community understand the distribution and evolution of real 
user performance. To date, our focus has been on paint and page load metrics 
like First Contentful Paint (FCP) and Onload (OL), which have helped us 
understand how websites _visually_ perform for users. Starting with the 
June 2018 release, we’re experimenting with a new user-centric metric that 
focuses on the _interactivity_ of web pages: 
[First Input Delay](https://github.com/WICG/event-timing) 
(FID). This new metric will enable us to better understand how responsive 
websites are to user input.

FID was recently made available in Chrome as an 
[origin trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md), 
which means that websites can opt into experimenting with this new web platform 
feature. Similarly, FID will be available in the Chrome UX Report as an 
_experimental_ metric, which means it will be available for the duration of the 
origin trial within a separate "experimental" namespace.

## How FID is measured  {: #fid-measurement }

So what exactly is FID? Here’s how it’s defined in the 
[First Input Delay](/web/updates/2018/05/first-input-delay) 
announcement blog post:

> First Input Delay (FID) measures the time from when a user first interacts 
with your site (i.e. when they click a link, tap on a button, or use a custom, 
JavaScript-powered control) to the time when the browser is actually able to 
respond to that interaction.

<figure>
	<div class="video-wrapper-full-width">
		<iframe class="devsite-embedded-youtube-video" data-video-id="5mo8JfIi3HI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
		</iframe>
	</div>
	<figcaption class="clearfix align-center">
		<i>
			Animation showing how a busy main thread delays the response to a 
			user interaction.
		</i>
	</figcaption>
</figure>

It’s like measuring the time from ringing someone’s doorbell to them answering 
the door. If it takes a long time, there could be many reasons. For example, 
maybe the person is far away from the door or maybe they cannot move quickly. 
Similarly, web pages may be busy doing other work or the user’s device may be 
slow.

<div class="clearfix"></div>

## Exploring FID in the Chrome UX Report {: #fid-in-crux }

With one month of FID data from millions of origins, there is already a wealth 
of interesting insights to be discovered. Let’s look at a few queries that 
demonstrate how to extract these insights from the Chrome UX Report on BigQuery.

Let’s start by querying for the percent of fast FID experiences for [developers.google.com](/). 
We can define a fast experience as one in which FID is less than 100 ms. 
Per [RAIL recommendations](/web/fundamentals/performance/rail#ux), 
if the delay is 100 ms or better, it should feel instantaneous to the user.

```sql
SELECT
  ROUND(SUM(IF(fid.start < 100, fid.density, 0)), 4) AS fast_fid
FROM
  `chrome-ux-report.all.201806`,
  UNNEST(experimental.first_input_delay.histogram.bin) AS fid
WHERE
  origin = 'https://developers.google.com'
```

The results show that 95% of FID experiences on this origin are perceived as 
instantaneous. That seems really good, but how does it compare to all origins 
in the dataset?

```sql
SELECT
  ROUND(SUM(IF(fid.start < 100, fid.density, 0)) / SUM(fid.density), 4) AS fast_fid
FROM
  `chrome-ux-report.all.201806`,
  UNNEST(experimental.first_input_delay.histogram.bin) AS fid
```

The results of this query show that 84% of FID experiences are less than 100 ms. 
So developers.google.com is above average. 

Note: This is also your periodic reminder that origin popularity is not 
represented anywhere in the dataset. So an origin that gets a few million 
instant FID experiences may have the same density as one that only gets a few 
hundred visitors with instant FID experiences.

Next, let’s try slicing this data to see if there’s a difference between the 
percent of fast FID on desktop versus mobile. One hypothesis is that mobile 
devices have slower FID values, possibly due to slower hardware compared to 
desktop computers. If the CPU is less powerful, it may be busier for a longer 
time and result in slower FID experiences.

```sql
SELECT
  form_factor.name AS form_factor,
  ROUND(SUM(IF(fid.start < 100, fid.density, 0)) / SUM(fid.density), 4) AS fast_fid
FROM
  `chrome-ux-report.all.201806`,
  UNNEST(experimental.first_input_delay.histogram.bin) AS fid
GROUP BY
  form_factor
```


<table>
  <tr>
    <th>form_factor</th>
    <th>fast_fid</th>
  </tr>
  <tr>
    <td>desktop</td>
    <td>96.02%</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>79.90%</td>
  </tr>
  <tr>
    <td>tablet</td>
    <td>76.48%</td>
  </tr>
</table>

The results corroborate our hypothesis. Desktop has a higher cumulative density 
of fast FID experiences than phone and tablet form factors. Understanding _why_ 
these differences exist, eg CPU performance, would require A/B testing outside 
the scope of the Chrome UX Report.

Now that we’ve seen how to identify whether an origin has fast FID experiences, 
let’s take a look at a couple of origins that perform really well.

### Example 1: [http://secretlycanadian.com](https://www.webpagetest.org/result/180709_RY_af81367611c5f54234743c8007b5bd3b/)  {: #eg-secrentlycanadian }

<a href="https://www.webpagetest.org/video/compare.php?tests=180709_RY_af81367611c5f54234743c8007b5bd3b-r%3A1-c%3A0&thumbSize=200&ival=1000&end=visual">
  <img src="/web/updates/images/misc/fid-secretlycanadian-filmstrip.png" 
  	alt="WebPageTest filmstrip of secretlycanadian.com">
</a>

This origin has [98%](https://bigquery.cloud.google.com/savedquery/920398604589:acd2cc3aca234853a2b7cc81a65c4714) 
of FID experiences under 100 ms. How do they do it? Analyzing how it’s built in 
[WebPageTest](https://www.webpagetest.org/result/180703_KR_4f7f792405dc77d162766a9e70267309/3/details/#waterfall_view_step1), 
we can see that it’s quite an image-heavy WordPress page but it has 168 KB of 
JavaScript that executes in about 500 ms on our lab machine. This is not very 
much JavaScript according to the [HTTP Archive](https://httparchive.org/reports/page-weight?start=2018_06_15&wptid=180709_RY_af81367611c5f54234743c8007b5bd3b#bytesJs), 
which puts this page in the 28th percentile.

<a href="https://www.webpagetest.org/result/180709_RY_af81367611c5f54234743c8007b5bd3b/1/details">
  <img src="/web/updates/images/misc/fid-secretlycanadian-waterfall.png" 
  	alt="WebPageTest waterfall of secretlycanadian.com">
</a>

The pink bar spanning 2.7 to 3.0 seconds is the _Parse HTML_ phase. During this 
time the page is not interactive and appears visually incomplete (see “3.0s” 
in the filmstrip above). After that, any long tasks that do need to be processed 
are broken up to ensure that the main thread stays quiescent. The pink lines on 
row 11 demonstrate how the JavaScript work is spread out in quick bursts.

### Example 2: [https://www.wtfast.com](https://www.webpagetest.org/result/180709_MJ_1e68212ac52efd92090f6d3755076711/) {: #eg-wtfast }

<a href="https://www.webpagetest.org/video/compare.php?tests=180709_MJ_1e68212ac52efd92090f6d3755076711-r%3A1-c%3A0&thumbSize=200&ival=1000&end=visual">
  <img src="/web/updates/images/misc/fid-wtfast-filmstrip.png" 
  	alt="WebPageTest filmstrip of wtfast.com">
</a>

This origin has [96%](https://bigquery.cloud.google.com/savedquery/920398604589:f0c3398ab01b40b49069ddac9d5a4549) instant FID 
experiences. It loads 267 KB of JavaScript (38th percentile in HTTP Archive) and 
processes it for 900 ms on the lab machine. The filmstrip shows that the page 
takes about 5 seconds to paint the background and about 2 more seconds to paint 
the content.

<a href="https://www.webpagetest.org/result/180709_MJ_1e68212ac52efd92090f6d3755076711/3/details">
  <img src="/web/updates/images/misc/fid-wtfast-waterfall.png" 
  	alt="WebPageTest waterfall of wtfast.com">
</a>

What’s most interesting about the [results](https://www.webpagetest.org/result/180709_MJ_1e68212ac52efd92090f6d3755076711/3/details) 
is that nothing interactive is even visible while the main thread is busy 
between 3 and 5 seconds. _It’s actually the slowness of this page’s FCP that 
improves the FID_. This is a good example of the importance of using many metrics 
to represent the user experience.

## Start exploring {: #start-exploring }

You can learn more about FID in this week’s episode of _The State of the Web_:

<div class="video-wrapper-full-width">
	<iframe class="devsite-embedded-youtube-video" data-video-id="ULU-4-ApcjM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
	</iframe>
</div>

Having FID available in the Chrome UX Report enables us to establish a baseline 
of interactivity experiences. Using this baseline, we can observe its change in 
future releases or benchmark individual origins. If you’d like to start 
collecting FID in your own site’s field measurements, sign up for the origin 
trial by going to [bit.ly/event-timing-ot](http://bit.ly/event-timing-ot) 
and select the Event Timing feature. And of course, [start exploring](/web/tools/chrome-user-experience-report/getting-started) 
the dataset for interesting insights into the state of interactivity on the web. 
This is still an experimental metric, so please give us your feedback and share 
your analysis on the [Chrome UX Report discussion group](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) 
or [@ChromeUXReport](https://twitter.com/ChromeUXReport) on Twitter.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
