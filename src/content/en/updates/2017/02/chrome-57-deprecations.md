project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 57 to help you plan.

{# wf_blink_components: Blink>Bluetooth,Blink>ServiceWorker,Blink>Storage>IndexedDB,Blink>WebAudio,Blink>FileAPI,Blink>WebRTC>PeerConnection #}
{# wf_updated_on: 2018-01-08 #}
{# wf_published_on: 2017-02-01 #}
{# wf_tags: deprecations,removals,chrome57 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome to help you plan. #}

# API Deprecations and Removals in Chrome 57 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 57,
which is in beta as of early February. This list is subject to change at any
time.


## Remove BluetoothDevice.uuids attribute

The `BluetoothDevice.uuids` attribute is being removed to bring the
[Web Bluetooth API](https://www.chromestatus.com/features/5264933985976320) in
line with the current specification. You can retrieve all allowed GATT services by calling
[device.getPrimaryServices()](https://webbluetoothcg.github.io/web-bluetooth/#dom-bluetoothremotegattserver-getprimaryservices).

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=653317)


## Remove key generation element

Since Chrome 49, `<keygen>`'s default behaviour has been to return the empty
string, unless a permission was granted to this page. IE/Edge do not support
`<keygen>` and have not indicated public signals to support `<keygen>`.
Firefox already gates `<keygen>` behind a user gesture, but is publicly
supportive of removing it. Safari ships `<keygen>` and has not expressed
public views regarding its continued support. With Chrome 57, this element
is removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/pX5NbX0Xack/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5716060992962560) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=568184)


## Remove prefixed resource timing buffer-management API

Two methods and an event handler, `webkitClearResourceTimings()`,
`webkitSetResourceTimingBufferSize()`, and `onwebkitresourcetimingbufferfull`
are obsolete and vendor-specific. The
[standard versions of these APIs](https://www.chromestatus.com/feature/5710624386449408)
have been supported in since Chrome 46, and the prefixed functions were
deprecated in that version as well. These features were originally
implemented in WebKit, but Safari has not enabled them. Firefox, IE 10+, and
Edge have only unprefixed version of the API. Therefore the webkit versions
are being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Ou_Dwfp8Ons/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5688905986736128) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=678547)


## Remove ServiceWorkerMessageEvent in favor of using MessageEvent

The HTML spec extended `MessageEvent` to allow `ServiceWorker` as a type for
the `source` attribute.  `client.postMessage()` and creation of custom message
events are changed to use `MessageEvent` instead of `ServiceWorkerMessageEvent`.
`ServiceWorkerMessageEvent` is removed.


[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Xp9hmKyuOrI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5014379292524544) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=659074)


## Remove webkit-prefixed IndexedDB global aliases

The `IndexedDB` entry point and global constructors were exposed with `webkit`
prefixes somewhere around Chrome 11. The non-prefixed versions were added in
Chrome 24 and the prefixed versions were deprecated in Chrome 38. The
following interfaces are affected:

* `webkitIndexedDB` (main entry point)
* `webkitIDBKeyRange` (non-callable global constructor, but has useful static methods)
* `webkitIDBCursor`
* `webkitIDBDatabase`
* `webkitIDBFactory`
* `webkitIDBIndex`
* `webkitIDBObjectStore`
* `webkitIDBRequest`
* `webkitIDBTransaction` (non-callable global constructors)

[Intent to Remove](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/biC_Tz7UV5Y/X5752vTvAgAJ) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5775330191081472) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=665243)


## WebAudio: Remove prefixed AudioContext and OfflineAudioContext

Chrome has supported `WebAudio` since mid 2011, including `AudioContext`.
`OfflineAudioContext` was added the following year. Given how long the standard
interfaces have been supported and Google's long-term goal of removing prefixed
features, the prefixed versions of these interfaces have been deprecated since
late 2014 and are now being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/of6S04dUf54/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4571020824412160) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=665887)


## Deprecate and remove webkitCancelRequestAnimationFrame

The `webkitCancelRequestAnimationFrame()` method is a an obsolete,
vendor-specific API and the standard `cancelAnimationFrame()` has long
been supported in Chromium. Therefore the webkit version is being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/RiDsdLsIdWc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5588435494502400) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=146849)


## Deprecate case-insensitive matching for usemap attribute

The `usemap` attribute was formerly defined as caseless. Unfortunately
implementing this was complicated enough that no browsers implemented it
correctly. Research suggested that such complicated algorithm is unnecessary,
and even ASCII case-insensitive matching is unnecessary.

Consequently, the specification was updated so that case-sensitive matching is
applied. The old behavior is deprecated in Chrome 57, with removal expected in
Chrome 58.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/8pHdFzN0YQc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5760965337415680) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=659464)


## Deprecate FileReaderSync in service workers

The [Service Worker spec](https://www.w3.org/TR/service-workers/)
has always had the (non-normative) note that "any
type of synchronous requests must not be initiated inside of a service
worker", to avoid blocking the service worker. Blocking the service worker
would block all network requests from controlled pages. Unfortunately, the
`FileReaderSync` API has long been available in service workers.

Currently only Firefox and Chrome expose `FileReaderSync` in service workers.
There's agreement from Firefox in the [spec discussion](https://github.com/w3c/ServiceWorker/issues/735)
that this should be fixed. Removal is anticipated in Chrome 59.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/cjWtqRD6iw8/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5739144722513920) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=688586)


## Deprecate legacy caller for HTMLEmbedElement and HTMLObjectElement

That an interface has a legacy caller means that an instance can be called as a
function. Currently, `HTMLEmbedElement` and `HTMLObjectElement` support this
functionality. In Chrome 57 this ability is deprecated. After removal, which is
expected in Chrome 58, calling will throw an exception.

This change brings Chrome in line with recent spec changes. The legacy behavior
is not supported in Edge or Safari, and it is being
[removed from Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=909656).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/AiDZ7ru9mGg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5715026367217664) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=663662)



## Deprecate RTCRtcpMuxPolicy of "negotiate"

The `rtcpMuxPolicy` is used by Chrome to specify its preferred policy regarding
use of RTP/RTCP multiplexing. In Chrome 57, we changed the default
`rtcpMuxPolicy` to "require" and deprecated "negotiate" for following reasons:

* Non-muxed RTCP uses extra network resources.
* Removing "negotiate" will make the API surface simpler, since an
  "RtpSender"/"RtpReceiver" will then only ever have a single transport.

In Chrome 57, "negotiate" is deprecated. We believe this is a non-breaking change
since the user will get a deprecation message and `RTCPeerConnection` can still
be created. Removal is in Chrome 63.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/OP2SGSWF5lo/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=685727)


## Deprecate support for embedded credentials in subresource requests

Hard-coding credentials into subresource requests is problematic from a
security perspective, as it's allowed hackers to brute-force credentials in
the past. These dangers are exacerbated for credentialed subresource requests
that reach into internal IP ranges (your routers, etc.). Given the low usage,
closing this (small) security hole seems quite reasonable.

Developers can embed resources that do not require basic/digest auth, relying
instead on cookies and other session management mechanisms.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/lx-U_JR2BF0/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5669008342777856) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=435547)


{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "comment-widget.html" %}
