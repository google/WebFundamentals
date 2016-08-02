---
layout: shared/narrow
title: "Shadow DOM: creating self-contained web components"
description: "Shadow DOM allows web developers to create compartmentalized DOM and CSS for web components"
published_on: 2016-07-25
updated_on: 2016-07-25
authors:
  - ericbidelman
translation_priority: 1
order: 4
notes:
  useful:
    - "Although you can use the Shadow DOM API and its benefits outside of web components, I'm only going to focus on examples that build custom elements. I'll also be using the Custom Elements v1 API in all examples."
  slot:
    - Slots are incredibly powerful. Think of them as a way to create a "declarative API" for your Shadow DOM. By providing `<slot>`s, you can invite the user's light DOM markup to render in your component.
---

<!-- <script>
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}
</script>
 -->

<style>
  .forward {
    font-size: 14px;
    padding: 16px;
    background-color: #FFF9C4;
    border-radius: 3px;
  }
  .forward p {
    margin-bottom: 0;
  }
  .wf-highlight-list--note {
    margin-top: 24px;
  }
  .wf-talkinghead::before {
    background-image: url(/web/imgs/contributors/{{page.authors[0]}}.jpg);
  }
</style>

<div class="forward">
  <b>Already familiar with Shadow DOM?</b>
  <p>This article describes the new <a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">Shadow DOM v1 spec</a>. If you've been using Shadow DOM, chances are you're familiar with the <a href="https://www.chromestatus.com/features/4507242028072960">v0 version shipped in Chrome 35</a>. The concepts are the same, but the v1 spec has important API differences. Keep reading to see what's new or check out the section on <a href="#historysupport">History and browser support</a> for more info.</p>
</div>

### Why use Shadow DOM? TL;DR {#tldr}

Shadow DOM provides a **way for elements to own, render, and style a chunk of DOM that's separate from the rest of the page**. While you don't have to author custom elements that use Shadow DOM, [doing so](#shadowdom) allows you to take advantage of its many benefits (CSS scoping, DOM encapsulation, composition) and build web components which are more resilient, highly configurable, and extremely reusable.

Shadow DOM solves many problems in web development and is a powerful tool for building component-based apps:

- **Isolated DOM**: a component's DOM is self-contained (e.g. `querySelector()` won't return nodes inside the component).
- **Scoped CSS**: CSS defined inside Shadow DOM is scoped to it. Styles rules don't leak out and page styles don't bleed in.
- Removes the need for tools like [BEM](http://getbem.com/introduction/). Since the DOM is scoped to the component, we can use common id/class names again. Local names won't collide with ones used in the main page.
- When used with Custom Elements, Shadow DOM creates truly self-contained web components (HTML/JS/CSS).
- **Hide component internals**: users don't need to see the implementation details of a component.
- **Composition**: design a declarative, markup-based API for your component. Render the user's HTML in different ways inside the component.

## Introduction {#intro}

[Shadow DOM][sd_spec] is a one of the four pillars that make up Web Components:

- [HTML Templates](http://www.html5rocks.com/en/tutorials/webcomponents/template/)
- [Shadow DOM][sd_spec]
- [Custom Elements](/web/fundamentals/primers/customelements/)
- [HTML Imports](http://www.html5rocks.com/en/tutorials/webcomponents/imports/)

It provides a **way for custom elements to own, render, and style a chunk of DOM that's separate from the rest of the page**. While you don't have to author custom elements that use Shadow DOM, [doing so](#shadowdom) allows you to take advantage of its many benefits (CSS scoping, DOM encapsulation, composition) and build web components which are more resilient, highly configurable, and extremely reusable.

How does Shadow DOM fit into the web components narrative? If the custom elements API is how you dream up a new HTML tag and define a JavaScript API for it, Shadow DOM is how that element gets its DOM/CSS. Using the two APIs together makes your components' HTML/CSS/JS, self-contained.

{% include shared/note.liquid list=page.notes.useful %}

## What is Shadow DOM? {#what}

HTML powers the web because it is incredibly easy to work with. By declaring a few tags, one can author a page in seconds that has both presentation and structure. However, by itself HTML isn't all that useful. It's easy for humans to understand a text-based language but machines need something more. Enter the DOM.

What the heck is DOM?

When the browser loads a web page it does a bunch of interesting stuff. One of the interesting things it does is transform the author's HTML into a live document. Basically, to understand the page's structure, the browser parses HTML (static text-based strings) into a data model (objects/nodes). The browser preserves the HTML's hierarchy by creating a tree of these nodes, also known as the DOM. The cool thing about DOM is that it's a live representation of your page. Unlike the static HTML we author, the browser-produced nodes contain properties, methods, and best of all...can be manipulated by programs! That's why we're able to create DOM directly using JavaScript:

{% highlight javascript %}
let header = document.createElement('header');
let h1 document.createElement('h1');
h1.textContent = 'Hello world!';
header.appendChild(h1);
document.body.appendChild(header);
{% endhighlight %}

produces the following markup:

{% highlight html %}
<body>
  <header>
    <h1>Hello DOM</h1>
  </header>
</body>
{% endhighlight %}

OK, all that is well and good. Then what the heck is shadow DOM?

Shadow DOM is just normal DOM with two differences: 1) how it's created/used and 2) how it behaves in relation to the main page. Normally, you create a chunk of DOM and append it to another element (e.g. the example above). With shadow DOM, you create DOM but _associate_ it with another element. The parent "hosts" the DOM subtree in the shadows, hidden from the rest of the page. Your DOM becomes local to the **shadow host**, meaning anything inside of it is also local to the element, including `<style>`. This is how shadow DOM achieves CSS style scoping.

## Creating Shadow DOM {#create}

A **shadow root** is a document fragment that gets attached to another "host" element. The act of attaching a shadow root is how the element gains its shadow DOM. To create shadow DOM for an element, call `element.attachShadow({mode: 'open'})`:

{% highlight javascript %}
let header = document.createElement('header');
let shadowRoot = header.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().

// div.shadowRoot === shadowRoot
// shadowRoot.host === div
{% endhighlight %}

I'm using `.innerHTML` to fill the shadow root, but you could also use the DOM APIs. This is the web. We have choice.

### Elements that can host shadow dom {#hosts}

[Not all elements can host shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/#h-methods). Calling `.attachShadow()` will result in an error. The reason some elements are blacklisted is that, in some cases, the browser already hosts shadow DOM internally for the element (`<textarea>` and `<input>`). In other cases, it doesn't make sense for the element host shadow DOM (`<img>`).

{% highlight javascript %}
let shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });
// document.createElement('input').attachShadow({ mode: 'open' });  // Error. `<input>` cannot host shadow dom.
{% endhighlight %}

### Creating Shadow DOM for custom elements {#elements}

Shadow DOM is particularly useful when creating [custom elements][ce_article]. You can use it to compartmentalize a element's HTML, CSS, and JS, thus producing a "web component".

**Example** - a custom element (v1) that encapsulates its own DOM, **attaching shadow DOM to itself**:

{% highlight javascript %}
customElements.define('app-drawer', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.

    // Attach a shadow root to the <app-drawer>.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>#wrapper { position: absolute; ...}</style> <!-- styles are scoped to app-drawer! -->
      <div id="wrapper">
        <slot></slot> <!-- render user's children light DOM here. more later. -->
      </div>
    `;
  }
  ...
});
{% endhighlight %}

Users would use this element like so:

{% highlight html %}
<app-drawer>
  <ul>
    <li>Link 1</li>
    <li>Link 2</li>
    <li>Link 3</li>
  </ul>
</app-drawer>
{% endhighlight %}

<!-- <div class="demoarea">
  <app-drawer></app-drawer>
</div>

<script>
if (supportsShadowDOM()) {

}
</script> -->

There are a couple of interesting going on here. The first is that the custom element `<app-drawer>` **creates its own shadow DOM** in the `constructor()`. Any style rules inside the `<style>` element will be scoped to `<app-drawer>`. That's how we're able to get away with using a common id like `id="wrapper"`. Even if the main page is using the same id, it won't conflict. Proper DOM/CSS isolation is glorious. The last bit is the sample is shadow DOM's new`<slot>` element. We'll talk about it later.

### Closed shadow roots (aka avoid at all costs) {#closed}

There's another flavor of shadow DOM is called "closed" mode. When you create a closed shadow tree, outside JavaScript won't be able to access the internal DOM of your component. This is similar to how native elements like `<video>` work. JavaScript cannot access the shadow DOM of `<video>` because the browser implements it using a closed-mode shadow root.

**Example** - closed mode shadow DOM

{% highlight javascript %}
let div = document.createElement('div');
let shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree

// div.shadowRoot === null
// shadowRoot.host === div
{% endhighlight %}

Other API calls which are affected by closed-mode (e.g. they return `null`):

- `Element.shadowRoot`
- `Element.assignedSlot`
- `TextNode.assignedSlot`
- `Event.composedPath()`

Closed shadow roots are completely ridiculous. For starters, some developers will see closed mode as an artificial security feature. Let's be clear, it's **not** a security feature. There's nothing stopping an attacker from hijacking `Element.prototype.attachShadow`. Closed mode simply prevents outside JS from drilling into an element's internal DOM. However, it also **prevents internal custom element code from access its own shadow DOM** :( That's complete fail.

Instead, you'll have to stash a variable to use things like `querySelector()` in element code, completely defeating the original purpose of closed mode!

{% highlight javascript %}
customElements.define('x-element', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.

    // Attach a shadow root to the element.
    this._shadowRoot = this.attachShadow({mode: 'closed'});
    this._shadowRoot.innerHTML = '<div class="wrapper"></div>';
  }
  connectedCallback() {
    // When creating closed shadow trees, you'll need to stash the shadow root for later.
    // IOW, creating closed shadow trees is really dumb.
    const wrapper = this._shadowRoot.querySelector('.wrapper');
  }
  ...
});
{% endhighlight %}

Lastly, **closed mode makes your component less flexible for end users**. As you build web components, there will come a time when you forget to add a feature. A configuration option. A use case the user wants. A common example is forgetting to include adequate styling hooks for internal nodes. With closed mode, there's no way for users to override defaults and tweak styles. Being able to access the component's internals is super helpful. Ultimately, users will fork your component, find another, or create their own if it doesn't do what they want :(

## Styling  {#styling}

### Scoped styles {#scopedstyles}

Hands down, the most useful feature of Shadow DOM is the style scoping:

- Page styles don't leak into your component.
- Styles defined inside shadow DOM don't bleed out. They're scope the the hosting element.

That is, **selectors you write will be local to your component**. Using common id/class names is perfectly fine because they won't collide with duplicate names used on the main page!

**Example** - using common ids and CSS selectors won't collide with the outside page.

{% highlight html %}
<style>
  #panels {
    box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
    background: white;
    ...
  }
  #titles {
    display: inline-flex;
    ..
  }
</style>
<div id="titles">
  ...
</div>
<div id="panels">
  ...
</div>
{% endhighlight %}

### Styling the host component {#host}

Ever wonder how the `<select>` element renders a multi-select widget (instead of a dropdown) when you add the `multiple` attribute?

<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

A component can style itself by using `:host`.

**Example** - a component defining its own default styles

{% highlight html %}
<style>
:host {
  display: block; /* by default, custom elements are display: inline */
  contain: strict; /* Use CSS containment if your component doesn't do anything crazy. */
}
</style>
{% endhighlight %}

One gotcha is that rules in the parent page have higher specificity than `:host` rules defined in the element. That is, user styles win. This allows users to override your styling from the outside. Also, `:host` only works in the context of a shadow root so you can't use it outside of shadow DOM.

The functional form of `:host(<selector>)` allows you to target the host element if it matches a `<selector>`. This is a great way to react to user interaction, or state.

{% highlight html %}
<style>
:host {
  opacity: 0.4;
  will-change: opacity;
  transition: opacity 300ms ease-in-out;
}
:host(:hover) {
  opacity: 1;
}
:host(:active) {
  position: relative;
  top: 3px;
  left: 3px;
}
:host([disabled]) {
  background: grey;
  pointer-events: none;
  opacity: 0.4;
}
</style>
{% endhighlight %}

**Example** - `<fancy-tabs>` uses `:host([background])` to provide its background feature.

{% highlight javascript %}
customElements.define('fancy-tabs', class extends HTMLElement {

  constructor() {
    super(); // always call super() first in the ctor.

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        :host([background]) {
          background: var(--background-color, #9E9E9E);
          border-radius: 10px;
          padding: 10px;
        }
      </style>
      ...
    `;
  }
}
{% endhighlight %}

### Styling the user's markup {#stylinglightdom}

{% highlight html %}
<style>
::slotted(h2) {
  margin: 0;
  font-weight: 300;
  color: red;
}
/* These don't work
*/
::slotted(.company),
::slotted(.title .company) {
  text-transform: uppercase;
}
/* Doesn't work. Only top-level elements can be selected
::slotted(.company) {
  text-transform: uppercase;
}
*/
</style>
<slot></slot>

<name-badge>
  <h2>Eric Bidelman</h2>
  <span class="title">Digital Jedi, <span class="company">Google <span>
</name-badge>
{% endhighlight %}

**Note**

- You can only selector top-level elements in the user's light DOM.

{% highlight javascript %}
customElements.define('fancy-tabs', class extends HTMLElement {

  constructor() {
    super(); // always call super() first in the ctor.

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #titles {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabsSlot::slotted(*) {
          font: 400 16px/22px 'Roboto';
          padding: 16px 8px;
          ...
        }
        #tabsSlot::slotted([selected]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #panelsSlot::slotted(*:not([selected])) {
          display: none;
        }
      </style>
      <div id="titles">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
  }
}
{% endhighlight %}

### Styling from the outside {#stylefromoutside}

There are a couple of ways to style a component from the outside. The first is

fancy-tabs {
  width: 500px;
}

Notes on styling components from the outside:

- Styles that inhe
- Given the same specificity, user-provided styles win over CSS rules defined in shadow DOM.

#### Creating style hooks {#stylehooks}

Customization is good. In certain cases, you may want to poke holes in your Shadow's styling shield and create hooks for others to style.

## Event Model {#events}

Some events cross the shadow DOM boundary, some do not. In the cases where events cross the boundary, the event target is adjusted in order to maintain the encapsulation that the shadow DOM provides. That is, events are re-targeted to look like they've come from the component rather than internal elements within your Shadow DOM.

**Tip** - use `event.composedPath()` to see the adjusted event path.

The following events never cross the shadow boundary:

- `abort`
- `error`
- `select`
- `change`
- `load`
- `loadedmetadata`
- `reset`
- `resize`
- `scroll`
- `selectstart`

## Tips & Tricks

Sometimes it's useful to find custom elements used on the page. Doing so is pretty easy.
We just need to recursively traverse elements' shadow DOM.

**Example** - find all custom elements used on the page (including those inside shadow DOM):

{% highlight javascript %}
const allCustomElements = [];

function isCustomElement(el) {
  const isAttr = el.getAttribute('is');
  // Check for <super-button> and <button is="super-button">.
  return el.localName.includes('-') || isAttr && isAttr.includes('-');
}

function findAllCustomElements(nodes) {
  for (let i = 0, el; el = nodes[i]; ++i) {
    if (isCustomElement(el)) {
      allCustomElements.push(el);
    }
    // If the element has shadow DOM, dig deeper.
    if (el.shadowRoot) {
      findAllCustomElements(el.shadowRoot.querySelectorAll('*'));
    }
  }
}

findAllCustomElements(document.querySelectorAll('*'));
{% endhighlight %}

Some browsers also support using shadow DOM v0's `/deep/` combinator in `querySelectorAll()`:

{% highlight javascript %}
const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
  const isAttr = el.getAttribute('is');
  return el.localName.includes('-') || isAttr && isAttr.includes('-');
});
{% endhighlight %}

For now, `/deep/` [continues to work in `querySelectorAll()` calls](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).

## Composition and slots {#composition_slot}

One of the least understood features of shadow DOM (yet arguably the most powerful) is DOM composition.

### What is composition? {#composition}

By definition, composition is the nature of something's ingredients; the way in which a whole or mixture is made up.
In our world of web development, composition is how we constructor apps, declaratively out of HTML. Different building blocks (divs, headers, forms, inputs) come together to form apps. Some of these tags even work _with_ each other.

For example, composition how native elements like `<select>`, `<details>`, `<form>`, and `<video>` are so flexible. Each of those tags accepts certain HTML as children. For example, `<select>` knows how to render `<option>` and `<optgroup>` elements but ignores everything else. The `<details>` element renders the `<summary>` tag as a expandable arrow. Even `<video>` only cares about certain elements. Although it doesn't render `<source>` children, it has internal behavior that knows how to deal with that type of element. What magic!

We can do the same with Shadow DOM.

### Light DOM vs Shadow DOM {#lightdom}

Before getting into the weeds, let's make sure we're working off the same terminology. Shadow DOM composition introduces a bunch of new fundamentals, and it's important we're speaking the same lingo.

**Light DOM**

User-authored markup. This is the HTML a consumer of your component writes in their page. This DOM lives outside the component's shadow DOM.

Example

{% highlight html %}
<button is="better-button">
  <!-- the image and span are better-button's light DOM -->
  <img src="gear.svg" slot="icon">
  <span>Settings</span>
</button>
{% endhighlight %}

**Shadow DOM**

The local DOM a component author writes. This markup defines a component's internal structure, scoped CSS, etc. Shadow DOM encapsulates your implementation details and can define how your component renders user-provided markup (light DOM).

Example

{% highlight html %}
#shadow-root
<style>...</style>
<slot name="icon"></slot>
<slot></slot>
{% endhighlight %}

**Composed DOM**

The result of the browser distributing the user's light DOM into your shadow DOM and rendering the final product. The composed tree is what you ultimately see in the DevTools.

Example

{% highlight html %}
<button is="better-button">
  #shadow-root
    <style>...</style>
    <slot name="icon">
      <img src="gear.svg" slot="icon">
    </slot>
    <slot>
      <span>Settings</span>
    </slot>
</button>
{% endhighlight %}

**Note** - keep in mind that light DOM isn't physically moved into a slot. It's just a rendered at that location. More on this coming up.

### Slots {#slots}

Shadow DOM composes different DOM trees together using the `<slot>` element. **Slots are like holes inside your component that users _can_ fill with their own markup**. By defining one or more slot, you invite outside markup to render in your component's shadow DOM. Essentially, you're saying **"Render the user's markup over here"**.

Elements which are distributed into the shadow tree are allowed to "cross" the boundary when a `<slot>` invites them in. Conceptually, this is a bit bizarre though. Slots don't move DOM physically. They render the user's light DOM into your shadow tree, thus composing different DOM trees together.

Slots can be empty or provide fallback content. If the user doesn't provide content ([light DOM](#lightdom)), the slot renders its fallback content.

{% highlight html %}
<slot></slot> <!-- default slot -->

<slot>Fancy button</slot> <!-- default slot with fallback content -->

<slot> <!-- default slot entire DOM tree as fallback -->
  <h2>Title</h2>
  <summary>Description text</summary>
</slot>
{% endhighlight %}

A more advanced form is called **named slots**. Named slots are specific holes in your shadow DOM for users to fill with their markup. They specify what content should render at that location by referencing the slot by its `name`:

**Example** - the named slots in `<fancy-tabs>`:

{% highlight html %}
<fancy-tabs>
   #shadow-root (open)
   <div id="titles">
    <slot id="tabsSlot" name="title"></slot>
  </div>
  <div id="panels">
    <slot id="panelsSlot"></slot>
  </div>
{% endhighlight %}

Users of this component use it like so:

{% highlight html %}
<fancy-tabs>
  <h2 slot="title">Title</h2>
  <section>content panel 1</section>
  <h2 slot="title" selected>Title 2</h2>
  <section>content panel 2</section>
  <h2 slot="title">Title 3</h2>
  <section>content panel 3</section>
</fancy-tabs>
{% endhighlight %}

What's neat is this works the same way:

{% highlight html %}
<fancy-tabs>
  <button slot="title">Title</button>
  <button slot="title" selected>Title 2</button>
  <button slot="title">Title 3</button>
  <section>content panel 1</section>
  <section>content panel 2</section>
  <section>content panel 3</section>
</fancy-tabs>
{% endhighlight %}

Notice our component is able to handle different kinds of light DOM setups. The order of DOM is irrelevant. Since we're referencing certain slots by name, our markup still gets rendered correctly. We've also moved to using `<button>` instead of `<h2>`s. The component was authored to be flexible in this way.

### Working with slots in code {#workwithslots}

The shadow DOM API provides a additional utilities for working with slots and distributed nodes. These come in really handy inside your custom element code.

#### slotchange event {#slotchange}

The `slotchange` event fires when a slot's distributed nodes changes (e.g. when children are add/removed from the light dom).

{% highlight javascript %}
const slot = this.shadowRoot.querySelector('#slot');
slot.addEventListener('slotchange', e => {
  console.log('light dom children changed!');
});
{% endhighlight %}

**Tip**: Use a `MutationObserver` to monitor other types of light DOM changes.

#### Find which nodes are rendering in a slot {#slotnodes}

Sometimes it's useful to know what light DOM nodes are being rendered a slot. You can find this by calling `assignedNodes()` on the `<slot>` element. The `{flatten: true}` option will return a slot's fallback content if no nodes are being distributed.

<table>
  <thead><tr><th>better-button's Shadow DOM</th><th>Usage</th><th>Result</th></tr></thead>
  <tr>
    <td><code>&lt;slot>&lt;b>fallback content&lt;/b>&lt;/slot></code></td>
    <td>&lt;button is="better-button">My button&lt;/button></td>
    <td><code>slot.assignedNodes(); // [text]</code></td>
  </tr>
  <tr>
    <td><code>&lt;slot>&lt;b>fallback content&lt;/b>&lt;/slot></code></td>
    <td>&lt;button is="better-button">&lt;/button></td>
    <td><code>slot.assignedNodes(); // []</code></td>
  </tr>
  <tr>
    <td><code>&lt;slot>&lt;b>fallback content&lt;/b>&lt;/slot></code></td>
    <td>&lt;button is="better-button">&lt;/button></td>
    <td><code>slot.assignedNodes({flatten: true}); // [<b>fallback content</b>]</code></td>
  </tr>
</table>

{% include shared/note.liquid list=page.notes.slot %}

- examples of diff rendering based on attribute
- light dom / shadow dom
- Styling slotted nodes

## FAQ

- What security features does Shadow DOM provide?

Shadow DOM is not a security feature. It's a lightweight tool for scoping CSS
and hiding away DOM trees in component. If you want a true security boundary, use an `<iframe>`.

- Does a web component have to use Shadow DOM?

Nope! You don't have to create web components that use Shadow DOM. However, authoring [custom elements that use Shadow DOM](#shadowdom) means you can take advantage of features like CSS scoping, DOM encapsulation, and composition.




### Creating an element that uses Shadow DOM {#c}

> I'm not going to cover the features of [Custom Elements][ce_article] in this article, but
it's a complementary API for creating reusable HTML tags.
{: .wf-talkinghead }

Shadow DOM provides a way for an element to own, render, and style a chunk of DOM
that's separate from the rest of the page. Heck, you could even hide away an
entire app within a single tag:

{% highlight html %}
<!-- chat-app's implementation details are hidden away in Shadow DOM. -->
<chat-app></chat-app>
{% endhighlight %}

To use Shadow DOM in a custom element, call `this.attachShadow` inside your `constructor`:

{% highlight javascript %}
customElements.define('x-foo-shadowdom', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.

    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>:host { ... }</style> <!-- look ma, scoped styles -->
      <b>I'm in shadow dom!</b>
      <slot></slot>
    `;
  }
  ...
});
{% endhighlight %}

### Creating elements from a &lt;template&gt; {#fromtemplate}

For those unfamiliar, the [`<template>` element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) allows you to declare fragments of DOM which are parsed, inert at page load, and can be activated later at runtime. It's another API primitive in the web components family. **Templates are an ideal placeholder for declaring the structure of a custom element**.

**Example:** registering an element with Shadow DOM content created from a `<template>`:

{% highlight html %}
<template id="x-foo-from-template">
  <style>
    p { color: orange; }
  </style>
  <p>I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#x-foo-from-template');
      const instance = t.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }
    ...
  });
</script>
{% endhighlight %}

These few lines of code pack a punch. Let's understanding the key things going on:

1. We're defining a new element in HTML: `<x-foo-from-template>`
2. The element's Shadow DOM is created from a `<template>`
3. The element's DOM is local to the element thanks to Shadow DOM
4. The element's internal CSS is scoped to the element thanks to Shadow DOM


## API reference

The `customElements` global defines useful methods for working with custom elements.

**`HTMLElement.attachShadow(options)`**

Creates shadow DOM for an element.

{% highlight javascript %}
blah
{% endhighlight %}

## History and browser support {#historysupport}

If you've been following web components for the last couple of years, you'll know that
Chrome 35+/Opera have been shipping Shadow DOM under a different API, `element.createShadowRoot()`
instead of `element.attachShadow()`. Although Chrome will support this older version for some time, Shadow DOM v0 is now considered deprecated. Shadow DOM v1 (new API) is the specification other browser vendors are implementing.

If you happen to be interested in the old v0 spec, check out the html5rocks articles: [1](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/), [2](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/), [3](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/). There's also a great comparison of the [differences between Shadow DOM v0 and v1][differences].

### Browser support

Chrome 53 ([status](https://www.chromestatus.com/features/4667415417847808)), Opera 40, and Safari 10 are shipping shadow DOM v1. Edge is under consideration [with high priority](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom). Mozilla has an [open bug](https://bugzilla.mozilla.org/show_bug.cgi?id=811542) to implement.

Until browser support is widely available, the [webcomponents.js polyfill](https://github.com/webcomponents/webcomponentsjs/tree/v1) is being updated to support v1.

To feature detect shadow DOM, check for the existence of `attachShadow`:

{% highlight javascript %}
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}

if (supportsShadowDOM()) {
  // Good to go!
} else {
  // Use polyfills
}
{% endhighlight %}

## Conclusion

Shadow DOM is incredibly powerful. I hope you'll agree. For the first time ever, we have an API primitive for style scoping, DOM scoping, and true composition. Combined with other web component APIs like Custom elements, Shadow DOM provides a way to author truly encapsulated components without hacks or older baggage like `<iframe>`s.

Shadow DOM is certainly a complex beast, but it's a beast worth learning. Spend some time with it. Learn it. Ask questions!

<div class="mdl-grid">
  <div class="mdl-cell--3-col">
    <h6>Published</h6>
    <time datetime="{{ page.published_on | date: '%F' }}">{{ page.published_on | date: '%B %-d, %Y' }}</time>
  </div>
  <div class="mdl-cell--2-col">
    <h6>Updated</h6>
    <time datetime="{{ page.updated_on | date: '%F' }}">{{ page.updated_on | date: '%B %-d, %Y' }}</time>
  </div>
</div>

<!-- <script>
if (!supportsShadowDOM()) {
  let demos = document.querySelectorAll('.demoarea');
  Array.from(demos).forEach(function(demo) {
    demo.hidden = true;
  });
}
</script> -->

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: /web/fundamentals/primers/customelements/
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[differences]: http://hayato.io/2016/shadowdomv1/
