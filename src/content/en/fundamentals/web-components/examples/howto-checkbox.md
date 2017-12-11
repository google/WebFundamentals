project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-11 #}
{# wf_published_on: 2017-10-02 #}
{# wf_blink_components: Blink>DOM #}

# HowTo: Components – howto-checkbox {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="main.css">

## Summary {: #summary }

A `<howto-checkbox` represents a boolean option in a form. The most common type
of checkbox is a dual-type which allows the user to toggle between two
choices -- checked and unchecked.

The element attempts to self apply the attributes `role="checkbox"` and
`tabindex="0"` when it is first created. The `role` attribute helps assistive
technology like a screen reader tell the user what kind of control this is.
The `tabindex` attribute opts the element into the tab order, making it keyboard
focusable and operable. To learn more about these two topics, check out
[What can ARIA do?][what-aria] and [Using tabindex][using-tabindex].

When the checkbox is checked, it adds a `checked` boolean attribute, and sets
a corresponding `checked` property to `true`. In addition, the element sets an
`aria-checked` attribute to either `"true"` or `"false"`, depending on its
state. Clicking on the checkbox with a mouse, or space bar, toggles these
checked states.

The checkbox also supports a `disabled` state. If either the `disabled` property
is set to true or the `disabled` attribute is applied, the checkbox sets
`aria-disabled="true"`, removes the `tabindex` attribute, and returns focus
to the document if the checkbox is the current `activeElement`.

The checkbox is paired with a `howto-label` element to ensure it has an
[accessible name](http://localhost:8080/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree#semantics_in_native_html).

Warning: Just because you _can_ build a custom element checkbox, doesn't
necessarily mean that you _should_. As this example shows, you will need to add
your own keyboard, labeling, and ARIA support. It's also important to note that
the native `<form>` element will NOT submit values from a custom element. You
will need to wire that up yourself using AJAX or a hidden `<input>` field. For
these reasons it can often be preferable to use the built-in `<input
type="checkbox">` instead.

## Reference {: #reference }

- [HowTo: Components on GitHub][howto-github]
- [Checkbox Pattern in ARIA Authoring Practices 1.1][checkbox-pattern]
- [What can ARIA Do?][what-aria]
- [Using tabindex][using-tabindex]

[howto-github]: https://github.com/GoogleChromeLabs/howto-components
[checkbox-pattern]: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
[what-aria]: https://developers.google.com/web/fundamentals/accessibility/semantics-aria/#what_can_aria_do
[using-tabindex]: https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex


## Demo {: #demo }

[View live demo on GitHub](https://googlechromelabs.github.io/howto-components/howto-checkbox/#demo)

## Example usage {: #usage }
<ul class="literate demo" id="howto-checkbox_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code ">&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span>howto-checkbox {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>vertical-align: middle;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-label {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>vertical-align: middle;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: inline-block;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>font-weight: bold;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>font-family: sans-serif;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>font-size: 20px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>margin-left: 8px;
<span class="indent">&nbsp;&nbsp;</span>}
&lt;/style&gt;

&lt;howto-checkbox id="join-checkbox"&gt;&lt;/howto-checkbox&gt;
&lt;howto-label for="join-checkbox"&gt;Join Newsletter&lt;/howto-label&gt;</code></pre>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-checkbox_impl">
  
<li class="blockcomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code ">(function() {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code empty"></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define key codes to help with handling keyboard events.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>const KEYCODE = {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>SPACE: 32,
<span class="indent">&nbsp;&nbsp;</span>};</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Cloning contents from a &lt;template&gt; element is more performant
than using innerHTML because it avoids additional HTML parse costs.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>const template = document.createElement('template');</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>template.innerHTML = `
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: inline-block;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background: url('../images/unchecked-checkbox.svg') no-repeat;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-size: contain;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>width: 24px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>height: 24px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host([hidden]) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: none;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host([checked]) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background: url('../images/checked-checkbox.svg') no-repeat;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-size: contain;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host([disabled]) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>url('../images/unchecked-checkbox-disabled.svg') no-repeat;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-size: contain;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host([checked][disabled]) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>url('../images/checked-checkbox-disabled.svg') no-repeat;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-size: contain;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;/style&gt;
<span class="indent">&nbsp;&nbsp;</span>`;

<span class="indent">&nbsp;&nbsp;</span>
<span class="indent">&nbsp;&nbsp;</span>class HowToCheckbox extends HTMLElement {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>static get observedAttributes() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return ['checked', 'disabled'];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The element&#39;s constructor is run anytime a new instance is created.
Instances are created either by parsing HTML, calling
document.createElement(&#39;howto-checkbox&#39;), or calling new HowToCheckbox();
The constructor is a good place to create shadow DOM, though you should
avoid touching any attributes or light DOM children as they may not
be available yet.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.attachShadow({mode: 'open'});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.shadowRoot.appendChild(template.content.cloneNode(true));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback()</code> fires when the element is inserted into the DOM.
It&#39;s a good place to set the initial <code>role</code>, <code>tabindex</code>, internal state,
and install event listeners.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('role'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'checkbox');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('tabindex'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', 0);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>A user may set a property on an <em>instance</em> of an element,
 before its prototype has been connected to this class.
 The <code>_upgradeProperty()</code> method will check for any instance properties
 and run them through the proper class setters.
 See the <a href="/web/fundamentals/architecture/building-components/best-practices#lazy-properties">lazy properties</a>
 section for more details.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._upgradeProperty('checked');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._upgradeProperty('disabled');

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.addEventListener('keyup', this._onKeyUp);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.addEventListener('click', this._onClick);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_upgradeProperty(prop) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (this.hasOwnProperty(prop)) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let value = this[prop];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>delete this[prop];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this[prop] = value;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback()</code> fires when the element is removed from the DOM.
It&#39;s a good place to do clean up work like releasing references and
removing event listeners.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeEventListener('keyup', this._onKeyUp);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeEventListener('click', this._onClick);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Properties and their corresponding attributes should mirror one another.
The property setter for <code>checked</code> handles truthy/falsy values and
reflects those to the state of the attribute. See the <a href="/web/fundamentals/architecture/building-components/best-practices#avoid-reentrancy">avoid
reentrancy</a>
section for more details.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>set checked(value) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const isChecked = Boolean(value);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (isChecked)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('checked', '');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>else
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeAttribute('checked');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>get checked() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('checked');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>set disabled(value) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const isDisabled = Boolean(value);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (isDisabled)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('disabled', '');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>else
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeAttribute('disabled');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>get disabled() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('disabled');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>attributeChangedCallback()</code> is called when any of the attributes in the
<code>observedAttributes</code> array are changed. It&#39;s a good place to handle
side effects, like setting ARIA attributes.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>attributeChangedCallback(name, oldValue, newValue) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const hasValue = newValue !== null;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>switch (name) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case 'checked':
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-checked', hasValue);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case 'disabled':
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-disabled', hasValue);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The <code>tabindex</code> attribute does not provide a way to fully remove
 focusability from an element.
 Elements with <code>tabindex=-1</code> can still be focused with
 a mouse or by calling <code>focus()</code>.
 To make sure an element is disabled and not focusable, remove the
 <code>tabindex</code> attribute.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (hasValue) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeAttribute('tabindex');</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>If the focus is currently on this element, unfocus it by
 calling the <code>HTMLElement.blur()</code> method.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.blur();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>} else {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', '0');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onKeyUp(event) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (event.altKey)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>switch (event.keyCode) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.SPACE:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>event.preventDefault();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._toggleChecked();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Any other key press is ignored and passed back to the browser.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>default:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onClick(event) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._toggleChecked();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_toggleChecked()</code> calls the <code>checked</code> setter and flips its state.
Because <code>_toggleChecked()</code> is only caused by a user action, it will
also dispatch a change event. This event bubbles in order to mimic
the native behavior of <code>&lt;input type=checkbox&gt;</code>.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_toggleChecked() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (this.disabled)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.checked = !this.checked;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.dispatchEvent(new CustomEvent('change', {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>detail: {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>checked: this.checked,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>},
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>bubbles: true,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span>window.customElements.define('howto-checkbox', HowToCheckbox);
})();</code></pre>
</li>

</ul>
