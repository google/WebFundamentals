project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-04-28#}
{# wf_published_on: 2017-04-06 #}

# HowTo: Components – howto-tooltip {: .page-title }

{% include "web/_shared/contributors/ewagasperowicz.html" %}
{% include "web/_shared/contributors/noms.html" %}
{% include "web/_shared/contributors/robdodson.html" %}
{% include "web/_shared/contributors/surma.html" %}

<link rel="stylesheet" href="prism-solarizedlight.css">
<link rel="stylesheet" href="main.css">

<p>A tooltip is a popup that displays information related to an element
when the element receives keyboard focus or the mouse hovers over it.
It typically appears after a small delay and disappears when Escape is
pressed or on mouse out. The element that triggers the tooltip references
the tooltip element with aria-describedby.</p>
<p>See: <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip">https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip</a></p>


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
  /* The tooltip is by default unstyled. */
  howto-tooltip {
    margin-left: 8px;
    padding: 4px;
    background-color: #616161;
    color: #fff;
    border-radius: 3px;
    opacity: 0;

    /* Optionally, animate the tooltip. */
    transition: opacity 1s;

    /* will-change tells the browser we will be animating the opacity, so
     * it can try to optimize that
     * https://developer.mozilla.org/en-US/docs/Web/CSS/will-change */
    will-change: opacity;
  }

  /* The tooltip is hidden. */
  howto-tooltip[aria-hidden="true"] {
    opacity: 0;
  }

  /* The tooltip is showing. */
  howto-tooltip[aria-hidden="false"] {
    /* Optionally, add a delay to showing the tooltip. */
    transition-delay: 0.3s;
    opacity: 1;
  }
</style>

<div class="text">
   <label for="name">Your name:</label>
   <input id="name" aria-describedby="tp1"/>
   <howto-tooltip id="tp1">Ideally your name is Batman</howto-tooltip>
   <br>
   <label for="cheese">Favourite type of cheese: </label>
   <input id="cheese" aria-describedby="tp2"/>
   <howto-tooltip id="tp2">Help I am trapped inside a tooltip message</howto-tooltip>
</div>


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
      /*
 * A tooltip is a popup that displays information related to an element
 * when the element receives keyboard focus or the mouse hovers over it.
 * It typically appears after a small delay and disappears when Escape is
 * pressed or on mouse out. The element that triggers the tooltip references
 * the tooltip element with aria-describedby.
 *
 * See: https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip
 */

class HowtoTooltip extends HTMLElement {
  /**
  * The constructor does work that needs to be executed _exactly_ once.
  */
  constructor() {
    super();

    // These functions are used in a bunch of places, and always need to
    // bind the correct `this` reference, so do it once.
    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  }

  /**
   * `connectedCallback` gets the element that triggers the tooltip and
   * sets up the event listeners on it.
   */
  connectedCallback() {
    // A tooltip should always set its `role` to `tooltip`
    this.setAttribute('role', 'tooltip');

    // Tooltips cannot be focused themselves.
    this.tabIndex = -1;

    // 'aria-hidden' is used to show or hide the tooltip. A tooltip should
    // check to see if its `aria-hidden` value has been set by the user.
    // Otherwise, it should use the default value.
    this.setAttribute('aria-hidden', this.getAttribute('aria-hidden') || true);

    // The element that triggers the tooltip references the tooltip
    // element with aria-describedby.
    this._target = document.querySelector('[aria-describedby=' + this.id + ']');

    // The tooltip needs to listen to focus/blur events from the target,
    // as well as hover events over the target.
    this._target.addEventListener('focus', this._show);
    this._target.addEventListener('blur', this._hide);
    this._target.addEventListener('mouseenter', this._show);
    this._target.addEventListener('mouseleave', this._hide);
  }

  /**
   * `disconnectedCallback` unregisters the event listeners that were set up in
   * `connectedCallback`.
   */
  disconnectedCallback() {
    if (!this._target)
      return;

    // Remove the existing listeners, so that they don't trigger even though
    // there's no tooltip to show.
    this._target.removeEventListener('focus', this._show);
    this._target.removeEventListener('blur', this._hide);
    this._target.removeEventListener('mouseenter', this._show);
    this._target.removeEventListener('mouseleave', this._hide);
    this._target = null;
  }

  _show() {
    // If the tooltip is hidden, show it.
    if (this.getAttribute('aria-hidden') === 'true') {
      this.setAttribute('aria-hidden', 'false');
    }
  }

  _hide() {
    // If the tooltip is visible, hide.
    if (this.getAttribute('aria-hidden') === 'false') {
      this.setAttribute('aria-hidden', 'true');
    }
  }
}

window.customElements.define('howto-tooltip', HowtoTooltip);

    })();
  }
</script>
</html>

{% endframebox %}

## Example usage {: #usage }
<ul class="literate demo" id="howto-tooltip_demo">

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token doctype">&lt;!doctype html></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The tooltip is by default unstyled.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tooltip {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>margin-left: 8px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>padding: 4px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>background-color: #616161;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>color: #fff;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>border-radius: 3px;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 0;</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Optionally, animate the tooltip.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition: opacity 1s;</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>will-change tells the browser we will be animating the opacity, so
it can try to optimize that
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/will-change">https://developer.mozilla.org/en-US/docs/Web/CSS/will-change</a></p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>will-change: opacity;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The tooltip is hidden.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tooltip[aria-hidden="true"] {
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 0;
<span class="indent">&nbsp;&nbsp;</span>}</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The tooltip is showing.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span>howto-tooltip[aria-hidden="false"] {</code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>Optionally, add a delay to showing the tooltip.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>transition-delay: 0.3s;
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span>opacity: 1;
<span class="indent">&nbsp;&nbsp;</span>}
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Your name:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>name<span class="token punctuation">"</span></span> <span class="token attr-name">aria-describedby</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp1<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tooltip</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Ideally your name is Batman<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tooltip</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>cheese<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Favourite type of cheese: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>cheese<span class="token punctuation">"</span></span> <span class="token attr-name">aria-describedby</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp2<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="indent">&nbsp;&nbsp;</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>howto-tooltip</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tp2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Help I am trapped inside a tooltip message<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>howto-tooltip</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>
</li>

</ul>

## Code {: #code }
<ul class="literate code" id="howto-tooltip_impl">
  
<li class="blockcomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="token keyword">class</span> <span class="token class-name">HowtoTooltip</span> <span class="token keyword">extends</span> <span class="token class-name">HTMLElement</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p>The constructor does work that needs to be executed <em>exactly</em> once.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> These functions are used in a bunch of places, and always need to
 bind the correct <code>this</code> reference, so do it once.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_show <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_hide <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>connectedCallback</code> gets the element that triggers the tooltip and
sets up the event listeners on it.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token function">connectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment empty">
<div class="literate-text empty"></div>
<code class="literate-code empty"></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> A tooltip should always set its <code>role</code> to <code>tooltip</code></p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'role'</span><span class="token punctuation">,</span> <span class="token string">'tooltip'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Tooltips cannot be focused themselves.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>tabIndex <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> &#39;aria-hidden&#39; is used to show or hide the tooltip. A tooltip should
 check to see if its <code>aria-hidden</code> value has been set by the user.
 Otherwise, it should use the default value.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The element that triggers the tooltip references the tooltip
 element with aria-describedby.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'[aria-describedby='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">+</span> <span class="token string">']'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> The tooltip needs to listen to focus/blur events from the target,
 as well as hover events over the target.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'blur'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseleave'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span></code>
</li>

<li class="blockcomment ">
<div class="literate-text "><p><code>disconnectedCallback</code> unregisters the event listeners that were set up in
<code>connectedCallback</code>.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="token function">disconnectedCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text empty"></div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">)</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">return</span><span class="token punctuation">;</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> Remove the existing listeners, so that they don&#39;t trigger even though
 there&#39;s no tooltip to show.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'focus'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'blur'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseenter'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_show<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'mouseleave'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_hide<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_target <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token function">_show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the tooltip is hidden, show it.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'true'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token string">'false'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>

<span class="indent">&nbsp;&nbsp;</span><span class="token function">_hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></code>
</li>

<li class="linecomment ">
<div class="literate-text "><p> If the tooltip is visible, hide.</p>
</div>
<code class="literate-code "><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'false'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'aria-hidden'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="indent">&nbsp;&nbsp;</span><span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="indent">&nbsp;&nbsp;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'howto-tooltip'</span><span class="token punctuation">,</span> HowtoTooltip<span class="token punctuation">)</span><span class="token punctuation">;</span></code>
</li>

</ul>
