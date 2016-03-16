---
layout: shared/narrow
title: "Source Whitelists"
description: "The issue exploited by XSS attacks is the browser's inability to distinguish between script that's part of your application, and script that's been maliciously injected by a third-party. Instead of blindly trusting everything that a server delivers, CSP defines the Content-Security-Policy HTTP header that allows you to create a whitelist of sources of trusted content, and instructs the browser to only execute or render resources from those sources."
published_on: 2012-06-15
updated_on: 2016-02-19
authors:
  - mikewest
  - josephmedley
translation_priority: 2
order: 10
---

<p class="intro" markdown="1">
The issue exploited by XSS attacks is the browser's inability to distinguish
between script that's part of your application, and script that's been
maliciously injected by a third-party. For example, the Google +1 button at the
bottom of this page loads and executes code from
`https://apis.google.com/js/plusone.js` in the context of this page's origin. We
trust that code, but we can't expect the browser to figure out on it's own that
code from `apis.google.com` is awesome, while code from `apis.evil.example.com`
probably isn't. The browser happily downloads and executes any code a page
requests, regardless of source.
</p>

{% include shared/toc.liquid %}

Instead of blindly trusting _everything_ that a server delivers, CSP defines the
`Content-Security-Policy` HTTP header that allows you to create a whitelist of
sources of trusted content, and instructs the browser to only execute or render
resources from those sources. Even if an attacker can find a hole through which
to inject script, the script won't match the whitelist, and therefore won't be
executed.

Since we trust `apis.google.com` to deliver valid code, and we trust ourselves
to do the same, let's define a policy that only allows script to execute when it
comes from one of those two sources:

    Content-Security-Policy: script-src 'self' https://apis.google.com

Simple, right? As you probably guessed, `script-src` is a directive that
controls a set of script-related privileges for a specific page. We've specified
`'self'` as one valid source of script, and `https://apis.google.com` as
another. The browser will dutifully download and execute JavaScript from
`apis.google.com` over HTTPS, as well as from the current page's origin.

With this policy defined, the browser will simply throw an error instead of
loading script from any other source. When a clever attacker manages to
inject code into your site, she'll run headlong into an error message, rather
than the success she was expecting:

![Console error: "Refused to load the script 'http://evil.example.com/evil.js' because it violates the following Content Security Policy directive: "script-src 'self' https://apis.google.com"."](images/csp-error.png)

## Policy Applies to a Wide Variety of Resources

While script resources are the most obvious security risks, CSP provides a rich
set of policy directives that enable fairly granular control over the resources
that a page is allowed to load. You've already seen `script-src`, so the concept
should be clear. Let's quickly walk through the rest of the resource directives:

* **`base-uri`** restricts the URLs that can appear in a page's `<base>` element.
* **`child-src`** lists the URLs for workers and embedded frame contents. For
  example: `child-src https://youtube.com` would enable embedding videos from
  YouTube but not from other origins. Use this in place of the deprecated
  **`frame-src`** directive.
* **`connect-src`** limits the origins to which you can connect (via XHR,
  WebSockets, and EventSource).
* **`font-src`** specifies the origins that can serve web fonts. Google's Web
Fonts    could be enabled via `font-src https://themes.googleusercontent.com`.
* **`form-action`** lists valid endpoints for submission from `<form>` tags.
* **`frame-ancestors`**  specifies the sources that can embed the current page.
This directive applies to `<frame>`, `<iframe>`, `<embed>`, and `<applet>` tags.
This directive can't be used in `<meta>` tags and applies only to non-HTML
resources.
* **`frame-src`** deprecated. Use **`child-src`** instead.
* **`img-src`** defines the origins from which images can be loaded.
* **`media-src`** restricts the origins allowed to deliver video and audio.
* **`object-src`** allows control over Flash and other plugins.
* **`plugin-types`** limits the kinds of plugins a page may invoke.
* **`report-uri`** specifies a URL where a browser will send reports when a
content security policy is violated. This directive can't be used in `<meta>`
tags.
* **`style-src`** is `script-src`'s counterpart for stylesheets.
* **`upgrade-insecure-requests`** Instructs user agents to rewrite URL schemes,
changing HTTP to HTTPS. This directive is for web sites with large numbers of
old    URL's that need to be rewritten.

By default, directives are wide open. If you don't set a specific policy for a
directive, let's say `font-src`, then that directive behaves by default as
though you'd specified `*` as the valid source (e.g. you could load fonts from
everywhere, without restriction).

You can override this default behavior by specifying a **`default-src`**
directive. This directive, as you might suspect, defines the defaults for most
directives you leave unspecified. Generally, this applies to any directive that
ends with `-src`. If `default-src` is set to `https://example.com`, and you fail
to specify a `font-src` directive, then you can load fonts from
`https://example.com`, and nowhere else. We specified only `script-src` in our
earlier examples, which means that images, fonts, and so on can be loaded from
any origin.

The following directives don't use `default-src` as a fallback. Remember that
failing to set them is the same as allowing anything.

* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

You can use as many or as few of these directives as makes sense for your
specific application, simply listing each in the HTTP header, separating
directives with semicolons. You'll want to make sure that you list _all_
required resources of a specific type in a _single_ directive. If you wrote
something like `script-src https://host1.com; script-src https://host2.com` the
second directive would simply be ignored. Something like the following would
correctly specify both origins as valid:

    script-src https://host1.com https://host2.com

If, for example, you have an application that loads all of its resources from a
content delivery network (say, `https://cdn.example.net`), and know that you
don't need framed content or any plugins at all, then your policy might look
like the following:

    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

## Implementation Details

You will see `X-WebKit-CSP` and `X-Content-Security-Policy` headers in various
tutorials on the web. Going forward, you can and should ignore these prefixed
headers. Modern browsers (with the exception of IE) support the unprefixed
`Content-Security-Policy` header. That's the header you should use.

Regardless of the header you use, policy is defined on a page-by-page basis:
you'll need to send the HTTP header along with every response that you'd like to
ensure is protected. This provides a lot of flexibility, as you can fine-tune
the policy for specific pages based on their specific needs. Perhaps one set of
pages in your site has a +1 button, while others don't: you could allow the
button code to be loaded only when necessary.

The source list in each directive is flexible. You can specify sources by
scheme (`data:`, `https:`), or ranging in specificity from hostname-only
(`example.com`, which matches any origin on that host: any scheme, any port) to
a fully qualified URI (`https://example.com:443`, which matches only HTTPS, only
`example.com`, and only port 443). Wildcards are accepted, but only as a scheme,
a port, or in the leftmost position of the hostname: `*://*.example.com:*` would
match all subdomains of `example.com` (but _not_ `example.com` itself), using
any scheme, on any port.

Four keywords are also accepted in the source list:

* **`'none'`**, as you might expect, matches nothing.
* **`'self'`** matches the current origin, but not its subdomains.
* **`'unsafe-inline'`** allows inline JavaScript and CSS. (We'll touch on this in
  more detail in a bit.)
* **`'unsafe-eval'`** allows text-to-JavaScript mechanisms like `eval`. (We'll get
  to this too.)

These keywords require single-quotes. `script-src 'self'` (with quotes)
authorizes the execution of JavaScript from the current host. `script-src self`
(no quotes) allows JavaScript from a server named "`self`" (and _not_ from the
current host), which probably isn't what you meant.

## Sandboxing

There's one more directive worth talking about: `sandbox`. It's a bit
different than the others we've looked at, as is places restrictions on actions
the page can take, rather than on resources that the page can load. If the
`sandbox` directive is present, the page will be treated as though it was loaded
inside of an `<iframe>` with a `sandbox` attribute. This can have a wide range of
effects on the page: forcing the page into a unique origin, and preventing form
submission, among others. It's a bit beyond the scope of this article, but you
can find full details on valid sandboxing attributes in the
["sandboxing flag set" section of the HTML5 spec](http://www.whatwg.org/specs/web-apps/current-work/multipage/origin-0.html#sandboxing-flag-set).

## The meta Tag

CSPs preferred delivery mechanism is an HTTP header. It can be useful, however,
to set a policy on a page directly in the markup. Do that using a `<meta>` tag with
an `http-equiv` attribute:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">
{% endhighlight %}

This can't be used for frame-ancestors, report-uri, or sandbox.
