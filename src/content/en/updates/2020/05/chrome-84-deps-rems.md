project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 84 to help you plan.

{# wf_updated_on: 2020-05-27 #}
{# wf_published_on: 2020-05-27 #}
{# wf_tags: deprecations,removals,chrome84 #}
{# wf_blink_components: Blink>CSS #}
{# wf_featured_image: /web/updates/images/2020/05/dep-rem_480.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 84 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

Note: Chrome expects to start the spec-mandated turn down of AppCache in Chrome
85. For details and instructions for managing the transition gracefully, see
[Preparing for AppCache removal](https://web.dev/appcache-removal/). For
information on a feature that will help you identify uses of this and other
deprecated APIs, see [Know your code
health](https://web.dev/reporting-observer/)

# Deprecations and removals in Chrome 84 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## @import rules in CSSStyleSheet.replace() removed

The original spec for constructable stylesheets allowed for calls to:

```
sheet.replace("@import('some.css');")
```

This use case is being removed. Calls to `replace()` now throw an exception if
`@import` rules are found in the replaced content.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/RKG8oxp22RY/m/fdFnG1rGCgAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4735925877735424) &#124;
[Chromium Bug](https://crbug.com/1055943)

## Remove TLS 1.0 and TLS 1.1


TLS (Transport Layer Security) is the protocol which secures HTTPS. It has a
long history stretching back to the nearly twenty-year-old TLS 1.0 and its even
older predecessor, SSL. Both TLS 1.0 and 1.1 have a number of weaknesses.

* TLS 1.0 and 1.1 use MD5 and SHA-1, both weak hashes, in the transcript hash
  for the Finished message.
* TLS 1.0 and 1.1 use MD5 and SHA-1 in the server signature. (Note: this is not
  the signature in the certificate.)
* TLS 1.0 and 1.1 only support RC4 and CBC ciphers. RC4 is broken and has since
  been removed. TLS’s CBC mode construction is flawed and is vulnerable to
  attacks.
* TLS 1.0’s CBC ciphers additionally construct their initialization vectors
  incorrectly.
* TLS 1.0 is no longer PCI-DSS compliant.

Supporting TLS 1.2 is a prerequisite to avoiding the above problems. The TLS
working group has deprecated TLS 1.0 and 1.1. Chrome has now also deprecated
these protocols.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EHSnAn2rucg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5654791610957824) &#124;
[Chromium Bug](https://crbug.com/896013)



{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
