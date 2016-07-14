---
layout: shared/narrow-pages-list
title: "Simulate Mobile Devices with Device Mode"
description: "Use virtual devices in Chrome's Device Mode to build mobile-first web sites."
published_on: 2015-04-14
updated_on: 2016-03-08
authors:
  - pbakaus
order: 3
translation_priority: 1
notes:
  realworld: "Device Mode does a whole lot to give you an experience as close as possible compared to the real deal, but keep in mind that you'll still need to test on real devices to get the full picture (we can't yet emulate the performance characteristics of a real device)."
---

<p class="intro">
  Use Chrome DevTools' Device Mode to build mobile-first, fully responsive web sites. Learn how to use it to simulate a wide range of devices and their capabilities.
</p>

![Initial start for device mode](imgs/device-mode-initial-view.png)

## In a nutshell

* Emulate your site across [different screen sizes and resolutions](/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports), including Retina displays.
* Responsively design by visualizing and [inspecting CSS media queries](/web/tools/chrome-devtools/iterate/device-mode/media-queries).
* Evaluate your site's performance using the [network emulator](/web/tools/chrome-devtools/profile/network-performance/network-conditions), without affecting traffic to other tabs.
* Accurately [simulate device input](/web/tools/chrome-devtools/iterate/device-mode/device-input-and-sensors) for touch events, geolocation, and device orientation

## How to disable Device Mode

Device Mode is enabled by default. If you're building a Desktop-only site, you may turn it off by pressing the **Toggle device mode** (![toggle device mode icon on](imgs/device-mode-on.png){:.inline.wf-devtools-icon}) icon. When Device Mode is disabled, the icon turns grey and the viewport controls are hidden.

You can also toggle device mode on and off using the keyboard shortcut:
<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd> on Mac).

{% include shared/remember.liquid list=page.notes.realworld %}
