project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 68 to help you plan.

{# wf_updated_on: 2018-06-11 #}
{# wf_published_on: 2018-06-08 #}
{# wf_tags: deprecations,removals,chrome68 #}
{# wf_blink_components: Blink>CSS,Blink>CSS>Filters,Blink>Input,Blink>WebGL #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 68 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 68 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Deprecate and Remove Negative Brightness Values in Filter

For compliance with specification, filter's `brightness()` function no longer
accepts negative values.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5708036203085824) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=776208)

## Remove document.createTouch

The `document.createTouch()` method is being removed because the `Touch()`
constructor has been supported since Chrome 48. This follows a long-standing
trend in JavaScript APIs of moving away from factory functions and toward
constructors. The closely-related `document.createTouchList()` method [is
expected to be removed in Chrome 69](https://www.chromestatus.com/feature/5185332291043328).

[Intent to Remove]() &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5668612064935936) &#124;
[Chromium Bug]()

## Remove Document.selectedStylesheetSet and Document.preferredStylesheetSet

The Document.selectedStylesheetSet and Document.preferredStylesheetSet
attributes are removed because they are non-standard and only implemented by
Chrome and WebKit. The standard versions of these attributes were removed from
the spec in 2016.

`Document.styleSheets` provides some of the same functionality, thought not
all. Fortunately the risk to websites is low as the use of these items appears
to be in single digits. (See the Intent to Remove for exact numbers.)

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/w1Bv7YZxAco/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6452340664041472) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=690609)

## WEBGL_compressed_texture_atc

Previously, Chrome provided the `AMD_compressed_ATC_texture_atc` formats. These
formats were widely supported at the time the extension was created. Hardware
support has since dwindled to near-zero, with implementation currently possible
only on Qualcomm devices. This extension has been rejected by the WebGL Working
Group and support for it is now removed from Chrome.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5253912718213120) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=845288)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
