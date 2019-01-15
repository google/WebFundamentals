project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-01-15 #}
{# wf_published_on: 2019-01-14 #}
{# wf_tags: chrome72, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 73) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: We'll publish the video version of this page in mid-March 2019.

Here's what's new in Chrome DevTools in Chrome 73:

* TODO

## Logpoints

https://chromium.googlesource.com/chromium/src/+/098da25c94fcb874ef01f853e7cb11f3759aabc8
https://bugs.chromium.org/p/chromium/issues/detail?id=700519

## Style properties in inspect mode

https://chromium.googlesource.com/chromium/src/+/78baa033b60f79de21d387ada6c92e166d7441d3

## Code folding

https://chromium.googlesource.com/chromium/src/+/9e5bce11314b18020acc24e078f2ccc723be3867

## Export code coverage data

https://chromium.googlesource.com/chromium/src/+/384dfbd0667873ec84d922bfc7b657045a66a524

### Breakpoint editor UI

https://chromium.googlesource.com/chromium/src/+/3a2d091d43212bce947b34c824813dc6fbeadb48

### Preserved tab order

https://bugs.chromium.org/p/chromium/issues/detail?id=771144

## Console keyboard navigation

https://chromium.googlesource.com/chromium/src/+/48789ec6e4da515fdeda4ec1c3d569a06466790c
https://bugs.chromium.org/p/chromium/issues/detail?id=865674

## `$0` and `$_` in autocomplete

https://chromium.googlesource.com/chromium/src/+/4861a63889bacf46e3724f57c3df98e99c4dad4e

## New audit

https://chromium.googlesource.com/chromium/src/+/5a003efcc60d91c76003893a4e29d413fb9ffeda
https://github.com/googlechrome/lighthouse/pull/6397

## Custom geolocation overrides

https://chromium.googlesource.com/chromium/src/+/90c853aae4b8e1e538f6b486f0a0a30fa1c655dc

## AA and AAA contrast ratio lines in the color picker

https://chromium.googlesource.com/chromium/src/+/06c91da2e7454048cbe91e46685e9965b201d928

## PWA installibilty warning in Manifest tab

https://chromium.googlesource.com/chromium/src/+/6c30be45d7e9bd4a1f896d2906af9ccc2eb867cf
https://bugs.chromium.org/p/chromium/issues/detail?id=901352

## Keep initial main page request

https://chromium.googlesource.com/chromium/src/+/d8b9212ada0fe3432a3078ba24c9ae297371097e
https://bugs.chromium.org/p/chromium/issues/detail?id=908592&desc=2

## Messages tab

https://chromium.googlesource.com/chromium/src/+/595fe3e4e2b1893fcbcd4469f3b86dfc328f8f98
https://bugs.chromium.org/p/chromium/issues/detail?id=802182

## Cache storage filter

https://chromium.googlesource.com/chromium/src/+/3c68e3a7bc37f6eeb338e7768735087ae469a329

## Feedback {: #feedback }

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File bug reports at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss features and changes on the [Mailing List][ML]{:.external}. Please don't use the mailing
  list for support questions. Use Stack Overflow, instead.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}. Please don't file bugs
  on Stack Overflow. Use Chromium Bugs, instead.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this doc in the [Web Fundamentals][WF]{:.external} repository.

## Consider Canary {: #canary }

[canary]: https://www.google.com/chrome/browser/canary.html

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
