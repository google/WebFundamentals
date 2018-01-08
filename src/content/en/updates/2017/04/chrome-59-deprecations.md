project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 59 to help you plan.

{# wf_blink_components: Blink>WebVR,Blink>FileAPI,Blink>MediaStream>*,Blink>SVG,Blink>DOM #}
{# wf_updated_on: 2018-01-08 #}
{# wf_published_on: 2017-05-01 #}
{# wf_tags: deprecations,removals,chrome59 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 59 to help you plan. #}

# Deprecations and Removals in Chrome 59 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 59,
which is in beta as of April 27. This list is subject to change at any time.

### Temporarily disable navigator.sendBeacon() for some blobs

The `navigator.sendBeacon()` function has been available
[since Chrome 39](https://www.chromestatus.com/feature/5517433905348608). 
As originally implemented, the function's `data` argument could contain any
arbitrary blob whose type is not CORS-safelisted. We believe this is a potential
security threat, though no one has yet tried to exploit it. Because we do NOT
have a reasonable immediate fix for it, temporarily, `sendBeacon()` can no
longer be invokable on blobs whose type is NOT CORS-safelisted.

Although this change was implemented for Chrome 60, it is has since been merged
back to Chrome 59.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=720283)

## Remove features from WebVR that are not in the revised spec

The current implementation of WebVR, originally implemented in Chrome 52,
contained several methods and properties that will not be in the final spec.
Deprecation messages were added for these features for the
[Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/explainer.md)
that started in Chrome 56. These features and are now being removed. They include:

- `VRDisplay.getPose()`
- `VRDisplay.resetPose()`
- `VRDisplay.isConnected`
- `VRDisplayCapabilities.hasOrientation`
- `VREyeParameters.fieldOfView`

[Intent to Experiment](https://groups.google.com/a/chromium.org/d/topic/blink-dev/zGAzqfi0e00/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4532810371039232) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=706561&desc=2) &#124;
[Origin Trial Results so Far](https://groups.google.com/a/chromium.org/d/topic/blink-dev/c41q3tyCBJE/discussion)

## Remove FileReaderSync from service workers

The Service Worker spec has always had the (non-normative) note that "any type
of synchronous requests must not be initiated inside of a service worker", to
avoid blocking the service worker (as blocking the service worker would block
all network requests from controlled pages). However synchronous APIs such as
`FileReaderSync` were still available in service workers. `FileReaderSync` was
deprecated in Chrome 57. It is removed in Chrome 59.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/cjWtqRD6iw8/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5739144722513920) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=688586)

## Remove non-standard DeviceOrientation Event initialization functions

For some time now there's been a general trend in browser APIs away from
initialization functions and toward object constructors. The most recent version
of the [DeviceOrientation Event Specification](https://w3c.github.io/deviceorientation/spec-source-orientation.html)
follows this trend by requiring constructors for both
[`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
and [`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent).

Since Chrome is
[enabling these constructors by default](https://www.chromestatus.com/features/4659236399218688)
in Chrome 59 the legacy initialization functions, `initDeviceMotionEvent()` and
`initDeviceOrientationEvent()` are also removed. Edge has deprecated the
initialization functions and Firefox has already shipped the constructors.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/XlnBk6qzkuw/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=697598)

## Remove "on-demand" value for hover/any-hover media queries

The “on-demand” value for hover/any-hover media queries was removed from the
spec about a year ago. Consequently, these media queries are removed in Chrome
59.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/-sTmxMpl6iI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4719452646014976) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=654861)


## Remove MediaStreamTrack.remote

In Chrome 48 the `MediaStreamTrack.remote` property was added in support of the
[Media Capture and Streams API](https://w3c.github.io/mediacapture-main/)
with the goal of allowing JavaScript to know whether a WebRTC `MediaStreamTrack`
is from a remote source or a local one.

Since that time, this property has been removed from the spec. As of
Chrome 59, it is no longer supported.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=598704)


## Remove support creating ProgressEvent with document.createEvent()

Earlier versions of the DOM spec required implementation of
`document.createEvent("ProgressEvent")`. However usage was always low and
support has already been removed from
[Gecko](https://bugzilla.mozilla.org/show_bug.cgi?id=843489) and
[Webkit](https://bugs.webkit.org/show_bug.cgi?id=71340). The event itself was
[removed from the spec](https://github.com/whatwg/dom/pull/421/files) in March
of this year.

To conform with the platform and most recent spec, `ProgressEvent` is now removed from Chrome.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=703559)


## Remove SVGTests.required Features

In the first version of the SVG spec, an application could call
`DOMImplementation.hasFeature` to verify that a particular SVG interface is
supported. Many SVG elements contained a `requiredFeatures` attribute that
returned the same information.

In SVG2 `DOMImplementation.hasFeature` property always returns true.
Consequently `requiredFeatures` no longer does anything useful. Because it was
[removed from the spec](https://github.com/w3c/svgwg/commit/9a30d01f6410dc516c5f874d71e957230a3448cd)
it was deprecated in Chrome 54 and has now been removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/qiFyionxCYg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5720709590417408) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=635420)








{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "comment-widget.html" %}
