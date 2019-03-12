project_path: /web/fundamentals/_project.yaml 
book_path: /web/fundamentals/_book.yaml 
description: 现代网站通常包含大量的JavaScript。这些脚本通常以单个大型捆绑包形式发送，这可能需要很长时间才能下载和处理。代码拆分鼓励拆解这些脚本，以便您只需要发送用户必需的内容。

{# wf_updated_on: 2018-09-16 #}
{# wf_published_on: 2018-08-06 #}
{# wf_blink_components: Blink>JavaScript #}

# 使用代码拆分减少JavaScript负载 {: .page-title}

{% include "web/_shared/contributors/jeremywagner.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

**TL;DR:**

- 现代网站通常将所有JavaScript组合成一个大型捆绑包。以这种方式交付JavaScript时，加载性能会受到影响。大量的JavaScript也会占用主线程，延迟可交互时间。这对于具有较少内存和处理能力的设备*尤其*如此。
- 代码分割是一种大型捆绑包的替代方法，即将JavaScript拆分为较小的代码块。这样可以提前发送首要必需的少量代码，从而缩短页面加载时间。其余的可以按需加载。
- 您需要代码拆分吗？检查Lighthouse的[JavaScript启动时间是否过高审查](/web/tools/lighthouse/audits/bootup)和[DevTools中的代码覆盖面板](/web/updates/2017/04/devtools-release-notes#coverage)来衡量您的应用程序中脚本对性能的影响以及未使用的脚本数量。
- 代码拆分可以通过以下方式完成： 
    -  **Vendor 拆分**将公共代码（例如，React，lodash *等* ）从程序代码中分离出来。这允许您将应用程序和公共代码分开。这种隔离可以降低公共代码或应用程序代码更改时使用户的缓存失效的负面性能影响。这应该在*每个*应用程序中都实现。 
    -  **入口拆分**通过将您的代码按应用程序中的**入口**进行分隔，这些脚本是webpack和Parcel等工具在构建应用程序的依赖关系树时启动的脚本。这最适用于未使用客户端路由的页面或应用程序，或者某些部分使用服务器端路由而其他部分属于单页面应用程序的混合应用程序。 
    -  **动态拆分**将使用动态`import()`语句进行代码拆分。这种类型的拆分通常最适合单页面应用程序。 
- 尽可能选择为您拆分代码的工具（[Preact CLI](https://github.com/developit/preact-cli/)，[PWA Starter Kit](https://github.com/Polymer/pwa-starter-kit/) *等* ）。[React](https://reactjs.org/docs/code-splitting.html)，[Vue](https://vuejsdevelopers.com/2017/07/03/vue-js-code-splitting-webpack/)和[Angular](https://angular.io/guide/lazy-loading-ngmodules)支持手动代码拆分。

也许你以前听过这个，但[现在网页上有*很多* JavaScript](https://httparchive.org/reports/state-of-javascript#bytesJs) ，而在中等性能硬件设备上， [这可能会有问题™](https://speedcurve.com/blog/your-javascript-hurts/) 。然而，对过多的JavaScript设置随意限制并不是最好的方法，因为每个应用程序都是不同的。一个应用程序中的JavaScript数量可能远远多过另一个应用程序。而且用户和他们的设备也是各不相同的！

这就是为什么考虑*如何*交付JavaScript的重要性。您是否将所有脚本捆绑到一个大文件中并在所有页面上交付？如果是这样，您需要重新考虑这种方法，并考虑使用代码拆分！

## 过早得加载太多的代码

许多应用程序将所有脚本放在一个文件中，并在初始加载时提供大型捆绑包。此文件不仅包含对初始路由的支持，还支持*每条*路由中的*每个*交互 - 无论是否访问过这些路由！

这种全有或全无的方法效率很低。在加载，解析和执行未使用代码的字节中花费的每一秒时间都会延长应用程序的[可交互时间（TTI）](/web/tools/lighthouse/audits/time-to-interactive) ，这意味着用户在可以使用之前不得不一直等待。移动设备上的用户会更多地感受到这个问题，其中较慢的处理器或网络连接会导致进一步的延迟。下图显示了移动设备与具有更强大处理器的台式机或笔记本电脑之间解析和编译脚本的时间消耗对比：

<figure>
  <img src="images/figure-1-1x.png" srcset="images/figure-1-1x.png 1x,
images/figure-1-2x.png 2x" alt="JavaScript startup times on different devices.
Source: by Addy Osmani.">
  <figcaption><b>图1</b> 。不同设备上的JavaScript启动时间。资料来源： <a href="https://twitter.com/addyosmani" rel="noopener">Addy Osmani</a>的<a href="https://medium.com/reloading/javascript-start-up-performance-69200f43b201" rel="noopener">JavaScript Startup Performance</a> 。</figcaption>
</figure>

我们知道更快的应用就是*更好的*应用。人们更喜欢使用它们，并且[有很多关于它们如何改进各种业务指标的案例研究](https://wpostats.com/) 。与全有或全无的方法相比，代码拆分强调捆绑可以根据当前路由的需要传输和解析最少的代码，而不是一次性全部交付代码。

## 我需要代码拆分吗？

“我究竟需要在我的应用程序中拆分代码吗？”这是一个值得思考的问题，就像很多网站开发问题一样。如果您的应用程序有许多功能丰富的路由并且大量使用框架和库，那么答案大多数情况下一定是“需要”。但是，只有您可以自己回答这个问题，因为您需要依靠对您自己的应用程序的架构及其加载的脚本，并结合[Lighthouse,](/web/tools/lighthouse/)，DevTools，真实设备和[WebPagetest](https://www.webpagetest.org/)等工具来综合考量。

对于新手来说，Lighthouse审查需要耗费的精力最少。在Chrome中，您可以通过Audits面板在DevTools中打开Lighthouse，并审查您的网站。关于JavaScript性能问题，您需要关注一个审查，即[JavaScript启动时间太高](/web/tools/lighthouse/audits/bootup)审查。他会标记那些会显着延迟应用程序的交互时间（TTI）的JavaScript：

<figure>
  <img src="images/figure-2-1x.png" srcset="images/figure-2-1x.png 1x,
images/figure-2-2x.png 2x" alt="The JavaScript Bootup Time is Too High audit in
Lighthouse illustrating which scripts are responsible for excessive processing
activity.">
  <figcaption><b>图2</b> 。在Lighthouse中的JavaScript启动时间太高审查说明哪些脚本负责具有过多的负载。</figcaption>
</figure>

幸运的是，您可以使用此审查中收集的信息与DevTools中的代码覆盖工具（您可以在聚焦DevTools时使用<kbd>esc</kbd>键打开）查找当前路由中包含未使用代码的脚本。

<figure>
  <img src="images/figure-3-1x.png" srcset="images/figure-3-1x.png 1x,
images/figure-3-2x.png 2x" alt="The code coverage panel in DevTools showing how
much JavaScript is used on the current page.">
  <figcaption><b>图3</b> 。 DevTools中的代码覆盖面板显示了当前页面上使用了多少JavaScript。</figcaption>
</figure>

Note: 即使您在应用程序中使用代码拆分，您仍可能会在页面上发现一些未使用的代码。 [Tree shaking](/web/fundamentals/performance/optimizing-javascript/tree-shaking/)也是一种消除无用代码的解决方案！

虽然Lighthouse非常适合评估性能，但你应该记住它是*综合性*的。设备的功能和处理能力沿着一个巨大的梯度，从极快的速度一直到极其缓慢，许多用户的设备介于两者之间。在*真实设备*上进行测试至关重要，特别是那些*不属于*最前沿的设备。仅仅因为您的网站在iPhone X上加载并不困难并不意味着某些人老旧的（但仍然可以使用）Galaxy S5的表现同样如此。如果您无法获得真正的设备来进行测试，您可以随时使用[WebPagetest](https://www.webpagetest.org/)来评估各种平台的性能。

## 设定预算并坚持下去

如果您将性能视为一次性任务，那么您的性能改进最终*会*被淘汰，因为新功能和技术负担的增加将消除您所获得的收益。性能预算可帮助您巩固收益，并防止添加新功能以破坏应用程序的性能。

性能预算能够使用需要维持快速的约束为保持用户体验提供共同的热情。他们引入了一种问责文化，这使得利益相关者能够权衡每次网站变更中以用户为中心的指标。

拥抱性能预算可以鼓励团队认真思考他们贯穿从设计阶段早期到里程碑式结束整个过程中所做出的任何决策的后果。

性能预算通过内部流程来实现业务中的性能文化。组织化性能预算确保预算由每个人拥有，而不仅仅是由一个组（例如工程）定义。确保页面快速加载是团队设置的最常见的性能预算之一。

在设定预算并且整个组织尽早了解预算参数的情况时，您可以说性能不仅仅是一个工程问题，而是构建整个软件包的关键部分。它在考虑性能时提供设计和工程指南，并应根据可能影响性能的每个决策进行检查。

当团队制定性能预算时，他们需要审核自己的研究，并了解对用户最重要的指标。如果您尝试在中低端设备上快速交互，您不能发送5MB的JavaScript。

从Alex Russell的[“你能负担得起吗？”](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)中描述的性能预算目标中退一步，可能是：

- 通过模拟（或真实）[Moto G4](https://en.wikipedia.org/wiki/Moto_G4)，3G网络的交互时间<5s
- 针对于移动设备，则JavaScript预算<200 KB。如果您刚刚开始，请使用低于桌面设备[HTTP Archive中位数](https://httparchive.org/reports/state-of-javascript#bytesJs)的预算。
- 可以从总页面权重目标中提取其他资源的预算。如果页面不能超过600 KB，那么您的图像，JS，CSS等预算将需要调整以适应。重要的是我们提醒开发人员可以根据需要延迟加载更多资源，但初始加载成本应该明确计入预算。

一些用于为网站寻求如何设定预算灵感的选择：您可以查看竞争对手的网站或咨询纵向的案例研究中的的行业中值。

## 开始使用代码拆分

简单地*谈论*代码拆分而没有具体的例子可能只会给读者留下更多问题。为了提高清晰性，本指南将向您展示通过[示例应用](https://github.com/malchata/code-splitting-example)拆分代码的不同方法，您可以将其用作参考。

注意：一些在示例应用中的技术（例如基于散列版本管理的输出文件名和[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)的使用）涵盖在[本指南](/web/fundamentals/performance/webpack/use-long-term-caching) 中。

<figure>
  <img src="../tree-shaking/images/figure-3-1x.png" srcset="../tree-shaking/images/figure-3-1x.png 1x,
../tree-shaking/images/figure-3-2x.png 2x" alt="The example app, which is a
searchable database of guitar effect pedals.">
  <figcaption><b>图4</b> 。示例应用，是一个可搜索的吉他效果踏板的数据库。</figcaption>
</figure>

该应用有三个路由：

1. 用户可以搜索[吉他效果踏板](https://en.wikipedia.org/wiki/Effects_unit#Stompboxes)的搜索页面（也是默认路由）。
2. 踏板详细信息页面，在用户点击搜索结果中的踏板时显示。用户还可以从此处将踏板添加到收藏列表中。
3. 收藏页面，列出了用户收藏的的踏板。

大多数示例将向您展示如何使用[webpack](https://webpack.js.org/)在这些路由上拆分代码，但动态代码拆分部分也将向您展示如何使用[Parcel](https://parceljs.org/)拆分代码。让我们首先来看如何通过webpack中的入口拆分应用中的JavaScript。

### 通过多入口拆分代码

术语[*入口*](https://webpack.js.org/concepts/entry-points/)是webpack开始分析应用程序依赖关系的文件。根据树状依赖分析，入口是应用程序引入静态资产，路由和功能分支的主体文件。某些应用程序只有一个入口，但其他应用程序可能有[多个入口](https://webpack.js.org/concepts/entry-points/#multi-page-application) 。

**什么时候使用该策略：**您正在开发的不是单页面应用程序（SPA）。或者是混合应用程序，其中某些页面不使用客户端路由，但其他页面有可能使用。在这样的情况下，跨多个入口拆分代码是有意义的。

**需要注意的事项：**如果您的多个入口共享公共库或模块，则脚本中可能会出现重复的代码。我们稍后会解决这个问题。

示例应用中有三个与前面描述的每个路由相对应的入口，即*index.js*， *detail.js*和*favorites.js*。这些脚本包含[Preact](https://preactjs.com/)组件，用于呈现这些路由的页面。

Note: 如果您想查看完全实现基于入口点的代码拆分的示例应用的代码库，请查看app repo的[webpack-entry-point-splitting分支](https://github.com/malchata/code-splitting-example/tree/webpack-entry-point-splitting) ！

#### 配置webpack以跨多个入口拆分代码

在webpack中，我们可以通过在[`entry`配置](https://webpack.js.org/configuration/entry-context/#entry)中指定它们来按入口拆分代码，如下所示：

```javascript
module.exports = {
  // ...
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    detail: path.join(__dirname, "src", "detail.js"),
    favorites: path.join(__dirname, "src", "favorites.js")
  },
  // ...
};
```

方便的是，当有多个入口点时，webpack将它们全部视为单独的依赖树，这意味着代码会自动以命名进行拆分，如下所示：

```
                   Asset       Size  Chunks             Chunk Names
js/favorites.15793084.js   37.1 KiB       0  [emitted]  favorites
   js/detail.47980e29.js   44.8 KiB       1  [emitted]  detail
     js/main.7ce05625.js   49.4 KiB       2  [emitted]  main
              index.html  955 bytes          [emitted]
             detail.html  957 bytes          [emitted]
          favorites.html  960 bytes          [emitted]
```

正如您可能猜到的，块名称来自入口配置中的对象键名，可以用来识别代码块对应哪个页面。该应用还使用html-webpack-plugin生成HTML文件，其中包含每个页面相应的块。

#### 去除重复代码

虽然我们为每个页面做了很好的代码块拆分，但仍然存在一个问题：每个代码块中都有很多重复的代码。这是因为webpack将每个入口视为自己单独的依赖关系树，而不评估它们之间共享的代码。如果[我们启用webpack中的source maps](https://webpack.js.org/configuration/devtool/)并使用[Bundle Buddy](https://github.com/samccone/bundle-buddy)或[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)等工具分析我们的代码，我们可以看到每个块中有多少重复代码。

<figure>
  <img src="images/figure-5-1x.png" srcset="images/figure-5-1x.png 1x,
images/figure-5-2x.png 2x" alt="Bundle Buddy showing how many lines of code are
shared between bundles.">
  <figcaption><b>图5</b> 。 Bundle Buddy显示捆绑包之间有多少行可共享代码。</figcaption>
</figure>

这里的重复代码来自公共依赖包脚本。为了解决这个问题，我们将告诉webpack为这些脚本创建一个单独的代码块。为此，我们将使用[`optimization.splitChunks`配置对象](https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks) ：

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Split vendor code to its own chunk(s)
        vendors: {
          test: /[\\/]node_modules[\\/]/i,
          chunks: "all"
        }
      }
    },
    // The runtime should be in its own chunk
    runtimeChunk: {
        name: "runtime"
    }
   },
  // ...
};
```

此配置表示“我想为公共依赖包脚本输出单独的块”（从*node_modules*文件夹加载的那些）。这很有效，因为所有公共依赖脚本都是由npm安装到*node_modules* ，我们使用[`test`选项](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunks-cachegroups-test)来检查此路径。[`runtimeChunk`选项还制定](https://webpack.js.org/configuration/optimization/#optimization-runtimechunk)以将[webpack的运行时](https://webpack.js.org/concepts/manifest/#runtime)分离到自己的代码块中，以避免在我们的应用代码中重复使用它。当我们将这些选项添加到配置并重建应用程序时，输出显示我们的应用程序的公共依赖包脚本已移至单独的文件：

```
                                       Asset      Size  Chunks             Chunk Names
js/vendors~detail~favorites~main.29eb30bb.js  30.1 KiB       0  [emitted]  vendors~detail~favorites~main
                         js/main.06d0afde.js  16.5 KiB       2  [emitted]  main
                       js/detail.1acdbb27.js  13.4 KiB       3  [emitted]  detail
                    js/favorites.230214a7.js  5.52 KiB       4  [emitted]  favorites vendors~detail~favorites~main
                      js/runtime.2642dc2d.js  1.46 KiB       1  [emitted]  runtime
                                  index.html   1.1 KiB          [emitted]
                                 detail.html   1.1 KiB          [emitted]
                              favorites.html   1.1 KiB          [emitted]
```

由于公共依赖包脚本，运行时和共享代码现在已拆分为专有代码块，因此我们也减小了入口脚本的大小。感谢我们的努力，Bundle Buddy为我们带来了更好的结果：

<figure>
  <img src="images/figure-6-1x.png" srcset="images/figure-6-1x.png 1x,
images/figure-6-2x.png 2x" alt="Bundle Buddy showing reduced input
lines and shared code between bundles.">
  <figcaption><b>图6</b> 。Bundle Buddy显示减少的输入行和各代码块之间的共享代码。</figcaption>
</figure>

在我们拆分公共依赖脚本代码之前，脚本包之间共享了几千行代码。现在它明显变少了。虽然将公共代码分成单独的块*可能*会产生额外的HTTP请求，但这只会发生在HTTP/1上。此外，这种交付脚本的*方式*对于缓存会更友好。如果您有一个巨大的包，但您的应用程序或公共代码发生了变化，则需要再次下载整个捆绑包。

Note: 不要忘记为用户返回的资源[设置最佳缓存策略](/web/fundamentals/performance/optimizing-content-efficiency/http-caching) ！

但是，如果您*真的*想要做到最好，您可以使用一种称为“公共代码拆分”的方式消除捆绑之间的大部分或全部共享代码。在示例应用中，这可以通过在`cacheGroups`下创建另一个入口来实现， `cacheGroups`如下所示：

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Split vendor code to its own chunk(s)
        vendors: {
          test: /[\\/]node_modules[\\/]/i,
          chunks: "all"
        },
        // Split code common to all chunks to its own chunk
        commons: {
          name: "commons",    // The name of the chunk containing all common code
          chunks: "initial",  // TODO: Document
          minChunks: 2        // This is the number of modules
        }
      }
    },
    // The runtime should be in its own chunk
    runtimeChunk: {
      name: "runtime"
    }
  },
  // ...
};
```

当我们使用公共代码拆分时，块之间共同的代码将被拆分为一个名为`commons`的新代码块，如下输出所示：

```
                   Asset      Size  Chunks             Chunk Names
  js/commons.e039cc73.js    40 KiB       0  [emitted]  commons
     js/main.5b71b65c.js  7.82 KiB       2  [emitted]  main
   js/detail.b3ac6f73.js  5.17 KiB       3  [emitted]  detail
js/favorites.8da9eb04.js  2.18 KiB       4  [emitted]  favorites
  js/runtime.2642dc2d.js  1.46 KiB       1  [emitted]  runtime
              index.html  1.08 KiB          [emitted]
             detail.html  1.08 KiB          [emitted]
          favorites.html  1.08 KiB          [emitted]
```

当我们重新运行Bundle Buddy时，我们应该会被告知我们的bundle不再有重复代码块。

虽然删除所有重复的代码是一个有价值的目标，但实用也很重要。寻求尽可能多地删除重复代码，但要了解使用此配置执行此操作可能会通过拉入可能未在当前页面上使用的代码来扩大初始脚本文件。这可以通过延迟加载脚本来解决，我们将在后面介绍！

### 动态拆分代码

如上所示，通过多个入口拆分代码合乎逻辑并且很直观，但它可能不太适用于您的应用。另一种方法是使用[动态`import()`语句](/web/updates/2017/11/dynamic-import)延迟加载脚本：

```javascript
import("./myFancyModule.js").then(module => {
  module.default(); // Call a module's default export
  module.andAnotherThing(); // Call a module's named export
});
```

由于`import()`返回[一个Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，所以你也可以使用[`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) / [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) ：

```javascript
let module = await import("./myFancyModule.js");
module.default(); // Access a module's default export
module.andAnotherThing(); // Access a module's named export
```

无论您喜欢哪种方法，Parcel和webpack都可以检测`import()`并相应地拆分它们导入的代码。

**什么时候使用该策略：**您正在开发一个单页应用程序，其中包含许多分散的功能，并非所有用户都可以*使用* 。延迟加载此功能可以减少JS解析/编译活动消耗以及通过网络发送的字节数。

**需要注意的事项：**动态导入脚本会触发网络请求，这意味着用户操作可能会因此而延迟。但是，有*很多*方法可以缓解这种情况，我们很快就会介绍。

让我们首先介绍在Parcel中动态代码拆分的工作原理。

#### 使用Parcel进行动态代码拆分

用于动态代码拆分的最简便的工具是[Parcel](https://parceljs.org/) 。在没有任何配置的情况下，Parcel构建了一个依赖树，用于计算静态和动态模块，并输出与您的输入名称很好地对应的脚本。

Note: 如果您想了解示例应用如何使用Parcel进行动态代码拆分，请查看[parcel-dynamic-splitting分支](https://github.com/malchata/code-splitting-example/tree/parcel-dynamic-splitting) 。

在此版本的示例应用中，客户端路由由[preact-router](https://github.com/developit/preact-router)和[preact-async-route提供](https://github.com/prateekbh/preact-async-route) 。如果没有动态导入的模块，则需要预先导入所有路径所需的所有组件（并由客户端下载）：

```javascript
import Router from "preact-router";
import { h, render, Component } from "preact";
import Search from "./components/Search/Search";
import PedalDetail from "./components/PedalDetail/PedalDetail";
import Favorites from "./components/Favorites/Favorites";

render(<Router>
  <Search path="/" default/>
  <PedalDetail path="/pedal/:id"/>
  <Favorites path="/favorites"/>
</Router>, document.getElementById("app"));
```

如上所示，我们为每个路由加载了所有的组件，无论用户是否访问过它们。当以这种方式构建应用程序时，我们错过了通过延迟加载JavaScript来提高加载性能的潜在机会。在这个示例应用的情况下，我们可以通过使用动态`import()`和preact-async-route来延迟加载`/pedal/:id`和`/favorites`路由所需的组件，如下所示：

```javascript
import Router from "preact-router";
import AsyncRoute from "preact-async-route";
import { h, render, Component } from "preact";
import Search from "./components/Search/Search";

render(<Router>
  <Search path="/" default/>
  <AsyncRoute path="/pedal/:id" getComponent={() => import("./components/PedalDetail/PedalDetail").then(module => module.default)}/>
  <AsyncRoute path="/favorites" getComponent={() => import("./components/Favorites/Favorites").then(module => module.default)}/>
</Router>, document.getElementById("app"));
```

你会注意到一些与前一个例子不同的东西：

1. 我们只静态导入`Search`组件。这是因为默认路由使用此组件，因此需要预先加载它。
2. preact-async-route通过`AsyncRoute`组件处理异步路由。
3. 当用户通过使用`import()`语句的`AsyncRoute`组件导航到对应路由时， `PedalDetail`和`Favorites`组件是延迟加载的。

当我们构建应用程序时，Parcel输出以下内容：

```
dist/src.e54c18ce.js             65.56 KB    2.87s
dist/PedalDetail.7f417dfd.js      7.66 KB    1.52s
dist/Favorites.02c87dad.js        3.06 KB    1.17s
dist/index.html                     964 B    882ms
```

在零配置的情况下，Parcel会自动将动态导入的脚本拆分为可以按需加载并可延迟加载的代码块。

Warning: 此示例没有利用公共依赖脚本拆分！

当我们进入默认路由时，仅加载所需的脚本以支持它。当用户导航到踏板细节或收藏夹路由时，将按需加载这些路由的脚本。

##### 使用webpack进行动态代码拆分

与Parcel一样，webpack可以将动态导入的代码拆分为单独的文件。事实上，它几乎不需要任何指导就可以做到。只是当webpack遇到`import()`调用时，它没有像Parcel那样命名输出文件：

```
                      Asset       Size  Chunks             Chunk Names
        js/main.2c418923.js   10.2 KiB       0  [emitted]  main
           js/2.6b340cb3.js   3.32 KiB       2  [emitted]
           js/3.a52088da.js  349 bytes       3  [emitted]
           js/4.232e6590.js  521 bytes       4  [emitted]
js/vendors~main.526c9b0c.js   42.9 KiB       5  [emitted]  vendors~main
     js/runtime.8b59d0ff.js   2.26 KiB       6  [emitted]  runtime
           js/1.175d2b19.js   6.11 KiB       1  [emitted]
                 index.html   1.08 KiB          [emitted]
```

在这里，您可以看到webpack为`import()`分配ID而不是名称。对于您的用户而言，这并不重要，但出于开发原因，这可能会出现问题。为了解决这个问题，我们需要使用一种称为*内联指令*的特殊注释来告诉webpack输出文件名应该是什么：

```javascript
render(<Router>
  <Search path="/" default/>
  <AsyncRoute path="/pedal/:id" getComponent={() => import(/* webpackChunkName: "PedalDetail" */ "./components/PedalDetail/PedalDetail").then(module => module.default)}/>
  <AsyncRoute path="/favorites" getComponent={() => import(/* webpackChunkName: "Favorites" */ "./components/Favorites/Favorites").then(module => module.default)}/>
</Router>, document.getElementById("app"));
```

在上面的代码片段中，一个名为`webpackChunkName`的内联指令告诉webpack该代码块的名称应该是什么。在`import()`调用时，webpack为代码块提供了正确的名称，如下所示：

```
                        Asset       Size  Chunks             Chunk Names
          js/main.b72863fc.js   10.2 KiB       0  [emitted]  main
     js/Favorites.0ce4835e.js   3.33 KiB       2  [emitted]  Favorites
    js/simpleSort.ef5256f9.js  358 bytes       3  [emitted]  simpleSort
js/toggleFavorite.fc4ea97d.js  534 bytes       4  [emitted]  toggleFavorite
  js/vendors~main.526c9b0c.js   42.9 KiB       5  [emitted]  vendors~main
       js/runtime.a735e0fe.js   2.32 KiB       6  [emitted]  runtime
   js/PedalDetail.ba7a0692.js   6.12 KiB       1  [emitted]  PedalDetail
                   index.html   1.08 KiB          [emitted]
```

在我看来，这种语法有点笨拙，但它确实有效。如果您想了解示例应用如何使用webpack进行动态代码拆分，请查看app中repo的[webpack-dynamic-splitting分支](https://github.com/malchata/code-splitting-example/tree/webpack-dynamic-splitting) 。

## 考虑加载性能因素

代码拆分的一个潜在痛点是它增加了对脚本的请求数量，即使在HTTP/2环境中，也会带来挑战。让我们介绍一些可以提高使用代码拆分的应用程序的加载性能的方法。

### 还是“预算”这个词

在本指南的开头，我们着重讨论了性能预算，如果您的组织没有遵循这种做法，这可能难以执行。如果在项目中使用webpack，则可以将应用程序配置为通过[`performance`配置对象](https://webpack.js.org/configuration/performance/)以构建产出过大的资产时抛出错误。使用此配置对象，我们可以有效地限制资产大小的预算，如下所示：

```javascript
module.exports = {
  // ...
  performance: {
    hints: "error",
    maxAssetSize: 102400
  }
};
```

此配置有效地告诉Webpack“在构建期间如果产出任何大于100 KB的资源，就要抛出错误”。这是一个严苛的配置（并且你可能无法在不遇到麻烦的情况下加入到现有的应用程序中），但如果你真的想要坚持此预算， `performance`对象可以帮助你做到这一点。请务必查看此对象中可用的其他选项，例如[`maxEntrypointSize`](https://webpack.js.org/configuration/performance/#performance-maxentrypointsize) 。

### 使用服务工作线程预缓存脚本

[PRPL模式](/web/fundamentals/performance/prpl-pattern/)中的P代表*预缓存* ，包括在初始化时服务工作线程预先缓存剩余的路由和功能。可以通过以下方式有效地进行预处理：

1. 它不会影响应用程序初始的加载性能，因为服务工作线程注册完成并会在页面加载完成后开始进行预缓存。
2. 使用服务工作者预缓存剩余路由和功能可确保在以后请求时可以立即使用。

当然，由于许多原因（例如输出带有散列的文件名），将服务工作线程添加到由现代工具生成代码的应用程序可能比较困难。值得庆幸的是， [Workbox](/web/tools/workbox/)有一个webpack插件，可以轻松地为您的应用程序生成服务工作线程。首先，您可以安装[workbox-webpack-plugin](https://www.npmjs.com/package/workbox-webpack-plugin)并将其加入您的webpack配置中，如下所示：

```javascript
const { GenerateSW } = require("workbox-webpack-plugin");
```

这里，您可以将一个`GenerateSW`实例添加到`plugins`配置中：

```javascript
module.exports = {
  // ...
  plugins: [
    // ... other plugins omitted
    new GenerateSW()
  ]
  // ...
};
```

通过此配置，Workbox会生成一个服务工作线程，可以预缓存应用程序中的*所有* JavaScript。对于小型应用程序来说这可能很好，但对于大型应用程序，您可能希望限制需要预处理的内容。可以通过插件的`chunks`添加白名单来实现：

```javascript
module.exports = {
  // ...
  plugins: [
    new GenerateSW({
      chunks: ["main", "Favorites", "PedalDetail", "vendors"]
    })
  ]
  // ...
};
```

使用白名单，我们可以确保服务工作线程只预缓存我们需要的脚本。要查看示例应用中如何使用Workbox，请查看repo的[webpack-dynamic-splitting-precache](https://github.com/malchata/code-splitting-example/tree/webpack-dynamic-splitting-precache)分支！

### 预提取和预加载脚本

使用服务工作线程预先缓存脚本是提高应用程序加载性能的一种方法，但应将其视为一种渐进增强的方式。如果没办法使用它，您可能需要考虑预提取或预加载代码块。

`rel=prefetch`和`rel=preload`都是在浏览器之前获取指定资源的资源提示，可以通过屏蔽延迟来提高加载性能。尽管乍一看它们非常相似，但它们的表现却截然不同：

1. [`rel=prefetch`](https://www.w3.org/TR/resource-hints/#prefetch)是对以后要使用的非关键资源的*低优先级*提取。当浏览器空闲时，`rel=prefetch`会启动请求。
2. [`rel=preload`](https://www.w3.org/TR/preload/)是当前路由使用的关键资源的*高优先级*提取。 `rel=preload`启动的资源请求可能比浏览器发现它们时更早发生。但是，预加载是*非常*敏感的，因此您可能需要查看[本指南](/web/fundamentals/performance/resource-prioritization#preload) （以及可能的[规范](https://www.w3.org/TR/preload/) ）以获得指导。

如果您想要对这些资源提示进行深入了解，请[阅读本文](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf) 。由于考虑到本指南的目的，我将限制该指导为适用于webpack的范围。

#### 预取

为合理确定用户将访问或使用的路由或功能预取脚本可能是合理的，但先不要这样做。本指南的示例应用中预提取的一个很好的用例发生在我们将应用程序的`Router`组件安装在*index.js*入口的地方：

```javascript
render(<Router>
  <Search path="/" default/>
  <AsyncRoute path="/pedal/:id" getComponent={() => import(/* webpackChunkName: "PedalDetail" */ "./components/PedalDetail/PedalDetail").then(module => module.default)}/>
  <AsyncRoute path="/favorites" getComponent={() => import(/* webpackPrefetch: true, webpackChunkName: "Favorites" */ "./components/Favorites/Favorites").then(module => module.default)}/>
</Router>, document.getElementById("app"));
```

在这里，我们将`webpackPrefetch`内联指令（`webpackChunkName` 之后额外的）添加到收藏夹页面的`AsyncRoute`中。如果没有为此路由上的脚本执行预提取，请求它们的用户可能会遇到如下延迟：

<figure>
  <img src="images/figure-7-1x.png" srcset="images/figure-7-1x.png 1x,
images/figure-7-2x.png 2x" alt="A request for scripts for the favorites route on
a throttled (Slow 3G) connection.">
  <figcaption><b>图7</b> 。在受限制（慢速3G）连接上请求收藏夹路由的脚本。</figcaption>
</figure>

在慢速连接上，用户可能必须等待几秒钟才能收到收藏路由的脚本。但是，当用户第一次登陆应用程序时，我们可以使用`webpackPrefetch` 预提取JavaScript来减少用户的等待时间：

<figure>
  <img src="images/figure-8-1x.png" srcset="images/figure-8-1x.png 1x,
images/figure-8-2x.png 2x" alt="A request for scripts for the favorites route is
prefetched after the initial route loads. When the user explicitly requests it,
the browser immediately pulls it from its cache.">
  <figcaption><b>图8</b> 。在初始路由加载后，将预提取对收藏路由的脚本请求。当用户明确请求它时，浏览器会立即从缓存中提取它。</figcaption>
</figure>

预取通常是低风险的，因为它们不会显着地争用带宽，因为资源是在具有低优先级的空闲时间期间获取的。也就是说，浪费带宽的可能性是存在的，因此您需要确保您预提取的任何内容都有合理使用的可能。

Note: 如果您想了解这一切是如何工作的，请查看代码的[webpack-dynamic-splitting-prefetch分支](https://github.com/malchata/code-splitting-example/tree/webpack-dynamic-splitting-prefetch) ！

#### 预加载

预加载似乎类似于预提取，但与两者截然不同。 `webpackPreload`内联指令可以像`webpackPrefetch`为预提取一样调用预加载。然而，根据我的经验，使用`webpackPreload`预加载动态导入的内容与将给定路径的所有功能捆绑到一整个代码块中区别不大。

在我看来，预加载对于渲染初始路径至关重要的脚本最有意义。 Twitter这样做是为了加快[Twitter Lite](https://mobile.twitter.com/home)应用程序的加载速度：

<figure>
  <img src="images/figure-9-1x.png" srcset="images/figure-9-1x.png 1x,
images/figure-9-2x.png 2x" alt="Twitter Lite DOM snapshot in DevTools revealing
several preloaded JavaScript resources.">
  <figcaption><b>图9</b> 。 DevTools中的Twitter Lite DOM截图展示了几个预加载的JavaScript资源。</figcaption>
</figure>

遗憾的是， `webpackPreload`仅适用于动态`import()`调用，因此为了预加载对示例应用中初始路由至关重要的代码块，我们需要依赖另一个名为[preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) 的插件。安装此插件后，我们将其加入webpack配置中，如下所示：

```javascript
const PreloadWebpackPlugin = require("preload-webpack-plugin");
```

然后我们通过在`plugins`数组中添加插件实例来配置插件以预加载`main`和`vendors`块：

```javascript
plugins: [
  // Other plugins omitted...
  new PreloadWebpackPlugin({
    rel: "preload",
    include: ["main", "vendors"]
  })
]
```

此配置将通过`<head>`中的`<link>`元素为`vendors`和`main`代码块提供预加载提示。

<figure>
  <img src="images/figure-10-1x.png" srcset="images/figure-10-1x.png 1x,
images/figure-10-2x.png 2x" alt="Preload hints added to the <head> of the
document for the main and vendors chunks as seen in DevTools.">
  <figcaption><b>图10</b> 。如DevTools中所示，文档的<code><head></code>中已添加<code>main</code>文件和<code>vendors</code>代码块的预加载提示。</figcaption>
</figure>

虽然这不会在示例应用中带来很大的性能提升，但它*可以*提高应用程序中的加载性能，因为有许多其他资源会和JavaScript争夺带宽。要在示例应用程序中查看预加载操作，请查看[webpack-dynamic-splitting-preload分支](https://github.com/malchata/code-splitting-example/tree/webpack-dynamic-splitting-preload) 。

Note: preload-webpack-plugin *必须*与html-webpack-plugin一起使用！将它添加到`plugins`数组时，请务必将其放在html-webpack-plugin的最后一个实例*之后* 。

## 总结和参考

毫无疑问，代码拆分很重要。更重要的是， *如何*在特定应用中拆分代码需要您花费时间去弄明白。如果您想了解更多信息，或者只是想要了解不同的拆分方式，请查看以下资源列表：

- [Official webpack code splitting
    docs.](https://webpack.js.org/guides/code-splitting/)
- [Official Parcel.js code splitting
    docs.](https://parceljs.org/code_splitting.html)
- [Official React code splitting
    docs.](https://reactjs.org/docs/code-splitting.html)
- [Official Vue code splitting
    docs.](https://vuejsdevelopers.com/2017/07/03/vue-js-code-splitting-webpack/)
- [Official Angular code splitting
    docs.](https://angular.io/guide/lazy-loading-ngmodules)
- [Dynamic import() guidance here on Web
    Fundamentals.](/web/updates/2017/11/dynamic-import)

但请放心，代码拆分可以提高应用的性能，这会有很大收获，因为用户会发现您的应用更具吸引力且更易于使用。祝好运！

*特别感谢Patrick Meenan，Jason Miller， [Jeff Posnick](/web/resources/contributors/jeffposnick) ，Sam Saccone， [Philip Walton](/web/resources/contributors/philipwalton)提供的宝贵反馈，这些反馈显着提高了本文的质量。*
