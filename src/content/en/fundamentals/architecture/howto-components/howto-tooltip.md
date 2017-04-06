project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2017-4-6#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-tooltip {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="prism-solarizedlight.css">
<link rel="stylesheet" href="main.css">

<p>A tooltip is a popup that displays information related to an element
when the element receives keyboard focus or the mouse hovers over it.
It typically appears after a small delay and disappears when Escape is
pressed or on mouse out. The element that triggers the tooltip references
the tooltip element with aria-describedby.</p>
<p>See: <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip">https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip</a></p>


## Demo {: #demo }
<iframe src="howto-tooltip_demo.html" class="demo" aria-label="live demo" role="region"></iframe>

## Example usage {: #usage }
<ul class="literate demo" id="howto-tooltip_demo">

<li class="linecomment">
<div class="literate-text empty"></div>
<code class="literate-code"><span class="token doctype">&lt;!doctype html></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span></code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>The tooltip is by default unstyled.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span>howto-tooltip {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>margin-left: 8px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 4px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: #616161;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>color: #fff;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border-radius: 3px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 0;</code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>Optionally, animate the tooltip.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition: opacity 1s;</code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>will-change tells the browser we will be animating the opacity, so
it can try to optimize that
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/will-change">https://developer.mozilla.org/en-US/docs/Web/CSS/will-change</a></p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>will-change: opacity;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>The tooltip is hidden.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span>howto-tooltip[aria-hidden="true"] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 0;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>The tooltip is showing.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span>howto-tooltip[aria-hidden="false"] {</code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>Optionally, add a delay to showing the tooltip.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition-delay: 0.3s;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 1;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Your name:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">aria-describedby</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tooltip</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ideally your name is Batman<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tooltip</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>cheese<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Favourite type of cheese: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>cheese<span class="token punctuation">"</span></span> <span class="token attr-name">aria-describedby</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp2<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tooltip</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Help I am trapped inside a tooltip message<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tooltip</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tooltip_impl">
  
<li class="blockcomment">
<div class="literate-text empty"></div>
<code class="literate-code"><span class="token keyword">class</span> <span class="token class-name">HowtoTooltip</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment">
<div class="literate-text empty"></div>
<code class="literate-code"></code>
</li>

<li class="blockcomment">
<div class="literate-text "><p>The constructor does work that needs to be executed <em>exactly</em> once.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment">
<div class="literate-text empty"></div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> These functions are used in a bunch of places, and always need to
 bind the correct <code>this</code> reference, so do it once.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_show <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_hide <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment">
<div class="literate-text "><p><code>connectedCallback</code> gets the element that triggers the tooltip and
sets up the event listeners on it.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment">
<div class="literate-text empty"></div>
<code class="literate-code"></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> A tooltip should always set its <code>role</code> to <code>tooltip</code></p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'tooltip'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> Tooltips cannot be focused themselves.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>tabIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> &#39;aria-hidden&#39; is used to show or hide the tooltip. A tooltip should
 check to see if its <code>aria-hidden</code> value has been set by the user.
 Otherwise, it should use the default value.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> The element that triggers the tooltip references the tooltip
 element with aria-describedby.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[aria-describedby='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> The tooltip needs to listen to focus/blur events from the target,
 as well as hover events over the target.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'blur'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseleave'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment">
<div class="literate-text "><p><code>disconnectedCallback</code> unregisters the event listeners that were set up in
<code>connectedCallback</code>.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="token function">disconnectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment">
<div class="literate-text empty"></div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> Remove the existing listeners, so that they don&#39;t trigger even though
 there&#39;s no tooltip to show.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'blur'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseleave'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token function">_show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> If the tooltip is hidden, show it.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'true'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token function">_hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment">
<div class="literate-text "><p> If the tooltip is visible, hide.</p>
</div>
<code class="literate-code"><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tooltip'</span><span class="token punctuation">,</span> HowtoTooltip<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

</ul>
