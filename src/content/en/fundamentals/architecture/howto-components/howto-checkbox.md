project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-4-24#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-checkbox {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="prism-solarizedlight.css">
<link rel="stylesheet" href="main.css">

<p>A <code>HowToCheckbox</code> represents a boolean option in a form. The most common type
of checkbox is a dual-type which allows the user to toggle between two
choices -- checked and unchecked.</p>


## Demo {: #demo }
<iframe src="https://googlechrome.github.io/howto-components/howto-checkbox_demo.html" class="demo" aria-label="live demo" role="region"></iframe>

## Example usage {: #usage }
<ul class="literate demo" id="howto-checkbox_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token doctype">&lt;!doctype html></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style language-css">
<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-checkbox</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url('./images/unchecked-checkbox.svg')</span> no-repeat<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background-size</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">width</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">height</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-checkbox[aria-checked="true"]</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url('./images/checked-checkbox.svg')</span> no-repeat<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background-size</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-checkbox[aria-disabled="true"]</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url('./images/unchecked-checkbox-disabled.svg')</span> no-repeat<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background-size</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-checkbox[aria-checked="true"][aria-disabled="true"]</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url('./images/checked-checkbox-disabled.svg')</span> no-repeat<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background-size</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token selector">#join-label</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">font-family</span><span class="token punctuation">:</span> sans-serif<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">margin-left</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-checkbox</span> <span class="token attr-name">aria-labelledby</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>join-label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-checkbox</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>join-label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Join Newsletter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span></code>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-checkbox_impl">
  
<li class="blockcomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define key codes to help with handling keyboard events.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> KEYCODE <span class="token operator">=</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>SPACE<span class="token punctuation">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>HowToCheckbox</code> exposes a single <code>checked</code> attribute/property for
toggling its state. Changes to the <code>checked</code> property will also be
reflected to an <code>aria-checked</code> attribute. Similarly, the <code>disabled</code>
property is reflected to an <code>aria-disabled</code> attribute. This controls
whether the element is operable or not. Although native checkbox elements
also provide a <code>value</code> attribute, because it is only used for <code>&lt;form&gt;</code>
submissions, and this element can&#39;t take part in that process, it has
been omitted.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowToCheckbox</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token function">observedAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'checked'</span><span class="token punctuation">,</span> <span class="token string">'disabled'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> sets the initial <code>role</code>, <code>tabindex</code>,
internal state, and installs event listeners.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'checkbox'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_checked <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_disabled <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onKeyDown<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> fires whenever the element is removed from
the DOM. It&#39;s a good place to do clean up work like releasing
references and removing event listeners.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">disconnectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onKeyDown<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>checked</code> property reflects its state to the <code>checked</code> and
<code>aria-checked</code> attributes. This element supports setting
properties to falsey values like <code>undefined</code>, <code>null</code>, or <code>&#39;&#39;</code>
which are then converted to <code>true|false</code>. This is done to
match the behavior of native HTML Elements.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">set</span> <span class="token function">checked</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> isChecked <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_checked <span class="token operator">==</span> isChecked<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_checked <span class="token operator">=</span> isChecked<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_safelySetAttribute</span><span class="token punctuation">(</span><span class="token string">'checked'</span><span class="token punctuation">,</span> isChecked<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-checked'</span><span class="token punctuation">,</span> isChecked<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">checked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_checked<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>disabled</code> property reflects its state to the <code>disabled</code> and
<code>aria-disabled</code> attributes.
It will also remove the <code>tabindex</code> attribute if disabled is true.
This means a disabled checkbox will be visible, but no longer operable.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">set</span> <span class="token function">disabled</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> isDisabled <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_disabled <span class="token operator">==</span> isDisabled<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_disabled <span class="token operator">=</span> isDisabled<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_safelySetAttribute</span><span class="token punctuation">(</span><span class="token string">'disabled'</span><span class="token punctuation">,</span> isDisabled<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-disabled'</span><span class="token punctuation">,</span> isDisabled<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The <code>tabindex</code> attribute does not provide a way to fully remove
 focusability from an element.
 Elements with <code>tabindex=-1</code> can still be focused with
 a mouse or by calling <code>focus()</code>.
 To make sure an element is disabled and not focusable, remove the
 <code>tabindex</code> attribute.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>isDisabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the focus is currently on this element, unfocus it by
 calling the <code>HTMLElement.blur()</code> method.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>activeElement <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">blur</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">,</span> <span class="token string">'0'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">disabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_disabled<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Both <code>checked</code> and <code>disabled</code> are part of the <code>observedAttributes</code> array
meaning that setting either attribute will trigger the
<code>attributeChangedCallback</code>.
It&#39;s possible to get into a cycle where setting a property sets one of
these attributes, which then tries to set the property again.
This helper avoids that by checking to see if the attribute is already
set.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_safelySetAttribute</span><span class="token punctuation">(</span>attr<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>attr<span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>value <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>attributeChangedCallback</code> watches for changes to the <code>checked</code>
and <code>disabled</code> attributes and reflects their states to the corresponding
properties. It will be called at startup time if either attribute
has been set.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">attributeChangedCallback</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Because both <code>checked</code> and <code>disabled</code> are booleans, the callback
 determines their values by checking to see if the attributes are
 present.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">!==</span> value<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onKeyDown</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>altKey<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>keyCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>SPACE<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_toggleChecked</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Any other key press is ignored and passed back to the browser.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">default</span><span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onClick</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_toggleChecked</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_toggleChecked</code> calls the <code>checked</code> setter and flips its state.
Because <code>_toggleChecked</code> is only caused by a user action, it will
also dispatch a change event. This event bubbles in order to mimic
the native behavior of <code>&lt;input type=checkbox&gt;</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_toggleChecked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>disabled<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>checked <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>checked<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>detail<span class="token punctuation">:</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>checked<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checked<span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>bubbles<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-checkbox'</span><span class="token punctuation">,</span> HowToCheckbox<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

</ul>

<script src="iframesizer.js"></script>
