project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 56 to help you plan.

{# wf_updated_on: 2017-03-02 #}
{# wf_published_on: 2016-12-08 #}
{# wf_tags: deprecations,removals,chrome56 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 56 to help you plan. #}

# API Deprecations and Removals in Chrome 56 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 56,
which is in beta as of December 8. This list is subject to change at any time.

## Remove support for SHA-1 certificates

The SHA-1 cryptographic hash algorithm
[first showed signs of weakness](https://www.schneier.com/blog/archives/2005/02/cryptanalysis_o.html)
over eleven years ago and
[recent research](https://eprint.iacr.org/2015/967)
points to the imminent possibility of attacks that could directly impact the
integrity of the web public key infrastructure (PKI).

To protect users from such attacks, Chrome no longer supports SHA-1 certificates
starting in Chrome 56, whose stable release is in January 2017. Visiting a site
using such a certificate results in an interstitial warning. We provide more
details on the [Chrome Security Blog](https://security.googleblog.com/2016/11/sha-1-certificates-in-chrome.html).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/2-R4XziFc7A/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6601657605423104) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=653691)

## Remove CBC-mode ECDSA ciphers in TLS

TLS's CBC-mode construction is flawed, making it fragile and very difficult to
implement securely. Although CBC-mode ciphers are still widely used with RSA,
they are virtually nonexistent with ECDSA. Other browsers still support these
ciphers,  we believe the risk is low. Additionally, ECDSA in TLS is used by few
organizations and usually with a more complex setup (some older clients only
support RSA), so we expect ECDSA sites to be better maintained and more
responsive in case of problems.

TLS 1.2 added new ciphers based on
[AEADs](https://en.wikipedia.org/wiki/Authenticated_encryption)
which avoids these problems, specifically AES_128_GCM, AES_256_GCM, or
CHACHA20_POLY1305. Although we are only requiring this for ECDSA-based sites at
this time, it is recommended for all administrators. AEAD-based ciphers not only
improve security but also performance. AES-GCM has hardware support on recent
CPUs and ChaCha20-Poly1305 admits fast software implementations. Meanwhile, CBC
ciphers require slow complex mitigations and PRNG access on each outgoing
record. AEAD-based ciphers are also a prerequisite for HTTP/2 and False Start
optimizations.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/1eKb8bqT1Ds/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5740978103123968) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=658341)

## Remove user gestures from touch scroll

We've seen multiple [examples](http://crbug.com/572319) of poorly written or
malicious ads that trigger navigation for touch scrolls either on `touchstart`
or all `touchend` events.  If a 'wheel' event can't open a pop-up, then touch
scrolling shouldn't either. This may break some scenarios, for example, media
not playing on touch, or pop-ups not opening on touch.  Safari already silently
fails to open pop-ups in all of these scenarios.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/TO_x7FRkdmw/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6131337345892352) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=611981)

## Disallow all fetches for scripts with invalid type/language attributes

Currently, Chrome's preload scanner fetches items in `<scripts>` elements
regardless of the value of the `type` or `language` attribute, though the script
will not be executed when parsed. By deprecating the fetch, the preload scanner
and the parser will have the same semantics, and we will not be initiating
fetches for scripts we will not use. This is intended to save data for users who
navigate to sites with a lot of custom script tags that are post-processed (like
`type=”text/template”`, for example).

The use case of using invalid scripts to ping servers is adequately covered by
the [sendBeacon API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon).

This change aligns Chrome with Safari, though FireFox still requests scripts
regardless of type or language.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/eu57SCNltls/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5760718284521472) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=626321&desc=2)

## Remove MediaStreamTrack.getSources()

This method is no longer part of the spec and is not supported by any other
major browser. It has been replaced by
[`MediaDevices.enumerateDevices()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices),
which Blink has supported without flags since version 47 and which is also
supported by other browsers. An example of this is shown below. This
hypothetical `getCameras()` function first uses feature detection to find and
use `enumerateDevices()`. If the feature detection fails, it looks for
`getSources()` in `MediaStreamTrack`. Finally, if there is no API support of any
kind return the empty `cameras` array.

    function getCameras(camerasCallback) {
      var cameras = [];
      if('enumerateDevices' in navigator.mediaDevices) {
         navigator.mediaDevices.enumerateDevices()
          .then(function(sources) {
            return sources.filter(function(source) { 
              return source.kind == 'videoinput' 
            });
          })
          .then(function(sources) {
            sources.forEach(function(source) {
              if(source.label.indexOf('facing back') >= 0) {
                // move front facing to the front.
                cameras.unshift(source);
              }
              else {
                cameras.push(source);
              }
            });
            camerasCallback(cameras);
          });
      }
      else if('getSources' in MediaStreamTrack) {
        MediaStreamTrack.getSources(function(sources) {

          for(var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if(source.kind === 'video') {

              if(source.facing === 'environment') {
                // cameras facing the environment are pushed to the front of the page
                cameras.unshift(source);
              }
              else {
                cameras.push(source);
              }
            }
          }
          camerasCallback(cameras);
        });
      }
      else {
        // We can't pick the correct camera because the API doesn't support it.
        camerasCallback(cameras);
      }
    };

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/do3t86PtHCY/discussion) &#124;
[Chromestatus Tracker](https://bugs.chromium.org/p/chromium/issues/detail?id=649710) &#124;
[Chromium Bug](https://www.chromestatus.com/feature/4765305641369600)

## Remove reflected-xss CSP directive

Early drafts of the [Content Security Policy Level 2](https://www.w3.org/TR/CSP2/)
spec contained a `reflected-xss` directive which offered nothing more than the
`X-XSS-Protection` header other than a different syntax. This directive was
removed from the spec in 2015, but not before it was implemented in Chrome.
Support for this directive is now being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/gjB93RpF6JY/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5769374145183744) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=657737)

## Replace CSP 'referrer' directive

The CSP `referrer` directive allowed site owners to set a referrer policy from
an HTTP header. Not only does this feature have
[very low usage](https://www.chromestatus.com/metrics/feature/popularity#CSPReferrerDirective),
it has also no longer part of any W3C spec.

Sites that still need this functionality should use `<meta name="referrer">` or
the new [Referrer-Policy header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/JqUlPA-HFfU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5680800376815616) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=658761)

## Remove PaymentAddress.careOf field

The `PaymentAddress` interface has a `careOf` field which is non-standard (no
well-known address standards support it). The `careOf` field is also
unnecessary, the recipient and organization fields sufficiently support all
necessary use cases. Adding `careOf` poses significant issues in terms of
interoperability with existing postal address schemas and APIs. For a fuller
discussion, read the
[spec removal proposal](https://github.com/w3c/browser-payment-api/issues/244)
on GitHub.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/WhUAKyc0O80/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=648049)

## Remove SVGViewElement.viewTarget

The `SVGViewElement.viewTarget` attribute is not part of the SVG2.0
specification and it's usage is small or nonexistent. This attribute was
deprecated in Chrome 54 and has now been removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/X3kyDbj9xlA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5665473114931200) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=633908)

<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
