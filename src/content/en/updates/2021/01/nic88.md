project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 87 for developers?

{# wf_published_on: 2021-01-19 #}
{# wf_updated_on: 2021-01-19 #}
{# wf_featured_image: /web/updates/images/2021/01/nic88.jpg #}
{# wf_tags: chrome88,new-in-chrome,progressive-web-apps,origintrials #}
{# wf_featured_snippet: Chrome 88 is rolling out now! You can now upload extensions using manifest v 3 to the Chrome Web Store. The aspect-ratio CSS property makes it easy to set the aspect ratio on any element. You can now use Play Billing in your Trusted Web Activity, and there’s plenty more. Let’s dive in and see what’s new for developers in Chrome 88! #}
{# wf_blink_components: N/A #}

# New in Chrome 88 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 88 is starting to roll out to stable now.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="cqAO2xR7lzM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Here's what you need to know:

* You can now upload extensions using [manifest v3](#mv3) to the Chrome Web
  Store.
* The [`aspect-ratio`](#aspect-ratio) CSS property makes it easy to set the
  aspect ratio on any element.
* Chrome 88 will [heavily throttle](#timers) chained JavaScript timers
  for hidden pages in particular conditions.
* You can now use [Play Billing](#play-billing) in your Trusted Web Activity.
* All the videos from [Chrome Dev Summit](#cds) are up.
* And, there’s [plenty more](#more).

I’m [Pete LePage](https://twitter.com/petele), working, and shooting
from home, let’s dive in and see what’s new for developers in Chrome 88!

<div class="clearfix"></div>

## Manifest v3 {: #mv3 }

Chrome 88 now supports extensions built with manifest v3, and you
can upload them to the Chrome Web Store. Manifest v3 is a new extension
platform, that makes Chrome extensions more secure, performant, and privacy
respecting, by default.

<img src="/web/updates/images/2021/01/pillars.png" class="attempt-right">

For example, it disallows remotely hosted code, which helps Chrome Web Store
reviewers better understand what risks an extension poses. And should allow you
to update your extensions faster.

It introduces service workers as a replacement for background pages. Since
service workers are only resident in memory when needed, extensions will use
less system resources.

And to give users greater visibility and control over how extensions use and
share their data, in a future release we will be adopting a new install flow
that allows users to withhold sensitive permissions at install time.

Check out [developer.chrome.com](https://developer.chrome.com/docs/extensions/mv3/)
for complete details, and how to migrate your current extension to manifest v3.

<div class="clearfix"></div>

## CSS `aspect-ratio` property {: #aspect-ratio }

Normally, only some elements have an aspect ratio, for example images.
For them, if only the width, or the height, is specified, the other is
automatically computed using the intrinsic aspect ratio.

```html
<!-- Height is auto-computed from width & aspect ratio -->
<img src="..." style="width: 800px;">
```

In Chrome 88, the `aspect-ratio` property allows you to explicitly specify an
aspect ratio, enabling a similar behavior.

```css
.square {
  aspect-ratio: 1 / 1;
}
```

You can also use progressive enhancement to check if it’s supported in the
browser, and apply a fallback if necessary. Then, with the new CSS 4 `not`
selector, you can make your code a little cleaner!

```css
.square {
  aspect-ratio: 1 / 1;
}

@supports not (aspect-ratio: 1 / 1) {
  .square {
    height: 4rem;
    width: 4rem;
  }
}
```

Thanks to [Jen Simmons](https://twitter.com/jensimmons/status/1347287421633892356)
for calling out this is supported in the latest Safari Technical Preview,
so we should see it in Safari soon! And check out
[Una's demo](https://codepen.io/una/pen/BazyaOM) to see it in action.

## Heavy throttling of chained JS timers {: #timers }

Chrome 88 will heavily throttle chained JavaScript timers for hidden pages in
particular conditions. This will reduce CPU usage, which will also reduce
battery usage. There are some edge cases where this will change behavior,
but timers are often used where a different API would be more efficient, and
more reliable.

That was pretty jargon heavy, and a bit ambiguous, so check out Jake's article
[Heavy throttling of chained JS timers beginning in Chrome 88](https://developer.chrome.com/blog/timer-throttling-in-chrome-88/)
on developer.chrome.com for all the details.


## Play billing in Trusted Web Activity {: #play-billing }

You can now use Play Billing in your Trusted Web Activity to sell digital
goods and subscriptions using the new Digital Goods API. It’s available as an
origin trial in Chrome 88 on Android, and we expect it to expand the origin
trial to Chrome OS in the next release.

Once your accounts are set-up, update your Trusted Web Activity to enable Play
billing, and create your digital goods in the Play Developer Console. Then,
in your PWA, add your origin trial token, and you’re ready to add the code
to check for existing purchases, query for available purchases, and make new
purchases.

```js
// Get list of potential digital goods

const itemService =
  await window.getDigitalGoodsService("https://play.google.com/billing");

const details =
  await itemService.getDetails(['ripe_bananas', 'walnuts', 'pecans' ]);
```

Adriana and Andre go into more detail in their Chrome Dev Summit talk -
[What’s new for web apps in Play](https://www.youtube.com/watch?v=K_TTyg2wJWM),
or check out the [docs](/web/android/trusted-web-activity/play-billing).

## And more {: #more }

And of course there’s plenty more.

* To conform to a change in the HTML standard, anchor tags with `target="_blank"`
  will now imply `rel="noopener"` by default, this helps prevent
  tab-napping attacks.
* Most operating systems enable mouse acceleration by default, but that can be
  a problem for some games. In Chrome 88, the Pointer Lock API allows you to
  [disable mouse acceleration](https://web.dev/disable-mouse-acceleration/).
  That means the same physical motion, slow or fast, results in the same
  rotation, providing a better gaming experience and higher accuracy.
* And [`addEventListener` now takes an Abort Signal as an option](https://www.chromestatus.com/feature/5658622220566528).
  Calling `abort()` removes that event listener, making it easy to shut down
  event listeners when no longer needed.

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 87.

* [What's new in Chrome DevTools (88)](/web/updates/2020/11/devtools)
* [Chrome 88 deprecations & removals](/web/updates/2020/12/chrome-88-deps-rems)
* [ChromeStatus.com updates for Chrome 88](https://www.chromestatus.com/features#milestone%3D88)
* [What's new in JavaScript in Chrome 88](https://v8.dev/blog/v8-release-88)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/87.0.4280.65..88.0.4324.98)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video.

I’m Pete LePage, and as soon as Chrome 89 is released, I’ll be right here to
tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
