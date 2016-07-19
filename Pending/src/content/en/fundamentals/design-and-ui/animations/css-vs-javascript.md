project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: You can animate with CSS or JavaScript. Which should you use, and why?

<p class="intro">
  There are two primary ways to create animations on the web: with CSS and with JavaScript. Which one you choose really depends on the other dependencies of your project, and what kinds of effects you're trying to achieve.
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






Most basic animations can be created with either CSS or JavaScript, but the amount of effort and time will differ (see also [CSS vs JavaScript Performance](/web/fundamentals/design-and-ui/animations/animations-and-performance.html#css-vs-javascript-performance)). Each has their pros and cons, but these are good rules-of-thumb:

* **Use CSS when you have smaller, self-contained states for UI elements.** CSS transitions and animations are ideal for bringing a navigation menu in from the side, or showing a tooltip. You may end up using JavaScript to control the states, but the animations themselves will be in your CSS.
* **Use JavaScript when you need significant control over your animations.** The Web Animations API is the standards-based approach, available today in Chrome and Opera. This provides real objects, ideal for complex object-oriented applications. JavaScript is also useful when you need to stop, pause, slow-down or reverse.
* **Use `requestAnimationFrame` directly when you want to orchestrate an entire scene by hand.** This is an advanced JavaScript approach, but can be useful if you're building a game or drawing to a HTML canvas.

<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/WaNoqBAp8NI?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf" class="devsite-embedded-youtube-video" allowfullscreen data-video-id="WaNoqBAp8NI" data-autohide="1" data-modestbranding="1" data-controls="2" data-utm-source="crdev-wf" data-showinfo="0" frameborder="0"></iframe></div>

Alternatively, if you're already using a JavaScript framework that includes animation functionality, such as via jQuery's [`.animate()`](https://api.jquery.com/animate/) method or [GreenSock's TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified), then you may find it more convenient overall to stick with that for your animations.

### Animate with CSS

There’s no doubt that animating with CSS is the simplest way to get something moving on screen. This approach is described as *declarative*, because you specify what you'd like to happen.

Below is some CSS that will move an element 100px in both the X & Y axes. It's done by using a CSS transitions that's set to take 500ms. When the `move` class is added the `transform` value is changed and the transition begins.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.box</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span> <span class="m">0</span><span class="p">);</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transition</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span> <span class="m">500</span><span class="n">ms</span><span class="p">;</span>

  <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span> <span class="m">0</span><span class="p">);</span>
  <span class="n">transition</span><span class="o">:</span> <span class="n">transform</span> <span class="m">500</span><span class="n">ms</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.box.move</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">100px</span><span class="o">,</span> <span class="m">100px</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">100px</span><span class="o">,</span> <span class="m">100px</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/box-move-simple.html">See sample</a>

Besides the transition's duration there are options for the easing, which is essentially how the animation feels. You can get more on that in the [The Basics of Easing](the-basics-of-easing) guide.

If, as in the above snippet, you create separate CSS classes to manage your animations, you can then use JavaScript to toggle each animation on and off:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">box</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;move&#39;</span><span class="p">);</span></code></pre></div>

Doing this will provide a very nice balance to your apps. You can focus on managing state with JavaScript, and simply set the appropriate classes on the target elements, leaving the browser to handle the animations. If you go down this route you can listen to `transitionend` events on the element, but only if you’re able to forego support for older versions of Internet Explorer; version 10 was the first version to support these events. All other browsers have supported the event for some time.

The JavaScript required to listen for the end of a transition looks like this:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">box</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.box&#39;</span><span class="p">);</span>
<span class="nx">box</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;transitionend&#39;</span><span class="p">,</span> <span class="nx">onTransitionEnd</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span>

<span class="kd">function</span> <span class="nx">onTransitionEnd</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// Handle the transition finishing.</span>
<span class="p">}</span></code></pre></div>

In addition to using CSS transitions, you can also use CSS animations, which will allow you to have much more control over individual animation keyframes, durations and iterations.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






You  can, for example, animate the box in the same way with transitions, but have it animate without any user interactions like clicking, and with infinite repetitions. You can also change multiple properties at the same time:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="c">/**</span>
<span class="c"> * This is a simplified version without</span>
<span class="c"> * vendor prefixes. With them included</span>
<span class="c"> * (which you will need) things get far</span>
<span class="c"> * more verbose!</span>
<span class="c"> */</span>
<span class="nc">.box</span> <span class="p">{</span>
  <span class="c">/* Choose the animation */</span>
  <span class="n">animation</span><span class="o">-</span><span class="n">name</span><span class="o">:</span> <span class="n">movingBox</span><span class="p">;</span>

  <span class="c">/* The animation’s duration */</span>
  <span class="n">animation</span><span class="o">-</span><span class="n">duration</span><span class="o">:</span> <span class="m">1300</span><span class="n">ms</span><span class="p">;</span>

  <span class="c">/* The number of times we want</span>
<span class="c">      the animation to run */</span>
  <span class="n">animation</span><span class="o">-</span><span class="n">iteration</span><span class="o">-</span><span class="n">count</span><span class="o">:</span> <span class="n">infinite</span><span class="p">;</span>

  <span class="c">/* Causes the animation to reverse</span>
<span class="c">      on every odd iteration */</span>
  <span class="n">animation</span><span class="o">-</span><span class="k">direction</span><span class="o">:</span> <span class="n">alternate</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@keyframes</span> <span class="nt">movingBox</span> <span class="p">{</span>
  <span class="nt">0</span><span class="o">%</span> <span class="p">{</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span> <span class="m">0</span><span class="p">);</span>
    <span class="k">opacity</span><span class="o">:</span> <span class="m">0</span><span class="o">.</span><span class="m">3</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nt">25</span><span class="o">%</span> <span class="p">{</span>
    <span class="k">opacity</span><span class="o">:</span> <span class="m">0</span><span class="o">.</span><span class="m">9</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nt">50</span><span class="o">%</span> <span class="p">{</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">100px</span><span class="o">,</span> <span class="m">100px</span><span class="p">);</span>
    <span class="k">opacity</span><span class="o">:</span> <span class="m">0</span><span class="o">.</span><span class="m">2</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nt">100</span><span class="o">%</span> <span class="p">{</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">30px</span><span class="o">,</span> <span class="m">30px</span><span class="p">);</span>
    <span class="k">opacity</span><span class="o">:</span> <span class="m">0</span><span class="o">.</span><span class="m">8</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre></div>

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/box-move-keyframes.html">See sample</a>

With CSS animations you define the animation itself independently of the target element, and use the animation-name property to choose the required animation.

CSS Animations are still somewhat vendor prefixed, with `-webkit-` being used in Safari, Safari Mobile, and Android Browser. Chrome, Opera, Internet Explorer and Firefox all ship without prefixes. Many tools will aid you in creating the prefixed versions of the CSS you need, allowing you to write the unprefixed version in your source files.

### Animate with JavaScript and the Web Animations API

Creating animations with JavaScript is, by comparison, more complex than writing CSS transitions or animations, but it does typically provide significantly more power to you as the developer. You can use the [Web Animations API](https://w3c.github.io/web-animations/) to either animate specific CSS properties, or build composable effect objects.

JavaScript animations are *imperative*, as you write them inline as part of your code. You can also encapsulate them inside other objects. Below is the JavaScript that you would need to write to recreate the CSS transition we discussed earlier.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">target</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.box&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">player</span> <span class="o">=</span> <span class="nx">target</span><span class="p">.</span><span class="nx">animate</span><span class="p">([</span>
  <span class="p">{</span><span class="nx">transform</span><span class="o">:</span> <span class="s1">&#39;translate(0)&#39;</span><span class="p">},</span>
  <span class="p">{</span><span class="nx">transform</span><span class="o">:</span> <span class="s1">&#39;translate(100px, 100px)&#39;</span><span class="p">}</span>
<span class="p">],</span> <span class="mi">500</span><span class="p">);</span>
<span class="nx">player</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;finish&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">target</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">transform</span> <span class="o">=</span> <span class="s1">&#39;translate(100px, 100px)&#39;</span><span class="p">;</span>
<span class="p">});</span></code></pre></div>

By default, Web Animations only modify the presentation of an element. If you'd like to have your object remain at the location it has moved to, then you should modify its underlying styles when the animation has finished, as per our sample.

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/box-move-wa.html">See sample</a>

The Web Animations API is a new standard from the W3C. It is supported natively in Chrome and Opera, and is in [active development for Firefox](https://birtles.github.io/areweanimatedyet/). For other modern browsers, [a polyfill is available](https://github.com/web-animations/web-animations-js).

With JavaScript animations, you are in total control of an element's styles at every step. This means you can slow down animations, pause them, stop them, reverse them and manipulate elements as you see fit. This is especially useful if you're building complex, object-oriented applications, as you can properly encapsulate your behavior.

