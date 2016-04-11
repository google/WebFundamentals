---
layout: shared/narrow
title: "Real World Usage"
description: "CSP 1 is quite usable in Chrome, Safari, and Firefox, and has (very) limited support in IE 10. CSP Level 2 was available in Chrome with version 40. "
published_on: 2012-06-15
updated_on: 2016-02-19
authors:
  - mikewest
  - josephmedley
translation_priority: 2
order: 50
---

<p class="intro">
CSP 1 is quite usable in Chrome, Safari, and Firefox, and has (very) limited
support in IE 10. You can <a href="http://caniuse.com/#feat=contentsecuritypolicy">
view specifics at canisue.com</a>. CSP Level 2 was available in Chrome with
version 40. Massive sites like Twitter and Facebook have deployed the header
(<a href="https://blog.twitter.com/2011/improving-browser-security-csp">Twitter's
case study</a> is worth a read), and the standard is very much ready
for you to start deploying on your own sites.
</p>

{% include shared/toc.liquid %}

The first step towards crafting a policy for your application is to evaluate the
resources you're actually loading. Once you think you have a handle on how
things are put together in your app, set up a policy based on those
requirements. Let's walk through a few common use-cases, and determine how we'd
best be able to support them within the protective confines of CSP:

## Use Case #1: Social Media Widgets

* Google's [+1 button](http://www.google.com/intl/en/webmasters/+1/button/index.html)
includes a script from `https://apis.google.com`, and embeds an `<iframe>` from
`https://plusone.google.com`. You'll need a policy that includes both these
origins in order to embed the button. A minimal policy would be `script-src
https://apis.google.com; child-src https://plusone.google.com`. You'll also need
to ensure that the snippet of JavaScript that Google provides is pulled out into
an external JavaScript file. If you had an existing policy using `child-src`,
you would need to change it to `child-src`.

* Facebook's [Like button](http://developers.facebook.com/docs/reference/plugins/like/)
has a number of implementation options. We recommend sticking with the
`<iframe>` version, as it's safely sandboxed from the rest of your site. That
would require a `child-src https://facebook.com` directive to function properly.
Note that, by default, the `<iframe>` code Facebook provides loads a relative
URL, `//facebook.com`. Please change that to explicitly specify HTTPS:
`https://facebook.com`. There's no reason to use HTTP if you don't have to.

* Twitter's [Tweet button](https://twitter.com/about/resources/buttons)
relies on access to a script and frame, both hosted at
`https://platform.twitter.com`. (Twitter likewise provides a relative URL by
default: please edit the code to specify HTTPS when copy/pasting it locally.)
You'll be all set with `script-src https://platform.twitter.com; child-src
https://platform.twitter.com`, as long as you move the JavaScript snippet
Twitter provides out into an external JavaScript file.

* Other platforms will have similar requirements, and can be addressed similarly. 
We suggest just setting a `default-src` of `'none'`, and watching your console to 
determine which resources you'll need to enable to make the widgets work.

Including multiple widgets is straightforward: simply combine the policy
directives, remembering to merge all resources of a single type into a single
directive. If you wanted all three social media widgets, the policy would look
like:

    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

## Use Case #2: Lockdown

Assume for a moment that you run a banking site, and want to make very sure that
only those resources you've written yourself can be loaded. In this scenario,
start with a default policy that blocks absolutely everything (`default-src
'none'`), and build up from there.

Let's say the bank loads all images, style, and script from a CDN at
`https://cdn.mybank.net`, and connects via XHR to `https://api.mybank.com/` to
pull various bits of data down. Frames are used, but only for pages local to the
site (no third-party origins). There's no Flash on the site, no fonts, no
extras. The most restrictive CSP header that we could send in this scenario is:

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

## Use Case #3: SSL Only

A wedding-ring discussion forum admin wants to ensure that all resources are
only loaded via secure channels, but doesn't really write much code; rewriting
large chunks of the third-party forum software that's filled to the brim with
inline script and style is beyond his abilities. The following policy would be
effective:

    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

Even though `https:` was specified in `default-src`, the script and style
directives don't automatically inherit that source. Each directive overwrites
the default completely for that specific type of resource.
