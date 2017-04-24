project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-4-24#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-radio-group {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="prism-solarizedlight.css">
<link rel="stylesheet" href="main.css">

<p>A <code>HowtoRadioGroup</code> is a set of checkable buttons, where only one button may
be checked at a time. The <code>HowtoRadioGroup</code> element wraps a set of
<code>HowtoRadioButton</code> children and manages their checked states in response to
user keyboard actions such as pressing arrow keys to select the next radio
button, or if the user clicks with a mouse.</p>
<p>The <code>HowtoRadioGroup</code> uses a technique called <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#Technique_1_Roving_tabindex">roving
tabindex</a>
to manage which <code>HowtoRadioButton</code> child is currently focusable. In a
nutshell, the currently focusable child will have a <code>tabindex=0</code>, and all
other children will have a <code>tabindex=-1</code>. This ensures that the <code>RadioGroup</code>
itself is only a single tab stop, and focus always lands on whichever child
is currently checked. In the case where no child is checked, focus will land
on the first <code>HowtoRadioButton</code> child in the <code>HowtoRadioGroup</code>.</p>
<p>The <code>HowtoRadioGroup</code> uses <code>aria-checked=true</code> to indicate the checked state
of its <code>HowtoRadioButton</code> children. Only one child may be set to
<code>aria-checked=true</code>.  Note that unlike most boolean attributes in HTML,
boolean ARIA attributes take a literal string value of either <code>&quot;true&quot;</code> or
<code>&quot;false&quot;</code>.</p>


## Demo {: #demo }
<iframe src="https://googlechrome.github.io/howto-components/howto-radio-group_demo.html" class="demo" aria-label="live demo" role="region"></iframe>

## Example usage {: #usage }
<ul class="literate demo" id="howto-radio-group_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token doctype">&lt;!doctype html></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style language-css">
<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-radio-group</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">align-items</span><span class="token punctuation">:</span> flex-start<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">padding-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-radio-button</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">cursor</span><span class="token punctuation">:</span> default<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-radio-button:focus</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">outline</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-radio-button:focus::before</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 0 1px 2px #5B9DD9<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-radio-button::before</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">border</span><span class="token punctuation">:</span> 1px solid black<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">left</span><span class="token punctuation">:</span> -18px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">top</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token selector">howto-radio-button[aria-checked="true"]::before</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-radio-group</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-radio-button</span><span class="token punctuation">></span></span>Water<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-radio-button</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-radio-button</span><span class="token punctuation">></span></span>Soda<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-radio-button</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-radio-button</span><span class="token punctuation">></span></span>Coffee<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-radio-button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-radio-group</span><span class="token punctuation">></span></span></code>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-radio-group_impl">
  
<li class="blockcomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define keycodes to help with handling keyboard events.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> KEYCODE <span class="token operator">=</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>DOWN<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>LEFT<span class="token punctuation">:</span> <span class="token number">37</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>RIGHT<span class="token punctuation">:</span> <span class="token number">39</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>SPACE<span class="token punctuation">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>UP<span class="token punctuation">:</span> <span class="token number">38</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>HOME<span class="token punctuation">:</span> <span class="token number">36</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>END<span class="token punctuation">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoRadioButton</code> is a simple, checkable button.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowtoRadioButton</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>HowtoRadioButton</code> sets its initial ARIA attributes when it&#39;s
attached to the DOM. The surrounding RadioGroup handles dynamic changes
to the ARIA attributes. The RadioButton should always set a <code>role</code> of
<code>radio</code>, and should check to see if its <code>tabindex</code> and <code>aria-checked</code>
values have been set by the user. Otherwise, it can set these attributes
to default values. Here, the tabindex and aria-checked values are set to
defaults just to indcate that they will likely change in the future.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'radio'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-checked'</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-checked'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define a custom element, <code>&lt;howto-radio-button&gt;</code>, and associate it with the
<code>HowtoRadioButton</code> class.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-radio-button'</span><span class="token punctuation">,</span> HowtoRadioButton<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoRadioGroup</code> is responsible for handling user input, and updating the
state of its <code>HowtoRadioButton</code> children. It uses the <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#Technique_1_Roving_tabindex">roving
tabindex</a>
technique to respond to keyboard events. This ensures that the entire
<code>HowtoRadioGroup</code> is a single tabstop, and tabbing into the
<code>HowtoRadioGroup</code> will always focus the previously checked item, if one
exists.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowtoRadioGroup</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>HowtoRadioGroup</code> sets its ARIA role to <code>radiogroup</code> and sets the
<code>tabindex</code> on its first <code>HowtoRadioButton</code> child to 0 if no other child
is already checked. This makes the first <code>HowtoRadioButton</code> focusable.
If a child is already checked, the <code>HowtoRadioGroup</code> calls <code>_setChecked</code>
to uncheck any other <code>HowtoRadioButton</code> children and ensure that only
this first child is checked. The <code>HowtoRadioGroup</code> also adds listeners
for keyboard and mouse events.  Note that any code manipulating
<code>HowtoRadioButton</code> children assumes they are already in the DOM and
their definitions have been loaded. For a more robust implementation you
might consider using a Mutation Observer to detect if children are
present yet.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'radiogroup'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> firstCheckedButton <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checkedRadioButton<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>firstCheckedButton<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_uncheckAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_checkNode</span><span class="token punctuation">(</span>firstCheckedButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[role="radio"]'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onKeyDown<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If the <code>RadioGroup</code> is removed from the DOM, clean up any event
listeners.</p>
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
<div class="literate-text "><p>If the user pressed an arrow key, call preventDefault to prevent the
page from scrolling. If the up or left arrow keys were pressed, select
the previous <code>HowtoRadioButton</code>. If the down or right keys were pressed,
select the next <code>HowtoRadioButton</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onKeyDown</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">switch</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>keyCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>UP<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>LEFT<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setCheckedToPrevButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>DOWN<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>RIGHT<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setCheckedToNextButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>HOME<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstRadioButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>END<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastRadioButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">default</span><span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A getter for whichever <code>HowtoRadioButton</code> is currently checked.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">checkedRadioButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[aria-checked="true"]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A getter for the first <code>HowtoRadioButton</code> child.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">firstRadioButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[role="radio"]:first-of-type'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A getter for the last <code>HowtoRadioButton</code> child.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">lastRadioButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[role="radio"]:last-of-type'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A helper for when the user tries to moves backwards through the
<code>HowtoRadioGroup</code> using their keyboard. Return the <code>HowtoRadioButton</code>
coming before the one passed as an argument. If no previous
<code>HowtoRadioButton</code> is found, return null.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_prevRadioButton</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> prev <span class="token operator">=</span> node<span class="token punctuation">.</span>previousElementSibling<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">while</span> <span class="token punctuation">(</span>prev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>prev<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'radio'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> prev<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>prev <span class="token operator">=</span> prev<span class="token punctuation">.</span>previousElementSibling<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A helper for when the user tries to moves forwards through the
<code>HowtoRadioGroup</code> using their keyboard. Return the <code>HowtoRadioButton</code>
coming after the one passed as an argument. If no next
<code>HowtoRadioButton</code> is found, return null.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_nextRadioButton</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> next <span class="token operator">=</span> node<span class="token punctuation">.</span>nextElementSibling<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">while</span> <span class="token punctuation">(</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>next<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'radio'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> next<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>next <span class="token operator">=</span> next<span class="token punctuation">.</span>nextElementSibling<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>This method is called in response to a user pressing a key to move
backwards through the <code>HowtoRadioGroup</code>.  Check to see if the currently
checked <code>HowtoRadioButton</code> is the first child.  If so, loop around and
focus the last child. Otherwise, find the previous sibling of the
currently checked <code>HowtoRadioButton</code>, and make it the new checked
button.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_setCheckedToPrevButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> checkedButton <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checkedRadioButton <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstRadioButton<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>checkedButton <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstRadioButton<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastRadioButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_prevRadioButton</span><span class="token punctuation">(</span>checkedButton<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>This method is called in response to a user pressing a key to move
forwards through the <code>HowtoRadioGroup</code>.  Check to see if the currently
checked <code>HowtoRadioButton</code> is the last child.  If so, loop around and
focus the first child. Otherwise, find the next sibling of the currently
checked <code>HowtoRadioButton</code>, and make it the new checked button.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_setCheckedToNextButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> checkedButton <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checkedRadioButton <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstRadioButton<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>checkedButton <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastRadioButton<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstRadioButton<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_nextRadioButton</span><span class="token punctuation">(</span>checkedButton<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Any user action (a keypress or mouse click) eventually funnels down to
this method which ensures that only the passed in element is checked.
Uncheck <em>all</em> <code>HowtoRadioButton</code> children. Then set the
<code>HowtoRadioButton</code> that was passed in to <code>aria-checked=true</code>. Also make
it focusable with <code>tabIndex=0</code> and call its <code>focus()</code> method.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_setChecked</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_uncheckAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_checkNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Only one <code>HowtoRadioButton</code> should be checked at any time. To ensure
this, loop through all <code>HowtoRadioButton</code> children and set them to
<code>aria-checked=false</code> and <code>tabindex=-1</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_uncheckAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> radioButtons <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'[role="radio"]'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> radioButtons<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> btn <span class="token operator">=</span> radioButtons<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>btn<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-checked'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>btn<span class="token punctuation">.</span>tabIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Mark the passed in node as being checked by setting <code>aria-checked=true</code>,
and make it focusable by setting <code>tabindex=0</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_checkNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>node<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-checked'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>node<span class="token punctuation">.</span>tabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Call <code>focus()</code> on the passed in node to direct keyboard focus to it.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_focusNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>node<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If the user clicks inside of the <code>HowtoRadioGroup</code>, verify that the
clicked element has a <code>role</code> of <code>radio</code>, and if so, make it the new
checked button.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onClick</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'radio'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_setChecked</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define a custom element, <code>&lt;howto-radio-group&gt;</code>, and associate it with the
<code>HowtoRadioGroup</code> class.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-radio-group'</span><span class="token punctuation">,</span> HowtoRadioGroup<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

</ul>

<script src="iframesizer.js"></script>
