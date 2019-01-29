project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Better specification compliance and new features coming in Chrome 50.

{# wf_updated_on: 2016-04-17 #}
{# wf_published_on: 2016-03-14 #}
{# wf_tags: webanimations,chrome50,chrome51 #}
{# wf_featured_image: /web/updates/images/generic/animations.png #}

# Web Animations Improvements in Chrome 50 {: .page-title }

{% include "web/_shared/contributors/alexdanilo.html" %}



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

### Cancel events

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



    element.animate([ { opacity: 1 }, { opacity: 0 } ], 500);
    

By specifying the `id` property, it’ll be set on the 
[Animation](http://w3c.github.io/web-animations/#animation) object returned 
which can help when debugging your content when you have lots of 
[Animation](http://w3c.github.io/web-animations/#animation) objects to deal 
with. Here’s an example of how you’d specify an `id` for an animation you instantiate:


    element.animate([{opacity: 1}, {opacity: 0}], {duration: 500, id: "foo"});
    

### State change for the pause() method

The [`pause()`](http://w3c.github.io/web-animations/#dom-animation-pause)
method is used to pause an animation that’s in progress. If you check the state
of the animation using the [`playState`](http://w3c.github.io/web-animations/#dom-animation-playstate)
attribute it should be set to [`paused`](http://w3c.github.io/web-animations/#paused-play-state)
after the `paused()` method has been called. In Chrome versions prior to 50, 
the [`playState`](http://w3c.github.io/web-animations/#dom-animation-playstate)
attribute would indicate `idle` if the animation hadn’t started yet, however
now it reflects the correct state which is 
[`paused`](http://w3c.github.io/web-animations/#paused-play-state).

### Removing dashed names as keys in keyframes

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


