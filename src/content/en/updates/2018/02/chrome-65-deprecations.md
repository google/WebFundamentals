project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 65 to help you plan. In this version, a reminder about Symantec certificates, cross-origin downloads are blocked, and document.all is now read only.

{# wf_updated_on: 2018-11-27 #}
{# wf_published_on: 2018-02-08 #}
{# wf_tags: deprecations,removals,chrome65 #}
{# wf_blink_components: Blink,Blink>Bindings,Blink>Network,Internals>Network>Cookies #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 65 to help you plan. In this version, a reminder about Symantec certificates, cross-origin downloads are blocked, and <code>document.all</code> is now read only.  #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 65 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes some of the deprecations and removals in Chrome
65, which is in beta as of February 8.

## Chrome no longer trusting certain Symantec certificates

As [previously announced](https://security.googleblog.com/2017/09/chromes-plan-to-distrust-symantec.html),
Chrome 65 will not trust certificates issued from Symantec’s Legacy PKI after
December 1st, 2017, and will result in interstitials. This will only affect site
operators who explicitly opted-out of the transition from Symantec’s Legacy PKI
to DigiCert’s new PKI.

## Block cross-origin &lt;a download>

To avoid what is essentially a user-mediated cross-origin information leakage,
Blink will now ignore the presence of the download attribute on anchor elements
with cross origin attributes. Note that this applies to
[HTMLAnchorElement.download](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/download)
as well as to the element itself.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Iw3_SUcagGg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4969697975992320) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=714373)

## Document.all is no longer replaceable

For a long time now, It's been possible for web developers to overwrite
`document.all`. According to the current standard, this should not be so.
Starting in version 65, Chrome complies with the standard.

[Chromestatus Tracker](https://www.chromestatus.com/feature/5072231356956672) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=794433)

## The set-cookie value no longer supported for &lt;meta&gt; element's http-equiv attribute

Currently, `<meta http-equiv="set-cookie" ...>` can be used to manipulate
existing cookies for a host, or to set new cookies. This allows a non-script
content injection to upgrade itself to a session fixation attack, even in the
presence of a strong content security policy.

It's better from a security perspective to require either access to HTTP
headers (in other words `Set-Cookie`) or script execution (in other words
`document.cookie`).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/0sJ8GUJO0Dw/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6170540112871424) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=767813)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

