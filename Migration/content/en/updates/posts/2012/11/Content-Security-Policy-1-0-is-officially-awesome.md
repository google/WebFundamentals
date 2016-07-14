---
layout: updates/post
title: "Content Security Policy 1.0 is officially awesome."
published_on: 2012-11-16
updated_on: 2012-11-16
authors:
  - mikewest
tags:
  - news
  - contentsecuritypolicy
  - security
---
It's official! The W3C has advanced the [Content Security Policy 1.0 specification][csp10] from Working Draft to Candidate Recommendation, and [issued a call for implementations][impl]. Cross-site scripting attacks are one step closer to being (mostly) a thing of the past.

Chrome Canary and WebKit nightlies now support the unprefixed `Content-Security-Policy` header, and will be using the prefixed `X-WebKit-CSP` header to begin experimenting with some new behavior that's being specified as part of [Content Security Policy 1.1][csp11]. Instead of writing:

{% highlight javascript %}
  X-WebKit-CSP: script-src 'self'; object-src 'none'
{% endhighlight %}


You'll write:

{% highlight javascript %}
Content-Security-Policy: script-src 'self'; object-src 'none'
{% endhighlight %}

We expect other browser vendors to follow suit within the next few revisions, so it's a great idea to start sending the canonical header today.

### Content Securawhat?

Content Security Policy! It helps you reduce the risk of cross-site scripting and other content injection attacks in your applications. It's a huge step forward in terms of the protection you can offer your users, and we highly recommend taking a hard look at implementing it. You can get all the details in the ever so cleverly named ["An Introduction to Content Security Policy"][h5r].

[csp10]: http://w3.org/TR/CSP
[impl]: http://www.w3.org/News/2012#entry-9633
[csp11]: https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html
[h5r]: http://www.html5rocks.com/en/tutorials/security/content-security-policy/
