project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 58 to help you plan.

{# wf_updated_on: 2017-04-28 #}
{# wf_published_on: 2017-04-28 #}
{# wf_tags: deprecations,removals,chrome59 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 58 to help you plan. #}

# Deprecations and Removals in Chrome 59 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 58,
which is in beta as of April 27. This list is subject to change at any time.

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

Content in an &lt;iframe&gt; can generally navigate the top level browsing context
unless explicitly forbidden by the sandbox attribute (sometimes called
'framebusting'). Framebusting was originally used by content that wanted to
prevent being placed in an &lt;iframe&gt;. Not only are there more specific tools to
accomplish this (see below), but this specific framebusting technique is being
used by malicious content to forcibly navigate users to a different URL.

Starting in Chrome 57, cross-origin framebusting requires a user gesture unless
the frame and the top-level content are from the same origin. Sites that want to
prevent their content from appearing in an &lt;iframe&gt; should use the
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





<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}