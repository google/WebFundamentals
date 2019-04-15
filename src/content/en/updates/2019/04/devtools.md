project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2019-04-19 #}
{# wf_tags: chrome75, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 75) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Meaningful preset values when autocompleting CSS functions {: #presets }

https://crbug.com/931145

* [preset CSS autocomplete values](https://chromium.googlesource.com/chromium/src/+/beaedbdb329d74e1d1b9a0166508e0a3f7f632f5)

## Clear site data from the Command Menu {: #clear }

https://crbug.com/942503

* [clear site data in command menu](https://chromium.googlesource.com/chromium/src/+/37992194975b33cb4c09fa512591f3b7cf06b8b2)

## IndexedDB {: #indexeddb }

https://crbug.com/943770

* [show all indexeddb databases](https://chromium.googlesource.com/chromium/src/+/198fb2cf9272b63c1f7e34d4dc5d292232c6dcb1)

## View a resource's uncompressed size on hover {: #uncompressed }

https://crbug.com/805429

* [size column tooltip](https://chromium.googlesource.com/chromium/src/+/07e1ebde979461823f0b23f2247621ee0d1c9414)

## Resource counts in the storage panes {: #counts }

* [show number of entries in indexeddb store](https://chromium.googlesource.com/chromium/src/+/daaeb82ec89cec76961a1d69a21f405fb08d0220)
* [indexeddb object store counts](https://chromium.googlesource.com/chromium/src/+/aba304658ae165a66c0f09756e92d7941818c474)
* [cache storage counter](https://chromium.googlesource.com/chromium/src/+/45237b838f0aaf393967a9a8b46d83bbee20851b)

## Inline breakpoints in the breakpoint pane {: #inline }

Suppose that you add a [line-of-code breakpoint](/web/tools/chrome-devtools/javascript/breakpoints#loc) to the following
line of code:

    document.querySelector('button').click();

For a while now DevTools has enabled you to specify when exactly it should pause on a breakpoint like this: at the
beginning of the line, before `document.querySelector('button')` is called, or before `click()` is called. If you enable
all 3, you're essentially creating 3 breakpoints. Previously the **Breakpoints** pane did not give you the ability to
manage these 3 breakpoints individually.

As of Chrome 75 each inline breakpoint gets its own entry in the **Breakpoints** pane.

* [inline breakpoinst get their own column](https://chromium.googlesource.com/chromium/src/+/43005f59158e79ce01f4bfa77ea52b9732fc7a4d)

## Setting for disabling the detailed inspect tooltip {: #inspect }

[inspect]: /web/updates/2019/01/devtools#inspect

Chrome 73 introduced [detailed tooltips when in Inspect mode][inspect].

You can now disable these detailed tooltips from **Settings** > **Preferences** > **Elements** > **Show Detailed Inspect Tooltip**.

* [setting to disable inspect tooltip](https://chromium.googlesource.com/chromium/src/+/47e5d9a0f8f988e4d11d27a21dbf4c0414795f25)

## Setting for toggling tab indentation in the Sources panel editor {: #tab }

[editor]: /web/tools/chrome-devtools/sources#edit

Accessibility testing revealed that there was a tab trap in the [**Editor**][editor]. Once a keyboard user tabbed
into the **Editor**, they had no way to tab out of it because the <kbd>Tab</kbd> key was used for indentation.
To override the default behavior and use <kbd>Tab</kbd> to move focus, enable **Settings** > **Preferences** >
**Sources** > **Enable Tab Moves Focus**.

* [toggle tab indentation](https://chromium.googlesource.com/chromium/src/+/27ff38b767bc1659a596830b864acf60850e6bd0)

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
