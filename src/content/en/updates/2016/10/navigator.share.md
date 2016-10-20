project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Sharing is caring. Chrome is running an Origin Trial to enable native sharing on the web.

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2016-10-20 #}
{# wf_featured_image: /web/updates/images/generic/share.png #}
{# wf_tags: chrome55,sharing,android,origintrials #}
{# wf_featured_snippet: Sharing is caring. Chrome is running an Origin Trial to enable native sharing on the web called <code>Web Share</code> that allows websites to invoke the native sharing capabilities of the host platform. #}

# Introducing the Web Share API {: .page-title }

Good news, everybody! [Matt Giuca](https://twitter.com/mgiuca){: .external } 
on the Chrome team has been working on a
[simple API](https://github.com/WICG/web-share/blob/master/docs/interface.md){: .external }
called
[Web Share](https://github.com/WICG/web-share/blob/master/docs/explainer.md){: .external }
that allows websites to invoke the native sharing capabilities of the host
platform.

There have been a number of ways to invoke native sharing capabilities on the
platform, but they all have significant drawbacks.  There was
[Web Intents](https://en.wikipedia.org/wiki/Paul_Kinlan){: .external } (dead), there
is protocol handling via `registerProtocolHandler` but this has zero support on
mobile, there is direct sharing to a well-known service URL such as Twitter's,
and there is also the
[Android intent: URL syntax](https://paul.kinlan.me/sharing-natively-on-android-from-the-web/){: .external }
(which was, unfortunately, Android-only, and required apps to opt-in).

The Web Share API is important because it gives the user control of how and
where the data is shared.

In Chrome 55 (Beta as of October 2016), we've enabled an 
[Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md){: .external }
that lets you integrate the Web Share API into your
site. The origin trial means this API is not generally available to all sites;
instead you need to register to get access during the trial phase. Over this
time, the API will likely change and break in unexpected ways, which is why we
are looking for as much feedback as possible.

The Web Share API is a
[promise](/web/fundamentals/getting-started/primers/promises){: .external } -based,
 single method API that takes an object with properties named title, text and url.

    navigator.share({
        title: document.title,
        text: "Hello World",
        url: window.location.href
    }).then(() => console.log('Successful share'))
    .catch(() => console.log('Error sharing:', error));

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lhUzYxCvWew"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Once invoked it will bring up the native picker (see video) and allow you to
share the data with the app chosen by the user.

<div class="clearfix"></div>

This API has a few constraints:

* You need to host your site in a [secure context](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features){: .external }
  (typically https).
*  You only need to supply one of text or url, not both.
* You can only invoke the API as a result of a user gesture. (For example, you can't call
  `navigator.share()` in an onload handler.)
* The property values that you pass into the API must all be strings.

### How to get this working

The process is pretty simple:

1. Get the [Chrome Beta Channel onAndroid](https://play.google.com/store/apps/details?id=com.chrome.beta){: .external }
   (as of October 2016).
2. [Sign up](https://docs.google.com/forms/d/e/1FAIpQLSfO0_ptFl8r8G0UFhT0xhV17eabG-erUWBDiKSRDTqEZ_9ULQ/viewform){: .external }
   for the Origin Trial.
3. [Integrate](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin){: .external }
   the Origin Trial tokens into your site (as long as it is on https).
4. Call `navigator.share()` in response to a user gesture.
5. Share!

### Be progressive

The API is not available on all platforms, so you will have to gracefully handle
the scenarios where you don't have the ability to call. I try to progressively
enhance as much as possible, and the process that I follow on my
[blog](https://paul.kinlan.me/){: .external } is to:

1. Use your preferred sharing service via a simple `<a>` ([intent: URL with
   Twitter fallback is an example I use](https://paul.kinlan.me/sharing-natively-on-android-from-the-web/){: .external }).
2. Check the availability of the API `(navigator.share !== undefined)`.
3. Wait for the content to be available and then find the sharing element.
4. Intercept and prevent the default behavior of the click.
5. Call `navigator.share()`.

### Share the correct URL

You should also think about the URL that you want to share. In many cases the
user will be on a mobile device and your site might have an "m." url, or a url
that is custom to user's context. You can use the fact that there might be
a canonical URL on your page to provide a better experience to the user.  For
example, you might do:

    var url = document.location;
    var canonicalElement = document.querySelector('link[rel=canonical]');
    if(canonicalElement !== undefined) {
        url = canonicalElement.href;
    }

### Where can I get more information

You can get all the relevant information at
[ChromeStatus](https://www.chromestatus.com/features/5668769141620736){: .external }, but to
save you a click, here are the important links:

* [Launch tracking bug in Chrome](https://crbug.com/620973){: .external }
* [Intent to implement](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/1BOhy5av8MQ/8LqNvS5TAQAJ){: .external }
* [Sample](https://github.com/mgiuca/web-share/blob/master/demos/share.html){: .external }
* [Share explainer](https://github.com/WICG/web-share/blob/master/docs/explainer.md){: .external }
* [Web Share in WICG](https://github.com/WICG/web-share){: .external }
* [Discussion on Discourse](https://discourse.wicg.io/t/web-share-api-for-sharing-content-to-arbitrary-destination/1561/3){: .external }

Future work will also level the playing field for web apps, by allowing them to
register to be a "[share receiver](https://github.com/WICG/web-share-target){: .external }",
enabling web-to-app sharing, app-to-web sharing and web-to-web sharing.
Personally, I am incredibly excited about this.

<link rel="alternate" type="application/rss+xml" title="Web Shows from Google Developers (RSS)" href="/web/shows/rss.xml">
<link rel="alternate" type="application/atom+xml" title="Web Shows from Google Developers (ATOM)" href="/web/shows/atom.xml">

{% include "comment-widget.html" %}
