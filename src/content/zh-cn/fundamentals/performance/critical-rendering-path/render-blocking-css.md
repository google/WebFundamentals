project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:默认情况下，CSS 被视为阻塞渲染的资源。因此需要学习如何防止它阻塞渲染。

{# wf_updated_on:2014-09-17 #}
{# wf_published_on:2014-03-31 #}

# 阻塞渲染的 CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除对渲染的阻塞。


在[渲染树构建](render-tree-construction)中，我们看到关键渲染路径要求我们同时具有 DOM 和 CSSOM 才能构建渲染树。这会给性能造成严重影响：**HTML 和 CSS 都是阻塞渲染的资源。** HTML 显然是必需的，因为如果没有 DOM，我们就没有可渲染的内容，但 CSS 的必要性可能就不太明显。如果我们在 CSS 不阻塞渲染的情况下尝试渲染一个普通网页会怎样？

### TL;DR {: .hide-from-toc }
- 默认情况下，CSS 被视为阻塞渲染的资源。
- 我们可以通过媒体类型和媒体查询将一些 CSS 资源标记为不阻塞渲染。
- 浏览器会下载所有 CSS 资源，无论阻塞还是不阻塞。


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="使用 CSS 的纽约时报">
    <figcaption>使用 CSS 的纽约时报</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="不使用 CSS 的纽约时报">
    <figcaption>不使用 CSS 的纽约时报 (FOUC)</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

上例展示了纽约时报网站使用和不使用 CSS 的显示效果，它证明了为何要在 CSS 准备就绪之前阻塞渲染，---没有 CSS 的网页实际上无法使用。右侧的情况通常称为“内容样式短暂失效”(FOUC)。浏览器将阻塞渲染，直至 DOM 和 CSSOM 全都准备就绪。

> **_CSS 是阻塞渲染的资源。需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时间。_**

不过，如果我们有一些 CSS 样式只在特定条件下（例如显示网页或将网页投影到大型显示器上时）使用，又该如何？如果这些资源不阻塞渲染，该有多好。

我们可以通过 CSS“媒体类型”和“媒体查询”来解决这类用例：


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

[媒体查询](../../design-and-ux/responsive/#use-css-media-queries-for-responsiveness)由媒体类型以及零个或多个检查特定媒体特征状况的表达式组成。例如，上面的第一个样式表声明未提供任何媒体类型或查询，因此它适用于所有情况，也就是说，它始终会阻塞渲染。第二个样式表则不然，它只在打印内容时适用---或许您想重新安排布局、更改字体等等，因此在网页首次加载时，该样式表不需要阻塞渲染。最后，最后一个样式表声明提供由浏览器执行的“媒体查询”：符合条件时，浏览器将阻塞渲染，直至样式表下载并处理完毕。

通过使用媒体查询，我们可以根据特定用例（比如显示或打印），也可以根据动态情况（比如屏幕方向变化、尺寸调整事件等）定制外观。**声明您的样式表资产时，请密切注意媒体类型和查询，因为它们将严重影响关键渲染路径的性能。**

让我们考虑下面这些实例：


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* 第一个声明阻塞渲染，适用于所有情况。
* 第二个声明同样阻塞渲染：“all”是默认类型，如果您不指定任何类型，则隐式设置为“all”。因此，第一个声明和第二个声明实际上是等效的。
* 第三个声明具有动态媒体查询，将在网页加载时计算。根据网页加载时设备的方向，portrait.css 可能阻塞渲染，也可能不阻塞渲染。
* 最后一个声明只在打印网页时应用，因此网页首次在浏览器中加载时，它不会阻塞渲染。

最后，请注意“阻塞渲染”仅是指浏览器是否需要暂停网页的首次渲染，直至该资源准备就绪。无论哪一种情况，浏览器仍会下载 CSS 资产，只不过不阻塞渲染的资源优先级较低罢了。

<a href="adding-interactivity-with-javascript" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Adding Interactivity with JS">
  <button>下一课：使用 JavaScript 添加交互</button>
</a>


{# wf_devsite_translation #}
