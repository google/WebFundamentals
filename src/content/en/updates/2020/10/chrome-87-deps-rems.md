project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 87 to help you plan.

{# wf_updated_on: 2020-12-04 #}
{# wf_published_on: 2020-10-15 #}
{# wf_tags: deprecations,removals,chrome87 #}
{# wf_blink_components: Blink>Layout,Blink>Network,Blink>Storage>AppCache #}
{# wf_featured_image: /web/updates/images/2020/10/dep-rem_87.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 87 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 87 {: .page-title }

Chrome 87 beta was released on October 15, 2020 and stable was released on
November 17, 2020ß.

## Comma separator in iframe allow attribute

Permissions policy declarations in an `<iframe>` tag [can no longer use
commas](https://www.chromestatus.com/feature/5740835259809792) as a separator
between items. Developers should use semicolons instead.

## -webkit-font-size-delta

Blink [will no longer](https://www.chromestatus.com/feature/6267981828980736)
support the rarely-used -webkit-font-size-delta property. Developers should use
font-size to control font size instead.


## Deprecate FTP support

Chrome is [deprecating and removing support for FTP
URLs](https://www.chromestatus.com/feature/6246151319715840). The current FTP
implementation in Google Chrome has no support for encrypted connections (FTPS),
nor proxies. Usage of FTP in the browser is sufficiently low that it is no
longer viable to invest in improving the existing FTP client. In addition, more
capable FTP clients are available on all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Currently navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 and later resulted in dropping support
for accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed
entirely in Google Chrome 76. In Chrome 86, FTP was turned off for pre-release
channels (Canary and Beta) and was experimentally turned off for one percent of
stable users. 

The remaining capabilities of Google Chrome’s FTP implementation are restricted
to either displaying a directory listing or downloading a resource over
unencrypted connections. 

Remainder of the deprecation follows this timeline:

### Chrome 87

FTP support will be disabled by default for fifty percent of users but can be
enabled using the flags listed above.

### Chrome 88

FTP support will be disabled.


{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
