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

## Browse resources {: #browse }

### Browse by directory {: #directory }

To view a page's resources organized by directory:

1. Click the **Sources** tab to open the **Sources** panel.
1. Click the **Page** tab to show the page's resources. The **Page** pane opens.

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/page.png"
            alt="The Page pane"/>
       <figcaption>
         <b>Figure X</b>. The <b>Page</b> pane
       </figcaption>
     </figure>

Here's a breakdown of the non-obvious items in **Figure X**:

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
         <b>Figure X</b>. The <b>Group By Folder</b> option
       </figcaption>
     </figure>

     TODO

     <figure>
       <img src="/web/tools/chrome-devtools/resources/imgs/filenames.png"
            alt="The Page pane after disabling Group By Folder"/>
       <figcaption>
         <b>Figure X</b>. The <b>Page</b> pane after disabling <b>Group By Folder</b>
       </figcaption>
     </figure>

Resources are organized by file type. Within each file type the resources are organized
alphabetically.

### Browse by file type {: #type }

#### The Frames pane {: #frames }

## Organize resources by frame {:#frames}

Use the **Frames** pane on the **Application** panel for a frame-organized
representation of your page's resources.

![frames detail][frames]

* The top-level (`top` in the screenshot above) is the main document.
* Below that (e.g. `widget2` in the screenshot above) are subframes of the
  main document. Expand one of these subframes to view the resources
  originating from that frame.
* Below the subframes are the images, scripts, and other resources of the
  main document.
* Last is the main document itself.

Click on a resource to view a preview of it.

Right-click on a resource to view it in the **Network** panel, open it in a
new tab, copy its URL, or save it.

![view resource][resource]

You can also view resources by frame in the **Sources** panel, by clicking
on the overflow menu in the navigator and disabling the **Group by folder**
option to stop grouping resources by folder.

![group by folder option](imgs/group-by-folder.png)

The resources will be listed by frame only.

![no folders](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## Organize resources by domain and folder {:#sources}

To view resources organized by domain and directory, use the **Sources**
panel.

![sources panel](imgs/sources.png)

## Filter resources by name, type, or other criteria {:#filter}

Use the **Network** panel to filter resources by name, type, and a whole range
of other criteria. Check out the guide below to learn more.

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
