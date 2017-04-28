project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-04-28#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-tree {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="prism-solarizedlight.css">
<link rel="stylesheet" href="main.css">

<p>A <code>HowToTree</code> presents a hierarchical list of children. Each node in the tree
is represented as either a <code>HowToTreeItem</code> or a <code>HowToTreeItemGroup</code>.
A <code>HowToTreeItem</code> should only contain text and is considered a &quot;leaf&quot; node.
A <code>HowToTreeItemGroup</code> can contain <code>HowToTreeItem</code> children and is considered
a &quot;parent&quot; node. The first child of a <code>HowToTreeItemGroup</code> should be a
<code>&lt;label&gt;</code>. Its second child should be a <code>&lt;div&gt;</code> element, which will hold all
of its <code>HowToTreeItem</code> children. A <code>&lt;div&gt;</code> is used because it has an implicit
accessible role of <code>group</code>, which is required by the ARIA Authoring Practices
Guide.</p>
<p>Parent nodes can be either collapsed or expanded to reveal their children.
The state of the parent node is conveyed through the use of a <code>aria-expanded</code>
attribute.</p>
<p>Depending on the implementation, trees can support either single or
multi selection. The <code>HowToTree</code> element supports single selection, so
there can only be one selected element at a time. The currently selected
element is indicated by the <code>selected</code> attribute.</p>
<p>Unlike the <a href="./howto-radio-group.html"><code>DashRadioGroup</code></a>, which uses roving
tabindex to indicate which child is currently active, the <code>HowToTree</code> uses
<code>aria-activedescendant</code> and the <code>id</code> of the currently active child. The
effect is similar to using roving tabindex, and is presented in this case to
show an alternative approach to indicating active children.</p>


## Demo {: #demo }
{% framebox height="auto" class="demo" suppress_site_styles="true" %}
<!doctype html>
<html lang="en">
<p>
  <a href="?nojs">Load without JavaScript</a>
  <a href="?">Load with JavaScript</a>
</p>

<style>
  howto-tree {
    font-family: 'Courier New', Courier, monospace;
  }
  howto-tree,
  howto-tree-item,
  howto-tree-item-group,
  howto-tree-item-group label {
    display: block;
  }
  howto-tree:focus {
    outline: none;
  }
  howto-tree-item-group > div {
    padding-left: 20px;
  }
  /*
    A simple plus or minus sign is used to indicate a `HowToTreeItem` that can
    be expanded or collapsed.
  */
  howto-tree-item-group > label::before {
    content: '+';
  }
  howto-tree-item-group[expanded] > label::before {
    content: '-';
  }
  /*
    By default a `HowToTreeItem` is `display: block`. If it's in a collapsed
    state, hide it with `display: none`.
  */
  howto-tree-item-group:not([expanded]) > div {
    display: none;
  }
  /*
    The `.active` class indicates which child is the current
    `aria-activedescendant`. For all intents and purposes this child is
    "focused", though actual keyboard focus remains on the `<howto-tree>` at all
    times. This selector will style the background of the `HowToTreeItem` that
    is active, so long as it's closed. If it's opened, the active class will
    style the tree item's label. This is to prevent an opened `HowToTreeItem`
    from showing a styled background on all of its children.
  */
  .active:not([expanded]),
  .active[expanded] > label {
    background: lightgrey;
    outline: 2px solid black;
  }
  /*
    The `selected` attribute indicates which child has been either clicked on
    with a mouse, or selected via the `[space]` or `[enter]` keys. Similar to
    the `.active` class selector above, this selector will style the
    `HowToTreeItem` background, unless it is expanded, in which case it will
    only style its label.
  */
  howto-tree-item[selected],
  howto-tree-item.active[selected],
  howto-tree-item-group[selected]:not([expanded]),
  howto-tree-item-group[selected][expanded] > label {
    background: hotpink;
  }
</style>

<h3 id="file-tree-lbl">File Tree</h3>
<howto-tree aria-labelledby="file-tree-lbl">
  <howto-tree-item>Project1</howto-tree-item>
  <howto-tree-item>Project2</howto-tree-item>
  <howto-tree-item>Project3</howto-tree-item>
  <howto-tree-item-group>
    <label>Project 4</label>
    <div>
      <howto-tree-item>File1</howto-tree-item>
      <howto-tree-item>File2</howto-tree-item>
      <howto-tree-item>File3</howto-tree-item>
      <howto-tree-item-group>
        <label>Subproject 1</label>
        <div>
          <howto-tree-item>Subfile1</howto-tree-item>
          <howto-tree-item>Subfile2</howto-tree-item>
          <howto-tree-item>Subfile3</howto-tree-item>
        </div>
      </howto-tree-item-group>
    </div>
  </howto-tree-item-group>
  <howto-tree-item>Project 5</howto-tree-item>
  <howto-tree-item-group expanded>
    <label>Project 6</label>
    <div>
      <howto-tree-item>File1</howto-tree-item>
      <howto-tree-item>File2</howto-tree-item>
      <howto-tree-item>File3</howto-tree-item>
    </div>
  </howto-tree-item-group>
  <howto-tree-item>Project 7</howto-tree-item>
</howto-tree>


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
 * A `HowToTree` presents a hierarchical list of children. Each node in the tree
 * is represented as either a `HowToTreeItem` or a `HowToTreeItemGroup`.
 * A `HowToTreeItem` should only contain text and is considered a "leaf" node.
 * A `HowToTreeItemGroup` can contain `HowToTreeItem` children and is considered
 * a "parent" node. The first child of a `HowToTreeItemGroup` should be a
 * `<label>`. Its second child should be a `<div>` element, which will hold all
 * of its `HowToTreeItem` children. A `<div>` is used because it has an implicit
 * accessible role of `group`, which is required by the ARIA Authoring Practices
 * Guide.
 *
 * Parent nodes can be either collapsed or expanded to reveal their children.
 * The state of the parent node is conveyed through the use of a `aria-expanded`
 * attribute.
 *
 * Depending on the implementation, trees can support either single or
 * multi selection. The `HowToTree` element supports single selection, so
 * there can only be one selected element at a time. The currently selected
 * element is indicated by the `selected` attribute.
 *
 * Unlike the [`DashRadioGroup`](./howto-radio-group.html), which uses roving
 * tabindex to indicate which child is currently active, the `HowToTree` uses
 * `aria-activedescendant` and the `id` of the currently active child. The
 * effect is similar to using roving tabindex, and is presented in this case to
 * show an alternative approach to indicating active children.
 */

(function() {
  /**
   * Define keycodes to help with handling keyboard events.
   */
  const KEYCODE = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    HOME: 36,
    END: 35,
    SPACE: 32,
    ENTER: 13,
  };

  /**
   * A helper to quickly identify `HowToTreeItem`/`HowToTreeItemGroup` nodes.
   * Because both `HowToTreeItem` and `HowToTreeItemGroup` elements can have
   * a `role=treeitem`, this helper will match against either.
   */
  function isTreeItem(node) {
    return node.nodeName.toLowerCase() === 'howto-tree-item' ||
           node.nodeName.toLowerCase() === 'howto-tree-item-group';
  }

  /**
   * A helper to specifically identify `HowToTreeItemGroup` elements.
   */
  function isTreeItemGroup(node) {
    return node.nodeName.toLowerCase() === 'howto-tree-item-group';
  }

  // `HowToTreeItemCounter` counts the number of `treeItem` instances
  // created. The number is used to generated new, unique `id`s.
  let HowToTreeItemCounter = 0;

  class HowToTreeItem extends HTMLElement {
    static get observedAttributes() {
      return ['selected'];
    }

    connectedCallback() {
      if (!this.hasAttribute('role'))
        this.setAttribute('role', 'treeitem');

      // If the element doesn't already have an `id`, generate one for it.
      // Every node needs an `id` so it can be referenced by
      // `aria-activedescendant`.
      if (!this.id)
        this.id = `howto-tree-item-generated-${HowToTreeItemCounter++}`;
    }

    /**
     * Properties and their corresponding attributes should mirror one another.
     * To this effect, the property setter for `selected` handles truthy/falsy
     * values and reflects those to the state of the attribute.
     * It's important to note that there are no side effects taking place in
     * the property setter. For example, the setter does not set
     * `aria-selected`.
     * Instead, that work happens in the `attributeChangedCallback`.
     * As a general rule, make property setters very dumb, and if setting a
     * property or attribute should cause a side effect (like setting a
     * corresponding ARIA attribute) do that work in the
     * `attributeChangedCallback`. This will avoid having to manage complex
     * attribute/property reentrancy scenarios.
     */
    set selected(value) {
      const isSelected = Boolean(value);
      if (isSelected)
        this.setAttribute('selected', '');
      else
        this.removeAttribute('selected');
    }

    get selected() {
      return this.hasAttribute('selected');
    }

    attributeChangedCallback(name, value) {
      // Set `aria-selected` to match the state of `selected`. This will
      // convey the state to assistive technology like screen readers.
      if (name === 'selected')
        this.setAttribute('aria-selected', this.selected);
    }
  }

  /**
   * Define a custom element, `<howto-tree-item>`, and associate it with the
   * `HowToTreeItem` class.
   */
  window.customElements.define('howto-tree-item', HowToTreeItem);

  /**
   * `HowToTreeItemGroup` is a simple container that holds `HowToTreeItem`
   * children and can be expanded or collapsed.
   * Because a `HowToTreeItemGroup` is also a treeItem, and can be selected,
   * it inherits from the `HowToTreeItem` element.
   */
  class HowToTreeItemGroup extends HowToTreeItem {
    /**
     * Append an `expanded` attribute, to the list of `observedAttributes`.
     * This getter also demonstrates a pattern for guarding against a situation
     * where the parent may not have defined any `observedAttributes`, in
     * which case an empty array is used.
     */
    static get observedAttributes() {
      return (super.observedAttributes || []).concat(['expanded']);
    }

    connectedCallback() {
      super.connectedCallback();
      // An expandable treeItem must have an explicit `aria-expanded` value.
      // This handles the case where the element starts without an
      // `[expanded]` attribute. In that scenario, the element would be set
      // to `aria-expanded=false`.
      this.setAttribute('aria-expanded', this.expanded);

      // This first child should be a `<label>` element. Custom Elements are
      // not currently supported by the `<label>` element, but hopefully
      // they will be in the future. In the meantime, set the `aria-label`
      // for the `HowToTreeItem`, equal to the `<label>` text.
      // Without this labeling, the element's name will be computed based on
      // its text content plus the text content of all of its children, making
      // it so verbose as to be unusable.
      if (!this.hasAttribute('aria-label')) {
        let label = this.querySelector('label');
        if (!label) {
          console.error(`The first child of a <howto-tree-item> that ` +
            `contains a <howto-tree-group> must be a <label>.`);
        } else {
          this.setAttribute('aria-label', label.textContent.trim());
        }
      }
    }

    set expanded(value) {
      const isExpanded = Boolean(value);
      if (isExpanded)
        this.setAttribute('expanded', '');
      else
        this.removeAttribute('expanded');
    }

    get expanded() {
      return this.hasAttribute('expanded');
    }

    /**
     * If the changed attribute is `expanded`, then let the instance handle
     * it. Otherwise, pass the changed attribute call on to the parent class.
     * This example uses the rest and spread operators to keep the code tidy.
     */
    attributeChangedCallback(name, ...theArgs) {
      // Set `aria-expanded` to match the state of `expanded`. This will
      // convey the state to assistive technology like screen readers.
      if (name === 'expanded') {
        this.setAttribute('aria-expanded', this.expanded);
        return;
      }
      super.attributeChangedCallback(name, ...theArgs);
    }
  }

  /**
   * Define a custom element, `<howto-tree-item-group>`, and associate it with
   * the `HowToTreeItemGroup` class.
   */
  window.customElements.define('howto-tree-item-group', HowToTreeItemGroup);

  /**
   * `HowToTree` is responsible for handling user input and updating the
   * expanded/collapsed and selected state for its children. It also manages
   * the currently active child using `aria-activedescendant`.
   */
  class HowToTree extends HTMLElement {
    connectedCallback() {
      if (!this.hasAttribute('role'))
        this.setAttribute('role', 'tree');
      if (!this.hasAttribute('tabindex'))
        this.setAttribute('tabindex', 0);

      // The element needs to do some manual input event handling to allow
      // switching with arrow keys and Home/End.
      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);
      this.addEventListener('focus', this._onFocus);

      // Before the elements starts booting, it waits for both
      // the `<howto-tree-item>` and `<howto-tree-item-group>` to load.
      Promise.all([
        customElements.whenDefined('howto-tree-item'),
        customElements.whenDefined('howto-tree-item-group'),
      ]).then(_ => {
        // Acquire all `HowToTreeItem`/`HowToTreeItemGroup` instances inside
        // the element.
        const treeItems = this._allTreeItems();
        // If there are no `treeItems`, then the tree is empty. Abort.
        if (treeItems.length === 0) return;

        // The element checks if any child has been marked as selected.
        // If so, it will mark it as the current `aria-activedescendant`.
        const selectedTreeItem = treeItems.find(treeItem => treeItem.selected);
        if (selectedTreeItem) {
          this._focusTreeItem(selectedTreeItem);
        }
      });
    }

    /**
     * `disconnectedCallback` removes the event listeners that
     * `connectedCallback` added.
     */
    disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
      this.removeEventListener('focus', this._onFocus);
    }

    /**
     * Returns a list of visible `HowToTreeItem`/`HowToTreeItemGroup` elements.
     * This is useful when the user wants to try to move to the next or previous
     * item in the list.
     * If an item is a child of a parent who is `.expaned=false`
     * then it is considered invisible and is not added to the list.
     */
    _allTreeItems() {
      const treeItems = [];
      // A recursive function that visits every child and builds a list.
      // This produces similar results to calling querySelectorAll,
      // but allows for filtering of the children based on whether or not
      // their parent is currently expanded.
      function findTreeItems(node) {
        for (let el of Array.from(node.children)) {
          // If the child is a `HowToTreeItem` or `HowToTreeItemGroup`, add it
          // to the list of results.
          if (isTreeItem(el))
            treeItems.push(el);
          // If it is a `HowToTreeItemGroup` and it's collapsed, don’t descend.
          // This will ignore any children and treat them as if they are
          // invisible.
          if (isTreeItemGroup(el) && !el.expanded)
            continue;
          // Otherwise, if the element is expanded OR we've hit something
          // else like a `<div>`, continue to descend and look for
          // more `treeItems`.
          findTreeItems(el);
        }
      }
      findTreeItems(this);
      return treeItems;
    }

    /**
     * When focus moves into the element, if a `treeItem` is not already
     * active, mark the first `treeItem` as active.
     */
    _onFocus(event) {
      if (!this._currentTreeItem())
        this._focusFirstTreeItem();
    }

    /**
     * `_onKeyDown` handles key presses inside the tree.
     */
    _onKeyDown(event) {
      // Don’t handle modifier shortcuts typically used by assistive technology.
      if (event.altKey)
        return;

      // Grab a reference to the `currentTreeItem` as it's almost always
      // passed as an argument to one of the actions to be taken.
      const currentTreeItem = this._currentTreeItem();

      switch (event.keyCode) {
        case KEYCODE.UP:
          this._focusPrevTreeItem(currentTreeItem);
          break;

        case KEYCODE.DOWN:
          this._focusNextTreeItem(currentTreeItem);
          break;

        case KEYCODE.LEFT:
          this._collapseTreeItem(currentTreeItem);
          break;

        case KEYCODE.RIGHT:
          this._expandTreeItem(currentTreeItem);
          break;

        case KEYCODE.HOME:
          this._focusFirstTreeItem();
          break;

        case KEYCODE.END:
          this._focusLastTreeItem();
          break;

        case KEYCODE.SPACE:
        case KEYCODE.ENTER:
          this._toggleTreeItem(currentTreeItem);
          this._selectTreeItem(currentTreeItem);
          break;

        // Any other key press is ignored and passed back to the browser.
        default:
          return;
      }

      // The browser might have some native functionality bound to the arrow
      // keys, home or end. The element calls `preventDefault` to prevent the
      // browser from taking any actions.
      event.preventDefault();
    }

    /**
     * Find the `treeItem` associated with the element that was clicked.
     * Focus the `treeItem` and make it the current selected item as well.
     */
    _onClick(event) {
      // A loop that will work its way upward until it finds
      // the `treeItem` associated with the event target. This allows
      // clicking on a `<label>` or `<div>` within a `HowToTreeItemGroup`
      // and ensures the right element is always being focused/selected.
      let item = event.target;
      while (item && !isTreeItem(item))
        item = item.parentElement;

      this._focusTreeItem(item);
      this._selectTreeItem(item);
      this._toggleTreeItem(item);
    }

    /**
     * Return the current active `treeItem` if there is one. Otherwise,
     * return null.
     */
    _currentTreeItem() {
      return this.querySelector('.active');
    }

    /**
     * Attempt to find the previous `treeItem` in the list. If one exists,
     * focus it. Otherwise just ignore the command.
     */
    _focusPrevTreeItem(currentTreeItem) {
      const treeItems = this._allTreeItems();
      const idx = treeItems.lastIndexOf(currentTreeItem) - 1;
      if (idx >= 0)
        this._focusTreeItem(treeItems[idx]);
    }

    /**
     * Attempt to find the next `treeItem` in the list. If one exists,
     * focus it. Otherwise just ignore the command.
     */
    _focusNextTreeItem(currentTreeItem) {
      const treeItems = this._allTreeItems();
      const idx = treeItems.lastIndexOf(currentTreeItem) + 1;
      if (idx < treeItems.length)
        this._focusTreeItem(treeItems[idx]);
    }

    /**
     * Focus the first `treeItem` in the tree. Useful for when the user
     * presses the [home] key.
     */
    _focusFirstTreeItem() {
      const firstTreeItem = Array.from(this.children)
        .find(item => isTreeItem(item));
      this._focusTreeItem(firstTreeItem);
    }

    /**
     * Focus the last `HowToTreeItem` in the tree. Useful for when the user
     * presses the [end] key.
     */
    _focusLastTreeItem() {
      const treeItems = this._allTreeItems();
      this._focusTreeItem(treeItems[treeItems.length - 1]);
    }

    /**
     * Mark the passed in element as the new `aria-activedescendant` and give
     * it an `.active` class for easy styling.
     */
    _focusTreeItem(treeItem) {
      this.setAttribute('aria-activedescendant', treeItem.id);

      // There can be only one active item at a time.
      // Find any previous active item and remove its active class.
      const activeItem = this.querySelector('.active');
      if (activeItem)
        activeItem.classList.remove('active');
      treeItem.classList.add('active');
    }

    /**
     * If focus is on an open node, close the node.
     * If focus is on a child node that is also either a leaf node or a closed
     * parent node, move focus to its parent node.
     */
    _collapseTreeItem(currentTreeItem) {
      if (isTreeItemGroup(currentTreeItem) && currentTreeItem.expanded) {
        currentTreeItem.expanded = false;
        return;
      }
      // Walk up the tree till you find the parent `HowToTreeItem`.
      // If this is a root node, do nothing. Otherwise, collapse the parent
      // and move focus to it.
      let parent = currentTreeItem.parentElement;
      if (parent === this)
        return;
      while (!isTreeItemGroup(parent))
        parent = parent.parentElement;
      parent.expanded = false;
      this._focusTreeItem(parent);
    }

    /**
     * If focus is on a closed node, opens the node.
     */
    _expandTreeItem(currentTreeItem) {
      if (isTreeItemGroup(currentTreeItem))
        currentTreeItem.expanded = true;
    }

    /**
     * Flip the `HowToTreeItemGroup` between open and closed states.
     */
    _toggleTreeItem(currentTreeItem) {
      if (!isTreeItemGroup(currentTreeItem))
        return;
      if (currentTreeItem.expanded)
        this._collapseTreeItem(currentTreeItem);
      else
        this._expandTreeItem(currentTreeItem);
    }

    /**
     * Perform the default action for a `treeItem`. If the item is a parent
     * node, toggle its expanded/collapsed state. If the item is an end
     * node, dispatch an event with a reference to the node. If this was
     * a file picker, an application could listen for this event and open
     * the file based on the item's name.
     */
    _selectTreeItem(currentTreeItem) {
      // There can only be one selected element at time.
      // Look at all the children and toggle any selected ones off.
      this.querySelectorAll('[selected]')
        .forEach(item => item.selected = false);
      currentTreeItem.selected = true;

      // Dispatch a non-bubbling event containing a reference to the selected
      // node. The reason to choose non-bubbling is explained in
      // [this Medium post.](https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48#.w6ww4mgfc)
      this.dispatchEvent(new CustomEvent('howto-tree-item-selected', {
        detail: {
          item: currentTreeItem,
        },
        bubbles: false,
      }));
    }
  }

  /**
   * Define a custom element, `<howto-tree>`, and associate it with the
   * `HowToTree` class.
   */
  window.customElements.define('howto-tree', HowToTree);
})();

    })();
  }
</script>
</html>

{% endframebox %}

## Example usage {: #usage }
<ul class="literate demo" id="howto-tree_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span>howto-tree {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>font-family: 'Courier New', Courier, monospace;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tree,
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item,
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group,
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group label {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: block;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tree:focus {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>outline: none;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group > div {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding-left: 20px;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A simple plus or minus sign is used to indicate a <code>HowToTreeItem</code> that can
    be expanded or collapsed.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group > label::before {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>content: '+';
<span class="indent">&nbsp;&nbsp;</span>}
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group[expanded] > label::before {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>content: '-';
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>By default a <code>HowToTreeItem</code> is <code>display: block</code>. If it&#39;s in a collapsed
    state, hide it with <code>display: none</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group:not([expanded]) > div {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>display: none;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>.active</code> class indicates which child is the current
    <code>aria-activedescendant</code>. For all intents and purposes this child is
    &quot;focused&quot;, though actual keyboard focus remains on the <code>&lt;howto-tree&gt;</code> at all
    times. This selector will style the background of the <code>HowToTreeItem</code> that
    is active, so long as it&#39;s closed. If it&#39;s opened, the active class will
    style the tree item&#39;s label. This is to prevent an opened <code>HowToTreeItem</code>
    from showing a styled background on all of its children.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>.active:not([expanded]),
<span class="indent">&nbsp;&nbsp;</span>.active[expanded] > label {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background: lightgrey;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>outline: 2px solid black;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The <code>selected</code> attribute indicates which child has been either clicked on
    with a mouse, or selected via the <code>[space]</code> or <code>[enter]</code> keys. Similar to
    the <code>.active</code> class selector above, this selector will style the
    <code>HowToTreeItem</code> background, unless it is expanded, in which case it will
    only style its label.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tree-item[selected],
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item.active[selected],
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group[selected]:not([expanded]),
<span class="indent">&nbsp;&nbsp;</span>howto-tree-item-group[selected][expanded] > label {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background: hotpink;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>file-tree-lbl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>File Tree<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree</span> <span class="token attr-name">aria-labelledby</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>file-tree-lbl<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Project1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Project2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Project3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item-group</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span>Project 4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>File1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>File2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>File3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item-group</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span>Subproject 1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Subfile1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Subfile2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Subfile3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item-group</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item-group</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Project 5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item-group</span> <span class="token attr-name">expanded</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span><span class="token punctuation">></span></span>Project 6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>File1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>File2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>File3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item-group</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tree-item</span><span class="token punctuation">></span></span>Project 7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree-item</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tree</span><span class="token punctuation">></span></span></code>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tree_impl">
  
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
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>UP<span class="token punctuation">:</span> <span class="token number">38</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>DOWN<span class="token punctuation">:</span> <span class="token number">40</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>LEFT<span class="token punctuation">:</span> <span class="token number">37</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>RIGHT<span class="token punctuation">:</span> <span class="token number">39</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>HOME<span class="token punctuation">:</span> <span class="token number">36</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>END<span class="token punctuation">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>SPACE<span class="token punctuation">:</span> <span class="token number">32</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>ENTER<span class="token punctuation">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">;</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A helper to quickly identify <code>HowToTreeItem</code>/<code>HowToTreeItemGroup</code> nodes.
Because both <code>HowToTreeItem</code> and <code>HowToTreeItemGroup</code> elements can have
a <code>role=treeitem</code>, this helper will match against either.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">function</span> <span class="token function">isTreeItem</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> node<span class="token punctuation">.</span>nodeName<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'howto-tree-item'</span> <span class="token operator">||</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span> node<span class="token punctuation">.</span>nodeName<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'howto-tree-item-group'</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>A helper to specifically identify <code>HowToTreeItemGroup</code> elements.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">function</span> <span class="token function">isTreeItemGroup</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> node<span class="token punctuation">.</span>nodeName<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'howto-tree-item-group'</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> <code>HowToTreeItemCounter</code> counts the number of <code>treeItem</code> instances
 created. The number is used to generated new, unique <code>id</code>s.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> HowToTreeItemCounter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowToTreeItem</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token function">observedAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'selected'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'treeitem'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the element doesn&#39;t already have an <code>id</code>, generate one for it.
 Every node needs an <code>id</code> so it can be referenced by
 <code>aria-activedescendant</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token template-string"><span class="token string">`howto-tree-item-generated-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>HowToTreeItemCounter<span class="token operator">++</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Properties and their corresponding attributes should mirror one another.
To this effect, the property setter for <code>selected</code> handles truthy/falsy
values and reflects those to the state of the attribute.
It&#39;s important to note that there are no side effects taking place in
the property setter. For example, the setter does not set
<code>aria-selected</code>.
Instead, that work happens in the <code>attributeChangedCallback</code>.
As a general rule, make property setters very dumb, and if setting a
property or attribute should cause a side effect (like setting a
corresponding ARIA attribute) do that work in the
<code>attributeChangedCallback</code>. This will avoid having to manage complex
attribute/property reentrancy scenarios.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">set</span> <span class="token function">selected</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> isSelected <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>isSelected<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'selected'</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">else</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'selected'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">selected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'selected'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">attributeChangedCallback</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Set <code>aria-selected</code> to match the state of <code>selected</code>. This will
 convey the state to assistive technology like screen readers.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">===</span> <span class="token string">'selected'</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-selected'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>selected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define a custom element, <code>&lt;howto-tree-item&gt;</code>, and associate it with the
<code>HowToTreeItem</code> class.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tree-item'</span><span class="token punctuation">,</span> HowToTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowToTreeItemGroup</code> is a simple container that holds <code>HowToTreeItem</code>
children and can be expanded or collapsed.
Because a <code>HowToTreeItemGroup</code> is also a treeItem, and can be selected,
it inherits from the <code>HowToTreeItem</code> element.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowToTreeItemGroup</span> <span class="token keyword">extends</span> <span class="token class-name">HowToTreeItem</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Append an <code>expanded</code> attribute, to the list of <code>observedAttributes</code>.
This getter also demonstrates a pattern for guarding against a situation
where the parent may not have defined any <code>observedAttributes</code>, in
which case an empty array is used.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">static</span> <span class="token keyword">get</span> <span class="token function">observedAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">super</span><span class="token punctuation">.</span>observedAttributes <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'expanded'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> An expandable treeItem must have an explicit <code>aria-expanded</code> value.
 This handles the case where the element starts without an
 <code>[expanded]</code> attribute. In that scenario, the element would be set
 to <code>aria-expanded=false</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-expanded'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>expanded<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> This first child should be a <code>&lt;label&gt;</code> element. Custom Elements are
 not currently supported by the <code>&lt;label&gt;</code> element, but hopefully
 they will be in the future. In the meantime, set the <code>aria-label</code>
 for the <code>HowToTreeItem</code>, equal to the <code>&lt;label&gt;</code> text.
 Without this labeling, the element&#39;s name will be computed based on
 its text content plus the text content of all of its children, making
 it so verbose as to be unusable.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-label'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> label <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'label'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>label<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`The first child of a &lt;howto-tree-item> that `</span></span> <span class="token operator">+</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token template-string"><span class="token string">`contains a &lt;howto-tree-group> must be a &lt;label>.`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-label'</span><span class="token punctuation">,</span> label<span class="token punctuation">.</span>textContent<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">set</span> <span class="token function">expanded</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> isExpanded <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>isExpanded<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'expanded'</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">else</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token string">'expanded'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">get</span> <span class="token function">expanded</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'expanded'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If the changed attribute is <code>expanded</code>, then let the instance handle
it. Otherwise, pass the changed attribute call on to the parent class.
This example uses the rest and spread operators to keep the code tidy.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">attributeChangedCallback</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token operator">...</span>theArgs<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Set <code>aria-expanded</code> to match the state of <code>expanded</code>. This will
 convey the state to assistive technology like screen readers.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>name <span class="token operator">===</span> <span class="token string">'expanded'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-expanded'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>expanded<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">attributeChangedCallback</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token operator">...</span>theArgs<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define a custom element, <code>&lt;howto-tree-item-group&gt;</code>, and associate it with
the <code>HowToTreeItemGroup</code> class.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tree-item-group'</span><span class="token punctuation">,</span> HowToTreeItemGroup<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>HowToTree</code> is responsible for handling user input and updating the
expanded/collapsed and selected state for its children. It also manages
the currently active child using <code>aria-activedescendant</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">class</span> <span class="token class-name">HowToTree</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'tree'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'tabindex'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element needs to do some manual input event handling to allow
 switching with arrow keys and Home/End.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onKeyDown<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onFocus<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Before the elements starts booting, it waits for both
 the <code>&lt;howto-tree-item&gt;</code> and <code>&lt;howto-tree-item-group&gt;</code> to load.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements<span class="token punctuation">.</span><span class="token function">whenDefined</span><span class="token punctuation">(</span><span class="token string">'howto-tree-item'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>customElements<span class="token punctuation">.</span><span class="token function">whenDefined</span><span class="token punctuation">(</span><span class="token string">'howto-tree-item-group'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>_ <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Acquire all <code>HowToTreeItem</code>/<code>HowToTreeItemGroup</code> instances inside
 the element.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> treeItems <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTreeItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If there are no <code>treeItems</code>, then the tree is empty. Abort.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>treeItems<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element checks if any child has been marked as selected.
 If so, it will mark it as the current <code>aria-activedescendant</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> selectedTreeItem <span class="token operator">=</span> treeItems<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>treeItem <span class="token operator">=</span><span class="token operator">></span> treeItem<span class="token punctuation">.</span>selected<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>selectedTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>selectedTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
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
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_onFocus<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Returns a list of visible <code>HowToTreeItem</code>/<code>HowToTreeItemGroup</code> elements.
This is useful when the user wants to try to move to the next or previous
item in the list.
If an item is a child of a parent who is <code>.expaned=false</code>
then it is considered invisible and is not added to the list.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_allTreeItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> treeItems <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> A recursive function that visits every child and builds a list.
 This produces similar results to calling querySelectorAll,
 but allows for filtering of the children based on whether or not
 their parent is currently expanded.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">function</span> <span class="token function">findTreeItems</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> el <span class="token keyword">of</span> Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the child is a <code>HowToTreeItem</code> or <code>HowToTreeItemGroup</code>, add it
 to the list of results.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTreeItem</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>treeItems<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If it is a <code>HowToTreeItemGroup</code> and it&#39;s collapsed, don’t descend.
 This will ignore any children and treat them as if they are
 invisible.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTreeItemGroup</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>el<span class="token punctuation">.</span>expanded<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">continue</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Otherwise, if the element is expanded OR we&#39;ve hit something
 else like a <code>&lt;div&gt;</code>, continue to descend and look for
 more <code>treeItems</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">findTreeItems</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">findTreeItems</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> treeItems<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>When focus moves into the element, if a <code>treeItem</code> is not already
active, mark the first <code>treeItem</code> as active.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onFocus</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_currentTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusFirstTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>_onKeyDown</code> handles key presses inside the tree.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onKeyDown</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Don’t handle modifier shortcuts typically used by assistive technology.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>altKey<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Grab a reference to the <code>currentTreeItem</code> as it&#39;s almost always
 passed as an argument to one of the actions to be taken.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> currentTreeItem <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_currentTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>keyCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>UP<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusPrevTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>DOWN<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusNextTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>LEFT<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_collapseTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>RIGHT<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_expandTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>HOME<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusFirstTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>END<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusLastTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">break</span><span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>SPACE<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">case</span> KEYCODE<span class="token punctuation">.</span>ENTER<span class="token punctuation">:</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_toggleTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_selectTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Find the <code>treeItem</code> associated with the element that was clicked.
Focus the <code>treeItem</code> and make it the current selected item as well.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_onClick</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> A loop that will work its way upward until it finds
 the <code>treeItem</code> associated with the event target. This allows
 clicking on a <code>&lt;label&gt;</code> or <code>&lt;div&gt;</code> within a <code>HowToTreeItemGroup</code>
 and ensures the right element is always being focused/selected.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> item <span class="token operator">=</span> event<span class="token punctuation">.</span>target<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">while</span> <span class="token punctuation">(</span>item <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isTreeItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>item <span class="token operator">=</span> item<span class="token punctuation">.</span>parentElement<span class="token punctuation">;</span>

<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_selectTreeItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_toggleTreeItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Return the current active <code>treeItem</code> if there is one. Otherwise,
return null.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_currentTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.active'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Attempt to find the previous <code>treeItem</code> in the list. If one exists,
focus it. Otherwise just ignore the command.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_focusPrevTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> treeItems <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTreeItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> idx <span class="token operator">=</span> treeItems<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>treeItems<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Attempt to find the next <code>treeItem</code> in the list. If one exists,
focus it. Otherwise just ignore the command.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_focusNextTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> treeItems <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTreeItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> idx <span class="token operator">=</span> treeItems<span class="token punctuation">.</span><span class="token function">lastIndexOf</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">&lt;</span> treeItems<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>treeItems<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Focus the first <code>treeItem</code> in the tree. Useful for when the user
presses the [home] key.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_focusFirstTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> firstTreeItem <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>item <span class="token operator">=</span><span class="token operator">></span> <span class="token function">isTreeItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>firstTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Focus the last <code>HowToTreeItem</code> in the tree. Useful for when the user
presses the [end] key.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_focusLastTreeItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> treeItems <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_allTreeItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>treeItems<span class="token punctuation">[</span>treeItems<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Mark the passed in element as the new <code>aria-activedescendant</code> and give
it an <code>.active</code> class for easy styling.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>treeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-activedescendant'</span><span class="token punctuation">,</span> treeItem<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> There can be only one active item at a time.
 Find any previous active item and remove its active class.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">const</span> activeItem <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.active'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>activeItem<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>activeItem<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">'active'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>treeItem<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'active'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If focus is on an open node, close the node.
If focus is on a child node that is also either a leaf node or a closed
parent node, move focus to its parent node.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_collapseTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTreeItemGroup</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> currentTreeItem<span class="token punctuation">.</span>expanded<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>currentTreeItem<span class="token punctuation">.</span>expanded <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Walk up the tree till you find the parent <code>HowToTreeItem</code>.
 If this is a root node, do nothing. Otherwise, collapse the parent
 and move focus to it.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">let</span> parent <span class="token operator">=</span> currentTreeItem<span class="token punctuation">.</span>parentElement<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isTreeItemGroup</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parentElement<span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>parent<span class="token punctuation">.</span>expanded <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_focusTreeItem</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>If focus is on a closed node, opens the node.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_expandTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTreeItemGroup</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>currentTreeItem<span class="token punctuation">.</span>expanded <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Flip the <code>HowToTreeItemGroup</code> between open and closed states.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_toggleTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isTreeItemGroup</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">.</span>expanded<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_collapseTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">else</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_expandTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Perform the default action for a <code>treeItem</code>. If the item is a parent
node, toggle its expanded/collapsed state. If the item is an end
node, dispatch an event with a reference to the node. If this was
a file picker, an application could listen for this event and open
the file based on the item&#39;s name.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token function">_selectTreeItem</span><span class="token punctuation">(</span>currentTreeItem<span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> There can only be one selected element at time.
 Look at all the children and toggle any selected ones off.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'[selected]'</span><span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">=</span><span class="token operator">></span> item<span class="token punctuation">.</span>selected <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>currentTreeItem<span class="token punctuation">.</span>selected <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Dispatch a non-bubbling event containing a reference to the selected
 node. The reason to choose non-bubbling is explained in
 <a href="https://medium.com/dev-channel/custom-elements-that-work-anywhere-898e1dd2bc48#.w6ww4mgfc">this Medium post.</a></p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">dispatchEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CustomEvent</span><span class="token punctuation">(</span><span class="token string">'howto-tree-item-selected'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>detail<span class="token punctuation">:</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>item<span class="token punctuation">:</span> currentTreeItem<span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>bubbles<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Define a custom element, <code>&lt;howto-tree&gt;</code>, and associate it with the
<code>HowToTree</code> class.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tree'</span><span class="token punctuation">,</span> HowToTree<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

</ul>
