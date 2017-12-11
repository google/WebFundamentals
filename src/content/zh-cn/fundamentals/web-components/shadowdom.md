project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Shadow DOM 可让网络开发者为网络组件创建独立的 DOM 和 CSS。

{# wf_updated_on: 2016-10-13 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1：独立的网络组件 {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc}

Shadow DOM 解决了构建网络应用的脆弱性问题。脆弱性是由 HTML、CSS 和 JS 的全局性引起的。
多年以来，我们发明了[多](http://getbem.com/introduction/)[个](https://github.com/css-modules/css-modules)[工具](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)来规避这些问题。例如，使用新的 HTML id/类时，无法了解是否与页面所使用的现有名称冲突。[微小错误](http://www.2ality.com/2012/08/ids-are-global.html)渐渐增多，CSS 特异性成为一个大问题（`!important` 所有的事情！），样式选择器变得失控以及[性能可能受损](/web/updates/2016/06/css-containment)，不一而足。


**Shadow DOM 修复了 CSS 和 DOM**。它在网络平台中引入**作用域样式**。
无需工具或命名约定，您即可使用原生 JavaScript **捆绑 CSS 和标记**、隐藏实现详情以及**编写独立的组件**。



## 简介{: #intro}

注：**已经很熟悉 Shadow DOM？**本文章介绍新版 <a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">Shadow DOM v1 规范</a>。如果您有 Shadow DOM 的使用经验，则应该了解 <a href="https://www.chromestatus.com/features/4507242028072960">Chrome 35 中随附的 v0 版本</a>以及 webcomponents.js polyfill。这些概念是相同的，只不过 v1 规范的 API 存在一些重要差异。此外，所有主要浏览器已确定将实现该版本，其中 Safari Tech Preview 和 Chrome Canary 已实现。请继续阅读，了解新的内容。或者参阅<a href="#historysupport">历史记录和浏览器支持</a>，了解详细信息。



Shadow DOM 是四大网络组件标准之一：[HTML 模板](https://www.html5rocks.com/en/tutorials/webcomponents/template/)、[Shadow DOM][sd_spec_whatwg]、[自定义元素](/web/fundamentals/getting-started/primers/customelements)以及 [HTML 导入](https://www.html5rocks.com/en/tutorials/webcomponents/imports/)。





您无需编写使用 shadow DOM 的网络组件。但是如果您有编写，可充分利用其各种优势（CSS 作用域、DOM 封装和组合），并构建可重复使用的[自定义元素](/web/fundamentals/getting-started/primers/customelements)，这些元素具有弹性、高度可配置且高度可重用。如果自定义元素是创建新 HTML（通过 JS API）的方式，shadow DOM 则是创建其 HTML 和 CSS 的方式。这两种 API 组合使用，通过独立的 HTML、CSS 和 JavaScript 来创建组件。


Shadow DOM 这款工具旨在构建基于组件的应用。因此，可为网络开发中的常见问题提供解决方案：


- **隔离 DOM**：组件的 DOM 是独立的（例如，`document.querySelector()` 不会返回组件 shadow DOM 中的节点）。
- **作用域 CSS**：shadow DOM 内部定义的 CSS 在其作用域内。样式规则不会泄漏，页面样式也不会渗入。
- **组合**：为组件设计一个声明性、基于标记的 API。
- **简化 CSS** - 作用域 DOM 意味着您可以使用简单的 CSS 选择器，更通用的 id/类名称，而无需担心命名冲突。
- **效率** - 将应用看成是多个 DOM 块，而不是一个大的（全局性）页面。


注：尽管您可以在网络组件之外利用 shadow DOM API 及其优势，这里我只列出一些基于自定义元素的示例。我将在所有示例中使用自定义元素 v1 API。




#### `fancy-tabs` 演示{: #demo}

在整篇文章中，我将引用演示组件 (`<fancy-tabs>`) 以及其中的代码段。
如果您的浏览器支持 API，您可以看到下面的实时演示。
否则，请查看 


<a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">Github 上的完整源代码</a>。



<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/fancy-tabs-demo.html"></iframe>
  <figcaption>
    <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
      在 Github 上查看源代码
    </a>
  </figcaption>
</figure>

##  什么是 shadow DOM？{: #what}

####  DOM 相关背景{: #sdbackground}

HTML 因其易于使用的特点驱动着网络的发展。通过声明几个标记，即可在几秒内编写一个带有图文信息和结构的页面。
但是，HTML 自身的功能并不强大。
对于我们人类而言，理解基于文本语言很容易，但是机器需要更多帮助才能理解。
因此，文档对象模型 (DOM) 应运而生。


浏览器加载网页时会做一些很有趣的事情。其中之一就是它会将编写的 HTML 转变成活动文档。为理解页面的结构，浏览器通常会将 HTML（静态文本字符串）解析为数据模型（对象/节点）。浏览器通过创建一个节点树来保留 HTML 的层次结构：DOM。
DOM 很酷的一点在于它能够生动地展示您的页面。
与我们编写的静态 HTML 不同，浏览器生成的节点包含有属性、方法，而且最棒的是可通过程序进行操作！这就是为什么我们直接使用 JavaScript 即可创建 DOM 元素的原因：



    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

生成以下 HTML 标记：


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

一切都还不错。那么，[究竟什么是 _shadow DOM_](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)？


####  影子中的 DOM{: #sddom}

Shadow DOM 与普通 DOM 相同，但有两点区别：1) 创建/使用的方式；2) 与页面其他部分有关的行为方式。
通常，您创建 DOM 节点并将其附加至其他元素作为子项。
借助于 shadow DOM，您可以创建作用域 DOM 树，该 DOM 树附加至该元素上，但与其自身真正的子项分离开来。这一作用域子树称为**影子树**。被附着的元素称为**影子宿主**。
您在影子中添加的任何项均将成为宿主元素的本地项，包括 `<style>`。
这就是 shadow DOM 实现 CSS 样式作用域的方式。


##  创建 shadow DOM {: #create}

**影子根**是附加至“宿主”元素的文档片段。元素通过附加影子根来获取其 shadow DOM。
要为元素创建 shadow DOM，请调用 `element.attachShadow()`：



    const header = document.createElement('header');
    const shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

我现在使用 `.innerHTML` 来填充影子根，不过您也可使用其他 DOM API 来实现。
这就是网络。我们可自主选择。

规范[定义了元素列表](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)，这些元素无法托管影子树，
元素之所以在所选之列，其原因如下：


- 浏览器已为该元素托管其自身的内部 shadow DOM（`<textarea>`、`<input>`）。

- 让元素托管 shadow DOM 毫无意义 (`<img>`)。

例如，以下方法行不通：


    document.createElement('input').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    

###  为自定义元素创建 shadow DOM {: #elements}

创建[自定义元素](/web/fundamentals/getting-started/primers/customelements)时，Shadow DOM 尤其有用。使用 shadow DOM 来分隔元素的 HTML、CSS 和 JS，从而生成一个“网络组件”。




**例如** - 自定义元素**将 shadow DOM 附加至其自身**，对其 DOM/CSS 进行封装：


    // Use custom elements API v1 to register a new HTML tag and define its JS behavior
    // using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
    customElements.define('fancy-tabs', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
          <div id="tabs">...</div>
          <div id="panels">...</div>
        `;
      }
      ...
    });

这里有几个有趣的事情。首先，`<fancy-tabs>` 实例创建后，自定义元素**创建其自身的 shadow DOM**。这在 `constructor()` 中完成。其次，因为我们要创建一个影子根，因此 `<style>` 中的 CSS 规则将作用域仅限于 `<fancy-tabs>`。


注：尝试运行该示例时，您可能会注意到没有任何渲染。
用户的标记似乎消失了！这是因为**元素的 shadow DOM 代替其子项被渲染**。
如果想要显示子项，您需要告诉浏览器在哪里进行渲染，具体做法是在您的 shadow DOM 中添加 [`<slot>` 元素](#slots)。

[之后](#composition_slot)将会提供相关更多内容。



##  组合和 slot{: #composition_slot}

组合是 shadow DOM 最难理解的功能之一，但可以说是最重要的功能。


在网络开发世界中，组合是指我们如何使用 HTML 来通过声明构建应用。
不同的构建块（`<div>`、`<header>`、`<form>`、`<input>`）共同构成应用。
某些标记甚至还相互合作。
组合是 `<select>`、`<details>`、`<form>` 和 `<video>` 等原生元素如此灵活的原因所在。
这些标记中的每个标记接受特定的 HTML 作为子项，并且加以特殊处理。
例如，`<select>` 知道如何将 `<option>` 和 `<optgroup>` 渲染为下拉和多选小部件。`<details>` 元素将 `<summary>` 渲染为可展开的箭头。
甚至 `<video>` 知道如何处理特定的子项：`<source>` 元素未进行渲染，但却会影响视频的行为。多么神奇！



###  术语：light DOM 与 shadow DOM {: #lightdom}

Shadow DOM 组合引入了大量与网络开发相关的新的基础知识。
为避免陷入迷茫，我们先标准化一些术语，这样我们就能讲同样的行话。


**Light DOM**

组件用户编写的标记。该 DOM 不在组件 shadow DOM 之内。
它是元素实际的子项。


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

该 DOM 是由组件的作者编写。Shadow DOM 对于组件而言是本地的，它定义内部结构、作用域 CSS 并封装实现详情。它还可定义如何渲染由组件使用者编写的标记。



    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

**扁平的 DOM 树**

浏览器将用户的 light DOM 分布到您的 shadow DOM 的结果，对最终产品进行渲染。
扁平树是指您在 DevTools 中最终看到的树以及在页面上渲染的对象。



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
    

###  &lt;slot&gt; 元素{: #slots}

Shadow DOM 使用 `<slot>` 元素将不同的 DOM 树组合在一起。**Slot 是组件内部的占位符，用户_可以_使用自己的标记来填充**。

通过定义一个或多个 slot，您可将外部标记引入到组件的 shadow DOM 中进行渲染。
这相当于您在说“在此处渲染用户的标记”。


注：Slot 是为网络组件创建“声明性 API”的一种方法。它们混入到用户的 DOM 中，帮助对整个组件进行渲染，从而**将不同的 DOM 树组合在一起**。




如果 `<slot>` 引入了元素，则这些元素可“跨越” shadow DOM 的边界。
这些元素称为**分布式节点**。从概念上来看，分布式节点似乎有点奇怪。
Slot 实际上并不移动 DOM；它们在 shadow DOM 内部的其他位置进行渲染。


组件可在其 shadow DOM 中定义零个或多个 slot。Slot 可以为空，或者提供回退内容。
如果用户不提供 [light DOM](#lightdom) 内容，slot 将对其备用内容进行渲染。



    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

您还可以创建**已命名 slot**。已命名 slot 是 shadow DOM 中用户可通过名称引用的特定槽。


**例如** - `<fancy-tabs>` shadow DOM 中的已命名 slot：


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

组件用户对 `<fancy-tabs>` 的声明类似于：


    <fancy-tabs>
      <button slot="title">Title</button>
      <button slot="title" selected>Title 2</button>
      <button slot="title">Title 3</button>
      <section>content panel 1</section>
      <section>content panel 2</section>
      <section>content panel 3</section>
    </fancy-tabs>
    
    <!-- Using <h2>'s and changing the ordering would also work! -->
    <fancy-tabs>
      <h2 slot="title">Title</h2>
      <section>content panel 1</section>
      <h2 slot="title" selected>Title 2</h2>
      <section>content panel 2</section>
      <h2 slot="title">Title 3</h2>
      <section>content panel 3</section>
    </fancy-tabs>
    

而且如果您很好奇，您会发现扁平树看起来类似于：


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
    

注意，我们的组件可处理不同的配置，但是扁平的 DOM 树保持不变。
我们还可以从 `<button>` 切换到 `<h2>`。
编写此组件的目的在于处理不同类型的子项 - 如同 `<select>` 一样。


##  设定样式  {: #styling}

有多种方式可设定网络组件的样式。使用 shadow DOM 的组件可通过主页来设定样式，定义其自己的样式或提供钩子（以 [CSS 自定义属性][css_props]的形式）让用户替换默认值。



###  组件定义的样式{: #host}

请记住，shadow DOM 最有用的功能是**作用域 CSS**：

- 外部页面中的 CSS 选择器不应用于组件内部。
- 内部定义的样式也不会渗出。它们的作用域仅限于宿主元素。

**shadow DOM 内部使用的 CSS 选择器在本地应用于组件。**。实践中，这意味着我们可再次使用一般的 id/类名称，而无需担心在页面其他位置有冲突。

最佳做法是在 Shadow DOM 内使用更简单的 CSS 选择器。
它们在性能上也不错。

**例如** - 在影子根中定义的样式是本地的


    #shadow-root
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
    

样式表的作用域也仅限于影子树：


    #shadow-root
      <!-- Available in Chrome 54+ -->
      <!-- WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=160683 -->
      <link rel="stylesheet" href="styles.css">
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

您可能想知道在您添加 `multiple` 属性时，`<select>` 元素是如何渲染多选小部件（而不是下拉工具）的：


<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

`<select>` 可基于您声明的属性为_自身_设定不同的样式。
网络组件也可通过 `:host` 选择器对自身进行样式设定。


**例如** - 组件为自身设定样式


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

使用 `:host` 的一个问题是，父页面中的规则较之在元素中定义的 `:host` 规则具有更高的特异性。
也就是说，外部样式优先。这可让用户从外部替换您的顶级样式。
此外，`:host` 仅在影子根范围内起作用，因此无法在 shadow DOM 之外使用。



如果 `:host(<selector>)` 的函数形式与 `<selector>` 匹配，您可以指定宿主。
对于您的组件而言，这是一个很好的方法，它可让您基于宿主将对用户互动或状态的反应行为进行封装，或对内部节点进行样式设定。




    <style>
    :host {
      opacity: 0.4;
      will-change: opacity;
      transition: opacity 300ms ease-in-out;
    }
    :host(:hover) {
      opacity: 1;
    }
    :host([disabled]) { /* style when host has disabled attribute. */
      background: grey;
      pointer-events: none;
      opacity: 0.4;
    }
    :host(.blue) {
      color: blue; /* color host when it has class="blue" */
    }
    :host(.pink) > #tabs {
      color: pink; /* color internal #tabs node when host has class="pink". */
    }
    </style>
    

###  基于情境设定样式{: #contextstyling}

如果 `:host-context(<selector>)` 或其任意父级与 `<selector>` 匹配，它将与组件匹配。
一个常见用途是根据组件的环境进行主题化。
例如，很多人都通过将类应用到 `<html>` 或 `<body>` 进行主题化：



    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

如果 `:host-context(.darktheme)` 为 `.darktheme` 的子级，它将对 `<fancy-tabs>` 进行样式化：



    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()` 对于主题化很有用，但更好的方法是[使用 CSS 自定义属性创建样式钩子](#stylehooks)。


###  为分布式节点设定样式{: #stylinglightdom}

`::slotted(<compound-selector>)` 与分布到 `<slot>` 中的节点匹配。


比如说我们已创建了一个 name badge 组件：


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

组件的 shadow DOM 可为用户的 `<h2>` 和 `.title` 设定样式：


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
    

如果您还记得前面的内容，就知道 `<slot>` 不会移动用户的 light DOM。节点分布于 `<slot>` 中后，`<slot>` 会对其 DOM 进行渲染，但节点实际上留在原处。**分布之前已应用的样式在分布后仍继续应用**。
但是，light DOM 分布后，它_可以_采用其他样式（通过 shadow DOM 定义的样式）。


另一个来自 `<fancy-tabs>` 的更深入的例子：


    const shadowRoot = this.attachShadow({mode: 'open'});
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
        #tabsSlot::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #panelsSlot::slotted([aria-hidden="true"]) {
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
    

在该示例中，有两个 slot：用于标签标题的命名 slot，以及用于标签内容的命名 slot。
用户选择一个标签后，我们会对其选择进行加粗并在面板上显示。
这是通过选择具有 `selected` 属性的分布式节点来实现的。
自定义元素的 JS（此处未显示）会在合适的时间添加此属性。


###  从外部为组件设定样式{: #stylefromoutside}

有几种方法可从外部为组件设定样式：最简单的方法是使用标记名称作为选择器：



    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

**外部样式总是优先于在 shadow DOM 中定义的样式**。例如，如果用户编写选择器 `fancy-tabs { width: 500px; }`，它将优先于组件的规则：`:host { width: 650px;}`。



为组件自身设定样式只能到此为止。但是如果您想要为组件内容设定样式，会发生什么情况呢？
对于这种情况，我们需要 CSS 自定义属性。


####  使用 CSS 自定义属性创建样式钩子{: #stylehooks}

如果组件的作者通过 [CSS 自定义属性][css_props]提供样式钩子，则用户可调整内部样式。
从概念上看，这与 `<slot>` 类似。
您创建“样式占位符”以便用户进行替换：

**例如** - `<fancy-tabs>` 可让用户替换背景颜色：


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --fancy-tabs-bg: black;
      }
    </style>
    <fancy-tabs background>...</fancy-tabs>
    

在其 shadow DOM 内部：


    :host([background]) {
      background: var(--fancy-tabs-bg, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

在本例中，该组件将使用 `black` 作为背景值，因为用户指定了该值。
否则，背景颜色将采用默认值 `#9E9E9E`。

注：作为组件的作者，您负责让开发者了解他们所能使用的 CSS 自定义属性。
将其看成是组件公共接口的一部分。
确保将样式钩子记录下来！


##  高级主题{: #advanced}

###  创建闭合影子根（应避免）{: #closed}

shadow DOM 的另一情况称为“闭合”模式。创建闭合影子树后，在 JavaScript 外部无法访问组件的内部 DOM。这与 `<video>` 等原生元素工作方式类似。JavaScript 无法访问 `<video>` 的 shadow DOM，因为浏览器使用闭合模式的影子根来实现。



**例如** - 创建一个闭合的影子树：


    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

其他 API 也会受到闭合模式的影响：

- `Element.assignedSlot` / `TextNode.assignedSlot` 返回 `null`
- `Event.composedPath()`，用于与 shadow DOM 内部元素关联的事件，返回 []


注：闭合的影子树不是非常有用。有些开发者将闭合模式视为一项人工安全功能。
但是让我们澄清一点，它并**不是**一项安全功能。
闭合模式只是简单地阻止外部 JS 深入到元素的内部 DOM。



任何时候都不要使用 `{mode: 'closed'}` 来创建网络组件，以下是我总结的几点原因：


1. 人为的安全功能。没有什么能够阻止攻击者入侵 `Element.prototype.attachShadow`。


2. 闭合模式**阻止自定义元素代码访问其自己的 shadow DOM**。
这根本没用。相反，如果您想要使用如 `querySelector()` 等元素，您必须存放影子根以备日后参考。
这就与闭合模式的最初目的完全背道而驰！


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

3. **闭合模式使组件对最终用户的灵活性大为降低**。在构建网络组件时，您有时可能会忘记添加某项功能、某个配置选项以及用户所需的用例。一个很常见的例子是忘记为内部节点添加足够的样式钩子。在闭合模式下，用户无法替换默认值并调整样式。
如果能访问组件的内容，这将超级有用。最终，如果用户得不到他们想要的，他们就会舍弃您的组件，寻找其他组件或创建自己的组件:(


###  在 JS 中使用 slot{: #workwithslots}

shadow DOM API 提供了使用 slot 和分布式节点的实用程序。
这些实用程序在编写自定义元素时迟早派得上用场。

####  slotchange 事件{: #slotchange}

当 slot 的分布式节点发生变化时，`slotchange` 事件会触发。例如，当用户从 light DOM 中添加/移除子项时。



    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    
注：当组件的实例首次初始化时，`slotchange` 不触发。


如要监控 light DOM 其他类型的变化，您可以在元素的构造函数中设置 [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)。



####  哪些元素在 slot 中进行渲染？{: #slotnodes}

有时候，了解哪些元素与 slot 相关联非常有用。调用 `slot.assignedNodes()` 可查看 slot 正在渲染哪些元素。
`{flatten: true}` 选项将返回 slot 的备用内容（前提是没有分布任何节点）。



举个例子，比如您的 shadow DOM 看起来像这样：

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>用法</th><th>调用</th><th>结果</th></tr></thead>
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

####  元素分配给哪个 Slot？{: #assignedslot}

这个反向问题也是可以回答的。`element.assignedSlot` 将告诉您元素分配给哪个组件 slot。


###  Shadow DOM 事件模型{: #events}

当事件从 shadow DOM 中触发时，其目标将会调整为维持 shadow DOM 提供的封装。
也就是说，事件的目标重新进行了设定，因此这些事件看起来像是来自组件，而不是来自 shadow DOM 中的内部元素。

有些事件甚至不会从 shadow DOM 中传播出去。

**确实**会跨过影子边界的事件有：

- 聚焦事件：`blur`、`focus`、`focusin`、`focusout`
- 鼠标事件：`click`、`dblclick`、`mousedown`、`mouseenter`、`mousemove`，等等
- 滚轮事件：`wheel`
- 输入事件：`beforeinput`、`input`
- 键盘事件：`keydown`、`keyup`
- 组合事件：`compositionstart`、`compositionupdate`、`compositionend`
- 拖放事件：`dragstart`、`drag`、`dragend`、`drop`，等等

**提示**

如果影子树处于打开状态，调用 `event.composedPath()` 将返回事件经过的一组节点。


####  使用自定义事件{: #customevents}

通过影子树中内部节点触发的自定义 DOM 事件不会超出影子边界，除非事件是使用 `composed: true` 标记创建的：




    // Inside <fancy-tab> custom element class definition:
    selectTab() {
      const tabs = this.shadowRoot.querySelector('#tabs');
      tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
    }
    

如果是 `composed: false`（默认值），用户无法侦听到影子根之外的事件。



    <fancy-tabs></fancy-tabs>
    <script>
      const tabs = document.querySelector('fancy-tabs');
      tabs.addEventListener('tab-select', e => {
        // won't fire if `tab-select` wasn't created with `composed: true`.
      });
    </script>
    

### 处理焦点{: #focus}

如果您从 [shadow DOM 的事件模型](#events)重新调用，将对在 shadow DOM 内部触发的事件进行调整，使其看起来来自宿主元素。例如，我们假设您点击某个影子根内部的 `<input>`：




    <x-focus>
      #shadow-root
        <input type="text" placeholder="Input inside shadow dom">
    

`focus` 事件看起来来自 `<x-focus>`，而不是 `<input>`。
与此类似，`document.activeElement` 将是 `<x-focus>`。如果影子根使用 `mode:'open'` 创建（请参阅[闭合模式](#closed)），您还可以访问获得焦点的外部节点：



    document.activeElement.shadowRoot.activeElement // only works with open mode.

如果存在多个级别的 shadow DOM（即自定义元素位于另一个自定义元素中），您需要以递归方式深入影子根以查找 `activeElement`：




    function deepActiveElement() {
      let a = document.activeElement;
      while (a && a.shadowRoot && a.shadowRoot.activeElement) {
        a = a.shadowRoot.activeElement;
      }
      return a;
    }
    

焦点的另一个选项是 `delegatesFocus: true` 选项，它可以将元素的焦点行为拓展到影子树内：


- 如果您点击 shadow DOM 内的某个节点，且该节点不是一个可聚焦区域，那么第一个可聚焦区域将成为焦点。
- 当 shadow DOM 内的节点获得焦点时，除了聚焦的元素外，`:focus` 还会应用到宿主。


**示例** - `delegatesFocus: true` 如何更改焦点行为


    <style>
      :focus {
        outline: 2px solid red;
      }
    </style>
    
    <x-focus></x-focus>
    
    <script>
    customElements.define('x-focus', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
    
        const root = this.attachShadow({mode: 'open', delegatesFocus: true});
        root.innerHTML = `
          <style>
            :host {
              display: flex;
              border: 1px dotted black;
              padding: 16px;
            }
            :focus {
              outline: 2px solid blue;
            }
          </style>
          <div>Clickable Shadow DOM text</div>
          <input type="text" placeholder="Input inside shadow dom">`;
    
        // Know the focused element inside shadow DOM:
        this.addEventListener('focus', function(e) {
          console.log('Active element (inside shadow dom):',
                      this.shadowRoot.activeElement);
        });
      }
    });
    </script>
    

**结果**

<img src="imgs/delegateFocusTrue.png" title="delegatesFocus: true behavior">

上面是 `<x-focus>` 获得焦点（用户点击、点按和 `focus()` 等）、点击“Clickable Shadow DOM text”或内部 `<input>` 获得焦点（包括 `autofocus`）时的结果。



如果是设置 `delegatesFocus: false`，下面将是您看到的结果：

<figure>
  <img src="imgs/delegateFocusFalse.png">
  <figcaption>
    <code>delegatesFocus: false</code> 和内部  <code>&lt;input></code> 获得焦点。
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusFalseFocus.png">
  <figcaption>
    <code>delegatesFocus: false</code> 和  <code>&lt;x-focus></code> 获得焦点（例如， <code>tabindex="0"</code>）。
  </figcaption>
</figure>


<figure>
  <img src="imgs/delegateFocusNothing.png">
  <figcaption>
    <code>delegatesFocus: false</code> 并且点击“Clickable Shadow DOM text”（或点击元素 shadow DOM 内的其他空白区域）。
  </figcaption>
</figure>


##  提示与技巧{: #tricks}

这些年，我学到了一些关于编写网络组件的技巧。我觉得这些技巧对于编写组件和调试 shadow DOM 会比较有用。



###  使用 CSS 组件{: #containment}

通常，网络组件的布局/样式/绘制相当独立。在 `:host` 中使用 [CSS containment](/web/updates/2016/06/css-containment) 可获得更好性能：




    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

###  重置可继承样式{: #reset}

可继承样式（`background`、`color`、`font` 以及 `line-height` 等）可在 shadow DOM 中继续继承。
也就是说，默认情况下它们会突破 shadow DOM 边界。
如果您想从头开始，可在它们超出影子边界时，使用 `all: initial;` 将可继承样式重置为初始值。



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

{% framebox height="195px" %}
<div class="demoarea">
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
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}

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
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

###  查找页面所使用的所有自定义元素{: #findall}

有时，查找页面所使用的自定义元素非常有用。为此，您需要递归地遍历页面所使用的所有元素的 shadow DOM。



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
    

{% comment %}
Some browsers also support using shadow DOM v0's `/deep/` combinator in `querySelectorAll()`:


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

For now, `/deep/` [continues to work in `querySelectorAll()` calls](https://bugs.chromium.org/p/chromium/issues/detail?id=633007).
{% endcomment %}

###  使用 &lt;template> 创建元素{: #fromtemplate}

我们不是使用 `.innerHTML` 来填充影子根，而是使用一个声明性 `<template>`。
模板是用于声明网络组件结构的理想占位符。


具体请参见[“自定义元素：构建可重复使用的网络组件”](/web/fundamentals/getting-started/primers/customelements)中的示例。


##  历史记录和浏览器支持{: #historysupport}

如果最近几年您一直在关注网络组件，您会发现有一段时间 Chrome 35+/Opera 随附的是旧版本 shadow DOM。Blink 将继续在一段时间内同时支持新旧两种版本。
v0 规范提供了创建影子根的不同方法（`element.createShadowRoot`，而不是 v1 的 `element.attachShadow`）。
调用旧方法仍可通过 v0 语法来创建影子根，因此现有的 v0 代码不会出错。



如果您想了解旧版 v0 规范，可查看 html5rocks 文章：[1](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)、[2](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)、[3](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)。[shadow DOM v0 与 v1 的差异][differences]中也提供了大量的二者比较信息。







###  浏览器支持{: #support}

Chrome 53（[状态](https://www.chromestatus.com/features/4667415417847808)）、Opera 40 和 Safari 10 随附的是 shadow DOM v1。
Edge 在考虑中，但[优先级很高](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/)。Mozilla 需要处理一个[未解决的错误](https://bugzilla.mozilla.org/show_bug.cgi?id=811542)。




如希望获得 shadow DOM 检测功能，请查看是否存在 `attachShadow`：


    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
    

    
#### Polyfill {: #polyfill}

在浏览器提供广泛支持前，[shadydom](https://github.com/webcomponents/shadydom) 和 [shadycss](https://github.com/webcomponents/shadycss) polyfill 可以为您提供 v1 功能。Shady DOM 可以模拟 Shadow DOM 的 DOM 作用域，而 shadycss polyfill 则可以模拟原生 API 提供的 CSS 自定义属性和样式作用域。


安装 polyfill：

    bower install --save webcomponents/shadydom
    bower install --save webcomponents/shadycss

使用 polyfill：


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.async = true;
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }

    // Lazy load the polyfill if necessary.
    if (!supportsShadowDOMV1) {
      loadScript('/bower_components/shadydom/shadydom.min.js')
        .then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
        .then(e => {
          // Polyfills loaded.
        });
    } else {
      // Native shadow dom v1 support. Go to go!
    }


请参阅 [https://github.com/webcomponents/shadycss#usage](https://github.com/webcomponents/shadycss)，了解有关如何对您的样式进行填充/作用域设置的说明。



##  结论

有史以来第一次，我们拥有了实施适当 CSS 作用域、DOM 作用域的 API 原语，并且有真正意义上的组合。
与自定义元素等其他网络组件 API 组合后，shadow DOM 提供了一种编写真正封装组件的方法，无需花多大的功夫或使用如 `<iframe>` 等陈旧的东西。



不要误会我的意思。Shadow DOM 无疑是一个复杂的巨兽！值得我们去学习。
请花一些时间来研究。认真学习并积极提问！

####  深入阅读

- [Shadow DOM v1 与 v0 的差异][differences]
- [“基于 Slot 的 Shadow DOM API 简介”](https://webkit.org/blog/4096/introducing-shadow-dom-api/)（出自 WebKit 博客）。
- [网络组件和模块化 CSS 之未来](https://philipwalton.github.io/talks/2015-10-26/)（作者：[Philip Walton](https://twitter.com/@philwalton)）
- [“自定义元素：构建可重复使用的网络组件”](/web/fundamentals/getting-started/primers/customelements)（出自：Google 的 WebFundamentals）。
- [Shadow DOM v1 规范][sd_spec_whatwg]
- [自定义元素 v1 规范][ce_spec]

##  常见问题解答

**我今天可以使用 Shadow DOM v1 吗？**

如果有 polyfill，那么是的，您可以使用。请参见[浏览器支持](#support)。

**shadow DOM 提供哪些安全功能？**

Shadow DOM 不是一项安全功能。它是一款轻量级工具，用于限定作用域 CSS 并在组件中隐藏 DOM 树。
如果您需要一个真正的安全边界，请使用 `<iframe>`。


**网络组件是否必须使用 shadow DOM？**

不是！您无需创建使用 shadow DOM 的网络组件。但是，编写[使用 Shadow DOM 的自定义元素](#elements)意味着您可以利用其功能，例如 CSS 作用域、DOM 封装以及组合。



**开放的影子根与闭合的影子根有何不同？**

请参阅[闭合的影子根](#closed)。

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: (/web/fundamentals/getting-started/primers/customelements)
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[sd_spec_whatwg]: https://dom.spec.whatwg.org/#shadow-trees
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables


{# wf_devsite_translation #}
