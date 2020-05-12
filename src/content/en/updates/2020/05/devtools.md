project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2020-05-12 #}
{# wf_published_on: 2020-05-11 #}
{# wf_tags: chrome84, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 84) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Fix site issues with the new Issues tab {: #issues }

The new **Issues** tab in the Drawer was built to help reduce the notification 
fatigue and clutter of the **Console**. Currently, the Console is the central
place for website developers, libraries, frameworks, and Chrome itself to log
messages, warnings, and errors. The Issues tab structures and aggregates all of
these messages into a more actionable format.

{# TODO(kayce): Link to Sam's doc. #}

![The Issues tab.](/web/updates/images/2020/05/issues.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/39aac148144c5464a67e9013f3c218f6ea65dfdf #}

Chromium Bug: [#1068116](https://crbug.com/1068116)

## View accessibility information in the Inspect Mode tooltip {: #a11y }

The [Inspect Mode tooltip](/web/updates/2019/01/devtools#inspect) now
indicates whether the element has an accessible
[name and role](https://web.dev/labels-and-text-alternatives/)
and is [keyboard focusable](https://web.dev/control-focus-with-tabindex/).

![The Inspect Mode tooltip with accessibility information.](/web/updates/images/2020/05/a11y.jpg)

{# https://chromium.googlesource.com/chromium/src.git/+/380171a4329fdf8377c1454635e8495b02750442 #}

Chromium Bug: [#1040025](https://crbug.com/1040025)

## Performance panel updates {: #performance }

### View Total Blocking Time (TBT) information in the footer {: #tbt }

After recording your load performance, the Performance panel now shows
[Total Blocking Time](https://web.dev/tbt/) (TBT) information in the footer.
TBT is a load performance metric that helps quantify how long it takes a page
to become usable. It essentially measures how long a page *appears* to be usable
(because its content has been rendered to the screen) but *isn't actually usable*
because JavaScript is blocking the main thread and therefore the page can't respond
to user input. TBT is the main [lab metric](https://web.dev/how-to-measure-speed/#lab-data-vs-field-data)
for approximating First Input Delay, which is one of Google's new
[Core Web Vitals](https://web.dev/vitals/#core-web-vitals).

![Total Blocking Time information in the footer of a Performance panel recording.](/web/updates/images/2020/05/tbt.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a0c450d5b58f71b67134306b2e1c29a75326d3db #}

Chromium Bug: [#1054381](https://crbug.com/1054381)

<!--

### Cumulative Layout Shift (CLS) movement records {: #cls }

{# TODO(kayce): Get a working screenshot of the UI. }

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f130314cc50ccd2c933017ee9bb06eefd68ed206 #}

-->

## More accurate promise terminology in the Console {: #promises }

When logging a `Promise` the Console used to incorrectly describe the state of the `Promise`
as `resolved`:

![An example of the Console using the old "resolved" terminology.](/web/updates/images/2020/05/resolved.png)

The Console now uses the term `fulfilled`, which aligns with the `Promise` spec:

![An example of the Console using the new "fulfilled" terminology.](/web/updates/images/2020/05/fulfilled.jpg)

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/2141673 #}

V8 Bug: [#6751](https://bugs.chromium.org/p/v8/issues/detail?id=6751)

## Styles pane updates {: #styles }

### Support for the `revert` keyword {: #revert }

[revert]: https://developer.mozilla.org/en-US/docs/Web/CSS/revert
[revert-bcd]: https://developer.mozilla.org/en-US/docs/Web/CSS/revert#Browser_compatibility

The Styles pane's autocomplete UI now detects the [`revert`][revert] CSS keyword, which
reverts the cascaded value of a property to what the value would have been if no changes
had been made to the element's styling.

![Setting the value of a property to `revert`](/web/updates/images/2020/05/revert.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/811c6e98ee25baf3f6f5a6145e1896fbe4362d7a #}

Chromium Bug: [#1075437](https://crbug.com/1075437)

### Image previews {: #image-previews }

Hover over a `background-image` value in the Styles pane to see a preview of
the image in a tooltip.

![Hovering over a `background-image` value](/web/updates/images/2020/05/image-preview.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1ebbb30be21f07d6a4d3ccd3b8dc7bd0dd37b41d #}

Chromium Bug: [#1040019](https://crbug.com/1040019)

### Color Picker now uses space-separated functional color notation {: #color }

[CSS Color Module Level 4](https://drafts.csswg.org/css-color/#changes-from-3)
specifies that color functions like `rgb()` should support space-separated
arguments. For example, `rgb(0, 0, 0)` is equivalent to `rbg(0 0 0)`.

When you choose color with the [Color Picker](/web/tools/chrome-devtools/css/reference#color-picker)
or alternate between color representations in the Styles pane by holding <kbd>Shift</kbd> and then
clicking the color value, you'll now see the space-separated argument syntax.

![Using space-separated arguments in the Styles pane](/web/updates/images/2020/05/color.jpg)

DevTools is using the new syntax because [upcoming CSS features like `color() do not
support the deprecated comma-separated argument syntax](https://twitter.com/mathias/status/1253242715304857601).

The space-separated argument syntax has been supported in most browsers for a while. 
See the **Space-separated functional color notations** entry in MDN's
[Browser compatibility](https://caniuse.com/#feat=mdn-css_types_color_space_separated_functional_notation)
table.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e858e4aa92e7b4f31de0d4eaccadba512bdc3c36 #}

Chromium Bug: [#1072952](https://crbug.com/1072952)

## Deprecation of the **Properties** pane in the Elements panel {: #properties }

The **Properties** pane in the **Elements** panel has been deprecated.
Run `console.dir($0)` in the **Console** instead.

![The Properties pane](/web/updates/images/2020/05/properties.jpg)

References:

* [`console.dir()`](/web/tools/chrome-devtools/console/api#dir)
* [`$0`](/web/tools/chrome-devtools/console/utilities#dom)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5f6928b9570ed35c4a0b4c1de9b0d1f62370c636 #}

<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
