project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Today we're releasing the CrUX Dashboard that you can use to better understand how an origin's performance evolves.

{# wf_updated_on: 2018-08-08 #}
{# wf_published_on: 2018-08-08 #}
{# wf_tags: ux,performance,chrome-ux-report #}
{# wf_blink_components: N/A #}
{# wf_featured_image: /web/updates/images/generic/quilt.png #}
{# wf_featured_snippet: Today we're releasing the CrUX Dashboard that you can use to better understand how an origin's performance evolves. #}

# Custom site performance reports with the CrUX Dashboard {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}
{% include "web/_shared/contributors/mkazi.html" %}

Continuous performance monitoring is crucial to identify trends and 
regressions before they negatively affect your site engagement and bottom line 
metrics. The 
[Chrome UX Report](/web/tools/chrome-user-experience-report/) 
(CrUX) enables you to track user experience and performance metrics for 
millions of origins -- and yes, you can even compare competitors' performance 
head-to-head! Today we're releasing the **CrUX Dashboard** that you can use to 
better understand how an origin's performance evolves. It's built on 
[Data Studio](https://cloud.google.com/data-studio/) and automatically syncs 
with the latest datasets and can be easily customized and shared with everyone 
on your team.

<figure>
  <a href="https://g.co/chromeuxdash">
    <img src="/web/updates/images/2018/08/crux-dash-fcp.png" 
    alt="The monthly distribution of First Contentful Paints for 
    developers.google.com">
  </a>
  <figcaption class="clearfix align-center">
    <i>
      The monthly distribution of First Contentful Paints for 
      developers.google.com
    </i>
  </figcaption>
</figure>

Go try it out at [g.co/chromeuxdash](https://g.co/chromeuxdash) -- it only 
takes a minute to set it up! There are a few one-time confirmation prompts, so 
if you have any hesitation refer to this helpful walkthrough video:

<figure>
  <div class="video-wrapper-full-width">
    <iframe class="devsite-embedded-youtube-video" data-video-id="DmFWL-O7EwA" 
    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
  </div>
  <figcaption class="clearfix align-center">
    <a href="https://www.youtube.com/watch?v=DmFWL-O7EwA">
      https://www.youtube.com/watch?v=DmFWL-O7EwA
    </a>
  </figcaption>
</figure>

There are now three ways to explore the Chrome UX Report dataset, so let's see 
what makes this one so special.

1. [BigQuery](/web/tools/chrome-user-experience-report/getting-started) is 
great for slicing and dicing the raw data at will across any number of 
origins. You get 1 TB of querying for 
[free](https://cloud.google.com/bigquery/pricing#free-tier) each month and a 
billing account is required to cover any overages.

2. [PageSpeed Insights](/speed/pagespeed/insights/) allows you to explore the 
latest snapshot of the user experience for a single URL or origin. You can see 
how the page load performance is distributed in a web interface or API.

3. The [CrUX Dashboard](https://g.co/chromeuxdash) enables you to see how the 
user experience of an origin changes over time. All of the data querying and 
visualizing is done for you with unlimited free usage and the data is 
automatically updated for you.

This dashboard is built on [Data Studio](https://cloud.google.com/data-studio/)
, Google's dashboarding and reporting platform that is free to use. Under the 
hood, the entire data pipeline is managed for you thanks to the Chrome UX 
Report's [community connector](/datastudio/connector/). All you need to do is 
enter an origin and it will load the data and generate the visualizations for 
you. It's even open source, so you can explore how it works in the 
[GoogleDataStudio/community-connectors](https://github.com/googledatastudio/community-connectors/tree/master/chrome-ux-report) 
repository on GitHub.

<figure>
  <a href="https://g.co/chromeuxdash">
    <img src="/web/updates/images/2018/08/crux-dash-device.png" 
    alt="The monthly distribution of form factors for 
    developers.google.com">
  </a>
  <figcaption class="clearfix align-center">
    <i>
      The monthly distribution of form factors for developers.google.com
    </i>
  </figcaption>
</figure>

In this release we've set you up with three charts:

1. First Contentful Paint
2. Device Distribution
3. Connection Distribution

Each chart includes historical data so you can see how the distribution 
changes over time. And this really is a live dashboard; the visualizations 
will automatically update after each monthly release.

<figure>
  <a href="https://g.co/chromeuxdash">
    <img src="/web/updates/images/2018/08/crux-dash-ect.png" 
    alt="The monthly distribution of effective connection types for 
    developers.google.com">
  </a>
  <figcaption class="clearfix align-center">
    <i>
      The monthly distribution of effective connection types for 
      developers.google.com
    </i>
  </figcaption>
</figure>

Some features we're exploring for future improvements are more metrics like 
[First Input Delay](/web/updates/2018/07/first-input-delay-in-crux), 
better error handling of unrecognized origins, and the ability to compare 
multiple origins. If you have any suggestions to make the dashboard even 
better, we'd love to hear from you on the 
[forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) 
or 
[@ChromeUXReport](https://twitter.com/ChromeUXReport).

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
