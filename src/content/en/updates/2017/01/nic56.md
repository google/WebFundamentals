project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 56 for developers? Web Bluetooth API, CSS Position Sticky, and HTML5 by Default is enabled for all users.

{# wf_published_on: 2017-01-25 #}
{# wf_updated_on: 2017-02-09 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome55,new-in-chrome,css,layout,html5,flash,webbluetooth,webvr #}
{# wf_featured_snippet: With Chrome 56, web apps can now communicate with nearby Bluetooth Low Energy devices using the <b>Web Bluetooth API</b>. CSS <code>position: sticky;</code> is back - making it easy to create elements that scroll normally until sticking to the top of the viewport. And HTML5 by Default is enabled for all users. #}

# New In Chrome 56 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="F4DfGVbvRpY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Users can now select Bluetooth Low Energy
  devices to connect to web sites that use the [Web Bluetooth API](#webbluetooth).
* [`position: sticky`](#position-sticky) is back - making it easy to create
  elements that scroll normally until sticking to the top of the viewport.
* And [HTML5 by Default](#html5-by-default) is enabled for all users.

I’m Pete LePage, let’s dive in and see what’s new for developers in Chrome 56. 

<div class="clearfix"></div>

## Web Bluetooth API {: #webbluetooth }

Until now, users who have bluetooth devices were forced to install
native apps to communicate with them. With Chrome 56, users can select
nearby Bluetooth Low Energy devices to provide to web sites that use
the [Web Bluetooth API](//webbluetoothcg.github.io/web-bluetooth/).

Similar to selecting files to share with a web site, this is more
secure than installing a native application that can read data from
anything. Users are in full control of when and which device is
shared with a specific web site.

The Web Bluetooth API uses the [GATT protocol](https://webbluetoothcg.github.io/web-bluetooth/),
which enables apps to connect to devices such as light bulbs, toys,
heart-rate monitors, LED displays and more with just a
[few lines of JavaScript](https://googlechrome.github.io/samples/web-bluetooth/).
Web Bluetooth can also be combined with physical web beacons to make discovering
nearby devices even easier.

Francois has a great
[article on Updates](/web/updates/2015/07/interact-with-ble-devices-on-the-web),
be sure to check out some of neat [demos](https://github.com/WebBluetoothCG/demos)
to go along with it. And be sure to check out the
[Web Bluetooth Community](https://plus.google.com/communities/108953318610326025178).

## CSS `position: sticky;` {: #position-sticky }

Previously, building content headers that scrolled normally until sticking
to the top of the viewport required listening to scroll events and
switching an element’s position from relative to fixed at a specified threshold. 
It was difficult to synchronize, and often results in small visual jumps.

Chrome now supports CSS
[`position: sticky;`](//developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning),
a new way to position elements. 

An element that is position sticky, starts relative; but becomes fixed,
after the element reaches a certain scroll position.

Simply set `position: sticky`, and set a threshold for it to become sticky.

    h3 {
      /* Element will be 'fixed' when it ... */
      position: sticky;
      /* ... is 10px from the top of the viewport */
      top: 10px;
    }

Paul Kinlan has an [Updates](/web/updates/2016/12/position-sticky) post
about it.

## HTML5 By Default {: #html5-by-default }

Last August, we announced that we’d be
[moving to HTML5 By Default](//blog.google/products/chrome/flash-and-chrome/)
to offer a safer, more power-efficient experience. This change disables Adobe
Flash Player unless there’s a user indication that they want Flash content on
specific sites, and eventually all websites will require the user’s permission
to run Flash. 

In Chrome 56,
[HTML5 By Default has been enabled for all users](//blog.chromium.org/2016/12/roll-out-plan-for-html5-by-default.html ),
which means they will be prompted to run Flash on sites they've never visited.

More details about
[how and when users will be prompted](https://sites.google.com/a/chromium.org/dev/flash-roadmap#TOC-HTML5-By-Default-Target:-Chrome-55---Dec-2016-),
and [recommendations](https://sites.google.com/a/chromium.org/dev/flash-roadmap#TOC-Developer-Recommendations ) on how to test your Flash sites.

## And more

And of course, there’s plenty more.

* [WebVR](/web/fundamentals/vr/) is available as an Origin Trial.
* The [WebGL 2.0 API](//www.khronos.org/registry/webgl/specs/latest/2.0/) is now available.
* And the Payment Request API has a [variety of new features](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/preview).


If you want to stay up to date with Chrome and know what’s coming, be sure to
[subscribe](https://goo.gl/6FP1a5), follow 
[@ChromiumDev](//twitter.com/chromiumdev) on Twitter and be sure to check
out the [videos from the Chrome Dev Summit](https://www.youtube.com/playlist?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj)
for a deeper dive into some of the awesome things the Chrome team is working on.

I’m Pete LePage, and as soon as Chrome 57 is released, I’ll be right here to tell you -- what’s new in Chrome!

## Subscribe to Chrome Developers on YouTube {: .hide-from-toc }
Subscribe to our [YouTube channel](https://goo.gl/6FP1a5) or our 
[RSS feed](/web/shows/rss.xml)

<link rel="alternate" type="application/rss+xml" title="Web Shows from Google Developers (RSS)" href="/web/shows/rss.xml">
<link rel="alternate" type="application/atom+xml" title="Web Shows from Google Developers (ATOM)" href="/web/shows/atom.xml">

<section class="expandable">
  <p class="showalways hide-from-toc">New in Chrome Easter Egg</p>
  <div class="video-wrapper">
    <iframe class="devsite-embedded-youtube-video" data-video-id="gYY8THAtWe8"
            data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
    </iframe>
  </div>
  <p>
    If you read this far, you deserve to see the blooper reel from
    <a href="//youtu.be/Pii-LaWOyuo">New in Chrome 52</a>! I felt like every
    time I opened my mouth, a truck would drive by, a helicopter would fly
    over, a car would honk it's horn.
  </p>
</section>

<div class="clearfix"></div>

Oh, and a big thanks to Andrew for lending me his shirt! I had a bit of a
wardrobe malfunction.

{% include "comment-widget.html" %}
