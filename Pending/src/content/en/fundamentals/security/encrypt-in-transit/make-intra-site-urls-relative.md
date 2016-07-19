project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Now that you are serving your site on both HTTP and HTTPS, it needs to work as smoothly as possible, regardless of protocol. An important factor is using relative URLs for intra-site links.

<p class="intro">
  Now that you are serving your site on both HTTP and HTTPS, it needs to work as smoothly as possible, regardless of protocol. An important factor is using relative URLs for intra-site links.
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






But, a problem arises when you serve a page via HTTPS
that includes HTTP resources: [mixed
content](http://www.w3.org/TR/mixed-content/), browsers will warn the user that the full strength
of HTTPS has been lost.

In fact, in the case of active mixed content (script, plug-ins, CSS, iframes),
browsers often simply won't load or execute the content at all — resulting in a
broken page.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






Additionally, when you link to other pages in your site, users could get
downgraded from HTTPS to HTTP.

These problems happen when your pages include fully-qualified, intra-site URLs
that use the *http://* scheme. You should change content like this:

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

to something like this:

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

or this:

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

That is, make intra-site URLs as relative as possible: either protocol-relative
(lacking a protocol, starting with //example.com) or host-relative (starting
with just the path, like /jquery.js).



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue
























# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue
























# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






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


