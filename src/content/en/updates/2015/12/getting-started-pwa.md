project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how to get started building Progressive Web Apps

{# wf_updated_on: 2017-10-11 #}
{# wf_published_on: 2015-12-15 #}
{# wf_tags: progressive-web-apps,serviceworker #}
{# wf_featured_image: /web/updates/images/2015/12/getting-started-pwa/pwa-general-0-@1x.jpg #}

# Getting Started with Progressive Web Apps {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}



There's been much welcome discussion about [Progressive Web Apps](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) lately. They're still a relatively new model, but their principles can equally enhance apps built with vanilla JS, React, Polymer, Angular or any other framework. In this post, I'll summarize some options and reference apps for getting started with your own progressive web app today.


## What is a Progressive Web App?

> Progressive Web Apps use modern web capabilities to deliver an app-like user experience. They evolve from pages in browser tabs to immersive, top-level apps, maintaining the web's low friction at every moment.

**It's important to remember that Progressive Web Apps work everywhere but are supercharged in modern browsers. Progressive enhancement is a backbone of the model**.

Aaron Gustafson likened [progressive enhancement](http://alistapart.com/article/understandingprogressiveenhancement) to a peanut M&M. The peanut is your content, the chocolate coating is your presentation layer and your JavaScript is the hard candy shell. This layer can vary in color and the experience can vary depending on the capabilities of the browser using it.

Think of the candy shell as where many Progressive Web App features can live. They are experiences that combine the best of the web and the best of apps. They are useful to users from the very first visit in a browser tab, no install required.

As the user builds a relationship with these apps through repeat use, they make the candy shell even sweeter - loading very fast on slow network connections (thanks to [service worker](/web/fundamentals/getting-started/primers/service-workers)), sending relevant [Push Notifications](/web/fundamentals/push-notifications) and having a first-class icon on the user's home screen that can load them as fullscreen app experiences. They can also take advantage of smart [web app install banners](/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android).

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-0-@1x.jpg" alt="Web app install banners for engagement, launch from the user's home screen, splash screen in Chrome for Android, works offline with service worker"/>

<h4>Progressive Web Apps are:</h4>
<ul>
  <li>
    <b>Progressive</b> - Work for every user, regardless of browser
    choice because they’re built with progressive enhancement as a core
    tenant.
  </li>
  <li>
    <b>Responsive</b> - Fit any form factor, desktop, mobile, tablet, or
    whatever is next.
  </li>
  <li>
    <b>Connectivity independent</b> - Enhanced with service workers to
    work offline or on low quality networks.
  </li>
  <li>
    <b>App-like</b> - Use the app shell model to provide app-style
    navigations and interactions.
  </li>
  <li>
    <b>Fresh</b> - Always up-to-date thanks to the service worker update
    process.
  </li>
  <li>
    <b>Safe</b> - Served via TLS to prevent snooping and ensure content
    hasn’t been tampered with.
  </li>
  <li>
    <b>Discoverable</b> - Are identifiable as “applications” thanks to
    W3C manifests and service worker registration scope allowing search
    engines to find them.
  </li>
  <li>
    <b>Re-engageable</b> - Make re-engagement easy through features like
    push notifications.
  </li>
  <li>
    <b>Installable</b> - Allow users to “keep” apps they find most useful
    on their home screen without the hassle of an app store.
  </li>
  <li>
    <b>Linkable</b> - Easily share via URL and not require complex
    installation.
  </li>
</ul>

Progressive Web Apps also aren't unique to Chrome for Android. Below we can see the [Pokedex](https://pokedex.org) Progressive Web App working in Firefox for Android (Beta) with early Add to home screen and service worker caching features running just fine.

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-ff-@1x.jpg" alt="Progressive web apps working in Firefox for Android"/>

One of the nice aspects of the "progressive" nature to this model is that features can be gradually unlocked as browser vendors ship better support for them. Progressive Web Apps such as Pokedex also of course work great in Opera on Android too with a few [notable](http://www.brucelawson.co.uk/2015/progressive-web-apps-ready-for-primetime/) differences in implementation:

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-6-@1x.jpg" alt="Progressive web apps working in Opera for Android"/>

For diving deeper into Progressive Web Apps, read Alex Russell's original [blog post](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) introducing them. Paul Kinlan also started a very useful [Stack Overflow tag](http://stackoverflow.com/tags/progressive-web-apps/info) for Progressive Web Apps worth checking out.

## Principles

### Web app manifest

> The Manifest for Web applications is a simple JSON file that gives you, the developer, the ability to control how your app appears to the user in the areas that they would expect to see apps (for example the device home screen), direct what the user can launch and more importantly how they can launch it

The manifest enables your web app to have a more native-like presence on the user's home screen. It allows the app to be launched in full-screen mode (without a URL bar being present), provides control over the screen orientation and in recent versions of Chrome on Android supports defining a [Splash Screen](/web/updates/2015/10/splashscreen) and [theme color](/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android) for the address bar. It is also used to define a set of icons by size and density used for the aforementioned Splash screen and home screen icon.

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-1-@1x.jpg" alt="Add to home screen, launch from home screen and full-screen app-like experiences."/>

A sample manifest file can be found in [Web Starter Kit](https://github.com/google/web-starter-kit/blob/master/app/manifest.json) and over in the [Google Chrome samples](https://github.com/GoogleChrome/samples/tree/0768ee71e4548f779219798d8c83fdcc67b469e8/web-application-manifest). Bruce Lawson wrote a [Manifest Generator](http://brucelawson.github.io/manifest/){: .external } and Mounir Lamouri has also written a handy [Web Manifest validator](https://mounirlamouri.github.io/manifest-validator/) worth checking out.

In my personal projects, I rely on [realfavicongenerator](http://realfavicongenerator.net/){: .external } to generate the correctly sized icons for both the web app manifest and for use across iOS, desktop and so on. The [favicons](https://github.com/haydenbleasel/favicons) Node module is also able to achieve a similar output as part of your build process.

Chromium-based browsers (Chrome, Opera etc.) [support](https://www.chromestatus.com/feature/6488656873259008) web app manifests today with Firefox actively developing support and Edge listing them as [under consideration](https://dev.windows.com/en-us/microsoft-edge/platform/status/webapplicationmanifest). WebKit/Safari have not yet posted public signals about their intents to implement the feature just yet.

For more details, read [Installable Web Apps with the Web App Manifest in Chrome for Android](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android) on Web Fundamentals.

### "Add to Home Screen" banner

Chrome on Android has support adding in your site to the home screen for a while now, but recent versions also support proactively suggesting sites be added using native [Web App install banners](/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android).

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-2-@1x.jpg" alt="The voice memos demo application displaying a web app install banner prompt in Chrome for Android"/>

In order for the app install prompts to display your app must:

* Have a valid web app manifest
* Be served over HTTPS (see [letsencrypt](https://letsencrypt.org/){: .external } for a free certificate)
* Have a valid service worker registered
* Be visited twice, with at least 5 minutes between visits

A number of [App Install banner samples](https://github.com/GoogleChrome/samples/tree/gh-pages/app-install-banner) are available, covering [basic banners](https://github.com/GoogleChrome/samples/tree/gh-pages/app-install-banner/basic-banner) through to more complex use-cases like displaying [related applications](https://github.com/GoogleChrome/samples/tree/gh-pages/app-install-banner/related-applications).

### Service worker for offline caching

A [service worker](http://www.w3.org/TR/service-workers/) is a script that runs in the background, separate from your web page. It responds to events, including network requests made from pages it serves. A service worker has an intentionally short lifetime.

It wakes up when it gets an event and runs only as long as it needs to process it. Service worker allows you to use the Cache API to cache resources and can be used to provide users with an offline experience.

Service workers are powerful for offline caching but they also offer significant performance wins in the form of instant loading for repeat visits to your site or web app. You can cache your application shell so it works offline and populate its content using JavaScript.

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-3-@1x.jpg" alt="Service worker caching of the application shell, allowing it to load without the network"/>

A comprehensive set of [service worker samples](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker) are available over on Google Chrome samples. Jake Archibald's [offline cookbook](https://jakearchibald.com/2014/offline-cookbook/) is a must-read and I highly recommend trying out Paul Kinlan's [your first offline web app](/web/fundamentals/getting-started/codelabs/offline/) walkthrough if new to service worker.

Our team also maintains a number of service worker helper utilities and build tools that we find useful for reducing the overhead in getting service worker setup. They're listed over on [Service Worker Libraries](/web/tools/service-worker-libraries/). The two main ones are:

* [sw-precache](https://github.com/GoogleChrome/sw-precache/): a build-time tool that generates a service worker script useful for precaching your web app shell
* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox): a library providing runtime caching for infrequently used resources

Jeff Posnick wrote a quick primer on sw-precache called [Offline-first, fast, with the sw-precache module](/web/updates/2015/02/offline-first-with-sw-precache) and a [codelab](https://www.code-labs.io/codelabs/sw-precache/index.html) on the same tool that you might find useful.

Chrome, Opera and Firefox have all implemented support for service worker with Edge having positive public signals about interest in the feature. Safari briefly mentioned interest in it via one engineer's proposed [five year plan](https://trac.webkit.org/wiki/FiveYearPlanFall2015).

### Push notifications for re-engagement

> Push notifications allow your users to opt-in to timely updates from sites they love and allow you to effectively re-engage them with customized, engaging content.

Effectively, you can build web apps that users can engage with outside of a tab. The browser can be closed and they don't even need to be actively using your web app to engage with your experience. The feature requires both service worker and a web app manifest, building on some of the features summarized earlier.

The Push API is [implemented](https://www.chromestatus.com/features/5416033485586432) in Chrome, in development in Firefox and [under consideration](https://dev.windows.com/en-us/microsoft-edge/platform/status/pushapi) in Edge. There are no public signals from Safari about their intent to implement this feature just yet.

[Push Notifications on the Open Web](/web/updates/2015/03/push-notifications-on-the-open-web) is a comprehensive intro to getting Push setup by Matt Gaunt and a [Push Notifications codelab](/web/fundamentals/getting-started/push-notifications/) is also available on Web Fundamentals.

<img src="/web/updates/images/2015/12/getting-started-pwa/pwa-push.jpg" style="width:300px" alt="Web push notification on the Facebook mobile site"/>

Michael van Ouwerkerk from the Chrome team also has a [6 min intro](/web/shows/google-io/2015/push-notifications) to Push if you're more video inclined.

### Layering in advanced features

**Remember, your user experience can have different levels of sweetness depending on the browser being used to view your web app. You're in control of the hard candy shell.**

Additional features coming to the web platform such as [Background Syncronisation](https://github.com/WICG/BackgroundSync/blob/master/explainer.md) (for data sync with a server even when your web app is closed) and [Web Bluetooth](https://webbluetoothcg.github.io/web-bluetooth/) (for talking to Bluetooth devices from your web app) can also be layered into your Progressive Web App in this manner.

One-shot Background Sync has been [enabled](https://codereview.chromium.org/1514383002/){: .external } in Chrome and Jake Archibald has a [video](https://www.youtube.com/watch?v=wjUCXgM70c0) of his [Offline wikipedia app](https://github.com/jakearchibald/offline-wikipedia) and [article](/web/updates/2015/12/background-sync) demonstrating it in action. Francois Beaufort also has a number of [Web Bluetooth samples](https://googlechrome.github.io/samples/web-bluetooth/) available if interested in trying out that API.

### Framework-friendly

There's really nothing stopping you from applying any of the above principles to an existing application or framework you're building with. A few other principles worth keeping in mind while building your Progressive Web App are the [RAIL](/web/tools/chrome-devtools/profile/evaluate-performance/rail) user-centric performance model and [FLIP](https://aerotwist.com/blog/flip-your-animations/) based animations.

I'm hopeful that during 2016, we'll see an increasing number of boilerplates and seed projects organically baking in support for Progressive Web Apps as a first-class citizen. Until then, the barrier to adding these features to your own apps isn't very high and are IMHO, quite worth the effort.

## Architecture

There are different levels of how "all-in" one goes on the Progressive Web App model, but one common approach taken is architecting them around an Application Shell. This is not a hard requirement, but does come with several benefits.

The [Application Shell architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73#.1s0o3w42k) encourages caching your application shell (the User Interface) so it works offline and populate its content using JavaScript. On repeat visits, this allows you to get meaningful pixels on the screen really fast without the network, even if your content eventually comes from there. This comes with significant performance gains.

<img src="/web/updates/images/2015/12/getting-started-pwa/pwa-application-shell.jpg" alt="The application shell being visualized as breaking down the UI of your app, such as the drawer and the main content area"/>

Jeremy Keith recently [commented](https://adactio.com/journal/9963) that in this type of model perhaps server-side rendering should not be viewed as a fallback but client-side rendering should be looked at as an enhancement. This is fair feedback.

**In the Application Shell model, server-side rendering should be used as much as possible and client-side progressive rendering should be used as an enhancement in the same way that we "enhance" the experience when service worker is supported.** There are many ways this can ultimately be approached.

My recommendation is reading our write-up on the architecture and evaluating how similar principles could be best applied to your own application and stack.

## Getting started boilerplates

### Application shell

[View on GitHub](https://github.com/addyosmani/app-shell)

The `app-shell` repository contains a near-complete implementation of the [Application Shell architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73#.1s0o3w42k). It has a backend written in [Express.js](http://expressjs.com/en/index.html) and a front-end written in ES2015.

Given that it covers both client and server-side portions of the model and there's quite a lot going on there, it will take some time to familiarize yourself with the codebase. It's otherwise our most comprehensive Progressive Web App starting point right now. Docs will be our next focus for this project.

### Polymer starter kit

[View on GitHub](https://github.com/polymerelements/polymer-starter-kit)

The official starting point for [Polymer](https://www.polymer-project.org) web apps supports the following Progressive Web App features:

* Web Application manifest
* Chrome for Android Splashscreen
* Service worker offline caching with the [Platinum SW elements](https://elements.polymer-project.org/elements/platinum-sw)
* Push Notifications (manual setup required) with the [Platinum Push elements](https://elements.polymer-project.org/elements/platinum-push-messaging)

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-polymer-starter-kit-@1x.jpg" alt="Polymer starter kit displaying progressive web app features built in"/>

The current version of PSK is missing support for some of the more advanced performance patterns (e.g Application Shell model, async loading) you find in some Progressive Polymer web apps.

We aim to try baking these patterns into PSK in 2016, but early experiments around this can be found in the Polymer [Zuperkulblog](https://github.com/PolymerLabs/zuperkulblog-progressive) app by Rob Dodson and the excellent [Polymer Perf Patterns](https://www.youtube.com/watch?v=Yr84DpNaMfk) talk by Eric Bidelman.

### Web Starter Kit

[View on GitHub](https://github.com/google/web-starter-kit)

Our opinionated starting point for new vanilla projects includes the following Progressive Web App features:

* Web Application manifest
* Chrome for Android Splashscreen
* Service-worker pre-caching thanks to [sw-precache](https://github.com/GoogleChrome/sw-precache/)

If you have a preference for working with vanilla JS/ES2015 and are unable to use Polymer, Web Starter Kit may prove useful as a reference point you can reuse or steal code snippets from.

## Progressive Web Apps with and without frameworks

A number of open-source Progressive Web Apps have already been built by members of the community both with and without JS libraries and frameworks. If you're looking for inspiration, the below repos might prove useful as reference. They're also just pretty damn good apps.

<img
src="/web/updates/images/2015/12/getting-started-pwa/pwa-general-5-@1x.jpg" alt="Progressive web apps implemented using React, Polymer, Virtual DOM and AngularJS"/>

### Vanilla JavaScript

* [Voice Memos](https://github.com/GoogleChrome/voice-memos) by Paul Lewis is built using a similar architecture to `app-shell` ([write-up](https://aerotwist.com/blog/voice-memos/))
* [Offline Wikipedia](https://github.com/jakearchibald/offline-wikipedia) by Jake Archibald ([video](https://www.youtube.com/watch?v=d5_6yHixpsQ))
* [Air Horner](/web/showcase/spotlight/airhorner) by Paul Kinlan
* [Guitar Tuner](https://guitar-tuner.appspot.com/) by Paul Lewis ([write-up](https://aerotwist.com/blog/guitar-tuner/))

### Polymer

* [Zuperkulblog](https://github.com/PolymerLabs/zuperkulblog-progressive) by Rob Dodson ([slides](https://speakerdeck.com/robdodson/building-progressive-web-apps-with-polymer))

### React

* [iFixit](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo) by Jeff Posnick - uses `sw-precache` for application shell caching ([slides](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15))

### Virtual-DOM

* [Pokedex](https://github.com/nolanlawson/pokedex.org) by Nolan Lawson - excellent progressive web app applying a "do everything in a web worker" approach to help with progressive rendering. ([write-up](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org))

### Angular.js

* [Timey.in](https://github.com/auchenberg/timey) by Kenneth Auchenberg - also uses `sw-precache` for resource precaching

## Closing notes

As mentioned, Progressive Web Apps are still in their infancy but it's an exciting time to play around with the methodologies behind them and see how well they can apply to your own web apps.

Paul Kinlan is currently [planning](https://github.com/google/WebFundamentals/issues/2320) out the Web Fundamentals guidance on Progressive Web Apps and if you have input on areas you would like to see covered, please feel free to comment on-thread.

## Further reading

* [Progressive Web Apps: Escaping Tabs Without Losing Our Soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)
* [Why Progressive Web Apps Are The Future Of Web Development](http://arc.applause.com/2015/11/30/application-shell-architecture/)
* [Progressive Web Apps: ready for primetime](http://www.brucelawson.co.uk/2015/progressive-web-apps-ready-for-primetime/)
* [Making a Progressive App with ServiceWorker](https://ponyfoo.com/articles/progressive-app-serviceworker)
* [Progressive Web Apps Are the Future](https://dev.opera.com/blog/progressive-web-apps-future/)
* [Progressive Web App: A New Way to Experience Mobile](http://tech-blog.flipkart.net/2015/11/progressive-web-app/)
* [Introducing Pokedex.org: a progressive webapp for Pokémon fans](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org)
* [Chrome Developer Summit Recap: Progressive Web Apps](https://medium.com/@davideast/chrome-developer-summit-recap-1137b022b2dc#.nmj5drhvi)





{% include "comment-widget.html" %}
