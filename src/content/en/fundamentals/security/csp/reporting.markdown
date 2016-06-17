---
layout: shared/narrow
title: "Reporting"
description: "CSP's ability to block untrusted resources client-side is a huge win for your users, but it would be quite helpful indeed to get some sort of notification sent back to the server so that you can identify and squash any bugs that allow malicious injection in the first place. "
published_on: 2012-06-15
updated_on: 2016-02-19
authors:
  - mikewest
  - josephmedley
translation_priority: 2
order: 40
---

<p class="intro">
CSP's ability to block untrusted resources client-side is a huge win for your
users, but it would be quite helpful indeed to get some sort of notification
sent back to the server so that you can identify and squash any bugs that allow
malicious injection in the first place. To this end, you can instruct the
browser to <code>POST</code> JSON-formatted violation reports to a location
specified in a <code>report-uri</code> directive.
</p>

    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

Those reports will look something like the following:

{% highlight json %}
{
  "csp-report": {
    "document-uri": "http://example.org/page.html",
    "referrer": "http://evil.example.com/",
    "blocked-uri": "http://evil.example.com/evil.js",
    "violated-directive": "script-src 'self' https://apis.google.com",
    "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
  }
}
{% endhighlight %}


This contains a good chunk of information that will help you track down the
specific cause of the violation, including the page on which the violation
occurred (`document-uri`), that page's referrer (note that unlike the HTTP
header field, the key is _not_ misspelled), the resource that violated the
page's policy (`blocked-uri`), the specific directive it violated (`violated-directive`), and the page's complete policy (`original-policy`).

## Report-Only

If you're just starting out with CSP, it makes sense to evaluate the current
state of your application before rolling out a draconian policy to your users.
As a stepping stone to a complete deployment, you can ask the browser to monitor
a policy, reporting violations, but not enforcing the restrictions. Instead of
sending a `Content-Security-Policy` header, send a `Content-Security-Policy-Report-Only` header.

    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

The policy specified in report-only mode won't block restricted resources, but
it will send violation reports to the location you specify. You can even send
_both_ headers, enforcing one policy while monitoring another. This is a great
way to evaluate the effect of changes to your application's CSP: turn on
reporting for a new policy, monitor the violation reports and fix any bugs that
turn up, then start enforcing the new policy once you're satisfied with its
effect.
