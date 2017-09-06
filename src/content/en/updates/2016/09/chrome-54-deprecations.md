project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: An round up of the deprecations and removals in Chrome to help you plan.

{# wf_updated_on: 2016-09-14 #}
{# wf_published_on: 2016-09-14 #}
{# wf_tags: deprecations,removals,chrome54 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}

# API Deprecations and Removals in Chrome 54 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}



In nearly every version of Chrome, we see a significant number of updates and improvements to the product, its performance, and also capabilities of the Web Platform. This article describes the deprecations and removals in Chrome 54, which is in beta as of Setempber 15. This list is subject to change at any time.


## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform which have run their course. There can be many reasons why we would remove an API, such as: they are superseded by newer APIs, they are updated to reflect changes to specifications to bring alignment and consistency with other browsers, or they are early experiments that never came to fruition in other browsers and thus can increase the burden of support for web developers.

Some of these changes will have an effect on a very small number of sites. To mitigate issues ahead of time, we try to give developers advanced notice so that if needed, they can make the required changes to keep their sites running.


Chrome currently has a
[process for deprecations and removals of API's](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation)
and the TL;DR is:

* Announce on the [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev) mailing list.
* Set warnings and give time scales in the Chrome DevTools Console when usage is detected on a page.
* Wait, monitor, and then remove feature as usage drops.


You can find a list of all deprecated features in
[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the
[removed filter](https://www.chromestatus.com/features#removed). We will also 
try to summarize some of the changes, reasoning, and migration paths in 
these posts. We will also try to summarize some of the changes, reasoning, and migration paths in these posts.


## Disable navigations in the unload handler

**TL;DR:** All cross-origin navigations will be disallowed in `window.onunload` event handlers to bring Chrome inline with the HTML spec as well as Firefox and Safari.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/VfItzNe3WO0/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5655310928707584) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=613244)

Previous versions of Chrome allowed cross-origin navigation to be interrupted inside `window.onunload`. by setting `window.location.href = '#fragment'`.  [According to the HTML spec](https://html.spec.whatwg.org/multipage/browsers.html#navigate), only in-page navigations are allowed in the unload handlers, and in previous versions of Chrome other methods of navigating were blocked as required by the spec. Starting in Chrome 54, such navigations will be disallowed to bring us in line with the spec as well as Firefox and Safari.


## HTTP/0.9 deprecated

**TL;DR:** HTTP/0.9 is deprecated. Developers should move to a later version, preferably HTTP/2.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/OdKnpLlvVUo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5633064474509312) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=624462)

[HTTP/0.9 is the predecessor to HTTP/1.x](https://hpbn.co/brief-history-of-http/). It lacks many features of its successors. A particular concern for the modern web is its lack of response headers. Without them, there's no way to verify that an HTTP/0.9 response is really an HTTP/0.9 response. This can cause several problems. Examples include, among other problems: 

* Clients that treat certain error responses as valid HTTP/0.9 responses. 
* Servers that fail to close the request socket causing clients to treat responses as a hanging GET which either stays alive eternally or until a user navigates from a page that made the request. 
* Servers that are unable to indicate to the browser that a request failed, which can cause problems with caching heuristics.


The only foolproof way to fix issues with HTTP/0.9 is to remove support altogether. Which is why support for HTTP/0.9 is removed in Chrome 54.


## Use of `initTouchEvent` is removed

**TL;DR**:
[`initTouchEvent`](https://w3c.github.io/touch-events/#dictionary-toucheventinit-members)
has been deprecated in favor of the
[`TouchEvent`](https://w3c.github.io/touch-events/#touch-interface)
[`constructor`](https://w3c.github.io/touch-events/#touch-interface) to improve
spec compliance and will be removed altogether in Chrome 54.

[Intent to Remove](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/dqlJguVuIHs) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5730982598541312) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=522100)

For a long time developers have been able to create synthetic touch events in Chrome
using the `initTouchEvent` API. These are frequently used to simulate Touch Events
either for testing or automating some UIs in your site.  Since Chrome 49, this deprecated API has displayed the following warning .

<figure>
  <img src="/web/updates/images/2016/09/chrome-54-deprecations/image00.png" />
  <figcaption>
    <code>TouchEvent.initTouchEvent</code> is deprecated and will be removed in M53, 
    around September 2016. Please use the <code>TouchEvent</code> constructor instead. See
    <a href="https://www.chromestatus.com/features/5730982598541312">
    https://www.chromestatus.com/features/5730982598541312</a> for more details.
  </figcaption>
</figure>

Aside from not being in the Touch Events spec, there are a number of reasons why
[this change is good](https://miketaylr.com/posts/2015/09/init-touch-event-is-a-rats-nest.html).
The Chrome implementation of `initTouchEvent` was not compatible at all with
Safari's `initTouchEvent` API and was different to Firefox on Android's. And
finally, the `TouchEvent` constructor is a lot easier to use. 

For these reasons we decided to follow the spec rather than maintain an API
that is neither specced nor compatible with the only other implementation.
Developers needing an alternative should use the `TouchEvent` constructor.

Because the iOS and Android/Chrome implementations of the `initTouchEvent` API
were so wildly different, sites would often have
[code along the lines of](https://gist.github.com/basecss/8666646)
(frequently forgetting Firefox)


    var event = document.createEvent('TouchEvent');
    
    if(ua === 'Android') {
      event.initTouchEvent(touchItem, touchItem, touchItem, "touchstart", window,
        300, 300, 200, 200, false, false, false, false);
    } else {
      event.initTouchEvent("touchstart", false, false, window, 0, 300, 300, 200,
        200, false, false, false, false, touches, targetTouches, changedTouches, 0, 0);
    }
    
    document.body.dispatchEvent(touchEvent);
    

This is bad because it looks for "Android" in the User-Agent and Chrome
on Android will match and hit this deprecation.  It can't be removed just yet
though because there will be other WebKit and older Blink based browsers on
Android for a while that you will still need to support the older API.

To correctly handle `TouchEvent`s on the web you should change your code to
support Firefox, IE Edge, and Chrome by checking for the existence of `TouchEvent`
on the `window` object and if it has a positive "length" (indicating it's a
constructor that takes an argument) you should use that.


    if('TouchEvent' in window && TouchEvent.length > 0) {
      var touch = new Touch({
        identifier: 42,
        target: document.body,
        clientX: 200,
        clientY: 200,
        screenX: 300,
        screenY: 300,
        pageX: 200,
        pageY: 200,
        radiusX: 5,
        radiusY: 5
      });
    
      event = new TouchEvent("touchstart", {
        cancelable: true,
        bubbles: true,
        touches: [touch],
        targetTouches: [touch],
        changedTouches: [touch]
      });
    }
    else {
      event = document.createEvent('TouchEvent');
    
      if(ua === 'Android') {
        event.initTouchEvent(touchItem, touchItem, touchItem, "touchstart", window,
          300, 300, 200, 200, false, false, false, false);
      } else {
        event.initTouchEvent("touchstart", false, false, window, 0, 300, 300, 200,
          200, false, false, false, false, touches, targetTouches, 
          changedTouches, 0, 0);
      }
    }
    
    document.body.dispatchEvent(touchEvent);
    


## KeyboardEvent.keyIdentifier attribute removed

**TL;DR:** The little-supported `keyboardEvent.keyIdentifier` property is being removed in favor the standards-based `KeyboardEvent.key` property. 

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/fqnFyoDCOaA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5316065118650368) &#124;
[Chromium Bug](https://crbug.com/607349)

The `keyboardEvent.keyIdentifier` attribute was briefly part of a W3C specification in 2009 and 2010. However, it was only ever implemented in WebKit. 

Developers needing to replace this attribute can use either the standards-based `KeyboardEvent.key` property or the `KeyboardEvent.code` property (as described in [an article we did last spring](/web/updates/2016/04/keyboardevent-keys-codes)). The former has the widest implementation base, being supported on [all major desktop browsers](http://caniuse.com/#feat=keyboardevent-key) except Safari. The later is currently supported on Chrome, Firefox, and Opera. Removing this feature is intended to drive adoption of `KeyboardEvent.key` property. There is no word from Apple as to whether will support this; however the also deprecated (but not yet removed from Chrome) `KeyboardEvent.keyCode` and `KeyboardEvent.charCode` properties are still available on Safari.


## Remove MediaStream ended event and attribute and onended attribute

**TL;DR:** The `ended` event and attribute and the `onended` event handler are being removed because they have been removed from the  [Media Capture and Streams spec](https://www.w3.org/TR/mediacapture-streams/).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EHy8zm0eVy0/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5730404371791872) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=608795)

Neither the `ended` event, nor the `onended` event handler have been part of the WebRTC spec for about three years. Developers wanting to watch events should use [`MediaStreamTracks`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) instead of `MediaStreams`.


## Deprecate SVGSVGElement.viewPort

The implementation has not worked in Chrome since 2012. The attribute is not present at all in other browsers and it has been removed from the specification. For these reasons the property is being deprecated. Removal is anticipated in Chrome 55.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/bFqDvZK2LVY/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5686865248124928) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=395838)

## Deprecate SVGViewElement.viewTarget

The `SVGViewElement.viewTarget` attribute is not part of the SVG2.0 specification and it's usage is small or nonexistent. This attribute is deprecated in Chrome 54. Removal is anticipated in Chrome 56.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/X3kyDbj9xlA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5665473114931200) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=633908)

##Remove SVGZoomEvent

The `SVGZoomEvent`  is not part of the SVG2.0 specification and does not function in Chromium. Despite that it's still feature detectable, leading to potential confusion by developers. It will be removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/wm0P8R-u4rg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5760883808534528) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=367890)



{% include "comment-widget.html" %}
