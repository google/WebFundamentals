project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-18 #}
{# wf_published_on: 2017-10-18 #}

# Overview {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}

As the web has evolved into a browser-application platform, most of our app use has moved from powerful desktop machines with fast, reliable network connections to low-power mobile devices with slow, unreliable connections. So, regardless of the platform, network, or device, faster apps are better apps. Everyone benefits when we write pages that load and run faster, including desktop users. 

Fortunately, many effective techniques exist for improving page speed. While some are bleeding-edge innovations that can help shave 9 milliseconds off your load time, there are also many straightforward, high-level paths to achieving significant performance gains, and that's what this document set is about.

The processes we used in the past to build and deploy powerful, feature-rich sites now produce web pages that are slow to load and use, especially on mobile devices. Slow-loading pages are frustrating for users, who can't/won't use the site, and bad for developers, who forfeit those users. For example:

* Loading time is a major factor in page abandonment and loyalty; 40% of users report that they abandon sites that take more than two seconds to load, and 79% report that poor-performance sites deter them from making purchases (source: [Kissmetrics Blog](https://blog.kissmetrics.com/loading-time/))

* Users visit more often, stay longer, search more, and buy more frequently on sites that load quickly than on slower ones; a usage reduction of 0.5% (very significant at today's internet traffic rates) can occur even when the slowdown is less than half a second (source: [Google Research Blog](https://research.googleblog.com/2009/06/speed-matters.html))

* Slow loading is detrimental for search engine optimization (SEO) because it can lower your site's ranking, resulting in fewer visits, reads, and conversions; Google recently implemented site speed as a ranking signal in its searches (source: [Google Webmaster Central Blog](https://webmasters.googleblog.com/2010/04/using-site-speed-in-web-search-ranking.html)).

## The Goal

Developers often talk about measurable concepts like Time To Interactivity (TTI) or First Meaningful Paint (FMP). These are attempts to quantify an important and overarching goal, which is simply that *pages should load as quickly as possible* on the first visit and, especially, on subsequent visits so that users can access both content and behavior at the earliest possible moment.

This section contains explanations, examples, and recommendations that focus on low-effort, high-return performance wins. The content is progressive, not cumulative; that is, you don't have to use all of the proposed techniques, nor do you have to use them in any particular order. But the more of them you can apply to your web pages, the better those pages will perform.
