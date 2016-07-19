project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Go offroad and create totally custom animations for your projects.

<p class="intro">
  Sometimes you won't want to use the easing keywords that are included with CSS, or you will be using Web Animations or a JavaScript framework. In these cases you can typically define your own curves (or equations), and this gives you a lot of control over the feel of your project's animations.
</p>
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Custom easing will allow you to give more personality to your projects.</li>
    
    <li>You can create cubic bezier curves that resemble the default animation curves (ease-out, ease-in, etc) but with emphasis in different places.</li>
    
    <li>Use JavaScript when you need more control over the animation timing and behavior, e.g. elastic or bounce animations.</li>
    
  </ul>
  
</div>



If you're animating with CSS, you'll find that you can define cubic bezier curves to define the timing. In fact, the keywords `ease`, `ease-in`, `ease-out` and `linear` map to predefined bezier curves, which are detailed in the [CSS transitions specification](http://www.w3.org/TR/css3-transitions/) and the [Web Animations specification](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve).

These bezier curves take four values, or 2 pairs of numbers, with each pair describing the X and Y coordinates of a cubic bezier curve’s control points.  The starting point of the bezier curve has a coordinate of (0, 0) and the end coordinate is (1, 1); you get to set the X and Y values of the two control points. The X values for the two control points must be between 0 and 1, and each control point’s Y value can exceed the [0, 1] limit, although the spec isn’t clear by how much!

Changing the X and Y value of each control point will give you vastly different curve, and therefore a vastly different feel to your animation. For example, if the first control point is in the lower right the animation will be slow to start. If it’s in the top left area it’s going to be fast to start. Conversely, if the second control point is in the bottom right of the grid it’s going to be fast at the end, whereas if it’s in the top left it will be slow to end.

For comparison, here are two curves: a typical ease-in-out curve and a custom curve:

<img src="imgs/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="Ease-in-out animation curve." />
<img src="imgs/custom.png" style="display: inline; max-width: 300px" alt="Custom animation curve." />

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/box-move-custom-curve.html">See an animation with custom easing.</a>

The CSS for the custom curve is:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nt">transition</span><span class="o">:</span> <span class="nt">transform</span> <span class="nt">500ms</span> <span class="nt">cubic-bezier</span><span class="o">(</span><span class="nt">0</span><span class="nc">.465</span><span class="o">,</span> <span class="nt">0</span><span class="nc">.183</span><span class="o">,</span> <span class="nt">0</span><span class="nc">.153</span><span class="o">,</span> <span class="nt">0</span><span class="nc">.946</span><span class="o">);</span></code></pre></div>

The first two numbers are the X and Y coordinates of the first control point, the second two numbers are the X and Y coordinates of the second control point.

Making a custom curve is a lot of fun, and it gives you significant control over the feel of the animation. For example, given the above curve, you can see the curve resembles a classic ease-in-out curve, but with a shortened ease-in, or ‘getting going’, portion, and an elongated slowdown at the end.

Experiment with this <a href="/web/resources/samples/fundamentals/design-and-ui/animations/curve-playground.html">animation curve tool</a> and see how the curve affects the feel of an animation.

## Use JavaScript frameworks for more control

Sometimes you will need even more control than a cubic bezier curve can provide. If you wanted an elastic bounce feel, you might consider using a JavaScript framework, as this is a difficult effect to achieve with either CSS or Web Animations.

### TweenMax

One powerful framework is [GreenSock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (or TweenLite if you want to keep things super lightweight) as you get a lot of control from it in a small JavaScript library, and it’s a very mature codebase.

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/box-move-elastic.html">See an elastic ease animation.</a>

To use TweenMax include the script in your page:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script </span><span class="na">src=</span><span class="s">&quot;https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js&quot;</span><span class="nt">&gt;&lt;/script&gt;</span></code></pre></div>

Once that’s in place you can call TweenMax against your element and tell it which properties you’d like, along with any easing you’d like. There are a ton of easing options that you can use; the code below uses an elastic ease-out:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">box</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s1">&#39;my-box&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">animationDurationInSeconds</span> <span class="o">=</span> <span class="mf">1.5</span><span class="p">;</span>

<span class="nx">TweenMax</span><span class="p">.</span><span class="nx">to</span><span class="p">(</span><span class="nx">box</span><span class="p">,</span> <span class="nx">animationDurationInSeconds</span><span class="p">,</span> <span class="p">{</span>
  <span class="nx">x</span><span class="o">:</span> <span class="s1">&#39;100%&#39;</span><span class="p">,</span>
  <span class="nx">ease</span><span class="o">:</span> <span class="s1">&#39;Elastic.easeOut&#39;</span>
<span class="p">});</span></code></pre></div>

The [TweenMax documentation](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/) highlights all the options you have here, so it's well worth a read.




