project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 58 to help you plan.

{# wf_updated_on: 2017-03-23 #}
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

## Deprecate FileReaderSync from service workers

The Service Worker spec has always had the (non-normative) note that "any type
of synchronous requests must not be initiated inside of a service worker", to
avoid blocking the service worker (as blocking the service worker would block
all network requests from controlled pages). However synchronous APIs such as
`FileReaderSync` were still available in service workers. Starting in Chrome 57,
`FileReaderSync` is deprecated. Removal is anticipated in Chrome 59.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/cjWtqRD6iw8/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5739144722513920) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=688586)


## Remove cross-origin top navigation without a user gesture

Content in an <iframe> can generally navigate the top level browsing context
unless explicitly forbidden by the sandbox attribute (sometimes called
'framebusting'). Framebusting was originally used by content that wanted to
prevent being placed in an <iframe>. Not only are there more specific tools to
accomplish this (see below), but this specific framebusting technique is being
used by malicious content to forcibly navigate users to a different URL.

Starting in Chrome 57, cross-origin framebusting requires a user gesture unless
the frame and the top-level content are from the same origin. Sites that want to
prevent their content from appearing in an <iframe> should use the
[CSP frame-ancestors directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)
or [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Xi8-y4ySjA4/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5851021045661696) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=640057)


## Remove webkit-prefixed IndexedDB global aliases

IndexedDB was originally implemented with prefixed aliases and constructors
around the time of Chrome 11. The non-prefixed versions were shipped in Chrome
24 and the prefixed versions deprecated in Chrome 38. In Chrome 57, the prefixed
constructors are removed. The effected interfaces include:

* `webkitIndexedDB` (main entry point) 
* `webkitIDBKeyRange` (non-callable global constructor, but has useful static methods)
* `webkitIDBCursor`
* `webkitIDBDatabase`
* `webkitIDBFactory`
* `webkitIDBIndex`
* `webkitIDBObjectStore`
* `webkitIDBRequest`
* `webkitIDBTransaction` (non-callable global constructors)

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/L-EY3r4HnMc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5775330191081472) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=665243)


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


## Remove EME from non-secure contexts

Some usages of
[Encrypted Media Extenions (EME)](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
expose digital rights management implementations that are not open source,
involve access to persistent unique identifiers, and/or run unsandboxed or with
privileged access. Security risks are increased for sites exposed via non-secure
HTTP because they can be attacked by anyone on the channel. Additionally, when
user consent is required, acceptance persisted for a non-secure HTTP site can be
exploited by such an attacker.


Support for non-secure contexts was removed from the
[EME version 1 spec](https://w3c.github.io/encrypted-media/)
and is not supported in the
[proposed recommendation](https://www.w3.org/TR/encrypted-media/) nor
anticipated in the subsequent final. will not be in the upcoming proposed
recommendation or subsequent final recommendation. The API has been showing a
deprecation message on non-secure origins since Chrome 44 (May 2015). In Chrome
58, it is now removed. This change is part of our broader effort to
[remove powerful features from unsecure origins](https://bugs.chromium.org/p/chromium/issues/detail?id=520765).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/tXmKPlXsnCQ/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5724389932793856) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=672605)


## Remove legacy caller for HTMLEmbedElement and HTMLObjectElement

That an interface has a legacy caller means that an instance can be called as a
function. Currently, `HTMLEmbedElement` and `HTMLObjectElement` support this
functionality. In Chrome 57 this ability was deprecated. Starting in Chrome 58,
calling throws an exception.

This change brings Chrome in line with recent spec changes. The legacy behavior
is not supported in Edge or Safari, and it is being
[removed from Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=909656).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/AiDZ7ru9mGg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5715026367217664) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=663662)


## Remove deprecated names for motion path properties

Motion path CSS properties allow authors to animate any graphical object along
an author-specified path. In compliance with the spec, several properties were
[implemented in Chrome 45](https://www.chromestatus.com/feature/6190642178818048).
The names of these properties were changed in the spec in mid 2016. Chrome
implemented the
[new names in Chrome 55 and Chrome 56](https://www.chromestatus.com/feature/6390764217040896).
Console deprecation warnings were also implemented. 

In Chrome 58, the old property names are being removed. The affected properties
and their new names are shown below.

| Removed Property | Current Name |
|------------------|--------------|
| motion-path | offset-path |
| motion-offset | offset-distance |
| motion-rotation | offset-rotate |
| motion | offset |

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/o1C5NzGf9Q0/discussion) 


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


<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
