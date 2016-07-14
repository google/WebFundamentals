---
layout: shared/narrow
title: "Turn on Strict Transport Security and secure cookies"
description: "Strict Transport Security (STS) tells user agents they should always connect to your site via HTTPS. Coupling STS with secure cookies helps prevent accidental exposure of authentication and other site information."
authors:
  - chrispalmer
  - mattgaunt
published_on: 2015-03-27
updated_on: 2015-10-06
order: 6
translation_priority: 0
key-takeaways:
  - "You need to use HTTP Strict Transport Security (HSTS) to avoid the cost of the 301 redirect."
  - "Ensure you always set the Secure flag on cookies."
notes:
  hsts: 'Clients that have noted your site as a known HSTS Host are likely to <a href="https://tools.ietf.org/html/rfc6797#section-12.1"><i>hard-fail</i> if your site ever has an error in its TLS configuration</a> (such as an expired certificate). This is an explicit design choice of HSTS; it helps ensure that network attackers cannot trick clients into accessing the site without HTTPS. Do not enable HSTS until you are certain that your site operation is robust enough to avoid ever deploying HTTPS with certificate validation errors.'
  max-age: "<code>max-age</code> is measured in seconds. You can start with low values and gradually increase the <code>max-age</code> as you become more comfortable operating an HTTPS-only site."
---

<p class="intro">
At this point, you are ready to "lock in" the use of HTTPS. 
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

First, use [Strict
Transport
Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) to tell
clients that they should always connect to your server via HTTPS, even when
following an http:// reference. This defeats attacks such as [SSL
Stripping](http://www.thoughtcrime.org/software/sslstrip/), and also avoids the
round-trip cost of the 301 redirect we enabled in "Redirect HTTP to HTTPS".

{% include shared/note.liquid list=page.notes.hsts %}

Turn on HTTP Strict Transport Security (HSTS) by setting the `Strict-Transport-Security`
header. [OWASP's HSTS page has links to
instructions](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
for various server software.

Most web servers offer a similar ability to add custom headers.

{% include shared/note.liquid list=page.notes.max-age %}

It is also important to make sure that clients never send cookies (such as for
authentication or site preferences) over HTTP. For example, if a user's
authentication cookie were to be exposed in plaintext, the security guarantee of
their entire session would be destroyed — even if you have done everything else
right!

Therefore, change your web application to always set the Secure flag on cookies
that it sets. [This OWASP page explains how to set the Secure
flag](https://www.owasp.org/index.php/SecureFlag) in several application
frameworks. Every application framework has some way to set the flag.

