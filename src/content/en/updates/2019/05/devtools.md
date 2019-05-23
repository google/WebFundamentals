project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-05-23 #}
{# wf_published_on: 2019-05-23 #}
{# wf_tags: chrome76, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 76) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Hello! Here's what's new in [Chrome DevTools](/web/tools/chrome-devtools/) in Chrome 76.

* LH throttling text renamed to Slow 4G
  * https://chromium.googlesource.com/chromium/src/+/33c7ee83367a4b488d8024ac040d6f0a942db6ab
* WebSocket messages in HAR exports
  * https://chromium.googlesource.com/chromium/src/+/9683677526bf8e4b9f87e52c1387da551078b0e4
* Move network settings behind gear
  * https://chromium.googlesource.com/chromium/src/+/abb56a627c8df0a636aa3e38dc53a19f54385c84
* Portal DOM trees...?
  * https://chromium.googlesource.com/chromium/src/+/f68204dd48934a91e6a55dc70250086e32f4a9ca
* Show live total memory usage
  * https://chromium.googlesource.com/chromium/src/+/ba10c2ffb4dade3219e1901f7745b4cfad01e3d6
* Show total number of JS VMs
  * https://chromium.googlesource.com/chromium/src/+/a9acb82a157b6d7ce2bc1e1e86d7030cef26fcd7
* LH 4.3
* Show SW registration port number
  * https://chromium.googlesource.com/chromium/src/+/e4b54059b6125160c6d4610613f2a4186206d020
* Background services
  * https://chromium.googlesource.com/chromium/src/+/02f9355868bfe89308cb4b5ba514d3c4f739e402
* HAR import / export buttons
  * https://chromium.googlesource.com/chromium/src/+/0838c1708d660351920652e5937d1458a80b1a61
* CSS name/value autocomplete
  * https://chromium.googlesource.com/chromium/src/+/322fcbbe1988aa6553415625ccf315426db925af
  * type `italic` and it auto-completes to `font-style: italic`
  * `bold` => `font-weight: bold`
  * 

## Feedback {: #feedback }

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File definite bug reports and feature requests at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss possible features, changes, and bugs on the [Mailing List][ML]{:.external}.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this document in the [Web Fundamentals][WF]{:.external} repository.

## Consider Canary {: #canary }

[canary]: https://www.google.com/chrome/browser/canary.html

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
