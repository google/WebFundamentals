project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-25 #}
{# wf_published_on: 2017-04-06 #}

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

When the checkbox is checked, it adds a `[checked]` boolean attribute, and sets
a corresponding `checked` property to `true`. In addition, the element sets an
`[aria-checked]` attribute to either `"true"` or `"false"`, depending on its
state. Clicking on the checkbox with a mouse, or space bar, toggles these
checked states.

The checkbox also supports a `disabled` state. If either the `disabled` property
is set to true or the `[disabled]` attribute is applied, the checkbox sets
`aria-disabled="true"` and set `tabindex="-1"`.

## Tips and best practices {: #tips-best-practices }

### Why do ARIA attributes need a "true" or "false" string? {: why-aria }

Unlike other boolean attributes, ARIA attributes require a literal string of
either `"true"` or `"false"`.

```html
<howto-checkbox checked aria-checked="true">
```

This is because for certain ARIA attributes the absence of the attribute might
mean something different than false. For example, `aria-pressed="false"`
indicates that a control can be toggled, but is currently in the off state.
Whereas the absence of an `aria-pressed` attribute indicates that the control is
not toggleable at all.

### Don't override the page author {: #dont-override }

It's possible that a developer using this element might want to give it a
different role, for example, `role="switch"`. Similarly they might want the
control to not be focusable just yet, so they might set `tabindex="-1"`. It's
important to respect the developer's wishes and not surprise them by overriding
their configuration. For this reason, the element checks to see if those
attributes have been set, before applying its own values.

```js
connectedCallback() {
  if (!this.hasAttribute('role'))
    this.setAttribute('role', 'checkbox');
  if (!this.hasAttribute('tabindex'))
    this.setAttribute('tabindex', 0);
```

### Make properties lazy {: #lazy-properties }

A developer might attempt to set a property on the element before its definition
has been loaded. This is especially true if the developer is using a framework
which handles loading components, stamping them to the page, and binding their
properties to a model.

```html
<!--
Here Angular is declaratively binding its model's isChecked property to the
checkbox's checked property. If the definition for howto-checkbox was lazy loaded
it's possible that Angular might attempt to set the checked property before
the element has upgraded.
-->
<howto-checkbox [checked]="defaults.isChecked"></howto-checkbox>
```

A Custom Element should handle this scenario by checking if any properties have
already been set on its instance. The `<howto-checkbox>` demonstrates this
pattern using a method called `_upgradeProperty`.

```js
connectedCallback() {
  ...
  this._upgradeProperty('checked');
}

_upgradeProperty(prop) {
  if (this.hasOwnProperty(prop)) {
    let value = this[prop];
    delete this[prop];
    this[prop] = value;
  }
}
```

`_upgradeProperty` captures the value from the unupgraded instance and deletes
the property so it does not shadow the Custom Element's own property setter.
This way, when the element's definition does finally load, it can immediately
reflect the correct state.

### Avoid reentrancy issues {: #avoid-reentrancy }

It's tempting to use the `attributeChangedCallback` to reflect state to an
underlying property, for example:

```js
// When the [checked] attribute changes, set the checked property to match.
attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'checked')
    this.checked = newValue;
}
```

But this can create an infinite loop if the property setter also reflects to
the attribute.

```js
set checked(value) {
  const isChecked = Boolean(value);
  if (isChecked)
    // OOPS! This will cause an infinite loop because it triggers the
    // attributeChangedCallback() which then sets this property again.
    this.setAttribute('checked', '');
  else
    this.removeAttribute('checked');
}
```

An alternative is to allow the property setter to reflect to the attribute, and
have the getter determine it's value based on the attribute.

```js
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
```

In this example, adding or removing the attribute will also effectively set the
property.

Finally, the `attributeChangedCallback` can be used to just handle side effects
like applying ARIA states.

```js
attributeChangedCallback(name, oldValue, newValue) {
  const hasValue = newValue !== null;
  switch (name) {
    case 'checked':
      // Note the attributeChangedCallback is only handling the *side effects*
      // of setting the attribute.
      this.setAttribute('aria-checked', hasValue);
      break;
    ...
  }
}
```


## Reference {: #reference }

- [Checkbox pattern in ARIA Authoring Practices 1.1][checkbox-pattern]
- [What can ARIA do?][what-aria]
- [Using tabindex][using-tabindex]

[checkbox-pattern]: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
[what-aria]: https://developers.google.com/web/fundamentals/accessibility/semantics-aria/#what_can_aria_do
[using-tabindex]: https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex


## Demo {: #demo }
{% framebox height="auto" width="100%" class="demo" suppress_site_styles="true" %}
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

  class HowToCheckbox extends HTMLElement {
    static get observedAttributes() {
      return ['checked', 'disabled'];
    }

    /**
     * `connectedCallback` fires when the element is inserted into the DOM.
     * It's a good place to set the initial `role`, `tabindex`, internal state,
     * and install event listeners.
     */
    connectedCallback() {
      if (!this.hasAttribute('role'))
        this.setAttribute('role', 'checkbox');
      if (!this.hasAttribute('tabindex'))
        this.setAttribute('tabindex', 0);

      // A user may set a property on an _instance_ of an element,
      // before its prototype has been connected to this class.
      // The `_upgradeProperty` method will check for any instance properties
      // and run them through the proper class setters.
      // See the [lazy properties](#lazy-properties) section for more details.
      this._upgradeProperty('checked');
      this._upgradeProperty('disabled');

      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
    }

    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        let value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }

    /**
     * `disconnectedCallback` fireswhen the element is removed from the DOM.
     * It's a good place to do clean up work like releasing references and
     * removing event listeners.
     */
    disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }

    /**
     * Properties and their corresponding attributes should mirror one another.
     * The property setter for `checked` handles truthy/falsy values and
     * reflects those to the state of the attribute. See the [avoid
     * reentrancy](#avoid-reentrancy) section for more details.
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
     * `attributeChangedCallback` is called when any of the attributes in the
     * `observedAttributes` array are changed. It's a good place to handle
     * side effects, like setting ARIA attributes.
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
<pre><code class="literate-code ">&lt;style&gt;
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
<sPan class="indent">&nbsp;&nbsp;</span>};

<sPan class="indent">&nbsp;&nbsp;</span>class HowToCheckbox extends HTMLElement {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>static get observedAttributes() {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>return ['checked', 'disabled'];
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> fires when the element is inserted into the DOM.
It&#39;s a good place to set the initial <code>role</code>, <code>tabindex</code>, internal state,
and install event listeners.</p>
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
 The <code>_upgradeProperty</code> method will check for any instance properties
 and run them through the proper class setters.
 See the <a href="#lazy-properties">lazy properties</a> section for more details.</p>
</div>
<pre><code class="literate-code "><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this._upgradeProperty('checked');
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this._upgradeProperty('disabled');

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.addEventListener('keydown', this._onKeyDown);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this.addEventListener('click', this._onClick);
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}

<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>_upgradeProperty(prop) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>if (this.hasOwnProperty(prop)) {
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>let value = this[prop];
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>delete this[prop];
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>this[prop] = value;
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}
<sPan class="indent">&nbsp;&nbsp;</span><sPan class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> fireswhen the element is removed from the DOM.
It&#39;s a good place to do clean up work like releasing references and
removing event listeners.</p>
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
The property setter for <code>checked</code> handles truthy/falsy values and
reflects those to the state of the attribute. See the <a href="#avoid-reentrancy">avoid
reentrancy</a> section for more details.</p>
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
<div class="literate-text "><p><code>attributeChangedCallback</code> is called when any of the attributes in the
<code>observedAttributes</code> array are changed. It&#39;s a good place to handle
side effects, like setting ARIA attributes.</p>
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
