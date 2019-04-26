project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: OffscreenCanvasAPI is available as of Chrome 69. This article explains how you can use it to achieve performance improvements in rendering graphics in your web app.

{# wf_updated_on: 2018-08-17 #}
{# wf_published_on: 2018-08-17 #}
{# wf_tags: canvas,graphics,performance,workers #}
{# wf_blink_components: Blink>Canvas #}
{# wf_featured_image: /web/updates/images/generic/star.png #}
{# wf_featured_snippet: OffscreenCanvasAPI is available as of Chrome 69. This article explains how you can use it to achieve performance improvements in rendering graphics in your web app. #}

# OffscreenCanvas — Speed up Your Canvas Operations with a Web Worker {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}

Tl;dr; Now you can render your graphics off the main thread with OffscreenCanvas!

[Canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) is a popular way
of drawing all kinds of graphics on the screen and an entry point to the world of WebGL.
It can be used to draw shapes, images, run animations, or even display and process video content.
It is often used to create beautiful user experiences in media-rich web applications and
online games.

It is scriptable, which means that the content drawn on canvas can be created programmatically,
e.g., in JavaScript. This gives canvas great flexibility.

At the same time, in modern websites, script execution is one of the most frequent
[sources of user responsiveness](https://tdresser.github.io/input-latency-deep-reports/) issues.
Because canvas logic and rendering happens on the same thread as user interaction,
the (sometimes heavy) computations involved in animations can harm the app’s real
and perceived performance.

Fortunately, [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
is a response to that threat!

Until now, canvas drawing capabilities were tied to the `<canvas>` element,
which meant it was directly depending on the DOM. OffscreenCanvas, as the name implies,
decouples the DOM and the Canvas API by moving it off-screen.

Thanks to this decoupling, rendering of OffscreenCanvas is fully detached from the DOM and
therefore offers some speed improvements over the regular canvas as there is no synchronization
between the two.
What is more, though, is that it can be used in a Web Worker, even though there is no
DOM available. This enables all kinds of interesting use cases.


## Use OffscreenCanvas in a worker

[Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
are the web’s version of threads — they allow you to run tasks in the background.
Moving some of your scripting to a worker gives your app more headroom to perform user-critical
tasks on the main thread. Until now, there was no way to use the Canvas API in a worker, as there
is no DOM available.

OffscreenCanvas does not depend on the DOM, so it can be used instead. Here I use OffscreenCanvas
to calculate a gradient color in a worker:

    // file: worker.js

    function getGradientColor(percent) {
        const canvas = new OffscreenCanvas(100, 1);
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(1, 'blue');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, 1);
        const imgd = ctx.getImageData(0, 0, ctx.canvas.width, 1);
        const colors = imgd.data.slice(percent * 4, percent * 4 + 4);
        return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[])`;
    }

    getGradientColor(40);  // rgba(152, 0, 104, 255 )

## Unblock main thread

It gets more interesting when moving heavy calculation to a worker allows you to free up
significant resources on the main thread. We can use the [transferControlToOffscreen](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen)
method to mirror the regular canvas to an OffscreenCanvas instance. Operations applied to
OffscreenCanvas will be rendered on the source canvas automatically.

    const offscreen = document.querySelector('canvas').transferControlToOffscreen();
    const worker = new Worker('myworkerurl.js');
    worker.postMessage({ canvas: offscreen }, [offscreen]);

<div class="key-point">
OffscreenCanvas is <a href="https://developer.mozilla.org/en-US/docs/Web/API/Transferable">transferable</a>.
Apart from specifying it as a field in the message, you need to also pass it as a second argument
in postMessage (a transfer) so that it can be used in the worker context.
</div>

In the example below, the “heavy calculation” happens when the color theme is changing — it should
take a few milliseconds even on a fast desktop. You can choose to run animations on the main thread
or in the worker. In case of the main thread, you cannot interact with the button while the heavy
task is running — the thread is blocked. In case of the worker, there is no impact on
UI responsiveness.

<figure>
  <iframe src="https://devnook.github.io/OffscreenCanvasDemo/keep-ui-responsive.html"
      width="100%" height="700"></iframe>
  <figcaption><a href="https://devnook.github.io/OffscreenCanvasDemo/keep-ui-responsive.html"
      target="_blank" class="external">Demo</a></figcaption>
</figure>

It works the other way too: the busy main thread does not influence the animation running on
a worker. You can use this feature to avoid visual jank and guarantee a smooth animation
despite main thread traffic:

<figure>
  <iframe src="https://devnook.github.io/OffscreenCanvasDemo/index.html"
      width="100%" height="440"></iframe>
  <figcaption><a href="https://devnook.github.io/OffscreenCanvasDemo/index.html"
      target="_blank" class="external">Demo</a></figcaption>
</figure>

In case of a regular canvas, the animation stops when the main thread gets artificially overworked,
while the worker-based OffscreenCanvas plays smoothly.

## Use with popular libraries

Because OffscreenCanvas API is generally compatible with the regular Canvas Element, you can easily
use it as a progressive enhancement, also with some of the leading graphic libraries on the market.

For example, you can feature-detect it and if available, use it with Three.js by specifying
the canvas option in the renderer constructor:

    const canvasEl = document.querySelector("canvas");
    const canvas = ('OffscreenCanvas' in window) ? canvasEl.transferControlToOffscreen() : canvasEl;
    canvas.style = { width: 0, height: 0 }
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });

The one gotcha here is that Three.js expects canvas to have a style.width and style.height property.
OffscreenCanvas, as fully detached from DOM, does not have it, so you need to provide it yourself,
either by stubbing it out or providing logic that ties these values to the original
canvas dimensions.

Here is a demo of how to run a basic Three.js animation in a worker:

<figure>
  <iframe src="https://devnook.github.io/OffscreenCanvasDemo/use-with-lib.html"
      width="100%" height="440"></iframe>
  <figcaption><a href="https://devnook.github.io/OffscreenCanvasDemo/use-with-lib.html"
      target="_blank" class="external">Demo</a></figcaption>
</figure>

Bear in mind that some of the DOM related APIs are not readily available in a worker, so if you
want to use more advanced Three.js features like textures, you might need more workarounds.
For some ideas on how to start experimenting with these, take a look at the
[video from Google I/O 2017](https://www.youtube.com/watch?v=wkDd-x0EkFU).

<div class="video-wrapper video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="wkDd-x0EkFU"
      data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<div class="caution">
Examples in this video use the deprecated commit() call. Use worker.requestAnimationFrame instead.
</div>

## Conclusion

If you’re making heavy use of the graphical capabilities of canvas, OffscreenCanvas can positively
influence your app’s performance. Making canvas rendering contexts available to workers increases
parallelism in web applications and makes better use of multi-core systems.

OffscreenCanvas is available without a flag in Chrome 69. It is also
[in development](https://bugzilla.mozilla.org/show_bug.cgi?id=709490) in Firefox.
Because its API is very aligned with the regular canvas element, you can easily feature-detect it
and use it as a progressive enhancement, without breaking existing app or library logic.
It offers performance advantage in all cases where the graphics and animations are not tied closely
to the DOM surrounding the canvas.

## Additional resources

* [W3c spec](https://html.spec.whatwg.org/#the-offscreencanvas-interface)
* [chromestatus.com entry](https://www.chromestatus.com/feature/4691191559880704)

{% include "web/_shared/rss-widget-updates.html" %}

