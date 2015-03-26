---
layout: article
title: "Redirect HTTP to HTTPS"
description: ""
introduction: ""
id: redirect-http-to-https
collection: security-with-tls
authors:
  - mattgaunt
article:
  written_on: 2015-02-11
  updated_on: 2015-02-11
  order: 5
key-takeaways:
  -
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

{% include modules/toc.liquid %}

Set &lt;link rel="canonical" href="https://…"/&gt; tags in your pages. [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
know the best way to get to your site.

Most web servers offer a simple redirect feature. Use 301 (Moved Permanently) to
indicate to search engines and browsers that the HTTPS version is canonical.

{% endwrap %}
