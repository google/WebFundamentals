project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Today, we’re announcing a new Chrome User Experience Report with expanded coverage of over 1 million top origins on the web.

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-12-14 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/star.png #}
{# wf_featured_snippet: Today, we’re announcing a new Chrome User Experience Report with expanded coverage of over 1 million top origins on the web. #}

# Chrome User Experience Report: expanding to top 1 Million+ origins {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="_srJ7eHS3IM?t=11m4s"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Today, we're happy to announce a new [Chrome User Experience Report](/web/tools/chrome-user-experience-report/)
with expanded coverage of over 1 million top origins on the web. Originally
[announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html)
at the Chrome Developer Summit 2017, the report is a public dataset of key
user experience metrics for popular sites on the web.

All data included in the new dataset reflects real-user measurement captured
during the [month of November 2017](https://bigquery.cloud.google.com/table/chrome-ux-report:all.201711).
CrUX performance data is based on real-world measurement, as experienced by
Chrome users across a diverse set of hardware and network conditions around the
world. Moving forward, we will release a new report monthly to provide insight
into trends and user experience changes on the web.

A key goal of CrUX is to enable macro level analysis of real-world user
experience trends on the web, expanding the scope of performance analysis beyond
an individual page or website. It has been exciting to see the community begin
to experiment with this data, for example:

+  Dexecure is [experimenting with new Site Experience
Benchmark](https://dexecure.com/blog/chrome-user-experience-report-explained-google-bigquery/)
based on CrUX data, allowing them to compare differences in user experience
across connection types, and even approximate impact
[across geographies](https://dexecure.com/blog/impact-3g-vs-4g-connections-user-experience-countries/).

+  HTTP Archive is surfacing a new [Loading report powered by
CrUX](https://beta.httparchive.org/reports/chrome-ux-report)
, which provides a macro-level comparison of key loading user experience
metrics between mobile and desktop devices.

For details on the dataset format, how to access it, and best practices for
analysis, please see our [developer
documentation](/web/tools/chrome-user-experience-report/), and join the
[discussion](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)
if you have questions or feedback. We're excited to see what you'll build with
the expanded dataset!

{% include "comment-widget.html" %}
