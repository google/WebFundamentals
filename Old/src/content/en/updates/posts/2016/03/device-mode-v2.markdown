---
layout: updates/post
title: "A new Device Mode for a mobile-first generation"
description: "Learn all about Chrome DevTools' new, refreshed Device Mode introduced in Chrome 49."
published_on: 2016-03-21
updated_on: 2016-03-21
authors:
  - pbakaus
tags:
  - devtools
  - update
  - chrome49
featured_image: /web/updates/images/2016/03/device-mode-v2/device-mode-initial-view.png
---

# A new Device Mode for a mobile-first generation

We introduced Device Mode, a way to emulate devices and work with responsive designs,
a bit more than a year ago. Now it's time for its first major upgrade, starting
in Chrome 49. So, what's new?

**Mobile is becoming the starting point in Chrome DevTools.** While we offered
ways to emulate mobile in the past, the development default was desktop. Mobile
emulation always had to be turned on. Now that consumption of mobile sites has
overtaken desktop in many places, we're switching our position in DevTools as well.

## What's new?

![New Device Mode](/web/updates/images/2016/03/device-mode-v2/device-mode-initial-view.png)

First and foremost, the UI is streamlined and uses a lot less space. We expect 
the new Device Mode to become the main development mode for most, so a clean and 
simple design that extends the main DevTools navigation bar was a requirement.

![New Device Mode](/web/updates/images/2016/03/device-mode-v2/media-query-inspector-ruler.png)
_The new quick-jump device ruler over the media queries._

In addition, we've centered the viewport and added a new quick-jump device ruler 
at top, a great help when designing responsively, that gives you an idea of the 
most common device sizes. 

And finally, a lot of options have been bundled or hidden behind a toggle 
whenever possible. These new composite options make it a lot easier to switch 
between modes. To toggle certain controls or customize your experience of the 
toolbar, hit up the little three dot menu icon.

## Responsive by default

<img src="/web/updates/images/2016/03/device-mode-v2/select-device.png" alt="Device Mode dropdown" style="float: right;max-width: 33%;margin: 0 0 10px 10px;">

The main DevTools toolbar now expands to the left side of the browser window and 
includes the most important tools to emulate a variety of mobile and desktop 
devices. You can choose between two development modes:

* **Responsive**
* **Specific Device**

In both modes, the viewport sits in its own resizable window within Chrome. This 
has the significant advantage that you can maximize your browser window and the 
DevTools the way you like them and not have them jump around when you test 
multiple sizes of your page and go back and forth.

**Responsive** is the mode you'll want to be in during active iteration to make 
sure your site works on all sorts of devices, not just a few specific ones. In 
this mode, the handles next to the viewport are freely resizable.

**Specific Device** refers to when you choose a specific device and lock the 
viewport to its size. This becomes useful when you want to get in final fixes 
and touches for a few popular devices near the launch. Which is why we're not 
just showing a huge list of all sorts of devices in the dropdown, but the 
currently most popular ones. If you select one, we do our best to make it behave 
as closely as the real deal: Touch events, user agent, viewport and device 
chrome and UI (if available) are all emulated.

## Integrated Remote Debugging

Emulations, even the best ones available, can only get you so far. There are 
simply things that emulations can't do today, like:

* Check if a button is large enough for your thumb.
* Test the performance of your site on a slower phone.
* Debug random quirks and limitations of certain devices.

To sufficiently test all of these scenarios, you need to test, work and debug 
using actual physical devices.

<img src="/web/updates/images/2016/03/device-mode-v2/inspect-devices.png" alt="Inspect Devices dialog">

For a while now, you could browse to `chrome://inspect`, connect your device over 
USB and open a remote debugging session via DevTools. But we've now gone one 
step further and refactored how remote debugging looks and behaves, embedding it 
into the core of DevTools. Instead of browsing to another page, you can now 
access **Inspect Devices** as a dialog directly within the new main menu. This 
makes it much easier to include physical debugging into your workflow – just 
plug in your phone, no need to exit your DevTools!

## New homes for the rest of the former emulation controls

Since mobile is now the default across DevTools, features like network 
throttling moved to their proper home, in this case the Network Panel.

<img src="/web/updates/images/2016/03/device-mode-v2/navigate-to-sensors.png" alt="More Tools" style="float: right;max-width: 33%;margin: 0 0 10px 10px;">

Some features, like the emulation of sensors or rendering settings like 
emulating print media have been moved to a consistent place in the Drawer. You can find all of the extras in the new main menu under "More tools".

We know this is a significant change to which we'll all have to get used to.
You'll find full coverage about everything that's in it in the
[just-updated Device Mode docs](https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode).
We'd love to hear from you on Twitter or if you need more than 140 characters,
on our [bug tracker](https://crbug.com/new) (yes, even for feature requests).