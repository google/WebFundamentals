project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Speed is now a landing page factor for Google Search and Ads.

{# wf_updated_on: 2018-07-25 #}
{# wf_published_on: 2018-07-25 #}
{# wf_tags: performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}
{# wf_featured_snippet: Speed is now a landing page factor for Google Search and Ads. #}

# Speed is now a landing page factor for Google Search and Ads {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/ilyagrigorik.html" %}


## Speed is now a landing page factor for Google Search and Ads

When **real** users have a slow experience on mobile, they're much less likely
to find what they are looking for or purchase from you in the future. For many
sites this equates to a huge missed opportunity, especially when more than half
of visits are abandoned if a mobile page takes over [3 seconds to
load](https://www.thinkwithgoogle.com/data-gallery/detail/mobile-site-abandonment-three-second-load/). 

Last week, Google Search and Ads teams announced two new speed initiatives to
help improve user-experience on the web. Both efforts are leveraging real-world
user experience data (see [Chrome User Experience
Report](/web/tools/chrome-user-experience-report/)) to prioritize and highlight
pages that deliver optimized and fast user experiences.


### Speed is now used as a ranking factor for mobile searches

Users want to find answers to their questions quickly and
[data](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
shows that people really care about how quickly their pages load. The Search
team announced speed would be a [ranking
signal](https://webmasters.googleblog.com/2010/04/using-site-speed-in-web-search-ranking.html)
for desktop searches in 2010 and as of this month (July 2018), page [speed will
be a ranking factor for mobile
searches](https://webmasters.googleblog.com/2018/01/using-page-speed-in-mobile-search.html)
too. 

If you're a developer working on a site, now is a good time to evaluate your
performance using our [speed
tools](/web/fundamentals/performance/speed-tools/). Think about how
[performance](/web/fundamentals/performance/rail) affects the user experience
of your pages and consider measuring a variety of real-world [user-centric
performance metrics](/web/updates/2017/06/user-centric-performance-metrics).

Are you shipping [too much
JavaScript](/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/)?
[Too many
images](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)?
Images and JavaScript are the [most significant
contributors](https://paulcalvano.com/index.php/2018/07/02/impact-of-page-weight-on-load-time/)
to the page weight that affect page load time based on data from [HTTP
Archive](https://httparchive.org/) and the [Chrome User Experience
Report](/web/tools/chrome-user-experience-report/) - our public dataset for key
UX metrics as experienced by Chrome users under real-world conditions. 

To evaluate performance, check:

* [PageSpeed Insights](/speed/pagespeed/insights/), an online tool that shows
speed [field data](/web/fundamentals/performance/speed-tools/#field_data) for
your site, alongside suggestions for common optimizations to improve it. 
* [Lighthouse](/web/tools/lighthouse/), [a lab
tool](/web/fundamentals/performance/speed-tools/#lab_data) providing
personalized advice on how to improve your website across performance,
accessibility, PWA, SEO, and other best practices.


### The Mobile Speed Score for ads landing pages

Advertising and speed go hand in hand, with faster landing pages delivering
better ROI. Last week, at Google Marketing Live, the Ads team [introduced the
new mobile speed
score](https://www.blog.google/products/ads/mobile-landing-page-speed-score/).

<figure>
<div class="video-wrapper-full-width">
<iframe class="devsite-embedded-youtube-video" data-video-id="MmfaZV96x7A"
frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>
</div>
<figcaption class="clearfix align-center">
<i>
Watch the keynote to learn about Google's latest ads, analytics, and platforms
announcements. Speed announcement at [34:30](https://youtu.be/MmfaZV96x7A?t=2055).
</i>
</figcaption>
</figure>

The [1-10 mobile speed score (10 being the
fastest)](https://support.google.com/adwords/answer/7450207) is based on
**real-world user experience data**, taking into account many factors including
the relationship between page speed and potential conversion rates. This score
lets you quickly see which landing pages on mobile are providing a fast
experience on mobile and which need some work.

You should also implement [Parallel
tracking](https://support.google.com/adwords/answer/7650215), which will soon
(October 30th, 2018) become mandatory for all Ads accounts. This enhancement
helps load landing pages more quickly, which can reduce lost visits. Parallel
tracking sends customers directly from your ad to your final URL while click
measurement happens in the background using the browser's
[navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)
method.

To help discuss and prioritize speed in your organization, we've made available
tools like the [Speed
Scorecard](https://www.thinkwithgoogle.com/feature/mobile/), allowing you to
compare mobile site-speed to your peers, and the [Impact
Calculator](https://www.thinkwithgoogle.com/feature/mobile/), a tool for
estimating the revenue impact investing in speed could have on your mobile
site. 


### Next steps: measure, optimize, monitor and repeat.

Optimized web experiences lead to higher user engagement, conversions, and ROI;
performance is a feature and a competitive edge. 

Looking for tools and tips on which tools and metrics to use, or how to
evaluate and make a business case for performance? Check out our ["How to Think
about Speed Tools"](/web/fundamentals/performance/speed-tools/) guide for a
hands-on overview.

<a href="/web/fundamentals/performance/speed-tools/">
<img src="/web/updates/images/2018/07/infographic-speed-tools.jpg" alt="Speed
Tools infographic">
</a>

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}