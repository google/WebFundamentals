---
rss: false
layout: shared/narrow-pages-list
title: "Simulate Mobile Devices with Device Mode"
description: "Use virtual devices in Chrome's Device Mode to build mobile-first web sites."
published_on: 2015-04-14
updated_on: 2015-04-14
order: 3
panel: device mode
notes:
  realworld: "Device Mode does a whole lot to give you an experience as close as possible compared to the real deal, but keep in mind that you'll still need to test on real devices to get the full picture (we can't yet emulate the performance characteristics of a real device)."
---

<p class="intro">
  Use virtual devices in Chrome DevTools' Device Mode to build mobile-first web sites.
</p>

Learn how to use the built-in Device Mode to iteratively build and preview your site across a wide range of simulated devices. The Device Mode will help you build a truly responsive layout, test sensory input like touch and geolocation and stress test under slow network conditions.

![Initial start for device mode](imgs/device-mode-initial-view.png)

## Things you can do with Device Mode

* Emulate your site across [different screen sizes and resolutions](/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports), including Retina displays.
* Responsively design by visualizing and [inspecting CSS media queries](/web/tools/chrome-devtools/iterate/device-mode/media-queries).
* Evaluate your site's performance using the [network emulator](/web/tools/profile-performance/network-performance/network-conditions), without affecting traffic to other tabs.
* Accurately [simulate device input](/web/tools/chrome-devtools/iterate/device-mode/device-input-and-sensors) for touch events, geolocation, and device orientation.
* Enhance your current debugging workflow by combining device mode with the existing DevTools.

Some of this documentation might be ahead of the stable version of Chrome. Use <a href="https://www.google.com/intl/en/chrome/browser/canary.html">Chrome Canary</a>.

## How to enable Device Mode

Turn on device mode by pressing the **Toggle device mode** ![toggle device mode icon off](imgs/icon-device-mode-off.png){:.inline} icon. When device mode is enabled, the icon turns blue and the viewport transforms into a device emulator.

You can also toggle device mode on and off using the keyboard shortcut:
<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd> (or <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd> on Mac).



{% include shared/remember.liquid list=page.notes.realworld %}
