---
layout: updates/post
title: "Improving scroll performance with passive event listeners"
description: "New to Chrome 51, passive event listeners provide a major potential boost to scroll performance."
published_on: 2016-06-06
updated_on: 2016-06-06
authors:
  - kaycebasques
tags:
  - performance
  - events
  - chrome51
  - javascript
  - scroll
  - touch
---

New to Chrome 51, passive event listeners are an emerging web standard that provide a major potential boost to scroll performance. Check out the video below for a side-by-side demo of the improvements in action:

{% ytvideo 65VMej8n23A %}

## How it works

When you scroll a page and there's such a delay that the page doesn't feel anchored to your finger, that's called scroll jank. Many times when you encounter scroll jank, the culprit is a touch event listener. Touch event listeners are often useful for tracking user interactions and creating custom scroll experiences, such as cancelling the scroll altogether when interacting with an embedded Google Map. Currently, browsers can't know if a touch event listener is going to cancel the scroll, so they always wait for the listener to finish before scrolling the page. Passive event listeners solve this problem by enabling you to set a flag in the `options` parameter of `addEventListener`  indicating that the listener will never cancel the scroll. That information enables browsers to scroll the page immediately, rather than after the listener has finished.

## Learn more 

Check out the Chromium blog for a high-level overview of how passive event listeners work:

[New APIs to help developers improve scroll performance](https://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html)

And the specification's repository to learn how to implement passive event listeners:

[Passive events listener explainer](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md)

