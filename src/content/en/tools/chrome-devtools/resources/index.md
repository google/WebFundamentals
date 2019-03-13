project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Organize resources by frame, domain, type, or other criteria.

{# wf_updated_on: 2019-03-13 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# View Page Resources With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

This guide teaches you how to use Chrome DevTools to view a web page's resources. Resources
are the files that a page needs in order to display correctly. Examples of resources
include CSS, JavaScript, and HTML files, as well as images.

[MDN]: https://developer.mozilla.org/en-US/docs/Learn

This guide assumes that you're familiar with the basics of [web development][MDN]{: .external }
and [Chrome DevTools](/web/tools/chrome-devtools/#start).

## Open resources {: #open }

When you know the name of the resource that you want to inspect, the **Command Menu** provides
a fast way of opening the resource.

1. Press <kbd>Control</kbd>+<kbd>P</kbd> or <kbd>Command</kbd>+<kbd>P</kbd> (Mac).
   The **Open File** dialog opens.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/openfile.png"
            alt="The Open File dialog"/>
       <figcaption>
         <b>Figure 1</b>. The <b>Open File</b> dialog
       </figcaption>
     </figure>

1. Select the file from the dropdown, or start typing the filename and press
   <kbd>Enter</kbd> once the correct file is highlighted in the autocomplete box.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/filesearch.png"
            alt="Typing a filename in the Open File dialog"/>
       <figcaption>
         <b>Figure 2</b>. Typing a filename in the <b>Open File</b> dialog
       </figcaption>
     </figure>

### Open resources in the Network panel {: #networkopen }

See [Inspect a resource's details](/web/tools/chrome-devtools/network/#details).

<figure>
  <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/response.png"
       alt="Inspecting a resource in the Network panel"/>
  <figcaption>
    <b>Figure 3</b>. Inspecting a resource in the <b>Network</b> panel
  </figcaption>
</figure>

### Reveal resources in the Network panel from other panels {: #reveal }

The [Browse resources](#browse) section below shows you how to view resources from various parts
of the DevTools UI. If you ever want to inspect a resource in the **Network** panel, right-click
the resource and select **Reveal in Network panel**.

<figure>
  <img src="/web/tools/chrome-devtools/resources/imgs/reveal.png"
       alt="Reveal in Network panel"/>
  <figcaption>
    <b>Figure 4</b>. The <b>Reveal in Network panel</b> option
  </figcaption>
</figure>

## Browse resources {: #browse }

### Browse resources in the Network panel {: #network }

See [Log network activity](/web/tools/chrome-devtools/network/#load).

<figure>
  <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/log.png"
       alt="Page resources in the Network Log"/>
  <figcaption>
    <b>Figure 5</b>. Page resources in the Network Log
  </figcaption>
</figure>

### Browse by directory {: #directory }

To view a page's resources organized by directory:

1. Click the **Sources** tab to open the **Sources** panel.
1. Click the **Page** tab to show the page's resources. The **Page** pane opens.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/page.png"
            alt="The Page pane"/>
       <figcaption>
         <b>Figure 6</b>. The <b>Page</b> pane
       </figcaption>
     </figure>

     Here's a breakdown of the non-obvious items in **Figure 6**:
     
[context]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     
     * **top** is the main document [browsing context][context]{: .external }.
     * **airhorner.com** represents a domain. All resources nested under it come from that
       domain. For example, the full URL of the **comlink.global.js** file is probably
       `https://airhorner.com/scripts/comlink.global.js`.
     * **scripts** is a directory.
     * **(index)** is the main HTML document.
     * **iu3** is another browsing context. This context was probably created
       by an `<iframe>` element embedded in the main document HTML.
     * **sw.js** is a service worker execution context.

1. Click a resource to view it in the **Editor**.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/sourcesview.png"
            alt="Viewing a file in the Editor"/>
       <figcaption>
         <b>Figure 7</b>. Viewing a file in the <b>Editor</b>
       </figcaption>
     </figure>

### Browse by filename {: #filename }

By default the **Page** pane groups resources by directory. To disable this grouping
and view each domain's resources as a flat list:

[MO]: /web/tools/chrome-devtools/images/shared/more.png

1. Open the **Page** pane. See [Browse by directory](#directory).
1. Click **More Options** ![More Options][MO]{: .inline-icon } and disable
   **Group By Folder**.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/groupbyfolder.png"
            alt="Group By Folder"/>
       <figcaption>
         <b>Figure 8</b>. The <b>Group By Folder</b> option
       </figcaption>
     </figure>

     Resources are organized by file type. Within each file type the resources are organized
     alphabetically.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/filenames.png"
            alt="The Page pane after disabling Group By Folder"/>
       <figcaption>
         <b>Figure 9</b>. The <b>Page</b> pane after disabling <b>Group By Folder</b>
       </figcaption>
     </figure>

### Browse by file type {: #type }

To group resources together based on their file type:

1. Click the **Application** tab. The **Application** panel opens. By default
   the **Manifest** pane usually opens first.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/application.png"
            alt="The Application panel"/>
       <figcaption>
         <b>Figure 10</b>. The <b>Application</b> panel
       </figcaption>
     </figure>

1. Scroll down to the **Frames** pane.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/frames.png"
            alt="The Frames pane"/>
       <figcaption>
         <b>Figure 11</b>. The <b>Frames</b> pane
       </figcaption>
     </figure>

1. Expand the sections that you're interested in.
1. Click a resource to view it.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/applicationview.png"
            alt="Viewing a resource in the Application panel"/>
       <figcaption>
         <b>Figure 11</b>. Viewing a resource in the <b>Application</b> panel
       </figcaption>
     </figure>

#### Browse files by type in the Network panel {: networktype }

See [Filter by resource type](/web/tools/chrome-devtools/network/#type).

<figure>
  <img src="/web/tools/chrome-devtools/network-performance/imgs/tutorial/css.png"
       alt="Filtering for CSS in the Network Log"/>
  <figcaption>
    <b>Figure 12</b>. Filtering for CSS in the Network Log
  </figcaption>
</figure>


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
