---
layout: shared/narrow
title: "Migration concerns"
description: "Many developers have legitimate concerns about migrating from HTTP to HTTPS. This guide discusses some concerns and provides links to additional resources."
authors:
  - chrispalmer
  - mattgaunt
published_on: 2015-03-27
updated_on: 2015-10-06
order: 7
translation_priority: 0
---

<p class="intro">
Many developers have legitimate concerns about migrating from HTTP to HTTPS. This guide discusses some concerns and provides links to additional resources.
</p>

{% include shared/toc.liquid %}

## Search Ranking

[Google is using HTTPS as a positive search quality
indicator](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google also publishes a guide for [how to transfer, move, or migrate your
site](https://support.google.com/webmasters/topic/6029673) while maintaining its
search rank. Bing also publishes [guidelines for
webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

## Performance

When the content and application layers are well-tuned (see [Steve Souders'
books](https://stevesouders.com/) for great advice), the remaining TLS
performance concerns are generally small, relative to the overall cost of the
application. Additionally, you can reduce and amortize those costs. (For great
advice on TLS optimization and generally, see _[High Performance Browser
Networking](http://chimera.labs.oreilly.com/books/1230000000545)_[ by Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545).) See also Ivan
Ristic's _[OpenSSL
Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)_ and _[Bulletproof
SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_.

In some cases, TLS can _improve_ performance, mostly as a result of making
HTTP/2 possible. Chris Palmer gave [a talk on HTTPS and HTTP/2 performance at Chrome Dev
Summit 2014]({{site.WFBaseUrl}}/shows/cds/2014/tls-all-the-things).

## Referer Headers

User agents will not send the Referer header when users follow links from your
HTTPS site to other HTTP sites. If that is a problem, there are several ways to
solve it:

* The other sites should migrate to HTTPS. Perhaps they might find this guide
  useful! :) If referee sites can complete [Enable HTTPS On Your Servers](enable-https-on-your-servers) section of this guide, you can change
  links in your site to theirs from `http://` to `https://`, or you can use
  protocol-relative links.
* You can use the new [Referrer Policy
  standard](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
  to work around a variety of problems with Referer headers.

Because search engines are migrating to HTTPS, you are likely see _more_ Referer
headers when you migrate to HTTPS than you are now.

<blockquote>Clients <b>SHOULD NOT</b> include a Referer header field in a (non-secure) HTTP request if the referring page was transferred with a secure protocol.
  <p>
    <a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">According to the HTTP RFC</a>
  </p>
</blockquote>

## Ad Revenue

Site operators that monetize their site by showing ads want to make sure that
migrating to HTTPS does not reduce ad impressions. But, due to mixed content
security concerns, an HTTP `iframe` will not work in an HTTPS page. There is a
tricky collective action problem here: until advertisers publish over HTTPS,
site operators cannot migrate to HTTPS without losing ad revenue; but until site
operators migrate to HTTPS, advertisers have little motivation to publish HTTPS.

Advertisers should at least offer ad service via HTTPS (such as by completing
the "Enable HTTPS On Your Servers" in this guide). Many already do. You 
should ask advertisers that do not serve HTTPS at all to at least start. 
You may wish to defer completing 
[Make Intra-Site URLs Relative](make-intra-site-urls-relative) in
this guide until enough advertisers interoperate properly.

