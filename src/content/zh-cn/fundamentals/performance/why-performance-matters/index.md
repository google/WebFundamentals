project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 由于移动设备和网络的发展，目前使用网页的人数超过以往任何时候。 而随着用户群的发展，性能的重要性也比以往突出。 阅读本文，了解性能至关重要的原因，以及如何让所有人更快地使用网页。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-03-08 #}
{# wf_blink_components: N/A #}

# 性能为何至关重要 {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

在我们共同推动网页实现更多功能的过程中，将遇到一个常见的问题：性能。
 如今，网站拥有比以往更多的功能，
 以至于许多网站都将精力用于在各种网络条件和设备上提供更高的性能。


不过，性能问题多种多样。 轻微性能问题可能只会导致微弱的延迟，给您的用户带来短暂的不便。
 而严重的性能问题可能导致您的网站完全无法访问，无法对用户输入进行响应或两者同时发生。


## 性能关乎用户的去留

我们希望用户能与我们构建的内容进行有意义的互动。 如果我们构建的是博客，我们希望用户阅读博文。
 如果是在线商店，我们希望用户购买商品。
 如果是社交网络，我们希望用户彼此互动。


性能在任何在线业务的成功方面都扮演重要角色。 以下是一些案例研究，显示了性能出色的网站与性能较差的网站相比，如何更好地与用户互动并留住用户：



- [Pinterest 的搜索引擎流量和注册人数增长 15%][pinterest]，得益于其感知等待时间减少 40%。
- [COOK 的转化率提升 7%、跳出率下降 7%，且每次会话浏览页数增加 10%][COOK]，得益于其页面平均加载时间减少 850 毫秒。



[pinterest]: https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7
[COOK]: https://www.nccgroup.trust/uk/about-us/resources/cook-real-user-monitoring-case-study/?style=Website+Performance&resources=Case+Studies

以下是两个案例研究，显示了低性能会对业务目标产生不利影响：


- [BBC 发现其网站的加载时间每增加一秒，便会多失去 10% 的用户][BBC]。
- [DoubleClick by Google 发现，如果页面加载时间超过 3 秒，53% 的移动网站访问活动将遭到抛弃][DoubleClick]。


[BBC]: https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale
[DoubleClick]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

上方引用的同一个 DoubleClick by Google 研究还表明，与加载时间约为四倍（19 秒）的网站相比，加载时间在 5 秒以内的网站会话加长 70%、跳出率下降 35%、广告可见率上升 25%。
 如需大致了解您的网站对比竞争对手的性能，[请使用 Speed Scorecard
工具](https://www.thinkwithgoogle.com/feature/mobile/)。


<figure>
  <img srcset="images/speed-scorecard-2x.png 2x, images/speed-scorecard-1x.png 1x"
src="images/speed-scorecard-1x.png" alt="Speed Scorecard 工具对比四个热门新闻媒体性能的屏幕截图。">

  <figcaption><b>图 1</b>. Speed Scorecard 借助来自美国 4G 网络用户的 Chrome UX Report 数据对比四个相互竞争网站的性能。</figcaption>


</figure>

## 性能关乎转化率的提升

留住用户对于提升转化率至关重要。 响应速度慢会对网站收入带来不利影响，反之亦然。
 以下是一些示例，显示了性能在提升业务收入方面扮演怎样的角色：



- 对于 Mobify，[首页加载时间每减少 100 毫秒，基于会话的转化率 **增加 1.11%**，年均收入增长 **近
380,000 美元**](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html)。
此外，结账页面加载时间减少 100 毫秒，基于会话的转化率 **增加 1.55%**，进而使年均收入增长 **近 530,000 美元**。
- DoubleClick 发现[网站加载时间在 5 秒内的发布商比网站加载时间在 19
秒内的发布商的**广告收入多一倍**](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)。
- [AutoAnything 的页面加载时间减少一半后，其**销售额提升 12-13%**](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/)。



如果您在网页上开展业务，性能发挥着至关重要的作用。 如果您的网站加载速度快，对用户输入响应快，则收入不会差。
 如需了解性能可能会对您的收入带来怎样的影响，请使用 [Impact
Calculator](https://www.thinkwithgoogle.com/feature/mobile/) 工具。


<figure>
  <img srcset="images/impact-calculator-2x.png 2x, images/impact-calculator-1x.png
1x" src="images/impact-calculator-1x.png" alt="Impact
Calculator 的屏幕截图，估算性能改进后网站可能获得的收入。">

  <figcaption><b>图 2</b>. Impact Calculator 估算您可以通过提升网站性能获得的收入。</figcaption>

</figure>

## 性能关乎用户体验

当您导航到某个网址时，您是从许多可能的起点开始导航。
 根据诸多条件的不同（例如连接质量和您使用的设备），您的体验和其他用户的体验可能截然不同。



<figure>
  <img src="images/speed-comparison.png" alt="页面加载的两种幻灯片卷的对比。
 第一个显示基于较慢连接加载的页面，第二个显示基于较快连接加载的同一页面。
">
  <figcaption><b>图 3</b>. 基于极慢连接加载的页面（顶部）和基于较快连接加载的页面（底部）的对比。</figcaption>

</figure>

网站开始加载时，用户需要等待一段时间才能看到要显示的内容。
 在此之前就谈不上用户体验。 快速连接会让这段时间一闪而过。
 而如果连接速度较慢，用户就不得不等待。
 页面资源加载较慢时，用户可能会遇到更多问题。


性能是创造良好用户体验的基本要素。
 当网站传输大量代码时，浏览器必须使用用户数兆字节的数据流量才能下载相应代码。
 移动设备的
CPU 计算能力和内存有限。 一些未经优化的代码，可能我们认为并没有多大，但却常使移动设备崩溃。
 这会导致性能低，进而导致无响应。
 我们深知人类的行为，用户忍受低性能的应用到一定程度后，必定会将其抛弃。
如果您想了解更多关于如何评估网站性能及寻找改进机会的信息，请查阅[_如何看待提速工具_](/web/fundamentals/performance/speed-tools/)。



<figure>
  <img srcset="images/lighthouse-2x.png 2x, images/lighthouse-1x.png 1x"
src="images/lighthouse-1x.png" alt="Lighthouse
中的页面性能概览。">
  <figcaption><b>图 4</b>. <ahref="/web/tools/lighthouse/">Lighthouse</a> 中的页面性能概览。</figcaption>

</figure>

## 性能关乎用户

性能低的网站和应用还会导致用户产生实际成本。


[随着移动用户持续占据全球互联网用户的较大比例](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet)，我们需要谨记，这些用户中的许多人都是通过移动 LTE、4G、3G，甚至 2G 网络上网。
 正如 Calibre 的 Ben Schwarz 在[此实际性能研究](https://building.calibreapp.com/beyond-the-bubble-real-world-performance-9c991dcd5342)中指出，预付费数据流量的成本正在下滑，这将使得曾经需要支付高额费用才能实现的网络访问变得更加便宜。
 移动设备和上网不再是奢侈消费。
在日益互连的世界中，它们成为进行导航和日常活动必需的常用工具。


[自 2011 起，页面总大小就开始稳步增加](http://beta.httparchive.org/reports/state-of-the-web#bytesTotal)，而这一趋势似乎将持续下去。
 随着典型页面发送的数据增多，用户必须经常为其按流量计费的数据流量续费，如此一来，用户的成本便会增加。


除了为用户省钱，速度快、负荷轻的用户体验对处在危机中的用户同样至关重要。
 医院、诊所和危机中心等公共资源提供各类在线资源，以为用户提供面临危机时需要的特定重要信息。
 [虽然紧急情况下设计在高效展示重要信息中扮演非常重要的角色](https://aneventapart.com/news/post/eric-meyer-designing-for-crisis)，但快速传达此类信息的重要性同样不可低估。
这也是我们的职责。

## 后续步骤

下方列表或许会让人望而生畏，但请记住，要提升您网站的性能并非需要您完成_所有_事项。
 这些方法仅仅是起点，不要感到无所适从！_任何_能够优化性能的做法都将为您的用户带来帮助。


### 注意您发送的资源

构建高性能应用的一个有效方法是[审核您向用户发送了_哪些_资源](/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads)。
尽管 [Chrome DevTools 的 Network 面板](/web/tools/chrome-devtools/network-performance/)汇总了给定页面使用的所有资源，但如果您之前未考虑过性能问题，可能会对从何处着手感到无所适从。
 以下是几个建议：


- 如果您使用 Bootstrap 或 Foundation 构建界面，询问自己这是否有必要。
 此类抽象方法会增加浏览器必须下载、解析和应用到页面的 CSS，而这些 CSS 均会在您网站特定的 CSS 应用于网页之前加载。
[Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
和 [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) 都擅长使用相对较少的代码创建简单和复杂的布局。
[由于 CSS 是一种阻塞渲染的资源](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)，CSS 框架的开销可能导致渲染延迟严重。
 您可以视情况移除不必要的开销，以加速渲染。
- JavaScript 库非常方便，但不一定必需。 以 jQuery
为例：得益于
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
和
[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) 等方法，元素选择得以大大简化。
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 使事件绑定得以轻松实现。
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)、[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
和
[`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
提供使用类和元素属性的简便方法。
 如果您必须使用库，不妨寻找占空间较小的替代产品。
 例如，[Zepto](http://zeptojs.com/) 是较小的 jQuery 替代产品，[Preact](https://preactjs.com/) 是替代 React 的非常小的产品。
- 并非所有网站都需要做成单页面应用 (SPA)，此类应用通常广泛使用 JavaScript。
 [JavaScript
是我们在网页上提供的最昂贵的资源](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)，因为此类资源必须经过下载、解析、编译和执行。
 例如，采用经过优化的前端架构的新闻和博客网站可以提供与传统多页面网站一样的良好性能。
 当 [HTTP
缓存](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)配置正确或者使用 [Service
Worker](/web/fundamentals/primers/service-workers/) 时尤其如此。


### 注意您发送资源的方式

高效的交付对于构建快速用户体验至关重要。

- [迁移至 HTTP/2](/web/fundamentals/performance/http2/)。 HTTP/2 可解决 HTTP/1.1 的许多固有性能问题，例如并发请求限制和缺乏标头压缩。
- [使用资源提示尽早下载资源](/web/fundamentals/performance/resource-prioritization)。
 `rel=preload` 是此类资源提示的一种，允许在浏览器发现关键资源之前提前提取这些资源。
 如果能够谨慎使用，[该资源会带来显著的积极效果](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf#0106)，有助于页面渲染，并能减少[可交互时间](/web/tools/lighthouse/audits/time-to-interactive)。
 [`rel=preconnect` 是另一个资源提示，可以在打开第三方网域托管资源的新连接时掩盖延迟](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)。
- 平均而言，现代网站传输[_大量_
JavaScript](http://httparchive.org/trends.php#bytesJS&reqJS) [和
CSS](http://httparchive.org/trends.php#bytesCSS&reqCSS)。 在 HTTP/1 环境中，常见的做法是将样式和脚本捆绑成较大软件包。
这么做是因为大量请求会对性能带来不利影响。
使用 HTTP/2 后就不需要再这么做，因为同时发送多个请求的成本更低。
 [考虑使用 webpack 中的代码拆分](https://webpack.js.org/guides/code-splitting/)来限制仅下载当前页面或视图需要的脚本数。
 将您的 CSS 拆分为较小的模板或组件专用文件，且仅在可能使用的地方纳入这些资源。



### 注意您发送的数据量

以下是限制您发送的数据_量_的一些建议：

- [压缩文本资产](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)。
源码压缩是指删除不必要的空格、评论和基于文本的资源中的其他内容。
 该方法将大大减少您发送给用户的数据量，且不会影响功能。
 [在
JavaScript 中使用丑化](https://www.npmjs.com/package/uglifyjs)，通过缩短变量和方法名称来实现更多节省。
 由于 SVG 是基于文本的图像格式，[可以使用 SVGO 进行优化](https://github.com/svg/svgo)。
- [将您的服务器配置为执行资源压缩](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)。
压缩会大大降低发送给用户的数据量，_尤其_是文本资产。
 GZIP 是常用的选项，但 [Brotli 压缩还可实现其他功能](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)。
不过，请记住，压缩_不是_解决性能问题的万能方法：
某些隐式压缩的文件格式（例如 JPEG、PNG、GIF、WOFF 等）由于已经过压缩，则不会响应压缩操作。
- [优化图像](/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)以确保您的网站尽可能发送较少的图像数据。
 [由于图像在网页上每页负载中占据较大比例](http://httparchive.org/trends.php#bytesImg&reqImg)，因此图像优化成为提升性能的独特方式。
- 如果您的时间充裕，不妨考虑提供替代图像格式。
[WebP](/speed/webp/) 受到[广泛的浏览器支持](https://caniuse.com/#feat=webp)，不但能保持高视觉质量，而且使用的数据比 JPEG 和 PNG 少。
 [JPEG XR 是另一种替代格式](https://jpeg.org/jpegxr/index.html)，受 IE 和 Edge
的支持，可提供类似的空间节省。
- [提供响应式图像](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)。
由于设备及其屏幕存在多样性，您可借此良机，发送最适合所用屏幕的图像，以提高性能。
 在最简单的用例中，您可以向 `<img>` 元素添加 [`srcset`
属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)，以指定浏览器可以选择的一组图像。
在较复杂的情况下，您可以使用 `<picture>` 帮助浏览器选择最佳格式（例如选择 WebP 而不是 JPEG 或 PNG），或同时传送适合不同屏幕尺寸的不同格式的图像。
- [使用视频而非动画
GIF](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/)。
动画 GIF 会_占用大量空间_。 同等画质的视频则_小得多_，通常低 80% 左右。
 如果您的网站大量使用动画 GIF，这可能是提升加载性能最有效的方法。
- [Client hints](http://httpwg.org/http-extensions/client-hints.html) 可以根据当前网络条件和设备特性定制资源交付。
 `DPR`、`Width` 和 `Viewport-Width` 标头可以帮助您[使用服务器端代码提供适合设备的最佳图像_并_提供更少标记](/web/updates/2015/09/automating-resource-selection-with-client-hints)。
`Save-Data` 标头可以帮助您[为有特定需求的用户提供负荷更轻的应用体验](/web/updates/2016/02/save-data)。
- [`NetworkInformation`API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) 可显示有关用户网络连接的信息。
 此类信息可用于调整网速较慢用户的应用体验。


如需查看更全面的性能优化指南，请参阅我们有关
[RAIL 性能模型](/web/fundamentals/performance/rail)的文章，其中重点介绍如何优化加载时间和应用响应速度。
 [我们的 PRPL 模式指南也是一个实用资源](/web/fundamentals/performance/prpl-pattern/)，介绍如何优化现代单页面应用的性能。




如果您想进一步了解性能以及提高网站速度的方式，请浏览我们的性能文档，获取有关各类主题的指南。
 我们会不断添加新指南并更新现有指南，请持续关注！


_特别感谢 [Addy Osmani](/web/resources/contributors/addyosmani)、[Jeff
Posnick](/web/resources/contributors/jeffposnick)、[Matt
Gaunt](/web/resources/contributors/mattgaunt)、[Philip
Walton](/web/resources/contributors/philipwalton)、[Vinamrata
Singal](/web/resources/contributors/vinamratasingal)、[Daniel
An](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
和 [Pete LePage](/web/resources/contributors/petelepage) 在完善和发布本资源过程中提供的大量反馈！_


## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
