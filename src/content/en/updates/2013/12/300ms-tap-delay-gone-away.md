project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Every click interaction in mobile browsers is hampered with a 300ms delay, but that's gone in Chrome 32 for mobile-optimised sites!

{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2013-12-12 #}
{# wf_tags: news,mobile,performance,touchevent #}

# 300ms tap delay, gone away {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

<style>
.phone-screenshot {
  max-width: 360px;
  margin: 20px auto;
  display: block;
}
</style>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="AjUpiwvIa5A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

For many years, mobile browsers applied a 300-350ms delay between `touchend` and `click` while they waited to see if this was going to be a double-tap or not, since double-tap was a gesture to zoom into text.

Ever since the first release of Chrome for Android, this delay was removed if pinch-zoom was also disabled. However, pinch zoom is an important accessibility feature. As of Chrome 32 (back in 2014) this **delay is gone** for **mobile-optimised** sites, **without removing pinch-zooming**! Firefox and IE/Edge did the same shortly afterwards, and in March 2016 a similar fix landed in iOS 9.3.

The performance difference is huge!


Having a UI that responds instantly means the user can quickly press each button with confidence, rather than pausing and waiting for a response. Find out more about the impact of human reaction times and web performance in our [introduction to RAIL](/web/tools/chrome-devtools/profile/evaluate-performance/rail).

To remove the 300-350ms tap delay, all you need is the following in the `<head>` of your page:


    <meta name="viewport" content="width=device-width">
    

This sets the viewport width to the same as the device, and is generally a best-practice for mobile-optimised sites. With this tag, browsers assume you've made text readable on mobile, and the double-tap-to-zoom feature is dropped in favour of faster clicks.

If for some reason you cannot make this change, you can use `touch-action: manipulation` to achieve the same effect either across the page or on particular elements:

    html {
      touch-action: manipulation;
    }

This technique isn't supported in Firefox, so the viewport tag is much prefered.

## Is losing double-tap-to-zoom an accessibility concern?

No. Pinch zoom continues to work, and OS features cater for users who find this gesture difficult. On Android, [maginification gestures](https://support.google.com/accessibility/android/answer/6006949) takes care of it. Tools like this even work outside the browser.

## What about older browsers?

<p><a href="https://github.com/ftlabs/fastclick">FastClick by FT Labs</a> uses touch events to trigger clicks faster &amp; removes the double-tap gesture. It looks at the amount your finger moved between <code>touchstart</code> and <code>touchend</code> to differentiate scrolls and taps.</p>

<p>Adding a <code>touchstart</code> listener to everything has a performance impact, because lower-level interactions such as scrolling are delayed by calling the listener to see if it <code>event.preventDefault()</code>s. Thankfully, FastClick will avoid setting listeners in cases where the browser already removes the 300ms delay, so you get the best of both!</p>


{% include "comment-widget.html" %}
