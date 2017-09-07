project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Get the latest info on WebVR's status, as well as things to keep in mind when building WebVR experiences.

{# wf_updated_on: 2017-06-05 #}
{# wf_published_on: 2016-12-12 #}
{# wf_blink_components: Blink>WebVR #}

# WebVR Status and Considerations {: .page-title }

Warning: WebVR is still experimental and subject to change.

## WebVR Implementation Status

Today the WebVR API is available in:

* Chrome Beta (M56+), via an
  [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Samsung Internet for Android and for Gear VR.

<iframe width="100%" height="320"
  src="https://www.chromestatus.com/feature/4532810371039232?embed"
  style="border: 1px solid #CCC" allowfullscreen>
</iframe>

More information on browser implementation status can be found on
[chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed).

## Considerations

Here are things to remember when building WebVR experiences today.

* **You must serve your WebVR content over HTTPS.** If you don’t your users will
  get warnings from the browser.
    * See
      [Enabling HTTPS on Your Servers](/web/fundamentals/security/encrypt-in-transit/enable-https)
      for more guidance.
* **Chrome only supports native WebVR on Android today.** You must be using a
  Daydream headset with a Pixel phone.
* **The [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) may not
  always be a 1:1 match with native implementations of the spec.** If you plan
  to use the Polyfill, be sure to check on both VR-capable and non-VR devices.
* **Users must click a VR controller button before it's available to your
  code**. You must account for this in your code, typically by showing the user
  a message requesting they press a controller button at the start of their VR
  experience.
* **You must enable Gamepad pose information in Chrome 56 when running locally**.
  The gamepad information will not contain pose (or location) information when
  running on localhost unless you enable the Gamepad Extensions runtime flag in
  Chrome 56. If you are running an Origin Trial the Gamepad Extensions are
  enabled with the WebVR API.
