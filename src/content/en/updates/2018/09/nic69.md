project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 69 for developers?

{# wf_published_on: 2018-09-04 #}
{# wf_updated_on: 2018-09-06 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome69,new-in-chrome #}
{# wf_featured_snippet: It’s been ten years since Chrome was first released. A lot has changed since then, but our goal of building a solid foundation for modern web applications hasn’t! In Chrome 69 there’s support CSS Scroll Snapping, support for notches, web locks, and a few cool new CSS4 features. Let’s dive in and see what’s new for developers in Chrome 69! #}
{# wf_blink_components: N/A #}

# New in Chrome 69 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WF2IjH35w8o"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

It’s been **ten years** since Chrome was first released. A lot has changed
since then, but our goal of building a solid foundation for modern web
applications hasn’t!

In Chrome 69, we've added support for:

* [CSS Scroll Snap](#scroll-snap) allows you to create smooth, slick,
  scroll experiences.
* [Display cutouts](#notch) lets you use the full area of the screen,
  including any space behind the display cutout, sometimes called a notch.
* The [Web Locks API](#web-locks) allows you to asynchronously acquire a
  lock, hold it while work is performed, then release it.

And there’s [plenty more](#more)!

I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 69!

<div class="clearfix"></div>

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/68.0.3440.70..69.0.3497.81).


## CSS Scroll Snap {: #scroll-snap }

<figure class="attempt-right">
  <a href="/web/updates/images/2018/07/css-scroll-snap/gallery-page.mp4">
    <video src="/web/updates/images/2018/07/css-scroll-snap/gallery-page.mp4"
           autoplay loop muted playsinline controls alt="Gallery page demo">
    </video>
  </a>
  <figcaption>
    <a href="https://snap.glitch.me/carousel.html"
       target="_blank">View demo</a> |
    <a href="https://glitch.com/edit/#!/snap?path=carousel.html:1:0"
       target="_blank">Source</a>
  </figcaption>
</figure>

Caution: This post refers to **CSS Scroll Snap**, which is the current standard,
not to be confused with _CSS Scroll Snap Points_, which has been deprecated and
is no longer on the standards track.

[CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap)
allows you to create smooth, slick, scroll experiences, by declaring scroll
snap positions that tell the browser where to stop after each scrolling
operation. This is super helpful for image carousels, or paginated sections
where you want the user to scroll to a specific point.

<div class="clearfix"></div>

For an image carousel, I’d add `scroll-snap-type: x mandatory;` to the
scroll container, and `scroll-snap-align: center;` to each image. Then, as the
user scrolls through the carousel, each image will be smoothly scrolled into
the perfect position.

```
#gallery {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
}

#gallery img {
   scroll-snap-align: center;
}
```

CSS Scroll Snapping works well, even when the snap targets have different
sizes or when they are larger than the scroller! Check out the post
[Well-Controlled Scrolling with CSS Scroll Snap](/web/updates/2018/07/css-scroll-snap)
for more details and samples you can try!


<div class="clearfix"></div>

## Display cutouts (aka notches) {: #notch }

<figure class="attempt-right">
  <a href="/web/updates/images/2018/09/notch-extra-margin.png">
    <img src="/web/updates/images/2018/09/notch-extra-margin.png"
         alt="mobile phone with display cutout">
  </a>
  <figcaption>
    Browsers add some extra margin on a mobile device with display cutout to
    prevent content from being covered by the cutout.
  </figcaption>
</figure>


There are an
[increasing number of mobile devices](https://www.google.com/search?q=what+phones+have+a+notch)
being released with a display cutout, sometimes called a notch. To deal with
that, browsers add a little bit of extra margin to your page so the content
isn’t obscured by the notch.

**But what if you want to use that space?**

With CSS environment variables and the
[`viewport-fit`](https://www.w3.org/TR/css-round-display-1/#viewport-fit-descriptor)
meta tag, now you can. For example, to tell the browser to expand into the
display cutout area, set the `viewport-fit` property, in the `viewport` meta
tag to `cover`.

<div class="clearfix"></div>

```
<meta name='viewport' content='initial-scale=1, viewport-fit=cover'>
```

You can then use the `safe-area-inset-*`
[CSS environment variables](https://drafts.csswg.org/css-env-1/) to layout
your content.

```
.content {
  padding: 16px;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

<aside class="key-point">
  <b>Remember:</b> It’s important to test this well; you're telling the
  browser it’s OK if some content gets hidden behind the display cutout.
  And don’t forget to test in both portrait and landscape modes.
</aside>


There’s a great post on the WebKit blog about
[Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/),
or check out the
[explainer](https://docs.google.com/document/d/1lbZi18_5cMlLOphpFqTbuI4B0YGykQvvtRbw6j67UyE/preview)
for more details.


<div class="clearfix"></div>


## Web Locks API {: #web-locks }

The [Web Locks API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API)
allows you to asynchronously acquire a lock, hold it while work is performed,
then release it. While the lock is held, no other script in the origin can
acquire the same lock, helping to coordinate the usage of shared resources.

For example, if a web app running in multiple tabs wants to ensure that only
one tab is syncing to the network, the sync code would attempt to acquire a
lock named `network_sync_lock`.

```
navigator.locks.request('network_sync_lock', async lock => {
  // The lock has been acquired.
  await do_something();
  await do_something_else();
  // Now the lock will be released.
});
```

The first tab to acquire the lock will sync the data to the network. If
another tab tries to acquire the same lock, it’ll be queued. Once the lock has
been released, the next queued request will be granted the lock, and execute.

MDN has a great [Web Locks primer](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API)
and includes a more in-depth explanation and lots of examples. Or dive in deeper
and check out the [spec](https://github.com/WICG/web-locks).

<div class="clearfix"></div>

## And more! {: #more }

These are just a few of the changes in Chrome 69 for developers, of course,
there’s plenty more.

<img src="/web/updates/images/2018/09/conic-gradient.jpg"
     alt="conical gradient" class="attempt-right" style="width: 125px;">

* From the CSS4 spec, you can now create color transitions around the
  circumference of a circle, using
  [conic gradients](https://www.w3.org/TR/css-images-4/#gradients).
  [Lea Verou](https://lea.verou.me/) has a
  [CSS `conic-gradient()` polyfill](https://leaverou.github.io/conic-gradient/)
  that you can use, and the page includes a whole bunch of really cool
  community submitted samples.
* There’s a new
  [`toggleAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute)
  method on elements that toggles the existence of an attribute, similar to
  [`classList.toggle()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
* JavaScript arrays are getting two new methods:
  [`flat()` and `flatMap()`](/web/updates/2018/03/smooshgate). They return a
  new array with all sub-array elements smooshed into it.
* And [`OffscreenCanvas`](/web/updates/2018/08/offscreen-canvas) moves work
  off the main thread in to a worker, helping to eliminate performance bottlenecks.

<style>
  table.exw-expanded-content { display: table; }
</style>

<section class="expandable" id="easter-eggs">
  Did you find all of the easter e<a href="" class="expand-control">g</a>gs
  in the video?
  </a>
  <ul>
    <li>
      The Chrome <a href="https://www.google.com/googlebooks/chrome/small_00.html">
      comic book</a>
    </li>
    <li><a href="https://www.youtube.com/watch?v=RjbkAECbDBE">Chromercise bands</a></li>
    <li><a href="https://www.youtube.com/watch?v=nCgQDjiotG0">Potato cannon</a></li>
    <li><a href="https://www.youtube.com/watch?v=iYYHRwLqrKM">Pete Monster</a></li>
    <li>Wooden dino from CDS 2017</li>
  </ul>
  <p>
    A special thanks to all the people who have helped to make the
    <a href="https://www.youtube.com/playlist?list=PLNYkxOF6rcIDfz8XEA3loxY32tYh7CI3m">
    28 episodes of New in Chrome</a> happen. Every single one of these people
    are awesome!
  </p>
  <table class="columns">
    <tr>
      <td>
        Heather Duthie<br>
        Tim Malieckal<br>
        Rick Murphy<br>
        Derek Bass<br>
        Kiran Puri<br>
        Nilesh Bell-Gorsia<br>
        Lee Carruthers<br>
      </td>
      <td>
        Philip Maniaci<br>
        Chris Turiello<br>
        Andrew Barker<br>
        Alex Crowe<br>
        Izzy Cosentino<br>
        Norm Magnuson<br>
        Loren Borja<br>
      </td>
      <td>
        Michelle Ortega<br>
        Varun Bajaj<br>
        Ted Maroney<br>
        Andrew Bender<br>
        Andrew Naugle<br>
        Michelle Michelson<br>
        Todd Rawiszer<br>
      </td>
      <td>
        Anthony Mcgowen<br>
        Victoria Canty<br>
        Alexander Koht<br>
        Jarrod Kloiber<br>
        Andre Szyszkowski<br>
        Kelsey Allen<br>
        Liam Spradlin<br>
      </td>
    </tr>
  </table>
  <p>
    Want to see how far New in Chrome has come since our first episode?
    Check out this fun 30 second
    <a href="https://www.youtube.com/watch?v=kMRdS5pusU0">progression video</a>
    that charts our history from our first video to today!
  </p>
  <p>
    And of course, thank <b>you</b> for watching and providing your
    comments and feedback! I read all of them, and take your suggestions
    to heart. These videos have gotten better because of you!
    <b>Thanks for watching!</b>
  </p>
</section>

### New in Chrome Bloopers

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="LScSTMOMEDM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

We put together a fun little blooper reel for you to enjoy! After watching
it, I've learned a few things:

* When I trip over my words, I make some weird noises.
* I make faces and stick my tongue out.
* I wiggle, a lot.


<div class="clearfix"></div>

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 70 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

