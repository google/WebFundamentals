project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 79 for developers?

{# wf_published_on: 2019-12-10 #}
{# wf_updated_on: 2019-12-10 #}
{# wf_featured_image: /web/updates/images/2019/12/new-79.jpg #}
{# wf_tags: chrome79,new-in-chrome,progressive-web-apps,webxr,install,capabilities,origintrials,chromedevsummit #}
{# wf_featured_snippet: Chrome 79 is rolling out now! Installed Progressive Web Apps on Android get support for maskable icons. You can now create immersive experiences with the WebXR Device API. Origin trials start for the Wake Lock API, and the <code>rendersubtree</code> attribute. And all of the videos from Chrome Dev Summit 2019 are now online. Let’s dive in and see what’s new for developers in Chrome 79! #}
{# wf_blink_components: N/A #}

# New in Chrome 79 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 79 is rolling out now!

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="L0OB0_bO5I0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Installed Progressive Web Apps on Android now support
  [maskable icons](#maskable-icons).
* You can now create immersive experiences with the [WebXR Device API](#webxr).
* The [Wake Lock API](#wake-lock) is available as an origin trial.
* The [`rendersubtree` attribute](#rendersubtree) is available as an origin
  trial.
* Videos from the [Chrome DevSummit](#cds2019) are now online.
* And plenty more.

I’m [Pete LePage](https://petelepage.com/), let’s dive in and see what’s
new for developers in Chrome 79!

<div class="clearfix"></div>

## Maskable Icons {: #maskable-icons }

If you’re running Android O or later, and you’ve installed a Progressive Web
App, you’ve probably noticed the annoying white circle around the icon.

<video autoplay loop muted class="attempt-right">
  <source src="/web/updates/images/2019/12/maskable.webm" type="video/webm">
  <source src="/web/updates/images/2019/12/maskable.mp4" type="video/mp4">
</video>

Thankfully, Chrome 79 now supports maskable icons for installed Progressive
Web Apps.You’ll need to design your icon to fit within the safe zone -
essentially a circle with a diameter that’s 80% of the canvas.

<div class="clearfix"></div>

Then, in the web app manifest, you’ll need to add a new `purpose` property to
the icon, and set its value to `maskable`.

```json
{
  ...
  "icons": [
    ...
    {
      "src": "path/to/maskable_icon.png",
      "sizes": "196x196",
      "type": "image/png",
      "purpose": "maskable"
  ]
  ...
}
```

Tiger Oakes has a great post on CSS Tricks - [Maskable Icons: Android Adaptive
Icons for Your PWA][oakes-maskable] with all of the details, and has a great
tool you can use for testing your icons to make sure they’ll fit.

[oakes-maskable]: https://css-tricks.com/maskable-icons-android-adaptive-icons-for-your-pwa/

<div class="clearfix"></div>

## Web XR {: #webxr }

You can now create immersive experiences for smartphones and head-mounted
displays with the WebXR Device API.

WebXR enables a whole spectrum of immersive experiences. From using augmented
reality to see what a new couch might look like in your home before you buy
it, to virtual reality games and 360 degree movies, and more.

To get started with the new API, read [Virtual Reality Comes to the Web][webxr].

[webxr]: https://blog.chromium.org/2019/10/chrome-79-beta-virtual-reality-comes-to.html

<div class="clearfix"></div>

## New origin trials {: #origin-trials }

Origin trials provide an opportunity for us to validate experimental features
and APIs, and make it possible for you to provide feedback on their usability
and effectiveness in broader deployment.

<a href="https://developers.chrome.com/origintrials/#/trials/active">
  <img src="/web/updates/images/2019/10/ot-landing.png" class="attempt-right">
</a>

Experimental features are typically only available behind a flag, but when we
offer an Origin Trial for a feature, you can register for that origin trial
to enable the feature for all users on your origin.

Opting into an origin trial allows you to build demos and prototypes that
your beta testing users can try for the duration of the trial without
requiring them to flip any special flags in Chrome.

There’s more info on origin trials in the
[Origin Trials Guide for Web Developers][ot-for-web-devs]. You can see a list
of active origin trials, and sign up for them on the
[Chrome Origin Trials][ot-listing] page.

[ot-for-web-devs]: https://googlechrome.github.io/OriginTrials/developer-guide.html
[ot-listing]: https://developers.chrome.com/origintrials/#/trials/active

<div class="clearfix"></div>

### Wake Lock {: #wake-lock }

One of my biggest pet peeves about Google Slides is that if you leave the
deck open on a single slide for too long, the screensaver kicks in. Before you
can continue, you need to unlock your computer. Ugh.

But, with the new Wake Lock API, a page can request a lock, and prevent the
screen from dimming or the screensaver from kicking in. It’s perfect for
Slides, but it’s also helpful for things like recipe sites - where you might
want to keep the screen on while you follow the instructions.

To request a wake lock, you need to call `navigator.wakeLock.request()`, and
save the `WakeLockSentinel` object that it returns.

```js
// The wake lock sentinel.
let wakeLock = null;

// Function that attempts to request a wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
    console.log('Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};
```

The lock is maintained until the user navigates away from the page, or you call
`release` on the `WakeLockSentinel` object you saved earlier.

```js
// Function that attempts to release the wake lock.
const releaseWakeLock = async () => {
  if (!wakeLock) {
    return;
  }
  try {
    await wakeLock.release();
    wakeLock = null;
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};
```

More details are at [web.dev/wakelock](https://web.dev/wakelock).

<div class="clearfix"></div>

### `rendersubtree` attribute {: #rendersubtree }

There are times when you don’t want part of the DOM to render immediately.
For example scrollers with a large amount of content, or tabbed UIs where
only some of the content is visible at any given time.

The new `rendersubtree` attribute tells the browser it can skip rendering that
subtree. This allows the browser to spend more time processing the rest of the
page, increasing performance.

When `rendersubtree` is set to `invisible`, the element's content is not
drawn or hit-tested, allowing for rendering optimizations.

Changing the `rendersubtree` to `activatable`, makes the content visible by
removing the `invisible` attribute, and rendering the content.

<div class="clearfix"></div>

## Chrome Dev Summit 2019 {: #cds2019 }

<a href="https://www.youtube.com/playlist?list=PLNYkxOF6rcIDA1uGhqy45bqlul0VcvKMr">
  <img src="/web/updates/images/2019/10/cds-2019.png" class="attempt-right">
</a>

If you missed Chrome Dev Summit, all of the talks are on our
[YouTube channel][cds-playlist].

Jake also has a great [Twitter thread][cds-thread] with all the fun stuff that
went on between the talks, including the newest member of our team,
[Surjiko](https://twitter.com/surjiko).

[cds-playlist]: https://www.youtube.com/playlist?list=PLNYkxOF6rcIDA1uGhqy45bqlul0VcvKMr
[cds-thread]: https://twitter.com/jaffathecake/status/1197190886821466113

<div class="clearfix"></div>

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 78.

* [What's new in Chrome DevTools (79)](/web/updates/2019/10/devtools)
* [Chrome 79 deprecations & removals](/web/updates/2019/10/chrome-79-deps-rems)
* [ChromeStatus.com updates for Chrome 79](https://www.chromestatus.com/features#milestone%3D79)
* [What's new in JavaScript in Chrome 79](https://v8.dev/blog/v8-release-79)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/78.0.3904.72..79.0.3945.82)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 80 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
