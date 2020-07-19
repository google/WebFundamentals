project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The new Issues tab, accessibility information in the Inspect Mode tooltip, and more.

{# wf_updated_on: 2020-05-19 #}
{# wf_published_on: 2020-05-12 #}
{# wf_tags: chrome84, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: The new Issues tab, accessibility information in the Inspect Mode tooltip, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 84) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Fix site issues with the new Issues tab {: #issues }

The new **Issues** tab in the Drawer aims to help reduce the notification 
fatigue and clutter of the **Console**. Currently, the Console is the central
place for website developers, libraries, frameworks, and Chrome itself to log
messages, warnings, and errors. The Issues tab presents warnings from the
browser in a structured, aggregated, and actionable way, links to affected resources
within DevTools, and provides guidance on how to fix the issues. Over time, more
and more of Chrome's warnings will be surfaced in the Issues tab rather than the Console,
which should help reduce the Console's clutter.

Check out [Find And Fix Problems With The Chrome DevTools Issues Tab](/web/tools/chrome-devtools/issues/)
to get started.

![The Issues tab.](/web/updates/images/2020/05/issues.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/39aac148144c5464a67e9013f3c218f6ea65dfdf #}

Chromium Bug: [#1068116](https://crbug.com/1068116)

## View accessibility information in the Inspect Mode tooltip {: #a11y }

The [Inspect Mode tooltip](/web/updates/2019/01/devtools#inspect) now
indicates whether the element has an accessible
[name and role](https://web.dev/labels-and-text-alternatives/)
and is [keyboard-focusable](https://web.dev/control-focus-with-tabindex/).

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
[Core Web Vitals][CWV].

To get Total Blocking Time information, **do not** use the **Reload Page**
![Reload Page](/web/tools/chrome-devtools/evaluate-performance/imgs/reload-page.png){: .inline-icon } 
workflow for recording page load performance. Instead, click **Record** 
![Record](/web/tools/chrome-devtools/evaluate-performance/imgs/record.png){: .inline-icon },
manually reload the page, wait for the page to load, and then stop recording.
If you see `Total Blocking Time: Unavailable` it means that DevTools did not get the
information it needs from Chrome's internal profiling data.

![Total Blocking Time information in the footer of a Performance panel recording.](/web/updates/images/2020/05/tbt.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a0c450d5b58f71b67134306b2e1c29a75326d3db #}

Chromium Bug: [#1054381](https://crbug.com/1054381)

### Layout Shift events in the new Experience section {: #cls }

The new **Experience** section of the Performance panel can help you detect
[layout shifts](https://web.dev/cls/). Cumulative Layout Shift (CLS) is a metric that can
help you quantify unwanted visual instability and is one of Google's new [Core Web Vitals][CWV].

Click a **Layout Shift** event to see the details of the layout shift in the **Summary** tab.
Hover over the **Moved from** and **Moved to** fields to visualize where the layout shift
occurred.

![The details of a layout shift.](/web/updates/images/2020/05/cls.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f130314cc50ccd2c933017ee9bb06eefd68ed206 #}

## More accurate promise terminology in the Console {: #promises }

When logging a `Promise` the Console used to incorrectly describe the state of the `Promise`
as `resolved`:

![An example of the Console using the old "resolved" terminology.](/web/updates/images/2020/05/resolved.jpg)

The Console now uses the term `fulfilled`, which [aligns with the `Promise` spec](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md):

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

![Setting the value of a property to revert.](/web/updates/images/2020/05/revert.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/811c6e98ee25baf3f6f5a6145e1896fbe4362d7a #}

{# https://chromestatus.com/metrics/feature/timeline/popularity/3252 #}

Chromium Bug: [#1075437](https://crbug.com/1075437)

### Image previews {: #image-previews }

Hover over a `background-image` value in the Styles pane to see a preview of
the image in a tooltip.

![Hovering over a background-image value.](/web/updates/images/2020/05/image-preview.jpg)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1ebbb30be21f07d6a4d3ccd3b8dc7bd0dd37b41d #}

Chromium Bug: [#1040019](https://crbug.com/1040019)

### Color Picker now uses space-separated functional color notation {: #color }

[CSS Color Module Level 4](https://drafts.csswg.org/css-color/#changes-from-3)
specifies that color functions like `rgb()` should support space-separated
arguments. For example, `rgb(0, 0, 0)` is equivalent to `rgb(0 0 0)`.

When you choose colors with the [Color Picker](/web/tools/chrome-devtools/css/reference#color-picker)
or alternate between color representations in the Styles pane by holding <kbd>Shift</kbd> and then
clicking the color value, you'll now see the space-separated argument syntax.

![Using space-separated arguments in the Styles pane.](/web/updates/images/2020/05/color.jpg)

You'll also see the syntax in the Computed pane and the Inspect Mode tooltip. 

DevTools is using the new syntax because [upcoming CSS features like `color()` do not
support the deprecated comma-separated argument syntax](https://twitter.com/mathias/status/1253242715304857601).

The space-separated argument syntax has been supported in most browsers for a while. 
See [Can I use Space-separated functional color notations?](https://caniuse.com/#feat=mdn-css_types_color_space_separated_functional_notation)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e858e4aa92e7b4f31de0d4eaccadba512bdc3c36 #}

Chromium Bug: [#1072952](https://crbug.com/1072952)

## Deprecation of the **Properties** pane in the Elements panel {: #properties }

The **Properties** pane in the **Elements** panel has been deprecated.
Run `console.dir($0)` in the **Console** instead.

![The deprecated Properties pane.](/web/updates/images/2020/05/properties.jpg)

References:

* [`console.dir()`](/web/tools/chrome-devtools/console/api#dir)
* [`$0`](/web/tools/chrome-devtools/console/utilities#dom)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5f6928b9570ed35c4a0b4c1de9b0d1f62370c636 #}


## App shortcuts support in the Manifest pane {: #app-shortcuts }

App shortcuts help users quickly start common or recommended tasks within a web
app. The app shortcuts menu is shown only for Progressive Web Apps that are
installed on the user's desktop or mobile device.

Check out [Get things done quickly with app
shortcuts](https://web.dev/app-shortcuts) to learn more.

![App shortcuts in the Manifest pane.](/web/updates/images/2020/05/app-shortcuts.png)

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9fee874360dbc0f891609a8aa1a9f8947b510253 #}

<<../../_shared/devtools-feedback.md>>

<<../../_shared/canary.md>>

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}

[CWV]: https://web.dev/vitals/#core-web-vitals
