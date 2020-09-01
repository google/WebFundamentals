project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 86 to help you plan.

{# wf_updated_on: 2020-09-03 #}
{# wf_published_on: 2020-09-03 #}
{# wf_tags: deprecations,removals,chrome86 #}
{# wf_blink_components: Blink>Layout,Blink>Network,Blink>Storage>AppCache #}
{# wf_featured_image: /web/updates/images/2020/09/dep-rem_86.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 86 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 86 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


## Remove WebComponents v0

Web Components v0 was removed from desktop and Android in Chrome 80. Chromium 86
removes them from WebView. This removal includes Custom Elements v0, Shadow DOM
v0, and HTML Imports.

## Deprecate FTP support

Chrome is deprecating and removing support for FTP URLs. The current FTP
implementation in Google Chrome has no support for encrypted connections (FTPS),
nor proxies. Usage of FTP in the browser is sufficiently low that it is no
longer viable to invest in improving the existing FTP client. In addition, more
capable FTP clients are available on all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Currently navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 and later resulted in dropping support
for accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed
entirely in Google Chrome 76.

The remaining capabilities of Google Chrome’s FTP implementation are restricted
to either displaying a directory listing or downloading a resource over
unencrypted connections. 

Deprecation of support will follow this timeline:

### Chrome 86

FTP is still enabled by default for most users, but turned off for pre-release
channels (Canary and Beta) and will be experimentally turned off for one percent
of stable users. In this version you can re-enable it from the command line
using either the `--enable-ftp` command line flag or the
`--enable-features=FtpProtocol` flag.

### Chrome 87

FTP support will be disabled by default for fifty percent of users but can be
enabled using the flags listed above.

###Chrome 88

FTP support will be disabled.

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
