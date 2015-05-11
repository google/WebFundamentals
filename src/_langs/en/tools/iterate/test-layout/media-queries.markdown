---
rss: false
layout: article
title: "Visualize CSS Media Queries"
seotitle: ""
description: "TBD description."
introduction: "TBD introduction."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 2
authors:
  - megginkearney
priority: 0
collection: test-layout
key-takeaways:
  tldr-tbd:
    - TBD tldr.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

TBD. Cover content in here: https://developer.chrome.com/devtools/docs/device-mode#media-queries 

TBD. Reminder to check on extensions in existing web/fundamentals/tools that relate to media queries. Might make sense to move the content here, or else at least cross-reference.

{% include modules/takeaway.liquid list=page.key-takeaways.tldr-tbd %}

[Media queries](fundamentals/layouts/rwd-fundamentals/use-media-queries)
are an essential part of responsive web design.
Device mode makes media queries readily accessible and easy for you to inspect.

<style>video { width: 100%; }</style>

<video class="gfyVid" controls="" autoplay="" loop="" muted="" style="display: block;" poster="//thumbs.gfycat.com/OilyHarmlessAffenpinscher-poster.jpg"><source id="webmsource" src="//zippy.gfycat.com/OilyHarmlessAffenpinscher.webm" type="video/webm"><source id="mp4source" src="//fat.gfycat.com/OilyHarmlessAffenpinscher.mp4" type="video/mp4">![Inspecting media queries.](http://zippy.gfycat.com/OilyHarmlessAffenpinscher.gif)</video>

## View media query inspector

To view the media query inspector, click the **Media queries** ![media queries icon](device-mode-files/icon-media-query.png)icon in the upper left corner of the viewport. The DevTools detect media queries in your stylesheets and display them as colored bars in the top ruler.

![media query inspector](imgs/media-query-inspector-ruler.png)

Media queries are color-coded as follows:

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">

<tbody>

<tr>

<td>Queries targeting a maximum width.</td>

</tr>

<tr>

<td>Queries targeting widths within a range.</td>

</tr>

<tr>

<td>Queries targeting a minimum width.</td>

</tr>

</tbody>

</table>

## Preview screen styles

Click a media query bar to adjust the emulator resolution and preview styles for the targeted screen sizes.

## View CSS

Right-click a bar to view where the media query is defined in CSS and jump to the definition in source code.

![web fundamentals media queries view](imgs/reveal-source-code.png)

**Tip:** As you work with the media query inspector, you might find that you don't always want to use the mobile emulator. To turn off mobile emulation without exiting device mode, click the **Reset all overrides** ![reset all overrides](device-mode-files/icon-reset-overrides.png)icon and refresh the page.

## Preview styles for more media types

The media query inspector targets styles intended for screens. If you want to preview styles for other media types, such as print, you can do so in the media pane of the emulation drawer.

Open the DevTools emulation drawer by clicking the **More overrides** ![more overrides](device-mode-files/icon-open-emulator-drawer.png)icon in the top right corner of the browser viewport. Then, select **Media** in the emulation drawer.

![media pane in the DevTools emulation drawer](imgs/emulation-drawer-media.png)

Select the **CSS media** checkbox, and choose a media type from the dropdown list.

{% include modules/nextarticle.liquid %}

{% endwrap %}
