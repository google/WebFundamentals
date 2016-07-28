project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Two of the hurdles developers face when migrating to HTTPS are concepts and terminology. This guide provides a brief overview of both.

# Enabling HTTPS on Your Servers {: .page-title }



## Generating keys and certificate signing requests

This section uses the openssl command-line program, which comes with most
Linux, BSD, and Mac OS X systems, to generate private / public keys and a CSR.

  - "You need to create a 2048-bit RSA public and private key pair."
  - "Generate a certificate signing request (CSR) which embeds your public key."
  - "Share your CSR with your Cerfticate Authority (CA) to receive a final certificate or certificate chain."
  - "Install your final certificate in a non-web-accessible place such as /etc/ssl (Linux and Unix) or wherever IIS wants them (Windows)."

### Generate A Public/Private Key Pair

In this example, we'll generate a 2,048-bit RSA key pair. (A smaller key, such
as 1,024 bits, is insufficiently resistant to brute-force guessing attacks. A
larger key, such as 4,096 bits, is overkill. Over time, key sizes increase as
computer processing gets cheaper. 2,048 is currently the sweet spot.)

The command to generate the RSA keypair is:

    openssl genrsa -out www.example.com.key 2048

This will give you the following output:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Generate A CSR

In this step, you embed your public key and information about your organization
and your web site into a certificate signing request. *openssl* will interactively
ask you for that metadata.

Running the following command:

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

Will output the following:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

Now, make sure the CSR looks right which you can do with this command:

    openssl req -text -in www.example.com.csr -noout

And the response should look like the following:

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### Submit Your CSR To A CA

Depending on what CA you want to use, there will be different ways to send them
your CSR: using a form on their web site, sending it by email, or something
else. Some CAs (or their resellers) may even automate some or all of the process
(including, in some cases, key pair and CSR generation).

Send the CA your CSR, and follow their instructions to receive your final
certificate or certificate chain.

Different CAs will charge different amounts of money for the service of vouching
for your public key.

There are also options for mapping your key to more than 1 DNS name, including
several distinct names (e.g. all of example.com, www.example.com, example.net,
and www.example.net) or "wildcard" names such as \*.example.com.

For example, 1 CA currently offers these prices:

* Standard: $16/year, valid for example.com and www.example.com.
* Wildcard: $150/year, valid for example.com and \*.example.com.

At these prices, wildcard certificates are economical when you have more than 9
subdomains; otherwise, you can just buy 1 or more single-name certificates. (If
you have more than, say, 5 subdomains, you might find a wildcard certificate
more convenient when you come to enable HTTPS on your servers.)

Note: Keep in mind that in wildcard certificates the wildcard applies to only 1 DNS label. A certificate good for \*.example.com will work for foo.example.com and bar.example.com, but _not_ for foo.bar.example.com.

Copy the certificates to all your front-end servers in a non-web-accessible
place such as /etc/ssl (Linux and Unix) or wherever IIS wants them (Windows).

## Enable HTTPS On Your Servers

Enabling HTTPS on your servers is a critical step in providing security for your webpages.

  - "Use Mozilla's Server Configuration tool to set up your server for HTTPS support."
  - "Regularly test your site with the Qualys' handy SSL Server Test and ensure you get at least an A or A+."

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

Warning: Many site operators have already completed the steps we’ve covered, but are using HTTPS for the sole purpose of redirecting clients back to HTTP. If you are doing that, stop doing that now. See the next section to make sure HTTPS and HTTP work smoothly.

Note: Ultimately you should redirect HTTP requests to HTTPS and use HTTP Strict Transport Security (HSTS). This is not the right stage in the migration process to do that; see “Redirect HTTP To HTTPS” and “Turn On Strict Transport Security And Secure Cookies”.

Now, and throughout your site's lifetime, check your HTTPS configuration with
[Qualys' handy SSL Server Test](https://www.ssllabs.com/ssltest/). Your site
should score an A or A+; treat anything that causes a lower grade as a bug.
(Today's A is tomorrow's B, because attacks against algorithms and protocols
always get better!)

## Make Intrasite URLs Relative

Now that you are serving your site on both HTTP and HTTPS, it needs to work as
smoothly as possible, regardless of protocol. An important factor is using
relative URLs for intra-site links.

  - "Make sure intra-site URLs and external URLs are agnostic to protocol, i.e. make sure you use relative paths or leave out the protocol like `//example.com/something.js`"


But, a problem arises when you serve a page via HTTPS that includes HTTP
resources: [mixed content](/web/fundametnals/security/prevent-mixed-content/what-is-mixed-content),
browsers will warn the user that the full strength of HTTPS has been lost. In
fact, in the case of active mixed content (script, plug-ins, CSS, iframes),
browsers often simply won't load or execute the content at all — resulting in a
broken page.

Note: It is perfectly OK to include HTTPS resources in an HTTP page.

Additionally, when you link to other pages in your site, users could get
downgraded from HTTPS to HTTP.

These problems happen when your pages include fully-qualified, intra-site URLs
that use the *http://* scheme. 

<p><span class="compare-worse">Not recommended</span> — avoid fully qualified intra-site URLs</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

That is, make intra-site URLs as relative as possible: either protocol-relative
(lacking a protocol, starting with `//example.com`) or host-relative (starting
with just the path, like `/jquery.js`).

<p><span class="compare-better">Recommended</span> — use protocol-relative intra-site URLs</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">Recommended</span> — use relative intra-site URLs</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

Do this with a script, not by hand. If your site’s content is in a database,
you’ll want to test your script on a development copy of your database. If
your site’s content is simple files, test your script on a development copy of
the files. Only push the changes to production after the changes pass QA, as
normal. You can use [Bram van Damme’s script](https://github.com/bramus/mixed-content-scan)
or something like it to detect mixed content in your site.

When linking to other sites (as opposed to including resources from them),
don’t change the protocol since you don’t have control over how those sites
operate.

Success: I recommend protocol-relative URLs to make migration smoother for large sites. If you are not sure you can fully deploy HTTPS yet, forcing your site to use HTTPS for all sub-resources may backfire. There is likely to be a period of time in which HTTPS is new and weird for you, and the HTTP site must still work as well as ever. Over time, you’ll complete the migration and can lock in HTTPS (see the next two sections).

If your site depends on script, image, or other resources served from a third
party, such as a CDN, jquery.com, or the like, you have 2 options:

* Use protocol-relative URLs for these resources, too. If the third party does
  not serve HTTPS, ask them to. Most already do, including jquery.com.
* Serve the resources from a server you control, and which offers both HTTP and
  HTTPS. This is often a good idea anyway, because then you have better control
  over your site's appearance, performance, and security. You don't have to
  trust a third party, which is always nice.

Keep in mind also that you will need to change intra-site URLs in your
stylesheets, JavaScript, redirect rules, `<link>` tags, and CSP
declarations as well — not just the HTML pages!

## Redirect HTTP to HTTPS

  - "You need to put a canonical link in the head of your page to tell search engines that HTTPS is the best way to get to your site."

Set `<link rel="canonical" href="https://…"/>` tags in your pages. [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
know the best way to get to your site.

## Turn on Strict Transport Security and Secure Cookies

At this point, you are ready to "lock in" the use of HTTPS. 

  - "You need to use HTTP Strict Transport Security (HSTS) to avoid the cost of the 301 redirect."
  - "Ensure you always set the Secure flag on cookies."

First, use [Strict Transport Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
to tell clients that they should always connect to your server via HTTPS, even
when following an `http://` reference. This defeats attacks such as
[SSL Stripping](http://www.thoughtcrime.org/software/sslstrip/), and also
avoids the round-trip cost of the `301 redirect` we enabled in 
[Redirect HTTP to HTTPS](#redirect-http-to-https).

Note: Clients that have noted your site as a known HSTS Host are likely to <a href="https://tools.ietf.org/html/rfc6797#section-12.1"><i>hard-fail</i> if your site ever has an error in its TLS configuration</a> (such as an expired certificate). This is an explicit design choice of HSTS; it helps ensure that network attackers cannot trick clients into accessing the site without HTTPS. Do not enable HSTS until you are certain that your site operation is robust enough to avoid ever deploying HTTPS with certificate validation errors.

Turn on HTTP Strict Transport Security (HSTS) by setting the `Strict-Transport-Security`
header. [OWASP's HSTS page has links to instructions](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security)
for various server software.

Most web servers offer a similar ability to add custom headers.

Note: `max-age` is measured in seconds. You can start with low values and gradually increase the `max-age` as you become more comfortable operating an HTTPS-only site.

It is also important to make sure that clients never send cookies (such as for
authentication or site preferences) over HTTP. For example, if a user's
authentication cookie were to be exposed in plaintext, the security guarantee of
their entire session would be destroyed — even if you have done everything else
right!

Therefore, change your web application to always set the Secure flag on cookies
that it sets. [This OWASP page explains how to set the Secure flag](https://www.owasp.org/index.php/SecureFlag)
in several application frameworks. Every application framework has some way to set the flag.

Most web servers offer a simple redirect feature. Use `301 (Moved Permanently)` to
indicate to search engines and browsers that the HTTPS version is canonical and redirect your users to the HTTPS version of your site from HTTP.

## Migration Concerns

Many developers have legitimate concerns about migrating from HTTP to HTTPS.
The Google Webmasters Team has some [excellent guideance](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J) available.

### Search Ranking

Google is using [HTTPS as a positive search quality indicator](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
Google also publishes a guide for
[how to transfer, move, or migrate your site](https://support.google.com/webmasters/topic/6029673)
while maintaining its search rank. Bing also publishes
[guidelines for webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

### Performance

When the content and application layers are well-tuned (see
[Steve Souders' books](https://stevesouders.com/) for great advice), the
remaining TLS performance concerns are generally small, relative to the
overall cost of the application. Additionally, you can reduce and amortize
those costs. (For great advice on TLS optimization and generally, see 
[High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545)
by [Ilya Grigorik](http://chimera.labs.oreilly.com/books/1230000000545).) See also Ivan
Ristic's [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)
and [Bulletproof SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/).

In some cases, TLS can _improve_ performance, mostly as a result of making
HTTP/2 possible. Chris Palmer gave a talk on [HTTPS and HTTP/2 performance at Chrome Dev
Summit 2014](/web/shows/cds/2014/tls-all-the-things).

### Referer Headers

User agents will not send the Referer header when users follow links from your
HTTPS site to other HTTP sites. If that is a problem, there are several ways to
solve it:

* The other sites should migrate to HTTPS. Perhaps they might find this guide
  useful! :) If referee sites can complete
  [Enable HTTPS On Your Servers](enable-https-on-your-servers) section of this
  guide, you can change links in your site to theirs from `http://` to
  `https://`, or you can use protocol-relative links.
* You can use the new [Referrer Policy standard](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
  to work around a variety of problems with Referer headers.

Because search engines are migrating to HTTPS, you are likely see _more_ Referer
headers when you migrate to HTTPS than you are now.

Caution: According to the [HTTP RFC](https://tools.ietf.org/html/rfc2616#section-15.1.3), clients **SHOULD NOT** include a Referer header field in a (non-secure) HTTP request if the referring page was transferred with a secure protocol.

### Ad Revenue

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
[Make Intra-Site URLs Relative](#make-intra-site-urls-relative) in
this guide until enough advertisers interoperate properly.
