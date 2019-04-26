project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A brand new API is in the works to help measure frames per second in the wild, but it needs your feedback.

{# wf_updated_on: 2019-03-15 #}
{# wf_published_on: 2014-11-25 #}
{# wf_tags: news,performance,testing,frontend #}
{# wf_blink_components: N/A #}

# Developer feedback needed: Frame Timing API {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}



Dogfood: this API is not yet implemented; we want [feedback from developers](https://github.com/w3c/frame-timing/issues).

Over the past few years browsers have made huge strides in terms of rendering performance, especially on mobile. Where previously you had no hope of hitting a smooth framerate for anything remotely complex, today it's at least achievable if you take care.

For most of us, though, there's a disconnect between what we can reasonably test on our own devices and what our users experience. If they don't get a silky smooth 60fps then their experience is impaired, and ultimately they'll go elsewhere and we'll suffer. Just as well, then, that the W3C is discussing a new API that could help us see what our users see: the [Frame Timing API](https://github.com/w3c/frame-timing).

[Jake Archibald](https://jakearchibald.com/){: .external } and I recently recorded a video overview of the API, so if you prefer watching over reading take a look:

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="4zoC3eaa9z0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Uses of the Frame Timing API

There are undoubtedly a bunch of things you could do with the Frame Timing API, and, crucially, you get to measure what's important to you and for your project. Even so, here are a few ideas:

* Tracking the fps of your JavaScript and CSS animations.
* Tracking the smoothness of your page scrolls (or perhaps that nifty infinite scrolling list you have.)
* Automatically scaling back your showbiz effects based on the device's current load.
* Regression testing on runtime performance metrics.

## The elevator pitch

Here's what the API currently looks like in the spec: with it you would get to pull data on renderer thread timing, where JavaScript, styles and layout run. (You may have heard the renderer thread called the main thread; it's the same thing by another name.)


    var rendererEvents = window.performance.getEntriesByType("renderer");


Each of the renderer thread records you get back look roughly like this:


    {
      sourceFrameNumber: 120,
      startTime: 1342.549374253
      cpuTime: 6.454313323
    }


Each record is essentially an object that contains a unique frame number, a [high resolution timestamp](https://www.w3.org/TR/hr-time/#domhighrestimestamp) for when the frame started, and another for how much CPU time it used. With an array of these you can look at each of the `startTime` values and find out if the main thread is going at 60fps; essentially "does each frame’s `startTime` go up in roughly 16ms chunks?"

But more than that, you also get the `cpuTime`, so you’ll know if you’re comfortably inside the 16ms boundary, or if you were down to the wire. If the `cpuTime` is right up near the 16ms boundary there’s not much room for things like garbage collection kicking in and, with CPU usage high, battery consumption will also be higher.

In addition to the renderer thread, you also get to pull data on compositor thread timing, where painting and compositing happen:


    var compositeThreadEvents = window.performance.getEntriesByType("composite");


Each of these also come back with a source frame number, which you can use to tie back to the main thread’s events:


    {
      sourceFrameNumber: 120,
      startTime: 1352.343235321
    }


Because of the way compositing often works in browsers, there may be several of these records per renderer thread record, so you can use the `sourceFrameNumber` to tie those back to together. There’s also some discussion as to whether there should be CPU time in these records as well, so if you feel strongly speak up on the [GitHub issues](https://github.com/w3c/frame-timing/issues).

## More information

This API isn't shipping yet, but hopefully it will do soon. In the meantime here are some things you can read and do:

* **[Read the explainer doc on the repo](https://github.com/w3c/frame-timing/wiki/Explainer).** There is a lot of nuance about how you should best record the frame data for it to be meaningful, and the explainer gives some direction here.
* **[Check out the latest draft of the spec](http://wicg.github.io/frame-timing/).** It's pretty light, and it's well worth a read.
* **[File issues for missing features or potential headaches](https://github.com/w3c/frame-timing/issues).** You know what you would want to measure, so please do provide feedback if you think there's something you can't do with the API that you'd like to.


