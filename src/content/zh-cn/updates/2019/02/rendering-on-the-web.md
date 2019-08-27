project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"

{# wf_updated_on: 2019-08-27 #} {# wf_published_on: 2019-02-06 #} {# wf_tags: fundamentals, performance, app-shell #} {# wf_featured_image: /web/updates/images/2019/02/rendering-on-the-web/icon.png #} {# wf_featured_snippet: Where should we implement logic and rendering in our applications? Should we use Server Side Rendering? What about Rehydration? Let's find some answers! #} {# wf_blink_components: N/A #}

# 在网上渲染{: .page-title }

{% include "web/_shared/contributors/developit.html" %} {% include "web/_shared/contributors/addyosmani.html" %}

作为开发人员，我们经常面临影响应用程序整个架构的决策。 Web开发人员必须做出的核心决策之一是在应用程序中实现逻辑和呈现的位置。这可能很困难，因为有许多不同的方法来构建网站。

我们对这一领域的理解来自于我们在过去几年中与大型网站交流的Chrome工作。从广义上讲，我们鼓励开发人员考虑通过完全补液方法进行服务器渲染或静态渲染。

为了更好地理解我们在做出这个决定时所选择的架构，我们需要对每种方法和在谈论它们时使用的一致术语有充分的理解。这些方法之间的差异有助于说明通过性能镜头在Web上呈现的权衡。

## 术语{: #terminology }

**渲染**

- **SSR：**服务器端呈现 - 将客户端或通用应用程序呈现为服务器上的HTML。
- **CSR：**客户端渲染 - 通常使用DOM在浏览器中呈现应用程序。
- **补液：**在客户端上“启动”JavaScript视图，以便它们重用服务器呈现的HTML的DOM树和数据。
- **预渲染：**运行在编译的时候一个客户端应用程序，以获取其初始状态为静态HTML。

**性能**

- **TTFB：**第一个字节的时间 - 被视为点击链接和第一个内容之间的时间。
- **FP：** First Paint  - 第一次任何像素变得对用户可见。
- **FCP：** First Contentful Paint  - 请求内容（文章正文等）变得可见的时间。
- **TTI：**交互时间 - 页面变为交互的时间（连接的事件等）。

## 服务器渲染{: #server-rendering }

*服务器呈现为服务器上的页面生成完整的HTML以响应导航。这避免了在客户端上进行数据获取和模板化的额外往返，因为它是在浏览器获得响应之前处理的。*

服务器渲染通常会产生快速的[First Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) （FP）和[First Contentful Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) （FCP）。在服务器上运行页面逻辑和呈现可以避免向客户端发送大量JavaScript，这有助于实现快速[交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) （TTI）。这是有道理的，因为通过服务器渲染，您实际上只是向用户的浏览器发送文本和链接。这种方法适用于大范围的设备和网络条件，并开启了有趣的浏览器优化，如流文档解析。

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png" alt="Diagram showing server rendering and JS execution affecting FCP and TTI" width="350">

使用服务器呈现，用户不太可能等待CPU绑定的JavaScript处理，然后才能使用您的站点。即使[第三方JS](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)无法避免，使用服务器渲染来减少您自己的第一方[JS成本](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)也可以为您提供更多的“ [预算](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3) ”。但是，这种方法有一个主要缺点：在服务器上生成页面需要时间，这通常会导致较慢的[第一个字节时间](https://en.wikipedia.org/wiki/Time_to_first_byte) （TTFB）。

服务器渲染是否足以满足您的应用程序在很大程度上取决于您正在构建的体验类型。关于服务器呈现与客户端呈现的正确应用存在长期争论，但重要的是要记住，您可以选择将服务器呈现用于某些页面而不是其他页面。一些网站已成功采用混合渲染技术。 [Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)服务器渲染其相对静态的登陆页面，同时为交互繁重的页面[预取](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285) JS，使这些较重的客户端呈现页面更快地加载。

许多现代框架，库和体系结构使得在客户端和服务器上呈现相同的应用程序成为可能。这些技术可用于服务器渲染，但重要的是要注意，在服务器***和***客户端上进行渲染的体系结构都是他们自己的解决方案类，具有非常不同的性能特征和权衡。 React用户可以使用[renderToString（）](https://reactjs.org/docs/react-dom-server.html)或在其上构建的解决方案，如[Next.js，](https://nextjs.org)用于服务器呈现。 Vue用户可以查看Vue的[服务器渲染指南](https://ssr.vuejs.org)或[Nuxt](https://nuxtjs.org) 。 Angular有[Universal](https://angular.io/guide/universal) 。最流行的解决方案采用某种形式的水合作用，因此在选择工具之前要注意使用的方法。

## 静态渲染{: #static-rendering }

[静态渲染](https://frontarm.com/articles/static-vs-server-rendering/)在构建时发生，并提供快速的First Paint，First Contentful Paint和Time To Interactive  - 假设客户端JS的数量有限。与服务器渲染不同，它还设法实现始终如一的快速首字节时间，因为页面的HTML不必动态生成。通常，静态呈现意味着提前为每个URL生成单独的HTML文件。通过预先生成HTML响应，可以将静态呈现部署到多个CDN以利用边缘缓存。

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png" alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

静态渲染的解决方案有各种形状和大小。像[Gatsby](https://www.gatsbyjs.org)这样的工具旨在让开发人员感觉他们的应用程序是动态呈现的，而不是作为构建步骤生成的。像[Jekyl](https://jekyllrb.com)和[Metalsmith这样的人](https://metalsmith.io)拥抱他们的静态性质，提供更多模板驱动的方法。

静态渲染的一个缺点是必须为每个可能的URL生成单独的HTML文件。如果您无法提前预测这些URL的内容，或者对于具有大量唯一页面的网站，这可能具有挑战性甚至是不可行的。

React用户可能熟悉[Gatsby](https://www.gatsbyjs.org) ， [Next.js静态导出](https://nextjs.org/learn/excel/static-html-export/)或[Navi](https://frontarm.com/navi/) - 所有这些都可以方便作者使用组件。但是，了解静态呈现和预呈现之间的区别非常重要：静态呈现页面是交互式的，无需执行太多客户端JS，而预呈现改进了必须启动的单页应用程序的First Paint或First Contentful Paint客户端，以使页面真正具有交互性。

如果您不确定给定的解决方案是静态呈现还是预呈现，请尝试此测试：禁用JavaScript并加载创建的网页。对于静态呈现的页面，大多数功能仍然存在而不启用JavaScript。对于预渲染页面，可能仍然存在一些基本功能，如链接，但大多数页面都是惰性的。

另一个有用的测试是使用Chrome DevTools减慢网络速度，并观察在页面变为交互之前已下载了多少JavaScript。预渲染通常需要更多的JavaScript来实现交互，并且JavaScript往往比静态渲染使用的[渐进增强](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)方法更复杂。

## 服务器渲染与静态渲染{: #server-vs-static }

服务器渲染不是一个灵丹妙药 - 它的动态特性会带来[巨大的计算开销](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9)成本。许多服务器渲染解决方案不会提前刷新，可以延迟TTFB或将发送的数据加倍（例如，JS在客户端上使用的内联状态）。在React中，renderToString（）可能很慢，因为它是同步和单线程的。使服务器呈现“正确”可能涉及查找或构建[组件缓存](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)解决方案，管理内存消耗，应用[memoization](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)技术以及许多其他问题。您通常多次处理/重建同一个应用程序 - 一次在客户端上，一次在服务器中。仅仅因为服务器渲染可以使某些东西更快地显示出来并不会突然意味着您可以减少工作量。

服务器呈现为每个URL按需生成HTML，但速度可能比仅提供静态呈现内容慢。如果您可以进行额外的工作，服务器呈现+ [HTML缓存](https://freecontent.manning.com/caching-in-react/)可以大大减少服务器渲染时间。服务器渲染的优势在于能够提取更多“实时”数据并响应比静态渲染更完整的请求集。需要个性化的页面是请求类型的具体示例，该类型不适用于静态呈现。

在构建[PWA](https://developers.google.com/web/progressive-web-apps/)时，服务器呈现也可以提出有趣的决策。使用整页[服务工作者](https://developers.google.com/web/fundamentals/primers/service-workers/)缓存或仅仅是服务器呈现单个内容片段更好吗？

## 客户端呈现（CSR）{: #csr }

*客户端呈现（CSR）意味着使用JavaScript直接在浏览器中呈现页面。所有逻辑，数据获取，模板和路由都在客户端而不是服务器上处理。*

客户端渲染可能很难获得并且移动速度很快。如果做最少的工作，保持[严格的JavaScript预算](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144)并在尽可能少的[RTT中](https://en.wikipedia.org/wiki/Round-trip_delay_time)提供价值，它可以接近纯服务器渲染的性能。使用[HTTP / 2服务器推送](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/)或`<link rel=preload>`可以更快地提供关键脚本和数据，这将使解析器更快地为您服务。像[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)这样的模式值得评估，以确保初始和后续导航感觉即时。

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png" alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

客户端渲染的主要缺点是随着应用程序的增长，所需的JavaScript数量会增加。添加新的JavaScript库，polyfill和第三方代码会变得特别困难，这些代码会竞争处理能力，并且必须经常在呈现页面内容之前进行处理。使用依赖于大型JavaScript捆绑包的CSR构建的体验应该考虑[积极的代码分割](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/) ，并确保延迟加载JavaScript  - “只在您需要时提供所需内容”。对于很少或没有交互性的体验，服务器呈现可以代表这些问题的更具可扩展性的解决方案。

对于构建单页应用程序的人来说，识别大多数页面共享的用户界面的核心部分意味着您可以应用[Application Shell缓存](https://developers.google.com/web/updates/2015/11/app-shell)技术。与服务工作者相结合，这可以显着提高重复访问的感知性能。

## 通过补液将服务器渲染与CSR相结合{: #rehydration }

这种方法通常被称为通用渲染或简称为“SSR”，它试图通过两者兼顾来平滑客户端渲染和服务器渲染之间的权衡。整页加载或重新加载等导航请求由将应用程序呈现为HTML的服务器处理，然后用于呈现的JavaScript和数据嵌入到生成的文档中。当仔细实施时，这就像服务器渲染一样实现了快速的First Contentful Paint，然后通过使用称为[（重新）水合](https://docs.electrode.io/guides/general/server-side-data-hydration)的技术在客户端上再次渲染来“拾取”。这是一种新颖的解决方案，但它可能具有一些相当大的性能缺陷。

补水的SSR的主要缺点是它会对Time To Interactive产生显着的负面影响，即使它改善了First Paint。 SSR页面通常看起来具有欺骗性加载和交互性，但在执行客户端JS并附加事件处理程序之前，实际上无法响应输入。移动设备可能需要几秒甚至几分钟。

也许你自己也经历过这种情况 - 在看起来页面已经加载后的一段时间内，点击或点击什么都不做。这很快变得令人沮丧...... *“为什么没有发生什么？为什么我不能滚动？“*

### 补液问题:两个价格的一个应用程序{: #rehydration-issues }

由于JS，补液问题往往比延迟交互更糟糕。为了使客户端JavaScript能够准确地“拾取”服务器停止的位置而不必重新请求服务器用于呈现其HTML的所有数据，当前的SSR解决方案通常将UI的响应序列化。作为脚本标记的数据依赖关系到文档中。生成的HTML文档包含高级别的重复：

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

正如您所看到的，服务器返回应用程序UI的描述以响应导航请求，但它也返回用于组成该UI的源数据，以及UI实现的完整副本，然后在客户端上启动。只有在bundle.js完成加载和执行后，此UI才会变为交互式。

使用SSR补液从真实网站收集的性能指标表明应该严格禁止使用它。归根结底，原因归结为用户体验：最终让用户处于“不可思议的山谷”中非常容易。

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png" alt="Diagram showing client rendering negatively affecting TTI" width="600">

不过，SSR有补液的希望。在短期内，仅将SSR用于高度可缓存的内容可以减少TTFB延迟，从而产生与预渲染类似的结果。 [逐步](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html) ，逐步或部分再水化可能是使该技术在未来更可行的关键。

## 流服务器呈现和渐进式补液{: #progressive-rehydration }

服务器渲染在过去几年中有了许多发展。

[流式服务器呈现](https://zeit.co/blog/streaming-server-rendering-at-spectrum)允许您以块的形式发送HTML，浏览器可以在接收时逐步呈现。这可以提供快速的First Paint和First Contentful Paint，因为标记更快地到达用户。在React中，在[renderToNodeStream（）中](https://reactjs.org/docs/react-dom-server.html#rendertonodestream)异步的流 - 与同步renderToString相比 - 意味着可以很好地处理背压。

进步补液也值得关注，React一直在[探索](https://github.com/facebook/react/pull/14717) 。使用这种方法，服务器呈现的应用程序的各个部分随着时间的推移而被“启动”，而不是一次初始化整个应用程序的当前常用方法。这可以帮助减少使页面交互所需的JavaScript量，因为可以延迟页面的低优先级部分的客户端升级以防止阻塞主线程。它还可以帮助避免最常见的SSR Rehydration陷阱之一，其中服务器呈现的DOM树被破坏然后立即重建 - 通常是因为初始同步客户端渲染所需的数据还没有完全准备好，可能还在等待Promise解析度。

### 部分补液{: #partial-rehydration }

部分补液已证明难以实施。该方法是渐进式再水合的概念的扩展，其中分析逐渐再水化的各个部分（组分/视图/树）并且识别具有很小交互性或无反应性的那些。对于这些大多数静态部分中的每一个，相应的JavaScript代码然后被转换为惰性引用和装饰功能，将其客户端占用空间减少到接近零。部分补水方法伴随着自身的问题和妥协。它为缓存带来了一些有趣的挑战，而客户端导航意味着我们无法假设应用程序的惰性部分的服务器呈现的HTML将在没有完整页面加载的情况下可用。

### 三次渲染{: #trisomorphic }

如果[服务工作者](https://developers.google.com/web/fundamentals/primers/service-workers/)是您的选择，“三体”渲染也可能是有意义的。这是一种技术，您可以将流服务器呈现用于初始/非JS导航，然后让服务工作者在安装后为其导航呈现HTML。这可以使缓存的组件和模板保持最新，并启用SPA样式导航以在同一会话中呈现新视图。当您可以在服务器，客户端页面和服务工作者之间共享相同的模板和路由代码时，此方法最有效。

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png" alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## SEO注意事项{: #seo }

在选择在网络上呈现的策略时，团队通常会考虑SEO的影响。通常选择服务器呈现来提供爬虫可以轻松解释的“完整外观”体验。爬虫[可能会理解JavaScript](https://web.dev/discoverable/how-search-works) ，但是在呈现它们的方式方面通常存在值得注意的[限制](/search/docs/guides/rendering) 。客户端渲染可以工作，但往往没有额外的测试和腿部工作。如果您的架构受客户端JavaScript的严重驱动，最近[动态渲染](/search/docs/guides/dynamic-rendering)也成为值得考虑的选择。

如果有疑问， [移动友好测试](https://search.google.com/test/mobile-friendly)工具对于测试您选择的方法是否符合您的预期非常宝贵。它显示了Google抓取工具显示任何页面的方式预览，找到的序列化HTML内容（执行JavaScript后）以及渲染过程中遇到的任何错误。

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png" alt="Screenshot of the Mobile Friendly Test UI">

## 结束...... {: #wrapup }

在决定渲染方法时，测量并了解您的瓶颈是什么。考虑静态渲染或服务器渲染是否可以使您获得90％的方式。主要使用最少的JS发布HTML以获得交互式体验是完全可以的。这是一个方便的信息图，显示了服务器 - 客户端频谱：

<img src="../../images/2019/02/rendering-on-the-web/infographic.png" alt="Infographic showing the spectrum of options described in this article">

## 积分{: #credits }

感谢大家的评论和灵感：

Jeffrey Posnick，Houssein Djirdeh，Shubhie Panicker，Chris Harrelson和SebastianMarkbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
