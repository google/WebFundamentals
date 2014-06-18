---
layout: article
title: "Debug with Chrome DevTools"
description: "Use Chrome DevTools on your development machine to debug on your mobile device. Inspect, debug, analyze your site on any device from your desktop."
introduction: "Use Chrome DevTools on your development machine to debug on your mobile device. Inspect, debug, analyze your site on any device from your desktop."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 3
collection: build-your-site
key-takeaways:
  devtools:
    - Using the Web Starter Kit + Chrome DevTools, debug real and emulated devices from your development workspace with one-click.
    - 
notes:
  optimize:
    - See <a href="https://web-central.appspot.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html">Critical Rendering Path</a> for more insight on using the network timeline.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devtools %}

## Debug on real devices and in the cloud

Using the Web Starter Kit + Chrome DevTools,
debug real and emulated devices
from your development workspace with one-click:

1. Set up <a href="https://developer.chrome.com/devtools/docs/remote-debugging">remote debugging</a>
for any real device you wish to test your site on.
2. Navigate on your real device to the your site's URL
(`gulp build` returns this URL).
3. Open up this same URL on your desktop.
4. Set up <a href="https://developer.chrome.com/devtools/docs/mobile-emulation">device emulation</a> for any device.
5. Repeat steps 3 and 4 to emulate different devices.

Choose any open tab, access the Chrome DevTools,
and start debugging.
Live reloading and synchronization
lets you debug on all real and emulated devices at the same time.

IMAGE PLACEHOLDER
Todo: Image showing real device, emulated device, and
devtools opened to debug site in all instances.

## Check network performance

Check
<a href="https://developer.chrome.com/devtools/docs/network">network performance</a>
on at least one real device;
don't skip this test no matter how confident you are in your emulated tests.

Users won't stay on any page that performs badly
in normal network conditions;
and they will lose patience fast even when network connectivity is shakey.
Deliver a site that works well under most network conditions,
and users are happy.

John McCutchan's
<a href="http://www.html5rocks.com/en/mobile/profiling/">Profiling Mobile HTML5 Apps With Chrome DevTools</a>
describes how to check network performance on a device
using Chrome DevTools remote debugging.

Record how your site behaves on the network,
and pay close attention to the timeline.
You don't want the timeline to show everything happening
at the end of a page render;
you do want a more optimized render,
where some assets load in different frames on the timeline:

IMAGE PLACEHOLDER
Todo: Screenshot of timeline for web fundamentals site on connected device.

{% include modules/remember.liquid title="Important" list=page.notes.optimize %}

## Debug page responsiveness

Simply by using the Chrome DevTools Emulation panel
for a range of devices,
you can check the layout of your site on each devices.
The Chrome DevTools Emulation Panel
automatically sets the layout of a URL to the selected device.
Dive deeper into the responsiveness of your site
on an emulated device, by changing the settings
in the Screen pane:

SCREENCAST PLACEHOLDER
Todo: Create simplate placeholder that shows Screen options
in DevTools emulator.

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="setting">Setting</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="setting">Emulate screen</td>
      <td data-th="Description">.</td>
    </tr>
    <tr>
      <td data-th="setting">Enable text autosizing</td>
      <td data-th="Description">.</td>
    </tr>
    <tr>
      <td data-th="setting">Emulate viewport</td>
      <td data-th="Description">.</td>
    </tr>
    <tr>
      <td data-th="setting">Shrink to fit</td>
      <td data-th="Description">.</td>
    </tr>
    <tr>
      <td data-th="setting">CSS media</td>
      <td data-th="Description">.</td>
    </tr>
  </tbody)
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
