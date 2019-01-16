project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-01-16 #}
{# wf_published_on: 2019-01-16 #}
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

Use Logpoints to log messages to the Console without cluttering up your code with `console.*`
calls.

[Chromium issue for this feature](https://crbug.com/700519){: .external }

## Styles properties in Inspect Mode {: #inspect }

{# https://chromium.googlesource.com/chromium/src/+/78baa033b60f79de21d387ada6c92e166d7441d3 #}

When inspecting a node, DevTools now shows commonly important style properties like color,
font, margin, and padding.

<figure>
  <img src="/web/updates/images/2019/01/inspect.png"
       alt="Inspecting a node"/>
  <figcaption>
    <b>Figure X</b>. Inspecting a node
  </figcaption>
</figure>

To inspect a node:

[inspect]: /web/tools/chrome-devtools/images/shared/inspect.png

1. Click **Inspect** ![Inspect][inspect]{: .inline-icon }.

     <aside class="objective">
       <b>Tip!</b> Hover over <b>Inspect</b> to see its keyboard shortcut.
     </aside>

1. In your viewport, hover over the node.

## Code folding

{# https://chromium.googlesource.com/chromium/src/+/9e5bce11314b18020acc24e078f2ccc723be3867 #}

The **Sources** panel now supports code folding.

[Chromium issue for this feature](https://crbug.com/328431){: .external }

## Export code coverage data

https://chromium.googlesource.com/chromium/src/+/384dfbd0667873ec84d922bfc7b657045a66a524

## Preserved tab order

https://bugs.chromium.org/p/chromium/issues/detail?id=771144

## Console keyboard navigation

https://chromium.googlesource.com/chromium/src/+/48789ec6e4da515fdeda4ec1c3d569a06466790c
https://bugs.chromium.org/p/chromium/issues/detail?id=865674

## New audit

https://chromium.googlesource.com/chromium/src/+/5a003efcc60d91c76003893a4e29d413fb9ffeda
https://github.com/googlechrome/lighthouse/pull/6397

## Save custom geolocation overrides {: #geolocation }

The Sensors tab now lets you save custom geolocation overrides.

1. Press <kbd>Escape</kbd> to open the Drawer.
1. Click **More Tabs** ![TODO](TODO){: .inline-icon } and select **Sensors**.
1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

https://chromium.googlesource.com/chromium/src/+/90c853aae4b8e1e538f6b486f0a0a30fa1c655dc

## AAA contrast ratio line in the Color Picker {: #AAA }

[contrast]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html

The Color Picker now shows a line for colors that satisfy the AAA contrast ratio
recommendation. See [Contrast (Enhanced)][contrast]{: .external }.

https://chromium.googlesource.com/chromium/src/+/06c91da2e7454048cbe91e46685e9965b201d928

## Messages tab {: #messages }

The **Frames** tab has been renamed to the **Messages** tab.

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
