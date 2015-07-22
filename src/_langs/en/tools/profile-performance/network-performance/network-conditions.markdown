---
rss: false
layout: article
title: "Optimize Performance Under Varying Network Conditions"
seotitle: "Optimize Performance Under Varying Network Conditions Using Chrome DevTools Network Panel"
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
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

TBD. Doc: https://developer.chrome.com/devtools/docs/device-mode#network-conditions

TBD. Doc: Network panel docs: https://developer.chrome.com/devtools/docs/network#network-panel-overview 

TBD. Also: https://developers.google.com/web/fundamentals/tools/test/mobilenetwork?hl=en 

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
