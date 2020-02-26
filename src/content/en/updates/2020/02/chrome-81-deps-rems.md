project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 81 to help you plan.

{# wf_updated_on: 2020-02-26 #}
{# wf_published_on: 2020-02-26 #}
{# wf_tags: deprecations,removals,chrome81 #}
{# wf_blink_components: Blink>Payments,Blink>SVG,Internals>Network>SSL #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 81 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 81 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Deprecation and Remove "basic-card" support Payment Handler

This version of Chrome removes the basic-card polyfill for Payment Request API
in iOS Chrome. As a result, the Payment Request API is temporarily disabled in
iOS Chrome. For full details, see [Rethinking Payment Request for
iOS](https://www.google.com/url?q=https://blog.chromium.org/2020/01/rethinking-payment-request-for-ios.html&sa=D&ust=1581287505507000&usg=AFQjCNFf5bi-68IcQTns9C24XVn_BTwgGw).

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/5gxzhdS1KNs/m/Fs-Bvz4iAQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5709702556024832) &#124;
[Chromium Bug](https://crbug.com/981907)


## Remove supportedType field from BasicCardRequest

Specifying `"supportedTypes":[type]` parameter for `"basic-card"` payment method
shows cards of only the requested type, which is one of "credit", `"debit"`, or
`"prepaid"`.

The card type parameter has been removed from the spec and is now removed from
Chrome, because of the difficulty of accurate card type determination. Merchants
today must check card type with their PSP, because they cannot trust the card
type filter in the browser:

* Only issuing banks know the card type with certainty and downloadable card
  type databases have low accuracy, so it's impossible to know accurately the
  type of the cards stored locally in the browser.
* The "basic-card" payment method in Chrome no longer shows cards from Google
  Pay, which may have connections with issuing banks.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/5gxzhdS1KNs/m/Fs-Bvz4iAQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5709702556024832) &#124;
[Chromium Bug](https://crbug.com/981907)


## Remove the <discard\> element

Chrome 81 removes the `<discard>` element. It is only implemented in Chromium,
and is thus not possible to use interoperably. For most use cases it can be
replaced with a combination of animation of the `display` property and a removal
(JavaScript) callback/event handler.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/jUJG_CFqEvE/m/bc5_tXo8BAAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4870172764536832) &#124;
[Chromium Bug](https://crbug.com/)


## Remove TLS 1.0 and TLS 1.1

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

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EHSnAn2rucg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5654791610957824) &#124;
[Chromium Bug](https://crbug.com/896013)


## TLS 1.3 downgrade hardening bypass

TLS 1.3 includes a backwards-compatible hardening measure to [strengthen
downgrade protections](https://www.chromestatus.com/feature/5128354539765760).
However, when we shipped TLS 1.3 last year, we had to partially disable this
measure due to incompatibilities with some non-compliant TLS-terminating
proxies. Chrome currently implements the hardening measure for certificates
which chain up to known roots, but allows a bypass for certificates chaining up
to unknown roots. We intend to enable it for all connections.

Downgrade protection mitigates the security impact of the various legacy options
we retain for compatibility. This means user's connections are more secure and,
when security vulnerabilities are discovered, it is less of a scramble to
respond to them. (That, in turn, means fewer broken sites for users down the
road.) This also aligns with [RFC 8446](https://tools.ietf.org/html/rfc8446).

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/CK0Xxdz-4Mg/m/KIOaBAXmBQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/features/5128354539765760) &#124;
[Chromium Bug](https://crbug.com/996894)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
