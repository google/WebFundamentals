project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-12-05 #}
{# wf_published_on: 2019-12-05 #}
{# wf_tags: chrome80, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 80) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Resume: https://chromium.googlesource.com/devtools/devtools-frontend/+log?s=fd90361fadb2f8127747016563672b2f3f5f9955

## WebAssembly {: #webassembly }

This cl adds Ctrl+G and F3 as keyboard shortcuts
for windows and linux to find the next occurrence
while a search is open (not necessarily focused).
The default behaviour of Ctrl+G opening the goto
line popup still works as long as the search is not
opened.

What's Mac?

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/chromium/src/+/40294377601150bd8c37ee375a6cfcdbd01b9630 #}

Chromium issue [#887586](https://crbug.com/887586)

https://docs.google.com/document/d/1Kn4TwTQ9XxPhhAClEMg-qvMtuh7ZcHP4eS27xUCmbQM/edit?ts=5dde8a56

## Highlight selected network request in Overview {: #overview }

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3c77a5937675b59056598afd236b22eaeedc679f #}

Chromium issue [#988253](https://crbug.com/988253)

## Keyboard-accessible Search {: #search }

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ebb539c3b295d72b5c570f604908d4c00e5a58ed #}

Chromium issue [#963183](https://crbug.com/963183)

## REPL {: #REPL }

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

https://chromium.googlesource.com/devtools/devtools-frontend/+log?s=c20eb36aa74460b2cd476e2ec4af675e66e62f00

https://chromium.googlesource.com/devtools/devtools-frontend/+/53a8548ce03957e7704ae88b780dfa019bf967e0

{# TODO #}

Chromium issue [#TODO](https://crbug.com/TODO)

## Find next {: #findnext }

This cl adds Ctrl+G and F3 as keyboard shortcuts
for windows and linux to find the next occurrence
while a search is open (not necessarily focused).
The default behaviour of Ctrl+G opening the goto
line popup still works as long as the search is not
opened.

What's Mac?

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/chromium/src/+/40294377601150bd8c37ee375a6cfcdbd01b9630 #}

Chromium issue [#887586](https://crbug.com/887586)

## Lighthouse 5.6 {: #lighthouse }

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/chromium/src/+/5f16f693662c78467b8ae531a3f03e37ccf94c69 #}

Chromium issue [#772558](https://crbug.com/772558)

## URL and path columns in Network panel {: #network }

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/chromium/src/+/923cd866fb089619bbbd971ff16cd7d766c1fb67 #}

Chromium issue [#993366](https://crbug.com/993366)

## Coverage on reload {: #coverage }

<figure>
  <img src="../../images/2019/12/TODO.png"
       alt="TODO"/>
  <figcaption>
    TODO
  </figcaption>
</figure>

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4a1e8c7288534a29a48a35d7cd6477d22e6555d2 #}

Chromium issue [#1004203](https://crbug.com/1004203)

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
