project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 了解从何处开始优化应用的 JavaScript 可能令人望而却步。不过，如果您充分利用 webpack 等现代工具，Tree Shaking 可能会是一个不错的起点！

{# wf_updated_on: 2018-10-23 #} {# wf_published_on: 2018-06-14 #} {# wf_blink_components: Blink>JavaScript #}

# 使用Tree Shaking减少JavaScript负载 {: .page-title}

{% include "web/_shared/contributors/jeremywagner.html" %}

今天的Web应用程序可能会非常庞大，特别是它们的JavaScript部分。截至2018年中期，HTTP Archive推测[移动设备JavaScript的传输体积中位数](https://httparchive.org/reports/state-of-javascript#bytesJs)为大约350 KB。这只是传输体积！ JavaScript通常在通过网络传输时被压缩，这意味着在浏览器解压缩后，JavaScript的*实际*体积会相当大。重要的是，对脚本资源的*整个过程*而言，压缩是无关紧要的。 900KB的JavaScript资源解压缩后对解析器和编译器来说仍然是900KB，即使它在压缩时可能是~300 KB。

<figure>
  <img src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-1.svg?raw=true" alt="A diagram illustrating the process of
downloading, decompressing, parsing, compiling, and executing JavaScript.">
  <figcaption><b>图1</b> 。下载和运行JavaScript的过程。请注意，即使脚本的传输大小为压缩后的300KB，然而在解析，编译和执行JavaScript时仍然是900KB。</figcaption>
</figure>

JavaScript是一种高处理开销的资源。与下载后仅产生相对较少解码时间的图像不同，JavaScript必须被解析，编译，然后最终执行。一个字节一个字节地，这使得JavaScript比其他类型的资源开销更大。

<figure>
  <img srcset="images/figure-2-2x.png 2x, images/figure-2-1x.png 1x" src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-2-1x.png?raw=true" alt="A diagram comparing the processing time of 170
KB of JavaScript versus an equivalently sized JPEG image. The JavaScript
resource is far more resource-intensive byte for byte than the JPEG.">
  <figcaption><b>图2</b> 。解析/编译170 KB的JavaScript的开销与同等大小的JPEG图像的解码时间。 （ <a href="https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e" rel="noopener">来源</a> ）。</figcaption>
</figure>

[虽然JavaScript引擎](https://v8.dev/blog/background-compilation)在[不断改进以提高效率](https://blog.mozilla.org/javascript/2017/12/12/javascript-startup-bytecode-cache/) ，但改进JavaScript性能也是开发人员的任务。毕竟，有谁比建筑师更适合改进自己的应用建筑呢？

为此，有一些技术可以改善JavaScript性能。 [代码分离](https://webpack.js.org/guides/code-splitting/)就是这样一种技术，它通过将应用程序JavaScript划分为多个块来提高性能，并将这些块仅提供给应用程序中需要它们的的路由页面。这种技术有效，但它并没有解决JavaScript繁重应用程序的一个常见问题，即包含从未使用过的代码。为了解决这个问题，我们需要tree shaking。

## 什么是tree shaking？

[tree shaking](https://en.wikipedia.org/wiki/Tree_shaking)是无用代码消除的一种形式。 [该术语由Rollup推广开来](https://github.com/rollup/rollup#tree-shaking) ，但无用代码消除的概念已经存在了一段时间。该概念还被发现在[webpack](https://webpack.js.org/guides/tree-shaking/)中应用，本文通过示例应用程序对此进行了演示。

术语tree shaking来自应用程序的抽象模型及其作为树状结构的依赖关系。树中的每个节点都代表一个依赖项，为您的应用程序提供不同的功能。在现代应用程序中，这些依赖项是通过[静态`import`语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)引入的，如下所示：

```javascript
// Import all the array utilities!
import arrayUtils from "array-utils";
```

Note: 如果您不确定ES6模块是什么，我强烈推荐[这篇在Pony Foo上的优秀解答](https://ponyfoo.com/articles/es6-modules-in-depth) 。本指南假设您具备ES6模块如何工作的基本知识，因此如果您对它们一无所知，请阅读该文章！

在您的应用程序开发初期（如果您不介意，可以称为幼苗阶段），可能只有相对很少的依赖关系。您还使用了大多数（如果不是全部）您添加的依赖项。但是，随着应用程序的迭代，可能会添加更多依赖项。更复杂的是，较旧的依赖项不再使用，但可能无法从您的代码库中删除。最终结果是，应用程序最终布满大量[未使用的JavaScript](/web/updates/2018/05/lighthouse#unused_javascript) 。tree shaking通过利用我们如何使用静态`import`语句来引入ES6模块的特定部分来解决这个问题：

```javascript
// Import only some of the utilities!
import { unique, implode, explode } from "array-utils";
```

和上一个示例引入`"array-utils"`模块的*所有东西*（可能包含很多内容！）不同的是，这个`import`示例只引入了特定的部分。在开发版本中，这并不会改变什么，模块依然是整个都被引入进来，然而，我们可以通过webpack的配置筛选掉没有被明确引入的[`export`s](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)部分，使生产版本的代码更少。在本指南中，您将学习如何做到这一点！

## 寻找应用tree shaking的时机

为了便于说明，我创建了[一个单页应用程序示例](https://github.com/malchata/webpack-tree-shaking-example) ，该应用程序使用webpack来演示tree shaking的工作原理。如果您愿意，您可以克隆它，但是我们将在本指南中一起介绍每一步的方法，因此克隆下来不是必需的（除非亲自动手学习）。

示例应用程序是一个超级简单的关于吉他效果踏板的可搜索数据列表。您可以输入查询并弹出效果踏板列表。

<figure>
  <img srcset="images/figure-3-2x.png 2x, images/figure-3-1x.png 1x" src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-3-1x.png?raw=true" alt="A screenshot of a sample one page application
for searching a database of guitar effect pedals.">
  <figcaption><b>图3</b> 。示例应用程序的屏幕截图。</figcaption>
</figure>

可以预见，驱动此应用程序行为的脚本被分为vendor（即[Preact](https://preactjs.com/)和[Emotion](https://emotion.sh/) ）和特定于应用程序的代码块（或“chunk”，按webpack的说法）：

<figure>
  <img srcset="images/figure-4-2x.png 2x, images/figure-4-1x.png 1x" src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-4-1x.png?raw=true" alt="A screenshot of two application code bundles
(or chunks) shown in the network panel of Chrome's DevTools.">
  <figcaption><b>图4</b> 。该应用程序的两个JavaScript包。这些都是未压缩的尺寸。</figcaption>
</figure>

上图中显示的JavaScript包是生产版本，这意味着它们通过[uglification](http://lisperator.net/uglifyjs/)进行了优化。特定于应用程序的js包大小为21.1 KB，还不算糟糕（或者*并不是这样* ）。但是！应该注意的是，这里并没有使用tree shaking。让我们看看应用程序代码，看看我们可以做些什么来解决这个问题。

Note: 如果您不关心冗长的解释，只想深入了解代码，您可以继续查看应用程序GitHub仓库中的[`tree-shake`分支](https://github.com/malchata/webpack-tree-shaking-example/tree/tree-shake) 。你也可以对[这个分支与`master`](https://github.com/malchata/webpack-tree-shaking-example/compare/tree-shake)进行[对比，](https://github.com/malchata/webpack-tree-shaking-example/compare/tree-shake)以确切地看到改变了什么以启用tree shaking！

在任何应用程序中，寻找启用tree shaking的机会都将涉及查找静态`import`语句。 [在主要组件文件的顶部附近](https://github.com/malchata/webpack-tree-shaking-example/blob/master/src/components/FilterablePedalList/FilterablePedalList.js#L4) ，您将看到如下所示的行：

```javascript
import * as utils from "../../utils/utils";
```

也许你以前见过这样的代码。可以导入ES6模块导出的方式很多，但是这样的方式应该引起你的注意。这条特定的行似乎在说“嘿，从`utils`模块`import` *所有内容* ，并将其放在名为`utils`的命名空间中”。这里要问的一个重要问题是，“该模块中有多少*东西* ？”

好吧，如果你看看[`utils`模块的源代码](https://github.com/malchata/webpack-tree-shaking-example/blob/master/src/utils/utils.js) ，你会发现它有*很多* 。大约有1,300行代码。

好的，别担心。也许所有这些东西都在使用，对吧？ *我们*真的需要所有的东西？让我们通过搜索我们导入`utils`模块[的主要组件文件进行](https://github.com/malchata/webpack-tree-shaking-example/blob/master/src/components/FilterablePedalList/FilterablePedalList.js)仔细检查，看看该命名空间被调用多少次。显然，我们必须使用的只是所有*东西*中的一部分。

<figure>
  <img srcset="images/figure-5-2x.png 2x, images/figure-5-1x.png 1x" src="https://github.com/google/WebFundamentals/blob/master/src/content/en/fundamentals/performance/optimizing-javascript/tree-shaking/images/figure-5-1x.png?raw=true" alt="A screenshot of a search in a text editor for
'utils.', returning only 3 results.">
  <figcaption><b>图5</b> 。我们从中导入大量模块的utils命名空间仅在主组件文件中调用三次。</figcaption>
</figure>

嗯， *这*真是有点糟糕。我们只在应用程序代码中的三个位置使用了`utils`对象。但是针对于什么功能呢？如果我们再次查看主要组件文件，它似乎只有一个函数，即`utils.simpleSort` ，它用于在排序下拉列表更改时按照许多条件对搜索结果进行排序：

```javascript
if (this.state.sortBy === "model") {
  // Simple sort gets used here...
  json = utils.simpleSort(json, "model", this.state.sortOrder);
} else if (this.state.sortBy === "type") {
  // ..and here...
  json = utils.simpleSort(json, "type", this.state.sortOrder);
} else {
  // ..and here.
  json = utils.simpleSort(json, "manufacturer", this.state.sortOrder);
}
```

所以，那太好了。在带有一堆导出的1,300行文件中，我只使用其中一个。这导致了对于性能非常糟糕的结果。

Note: 这个项目有目的地保持简单，所以在这种情况下很容易找出代码膨胀的来源。然而，在具有许多模块的大型项目中，很难找出js包由哪些引用构成。 [Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)和[source-map-explorer](https://www.npmjs.com/package/source-map-explorer)等工具可以提供帮助，满足这一需求的辅助工具还在开发之中。

当然，也许是时候承认承认这个例子是为本文所说的好处而*有些*故意而为之。然而这个例子的的确确就在这，但它并没有改变这种您在自己的真实应用程序中可能遇到的类似于这样排序功能中存在机会时机的事实。所以既然已经发现使用很有用的tree shaking的时机，那么我们该怎么*做*呢？

## 保证Babel不要将ES6模块转换为CommonJS模块

[Babel](https://babeljs.io/) 对于大多数应用来说都是不可或缺的。 不幸的是，它会使像tree shaking这样简单的任务变得困难，准确地说是*因为*它为我们所做的事情。如果你正在使用[`babel-preset-env`](https://babeljs.io/docs/plugins/preset-env/)，那么它自动为您做的一件事就是将你的ES6模块转译为更具兼容性的CommonJS模块(例如，在模块中使用`require`替代`import`)。在我们不使用tree shaking的时候，这是一种很好的处理方式。

问题在于CommonJS中实现tree shaking要困难得多，如果你决定要使用它的话，webpack将不会知道如果在代码中筛选依赖。解决方法很简单：我们只需要配置`babel-preset-env`不要将ES6模块转译。就是在您Babel的配置中(在`.babelrc`或 `package.json`中)额外添加一些配置项:

```json
{
  "presets": [
    ["env", {
      "modules": false
    }]
  ]
}
```

在您`babel-preset-env` 的配置中一句简单的`"modules": false` 就可以使Babel的如我们所想的那样工作，这样webpack就可以正确分析你的依赖树并筛选掉无用的依赖。 而且，这样并不会导致兼容性问题，webpack最终还是会将你的代码转换成更具兼容性的格式。

## 注意副作用

另一方面要考虑当你在应用中使用tree shaking的时候是否会产生*副作用*。 比如在你的函数内修改了自身作用域之外的东西，如下所示：

```javascript
let fruits = ["apple", "orange", "pear"];

console.log(fruits); // (3) ["apple", "orange", "pear"]

const addFruit = function(fruit) {
  fruits.push(fruit);
};

addFruit("kiwi");

console.log(fruits); // (4) ["apple", "orange", "pear", "kiwi"]
```

在这个简单示例中， `addFruit`在修改`fruits`数组的时候产生了副作用，因为fruits不属于 `addFruit`的函数作用域。

副作用也适用于ES6模块，它也会影响tree shaking。如果是具有可预测性的，给定同一输入必然会返回相同输出，也就是不会修改他们作用域范围之外依赖的模块，我们可以安全地使用tree shaking。它们是自包含的， *模块化*的代码片段。

考虑到webpack，我们可以通过在项目的`package.json`中配置`"sideEffects": false`来提示它我们没有使用具有附作用的包或依赖。

```json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": false
}
```

或者, 您也可以告诉webpack具体哪些文件是有副作用的：

```json
{
  "name": "webpack-tree-shaking-example",
  "version": "1.0.0",
  "sideEffects": [
    "./src/utils/utils.js"
  ]
}
```

在后一个例子中，任何没有具体说明的文件都被假定为没有副作用。如果您不想在您的`package.json`文件中添加这些信息，您可以[在您的webpack配置文件中通过`module.rules`添加这些配置](https://github.com/webpack/webpack/issues/6065#issuecomment-351060570)。

## 只引入我们需要的模块

我们已经告诉Babel不要转译我们的ES6模块，但是我们还需要在我们的import语句中做一点调整，只引入我们需要的`utils`函数。在本指南的示例中，我们需要的只是`simpleSort`：

```javascript
import { simpleSort } from "../../utils/utils";
```

使用这种语法，就像在说：“嘿，给我在`utils` 模块中只导出`simpleSort`这一个方法 ”。因为我们只引入了`simpleSort` 而不是整个`utils`模块，因此我们需要把每一个`utils.simpleSort`都改成`simpleSort`：

```javascript
if (this.state.sortBy === "model") {
  json = simpleSort(json, "model", this.state.sortOrder);
} else if (this.state.sortBy === "type") {
  json = simpleSort(json, "type", this.state.sortOrder);
} else {
  json = simpleSort(json, "manufacturer", this.state.sortOrder);
}
```

现在我们完成了使用tree shaking的所有需要做的工作。让我回退一步，以下是webpack在使用tree shaking*之前*的输出：

```shell
                 Asset      Size  Chunks             Chunk Names
js/vendors.16262743.js  37.1 KiB       0  [emitted]  vendors
   js/main.797ebb8b.js  20.8 KiB       1  [emitted]  main
```

这是使用tree shaking*之后*的输出：

```shell
                 Asset      Size  Chunks             Chunk Names
js/vendors.45ce9b64.js  36.9 KiB       0  [emitted]  vendors
   js/main.559652be.js  8.46 KiB       1  [emitted]  main
```

虽然两个包都有减少了，单对于`main`来说减少量更大。通过筛选掉`utils`模块无用的部分，我们的js包大约砍掉了60%的体积。这不仅仅体现在脚本的下载时间上，在处理时间上也是如此。

## 但事情没那么简单

大多数情况下，如果你在webpack最新版本中像上述那样做，tree shaking会正常工作，但是总会有些例外的情况让你抓狂。例如， [Lodash](https://lodash.com/)有一些奇怪的情况，像本指南中这样做tree shaking并不会正常工作。由于Lodash的架构，您必须a）安装[`lodash-es`](https://www.npmjs.com/package/lodash-es)以代替旧版的[`lodash`](https://www.npmjs.com/package/lodash) b）使用稍微不同的语法（称为“樱桃采摘”）来筛选掉其他依赖项：

```javascript
// This still pulls in all of lodash even if everything is configured right.
import { sortBy } from "lodash";

// This will only pull in the sortBy routine.
import sortBy from "lodash-es/sortBy";
```

如果您希望您的`import`语法保持一致，你*可以*只使用标准的 `lodash`包，并安装[`babel-plugin-lodash`](http://babel-plugin-lodash/)。一旦您在Babel配置中加入了此插件，您就可以使用同类型的`import`语法来筛选掉无用的依赖。

如果你遇到一个没有受tree shaking影响的依赖库，请查看它的方法是否是以ES6模块的方式导出的。如果它的导出是以CommonJS的格式（例如，`module.exports`），那么它的代码不会被webpack的tree shaking作用到。有些插件可以为CommonJS模块提供tree shaking功能（例如，[`webpack-common-shake`](https://github.com/indutny/webpack-common-shake)），但是还是遇到一些[不支持tree shaking的CommonJS模式](https://github.com/indutny/webpack-common-shake#limitations)。如果想在您的应用中筛选无用的依赖，ES6模块应该是您始终坚持的选择。

## 去尝试使用tree shaking吧！

使用tree shaking的筛选效果取决于您的app和它特定的依赖关系和架构。 试试吧，如果您知道一个还没有在您的构建过程使用的优化方法，去尝试一下并没有什么坏处，也许它可以为您的app带来很大的益处。在您的脚本中优化筛选掉任何无用的代码都是值得的。

您可能在tree shaking中有所收获，或者没有。但是通过您的构建系统的优化配置可以您生产环境的代码只引入必需的依赖，可以使您的应用代码体积尽可能得小。这对于性能，扩展性，还有您的用户，都是有益的。

*特别感谢 Kristofer Baxter, Jason Miller, [Addy Osmani](/web/resources/contributors/addyosmani), [Jeff Posnick](/web/resources/contributors/jeffposnick), Sam Saccone, 和 [Philip Walton](/web/resources/contributors/philipwalton)为本文提出的宝贵意见，使本文具备更高的质量。*
