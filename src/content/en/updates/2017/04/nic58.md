project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 58 for developers? IndexedDB 2.0, display fullscreen and new options for sandboxed iframes.

{# wf_published_on: 2017-04-19 #}
{# wf_updated_on: 2017-10-06 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome58,new-in-chrome,iframe,sandbox,indexeddb,progressive-web-apps,fullscreen #}
{# wf_featured_snippet: With Chrome 58, Progressive Web Apps are more immersive with display: fullscreen. IndexedDB 2.0 is now supported and sandboxed iFrames get more options. Pete LePage has all the details and how you can use these new developer features in Chrome 58. #}

# New in Chrome 58 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="y5-hH8DnqMk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* The [IndexedDB 2.0](#idb2) standard is now fully supported in Chrome, and
  features new schema management, bulk action methods, and more
  standardized handling of failures.
* Progressive Web Apps become more immersive with
  [`display: fullscreen`](#fullscreen).
* [`allow-top-navigation-by-user-activation`](#iframes) gives sandboxed
  `iframes` new powers
* And there’s plenty [more](#more)!

Note: Want the full list of changes? Check out the
[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/57.0.2987.98..58.0.3029.81?pretty=fuller&n=10000)

<div class="clearfix"></div>

I’m Pete LePage. Let’s dive in and see what’s new for developers in Chrome 58! 

<div class="clearfix"></div>

## IndexedDB 2.0 {: #idb2 }

The structure of your site’s database has large performance impacts, and can
be difficult to change.
[IndexedDB 2.0](https://hacks.mozilla.org/2016/10/whats-new-in-indexeddb-2-0/) 
changes that.

* `object` stores and `indexes` can now be renamed in-place after a
  refactoring. 
* Binary keys allow more natural keys without worrying about performance
  penalties.
* Data retrieval is easier with the `getKey()`, `openKeyCursor()` and
  `continuePrimaryKey()` methods. 

And bulk recovery of entire datasets no longer needs a cursor with the
`getAll()` and `getAllKey()`.

## Full screen Progressive Web Apps {: #fullscreen }

When Progressive Web Apps are launched from the Android home screen, they
launch in a standalone app-like mode that hides the omnibox. This helps
create an engaging user experience, and frees up screen space for content. 

However, for even more immersive experiences like games, video players,
or other rich content, mobile UI elements such as the system bars can
still be a distraction and take up valuable pixels that you may want.

Now you can make your Progressive Web App feel fully immersive by setting 
`display: fullscreen` in your
[web app manifest](/web/fundamentals/web-app-manifest).

<figure>
  <img src="/web/updates/images/2017/04/launch-fullscreen.png">
  <figcaption>
    A PWA launched from the home screen (left), launched from the home screen
    in <code>standalone</code> mode (middle), and launched from the home screen in
    <code>fullscreen</code> mode (right).
  </figcaption>
</figure>

When your app is launched from the home screen, all non-app mobile UI
elements will be hidden.

## Sandboxed iframe Improvements {: #iframes }

Chrome 58 now supports the new iframe sandbox keyword 
[`allow-top-navigation-by-user-activation`](https://html.spec.whatwg.org/multipage/browsers.html#attr-iframe-sandbox-allow-top-navigation-by-user-activation). 

When triggered by a user interaction, this keyword gives sandboxed iframes the
ability to navigate the top-level page, while still blocking auto-redirects.

## And more! {: #more }

And of course, there’s plenty more.

* Say goodbye to the `clearfix` hack. Instead of manually resetting
  multiple layout properties like float and clear, you can now add a new
  block-formatting context using `display: flow-root`. 
* `PointerEvents.getCoalescedEvents()` allows you to access all input events
  since the last time a `PointerEvent` was delivered. Perfect for when you
  need a precise history of points for things like drawing apps.
* And `Workers` and `SharedWorkers` can now be created using `data:` URLs,
  making development with `Workers` more secure by giving them an opaque origin.


These are just a few of the changes in Chrome 58 for developers.  

If you enjoyed this video, check out
[Designer vs. Developer](https://www.youtube.com/playlist?list=PLNYkxOF6rcIC60856GnLEV5GQXMxc9ByJ),
a new video series that tries to solve the challenges faced when designers
and developers work together. 

Then [subscribe](https://goo.gl/6FP1a5) to our
[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/), and
you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.


I’m Pete LePage, and as soon as Chrome 59 is released, I’ll be right
here to tell you -- what’s new in Chrome!

{% include "comment-widget.html" %}
