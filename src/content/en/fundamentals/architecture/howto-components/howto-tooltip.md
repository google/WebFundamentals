project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-05-03#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-tooltip {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="main.css">

A tooltip is a popup that displays information related to an element
when the element receives keyboard focus or the mouse hovers over it.
It typically appears after a small delay and disappears when Escape is
pressed or on mouse out. The element that triggers the tooltip references
the tooltip element with aria-describedby.

See: https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip



## Demo {: #demo }
{% framebox height="auto" width="100%" class="demo" suppress_site_styles="true" %}
<!doctype html>
<html lang="en">
<p>
  <a href="?nojs">Load without JavaScript</a>
  <a href="?">Load with JavaScript</a>
</p>

<!doctype html>

<style>
  /* The tooltip is by default unstyled. */
  howto-tooltip {
    margin-left: 8px;
    padding: 4px;
    background-color: #616161;
    color: #fff;
    border-radius: 3px;
    opacity: 0;

    /* Optionally, animate the tooltip. */
    transition: opacity 1s;

    /* will-change tells the browser we will be animating the opacity, so
     * it can try to optimize that
     * https://developer.mozilla.org/en-US/docs/Web/CSS/will-change */
    will-change: opacity;
  }

  /* The tooltip is hidden. */
  howto-tooltip[aria-hidden="true"] {
    opacity: 0;
  }

  /* The tooltip is showing. */
  howto-tooltip[aria-hidden="false"] {
    /* Optionally, add a delay to showing the tooltip. */
    transition-delay: 0.3s;
    opacity: 1;
  }
</style>

<div class="text">
   <label for="name">Your name:</label>
   <input id="name" aria-describedby="tp1"/>
   <howto-tooltip id="tp1">Ideally your name is Batman</howto-tooltip>
   <br>
   <label for="cheese">Favourite type of cheese: </label>
   <input id="cheese" aria-describedby="tp2"/>
   <howto-tooltip id="tp2">Help I am trapped inside a tooltip message</howto-tooltip>
</div>


<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>
<script src="https://cdn.rawgit.com/webcomponents/shadydom/master/shadydom.min.js"></script>
<script>
  devsite.framebox.AutoSizeClient.initAutoSize(true);
  if (!document.location.search.includes('nojs')) {
    (function() {
      class HowtoTooltip extends HTMLElement {
  /**
  * The constructor does work that needs to be executed _exactly_ once.
  */
  constructor() {
    super();

    // These functions are used in a bunch of places, and always need to
    // bind the correct `this` reference, so do it once.
    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  }

  /**
   * `connectedCallback` gets the element that triggers the tooltip and
   * sets up the event listeners on it.
   */
  connectedCallback() {
    // A tooltip should always set its `role` to `tooltip`
    this.setAttribute('role', 'tooltip');

    // Tooltips cannot be focused themselves.
    this.tabIndex = -1;

    // 'aria-hidden' is used to show or hide the tooltip. A tooltip should
    // check to see if its `aria-hidden` value has been set by the user.
    // Otherwise, it should use the default value.
    this.setAttribute('aria-hidden', this.getAttribute('aria-hidden') || true);

    // The element that triggers the tooltip references the tooltip
    // element with aria-describedby.
    this._target = document.querySelector('[aria-describedby=' + this.id + ']');

    // The tooltip needs to listen to focus/blur events from the target,
    // as well as hover events over the target.
    this._target.addEventListener('focus', this._show);
    this._target.addEventListener('blur', this._hide);
    this._target.addEventListener('mouseenter', this._show);
    this._target.addEventListener('mouseleave', this._hide);
  }

  /**
   * `disconnectedCallback` unregisters the event listeners that were set up in
   * `connectedCallback`.
   */
  disconnectedCallback() {
    if (!this._target)
      return;

    // Remove the existing listeners, so that they don't trigger even though
    // there's no tooltip to show.
    this._target.removeEventListener('focus', this._show);
    this._target.removeEventListener('blur', this._hide);
    this._target.removeEventListener('mouseenter', this._show);
    this._target.removeEventListener('mouseleave', this._hide);
    this._target = null;
  }

  _show() {
    // If the tooltip is hidden, show it.
    if (this.getAttribute('aria-hidden') === 'true') {
      this.setAttribute('aria-hidden', 'false');
    }
  }

  _hide() {
    // If the tooltip is visible, hide.
    if (this.getAttribute('aria-hidden') === 'false') {
      this.setAttribute('aria-hidden', 'true');
    }
  }
}

window.customElements.define('howto-tooltip', HowtoTooltip);

    })();
  }
</script>
</html>

{% endframebox %}

## Example usage {: #usage }
<ul class="literate demo" id="howto-tooltip_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code ">&lt;!doctype html&gt;

&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The tooltip is by default unstyled.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span>howto-tooltip {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>margin-left: 8px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 4px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: #616161;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>color: #fff;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border-radius: 3px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 0;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Optionally, animate the tooltip.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition: opacity 1s;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>will-change tells the browser we will be animating the opacity, so
it can try to optimize that
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/will-change">https://developer.mozilla.org/en-US/docs/Web/CSS/will-change</a></p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>will-change: opacity;
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The tooltip is hidden.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span>howto-tooltip[aria-hidden="true"] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 0;
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The tooltip is showing.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span>howto-tooltip[aria-hidden="false"] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Optionally, add a delay to showing the tooltip.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition-delay: 0.3s;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 1;
<span class="indent">&nbsp;&nbsp;</span>}
&lt;/style&gt;

&lt;div class="text"&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;label for="name"&gt;Your name:&lt;/label&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;input id="name" aria-describedby="tp1"/&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;howto-tooltip id="tp1"&gt;Ideally your name is Batman&lt;/howto-tooltip&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;br&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;label for="cheese"&gt;Favourite type of cheese: &lt;/label&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;input id="cheese" aria-describedby="tp2"/&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;howto-tooltip id="tp2"&gt;Help I am trapped inside a tooltip message&lt;/howto-tooltip&gt;
&lt;/div&gt;
</code></pre>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tooltip_impl">
  
<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code ">class HowtoTooltip extends HTMLElement {
<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The constructor does work that needs to be executed <em>exactly</em> once.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>constructor() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> These functions are used in a bunch of places, and always need to
 bind the correct <code>this</code> reference, so do it once.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._show = this._show.bind(this);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._hide = this._hide.bind(this);
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> gets the element that triggers the tooltip and
sets up the event listeners on it.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> A tooltip should always set its <code>role</code> to <code>tooltip</code></p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'tooltip');

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Tooltips cannot be focused themselves.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.tabIndex = -1;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> &#39;aria-hidden&#39; is used to show or hide the tooltip. A tooltip should
 check to see if its <code>aria-hidden</code> value has been set by the user.
 Otherwise, it should use the default value.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-hidden', this.getAttribute('aria-hidden') || true);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element that triggers the tooltip references the tooltip
 element with aria-describedby.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target = document.querySelector('[aria-describedby=' + this.id + ']');

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The tooltip needs to listen to focus/blur events from the target,
 as well as hover events over the target.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('focus', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('blur', this._hide);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('mouseenter', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('mouseleave', this._hide);
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> unregisters the event listeners that were set up in
<code>connectedCallback</code>.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this._target)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Remove the existing listeners, so that they don&#39;t trigger even though
 there&#39;s no tooltip to show.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('focus', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('blur', this._hide);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('mouseenter', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('mouseleave', this._hide);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target = null;
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span>_show() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the tooltip is hidden, show it.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (this.getAttribute('aria-hidden') === 'true') {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-hidden', 'false');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span>_hide() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the tooltip is visible, hide.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (this.getAttribute('aria-hidden') === 'false') {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-hidden', 'true');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
}

window.customElements.define('howto-tooltip', HowtoTooltip);
</code></pre>
</li>

</ul>
