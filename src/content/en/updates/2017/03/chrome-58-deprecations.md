project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 58 to help you plan.

{# wf_updated_on: 2017-06-08 #}
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

## Mouse on Android stops firing TouchEvents

Until Chrome 57, Android low-level mouse events in Chrome primarily followed an
event path designed for touch interactions. For example, a mouse drag motion ocurring while
a mouse button is pressed generates `MotionEvents`, delivered through
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

## Remove content-initiated top frame navigations to data URLs

Because of their unfamilliarity to non-technical browser users, we're
increasingly seeing the `data:` scheme being used in spoofing and phishing
attacks. To prevent this, we're blocking web pages from loading `data:` URLs
in the top frame. This applies to `&lt;a&gt;` tags, `window.open`,
`window.location` and similar mechanisms. The `data:` scheme will still work for
resources loaded below by a page.

This feature will be removed in Chrome 60.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/GbVcuwg_QjM/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5669602927312896) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=684011&desc=2)

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

## Remove pre-standard ChaCha20-Poly1305 ciphers

In 2013, Chrome 31 deployed
[new TLS cipher suites](https://security.googleblog.com/2014/04/speeding-up-and-strengthening-https.html) 
based on Prof. Dan Bernstein's ChaCha20 and Poly1305 algorithms. These was
later standardized, with small tweaks, at the IETF as
[RFC 7539](https://tools.ietf.org/html/rfc7539)
and [RFC 7905](https://tools.ietf.org/html/rfc7905).
We shipped the standardized variant early in 2016 with
[Chrome 49](https://www.chromestatus.com/feature/5355238106071040).
We are now removing the pre-standard variants.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/8YAc7tQW4RQ/discussion) &#124;
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

The interface elements `regions`, `addRegion()` and `removeRegion()`, have been
removed from the WebVTT spec and are removed in Chrome 58 to comply with
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

## Deprecate insecure usage of notifications

Notifications are a powerful feature as they allow websites to invoke a system
UI to transmit either private information itself or a signal that private
information has been changed. Attackers may sniff or steal any information sent
through a notification over an insecure connection. Web push requires a secure
origin, so this change will align non-push notifications with push
notifications. This change is part of our broader effort to
[remove powerful features from unsecure origins](https://bugs.chromium.org/p/chromium/issues/detail?id=520765).
Removal is expected in Chrome 61.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/IVgkxkRNtMo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5759967025954816) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=679821)

## Remove indexedDB.webkitGetDatabaseNames()

We added this feature when Indexed DB was relatively new in Chrome and prefixing
was all the rage. The API asynchronously returns a list of existing database
names in an origin, which seemed sensible enough.

Unfortunately, the design is flawed, in that the results may be obsolete as soon
as they are returned, so it can really only be used for logging, not serious
application logic. The
[github issue](https://github.com/w3c/IndexedDB/issues/31) tracks/links to
previous discussion on alternatives, which would require a different approach.
While there's been on-and-off interest by developers, given the lack of cross-
browser progress the problem has been worked around by library authors.

Developers needing this functionality need to develop their own solution.
Libraries like [Dexie.js](http://dexie.org/) for example use a global table
ßwhich is itself another database to track the names of databases.

This feature is removed in Chrome 60.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/2fUr-3wFPKI/discussion)
&#124; [Chromestatus Tracker](https://www.chromestatus.com/feature/5725741740195840) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=696010)

<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
