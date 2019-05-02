project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Logpoints, detailed tooltips in Inspect Mode, and much more.

{# wf_updated_on: 2019-01-21 #}
{# wf_published_on: 2019-01-22 #}
{# wf_tags: chrome73, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Logpoints, detailed tooltips in Inspect Mode, and much more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 73) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Here's what's new in DevTools in Chrome 73.

## Video version of these release notes {: #video }

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="uddZX9ZK6wY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Logpoints {: #logpoints }

Use Logpoints to log messages to the Console without cluttering up your code with `console.log()`
calls.

To add a logpoint:

1. Right-click the line number where you want to add the Logpoint.

     <figure>
       <img src="/web/updates/images/2019/01/add-logpoint.png"
            alt="Adding a Logpoint"/>
       <figcaption>
         <b>Figure 1</b>. Adding a Logpoint
       </figcaption>
     </figure>

1. Select **Add logpoint**. The **Breakpoint Editor** pops up.

     <figure>
       <img src="/web/updates/images/2019/01/breakpoint-editor.png"
            alt="The Breakpoint Editor"/>
       <figcaption>
         <b>Figure 2</b>. The Breakpoint Editor
       </figcaption>
     </figure>

1. In the **Breakpoint Editor**, enter the expression that you want to log to the Console.

     <figure>
       <img src="/web/updates/images/2019/01/logpoint-expression.png"
            alt="Typing the Logpoint expression"/>
       <figcaption>
         <b>Figure 3</b>. Typing the Logpoint expression
       </figcaption>
     </figure>

     <aside class="objective">
       <b>Tip!</b> When logging out a variable (e.g. <code>TodoApp</code>), wrap the variable in
       an object (e.g. <code>{TodoApp}</code>) to log out its name and value in the Console. See
       <a href="https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4#a4f3"
              class="external">Always Log Objects</a> and
       <a href=https://alligator.io/js/object-property-shorthand-es6/"
          class="external">Object Property Value Shorthand</a> to learn more about this
       syntax.
     </aside>

1. Press <kbd>Enter</kbd> or click outside of the **Breakpoint Editor** to save. The
   orange badge on top of the line number represents the Logpoint.

     <figure>
       <img src="/web/updates/images/2019/01/logpoint-badge.png"
            alt="An orange Logpoint badge on line 174"/>
       <figcaption>
         <b>Figure 4</b>. An orange Logpoint badge on line 174
       </figcaption>
     </figure>

The next time that the line executes, DevTools logs the result of the Logpoint expression to the Console.

<figure>
  <img src="/web/updates/images/2019/01/logpoint-result.png"
       alt="The result of the Logpoint expression in the Console"/>
  <figcaption>
    <b>Figure 5</b>. The result of the Logpoint expression in the Console
  </figcaption>
</figure>

See [Chromium issue #700519](https://crbug.com/700519){: .external } to report bugs or
suggest improvements.

## Detailed tooltips in Inspect Mode {: #inspect }

{# https://chromium.googlesource.com/chromium/src/+/78baa033b60f79de21d387ada6c92e166d7441d3 #}

When inspecting a node, DevTools now shows an expanded tooltip containing commonly important
information like font size, font color, contrast ratio, and box model dimensions.

<figure>
  <img src="/web/updates/images/2019/01/inspect.png"
       alt="Inspecting a node"/>
  <figcaption>
    <b>Figure 6</b>. Inspecting a node
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

## Export code coverage data {: #coverage }

{# https://chromium.googlesource.com/chromium/src/+/384dfbd0667873ec84d922bfc7b657045a66a524 #}

[CC]: /web/updates/2017/04/devtools-release-notes#coverage

[Code coverage][CC] data can now be exported as a JSON file. The JSON looks like this:

    [
      {
        "url": "https://wndt73.glitch.me/style.css",
        "ranges": [
          {
            "start": 0,
            "end": 21
          },
          {
            "start": 45,
            "end": 67
          }
        ],
        "text": "body { margin: 1em; } figure { padding: 0; } h1 { color: #317EFB; }"
      },
      ...
    ]

`url` is the URL of the CSS or JavaScript file that DevTools analyzed.
`ranges` describes the portions of the code that were used.
`start` is the starting offset for a range that was used.
`end` is the ending offset. `text` is the full text of the file.

In the example above, the range 0 to 21 corresponds to `body { margin: 1em; }` and the
range 45 to 67 corresponds to `h1 { color: #317EFB; }`. In other words, the first and
last rulesets were used and the middle one was not.

To analyze how much code is used on page load and export the data:

1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or 
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

     <figure>
       <img src="/web/updates/images/2019/01/command-menu.png"
            alt="The Command Menu"/>
       <figcaption>
         <b>Figure 7</b>. The Command Menu
       </figcaption>
     </figure>

1. Start typing `coverage`, select **Show Coverage** and then press <kbd>Enter</kbd>.

     <figure>
       <img src="/web/updates/images/2019/01/show-coverage.png"
            alt="Show Coverage"/>
       <figcaption>
         <b>Figure 8</b>. Show Coverage
       </figcaption>
     </figure>

    The **Coverage** tab opens.
 
    <figure>
      <img src="/web/updates/images/2019/01/coverage.png"
           alt="The Coverage tab"/>
      <figcaption>
        <b>Figure 9</b>. The Coverage tab
      </figcaption>
    </figure>

[reload]: /web/tools/chrome-devtools/images/shared/reload.png
[export]: /web/tools/chrome-devtools/images/shared/export.png

1. Click **Reload** ![Reload][reload]{: .inline-icon }. DevTools reloads the page and
   records how much code is used compared to how much is shipped.
1. Click **Export** ![Export][export]{: .inline-icon } to export the data as a JSON file.

[coverage]: https://pptr.dev/#?product=Puppeteer&version=v1.11.0&show=api-class-coverage

Code coverage is also available in Puppeteer, a browser automation tool maintained by
the DevTools team. See [Coverage][coverage]{: .external }.

See [Chromium issue #717195](https://crbug.com/717195){: .external } to report bugs or
suggest improvements.

<!--

## Bug fix for preserving tab order {: #order }

If you've installed a Chrome Extension that adds a tab to DevTools, you may have
noticed a bug where DevTools doesn't preserve your tab order. In other words,
after dragging the extension's tab to the left, closing DevTools, and then
re-opening DevTools, the extension's tab is back to its original position.
This bug is now fixed.

See [Chromium issue #771144](https://crbug.com/771144){: .external } to report bugs or
suggest improvements.

-->

## Navigate the Console with the keyboard {: #keyboard }

You can now use the keyboard to navigate the Console. Here's an example.

Pressing <kbd>Shift</kbd>+<kbd>Tab</kbd> focuses the last message (or result of an evaluated
expression). If the message contains links, the last link is highlighted first.
Pressing <kbd>Enter</kbd> opens the link in a new tab. Pressing the <kbd>Left</kbd> arrow
key highlights the entire message (see <b>Figure 13</b>).

<figure>
  <img src="/web/updates/images/2019/01/focus1.png"
       alt="Focusing a link"/>
  <figcaption>
    <b>Figure 11</b>. Focusing a link
  </figcaption>
</figure>

Pressing the <kbd>Up</kbd> arrow key focuses the next link.

<figure>
  <img src="/web/updates/images/2019/01/focus2.png"
       alt="Focusing another link"/>
  <figcaption>
    <b>Figure 12</b>. Focusing another link
  </figcaption>
</figure>

Pressing the <kbd>Up</kbd> arrow key again focuses the entire message.

<figure>
  <img src="/web/updates/images/2019/01/focus3.png"
       alt="Focusing an entire message"/>
  <figcaption>
    <b>Figure 13</b>. Focusing an entire message
  </figcaption>
</figure>

Pressing the <kbd>Right</kbd> arrow key expands a collapsed stack trace (or object, array,
and so on).

<figure>
  <img src="/web/updates/images/2019/01/focus4.png"
       alt="Expanding a collapsed stack trace"/>
  <figcaption>
    <b>Figure 14</b>. Expanding a collapsed stack trace
  </figcaption>
</figure>

Pressing the <kbd>Left</kbd> arrow key collapses an expanded message or result.

See [Chromium issue #865674](https://crbug.com/865674){: .external } to report bugs or
suggest improvements.

## AAA contrast ratio line in the Color Picker {: #AAA }

[AAA]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html
[WNDT65]: /web/updates/2018/01/devtools#contrast

The Color Picker now shows a second line to indicate which colors meet the [AAA contrast
ratio recommendation][AAA]{: .external }. The AA line has been there since Chrome 65.

<figure>
  <img src="/web/updates/images/2019/01/AAA.png"
       alt="The AA line (top) and AAA line (bottom)"/>
  <figcaption>
    <b>Figure 15</b>. The AA line (top) and AAA line (bottom)
  </figcaption>
</figure>

Colors between the 2 lines represent colors that meet the AA recommendation but do not
meet the AAA recommendation. When a color meets the AAA recommendation, anything on the
same side of that color also meets the recommendation. For example, in **Figure 15** anything
below the lower line is AAA, and anything above the upper line does not even meet the AA
recommendation.

<aside class="objective">
  <b>Tip!</b> In general, you can improve the readability of your pages by increasing the
  amount of text that meets the AAA recommendation. If meeting the AAA recommendation is not
  possible for some reason, try to at least meet the AA recommendation.
</aside>

See [Contrast ratio in the Color Picker][WNDT65] to learn how to access this feature.

See [Chromium issue #879856](https://crbug.com/879856){: .external } to report bugs or
suggest improvements.

## Save custom geolocation overrides {: #geolocation }

The Sensors tab now lets you save custom geolocation overrides.

1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or 
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu.

     <figure>
       <img src="/web/updates/images/2019/01/command-menu.png"
            alt="The Command Menu"/>
       <figcaption>
         <b>Figure 16</b>. The Command Menu
       </figcaption>
     </figure>

1. Type `sensors`, select **Show Sensors**, and press <kbd>Enter</kbd>. The **Sensors** tab
   opens.

     <figure>
       <img src="/web/updates/images/2019/01/sensors.png"
            alt="The Sensors tab"/>
       <figcaption>
         <b>Figure 17</b>. The Sensors tab
       </figcaption>
     </figure>

1. In the **Geolocation** section click **Manage**. **Settings** > **Geolocations** opens up.

     <figure>
       <img src="/web/updates/images/2019/01/geolocations.png"
            alt="The Geolocations tab in Settings"/>
       <figcaption>
         <b>Figure 18</b>. The Geolocations tab in Settings
       </figcaption>
     </figure>

1. Click **Add location**.
1. Enter a location name, latitude, and longitude, then click **Add**.

     <figure>
       <img src="/web/updates/images/2019/01/custom-geolocation.png"
            alt="Adding a custom geolocation"/>
       <figcaption>
         <b>Figure 19</b>. Adding a custom geolocation
       </figcaption>
     </figure>

See [Chromium issue #649657](https://crbug.com/649657){: .external } to report bugs or
suggest improvements.

## Code folding {: #folding }

{# https://chromium.googlesource.com/chromium/src/+/9e5bce11314b18020acc24e078f2ccc723be3867 #}

The **Sources** and **Network** panels now support code folding.

<figure>
  <img src="/web/updates/images/2019/01/folding.png"
       alt="Lines 54 to 65 have been folded"/>
  <figcaption>
    <b>Figure 20</b>. Lines 54 to 65 have been folded
  </figcaption>
</figure>

To enable code folding:

1. Press <kbd>F1</kbd> to open **Settings**.
1. Under **Settings** > **Preferences** > **Sources** enable **Code folding**.

To fold a block of code:

1. Hover your mouse over the line number where the block starts.

[fold]: /web/updates/images/2019/01/fold.png

1. Click **Fold** ![Fold][fold]{: .inline-icon }.

See [Chromium issue #328431](https://crbug.com/328431){: .external } to report bugs or
suggest improvements.

## Messages tab {: #messages }

The **Frames** tab has been renamed to the **Messages** tab. This tab is only available
in the **Network** panel when inspecting a web socket connection.

<figure>
  <img src="/web/updates/images/2019/01/messages.png"
       alt="The Messages tab"/>
  <figcaption>
    <b>Figure 21</b>. The Messages tab
  </figcaption>
</figure>

See [Chromium issue #802182](https://crbug.com/802182){: .external } to report bugs or
suggest improvements.

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
