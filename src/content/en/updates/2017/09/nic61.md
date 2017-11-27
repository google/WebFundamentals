project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 61 for developers? JavaScript Modules, WebUSB, WebShare and more.

{# wf_published_on: 2017-09-05 #}
{# wf_updated_on: 2017-09-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome61,new-in-chrome,modules,es6,webusb,sharing #}
{# wf_featured_snippet: Chrome 61 now supports JavaScript modules natively, unifying the way modular JavaScript can be written. You can now use navigator dot share to trigger the native Android share dialog. And the WebUSB API has landed, allowing web apps to access user permitted USB devices. And, there's plenty more. #}

# New in Chrome 61 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="2vJm1Gfn0ng"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Chrome 61 now supports JavaScript [modules](#modules) natively, unifying the
  way modular JavaScript can be written.
* You can now use [`navigator.share`](#share) to trigger the native Android
  share dialog.
* The [WebUSB API](#webusb) has landed, allowing web apps to access user
  permitted USB devices.
* And there’s [plenty more](#more)!
 
<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/60.0.3112.78..61.0.3163.79?pretty=fuller&n=10000).

<div class="clearfix"></div>

I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 61! 

<div class="clearfix"></div>

## JavaScript Modules {: #modules }

Chrome 61 adds native support for JavaScript modules via the 
`<script type="module">` element. That makes it possible for Chrome to fetch
granular dependencies in parallel, taking advantage of caching, avoiding
duplications across the page and ensuring that script executes in the
correct order.

    <script type="module">
      import {addText} from './utils.js';
      addText('Modules are pretty cool.');
    </script>

This standardized module system unifies the way modular JavaScript can be
written and shipped to web browsers. In the future, the same system will be
available in Node, making it easier for you to write and deploy isomorphic
JavaScript.

You can learn more about modules and the aspects of JavaScript that are
affected by modules from the links below.

* [Chrome Status](https://www.chromestatus.com/feature/5365692190687232) 
* [ES Modules in Browsers](https://jakearchibald.com/2017/es-modules-in-browsers/)
* [ES6 Modules in Depth](https://ponyfoo.com/articles/es6-modules-in-depth)

<div class="clearfix"></div>

## Web Share API {: #share }

<img src="/web/updates/images/2017/09/web-share_framed.png" class="attempt-right">

If you want users to be easily able to share your content on their favorite
social network, you need to integrate sharing buttons into your site for
each social network. It adds bloat to your page, doesn’t always fit your
UI nicely, and means you need to include code from a third party site.

The Web Share API, available today on Chrome for Android allows you to invoke
the native sharing capabilities of the users device, allowing the user to
easily share text or links with any of their installed native apps!

In a future release, this API will also be able to share to installed web apps.
To use it, simply call `navigator.share` with the details of the page you want
to share the system will handle the rest. 

    navigator.share({
      title: document.title, text: 'Hello',
      url: window.location.href
    }).then(() => {
      console.log('Successful share');
    });

Check out Paul’s [WebShare API Update](/web/updates/2016/10/navigator-share)
for full details and some best practices that you should be following.

<div class="clearfix"></div>

## WebUSB {: #webusb }

<img src="/web/updates/images/2016-03-02-access-usb-devices-on-the-web/usb-device-chooser.png"
  alt="USB Device Chooser screenshot" class="attempt-right" />

Most hardware peripherals such as keyboards, mice, printers, and gamepads are
supported by high-level web platform APIs. But, using specialized educational,
scientific, industrial or other USB devices in the browser has been hard,
often requiring specialized drivers.

Chrome now supports the WebUSB API, allowing web apps to communicate with
USB devices, after the user has provided their consent. To learn more about
the security and privacy considerations and how they’re addressed, have a
peek at the [WebUSB spec](https://wicg.github.io/webusb/).

Then, when you’re ready to dive in, take a look at Francois’
[WebUSB post](/web/updates/2016/03/access-usb-devices-on-the-web) on updates.

<div class="clearfix"></div>

## And more! {: #more }

* You can now specify scrolling smoothness with the
  [`scroll-behavior`](https://drafts.csswg.org/cssom-view/#smooth-scrolling)
  CSS property.
* [CSS hex color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgba)
  can now specify alpha transparency by adding digits to the end of the string.
* You can access the relative positions of the screen content with the
  [Visual Viewport API](https://github.com/WICG/ViewportAPI), exposing complex
  functionality like pinch-and-zoom in a more direct way.


These are just a few of the changes in Chrome 61 for developers.  

Then [subscribe](https://goo.gl/6FP1a5) to our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 62 is released, I’ll be right
here to tell you -- what’s new in Chrome!

