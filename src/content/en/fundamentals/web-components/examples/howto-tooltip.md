project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-11#}
{# wf_published_on: 2017-04-06 #}
{# wf_blink_components: Blink>DOM #}

# HowTo: Components – howto-tooltip {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="main.css">

## Summary {: #summary }

A `<howto-tooltip>` is a popup that displays information related to an element
when the element receives keyboard focus or the mouse hovers over it.
The element that triggers the tooltip references the tooltip element with
`aria-describedby`.

The element self-applies the role `tooltip` and sets `tabindex` to -1, as the
tooltip itself can never be focused.

## Reference {: #reference }

- [HowTo: Components on GitHub][howto-github]
- [Tooltip pattern in ARIA Authoring Practices 1.1][tooltip-pattern]

[howto-github]: https://github.com/GoogleChromeLabs/howto-components
[tooltip-pattern]: https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip


## Demo {: #demo }
[View live demo on GitHub](https://googlechromelabs.github.io/howto-components/howto-tooltip/#demo)

## Example usage {: #usage }
<ul class="literate demo" id="howto-tooltip_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code ">&lt;div class="text"&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;label for="name"&gt;Your name:&lt;/label&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;input id="name" aria-describedby="tp1"/&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;howto-tooltip id="tp1"&gt;Ideally your name is Batman&lt;/howto-tooltip&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;br&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;label for="cheese"&gt;Favourite type of cheese: &lt;/label&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;input id="cheese" aria-describedby="tp2"/&gt;
<span class="indent">&nbsp;&nbsp;</span> &lt;howto-tooltip id="tp2"&gt;Help I am trapped inside a tooltip message&lt;/howto-tooltip&gt;
&lt;/div&gt;</code></pre>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tooltip_impl">
  
<li class="blockcomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code ">class HowtoTooltip extends HTMLElement {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code empty"></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The constructor does work that needs to be executed <em>exactly</em> once.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>constructor() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>These functions are used in a bunch of places, and always need to
 bind the correct <code>this</code> reference, so do it once.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._show = this._show.bind(this);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._hide = this._hide.bind(this);
<span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback()</code> fires when the element is inserted into the DOM.
It&#39;s a good place to set the initial <code>role</code>, <code>tabindex</code>, internal state,
and install event listeners.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('role'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'tooltip');

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('tabindex'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', -1);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._hide();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The element that triggers the tooltip references the tooltip
 element with <code>aria-describedby</code>.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target = document.querySelector('[aria-describedby=' + this.id + ']');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this._target)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The tooltip needs to listen to <code>focus</code>/<code>blur</code> events from the target,
 as well as <code>hover</code> events over the target.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('focus', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('blur', this._hide);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('mouseenter', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.addEventListener('mouseleave', this._hide);
<span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback()</code> unregisters the event listeners that were set up
in <code>connectedCallback()</code>.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this._target)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Remove the existing listeners, so that they don&#39;t trigger even though
 there&#39;s no tooltip to show.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('focus', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('blur', this._hide);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('mouseenter', this._show);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target.removeEventListener('mouseleave', this._hide);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._target = null;
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span>_show() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.hidden = false;
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span>_hide() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.hidden = true;
<span class="indent">&nbsp;&nbsp;</span>}
}

window.customElements.define('howto-tooltip', HowtoTooltip);</code></pre>
</li>

</ul>
