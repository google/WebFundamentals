project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 88 to help you plan.

{# wf_updated_on: 2020-12-04 #}
{# wf_published_on: 2020-12-04 #}
{# wf_tags: deprecations,removals,chrome88 #}
{# wf_blink_components: Blink>Layout,Blink>Network,Blink>Storage>AppCache #}
{# wf_featured_image: /web/updates/images/2020/10/dep-rem_87.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 88 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 88 {: .page-title }

Chrome 88 beta was released on December 3, 2020 and is expected to become the
stable version in the third week of January 2021.

## Don't allow popups during page unload (enterprises)

Since Chrome 80, pages have no longer been able to open a new page during
unloading using `window.open()`. Since then enterprises have been able to use
the `AllowPopupsDuringPageUnload` policy flag to allow popups during page
unload. Starting in Chrome 88, this flag is no longer supported.

## Web Components v0 removed

Web Components v0 have been in a reverse origin trial since Chrome 80. This
allowed users of the API time to upgrade their sites while ensuring that new
adopters of Web Components used version 1. The reverse origin trial ends with
Chrome 87, making Chrome 88 the first in which version 0 is no longer supported.
The Web Components v1 APIs replace Web Components v0 and are fully supported in
Chrome, Safari, Firefox, and Edge. This removal covers the items listed below. 

[Custom Elements v0](https://www.chromestatus.com/feature/4642138092470272)
[HTML Imports](https://www.chromestatus.com/feature/5144752345317376)
[Shadow DOM v0](https://www.chromestatus.com/feature/4507242028072960)

## FTP support removed

Chrome [has removed support for FTP
URLs](https://www.chromestatus.com/feature/6246151319715840). The legacy FTP
implementation in Chrome has no support for encrypted connections (FTPS), nor
proxies. Usage of FTP in the browser is sufficiently low that it is no longer
viable to invest in improving the existing FTP client. In addition, more capable
FTP clients are available on all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 and later resulted in dropping support
for accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed
entirely in Google Chrome 76.

The remaining capabilities of Google Chrome’s FTP implementation were restricted
to either displaying a directory listing or downloading a resource over
unencrypted connections. 

In Chrome 77, FTP support was disabled by default for fifty percent of users but
was available with flags.

In Chrome 88 all FTP support is disabled.


{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
