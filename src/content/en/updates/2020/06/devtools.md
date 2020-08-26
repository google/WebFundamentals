project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Style editing for CSS-in-JS frameworks, Lighthouse 6.0, new JavaScript features, and more.

{# wf_updated_on: 2020-08-26 #}
{# wf_published_on: 2020-07-01 #}
{# wf_tags: chrome85, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Style editing for CSS-in-JS frameworks, Lighthouse 6.0, new JavaScript features, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 85) {: .page-title }

{% include "web/_shared/contributors/jecelynyeen.html" %}

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="NOal2gTzftI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Style editing for CSS-in-JS frameworks {: #css-in-js }

[cssom]: https://drafts.csswg.org/cssom/
[shadowdom]: /web/fundamentals/web-components/shadowdom

The Styles pane now has better support for editing styles that were created with the
[CSS Object Model][cssom] (CSSOM) APIs. Many CSS-in-JS frameworks and libraries
use the CSSOM APIs under the hood to construct styles.

You can also edit styles added in JavaScript using [Constructable Stylesheets](/web/updates/2019/02/constructable-stylesheets) now. Constructable Stylesheets are a new way to create and distribute reusable styles when using [Shadow DOM][shadowdom].

For example, the `h1` styles added with `CSSStyleSheet` (CSSOM APIs) are not editable previously. There are editable now in the Styles pane:

<video autoplay loop muted playsinline>
  <source src="/web/updates/images/2020/06/css-in-js.mp4" type="video/mp4">
</video>

{# https://chromium.googlesource.com/chromium/src.git/+/4609670fb4303585928d9784840459f04ca91f03 #}

Chromium issue [#946975](https://crbug.com/946975)

## Lighthouse 6 in the Lighthouse panel {: #lighthouse }

[changelog]: https://github.com/GoogleChrome/lighthouse/releases/tag/v6.0.0

The Lighthouse panel is now running Lighthouse 6.
Check out [What's New in Lighthouse 6.0](https://web.dev/lighthouse-whats-new-6.0/) for a summary of all the major
changes, or the [v6.0.0 release notes](https://github.com/GoogleChrome/lighthouse/releases/tag/v6.0.0)
for a full list of all changes.

Lighthouse 6.0 introduces three new metrics to the report: Largest Contentful
Paint (LCP), Cumulative Layout Shift (CLS), and Total Blocking Time (TBT). 
LCP and CLS are 2 of Google's new [Core Web Vitals](https://web.dev/vitals/#core-web-vitals),
and TBT is a lab measurement proxy for another Core Web Vital, First Input Delay.

The performance score formula has also been reweighted to better reflect the users’
loading experience.

![New performance metrics in Lighthouse 6.0](/web/updates/images/2020/06/lighthouse.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/67aa7a28ddd7140a03bf6fe16979fc2e040276c1 #}

Chromium issue [#772558](https://crbug.com/772558)

### First Meaningful Paint (FMP) deprecation {: #fmp-deprecation }

[lcp]: https://web.dev/lcp/
[fmp]: https://web.dev/first-meaningful-paint/

First Meaningful Paint (FMP) is deprecated in Lighthouse 6.0. It has also been removed from the Performance panel. [Largest Contentful Paint][lcp] is the recommended replacement for FMP. See [First Meaningful Paint][fmp] for an explanation of why it was deprecated.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cac292283bfa951d65a870b5a46136eff3963d0c #}

Chromium issue [#1096008](https://crbug.com/1096008)

## Support for new JavaScript features {: #javascript }

DevTools now has better support for some of the latest JavaScript language features:

* [Optional chaining](https://v8.dev/features/optional-chaining) syntax autocompletion - property auto-completion in the Console now supports optional chaining syntax, e.g. `name?.` now works in addition to `name.` and `name[`.
* Syntax highlighting for [private fields](https://v8.dev/features/class-fields#private-class-fields) - private class fields are now properly syntax-highlighted and pretty-printed in the Sources panel.
* Syntax highlighting for [Nullish coalescing operator](https://v8.dev/features/nullish-coalescing) - DevTools now properly pretty-prints the nullish coalescing operator in the Sources panel.

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/80ef20871d541f5e6d789ac2679e1ecd0b2e8328 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b674ea36ab2fab389e7bc57b6651f1103c0f78d0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/85ae1392c509c2ea37c89b386c0123350ea53855 #}

Chromium issues [#1083214](https://crbug.com/1083214), [#1073903](https://crbug.com/1073903), [#1083797](https://crbug.com/1083797)


## New app shortcut warnings in the Manifest pane {: #app-shortcut-warnings }

[shortcuts]: https://web.dev/app-shortcuts

[App shortcuts][shortcuts] help users quickly start common or recommended tasks within a web app. 

The Manifest pane now shows warnings if:

* the app shortcut icons are smaller than 96x96 pixels
* the app shortcut icons and manifest icons are not square (as they will be ignored)

![App shortcut warnings](/web/updates/images/2020/06/app-shortcut-warnings.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a6d1c0a60fe51c52b0eea46ee658e6a198f814c #}

Chromium issue [#955497](https://crbug.com/955497)


## Service worker `respondWith` events in the Timing tab {: #timing-tab }

The Timing tab of the Network panel now includes service worker `respondWith` events.
`respondWith` is the time immediately before the service worker `fetch` event handler runs to the time when the `fetch` handler's `respondWith` promise is settled. 

![service worker `respondWith`](/web/updates/images/2020/06/timing-tab.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/88bc40da7991671a52a76c91ac9a67e91839e21c #}

Chromium issue [#1066579](https://crbug.com/1066579)


## Consistent display of the Computed pane {: #computed-pane }

The Computed pane in the Elements panel now displays consistently as a pane across all viewport sizes. Previously the Computed pane would merge inside the Styles pane when the width of the DevTools' viewport was narrow. 

<video autoplay loop muted playsinline>
  <source src="/web/updates/images/2020/06/computed-pane.mp4" type="video/mp4">
</video>

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b38e248bc279ca0747dd64380fb6934bbb26e62 #}

Chromium issue [#1073899](https://crbug.com/1073899)

## Bytecode offsets for WebAssembly files {: #wasm }

DevTools now uses bytecode offsets for displaying line numbers of Wasm disassembly. 
This makes it clearer that you're looking at binary data, and is more consistent with how the Wasm runtime references locations.

![Bytecode offsets](/web/updates/images/2020/06/bytecode-offset.png)

Chromium issue [#1071432](https://crbug.com/1071432)

## Line-wise copy and cut in Sources Panel {: #sources-panel }

[sources]: https://developers.google.com/web/tools/chrome-devtools/sources#edit

When performing copy or cut with no selection in the [Sources panel editor][sources], DevTools
will copy or cut the current line content. For example, in the video below,
the cursor is at the end of line 1. After pressing the cut keyboard shortcut, the
entire line is copied to the clipboard and deleted.

<video autoplay loop muted playsinline>
  <source src="/web/updates/images/2020/06/line-wise-cut.mp4" type="video/mp4">
</video>

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/05d110464566dabd3b90e8123d3d2e33aebc9434 #}

Chromium issue [#800028](https://crbug.com/800028)


## Console Settings updates {: #console-settings }

### Ungroup same console messages {: #ungroup-messages }

The **Group similar** toggle in Console Settings now applies to duplicate messages.
Previously it just applied to similar messages.

For example, previously, DevTools did not ungroup the messages `hello` even though
**Group similar** is unchecked. Now, the `hello` messages are ungrouped:

<video autoplay loop muted playsinline>
  <source src="/web/updates/images/2020/06/ungroup-similar.mp4" type="video/mp4">
</video>

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c84588184b0074cd229ae4dc496e2f11b92dc340 #}

Chromium issue [#1082963](https://crbug.com/1082963)

### Persisting **Selected context only** settings {: #selected-context }

The **Selected context only** settings in Console Settings is now persisted.
Previously the settings were reset every time you closed and reopened DevTools.
This change makes the setting behavior consistent with other Console Settings options.

![Selected context only](/web/updates/images/2020/06/selected-context.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c3989432b058d853ab9183354a93bca73427f12%5E%21/#F0 #}

Chromium issue [#1055875](https://crbug.com/1055875)

## Performance panel updates {: #perf-panel }

### JavaScript compilation cache information in Performance panel {:js-compilation-cache}
[JavaScript compilation cache information](https://v8.dev/blog/code-caching-for-devs) is now always displayed in the Summary tab of the Performance panel. Previously, DevTools wouldn’t show anything related to code caching if code caching didn’t happen.

![JavaScript compilation cache information](/web/updates/images/2020/06/js-compilation-cache.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bff241dc95433dccd0621c81d93aae793d46a48e #}

Chromium issue [#912581](https://crbug.com/912581)

### Navigation timing alignment in the Performance panel {:nav-timing}
The Performance panel used to show times in the rulers based on when the recording started. This has now changed for recordings where the user navigates, where DevTools now shows ruler times relative to the navigation instead.

![Align navigation timing in Performance panel](/web/updates/images/2020/06/nav-timing.png)

We've also updated times for `DOMContentLoaded`, First Paint, First Contentful Paint, and Largest Contentful Paint events to be relative to the start of the navigation, which means they match the timings reported by `PerformanceObserver`.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ead457578785b3efe6ba2f4bf7bd4b94a5936d9d #}

Chromium issue [#974550](https://crbug.com/974550)

## New icons for breakpoints, conditional breakpoints, and logpoints {: #breakpoints }
The **Sources** panel has new designs for breakpoints, conditional breakpoints, and logpoints. Breakpoints get a refreshed flag design with brighter and friendlier colors. Icons are added to differentiate conditional breakpoints and logpoints. 

![Breakpoints](/web/updates/images/2020/06/breakpoints.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/464172eeb4925056c541876785ab56295aa29e6b #}

Chromium issue [#1041830](https://crbug.com/1041830)

<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
