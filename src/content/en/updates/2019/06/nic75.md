project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 75 for developers?

{# wf_published_on: 2019-06-04 #}
{# wf_updated_on: 2019-06-10 #}
{# wf_featured_image: /web/updates/images/2019/06/nic075.jpg #}
{# wf_tags: chrome75,new-in-chrome,canvas,performance,google-io,graphics,sharing #}
{# wf_featured_snippet: Chrome 75 is rolling out now. There’s a new way to reduce latency on <code>canvas</code> elements. Web apps can now share files to other installed apps using the system level share sheet. All of talks from Google I/O are on our YouTube channel. And plenty more. Let’s dive in and see what’s new for developers in Chrome 75! #}
{# wf_blink_components: N/A #}

# New in Chrome 75 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="_BtaAIhC2UU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

In Chrome 75, we've added support for:

* There's a new way to [reduce latency on `canvas` elements](#desync).
* Web apps can now [share files](#share-files) to other installed apps
  using the system level share sheet.
* Numeric literals now allow [underscores as separators](#num-sep) to make
  them more readable.
* Google I/O 2019 is a wrap and all of [talks](#io-talks) are on our
  YouTube channel.

I’m [Pete LePage](https://mobile.twitter.com/petele), let’s dive in and see
what’s new for developers in Chrome 75!

<div class="clearfix"></div>

### Change log {: .hide-from-toc }

This covers only some of the key highlights, check the links below for
additional changes in Chrome 75.

* [What's new in Chrome DevTools (75)](/web/updates/2019/04/devtools)
* [Chrome 75 deprecations & removals](/web/updates/2019/05/chrome-75-deps-rems)
* [ChromeStatus.com updates for Chrome 75](https://www.chromestatus.com/features#milestone%3D75)
* [What's new in JavaScript in Chrome 75](https://v8.dev/blog/v8-release-75)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/74.0.3729.108..75.0.3770.67)

## Hint for low latency `canvas` contexts {: #desync }

<img class="attempt-right"
     src="/web/updates/images/2019/06/balazs-ketyi-1410250-unsplash-small.jpg">

Drawing on screen with the canvas element requires the page to synchronize
graphics updates with the DOM. This synchronization can sometimes cause latency.
For example, in a drawing app, latencies longer than 50 milliseconds can
interfere with hand-eye coordination, making them difficult to use.

The `desynchronized` hint, when creating a `canvas` context, uses a different
code path, that bypasses the usual DOM update mechanism. The hint tells the
system to skip as much compositing as it can. In some cases, the `canvas`'s
underlying buffer is sent directly to the screen's display controller. This
eliminates the latency that would be caused by using the renderer compositor
queue.

<div class="clearfix"></div>

Using the desynchronized hint is simple, just add `desynchronized: true` to
the options object when creating the canvas.

```js
const opts = { desynchronized: true };
const ctx = canvas.getContext('2d', opts);
```

Check out Joe’s article [Low-latency rendering with the desynchronized hint][ll-desync]
for more details, including how to do feature detection for it.

[ll-desync]: /web/updates/2019/05/desynchronized

<div class="clearfix"></div>

## Share files with the Web Share API {: #share-files }

<video class="attempt-right" autoplay loop muted>
  <source src="/web/updates/images/2019/06/web-share-from-myntra-to-twitter.webm"
          type="video/webm"/>
  <source src="/web/updates/images/2019/06/web-share-from-myntra-to-twitter.mp4"
          type="video/mp4" />
</video>

The [Web Share API](/web/updates/2016/09/navigator-share) allows you to plug
into the share service provided by the OS, making it easy to share web pages
and apps with other installed apps on the user's device.

In Chrome 75, the Web Share API now supports the sharing of files! I’m
particularly excited about this because it makes it way easier for apps to
share photos, videos and more. Squoosh is adding support for this to share a
file once you’ve finished compressing it. The Web Share API currently supports
the sharing of [audio files, images, videos, and text documents][web-share-ok].

It’s best to use feature detection to see if the Web Share API is supported,
and fallback to your traditional mechanism if it’s not. And you can use
`navigator.canShare` to check if file sharing is supported.

```js
const webShareAvailable = {
  links: 'share' in navigator,
  files: 'canShare' in navigator,
};
```

If `navigator.canShare` returns `true`, sharing of those files is supported,
so you can call `navigator.share`, and pass an object with the array of files
you want to share. Chrome will open the system share sheet and give you a
list of installed apps that you can share the files to.

```js
if (webShareAvailable.files) {
  const shareData = { files: filesArray };
  if (navigator.canShare(shareData)) {
    shareData.title = 'Squooshed files.';
    navigator.share(shareData)
      .then(...)
      .catch(...);
  } else {
    // File sharing not supported
  }
}
```

Try the [demo][file-share-demo] and check out the article
[Share files with Web Share][web-share-files] for complete details.

[web-share-files]: /web/updates/2019/05/web-share-files
[file-share-demo]: https://wicg.github.io/web-share/demos/share-files.html
[web-share-ok]: https://docs.google.com/document/d/1tKPkHA5nnJtmh2TgqWmGSREUzXgMUFDL6yMdVZHqUsg/edit

<div class="clearfix"></div>

## Numeric separators {: #num-sep }

Numeric literals now [allow underscores][cr-status-num-sep] (_, U+005F) as
separators to make them more readable. For example, `1_000_000_000` will be
interpreted by mathematical operations as equivalent to `1000000000`.

Underscores can only appear between digits, and consecutive underscores are
not allowed. So literals such as `3._14`, `_2.71` or `1.6__2` are illegal.

[cr-status-num-sep]: https://www.chromestatus.com/feature/5829906369871872

## Google I/O 2019 is a wrap {: #io-talks }

If you didn’t make it to I/O, or maybe you did, and didn’t see all the talks,
they’re all up on the [Chrome Developers YouTube channel][cr-dev-yt], in the
[Web at Google I/O 2019 playlist](https://bit.ly/web-at-io2019).

* Tom and I presented [“Unlocking new capabilities for the web”][yt-unlock]
  covering some of the amazing new capabilities that are landing in browsers
  this year.
* Addy and Katie covered some cool performance tips and tricks in
  [“Speed at Scale”][yt-speed].
* Elizabeth and Paul dove into some cool devtools in
  [“Demystifying Speed Tooling”][yt-tooling].
* And in [“Build Fast and Smooth Web Apps from Feature Phone to Desktop”][yt-proxx]
  Mariko showed us how she and her crew built [Proxx][proxx]
  to work on any device, from feature phone to smart phone to desktop.
  If you haven’t tried [Proxx][proxx] yet, it’s a super fun mine sweeper clone.

[cr-dev-yt]: https://youtube.com/user/ChromeDevelopers/
[yt-unlock]: https://www.youtube.com/watch?v=GSiUzuB-PoI
[yt-speed]: https://www.youtube.com/watch?v=YJGCZCaIZkQ
[yt-tooling]: https://www.youtube.com/watch?v=mLjxXPHuIJo
[yt-proxx]: https://www.youtube.com/watch?v=w8P5HLxcIO4
[proxx]: https://proxx.app/

<div class="clearfix"></div>

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 76 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

### Photo Credits {: .hide-from-toc }

* Sketching photo by [Balázs Kétyi](https://unsplash.com/photos/byoBbHSlP5U) from
  [Unsplash](https://unsplash.com/search/photos/sketching-tablet)

{% include "web/_shared/rss-widget-updates.html" %}
