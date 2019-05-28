project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Stylus-based drawing applications built for the web suffer from latency issues because a web page has to synchronize graphics updates with the DOM. The desynchronized hint for contexts bypasses the DOM to eliminate the latency.

{# wf_updated_on: 2019-05-28 #}
{# wf_published_on: 2019-05-02 #}
{# wf_tags: chrome75 #}
{# wf_featured_image: /web/updates/images/2019/05/latency.png #}
{# wf_featured_snippet: Stylus-based drawing applications built for the web suffer from latency issues because a web page has to synchronize graphics updates with the DOM. The desynchronized hint for contexts bypasses the DOM to eliminate the latency. #}
{# wf_blink_components: Blink>Canvas #}

# Low-latency rendering with the desynchronized hint {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<img src="/web/updates/images/2019/05/latency.png" class="hint-image attempt-right" alt="Differences in stylus rendering">

<style>
.hint {
  height: 150px;
  width: auto;
}
</style>

Stylus-based drawing applications built for the web have long suffered from
latency issues because a web page has to synchronize graphics updates with the
DOM. In any drawing application, latencies longer than 50 milliseconds can
interfere with a user's hand-eye coordination, making applications difficult to
use.   

The `desynchronized` hint for `canvas.getContext()` invokes a different code
path that bypasses the [usual DOM update
mechanism](https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit#slide=id.p).
Instead the hint tells the underlying system to skip as much compositing as it
is able and in some cases, the canvas's underlying buffer is sent directly to
the screen's display controller. This eliminates the latency that would be
caused by using the renderer compositor queue.

## How good is it?

<img src="/web/updates/images/2019/05/sintel.png" class="sintel attempt-right" alt="Simultaneous rendering of Sintel">

<style>
.sintel {
  height: 300px;
  width: auto;
}
</style>

If you want to get to the code, scroll ahead. To see it in action, you need a
device with a touch screen, and preferably a stylus. (Fingers work too.) If you
have one, try the [2d](https://codepen.io/miguelao/full/WKZaqd) or
[webgl](https://codepen.io/miguelao/full/WKZaqd) samples. For the rest of you
check out this [demo by Miguel Casas](https://codepen.io/miguelao/full/mLLKLg),
one of the engineers who implemented this feature. Open the demo, press play,
then move the slider back and forth randomly and quickly. 

This example uses a one-minute, twenty-one second clip from the short film
[Sintel](https://durian.blender.org/download/) by Durian, the Blender open movie
project. In this example, the movie is played in a `<video>` element whose
contents are simultaneously rendered to a `<canvas>` element.  Many devices can
do this without tearing, though devices with front buffer rendering such as
Chrome OS for example may have tearing. (The movie is great, but heartbreaking.
I was useless for an hour after I saw it. Consider yourself warned.)

## Using the hint

There's more to using low latency than adding `desynchronized` to 
`canvas.getContext()`. I'll go over the issues one at a time.
 
### Create the canvas

On another API I'd discuss feature detection first. For the `desynchronized`
hint you must create the canvas first. Call `canvas.getContext()` and pass it
the new `desynchronized` hint with a value of `true`. 

```javascript
const canvas = document.querySelector('myCanvas');
const ctx = canvas.getContext('2d', { 
  desynchronized: true,
  // Other options. See below.
});
```

### Feature detection

Next, call `getContextAttributes()`. If the returned attributes object has a
`desynchronized` property, then test it. 

```javascript
if (ctx.getContextAttributes().desynchronized) {
  console.log('Low latency canvas supported. Yay!');
} else {
  console.log('Low latency canvas not supported. Boo!');
}
```

### Avoiding flicker

There are two instances where you can cause flicker if you don't code correctly.
  
Some browsers including Chrome clear WebGL canvases between frames. It's
possible for the display controller to read the buffer while it's empty causing
the image being drawn to flicker. To avoid this is to set
`preserveDrawingBuffer` to `true`.

<pre class="prettyprint lang-JavaScript">const canvas = document.querySelector('myCanvas');
const ctx = canvas.getContext('webgl', { 
  desynchronized: true,
  <strong>preserveDrawingBuffer: true</strong>
});</pre>

Flicker can also occur when you clear the screen context in your own drawing
code.  If you must clear, draw to an offscreen framebuffer then copy that to the
screen. 

### Alpha channels

A translucent canvas element, one where alpha is set to true, can still be
desynchronized, but it must not have any other DOM elements above it.

### There can be only one

You cannot change the context attributes after the first call to
`canvas.getContext()`. This has always been true, but repeating it might save
you some frustration if you're unaware or have forgotten . 

For example, let's say that I get a context and specify alpha as false, then
somewhere later in my code I call `canvas.getContext()` a second time with alpha
set to true as shown below. 

```javascript
const canvas = document.querySelector('myCanvas');
const ctx1 = canvas.getContext('2d', {
  alpha: false,
  desynchronized: true,
});

//Some time later, in another corner of code.
const ctx2 = canvas.getContext('2d', {
  alpha: true,
  desynchronized: true,
});
```

It's not obvious that `ctx1` and `ctx2` are the same object. Alpha is still false and a
context with alpha equal to true is never created.

## Supported canvas types

The first parameter passed to `getContext()` is the `contextType`. If you're
already familiar with `getContext()` you're no doubt wondering if anything
other than '2d' context types are supported. The table below shows the context
types that support `desynchronized`.

<table>
  <thead>
    <tr>
      <th><strong>contextType</strong></th>
      <th><strong>Context type object</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><code>'2d'</code></p></td>
      <td><p><code>CanvasRenderingContext2D</code></p></td>
    </tr>
    <tr>
      <td><p><code>'webgl'</code></p></td>
      <td><p><code>WebGLRenderingContext</code></p></td>
    </tr>
    <tr>
      <td><p><code>'webgl2'</code></p></td>
      <td><p><code>WebGL2RenderingContext</code></p></td>
    </tr>
  </tbody>
</table>

## Conclusion

If you want to see more of this, check out the samples. In addition to
the [video example](https://codepen.io/miguelao/full/mLLKLg) already described
there are examples showing both ['2d'](https://codepen.io/miguelao/pen/ZjJNNw)
and ['webgl'](https://codepen.io/miguelao/full/WKZaqd) contexts.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}