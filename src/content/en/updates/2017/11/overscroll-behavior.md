project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Introduction to the CSS overscroll-behavior property.

{# wf_updated_on: 2017-11-09 #}
{# wf_published_on: 2017-11-09 #}

{# wf_tags: chrome63,css,overscroll,scroll #}
{# wf_blink_components: Blink>CSS #}
{# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png #}
{# wf_featured_snippet: The CSS overscroll-behavior property allows developers to override the browser's overflow scroll effects when reaching the top/bottom of content. It can be used to customize or prevent the mobile pull-to-refresh action. #}

# Take control of your scroll: customizing pull-to-refresh and overflow effects {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.border {
  border: 1px solid #ccc;
}
</style>

### TL;DR {: #tldr .hide-from-toc}

The [CSS `overscroll-behavior`][spec] property allows developers to override the
browser's default overflow scroll behavior when reaching the top/bottom of
content. Examples use cases include disabling the browser's pull-to-refresh
feature on mobile, removing overscroll glow and rubberbanding effects, and
preventing page content from scrolling when it's beneath a modal/overlay.

CSS `overscroll-behavior` is requires Chrome 63+ and is development or being
considered by other browsers. See
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) for
more information.
{: .caution }

## Background

### Scroll boundaries and scroll chaining {: #scrollchaining }

<figure class="attempt-right">
  <a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
     target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
           autoplay loop alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Scroll chaining on Chrome Android.</figcaption>
</figure>

Scrolling is one of the most fundamental ways to interact with a page but 
certain UX patterns can be tricky to deal with because of the browser's quirky 
default behaviors. As an example, take an app drawer with a large number of 
items that the user may have to scroll through. When they reach the bottom, the
overflow container stops scrolling because there's no more content to consume. 
In other words, the user
reaches a "scroll boundary". But notice what happens if the user continues to 
scroll. **The content *behind* the drawer starts scrolling**! Scrolling is 
taken over by the parent container; the main page itself in the example. 

Turns out this behavior is called  **scroll chaining**; the browser's default 
behavior when scrolling content. Oftentimes the default is pretty nice, but 
sometimes it's not desirable or even unexpected. Certain apps may want to 
provide a different user experience when the user hits a scroll boundary.

### The pull-to-refresh effect {: #p2r }

Pull-to-refresh is a intuitive gesture popularized by mobile apps such as
Facebook and Twitter. Pulling down on a social feed and releasing creates new 
space for more recent posts to be loaded. In fact, this particular UX has 
become _so popular_ that mobile browsers like Chrome on Android have adopted 
the same effect. Swiping down at the top of the page refreshes the entire page:

<div class="flex">
  <figure class="flex1">
    <a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
       target="_blank">
       <video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
              autoplay loop height="350" class="border"></video>
    </a>
    <figcaption>
      Twitter's custom pull-to-refresh<br>when refreshing a feed in
      their PWA.
    </figcaption>
  </figure>
  <figure class="flex1">
    <a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
       target="_blank">
       <video src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
              autoplay loop height="350" class="border"></video>
    </a>
    <figcaption>
      Chrome Android's native pull-to-refresh action<br>refreshes the entire
      page.
    </figcaption>
  </figure>
</div>

For situations like the Twitter PWA, it might make sense to disable the
native pull-to-refresh action. Why? In this app, you probably don't want the
user accidentally refreshing the page. There's also the potential to see a
double refresh animation! Alternatively, it might be nicer to custom the
browser's action, aligning it more closely to the site's branding. The
unfortunate part is that this type of customization has been tricky to pull off.
Developers end up writing unnecessary JavaScript, add 
[non-passive](/web/tools/lighthouse/audits/passive-event-listeners)
touch listeners (which block scrolling), or stick the entire page in a 100vw/vh
`<div>` (to prevent the page from overflowing). These workarounds have
[well-documented](https://wicg.github.io/overscroll-behavior/#intro) negative
effects on scrolling performance.

We can do better!

## Introducing overscroll-behavior {: #intro }

The `overscroll-behavior` [property][spec] is a new CSS feature that controls
the behavior of what happens when you over-scroll a container (including the
page itself). You can use it to cancel scroll chaining, disable/customize the
pull-to-refresh action, disable rubberbanding effects on iOS, and more.
The best part is that ** using `overscroll-behavior` does not adversely affect
page performance** like the hacks mentioned in the intro!

The property takes three possible values:

1. **auto** - Default. Scrolls that originate on the element may propagate to
ancestor elements. 
- **contain** - prevents scroll chaining. Scrolls do not propagate to ancestors
but local effects within the node are shown. For example, the overscroll glow
effect on Android or the rubberbanding effect on iOS which notifies the user
when they've hit a scroll boundary. **Note**: using
`overscroll-behavior: contain` on the `html` element prevents overscroll
navigation actions.
- **none** - same as `contain` but it also prevents overscroll effects within
the node itself (e.g. Android glow or iOS rubberbanding).

Note: `overscroll-behavior` also supports shorthands for `overscroll-behavior-x`
and `overscroll-behavior-y` if you only want to define behaviors for a certain
axis.

Let's dive into some examples to see how to use `overscroll-behavior`.

## Prevent scrolls from escaping a fixed position element {: #fixedpos }

### The chatbox scenario {: #chat }

<figure class="attempt-right">
  <a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
     target="_blank">
    <video
      src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
      autoplay loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>Content beneath the chat window scrolls too :(</figcaption>
</figure>

Consider a fixed positioned chatbox that sits at the bottom of the page. The
intention is that the chatbox is self-contained component and that it scrolls
separately from the content behind it. However, because of scroll chaining, the
document starts scrolling as soon as the user hits the last message in the chat
history.

For this app, it's more appropriate to have scrolls that originate within the
chatbox stay within the chat. We can make that happen by adding
`overscroll-behavior: contain` to the element that holds the chat messages:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Essentially, we're creating a logical separation between the chatbox's scrolling
context and the main page. The end result is that the main page stays put when
the user reaches the top/bottom of the chat history. Scrolls that start in the
chatbox do not propagate out.

### The page overlay scenario {: #overlay }

Another variation of the "underscroll" scenario is when you see content
scrolling behind a **fixed position overlay**. A dead giveaway
`overscroll-behavior` is in order! The browser is trying to be helpful but
it ends up making the site look buggy.

**Example** - modal with and without `overscroll-behavior: contain`:

<figure class="flex">
  <div class="flex1">
    <a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
       target="_blank">
      <video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
             autoplay loop height="290"></video>
    </a>
    <figcaption>
      <b>Before</b>: page content scrolls beneath overlay.
    </figcaption>
  </div>
  <div class="flex1">
    <a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
       target="_blank">
      <video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
             autoplay loop height="290"></video>
    </a>
    <figcaption>
      <b>After</b>: page content doesn't scroll beneath overlay.
    </figcaption>
  </div>
</figure>

## Disabling pull-to-refresh  {: #disablp2r }

**Turning off the pull-to-refresh action is a single line of CSS**. Just prevent
scroll chaining on the entire viewport-defining element. In most cases, that's
`<html>` or `<body>`:

```css
body {
  /* Disables pull-to-refresh but allows overglow effects. */
  overscroll-behavior-y: contain;
}
```

With this simple addition, we fix the double pull-to-refresh animations in
the [chatbox demo](https://ebidel.github.io/demos/chatbox.html) and can
instead, implement a custom effect which uses a neater loading animation. The
entire inbox also blurs as the inbox refreshes:

<figure class="flex">
  <div class="flex1">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
           autoplay loop height="225"></video>
    <figcaption>Before</figcaption>
  </div>
  <div class="flex1">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
           autoplay loop height="225"></video>
    <figcaption>After</figcaption>
  </div>
</figure>

Here's a snippet of the
[full code](https://github.com/ebidel/demos/blob/master/chatbox.html):

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top fo the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Disabling glow bounce and rubberbanding {: #disableglow }

To disable the bounce effect when hitting a scroll boundary, use
`overscroll-behavior-y: none`:

```css
body {
  /* Disables pull-to-refresh and overglow effects. Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="flex">
  <div class="flex1">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
           autoplay loop height="350" class="border"></video>
    <figcaption>
      <b>Before</b>: hitting scroll boundary shows glow bounce.
    </figcaption>
  </div>
  <div class="flex1">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4"
           autoplay loop height="350" class="border"></video>
    <figcaption><b>After</b>: glow bounce disabled.</figcaption>
  </div>
</figure>

Note: This will still keep left/right swipe navigations. To prevent those as
well, use `overscroll-behavior-x: none`. However, this feature has yet to be
implemented in Chrome.

## Full demo {: #demo }

Putting it all together, the full
[chatbox demo](https://ebidel.github.io/demos/chatbox.html), uses
`overscroll-behavior` to create a custom pull-to-refresh animation
and disable scrolls from escaping the chatbox widget. This provides an optimal
user experience that would have been tricky to achieve without CSS
`overscroll-behavior`.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html"
     target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4"
           autoplay loop alt="Chatbox demo" height="600"></video>
  </a>
  <figcaption>
    <a href="https://ebidel.github.io/demos/chatbox.html"
       target="_blank">View demo</a> |
    <a href="https://github.com/ebidel/demos/blob/master/chatbox.html"
       target="_blank">Source</a>
  </figcaption>
</figure>

<br>

{% include "comment-widget.html" %}

[spec]: https://wicg.github.io/overscroll-behavior/
