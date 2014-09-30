---
layout: article
title: "Test Against Mobile Network Conditions"
description: "It’s easy to overlook the network conditions your users will face on mobile. Use tools to emulate different network conditions and your users will thank you."
introduction: "It’s easy to overlook the network conditions your users will face on mobile. Use tools to emulate different network conditions and your users will thank you."
article:
  written_on: 2014-09-25
  updated_on: 2014-09-25
  order: 5
collection: devices
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
notes:

---
{% wrap content %}

If you're on a Mac, try out the Network Link Conditioner found in the Lion
Developer Tools.
This can be installed by going opening Xcode, go to the menu item &gt; Open
Developer Tool &gt; More Developer Tools. This will open the Apple Developer
site, then go to \`Hardware IO Tools for Xcode\` and download the dmg file.

Once the dmg is downloaded, double click the file and then select the Network
Link Conditioner.prefpane and select 'Install' on the System Preferences window.

This will then launch the panel and you'll see a drop-down listing a number of
preconfigured network scenarios including 3G and EDGE. Select one, turn the tool
on and your connection to the internet will be the selected speed, meaning
you'll be able to test for different network types.

<img src="imgs/network-panel.png" alt="OS X Network Panel" />

On Windows, options also include [Fiddler](http://www.telerik.com/fiddler) and
[Charles](http://www.charlesproxy.com/), an HTTP proxy which can throttle your
connection speeds. These are the network characteristics you can simulate:

<img src="imgs/throttling.png" alt="Throttling for other platforms" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
