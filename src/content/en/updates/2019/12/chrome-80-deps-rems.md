project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 80 to help you plan.

{# wf_updated_on: 2019-12-19 #}
{# wf_published_on: 2019-12-19 #}
{# wf_tags: deprecations,removals,chrome80 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 80 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 78 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Cookie updates

The `SameSite` attribute was introduced in Chrome 51 and Firefox 60 to allow
sites to declare whether cookies should be retricted to a same-site (sometimes
called first-party) context, mitigating the risk of Cross-site request forgeries
(CSRF). In Chrome 80, some behaviors of this attribute that allowed backward
compatibility are being removed.

For more regarding the `SameSite` attribute and its possible values, read
[SameSite cookies explained](https://web.dev/samesite-cookies-explained/).

### Disallow defaulting of SameSite attribute to None

The `SameSite` attribute for cookies now defaults to `Lax` meaning your cookies
are only available to other sites from top-level navigations. 

Cookies have valid cross-origin use cases, but if a site owner did not
previously want to allow cross-origin cookie use there was no way to declare
such an intent or enforce it. As originally implemented in Chrome, the
`SameSite` attribute defaulted to `None`, which was essentiall the Web's status
quo. 

[Chrome Platform Status](https://www.chromestatus.com/feature/5088147346030592) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=953306)

### Value 'None' no longer allowed on insecure contexts.

Chrome now requires that when the `SameSite` attribute is set to `None`, that
the `Secure` attribute must also be present. The `Secure` attribute requires
that the attached cookie can only be transmitted over a secure protocal such as
HTTPS.

[Chrome Platform Status](https://www.chromestatus.com/feature/5633521622188032) &#124;
[Chromium Bug](https://crbug.com/954551)

## Don't allow popups during page unload

Pages may no longer use `window.open()` to open a new page during unload. The
Chrome popup blocker already prohibited this, but now it is prohibited whether
or not the popup blocker is enabled. 

Enterprises can use the `AllowPopupsDuringPageUnload` policy flag to allow
popups during unload. We expect to remove this flag in Chrome 82.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/MkA0A1YKSw4/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5989473649164288) &#124;
[Chromium Bug](https://crbug.com/844455)

## Web Components v0 removed

In July Chrome announced [more time to upgrade to Web Components
v1](/web/updates/2019/07/web-components-time-to-upgrade)
from Web components v0. In Chrome 80 that time is up. The Web Components v1 APIs
are a web platform standard that has shipped in Chrome, Safari, Firefox, and
(soon) Edge. At that time we published guidance for upgrading, which you can
read by following the link at the top of this paragraph. The following features
have now been removed.

### Custom Elements

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4642138092470272) &#124;
[Chromium Bug](http://crbug.com/180965)


### HTML Imports

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5144752345317376) &#124;
[Chromium Bug](http://crbug.com/240592)


### Shadow DOM

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h-JwMiPUnuU/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4507242028072960) &#124;
[Chromium Bug](http://crbug.com/336121)


## Remove -webkit-appearance:button for arbitrary elements

Changes `-webkit-appearance:button` to work only with `<button>` and `<input>`
buttons. If `button` is specified for an unsupported element, the element has
the default appearance. All other `-webkit-appearance` keywords already have
such restriction. 

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/QFXFzfQtlKk/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4867142128238592) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=981720)



### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


### TBD

[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug]()


{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
