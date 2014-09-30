---
layout: article
title: "Test Against Mobile Network Conditions"
description: "It’s easy to overlook the network conditions your users will face on mobile. Use tools to emulate different network conditions and your users will thank you."
introduction: "It’s easy to overlook the network conditions your users will face on mobile. Use tools to emulate different network conditions and your users will thank you."
article:
  written_on: 2014-09-25
  updated_on: 2014-09-25
  order: 1
collection: test
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
notes:

---
{% wrap content %}

If you're on a Mac, try out the Network Link Conditioner found in the Lion
Developer Tools.
This can be installed by doing the following:

1. Open Xcode
2. Select the following from the menu: ` XCode &gt; Open
Developer Tool &gt; More Developer Tools
3. When the Apple Developer site opens, go to `Hardware IO Tools for Xcode` and
download the Network Link Conditioner dmg file.
4. Once the dmg is downloaded, double click the file and then select the Network
Link Conditioner.prefpane and select 'Install' on the System Preferences window.

After installation, the panel will open and you'll see a drop-down listing a number of
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
