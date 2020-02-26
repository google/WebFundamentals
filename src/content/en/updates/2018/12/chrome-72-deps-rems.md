project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 72 to help you plan.

{# wf_updated_on: 2020-02-26 #}
{# wf_published_on: 2018-12-18 #}
{# wf_tags: deprecations,removals,chrome72 #}
{# wf_blink_components: Blink,Security,Internals>Network>FTP,Internals>Network>SSL,Blink>Payments #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 72 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 72 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Don't allow popups during page unload

Note: This feature was actually removed in Chrome 74. We apologize for the
mistake.

Pages may no longer use `window.open()` to open a new page during unload. The
Chrome popup blocker already prohibited this, but now it is prohibited whether
or not the popup blocker is enabled.

[Intent to Remove](https://crbug.com/844455) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5989473649164288) &#124;
[Chromium Bug](https://groups.google.com/a/chromium.org/d/topic/blink-dev/MkA0A1YKSw4/discussion)


### Remove HTTP-Based Public Key Pinning

HTTP-Based Public Key Pinning (HPKP) was intended to allow websites to send an
HTTP header that pins one or more of the public keys present in the site's
certificate chain. Unfortunately, it has very low adoption, and although it
provides security against certificate misissuance, it also creates risks of
[denial of service and hostile pinning](https://groups.google.com/a/chromium.org/d/msg/blink-dev/he9tr7p3rZ8/eNMwKPmUBAAJ).
For these reasons, this feature is being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/he9tr7p3rZ8/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5903385005916160) &#124;
[Chromium Bug](https://crbug.com/779166)

### Remove rendering FTP resources.

FTP is a non-securable legacy protocol. When even the Linux kernel is
[migrating off of it](https://www.kernel.org/shutting-down-ftp-services.html),
it's time to move on. One step toward deprecation and removal is to deprecate
rendering resources from FTP servers and instead download them. Chrome will
still generate directory listings, but any non-directory listing will be
downloaded rather than rendered in the browser.


[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/eopgOoY1QLs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6199005675520000) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=744499)


## Deprecations

{% include "web/updates/_shared/deprecations.html" %}

### Deprecate TLS 1.0 and TLS 1.1

TLS (Transport Layer Security) is the protocol which secures HTTPS. It has a
long history stretching back to the nearly twenty-year-old TLS 1.0 and its even
older predecessor, SSL. Both TLS 1.0 and 1.1 have a number of weaknesses.

* TLS 1.0 and 1.1 use MD5 and SHA-1, both weak hashes, in the transcript hash
  for the Finished message.
* TLS 1.0 and 1.1 use MD5 and SHA-1 in the server signature. (Note: this is not
  the signature in the certificate.)
* TLS 1.0 and 1.1 only support RC4 and CBC ciphers. RC4 is broken and has since
  been removed. TLS’s CBC mode construction is flawed and was vulnerable to
  attacks.
* TLS 1.0’s CBC ciphers additionally construct their initialization vectors
  incorrectly.
* TLS 1.0 is no longer PCI-DSS compliant.

Supporting TLS 1.2 is a prerequisite to avoiding the above problems. The TLS
working group has deprecated TLS 1.0 and 1.1. Chrome has now also deprecated
these protocols. 

Note: These were removed in Chrome 81.


[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EHSnAn2rucg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5654791610957824) &#124;
[Chromium Bug](https://crbug.com/896013)


### Deprecate PaymentAddress.languageCode
`PaymentAddress.languageCode` is the browser's best guess for the language of
the text in the shipping, billing, delivery, or pickup address in the Payment
Request API. The `languageCode` is marked at risk in the specification and has
already been removed from Firefox and Safari. Usage in Chrome is small enough
for safe deprecation and removal. Removal is expected in Chrome 74.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/ma2J2RumrmM/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4992562146312192) &#124;
[Chromium Bug](https://crbug.com/877521)


{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
