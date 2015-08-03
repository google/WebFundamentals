---
rss: false
layout: tools-article
title: "Inspect CSS Media Queries"
seotitle: ""
description: "Preview styles for targeted screen sizes using the Chrome DevTools media query inspector."
introduction: "Preview styles for targeted screen sizes using the Chrome DevTools media query inspector."
article:
  written_on: 2015-04-14
  updated_on: 2015-07-31
  order: 4
authors:
  - megginkearney
priority: 0
collection: inspect-styles
key-takeaways:
  media-query:
    - The media query inspector detects media queries in your site and lets you preview styles for targeted screen sizes.
    - Similar to device emulation, you can view how your site responds to different screen dimensions.
    - To avoid confusion, disable mobile emulation while inspecting media queries.
remember:
  disable-emulator:
    - TBD.
---
{% wrap content %}

[Media queries](/web/fundamentals/layouts/rwd-fundamentals/use-media-queries)
are an essential part of responsive web design.
They let you apply styles to your site based on device characteristics.
For example,
media queries control the style sheets applied to the site content
based on the device dimensions.

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.media-query %}

## View media query inspector

To view the media query inspector, click the **Media queries** ![media queries icon](imgs/icon-media-query.png){:.inline} icon in the upper left corner of the viewport. The DevTools detect media queries in your stylesheets and display them as colored bars in the top ruler.

![media query inspector](imgs/media-query-inspector-ruler.png)

To avoid confusion and maximize media query views in device mode,
turn off mobile emulation:
click **Reset all overrides** ![reset all overrides](imgs/icon-reset-overrides.png){:.inline} icon and refresh the page.

Media queries are color-coded as follows:

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
	<tbody>
		<tr>
			<td class="max-width"></td>
      <td>Queries targeting a maximum width.</td>
		</tr>
		<tr>
			<td class="max-and-min"></td>
      <td>Queries targeting widths within a range.</td>
		</tr>
		<tr>
			<td class="min-width"></td>
      <td>Queries targeting a minimum width.</td>
		</tr>
	</tbody>
</table>

## Preview screen styles

Click a media query bar to adjust the emulator resolution and preview styles for the targeted screen sizes:

<style>video { width: 100%; }</style>
<br>    
<video class="gfyVid" controls="" autoplay="" loop="" muted="" style="display: block;" poster="//thumbs.gfycat.com/OilyHarmlessAffenpinscher-poster.jpg"><source id="webmsource" src="//zippy.gfycat.com/OilyHarmlessAffenpinscher.webm" type="video/webm"><source id="mp4source" src="//fat.gfycat.com/OilyHarmlessAffenpinscher.mp4" type="video/mp4">![Inspecting media queries.](http://zippy.gfycat.com/OilyHarmlessAffenpinscher.gif)</video>

## View CSS

Right-click a bar to view where the media query is defined in CSS and jump to the definition in source code.

![web fundamentals media queries view](imgs/reveal-source-code.png)

## Preview styles for more media types

The media query inspector targets styles intended for screens. If you want to preview styles for other media types, such as print, you can do so in the media pane of the emulation drawer.

Open the DevTools emulation drawer by clicking the **More overrides** ![more overrides](imgs/icon-open-emulator-drawer.png){:.inline} icon in the top right corner of the browser viewport. Then, select **Media** in the emulation drawer.

![media pane in the DevTools emulation drawer](imgs/emulation-drawer-media.png)

Select the **CSS media** checkbox, and choose a media type from the dropdown list.

{% include modules/nextarticle.liquid %}

{% endwrap %}
