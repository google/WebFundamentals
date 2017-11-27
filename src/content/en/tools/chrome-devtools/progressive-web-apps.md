project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Use the Application panel to inspect, modify, and debug web app manifests, service workers, and service worker caches.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Debug Progressive Web Apps {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Use the <strong>Application</strong> panel to inspect, modify,
and debug web app manifests, service workers, and service worker caches.

Related Guides: 

* [Progressive Web Apps](/web/progressive-web-apps)

This guide only discusses the Progressive Web App features of the
**Application** panel. If you're looking for help on the other panes, check
out the last section of this guide, [Other Application panel
guides](#other).


### TL;DR {: .hide-from-toc }
- Use the <strong>App Manifest</strong> pane to inspect your web app manifest and trigger Add to Homescreen events.
- Use the <strong>Service Worker</strong> pane for a whole range of service-worker-related tasks, like unregistering or updating a service, emulating push events, going offline, or stopping a service worker.
- View your service worker cache from the <strong>Cache Storage</strong> pane.
- Unregister a service worker and clear all storage and caches with a single button click from the <strong>Clear Storage</strong> pane.


## Web app manifest {:#manifest}

If you want your users to be able to add your app to their mobile homescreens,
you need a web app manifest. The manifest defines how the app appears on the
homescreen, where to direct the user when launching from homescreen, and what
the app looks like on launch.

Related Guides:

* [Improve user experiences with a Web App
  Manifest](/web/fundamentals/web-app-manifest)
* [Using App Install
  Banners](/web/fundamentals/app-install-banners)

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

[manifest]: images/manifest.png

### Simulate Add to Homescreen events {:#add-to-homescreen}

A web app can only be added to a homescreen when the site is visited at
least twice, with at least five minutes between visits. While developing or
debugging your Add to Homescreen workflow, this criteria can be inconvenient.
The **Add to homescreen** button on the **App Manifest** pane lets you
simulate Add to Homescreen events whenever you want.

You can test out this feature with the [Google I/O 2016 progressive web
app](https://events.google.com/io2016/){: .external }, which has proper support for Add to
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

[shelf]: images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## Service workers {:#service-workers}

Service workers are a fundamental technology in the future web platform. They
are scripts that the browser runs in the background, separate from a web page.
These scripts enable you to access features that don't need a web page or user
interaction, like push notifications, background sync, and offline experiences.

Related Guides:

* [Intro to Service Workers](/web/fundamentals/primers/service-worker)
* [Push Notifications: Timely, Relevant, and
  Precise](/web/fundamentals/push-notifications)

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
  **stop** button (if the service worker is running). Service workers are
  designed to be stopped and started by the browser at any time. Explicitly
  stopping your service worker using the **stop** button can simulate that.
  Stopping your service worker is a great way to test how your
  code behaves when the service worker starts back up again. It frequently
  reveals bugs due to faulty assumptions about persistent global state.
* The **Clients** line tells you the origin that the service worker is scoped
  to. The **focus** button is mostly useful when you've enabled the
  **show all** checkbox. When that checkbox is enabled, all registered service
  workers are listed. If you click on the **focus** button next to a service
  worker that is running in a different tab, Chrome focuses on that tab.

If the service worker causes any errors, a new label called **Errors** shows
up.

![service worker with errors][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/ui#command-menu
[tickle]: /web/fundamentals/push-notifications/how-push-works
[errors]: images/sw-error.png

## Service worker caches {:#caches}

The **Cache Storage** pane provides a read-only list of resources that have
been cached using the (service worker) [Cache API][sw-cache].

![service worker cache pane][sw-cache-pane]

Note that the first time you open a cache and add a resource to it, DevTools
might not detect the change. Reload the page and you should see the cache.

If you've got two or more caches open, you'll see them listed below the
**Cache Storage** dropdown.

![multiple service worker caches][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

## Clear storage {:#clear-storage}

The **Clear Storage** pane is a very useful feature when
developing progressive web apps. This pane lets you unregister service workers
and clear all caches and storage with a single button click. Check out the
section below to learn more.

Related Guides:

* [Clear
  Storage](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)

## Other Application panel guides {:#other}

Check out the guides below for more help on the other panes of the
**Application** panel.

Related Guides:

* [Inspect page resources](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [Inspect and manage local storage and
  caches](/web/tools/chrome-devtools/iterate/manage-data/local-storage)
