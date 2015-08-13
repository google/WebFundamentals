---
rss: false
layout: tools-article
title: "Remote Access to Your Local Site"
seotitle: "Access Your Development Site Through a Web Server Using Port Forwarding"
description: "The simplest way to test on a real device is to run your site in a web server and point your device to the IP address."
introduction: "The simplest way to test on a real device is to run your site in a web server and point your device to the IP address."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 2
collection: remote-debugging
key-takeaways:
  local-server: 
    - Use port forwarding when your device can't access your development server's network.
    - To reach content on a customized domain, use port forwarding in combination with a proxy server.
---
{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.local-server %}

## Open local version in device browser

Run your site in a web server, find the IP address of your computer, and then point your mobile devices to your computer's IP address.

### Find IP address

Every OS has a different way of finding out your IP address. If you spot
the network panel on your computer, that will be the easiest way to find your
local IP address.  

OS X and Ubuntu users can always run `ifconfig` from a command prompt; Windows
users can run `ipconfig` from the command prompt.

### Simple way to run web server

Need a simple way to run a web server locally?

To start the server, run:

`python -m SimpleHTTPServe`

## Use port-forwarding when site and device on different networks

Your phone can't always reach the content on your development server. They might be on different networks. Moreover, you might be developing on a restricted corporate network. Use port forwarding when your development server and device are on different networks.

Port forwarding on Chrome for Android makes it easy to test your development site on mobile. It works by creating a listening TCP port on your mobile device that maps to a particular TCP port on your development machine. Traffic between these ports travels through USB, so the connection doesn't depend on your network configuration.

To enable port forwarding:

1. Open **chrome://inspect** on your development machine.
2. Click **Port Forwarding**. The port forwarding settings display. ![port forwarding button location](imgs/chrome-port-forwarding.png)
3. In the **Device port** field, enter the port number you want your Android device to listen on. (The default port is 8080.)
4. In the **Host** field, enter the IP address (or hostname) and port number where your web application is running. This address can be any local location accessible from your development machine. Currently, port numbers must be between 1024 and 65535 (inclusive).
5. Check **Enable port forwarding**.
6. Click **Done**. ![port forwarding dialog](imgs/port-forwarding-dialog.png)

The port status indicators on **chrome://inspect** are green when port forwarding is successful.

![viewing local content on mobile](imgs/port-forwarding-on-device.png)

Now you can open a new Chrome for Android tab and view the content of your local server on your device.

## Use virtual host mapping for customized local domains

Port forwarding works great when you're developing on `localhost`. But there are cases when you might be using a customized local domain.

For example, suppose you're using a third party JavaScript SDK that only works on whitelisted domains. So you added an entry, such as `127.0.0.1 production.com`, to your [hosts file](http://en.wikipedia.org/wiki/Hosts_(file)). Or maybe you configured a customized domain using virtual hosts on your web server ([MAMP](http://www.mamp.info/en/)).

If you want your phone to reach content on your customized domain, you can use port forwarding in combination with a proxy server. The proxy maps requests from your device to the correct location on the host machine.

### Set up port forwarding to a proxy

Virtual host mapping requires you to run a proxy server on the host machine. All requests from your Android device will be forwarded to the proxy.

To set up port forwarding to a proxy:

1. On the host machine, install proxy software such as [Charles Proxy](http://www.charlesproxy.com/) (free trial available) or [Squid](http://www.squid-cache.org/).
2. Run the proxy server and note the port that it's using. **Note**: The proxy server and your development server must be running on different ports.
3. In a Chrome browser, navigate to **chrome://inspect**.
4. Click **Port forwarding**. The port forwarding settings display. ![port forwarding button location](imgs/chrome-virtual-host-mapping.png)
5. In the **Device port** field, enter the port number that you want your Android device to listen on. Use a port that Android allows, such as `9000`.
6. In the **Host** field, enter `localhost:xxxx`, where `xxxx` is the port your proxy is running on.
7. Check **Enable port forwarding**.
8. Click **Done**. ![port forwarding dialog](imgs/port-forward-to-proxy.png) The proxy on the host machine is set up to make requests on behalf of your Android device.

### Configure proxy settings on your device

Your Android device needs to communicate with the proxy on the host machine.

To configure the proxy settings on your device:

1. Select **Settings > Wi-Fi**.
2. Long-press the network that you are currently connected to.
    **Note**: Proxy settings apply per network.
3. Tap **Modify network**.
4. Select **Advanced options**. The proxy settings display. ![phone proxy settings](imgs/phone-proxy-settings.png)
5. Tap the **Proxy** menu and select **Manual**.
6. In the **Proxy hostname** field, enter `localhost`.
7. In the **Proxy port** field, enter `9000`.
8. Tap **Save**.

With these settings, your device forwards all of its requests to the proxy on the host machine. The proxy makes requests on behalf of your device, so requests to your customized local domain are properly resolved.

Now you can load local domains on Chrome for Android just as you would on the host machine.

![virtual host mapping](imgs/virtual-host-mapping.png)

**Tip**: To resume normal browsing, remember to revert the proxy settings on your device after you disconnect from the host.

## How to test site on lots of devices

Most likely one device isn't enough.
Eventually you will need to test how your site behaves
on different types of devices.

### Synchronize testing across devices.

If you have a large number of devices to test against, you may find it
overwhelming to do a basic test across all of the devices. [Browser
Sync](http://www.browsersync.io/) can help with this by synchronising
interactions across all of your devices. This includes scrolling, clicking and
form entry.

<div class="media media--video">
  <iframe src="//www.youtube.com/embed/RKKBIs_3svM?controls=2&amp;modestbranding=1&showinfo=0&;utm-source=crdev-wf&;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

BrowserSync is enabled out of the box with [Web Starter
Kit](https://developers.google.com/web/starter-kit/), so try it out there or
check out the gulp file for how to integrate it in your own workflow.

If you aren't using Gulp, head on over to the [BrowserSync
site](http://www.browsersync.io/) for alternative approaches to using it.

If interested in running unit tests across browsers/devices, you’ll need a test runner that can run your test suite on these platforms. Some options for this include [Karma](http://karma-runner.github.io/0.12/index.html) and [Yeti](http://www.yuiblog.com/blog/2010/08/25/introducing-yeti-the-yui-easy-testing-interface/).

### Help, I need lots of devices!

You might get by with testing your site on one or two personal devices, but if you really want to be sure your site works on a large user base, you are going to need a lot of devices.
If you've got the budget, you should definitely invest in a device collection.

If you don't have the budget, or you want access to any device, [Device Anywhere](http://www.keynote.com/solutions/testing/mobile-testing) lets you control any number of real devices remotely,
without having to actually own those devices.

{% include modules/nextarticle.liquid %}

{% endwrap %}
