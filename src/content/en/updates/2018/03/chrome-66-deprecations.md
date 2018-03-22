project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 66 to help you plan. In this version,

{# wf_updated_on: 2018-03-22 #}
{# wf_published_on: 2018-03-26 #}
{# wf_tags: deprecations,removals,chrome66 #}
{# wf_blink_components: Blink,Blink>Bindings,Blink>Network #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 66 to help you plan. In this version,   #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 66 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


## ImageCapture.setOptions() removed

Current thinking on setting device options is to use the [constrainable pattern](https://w3c.github.io/mediacapture-main/archives/20141205/getusermedia.html#constrainable-interface). Consequently this property was removed from the [ImageCapture specification](https://www.w3.org/TR/image-capture/#imagecaptureapi). Since this method appears to have little to no use on production websites, it is being removed. A replacement method is not available at this time.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/tPbZ0eaO-yw/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5552970657693696) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=771283)

## Service worker: disallow CORS responses for same-origin requests

Previous versions of the service worker specification allowed a service worker to return a CORS response to a same-origin request. The thinking was that the service worker could read from a CORS response to create a completely synthetic response. In spite of this, the original request URL was maintained in the response. So `outerResponse.url` exactly equaled `url` and `innerResponse.url` exactly equaled `crossOriginURL`.

A recent [change to the Fetch specification](https://github.com/whatwg/fetch/pull/146) requires that `Response.url` be exposed if it is present. A consequence of this is scenarios in which `self.location.href` returns a different origin than `self.origin`. To avoid this service workers are no longer allowed to return CORS responses for same origin requests.

For a longer discussion on this change, see the [issue filed agains the Fetch specification](https://github.com/whatwg/fetch/issues/629) in November 2017.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5694278818856960) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=800234)


## WebAudio: dezippering removed

WebAudio originally shipped with dezippering support.  When an AudioParam value was set directly with the value setter, the value was not updated immediately.  Instead, an exponential smoother was applied with a time constant of about 10 ms so that the change was done smoothly, limiting glitches.  It was never specified which parameters had smoothing and what the time constant was.  It wasn’t even obvious if the actual time constant was the appropriate value.

After [much discussion](https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2FWebAudio%2Fweb-audio-api%2Fissues%2F76&sa=D&sntz=1&usg=AFQjCNGdcDCW3wiMGghiBNln2AT5mjEqpg), the working group removed dezippering from the spec. Now, the value is changed immediately when set. In place of dezippering, it is recommended that developers use the existing `AudioParam.setTargetAtTime()` method to do the dezippering, giving you full control on when to apply it, how fast to change, and on which parameters should be smoothed.

Removing this reduces developer confusion on what AudioParams have dezippering.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/YKYRrh0nWMo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5287995770929152) &#124;
[Chromium Bug](http://crbug.com/496282)

## CSS position values with three parts deprecated

Recently specifications have required that new properties accepting position values not support values with three parts. It's believed this approach makes processing shorthand syntax easier. The current version of the [CSS Values and Units Module](https://drafts.csswg.org/css-values-4) applies this requirement to all CSS position values. As of Chrome 66, three-part position values are deprecated. No removal date has been set.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/oBKMVCOX1sY/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5116559680864256) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=804187)


## Methods document.createTouch(), document.createTouchList() are deprecated

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/GLbUpUUnQzc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5668612064935936) &#124;
[Chromium Bug](https://crbug.com/518868)


{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
