project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:自定义元素允许网络开发者定义新的 HTML 标记、扩展现有标记并创建可重用的网络组件。

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-06-28 #}

# 自定义元素 v1：可重用网络组件 {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

借助[自定义元素][spec]，网络开发者可以**创建新的 HTML 标记**、扩展现有 HTML 标记，或者扩展其他开发者编写的组件。API 是[网络组件](http://webcomponents.org/){: .external }的基础。它提供了基于网络标准来使用原生 JS/HTML/CSS 创建可重用组件的方法。其结果是代码更精简且模块化，并且在我们的应用中的可重用性更好。

## 简介{: #intro}

注：本文说明新的<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">自定义元素 v1 规范</a>。如果您有自定义元素的使用经验，则应该了解<a href="https://www.chromestatus.com/features/4642138092470272">随 Chrome 33 提供的 v0 版</a>。这些概念是相同的，只不过 v1 规范的 API 存在一些重要差异。请继续阅读，了解新的内容。或者参阅<a href="#historysupport">历史记录和浏览器支持</a>，了解详细信息。

浏览器提供了一个用于实现结构化网络应用的良好工具。该工具称为 HTML。
您可能已经对它有所了解！它是一种声明式、可移植、受广泛支持且易于使用的工具。HTML 虽然很伟大，但其词汇和可扩展性却相当有限。[HTML 现行标准](https://html.spec.whatwg.org/multipage/){: .external }缺乏自动关联 JS 行为和标记的方法，直到今天，情况才有所改观。

自定义元素使 HTML 变得现代化；补充了缺少的部件，并将结构与行为相结合。
如果 HTML 无法为问题提供解决方案，我们可以创建自定义元素来解决。
**自定义元素在保留 HTML 优点的同时为浏览器带来新功能**。

## 定义新元素{: #define}

要定义新的 HTML 元素，我们需要 JavaScript 的帮助！

`customElements` 全局性用于定义自定义元素，并让浏览器学习新的标记。
以需要创建的标记名称调用 `customElements.define()`，并使用 JavaScript`class` 扩展基础 `HTMLElement`。


**示例** - 定义一个移动抽屉面板 `<app-drawer>`：


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);
    
    // Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});
    

示例用法：


    <app-drawer></app-drawer>
    

需要记住的是，自定义元素与 `<div>` 或任何其他元素的使用没有区别。可以在页面上声明 JavaScript 动态创建的实例，可添加事件侦听器，诸如此类。继续阅读，查看更多示例。

### 定义元素的 JavaScript API{: #jsapi}

自定义元素的功能使用 ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 来定义，它扩展了 `HTMLElement`。扩展`HTMLElement` 可确保自定义元素继承完整的 DOM API，并且添加到类的任何属性/方法都将成为元素 DOM 接口的一部分。实际上，可使用类来为标记创建**公共 JavaScript API**。




**示例：** - 定义 DOM 的 `<app-drawer>` 接口：


    class AppDrawer extends HTMLElement {
    
      // A getter/setter for an open property.
      get open() {
        return this.hasAttribute('open');
      }
    
      set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
          this.setAttribute('open', '');
        } else {
          this.removeAttribute('open');
        }
        this.toggleDrawer();
      }
    
      // A getter/setter for a disabled property.
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Can define constructor arguments if you wish.
      constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
    
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          // Don't toggle the drawer if it's disabled.
          if (this.disabled) {
            return;
          }
          this.toggleDrawer();
        });
      }
    
      toggleDrawer() {
        ...
      }
    }
    
    customElements.define('app-drawer', AppDrawer);
    

在本例中，我们创建了一个具有`open` 属性、`disabled` 属性和`toggleDrawer()` 方法的抽屉式导航栏。
它还[以 HTML 属性来反映属性](#reflectattr)。

自定义元素有一个超赞功能，即：类定义中的**`this` 引用 DOM 元素自身**，亦即类的实例。
在本例中，`this` 是指 `<app-drawer>`。这 (😉) 就是元素向自身添加 `click` 侦听器的方式！您不限于事件侦听器。完整的 DOM API 在元素代码内提供。使用 `this` 来访问元素属性、检验子项 (`this.children`) 和查询节点 (`this.querySelectorAll('.items')`) 等。

**有关创建自定义元素的规则**

1. 自定义元素的名称**必须包含短横线 (-)**。因此，`<x-tags>`、`<my-element>` 和 `<my-awesome-app>` 等均为有效名称，而 `<tabs>` 和 `<foo_bar>` 则为无效名称。这一要求使得 HTML 解析器能够区分自定义元素和常规元素。它还可确保向 HTML 添加新标记时的向前兼容性。
2. 您不能多次注册同一标记。否则，将产生 `DOMException`。让浏览器了解新标记后，它就这样定了下来。您不能撤回。
3. 自定义元素不能自我封闭，因为 HTML 仅允许[少数元素](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)自我封闭。必须编写封闭标记 (<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>)。

## 扩展元素{: #extend}

Custom Elements API 对创建新的 HTML 元素很有用，但它也可用于扩展其他自定义元素，甚至是浏览器的内置 HTML。


### 扩展自定义元素{: #extendcustomeel}

扩展其他自定义元素可通过扩展其类定义来实现。

**示例** - 创建扩展 `<app-drawer>` 的 `<fancy-app-drawer>`：


    class FancyDrawer extends AppDrawer {
      constructor() {
        super(); // always call super() first in the ctor. This also calls the extended class' ctor.
        ...
      }
    
      toggleDrawer() {
        // Possibly different toggle implementation?
        // Use ES2015 if you need to call the parent method.
        // super.toggleDrawer()
      }
    
      anotherMethod() {
        ...
      }
    }
    
    customElements.define('fancy-app-drawer', FancyDrawer);
    

### 扩展原生 HTML 元素{: #extendhtml}

假定您希望创建一个漂亮的 `<button>`。除了复制 `<button>` 的行为和功能，更好的选择是使用自定义元素逐渐增补现有元素。


**自定义内置元素**是用于扩展某个浏览器内置 HTML 标记的自定义元素。
扩展现有元素的主要好处是能获得其所有功能（DOM 属性、方法、无障碍功能）。
编写 [Progressive Web App](/web/progressive-web-apps/) 的最佳方法**是逐渐增补现有 HTML 元素**。

要扩展元素，您需要创建继承自正确 DOM 接口的类定义。
例如，扩展 `<button>` 的自定义元素需要从 `HTMLButtonElement` 而不是 `HTMLElement` 继承。
同样，扩展 `<img>` 的元素需要扩展 `HTMLImageElement`。


**示例** - 扩展 `<button>`：


    // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
    // for the list of other DOM interfaces.
    class FancyButton extends HTMLButtonElement {
      constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
      }
    
      // Material design ripple animation.
      drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight/2}px`;
        div.style.left = `${x - div.clientWidth/2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
      }
    }
    
    customElements.define('fancy-button', FancyButton, {extends: 'button'});
    

扩展原生元素时，对 `define()` 的调用会稍有不同。所需的第三个参数告知浏览器要扩展的标记。这很有必要，因为许多 HTML 标记均使用同一 DOM 接口。例如，`<section>`、`<address>` 和 `<em>`（以及其他）都使用 `HTMLElement`；`<q>` 和 `<blockquote>` 则使用 `HTMLQuoteElement`；等等。指定 `{extends: 'blockquote'}` 可让浏览器知道您创建的是增强的 `<blockquote>` 而不是 `<q>`。有关 HTML DOM 接口的完整列表，请参阅 [HTML 规范](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces)。


注：扩展 `HTMLButtonElement` 可让我们的花式按钮获得 `<button>` 的所有 DOM 属性/方法。这样，我们无需自己实现即可获得诸多功能：`disabled` 属性、`click()` 方法、`keydown` 侦听器、`tabindex` 管理等。但是，我们可以使用自定义功能（即 `drawRipple()` 方法）来逐渐增补 `<button>`。代码更少，可重用性更高！

自定义内置元素的用户有多种方法来使用该元素。他们可以通过在原生标记上添加 `is=""` 属性来声明：



    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>Fancy button!</button>
    

在 JavaScript 中创建实例：


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);
    

或者使用 `new` 运算符：


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;
    

此处为扩展 `<img>` 的另一个例子。

**示例** - 扩展 `<img>`：


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      constructor(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});
    

用户声明此组件为：


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">
    

或者在 JavaScript 中创建实例：


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass ctor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);
    

注：某些浏览器不推荐使用  <code>is=""</code> 语法。这对可访问性和渐进式增强都不是好消息。如果您认为扩展原生 HTML 元素很有用，请<a href='https://github.com/w3c/webcomponents/issues/509'>在 Github 上</a>发表您的观点。

## 自定义元素响应{: #reactions}

自定义元素可以定义特殊生命周期钩子，以便在其存续的特定时间内运行代码。
这称为**自定义元素响应**。

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>调用时机</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>创建或<a href="#upgrades">升级</a>元素的一个实例。用于初始化状态、设置事件侦听器或<a href="#shadowdom">创建 Shadow DOM</a>。参见<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">规范</a>，了解可在  <code>constructor</code> 中完成的操作的相关限制。</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行。</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>元素每次从 DOM 中移除时都会调用。用于运行清理代码（例如移除事件侦听器等）。</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>属性添加、移除、更新或替换。解析器创建元素时，或者<a href="#upgrades">升级</a>时，也会调用它来获取初始值。<b>注：</b>仅  <code>observedAttributes</code> 属性中列出的特性才会收到此回调。</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>自定义元素被移入新的  <code>document</code>（例如，有人调用了  <code>document.adoptNode(el)</code>）。</td>
    </tr>
  </tbody>
</table>

浏览器对在 `attributeChangedCallback()` 数组中添加到白名单的任何属性调用 `observedAttributes`（请参阅[保留对属性的更改](#attrchanges)）。实际上，这是一项性能优化。当用户更改一个通用属性（如 `style` 或 `class`）时，您不希望出现大量的回调。


**响应回调是同步的**。如果有人对您的元素调用 `el.setAttribute(...)`，浏览器将立即调用 `attributeChangedCallback()`。
同理，从 DOM 中移除元素（例如用户调用 `el.remove()`）后，您会立即收到 `disconnectedCallback()`。



**示例：**向 `<app-drawer>` 中添加自定义元素响应：


    class AppDrawer extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
        ...
      }
      connectedCallback() {
        ...
      }
      disconnectedCallback() {
        ...
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        ...
      }
    }
    

必要时应定义响应。如果您的元素足够复杂，并在 `connectedCallback()` 中打开 IndexedDB 的连接，请在 `disconnectedCallback()` 中执行所需清理工作。但必须小心！您不能认为您的元素任何时候都能从 DOM 中正常移除。例如，如果用户关闭了标签，`disconnectedCallback()` 将无法调用。

**示例：**将自定义元素移动到另一文档，观察其 `adoptedCallback()`：


    function createWindow(srcdoc) {
      let p = new Promise(resolve => {
        let f = document.createElement('iframe');
        f.srcdoc = srcdoc || '';
        f.onload = e => {
          resolve(f.contentWindow);
        };
        document.body.appendChild(f);
      });
      return p;
    }
    
    // 1. Create two iframes, w1 and w2.
    Promise.all([createWindow(), createWindow()])
      .then(([w1, w2]) => {
        // 2. Define a custom element in w1.
        w1.customElements.define('x-adopt', class extends w1.HTMLElement {
          adoptedCallback() {
            console.log('Adopted!');
          }
        });
        let a = w1.document.createElement('x-adopt');
    
        // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
        w2.document.body.appendChild(a);
      });
    

##  属性和特性

### 将属性 (property) 映射为特性 (attribute) {: #reflectattr}

HTML 属性通常会将其值以 HTML 特性的形式映射回 DOM。例如，如果 `hidden` 或 `id` 的值在 JS 中发生变更：



    div.id = 'my-id';
    div.hidden = true;
    

值将以特性的形式应用于活动 DOM：


    <div id="my-id" hidden>
    

这称为“[将属性映射为特性](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)”。几乎所有的 HTML 属性都会如此。为何？特性也可用于以声明方式配置元素，且无障碍功能和 CSS 选择器等某些 API 依赖于特性工作。


如果您想要**让元素的 DOM 状态与其 JavaScript 状态保持同步**，映射属性非常有用。
您可能想要映射属性的另一个原因是，用户定义的样式在 JS 状态变更时应用。


回到我们的 `<app-drawer>` 例子。此组件的用户可能会希望其灰色显示和/或停用，以避免用户交互：



    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    

`disabled` 属性在 JS 中发生变更时，我们希望该特性能添加到 DOM，以便用户选择器能匹配。
元素可通过将值映射到具有同一名称的特性上来提供该行为：



    ...
    
    get disabled() {
      return this.hasAttribute('disabled');
    }
    
    set disabled(val) {
      // Reflect the value of `disabled` as an attribute.
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this.toggleDrawer();
    }
    

### 保留对属性的更改 {: #attrchanges}

HTML 属性可方便地让用户声明初始状态：


    <app-drawer open disabled></app-drawer>
    

元素可通过定义 `attributeChangedCallback` 来对属性的更改作出响应。对于 `observedAttributes` 数组中列出的每一属性更改，浏览器都将调用此方法。



    class AppDrawer extends HTMLElement {
      ...
    
      static get observedAttributes() {
        return ['disabled', 'open'];
      }
    
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Only called for the disabled and open attributes due to observedAttributes
      attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
          this.setAttribute('tabindex', '-1');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', 'false');
        }
        // TODO: also react to the open attribute changing.
      }
    }
    

在示例中，我们在 `<app-drawer>` 属性发生变化时对 `disabled` 设置额外的属性。
虽然我们这里没有这样做，您也可以**使用 `attributeChangedCallback` 来让 JS 属性与其属性同步**。


## 元素升级 {: #upgrades}

### 渐进式增强 HTML

我们已经了解到，自定义元素通过调用 `customElements.define()` 进行定义。但这不意味着您需要一次性定义并注册自定义元素。


**自定义元素可以在定义注册之前使用**。

渐进式增强是自定义元素的一项特点。换句话说，您可以在页面声明多个 `<app-drawer>` 元素，并在等待较长的时间之后才调用 `customElements.define('app-drawer', ...)`。之所以会这样，原因是浏览器会因为存在[未知标记](#unknown)而采用不同方式处理潜在自定义元素。调用 `define()` 并将类定义赋予现有元素的过程称为“元素升级”。

要了解标记名称何时获得定义，可以使用 `window.customElements.whenDefined()`。它提供可在元素获得定义时进行解析的 Promise。



    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });
    

**示例** - 推迟生效时间，直至一组子元素升级


    <share-buttons>
      <social-button type="twitter"><a href="...">Twitter</a></social-button>
      <social-button type="fb"><a href="...">Facebook</a></social-button>
      <social-button type="plus"><a href="...">G+</a></social-button>
    </share-buttons>
    


    // Fetch all the children of <share-buttons> that are not defined yet.
    let undefinedButtons = buttons.querySelectorAll(':not(:defined)');
    
    let promises = [...undefinedButtons].map(socialButton => {
      return customElements.whenDefined(socialButton.localName);
    ));
    
    // Wait for all the social-buttons to be upgraded.
    Promise.all(promises).then(() => {
      // All social-button children are ready.
    });
    

注：我将未定义的自定义元素视为处于中间过渡状态。[规范](https://dom.spec.whatwg.org/#concept-element-custom-element-state)将元素的状态划分为“未定义”、“未自定义”或“自定义”。类似于 `<div>` 的内置元素的状态始终为“已定义”。

##  元素定义的内容{: #addingmarkup}

自定义元素通过在元素代码内部使用 DOM API 来管理其自身内容。[响应](#reactions)在这方面可起到作用。

**示例** - 使用一些默认 HTML 来创建元素：

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });
    
Declaring this tag will produce:

    <x-foo-with-markup>
     <b>I'm an x-foo-with-markup!</b>
    </x-foo-with-markup>

{% framebox height="70px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}
.demoarea::before {
  display: block;
  content: 'DEMO';
}
</style>

<div class="demoarea">
  <x-foo-with-markup></x-foo-with-markup>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-with-markup', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

注：以新内容覆盖元素的子项并非一种好的做法，因为这样做会不符合设想。用户会因为标记被舍弃而感到意外。添加元素定义内容的更好做法是使用 shadow DOM，我们接下来将讨论这一主题。

### 创建使用 Shadow DOM 的元素{: #shadowdom}

注：我不会在本文中说明 [Shadow DOM][sd_spec] 的具体功能，但它的确是一种强大的 API，可与自定义元素结合使用。
Shadow DOM 本身是一种组合工具。
它在与自定义元素结合使用时，可产生神奇的效果。


Shadow DOM 提供了一种方法，可让元素以独立于页面其余部分的方式拥有和渲染 DOM 并设置其样式。
您甚至可以使用一个标记来隐藏整个应用：



    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>
    

要在自定义元素中使用 Shadow DOM，可在 `constructor` 内调用 `this.attachShadow`。

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

示例用法：

    <x-foo-shadowdom>
      <p><b>User's</b> custom text</p>
    </x-foo-shadowdom>
    
    <!-- renders as -->
    <x-foo-shadowdom>
      <b>I'm in shadow dom!</b>
      <slot></slot>
    </x-foo-shadowdom>

{% framebox height="130px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-shadowdom>
    <p><b>User's</b> custom text</p>
  </x-foo-shadowdom>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-shadowdom', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
        <b>I'm in shadow dom!</b>
        <slot></slot>
      `;
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### 通过 `<template>` 创建元素 {: #fromtemplate}

对于不熟悉的开发者而言，[`<template>` 元素](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)让您能声明 DOM 的片段，该片段在页面加载时解析并驻留，且于后续运行时激活。它是网页组件家族中的另一 API 原语。**模板是声明自定义元素结构的理想之选**。

**示例：**注册带有使用 `<template>` 创建的 Shadow DOM 内容的元素：

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>I'm in Shadow DOM.My markup was stamped from a &lt;template&gt;.</p>
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
    

这几行代码实现了丰富的功能。让我们了解一些主要方面：

1. 我们在 HTML 中定义新的元素：`<x-foo-from-template>`
2. 元素的 Shadow DOM 使用 `<template>` 创建
3. 由于是 Shadow DOM，元素的 DOM 局限于元素本地
4. 由于是 Shadow DOM，元素的内部 CSS 作用域限于元素内

{% framebox height="100px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-from-template></x-foo-from-template>
</div>

<template id="x-foo-from-template">
  <style>:host p { color: orange; }</style>
  <p>I'm in Shadow DOM.My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#x-foo-from-template');
      shadowRoot.appendChild(t.content.cloneNode(true));
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

##  设置自定义元素样式{: #styling}

即使您的元素使用 Shadow DOM 定义了自身的样式，用户仍可通过其自己的页面来设置自定义元素的样式。
它们称为“用户定义样式”。


    <!-- user-defined styling -->
    <style>
      app-drawer {
        display: flex;
      }
      panel-item {
        transition: opacity 400ms ease-in-out;
        opacity: 0.3;
        flex: 1;
        text-align: center;
        border-radius: 50%;
      }
      panel-item:hover {
        opacity: 1.0;
        background: rgb(255, 0, 255);
        color: white;
      }
      app-panel > panel-item {
        padding: 5px;
        list-style: none;
        margin: 0 7px;
      }
    </style>
    
    <app-drawer>
      <panel-item>Do</panel-item>
      <panel-item>Re</panel-item>
      <panel-item>Mi</panel-item>
    </app-drawer>
    

您可能会问自己，如果元素在 Shadow DOM 中定义了样式，CSS 特异性如何起作用。
在特异性方面，用户样式优先。它们始终优先于元素定义的样式。
请参见[创建使用 Shadow DOM 的元素](#shadowdom)。

### 预设置未注册元素的样式{: #prestyle}

在[升级](#upgrades)元素之前，您可以在 CSS 中使用 `:defined` 伪类来将其定义为目标。这对于预设置元素样式而言很有用。
例如，您可能希望通过隐藏未定义组件并让其消失，避免它们在获得定义时产生布局或其他视觉 FOUC。



**示例** - 在定义前隐藏 `<app-drawer>`：


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    

在 `<app-drawer>` 获得定义后，选择器 (`app-drawer:not(:defined)`) 不再匹配。


## 其他详情 {: #details}

### 未知元素与未定义的自定义元素{: #unknown}

HTML 使用起来非常宽松和灵活。例如，在页面上声明 `<randomtagthatdoesntexist>`，浏览器将非常乐意接受它。为什么非标准标记可以生效？答案在于 [HTML 规范](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)允许这样。规范没有定义的元素作为 `HTMLUnknownElement` 进行解析。

自定义元素则并非如此。如果在创建时使用有效的名称（包含“-”），则潜在的自定义元素将解析为 `HTMLElement`。
您可以在支持自定义元素的浏览器中核实这一点。打开控制台：<span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span>（或者在 Mac 上，<span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span>）并粘贴下列代码行：


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true
    
    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true
    

## API 参考

全局性 `customElements` 定义了处理自定义元素的有用方法。

**`define(tagName, constructor, options)`**

在浏览器中定义新的自定义元素。

示例


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
    

**`get(tagName)`**

在给定有效自定义元素标记名称的情况下，返回元素的构造函数。如果没有注册元素定义，则返回 `undefined`。


示例


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();
    

**`whenDefined(tagName)`**

如果定义了自定义元素，则返回可解析的 Promise。如果元素已定义，则立即得到解析。
如果标记名称并非有效自定义元素名称，则拒绝


示例


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });
    

## 历史记录和浏览器支持 {: #historysupport}

如果您最近几年持续关注网络组件，您应知道 Chrome 36+ 实施的自定义元素 API 版本使用了 `document.registerElement()` 而不是 `customElements.define()`。但前者是标准的弃用版本，称为 v0。`customElements.define()` 成为现行标准并逐步获得各大浏览器厂商的支持。这称为自定义元素 v1。

如果您恰好对旧版 v0 规范感兴趣，可以看看 [html5rocks 文章](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }。

### 浏览器支持

Chrome 54（[状态](https://www.chromestatus.com/features/4696261944934400)）包含自定义元素 v1。Safari 已[开始提供原型](https://bugs.webkit.org/show_bug.cgi?id=150225)，可以在 WebKit 中对该 API 进行夜间测试。Edge 已[开始提供原型](https://twitter.com/AaronGustafson/status/717028669948977153)。Mozilla 需要处理一个[未解决的错误](https://bugzilla.mozilla.org/show_bug.cgi?id=889230)。

要检测自定义元素功能，检测是否存在 `window.customElements`：


    const supportsCustomElementsV1 = 'customElements' in window;
    

#### Polyfill {: #polyfill}

在浏览器提供广泛支持前，可以暂时使用 [polyfill](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js)。 

**注**：无法对 `:defined` CSS 伪类执行 polyfill。

安装方法：

    bower install --save webcomponents/custom-elements

用法：


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }
    
    // Lazy load the polyfill if necessary.
    if (!supportsCustomElementsV1) {
      loadScript('/bower_components/custom-elements/custom-elements.min.js').then(e => {
        // Polyfill loaded.
      });
    } else {
      // Native support.Good to go.
    }
    

##  结论

自定义元素提供了一种新工具，可让我们在浏览器中定义新 HTML 标记并创建可重用的组件。
将它们与 Shadow DOM 和 `<template>` 等新平台原语结合使用，我们可开始实现网络组件的宏大图景：

- 创建和扩展可重复使用组件的跨浏览器（网络标准）。
- 无需库或框架即可使用。原生 JS/HTML 威武！
- 提供熟悉的编程模型。仅需使用 DOM/CSS/HTML。
- 与其他网络平台功能良好匹配（Shadow DOM、`<template>`、CSS 自定义属性等）
- 与浏览器的 DevTools 紧密集成。
- 利用现有的无障碍功能。

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
