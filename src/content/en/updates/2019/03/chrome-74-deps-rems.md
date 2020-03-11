project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 74 to help you plan.

{# wf_updated_on: 2020-03-11 #}
{# wf_published_on: 2019-03-22 #}
{# wf_tags: deprecations,removals,chrome74 #}
{# wf_blink_components: Blink,Security,Internals>Network>FTP,Internals>Network>SSL,Blink>Payments #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 74 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 74 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Disallow opener navigation downloads from cross origin popups

If a popup navigates its opener to a URL which results in a download, the
download will be blocked and the navigation cancelled, if the popup is
cross-origin to its opener. This resolves a long standing security issue.

[Chrome Platform Status](https://www.chromestatus.com/feature/5742188281462784) &#124;
[Chromium Bug](http://crbug.com/932209)

### Remove PaymentAddress's languageCode property

The `PaymentAddress.languageCode` property has been removed from the Payment
Request API. This property is the browser's best guess for the language of the
text in the shipping, billing, delivery, or pickup address in the Payment
Request API. The `languageCode` property is marked at risk in the specification
and has already been removed from Firefox and Safari. Usage in Chrome is small
enough for safe removal.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-reviews/aBGjyKqok50/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/4992562146312192) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=877521)

## Deprecations

{% include "web/updates/_shared/deprecations.html" %}

### Deprecate drive-by downloads in sandboxed iframes

Chrome will soon prevent downloads in sandboxed `iframes` that lack a user
gesture, though this restriction could be lifted via an 
`allow-downloads-without-user-activation` keyword in the sandbox attribute list. 
This allows content providers to restrict malicious or abusive downloads.

Downloads can bring security vulnerabilities to a system. Even though
additional security checks are done in Chrome and the operating system, we feel
blocking downloads in sandboxed `iframes` also fits the general thought behind
the sandbox. Apart from security concerns, it would be a more pleasant user
experience for a click to trigger a download on the same page, compared with
downloads starting automatically when a user lands on a new page, or started
non-spontaneously after the click.

Removal is expected in Chrome 74.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/JdAQ6HNoZvk/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5706745674465280) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=539938)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
