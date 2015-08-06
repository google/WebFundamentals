---
rss: false
layout: tools-article
title: "Inspect Your Page Resources"
seotitle: "Inspect Your Page Resources in the Chrome DevTools Resources Panel"
description: "View all of your main document's resources including images, scripts, and fonts, and those of any loaded frames in the Chrome DevTools Resources panel."
introduction: "View all of your main document's resources including images, scripts, and fonts, and those of any loaded frames in the Chrome DevTools Resources panel."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 3
authors:
  - megginkearney
priority: 0
collection: manage-data
key-takeaways:
  page-resources:
    - Preview page resources, including visual previews of fonts and images.
    - Open a page resource in the Network panel to profile the time it took for the resource to load.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

The top level category of page resources are the document's frames, which includes the main document, and its embedded frames:

![Page resources top level category](imgs/frame-resources.png)

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.page-resources %}

## Preview a resource

To preview a resource, expand a frame to view its resources organized by type, expand a type to view all resources of that type, and select a resource to preview it in the panel on the right. 

Below is a preview of a font resource. 

![Preview of a font resource](imgs/font-resource.png)

Image previews include the dimensions, file size, MIME type, and URL of the image. 

![Inspect images](imgs/image-inspect.png)

## Open resource in Network panel

The [Network panel](/web/tools/profile-performance/network-performance/resource-loading)
provides detailed information about the time it took
each resource to load, from the start of the HTTP request
to the receipt of the final byte of the response.

To open a resource in the Network panel, right-click or control-click the resource and select **Reveal In Resources Panel**. 

From the same menu, you can copy the resource's URL to the system clipboard, or open it in a new browser tab. 

![Open resources in Network panel](imgs/reveal-in-network.png)

## View bounding box of an embedded frame

To view the bounding box of an embedded frame, hover your mouse over a frame in the Resources panel:

![View bounding box of an embedded frame](imgs/frame-selected.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
