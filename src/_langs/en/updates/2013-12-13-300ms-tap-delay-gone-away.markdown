---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2013-12-13

title: "300ms tap delay, gone away"
description: "Every click interaction in mobile browsers is hampered with a 300ms delay, but that's gone in Chrome 32 for mobile-optimised sites!"
article:
  written_on: 2013-12-13
  updated_on: 2013-12-13
authors:
  - jakearchibald
tags:
  - mobile
  - performance
  - touchevent
permalink: /updates/2013/12/300ms-tap-delay-gone-away.html
---
<style>
  .tag {
    margin: 0;
  }
</style>
<p>You'll find large articles throughout this site dedicated to shaving 10ms here and 90ms there in order to deliver a fast and fluid user experience. Unfortunately every touch-based mobile browser, across platforms, has an artificial ~300ms delay between you tapping a thing on the screen and the browser considering it a "click". When people think of the web as being sluggish compared to native apps on mobile, this is this one of the main contributors.</p>

<p>However, as of <a href="https://play.google.com/store/apps/details?id=com.chrome.beta">Chrome 32 for Android</a>, which is currently in beta, this <strong>delay is gone</strong> for <strong>mobile-optimised</strong> sites, <strong>without removing pinch-zooming</strong>!</p>


{% video //www.youtube.com/embed/AjUpiwvIa5A?rel=0 %} {% endvideo %}

<p>This optimisation applies to any site that uses:</p>

{% highlight HTML %}
<meta name="viewport" content="width=device-width">
{% endhighlight %}

<p>(or any equivalent that makes the viewport <= device-width)</p>

<h2>Why do clicks have a 300ms delay?</h2>

<p>If you go to a site that isn't mobile optimised, it starts zoomed out so you can see the full width of the page. To read the content, you either pinch zoom, or double-tap some content to zoom it to full-width. This double-tap is the performance killer, because with every tap we have to wait to see if it might become a double-tap, and that wait is 300ms. Here's how it plays out:</p>

<ol>
<li><code>touchstart</code></li>
<li><code>touchend</code></li>
<li>Wait 300ms in case of another tap</li>
<li><code>click</code></li>
</ol>


<p>This pause applies to click events in JavaScript, but also other click-based interactions such as links and form controls.</p>

<p>You can't simply shortcut this with <code>touchend</code> listeners either. Compare these demos on a mobile browser other than Chrome 32:</p>

<ul>
<li><a href="http://jsbin.com/aSeWEwA/1/quiet">Using click events</a></li>
<li><a href="http://jsbin.com/aSeWEwA/2/quiet">Using touchend events</a></li>
</ul>


<p>Tapping on the rows changes their colour. The <code>touchend</code> example is much faster but also triggers after scrolling depending on the browser. This is because <a href="http://www.w3.org/TR/touch-events/">the spec</a> doesn't define what can cancel the flow of touch events. Current versions of iOS Safari, Firefox, IE, and the old Android Browser trigger <code>touchend</code> after scrolling, Chrome doesn't.</p>

<p><a href="https://dvcs.w3.org/hg/pointerevents/raw-file/tip/pointerEvents.html">Microsoft's PointerEvents spec</a> does the right thing and specifies that <code>pointerup</code> doesn't trigger if a lower-level action such as scrolling occurs. However, currently <a href="http://caniuse.com/#feat=pointer">only IE supports pointer events</a>, although <a href="https://code.google.com/p/chromium/issues/detail?id=196799">Chrome has a ticket for it</a>. But even then, the 300ms delay would only be dropped on sites that used this listener in a way that applied to all links, form elements, and JavaScript interactions on the page.</p>

<h2>How Chrome removed the 300ms delay</h2>

<p>Chrome and Firefox for Android have, for some time now, removed the 300ms tap delay for pages with this:</p>

{% highlight HTML %}
<meta name="viewport" content="width=device-width, user-scalable=no">
{% endhighlight %}

<p>Pages with this cannot be zoomed, therefore "double-tap to zoom" isn't an interaction, therefore there's no need to wait for double-taps. However, we also lose pinch-zooming.</p>

<p>Pinch-zooming is great for taking a closer look at a photo, some small print, or dealing with a set buttons/links that are placed too closely together. It's an out-of-the-box accessibility feature.</p>

<p>If a site has…</p>

{% highlight HTML %}
<meta name="viewport" content="width=device-width">
{% endhighlight %}

<p>…double-tap zooms in a little bit. Not a particularly useful amount. A further double-tap zooms back out. We feel this feature, on mobile-optimised pages, isn't useful. So we removed it! This means we can treat taps as clicks instantly, but we <strong>retain pinch-zooming</strong>.</p>

<h2>Is this change an accessibility concern?</h2>

<p>We don't believe so, but the reason we release beta versions of Chrome is so users can try new features and give us feedback.</p>

<p>We tried to imagine a user this may affect, someone who:</p>

<ul>
<li>has a motor impairment that prevents multi-touch interaction such as pinch-zoom, but not two taps in the same area within 300ms</li>
<li>has a minor visual impairment that is overcome by the small amount of zooming provided by double-tap on mobile optimised sites</li>
</ul>

<p>But they're catered for by the text sizing tools in Chrome's settings, or the screen magnifier in Android, which covers all sites and native apps, and can be activated by triple-tap.</p>

<style>
  .mob-a11y-screenshots {
    text-align: center;
  }
  .mob-a11y-screenshots img {
    margin: 5px;
    max-height: 370px;
  }
</style>

<p class="mob-a11y-screenshots">
  <a href="http://www.html5rocks.com/static/images/updates/300ms/chrome-a11y.png"><img src="{{site.baseurl}}/updates/images/misc/chrome-a11y.png" alt="Chrome accessibility settings"></a><a href="http://www.html5rocks.com/static/images/updates/300ms/android-magnification.png"><img src="{{site.baseurl}}/updates/images/misc/android-magnification.png" alt="Android screen magnification"></a>
</p>

<p>However, we may have missed something, so if you are affected by this change, or know someone who is, let us know in the comments or <a href="https://code.google.com/p/chromium/issues/list">file a ticket</a>.</p>

<h2>Will other browsers do the same?</h2>

<p>I don't know, but I hope so.</p>

<p><a href="https://bugzilla.mozilla.org/show_bug.cgi?id=941995">Firefox has a ticket for it</a> and currently avoids the 300ms delay for unzoomable pages.</p>

<p>On iOS Safari, double-tap is a scroll gesture on unzoomable pages. For that reason they <a href="https://bugs.webkit.org/show_bug.cgi?id=122212">can't remove the 300ms delay</a>. If they can't remove the delay on unzoomable pages, they're unlikely to remove it on zoomable pages.</p>

<p>Windows phones also retain the 300ms delay on unzoomable pages, but they don't have an alternative gesture like iOS so it's possible for them to remove this delay as Chrome has. You can remove the delay using:</p>

{% highlight CSS %}html {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
}{% endhighlight %}

<p>Unfortunately this is a non-standard Microsoft extension to the pointer events spec. Also, programmatic fixes like this are opt-in by the developer, whereas the Chrome fix speeds up any existing mobile-optimised site.</p>

<h2>In the mean time…</h2>

<p><a href="https://github.com/ftlabs/fastclick">FastClick by FT Labs</a> uses touch events to trigger clicks faster &amp; removes the double-tap gesture. It looks at the amount your finger moved between <code>touchstart</code> and <code>touchend</code> to differentiate scrolls and taps.</p>

<p>Adding a <code>touchstart</code> listener to everything has a performance impact, because lower-level interactions such as scrolling are delayed by calling the listener to see if it <code>event.preventDefault()</code>s. Thankfully, FastClick will avoid setting listeners in cases where the browser already removes the 300ms delay, so you get the best of both!</p>
