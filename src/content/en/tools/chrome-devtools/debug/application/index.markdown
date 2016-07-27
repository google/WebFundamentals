---
layout: shared/narrow
title: Debug Progressive Web Apps
description: "Use the Application panel to inspect, modify, and debug web app
manifests, service workers, and service worker caches."
published_on: 2016-07-26
updated_on: 2016-07-26
order: 2
authors:
  - kaycebasques
translation_priority: 0
key-takeaways:
  - Use the <strong>App Manifest</strong> pane to inspect your web app manifest
    and trigger Add to Homescreen events.
  - TODO
  - TODO
related-guides:
  pwas:
    -
      title: "Learn More: Progressive Web Apps"
      href: progressive-web-apps
  manifest:
    -
      title: "Improve user experiences with a Web App Manifest"
      href: fundamentals/engage-and-retain/web-app-manifest
    -
      title: "Using App Install Banners"
      href: fundamentals/engage-and-retain/app-install-banners
  sw:
    -
      title: "Introduction to Service Worker"
      href: fundamentals/primers/service-worker
    -
      title: "Push Notifications: Timely, Relevant, and Precise"
      href: fundamentals/engage-and-retain/push-notifications
  other:
    -
      title:
      href:
    -
      title:
      href:      
---

<p class="intro">Use the <strong>Application</strong> panel to inspect, modify,
and debug web app manifests, service workers, and service worker caches.</p>

{% include shared/related_guides.liquid inline=true list=page.related-guides.pwas %}

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways %}

## Web app manifest {#manifest}

If you want your users to be able to add your app to their mobile homescreens,
you need a web app manifest. The manifest defines how the app appears on the
homescreen, where to direct the user when launching from homescreen, and what
the app looks like on launch.

{% include shared/related_guides.liquid inline=true list=page.related-guides.manifest %}

Once you've got your manifest set up, you can use the **Manifest** pane of the
**Application** panel to inspect it.

![manifest pane][manifest]

* To look at the manifest source, click the link below **App Manifest** label
  (`https://airhorner.com/manifest.json` in the screenshot above).
* Press the **Add to homescreen** button to simulate an Add to Homescreen
  event. Check out the next section for more information.
* The **Identity** and **Presentation** sections just display fields from the
  manifest source in a more user-friendly display.
* The **Icons** section displays every icon that you've specified.

[manifest]: /web/tools/chrome-devtools/debug/progressive-web-apps/images/manifest.png

### Simulate Add to Homescreen events {#add-to-homescreen}

A web app can only be added to a homescreen when the site is visited at
least twice, with at least five minutes between visits. While developing or
debugging your Add to Homescreen workflow, this criteria can be inconvenient.
The **Add to homescreen** button on the **App Manifest** pane lets you
simulate Add to Homescreen events whenever you want.

You can test out this feature with the [Google I/O 2016 progressive web
app](https://events.google.com/io2016/), which has proper support for Add to
Homescreen. Clicking on **Add to Homescreen** while the app is open prompts
Chrome to display the "add this site to your shelf" banner, which is the
desktop equivalent of the "add to homescreen" banner for mobile devices.

![add to desktop shelf][shelf]

**Tip**: Keep the **Console** drawer open while simulating Add to Homescreen
events. The Console tells you if your manifest has any issues and logs other
information about the Add to Homescreen lifecycle.

The **Add to Homescreen** feature cannot yet simulate the workflow for mobile
devices. Notice how the "add to shelf" prompt was triggered in the
screenshot above, even though DevTools is in Device Mode. However, if you can
successfully add your app to your desktop shelf, then it'll work for mobile,
too.

If you want to test out the genuine mobile experience, you can
connect a real mobile device to DevTools via [remote debugging][remote
debugging], and then click the **Add to Homescreen** button (on DevTools)
to trigger the "add to homescreen" prompt on the connected mobile device.

[shelf]: /web/tools/chrome-devtools/debug/progressive-web-apps/images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## Service workers {#service-workers}

Service workers are a fundamental technology in the future web platform. They
are scripts run in the background by the browser, separate from a web page, that
enable you to access features that don't need a web page or user interaction.
Among other features, service workers enable push notifications, background
sync, and offline experiences.

{% include shared/related_guides.liquid inline=true list=page.related-guides.sw %}

The **Service Workers** pane in the **Application** panel is the main place in
DevTools to inspect and debug service workers.

![service worker pane][sw]

* If a service worker is installed to the currently open page, then you'll see
  it listed on this pane. For example, in the screenshot above there's a service
  worker installed for the scope of `https://events.google.com/io2016/`.
* The **Offline** checkbox puts DevTools into offline mode. This is
  equivalent to the offline mode available from the **Network** panel, or
  the `Go offline` option in the [Command Menu][cm].
* The **Update on reload** checkbox forces the service worker to
  update on every page load.
* The **Bypass for network** checkbox bypasses the service worker and forces the
  browser to go to the network for requested resources.
* The **Update** button performs a one-time update of the specified service
  worker.
* The **Push** button emulates a push notification without a payload (also known
  as a [tickle][tickle]).
* The **Sync** button emulates a background sync event.
* The **Unregister** button unregisters the specified service worker. Check out
  [Clear storage](#clear-storage) for a way to unregister a service worker and
  wipe storage and caches with a single button click.
* The **Source** line tells you when the currently running service worker was
  installed. The link is the name of the service worker's source file. Clicking
  on the link sends you to the service worker's source.
* The **Status** line tells you the status of the service worker. The number on
  this line (`#1` in the screenshot above) indicates how many times the service
  worker has been updated. If you enable the **update on reload** checkbox
  you'll notice that the number increments on every page load. Next to the
  status you'll see a **start** button (if the service worker is stopped) or a
  **stop** button (if the service worker is running). Sometimes it's useful to
  stop a service worker to test how a page performs when the service
  worker is not available.
* The **Clients** line tells you the origin that the service worker is scoped
  to. The **focus** button is mostly useful when you've enabled the
  **show all** checkbox. When that checkbox is enabled, all registered service
  workers are listed. If you click on the **focus** button next to a service
  worker that is running in a different tab, Chrome focuses on that tab.

If the service worker causes any errors, a new label called **Errors** shows
up.

![service worker with errors][errors]

[sw]: /web/tools/chrome-devtools/debug/progressive-web-apps/images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/engage-and-retain/push-notifications/sending-messages?hl=en#ways-to-send
[errors]: /web/tools/chrome-devtools/debug/progressive-web-apps/images/sw-error.png

## Service worker caches {#caches}

The **Cache Storage** pane provides a read-only list of resources that have
been cached using the (service worker) [Cache API][sw-cache].

![service worker cache pane][sw-cache-pane]

Note that the first time you open a cache and add a resource to it, DevTools
might not detect the change. Reload the page and you should see the cache.

If you've got two or more caches open, you'll see them listed below the
**Cache Storage** dropdown.

![multiple service worker caches][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: /web/tools/chrome-devtools/debug/progressive-web-apps/images/sw-cache.png
[multiple-caches]: /web/tools/chrome-devtools/debug/progressive-web-apps/images/multiple-caches.png

## More Application panel guides
