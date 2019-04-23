project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 74 for developers?

{# wf_published_on: 2019-04-23 #}
{# wf_updated_on: 2019-04-23 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome74,new-in-chrome,css,feature-policy,media-queries,es6,accessibility #}
{# wf_featured_snippet: Just in time for Google I/O, Chrome 74 is landing now! It adds support for private class fields; allows you to detect when the user has requested a reduced motion experience; adds support for CSS transition events, and plenty more. Let’s dive in and see what’s new for developers in Chrome 74! #}
{# wf_blink_components: N/A #}

# New in Chrome 74 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="zBlItTR8BsY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

In Chrome 74, we've added support for:

* Creating [private class fields](#private-class-fields) in JavaScript is now
  much cleaner.
* You can detect when the user has requested a
  [reduced motion experience](#prefers-reduced-motion) experience.
* CSS [transition events](#transition-events)
* Adds new [feature policy APIs](#feature-policy-api) to check if features are
  enabled or not.

And there’s [plenty more](#more)!

I’m [Pete LePage](https://mobile.twitter.com/petele). Let’s dive in and see
what’s new for developers in Chrome 74!

<div class="clearfix"></div>

### Change log {: .hide-from-toc }

This covers only some of the key highlights, check the links below for
additional changes in Chrome 74.

* [What's new in Chrome DevTools (74)](/web/updates/2019/03/devtools)
* [Chrome 74 deprecations & removals](/web/updates/2019/03/chrome-74-deps-rems)
* [ChromeStatus.com updates for Chrome 74](https://www.chromestatus.com/features#milestone%3D74)
* [What's new in JavaScript in Chrome 74](https://v8.dev/blog/v8-release-74)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/73.0.3683.74..74.0.3729.108)

## Private class fields {: #private-class-fields }

Class fields simplify class syntax by avoiding the need for constructor
functions just to define instance properties. In Chrome 72, we added support for
[public class fields](/web/updates/2019/01/nic72#public-class-fields).

```js
class IncreasingCounter {
  // Public class field
  _publicValue = 0;
  get value() {
    return this._publicValue;
  }
  increment() {
    this._publicValue++;
  }
}
```

And I said private class fields were in the works. I’m happy to say that
private class fields have landed in Chrome 74. The new private fields syntax is
similar to public fields, except you mark the field as being private by using a
`#` (pound sign). Think of the `#` as being part of the field name.

```js
class IncreasingCounter {
  // Private class field
  #privateValue = 0;
  get value() {
    return this.#privateValue;
  }
  increment() {
    this.#privateValue++;
  }
}
```

Remember, `private` fields are just that, **private**. They’re accessible
inside the class, but not available outside the class body.

```js
class SimpleClass {
  _iAmPublic = 'shared';
  #iAmPrivate = 'secret';
  doSomething() {
    ...
  }
}
```

To read more about public and private classes, check out Mathias’s post on
[class fields](/web/updates/2018/12/class-fields).

<div class="clearfix"></div>

## `prefers-reduced-motion` {: #prefers-reduced-motion }

<img class="attempt-right"
     src="/web/updates/images/2019/03/prefers-reduced-motion/android-remove-animations.png">

Some users have reported getting motion sick when viewing parallax scrolling,
zooming, and other motion effects. To address this, many operating systems
provide an option to reduce motion whenever possible.

Chrome now provides a media query, `prefers-reduced-motion` - part of
[Media Queries Level 5 spec][mq-spec], that allows you to detect when this
option is turned on.

```css
@media (prefers-reduced-motion: reduce)
```

<div class="clearfix"></div>

Imagine I have a sign-up button that draws attention to itself with a slight
motion. The new query lets me shut off the motion for just the button.

```css
button {
  animation: vibrate 0.3s linear infinite both;
}

@media (prefers-reduced-motion: reduce) {
  button {
    animation: none;
  }
}
```

Check out Tom’s article
[Move Ya! Or maybe, don't, if the user prefers-reduced-motion!][p-r-m-a] for
more details.

[mq-spec]: https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-reduced-motion
[p-r-m-a]: /web/updates/2019/03/prefers-reduced-motion

<div class="clearfix"></div>

## CSS `transition` events {: #transition-events }

The CSS Transitions specification requires that
[transition events][transition-events] are sent when a transition is enqueued,
starts, ends, or is canceled. These events have been supported in other
browsers for a while…

But, until now, they weren’t supported in Chrome. In Chrome 74 you can now
listen for:

* `transitionrun`
* `transitionstart`
* `transitionend`
* `transitioncancel`

By listening for these events, its possible to track or change behavior when a
transition is run.

[transition-events]: https://www.w3.org/TR/css-transitions-1/#transition-events

## Feature policy API updates {: #feature-policy-api }

Feature policies, allow you to selectively enable, disable, and modify the
behavior of APIs and other web features. This is done either through the
Feature-Policy header or through the allow attribute on an iframe.

**HTTP Header:** `Feature-Policy: geolocation 'self'`

```html
<iframe ... allow="geolocation self">
</iframe>
```

Chrome 74 introduces a new set of APIs to check which features are enabled:

* You can get a list of features allowed with
  `document.featurePolicy.allowedFeatures()`.
* You can check if a specific feature is allowed with
  `document.featurePolicy.allowsFeature(...)`.
* And, you can get a list of domains used on the current page that allow a
  specified feature with `document.featurePolicy.getAllowlistForFeature()`.

Check out the
[Introduction to Feature Policy post](/web/updates/2018/06/feature-policy)
for more details.

<div class="clearfix"></div>

## And more! {: #more }

These are just a few of the changes in Chrome 74 for developers, of course,
there’s plenty more. Personally, I’m pretty excited about
[KV Storage](/web/updates/2019/03/kv-storage), a super fast, async,
key/value storage service, available as an origin trial.

### Google I/O is happening soon!

And don’t forget - [Google I/O](https://events.google.com/io/) is just a few
weeks away (May 7th to 9th) and we’ll have lots of great new stuff for you.
If you can't make it, all of the sessions will be live streamed, and will be
available on our
[Chrome Developers YouTube channel](https://youtube.com/user/ChromeDevelopers/)
afterwards.

<div class="clearfix"></div>

### Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 75 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
