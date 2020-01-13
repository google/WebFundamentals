project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A tutorial on the most popular network-related features in Chrome DevTools.

{# wf_updated_on: 2019-02-13 #}
{# wf_published_on: 2019-02-08 #}
{# wf_blink_components: Platform>DevTools #}

# Inspect Network Activity In Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

This is a hands-on tutorial of some of the most commonly-used DevTools features related
to inspecting a page's network activity.

See [Network Reference](/web/tools/chrome-devtools/network-performance/reference) if you'd
like to browse features instead.

Read on, or watch the video version of this tutorial:

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="e1gAyQuIFQo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## When to use the Network panel {: #overview }

In general, use the Network panel when you need to make sure that resources are being
downloaded or uploaded as expected. The most common use cases for the Network panel are:

* Making sure that resources are actually being uploaded or downloaded at all.
* Inspecting the properties of an individual resource, such as its HTTP headers, content,
  size, and so on.

[speed]: /web/tools/chrome-devtools/speed/get-started

If you're looking for ways to improve page load performance, *don't* start with the Network
panel. There are many types of load performance issues that aren't related to network
activity. Start with the Audits panel because it gives you targeted suggestions on how to
improve your page. See [Optimize Website Speed][speed].

## Open the Network panel {: #open }

To get the most out of this tutorial, open up the demo and try out the features on the
demo page.

1. Open the [Get Started Demo](https://devtools.glitch.me/network/getstarted.html){: .external }.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/demo.png"
            alt="The demo"/>
       <figcaption>
         <b>Figure 1</b>. The demo
       </figcaption>
     </figure>

     You might prefer to move the demo to a separate window.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/windows.png"
            alt="The demo in one window and this tutorial in a different window"/>
       <figcaption>
         <b>Figure 2</b>. The demo in one window and this tutorial in a different window
       </figcaption>
     </figure>

1. [Open DevTools](/web/tools/chrome-devtools/open) by pressing
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> or
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac). The **Console**
   panel opens.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/console.png"
            alt="The Console"/>
       <figcaption>
         <b>Figure 3</b>. The Console
       </figcaption>
     </figure>

[dock]: /web/tools/chrome-devtools/ui#placement

     You might prefer to [dock DevTools to the bottom of your window][dock].

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/docked.png"
            alt="DevTools docked to the bottom of the window"/>
       <figcaption>
         <b>Figure 4</b>. DevTools docked to the bottom of the window
       </figcaption>
     </figure>

1. Click the **Network** tab. The Network panel opens.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/network.png"
            alt="DevTools docked to the bottom of the window"/>
       <figcaption>
         <b>Figure 5</b>. DevTools docked to the bottom of the window
       </figcaption>
     </figure>

Right now the Network panel is empty. That's because DevTools only logs network activity
while it's open and no network activity has occurred since you opened DevTools.

## Log network activity {: #load }

To view the network activity that a page causes:

[reload]: /web/tools/chrome-devtools/images/shared/reload.png

1. Reload the page. The Network panel logs all network activity in the **Network Log**.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/log.png"
            alt="The Network Log"/>
       <figcaption>
         <b>Figure 6</b>. The Network Log
       </figcaption>
     </figure>

     Each row of the **Network Log** represents a resource. By default the resources are
     listed chronologically. The top resource is usually the
     main HTML document. The bottom resource is whatever was requested last.

     Each column represents information about a resource. **Figure 6** shows the default
     columns:

     * **Status**. The HTTP response code.
     * **Type**. The resource type.
     * **Initiator**. What caused a resource to be requested. Clicking a link in the Initiator
       column takes you to the source code that caused the request.
     * **Time**. How long the request took.
     * **Waterfall**. A graphical representation of the different stages of the request.
       Hover over a Waterfall to see a breakdown.

     <aside class="note">
       <b>Note</b> The graph above the Network Log is called the Overview. You won't
       be using it in this tutorial, so you can hide it if you prefer. See <a
       href="/web/tools/chrome-devtools/network-performance/reference#hide-overview">Hide
       the Overview pane</a>.
     </aside>

1. So long as you've got DevTools open, it will record network activity in the Network Log.
   To demonstrate this, first look at the bottom of the **Network Log** and make a mental
   note of the last activity.
1. Now, click the **Get Data** button in the demo.
1. Look at the bottom of the **Network Log** again. There's a new resource called
   `getstarted.json`. Clicking the **Get Data** button caused the page to request this file.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/runtime.png"
            alt="A new resource in the Network Log"/>
       <figcaption>
         <b>Figure 7</b>. A new resource in the Network Log
       </figcaption>
     </figure>

## Show more information {: #information }

The columns of the Network Log are configurable. You can hide columns that you're not using.
There are also many columns that are hidden by default which you may find useful.

1. Right-click the header of the Network Log table and select **Domain**. The domain of
   each resource is now shown.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/domain.png"
            alt="Enabling the Domain column"/>
       <figcaption>
         <b>Figure 8</b>. Enabling the Domain column
       </figcaption>
     </figure>

<aside class="objective">
  <b>Tip</b> You can see the full URL of a resource by hovering over its cell in the
  <b>Name</b> column.
</aside>

## Simulate a slower network connection {: #throttle }

The network connection of the computer that you use to build sites is probably
faster than the network connections of the mobile devices of your users. By throttling
the page you can get a better idea of how long a page takes to load on a mobile device.

1. Click the **Throttling** dropdown, which is set to **Online** by default.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/throttling.png"
            alt="Enabling throttling"/>
       <figcaption>
         <b>Figure 9</b>. Enabling throttling
       </figcaption>
     </figure>

1. Select **Slow 3G**.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/slow3g.png"
            alt="Selecting Slow 3G"/>
       <figcaption>
         <b>Figure 10</b>. Selecting Slow 3G
       </figcaption>
     </figure>

1. Long-press **Reload** ![Reload][reload]{: .inline-icon }
   and then select **Empty Cache And Hard Reload**.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/hardreload.png"
            alt="Empty Cache And Hard Reload"/>
       <figcaption>
         <b>Figure 11</b>. Empty Cache And Hard Reload
       </figcaption>
     </figure>

[cache]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching

     On repeat visits, the browser usually serves some files from its [cache][cache]{: .external },
     which speeds up the page load. **Empty Cache And Hard Reload** forces the browser to go
     the network for all resources. This is helpful when you want to see how a first-time
     visitor experiences a page load.

     <aside class="note">
       <b>Note</b> The <b>Empty Cache And Hard Reload</b> workflow is only available when
       DevTools is open.
     </aside>

## Capture screenshots {: #screenshots }

Screenshots let you see how a page looked over time while it was loading.

[screenshots]: /web/tools/chrome-devtools/images/shared/screenshots.png

1. Click **Capture Screenshots** ![Capture Screenshots][screenshots]{: .inline-icon }.
1. Reload the page again via the **Empty Cache And Hard Reload** workflow. See
   [Simulate a slower connection](#throttle) if you need a reminder on how to do this.
   The Screenshots pane provides thumbnails of how the page looked at various points during the
   loading process.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/allscreenshots.png"
            alt="Screenshots of the page load"/>
       <figcaption>
         <b>Figure 12</b>. Screenshots of the page load
       </figcaption>
     </figure>

1. Click the first thumbnail. DevTools shows you what network activity was occurring at that
   moment in time.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/firstscreenshot.png"
            alt="The network activity that was happening during the first screenshot"/>
       <figcaption>
         <b>Figure 13</b>. The network activity that was happening during the first screenshot
       </figcaption>
     </figure>

1. Click **Capture Screenshots** ![Capture Screenshots][screenshots]{: .inline-icon } again
   to close the Screenshots pane.
1. Reload the page again.

## Inspect a resource's details {: #details }

Click a resource to learn more information about it. Try it now:

1. Click `getstarted.html`. The **Headers** tab is shown. Use this tab to inspect
   HTTP headers.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/headers.png"
            alt="The Headers tab"/>
       <figcaption>
         <b>Figure 14</b>. The Headers tab
       </figcaption>
     </figure>

1. Click the **Preview** tab. A basic rendering of the HTML is shown.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/preview.png"
            alt="The Preview tab"/>
       <figcaption>
         <b>Figure 15</b>. The Preview tab
       </figcaption>
     </figure>

     This tab is helpful when an API returns an error code in HTML and it's easier to read
     the rendered HTML than the HTML source code, or when inspecting images.

1. Click the **Response** tab. The HTML source code is shown.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/response.png"
            alt="The Response tab"/>
       <figcaption>
         <b>Figure 16</b>. The Response tab
       </figcaption>
     </figure>

     <aside class="objective">
       <b>Tip</b> When a file is minified, clicking the <b>Format</b>
       <img src="/web/tools/chrome-devtools/images/shared/format.png"
            class="inline-icon" alt="Format"/> button at the bottom of the
       <b>Response</b> tab re-formats the file's contents for readability.
     </aside>

1. Click the **Timing** tab. A breakdown of the network activity for this resource is shown.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/timing.png"
            alt="The Timing tab"/>
       <figcaption>
         <b>Figure 17</b>. The Timing tab
       </figcaption>
     </figure>

[close]: /web/tools/chrome-devtools/images/shared/close.png

1. Click **Close** ![Close][close]{: .inline-icon } to view the Network Log again.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/close-timing.png"
            alt="The Close button"/>
       <figcaption>
         <b>Figure 18</b>. The Close button
       </figcaption>
     </figure>

## Search network headers and responses {: #search }

Use the **Search** pane when you need to search the HTTP headers and responses of all resources
for a certain string or regular expression.

[policies]: /web/tools/lighthouse/audits/cache-policy

For example, suppose you want to check if your resources are using reasonable [cache
policies][policies].

[search]: /web/tools/chrome-devtools/images/shared/search.png

1. Click **Search** ![Search][search]{: .inline-icon }. The Search pane opens to the left
   of the Network log.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/search.png"
            alt="The Search pane"/>
       <figcaption>
         <b>Figure 19</b>. The Search pane
       </figcaption>
     </figure>

1. Type `Cache-Control` and press <kbd>Enter</kbd>. The Search pane lists all instances of
   `Cache-Control` that it finds in resource headers or content.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/results.png"
            alt="Search results for Cache-Control"/>
       <figcaption>
         <b>Figure 20</b>. Search results for <code>Cache-Control</code>
       </figcaption>
     </figure>

1. Click a result to view it. If the query was found in a header, the Headers tab opens.
   If the query was found in content, the Response tab opens.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/cache.png"
            alt="A search result highlighted in the Headers tab"/>
       <figcaption>
         <b>Figure 21</b>. A search result highlighted in the Headers tab
       </figcaption>
     </figure>

1. Close the Search pane and the Timing tab.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/close-buttons.png"
            alt="The Close buttons"/>
       <figcaption>
         <b>Figure 22</b>. The Close buttons
       </figcaption>
     </figure>

## Filter resources {: #filter }

DevTools provides numerous workflows for filtering out resources that aren't relevant to the
task at hand.

<figure>
  <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/filters.png"
       alt="The Filters toolbar"/>
  <figcaption>
    <b>Figure 23</b>. The Filters toolbar
  </figcaption>
</figure>

The **Filters** toolbar should be enabled by default. If not:

[filter]: /web/tools/chrome-devtools/images/shared/filter.png

1. Click **Filter** ![Filter][filter]{: .inline-icon } to show it.

### Filter by string, regular expression, or property {: #filterbox }

The **Filter** text box supports many different types of filtering.

1. Type `png` into the **Filter** text box. Only the files that contain the text `png` are
   shown. In this case the only files that match the filter are the PNG images.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/png.png"
            alt="A string filter"/>
       <figcaption>
         <b>Figure 24</b>. A string filter
       </figcaption>
     </figure>

1. Type `/.*\.[cj]s+$/`. DevTools filters out any resource with a filename that doesn't
   end with a `j` or a `c` followed by 1 or more `s` characters.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/regex.png"
            alt="A regular expression filter"/>
       <figcaption>
         <b>Figure 25</b>. A regular expression filter
       </figcaption>
     </figure>

1. Type `-main.css`. DevTools filters out `main.css`. If any other file matched the pattern
   they would also be filtered out.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/negative.png"
            alt="A negative filter"/>
       <figcaption>
         <b>Figure 26</b>. A negative filter
       </figcaption>
     </figure>

1. Type `domain:raw.githubusercontent.com` into the **Filter** text box. DevTools filters
   out any resource with a URL that does not match this domain.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/property.png"
            alt="A property filter"/>
       <figcaption>
         <b>Figure 27</b>. A property filter
       </figcaption>
     </figure>

[props]: /web/tools/chrome-devtools/network-performance/reference#filter-by-property

     See [Filter requests by properties][props] for the full list of filterable properties.

1. Clear the **Filter** text box of any text.

### Filter by resource type {: #type }

To focus in on a certain type of file, such as stylesheets:

1. Click **CSS**. All other file types are filtered out.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/css.png"
            alt="Showing CSS files only"/>
       <figcaption>
         <b>Figure 28</b>. Showing CSS files only
       </figcaption>
     </figure>

1. To also see scripts, hold <kbd>Control</kbd> or <kbd>Command</kbd> (Mac) and then
   click **JS**.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/cssjs.png"
            alt="Showing CSS and JS files only"/>
       <figcaption>
         <b>Figure 29</b>. Showing CSS and JS files only
       </figcaption>
     </figure>

1. Click **All** to remove the filters and see all resources again.

See [Filter requests](/web/tools/chrome-devtools/network-performance/reference#filter)
for other filtering workflows.

## Block requests {: #block }

How does a page look and behave when some of its resources aren't
available? Does it fail completely, or is it still somewhat functional? Block requests
to find out:

1. Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the **Command Menu**.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/commandmenu.png"
            alt="The Command Menu"/>
       <figcaption>
         <b>Figure 30</b>. The Command Menu
       </figcaption>
     </figure>

1. Type `block`, select **Show Request Blocking**, and press <kbd>Enter</kbd>.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/block.png"
            alt="Show Request Blocking"/>
       <figcaption>
         <b>Figure 31</b>. Show Request Blocking
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/images/shared/add.png

1. Click **Add Pattern** ![Add Pattern][add]{: .inline-icon }.
1. Type `main.css`.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/addblock.png"
            alt="Blocking main.css"/>
       <figcaption>
         <b>Figure 32</b>. Blocking <code>main.css</code></main>
       </figcaption>
     </figure>

1. Click **Add**.
1. Reload the page. As expected, the page's styling is slightly messed up because its main
   stylesheet has been blocked. Note the `main.css` row in the Network Log. The red
   text means that the resource was blocked.

     <figure>
       <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/blockedstyles.png"
            alt="main.css has been blocked"/>
       <figcaption>
         <b>Figure 33</b>. <code>main.css</code> has been blocked
       </figcaption>
     </figure>

1. Uncheck the **Enable request blocking** checkbox.

## Next steps {: #next }

Congratulations, you have completed the tutorial. Click **Dispense Award** to receive your
award.

{% framebox width="auto" height="auto" enable_widgets="true" %}
<style>
  .note::before {
    content: "";
  }
</style>
<script>
  var label = '/web/tools/chrome-devtools/network/';
  var feedback = {
    "category": "Completion",
    "choices": [
      {
        "button": {
          "text": "Dispense Award"
        },
        "response": "🏅",
        "analytics": {
          "label": label
        }
      }
    ]
  };
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}

Check out the [Network Reference](/web/tools/chrome-devtools/network-performance/reference)
to discover more DevTools features related to inspecting network activity.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
