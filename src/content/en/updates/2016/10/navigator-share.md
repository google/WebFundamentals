project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Sharing is caring. Chrome is running an Origin Trial to enable native sharing on the web.

{# wf_published_on: 2017-09-07 #}
{# wf_updated_on: 2017-09-07 #}
{# wf_featured_image: /web/updates/images/generic/share.png #}
{# wf_tags: chrome55,chrome61,sharing,android,origintrials #}
{# wf_featured_snippet: Sharing is caring. Web Share is now available in Chrome 61 for Android, and allows websites to invoke the native sharing capabilities of the host platform. #}
{# wf_blink_components: Blink>WebShare #}

# Introducing the Web Share API {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

{% include "web/_shared/contributors/samthorogood.html" %}

Good news, everybody! In Chrome 61 for Android, we've launched the `navigator.share()` method,
which allows websites to invoke the native sharing capabilities of the host platform.

This method, part of the simple [Web Share API](https://wicg.github.io/web-share/)—written by
[Matt Giuca](https://twitter.com/mgiuca) on the Chrome team—allows you easily trigger the native
Android share dialog, passing either a URL or text to share. This is an important API as it gives
your end-users user control of how and where the data is shared.

## Usage

The Web Share API is a
[Promise](/web/fundamentals/getting-started/primers/promises)-based, single method API.
It accepts an object which must have at least one of the properties named `text` or `url`.

```js
if (navigator.share) {
  navigator.share({
      title: 'Web Fundamentals',
      text: 'Check out Web Fundamentals—it rocks!,
      url: 'https://developers.google.com/web',
  })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
}
```

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lhUzYxCvWew"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Once invoked it will bring up the native picker (see video) and allow you to
share the data with the app chosen by the user.

<div class="clearfix"></div>

To use the Web Share API:

* you must be served over [HTTPS](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features)

* you can only invoke the API in response to a user action, such as a click
  (e.g., you can't call `navigator.share` as part of the page load)

* you can also share any URL, not just URLs under your website's current scope: and you
  may also share `text` without a URL

* you should feature-detect it in case it's not available on your users' platform
  (e.g., via `navigator.share !== undefined`)

### The URL

For the initial launch on Android, users using the Web Share API will be on a mobile device.
Some sites might have a "m." URL, or a custom URL for the user's context. You can share any URL
via the Web Share API, but you could reuse a canonical URL on your page to provide a better
experience to the user. For example, you might do:

```js
let url = document.location.href;
const canonicalElement = document.querySelector('link[rel=canonical]');
if (canonicalElement !== undefined) {
    url = canonicalElement.href;
}
navigator.share({url: url});
```

## Case Study

[Santa Tracker](https://santatracker.google.com) is a holiday tradition here at
Google. Every December, you can celebrate the season with games and educational
experiences: and in the new year, Santa Tracker [is open-sourced and delivered](https://developers.googleblog.com/2017/04/santa-tracker-open-sourced-and-delivered.html).

In 2016, we used the Web Share API on Android via an
[Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)
(note: this is **not** required to use the Web Share API now, as part of Chrome 61). This
API was a perfect fit for mobile—in previous years, we had disabled share buttons on mobile,
as space is at a premimum and we couldn't justify having several share targets.

<img alt="Santa Tracker share button" src="/web/updates/images/2016/10/santa-phone.png"
  style="margin: 12px auto;"/>

With the Web Share API, we were able to present just one button, saving precious
pixels. We also found that users shared with Web Share around 20% more than users
without the API enabled.

(If you're on Chrome 61 on Android, head to
[Santa Tracker](https://santatracker.google.com) and see Web Share in action.)

## History

The Web Share API was originally launched as an
[Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)
as part of Chrome 55.

Prior to the Web Share API, there have been a number of ways to invoke native sharing
capabilities on the platform, but they all have significant drawbacks. There was:

* [Web Intents](https://en.wikipedia.org/wiki/Paul_Kinlan) (dead)
* Protocol handling via `registerProtocolHandler`, but this has zero support on mobile
* Direct sharing to a well-known service URL such as Twitter
* [Android intent: URL syntax](https://paul.kinlan.me/sharing-natively-on-android-from-the-web/)
  (which was, unfortunately, Android-only, and required apps to opt-in)

## More Information

Read more about the launch at
[Chrome Platform Status](https://www.chromestatus.com/features/5668769141620736). Here
are some important links:

* [Sample](https://github.com/mgiuca/web-share/blob/master/demos/share.html)
* [Share explainer](https://github.com/WICG/web-share/blob/master/docs/explainer.md)
* [Intent to implement](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/1BOhy5av8MQ/8LqNvS5TAQAJ)
* [Discussion on Discourse](https://discourse.wicg.io/t/web-share-api-for-sharing-content-to-arbitrary-destination/1561/3)

In the future, websites themselves will be allowed to register themselves as a
"[share receiver](https://www.chromestatus.com/features/5662315307335680)", enabling
sharing _to_ the web—from both the web and native apps. We are on the Chrome team are incredibly
excited by this.

<link rel="alternate" type="application/rss+xml" title="Web Shows from Google Developers (RSS)" href="/web/shows/rss.xml">
<link rel="alternate" type="application/atom+xml" title="Web Shows from Google Developers (ATOM)" href="/web/shows/atom.xml">

{% include "comment-widget.html" %}
