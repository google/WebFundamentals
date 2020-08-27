project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 84 for developers?

{# wf_published_on: 2020-07-14 #}
{# wf_updated_on: 2020-08-20 #}
{# wf_featured_image: /web/updates/images/2020/07/new-84.jpg #}
{# wf_tags: chrome84,new-in-chrome,progressive-web-apps,install,webanimations,offline,capabilities,wake-lock,webassembly,origintrials #}
{# wf_featured_snippet: Chrome 84 is rolling out now! Users can start common tasks within your app with App Icon Shortcuts. The Web Animations API adds support for a slew of previously unsupported features. Wake Lock, and the Content Indexing API graduate from origin trial. There are new origin trials for Idle detection and SIMD. And there’s a whole bunch more. Let’s dive in and see what’s new for developers in Chrome 84! #}
{# wf_blink_components: N/A #}

# New in Chrome 84 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 84 is starting to roll out to stable now.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="1XBUeaqjTA4"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Here's what you need to know:

* Users can start common tasks within your app, with
  [App Icon Shortcuts](#app-icon-shortcuts).
* The [Web Animations API](#web-animations) adds support for a slew of
  previously unsupported features.
* [Wake lock](#wake-lock) can prevent the screen from dimming or locking.
* The [Content Indexing API](#content-indexing) helps surface content that is
  available offline.
* There are new origin trials for [idle detection](#idle-detection) and
  [Web Assembly SIMD](#wasm-simd).
* [Same Site Cookie policy](#sscp) changes are starting to roll out again.
* And [more](#more).

I’m [Pete LePage](https://twitter.com/petele), working and shooting from home,
let’s dive in and see what’s new for developers in Chrome 84!

<div class="clearfix"></div>

## App icon shortcuts {: #app-icon-shortcuts }

<figure class="attempt-right">
  <img src="/web/updates/images/2020/07/twitter-app-icon-shortcut.jpg">
  <figcaption>
    App icon shortcuts for Twitter's PWA
  </figcaption>
</figure>

App icon shortcuts make it easy for users to quick start common tasks
within your app. For example, compose a new tweet, send a message, or see
their notifications. They’re supported in Chrome for Android.

These shortcuts are invoked by long pressing the app icon on Android. Adding
a shortcut to your PWA is easy,  create a new `shortcuts` property in your web
app manifest, describe the shortcut, and add your icons.

<div class="clearfix"></div>

```json
"shortcuts": [
  {
    "name": "Open Play Later",
    "short_name": "Play Later",
    "description": "View the list you saved for later",
    "url": "/play-later",
    "icons": [
      { "src": "//play-later.png", "sizes": "192x192" }
    ]
  },
]
```

Check out [Getting things done quickly with app shortcuts](https://web.dev/app-shortcuts/)
for complete details.

<div class="clearfix"></div>

## Web animations API {: #web-animations }

Chrome 84 adds a slew of previously unsupported features to the Web
Animations API.

* `animation.ready` and `animation.finished` have been promisified.
* The browser can now cleanup and remove old animations, saving memory and
  improving performance.
* And you can now combine animations using composite modes - with the
  `add` and `accumulate` options.

I simply **can't** do justice to all the improvements or offer good examples
here, so check out
[Web Animations API improvements in Chromium 84](https://web.dev/web-animations/)
for complete details.

<div class="clearfix"></div>

## Content indexing API {: #content-indexing }

<video autoplay loop muted class="attempt-right">
  <source src="/web/updates/images/2020/07/content-indexing.webm" type="video/webm">
  <source src="/web/updates/images/2020/07/content-indexing.mp4" type="video/mp4">
</video>

If your content is available without a network connection. But the user
doesn’t know about it? Is it really available? There’s a discovery problem!

With the Content Indexing API, which just graduated from original trial,
you can add URLs and metadata for content that’s available offline. Using that
metadata, the content is then surfaced to the user, improving discoverability.

<div class="clearfix"></div>

To add content to the index, call `index.add()` on the service worker
registration, and provide the required metadata about the content.

```js
const registration = await navigator.serviceWorker.ready;
await registration.index.add({
  id: 'article-123',
  url: '/articles/123',
  launchUrl: '/articles/123',
  title: 'Article title',
  description: 'Amazing article about things!',
  icons: [{
    src: '/img/article-123.png',
    sizes: '64x64',
    type: 'image/png',
  }],
});
```

Want to see what’s already in your index? Call `index.getAll()` on the service
worker registration.

```js
const registration = await navigator.serviceWorker.ready;
const entries = await registration.index.getAll();
for (const entry of entries) {
  // entry.id, entry.launchUrl, etc. are all exposed.
}
```

See
[Indexing your offline-capable pages with the Content Indexing API](https://web.dev/content-indexing-api/)
for complete details.

<div class="clearfix"></div>

## Wake lock API {: #wake-lock }

<figure class="attempt-right">
  <img src="/web/updates/images/2020/07/wake-lock-enabled.jpg">
  <figcaption>
    Wake lock implementation on the Betty Crocker website.
  </figcaption>
</figure>

I like to cook, but I find it super frustrating when following a recipe,
and the screen saver kicks in! With the wake lock API, which also graduates
from its origin trial in Chrome 84, sites can request a wake lock to prevent
the screen from dimming and locking.

In fact, the Betty Crocker website is using this today, and published a
[case study](https://web.dev/betty-crocker/) on web.dev showing a 300%
increase in purchase intent indicators.

<div class="clearfix"></div>

To get a wake lock, call `navigator.wakeLock.request()`, it returns a
`WakeLockSentinel` object,  used to “release” the wake lock.

```js
// Request the wake lock
const wl = await navigator.wakeLock.request('screen');

// Release the wake lock
wl.release();
```

Of course, there’s a little more to it then that, so check out
[Stay awake with the Screen Wake Lock API](https://web.dev/wakelock/), but at
least my screen won’t be covered in flour any more!

## Origin trials

There are two new origin trials I want to call out. If you're new to origin
trials, check out
[Getting started with Chrome's origin trials](https://web.dev/origin-trials/).

### Idle detection {: #idle-detection }

The Idle Detection API notifies you when a user is idle, indicating they are
potentially away from their computer. This is great for things like chat
applications, or social networking sites, to let users know if their contacts
are available or not.

```js
// Create the idle detector
const idleDetector = new IdleDetector();

// Set up an event listener that fires when idle state changes.
idleDetector.addEventListener('change', () => {
  const uState = idleDetector.userState;
  const sState = idleDetector.screenState;
  console.log(`Idle change: ${uState}, ${sState}.`);
});

// Start the idle detector.
await idleDetector.start({
  threshold: 60000,
  signal,
});
```

See [Detect inactive users with the Idle Detection API](https://web.dev/idle-detection/)
to learn more about the API, and how you can start experimenting with it today.

<div class="clearfix"></div>

### Web Assembly SIMD {: #wasm-simd }

<video autoplay loop muted class="attempt-right">
  <source src="/web/updates/images/2020/07/hand.mp4" type="video/mp4">
</video>

And Web Assembly SIMD starts an [origin trial][ot-simd]. It introduces
operations that map to commonly available SIMD instructions in hardware. SIMD
operations are used to improve performance, especially in multimedia
applications.

To learn more about WebAssembly SIMD, check out
[Fast, parallel applications with WebAssembly SIMD](https://v8.dev/features/simd).

<div class="clearfix"></div>

## And more {: #more }

Chrome 84 is big, but there are a few other important updates I want to point
out.

* We’re resuming the gradual rollout of [SameSite cookie changes][cr-blog-sscookie].
* Sites with abusive permission requests, or abusive notifications, will
  automatically be enrolled in our [quieter notifications UI][cr-blog-quieter].
* There's a new origin trial for [QuicTransport](https://web.dev/quictransport/).

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 84.

* [What's new in Chrome DevTools (84)](/web/updates/2020/05/devtools)
* [Chrome 84 deprecations & removals](/web/updates/2020/05/chrome-84-deps-rems)
* [ChromeStatus.com updates for Chrome 84](https://www.chromestatus.com/features#milestone%3D84)
* [What's new in JavaScript in Chrome 84](https://v8.dev/blog/v8-release-84)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/83.0.4103.64..84.0.4147.92)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and I **still need** a hair cut, but as soon as Chrome 85 is
released, I’ll be right here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[ot-simd]: https://developers.chrome.com/origintrials/#/view_trial/-4708513410415853567
[cr-blog-sscookie]: https://blog.chromium.org/2020/05/resuming-samesite-cookie-changes-in-july.html
[cr-blog-quieter]: https://blog.chromium.org/2020/05/protecting-chrome-users-from-abusive.html
