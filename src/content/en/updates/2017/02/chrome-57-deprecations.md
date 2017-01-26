project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 57 to help you plan.

{# wf_updated_on: 2017-02-xx #}
{# wf_published_on: 2017-02-xx #}
{# wf_tags: deprecations,removals,chrome57 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome to help you plan. #}

# API Deprecations and Removals in Chrome 57 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 57,
which is in beta as of February XX. This list is subject to change at any time.

## Deprecate case-insensitive matching for usemap attribute

The `usemap` attribute was formerly defined as caseless. Unfortunately implementing this was complicated enough that no browsers implemented it correctly. Research suggested that such complicated algorithm is unnecessary, and even ASCII case-insensitive matching is unnecessary. 

Consequently, the specification was updated so that case-sensitive matching is applied. The old behavior is deprecated in Chrome 57, with removal expected in Chrome 58.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/8pHdFzN0YQc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5760965337415680) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=659464)

## Deprecate and remove webkitCancelRequestAnimationFrame

The `webkitCancelRequestAnimationFrame()` method is a an obsolete, vendor-specific API and the standard `cancelAnimationFrame()` has long been supported in Chromium. Therefore the webkit version is being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/RiDsdLsIdWc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5588435494502400) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=146849)

## Prefixed resource timing buffer-management API (removed)

Two methods and an event handler, `webkitClearResourceTimings()`, `webkitSetResourceTimingBufferSize()`, and `onwebkitresourcetimingbufferfull` are obsolete and vendor-specific. The standard versions of these APIs have been [supported in Chrome since version 46](https://www.chromestatus.com/features/5710624386449408). These features were originally implemented in WebKit, but Safari has not enabled them. Firefox, IE 10+, and Edge have only unprefixed version of the API. Therefore the webkit versions are being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Ou_Dwfp8Ons/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5688905986736128) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=678547)

## Remove BluetoothDevice.uuids attribute

The `BluetoothDevice.uuids` attribute is being removed to bring the
[Bluetooth API](https://www.chromestatus.com/features/5264933985976320) in
line with the current specification. You can retrieve a UUID by calling
[device.watchAdvertisements()](https://webbluetoothcg.github.io/web-bluetooth/#dom-bluetoothdevice-watchadvertisements).

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=653317&desc=2)

## Remove key generation element

Since Chrome 49, &lt;keygen&gt;'s default behaviour has been to return the empty string, unless a permission was granted to this page. IE/Edge do not support &lt;keygen&gt; and have not indicated public signals to support &lt;keygen&gt;. Firefox already gates &lt;keygen&gt; behind a user gesture, but is publicly supportive of removing it. Safari ships &lt;keygen&gt; and has not expressed public views regarding its continued support. With Chrome 57, this element is removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/pX5NbX0Xack/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5716060992962560) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=568184)

## Remove webkit-prefixed IndexedDB global aliases

The `IndexedDB` entry point and global constructors were exposed with `webkit` prefixes somewhere around Chrome 11. The non-prefixed versions were added in Chrome 24 and the prefixed versions were deprecated in Chrome 38. The following interfaces are affected:

* `webkitIndexedDB` (main entry point)
* `webkitIDBKeyRange` (non-callable global constructor, but has useful static methods)
* `webkitIDBCursor`
* `webkitIDBDatabase`
* `webkitIDBFactory`
* `webkitIDBIndex`
* `webkitIDBObjectStore`
* `webkitIDBRequest`
* `webkitIDBTransaction` (non-callable global constructors)

[Intent to Remove]() &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5775330191081472) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=665243)

## WebAudio: Remove prefixed AudioContext and OfflineAudioContext

Chrome has supported `WebAudio` since mid 2011, including `AudioContext`. `OfflineAudioContext` was added the following year. Given how long the standard interfaces and Googles long-term goal of removing prefixed features, the prefixed versions of these interfaces have been deprecated since late 2014 and are now being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/of6S04dUf54/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4571020824412160) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=665887)

## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform
which have run their course. There can be many reasons why we would remove an
API, such as: they are superseded by newer APIs, they are updated to reflect
changes to specifications to bring alignment and consistency with other
browsers, or they are early experiments that never came to fruition in other
browsers and thus can increase the burden of support for web developers.

Some of these changes will have an effect on a very small number of sites. To
mitigate issues ahead of time, we try to give developers advanced notice so that
if needed, they can make the required changes to keep their sites running.

Chrome currently has a
[process for deprecations and removals of API's](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation){:.external}
and the TL;DR is:

* Announce on the
  [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev){: .external}
  mailing list.
* Set warnings and give time scales in the Chrome DevTools Console when usage
  is detected on a page.
* Wait, monitor, and then remove feature as usage drops.

You can find a list of all deprecated features in

[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the [removed filter](https://www.chromestatus.com/features#removed).
We will also  try to summarize some of the changes, reasoning, and migration
paths in these posts. We will also try to summarize some of the changes,
reasoning, and migration paths in these posts.

{% include "comment-widget.html" %}
