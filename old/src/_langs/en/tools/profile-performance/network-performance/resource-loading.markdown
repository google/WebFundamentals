---
rss: false
layout: article
title: "Measure Resource Loading Times"
seotitle: "Measure Resource Loading Times Using Chrome DevTools Network Panel"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 1
authors:
  - megginkearney
priority: 0
collection: network-performance
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

TBD. Main doc: Main doc for this stuff: developer.chrome.com/devtools/docs/network

TBD. Include:

** Which resource had the slowest time to first byte (latency)? Research latency a little bit.

** Which resource took the longest time to load (duration)? Research duration a little bit.

** Kind of like the idea of a section: What’s the difference between measuring latency and duration?

** How much time was spent in various network phases for a particular resource?

** How to distinguish performance by resource type. DevTools color-coding for resource types in Network panel is cool. I want to raise this up a bit, but not in love with first go at title.

** Determine who initiated a network request

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

## Fix slow page loads

If your users wait longer than 1 second for a page load,
there's a good chance they won't be coming back.
Successful page loads aren't about getting everyone on a page to load under 1 second.
You need to prioritize and display content that relates
to the primary action users want to take on that page.

Follow these steps to optimize the critical rendering path to deliver fast first page loads (see [Optimizing the Critical Rendering Path](/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path)):

1. Analyze your critical path: number of resources, bytes, length. Use the Chrome DevTools Network panel to [measure resource loading times](/web/tools/profile-performance/network-performance/resource-loading).
2. Minimize number of critical resources (eliminate, defer, mark as async).
3. Optimize the order in which critical resources are downloaded.
4. Reduce the number of roundtrips to get critical bytes.

Use the [PageSpeed Insights tool](https://developers.google.com/speed/pagespeed/insights/)
to test page loads and find out what's getting in the way of the critical rendering path.
You and also find out more in [PageSpeed Rules and Recommendations](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations).

{% include modules/remember.liquid title="Remember" list=page.remember.note-tbd %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
