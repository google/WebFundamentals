project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 70 to help you plan.

{# wf_updated_on: 2019-06-26 #}
{# wf_published_on: 2018-09-14 #}
{# wf_tags: deprecations,removals,chrome70 #}
{# wf_blink_components: Blink>HTML,Blink>GamepadAPI,Blink>SecurityFeature,Internals>SpeechSynthesis #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 70 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 70 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Remove AppCache from insecure contexts

When used over insecure contexts, AppCache potentially allows *persistent*
online and offline cross-site scripting attacks. This is a serious escalation
from regular cross-site scripting.

To mitigate this threat, AppCache is now only supported on origins that serve
over HTTPS. 

Developers looking for an alternative to AppCache are encouraged to use service
workers. An experimental
[library is available](https://www.npmjs.com/package/sw-appcache-behavior)
to ease that transition.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/UKF8cK0EwMI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5714236168732672) &#124;
[Chromium Bug](https://crbug.com/588931)


### Remove anonymous getter for HTMLFrameSetElement

The anonymous getter for `HTMLFrameSetElement` is non-standard and therefore
being removed. This feature was [added 13 years
ago](https://trac.webkit.org/changeset/8717/webkit) to resolve a compatibility
issue that then existed, but now does not. Because this is a non-standard
feature no alternatives are available. Usage is low enough that we do not
expect this to be a problem.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/7jBHd71Yf0s/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5235521668251648) &#124;
[Chromium Bug](https://crbug.com/695891)


### Deprecate and remove Gamepads.item()

The legacy `item()` accessor is removed from the `Gamepads` array. This change
improves compatibility with Firefox which is so far the only browser to
implement `GamepadList`.

[Chromestatus Tracker](https://www.chromestatus.com/feature/4507242028072960) &#124;
[Chromium Bug](https://crbug.com/865642)

## Deprecations

{% include "web/updates/_shared/deprecations.html" %}

### Deprecate Custom Elements v0

Custom Elements are a Web Components technology that lets you create new HTML
tags, beef up existing tags, or extend components authored by other developers.
Custom Elements v1 have been [implemented in
Chrome](https://www.chromestatus.com/feature/4696261944934400) since version
54, which shipped in October 2016. Custom Elements v0 was an experimental
version not implemented in other browsers. As such it is now deprecated with
removal expected in Chrome 80, around February 2020.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4642138092470272) &#124;
[Chromium Bug](https://crbug.com/180965)


### Deprecate HTML Imports

HTML Imports allow HTML to be imported from one document to another. This
feature was part of the early experimental version of Web Components not
implemented in other browsers. As such it is now deprecated with removal
expected in Chrome 73, around April 2019. Sites depending on HTML imports
already require a polyfill on non-Chromium browsers. When HTML imports is
removed, sites that have the polyfill should continue to work on Chrome.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5144752345317376) &#124;
[Chromium Bug](https://crbug.com/240592)


### Deprecate Shadow DOM v0

Shadow DOM is a Web Components technology that uses scoped subtrees inside
elements. Shadow DOM v1 has been [implemented in
Chrome](https://www.chromestatus.com/feature/4667415417847808) since version
53, which shipped in August of 2016. Shadow DOM v0 was an experimental version
not implemented in other browsers. As such it is now deprecated with removal
expected in Chrome 73, around April 2019. Sites depending on Shadow DOM v0
already require a polyfill on non-Chromium browsers. When HTML imports is removed,
sites that have the polyfill should continue to work on Chrome.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5135093320384512) &#124;
[Chromium Bug](https://crbug.com/336121)


### Deprecate SpeechSynthesis.speak() without user activation

The [`SpeechSynthesis`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
interface is actively being abused on the web. There's anecdotal evidences that
because other autoplay avenues are being closed, abuse is moving to the [Web
Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API),
which doesn't follow autoplay rules.

The `speechSynthesis.speak()` function now throws an error if the document has
not received a user activation. Removal is expected in Chrome 71, some time in
late November.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/XpkevOngqUs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5687444770914304) &#124;
[Chromium Bug](https://crbug.com/812767)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

