project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-04-28#}
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
{% framebox height="auto" class="demo" suppress_site_styles="true" %}
<!doctype html>
<html lang="en">
<p>
  <a href="?nojs">Load without JavaScript</a>
  <a href="?">Load with JavaScript</a>
</p>

<!doctype html>
<style>
  howto-radio-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }
  
  howto-radio-button {
    display: inline-block;
    position: relative;
    cursor: default;
  }
  
  howto-radio-button:focus {
    outline: 0;
  }
  
  howto-radio-button:focus::before {
    box-shadow: 0 0 1px 2px #5B9DD9;
  }

  howto-radio-button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    position: absolute;
    left: -18px;
    top: 3px;
    border-radius: 50%;
  }

  howto-radio-button[aria-checked="true"]::before {
    background: red;
  }
</style>

<howto-radio-group>
  <howto-radio-button>Water</howto-radio-button>
  <howto-radio-button>Soda</howto-radio-button>
  <howto-radio-button>Coffee</howto-radio-button>
</howto-radio-group>


<script>
/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';(function(){function c(){function a(){b.C=!0;b.b(f.childNodes)}var b=this;this.a=new Map;this.j=new Map;this.h=new Map;this.m=new Set;this.v=new MutationObserver(this.A.bind(this));this.f=null;this.B=new Set;this.enableFlush=!0;this.C=!1;this.G=this.c(f);window.HTMLImports?window.HTMLImports.whenReady(a):a()}function g(){return h.customElements}function k(a){if(!/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a)||-1!==q.indexOf(a))return Error("The element name '"+a+"' is not valid.")}function l(a,
b,d,e){var c=g();a=r.call(a,b,d);(b=c.a.get(b.toLowerCase()))&&c.D(a,b,e);c.c(a);return a}function m(a,b,d,e){b=b.toLowerCase();var c=a.getAttribute(b);e.call(a,b,d);1==a.__$CE_upgraded&&(e=g().a.get(a.localName),d=e.w,(e=e.i)&&0<=d.indexOf(b)&&(d=a.getAttribute(b),d!==c&&e.call(a,b,c,d,null)))}var f=document,h=window;if(g()&&(g().g=function(){},!g().forcePolyfill))return;var q="annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ");
c.prototype.K=function(a,b){function d(a){var b=g[a];if(void 0!==b&&"function"!==typeof b)throw Error(c+" '"+a+"' is not a Function");return b}if("function"!==typeof b)throw new TypeError("constructor must be a Constructor");var e=k(a);if(e)throw e;if(this.a.has(a))throw Error("An element with name '"+a+"' is already defined");if(this.j.has(b))throw Error("Definition failed for '"+a+"': The constructor is already used.");var c=a,g=b.prototype;if("object"!==typeof g)throw new TypeError("Definition failed for '"+
a+"': constructor.prototype must be an object");var e=d("connectedCallback"),h=d("disconnectedCallback"),n=d("attributeChangedCallback");this.a.set(c,{name:a,localName:c,constructor:b,o:e,s:h,i:n,w:n&&b.observedAttributes||[]});this.j.set(b,c);this.C&&this.b(f.childNodes);if(a=this.h.get(c))a.resolve(void 0),this.h.delete(c)};c.prototype.get=function(a){return(a=this.a.get(a))?a.constructor:void 0};c.prototype.L=function(a){var b=k(a);if(b)return Promise.reject(b);if(this.a.has(a))return Promise.resolve();
if(b=this.h.get(a))return b.M;var d,e=new Promise(function(a){d=a}),b={M:e,resolve:d};this.h.set(a,b);return e};c.prototype.g=function(){this.enableFlush&&(this.l(this.G.takeRecords()),this.A(this.v.takeRecords()),this.m.forEach(function(a){this.l(a.takeRecords())},this))};c.prototype.I=function(a){this.f=a};c.prototype.c=function(a){console.log("_observeRoot",a,a.baseURI);if(null!=a.__$CE_observer)return console.warn("Root "+a+" is already observed"),a.__$CE_observer;a.__$CE_observer=new MutationObserver(this.l.bind(this));
a.__$CE_observer.observe(a,{childList:!0,subtree:!0});this.enableFlush&&this.m.add(a.__$CE_observer);return a.__$CE_observer};c.prototype.J=function(a){null!=a.__$CE_observer&&(a.__$CE_observer.disconnect(),this.enableFlush&&this.m.delete(a.__$CE_observer),a.__$CE_observer=null)};c.prototype.l=function(a){for(var b=0;b<a.length;b++){var d=a[b];if("childList"===d.type){var e=d.removedNodes;this.b(d.addedNodes);this.H(e)}}};c.prototype.b=function(a,b){b=b||new Set;for(var d=0;d<a.length;d++){var e=
a[d];if(e.nodeType===Node.ELEMENT_NODE){this.J(e);e=f.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,null,!1);do this.F(e.currentNode,b);while(e.nextNode())}}};c.prototype.F=function(a,b){if(!b.has(a)){b.add(a);var d=this.a.get(a.localName);if(d){a.__$CE_upgraded||this.D(a,d,!0);var e;if(e=a.__$CE_upgraded&&!a.__$CE_attached)a:{e=a;do{if(e.__$CE_attached||e.nodeType===Node.DOCUMENT_NODE){e=!0;break a}e=e.parentNode||e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host}while(e);e=!1}e&&(a.__$CE_attached=!0,
d.o&&d.o.call(a))}a.shadowRoot&&this.b(a.shadowRoot.childNodes,b);"LINK"===a.tagName&&a.rel&&-1!==a.rel.toLowerCase().split(" ").indexOf("import")&&this.u(a,b)}};c.prototype.u=function(a,b){var d=a.import;if(d)b.has(d)||(b.add(d),d.__$CE_observer||this.c(d),this.b(d.childNodes,b));else if(b=a.href,!this.B.has(b)){this.B.add(b);var e=this,c=function(){a.removeEventListener("load",c);a.import.__$CE_observer||e.c(a.import);e.b(a.import.childNodes)};a.addEventListener("load",c)}};c.prototype.H=function(a){for(var b=
0;b<a.length;b++){var d=a[b];if(d.nodeType===Node.ELEMENT_NODE){this.c(d);d=f.createTreeWalker(d,NodeFilter.SHOW_ELEMENT,null,!1);do{var e=d.currentNode;if(e.__$CE_upgraded&&e.__$CE_attached){e.__$CE_attached=!1;var c=this.a.get(e.localName);c&&c.s&&c.s.call(e)}}while(d.nextNode())}}};c.prototype.D=function(a,b,d){a.__proto__=b.constructor.prototype;d&&(this.I(a),new b.constructor,a.__$CE_upgraded=!0,console.assert(!this.f));d=b.w;if((b=b.i)&&0<d.length){this.v.observe(a,{attributes:!0,attributeOldValue:!0,
attributeFilter:d});for(var e=0;e<d.length;e++){var c=d[e];if(a.hasAttribute(c)){var f=a.getAttribute(c);b.call(a,c,null,f,null)}}}};c.prototype.A=function(a){for(var b=0;b<a.length;b++){var d=a[b];if("attributes"===d.type){var e=d.target,c=this.a.get(e.localName),f=d.attributeName,g=d.oldValue,h=e.getAttribute(f);h!==g&&c.i.call(e,f,g,h,d.attributeNamespace)}}};window.CustomElementRegistry=c;c.prototype.define=c.prototype.K;c.prototype.get=c.prototype.get;c.prototype.whenDefined=c.prototype.L;c.prototype.flush=
c.prototype.g;c.prototype.polyfilled=!0;c.prototype._observeRoot=c.prototype.c;c.prototype._addImport=c.prototype.u;var t=h.HTMLElement;h.HTMLElement=function(){var a=g();if(a.f){var b=a.f;a.f=null;return b}if(this.constructor)return a=a.j.get(this.constructor),l(f,a,void 0,!1);throw Error("Unknown constructor. Did you call customElements.define()?");};h.HTMLElement.prototype=Object.create(t.prototype,{constructor:{value:h.HTMLElement,configurable:!0,writable:!0}});var r=f.createElement;f.createElement=
function(a,b){return l(f,a,b,!0)};var u=f.createElementNS;f.createElementNS=function(a,b){return"http://www.w3.org/1999/xhtml"===a?f.createElement(b):u.call(f,a,b)};var p=Element.prototype.attachShadow;p&&Object.defineProperty(Element.prototype,"attachShadow",{value:function(a){a=p.call(this,a);g().c(a);return a}});var v=f.importNode;f.importNode=function(a,b){a=v.call(f,a,b);g().b(a.nodeType===Node.ELEMENT_NODE?[a]:a.childNodes);return a};var w=Element.prototype.setAttribute;Element.prototype.setAttribute=
function(a,b){m(this,a,b,w)};var x=Element.prototype.removeAttribute;Element.prototype.removeAttribute=function(a){m(this,a,null,x)};Object.defineProperty(window,"customElements",{value:new c,configurable:!0,enumerable:!0});window.CustomElements={takeRecords:function(){g().g&&g().g()}}})();

//# sourceMappingURL=custom-elements.min.js.map

</script>
<script>
  if (!document.location.search.includes('nojs')) {
    (function() {
      /**
 * A `HowtoRadioGroup` is a set of checkable buttons, where only one button may
 * be checked at a time. The `HowtoRadioGroup` element wraps a set of
 * `HowtoRadioButton` children and manages their checked states in response to
 * user keyboard actions such as pressing arrow keys to select the next radio
 * button, or if the user clicks with a mouse.
 *
 * The `HowtoRadioGroup` uses a technique called [roving
 * tabindex](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#Technique_1_Roving_tabindex)
 * to manage which `HowtoRadioButton` child is currently focusable. In a
 * nutshell, the currently focusable child will have a `tabindex=0`, and all
 * other children will have a `tabindex=-1`. This ensures that the `RadioGroup`
 * itself is only a single tab stop, and focus always lands on whichever child
 * is currently checked. In the case where no child is checked, focus will land
 * on the first `HowtoRadioButton` child in the `HowtoRadioGroup`.
 *
 * The `HowtoRadioGroup` uses `aria-checked=true` to indicate the checked state
 * of its `HowtoRadioButton` children. Only one child may be set to
 * `aria-checked=true`.  Note that unlike most boolean attributes in HTML,
 * boolean ARIA attributes take a literal string value of either `"true"` or
 * `"false"`.
 */

(function() {
  /**
   * Define keycodes to help with handling keyboard events.
   */
  const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38,
    HOME: 36,
    END: 35,
  };

  /**
   * `HowtoRadioButton` is a simple, checkable button.
   */
  class HowtoRadioButton extends HTMLElement {
    constructor() {
      super();
    }

    /**
     * The `HowtoRadioButton` sets its initial ARIA attributes when it's
     * attached to the DOM. The surrounding RadioGroup handles dynamic changes
     * to the ARIA attributes. The RadioButton should always set a `role` of
     * `radio`, and should check to see if its `tabindex` and `aria-checked`
     * values have been set by the user. Otherwise, it can set these attributes
     * to default values. Here, the tabindex and aria-checked values are set to
     * defaults just to indcate that they will likely change in the future.
     */
    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', this.getAttribute('tabindex') || -1);
      this.setAttribute('aria-checked',
        this.getAttribute('aria-checked') || false);
    }
  }

  /**
   * Define a custom element, `<howto-radio-button>`, and associate it with the
   * `HowtoRadioButton` class.
   */
  window.customElements.define('howto-radio-button', HowtoRadioButton);

  /**
   * `HowtoRadioGroup` is responsible for handling user input, and updating the
   * state of its `HowtoRadioButton` children. It uses the [roving
   * tabindex](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#Technique_1_Roving_tabindex)
   * technique to respond to keyboard events. This ensures that the entire
   * `HowtoRadioGroup` is a single tabstop, and tabbing into the
   * `HowtoRadioGroup` will always focus the previously checked item, if one
   * exists.
   */
  class HowtoRadioGroup extends HTMLElement {
    constructor() {
      super();
    }

    /**
     * The `HowtoRadioGroup` sets its ARIA role to `radiogroup` and sets the
     * `tabindex` on its first `HowtoRadioButton` child to 0 if no other child
     * is already checked. This makes the first `HowtoRadioButton` focusable.
     * If a child is already checked, the `HowtoRadioGroup` calls `_setChecked`
     * to uncheck any other `HowtoRadioButton` children and ensure that only
     * this first child is checked. The `HowtoRadioGroup` also adds listeners
     * for keyboard and mouse events.  Note that any code manipulating
     * `HowtoRadioButton` children assumes they are already in the DOM and
     * their definitions have been loaded. For a more robust implementation you
     * might consider using a Mutation Observer to detect if children are
     * present yet.
     */
    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      let firstCheckedButton = this.checkedRadioButton;
      if (firstCheckedButton) {
        this._uncheckAll();
        this._checkNode(firstCheckedButton);
      } else {
        this.querySelector('[role="radio"]').setAttribute('tabindex', 0);
      }
      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
    }

    /**
     * If the `RadioGroup` is removed from the DOM, clean up any event
     * listeners.
     */
    disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }

    /**
     * If the user pressed an arrow key, call preventDefault to prevent the
     * page from scrolling. If the up or left arrow keys were pressed, select
     * the previous `HowtoRadioButton`. If the down or right keys were pressed,
     * select the next `HowtoRadioButton`.
     */
    _onKeyDown(e) {
      switch (e.keyCode) {
        case KEYCODE.UP:
        case KEYCODE.LEFT:
          e.preventDefault();
          this._setCheckedToPrevButton();
          break;

        case KEYCODE.DOWN:
        case KEYCODE.RIGHT:
          e.preventDefault();
          this._setCheckedToNextButton();
          break;

        case KEYCODE.HOME:
          e.preventDefault();
          this._setChecked(this.firstRadioButton);
          break;

        case KEYCODE.END:
          e.preventDefault();
          this._setChecked(this.lastRadioButton);
          break;

        default:
          break;
      }
    }

    /**
     * A getter for whichever `HowtoRadioButton` is currently checked.
     */
    get checkedRadioButton() {
      return this.querySelector('[aria-checked="true"]');
    }

    /**
     * A getter for the first `HowtoRadioButton` child.
     */
    get firstRadioButton() {
      return this.querySelector('[role="radio"]:first-of-type');
    }

    /**
     * A getter for the last `HowtoRadioButton` child.
     */
    get lastRadioButton() {
      return this.querySelector('[role="radio"]:last-of-type');
    }

    /**
     * A helper for when the user tries to moves backwards through the
     * `HowtoRadioGroup` using their keyboard. Return the `HowtoRadioButton`
     * coming before the one passed as an argument. If no previous
     * `HowtoRadioButton` is found, return null.
     */
    _prevRadioButton(node) {
      let prev = node.previousElementSibling;
      while (prev) {
        if (prev.getAttribute('role') === 'radio') {
          return prev;
        }
        prev = prev.previousElementSibling;
      }
      return null;
    }

    /**
     * A helper for when the user tries to moves forwards through the
     * `HowtoRadioGroup` using their keyboard. Return the `HowtoRadioButton`
     * coming after the one passed as an argument. If no next
     * `HowtoRadioButton` is found, return null.
     */
    _nextRadioButton(node) {
      let next = node.nextElementSibling;
      while (next) {
        if (next.getAttribute('role') === 'radio') {
          return next;
        }
        next = next.nextElementSibling;
      }
      return null;
    }

    /**
     * This method is called in response to a user pressing a key to move
     * backwards through the `HowtoRadioGroup`.  Check to see if the currently
     * checked `HowtoRadioButton` is the first child.  If so, loop around and
     * focus the last child. Otherwise, find the previous sibling of the
     * currently checked `HowtoRadioButton`, and make it the new checked
     * button.
     */
    _setCheckedToPrevButton() {
      let checkedButton = this.checkedRadioButton || this.firstRadioButton;
      if (checkedButton === this.firstRadioButton) {
        this._setChecked(this.lastRadioButton);
      } else {
        this._setChecked(this._prevRadioButton(checkedButton));
      }
    }

    /**
     * This method is called in response to a user pressing a key to move
     * forwards through the `HowtoRadioGroup`.  Check to see if the currently
     * checked `HowtoRadioButton` is the last child.  If so, loop around and
     * focus the first child. Otherwise, find the next sibling of the currently
     * checked `HowtoRadioButton`, and make it the new checked button.
     */
    _setCheckedToNextButton() {
      let checkedButton = this.checkedRadioButton || this.firstRadioButton;
      if (checkedButton === this.lastRadioButton) {
        this._setChecked(this.firstRadioButton);
      } else {
        this._setChecked(this._nextRadioButton(checkedButton));
      }
    }

    /**
     * Any user action (a keypress or mouse click) eventually funnels down to
     * this method which ensures that only the passed in element is checked.
     * Uncheck _all_ `HowtoRadioButton` children. Then set the
     * `HowtoRadioButton` that was passed in to `aria-checked=true`. Also make
     * it focusable with `tabIndex=0` and call its `focus()` method.
     */
    _setChecked(node) {
      this._uncheckAll();
      this._checkNode(node);
      this._focusNode(node);
    }

    /**
     * Only one `HowtoRadioButton` should be checked at any time. To ensure
     * this, loop through all `HowtoRadioButton` children and set them to
     * `aria-checked=false` and `tabindex=-1`.
     */
    _uncheckAll() {
      const radioButtons = this.querySelectorAll('[role="radio"]');
      for (let i = 0; i < radioButtons.length; i++) {
        let btn = radioButtons[i];
        btn.setAttribute('aria-checked', 'false');
        btn.tabIndex = -1;
      }
    }

    /**
     * Mark the passed in node as being checked by setting `aria-checked=true`,
     * and make it focusable by setting `tabindex=0`.
     */
    _checkNode(node) {
      node.setAttribute('aria-checked', 'true');
      node.tabIndex = 0;
    }

    /**
     * Call `focus()` on the passed in node to direct keyboard focus to it.
     */
    _focusNode(node) {
      node.focus();
    };

    /**
     * If the user clicks inside of the `HowtoRadioGroup`, verify that the
     * clicked element has a `role` of `radio`, and if so, make it the new
     * checked button.
     */
    _onClick(e) {
      if (e.target.getAttribute('role') === 'radio') {
        this._setChecked(e.target);
      }
    }
  }

  /**
   * Define a custom element, `<howto-radio-group>`, and associate it with the
   * `HowtoRadioGroup` class.
   */
  window.customElements.define('howto-radio-group', HowtoRadioGroup);
})();

    })();
  }
</script>
</html>

{% endframebox %}

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

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
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
