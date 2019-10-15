project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-10-14 #}
{# wf_published_on: 2019-10-14 #}
{# wf_tags: chrome79, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 79) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Cookie updates {: #cookies }

### Blocked cookies {: #blockedcookies }

[Request headers](https://chromium.googlesource.com/chromium/src/+/f82c0c2418170ac32a9764550073bc3c95dce240),
[Cookies tab in Network panel](https://chromium.googlesource.com/chromium/src/+/4f13a2518b054a7e8d218aaf3213de2e1c74ea4e),
[Multiple explanations of blocked cookies](https://chromium.googlesource.com/chromium/src/+/8a8d484654bf7cba22df22a9dc072e49bcb73327)

[Chromium issue #856777](https://crbug.com/856777)

### Cookie value previews {: #cookiepreviews }

[Show values when selected](https://chromium.googlesource.com/chromium/src/+/2c327126ab78b37dfbcedee2a8a267d2a54dadfc)

## Initiator tab {: #initiator }

[Network request initiator stack trace](https://chromium.googlesource.com/chromium/src/+/0d0cae574b458c3d4bd7f6f254f74f6f2442b710)

## Emulate CSS media features

[prefers-color-scheme: dark](https://chromium.googlesource.com/chromium/src/+/9ca30329b8ee53b2462d72772dc189385b6e2a34)

## Code coverage

[More accessible colors](https://chromium.googlesource.com/chromium/src/+/71d06de626d5e15fae7534df8fe0bb1613838aa7)

[Filter box](https://chromium.googlesource.com/chromium/src/+/59cca2c8f5fcd709360d4ba111fd2a9fca4e78f7)

## CodeMirror indentation

[Sources panel and Console respect your indentation preferences again](https://chromium.googlesource.com/chromium/src/+/d3be8efb8e3700d72b6a75e1078b54e2b17e8c15)

## Emacs shortcuts

[Go to line above or below](https://chromium.googlesource.com/chromium/src/+/0cba9023f762656df94d07f8afc1bc94bf3840f2)

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
