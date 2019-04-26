project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The latest update for changes to the Chrome DevTools.

{# wf_updated_on: 2019-03-09 #}
{# wf_published_on: 2013-12-18 #}
{# wf_tags: news,devtools #}
{# wf_blink_components: N/A #}

# DevTools Digest December 2013 {: .page-title }

{% include "web/_shared/contributors/umarhansa.html" %}


A number of updated features have made it into the Chrome DevTools recently, some small, some big. We'll start out with the Element panel's updates and move on to talk about Console, Timeline, and more.

### Disabled style rules copy as commented out

Copying entire CSS rules in the Styles pane will now include styles you toggled off, they will exist in your clipboard as commented out. [[crbug.com/316532](https://bugs.chromium.org/p/chromium/issues/detail?id=316532)]

<video autoplay loop muted src="/images/AMIfv95nq-jKjEQCyuGdlBMCYTYJMMDHSpaCvC9cVIHxjx5ie3BRX8p1fCAzxMGTMc_ZOCdsE09LZSCCGncVoDWnu63uUKwa38BSdQ4Sindsn1m4ZR-1RMlokMU0mWIGS613wSKLUF42wfqe6dVLXhBcBCq6Sh2eH8YSVEKLvsxKke2CoGwoJ14"></video>

### Copy as CSS path

‘Copy as CSS path’ is now available as a menu item for DOM nodes in the Elements panel (similar to the Copy XPath menu item).

![copy css path](/web/updates/images/2013-12-19-devtools-digest-december-2013/copy-css-path.jpg)

Generation of CSS selectors do not have to be limited to your stylesheets/JavaScript, they can also be alternatives for locator strategies in [WebDriver](https://www.seleniumhq.org/docs/03_webdriver.jsp#by-css) tests. [[crbug.com/277286](https://bugs.chromium.org/p/chromium/issues/detail?id=277286)]

### View Shadow DOM element styles

Child elements of a [shadow root](https://www.w3.org/TR/shadow-dom/) can now have their styles inspected. [[crbug.com/279390](https://bugs.chromium.org/p/chromium/issues/detail?id=279390)]

### Console's copy() works for objects

The [copy()](/chrome-developer-tools/docs/commandline-api#copyobject) method from the [Command Line API](/chrome-developer-tools/docs/commandline-api) now works for objects. Go ahead and try `copy({foo:'bar'})` into the Console panel and notice how a [stringified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) & formatted version of the object is now in your clipboard. [[crbug.com/289348](https://bugs.chromium.org/p/chromium/issues/detail?id=289348)]

### Regex filter for console

Filter console messages using regular expressions in the Console panel. [[crbug.com/318308](https://bugs.chromium.org/p/chromium/issues/detail?id=318308)]

### Easily remove event listeners

Try `getEventListeners(document).mousewheel[0];` in the Console panel to retrieve the first mousewheel event listener on the document. Carrying on from this, try `$_.remove()`; to remove that event listener (`$_` = value of the most recently evaluated expression). [[crbug.com/309524](https://bugs.chromium.org/p/chromium/issues/detail?id=309524)]

### Removal of CSS warnings

Those "*Invalid CSS property value*"-style warnings you might have seen are now removed. There are ongoing efforts into making the implementation more robust against real world CSS including browser hacks. [[crbug.com/309982](https://bugs.chromium.org/p/chromium/issues/detail?id=309982)]

### Timeline operations summarized in pie chart

<img src="/web/updates/images/2013-12-19-devtools-digest-december-2013/timeline-operations-chart.jpg" style="float:right">The Timeline panel now contains a pie chart in the Details pane which visually shows the source of your rendering costs - this helps you identify your bottlenecks at a glance.

You’ll find that much of the information which used to be displayed in popovers has now been promoted to its own pane. To view, start a Timeline recording and select a frame, take note of the new Details pane which contains a pie chart. When in Frames view, you’ll get interesting stats like average FPS (`1000ms/frame duration`) for the selected frame(s). [[crbug.com/247786](https://bugs.chromium.org/p/chromium/issues/detail?id=247786)]

<h3 style="clear:both"> Image resize event details</h3>

Image resize and decode events in the Timeline panel now contain a link to the DOM node in the Elements panel.

![image resize](/web/updates/images/2013-12-19-devtools-digest-december-2013/image-resize.jpg)

The Image URL link takes you to the corresponding resource in the Resources Panel.  [[crbug.com/244159](https://bugs.chromium.org/p/chromium/issues/detail?id=244159)]

### GPU Frames

Frames occurring on the GPU are now shown at the top, above frames on the main thread. [[crbug.com/305863](https://bugs.chromium.org/p/chromium/issues/detail?id=305863)]

### Break on popstate listeners

['popstate'](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate) is now available as an event listener breakpoint in the Sources panel sidebar. [[crbug.com/88112](https://bugs.chromium.org/p/chromium/issues/detail?id=88112)]

### Rendering settings available in the drawer

Opening the drawer now presents a number of panes, one of which is the Rendering panel, use it to show paint rectangles, FPS meter etc. This is enabled by default at Settings > "Show 'Rendering' view in console drawer"

### Copy image as data URL

<img src="/web/updates/images/2013-12-19-devtools-digest-december-2013/copy-image-as-data-url.jpg"  style="float:right"> Image assets in the Resources panel can now have their contents copied as a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme#HTML) (`data:image/png;base64,iVBO...`).

To try this out, find the image resource within Frames > [Resource] > Images and right click on the image preview to access the context menu, then select ‘Copy Image as Data URL’. [[crbug.com/321132](http://crbug.com/321132)]

<h3 style="clear:both">Data URI filtering</h3>

If you've never thought they belong, Data URIs can now be filtered out of the Network tab. Select the Filter icon ![filter icon](/web/updates/images/2013-12-19-devtools-digest-december-2013/filter-icon.jpg) to view other resource filter types. [[crbug.com/313845](http://crbug.com/313845)]

![Data URI filtering](/web/updates/images/2013-12-19-devtools-digest-december-2013/data-uri-filtering.jpg)

### Network Timing bugs fixed

If you saw your image apparently taking 300,000 years to download, our apologies. ;)  These incorrect timings for network resources have now been fixed. [[crbug.com/309570](https://bugs.chromium.org/p/chromium/issues/detail?id=309570)]

### Network recording behavior has more control

The behavior of recording network is a little different. First, the record button acts just like you would expect from Timeline or a CPU profile. And because you'd expect it, if you reload the page while DevTools is open, network recording will automatically start. It'll then turn off, so if you want to capture network activity after page load, turn it on. This makes it easier to visualize your waterfall without late-breaking network requests skew the results. [[crbug.com/325878](https://bugs.chromium.org/p/chromium/issues/detail?id=325878)]

### DevTools themes now available through extensions

User stylesheets are now available through DevTools Experiments (checkbox: "Allow custom UI themes") which allows a Chrome extension to apply custom styling to DevTools. See [Sample DevTools Theme Extension](https://github.com/paulirish/sample-devtools-theme-extension) for an example. [[crbug.com/318566](https://bugs.chromium.org/p/chromium/issues/detail?id=318566)]

<hr>

That’s it for this edition of the DevTools digest, if you haven’t already, check out the [November](https://www.html5rocks.com/en/tutorials/developertools/novdigest/){: .external } edition.


