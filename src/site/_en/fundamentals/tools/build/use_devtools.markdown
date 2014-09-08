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
authors:
  - megginkearney
key-takeaways:
  devtools:
    - Integrate Chrome DevTools into your development workflow; use mobile emulation panel from the very start of your project.
    - With Web Starter Kit + Chrome DevTools, debug your site on real and emulated devices with one-click.
    - Users won't stay on any page that performs badly in normal network conditions; check network performance on real devices;
    - Check your site's responsive layouts on a range of devices using the Chrome DevTools Screen pane within the Emulation panel.
notes:
  optimize:
    - See <a href="https://web-central.appspot.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html">Critical Rendering Path</a> and <a href="http://www.html5rocks.com/en/mobile/profiling/">Profiling Mobile HTML5 Apps With Chrome DevTools</a> for more insight on using the network timeline.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devtools %}

## Integrate Chrome DevTools

At the very start of your project,
keep Chrome DevTools open and
[emulate your site]({{site.fundamentals}}/tools/test/emulator.html)
on at least one mobile device.

As you code and debug your code,
check how your site responds on the mobile device.
This is a key habit to acquire as part of your development workflow.

<img src="imgs/emulate.png" class="center" alt="Chrome DevTools emulation tool">

## Debug on real devices and in the cloud

With Web Starter Kit + Chrome DevTools,
debug your site on real and emulated devices with one-click:

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

## Check network performance

Users won't stay on any page that performs badly
in normal network conditions;
and they will lose patience fast even when network connectivity is shakey.

Check
<a href="https://developer.chrome.com/devtools/docs/network">network performance</a>
on real devices and preferably in varying network connectivity.
Record how your site behaves on the network,
and pay close attention to the timeline.

You don't want the timeline to show everything happening
at the end of a page render;
you do want a more optimized render,
where some assets load in different frames on the timeline:

<img src="imgs/timeline.png" class="center" alt="timeline for web fundamentals site">

{% include modules/remember.liquid title="Important" list=page.notes.optimize %}

## Debug page responsiveness

Use the
[emulation tool]({{site.fundamentals}}/tools/test/emulator.html)
to check the layout of your site on a range of devices.
This tool automatically sets the layout of a URL to the selected device.

Dive deeper into the responsiveness of your site
on an emulated device, by changing the settings
in the Screen pane:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="setting">Setting</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="setting">Emulate screen resolution</td>
      <td data-th="Description">By default, matches the actual dimensions of the selected device. Uncheck the Emulate screen setting and enter any new dimensions.
    </tr>
    <tr>
      <td data-th="setting">Enable text autosizing</td>
      <td data-th="Description">Emulate font boosting which occurs on mobile devices. Android artificially increases the font metrics used by text autosizing. Enabled by default only when emulating an Android device.</td>
    </tr>
    <tr>
      <td data-th="setting">Emulate viewport</td>
      <td data-th="Description">Zooms the page out to the physical default viewport of that device.</td>
    </tr>
    <tr>
      <td data-th="setting">Shrink to fit</td>
      <td data-th="Description">Ensures the emulated device screen is completely visible within your browser window. This setting does not emulate the device differently.</td>
    </tr>
    <tr>
      <td data-th="setting">CSS media</td>
      <td data-th="Description">Print is the default media type; additional media types include tv, speech, projection, and more. This setting does not emulate the device differently.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
