project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Use virtual devices in Chrome's Device Mode to build mobile-first websites.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# Simulate Mobile Devices with Device Mode {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Use Chrome DevTools' Device Mode to build mobile-first, fully responsive websites. Learn how to use it to simulate a wide range of devices and their capabilities.

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
To use this shortcut your mouse needs to be focused on your DevTools window.
If it's focused on your viewport, you'll trigger [Chrome's switch user
shortcut](https://support.google.com/chrome/answer/157179).


Note: Device Mode does a whole lot to give you an experience as close as possible compared to the real deal, but keep in mind that you'll still need to test on real devices to get the full picture (we can't yet emulate the performance characteristics of a real device).
