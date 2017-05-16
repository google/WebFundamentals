project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:学习发现和解决关键渲染路径性能瓶颈。

{# wf_updated_on:2014-04-27 #}
{# wf_published_on:2014-03-31 #}

# 分析关键渲染路径性能 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

发现和解决关键渲染路径性能瓶颈需要充分了解常见的陷阱。
让我们踏上实践之旅，找出常见的性能模式，从而帮助您优化网页。




优化关键渲染路径能够让浏览器尽可能快地绘制网页：更快的网页渲染速度可以提高吸引力、增加网页浏览量以及[提高转化率](https://www.google.com/think/multiscreen/success.html)。为了最大程度减少访客看到空白屏幕的时间，我们需要优化加载的资源及其加载顺序。

为帮助说明这一流程，让我们先从可能的最简单情况入手，逐步构建我们的网页，使其包含更多资源、样式和应用逻辑。在此过程中，我们还会对每一种情况进行优化，以及了解可能出错的环节。

到目前为止，我们只关注了资源（CSS、JS 或 HTML 文件）可供处理后浏览器中会发生的情况，而忽略了从缓存或从网络获取资源所需的时间。我们作以下假设：

* 到服务器的网络往返（传播延迟时间）需要 100 毫秒。
* HTML 文档的服务器响应时间为 100 毫秒，所有其他文件的服务器响应时间均为 10 毫秒。

## Hello World 体验

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

我们将从基本 HTML 标记和单个图像（无 CSS 或 JavaScript）开始。让我们在 Chrome DevTools 中打开 Network 时间线并检查生成的资源瀑布：

<img src="images/waterfall-dom.png" alt=""  alt="CRP">

注：尽管本文档使用 DevTools 说明 CRP 概念，DevTools 当前并不非常适合 CRP 分析。
如需了解详细信息，请参阅 [DevTools 如何？](measure-crp#devtools)。


正如预期的一样，HTML 文件下载花费了大约 200 毫秒。请注意，蓝线的透明部分表示浏览器在网络上等待（即尚未收到任何响应字节）的时间，而不透明部分表示的是收到第一批响应字节后完成下载的时间。HTML 下载量很小 (<4K)，我们只需单次往返便可获取整个文件。因此，获取 HTML 文档大约需要 200 毫秒，其中一半的时间花费在网络等待上，另一半花费在等待服务器响应上。

当 HTML 内容可用后，浏览器会解析字节，将它们转换成令牌，然后构建 DOM 树。请注意，为方便起见，DevTools 会在底部报告 DOMContentLoaded 事件的时间（216 毫秒），该时间同样与蓝色垂直线相符。HTML 下载结束与蓝色垂直线 (DOMContentLoaded) 之间的间隔是浏览器构建 DOM 树所花费的时间 &mdash; 在本例中仅为几毫秒。

请注意，我们的“趣照”并未阻止 `domContentLoaded` 事件。这证明，我们构建渲染树甚至绘制网页时无需等待页面上的每个资产：**并非所有资源都对快速提供首次绘制具有关键作用**。事实上，当我们谈论关键渲染路径时，通常谈论的是 HTML 标记、CSS 和 JavaScript。图像不会阻止页面的首次渲染，不过，我们当然也应该尽力确保系统尽快绘制图像！

即便如此，系统还是会阻止图像上的 `load` 事件（也称为 `onload`）：DevTools 会在 335 毫秒时报告 `onload` 事件。回想一下，`onload` 事件标记的点是网页所需的**所有资源**均已下载并经过处理的点，这是加载微调框可以在浏览器中停止微调的点（由瀑布中的红色垂直线标记）。


## 结合使用 JavaScript 和 CSS

我们的“Hello World 体验”页面虽然看起来简单，但背后却需要做很多工作。在实践中，我们还需要 HTML 之外的其他资源：我们可能需要 CSS 样式表以及一个或多个用于为网页增加一定交互性的脚本。让我们将两者结合使用，看看效果如何：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_timing.html){: target="_blank" .external }

_添加 JavaScript 和 CSS 之前：_

<img src="images/waterfall-dom.png" alt="DOM CRP" >

_添加 JavaScript 和 CSS 之后：_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM、JS" >

添加外部 CSS 和 JavaScript 文件将额外增加两个瀑布请求，浏览器差不多会同时发出这两个请求。不过，**请注意，现在 `domContentLoaded` 事件与 `onload` 事件之间的时间差小多了。**

这是怎么回事？

* 与纯 HTML 示例不同，我们还需要获取并解析 CSS 文件才能构建 CSSOM，要想构建渲染树，DOM 和 CSSOM 缺一不可。
* 由于网页上还有一个阻止 JavaScript 文件的解析器，系统会在下载并解析 CSS 文件之前阻止 `domContentLoaded` 事件：因为 JavaScript 可能会查询 CSSOM，我们必须在下载 CSS 文件之前将其阻止，然后才能执行 JavaScript。

**如果我们用内联脚本替换外部脚本会怎样？**即使直接将脚本内联到网页中，浏览器仍然无法在构建 CSSOM 之前执行脚本。简言之，内联 JavaScript 也会阻止解析器。

不过，尽管内联脚本会阻止 CSS，但这样做是否能加快页面渲染速度呢？让我们尝试一下，看看会发生什么。

_外部 JavaScript：_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM、JS" >

_内联 JavaScript：_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM、CSSOM 和内联 JS" >

我们减少了一个请求，但 `onload` 和 `domContentLoaded` 时间实际上没有变化。为什么呢？怎么说呢，我们知道，这与 JavaScript 是内联的还是外部的并无关系，因为只要浏览器遇到 script 标记，就会进行阻止，并等到 CSSOM 构建完毕。此外，在我们的第一个示例中，浏览器是并行下载 CSS 和 JavaScript，并且差不多是同时完成。在此实例中，内联 JavaScript 代码并无多大意义。但是，我们可以通过多种策略加快网页的渲染速度。

首先回想一下，所有内联脚本都会阻止解析器，但对于外部脚本，我们可以添加“async”关键字来解除对解析器的阻止。让我们撤消内联，尝试一下这种方法：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_async.html){: target="_blank" .external }

_阻止解析器的（外部）JavaScript：_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM、JS" >

_异步（外部）JavaScript：_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM、CSSOM、异步 JS" >

效果好多了！解析 HTML 之后不久即会触发 `domContentLoaded` 事件；浏览器已得知不要阻止 JavaScript，并且由于没有其他阻止解析器的脚本，CSSOM 构建也可同步进行了。

或者，我们也可以同时内联 CSS 和 JavaScript：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_inlined.html){: target="_blank" .external }

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM、内联 CSS、内联 JS" >

请注意，`domContentLoaded` 时间与前一示例中的时间实际上相同；只不过没有将 JavaScript 标记为异步，而是同时将 CSS 和 JS 内联到网页本身。这会使 HTML 页面显著增大，但好处是浏览器无需等待获取任何外部资源，网页已经内置了所有资源。

如您所见，即便是非常简单的网页，优化关键渲染路径也并非轻而易举：我们需要了解不同资源之间的依赖关系图，我们需要确定哪些资源是“关键资源”，我们还必须在不同策略中做出选择，找到在网页上加入这些资源的恰当方式。这一问题不是一个解决方案能够解决的，每个页面都不尽相同。您需要遵循相似的流程，自行找到最佳策略。

不过，我们可以回过头来，看看能否找出某些常规性能模式。

## 性能模式

最简单的网页只包括 HTML 标记；没有 CSS，没有 JavaScript，也没有其他类型的资源。要渲染此类网页，浏览器需要发起请求，等待 HTML 文档到达，对其进行解析，构建 DOM，最后将其渲染在屏幕上：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

<img src="images/analysis-dom.png" alt="Hello world CRP" >

**T<sub>0</sub> 与 T<sub>1</sub> 之间的时间捕获的是网络和服务器处理时间。**在最理想的情况下（如果 HTML 文件较小），我们只需一次网络往返便可获取整个文档。由于 TCP 传输协议工作方式的缘故，较大文件可能需要更多次的往返。**因此，在最理想的情况下，上述网页具有单次往返（最少）关键渲染路径。**

现在，我们还以同一网页为例，但这次使用外部 CSS 文件：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css.html){: target="_blank" .external }

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" >

我们同样需要一次网络往返来获取 HTML 文档，然后检索到的标记告诉我们还需要 CSS 文件；这意味着，浏览器需要返回服务器并获取 CSS，然后才能在屏幕上渲染网页。**因此，这个页面至少需要两次往返才能显示出来。**CSS 文件同样可能需要多次往返，因此重点在于“最少”。

让我们定义一下用来描述关键渲染路径的词汇：

* **关键资源：** 可能阻止网页首次渲染的资源。
* **关键路径长度：** 获取所有关键资源所需的往返次数或总时间。
* **关键字节：** 实现网页首次渲染所需的总字节数，它是所有关键资源传送文件大小的总和。我们包含单个 HTML 页面的第一个示例包含一项关键资源（HTML 文档）；关键路径长度也与 1 次网络往返相等（假设文件较小），而总关键字节数正好是 HTML 文档本身的传送大小。


现在，让我们将其与上面 HTML + CSS 示例的关键路径特性对比一下：

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" >

* **2** 项关键资源
* **2** 次或更多次往返的最短关键路径长度
* **9** KB 的关键字节

我们同时需要 HTML 和 CSS 来构建渲染树。所以，HTML 和 CSS 都是关键资源：CSS 仅在浏览器获取 HTML 文档后才会获取，因此关键路径长度至少为两次往返。两项资源相加共计 9KB 的关键字节。

现在，让我们向组合内额外添加一个 JavaScript 文件。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js.html){: target="_blank" .external }

我们添加了 `app.js`，它既是网页上的外部 JavaScript 资产，又是一种解析器阻止（即关键）资源。更糟糕的是，为了执行 JavaScript 文件，我们还需要进行阻止并等待 CSSOM；回想一下，JavaScript 可以查询 CSSOM，因此在下载 `style.css` 并构建 CSSOM 之前，浏览器将会暂停。

<img src="images/analysis-dom-css-js.png" alt="DOM、CSSOM、JavaScript CRP" >

即便如此，如果我们实际查看一下该网页的“网络瀑布”，就会注意到 CSS 和 JavaScript 请求差不多是同时发起的；浏览器获取 HTML，发现两项资源并发起两个请求。因此，上述网页具有以下关键路径特性：

* **3** 项关键资源
* **2** 次或更多次往返的最短关键路径长度
* **11** KB 的关键字节

现在，我们拥有了三项关键资源，关键字节总计达 11 KB，但我们的关键路径长度仍是两次往返，因为我们可以同时传送 CSS 和 JavaScript。**了解关键渲染路径的特性意味着能够确定哪些是关键资源，此外还能了解浏览器如何安排资源的获取时间。**让我们继续探讨示例。

在与网站开发者交流后，我们意识到我们在网页上加入的 JavaScript 不必具有阻止作用：网页中的一些分析代码和其他代码不需要阻止网页的渲染。了解了这一点，我们就可以向 script 标记添加“async”属性来解除对解析器的阻止：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-js-async.png" alt="DOM、CSSOM、异步 JavaScript CRP" >

异步脚本具有以下几个优点：

* 脚本不再阻止解析器，也不再是关键渲染路径的组成部分。
* 由于没有其他关键脚本，CSS 也不需要阻止 `domContentLoaded` 事件。
* `domContentLoaded` 事件触发得越早，其他应用逻辑开始执行的时间就越早。

因此，我们优化过的网页现在恢复到了具有两项关键资源（HTML 和 CSS），最短关键路径长度为两次往返，总关键字节数为 9 KB。

最后，如果 CSS 样式表只需用于打印，那会如何呢？

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_nb_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM、非阻止 CSS 和异步 JavaScript CRP" >

因为 style.css 资源只用于打印，浏览器不必阻止它便可渲染网页。所以，只要 DOM 构建完毕，浏览器便具有了渲染网页所需的足够信息。因此，该网页只有一项关键资源（HTML 文档），并且最短关键渲染路径长度为一次往返。

<a href="optimizing-critical-rendering-path" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Optimizing CRP">
  <button>下一课：优化关键渲染路径</button>
</a>


{# wf_devsite_translation #}
