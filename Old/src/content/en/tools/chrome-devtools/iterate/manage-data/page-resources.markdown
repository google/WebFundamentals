---
layout: shared/narrow
title: "Inspect Page Resources"
description: "View all of a page's resources, such as documents, images,
scripts, and fonts, in the Chrome DevTools Resources panel."
published_on: 2015-04-14
updated_on: 2016-03-18
order: 3
authors:
  - kaycebasques
  - megginkearney
translation_priority: 0
key-takeaways:
  page-resources:
    - "View page resources, organized by main document and embedded frames."
    - "Preview individual resources, such as images, fonts, and scripts."
    - "Reveal a resource in the Network panel."
    - "View the bounding box of an embedded frame."
---

<p class="intro">View all of a page's resources, such as documents,
images, scripts, and fonts, in the Chrome DevTools <strong>Resources</strong>
panel.</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.page-resources %}

## View resources

Open the **Resources** panel, and then expand the **Frames** category to
see your page's resources. 

1. The top-level folder is the main document.
2. Nested folders are embedded frames. Expand one of these folders to view 
   that frame's resources.
3. Below the embedded frames folders (if any) are the main
   document's resources (images, scripts, stylesheets, other).
4. Last, the main document itself. 

![viewing page resources](imgs/resources.png)

## Preview a resource

Select a resource to preview it. Hover over a resource's name to view its
URL.

![previewing an image in the resources panel](imgs/image-preview.png)

Image previews (like in the screenshot above) include file size, dimensions,
and MIME type. These are located in the information bar below the image 
preview.

## Show resource in Network panel

Right-click on a resource name and select **Reveal in Network Panel** to 
view it in the **Network** panel. The **Network** panel automatically opens
and highlights the resource in yellow. It does not select the resource, 
however.

If you don't see the **Reveal in Network Panel** option, reload the page while
DevTools is open. 

## Open resource in new tab

Right-click on a resource and select **Open Link in New Tab** to open the
resource in a new Google Chrome tab.

## View resource address

Hover over a resource name to view a tooltip that displays the complete URL
of the resource. 

Right-click on a resource name and select **Copy link address** to copy the 
resource's URL to the system clipboard.

## View bounding box of an embedded frame

Hover your mouse over one of the folders that represents an embedded frame
to view the bounding box of the frame. 

![view embedded frame bounding box](imgs/view-frame.png)
