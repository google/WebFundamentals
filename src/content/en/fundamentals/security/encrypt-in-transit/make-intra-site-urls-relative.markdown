---
layout: shared/narrow
title: "Make intra-site URLs relative"
description: "Now that you are serving your site on both HTTP and HTTPS, it needs to work as smoothly as possible, regardless of protocol. An important factor is using relative URLs for intra-site links."
authors:
  - chrispalmer
  - mattgaunt
published_on: 2015-03-27
updated_on: 2015-10-06
order: 4
translation_priority: 0
key-takeaways:
  - "Make sure intra-site URLs and external URLs are agnostic to protocol, i.e. make sure you use relative paths or leave out the protocol like //example.com/something.js"
notes:
  ok: "It is perfectly OK to include HTTPS resources in an HTTP page."
  script: 'Do this with a script, not by hand. If your site’s content is in a database, you’ll want to test your script on a development copy of your database. If your site’s content is simple files, test your script on a development copy of the files. Only push the changes to production after the changes pass QA, as normal. You can use <a href="https://github.com/bramus/mixed-content-scan">Bram van Damme’s script</a> or something like it to detect mixed content in your site.'
  linking: "When linking to other sites (as opposed to including resources from them), don’t change the protocol since you don’t have control over how those sites operate."
  recommend: "I recommend protocol-relative URLs to make migration smoother for large sites. If you are not sure you can fully deploy HTTPS yet, forcing your site to use HTTPS for all sub-resources may backfire. There is likely to be a period of time in which HTTPS is new and weird for you, and the HTTP site must still work as well as ever. Over time, you’ll complete the migration and can lock in HTTPS (see the next two sections)."
---

<p class="intro">
  Now that you are serving your site on both HTTP and HTTPS, it needs to work as smoothly as possible, regardless of protocol. An important factor is using relative URLs for intra-site links.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

But, a problem arises when you serve a page via HTTPS
that includes HTTP resources: [mixed
content](http://www.w3.org/TR/mixed-content/), browsers will warn the user that the full strength
of HTTPS has been lost.

In fact, in the case of active mixed content (script, plug-ins, CSS, iframes),
browsers often simply won't load or execute the content at all — resulting in a
broken page.

{% include shared/note.liquid list=page.notes.ok %}

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

{% include shared/note.liquid list=page.notes.script %}

{% include shared/note.liquid list=page.notes.linking %}

{% include shared/note.liquid list=page.notes.recommend %}

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

