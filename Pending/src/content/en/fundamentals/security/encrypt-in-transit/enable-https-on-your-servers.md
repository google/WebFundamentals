project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Enabling HTTPS on your servers is a critical step in providing security for your webpages.

<p class="intro">
  Enabling HTTPS on your servers is a critical step in providing security for your webpages.
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






At this step, you must make a crucial operations decision:

* dedicate a distinct IP address to each hostname your web server serves content
  from; or
* use name-based virtual hosting.

If you have been using distinct IP addresses for each hostname, great! You can
easily support both HTTP and HTTPS for all clients.

However, most site operators use name-based virtual hosting to conserve IP
addresses and because it's more convenient in general. The problem with IE on
Windows XP and Android earlier than 2.3 is that they do not understand [Server
Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI),
which is crucial for HTTPS name-based virtual hosting.

Someday — hopefully soon — clients that don't support SNI will all be replaced
with modern software. Monitor the user agent string in your request logs to know
when enough of your user population has migrated to modern software. (You can
decide what your threshold is; perhaps &lt; 5%, or &lt; 1%, or something.)

If you don't already have HTTPS service available on your servers, enable it now
(without redirecting HTTP to HTTPS; see below). Configure your web server to use
the certificates you bought and installed. You might find [Mozilla's handy
configuration
generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
useful.

If you have many hostnames/subdomains, they'll each need to use the right
certificate.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue
























# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






Now, and throughout your site's lifetime, check your HTTPS configuration with
[Qualys' handy SSL Server Test](https://www.ssllabs.com/ssltest/). Your site
should score an A or A+; treat anything that causes a lower grade as a bug.
(Today's A is tomorrow's B, because attacks against algorithms and protocols
always get better!)


