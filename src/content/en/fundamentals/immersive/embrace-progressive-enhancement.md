project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: The immersive web: augmented and virtual reality.

{# wf_updated_on: 2018-07-16 #}
{# wf_published_on: 2018-06-29 #}
{# wf_blink_components: Blink>WebVR #}

# Embrace progressive enhancement {: .page-title }

<img src="images/touch-input.png" class="attempt-right"
  alt="Use Progressive Enhancement to maximize reach" />

What if your users don’t have a head mounted display (‘HMD’) or a
VR-capable device? The answer is progressive enhancement.

1. Assume the user is using traditional input, such as a keyboard, mouse, or
touchscreen with no access to a VR headset.
2. Adapt to changes in input and headset availability at runtime.

Thankfully the [WebXR Device API](https://immersive-web.github.io/webxr-reference/)
enables your code to detect changes in the VR environment and adapt to changes in the inputs and viewing options on the user’s device.

By assuming a non-VR environment first you can maximize the reach of your
experiences, and ensure that you’re providing the best possible experience no
matter what setup your users have.

For more, read our guide on [adding input to a WebVR scene](./adding-input-to-a-webvr-scene).
