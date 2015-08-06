---
layout: article
title: "Redirect HTTP to HTTPS"
description: ""
introduction: ""
id: redirect-http-to-https
collection: security-with-tls
authors:
  - chrispalmer
  - mattgaunt
article:
  written_on: 2015-03-27
  updated_on: 2015-03-27
  order: 5
priority: 0
key-takeaways:
  - You need to put a canonical link in the head of your page to tell search engines https is the best way to get to your site.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

Set &lt;link rel="canonical" href="https://…"/&gt; tags in your pages. [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
know the best way to get to your site.

Most web servers offer a simple redirect feature. Use 301 (Moved Permanently) to
indicate to search engines and browsers that the HTTPS version is canonical and redirect your users to the HTTPS version of your site from HTTP.

{% endwrap %}
