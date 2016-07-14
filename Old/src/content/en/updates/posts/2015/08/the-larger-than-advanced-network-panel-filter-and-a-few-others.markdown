---
layout: updates/post
title: "The larger-than advanced Network Panel filter, and a few others"
published_on: 2015-08-25
updated_on: 2015-08-25
tags:
  - devtools
authors:
  - umarhansa
description: "Did you know that the filter in the Network panel supports a few nifty custom search labels?"
featured_image: /web/updates/images/2015-08-21-the-larger-than-advanced-network-panel-filter-and-a-few-others/network-advanced-filter.gif
source_name: DevTips
source_url: https://umaar.com/dev-tips/55-network-advanced-filter/
---
<img src="/web/updates/images/2015-08-21-the-larger-than-advanced-network-panel-filter-and-a-few-others/network-advanced-filter.gif" alt="The larger-than advanced Network Panel filter, and a few others">

Use the Advanced Network Panel Filtering feature to narrow down resources to exactly what you want to find. For example:

<ul>
<li>
<code>larger-than:100</code> will find and filter for resources larger than 100 bytes</li>
<li>You can negate a query by prepending a '-' to it. E.g. <code>-larger-than:50k</code> to find resources which are <em>not</em> larger than 50k.</li>
<li>
<code>status-code:200</code> to find resources with a status code response of <code>200</code>.</li>
</ul>

A few other queries which you can experiment with:

<ul>
<li>domain</li>
<li>mime-type</li>
<li>scheme</li>
<li>set-cookie-domain</li>
<li>set-cookie-value</li>
<li>has-response-header</li>
</ul>

Note: you get autocomplete for these, it makes it easier to discover query types and their corresponding values. The values which autocomplete will exist in your current network recording.
