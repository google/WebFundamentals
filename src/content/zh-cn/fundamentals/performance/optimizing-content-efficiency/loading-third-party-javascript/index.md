project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 第三方脚本提供了各种有用的功能，让网络更动态。学习如何优化第三方脚本的加载以降低它们对性能的影响。

{＃wf_updated_on: 2018-10-31＃} {＃wf_published_on: 2018-02-28＃} {＃wf_blink_components: Blink> JavaScript＃}

# 加载第三方JavaScript {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

{% include "web/_shared/contributors/arthurevans.html" %}

当你对你的所有代码都做了优化，但是你的页面加载还是很慢，谁是罪魁祸首呢？

通常情况下，页面加载速度降低的性能问题可以归因于第三方脚本：广告，分析，跟踪器，社交媒体按钮等。

第三方JavaScript提供了丰富实用的功能，可以使页面更加动态，互动和互联。这些脚本可能对您网站的功能或收入流至关重要。但是，第三方JavaScript也存在**许多风险** ，应该加以考虑，以**尽量减少其影响，**同时仍然提供其价值。

为什么需要[小心](https://css-tricks.com/potential-dangers-of-third-party-javascript/)第三方JavaScript？

- 它们可能是一个**性能**问题
- 他们可能是一个**隐私**问题
- 他们可能是一个**安全**问题
- 它们可能在您不知情的情况下发生**无法预测**的变化
- 他们可能会产生**意想不到的后果**

理想情况下，您需要确保第三方JavaScript不会影响[关键渲染路径](/web/fundamentals/performance/critical-rendering-path/) 。在本指南中，我们将介绍如何查找和修复与加载第三方JavaScript相关的问题。

## 第三方JavaScript是什么？

第三方JavaScript通常是指可以直接从第三方供应商嵌入到任何站点的脚本。这些脚本可以包括广告，分析，小部件和其他脚本，使Web更具动态性和交互性。

第三方脚本的示例：

- 社交分享按钮（例如Twitter，Facebook，G +）

- 视频播放器嵌入（例如YouTube，Vimeo）

- 广告iframe

- 分析和测量指标脚本

- 用于实验的A / B测试脚本

- 辅助库（例如日期格式，动画，功能库等）

<img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/images/image_0.jpg?raw=true" alt="example of a youtube video embed">

```html
<iframe
  width="560" height="315" src="https://www.youtube.com/embed/mo8thg5XGV0"
  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
</iframe>
```

其中一个例子是YouTube视频播放器嵌入脚本，允许您将视频嵌入到您的页面中。

不幸的是，嵌入第三方脚本意味着我们经常依赖它们来加快速度，而避免减慢我们的页面速度。通常情况下，第三方脚本是由您控制之外的资源引起性能下降的主要原因。

这些问题包括：

- 向多个服务器发送过多网络请求。必须发出的网络请求越多，加载所需的时间就越长。

- 请求[过多的JavaScript](/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/)会让主线程长时间过忙。太多的JavaScript可以阻止DOM构建，延迟页面渲染的速度。 CPU密集型脚本解析和执行可能会延迟用户交互并导致电池耗尽。

- 请求大量[未经优化的图像文件](/web/tools/lighthouse/audits/unoptimized-images)或视频。这可能会消耗产生大量的数据流量，给用户带来过多的流量费用。

- 加载第三方脚本可能会无意造成[单点故障](http://blog.patrickmeenan.com/2011/10/testing-for-frontend-spof.html) （SPOF）

- [HTTP缓存](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)不足，经常迫使不得不从网络中获取资源

- 缺乏足够的[服务器压缩](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)资源

- 阻止内容显示直到脚本处理完成。对于异步A/B测试脚本也是如此。

- 使用已知使用户体验[变得糟糕](/web/tools/lighthouse/audits/document-write)的旧式API（例如[document.write()](/web/updates/2016/08/removing-document-write) ）

- 过多的DOM元素或代价高昂的CSS选择器。

- 引入多个第三方嵌入脚本可能会导致多个框架和库被多次拉入。这很浪费并且会加剧性能问题。

- 第三方脚本通常使用嵌入技术，如果它们的服务器响应缓慢，将会阻止[window.onload](https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onload)的触发 ，即便嵌入资源使用了defer或async属性也是如此。

上下文很重要，对昂贵的第三方资源的解决方案可能取决于您的站点配置能力和第三方代码的加载方式。值得庆幸的是，存在许多方案和工具来查找和修复第三方资源的问题。

## 您如何识别页面上的第三方脚本？

除非您知道您的网站加载了哪些第三方脚本以及它们对性能的影响，否则无法知道如何优化它们。许多免费的网页速度测试工具可以识别出昂贵的第三方资源，包括[Chrome DevTools](https://developer.chrome.com/devtools) ， [PageSpeed Insights](/speed/pagespeed/insights/)和[WebPageTest](https://www.webpagetest.org/) 。这些工具能够提供丰富的诊断信息，告诉您站点加载*了多少*个第三方脚本，以及哪些脚本占用时间最多。

WebPageTest的Waterfull视图可以突出显示大型第三方脚本使用的影响。下面是加载网站主要内容对比跟踪营销脚本所需请求的示例（来源: [Tag Gone Wild](https://nystudio107.com/blog/tags-gone-wild) ）。

<img src="images/image_2.jpg" alt="waterfall view from webpagetest showing an
actual website vs the amount of time spent loading tracking scripts">

WebPageTest的[domain breakdown](https://www.google.com/url?q=https://www.webpagetest.org/result/180222_J4_8fee6855d6f45719e4f37d8d89ecbc20/1/domains/&sa=D&ust=1519325015196000&usg=AFQjCNGrRivilJS9yqqpombsUMQZQJx2nw)功能对于查看不同来源的第三方资源的数量也很有用。它会通过总字节数和请求数将分析结果细分总结：

<img src="images/image_3.png" alt="content breakdown by domain (first view).
Shows the percentage of requests and bytes for each third party">

当看到有问题的脚本时，您需要弄清楚脚本的作用，并问自己脚本是否真的是必需的。可以进行A/B测试以从它带来的已知价值和对关键用户或性能指标造成的影响之间作出平衡。

### Chrome DevTools第三方脚本标记

[Chrome DevTools](/web/tools/chrome-devtools/)支持在[Network面板](/web/tools/chrome-devtools/network-performance/resource-loading)中突出显示第三方资源（按产品名称）。这使您可以更深入地了解第三方资源如何在页面上发出请求，并执行代价高昂的JavaScript的.

要显示第三方资源标记，请导航至Chrome DevTools中的任意面板，然后按CMD + Shift + P以显示命令菜单。接下来输入“Show third party badges”，将会启用该功能：

<img src="images/image_4.png" alt="enabling support for the third-party badges
feature from the DevTools command menu">

当您使用Network面板记录页面加载时，它将显示包含的第三方标记，例如下面显示为绿色的“AOL广告”标记。将鼠标悬停在Network面板中的第三方标记上将显示有关该脚本的更多信息，从而帮助您确定其功能。

<img src="images/image_5.png" alt="DevTools third-party badging in the network
panel">

## 如何衡量第三方脚本对我页面的影响？

### Lighthouse 启动时间审查

Lighthouse[JavaScript启动时间审查](/web/tools/lighthouse/audits/bootup)能够突出显示具有昂贵的脚本解析，编译或执行时间的脚本。这对于发现CPU密集型第三方脚本非常有用。

<img src="images/image_6.png" alt="Lighthouse showing support for script
evaluating and parsing">

### Lighthouse 网络负载审查

Lighthouse [网络负载审查](/web/tools/lighthouse/audits/network-payloads)可以识别可能减慢页面加载时间的网络请求（包括来自第三方的请求）。避免这些请求或显示网络广告的成本可以节省用户在数据流量上的花费。

<img src="images/image_18.png" alt="Lighthouse showing support for large network
payloads">

### Chrome DevTools 网络请求阻断

Chrome DevTools允许您查看在特定脚本，样式表或其他资源不可用的情况下页面的行为表现。这是通过[禁用请求](/web/updates/2017/04/devtools-release-notes#block-requests)来完成的，该功能通过阻止(舍弃)加载页面中特定的第三方资源来帮助衡量其对页面的影响。

要启用禁用请求，请右键单击Network面板中的任何请求，然后选择“Block Request URL"”。 禁用请求标签将显示在DevTools视图中，您可以通过它管理已阻止的请求。

<img src="images/image_7.png" alt="Block request URLs from the DevTools network
panel">

### Chrome DevTools 性能面板

Chrome DevTools中的 [Performance面板](/web/tools/chrome-devtools/evaluate-performance/reference)可帮助您识别网页性能问题。单击录制按钮并加载页面会显示一个瀑布，表示您的网站花费时间。在Performance面板的底部，您将看到以[Summary](/web/tools/chrome-devtools/evaluate-performance/reference#record-load) 开头的试图。选择Bottom-Up标签。

在这里，您可以使用Bottom-Up标签中的“Group by product”选项，按照它们花费的时间对第三方资源进行分组。这有助于确定哪些第三方产品成本最高。 [Network面板](https://umaar.com/dev-tips/143-network-products/)还支持按产品突出显示请求的选项。

<img src="images/image_8.png" alt="DevTools Performance panel showing the
Bottom-up view grouped by (third-party) products">

要了解有关如何使用Chrome DevTools分析页面加载性能的更多信息，请参阅[分析运行时性能入门](/web/tools/chrome-devtools/evaluate-performance/) 。

衡量第三方脚本影响比较好的**工作流程**是：

- 使用Network面板测量加载页面所需的时间。

    - 为了模拟真实的情况，我们建议启用[网络限制](/web/tools/chrome-devtools/network-performance/#emulate)和[CPU限制](/web/updates/2017/07/devtools-release-notes#throttling) 。对于较快连接速度和桌面硬件的情况，代价高昂脚本的影响可能没有在移动设备上那样具有代表性。

- 阻断您认为存在问题的第三方脚本的URL或域名（请参阅 *Chrome DevTools Performance 面板* 以识别代价高昂的脚本）。

- 刷新页面并重新测量页面在不加载这些被阻止的第三方脚本情况下所需的时间。即你所希望看到的改进。

    - 进行3次或更多次测量并查看中位数以获得更稳定的具有价值的数据。在每次页面加载中，由于第三方内容偶尔会提供不同的资源，所以实际上您可能需要测量多种情况。 [DevTools现在支持Performance面板中的多个录制](https://twitter.com/ChromeDevTools/status/963820146388221952) ，使查看多次测量结果更容易。

### 使用WebPageTest测量第三方资源的影响

[WebPageTest](https://www.webpagetest.org/)支持阻断加载的各个请求（这对于阻断广告和第三方嵌入等内容非常有用）来衡量其对页面的影响。

在“Advanced Settings”下是“Block”标签。用于指定要阻断的域名列表，模拟它们的资源不加载时的情况。

<img src="images/image_9.png" alt="WebPageTest advanced settings < Block.
Displays a text area for specifying domains to block.">

使用此功能的工作流程是：

- 正常测试页面

- 在某些第三方资源被阻断的情况下重复测试

- 比较两个结果(注意幻灯片)。通过从[Test History](https://www.webpagetest.org/testlog/1/)标签中选择需要的结果并单击“Compare”按钮来进行比较。

<img src="images/image_10.png" alt="WebPageTest displaying the compare option
allowing you to compare two reports">

根据下面的对比，我们可以看到加载过第三方资源和第三方资源被阻止的幻灯片之间的区别。尝试对各个第三方来源进行单独测试可能很有用，可以用来确定哪些资源对页面加载性能影响最大：

<img src="images/image_11.png" alt="WebPageTest filmstrip displaying the impact
of loading a site with and without third-parties disabled">

使用WPT的“请求禁止”功能阻断第三方资源对页面的影响，来自于Andy Davies的“ [使用WebPageTest测量第三方资源的影响](https://goo.gl/jwGg6X) ”

Notes：WebPageTest还支持在DNS层运行的两个用于阻止域名请求的命令。 [blockDomains](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting#TOC-blockDomains)

- -包含需要阻止的域名列表；[blockDomainsExcept](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting#TOC-blockDomainsExcept)
- 包含需要阻止除此列表外的其他域名。

WebPageTest还有一个单点故障（SPOF）标签。这允许您模拟加载资源超时或完全失败的情况。

“SPOF”和“Block”之间的区别在于SPOF会慢慢超时。这可以使其有助于测试第三方内容的网络弹性，以确定当服务处于高负载或暂时不可用时您的页面是否可以保持良好状态。

<img src="images/image_12.png" alt="WebPageTest advanced settings > SPOF > hosts
to fail">

### 使用Long Tasks检测带来昂贵开销的iframe

当第三方iframe中的脚本需要很长时间才能运行时，它们可能阻止主线程而延迟运行其他任务。这些长任务可能导致负面的用户体验，导致事件处理程序响应缓慢或丢帧。

为了检测长任务的[Real User Monitoring](https://en.wikipedia.org/wiki/Real_user_monitoring) （RUM），我们可以使用JavaScript的 [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) API监听[longtask](/web/fundamentals/performance/user-centric-performance-metrics#long_tasks)条目。由于这些条目包含attribution属性，因此我们可以跟踪哪个帧的上下文响应了该任务。

下面是一个将`longtask`条目记录到控制台的示例，包括一个“昂贵开销”的iframe：

```html
<script>
    const observer = new PerformanceObserver((list) => {

        for (const entry of list.getEntries()) {

            // Attribution entry including "containerSrc":"https://example.com"
            console.log(JSON.stringify(entry.attribution));

        }

    });

    observer.observe({ entryTypes: ['longtask'] });
</script>

<!-- 想象这个iframe会产生longtask -->
<iframe src="https://example.com"></iframe>
```

要了解有关监控长任务的更多信息，请阅读Phil Walton的[User-centric Performance Metrics](/web/fundamentals/performance/user-centric-performance-metrics#long_tasks) 。

## 如何高效地加载第三方脚本？

如果第三方脚本减慢了页面加载速度，您可以通过多种方法来提高性能：

- 使用async或defer属性加载脚本以避免阻止文档解析。

- 如果第三方服务运行缓慢，请考虑自托管脚本。

- 如果脚本没有为您的网站带来明确的价值，请考虑删除该脚本。

- 考虑[资源提示，](/web/fundamentals/performance/resource-prioritization#preconnect)如`<link rel=preconnect>`或`<link rel=dns-prefetch>`以便为第三方脚本的域名进行DNS预解析。

### 使用async或defer

JavaScript的执行会阻塞解析。这意味着当浏览器遇到脚本时，它必须暂停DOM构造，将其交给JavaScript引擎并允许脚本执行，然后再继续构建DOM。

async和defer属性会改变此行为。

- 使用async，浏览器会在异步下载脚本时继续解析HTML文档。脚本完成下载后，在脚本执行时会阻止文档解析。

- 使用defer，浏览器会在异步下载脚本时继续解析HTML文档。并且在解析完成之前，脚本不会运行。

话不多说，上图：

<img src="images/image_13.png" alt="A visualization comparing the impact of
using script vs script async vs script defer. Defer is showing as executing
after script fetch and HTML parsing is done.">

*来源: Growing with the web*

通常情况下，您应该始终对第三方脚本使用`async`或`defer` （除非脚本执行中包含关键渲染路径所需的操作）：

- 如果在加载过程中让脚本先运行很重要，请使用`async` 。例如，这可能包括一些分析脚本。

- 对不太重要的资源使用`defer` 。例如，首屏之外的播放器。

Notes：如果性能是您首要关注的问题，您可以等到页面到用户关键时刻（例如在加载关键内容之后），然后再添加异步脚本。您还应该避免使用`async`去加载像jQuery那样的库，因为它们来自第三方CDN。

注意：在基于Blink的浏览器中， `async`和`defer`通常会[降低网络资源请求的优先级，](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc/edit#)因此它可能导致其加载时间明显晚于阻塞型脚本。这对于分析脚本特别有用。

您是否应该在没有`async`或`defer`情况下加载第三方脚本？如果脚本是您网站功能的关键部分，您可以为此做一个案例。例如，如果您从CDN加载主UI库或框架，它将被标记为DevTools中的“第三方脚本”，但应被视为您网站的重要部分，而不是附加组件。

请注意，如果使用异步方式加载，并非所有脚本都能正常工作。检查您正在使用的任何第三方脚本的文档。如果您使用的是无法异步加载的脚本，则可能需要考虑替代方法，或者尽可能舍弃脚本。某些第三方可能*强烈建议*加载其脚本同步（以优先其他脚本），即使它们可以正常工作，因此在评估加载第三方脚本的策略时应做详尽调研。

Note： `async`不是银弹。如果营销团队想要在页面上加载大量跟踪脚本，仍会导致瓶颈，这些瓶颈可能会影响用户加载页面的时间。

### 使用资源提示可减少连接建立时间

建立与第三方来源的连接可能会花费大量时间 - 尤其是在慢速网络上。许多步骤可能会导致延迟，包括DNS解析，重定向以及可能需要在每个第三方服务器间多次往返来处理请求。

您可以使用 [资源提示](/web/fundamentals/performance/resource-prioritization#preconnect) [<link rel="dns-prefetch"> 为托管第三方脚本的域名执行DNS查找。当最终发出对它们的请求时，可以节省时间，因为已经执行过DNS查找。](/web/fundamentals/performance/resource-prioritization#preconnect)

```
<link rel="dns-prefetch" href="http://example.com">
```

如果您使用资源的第三方域名使用HTTPS, 您也可以考虑 [<link rel="preconnect"> dns预解析 *和* 解决 TCP 往返和 TLS 协商时间。这些其他步骤可能非常慢，因为它们涉及 查找SSL证书以进行验证，所以如果您发现第三方连接建立时间成为问题时，请认真考虑使用资源提示。](/web/fundamentals/performance/resource-prioritization#preconnect)

```
<link rel="preconnect" href="https://cdn.example.com">
```

### iframe中的“沙盒”脚本

有些情况下，第三方脚本可以直接加载到iframe中。通过将这些脚本限制在iframe中，它们不会阻止主页面的运行。这与[AMP](https://www.ampproject.org/learn/about-how/)将JavaScript保持在[关键渲染路径](/web/fundamentals/performance/critical-rendering-path/)之外的方法相同 。请注意，此方法仍将阻止`onload`事件触发，因此请尽量不要将关键功能绑定到`onload`事件 。

Note：Chrome还在探索对[功能策略](https://www.chromestatus.com/feature/5694225681219584)的支持 - 一系列允许开发人员有选择地禁用对某些浏览器功能访问的策略。这可以防止第三方内容向网站引入不需要的行为。

### 自托管第三方脚本

如果您希望更好地控制脚本的加载情况，可以选择自托管第三方脚本。例如，如果您想减少DNS或往返时间，请改进HTTP缓存标头或利用HTTP/2服务器推送等高级技术。如果脚本被认为是关键性的，那么自托管可能是一个可行的考虑因素。

采用自托管的一些重要警告：

- 脚本可能会过时。这可能是一个大问题，因为它会阻止您在没有手动更新的情况下获得重要的安全修复程序。

- 当API有更改，自托管的脚本无法获得自动更新。比如：发布商90％的广告收入发现，由于他们的自托管脚本没有考虑API更改，广告半天没有服务，导致收入损失。

自托管脚本的替代方法是使用[Service Workers](/web/fundamentals/primers/service-workers/)来缓存它们。这可以让您更好地控制从网络重新获取它们的频率。这也可用于创建限制非必要第三方的请求的加载策略，直到页面的用户关键时刻。

### 对少量的用户群体进行A/B测试

[A/B测试](https://www.optimizely.com/optimization-glossary/ab-testing/)（或拆分测试）是一种用于试验页面的两个版本以确定哪个版本表现最佳的技术。这是通过为网站流量的不同样本启用两种变体（A和B）来完成的。其中提供更高转化率的页面将获胜。

A/B测试是分析用户体验和行为非常有用的工具。

但是，经过设计的A/B测试会延迟渲染，以确定哪个实验需要被采纳。 JavaScript通常用于检查您的用户是否属于A/B测试实验群体，然后启用正确的变体。这种模式可能导致100％的用户加载昂贵的大型脚本，即使他们不属于接受实验的群体。

在这种情况下，一个很好的替代方案是仅为您提供测试用户的一部分发送A/B测试脚本（例如10％vs100％），最好尝试在服务器端确定它们是否属于测试群体。这样可以改善大多数用户的加载体验，同时仍然可以进行拆分测试。

### 延迟加载第三方资源

嵌入式第三方资源（例如广告或视频）可能会在构建开销较高时导致页面速度变慢。延迟加载可用于仅在必要时加载嵌入的资源。例如，仅当用户向下滚动页面时才在页脚中提供的广告。另一种模式是在主页面内容加载之后但在用户可能以其他方式与页面交互之前延迟加载内容。

<img src="images/image_15.png" alt="An illustration showing assets that are
critical for the above the fold experience and those that are less critical and
can be lazily loaded in.">

Note： [LazySizes](https://github.com/aFarkas/lazysizes)是一个用于延迟加载图像和[iframe](http://afarkas.github.io/lazysizes/#examples) 的比较流行的JavaScript库。它支持YouTube嵌入和[小部件](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/unveilhooks) 。延迟加载任何资源时都需要小心，因为这种技术通常由JavaScript提供支持，可能会出现不可靠的网络连接问题。

DoubleClick在其[官方文档](https://support.google.com/dfp_premium/answer/4578089#lazyloading)中提供了有关如何加载延迟广告的指导。如果使用得当，延迟加载可以提高广告可见度的整体百分比。例如，MediaVine调整到[延迟加载广告](https://www.mediavine.com/lazy-loading-ads-mediavine-ads-load-200-faster/)，使页面加载速度提高了200％。

#### 使用Intersection Observer进行高效的延迟加载

从历史上看，用于检测元素在视口中是否可见的解决方案（为了延迟加载其内容）容易出错，而且通常会导致浏览器变得缓慢。解决方案通常会监听[scroll](https://developer.mozilla.org/en-US/docs/Web/Events/scroll)或[resize](https://developer.mozilla.org/en-US/docs/Web/Events/resize)事件，然后使用像[getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)这样的DOM API来计算元素相对于视口的位置。这虽然有效，但效率并不高。

[IntersectionObserver](/web/updates/2016/04/intersectionobserver)是一个浏览器API，它允许我们高效地检测观察到的元素何时进入或离开浏览器的视口。详细了解如何将其用于[延迟加载资源](http://deanhume.com/home/blogpost/lazy-loading-images-using-intersection-observer/10163) 。 LazySizes也提供IntersectionObserver[可选支持](https://github.com/aFarkas/lazysizes/blob/097a9878817dd17be3366633e555f3929a7eaaf1/src/lazysizes-intersection.js) 。

### 分析行为可能很复杂

分析脚本永远不应该减慢您的页面加载体验，但如果您将负载推迟太久，您可能会错过有价值的分析数据。幸运的是，有一些知名的模式可以在保留早期页面加载数据的同时延迟地启动分析执行。

Phil Walton的博客文章[The Google Analytics Setup I Use on Every Site I Build](https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/)为Google Analytics提供了此类模式。

## 使用第三方脚本时应该避免使用哪些模式？

### 避免使用document.write()

第三方脚本有时使用[document.write()](https://developer.mozilla.org/en-US/docs/Web/API/Document/write)来注入和加载脚本。对于长时间未更新的旧服务尤其如此。值得庆幸的是，许多第三方脚本提供了异步加载自身的选项，这允许加载第三方脚本时不会阻止页面上其余内容的展示。

document.write()的修复方法是不使用它来注入脚本。从Chrome 53开始，Chrome DevTools会将有问题地使用document.write()的情况通过警告记录到控制台：

<img src="images/image_16.png" alt="DevTools console warnings highlighting
violations for a third-party embed using document.write()">

要发现document.write()的大量使用，您可以检查在Chrome中发生此这种情况时记录到您的浏览器的[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) 。 [Lighthouse](/web/tools/lighthouse/)还可以在Lighthouse报告中突出显示[仍在使用document.write()](/web/tools/lighthouse/audits/document-write)的任何第三方脚本：

<img src="images/image_17.png" alt="Lighthouse Best Practices audit flagging use
of document.write()">

### 谨慎地使用标签管理器

Note：使用GTM时请务必小心。虽然它可以最大限度地减少第三方标签的开销，但对于有资格添加昂贵开销标签的任何人来说，它也是微不足道的。

“标签”是一段代码，它允许数字营销团队收集数据，设置cookie或将第三方内容（如社交媒体小部件）集成到网站中。这些标记会影响页面的加载性能 - 额外的网络请求，繁重的JavaScript依赖项，标记本身可能引入的图像和资源。

随着营销团队希望添加更多方式来理解用户和开发者尝试以最小化标签可能对用户体验产生的影响，管理这些标签可能会变得非常混乱。为了保持快速体验，我们建议使用标记管理器。标签管理器：

- 允许从一个地方（通常是用户界面）管理许多第三方嵌入代码

- 尝试降低需要部署到站点的多个第三方标记。

Note：即使可以异步加载各个标记，仍然需要单独读取和执行它们。这可能意味着在页面仍在加载时请求更多数据。标记管理器通过减少浏览器需要为其调用的次数来解决此问题。

[Google Tag Manager](https://www.google.com/analytics/tag-manager/)（GTM）是一个比较受欢迎的标签管理器：

“GTM是采用异步标签，这意味着它在执行时不会阻止其他元素在页面上呈现。它还会使通过Google跟踪代码管理器部署的其他代码进行异步部署，这意味着加载缓慢的标签不会阻止其他跟踪代码。“

标记管理器可以通过减少需要多次外部资源的调用来提高页面加载性能 - 只要您不拉取大量标签。它们还允许标签在一个独特的位置收集数据。对于GTM，这是[Data Layer](/tag-manager/devguide) 。如果多个第三方希望触发转化跟踪数据，则可以通过从Data Layer拉取数据来实现此目的。

**使用标记管理器时的风险**

使用标签管理器时，需要非常小心，以避免减慢页面加载的速度。这是因为：

- 拥有凭据和访问权限的任何人不仅可以轻松添加更多标签，还可以添加他们想要的*任何* JavaScript。尽管标记管理器可以异步加载标记，但这仍然会导致生成和执行过多的昂贵开销的HTTP请求。你可以通过仅允许一个用户发布版本来减少这种影响。

- 任何人都可以配置过多标记管理器的[自动事件侦听器](https://support.google.com/analytics/answer/6164470) 。每个自动事件监听器都需要执行，而且代码和网络请求越多，页面完全加载所需的时间就越长。通过我们的性能指导，鼓励您[在50毫秒内响应事件](/web/fundamentals/performance/rail) ，每个标签管理器的事件监听器都以此为目标。

### 避免污染全局作用域的脚本

注入未知的第三方脚本有时会加载许多它们自己的JavaScript依赖项。这可能会污染全局作用域并导致页面意外损坏。

也无法保证从第三方加载的代码将与您在测试期间看到的代码保持一致。第三方可以随时推出新功能，这可能会破坏您的页面。自我测试，以及[子资源完整性](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)和安全传输第三方代码（以降低传输中被修改的风险）可以提供帮助。

务必仔细审核您加载的第三方脚本，以确保它们表现出色。

## 缓和策略

向页面添加第三方脚本意味着对来源的信任程度。您可以采取一些策略来最小化它们对性能和安全性的影响：

- **[HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)**是必须的。通过HTTPS工作的网站不应该让第三方资源通过HTTP加载。包含使用HTTP获取的内容的HTTPS页面称为混合内容页面，并将在遇到[混合内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)警告。

- 考虑iframe上的**[sandbox属性](https://developer.mozilla.org/en/docs/Web/HTML/Element/iframe)** 。从安全角度来看，这允许您限制iframe中可用的操作。限制包括通过`allow-scripts`控制上下文是否可以运行脚本。

- 考虑**[内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)** （CSP）。通过服务器响应中的HTTP标头，您可以定义页面中受信任的行为。 CSP可用于检测和减轻某些攻击的影响，例如[跨站脚本攻击](https://en.wikipedia.org/wiki/Cross-site_scripting) （XSS）。

CSP特别强大，因为它包含诸如[script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)之类的指令，用于指定JavaScript的有效信任来源。以下是如何在实践中使用它的示例：

```

// Given this CSP header

Content-Security-Policy: script-src https://example.com/

// The following third-party script will not be loaded or executed

<script src="https://not-example.com/js/library.js"></script>
```

## 结论

由于站点依赖于比以往更多的第三方脚本，因此最重要的是不要忽略第三方脚本性能。你可以做的有：

- 熟悉一些最有效的第三方脚本优化方法，例如只加载支持异步加载模式的标签。

- 了解如何识别和修复第三方脚本加载的问题。这可以帮助您维持对页面加载性能的控制。

在第三方脚本优化之后，应该对脚本进行持续的实时性能监控，并与第三方提供商进行沟通。网络正在快速发展中，在本地观察到的脚本性能无法保证它在未来或其他地方都能表现良好。

## 进一步阅读

[Performance and Resilience: Stress-Testing Third Parties](https://csswizardry.com/2017/07/performance-and-resilience-stress-testing-third-parties/)

[Adding interactivity with JavaScript](/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)

[Potential dangers with Third-party Scripts](https://css-tricks.com/potential-dangers-of-third-party-javascript/)

[How 3rd Party Scripts can be performant citizens on the web](https://www.twnsnd.com/posts/performant_third_party_scripts.html)

[Why Fast Matters - CSS Wizardry](https://speakerdeck.com/csswizardry/why-fast-matters)

[The JavaScript Supply Chain Paradox: SRI, CSP and Trust in Third Party Libraries](https://www.troyhunt.com/the-javascript-supply-chain-paradox-sri-csp-and-trust-in-third-party-libraries/)

[Third-party CSS isn't safe](https://jakearchibald.com/2018/third-party-css-is-not-safe/)

*感谢Kenji Baheux，Jeremy Wagner，Pat Meenan，Philip Walton，Jeff Posnick和Cheney Tsai的review。*
