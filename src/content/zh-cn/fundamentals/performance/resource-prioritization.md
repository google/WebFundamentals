project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-01 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

<!--
  Aspect ratio CSS, Copyright 2017 Google Inc
  Maintains aspect ratio in blocks that use the class, so that content doesn't
  move around as media loads.

  Adapted from https://github.com/sgomes/css-aspect-ratio
-->
<style>
.aspect-ratio {
  /* aspect-ratio custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --aspect-ratio-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --aspect-ratio-h: 1;

  position: relative;
  max-width: 100%;
  margin-bottom: 1ex;
}

.aspect-ratio > *:first-child {
  width: 100%;
}

@supports (--custom-props: "true") {
  .aspect-ratio::before {
    display: block;
    padding-top: calc(var(--aspect-ratio-h, 1) /
        var(--aspect-ratio-w, 1) * 100%);
    content: "";
  }

  .aspect-ratio > *:first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

# 资源优先级 – 让浏览器助您一臂之力 {: .page-title }

{% include "web/_shared/contributors/sgomes.html" %}

通过网络发送到浏览器的每个字节并非都具有同等重要性，浏览器深谙此道。
 浏览器采用启发式算法，尝试对首先要加载的最重要的资源作出最佳猜测，例如先加载 CSS 然后再加载脚本和图像。



即便如此，和任何启发式算法一样，这种方式并非总是有效；浏览器可能作出错误判断，原因通常在于当下获得的信息不足。
 本文解释如何通过告知现代浏览器您稍后才需要的内容，充分影响浏览器中内容的优先级。


## 浏览器中的默认优先级

如前所述，浏览器基于自身对资源重要性的判断，为不同类型的资源分配相应的优先级。
 例如，页面 `<head>` 中的 `<script>` 标签将以
**High** 优先级（比优先级为 **Highest** 的 CSS 低）在 Chrome 中加载；但是，如果该标签具有异步属性（也就是说它能以异步方式加载和运行），其优先级将更改为 **Low**。




研究您网站的加载性能时，优先级十分重要。
除了[测量](/web/fundamentals/performance/critical-rendering-path/measure-crp)和[分析关键渲染路径](/web/fundamentals/performance/critical-rendering-path/analyzing-crp)等常用技巧外，了解 Chrome 针对各种资源的优先级也常有用。
 您可以在 Chrome 开发者工具中的 Network 面板中找到优先级的相关内容。
 请参考以下示例：


<figure>
  <div class="aspect-ratio"
       style="width:1810px; --aspect-ratio-w:1810; --aspect-ratio-h:564">
    <img src="images/res-prio-priorities.png"
    alt="优先级在 Chrome 开发者工具中的显示方式示例">
  </div>
  <figcaption><b>图 1</b>：Chrome 开发者工具中的优先级。 您可能需要右键点击 Priority 列的列标题，以启用该列。

  </figcaption>
</figure>


您可以通过这些优先级，了解浏览器为各资源分配的相对重要性。
 请记住，细微差异足以使浏览器分配不同的优先级；例如首次渲染中的图像优先级高于从屏幕外开始的图像。
 如果您想了解优先级，请阅读
[Addy Osmani 编写的这篇文章](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf){: .external}，
文中深入探讨了 Chrome 中优先级当前的状态。

当您发现任何资源标记的优先级不是您想要的优先级时，您能做什么？


本文介绍三种不同的声明式解决方案，均为比较新的
`<link>` 类型。 如果您的资源对于用户体验至关重要，但加载优先级过低，您可以尝试通过以下两种方式之一解决该问题：预加载或预连接。
 另一方面，如果您希望浏览器仅在处理完其他所有任务后再提取某些资源，请尝试进行预提取。



让我们一起来了解这三种方式！

## 预加载

`<link rel="preload">` 告知浏览器当前导航需要某个资源，应尽快开始提取。
 以下为相关使用示例：

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

您可能已经想到除“as”属性以外的大部分语法结构。
 该属性允许您告知浏览器您将加载的资源类型，以便浏览器可以正确处理该资源。
 除非资源类型设置正确，否则浏览器不会使用预加载的资源。
 浏览器将以同样的优先级加载资源，但提前了解了该资源，可以尽早开始下载。



请注意，`<link rel="preload">` 是强制浏览器执行的指令；与我们将探讨的其他资源提示不同，它是浏览器必须执行的指令，而不只是可选提示。
 因此，为确保使用该指令时不会偶然重复提取内容或提取不需要的内容，对其进行仔细测试尤其重要。



使用 `<link rel="preload">` 提取的资源如果 3 秒内未被当前页面使用，将在 Chrome 开发者工具的控制台中触发警告，请务必留意这些警告！



<figure>
  <div class="aspect-ratio"
       style="width:1050px; --aspect-ratio-w:1050; --aspect-ratio-h:244">
    <img src="images/res-prio-timeout.png"
    alt="Chrome 开发者工具中发生预加载超时错误的示例">
  </div>
</figure>

### 用例：字体

字体是典型的必须提取且次序靠后的资源示例，通常位于页面加载的若干 CSS 文件的最末尾处。


为了减少用户等待网站文本内容加载的时间，并避免系统字体与您偏好的字体发生冲突，您可以在您的 HTML 中使用 `<link rel="preload">`，让浏览器立即了解需要某种字体。




    <link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="myfont.woff2">

请注意，此处 `crossorigin` 的使用非常重要，该属性如果缺失，浏览器将忽略预加载的字体，并执行不同的提取
 这是因为浏览器预计将以匿名方式提取字体，只有使用
`crossorigin` 属性才能以匿名方式发出预加载请求。


Note: 如果您要使用 CDN（例如 Google Fonts），请确保您要预加载的字体文件与 CSS 中的字体相匹配，但由于 unicode
范围、字体粗细和字体变体的不同，可能会出现问题。
 您还可以定期更新字体，并且如果您预加载的是旧版字体，却将 CSS 用于新版字体，最终会下载同一字体的两种版本，以至于浪费用户的带宽。
 为了便于维护，不妨考虑使用 `<link rel="preconnect">`。


### 用例：关键路径 CSS 和 JavaScript

讨论页面性能时，了解“关键路径”这一概念十分有用。
关键路径是指在首次渲染之前必须加载的资源。
 这些资源（如 CSS）对于在用户的屏幕上呈现出首个画面至关重要。


以前，建议的做法是将此类内容内联到 HTML 中。
然而，对于多页面、服务器端渲染的情况，这种做法会很快导致带宽大量浪费。
 此外，由于关键代码的任意更改会导致其中内联的页面无效，因此这种做法会使版本控制难度加大。


`<link rel="preload">` 允许您继续利用单个文件版本控制和缓存的优势，同时为您提供尽快请求资源的机制。



    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

采用预加载有一个缺点：您仍然将受额外往返的约束。
造成额外往返的原因在于浏览器首先需要提取 HTML，然后才能了解后续资源。


解决额外往返的一种方式是使用
[HTTP/2](/web/fundamentals/performance/http2/#server_push)
推送，您可以在发送 HTML 的相同连接上抢占式附加关键资产。
 这种做法可以确保用户浏览器检索 HTML 和开始下载关键资产之间不存在休息时间。
 使用 HTTP/2 推送时请务必谨慎，因为这种方式能有效控制用户的带宽使用量（“服务器最了解”），为浏览器留下很小的自我决策空间，例如不检索已在其缓存中的文件。




## 预连接

`<link rel="preconnect">` 告知浏览器您的页面打算与另一个起点建立连接，以及您希望尽快启动该过程。



在速度较慢的网络中建立连接通常非常耗时，尤其是要建立安全连接时，因为这一过程可能涉及 DNS 查询、重定向以及指向处理用户请求的最终服务器的若干往返。
 提前处理好上述事宜将使您的应用提供更加流畅的用户体验，且不会为带宽的使用带来负面影响。
 建立连接所消耗的时间大部分用于等待而不是交换数据。


只需向您的页面添加一个 link
标记，便可告知浏览器您的意图：

    <link rel="preconnect" href="https://example.com">

在上述示例中，我们让浏览器知道我们打算连接到
`example.com` 并从其中检索内容。

请记住，虽然 `<link rel="preconnect">` 成本较低，但却会占用宝贵的 CPU 时间，建立安全连接时尤其如此。
 如果未在 10 秒内使用连接，情况尤为糟糕，因为当浏览器关闭连接时，所有已完成的连接都将遭到浪费。



一般而言，请尽可能使用 `<link rel="preload">`，以更加全面地提升性能，但仅在极端情况下使用 `<link rel="preconnect">`。
 我们来看两个示例。

注：实际上，还有一种与连接相关的 `<link>` 类型：
`<link rel="dns-prefetch">`。 此类型仅处理 DNS 查询，因此它属于 `<link rel="preconnect">` 的小型子集，但因其受浏览器的支持更广泛，可作为不错的回退方案。
使用方法完全一样：
`<link rel="dns-prefetch" href="https://example.com">`

### 用例：了解资源的*路径*，而不是您要提取的*资源*

由于依赖项版本受到控制，您有时会遇到这种情况：您知道您将从给定的 CDN 检索资源，但不知道其确切的路径。
 在其他情况下，可能会检索若干资源中的一个，具体视用户浏览器的媒体查询或运行时功能检查而定。


在这些情况下，如果您要提取的资源很重要，您或许可以预连接到服务器，以尽可能地节省时间。
 除非有需要（也就是您的页面以某种方式发出请求时），否则浏览器不会开始提取文件，但至少它可以提前处理连接，使用户无需等待若干往返。





### 用例：流式传输媒体

另一个您想在连接阶段节省时间但无需立即开始检索内容的示例是从不同的起点流式传输媒体。



根据您的页面处理流式传输内容的方式，您可能需要等待脚本加载完毕并准备好处理数据流。
 预连接可以在您准备好开始提取后，帮助您将等待时间缩减到单次往返。



## 预提取

`<link rel="prefetch">` 与 `<link rel="preload">` 以及
`<link rel="preconnect">` 略有不同，它并不试图使关键操作更快发生，而是利用机会使非关键操作更早发生。



这一过程的实现方式是通过告知浏览器未来导航或用户互动将需要的资源，例如，如果用户做出我们期望的行为，则表示其*可能*稍后才需要某资源。
 当前页面完成加载后，且带宽可用的情况下，这些资源将在 Chrome 中以 **Lowest** 优先级被提取。


这意味着，`prefetch` 最适合抢占用户下一步可能进行的操作并为其做好准备，例如检索结果列表中首个产品的详情页面或检索分页内容的下一页。



    <link rel="prefetch" href="page-2.html">

请记住，预提取不可递归使用。 在上方示例中，您仅可以检索 HTML；`page-2.html` 需要的任何资源将不会提前下载，除非您针对这些资源也设置明确的预提取。




### 预提取不会替换内容

值得注意的是，您不可使用 `<link rel="prefetch">` 来降低现有资源的优先级。
 在以下 HTML 中，您可能认为在预提取中声明 `optional.css` 将会降低随后的 `<link rel="stylesheet">` 的优先级：



    <html>
      <head>
        <link rel="prefetch" href="optional.css">
        <link rel="stylesheet" href="optional.css">
      </head>
      <body>
        Hello!
      </body>
    </html>

但是，实际上，这将导致您的样式表被提取两次（虽然第二次可能导致缓存命中），一次是以默认的 **Highest**
优先级，另一次是以 **Lowest** 优先级，因为预提取将启动单独的提取：



<figure>
  <div class="aspect-ratio"
       style="width:1374px; --aspect-ratio-w:1374; --aspect-ratio-h:190">
    <img src="images/res-prio-prefetch.png"
         alt="Chrome 开发者工具显示 optional.css 被提取两次的屏幕截图">

  </div>
</figure>

两次提取对于用户来说不是好事。 在这种情况下，用户不但需要等待阻塞渲染的 CSS，还可能因为下载文件两次而浪费带宽。
 请谨记，用户的带宽可能是按量计费。
 请确保全面分析您的网络请求，并留意是否存在两次提取的情况。


## 其他技巧和工具

`<link rel="preload">`、`<link rel="preconnect">` 和 `<link rel="prefetch">`（以及 `<link rel="dns-prefetch">`）以声明方式提前告知浏览器相关资源和连接，并在操作发生时根据需要资源的时间进行调整。





您还可以使用其他工具和技巧调整优先级和加载资源的时间。
 请务必继续阅读
[HTTP/2 服务器推送](/web/fundamentals/performance/http2/#server_push)；[使用 `IntersectionObserver` 延迟加载图像和其他媒体](/web/updates/2016/04/intersectionobserver)；使用媒体查询和
[loadCSS](https://github.com/filamentgroup/loadCSS) 等库[避免阻塞渲染 CSS](/web/fundamentals/performance/critical-rendering-path/render-blocking-css){: .external}；
延迟 JavaScript 提取、使用
[async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){: .external}
和
[defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer){: .external}编译和执行。

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
