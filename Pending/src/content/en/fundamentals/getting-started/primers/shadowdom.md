project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Shadow DOM allows web developers to create compartmentalized DOM and CSS for web components

{# wf_review_required #}
{# wf_updated_on: 2016-08-01 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1: self-contained web components {: .page-title }

{% include "_shared/contributors/ericbidelman.html" %}

Note: This article describes the new <a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">Shadow DOM v1 spec</a>. If you've been using Shadow DOM, chances are you're familiar with the <a href="https://www.chromestatus.com/features/4507242028072960">v0 version shipped in Chrome 35</a>, which has also been polyfilled. The concepts are the same, but the v1 spec has important API differences. Keep reading to see what's new or check out the section on <a href="#historysupport">History and browser support</a> for more info.


### TL;DR {#tldr}

Shadow DOM provides a **way for HTML elements to own, render, and style a chunk of DOM that's separate from the rest of the page**. While you don't have to author custom elements that use shadow DOM, [doing so](#elements) allows you to take advantage of its benefits (CSS scoping, DOM encapsulation, composition) and build web components which are more resilient, highly configurable, and extremely reusable.

When combined with custom elements, shadow DOM provides a **framework-free way of creating self-contained components**.


## Introduction {#intro}

Shadow DOM is one of the four Web Component standards: [HTML Templates](http://www.html5rocks.com/en/tutorials/webcomponents/template/), [Shadow DOM][sd_spec], [Custom elements](/web/fundamentals/primers/customelements/) and [HTML Imports](http://www.html5rocks.com/en/tutorials/webcomponents/imports/).

How does shadow DOM fit into the web components narrative? If custom elements are the way to create a new HTML tag and give it a JS API, shadow DOM is the way you give the tag its HTML/CSS. The two APIs combine to make a component with self-contained HTML/CSS/JS.

Shadow DOM is designed as a tool for building component-based apps, but it also brings solutions for common problems in web development:

- **Isolated DOM**: a component's DOM is self-contained (e.g. `querySelector()` won't return nodes inside the component).
- **Scoped CSS**: CSS defined inside shadow DOM is scoped to it. Styles rules don't leak out and page styles don't bleed in.
- **Removes the need for methodologies like [BEM](http://getbem.com/introduction/)**. Since the DOM is scoped to the component, we can use cleaner, more generic id/class names again. Local names won't collide with ones used in the main page.
- **Hide component internals**: consumers of your component don't need to see the implementation details of it.
- **Composition**: design a declarative, markup-based API for your component.

Note: Although you can use the shadow DOM API and its benefits outside of web components, I'm only going to focus on examples that build on custom elements. I'll be using the custom elements v1 API in all examples.


#### &lt;fancy-tabs&gt; demo {#demo}

Throughout this article, I'll be referring to a demo component (`<fancy-tabs>`) and referencing code snippets from it. If your browser supports the APIs, you should see a live demo of it just below. Otherwise, check out the <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">full source on Github</a>.

<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/7c4189d4a72ab3d53c3817a259730806b6a03cd1/fancy-tabs-demo.html"></iframe>
  <figcaption><a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">View source on Github</a></figcaption>
</figure>

## What is shadow DOM? {#what}

#### Background on DOM {#sdbackground}

HTML powers the web because it's easy to work with. By declaring a few tags, one can author a page in seconds that has both presentation and structure. However, by itself HTML isn’t all that useful. It’s easy for humans to understand a text-based language, but machines need something more. Enter the Document Object Model, or DOM.

When the browser loads a web page it does a bunch of interesting stuff. One of the things it does is transform the author’s HTML into a live document. Basically, to understand the page’s structure, the browser parses HTML (static strings of text) into a data model (objects/nodes). The browser preserves the HTML’s hierarchy by creating a tree of these nodes: the DOM. The cool thing about DOM is that it’s a live representation of your page. Unlike the static HTML we author, the browser-produced nodes contain properties, methods, and best of all...can be manipulated by programs! That’s why we’re able to create DOM elements directly using JavaScript:


    let header = document.createElement('header');
    let h1 document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

produces the equivalent of the following HTML markup:


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

OK, all that is well and good. Then what the heck is _shadow DOM_?

#### DOM...in the shadows {#sddom}

Shadow DOM is just normal DOM with two differences: 1) how it’s created/used and 2) how it behaves in relation to the rest of the page. Normally, you create a chunk of DOM and append it to another element (e.g. the example above). With shadow DOM, you create DOM but _associate_ it with a parent element. The parent "hosts" the DOM subtree in the shadows, hidden from the rest of the page, and is also referred to as the **shadow host**. Anything you add in the shadows becomes local to the hosting element, including `<style>`. This is how shadow DOM achieves CSS style scoping.

## Creating shadow DOM {#create}

A **shadow root** is a document fragment that gets attached to a “host” element. The act of attaching a shadow root is how the element gains its shadow DOM. To create shadow DOM for an element, call `element.attachShadow()`:


    let header = document.createElement('header');
    let shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

I'm using `.innerHTML` to fill the shadow root, but you could also use the DOM APIs. This is the web. We have choice.

[Not all elements can host shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/#h-methods). Calling `.attachShadow()` on an unsupported element will throw an error. The reason some elements are blacklisted is that, in some cases, the browser already hosts its own shadow DOM internally for the element (`<textarea>` and `<input>`). In other cases, it doesn't make sense for the element to host shadow DOM (`<img>`).


    let shadowRoot = document.createElement('div').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    // document.createElement('input').attachShadow({mode: 'open'});
    

### Creating shadow DOM for a custom element {#elements}

Shadow DOM is particularly useful when creating [custom elements][ce_article]. Use shadow DOM to compartmentalize an element's HTML, CSS, and JS, thus producing a "web component".

**Example** - a custom element **attaches shadow DOM to itself**, encapsulating its DOM/CSS:

    customElements.define('fancy-tabs', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to <fancy-tabs>.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
          <div id="tabs">...</div>
          <div id="panels">...</div>
        `;
      }
      ...
    });

There are a couple of interesting things going on here. The first is that the custom element **creates its own shadow DOM** in the `constructor()`. Secondly, because we're creating a shadow root, the CSS rules inside the `<style>` will be scoped to `<fancy-tabs>`.

When you try to run this example, you'll probably notice that nothing renders. The user's markup seemingly disappears! To bring it back, we need the [`<slot>` element](#slots). More on that [later](#composition_slot).
{: .wf-talkinghead }

## Composition and slots {#composition_slot}

Composition is one of the least understood features of shadow DOM, but it's arguably the most important.

In our world of web development, composition is how we construct apps, declaratively out of HTML. Different building blocks (`<div>`s, `<header>`s, `<form>`s, `<input>`s) come together to form apps. Some of these tags even work with each other. Composition is why native elements like `<select>`, `<details>`, `<form>`, and `<video>` are so flexible. Each of those tags accepts certain HTML as children and does something special with them. For example, `<select>` knows how to render `<option>` and `<optgroup>` into dropdown and multi-select widgets. The `<details>` element renders `<summary>` as a expandable arrow. Even `<video>` knows how to deal with certain children: `<source>` elements don’t get rendered, but they do affect the video’s behavior. What magic!

### Terminology: light DOM vs. shadow DOM {#lightdom}

Shadow DOM composition introduces a bunch of new fundamentals in web development. Before getting into the weeds, let's standardize on some terminology so we're speaking the same lingo.

**Light DOM**

The markup a user of your component writes. This is the HTML a consumer of your component writes in their page. This DOM lives outside the component's shadow DOM.


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

The DOM a component author writes. Shadow DOM is local to the component and defines its internal structure, scoped CSS, and encapsulates your implementation details. It also defines how your component renders user-provided markup (i.e., the light DOM).


    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

**Composed DOM**

The result of the browser distributing the user's light DOM into your shadow DOM, rendering the final product. The composed tree is what you ultimately see in the DevTools and what's rendered on the page.


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
    

### The &lt;slot&gt; element {#slots}

Shadow DOM composes different DOM trees together using the `<slot>` element. **Slots are placeholders inside your component that users _can_ fill with their own markup**. By defining one or more slots, you invite outside markup to render in your component's shadow DOM. Essentially, you're saying _"Render the user's markup over here"_.

Note: Slots are a way of creating a "declarative API" for a web component. They mix-in the user's DOM to help render the overall component, thus, **composing different DOM trees together**.


Elements are allowed to "cross" the shadow DOM boundary when a `<slot>` invites them in. These elements are called **distributed nodes**. Conceptually, distributed nodes can seem a bit bizarre. Slots don't physically move DOM; they render it at another location inside the shadow DOM.

A component can define zero or more slots in its shadow DOM. Slots can be empty or provide fallback content. If the user doesn't provide [light DOM](#lightdom) content, the slot renders its fallback content.


    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

You can also create **named slots**. Named slots are specific holes in your shadow DOM that users reference by name.

**Example** - the named slots in `<fancy-tabs>`'s shadow DOM:


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

Component users declare `<fancy-tabs>` like so:


    <fancy-tabs>
      <h2 slot="title">Title</h2>
      <section>content panel 1</section>
      <h2 slot="title" selected>Title 2</h2>
      <section>content panel 2</section>
      <h2 slot="title">Title 3</h2>
      <section>content panel 3</section>
    </fancy-tabs>
    
    <!-- Using <button>'s and changing the ordering also works! -->
    <fancy-tabs>
      <button slot="title">Title</button>
      <button slot="title" selected>Title 2</button>
      <button slot="title">Title 3</button>
      <section>content panel 1</section>
      <section>content panel 2</section>
      <section>content panel 3</section>
    </fancy-tabs>
    

And if you're wondering, the composed tree looks something like this:


    <fancy-tabs>
      #shadow-root
        <div id="tabs">
          <slot id="tabsSlot" name="title">
            <button slot="title">Title</button>
            <button slot="title" selected>Title 2</button>
            <button slot="title">Title 3</button>
          </slot>
        </div>
        <div id="panels">
          <slot id="panelsSlot">
            <section>content panel 1</section>
            <section>content panel 2</section>
            <section>content panel 3</section>
          </slot>
        </div>
    </fancy-tabs>
    

Notice our component is able to handle different configurations, but the composed DOM remains the same. I also switched from `<h2>` to `<button>`. This component was authored to handle different types of children...just like `<select>` does!

## Styling  {#styling}

There are many options for styling web components. A component that uses shadow DOM can be styled by the main page, define its own styles, or provide hooks (in the form of [CSS custom properties][css_props]) for users to override defaults.

### Scoped styles! {#scopedstyles}

Hands down the most useful feature of shadow DOM is the style scoping:

- CSS selectors from the outer page don't apply inside your component.
- Styles defined inside don't bleed out. They're scoped to the host element.

**CSS selectors used inside shadow DOM apply locally to your component**. In practice, this means we can use common id/class names again, without worrying about conflicts elsewhere on the page. Simpler CSS selectors are a best practice inside Shadow DOM. They’re also good for performance.

**Example** - CSS selectors won't collide with the outside page.


    <style>
      #panels {
        box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
        background: white;
        ...
      }
      #tabs {
        display: inline-flex;
        ...
      }
    </style>
    <div id="tabs">
      ...
    </div>
    <div id="panels">
      ...
    </div>
    

### Component-defined styles {#host}

Ever wonder how the `<select>` element renders a multi-select widget (instead of a dropdown) when you add the `multiple` attribute:

<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

`<select>` is able to style _itself_ differently based on the attributes you declare on it. Web components can style themselves too, by using the `:host` selector.

**Example** - a component styling itself


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

One gotcha with `:host` is that rules in the parent page have higher specificity than `:host` rules defined in the element. That is, outside styles win. This allows users to override your top-level styling from the outside. Also, `:host` only works in the context of a shadow root, so you can't use it outside of shadow DOM.

The functional form of `:host(<selector>)` allows you to target the host if it matches a `<selector>`. This is a great way to for your component to encapsulate behaviors that react to user interaction or state.


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
    :host(.blue) {
      color: blue;
    }
    </style>
    

### Styling based on context {#contextstyling}

`:host-context(<selector>)` matches the component if it or any of its ancestors matches `<selector>`. A common use for this is theming based on a component's surroundings. For example, many people do theming by applying a class to `<html>` or `<body>`:


    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

`:host-context(.darktheme)` would style `<fancy-tabs>` when it's a descendant of `.darktheme`:


    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()` can be useful for theming, but an even better approach is to [create style hooks using CSS custom properties](#stylehooks).

### Styling distributed nodes {#stylinglightdom}

`::slotted(<compound-selector>)` matches top-level nodes that get distributed into a `<slot>`. We can use this to style the user's light DOM.

As an example, let's say we've created a name badge component:


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

The component's shadow DOM can style the user's `<h2>` and `.title`:


    <style>
    ::slotted(h2) {
      margin: 0;
      font-weight: 300;
      color: red;
    }
    ::slotted(.title) {
       color: orange;
    }
    /* DOESN'T WORK (can only select top-level nodes).
    ::slotted(.company),
    ::slotted(.title .company) {
      text-transform: uppercase;
    }
    */
    </style>
    <slot></slot>
    

**Distributed nodes retain styles from the main page**. The reason for this, if you remember from before, is that distributed nodes remain logically in the main page. They never move. So it it makes sense that main page styles continue to apply. The difference is that distributed modes can take on additional styles that the shadow tree defines.

Another, more in-depth example from `<fancy-tabs>`:


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
        #tabs {
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
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
    

In this example, there are two slots: a named slot for the tab titles, a named slot for the  tabs content. When the user selects a tab, we bold their selection and reveal its panel. That’s done by selecting distributed nodes that have the `selected` attribute. The custom element’s JS (not shown here) adds that attribute at the correct time.

### Styling a component from the outside {#stylefromoutside}

There are a couple of ways to style a component from the outside. The easiest way is to use the tag name as a selector:


    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

Given the same specificity, **outside styles win over styles defined in shadow DOM**. For example, `fancy-tabs { width: 500px; }` trumps `<fancy-tabs>`'s own rule for itself, `:host { width: 650px;}`.

However, using the tag as a selector will only get you so far. If you want to style the internals of a component, there needs to be coordination with its author.

#### Creating style hooks using CSS custom properties {#stylehooks}

Users can tweak internal styles if the component's author provides styling hooks using [CSS custom properties][css_props]. Conceptually, the idea is similar to `<slot>`. You create "style placeholders" for users to override.

**Example** - `<fancy-tabs>` allows users to override the background color:


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --background-color: black;
      }
    </style>
    <fancy-tabs>...</fancy-tabs>
    

Inside it's shadow DOM:


    :host([background]) {
      background: var(--background-color, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

In this case, the component will use `black` as the background value since the user provided it. Otherwise, it would default to `#9E9E9E`.

Note: As the component author, you're responsible for letting developers know about CSS custom properties they can use. Consider it part of your component's public interface. Make sure to document styling hooks!


## Advanced topics {#advanced}

### Creating closed shadow roots (should avoid) {#closed}

There's another flavor of shadow DOM is called "closed" mode. When you create a closed shadow tree, outside JavaScript won't be able to access the internal DOM of your component. This is similar to how native elements like `<video>` work. JavaScript cannot access the shadow DOM of `<video>` because the browser implements it using a closed-mode shadow root.

**Example** - creating a closed shadow tree:


    let div = document.createElement('div');
    let shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

Other APIs are also affected by closed-mode:

- `Element.assignedSlot` / `TextNode.assignedSlot` returns `null`
- `Event.composedPath()` for events associated with elements inside the shadow DOM, returns []

Closed shadow roots are not very useful. Some developers will see closed mode as an artificial security feature. But let's be clear, it's **not** a security feature. Closed mode simply prevents outside JS from drilling into an element's internal DOM.
{: .wf-talkinghead }

Here's my summary of why you should never create web components with `{mode: 'closed'}`:

1. Artificial sense of security. There's nothing stopping an attacker from hijacking `Element.prototype.attachShadow`.

2. Closed mode **prevents your custom element code from accessing its own shadow DOM**. That's complete fail. Instead, you'll have to stash a reference for later if you want to use things like `querySelector()`. This completely defeats the original purpose of closed mode!

        customElements.define('x-element', class extends HTMLElement {
          constructor() {
            super(); // always call super() first in the ctor.
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = '<div class="wrapper"></div>';
          }
          connectedCallback() {
            // When creating closed shadow trees, you'll need to stash the shadow root
            // for later if you want to use it again. Kinda pointless.
            const wrapper = this._shadowRoot.querySelector('.wrapper');
          }
          ...
        });

3. **Closed mode makes your component less flexible for end users**. As you build web components, there will come a time when you forget to add a feature. A configuration option. A use case the user wants. A common example is forgetting to include adequate styling hooks for internal nodes. With closed mode, there's no way for users to override defaults and tweak styles. Being able to access the component's internals is super helpful. Ultimately, users will fork your component, find another, or create their own if it doesn't do what they want :(

### Working with slots in JS {#workwithslots}

The shadow DOM API provides utilities for working with slots and distributed nodes. These come in handy when authoring a custom element.

#### slotchange event {#slotchange}

The `slotchange` event fires when a slot's distributed nodes changes. For example, if the user adds/removes children from the light DOM.


    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    

**Note**:`slotchanged` does not fire when an instance of the component is first initiated.

To monitor other types of changes to light DOM, you can setup a [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) in your element's constructor.

#### What elements are being rendering in a slot? {#slotnodes}

Sometimes it's useful to know what elements are associated with a slot. Call `slot.assignedNodes()` to find which elements the slot is rendering. The `{flatten: true}` option will also return a slot's fallback content (if no nodes are being distributed).

As an example, let's say your shadow DOM looks like this:

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>Usage</th><th>Call</th><th>Result</th></tr></thead>
  <tr>
    <td>&lt;button is="better-button"&gt;My button&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[text]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button">&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button"&gt;&lt;/button&gt;</td>
    <td><code>slot.assignedNodes({flatten: true});</code></td>
    <td><code>[&lt;b&gt;fallback content&lt;/b&gt;]</code></td>
  </tr>
</table>

#### What slot is an element assigned to? {#assignedslot}

Answering the reverse question is also possible. `element.assignedSlot` tells you which of the component slots your element is assigned to.

### Shadow DOM's event model {#events}

Some events cross the shadow DOM boundary, some do not. In the cases where events cross the boundary, the event target is adjusted in order to maintain the encapsulation that the shadow DOM provides. That is, events are re-targeted to look like they've come from the component rather than internal elements within your shadow DOM.

Note: `event.composedPath()` will return the adjusted event path as an array nodes the event traveled through.


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

## Tips & Tricks {#tricks}

Over the years I've learned a thing or two about authoring web components. I think you'll find some of these tips useful for authoring components and debugging shadow DOM.

### Use CSS containment {#containment}

Typically, a web component's layout/style/paint is fairly self-contained. Use [CSS containment](https://developers.google.com/web/updates/2016/06/css-containment) in `:host` for a perf win:


    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

### Resetting inheritable styles {#reset}

Inheritable styles (`background`, `color`, `font`, `line-height`, etc.) continue to inherit in shadow DOM. That is, they pierce the shadow DOM boundary by default. If you want to start with a fresh slate, use `all: initial;` to reset inheritable styles to their initial value when they cross the shadow boundary.


    <style>
      div {
        padding: 10px;
        background: red;
        font-size: 25px;
        text-transform: uppercase;
        color: white;
      }
    </style>
    
    <div>
      <p>I'm outside the element (big/white)</p>
      <my-element>Light DOM content is also affected.</my-element>
      <p>I'm outside the element (big/white)</p>
    </div>
    
    <script>
    const el = document.querySelector('my-element');
    el.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        :host {
          all: initial; /* 1st rule so subsequent properties are reset. */
          display: block;
          background: white;
        }
      </style>
      <p>my-element: all CSS properties are reset to their
         initial value using <code>all: initial</code>.</p>
      <slot></slot>
    `;
    </script>
    

{% framebox height="100px" %}
  <style>
    #initialdemo {
      padding: 10px;
      background: red;
      font-size: 25px;
      text-transform: uppercase;
      color: white;
    }
  </style>

  <div id="initialdemo">
    <p>I'm outside the element (big/white)</p>
    <my-element>Light DOM content is also affected.</my-element>
    <p>I'm outside the element (big/white)</p>
  </div>
</div>

<script>
if (supportsShadowDOM()) {
  const el = document.querySelector('#initialdemo my-element');
  el.attachShadow({mode: 'open'}).innerHTML = `
    <style>
      :host {
        all: initial; /* 1st rule so subsequent properties are reset. */
        display: block;
        background: white;
      }
    </style>
    <p>my-element: all CSS properties are reset to their
       initial value using <code>all: initial</code>.</p>
    <slot></slot>
  `;
}
</script>
{% endframebox %}

### Finding all the custom elements used by a page {#finall}

Sometimes it's useful to find custom elements used on the page. To do so, you need to recursively traverse the shadow DOM of all elements used on the page.


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
    

<!--
Some browsers also support using shadow DOM v0's `/deep/` combinator in `querySelectorAll()`:


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

For now, `/deep/` [continues to work in `querySelectorAll()` calls](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).
-->

### Creating elements from a &lt;template> {#fromtemplate}

Instead of populating a shadow root using `.innerHTML`, we can use a declarative `<template>`. Templates are an ideal placeholder for declaring the structure of a web component.

See the example in "[Custom elements: building reusable web components](/web/fundamentals/primers/customelements/#fromtemplate)".

## History & browser support {#historysupport}

If you've been following web components for the last couple of years, you'll know that
Chrome 35+/Opera have been shipping shadow DOM under a different API, `element.createShadowRoot()`
instead of `element.attachShadow()`. Although Chrome will support this older version for some time, shadow DOM v0 is now considered deprecated. Shadow DOM v1 (new API) is the specification other browser vendors are implementing.

If you happen to be interested in the old v0 spec, check out the html5rocks articles: [1](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/), [2](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/), [3](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/). There's also a great comparison of the [differences between shadow DOM v0 and v1][differences].

### Browser support {#support}

Chrome 53 ([status](https://www.chromestatus.com/features/4667415417847808)), Opera 40, and Safari 10 are shipping shadow DOM v1. Edge is under consideration [with high priority](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom). Mozilla has an [open bug](https://bugzilla.mozilla.org/show_bug.cgi?id=811542) to implement.

To feature detect shadow DOM, check for the existence of `attachShadow`:


    function supportsShadowDOM() {
      return !!HTMLElement.prototype.attachShadow;
    }
    
    if (supportsShadowDOM()) {
      // Good to go!
    } else {
      // Use polyfills
    }
    

Until browser support is widely available, the [webcomponents.js polyfill](https://github.com/webcomponents/webcomponentsjs/tree/v1) is being updated to support v1.

## Conclusion

For the first time ever, we have an API primitive that does proper CSS scoping, DOM scoping, and has true composition. Combined with other web component APIs like custom elements, shadow DOM provides a way to author truly encapsulated components without hacks or using older baggage like `<iframe>`s.

Don't get me wrong. Shadow DOM is certainly a complex beast! But it's a beast worth learning. Spend some time with it. Learn it and ask questions!

#### Further reading

- [Shadow DOM v1 spec][sd_spec]
- [Differences between Shadow DOM v1 and v0][differences]
- "[Introducing Slot-Based Shadow DOM API](https://webkit.org/blog/4096/introducing-shadow-dom-api/)" from the WebKit Blog.
- [Shadow DOM 101](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/) - html5rocks.com article on v0 API
- [Custom elements v1 spec][ce_spec]
- "[Custom elements: building reusable web components][ce_article]" from Google's WebFundamentals.

## FAQ

**Can I use Shadow DOM v1 today?**

With a polyfill, yes. See [Browser support](#support).

**What security features does shadow DOM provide?**

Shadow DOM is not a security feature. It's a lightweight tool for scoping CSS
and hiding away DOM trees in component. If you want a true security boundary, use an `<iframe>`.

**Does a web component have to use shadow DOM?**

Nope! You don't have to create web components that use shadow DOM. However, authoring [custom elements that use Shadow DOM](#elements) means you can take advantage of features like CSS scoping, DOM encapsulation, and composition.

**What's the difference between open and closed shadow roots?**

See [Closed shadow roots](#closed).


[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: /web/fundamentals/primers/customelements/
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
