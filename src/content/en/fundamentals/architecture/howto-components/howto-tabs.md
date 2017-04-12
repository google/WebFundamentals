project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2017-4-12#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-tabs {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="prism-solarizedlight.css">
<link rel="stylesheet" href="main.css">

<p>Tab panels are a pattern to limit visible content by separating
it into multiple panels. Only one panel is visible at a time, while
<em>all</em> corresponding tabs are always visible. To switch from one panel
to another, the corresponding tab has to be selected.</p>
<p>By either clicking or by using the arrow keys the user changes the
selection of the active tab.</p>
<p>If JavaScript is disabled, all panels are shown interleaved with the
respective tabs. The tabs now function as headings.</p>


## Demo {: #demo }
<iframe src="howto-tabs_demo.html" class="demo" aria-label="live demo" role="region"></iframe>

## Example usage {: #usage }
<ul class="literate demo" id="howto-tabs_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token doctype">&lt;!doctype html></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span>howto-tabs {</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The element uses flex box to line up the tabs in the first line
and wraps if necessary.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: flex;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>flex-wrap: wrap;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tabs-tab {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border: 1px solid black;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 20px;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tabs-panel {</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Each panel has a base size of 100%, forcing it to be in its
own row.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>flex-basis: 100%;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 20px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: lightgray;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tabs-panel[aria-hidden="true"] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: none;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tabs-tab[aria-selected="true"] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: bisque;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If JavaScript does not run, the element will stay <code>:unresolved</code>.
In that case this style adds spacing between tabs and previous panel.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tabs:unresolved howto-tabs-tab:unresolved {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>margin-top: 10px;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs-tab</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>heading<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Tab 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs-tab</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs-panel</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>region<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Content 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs-panel</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs-tab</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>heading<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Tab 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs-tab</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs-panel</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>region<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Content 2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs-panel</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs-tab</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>heading<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Tab 3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs-tab</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tabs-panel</span> <span class="token attr-name">role</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>region<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Content 3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs-panel</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tabs</span><span class="token punctuation">></span></span></code>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tabs_impl">
  
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
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>DOWN<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>LEFT<span class="token punctuation">:</span> <span class="token number">37</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>RIGHT<span class="token punctuation">:</span> <span class="token number">39</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>UP<span class="token punctuation">:</span> <span class="token number">38</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>HOME<span class="token punctuation">:</span> <span class="token number">36</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>END<span class="token punctuation">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoTabs</code> is a container element for tabs and panels.</p>
<p>All children of <code>&lt;howto-tabs&gt;</code> should be either <code>&lt;howto-tab&gt;</code> or
<code>&lt;howto-tabpanel&gt;</code>. This element is stateless, meaning that no values are
cached and therefore, changes during runtime work.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowtoTabs</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> groups tabs and panels by reordering and makes sure
exactly one tab is active.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element needs to do some manual input event handling to allow
 switching with arrow keys and Home/End.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onKeyDown<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onClick<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'tablist'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Before the elements starts booting, it waits for
 the both <code>&lt;howto-tab&gt;</code> and <code>&lt;howto-tabpanel&gt;</code> to load.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements<span class="token punctuation">.</span><span class="token function">whenDefined</span><span class="token punctuation">(</span><span class="token string">'howto-tabs-tab'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements<span class="token punctuation">.</span><span class="token function">whenDefined</span><span class="token punctuation">(</span><span class="token string">'howto-tabs-panel'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>_ <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Acquire all tabs and panels inside the element</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> panels <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allPanels</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If there are no tabs, there is no way to switch between panels.
 Abort.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>tabs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Give each panel a <code>aria-labelledby</code> attribute that refers to the tab
 that controls it.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tab <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> panel <span class="token operator">=</span> tab<span class="token punctuation">.</span>nextElementSibling<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span><span class="token punctuation">(</span>panel<span class="token punctuation">.</span>tagName <span class="token operator">!==</span> <span class="token string">'HOWTO-TABS-PANEL'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`Tab #</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>tab<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> is not a`</span></span> <span class="token operator">+</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token template-string"><span class="token string">`sibling of a &lt;howto-tabs-panel>`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-controls'</span><span class="token punctuation">,</span> panel<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-labelledby'</span><span class="token punctuation">,</span> tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> For progressive enhancement, the markup should alternate between tabs
 and panels. If JavaScript is disabled, all panels are
 visible with their respective tab right above them.
 If JavaScript is enabled, the element groups all children by type.
 First all the tabs, then all the panels.
 Calling <code>appendChild</code> on an already inserted element <em>moves</em> the
 element to the last position.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tab <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>tab<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panels<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>panel <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>panel<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element checks if any of the tabs have been marked as selected.
 If not, the first tab is now selected.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> selectedTab <span class="token operator">=</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>tab <span class="token operator">=</span><span class="token operator">></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-selected'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'true'</span><span class="token punctuation">)</span> <span class="token operator">||</span> tabs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Next, we switch to the selected tab. <code>selectTab</code> takes care of
 marking all other tabs as deselected and hiding all other panels.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_selectTab</span><span class="token punctuation">(</span>selectedTab<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_allPanels</code> returns all the panels in the tab panel. This function could
memoize the result if the DOM queries ever become a performance issue.
The downside of memoization is that dynamically added tabs and panels
will not be handled.</p>
<p>This is a method and not a getter, because a getter implies that it is
cheap to read.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_allPanels</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'howto-tabs-panel'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_allTabs</code> returns all the tabs in the tab panel.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'howto-tabs-tab'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_panelForTab</code> returns the panel that the given tab controls.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_panelForTab</span><span class="token punctuation">(</span>tab<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> panelId <span class="token operator">=</span> tab<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-controls'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`#</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>panelId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_prevTab</code> returns the tab that comes before the currently selected one,
wrapping around when reaching the first one.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_prevTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Use <code>findIndex</code> to find the index of the currently
 selected element and subtracts one to get the index of the previous
 element.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> newIdx <span class="token operator">=</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span>tab <span class="token operator">=</span><span class="token operator">></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-selected'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'true'</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Add <code>tabs.length</code> to make sure the index is a positive number
 and get the modulus to wrap around if necessary.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> tabs<span class="token punctuation">[</span><span class="token punctuation">(</span>newIdx <span class="token operator">+</span> tabs<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">%</span> tabs<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_firstTab</code> returns the first tab.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_firstTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> tabs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_lastTab</code> returns the last tab.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_lastTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> tabs<span class="token punctuation">[</span>tabs<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_nextTab</code> gets the tab that comes after the currently selected one,
wrapping around when reaching the last tab.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_nextTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> newIdx <span class="token operator">=</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span>tab <span class="token operator">=</span><span class="token operator">></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-selected'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'true'</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> tabs<span class="token punctuation">[</span>newIdx <span class="token operator">%</span> tabs<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>reset</code> marks all tabs as deselected and hides all the panels.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> panels <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allPanels</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tab <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab<span class="token punctuation">.</span>tabIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-selected'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panels<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>panel <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> removes the event listeners that
<code>connectedCallback</code> added.</p>
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
<div class="literate-text "><p><code>_selectTab</code> marks the given tab as selected.
Additionally, it unhides the panel corresponding to the given tab.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_selectTab</span><span class="token punctuation">(</span>newTab<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Deselect all tabs and hide all panels.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Get the panel that the <code>newTab</code> is associated with.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> newPanel <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_panelForTab</span><span class="token punctuation">(</span>newTab<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If that panel doesn’t exist, abort.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>newPanel<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`No panel with id </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>newPanelId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Unhide the panel and mark the tab as active.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newPanel<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-selected'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab<span class="token punctuation">.</span>tabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onKeyDown</code> handles key presses inside the tab panel.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onKeyDown</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the keypress did not originate from a tab element itself,
 it was a keypress inside the a panel or on empty space. Nothing to do.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">'tab'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>altKey<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The switch-case will determine which tab should be marked as active
 depending on the key that was pressed.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> newTab<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>keyCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>LEFT<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>UP<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_prevTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>RIGHT<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>DOWN<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_nextTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>HOME<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_firstTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>END<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_lastTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Any other key press is ignored and passed back to the browser.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">default</span><span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The browser might have some native functionality bound to the arrow
 keys, home or end. The element calls <code>preventDefault</code> to prevent the
 browser from taking any actions.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Select the new tab, that has been determined in the switch-case.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_selectTab</span><span class="token punctuation">(</span>newTab<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onClick</code> handles clicks inside the tab panel.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onClick</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the click was not targeted on a tab element itself,
 it was a click inside the a panel or on empty space. Nothing to do.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">'tab'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If it was on a tab element, though, select that tab.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_selectTab</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tabs'</span><span class="token punctuation">,</span> HowtoTabs<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> <code>dashTabCounter</code> counts the number of <code>&lt;howto-tab&gt;</code> instances created. The
 number is used to generated new, unique IDs.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> dashTabCounter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoTabsTab</code> is a tab for a <code>&lt;howto-tabs&gt;</code> tab panel. <code>&lt;howto-tabs-tab&gt;</code>
should always be used with <code>role=heading</code> in the markup so that the
semantics remain useable when JavaScript is failing.</p>
<p>A <code>&lt;howto-tabs-tab&gt;</code> declares which <code>&lt;howto-tabs=panel&gt;</code> it belongs to by
using that panel’s ID as the value for the <code>aria-controls</code> attribute.</p>
<p>A <code>&lt;howto-tabs-tab&gt;</code> will automatically generate a unique ID if none
is specified.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowtoTabsTab</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If this is executed, JavaScript is working and the element
 changes its role to <code>tab</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'tab'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token template-string"><span class="token string">`howto-tabs-tab-generated-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>dashTabCounter<span class="token operator">++</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tabs-tab'</span><span class="token punctuation">,</span> HowtoTabsTab<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> dashPanelCounter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoTabsPanel</code> is a panel for a <code>&lt;howto-tabs&gt;</code> tab panel.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowtoTabsPanel</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'tabpanel'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token template-string"><span class="token string">`howto-tabs-panel-generated-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>dashPanelCounter<span class="token operator">++</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tabs-panel'</span><span class="token punctuation">,</span> HowtoTabsPanel<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

</ul>
