---
layout: updates/post
title: "Instant Loading Web Apps with An Application Shell Architecture"
description: "Application shell architecture is a method of building progressive
web apps today, taking advantage of a range of technologies."
published_on: 2015-11-17
updated_on: 2015-11-17
authors:
  - addyosmani
  - mattgaunt
tags:
  - app-shell
  - serviceworker
featured_image: /web/updates/images/2015/11/appshell/app-shell-browsers.jpg
---

{% include shared/toc.liquid %}


An **application shell** is the minimal HTML, CSS, and JavaScript powering a user interface. The application shell should:

* load fast
* be cached 
* dynamically display content

An application shell is the secret to reliably good performance. Think of your app's shell like the bundle of code you'd publish to an app store if you were building a native app. It's the load needed to get off the ground, but might not be the whole story. It keeps your UI local and pulls in content dynamically through an API.

![App Shell Separation of HTML, JS and CSS shell and the HTML Content]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/appshell-1.jpg)

# Background

Alex Russell's [Progressive Web Apps](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) article describes how a web app can *progressively* change through use and user consent to provide a more native-app-like experience complete with offline support, push notifications and the ability to be added to the home screen. It depends very much on the functionality and performance benefits of [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) and their caching abilities. This allows you to focus on **speed**, giving your web apps the same **instant loading** and regular updates you're used to seeing in native applications.

To take full advantage of these capabilities we need a new way of thinking about web sites: the **application shell architecture**.

Let's dive into how to structure your app using a **service worker augmented
application shell architecture**. We'll look at both client and server-side rendering and share an end-to-end sample you can try today.

To emphasize the point, the example below shows the first load of an app using this architecture. Notice the 'App is ready for offline use' toast at the bottom of the screen. If an update to the shell becomes available later, we can inform the user to refresh for the new version.

![Image of service worker running in DevTools for the application shell]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_1.png)

## What are Service Workers, Again?

A service worker is a script that runs in the background, separate from your web page. It responds to events, including network requests made from pages it serves and push notices from your server. A service worker has an intentionally short lifetime. It wakes up when it gets an event and runs only as long as it needs to process it.

Service workers also have a limited set of APIs when compared to JavaScript in a normal browsing context. This is standard for [workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) on the web. A Service worker can’t access the DOM but can access things like the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache), and they can make network requests using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). The [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and [postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage) are also available to use for data persistence and messaging between the service worker and pages it controls. [Push events](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onpush) sent from your server can invoke the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) to increase user engagement.

A service worker can intercept network requests made from a page (which triggers a fetch event on the service worker) and return a response retrieved from the network, or retrieved from a local cache, or even constructed programmatically. Effectively, it's a programmable proxy in the browser.  The neat part is that, regardless of where the response comes from, it looks to the web page as though there were no service worker involvement.

To learn more about service workers in depth, read an [Introduction to Service Workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/).

# Performance Benefits

Service workers are powerful for offline caching but they also offer significant  performance wins in the form of instant loading for repeat visits to your site or web app.  You can cache your application shell so it works offline and populate its content using JavaScript.

On repeat visits, this allows you to get **meaningful pixels** on the screen without the network, even if your content eventually comes from there. Think of it as displaying toolbars and cards **immediately**, then loading the rest of your content **progressively**.

To test this architecture on real devices, we’ve run our [application shell sample](https://github.com/GoogleChrome/application-shell/) on [WebPageTest.org](http://www.webpagetest.org/) and shown the results below.

**Test 1:** [Testing on Cable with a Nexus 5 using Chrome Dev](http://www.webpagetest.org/result/151113_8S_G68/)

The first view of the app has to fetch all the resources from the network and doesn’t achieve a meaningful paint until **1.2 seconds** in. Thanks to service worker caching, our repeat visit achieves meaningful paint and fully finishes loading in **0.5 seconds**.

[![Web Page Test Paint Diagram for Cable Connection]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_2.png)](https://youtu.be/bsAefxnSRZU)

**Test 2:** [Testing on 3G with a Nexus 5 using Chrome Dev](http://www.webpagetest.org/result/151112_8R_YQN/)

We can also test our sample with a slightly slower 3G connection. This time it takes **2.5 seconds** on first visit for our first meaningful paint. It takes [**7.1 seconds**](http://www.webpagetest.org/video/view.php?id=151112_8R_YQN.3.0) to fully load the page. With service worker caching, our repeat visit achieves meaningful paint and fully finishes loading in [**0.8 seconds**](http://www.webpagetest.org/video/view.php?id=151112_8R_YQN.3.1).

[![Web Page Test Paint Diagram for 3G Connection]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_3.png)](https://youtu.be/488XbwCKf5g)

[Other views](http://www.webpagetest.org/result/151112_HH_11D0/) tell a similar story. Compare the **3 seconds** it takes to achieve first meaningful paint in the application shell:

![Paint timeline for first view from Web Page Test]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_4.png)

to the **0.9 seconds** it takes when the same page is loaded from our service worker cache. Over 2 seconds of time is saved for our end users.

![Paint timeline for repeat view from Web Page Test]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_5.png)

Similar and reliable performance wins are possible for your own applications using the application shell architecture.

# Does Service Worker Require us to Rethink How We Structure Apps?

Service workers imply some subtle changes in application architecture. Rather than squashing all of your application into an HTML string, it can be beneficial to do things AJAX-style. This is where you have a shell (that is always cached and can always boot up without the network) and content that is refreshed regularly and managed separately.

The implications of this split are large. On the first visit you can render content on the server and install the service worker on the client. On subsequent visits you need only request data.

# What about Progressive Enhancement?

While service worker isn’t currently supported by all browsers, the application content shell architecture uses [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) to ensure everyone can access the content. For example, take our sample project.

Below you can see the full version rendered in Chrome, Firefox Nightly and Safari. On the very left you can see the Safari version where the content is rendered on the server _without_ a service worker. On the right we see the Chrome and Firefox Nightly versions powered by service worker.

![Image of Application Shell loaded in Safari, Chrome and Firefox]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/app-shell-browsers.jpg)

# When Does it Make Sense to Use This Architecture?

The application shell architecture makes the most sense for apps and sites that are dynamic. If your site is small and static, you probably don't need an application shell and can simply cache the whole site in a service worker `oninstall` step. Use the approach that makes the most sense for your project. A number of JavaScript frameworks already encourage splitting your application logic from the content, making this pattern more straight-forward to apply.

# Are There any Production Apps Using this Pattern Yet?

The application shell architecture is possible with just a few changes to your overall application’s UI and has worked well for large-scale sites such as Google’s [I/O 2015 Progressive Web App](https://developers.google.com/web/showcase/case-study/service-workers-iowa) and Google’s Inbox.

![Image of Google Inbox loading. Illustrates Inbox using service worker.]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_7.png)

Offline application shells are a major performance win and are also demonstrated well in Jake Archibald’s [offline Wikipedia app](https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty) and [Flipkart Lite](http://tech-blog.flipkart.net/2015/11/progressive-web-app/)’s progressive web app.

![Screenshots of Jake Archibald's Wikipedia Demo.]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/wikipedia.jpg)

# Explaining the Architecture

During the first load experience, your goal is to get meaningful content to the user’s screen as quickly as possible.

## First Load and Loading Other Pages

![Diagram of the First Load with the App Shell]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/first-load.png)

**In general the application shell architecture will:**

* Prioritize the initial load, but let service worker cache the application shell so repeat visits do not require the shell to be re-fetched from the network.

* Lazy-load or background load everything else. One good option is to use [read-through caching](https://googlechrome.github.io/samples/service-worker/read-through-caching/) for dynamic content.

* Use service worker tools, such as [sw-precache](https://github.com/GoogleChrome/sw-precache), for example to reliably cache and update the service worker that manages your static content. (More about sw-precache later.)

**To achieve this:**

* **Server** will send HTML content that the client can render and use far-future HTTP cache expiration headers to account for browsers without service worker support. It will serve filenames using hashes to enable both ‘versioning’ and easy updates for later in the application lifecycle.

* **Page(s)** will include inline CSS styles in a `<style>` tag within the document `<head>` to provide a fast first paint of the application shell. Each page will asynchronously load the JavaScript necessary for the current view. Because CSS cannot be asynchronously loaded, we can request styles using JavaScript as it IS asynchronous rather than parser-driven and synchronous. We can also take advantage of [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to avoid cases where we might get a fast cache hit and end up with styles accidentally becoming part of the critical rendering path. `requestAnimationFrame()` forces the first frame to be painted before the styles to be loaded. Another option is to use projects such as Filament Group’s [loadCSS](https://github.com/filamentgroup/loadCSS) to request CSS asynchronously using JavaScript.

* **Service worker** will store a cached entry of the application shell so that on repeat visits, the shell can be loaded entirely from the service worker cache unless an update is available on the network.

![App Shell for Content]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/inline.jpg)

# A Practical Implementation

We’ve written a fully working [sample](https://github.com/GoogleChrome/application-shell) using the application shell architecture, vanilla ES2015 JavaScript for the client, and Express.js for the server. There is of course nothing stopping you from using your own stack for either the client or the server portions (e.g PHP, Ruby, Python). 

## Service Worker Lifecycle

For our application shell project, we use [sw-precache](https://github.com/GoogleChrome/sw-precache/) which offers the following service worker lifecycle:

<table>
  <tr>
    <th>Event</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>Install</td>
    <td>Cache the application shell and other single page app resources.</td>
  </tr>
  <tr>
    <td>Activate</td>
    <td>Clear out old caches.</td>
  </tr>
  <tr>
    <td>Fetch</td>
    <td>Serve up a single page web app for URL's and use the cache for assets and predefined partials. Use network for other requests.</td>
  </tr>
</table>


## Server Bits

In this architecture, a server side component (in our case, written in Express) should be able to treat content and presentation separately. Content could be added to an HTML layout that results in a static render of the page, or it could be served separately and dynamically loaded.

Understandably, your server-side setup may drastically differ from the one we use for our demo app. This pattern of web apps is achievable by most server setups, though it **does** require some rearchitecting. We’ve found that the following model works quite well:

![Diagram of the App Shell Architecture]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/appshell-architecture.png)

* Endpoints are defined for three parts of your application: the user facing URL’s (index/wildcard), the application shell (service worker) and your HTML partials.

* Each endpoint has a controller that pulls in a [handlebars](https://www.npmjs.com/package/handlebars-layouts) layout which in turn can pull in handlebar partials and views. Simply put, partials are views that are chunks of HTML that are copied into the final page. 
**Note:** JavaScript frameworks that do more advanced data synchronization are often way easier to port to an Application Shell architecture. They tend to use data-binding and sync rather than partials.

* The user is initially served a static page with content. This page registers a service worker, if it’s supported, which caches the application shell and everything it depends on (CSS, JS etc).

* The app shell will then act as a single page web app, using javascript to XHR in the content for a specific URL. The XHR calls are made to a /partials* endpoint which returns the small chunk of HTML, CSS and JS needed to display that content. 
**Note:** There are many ways to approach this and XHR is just one of them. Some applications will inline their data (maybe using JSON) for initial render and therefore aren’t "static" in the flattened HTML sense.

* Browsers **without** service worker support should always be served a fall-back experience. In our demo, we fall back to basic static server-side rendering, but this is only one of many options. The service worker aspect provides you with new opportunities for enhancing the performance of your Single-page Application style app using the cached application shell.

## File Versioning

One question that arises is how to handle file versioning and updating. This is application specific and the options are:

* Network first and use the cached version otherwise.

* Network only and fail if offline.

* Cache the old version and update later.

For the application shell itself, a cache-first approach should be taken for your service worker setup. If you aren’t caching the application shell, you haven’t properly adopted the architecture.

**Note:** The application shell sample does not (at the time of writing) use file versioning for the assets referenced in the static render, often used for cache busting. **We hope to add this in the near future.** The service worker is otherwise versioned by sw-precache (covered in the [Tooling](#tooling) section).

## Tooling

We maintain a number of different [service worker helper libraries](https://developers.google.com/web/tools/service-worker-libraries/?hl=en) that make the process of precaching your application’s shell or handling common caching patterns easier to setup.

![Screenshot of the Service Worker Library Site on Web Fundamentals]({{site.WFBaseUrl}}/updates/images/2015/11/appshell/image_10.png)

### Use sw-precache for Your Application Shell

Using [sw-precache](https://github.com/GoogleChrome/sw-precache) to cache the application shell should handle the concerns around file revisions, the install/activate questions, and the fetch scenario for the app shell.  Drop sw-precache into your application’s build process and use configurable wildcards to pick up your static resources. Rather than manually hand-crafting your service worker script, let sw-precache generate one that manages your cache in a safe and efficient, using a cache-first fetch handler.

Initial visits to your app trigger precaching of the complete set of needed resources. This is similar to the experience of installing a native app from an app store. When users return to your app, only updated resources are downloaded. In our demo, we inform users when a new shell is available with  the message, "App updates. Refresh for the new version." This pattern is a low-friction way of letting users know they can refresh for the latest version.

### Use sw-toolbox for Runtime Caching

Use [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) for runtime caching with varying strategies depending on the resource:

* [cacheFirst](https://github.com/GoogleChrome/sw-toolbox#toolboxcachefirst) for images, along with a dedicated named cache that has a custom expiration policy of N maxEntries.

* [networkFirst](https://github.com/GoogleChrome/sw-toolbox#toolboxnetworkfirst) or fastest for API requests, depending on the desired content freshness. Fastest might be fine, but if there’s a specific API feed that's updated frequently, use networkFirst.

# Conclusion

Application shell architectures comes with several benefits but only makes sense for some classes of applications. The model is still young and it will be worth evaluating the effort and overall performance benefits of this architecture.

In our experiments, we took advantage of template sharing between the client and server to minimise the work of building two application layers. This ensures progressive enhancement is still a first-class citizen.

If you’re already considering using service workers in your app, take a look at the architecture and evaluate if it makes sense for your own projects.

_With thanks to our reviewers: Jeff Posnick, Paul Lewis, Alex Russell, Seth Thompson, Rob Dodson, Taylor Savage and Joe Medley._
