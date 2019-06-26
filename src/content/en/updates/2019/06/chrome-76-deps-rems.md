project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 76 to help you plan.

{# wf_updated_on: 2019-06-26 #}
{# wf_published_on: 2019-06-21 #}
{# wf_tags: deprecations,removals,chrome76 #}
{# wf_blink_components: Blink>FeaturePolicy,Blink>WebAudio,Blink>Sensor>DeviceOrientation #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 76 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 76 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Remove feature policy: lazyload

The lazyload feature policy was intended to allow developers to selectively
control the `lazyload` attribute on the `<iframe>` and `<img>` tags to provide more
control over loading delay for embedded contents and images on a per origin
basis. 

The policy is removed in favor of a newer feature policy for loading, namely
`loading-frame-default-eager` which is more aligned with how the `loading`
attribute will be used. The removal applies to both the Feature-Policy header
and the `<iframe>` `allow` attribute.

[Chrome Platform Status](https://www.chromestatus.com/feature/5641405942726656) &#124;
[Chromium Bug](https://crbug.com/869492)

### Remove outputs from MediaStreamAudioDestinationNode

According to the specification, the `MediaStreamAudioDestinationNode` in the Web
Audio API should have no outputs. Chrome's implementation has a single output
which has been removed.

[Chrome Platform Status](https://www.chromestatus.com/feature/5702493226926080) &#124;
[Chromium Bug](https://crbug.com/691806)

### Remove insecure usage of DeviceMotionEvent

Chromium has been showing deprecation warnings since 2015 whenever the API is
used in a non-secure browsing context. Chrome now restricts the API to secure
browsing contexts. This change brings Chromium’s implementations in line with
the privacy and security recommendations in the specification, and is aligned
with the overarching effort to deprecate powerful features on insecure origins.

[Chrome Platform Status](https://www.chromestatus.com/feature/5688035094036480) &#124;
[Chromium Bug](https://crbug.com/932078)


### Remove insecure usage of DeviceOrientationEvent

Chromium has been showing deprecation warnings since 2015 whenever the API is
used in a non-secure browsing context. Chrome now restricts the API to secure
browsing contexts. This change brings Chromium’s implementations in line with
the privacy and security recommendations in the specification, and is aligned
with the overarching effort to deprecate powerful features on insecure origins.

[Chrome Platform Status](https://www.chromestatus.com/feature/5468407470227456) &#124;
[Chromium Bug](https://crbug.com/932078)

## Deprecations

{% include "web/updates/_shared/no-new-deprecations.html" %}

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
