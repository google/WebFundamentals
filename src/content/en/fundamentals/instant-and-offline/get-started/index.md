project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-02-20 #}
{# wf_published_on: 2018-02-20 #}
{# wf_blink_components: Blink>PerformanceAPIs,Blink>JavaScript>Runtime #}

# Overview {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}


As the web has evolved into a browser-application platform, most of our app use has moved from 
powerful desktop machines with fast, reliable network connections to low-power mobile devices with 
slow, unreliable connections. So, regardless of the platform, network, or device, faster apps are 
better apps. Everyone benefits when we write pages that load and run faster, including desktop
users. 

Fortunately, many effective techniques exist for improving page speed. While some are bleeding-edge
innovations that can help shave 9 milliseconds off your load time, there are also many
straightforward, high-level paths to achieving significant performance gains, and that's what this
document set is about.

The processes we used in the past to build and deploy powerful, feature-rich sites now produce web 
pages that are slow to load and use, especially on mobile devices. Slow-loading pages are
frustrating for users, who can't/won't use the site, and bad for developers, who forfeit those
users. For example, various studies reveal common trends.

- Loading time is a major factor in page abandonment and loyalty; 53% of users report that they 
abandon sites that take more than three seconds to load (source: 
[SOASTA Google study report](https://soasta.com/blog/google-mobile-web-performance-study/)).

- Users visit more often, stay longer, search more, and buy more frequently on sites that load 
quickly than on slower ones; one company found that a conversion increase of 7% resulted from a 
speed improvement of as little as .85 seconds (source: [WPO Stats](https://wpostats.com/)).

- Slow loading is detrimental for search engine optimization (SEO) because it can lower your site's 
ranking, resulting in fewer visits, reads, and conversions; in 2018, Google will implement site speed 
as a ranking signal in its mobile searches (source: 
[Search Engine Land](https://searchengineland.com/google-speed-update-page-speed-will-become-ranking-factor-mobile-search-289904).

Google has published extensive research on the impact of performance on user engagement, including 
[Mobile Speed Matters](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/).
There is also a wealth of web performance statistics and case studies available at independent sites such as 
[WPOStats](https://wpostats.com)
and
[PWAStats](https://www.pwastats.com).

## The Goal

Developers often talk about measurable concepts like Time To Interactivity (TTI) or First Meaningful 
Paint (FMP). These are attempts to quantify an important and overarching goal, which is simply that 
*pages should load as quickly as possible* on the first visit and, especially, on subsequent visits 
so that users can access both content and behavior at the earliest possible moment.

If you're new to web performance metrics concepts and terms and would like to learn more, 
please see the Google overview article 
[Leveraging the Performance Metrics that Most Affect User Experience](web/updates/2017/06/user-centric-performance-metrics).

This document set contains explanations, examples, and recommendations that focus on low-effort, 
high-return performance wins. The content is progressive, not cumulative; that is, you don't have 
to use all of the proposed techniques, nor do you have to use them in any particular order. But 
the more of them you can apply to your web pages, the better those pages will perform.

