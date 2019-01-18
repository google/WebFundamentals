project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO

{# wf_updated_on: 2019-01-17 #}
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

## Logpoints {: #logpoints }

Use Logpoints to log messages to the Console without cluttering up your code with `console.*`
calls.

1. Open a file containing JavaScript in the **Sources** panel.

     <aside class="objective">
       <b>Tip!</b> To open files quickly from any panel, press <kbd>Control</kbd>+<kbd>P</kbd>
       or <kbd>Command</kbd>+<kbd>P</kbd> (Mac).
     </aside>

1. Right-click the line number where you want to add the Logpoint.

     <figure>
       <img src="/web/updates/images/2019/01/add-logpoint.png"
            alt="Adding a Logpoint"/>
       <figcaption>
         <b>Figure X</b>. Adding a Logpoint
       </figcaption>
     </figure>

1. Select **Add logpoint**. The **Breakpoint Editor** pops up.

     <figure>
       <img src="/web/updates/images/2019/01/breakpoint-editor.png"
            alt="The Breakpoint Editor"/>
       <figcaption>
         <b>Figure X</b>. The Breakpoint Editor
       </figcaption>
     </figure>

1. In the **Breakpoint Editor**, enter the expression that you want to log to the Console.

     <figure>
       <img src="/web/updates/images/2019/01/logpoint-expression.png"
            alt="Typing the Logpoint expression"/>
       <figcaption>
         <b>Figure X</b>. Typing the Logpoint expression
       </figcaption>
     </figure>

     <aside class="objective">
       <b>Tip!</b> When logging out a variable like `TodoApp`, wrap the variable in
       an object (`{TodoApp}`) to log out its name and value in the Console. TODO
     </aside>

1. Press <kbd>Enter</kbd> or click outside of the **Breakpoint Editor** to save. The
   orange badge on top of the line number represents the Logpoint.

     <figure>
       <img src="/web/updates/images/2019/01/logpoint-badge.png"
            alt="An orange Logpoint badge on line 174"/>
       <figcaption>
         <b>Figure X</b>. An orange Logpoint badge on line 174
       </figcaption>
     </figure>

The next time that the line executes, DevTools logs the result of the Logpoint expression to the Console.

<figure>
  <img src="/web/updates/images/2019/01/logpoint-result.png"
       alt="The result of the Logpoint expression in the Console"/>
  <figcaption>
    <b>Figure X</b>. The result of the Logpoint expression in the Console
  </figcaption>
</figure>

[Chromium issue for this feature](https://crbug.com/700519){: .external }

## Styles properties in Inspect Mode {: #inspect }

{# https://chromium.googlesource.com/chromium/src/+/78baa033b60f79de21d387ada6c92e166d7441d3 #}

When inspecting a node, DevTools now shows an expanded tooltip containing commonly important style
properties like font, margin, and padding.

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
       <b>Tip!</b> Hover over <b>Inspect</b>
       <img src="/web/tools/chrome-devtools/images/shared/inspect.png" class="inline-icon"
            alt="Inspect"/> to see its keyboard shortcut.
     </aside>

1. In your viewport, hover over the node.

## Code folding {: #folding }

{# https://chromium.googlesource.com/chromium/src/+/9e5bce11314b18020acc24e078f2ccc723be3867 #}

The **Sources** and **Network** panels now support code folding.

<figure>
  <img src="/web/updates/images/2019/01/folding.png"
       alt="Lines 54 to 65 have been folded"/>
  <figcaption>
    <b>Figure X</b>. Lines 54 to 65 have been folded
  </figcaption>
</figure>

To enable code folding:

1. Press <kbd>F1</kbd> to open **Settings**.
1. Under **Settings** > **Preferences** > **Sources** enable **Code folding**.

To fold a block of code:

1. Hover your mouse over the line number where the block starts.

[fold]: /web/updates/images/2019/01/fold.png

1. Click **Fold** ![Fold][fold]{: .inline-icon }.

[Chromium issue for this feature](https://crbug.com/328431){: .external }

## Export code coverage data {: #coverage }

{# https://chromium.googlesource.com/chromium/src/+/384dfbd0667873ec84d922bfc7b657045a66a524 #}

Code coverage data can now be exported as a JSON file. 

    [
      {
        "url": "https://example.com/styles.css",
        "ranges": [
          {
            "start": 0,
            "end": 18
          },
          {
            "start": 43,
            "end": 66
          }
        ],
        "text": "body { margin: 0; } figure { padding: 0; } p { color: chartreuse; }"
      },
      ...
    ]

`url` is the URL of the CSS or JavaScript file that DevTools analyzed.
`ranges` describes the the portions of the code that were executed.
`start` is the starting offset for a range that was executed.
`end` is the ending offset.
`text` is the full text of the file.

[Chromium issue for this feature](https://crbug.com/717195){: .external }

<!--

## Bug fix for preserving tab order {: #order }

If you've installed a Chrome Extension that adds a tab to DevTools, you may have
noticed a bug where DevTools doesn't preserve your tab order. In other words,
after dragging the extension's tab to the left, closing DevTools, and then
re-opening DevTools, the extension's tab is back to its original position.
This bug is now fixed.

[Chromium issue for this bug fix](https://crbug.com/771144){: .external }

-->

## Console keyboard navigation {: #keyboard }

You can now use the keyboard to inspect previous Console messages.

To navigate Console messages with your keyboard:

1. Run some JavaScript in the Console, or log some messages.
1. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> to focus the last evaluated result.

Use the arrow keys to navigate:

* Press the <kbd>Up</kbd> arrow to select the next result above.
* Press the <kbd>Down</kbd> arrow to select the next result below.
* Press the <kbd>Right</kbd> arrow to expand a result, such as an object.
* Press the <kbd>Left</kbd> arrow to collapse a result. 

[Chromium issue for this feature](https://crbug.com/865674){: .external }

## AAA contrast ratio line in the Color Picker {: #AAA }

[AAA]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html
[WNDT65]: /web/updates/2018/01/devtools#contrast

The Color Picker now shows a second line to indicate which colors meet the [AAA contrast
ratio recommendation][AAA]{: .external }. The AA line was added in Chrome 65.

<figure>
  <img src="/web/updates/images/2019/01/AAA.png"
       alt="The AA line (top) and AAA line (bottom)"/>
  <figcaption>
    <b>Figure X</b>. The AA line (top) and AAA line (bottom)
  </figcaption>
</figure>

Colors between the 2 lines represent colors that meet the AA recommendation but do not
meet the AAA recommendation.

See [Contrast ratio in the Color Picker][WNDT65] to learn how to access this feature.

[Chromium issue for this feature](https://crbug.com/879856){: .external }

## Save custom geolocation overrides {: #geolocation }

The Sensors tab now lets you save custom geolocation overrides.

1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or 
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

     <figure>
       <img src="/web/updates/images/2019/01/command-menu.png"
            alt="The Command Menu"/>
       <figcaption>
         <b>Figure X</b>. The Command Menu
       </figcaption>
     </figure>

1. Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab
   opens.

     <figure>
       <img src="/web/updates/images/2019/01/sensors.png"
            alt="The Sensors tab"/>
       <figcaption>
         <b>Figure X</b>. The Sensors tab
       </figcaption>
     </figure>

1. In the **Geolocation** section click **Manage**. **Settings** > **Geolocations** opens up.

     <figure>
       <img src="/web/updates/images/2019/01/geolocations.png"
            alt="The Geolocations tab in Settings"/>
       <figcaption>
         <b>Figure X</b>. The Geolocations tab in Settings
       </figcaption>
     </figure>

1. Click **Add location**.
1. Enter a location name, latitude, and longitude, then click **Add**.

     <figure>
       <img src="/web/updates/images/2019/01/custom-geolocation.png"
            alt="Adding a custom geolocation"/>
       <figcaption>
         <b>Figure X</b>. Adding a custom geolocation
       </figcaption>
     </figure>

[Chromium issue for this feature](https://crbug.com/649657){: .external }

## Messages tab {: #messages }

The **Frames** tab has been renamed to the **Messages** tab. This tab is only available
in the **Network** panel when inspecting a web socket connection.

<figure>
  <img src="/web/updates/images/2019/01/messages.png"
       alt="The Messages tab"/>
  <figcaption>
    <b>Figure X</b>. The Messages tab
  </figcaption>
</figure>

[Chromium issue for this feature](https://crbug.com/802182){: .external }

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
