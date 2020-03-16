project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 81 for developers?

{# wf_published_on: 2020-03-17 #}
{# wf_updated_on: 2020-03-17 #}
{# wf_featured_image: /web/updates/images/2020/03/new-81.jpg #}
{# wf_tags: chrome81,new-in-chrome,chromedevsummit,forms #}
{# wf_featured_snippet: Chrome 81 is rolling out now! Form elements get a modernized look, with better touch support and improved accessibility. Hit testing for augmented reality is now available in the browser. Web NFC starts its origin trial, and App Icon Badging graduates. Let’s dive in and see what’s new for developers in Chrome 81! #}
{# wf_blink_components: N/A #}

# New in Chrome 81 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 81 is rolling out now, and there’s a ton of new stuff in it for
developers!

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="TODO"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

There’s support for:

* Form elements get a [modernized look](#modernized-forms).
* [Hit testing](#hit-testing) for augmented reality is now available in the
  browser.
* [App Icon Badging](#badging) graduates from its origin trial.
* [Web NFC](#web-nfc) starts its origin trial.
* And so much [more](#more).

I’m [Pete LePage](https://twitter.com/petele), let’s dive in and see what’s
new for developers in Chrome 81!

<div class="clearfix"></div>

## Modernized form controls {: #modernized-forms }

I’ve been really impressed by the work Microsoft has been doing to modernize
the appearance of form controls and I’m excited to see it land in Chrome 81 on
Windows, ChromeOS, and Linux. Mac and Android support are coming soon.

<figure>
  <img src="/web/updates/images/2020/03/form-controls.jpg" class="screenshot">
  <figcaption>
    Left: Traditional form controls before modernizations.<br>
    Right: Modernized form controls with better touch and accessibility.
  </figcaption>
</figure>

Beyond the nicer visual style, they bring better touch support, and better
accessibility, including improved keyboard support! Check out Microsoft’s
[blog post][ms-form] for full details!

[ms-form]: https://blogs.windows.com/msedgedev/2019/10/15/form-controls-microsoft-edge-chromium/

<div class="clearfix"></div>

## WebXR hit testing {: #hit-testing }

<img src="/web/updates/images/2020/03/hit-test.jpg" class="attempt-right">

There are a handful of native apps that let you see what a new couch or chair
might look like in your home. With an update to the Web XR Device API, it’s
now possible to do that on the web too.

With the Web XR Hit Test API, you can place virtual objects into your camera’s
view of the real world.

Check out the Immersive Web Working Group's [Hit Testing sample][ht-sample]
([code][ht-sample-code]) where you can place virtual sunflowers on surfaces in
the real world, or [Positioning virtual objects in real-world views][hit-test-article]
for more details.

[hit-test-article]: https://web.dev/ar-hit-test/
[ht-sample]: https://immersive-web.github.io/webxr-samples/hit-test.html
[ht-sample-code]: https://github.com/immersive-web/webxr-samples/blob/master/hit-test.html

<div class="clearfix"></div>

## Origin trial graduations {: #ot-graduation }

There are new capabilities that graduated from Origin Trial to stable,
allowing them to be used by any site, without a token.

### App icon badging {: #badging }

<img src="/web/updates/images/2020/03/badging.jpg" class="attempt-right">

Badging of app icons makes it easy to subtly notify the user that there is
some new activity that might require their attention, or to indicate a small
amount of information, such as an unread count.

It’s more user-friendly than notification. And because it doesn’t interrupt
the user, it can be updated with a much higher frequency. It’s perfect for
chat or email apps to indicate the number of unread messages. Social media
apps could use it to indicate the number of times you’ve been tagged in other
peoples posts.  Or for games, to indicate to a user that it’s their turn.

Check out my [Badging API][wd-badging] article on web.dev for full details.

[wd-badging]: https://web.dev/badging-api/

<div class="clearfix"></div>

## New origin trials {: #ot-new }

### Web NFC {: #web-nfc }

Web NFC is starting its origin trial in Chrome 81. Web NFC allows a web app to
read and write to NFC tags. This opens new use cases, including providing
more details about museum exhibits, inventory management, reading information
from a conference badge, and more.

It’s super easy to use. To read a tag, create a new instance of the `NDEFReader`
API, and start the scan.

```js
const reader = new NDEFReader();

async function startScan() {
  await reader.scan();
  reader.onreading = (e) => {
    console.log(e.message);
  };
}
```

Then, when an NFC tag is scanned, the reader will fire a `read` event that you
can use to loop through the incoming messages.

Francois has a great [post][wd-nfc] that covers all the details and it
includes a number of common patterns that you might want to use. Amazon has
lots of options for [cheap NFC stickers][amazon-nfc-stickers].

<div class="clearfix"></div>

### Other origin trials

Check <https://developers.chrome.com/origintrials/#/trials/active> for
a complete list of features in origin trial.

## And more {: #more }

Of course, there’s plenty more!

* The media session API now supports [tracking position state][ms-tracking] so
  you can see where you are in a track and easily skip back or forwards.
* The INTL API now provides a [`DisplayNames`][intl-display-names] method that
  gets the localized names of languages, currency, and other commonly used
  names, no more having to include that yourself.

[ms-tracking]: https://googlechrome.github.io/samples/media-session/video.html
[intl-display-names]: https://github.com/tc39/proposal-intl-displaynames

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 81.

* [What's new in Chrome DevTools (81)](/web/updates/2020/01/devtools)
* [Chrome 81 deprecations & removals](/web/updates/2020/01/chrome-81-deps-rems)
* [ChromeStatus.com updates for Chrome 81](https://www.chromestatus.com/features#milestone%3D81)
* [What's new in JavaScript in Chrome 81](https://v8.dev/blog/v8-release-81)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/80.0.3987.87..81.0.4044.69)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 82 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
