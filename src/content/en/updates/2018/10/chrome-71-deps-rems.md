project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 71 to help you plan.

{# wf_updated_on: 2019-06-26 #}
{# wf_published_on: 2018-10-29 #}
{# wf_tags: deprecations,removals,chrome71 #}
{# wf_blink_components: Blink>Storage>CacheStorage,Blink>ServiceWorker,Internals>SpeechSynthesis,Blink>Animation,Blink>MediaStream #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 71 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 71 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Chrome 71 also includes changes to `cache.addAll()` and `importScripts()`. Read
about it in [Tweaks to `cache.addAll()` and `importScripts()` coming in Chrome
71](/web/updates/2018/10/tweaks-to-addAll-importScripts) by Jeff Posnick.

## Remove SpeechSynthesis.speak() without user activation

The [`SpeechSynthesis`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
interface is actively being abused on the web. There's anecdotal evidences that
because other autoplay avenues are being closed, abuse is moving to the [Web
Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API),
which doesn't follow autoplay rules.

The `speechSynthesis.speak()` function now throws an error if the document has
not received a user activation. This feature has been deprecated since Chrome 70.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/XpkevOngqUs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5687444770914304) &#124;
[Chromium Bug](https://crbug.com/812767)


## Remove prefixed versions of APIs

Chrome has removed non-standard aliases for two widely supported standard
interfaces.

### WebKitAnimationEvent

`WebKitAnimationEvent` has been fully replaced by
[`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent)
, the event interface used for events relating to CSS Animations. The prefixed
form is only supported in Safari. Firefox and Edge only support the un-prefixed
`AnimationEvent`.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EgMUDqySZwE/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6027726842494976) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695504&desc=2)

### WebKitTransitionEvent

`WebKitTransitionEvent` has been fully replaced by
[`TransitionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent)
, the event interface used for events relating to CSS Transitions (for example,
`transitionstart`). The prefixed form is only supported in Safari. Firefox and
Edge only support the un-prefixed `TransitionEvent`.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/0Szv8vDQh_c/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6579769156042752) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695504&desc=2)


## Remove URL.createObjectURL from MediaStream

The `URL.createObjectURL()` method has been removed from the `MediaStream`
interface. This method has been deprecated in 2013 and superseded by assigning
streams to
[`HTMLMediaElement.srcObject`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject).
The old method was removed because it is less safe, requiring a call to
`URL.revokeOjbectURL()` to end the stream. Other user agents have either
deprecated (Firefox) or removed (Safari) this feature feature.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/tWzutytXsqc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5618491470118912) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=800767&desc=2)


## Remove document.origin

The `document.origin` property has been removed. This property was only ever
implemented in Chromium and WebKit. It is redundant with `self.origin` which
can be used in [both window and worker
contexts](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/origin)
and has wider support.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/0D_37iuh1zc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5701042356355072) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=692084)

## Deprecations

{% include "web/updates/_shared/no-new-deprecations.html" %}

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

