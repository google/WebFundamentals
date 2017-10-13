project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 62 for developers? Improved Network Information API, Support for OpenType Variable Fonts, new ways to capture media and more!

{# wf_published_on: 2017-10-17 #}
{# wf_updated_on: 2017-10-17 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome62,new-in-chrome,fonts,media,webfonts,network-info #}
{# wf_featured_snippet: Chrome 62 improves the network information API with network quality indicators, support for OpenType Variable Fonts has landed and you can now capture and process media streams from HTMLMediaElements with the Media Capture from DOM elements API. #}

# New in Chrome 62 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="TODO"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Chrome 62 makes the [network information API](#network-info) more useful
  by providing actual performance metrics instead of theoretical results. 
* Support for [OpenType variable fonts](#otvf) has landed. 
* You can [capture media streams](#capture-media-streams) from HTML Media elements.
* I’ve got a special reminder about an [important change](#https) that’s 
  landing in Chrome 62.

And there’s [plenty more](#more)!
 
I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 62!

<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/61.0.3163.79..61.0.3163.79?pretty=fuller&n=10000).

<div class="clearfix"></div>


## Network Quality Indicator {: #network-info }


The [Network Information API](https://wicg.github.io/netinfo/) has been
available in Chrome for a while, but it only provides theoretical network
speeds given the user’s connection. Imagine you’re on WiFi, but connected to
a cellular hotspot that only has 2G speeds? The API would report WiFi!

```
console.log(navigator.connection.type);
> wifi
```

In Chrome 62, the API has been expanded to provide
[actual network performance metrics](https://www.chromestatus.com/feature/5108786398232576)
from the client.  Using these network quality signals, you can tailor content
to the network. For example, on very slow connections, you could improve page
load performance by serving a reduced version.

To simplify your application logic, the API returns the measured network
performance in terms of how it would compare to a cellular connection. For
example, connected to a super fast fiber connection, the API would report `4G`.

```
console.log(navigator.connection.effectiveType);
> 4G
```

These signals will also be available as HTTP request headers and enabled via
[Client Hints](http://httpwg.org/http-extensions/client-hints.html). Checkout
out the [sample](https://googlechrome.github.io/samples/network-information/)
and have a look at the [spec](https://wicg.github.io/netinfo) for a deeper dive.

## OpenType Variable Fonts {: #otvf }

<video autoplay loop muted class="attempt-right">
  <source src="/web/updates/videos/2017/10/otvfont.webm" type="video/webm">
  <source src="/web/updates/videos/2017/10/otvfont.mp4" type="video/mp4">
</video>

Traditionally, one font contained only a single instance of a font family,
for example one weight or one stretch. If you wanted regular, bold and italic,
you’d need to include three separate fonts, increasing the weight of your page.

An OpenType variable font is the equivalent of multiple individual fonts that
can be compactly packaged within a single font file. By adjusting the
[`font-variation-settings`](https://drafts.csswg.org/css-fonts-4/#font-variation-settings-def)
CSS property, stretch, style, weight and more, can easily be adjusted,
providing an infinite number of stylistic variations. Those three fonts can
now be combined into a single, compact file.

```
.heading {
  font-family: "Avenir Next Variable";
  font-size: 48px;
  font-variation-settings: 'wght' 700, 'wdth' 75;
}
.content {
  font-family: "Avenir Next Variable";
  font-size: 24px;
  font-variation-settings: 'wght' 400;
}
```

OpenType variable fonts gives us a powerful new tool to create responsive
typography, and reduce our page weight. Check out
[Introducing OpenType Variable Fonts](https://medium.com/@tiro/https-medium-com-tiro-introducing-opentype-variable-fonts-12ba6cd2369)
by John Hudson for more details. 

## Media capture from DOM elements {: #media-capture }

<video autoplay loop muted class="attempt-right">
  <source src="/web/updates/videos/2016/07/capture-stream/canvas-pc.webm" type="video/webm">
  <source src="/web/updates/videos/2016/07/capture-stream/canvas-pc.mp4" type="video/mp4">
</video>

You can now
[live-capture](https://rawgit.com/yellowdoge/demos/master/videoelementcapture.html) 
content into a `MediaStream` directly from `HTMLMediaElements` like audio and
video, with the
[Media Capture from DOM Elements API](https://w3c.github.io/mediacapture-fromelement/#html-media-element-media-capture-extensions).

After invoking `captureStream()` on an HTML media element, the streamed
content can be manipulated, processed, sent remotely or recorded. Imagine
using web audio to create your own equalizer or vocoder. Or stream the
content to a remote site using WebRTC. The possibilities are almost endless.

<div class="clearfix"></div>

## Not Secure labels for some HTTP pages {: #https }

As we [announced](https://blog.chromium.org/2017/04/next-steps-toward-more-connection.html)
previously, starting in Chrome 62, when a user enters data on an HTTP page,
Chrome will mark the page as "Not Secure" with a label in the address bar.
This label will also be shown in Incognito Mode for all HTTP pages.

<div class="clearfix"></div>

## And more! {: #more }

These are just a few of the changes in Chrome 62 for developers, of course,
there’s plenty more.

* The [Payment Request API](/web/fundamentals/payments/) is now available on
  Chrome for iOS.
* You can start building _experimental_ rich VR experiences with the
  [WebVR origin trial](http://bit.ly/OriginTrialSignup).
 

Then [subscribe](https://goo.gl/6FP1a5) to our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 63 is released, I’ll be right
here to tell you -- what’s new in Chrome!

