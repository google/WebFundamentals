project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:保持较低的 JavaScript 网络传输以及解析/编译成本，确保页面快速进行交互。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# JavaScript 启动优化 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

在构建严重依赖 JavaScript 的网站时，我们有时会在不知不觉中为所发送的内容付出代价。
 在本文中，我们将说明当您希望网站在移动设备上快速加载和交互时，遵守几项**规则**的重要性。
 减少传递的 JavaScript 数量意味着减少网络传输时间、解压缩代码的成本以及花费在解析和编译 JavaScript 上的时间。



## 网络

大部分开发者在考虑 JavaScript 的成本时，考虑的都是**下载和执行成本**。
 通过网络发送较多的 JavaScript 字节时，用户的连接越慢，花费的时间就越长。


<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="当浏览器请求资源时，需要先提取该资源，然后将其解压缩。
 对于 JavaScript 等资源，必须先进行解析和编译，然后才能执行资源。"/>



这可能会成为一个问题，即使在第一世界国家也是如此，因为用户的**有效网络连接类型**实际上可能不是 3G、4G 或 Wi-Fi。
 您可能使用的是咖啡店的 Wi-Fi，但连接到 2G 速度的蜂窝热点。


您可以通过以下方法**降低** JavaScript 的网络传输成本：

* **仅发送用户所需的代码**。
    * 使用[代码拆分](/web/updates/2017/06/supercharged-codesplit)将 JavaScript 分解成关键部分和非关键部分。
 [webpack](https://webpack.js.org) 等模块捆绑程序支持[代码拆分](https://webpack.js.org/guides/code-splitting/)。
    * 延迟加载非关键代码。
* **源码压缩**
    * 使用 [UglifyJS](https://github.com/mishoo/UglifyJS) 来[压缩](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)
ES5 代码。
    * 使用 [babel-minify](https://github.com/babel/minify) 或
[uglify-es](https://www.npmjs.com/package/uglify-es) 来压缩 ES2015+。
* **压缩**
    * 至少使用
[gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip)
来压缩基于文本的资源。
    * 考虑使用
[Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
      ~[q11](https://twitter.com/paulcalvano/status/924660429846208514)。 Brotli
在压缩比率方面优于 gzip， 已帮助 CertSimple 节省
[17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30) 的压缩 JS 字节大小，并且帮助 LinkedIn 节省 [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression) 的加载时间。



* **移除未使用的代码**。
    * 识别可以使用 [DevTools 代码覆盖](/web/updates/2017/04/devtools-release-notes#coverage)来移除或延迟加载代码的机会。
    * 使用
[babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
和 browserlist，避免转译现代浏览器中已有的功能。
      高级开发者可能会发现仔细[分析其 webpack 软件包](https://github.com/webpack-contrib/webpack-bundle-analyzer)有助于找到裁减非必要依赖项的机会。
    * 要删除代码，请查看 [tree-shaking](https://webpack.js.org/guides/tree-shaking/)、[Closure Compiler](/closure/compiler/) 的高级优化和库裁剪插件（例如 [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash)）或者 webpack 的 [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js)（适用于 Moment.js 等库）。






* **缓存代码以最大限度减少网络往返次数。**
    * 使用 [HTTP
缓存](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)来确保浏览器缓存有效响应。
 确定脚本的最佳生命周期 (max-age)，并提供验证令牌 (ETag) 以避免传输未更改的字节。
    * Service Worker 缓存可使您的应用网络更有弹性，并允许您对 [V8 的代码缓存](https://v8project.blogspot.com/2015/07/code-caching.html)等功能进行 Eager 访问。
    * 使用长期缓存以避免重新提取尚未更改的资源。
 如果您使用 Webpack，请参阅[文件名哈希](https://webpack.js.org/guides/caching/)。


## 解析/编译

下载 JavaScript 之后，JS
引擎**解析/编译**此代码的时间成为 JavaScript **最大的**成本之一。 在 [Chrome
DevTools](/web/tools/chrome-devtools/) 中，解析和编译是 Performance 面板中黄色“脚本”时间的一部分。


<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png"/>

Bottom-Up 和 Call Tree 选项卡显示确切的解析/编译时间：

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"/> <figcaption> Chrome
DevTools Performance 面板 > Bottom-Up。 启用 V8 的 Runtime Call Stats 后，我们可以看到在解析和编译等阶段花费的时间</figcaption></figure>


注：Performance 面板对 Runtime Call Stats 的支持目前处于实验阶段。
若要启用支持，请转到 chrome://flags/#enable-devtools-experiments -> 重新启动 Chrome ->
转到 DevTools -> Settings -> Experiments -> 按 Shift 6 次 -> 勾选名为 `Timeline: V8 Runtime Call Stats on Timeline` 的选项，然后关闭再重新打开 DevTools。


但是，为什么该支持很重要？

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png"/>

花费很长时间来解析/编译代码会严重推迟用户与网站交互的时间。
 发送的 JavaScript 越多，在网站可进行交互之前就要花费越长的时间来解析和编译。


> 就字节而言，**浏览器处理 JavaScript 的成本高于
> 相同大小的图像或网页字体** - Tom Dale

与 JavaScript 相比，处理相同大小的图像涉及多项成本（仍要对其进行解码！），但在普通移动硬件上，JS 更有可能对页面的交互性产生负面影响。



<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"/> <figcaption>JavaScript
与图像字节的成本大不相同。 在解码和光栅化图像的过程中，通常不会阻止主线程或界面交互。
 但是，JS 可能会因为解析、编译和执行成本而延迟交互。</figcaption> </figure>


谈及解析和编译的速度较慢时，需要考虑环境；在这里，我们谈论的是**普通**手机。
 **普通用户使用的可能是 CPU 和 GPU 速度缓慢、没有 L2/L3 缓存，甚至内存量也很有限的手机。**



> 网络能力与设备能力并不总是相称。 拥有高速光纤连接的用户
> 不一定使用最好的 CPU 来
> 解析和评估发送到其所用设备上的 JavaScript。 反过来也是如此，网络连接速度慢，但是 CPU 速度很快。
 - Kristofer
> Baxter，LinkedIn

我们可以从下图中看到在低端和高端硬件上解析大约 1MB 解压缩（简单）JavaScript 的成本。
 **就市面上速度最快的手机与普通手机而言，解析/编译代码所花费的时间有 2 到 5 倍的差距**。


<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"/> <figcaption>此图表突出显示在不同等级的桌面设备和移动设备上，1MB 的 JavaScript 软件包（gzip 压缩大小约为 250KB）的解析时间。
 查看解析成本时，要考虑的是解压缩后的数字，例如，大约 250KB 的 gzip 压缩 JS 解压缩为大约 1MB 的代码。</figcaption> </figure>



在 CNN.com 等实际网站上情况如何？

**在高端 iPhone 8 上，只需大约 4 秒即可解析/编译 CNN 的 JS，而在 Moto G4 等普通手机上，需花费大约 13 秒的时间**。
 这会显著影响用户与此网站完全交互的速度。


<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"/> <figcaption>上图将 Apple 的 A11 仿生芯片的性能与普通 Android 硬件上的 Snapdragon 617 作对比，显示各自的解析时间。</figcaption> </figure>



此图着重强调务必在**普通**硬件（例如，Moto
G4）上进行测试，而不仅仅在您所用手机上进行测试，这一点很重要。 但是，环境也很重要：**请针对您的设备和网络情况进行优化。**


<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"/> <figcaption>Google
Analytics 可以帮助您了解实际用户用来访问网站的<ahref="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">移动设备等级</a>。
 这样，您就有机会了解用户实际的 CPU/GPU 限制情况。</figcaption> </figure>




**我们是否确实发送了过多的 JavaScript？不见得如此 :)**

通过使用 HTTP Archive（大约前 50 万个网站）来分析[移动设备上的
JavaScript](http://beta.httparchive.org/reports/state-of-javascript#bytesJs) 状态，我们可以看到，50% 的网站需要经过 14 秒以上的时间才能交互。
 这些网站用来解析和编译 JS 的时间就多达 4 秒。


<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png"/>

考虑到提取和处理 JS 及其他资源所花费的时间，用户会觉得需要等待片刻才能使用页面也不足为奇。
 在这方面，我们绝对可以做得更好。

**从页面中移除非关键 JavaScript 可以减少传输时间、CPU 密集型解析和编译以及潜在的内存开销。
 这也有助于加快页面的交互速度。**


## 执行时间

并不是只有解析和编译会产生成本。 **执行 JavaScript**（在解析/编译后运行代码）是必须在主线程中执行的其中一项操作。
 较长的执行时间也可能会推迟用户与您网站交互的时间。


<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png"/>

> 如果执行脚本所花费的时间超过 50 毫秒，那么交互时间就会因为下载、编译和执行 JS 所需的
> *全部*时间而推迟 -
> Alex Russell

为解决此问题，可以将 JavaScript 分成**小型代码段**，以避免锁定主线程。
 了解您能否减少执行期间完成的工作量。


## 其他成本

JavaScript 可以在其他方面影响页面性能：

* 内存。 页面可能会因为 GC（垃圾回收）而出现卡顿或频繁暂停现象。
 当浏览器收回内存时，就会暂停执行 JS，因此频繁收集垃圾的浏览器会导致暂停执行的频率超出我们的容忍程度。
 请避免[内存泄漏](/web/tools/chrome-devtools/memory-problems/)和频繁的 GC 暂停，以消除页面卡顿。
* 在运行时，长时间运行的 JavaScript 可能会阻塞主线程，从而导致页面无响应。
 将工作分为较小的块（使用 <code><a
  href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
  或 <code><a
  href="/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
  排程）可以最大限度减少无响应问题。

## 减少 JavaScript 交付成本的模式

如果您想保持较短的 JavaScript 解析/编译及网络传输时间，不妨试试基于路由的分块或
[PRPL](/web/fundamentals/performance/prpl-pattern/) 等模式。


### PRPL

PRPL（推送、渲染、预先缓存、延迟加载）是一种通过激进代码拆分和缓存来优化交互性的模式：


<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png"/>

上图直观地呈现出 PRPL 的影响。

我们使用
V8 的 Runtime Call Stats 来分析热门移动网站和渐进式网页应用的加载时间。 正如我们所见，许多网站都将大部分的时间用在解析（以橙色显示）上：


<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png"/>

[Wego](https://www.wego.com) 网站使用 PRPL 来保持较短的路由解析时间，从而快速进行交互。
 上述许多其他网站采用代码拆分和性能预算来尝试降低其 JS 成本。




### 渐进式引导

许多网站以交互性为代价来优化内容可见性。 为在确实有大型 JavaScript 软件包时快速进行首次绘制，开发者有时会利用服务器端渲染；然后将其“升级”，以便最终提取 JavaScript 时附加事件处理程序。




请慎重思考，因为这种方法自身也会产生成本。 您 1) 通常会发送*大型* HTML
响应，这可能会推动交互性，2) 也可能会让用户处于“恐怖谷”，即在 JavaScript 完成处理之前，半数体验实际上都没有交互性。



或许渐进式引导是更好的方法。 发送具有最低限度功能的页面（仅由当前路由所需的 HTML/JS/CSS 组成）。
当有更多资源到达时，应用可以进行延迟加载，并解锁更多功能。

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"/> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">渐进式引导</a>，发布人：Paul Lewis</figcaption> </figure>


加载与视图中显示的内容成比例的代码是诀窍所在。 PRPL
和渐进式引导模式可以帮助您实现这一点。

## 结论

**传输大小对于低端网络极为关键。 在 CPU 处理能力有限的设备上，解析时间十分重要。
 应该尽量降低这两个指标。**

某些团队已成功通过采用严格的性能预算来保持较短的
JavaScript 传输和解析/编译时间。 请参阅 Alex Russell 的“[您能否承受？：
真实的网络性能预算](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)”，以获取有关适用于移动设备的预算指南。



<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"/> <figcaption>最好考虑一下我们所作的架构决策有多少 JS“余量”可供我们用于应用逻辑。</figcaption> </figure>



如果您正在构建面向移动设备的网站，请尽量在有代表性的硬件上进行开发，保持较短的 JavaScript 解析/编译时间，并采用性能预算来确保团队能够密切关注其 JavaScript 成本。




## 了解详情

* [Chrome 开发峰会 2017 - 现代加载最佳做法](https://www.youtube.com/watch?v=_srJ7eHS3IM)
* [JavaScript 启动性能](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
* [解决网络性能危机](https://nolanlawson.github.io/frontendday-2016/) - Nolan Lawson
* [您能否承受？真实的性能预算](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/) - Alex Russell
* [评估网络框架和库](https://twitter.com/kristoferbaxter/status/908144931125858304) -
Kristofer Baxter
* [Cloudflare 的 Brotli 压缩实验结果](https://blog.cloudflare.com/results-experimenting-brotli/)（请注意，较高质量的动态 Brotli 会导致初始页面渲染延迟，因此务必谨慎评估。
 您可能想改为使用静态压缩。）
* [性能的未来](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5) - Sam Saccone


