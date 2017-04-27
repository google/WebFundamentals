project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 58 to help you plan.

{# wf_updated_on: 2017-04-27 #}
{# wf_published_on: 2017-03-17 #}
{# wf_tags: deprecations,removals,chrome58 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 58 to help you plan. #}

# Deprecations and Removals in Chrome 58 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 58,
which is in beta as of March 16. This list is subject to change at any time.



## Remove case-insensitive matching for usemap attribute

The `usemap` attribute was formerly defined as caseless. Unfortunately
implementing this was complicated enough that no browsers implemented it
correctly. Research suggested that such a complicated algorithm is unnecessary,
and even ASCII case-insensitive matching is unnecessary.

Consequently, the specification was updated so that case-sensitive matching is
applied. The old behavior was deprecated in Chrome 57, and is now removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/8pHdFzN0YQc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5760965337415680) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=659464)

## Remove legacy caller for HTMLEmbedElement and HTMLObjectElement

That an interface has a legacy caller means that an instance can be called as a
function. Currently, `HTMLEmbedElement` and `HTMLObjectElement` support this
functionality. In Chrome 57 this ability was deprecated. Starting with Chrome
58, calling will throw and exception.

This change brings Chrome in line with recent spec changes. The legacy behavior
is not supported in Edge or Safari, and it is being
[removed from Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=909656).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/AiDZ7ru9mGg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5715026367217664) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=663662)


## Mouse on Android stops firing TouchEvents

Until Chrome 57, Android low-level mouse events in Chrome primarily followed an
event path designed for touch interactions. For example, mouse drag motion while
a mouse button is pressed generates `MotionEvents` delivered through
`View.onTouchEvent`.

But since touch events cannot support hover, hovering mousemoves followed a
separate path. The design had many side-effects including mouse interactions
firing `TouchEvents`, all mouse buttons appearing as *left* mouse buttons, and
`MouseEvents` being suppressed by `TouchEvents`.

Starting with Chrome 58, a mouse on Android M or later will:

* No longer fire `TouchEvents`.
* Fire a consistent sequence of `MouseEvents` with appropriate buttons and
  other properties. 

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/cNaFvMaYtNA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5642080642662400) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=468806)


## Remove EME from unsecure contexts 



[Intent to Remove]() &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5724389932793856) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=672605)

## Deprecate insecure usage of notifications



[Intent to Remove]() &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5759967025954816) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=679821)



## Remove pre-standard ChaCha20-Poly1305 ciphers



[Intent to Remove]() &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5633556340539392) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=682816)


## Remove support for commonName matching in certificates

[RFC 2818](https://tools.ietf.org/html/rfc2818) describes two methods to match a
domain name against a certificate: using the available names within the
`subjectAlternativeName` extension, or, in the absence of a SAN extension,
falling back to the `commonName`. The fallback to the `commonName` was
deprecated in RFC 2818 (published in 2000), but support remains in a number of
TLS clients, often incorrectly.

The use of the `subjectAlternativeName` fields leaves it unambiguous whether a
certificate is expressing a binding to an IP address or a domain name, and is
fully defined in terms of its interaction with Name Constraints. However, the
`commonName` is ambiguous, and because of this, support for it has been a source
of security bugs in Chrome, the libraries it uses, and within the TLS ecosystem
at large.

The compatibility risk for removing `commonName` is low. RFC 2818 has
deprecated this for nearly two decades, and the
[baseline requirements](https://cabforum.org/baseline-requirements-documents/)
(which all publicly trusted certificate authorities must abide by) has required
the presence of a `subjectAltName` since 2012. Firefox already requires the
`subjectAltName` for any newly issued publicly trusted certificates since
[Firefox 48]( https://bugzilla.mozilla.org/show_bug.cgi?id=1245280 ).

Note: Enterprises that need to support such certificates for internal purposes
may set the `EnableCommonNameFallbackForLocalAnchors` Enterprise policy.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/4v82AueNjaQ/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4981025180483584) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=308330)


## VTTRegion-related bits of TextTrack

The interface elements regions, `addRegion()` and `removeRegion()`, have been
removed from the WebVTT spec and is removed in Chrome 58 to comply with
the [latest spec](https://w3c.github.io/webvtt/). We expect little impact from
this removal since the feature was never enabled by default (meaning it was
behind a flag). Those needing an alternative can use the `VTTCue.region`
property which is being added in Chrome 58.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5308626495340544) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=690014)



## WebAudio: remove AudioSourceNode interface

The `AudioSourceNode` interface is not part of the
[Web Audio specification](https://www.w3.org/TR/webaudio/),
is not constructible, and has no attributes so it basically has no developer-
accessible functionality. Therefore it is being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/D-QJm9GCisc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5753709124386816) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=663818)

## Remove webkitdropzone global attribute

The `dropzone` global attribute was introduced by the
[HTML5 drag and drop specification](http://w3c.github.io/html/editing.html#drag-and-drop)
as a declarative method for specifying an HTML element's willingness to be the
target of a drag-and-drop operation, the content types that can be dropped onto
the element, and the drag-and-drop operation (copy/move/link).

The attribute failed to gain traction among browser vendors. Blink and WebKit
only implement a prefixed form of the attribute, `webkitdropzone`. Because the
`dropzone` attribute was removed from the spec in
[early March 2017](https://github.com/whatwg/html/pull/2402)
the prefixed version is being removed from Chrome.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/rdGvTDPU7mM/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5718005866561536) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=688943)
