---
layout: updates/post
title: "DevTools Digest: Efficient element edits, service worker debugging, and Material Design shades"
published_on: 2015-10-29
updated_on: 2015-10-29
authors:
  - pbakaus
tags:
  - devtools
  - digest
  - update
description: "Use the DOM panel’s new context menu to efficiently edit nodes. Debug services workers directly via the Resources panel. Choose from all of the Material Design shades in the colorpicker. Blackbox JS libraries more easily."
featured_image: /web/updates/images/2015/10/devtools-blackboxing.png
---

<p class="intro">Use the DOM panel’s new context menu to efficiently edit nodes. Debug services workers directly via the Resources panel. Choose from all of the Material Design shades in the colorpicker. Blackbox JS libraries more easily.</p>

## The DOM panel’s new, improved context menu

<img src="/web/updates/images/2015/10/devtools-dom-menu.png" alt="The new DOM context menu" style="float: left;max-width: 230px;margin-right: 1em;margin-bottom: 1em;width: 40%;">We’ve analyzed the most-used actions in the DOM panel and concluded that the right-click context menu should be uncluttered and re-organized.

It’s now much easier to quickly hide or delete an element, trigger a certain state like :active or :hover or edit its HTML. And if you’re on a trackpad and don’t want to bother right-clicking, click on the three little dots next to the selected element instead.

## Debug Service Workers via the Resources panel

Service workers are fantastic once you’ve got them set up but they can be tricky to wrap your head around early on. This was made worse by the fact that debugging them required leaving the DevTools and opening chrome://serviceworker-internals/ in a new browser window.

![Service Workers in Resources](/web/updates/images/2015/10/devtools-service-workers.png)

Not anymore! Now you can debug service workers for the current domain directly from the Resources panel. It’s still a work-in-progress, but already a heavy improvement from the previous status quo.

## All the colors: Material Design shades in the colorpicker

[A few weeks ago](https://developers.google.com/web/updates/2015/08/devtools-digest-aggregated-timeline-details), we added the [Material Design palette](https://www.google.com/design/spec/style/color.html#color-color-palette) to the colorpicker to give you primary, bold colors out-of-the-box. To actually design a full page, you inevitably need full access to all of the Material Design shades, so we’ve baked them in.

<video src="/web/updates/videos/2015/10/devtools-md-shades.mp4" controls loop autoplay></video>

To bring up the shades, long press on one of the primary colors and click on a shade instead.

## Blackbox JavaScript libraries more easily in Settings

JavaScript Blackboxing has been around for a while but wasn’t terribly easy to discover. It’s a feature that allows you to blackbox a script on a page to focus on your authored code only (and hide all the wrapping code).

We’ve now moved it to Settings. Give it a try:

![Blackboxing](/web/updates/images/2015/10/devtools-blackboxing.png)

## The Best of the Rest

  * Missing access to Rendering toggles? **Rendering Settings** have been moved to the DevTools main menu (under “More Tools”). In addition to the usual suspects (i.e. FPS meter), we’ve moved “Emulate print media” there as well.
  * Tired of typing chrome://inspect into the Omnibox? **Inspect Devices** can now also be found in the new main menu under “More Tools”.
  * Accidentally closed one of these closable Drawer tabs like Rendering or Search? You can now reopen them with the new menu on the left.

- - -

As always, [let us know what you think via 
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the 
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!  
Paul Bakaus & the DevTools team
