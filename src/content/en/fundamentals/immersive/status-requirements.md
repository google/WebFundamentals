project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Get the latest info on WebVR and AR's status, as well as things to keep in mind when building WebVR experiences.

{# wf_updated_on: 2018-07-09 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# Immersive web requirements and status {: .page-title }

## Requirements

Using the WebXR Device API requires:

* A [compatible device](/ar/discover/supported-devices).
* Android O or later.
* [ARCore](https://play.google.com/store/apps/details?id=com.google.ar.core&e=-EnableAppDetailsPageRedesign).
* A supporting version of Chrome (see the next section) or the [WebXR polyfill](https://github.com/immersive-web/webxr-polyfill).

Note: Immersive experiences are *extremely performance-sensitive* and
polyfills typically have a relatively large performance cost, so it may be worth
considering whether or not you wish to use the polyfill for a user who doesn’t
have native support for the WebXR Device API. When in doubt, avoid giving
people motion sickness through poorly-performing experiences!

## API status

Documentation is available from the [Immersive Web Early Adopters
Guide](https://immersive-web.github.io/webxr-reference/).

Today the API is available in:

| Feature | Chrome version | Details |
| ------- | -------------- | ------- |
| AR hit test support | Chrome Canary for the immediate future. | Enable the `#webxr` and `#webxr-hit-test` flags under chrome://flags. Note that VR magic windows do not work when the `#webxr-hit-test` flag is turned on. Please excuse our construction debri. |
| VR use cases | Chrome 66 and later | Enable the `chrome://flags/#webxr` flag. (The URL must be entered manually.). |
| VR use cases | Chrome 67 origin trial | Enable the `chrome://flags/#webxr` flag *and* sign up for the origin trial ([explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md), [sign-up form](http://bit.ly/OriginTrialSignup)). |

Learn more about the immersive web at the [Immersive Web Community Group](https://github.com/immersive-web).

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
