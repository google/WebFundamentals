project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn about what is changing in the WebVR API.

{# wf_updated_on: 2017-09-28 #}
{# wf_published_on: 2017-09-28 #}
{# wf_tags: news,webvr #}
{# wf_featured_snippet: Learn about what is changing in the WebVR API #}
{# wf_blink_components: Blink>WebVR #}

# WebVR changes in Chrome 62 {: .page-title }

{% include "web/_shared/contributors/mscales.html" %}

The current WebVR origin trial is ending on November 14,
2017, shortly after the stable release of Chrome 62. We have begun a new trial with the WebVR 1.1
API in Chrome 62 that will continue through Chrome 64.

The new trial includes some API behavior updates that are consistent with the direction of the
forthcoming [WebVR 2.0 spec][0]:

- Use of WebVR is restricted in cross-origin iframes. If you intend for embedded cross-origin
  iframes to be able to use WebVR, add the attribute allow="vr" to the iframe tag, or use a
  [Feature-Policy][1] header ([spec discussion][2], [bug][3]).
- Limit use of getFrameData() and submitFrame() to VRDisplay.requestAnimationFrame()
  ([spec discussion][4], [bug][5]).
- window.requestAnimationFrame() does not fire if the page is not visible, meaning it will not fire
  on Android while WebVR is presenting ([spec discussion][6], [bug][7]).
- The synthetic click event at viewport (0, 0) has been removed (for both Cardboard and the Daydream
  controller touchpad) ([bug][8]). The vrdisplayactivate event is now considered a user gesture, and
  may be used to request presentation and begin media playback, without relying on the click event.
  Code that was previously relying on click event handlers for input should be converted to check
  for gamepad button presses. ([Example implementation][9])
- Chrome may exit presentation if the page takes greater than 5 seconds to display the first frame
  ([code change][10]). It is recommended that the page display within 2 seconds and use a splash
  screen if needed.

Your current WebVR Origin Trial tokens will not be recognized by Chrome 62. To participate in this
new trial please [use the sign up form][11].


{% include "comment-widget.html" %}

[0]: https://github.com/w3c/webvr/blob/master/explainer.md
[1]: https://docs.google.com/document/d/1k0Ua-ZWlM_PsFCFdLMa8kaVTo32PeNZ4G7FFHqpFx4E/edit#heading=h.4yubgixv5l6b
[2]: https://github.com/w3c/webvr/issues/86
[3]: https://bugs.chromium.org/p/chromium/issues/detail?id=666767
[4]: https://github.com/w3c/webvr/issues/246
[5]: https://bugs.chromium.org/p/chromium/issues/detail?id=736023
[6]: https://github.com/w3c/webvr/issues/225
[7]: https://bugs.chromium.org/p/chromium/issues/detail?id=718246
[8]: https://bugs.chromium.org/p/chromium/issues/detail?id=716571
[9]: https://github.com/toji/webvr.info/commit/d73e6182287e3c6c0daa4d3d2ea578a31a2e5a6b
[10]: https://chromium-review.googlesource.com/c/chromium/src/+/636386
[11]: https://bit.ly/OriginTrialSignup
