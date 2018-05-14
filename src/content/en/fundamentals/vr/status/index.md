project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Get the latest info on WebVR and AR's status, as well as things to keep in mind when building WebVR experiences.

{# wf_updated_on: 2018-04-28 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR Status and Considerations {: .page-title }

{% include "web/_shared/webxr-status.html" %}

## WebVR Implementation Status

### WebXR Device API (formerly WebVR 2.0) {:#xrdevice}

Today the API is available in:

* Under the `#webxr` flag in Chrome 66 and later.
* As an [Origin
Trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
in Chrome 67 and later.

Follow it's progress below:

<iframe width="100%" height="320"
  src="https://www.chromestatus.com/feature/5680169905815552?embed"
  style="border: 1px solid #CCC" allowfullscreen>
</iframe>

Find more information on browser implementation status on
[chromestatus.com](https://www.chromestatus.com/features/5680169905815552).

### Version 1.1 {:#version_1_1}

Today the WebVR 1.1 API is available in:

* Firefox Nightly.
* Samsung Internet for Android and for Gear VR.
* A Chrome [Origin
Trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
that ran from version 56 beta to June of 2017.

It's supported on:

 * Daydream View since M56
 * Google Cardboard since M57

It's also available through the [WebXR
Polyfill](https://github.com/immersive-web/webxr-polyfill).

<iframe width="100%" height="320"
  src="https://www.chromestatus.com/feature/4532810371039232?embed"
  style="border: 1px solid #CCC" allowfullscreen>
</iframe>

Find more information on browser implementation status on
[chromestatus.com](https://www.chromestatus.com/features/4532810371039232).

## Considerations

Here are things to remember when building WebVR experiences today.

* **You must serve your WebVR content over HTTPS.** If you don’t your users will
  get warnings from the browser. See [Enabling HTTPS on Your
  Servers](/web/fundamentals/security/encrypt-in-transit/enable-https)
  for more guidance.
* **The [WebXR Polyfill](https://github.com/immersive-web/webxr-polyfill) may not
  always be a 1:1 match with native implementations of the spec.** If you plan
  to use the Polyfill, be sure to check on both VR-capable and non-VR devices.
* **For some types of sessions, users must click a button before
  AR or VR are available to your code**. See the [Immersive Web Early Adopters
  Guide](https://immersive-web.github.io/webxr-reference/) for more information.
