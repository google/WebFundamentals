---
layout: shared/narrow-pages-list
title: "Content Security Policy"
description: "Content Security Policy can significantly reduce the risk and impact of cross-site scripting attacks in modern browsers."
published_on: 2012-06-15
updated_on: 2016-02-19
authors:
  - mikewest
  - josephmedley
translation_priority: 1
order: 1
---

<p class="intro" markdown="1">
The web's security model is rooted in the [_same origin policy_](http://en.wikipedia.org/wiki/Same_origin_policy).
Code from `https://mybank.com` should only have access to `https://mybank.com`'s
data, and `https://evil.example.com` should certainly never be allowed access.
Each origin is kept isolated from the rest of the web, giving developers a safe
sandbox in which to build and play. In theory, this is perfectly brilliant. In
practice, attackers have found clever ways to subvert the system. </p>

[Cross-site scripting (XSS)](http://en.wikipedia.org/wiki/Cross-site_scripting)
attacks, for example, bypass the same origin policy by tricking a site into
delivering malicious code along with the intended content. This is a huge
problem, as browsers trust all of the code that shows up on a page as being
legitimately part of that page's security origin. The
[XSS Cheat Sheet](http://ha.ckers.org/xss.html) is an old but representative
cross-section of the methods an attacker might use to violate this trust by
injecting malicious code. If an attacker successfully injects _any_ code at
all, it's pretty much game over: user session data is compromised and
information that should be kept secret is exfiltrated to The Bad Guys. We'd
obviously like to prevent that if possible.

This article highlights a defense that can significantly reduce the risk and
impact of XSS attacks in modern browsers: Content Security Policy (CSP).
