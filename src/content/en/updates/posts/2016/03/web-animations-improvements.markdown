---
layout: updates/post
title: "Web Animations Improvements in Chrome 50"
description: "Better specification compliance and new features coming in Chrome 50."
published_on: 2016-03-15
updated_on: 2016-04-18
authors:
  - alexdanilo
tags:
  - webanimations
  - chrome50
  - chrome51
---

The [Web Animations API](http://w3c.github.io/web-animations/), which first 
shipped in Chrome 36, provides convenient JavaScript control of
animations in the browser, and is also being implemented in Gecko and WebKit.

Chrome 50 introduces changes to improve interoperability with other browsers
and to be more compliant with the spec. These changes are:

  * Cancel events
  * `Animation.id`
  * State change for the `pause()` method
  * Deprecation of dashed names as keys in keyframes

In Chrome 51, some of these changes are finalized:

  * Removing dashed names as keys in keyframes

### Cancel Events

The [Animation](http://w3c.github.io/web-animations/#the-animation-interface) 
interface includes a method to cancel an animation, funnily enough called 
[`cancel()`](http://w3c.github.io/web-animations/#dom-animation-cancel). 
Chrome 50 implements firing of the cancel event when the method is called as
per the spec, which triggers event handling through the
[`oncancel`](http://w3c.github.io/web-animations/#dom-animation-oncancel) 
attribute if it’s been initialized.

### Support for Animation.id

When you create an animation using 
[`element.animate()`](http://w3c.github.io/web-animations/#dom-animatable-animate) 
you can pass in a number of properties. For example, here’s an example of
animating opacity on an object:


{% highlight javascript %}
element.animate([ { opacity: 1 }, { opacity: 0 } ], 500);
{% endhighlight %}

By specifying the `id` property, it’ll be set on the 
[Animation](http://w3c.github.io/web-animations/#animation) object returned 
which can help when debugging your content when you have lots of 
[Animation](http://w3c.github.io/web-animations/#animation) objects to deal 
with. Here’s an example of how you’d specify an `id` for an animation you instantiate:

{% highlight javascript %}
element.animate([{opacity: 1}, {opacity: 0}], {duration: 500, id: "foo"});
{% endhighlight %}

### State Change for the pause() Method

The [`pause()`](http://w3c.github.io/web-animations/#dom-animation-pause)
method is used to pause an animation that’s in progress. If you check the state
of the animation using the [`playState`](http://w3c.github.io/web-animations/#dom-animation-playstate)
attribute it should be set to [`paused`](http://w3c.github.io/web-animations/#paused-play-state)
after the `paused()` method has been called. In Chrome versions prior to 50, 
the [`playState`](http://w3c.github.io/web-animations/#dom-animation-playstate)
attribute would indicate `idle` if the animation hadn’t started yet, however
now it reflects the correct state which is 
[`paused`](http://w3c.github.io/web-animations/#paused-play-state).

### Removing Dashed Names as Keys in Keyframes

To further comply with the spec. and other implementations, Chrome 50 sends a
warning to the console if dashed names are used for keys in keyframe
animations. The correct strings to use are
camelCase names as per the CSS property to IDL attribute 
[conversion algorithm](https://drafts.csswg.org/cssom/#css-property-to-idl-attribute).

For example, the CSS property `margin-left` would require you to pass in
`marginLeft` as the key.

Chrome 51 removes support for dashed names altogether, so now is a good
time to correct any existing content with the correct naming as per the spec.

### Summary

These changes bring Chrome’s implementation of Web Animations closer to other
browsers implementations and more compliant with the specification which all
helps simplify web page content authoring for better interoperability.
