project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-05-11#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-checkbox {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="main.css">

A `HowToCheckbox` represents a boolean option in a form. The most common type
of checkbox is a dual-type which allows the user to toggle between two
choices -- checked and unchecked.

See: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox


## Demo {: #demo }
{% framebox height="auto" width="100%" class="demo" suppress_site_styles="true" %}
<!doctype html>
<html lang="en">
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=false,minimum-scale=1.0">
<meta encoding="utf8">
<!--
Copyright 2017 Google Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<!doctype html>
<style>
  howto-checkbox {
    display: inline-block;
    background: url('/web/fundamentals/architecture/howto-components/./images/unchecked-checkbox.svg') no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  howto-checkbox[aria-checked="true"] {
    background: url('/web/fundamentals/architecture/howto-components/./images/checked-checkbox.svg') no-repeat;
    background-size: contain;
  }

  howto-checkbox[aria-disabled="true"] {
    background: url('/web/fundamentals/architecture/howto-components/./images/unchecked-checkbox-disabled.svg') no-repeat;
    background-size: contain;
  }

  howto-checkbox[aria-checked="true"][aria-disabled="true"] {
    background: url('/web/fundamentals/architecture/howto-components/./images/checked-checkbox-disabled.svg') no-repeat;
    background-size: contain;
  }

  #join-label {
    vertical-align: middle;
    display: inline-block;
    font-weight: bold;
    font-family: sans-serif;
    font-size: 20px;
    margin-left: 8px;
  }
</style>

<howto-checkbox aria-labelledby="join-label"></howto-checkbox>
<span id="join-label">Join Newsletter</span>


<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>
<script src="https://cdn.rawgit.com/webcomponents/shadydom/master/shadydom.min.js"></script>
<script>
  devsite.framebox.AutoSizeClient.initAutoSize(true);
  (function() {
    /**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
  /**
   * Define key codes to help with handling keyboard events.
   */
  const KEYCODE = {
    SPACE: 32,
  };

  /**
   * The `HowToCheckbox` exposes a `checked` attribute/property for
   * toggling its state. Changes to the `checked` property will also be
   * reflected to an `aria-checked` attribute. Similarly, the `disabled`
   * property/attribute is reflected to an `aria-disabled` attribute. Although
   * native checkbox elements also provide a `value` property, because it is
   * only used for `<form>` submissions, and this element can't take part in
   * that process, it has been omitted.
   */
  class HowToCheckbox extends HTMLElement {
    static get observedAttributes() {
      return ['checked', 'disabled'];
    }

    /**
     * `connectedCallback` sets the initial `role`, `tabindex`,
     * internal state, and installs event listeners.
     */
    connectedCallback() {
      if (!this.hasAttribute('role'))
        this.setAttribute('role', 'checkbox');
      if (!this.hasAttribute('tabindex'))
        this.setAttribute('tabindex', 0);

      // A user may set a property on an _instance_ of an element,
      // before its prototype has been connected to this class.
      // The `upgradeProperty` method will check for any instance properties
      // and run them through the proper class setters.
      this.upgradeProperty('checked');
      this.upgradeProperty('disabled');

      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
    }

    /**
     * Check if a property has an instance value. If so, copy the value, and
     * delete the instance property so it doesn't shadow the class property
     * setter. Finally, pass the value to the class property setter so it can
     * trigger any side effects.
     * This is to safe guard against cases where, for instance, a framework
     * may have added the element to the page and set a value on one of its
     * properties, but lazy loaded its definition. Without this guard, the
     * upgraded element would miss that property and the instance property
     * would prevent the class property setter from ever being called.
     */
    upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        let value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }

    /**
     * `disconnectedCallback` fires whenever the element is removed from
     * the DOM. It's a good place to do clean up work like releasing
     * references and removing event listeners.
     */
    disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }

    /**
     * Properties and their corresponding attributes should mirror one another.
     * To this effect, the property setter for `checked` handles truthy/falsy
     * values and reflects those to the state of the attribute.
     * It's important to note that there are no side effects taking place in
     * the property setter. For example, the setter does not set
     * `aria-checked`.
     * Instead, that work happens in the `attributeChangedCallback`.
     * As a general rule, make property setters very dumb, and if setting a
     * property or attribute should cause a side effect (like setting a
     * corresponding ARIA attribute) do that work in the
     * `attributeChangedCallback`. This will avoid having to manage complex
     * attribute/property reentrancy scenarios.
     */
    set checked(value) {
      const isChecked = Boolean(value);
      if (isChecked)
        this.setAttribute('checked', '');
      else
        this.removeAttribute('checked');
    }

    get checked() {
      return this.hasAttribute('checked');
    }

    set disabled(value) {
      const isDisabled = Boolean(value);
      if (isDisabled)
        this.setAttribute('disabled', '');
      else
        this.removeAttribute('disabled');
    }

    get disabled() {
      return this.hasAttribute('disabled');
    }

    /**
     * `attributeChangedCallback` watches for changes to the `checked` and
     * `disabled` attributes and reflects their states to the corresponding
     * properties and ARIA attributes. It will be called at startup time if
     * either attribute has been set.
     */
    attributeChangedCallback(name, oldValue, newValue) {
      const hasValue = newValue !== null;
      switch (name) {
        case 'checked':
          this.setAttribute('aria-checked', hasValue);
          break;
        case 'disabled':
          this.setAttribute('aria-disabled', hasValue);
          // The `tabindex` attribute does not provide a way to fully remove
          // focusability from an element.
          // Elements with `tabindex=-1` can still be focused with
          // a mouse or by calling `focus()`.
          // To make sure an element is disabled and not focusable, remove the
          // `tabindex` attribute.
          if (hasValue) {
            this.removeAttribute('tabindex');
            // If the focus is currently on this element, unfocus it by
            // calling the `HTMLElement.blur()` method.
            if (document.activeElement === this)
              this.blur();
          } else {
            this.setAttribute('tabindex', '0');
          }
          break;
      }
    }

    _onKeyDown(event) {
      // Don’t handle modifier shortcuts typically used by assistive technology.
      if (event.altKey)
        return;

      switch (event.keyCode) {
        case KEYCODE.SPACE:
          event.preventDefault();
          this._toggleChecked();
          break;
        // Any other key press is ignored and passed back to the browser.
        default:
          return;
      }
    }

    _onClick(event) {
      this._toggleChecked();
    }

    /**
     * `_toggleChecked` calls the `checked` setter and flips its state.
     * Because `_toggleChecked` is only caused by a user action, it will
     * also dispatch a change event. This event bubbles in order to mimic
     * the native behavior of `<input type=checkbox>`.
     */
    _toggleChecked() {
      if (this.disabled)
        return;
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          checked: this.checked,
        },
        bubbles: true,
      }));
    }
  }

  window.customElements.define('howto-checkbox', HowToCheckbox);
})();



  })();
</script>
</html>

{% endframebox %}

## Example usage {: #usage }
<ul class="literate demo" id="howto-checkbox_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code ">&lt;!doctype html&gt;
&lt;style&gt;
<sPan class="indent">&nbsp;&nbsp;</span>howto-checkbox {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>display: inline-block;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background: url('./images/unchecked-checkbox.svg') no-repeat;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background-size: contain;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>width: 24px;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>height: 24px;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>vertical-align: middle;
<sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span>howto-checkbox[aria-checked="true"] {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background: url('./images/checked-checkbox.svg') no-repeat;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background-size: contain;
<sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span>howto-checkbox[aria-disabled="true"] {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background: url('./images/unchecked-checkbox-disabled.svg') no-repeat;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background-size: contain;
<sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span>howto-checkbox[aria-checked="true"][aria-disabled="true"] {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background: url('./images/checked-checkbox-disabled.svg') no-repeat;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>background-size: contain;
<sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span>#join-label {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>vertical-align: middle;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>display: inline-block;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>font-weight: bold;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>font-family: sans-serif;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>font-size: 20px;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>margin-left: 8px;
<sPan class="indent">&nbsp;&nbsp;</span>}
&lt;/style&gt;

&lt;howto-checkbox aria-labelledby="join-label"&gt;&lt;/howto-checkbox&gt;
&lt;span id="join-label"&gt;Join Newsletter&lt;/span&gt;</code></pre>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-checkbox_impl">
  
<li class="blockcomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code ">(function() {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre><code class="literate-code empty"></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define key codes to help with handling keyboard events.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span>const KEYCODE = {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>SPACE: 32,
<sPan class="indent">&nbsp;&nbsp;</span>};</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>HowToCheckbox</code> exposes a <code>checked</code> attribute/property for
toggling its state. Changes to the <code>checked</code> property will also be
reflected to an <code>aria-checked</code> attribute. Similarly, the <code>disabled</code>
property/attribute is reflected to an <code>aria-disabled</code> attribute. Although
native checkbox elements also provide a <code>value</code> property, because it is
only used for <code>&lt;form&gt;</code> submissions, and this element can&#39;t take part in
that process, it has been omitted.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span>class HowToCheckbox extends HTMLElement {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>static get observedAttributes() {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return ['checked', 'disabled'];
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> sets the initial <code>role</code>, <code>tabindex</code>,
internal state, and installs event listeners.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>connectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('role'))
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'checkbox');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('tabindex'))
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', 0);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> A user may set a property on an <em>instance</em> of an element,
 before its prototype has been connected to this class.
 The <code>upgradeProperty</code> method will check for any instance properties
 and run them through the proper class setters.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.upgradeProperty('checked');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.upgradeProperty('disabled');

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.addEventListener('keydown', this._onKeyDown);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.addEventListener('click', this._onClick);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Check if a property has an instance value. If so, copy the value, and
delete the instance property so it doesn&#39;t shadow the class property
setter. Finally, pass the value to the class property setter so it can
trigger any side effects.
This is to safe guard against cases where, for instance, a framework
may have added the element to the page and set a value on one of its
properties, but lazy loaded its definition. Without this guard, the
upgraded element would miss that property and the instance property
would prevent the class property setter from ever being called.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>upgradeProperty(prop) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (this.hasOwnProperty(prop)) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>let value = this[prop];
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>delete this[prop];
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this[prop] = value;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> fires whenever the element is removed from
the DOM. It&#39;s a good place to do clean up work like releasing
references and removing event listeners.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.removeEventListener('keydown', this._onKeyDown);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.removeEventListener('click', this._onClick);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Properties and their corresponding attributes should mirror one another.
To this effect, the property setter for <code>checked</code> handles truthy/falsy
values and reflects those to the state of the attribute.
It&#39;s important to note that there are no side effects taking place in
the property setter. For example, the setter does not set
<code>aria-checked</code>.
Instead, that work happens in the <code>attributeChangedCallback</code>.
As a general rule, make property setters very dumb, and if setting a
property or attribute should cause a side effect (like setting a
corresponding ARIA attribute) do that work in the
<code>attributeChangedCallback</code>. This will avoid having to manage complex
attribute/property reentrancy scenarios.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>set checked(value) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>const isChecked = Boolean(value);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (isChecked)
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('checked', '');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>else
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.removeAttribute('checked');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>get checked() {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('checked');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>set disabled(value) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>const isDisabled = Boolean(value);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (isDisabled)
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('disabled', '');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>else
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.removeAttribute('disabled');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>get disabled() {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('disabled');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>attributeChangedCallback</code> watches for changes to the <code>checked</code> and
<code>disabled</code> attributes and reflects their states to the corresponding
properties and ARIA attributes. It will be called at startup time if
either attribute has been set.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>attributeChangedCallback(name, oldValue, newValue) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>const hasValue = newValue !== null;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>switch (name) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>case 'checked':
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-checked', hasValue);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>break;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>case 'disabled':
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-disabled', hasValue);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The <code>tabindex</code> attribute does not provide a way to fully remove
 focusability from an element.
 Elements with <code>tabindex=-1</code> can still be focused with
 a mouse or by calling <code>focus()</code>.
 To make sure an element is disabled and not focusable, remove the
 <code>tabindex</code> attribute.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (hasValue) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.removeAttribute('tabindex');</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the focus is currently on this element, unfocus it by
 calling the <code>HTMLElement.blur()</code> method.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (document.activeElement === this)
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.blur();
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>} else {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', '0');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>break;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>_onKeyDown(event) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (event.altKey)
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return;

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>switch (event.keyCode) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>case KEYCODE.SPACE:
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>event.preventDefault();
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this._toggleChecked();
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>break;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Any other key press is ignored and passed back to the browser.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>default:
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>_onClick(event) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this._toggleChecked();
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_toggleChecked</code> calls the <code>checked</code> setter and flips its state.
Because <code>_toggleChecked</code> is only caused by a user action, it will
also dispatch a change event. This event bubbles in order to mimic
the native behavior of <code>&lt;input type=checkbox&gt;</code>.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>_toggleChecked() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (this.disabled)
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.checked = !this.checked;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.dispatchEvent(new CustomEvent('change', {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>detail: {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>checked: this.checked,
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>},
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>bubbles: true,
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}));
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}
<sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span>window.customElements.define('howto-checkbox', HowToCheckbox);
})();</code></pre>
</li>

</ul>
