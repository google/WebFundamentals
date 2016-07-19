project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Input handlers are a potential cause of performance problems in your apps, as they can block frames from completing, and can cause additional and unnecessary layout work.

<p class="intro">
Input handlers are a potential cause of performance problems in your apps, as they can block frames from completing, and can cause additional and unnecessary layout work.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Avoid long-running input handlers

In the fastest possible case, when a user interacts with the page, the page’s compositor thread can take the user’s touch input and simply move the content around. This requires no work by the main thread, where JavaScript, layout, styles, or paint are done.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" alt="Lightweight scrolling; compositor only.">

If, however, you attach an input handler, like `touchstart`, `touchmove`, or `touchend`, the compositor thread must wait for this handler to finish executing because you may choose to call `preventDefault()` and stop the touch scroll from taking place. Even if you don’t call `preventDefault()` the compositor must wait, and as such the user’s scroll is blocked, which can result in stuttering and missed frames.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" alt="Heavy scrolling; compositor is blocked on JavaScript.">

In short, you should make sure that any input handlers you run should execute quickly and allow the compositor to do its job.

## Avoid style changes in input handlers

Input handlers, like those for scroll and touch, are scheduled to run just before any `requestAnimationFrame` callbacks.

If you make a visual change inside one of those handlers, then at the start of the `requestAnimationFrame`, there will be style changes pending. If you _then_ read visual properties at the start of the requestAnimationFrame callback, as the advice in “[Avoid large, complex layouts and layout thrashing](avoid-large-complex-layouts-and-layout-thrashing)” suggests, you will trigger a forced synchronous layout!

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" alt="Heavy scrolling; compositor is blocked on JavaScript.">

## Debounce your scroll handlers

The solution to both of the problems above is the same: you should always debounce visual changes to the next `requestAnimationFrame` callback:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">onScroll</span> <span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>

  <span class="c1">// Store the scroll value for laterz.</span>
  <span class="nx">lastScrollY</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">scrollY</span><span class="p">;</span>

  <span class="c1">// Prevent multiple rAF callbacks.</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">scheduledAnimationFrame</span><span class="p">)</span>
    <span class="k">return</span><span class="p">;</span>

  <span class="nx">scheduledAnimationFrame</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
  <span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">readAndUpdatePage</span><span class="p">);</span>
<span class="p">}</span>

<span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;scroll&#39;</span><span class="p">,</span> <span class="nx">onScroll</span><span class="p">);</span></code></pre></div>

Doing this also has the added benefit of keeping your input handlers light, which is awesome because now you’re not blocking things like scrolling or touch on computationally expensive code!

