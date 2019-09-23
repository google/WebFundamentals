project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 77 for developers?

{# wf_published_on: 2019-09-16 #}
{# wf_updated_on: 2019-09-17 #}
{# wf_featured_image: /web/updates/images/2019/09/new-77.jpg #}
{# wf_tags: chrome77,new-in-chrome,chromedevsummit,forms,formdata,lazy-loading,performance #}
{# wf_featured_snippet: Chrome 77 is rolling out now! There’s a better way to track the performance of your site with Largest Contentful Paint. Forms get some new capabilities. Native lazy loading is here. The Chrome DevSummit is happening November 11-12 2019. And plenty more. Let’s dive in and see what’s new for developers in Chrome 77! #}
{# wf_blink_components: N/A #}

# New in Chrome 77 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 77 is rolling out now!

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="S8aVB3IfOR4"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* There’s a better way to track the performance of your site with
  [Largest Contentful Paint](#lcp).
* Forms get some [new capabilities](#new-forms-capabilities).
* [Native lazy loading](#lazy-loading) is here.
* [Chrome DevSummit 2019](#cds2019) is happening November 11-12 2019.
* And plenty [more](#more).

I’m [Pete LePage](https://twitter.com/petele), let’s dive in and see what’s
new for developers in Chrome 77!

<div class="clearfix"></div>

## Largest Contentful Paint {: #lcp }

Understanding and measuring the real world performance of your site can be hard.
Metrics like `load`, or `DOMContentLoaded`, don’t tell you what the user is
seeing on screen. First Paint, and First Contentful Paint, only capture the
beginning of the experience. First Meaningful Paint is better, but it’s
complex, and sometimes wrong.

<img src="/web/updates/images/2019/09/perf-metrics-load-timeline.png">

The **Largest Contentful Paint API**, available starting in Chrome 77, reports
the render time of the largest content element visible in the viewport and
makes it possible to measure when the main content of the page is loaded.

<img src="/web/updates/images/2019/09/lcp-google-filmstrip.png">

To measure the Largest Contentful Paint, you’ll need to use a Performance
Observer, and look for `largest-contentful-paint` events.

```js
let lcp;
const po = new PerformanceObserver((eList) => {
  const e = eList.getEntries();
  const last = e[e.length - 1];
  lcp = last.renderTime || last.loadTime;
});

const poOpts = {
  type: 'largest-contentful-paint',
  buffered: true
}
po.observe(poOpts);
```

Since a page often loads in stages, it’s possible that the largest element
on a page will change, so you should only report the last
`largest-contentful-paint` event to your analytics service.

```js
addEventListener('visibilitychange', function fn() {
  const visState = document.visibilityState;
  if (lcp && visState === 'hidden') {
    sendToAnalytics({'lcp': lcp});
    removeEventListener('visibilitychange', fn, true);
  }
}, true);
```

Phil has a great post about the [Largest Contentful Paint][lcp] on web.dev.

[lcp]: https://web.dev/largest-contentful-paint/

<div class="clearfix"></div>

## New forms capabilities {: #new-forms-capabilities }

Many developers build custom form controls, either to customize the look and
feel of existing elements, or to build new controls that aren’t built in to
the browser. Typically this involves using JavaScript and hidden `<input>`
elements, but it’s not a perfect solution.

Two new web features, added in Chrome 77, make it easier to build custom form
controls, and remove  the many of the existing limitations.

### The `formdata` event

The `formdata` event is a low-level API that lets any JavaScript code
participate in a form submission. To use it, add a `formdata` event listener
to the form you want to interact with.

```js
const form = document.querySelector('form');
form.addEventListener('formdata', ({formData}) => {
  formData.append('my-input', myInputValue);
});
```

When the user clicks the submit button, the form fires the `formdata` event,
which includes a `FormData` object that holds all of the data being submitted.
Then, in your `formdata` event handler, you can update or modify the
`formdata` before it’s submitted.

### Form-associated custom elements

Form-associated custom elements help to bridge the gap between custom elements
and native controls. Adding a static `formAssociated` property tells the browser
to treat the custom element like all other form elements. You should also add
common properties found on input elements, like `name`, `value`, and `validity`
to ensure consistency with native controls.

<pre class="prettyprint lang-js">
class MyCounter extends HTMLElement {
  <strong>static formAssociated = true;</strong>

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._value = 0;
  }
  ...
}
</pre>

Check out [More capable form controls][wd-forms] on web.dev for all the
details!

[wd-forms]: https://web.dev/more-capable-form-controls/

<div class="clearfix"></div>

## Native lazy loading {: #lazy-loading }

<video autoplay loop muted class="attempt-right">
    <source src="https://web.dev/native-lazy-loading/lazyload.webm" type="video/webm">
    <source src="https://web.dev/native-lazy-loading/lazyload.mp4" type="video/mp4">
  </video>

I’m not sure how I missed native lazy loading in my last video! It’s pretty
amazing, so I’m including it now. Lazy loading is a technique that allows
you to defer the loading of non-critical resources, like off-screen `<img>`'s,
or `<iframe>`'s - until they’re needed, increasing the performance of your page.

Starting in Chrome 76, the browser handles lazy loading for you, without the
need to write custom lazy loading code, or use a separate JavaScript library.

<div class="clearfix"></div>

To tell the browser you want an image, or iframe lazy loaded, use the
`loading=”lazy”` attribute. Images and iframes that are “above the fold”
load normally. And those that are below, are only fetched when the user
scrolls near them.

<pre class="prettyprint lang-html">
&lt;img src="image.jpg" <strong>loading="lazy"</strong> width="400" height="250" alt="..."&gt;
</pre>

Check out [Native lazy-loading for the web][wd-lazy] on web.dev for details.

[wd-lazy]: https://web.dev/native-lazy-loading/

## Chrome Dev Summit 2019 {: #cds2019 }

<img src="/web/updates/images/2019/09/cds2019.png" class="attempt-right">

**The Chrome Dev Summit is coming up November 11th and 12th.**

It’s a great opportunity to learn about the latest tools and updates coming
to the web platform, and hear directly from the Chrome engineering team.

It’ll be streamed live on our
[YouTube channel](https://youtube.com/user/ChromeDevelopers/), or if you want
to attend in person, you can request your invite at the
[Chrome Dev Summit 2019](https://developer.chrome.com/devsummit/) website.

## And more! {: #more }

These are just a few of the changes in Chrome 77 for developers, of course,
there’s plenty more.

The [Contact Picker API](/web/updates/2019/08/contact-picker), available as an
origin trial, is a new, on-demand picker that allows users to select an entry
or entries from their contact list and share limited details of the selected
contacts with a website.

And there are new measurement units in the
[`intl.NumberFormat` API](https://v8.dev/features/intl-numberformat).

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 77.

* [What's new in Chrome DevTools (77)](/web/updates/2019/07/devtools)
* [Chrome 77 deprecations & removals](/web/updates/2019/08/chrome-77-deps-rems)
* [ChromeStatus.com updates for Chrome 77](https://www.chromestatus.com/features#milestone%3D77)
* [What's new in JavaScript in Chrome 77](https://v8.dev/blog/v8-release-77)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/76.0.3809.88..77.0.3865.75)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and as soon as Chrome 78 is released, I’ll be right
here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
