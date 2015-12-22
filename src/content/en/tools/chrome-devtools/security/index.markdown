---
layout: shared/narrow
title: "Security"
description: "Use the Security Panel to ensure that all resources on your 
site are protected with HTTPS."
published_on: 2015-12-22
updated_on: 2015-12-22
order: 2
authors:
  - kaycebasques
translation_priority: 0
key-takeaways:
  security:
    - 1
    - 2
    - 3
---

HTTPS provides [critical security and data integrity][why-https] 
both for your websites and for the people that entrust your websites 
with their personal information. Use the Security Panel in Chrome DevTools 
to debug security issues and ensure that you have properly implemented 
HTTPS on your websites.

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.security %}

## Security Overview

To view the overall security of a page, open DevTools and go to the 
Security Panel. 

The first thing you see is the Security Overview. At a glance, the 
Security Overview tells you whether the page is secure. A secure page is 
indicated with the message “This page is secure (valid HTTPS).”

![example of secure page][overview-secure]

Click **View certificate** to view the server certificate for the 
[main origin][same-origin-policy]. 

![example of view certificate][view-certificate]

A non-secure page is indicated with the message “This page is not secure.”

The Security Panel distinguishes between two types of non-secure pages. 
If the requested page is served over HTTP, then the main origin is flagged as 
not secure. 

![example of page with non-secure main origin][overview-non-secure]

If the requested page is retrieved over HTTPS, but the page then goes on 
to retrieve content from other origins using HTTP, then the page is still 
flagged as not secure. This is known as a [mixed content][mixed-content] 
page. Mixed content pages are only partially protected because the HTTP 
content is accessible to sniffers and vulnerable to man-in-the-middle attacks. 

![example of non-secure page with mixed content][overview-mixed]

Click **View request** in Network Panel to open up a filtered view of the 
Network Panel and see exactly which requests were served over HTTP. This shows 
all unprotected requests from all origins. 

![all non-secure resources][network-all]

## Inspect origins

Use the left panel to inspect an individual secure or non-secure origin. 

Click on a secure origin to view the connection and certificate details for 
that origin.

![secure origin details][secure-origin-details]

If you click on a non-secure origin, the Security Panel provides a link to a filtered view of the Network Panel. 

![non-secure origin details][non-secure-origin-details]

Click on the link to see exactly which requests from that origin were 
served over HTTP. 

![non-secure resources from single origin][network-single]

[network-single]: /web/tools/chrome-devtools/security/images/non-secure-origin-filtered.png
[non-secure-origin-details]: /web/tools/chrome-devtools/security/images/non-secure-origin.png
[non-secure-resources-one-origin]: /web/tools/chrome-devtools/security/images/non-secure-origin-filtered.png
[network-all]: /web/tools/chrome-devtools/security/images/network-all-non-secure-resources.png
[mixed-content]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https
[overview-secure]: /web/tools/chrome-devtools/security/images/overview-secure.png
[view-certificate]: /web/tools/chrome-devtools/security/images/view-certificate.png
[overview-non-secure]: /web/tools/chrome-devtools/security/images/overview-non-secure.png
[overview-mixed]: /web/tools/chrome-devtools/security/images/overview-mixed.png
