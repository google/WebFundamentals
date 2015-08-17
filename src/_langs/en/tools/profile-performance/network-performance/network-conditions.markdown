---
rss: false
layout: tools-article
title: "Optimize Performance Under Varying Network Conditions"
seotitle: "Optimize Performance Under Varying Network Conditions Using Chrome DevTools Device Mode"
description: "It’s easy to overlook the network conditions your users will face on mobile. Use tools to emulate different network conditions, fix up any load time issues and your users will thank you."
introduction: "It’s easy to overlook the network conditions your users will face on mobile. Use tools to emulate different network conditions, fix up any load time issues and your users will thank you."
article:
  written_on: 2015-04-14
  updated_on: 2015-07-21
  order: 3
authors:
  - megginkearney
priority: 0
collection: network-performance
key-takeaways:
  emulate-network:
    - Without affecting traffic to other tabs, evaluate your site's performance using the Chrome DevTools network emulator.
    - On Mac, emulate network connectivity using the Network Link Conditioner tool.
    - On Windows, similate network connectivity using third party tools including <a href="http://www.telerik.com/fiddler">Fiddler</a> and <a href="http://www.charlesproxy.com/">Charles</a>.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.emulate-network %}

## Emulate network connectivity on Chrome

Network conditioning in
[Chrome DevTools Device mode](/web/tools/setup/device-testing/devtools-emulator)
allows you to test your site on a variety of network connections, including Edge, 3G, and even offline. Select a connection from the preset dropdown to apply network throttling and latency manipulation.

![Device mode network controls](imgs/network-throttling.png)

Network throttling artificially limits the maximum download throughput (rate of data transfer). Latency manipulation enforces a minimum delay in connection round-trip time (RTT).

## Emulate network connectivity on Mac

Try out the Network Link Conditioner tool found in the Lion
Developer Tools. This can be installed by doing the following:

1. Open Xcode.
2. Select the following from the menu: `Xcode > Open Developer Tool > More Developer Tools`.
3. When the Apple Developer site opens, go to `Hardware IO Tools for Xcode` and
download the Network Link Conditioner dmg file.
4. Once the dmg is downloaded, double click the file and then select the Network
Link Conditioner.prefpane and select `Install` on the System Preferences window.

After installation, the panel will open and you'll see a drop-down listing a number of
preconfigured network scenarios including 3G and EDGE. Select one, turn the tool
on and your connection to the internet will be the selected speed, meaning
you'll be able to test for different network types.

![OS X Network Link Conditioner](imgs/network-link-conditioner.png)

## Simulate network on Windows

On Windows, options also include [Fiddler](http://www.telerik.com/fiddler) and
[Charles](http://www.charlesproxy.com/), an HTTP proxy which can throttle your
connection speeds. These are the network characteristics you can simulate:

![Network throttling on other platforms](imgs/throttling.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
