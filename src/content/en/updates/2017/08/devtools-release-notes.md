project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Top-level await operators in the Console, new screenshot workflows, CSS Grid highlighting, and more.

{# wf_updated_on: 2017-08-29 #}
{# wf_published_on: 2017-08-29 #}
{# wf_tags: chrome62,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Top-level await operators in the Console, new screenshot workflows, CSS Grid highlighting, and more. #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# What's New In DevTools (Chrome 62) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

New features coming to DevTools in Chrome 62:

* [Support for top-level `await` operators in the **Console**](#await).
* [Screenshots of a portion of the viewport](#screenshot-areas), and
  [screenshots of specific HTML nodes](#node-screenshots).
* [CSS Grid highlighting](#css-grid-highlighting).
* [A new **Console** API for querying objects](#query-objects).
* [Negative filters](#negative-filters) and [URL filters](#url-filters) in
  the **Console**.
* [HAR imports in the **Network** panel](#har-imports).
* [Previewable cache resources](#cache-previews).

Note: You can check what version of Chrome you're running at
`chrome://version`. Chrome auto-updates to a new major version about every 6
weeks.

## Top-level await operators in the Console {: #await }

The **Console** now supports top-level `await` operators.

<figure>
  <img src="/web/updates/images/2017/08/await.png"
       alt="Using top-level await operators in the Console"/>
  <figcaption>
    <b>Figure 1</b>. Using top-level <code>await</code> operators in the
    <b>Console</b>
  </figcaption>
</figure>

## New screenshot workflows {: #screenshots }

You can now take a screenshot of a portion of the viewport, or of a specific
HTML node.

### Screenshots of a portion of the viewport {: #screenshot-areas }

To take a screenshot of a portion of your viewport:

1. Click **Inspect** ![Inspect][Inspect]{:.cdt-inl} or press
   <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux)
   to enter Inspect Element Mode.
1. Hold <kbd>Control</kbd> and select the portion of the viewport that
   you want to take a screenshot of.
1. Release your mouse. DevTools downloads a screenshot of the portion that
   you selected.

[Inspect]: /web/updates/images/2017/08/inspect-icon.png

<figure>
  <img src="/web/updates/images/2017/08/screenshot.png"
       alt="Taking a screenshot of a portion of the viewport"/>
  <figcaption>
    <b>Figure 2</b>. Taking a screenshot of a portion of the viewport
  </figcaption>
</figure>

### Screenshots of specific HTML nodes {: #node-screenshots }

To take a screenshot of a specific HTML node:

1. [Select an element][select] in the **Elements** panel.

     <figure>
       <img src="/web/updates/images/2017/08/target-node.png"
            alt="An example of a node "/>
       <figcaption>
         <b>Figure 3</b>. In this example, the goal is to take a screenshot
         of the blue header that contains the text <code>Tools</code>. Note
         that this node is already selected in the <b>DOM Tree</b> of the
         <b>Elements</b> panel
       </figcaption>
     </figure>

[select]: /web/tools/chrome-devtools/css/reference#select

1. Open the [Command Menu][CM].

[CM]: /web/tools/chrome-devtools/ui#command-menu

1. Start typing `node` and select `Capture node screenshot`. DevTools
   downloads a screenshot of the selected node.

     <figure>
       <img src="/web/updates/images/2017/08/node-screenshot.png"
            alt="The result of the 'Capture node screenshot' command"/>
       <figcaption>
         <b>Figure 4</b>. The result of the <code>Capture node
         screenshot</code> command
       </figcaption>
     </figure>


## CSS Grid highlighting {: #css-grid-highlighting }

To view the CSS Grid that's affecting an element, hover over an element
in the **DOM Tree** of the **Elements** panel. A dashed border appears around
each of the grid items. This only works when the selected item, or the
parent of the selected item, has `display:grid` applied to it.

<figure>
  <img src="/web/updates/images/2017/08/css-grid-highlighting.png"
       alt="Highlighting a CSS Grid"/>
  <figcaption>
    <b>Figure 5</b>. Highlighting a CSS Grid
  </figcaption>
</figure>

## A new API for querying objects {: #query-objects }

Call `queryObjects(Constructor)` from the **Console** to return an array
of objects that were created with the specified constructor. For example:

* `queryObjects(Promise)`. Returns all Promises.
* `queryObjects(HTMLElement)`. Returns all HTML elements.
* `queryObjects(foo)`, where `foo` is a function name. Returns all objects
  that were instantiated via `new foo()`.

## New Console filters {: #console-filters }

The **Console** now supports negative and URL filters.

### Negative filters {: #negative-filters }

Type `-<text>` in the **Filter** box to filter out any **Console** message
that includes that `<text>`.

In general, if `<text>` is found *anywhere* in the UI that DevTools presents
for the message, then the **Console** hides the message. This includes the
message text, the filename from which the message originated, and the stack
trace text (when applicable).

<figure>
  <img src="/web/updates/images/2017/08/before-negative-filter.png"
       alt="An example of 3 messages that will be filtered out"/>
  <figcaption>
    <b>Figure 6</b>. An example of 3 messages that will be filtered out
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2017/08/after-negative-filter.png"
       alt="The result after applying the negative filter"/>
  <figcaption>
    <b>Figure 7</b>. The result after applying the <code>-foo</code>
    Console filter
  </figcaption>
</figure>

### URL filters {: #url-filters }

Type `url:<text>` in the **Filter** box to only show messages that originated
from a script whose URL includes `<text>`.

The filter uses fuzzy matching. If `<text>` appears anywhere in the URL,
then DevTools shows the message.

<figure>
  <img src="/web/updates/images/2017/08/url-filter.png"
       alt="An example of URL filtering"/>
  <figcaption>
    <b>Figure 8</b>. Using URL filtering to only display messages that
    originate from scripts whose URL includes <code>hymn</code>. By hovering
    over the script name, you can see that the host name includes this text
  </figcaption>
</figure>

## HAR imports in the Network panel {: #har-imports }

Drag and drop a HAR file into the **Network** panel to import it.

<figure>
  <img src="/web/updates/images/2017/08/har-import.png"
       alt="Importing a HAR file"/>
  <figcaption>
    <b>Figure 9</b>. Importing a HAR file
  </figcaption>
</figure>

<!-- using HTML below because the markdown syntax isn't working for some
     reason... -->
<aside class="note">
  <b>Note</b>: To export a HAR file, right-click a request and select <b>Save
  As HAR With Content</b>. All requests that DevTools has recorded are saved
  to the file. If you've got any filters enabled, those are ignored.
</aside>

## Previewable cache resources in the Application panel {: #cache-preview }

Click a row in a **Cache Storage** table to see a preview of that resource
below the table.

<figure>
  <img src="/web/updates/images/2017/08/cache-preview.png"
       alt="Previewing a cache resource"/>
  <figcaption>
    <b>Figure 10</b>. Previewing a cache resource
  </figcaption>
</figure>

## Feedback {: #feedback }

The best place to discuss any of the features or changes you see here is
the [google-chrome-developer-tools@googlegroups.com mailing list][ML]. You
can also tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools) if
you're short on time.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Previous release notes {: #links }

* [What's New In DevTools (Chrome 61)](/web/updates/2017/07/devtools-release-notes)
* [What's New In DevTools (Chrome 60)](/web/updates/2017/05/devtools-release-notes)
* [What's New In DevTools (Chrome 59)](/web/updates/2017/04/devtools-release-notes)
* [What's New In DevTools (Chrome 58)](/web/updates/2017/03/devtools-release-notes)
