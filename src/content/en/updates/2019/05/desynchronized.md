project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The desynchronized hint invokes bypasses the DOM to eliminate the latency caused by using the renderer compositor queue.

{# wf_updated_on: 2019-05-02 #}
{# wf_published_on: 2019-05-02 #}
{# wf_tags: chrome75 #}
{# wf_featured_image: /web/updates/images/2019/05/latency.png #}
{# wf_featured_snippet: The desynchronized hint invokes bypasses the DOM to eliminate the latency caused by using the renderer compositor queue. #}
{# wf_blink_components: Blink>Canvas #}

# Lot-latency rendering contexts {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

Stylus-based drawing applications built on web technology have long suffered
from latency issues because a web page has to synchronize graphics updates with
the DOM. In any drawing application, latencies longer than 50 milliseconds are
enough to interfere with a user's hand-eye coordination, making such
applications difficult to use.   
The desynchronized hint for `canvas.getContext()` invokes a different code path
that bypasses the usual DOM update mechanism. Instead the hint tells the
underlying system to skip as much compositing as it is able and in some cases,
the canvas's underlying buffer is sent directly to the screen's display
controller. In such cases this eliminates the latency that would be caused by
using the renderer compositor queue.

![Differences in stylus rendering](/web/updates/images/2019/05/latency.png)

## How good is it?

To really see it in action, you need a device with a touch screen, and even
better if you have a stylus connected to it. If you have one, try the
[2d](https://www.google.com/url?q=https://codepen.io/miguelao/full/ZjJNNw&sa=D&ust=1556721118370000&usg=AFQjCNGjpffZOOmf99D_ixBGNlYHGLiF7w)
or
[webgl](https://www.google.com/url?q=https://codepen.io/miguelao/full/WKZaqd&sa=D&ust=1556721118370000&usg=AFQjCNGcfmYlh3Serjw0d8o4isSYv8eywg)
samples. For the rest of you check out this [demo by Miguel
Casas](https://codepen.io/miguelao/full/mLLKLg), one of the engineers who
implemented this feature. Open the demo, press play, then move the slider back
and forth randomly and quickly. 

This example uses a one-minute, twenty-one second clip from the short film
[Sintel](https://durian.blender.org/download/) by Durian, the Blender open movie
project. In this example, the movie is played in a `<video>` element whose
contents are simultaneously rendered to a `<canvas>` element.  Many devices can
do this without tearing, though devices with front buffer rendering such as
Chrome OS for example may have tearing.   
(I highly recommend this movie, though I suggest watching it at home. It
contains nothing unsuitable for work. It's just that the ending is
heartbreaking. When I watched it I was useless for close to an hour
afterwards.)

![Simultaneous rendering of Sintel](/web/updates/images/2019/05/sintel.png)

## Using the hint

There's more to using low latency than just adding desynchronized to your
`canvas.getContext()` calls. I'll go over the issues one at a time.

### Feature detection 

Feature detection is mixed up with how you create a desynchronized canvas, so
I'll discuss them together. First, you need to get a context from a canvas
element. When calling `canvas.getContext()`, pass it the new `desynchronized`
option with a value of `true`. 

    const canvas = document.querySelector('myCanvas');
    const ctx = canvas.getContext('2d', { 
      desynchronized: true,
      // Other options. See below.
    });

Alas, this does not guarantee you a desynchronized canvas because the feature
requires hardware support. Call `getContextAttributes()` to determine hardware
support. The check of desynchronized in the example below actually covers two
different conditions:

+   It will be undefined if there's no API support.
+   It will be false if there's API support, but no hardware support.

    if (ctx.getContextAttributes().desynchronized) {
      console.log('Low latency canvas supported. Yay!');
    } else {
      console.log('Low latency canvas not supported. Boo!');
    }

### Avoiding flicker

There are two instances where you can cause flicker if you don't code correctly.
  
Some browsers including Chrome clear WebGL canvases between frames. Its possible
for the display controller to read the buffer while it's empty causing the image
being drawn to flicker. The way to avoid this is to set `preserveDrawingBuffer`
to `true`.

    const canvas = document.querySelector('myCanvas');
    const ctx = canvas.getContext('webgl', { 
      desynchronized: true,
      preserveDrawingBuffer: true
    });

Flicker can also occur when you clear the screen context in your own drawing
code.  If you must clear, draw to an offscreen framebuffer and then copy that
onto the screen. 

### Alpha channels

A translucent canvas element, one where alpha is set to true, can still be
desynchronized, but it must not have any other DOM elements above it.

### There can be only one

On Chrome you cannot change the context attributes after the first call to
`canvas.getContext()`. This is actually true of all calls to
`canvas.getContext()`. I'm repeating this to save you some frustration if you're
unaware of this or have forgotten it.   
For example, let's say that I get a context and specify alpha as false, then
somewhere later in my code I call `canvas.getContext()` with alpha set to true
as shown below. 

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

Note that `ctx1` and `ctx2` are the same object. Alpha is still false and a
context with alpha equal to true was never created.

## Supported canvas types

If you're familiar with `canvas.getContext()`, you've no doubt already noticed
the value I passed as the first parameter and you're wondering is anything other
than '2d' supported. The first parameter is the contextType and it specifies the
type of context object returned by `canvas.getContext()`. The table below shows
the values supported for contextType and the type of context object returned.

<table>
<thead>
<tr>
<th><strong>contextType</strong></th>
<th><strong>Context type object</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><p><pre>
'2d'
</pre></p>

</td>
<td><p><pre>
CanvasRenderingContext2D
</pre></p>

</td>
</tr>
<tr>
<td><p><pre>
'webgl'
</pre></p>

</td>
<td><p><pre>
WebGLRenderingContext
</pre></p>

</td>
</tr>
<tr>
<td><p><pre>
'webgl2'
</pre></p>

</td>
<td><p><pre>
WebGL2RenderingContext
</pre></p>

</td>
</tr>
</tbody>
</table>

## Conclusion

If you want to see more of this in action, check out the samples. In addition to
the [video example](https://codepen.io/miguelao/full/mLLKLg) already described
there are examples showing both ['2d'](https://codepen.io/miguelao/pen/ZjJNNw)
and ['webgl'](https://codepen.io/miguelao/full/WKZaqd) contexts.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}