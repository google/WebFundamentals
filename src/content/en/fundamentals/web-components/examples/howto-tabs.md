project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-08-21 #}
{# wf_published_on: 2017-04-06 #}
{# wf_blink_components: Blink>DOM #}

# HowTo: Components – &lt;howto-tabs&gt; {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="main.css">

## Summary {: #summary }

`<howto-tabs>` limit visible content by separating it into multiple panels. Only
one panel is visible at a time, while _all_ corresponding tabs are always
visible. To switch from one panel to another, the corresponding tab has to be
selected.

By either clicking or by using the arrow keys the user can change the
selection of the active tab.

If JavaScript is disabled, all panels are shown interleaved with the
respective tabs. The tabs now function as headings.

## Reference {: #reference }

- [Tabpanl pattern in ARIA Authoring Practices 1.1][tabs-pattern]

[tabs-pattern]: https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel


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
  howto-tab {
    border: 1px solid black;
    padding: 20px;
  }
  howto-panel {
    padding: 20px;
    background-color: lightgray;
  }
  howto-tab[selected] {
    background-color: bisque;
  }

  /**
   * If JavaScript does not run, the element will not match `:defined`.
   * In that case this style adds spacing between tabs and previous panel.
   */
  howto-tabs:not(:defined), howto-tab:not(:defined), howto-panel:not(:defined) {
    display: block;
  }
</style>

<howto-tabs>
  <howto-tab role="heading" slot="tab">Tab 1</howto-tab>
  <howto-panel role="region" slot="panel">Content 1</howto-panel>
  <howto-tab role="heading" slot="tab">Tab 2</howto-tab>
  <howto-panel role="region" slot="panel">Content 2</howto-panel>
  <howto-tab role="heading" slot="tab">Tab 3</howto-tab>
  <howto-panel role="region" slot="panel">Content 3</howto-panel>
</howto-tabs>


<script src="https://cdn.rawgit.com/webcomponents/webcomponentsjs/d5b7ca65/webcomponents-sd-ce.js"></script>
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
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35,
  };

  // To avoid invoking the parser with `.innerHTML` for every new instance, a
  // template for the contents of the shadow DOM is shared by all
  // `<howto-tabs>` instances.
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      ::slotted(howto-panel) {
        flex-basis: 100%;
      }
    </style>
    <slot name="tab"></slot>
    <slot name="panel"></slot>
  `;

  // HIDE
  // ShadyCSS will rename classes as needed to ensure style scoping.
  ShadyCSS.prepareTemplate(template, 'howto-tabs');
  // /HIDE

  /**
   * `HowtoTabs` is a container element for tabs and panels.
   *
   * All children of `<howto-tabs>` should be either `<howto-tab>` or
   * `<howto-tabpanel>`. This element is stateless, meaning that no values are
   * cached and therefore, changes during runtime work.
   */
  class HowtoTabs extends HTMLElement {
    constructor() {
      super();

      // Event handlers that are not attached to this element need to be bound
      // if they need access to `this`.
      this._onSlotChange = this._onSlotChange.bind(this);

      // For progressive enhancement, the markup should alternate between tabs
      // and panels. Elements that reorder their children tend to not work well
      // with frameworks. Instead shadow DOM is used to reorder the elements by
      // using slots.
      this.attachShadow({mode: 'open'});
      // Import the shared template to create the slots for tabs and panels.
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
      this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');

      // This element needs to react to new children as it links up tabs and
      // panel semantically using `aria-labelledby` and `aria-controls`.
      // New children will get slotted automatically and cause `slotchange`
      // to fire, so not `MutationObserver` is needed.
      this._tabSlot.addEventListener('slotchange', this._onSlotChange);
      this._panelSlot.addEventListener('slotchange', this._onSlotChange);
    }

    /**
     * `connectedCallback()` groups tabs and panels by reordering and makes sure
     * exactly one tab is active.
     */
    connectedCallback() {
      // HIDE
      // Shim Shadow DOM styles. This needs to be run in connectedCallback
      // because if you shim Custom Properties (CSS variables) the element
      // will need access to its parent node.
      ShadyCSS.styleElement(this);
      // /HIDE

      // The element needs to do some manual input event handling to allow
      // switching with arrow keys and Home/End.
      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);

      if (!this.hasAttribute('role'))
        this.setAttribute('role', 'tablist');

      // Up until recently, `slotchange` events did not fire when an element was
      // upgraded by the parser. For this reason, the element invokes the
      // handler manually. Once the new behavior lands in all browsers, the code
      // below can be removed.
      Promise.all([
        customElements.whenDefined('howto-tab'),
        customElements.whenDefined('howto-panel'),
      ])
        .then(_ => this._linkPanels());
    }

    /**
     * `disconnectedCallback()` removes the event listeners that
     * `connectedCallback` added.
     */
    disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }

    /**
     * `_onSlotChange()` is called whenever an element is added or removed from
     * one of the shadow DOM slots.
     */
    _onSlotChange() {
      this._linkPanels();
    }

    /**
     * `_linkPanels()` links up tabs with their adjacent panels using
     * `aria-controls` and `aria-labelledby`. Additionally, the method makes
     * sure only one tab is active.
     *
     * If this function becomes a bottleneck, it can be easily optimized by
     * only handling the new elements instead of iterating over all of the
     * element’s children.
     */
    _linkPanels() {
      const tabs = this._allTabs();
      // Give each panel a `aria-labelledby` attribute that refers to the tab
      // that controls it.
      tabs.forEach(tab => {
        const panel = tab.nextElementSibling;
        if (panel.tagName.toLowerCase() !== 'howto-panel') {
          console.error(`Tab #${tab.id} is not a` +
            `sibling of a <howto-panel>`);
          return;
        }

        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
      });

      // The element checks if any of the tabs have been marked as selected.
      // If not, the first tab is now selected.
      const selectedTab =
        tabs.find(tab => tab.selected) || tabs[0];

      // Next, switch to the selected tab. `selectTab()` takes care of
      // marking all other tabs as deselected and hiding all other panels.
      this._selectTab(selectedTab);
    }

    /**
     * `_allPanels()` returns all the panels in the tab panel. This function
     * could memorize the result if the DOM queries ever become a performance
     * issue. The downside of memorization is that dynamically added tabs and
     * panels will not be handled.
     *
     * This is a method and not a getter, because a getter implies that it is
     * cheap to read.
     */
    _allPanels() {
      return Array.from(this.querySelectorAll('howto-panel'));
    }

    /**
     * `_allTabs()` returns all the tabs in the tab panel.
     */
    _allTabs() {
      return Array.from(this.querySelectorAll('howto-tab'));
    }

    /**
     * `_panelForTab()` returns the panel that the given tab controls.
     */
    _panelForTab(tab) {
      const panelId = tab.getAttribute('aria-controls');
      return this.querySelector(`#${panelId}`);
    }

    /**
     * `_prevTab()` returns the tab that comes before the currently selected
     * one, wrapping around when reaching the first one.
     */
    _prevTab() {
      const tabs = this._allTabs();
      // Use `findIndex()` to find the index of the currently
      // selected element and subtracts one to get the index of the previous
      // element.
      let newIdx =
        tabs.findIndex(tab => tab.selected) - 1;
      // Add `tabs.length` to make sure the index is a positive number
      // and get the modulus to wrap around if necessary.
      return tabs[(newIdx + tabs.length) % tabs.length];
    }

    /**
     * `_firstTab()` returns the first tab.
     */
    _firstTab() {
      const tabs = this._allTabs();
      return tabs[0];
    }

    /**
     * `_lastTab()` returns the last tab.
     */
    _lastTab() {
      const tabs = this._allTabs();
      return tabs[tabs.length - 1];
    }

    /**
     * `_nextTab()` gets the tab that comes after the currently selected one,
     * wrapping around when reaching the last tab.
     */
    _nextTab() {
      const tabs = this._allTabs();
      let newIdx = tabs.findIndex(tab => tab.selected) + 1;
      return tabs[newIdx % tabs.length];
    }

    /**
     * `reset()` marks all tabs as deselected and hides all the panels.
     */
    reset() {
      const tabs = this._allTabs();
      const panels = this._allPanels();

      tabs.forEach(tab => tab.selected = false);
      panels.forEach(panel => panel.hidden = true);
    }


    /**
     * `_selectTab()` marks the given tab as selected.
     * Additionally, it unhides the panel corresponding to the given tab.
     */
    _selectTab(newTab) {
      // Deselect all tabs and hide all panels.
      this.reset();

      // Get the panel that the `newTab` is associated with.
      const newPanel = this._panelForTab(newTab);
      // If that panel doesn’t exist, abort.
      if (!newPanel)
        throw new Error(`No panel with id ${newPanelId}`);
      newTab.selected = true;
      newPanel.hidden = false;
      newTab.focus();
    }

    /**
     * `_onKeyDown()` handles key presses inside the tab panel.
     */
    _onKeyDown(event) {
      // If the keypress did not originate from a tab element itself,
      // it was a keypress inside the a panel or on empty space. Nothing to do.
      if (event.target.getAttribute('role') !== 'tab')
        return;
      // Don’t handle modifier shortcuts typically used by assistive technology.
      if (event.altKey)
        return;

      // The switch-case will determine which tab should be marked as active
      // depending on the key that was pressed.
      let newTab;
      switch (event.keyCode) {
        case KEYCODE.LEFT:
        case KEYCODE.UP:
          newTab = this._prevTab();
          break;

        case KEYCODE.RIGHT:
        case KEYCODE.DOWN:
          newTab = this._nextTab();
          break;

        case KEYCODE.HOME:
          newTab = this._firstTab();
          break;

        case KEYCODE.END:
          newTab = this._lastTab();
          break;
        // Any other key press is ignored and passed back to the browser.
        default:
          return;
      }

      // The browser might have some native functionality bound to the arrow
      // keys, home or end. The element calls `preventDefault()` to prevent the
      // browser from taking any actions.
      event.preventDefault();
      // Select the new tab, that has been determined in the switch-case.
      this._selectTab(newTab);
    }

    /**
     * `_onClick()` handles clicks inside the tab panel.
     */
    _onClick(event) {
      // If the click was not targeted on a tab element itself,
      // it was a click inside the a panel or on empty space. Nothing to do.
      if (event.target.getAttribute('role') !== 'tab')
        return;
      // If it was on a tab element, though, select that tab.
      this._selectTab(event.target);
    }
  }
  customElements.define('howto-tabs', HowtoTabs);

  // `howtoTabCounter` counts the number of `<howto-tab>` instances created. The
  // number is used to generated new, unique IDs.
  let howtoTabCounter = 0;
  /**
   * `HowtoTabsTab` is a tab for a `<howto-tabs>` tab panel. `<howto-tab>`
   * should always be used with `role=heading` in the markup so that the
   * semantics remain useable when JavaScript is failing.
   *
   * A `<howto-tab>` declares which `<howto-panel>` it belongs to by
   * using that panel’s ID as the value for the `aria-controls` attribute.
   *
   * A `<howto-tab>` will automatically generate a unique ID if none
   * is specified.
   */
  class HowtoTab extends HTMLElement {
    static get observedAttributes() {
      return ['selected'];
    }

    constructor() {
      super();
    }

    connectedCallback() {
      // If this is executed, JavaScript is working and the element
      // changes its role to `tab`.
      this.setAttribute('role', 'tab');
      if (!this.id)
        this.id = `howto-tab-generated-${howtoTabCounter++}`;

      // Set a well-defined initial state.
      this.setAttribute('aria-selected', 'false');
      this.setAttribute('tabindex', -1);
      this._upgradeProperty('selected');
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
    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        let value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }

    /**
     * Properties and their corresponding attributes should mirror one another.
     * To this effect, the property setter for `selected` handles truthy/falsy
     * values and reflects those to the state of the attribute. It’s important
     * to note that there are no side effects taking place in the property
     * setter. For example, the setter does not set `aria-selected`. Instead,
     * that work happens in the `attributeChangedCallback`. As a general rule,
     * make property setters very dumb, and if setting a property or attribute
     * should cause a side effect (like setting a corresponding ARIA attribute)
     * do that work in the `attributeChangedCallback()`. This will avoid having
     * to manage complex attribute/property reentrancy scenarios.
     */
    attributeChangedCallback() {
      const value = this.hasAttribute('selected');
      this.setAttribute('aria-selected', value);
      this.setAttribute('tabindex', value ? 0 : -1);
    }

    set selected(value) {
      value = Boolean(value);
      if (value)
        this.setAttribute('selected', '');
      else
        this.removeAttribute('selected');
    }

    get selected() {
      return this.hasAttribute('selected');
    }
  }
  customElements.define('howto-tab', HowtoTab);

  let howtoPanelCounter = 0;
  /**
   * `HowtoPanel` is a panel for a `<howto-tabs>` tab panel.
   */
  class HowtoPanel extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'tabpanel');
      if (!this.id)
        this.id = `howto-panel-generated-${howtoPanelCounter++}`;
    }
  }
  customElements.define('howto-panel', HowtoPanel);
})();



  })();
</script>
</html>

{% endframebox %}

## Example usage {: #usage }
<ul class="literate demo" id="howto-tabs_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code ">&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span>howto-tab {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border: 1px solid black;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 20px;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-panel {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 20px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: lightgray;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tab[selected] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: bisque;
<span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If JavaScript does not run, the element will not match <code>:defined</code>.
In that case this style adds spacing between tabs and previous panel.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tabs:not(:defined), howto-tab:not(:defined), howto-panel:not(:defined) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: block;
<span class="indent">&nbsp;&nbsp;</span>}
&lt;/style&gt;

&lt;howto-tabs&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-tab role="heading" slot="tab"&gt;Tab 1&lt;/howto-tab&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-panel role="region" slot="panel"&gt;Content 1&lt;/howto-panel&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-tab role="heading" slot="tab"&gt;Tab 2&lt;/howto-tab&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-panel role="region" slot="panel"&gt;Content 2&lt;/howto-panel&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-tab role="heading" slot="tab"&gt;Tab 3&lt;/howto-tab&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-panel role="region" slot="panel"&gt;Content 3&lt;/howto-panel&gt;
&lt;/howto-tabs&gt;</code></pre>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tabs_impl">
  
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
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>DOWN: 40,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>LEFT: 37,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>RIGHT: 39,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>UP: 38,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>HOME: 36,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>END: 35,
<span class="indent">&nbsp;&nbsp;</span>};</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>To avoid invoking the parser with <code>.innerHTML</code> for every new instance, a
 template for the contents of the shadow DOM is shared by all
 <code>&lt;howto-tabs&gt;</code> instances.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>const template = document.createElement('template');
<span class="indent">&nbsp;&nbsp;</span>template.innerHTML = `
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: flex;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>flex-wrap: wrap;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>::slotted(howto-panel) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>flex-basis: 100%;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;/style&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;slot name="tab"&gt;&lt;/slot&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;slot name="panel"&gt;&lt;/slot&gt;
<span class="indent">&nbsp;&nbsp;</span>`;</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoTabs</code> is a container element for tabs and panels.</p>
<p>All children of <code>&lt;howto-tabs&gt;</code> should be either <code>&lt;howto-tab&gt;</code> or
<code>&lt;howto-tabpanel&gt;</code>. This element is stateless, meaning that no values are
cached and therefore, changes during runtime work.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>class HowtoTabs extends HTMLElement {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Event handlers that are not attached to this element need to be bound
 if they need access to <code>this</code>.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._onSlotChange = this._onSlotChange.bind(this);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>For progressive enhancement, the markup should alternate between tabs
 and panels. Elements that reorder their children tend to not work well
 with frameworks. Instead shadow DOM is used to reorder the elements by
 using slots.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.attachShadow({mode: 'open'});</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Import the shared template to create the slots for tabs and panels.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.shadowRoot.appendChild(template.content.cloneNode(true));

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>This element needs to react to new children as it links up tabs and
 panel semantically using <code>aria-labelledby</code> and <code>aria-controls</code>.
 New children will get slotted automatically and cause <code>slotchange</code>
 to fire, so not <code>MutationObserver</code> is needed.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._tabSlot.addEventListener('slotchange', this._onSlotChange);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._panelSlot.addEventListener('slotchange', this._onSlotChange);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback()</code> groups tabs and panels by reordering and makes sure
exactly one tab is active.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code empty"></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The element needs to do some manual input event handling to allow
 switching with arrow keys and Home/End.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.addEventListener('keydown', this._onKeyDown);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.addEventListener('click', this._onClick);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.hasAttribute('role'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'tablist');</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Up until recently, <code>slotchange</code> events did not fire when an element was
 upgraded by the parser. For this reason, the element invokes the
 handler manually. Once the new behavior lands in all browsers, the code
 below can be removed.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>Promise.all([
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements.whenDefined('howto-tab'),
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements.whenDefined('howto-panel'),
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>])
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.then(_ =&gt; this._linkPanels());
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback()</code> removes the event listeners that
<code>connectedCallback</code> added.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeEventListener('keydown', this._onKeyDown);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeEventListener('click', this._onClick);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onSlotChange()</code> is called whenever an element is added or removed from
one of the shadow DOM slots.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onSlotChange() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._linkPanels();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_linkPanels()</code> links up tabs with their adjacent panels using
<code>aria-controls</code> and <code>aria-labelledby</code>. Additionally, the method makes
sure only one tab is active.</p>
<p>If this function becomes a bottleneck, it can be easily optimized by
only handling the new elements instead of iterating over all of the
element’s children.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_linkPanels() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const tabs = this._allTabs();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Give each panel a <code>aria-labelledby</code> attribute that refers to the tab
 that controls it.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs.forEach(tab =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const panel = tab.nextElementSibling;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (panel.tagName.toLowerCase() !== 'howto-panel') {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>console.error(`Tab #${tab.id} is not a` +
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>`sibling of a &lt;howto-panel&gt;`);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tab.setAttribute('aria-controls', panel.id);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel.setAttribute('aria-labelledby', tab.id);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The element checks if any of the tabs have been marked as selected.
 If not, the first tab is now selected.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const selectedTab =
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs.find(tab =&gt; tab.selected) || tabs[0];</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Next, switch to the selected tab. <code>selectTab()</code> takes care of
 marking all other tabs as deselected and hiding all other panels.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._selectTab(selectedTab);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_allPanels()</code> returns all the panels in the tab panel. This function
could memorize the result if the DOM queries ever become a performance
issue. The downside of memorization is that dynamically added tabs and
panels will not be handled.</p>
<p>This is a method and not a getter, because a getter implies that it is
cheap to read.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_allPanels() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return Array.from(this.querySelectorAll('howto-panel'));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_allTabs()</code> returns all the tabs in the tab panel.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_allTabs() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return Array.from(this.querySelectorAll('howto-tab'));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_panelForTab()</code> returns the panel that the given tab controls.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_panelForTab(tab) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const panelId = tab.getAttribute('aria-controls');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this.querySelector(`#${panelId}`);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_prevTab()</code> returns the tab that comes before the currently selected
one, wrapping around when reaching the first one.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_prevTab() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const tabs = this._allTabs();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Use <code>findIndex()</code> to find the index of the currently
 selected element and subtracts one to get the index of the previous
 element.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let newIdx =
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs.findIndex(tab =&gt; tab.selected) - 1;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Add <code>tabs.length</code> to make sure the index is a positive number
 and get the modulus to wrap around if necessary.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return tabs[(newIdx + tabs.length) % tabs.length];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_firstTab()</code> returns the first tab.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_firstTab() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const tabs = this._allTabs();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return tabs[0];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_lastTab()</code> returns the last tab.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_lastTab() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const tabs = this._allTabs();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return tabs[tabs.length - 1];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_nextTab()</code> gets the tab that comes after the currently selected one,
wrapping around when reaching the last tab.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_nextTab() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const tabs = this._allTabs();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let newIdx = tabs.findIndex(tab =&gt; tab.selected) + 1;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return tabs[newIdx % tabs.length];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>reset()</code> marks all tabs as deselected and hides all the panels.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>reset() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const tabs = this._allTabs();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const panels = this._allPanels();

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>tabs.forEach(tab =&gt; tab.selected = false);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panels.forEach(panel =&gt; panel.hidden = true);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_selectTab()</code> marks the given tab as selected.
Additionally, it unhides the panel corresponding to the given tab.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_selectTab(newTab) {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code empty"></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Deselect all tabs and hide all panels.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.reset();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Get the panel that the <code>newTab</code> is associated with.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const newPanel = this._panelForTab(newTab);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>If that panel doesn’t exist, abort.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!newPanel)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>throw new Error(`No panel with id ${newPanelId}`);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab.selected = true;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newPanel.hidden = false;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab.focus();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onKeyDown()</code> handles key presses inside the tab panel.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onKeyDown(event) {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code empty"></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>If the keypress did not originate from a tab element itself,
 it was a keypress inside the a panel or on empty space. Nothing to do.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (event.target.getAttribute('role') !== 'tab')
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (event.altKey)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The switch-case will determine which tab should be marked as active
 depending on the key that was pressed.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let newTab;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>switch (event.keyCode) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.LEFT:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.UP:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab = this._prevTab();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.RIGHT:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.DOWN:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab = this._nextTab();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.HOME:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab = this._firstTab();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.END:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newTab = this._lastTab();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Any other key press is ignored and passed back to the browser.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>default:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>The browser might have some native functionality bound to the arrow
 keys, home or end. The element calls <code>preventDefault()</code> to prevent the
 browser from taking any actions.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>event.preventDefault();</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Select the new tab, that has been determined in the switch-case.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._selectTab(newTab);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onClick()</code> handles clicks inside the tab panel.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onClick(event) {</code></pre>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code empty"></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>If the click was not targeted on a tab element itself,
 it was a click inside the a panel or on empty space. Nothing to do.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (event.target.getAttribute('role') !== 'tab')
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>If it was on a tab element, though, select that tab.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._selectTab(event.target);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>customElements.define('howto-tabs', HowtoTabs);</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p><code>howtoTabCounter</code> counts the number of <code>&lt;howto-tab&gt;</code> instances created. The
 number is used to generated new, unique IDs.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>let howtoTabCounter = 0;</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoTabsTab</code> is a tab for a <code>&lt;howto-tabs&gt;</code> tab panel. <code>&lt;howto-tab&gt;</code>
should always be used with <code>role=heading</code> in the markup so that the
semantics remain useable when JavaScript is failing.</p>
<p>A <code>&lt;howto-tab&gt;</code> declares which <code>&lt;howto-panel&gt;</code> it belongs to by
using that panel’s ID as the value for the <code>aria-controls</code> attribute.</p>
<p>A <code>&lt;howto-tab&gt;</code> will automatically generate a unique ID if none
is specified.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>class HowtoTab extends HTMLElement {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>static get observedAttributes() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return ['selected'];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>If this is executed, JavaScript is working and the element
 changes its role to <code>tab</code>.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'tab');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.id)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.id = `howto-tab-generated-${howtoTabCounter++}`;</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p>Set a well-defined initial state.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-selected', 'false');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', -1);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._upgradeProperty('selected');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
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
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_upgradeProperty(prop) {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (this.hasOwnProperty(prop)) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let value = this[prop];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>delete this[prop];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this[prop] = value;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Properties and their corresponding attributes should mirror one another.
To this effect, the property setter for <code>selected</code> handles truthy/falsy
values and reflects those to the state of the attribute. It’s important
to note that there are no side effects taking place in the property
setter. For example, the setter does not set <code>aria-selected</code>. Instead,
that work happens in the <code>attributeChangedCallback</code>. As a general rule,
make property setters very dumb, and if setting a property or attribute
should cause a side effect (like setting a corresponding ARIA attribute)
do that work in the <code>attributeChangedCallback()</code>. This will avoid having
to manage complex attribute/property reentrancy scenarios.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>attributeChangedCallback() {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const value = this.hasAttribute('selected');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-selected', value);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('tabindex', value ? 0 : -1);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>set selected(value) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>value = Boolean(value);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (value)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('selected', '');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>else
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeAttribute('selected');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>get selected() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('selected');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>customElements.define('howto-tab', HowtoTab);

<span class="indent">&nbsp;&nbsp;</span>let howtoPanelCounter = 0;</code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoPanel</code> is a panel for a <code>&lt;howto-tabs&gt;</code> tab panel.</p>
</div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>class HowtoPanel extends HTMLElement {</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre class="prettyprint"><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'tabpanel');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this.id)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.id = `howto-panel-generated-${howtoPanelCounter++}`;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>customElements.define('howto-panel', HowtoPanel);
})();</code></pre>
</li>

</ul>
