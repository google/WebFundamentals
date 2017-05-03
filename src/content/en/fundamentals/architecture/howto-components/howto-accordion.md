project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-05-02#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-accordion {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="main.css">

Accordions are a pattern to limit visible content by separating
it into multiple panels. Any panel can be expanded or collapsed, giving
the user control over which content is visible.

By either clicking or by using the arrow keys the user changes the
selection of the active heading. With enter or space the active headings
can be toggled between expanded and collapsed state.

The headings and the panels have the classes `expanded` or `collapsed`
assigned to them depending on their state.

All panels should be styled to be visible if JavaScript is disabled.

See: https://www.w3.org/TR/wai-aria-practices-1.1/#accordion


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
  howto-accordion {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: stretch;
  }
  /* Headings need a background color so they are not transparent. Otherwise
  the content will shine through during the animation. */
  howto-accordion-heading {
    background-color: white;
    border: 1px solid black;
  }
  howto-accordion-heading[expanded] {
    background-color: bisque;
  }
  howto-accordion-panel {
    padding: 20px;
    background-color: lightgray;
  }
  /* The accordion gets the `animating` class assigned if its children are about
  to be animated. The implementation relies on the `transitionend` event, so
  this class _must_ define a transition on the `transform` property. */
  howto-accordion > *.animating {
    transition: transform 0.3s ease-in-out;
  }
  howto-accordion-panel:not([expanded]) {
    display: none;
  }
</style>

<howto-accordion>
  <howto-accordion-heading>Tab 1</howto-accordion-heading>
  <howto-accordion-panel>Content 1</howto-accordion-panel>
  <howto-accordion-heading>Tab 2</howto-accordion-heading>
  <howto-accordion-panel>Content 2</howto-accordion-panel>
  <howto-accordion-heading>Tab 3</howto-accordion-heading>
  <howto-accordion-panel>Content 3</howto-accordion-panel>
</howto-accordion>


<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>
<script src="https://cdn.rawgit.com/webcomponents/shadydom/master/shadydom.min.js"></script>
<script>
  devsite.framebox.AutoSizeClient.initAutoSize(true);
  if (!document.location.search.includes('nojs')) {
    (function() {
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

  /**
   * `HowtoAccordion` is a container element for headings and panels.
   *
   * Each heading must be a `<howto-accordion-heading>`. Each panel must be a
   * `<howto-accordion-panel>` and must be adjacent to a heading.
   */
  class HowtoAccordion extends HTMLElement {
    constructor() {
      super();
    }

    /**
     * `connectedCallback` hooks up the even listeners and considers the
     * `expand`  attribute on the headers to adjust their styling accordingly.
     */
    connectedCallback() {
      // `<howto-accordion-headers>` emit a custom event when the heading is
      // instructed to expand. The custom event is a nice abstraction because
      // expansion can be triggered by clicks, keyboard input and attribute
      // and property changes alike.
      this.addEventListener('change', this._onChange);
      // The element also implements roving tab index to switch focus between
      // the headers. Therefore key presses are intercepted.
      this.addEventListener('keydown', this._onKeyDown);

      // TODO: Set up MutationObserver to listen for `expand` attribute on the
      // headings.

      // Wait for `<howto-accordion-heading>` and `<howto-accordion-panel`
      // to have booted before proceeding.
      Promise.all([
        customElements.whenDefined('howto-accordion-heading'),
        customElements.whenDefined('howto-accordion-panel'),
      ])
        .then(_ => {
        // Acquire all headings inside the element that need to be set up.
        const headings = this._allHeadings();

        // Give all headings and panels a unique ID. Set up `aria-controls` and
        // `aria-labelledby` attributes on headings and panels using those IDs.
        headings.forEach(heading => {
          // All buttons inside the `HowtoAccordionHeadings` are made
          // unfocusable here. Only the first heading will be made focusable
          // afterwards. This is necessary to implement roving tab index.
          heading._shadowButton.setAttribute('tabindex', -1);
          const panel = this._panelForHeading(heading);

          // Make headings and panels reference each other
          // with the `aria-labelledby` and `aria-controls` attributes.
          heading.setAttribute('aria-controls', panel.id);
          panel.setAttribute('aria-labelledby', heading.id);

          // Assign the appropriate roles to panels. Headings are custom
          // elements and set their role in their own `connectedCallback`.
          if (!panel.hasAttribute('role'))
            panel.setAttribute('role', 'region');
        });
        // Make the first heading focusable.
        headings[0]._shadowButton.setAttribute('tabindex', 0);

        // Set all the panels to the collapsed state to have a well-defined
        // initial state.

        // Check if any of the headings have been marked as
        // expanded using the `expanded` attribute. If so, all the associated
        // panels get expanded as well.
        headings
          .forEach(heading => {
            const panel = this._panelForHeading(heading);
            if(!heading.expanded) {
              this._collapseHeading(heading);
              this._collapsePanel(panel);
            } else {
              this._expandHeading(heading);
              this._expandPanel(panel);
            }
          });
        });
    }

    /**
     * `disconnectedCallback` removes all the event listeners that
     * `connectedCallback` added.
     */
    disconnectedCallback() {
      this.removeEventListener('change', this._onChange);
      this.removeEventListener('keydown', this._onKeyDown);
    }

    /**
     * `_isHeading` returns true if the given element
     * is a `<howto-accordion-heading>`.
     */
    _isHeading(elem) {
      return elem.tagName.toLowerCase() === 'howto-accordion-heading';
    }

    /**
     * `_onChange` handles the `change` event. The event’s
     * target is the heading that has been instructed to expand by click,
     * keyboard input.
     */
    _onChange(event) {
      this._animatePanelForHeading(event.target, event.detail.isExpandedNow);
    }

    /**
     * `_animatePanelForHeading` animates the expansion of a panel, provided
     * there is no other animation running.
     */
    _animatePanelForHeading(heading, expand) {
      // If there’s an animation running, ignore the event.
      if (this.classList.contains('animating'))
        return;
      const panel = this._panelForHeading(heading);
      if(expand) {
        this._expandPanel(panel);
        this._animateIn(panel);
      } else {
        this._animateOut(panel)
          .then(_ => this._collapsePanel(panel));
      }
    }

    /**
     * `_onKeyDown` handles key presses inside the accordion.
     */
    _onKeyDown(event) {
      // If the currently focused element is not a heading, the keypress
      // originated from inside a panel or empty space. Nothing to do.
      const currentHeading = event.target;
      if (!this._isHeading(currentHeading)) return;
      // Don’t handle modifier shortcuts typically used by assistive technology.
      if (event.altKey) return;

      // The switch-case will determine which heading should be focused next
      // depending on the key that was pressed.
      let newHeading;
      switch (event.keyCode) {
        case KEYCODE.LEFT:
        case KEYCODE.UP:
          newHeading = this._prevHeading();
          break;

        case KEYCODE.RIGHT:
        case KEYCODE.DOWN:
          newHeading = this._nextHeading();
          break;

        case KEYCODE.HOME:
          newHeading = this._firstHeading();
          break;

        case KEYCODE.END:
          newHeading = this._lastHeading();
          break;
        // Any other key press is ignored and passed back to the browser.
        default:
          return;
      }

      // The browser might have some native functionality bound to the arrow
      // keys, home or end. The element calls `preventDefault` to prevent the
      // browser from taking any actions.
      event.preventDefault();
      // Make the currently focused heading unfocusable, then make the new
      // heading focusable and give focus to it.
      currentHeading._shadowButton.setAttribute('tabindex', -1);
      newHeading._shadowButton.setAttribute('tabindex', 0);
      newHeading._shadowButton.focus();
    }

    /**
     * `_allPanels` returns all the panels in the accordion. This function could
     * memoize the result if the DOM queries ever become a performance issue.
     * The downside of memoization is that dynamically added headings and panels
     * will not be handled.
     *
     * This is a method and not a getter, because a getter implies that it is
     * cheap to read while this method queries the DOM on every call.
     */
    _allPanels() {
      return Array.from(this.querySelectorAll('howto-accordion-panel'));
    }

    /**
     * `_allHeadings` returns all the headings in the accordion.
     */
    _allHeadings() {
      return Array.from(this.querySelectorAll('howto-accordion-heading'));
    }

    /**
     * `_panelForHeading` returns the panel that the given heading controls.
     */
    _panelForHeading(heading) {
      const next = heading.nextElementSibling;
      if(next.tagName.toLowerCase() !== 'howto-accordion-panel') {
        console.error('Sibling element to a heading need to be a panel.');
        return;
      }
      return next;
    }

    /**
     * `_prevHeading` returns the heading that comes before the currently
     * selected one, wrapping around when reaching the first one.
     */
    _prevHeading() {
      const headings = this._allHeadings();
      // Use `findIndex` to find the index of the currently
      // selected element and subtracts one to get the index of the previous
      // element.
      let newIdx =
        headings.findIndex(headings =>
          headings === document.activeElement) - 1;
      // Add `headings.length` to make sure the index is a positive number
      // and get the modulus to wrap around if necessary.
      return headings[(newIdx + headings.length) % headings.length];
    }

    /**
     * `_nextHeading` gets the heading that comes after the currently selected
     * one, wrapping around when reaching the last heading.
     */
    _nextHeading() {
      const headings = this._allHeadings();
      let newIdx =
        headings.findIndex(heading =>
          heading === document.activeElement) + 1;
      return headings[newIdx % headings.length];
    }

    /**
     * `_firstHeading` returns the first heading.
     */
    _firstHeading() {
      const headings = this._allHeadings();
      return headings[0];
    }

    /**
     * `_lastHeading` returns the last heading.
     */
    _lastHeading() {
      const headings = this._allHeadings();
      return headings[headings.length - 1];
    }

    /**
     * `_expandPanel` puts the given panel in the expanded state, without any
     * animation.
     */
    _expandPanel(panel) {
      panel.expanded = true;
    }

    /**
     * `_expandHeading` puts the given heading in the expanded state, without
     * any animation.
     */
    _expandHeading(heading) {
      heading.expanded = true;
    }

    _collapsePanel(panel) {
      panel.expanded = false;
    }

    _collapseHeading(heading) {
      heading.expanded = false;
    }

    /**
     * `_animateIn` determines the height of the panel and uses that value for
     * an expanding animation.
     */
    _animateIn(panel) {
      const height = panel.getBoundingClientRect().height;
      return this._animate(panel, -height, 0);
    }

    /**
     * Same as `_animateIn` but in the other direction.
     */
    _animateOut(panel) {
      const height = panel.getBoundingClientRect().height;
      return this._animate(panel, 0, -height);
    }

    /**
     * `_animate` animates a translation on the Y axis from one offset to
     * another. It takes care of promoting all the elements, making sure they
     * will be painted in the right order during animation and cleans up
     * afterwards.
     */
    _animate(panel, startOffset, endOffset) {
      // If start and end are the same there is nothing to do. The reason for
      // explicitly handling this case is that this method waits for an
      // `transitionend` event which won’t fire if there is no animation.
      if(startOffset === endOffset) return Promise.resolve();
      // Set the `animating` class on the `<howto-accordion>` element. This
      // discards all further `change` events until the animation is done.
      this.classList.add('animating');
      // Turn the list of children into a proper array with all the helper
      // functions defined on it.
      const children = Array.from(this.children);
      // Find the index of the panel that is being animated.
      const idx = children.indexOf(panel);
      // Only that panel and all the headings and panels _after_ the given panel
      // need to be animated.
      const animatedChildren = children.slice(idx);

      // Some children will be translated
      // beyond the top of the element and might end up being visible above the
      // element. Switch the `<howto-accordion>` element to `overflow: hidden`
      // to prevent that.
      this.style.overflow = 'hidden';
      // Switch all children to `position: relative` so that the element
      // has full control over paint order using `z-index`.
      children.forEach(child => {
        child.style.position = 'relative';
        // All children _before_ the animated ones need to be painted _over_
        // all the animated children. Therefore, set all children to
        // `z-index: 2` and set all the animated children to `z-index: 1` next.
        child.style.zIndex = 2;
      });

      // Set `z-index: 1` on all animated children translate them to the
      // start position. Because this function uses a CSS transition we don’t
      // need to use `will-change`.
      animatedChildren.forEach(child => {
        child.style.position = 'relative';
        child.style.zIndex = 1;
        child.style.transform = `translateY(${startOffset}px)`;
      });

      // Wait two frames for all the styles to take effect.
      return requestAnimationFramePromise()
        .then(_ => requestAnimationFramePromise())
        .then(_ => {
          // Set up the CSS transition on all the children and set them to
          // their end position.
          animatedChildren.forEach(child => {
            child.style.transform = `translateY(${endOffset}px)`;
            child.classList.add('animating');
          });
          // Wait for the transition to end.
          return transitionEndPromise(panel);
        })
        .then(_ => {
          // Clean up all the temporary styles
          animatedChildren.forEach(child => {
            child.style.transform = '';
            child.classList.remove('animating');
          });
          children.forEach(child => {
            child.style.position = '';
            child.style.zIndex = '';
          });
          this.style.overflow = '';
          this.classList.remove('animating');
        });
    }
  }
  window.customElements.define('howto-accordion', HowtoAccordion);

  // `headingIdCounter` counts the number of IDs generated and is used to
  // generated new, unique IDs.
  let headingIdCounter = 0;

  // To avoid invoking the parser with `.innerHTML` for every new instance, a
  // template for the contents of the ShadowDOM is is shared by all
  // `<howto-accordion>` instances.
  //
  // The WAI ARIA Best Practices demand a button inside the heading. For
  // developer convenience, the button is injected using ShadowDOM and
  // is styled in a way that it is practically invisible. This way the
  // button’s accessible functionality is preserved while still allowing
  // the developer to freely style the headings.
  //
  // Another advantage is focus management. If the button inside ShadowDOM has
  // focus, `document.activeElement` returns the containing
  // `<howto-accordion-heading>` element rather than the button itself.
  const shadowDOMTemplate = document.createElement('template');
  shadowDOMTemplate.innerHTML = `
    <style>
      :host > button {
        display: block;
        background-color: initial;
        border: initial;
        width: 100%;
      }
    </style>
    <button><slot></slot></button>
  `;

  /**
   * `HowtoAccordionHeading` is the element for the headings in the accordion.
   * Accordion to the WAI ARIA Best Practices, each heading needs to wrap a
   * `<button>`. This element puts that element in the ShadowDOM, as it is more
   * convenient to use and doesn’t make server-side rendering or styling more
   *  problematic. This element dispatches a `howto-accordion-change` event when
   * it is supposed to expand.
   *
   * Clicking the button or pressing space or enter while the button has focus
   * will expand the heading. Changing the `expand` attribute or property will
   * also cause the heading to expand.
   */
  class HowtoAccordionHeading extends HTMLElement {
    // The element reacts to changes to the `expanded` attribute.
    static get observedAttributes() {
      return ['expanded'];
    }

    constructor() {
      super();

      // Binding event handlers to `this` ensures that `this` inside the event
      // handler will always be the `<howto-accordion-heading>`, even if the
      // handler is hooked up to other elements.
      this._onClick = this._onClick.bind(this);

      // Import the ShadowDOM template.
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(
        document.importNode(shadowDOMTemplate.content, true)
      );
      this._shadowButton = this.shadowRoot.querySelector('button');
    }

    /**
     * `connectedCallback()` sets up the role, event handler and initial state.
     */
    connectedCallback() {
      if(!this.hasAttribute('role'))
        this.setAttribute('role', 'heading');
      if(!this.id)
        this.id = `howto-accordion-heading-generated-${headingIdCounter++}`;

      this._shadowButton.addEventListener('click', this._onClick);
    }

    /**
     * `disconnectedCallback` cleans up the event handlers set up in
     * `connectedCallback`.
     */
    disconnectedCallback() {
      this._shadowButton.removeEventListener('click', this._onClick);
    }

    /**
     * `attributeChangedCallback` processes changes to the `expanded` attribute.
     */
    attributeChangedCallback(name) {
      // `expanded` is a boolean attribute it is either set or not set. The
      // actual value is irrelevant.
      const value = this.hasAttribute('expanded');
      this._shadowButton.setAttribute('aria-expanded', value);
    }

    get expanded() {
      return this.hasAttribute('expanded');
    }

    /**
     * Properties and their corresponding attributes should mirror one another.
     * To this effect, the property setter for selected handles truthy/falsy
     * values and reflects those to the state of the attribute. It’s important
     * to note that there are no side effects taking place in the property
     * setter. For example, the setter does not set aria-expanded. Instead,
     * that work happens in the attributeChangedCallback. As a general rule,
     * make property setters very dumb, and if setting a property or attribute
     * should cause a side effect (like setting a corresponding ARIA attribute)
     * do that work in the attributeChangedCallback. This will avoid having to
     * manage complex attribute/property reentrancy scenarios.
     */
    set expanded(value) {
      // Properties can be set to all kinds of string values. This makes sure
      // it’s converted to a proper boolean value using JavaScript’s truthiness
      // & falsiness principles.
      value = Boolean(value);
      if(value)
        this.setAttribute('expanded', '');
      else
        this.removeAttribute('expanded');
    }

    /**
     * `_onClick` is the event handler for a click. A click toggles the expanded
     * and the collapsed state.
     */
    _onClick() {
      this.expanded = !this.expanded;

      // Dispatch an event that signals a request to expand to the
      // `<howto-accordion>` element.
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {isExpandedNow: this.expanded},
          bubbles: true,
        })
      );
    }
  }
  window.customElements
    .define('howto-accordion-heading', HowtoAccordionHeading);

  // `panelIdCounter` counts the number of IDs generated for panels and is used
  // to generated new, unique IDs.
  let panelIdCounter = 0;

  /**
   * `HowtoAccordionHeading` is the element for the headings in the accordion.
   * Accordion to the WAI ARIA Best Practices, each heading needs to wrap a
   * `<button>`. This element dispatches a `howto-accordion-change` event when
   * it is supposed to expand.
   *
   * Clicking the button or pressing space or enter while the button has focus
   * will expand the heading. Changing the `expand` attribute or property will
   * also cause the heading to expand.≤
   */
  class HowtoAccordionPanel extends HTMLElement {
    static get observedAttributes() {
      return ['expanded'];
    }

    constructor() {
      super();
    }

    /**
     * `connectedCallback()` sets up the role and the ID of the element.
     */
    connectedCallback() {
      if(!this.hasAttribute('role'))
        this.setAttribute('role', 'region');
      if(!this.id)
        this.id = `howto-accordion-panel-generated-${panelIdCounter++}`;
    }

    get expanded() {
      return this.hasAttribute('expanded');
    }

    set expanded(val) {
      const value = Boolean(val);
      if (value)
        this.setAttribute('expanded', '');
      else
        this.removeAttribute('expanded');
    }

    attributeChangedCallback(name) {
      this.setAttribute('aria-hidden', !this.expanded);
    }
  }
  window.customElements
    .define('howto-accordion-panel', HowtoAccordionPanel);


  // These functions help make animations easier.
  // Read https://dassur.ma/things/raf-promise/ for more details.
  function transitionEndPromise(element) {
    return new Promise(resolve => {
      element.addEventListener('transitionend', function f() {
        element.removeEventListener('transitionend', f);
        resolve();
      });
    });
  }

  function requestAnimationFramePromise() {
    return new Promise(resolve => requestAnimationFrame(resolve));
  }
})();



    })();
  }
</script>
</html>

{% endframebox %}

## Example usage {: #usage }
<ul class="literate demo" id="howto-accordion_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code ">&lt;!doctype html&gt;
&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span>howto-accordion {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: flex;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>flex-wrap: wrap;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>flex-direction: column;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>align-items: stretch;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Headings need a background color so they are not transparent. Otherwise
  the content will shine through during the animation.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span>howto-accordion-heading {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: white;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border: 1px solid black;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-accordion-heading[expanded] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: bisque;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-accordion-panel {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 20px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: lightgray;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The accordion gets the <code>animating</code> class assigned if its children are about
  to be animated. The implementation relies on the <code>transitionend</code> event, so
  this class <em>must</em> define a transition on the <code>transform</code> property.</p>
</div>
<pre><code class="literate-code ">
<span class="indent">&nbsp;&nbsp;</span>howto-accordion &gt; *.animating {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition: transform 0.3s ease-in-out;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-accordion-panel:not([expanded]) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: none;
<span class="indent">&nbsp;&nbsp;</span>}
&lt;/style&gt;

&lt;howto-accordion&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-accordion-heading&gt;Tab 1&lt;/howto-accordion-heading&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-accordion-panel&gt;Content 1&lt;/howto-accordion-panel&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-accordion-heading&gt;Tab 2&lt;/howto-accordion-heading&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-accordion-panel&gt;Content 2&lt;/howto-accordion-panel&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-accordion-heading&gt;Tab 3&lt;/howto-accordion-heading&gt;
<span class="indent">&nbsp;&nbsp;</span>&lt;howto-accordion-panel&gt;Content 3&lt;/howto-accordion-panel&gt;
&lt;/howto-accordion&gt;
</code></pre>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-accordion_impl">
  
<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code ">(function() {
<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define key codes to help with handling keyboard events.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>const KEYCODE = {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>DOWN: 40,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>LEFT: 37,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>RIGHT: 39,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>UP: 38,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>HOME: 36,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>END: 35,
<span class="indent">&nbsp;&nbsp;</span>};

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoAccordion</code> is a container element for headings and panels.</p>
<p>Each heading must be a <code>&lt;howto-accordion-heading&gt;</code>. Each panel must be a
<code>&lt;howto-accordion-panel&gt;</code> and must be adjacent to a heading.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>class HowtoAccordion extends HTMLElement {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> hooks up the even listeners and considers the
<code>expand</code>  attribute on the headers to adjust their styling accordingly.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> <code>&lt;howto-accordion-headers&gt;</code> emit a custom event when the heading is
 instructed to expand. The custom event is a nice abstraction because
 expansion can be triggered by clicks, keyboard input and attribute
 and property changes alike.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.addEventListener('change', this._onChange);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element also implements roving tab index to switch focus between
 the headers. Therefore key presses are intercepted.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.addEventListener('keydown', this._onKeyDown);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> TODO: Set up MutationObserver to listen for <code>expand</code> attribute on the
 headings.
 Wait for <code>&lt;howto-accordion-heading&gt;</code> and <code>&lt;howto-accordion-panel</code>
 to have booted before proceeding.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>Promise.all([
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements.whenDefined('howto-accordion-heading'),
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements.whenDefined('howto-accordion-panel'),
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>])
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.then(_ =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Acquire all headings inside the element that need to be set up.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const headings = this._allHeadings();

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Give all headings and panels a unique ID. Set up <code>aria-controls</code> and
 <code>aria-labelledby</code> attributes on headings and panels using those IDs.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>headings.forEach(heading =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> All buttons inside the <code>HowtoAccordionHeadings</code> are made
 unfocusable here. Only the first heading will be made focusable
 afterwards. This is necessary to implement roving tab index.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>heading._shadowButton.setAttribute('tabindex', -1);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const panel = this._panelForHeading(heading);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Make headings and panels reference each other
 with the <code>aria-labelledby</code> and <code>aria-controls</code> attributes.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>heading.setAttribute('aria-controls', panel.id);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel.setAttribute('aria-labelledby', heading.id);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Assign the appropriate roles to panels. Headings are custom
 elements and set their role in their own <code>connectedCallback</code>.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!panel.hasAttribute('role'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel.setAttribute('role', 'region');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Make the first heading focusable.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>headings[0]._shadowButton.setAttribute('tabindex', 0);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Set all the panels to the collapsed state to have a well-defined
 initial state.
 Check if any of the headings have been marked as
 expanded using the <code>expanded</code> attribute. If so, all the associated
 panels get expanded as well.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>headings
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.forEach(heading =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const panel = this._panelForHeading(heading);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(!heading.expanded) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._collapseHeading(heading);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._collapsePanel(panel);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>} else {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._expandHeading(heading);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._expandPanel(panel);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> removes all the event listeners that
<code>connectedCallback</code> added.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeEventListener('change', this._onChange);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeEventListener('keydown', this._onKeyDown);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_isHeading</code> returns true if the given element
is a <code>&lt;howto-accordion-heading&gt;</code>.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_isHeading(elem) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return elem.tagName.toLowerCase() === 'howto-accordion-heading';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onChange</code> handles the <code>change</code> event. The event’s
target is the heading that has been instructed to expand by click,
keyboard input.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onChange(event) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._animatePanelForHeading(event.target, event.detail.isExpandedNow);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_animatePanelForHeading</code> animates the expansion of a panel, provided
there is no other animation running.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_animatePanelForHeading(heading, expand) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If there’s an animation running, ignore the event.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (this.classList.contains('animating'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const panel = this._panelForHeading(heading);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(expand) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._expandPanel(panel);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._animateIn(panel);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>} else {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._animateOut(panel)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.then(_ =&gt; this._collapsePanel(panel));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onKeyDown</code> handles key presses inside the accordion.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onKeyDown(event) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the currently focused element is not a heading, the keypress
 originated from inside a panel or empty space. Nothing to do.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const currentHeading = event.target;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (!this._isHeading(currentHeading)) return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (event.altKey) return;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The switch-case will determine which heading should be focused next
 depending on the key that was pressed.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let newHeading;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>switch (event.keyCode) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.LEFT:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.UP:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newHeading = this._prevHeading();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.RIGHT:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.DOWN:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newHeading = this._nextHeading();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.HOME:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newHeading = this._firstHeading();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>case KEYCODE.END:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newHeading = this._lastHeading();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>break;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Any other key press is ignored and passed back to the browser.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>default:
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The browser might have some native functionality bound to the arrow
 keys, home or end. The element calls <code>preventDefault</code> to prevent the
 browser from taking any actions.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>event.preventDefault();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Make the currently focused heading unfocusable, then make the new
 heading focusable and give focus to it.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>currentHeading._shadowButton.setAttribute('tabindex', -1);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newHeading._shadowButton.setAttribute('tabindex', 0);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>newHeading._shadowButton.focus();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_allPanels</code> returns all the panels in the accordion. This function could
memoize the result if the DOM queries ever become a performance issue.
The downside of memoization is that dynamically added headings and panels
will not be handled.</p>
<p>This is a method and not a getter, because a getter implies that it is
cheap to read while this method queries the DOM on every call.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_allPanels() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return Array.from(this.querySelectorAll('howto-accordion-panel'));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_allHeadings</code> returns all the headings in the accordion.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_allHeadings() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return Array.from(this.querySelectorAll('howto-accordion-heading'));
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_panelForHeading</code> returns the panel that the given heading controls.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_panelForHeading(heading) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const next = heading.nextElementSibling;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(next.tagName.toLowerCase() !== 'howto-accordion-panel') {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>console.error('Sibling element to a heading need to be a panel.');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return next;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_prevHeading</code> returns the heading that comes before the currently
selected one, wrapping around when reaching the first one.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_prevHeading() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const headings = this._allHeadings();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Use <code>findIndex</code> to find the index of the currently
 selected element and subtracts one to get the index of the previous
 element.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let newIdx =
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>headings.findIndex(headings =&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>headings === document.activeElement) - 1;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Add <code>headings.length</code> to make sure the index is a positive number
 and get the modulus to wrap around if necessary.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return headings[(newIdx + headings.length) % headings.length];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_nextHeading</code> gets the heading that comes after the currently selected
one, wrapping around when reaching the last heading.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_nextHeading() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const headings = this._allHeadings();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>let newIdx =
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>headings.findIndex(heading =&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>heading === document.activeElement) + 1;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return headings[newIdx % headings.length];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_firstHeading</code> returns the first heading.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_firstHeading() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const headings = this._allHeadings();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return headings[0];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_lastHeading</code> returns the last heading.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_lastHeading() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const headings = this._allHeadings();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return headings[headings.length - 1];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_expandPanel</code> puts the given panel in the expanded state, without any
animation.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_expandPanel(panel) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel.expanded = true;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_expandHeading</code> puts the given heading in the expanded state, without
any animation.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_expandHeading(heading) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>heading.expanded = true;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_collapsePanel(panel) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>panel.expanded = false;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_collapseHeading(heading) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>heading.expanded = false;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_animateIn</code> determines the height of the panel and uses that value for
an expanding animation.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_animateIn(panel) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const height = panel.getBoundingClientRect().height;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this._animate(panel, -height, 0);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Same as <code>_animateIn</code> but in the other direction.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_animateOut(panel) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const height = panel.getBoundingClientRect().height;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this._animate(panel, 0, -height);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_animate</code> animates a translation on the Y axis from one offset to
another. It takes care of promoting all the elements, making sure they
will be painted in the right order during animation and cleans up
afterwards.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_animate(panel, startOffset, endOffset) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If start and end are the same there is nothing to do. The reason for
 explicitly handling this case is that this method waits for an
 <code>transitionend</code> event which won’t fire if there is no animation.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(startOffset === endOffset) return Promise.resolve();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Set the <code>animating</code> class on the <code>&lt;howto-accordion&gt;</code> element. This
 discards all further <code>change</code> events until the animation is done.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.classList.add('animating');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Turn the list of children into a proper array with all the helper
 functions defined on it.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const children = Array.from(this.children);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Find the index of the panel that is being animated.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const idx = children.indexOf(panel);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Only that panel and all the headings and panels <em>after</em> the given panel
 need to be animated.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const animatedChildren = children.slice(idx);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Some children will be translated
 beyond the top of the element and might end up being visible above the
 element. Switch the <code>&lt;howto-accordion&gt;</code> element to <code>overflow: hidden</code>
 to prevent that.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.style.overflow = 'hidden';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Switch all children to <code>position: relative</code> so that the element
 has full control over paint order using <code>z-index</code>.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>children.forEach(child =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.position = 'relative';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> All children <em>before</em> the animated ones need to be painted <em>over</em>
 all the animated children. Therefore, set all children to
 <code>z-index: 2</code> and set all the animated children to <code>z-index: 1</code> next.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.zIndex = 2;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Set <code>z-index: 1</code> on all animated children translate them to the
 start position. Because this function uses a CSS transition we don’t
 need to use <code>will-change</code>.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>animatedChildren.forEach(child =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.position = 'relative';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.zIndex = 1;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.transform = `translateY(${startOffset}px)`;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Wait two frames for all the styles to take effect.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return requestAnimationFramePromise()
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.then(_ =&gt; requestAnimationFramePromise())
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.then(_ =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Set up the CSS transition on all the children and set them to
 their end position.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>animatedChildren.forEach(child =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.transform = `translateY(${endOffset}px)`;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.classList.add('animating');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Wait for the transition to end.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return transitionEndPromise(panel);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>})
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.then(_ =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Clean up all the temporary styles</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>animatedChildren.forEach(child =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.transform = '';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.classList.remove('animating');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>children.forEach(child =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.position = '';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>child.style.zIndex = '';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.style.overflow = '';
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.classList.remove('animating');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>window.customElements.define('howto-accordion', HowtoAccordion);

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> <code>headingIdCounter</code> counts the number of IDs generated and is used to
 generated new, unique IDs.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>let headingIdCounter = 0;

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> To avoid invoking the parser with <code>.innerHTML</code> for every new instance, a
 template for the contents of the ShadowDOM is is shared by all
 <code>&lt;howto-accordion&gt;</code> instances.</p>
<p> The WAI ARIA Best Practices demand a button inside the heading. For
 developer convenience, the button is injected using ShadowDOM and
 is styled in a way that it is practically invisible. This way the
 button’s accessible functionality is preserved while still allowing
 the developer to freely style the headings.</p>
<p> Another advantage is focus management. If the button inside ShadowDOM has
 focus, <code>document.activeElement</code> returns the containing
 <code>&lt;howto-accordion-heading&gt;</code> element rather than the button itself.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>const shadowDOMTemplate = document.createElement('template');
<span class="indent">&nbsp;&nbsp;</span>shadowDOMTemplate.innerHTML = `
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;style&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>:host &gt; button {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: block;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: initial;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border: initial;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>width: 100%;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;/style&gt;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>&lt;button&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/button&gt;
<span class="indent">&nbsp;&nbsp;</span>`;

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoAccordionHeading</code> is the element for the headings in the accordion.
Accordion to the WAI ARIA Best Practices, each heading needs to wrap a
<code>&lt;button&gt;</code>. This element puts that element in the ShadowDOM, as it is more
convenient to use and doesn’t make server-side rendering or styling more
problematic. This element dispatches a <code>howto-accordion-change</code> event when
it is supposed to expand.</p>
<p>Clicking the button or pressing space or enter while the button has focus
will expand the heading. Changing the <code>expand</code> attribute or property will
also cause the heading to expand.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>class HowtoAccordionHeading extends HTMLElement {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element reacts to changes to the <code>expanded</code> attribute.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>static get observedAttributes() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return ['expanded'];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Binding event handlers to <code>this</code> ensures that <code>this</code> inside the event
 handler will always be the <code>&lt;howto-accordion-heading&gt;</code>, even if the
 handler is hooked up to other elements.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._onClick = this._onClick.bind(this);

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Import the ShadowDOM template.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.attachShadow({mode: 'open'});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.shadowRoot.appendChild(
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>document.importNode(shadowDOMTemplate.content, true)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._shadowButton = this.shadowRoot.querySelector('button');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback()</code> sets up the role, event handler and initial state.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(!this.hasAttribute('role'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'heading');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(!this.id)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.id = `howto-accordion-heading-generated-${headingIdCounter++}`;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._shadowButton.addEventListener('click', this._onClick);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> cleans up the event handlers set up in
<code>connectedCallback</code>.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>disconnectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._shadowButton.removeEventListener('click', this._onClick);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>attributeChangedCallback</code> processes changes to the <code>expanded</code> attribute.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>attributeChangedCallback(name) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> <code>expanded</code> is a boolean attribute it is either set or not set. The
 actual value is irrelevant.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const value = this.hasAttribute('expanded');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this._shadowButton.setAttribute('aria-expanded', value);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>get expanded() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('expanded');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Properties and their corresponding attributes should mirror one another.
To this effect, the property setter for selected handles truthy/falsy
values and reflects those to the state of the attribute. It’s important
to note that there are no side effects taking place in the property
setter. For example, the setter does not set aria-expanded. Instead,
that work happens in the attributeChangedCallback. As a general rule,
make property setters very dumb, and if setting a property or attribute
should cause a side effect (like setting a corresponding ARIA attribute)
do that work in the attributeChangedCallback. This will avoid having to
manage complex attribute/property reentrancy scenarios.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>set expanded(value) {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Properties can be set to all kinds of string values. This makes sure
 it’s converted to a proper boolean value using JavaScript’s truthiness
 &amp; falsiness principles.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>value = Boolean(value);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(value)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('expanded', '');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>else
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeAttribute('expanded');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onClick</code> is the event handler for a click. A click toggles the expanded
and the collapsed state.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>_onClick() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.expanded = !this.expanded;

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Dispatch an event that signals a request to expand to the
 <code>&lt;howto-accordion&gt;</code> element.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.dispatchEvent(
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>new CustomEvent('change', {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>detail: {isExpandedNow: this.expanded},
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>bubbles: true,
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>})
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>window.customElements
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.define('howto-accordion-heading', HowtoAccordionHeading);

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> <code>panelIdCounter</code> counts the number of IDs generated for panels and is used
 to generated new, unique IDs.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>let panelIdCounter = 0;

<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowtoAccordionHeading</code> is the element for the headings in the accordion.
Accordion to the WAI ARIA Best Practices, each heading needs to wrap a
<code>&lt;button&gt;</code>. This element dispatches a <code>howto-accordion-change</code> event when
it is supposed to expand.</p>
<p>Clicking the button or pressing space or enter while the button has focus
will expand the heading. Changing the <code>expand</code> attribute or property will
also cause the heading to expand.≤</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>class HowtoAccordionPanel extends HTMLElement {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>static get observedAttributes() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return ['expanded'];
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>constructor() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>super();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback()</code> sets up the role and the ID of the element.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>connectedCallback() {
</code></pre>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(!this.hasAttribute('role'))
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('role', 'region');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if(!this.id)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.id = `howto-accordion-panel-generated-${panelIdCounter++}`;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>get expanded() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return this.hasAttribute('expanded');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>set expanded(val) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>const value = Boolean(val);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>if (value)
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('expanded', '');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>else
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.removeAttribute('expanded');
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>attributeChangedCallback(name) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>this.setAttribute('aria-hidden', !this.expanded);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>window.customElements
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>.define('howto-accordion-panel', HowtoAccordionPanel);


<span class="indent">&nbsp;&nbsp;</span></code></pre>
</li>

<li class="linecomment ">
<div class="literate-text "><p> These functions help make animations easier.
 Read <a href="https://dassur.ma/things/raf-promise/">https://dassur.ma/things/raf-promise/</a> for more details.</p>
</div>
<pre><code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>function transitionEndPromise(element) {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return new Promise(resolve =&gt; {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>element.addEventListener('transitionend', function f() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>element.removeEventListener('transitionend', f);
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>resolve();
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>});
<span class="indent">&nbsp;&nbsp;</span>}

<span class="indent">&nbsp;&nbsp;</span>function requestAnimationFramePromise() {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>return new Promise(resolve =&gt; requestAnimationFrame(resolve));
<span class="indent">&nbsp;&nbsp;</span>}
})();


</code></pre>
</li>

</ul>
