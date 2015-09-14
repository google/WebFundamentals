---
layout: article
title: "Turn On Strict Transport Security And Secure Cookies"
description: ""
introduction: ""
id: turn-on-strict-transport-security-and-secure-cookies
collection: security-with-tls
authors:
  - chrispalmer
  - mattgaunt
article:
  written_on: 2015-03-27
  updated_on: 2015-03-27
  order: 6
priority: 0
key-takeaways:
  - You need to use HTTP Strict Transport Security (HSTS) to avoid the cost of the 301 redirect.
  - Ensure you always set the Secure flag on cookies.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

{% include modules/toc.liquid %}

At this point, you are ready to "lock in" the use of HTTPS. First, use [Strict
Transport
Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) to tell
clients that they should always connect to your server via HTTPS, even when
following an http:// reference. This defeats attacks such as [SSL
Stripping](http://www.thoughtcrime.org/software/sslstrip/), and also avoids the
round-trip cost of the 301 redirect we enabled in "Redirect HTTP to HTTPS".

**NOTE:** Clients that have noted your site as a known HSTS Host are likely to
[_hard-fail_ if your site ever has an error in
its TLS configuration](https://tools.ietf.org/html/rfc6797#section-12.1) (such
as an expired certificate). This is an explicit design choice of HSTS; it
helps ensure that network attackers cannot trick clients into accessing the
site without HTTPS. Do not enable HSTS until you are certain that your site
operation is robust enough to avoid ever deploying HTTPS with certificate
validation errors.

Turn on HTTP Strict Transport Security (HSTS) by setting the Strict-Transport-Security
header. [OWASP's HSTS page has links to
instructions](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
for various server software.

Most web servers offer a similar ability to add custom headers.

**NOTE:** max-age is measured in seconds. You can start with low values and
gradually increase the max-age as you become more comfortable operating an
HTTPS-only site.

It is also important to make sure that clients never send cookies (such as for
authentication or site preferences) over HTTP. For example, if a user's
authentication cookie were to be exposed in plaintext, the security guarantee of
their entire session would be destroyed — even if you have done everything else
right!

Therefore, change your web application to always set the Secure flag on cookies
that it sets. [This OWASP page explains how to set the Secure
flag](https://www.owasp.org/index.php/SecureFlag) in several application
frameworks. Every application framework has some way to set the flag.

{% endwrap %}
