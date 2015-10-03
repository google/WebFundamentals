---
layout: shared/narrow
title: "Story slide-in/out (part 1)"
description: "Fix slide-in/out animation"
notes:
  styling:
    - Styling will come later
published_on: 2015-09-28
updated_on: 2015-09-28
order: 4
translation_priority: 0
---

Another problem area for our news aggregator app is the basic action of sliding stories in and out. Apart from scrolling, this is the app's most common user interaction feature.

As usual, begin by taking a Timeline recording of a story sliding in and out, and examining the frame rate. The slide-in/out may actually range from a bit janky to basically unusable on various devices. Be sure to view the [live site](http://udacity.github.io/news-aggregator/) on a mobile device, but it is problematic on all platforms.

![storyslidetimeline.png](images/image05.png)

As you can see, the slide-in/out animation is firing a timer and, as you can tell from the red triangle ![fslwarninginline.png](images/image04.png) on the Recalculate Style event, there's a forced synchronous layout occurring. The details point to line 180 in the app.js file, which is a function called `animate`. Let's examine that function.</span>

```javascript
function animate () {
  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();
  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;
  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;
  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;
  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```
One of the first things you'll notice is the `setTimeout` that sets up the next call to `animate`. As you learned in the previous exercise, visible work that is done to the page should typically go inside a `requestAnimationFrame` call. But that `setTimeout` in particular is a problem.

>**Discussion: setTimeout and setInterval**
>
>A great deal of older code on the web uses `setTimeout` or `setInterval` for animations. That's because these functions existed before `requestAnimationFrame`. As we noted earlier, the JavaScript engine pays no attention to the rendering pipeline when scheduling these functions, so they just run whenever they are called.
>
>They are perfectly good functions to use when you want to wait for some time to elapse before continuing, or when you want to do some repeated work inside a loop, as long as that work doesn't involve screen animation.
>
>Again, the best tool at our disposal for page animation work today is `requestAnimationFrame`.

The obvious -- and easy -- fix here is to force each call to `animate` to be scheduled at the beginning of its frame sequence by putting it inside a `requestAnimationFrame`.

```javascript
function animate () {
  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();
  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;
  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;
  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate, 4);
  else
        left = 0;
  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

If you take another Timeline recording, you'll see a moderate to significant performance improvement, depending on the device.

Bonus question: Think about what's happening with story slide-in/out. We're just causing a story to appear and disappear on the page, revealing and hiding content. It seems to be a simple transition process; do we even need JavaScript for that, or could it be handled with CSS alone? We'll revisit this scenario in **Exercise 5**.