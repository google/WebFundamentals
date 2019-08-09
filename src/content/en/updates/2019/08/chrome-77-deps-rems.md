project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 77 to help you plan.

{# wf_updated_on: 2019-08-08 #}
{# wf_published_on: 2019-08-08 #}
{# wf_tags: deprecations,removals,chrome77 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 77 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 77 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Card issuer networks as payment method names

Removes support for calling PaymentRequest with card issuer networks (e.g.,
"visa", "amex", "mastercard") in the supportedMethods field.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/1udpnrlQK4Q/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5725727580225536) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=719526)

### Deprecate Web MIDI use on insecure origins

Web MIDI use is classified into two groups: non-privilege use, and privilege use
with sysex permission. Until Chrome 77, only the latter use prompts users for
permission. To reduce security concerns, permissions will always be requested
regardless of sysex use. This means that using Web MIDI on insecure origins will
no longer be allowed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/_2XZt3yInCI/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5138066234671104) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=924471)

## Deprecations

### Deprecate WebVR 1.1 API

This API is now deprecated in Chrome, [being replaced
by](https://www.chromestatus.com/feature/5680169905815552) the WebXR Device API,
which is expected to ship in Chrome 78. The WebVR Origin Trial ended on July 24,
2018.

WebVR was never enabled by default in Chrome, and was never ratified as a web
standard. The [WebXR Device API](https://immersive-web.github.io/webxr/) is the
replacement API for WebVR. Removing WebVR from Chrome allows us to focus on the
future of WebXR and remove the maintenance burden of WebVR, as well as reaffirm
that Chrome is committed to WebXR as the future for building immersive web-based
experiences. Removal is expected in Chrome 79.

[Intent to Remove]() &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4532810371039232) &#124;
[Chromium Bug](https://www.chromestatus.com/feature/4532810371039232)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
