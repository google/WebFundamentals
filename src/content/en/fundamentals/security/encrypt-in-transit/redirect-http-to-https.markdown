---
layout: shared/narrow
title: "Redirect HTTP to HTTPS"
description: "To tell search engines that HTTPS is the best way to access your site, put a canonical link in the head section of your pages."
authors:
  - chrispalmer
  - mattgaunt
published_on: 2015-03-27
updated_on: 2015-10-06
order: 5
translation_priority: 0
key-takeaways:
  - "You need to put a canonical link in the head of your page to tell search engines that HTTPS is the best way to get to your site."
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

Set `<link rel="canonical" href="https://…"/>` tags in your pages. [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
know the best way to get to your site.

Most web servers offer a simple redirect feature. Use `301 (Moved Permanently)` to
indicate to search engines and browsers that the HTTPS version is canonical and redirect your users to the HTTPS version of your site from HTTP.

