project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 69 to help you plan.

{# wf_updated_on: 2018-08-01 #}
{# wf_published_on: 2018-07-02 #}
{# wf_tags: deprecations,removals,chrome69 #}
{# wf_blink_components: Internals>Media>Source,Blink>Input,Blink>WindowDialog #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 69 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 69 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Chrome 69 also removed the `stalled` event from `HTMLMediaElements`. You'll
find the explanation in [Audio/Video Updates in Chrome
69](web/updates/2018/08/chrome-69-media-updates#stalled) by François Beaufort.

## Removal of document.createTouchList()

The `TouchEvent()` constructor has been
[supported in Chrome](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent#Browser_compatibility)
since version 48. To comply with the specification, `document.createTouchList()`
is now removed. The `document.createTouch()` method was removed in Chrome 68.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/GLbUpUUnQzc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5185332291043328) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=518868)


## The window.confirm() method no longer activates its parent tab

Calling `window.confirm()` on a background tab will no longer activate that tab. If it is called on a background tab, the function returns immediately with `false` and no dialog box is shown to the user. If the tab is active, the call behaves as usual.

The `window.alert()` method was abused by sites for years, allowing them to force themselves to the front, disrupting whatever the user was doing. There was a similar problem with `window.prompt()`. Because these behaviors were removed in Chrome 64, and 56 respectively, the abuse has been moving to `window.confirm()`.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/wqqwsQgwfZI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5140698722467840) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=849816)



{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
