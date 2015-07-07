---
rss: false
layout: article
title: "Diagnose Forced Synchronous Layouts"
seotitle: "Diagnose Forced Synchronous Layouts"
description: "Learn how to use the Timeline tool to diagnose forced synchronous layouts in an animation."
introduction: "Learn how to use the Timeline tool to diagnose forced synchronous layouts in an animation."
article:
  written_on: 2015-04-14
  updated_on: 2015-07-07
  order: 3
authors:
  - megginkearney
priority: 0
collection: rendering-tools
key-takeaways:
  tldr-tbd:
    - TBD tldr.
---
{% wrap content %}

This demo shows how you can use the Timeline to identify a kind of performance bottle-neck called 'forced synchronous layouts'. The demo application animates several images back and forth using [requestAnimationFrame()](http://docs.webplatform.org/wiki/apis/timing/methods/requestAnimationFrame), the [recommended approach](http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision) for performing frame-based animation. But there's a considerable amount of stuttering and jank as the animation runs.

{% include modules/toc.liquid %}

## Make a recording

First make a recording of the animation:

1. Open the {% link_sample _code/forcedsync.html %}demo{% endlink_sample %}.
2. Click **Start** to start the animation.
3. Open the Timeline panel on this page, and go the Frames view.
4. Click the Record button in the Timeline.
5. After after a second or two (10-12 frames recorded) stop the recording and click **Stop** to stop the animation.

## Analyze the recording

Looking at the recording of the first few frames, it's clear that each one is taking over 300ms to complete. If you hover your mouse over one of the frames a pop-up appears showing additional details about the frame.

![First recording](imgs/frame-rate.png)

Locate an Animation Frame Fired record and notice the yellow warning icon next to it, indicating a forced synchronous layout. The icon is slightly dimmed indicating that one of its child records contains the offending code, rather than this record itself. Expand the Animation Frame Fired to view its children.

![View child records of Animation Frame Fired](imgs/recording-1.png)

The child records show a long, repeating pattern of **Recalculate Style** and **Layout** records. Each layout record is a result of the style recalculation that, in turn, is a result of the `requestAnimationFrame()` handler requesting the value of `offsetTop` for each image on the page. Hover your mouse over one of the Layout records and click the link for sources.js next to the Layout Forced property.

![Layout warning](imgs/layout-warning-hover.png)

The Sources panel opens the source file at the `update()` function, which is the `requestAnimationCallback()` callback handler. The handler computes the image's `left` CSS style proeprty on the the image's `offsetTop` value. This forces Chrome to perform a new layout immediately to make sure it provides the correct value.

{% include_code _code/forcedsync.html forcedsync javascript %}

We know that forcing a page layout during every animation frame is slowing things down. Now we can try to fix the problem directly in DevTools.

## Apply fix within DevTools

Now that we have an idea what's causing the performance issues, we can modify the JavaScript file directly in the Sources panel and test our changes right away.

1. In the Sources panel that was opened previously,
`movers[m].style.left` with the commented line below it: `movers[m].style.left = ((Math.sin(m + timestamp/1000)+1) * 500) + 'px';` This version computes each image's `left` style property on its index in its holding array instead of on a layout-dependent property (`offsetWidth`).
2. Save your changes by pressing Cmd-S or Ctrl-S.

## Verify with another recording

The animation is clearly faster and smoother than before, but it's always good practice to measure the difference with another recording. It should look something like the recording below.

![Fixed demo](imgs/fixed.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
