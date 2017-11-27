project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:了解如何使用 Chrome DevTools 的堆分析器记录堆快照以及如何查找内存泄漏。

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-06-08 #}

# 如何记录堆快照 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

了解如何使用 Chrome DevTools 的堆分析器记录堆快照以及如何查找内存泄漏。

Chrome DevTools 的堆分析器可以按页面的 JavaScript 对象和相关 DOM 节点显示内存分配（另请参阅[对象保留树](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree)）。使用分析器可以拍摄 JS 堆快照、分析内存图、比较快照以及查找内存泄漏。






## 拍摄快照

在 Profiles 面板上，选择 **Take Heap Snapshot**，然后点击 **Start** 或者按 <span class="kbd">Cmd</span> + <span class="kbd">E</span> 或 <span class="kbd">Ctrl</span> + <span class="kbd">E</span>：

![选择分析类型](imgs/profiling-type.png)

**快照**最初存储在渲染器进程内存中。当您点击快照图标进行查看时，它们将根据要求传输到 DevTools 中。


在快照加载到 DevTools 中并解析后，快照名称下方将出现一个数字，显示[可到达 JavaScript 对象](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)的总大小：



![可到达对象的总大小](imgs/total-size.png)

注：只有可到达对象才会包含到快照中。此外，拍摄快照始终从垃圾回收开始。

## 清除快照

按 Clear all profiles 图标可以（同时从 DevTools 和渲染器内存）移除快照：

![移除快照](imgs/remove-snapshots.png)

关闭 DevTools 窗口不会从渲染器内存中删除配置文件。重新打开 DevTools 时，之前拍摄的所有快照都会重新显示在快照列表中。

<p class="note"><strong>示例：</strong>查看此<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">离散对象</a>示例，并使用堆分析器对其进行分析。您应看到多个（对象）项目分配。</p>

## 查看快照

从不同角度查看不同任务的快照。

**Summary 视图**可以显示按构造函数名称分组的对象。使用此视图可以根据按构造函数名称分组的类型深入了解对象（及其内存使用）。此视图特别适用于[跟踪 DOM 泄漏](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks)。


**Comparison 视图**可以显示两个快照之间的不同。使用此视图可以比较两个（或多个）内存快照在某个操作前后的差异。检查已释放内存的变化和参考计数让您可以确认是否存在内存泄漏及其原因。

**Containment 视图**允许您探索堆内容。此视图提供了一种更好的对象结构视图，有助于分析全局命名空间 (window) 中引用的对象以找出是什么让它们始终如影随形。使用此视图可以分析闭包以及在较低级别深入了解您的对象。

**Dominators 视图**可以显示[支配树](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)，并且对于查找聚集点非常有用。此视图有助于确认对对象的意外引用已消失，以及删除/垃圾回收正在运行。




要在视图间切换，请使用视图底部的选择器：

![切换视图选择器](imgs/switch-views.png)

注：并不是所有属性都存储在 JavaScript 堆上。不会捕捉使用执行原生代码的 getter 实现的属性。另外，也不会捕捉数字等非字符串值。

### Summary 视图

快照最初会在 Summary 视图下打开并显示对象概览，可以将此视图展开以显示实例：

![Summary 视图](imgs/summary-view.png)

顶级条目为“概览”行。这些行显示：

* **Constructor** 表示使用此构造函数创建的所有对象。
* **对象实例数**显示在 # 列中。
* **Shallow Size** 列显示通过特定构造函数创建的所有对象浅层大小的总和。浅层大小是指对象自身占用的内存大小（一般来说，数组和字符串的浅层大小比较大）。另请参阅[对象大小](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)。
* **Retained Size** 列显示同一组对象中最大的保留大小。某个对象删除后（其依赖项不再可到达）可以释放的内存大小称为保留大小。另请参阅[对象大小](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)。
* **Distance** 显示使用节点最短简单路径时距根节点的距离。

在上面的视图中展开一个概览行后，将显示其所有实例。对于每一个实例，其浅层大小和保留大小将显示在相应的列中。@ 字符后面的数字是对象的唯一 ID，您可以使用此 ID 以对象为基础比较堆快照。

请注意，黄色对象具有 JavaScript 引用，红色对象则是引用自具有黄色背景的对象的已分离节点。

**各个构造函数（组）条目在堆分析器中与什么对应？**

![构造函数组](imgs/constructor-groups.jpg)

* **（全局属性）**– 全局对象（例如“window”）与其引用的对象之前的中间对象。如果对象使用构造函数 Person 创建且由某个全局对象占用，那么保留路径将类似于 [global] >（全局属性）> Person。这与常规相反，常规情况下对象直接引用彼此。我们出于性能原因而采用中间对象。全局项会定期修改，而属性访问优化则非常适合不适用于全局项的非全局对象。

* **（根）**– 保留树中的根条目是引用选定对象的条目。这些条目也可能是引擎出于其自身目的创建的引用。引擎具有引用对象的缓存，但所有此类引用非常弱，并且如果没有很强的引用，无法阻止对象被回收。

* **（闭包）**– 通过函数闭包对一组对象的引用计数

* **（array、string、number、regexp）** – 不同对象类型的列表，这些类型具有引用 Array、String、Number 或正则表达式的属性。

* **（已编译代码）**– 简单地说就是与已编译代码相关的任何内容。脚本与函数类似，但对应于 &lt;script&gt; 正文。SharedFunctionInfo (SFI) 是位于函数与已编译代码之间的对象。函数通常具有上下文，而 SFI 则没有。

* **HTMLDivElement**、**HTMLAnchorElement**、**DocumentFragment**等 – 引用元素或者您的代码所引用特定类型的文本对象。


<p class="note"><strong>示例：</strong>查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">演示页面</a>，了解如何使用 Summary 视图。</p>

### Comparison 视图

通过相互比较多个快照，查找泄漏的对象。要验证某个特定的应用操作不会引起泄漏（例如，通常来说，一对直接和反向操作（比如打开一个文档然后将其关闭）不应泄漏任何垃圾），您可以按照下面的情形操作：

1. 在执行任何操作前拍摄一个堆快照。
2. 执行操作（以一种您认为会引起泄漏的方式与页面交互）。
3. 执行反向操作（执行反向交互并重复几次）。
4. 拍摄第二个堆快照，然后将其视图更改为 Comparison，并与快照 1 进行比较。

在 Comparison 视图中，将显示两个快照之间的不同。展开概览条目时，将显示已添加和删除的对象实例：

![Comparison 视图](imgs/comparison-view.png)

<p class="note"><strong>示例：</strong>查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">演示页面</a>，了解如何使用快照比较检测泄漏。</p>

### Containment 视图

Containment 视图基本上是您应用的对象结构的“俯瞰视图”。利用此视图，您可以深入了解函数闭包、观察共同组成您的 JavaScript 对象的 VM 内部对象，以及从一个非常低的级别了解您的应用使用的内存量。

此视图提供了多个入口点：

* **DOMWindow 对象**是被视为 JavaScript 代码“全局”对象的对象。
* **GC 根**是 VM 的垃圾使用的实际 GC 根。GC 根可以由内置对象映射、符号表、VM 线程堆栈、编译缓存、句柄作用域和全局句柄组成。
* **原生对象**是“推送”至 JavaScript 虚拟机内以允许自动化的浏览器对象，例如 DOM 节点和 CSS 规则。

![Containment 视图](imgs/containment-view.png)

<p class="note">
  <strong>示例：</strong>查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">演示页面</a>，了解如何使用此视图探索闭包和事件处理程序。</p>


<strong>闭包提示</strong>

闭包有助于为函数命名，让您可以轻松地在快照中区分不同的闭包。例如，下面的示例未使用已命名的函数：


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

而下面的示例则使用了已命名的函数：


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![为函数命名以区分闭包](imgs/domleaks.png)

<p class="note">
    <strong>示例：</strong>
    查看此<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">为什么 eval 是魔鬼</a>示例，分析闭包对内存的影响。您可能还想深入研究此示例，了解如何记录<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">堆分配</a>。</p>


### Dominators 视图

[Dominators](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) 视图可以显示堆图的支配树。此视图类似于 Containment 视图，但缺少属性名称。这是因为对象的支配项可能缺少对它的直接引用；支配树不是堆图的生成树。但它仍然非常有用，可以帮助我们快速确定内存聚集点。






<p class="note"><strong>注：</strong>在 Chrome Canary 中，可以通过转到 Settings > Show advanced heap snapshot properties 然后重启 DevTools 的方式启用 Dominators 视图。</p>

![Dominators 视图](imgs/dominators-view.png)

<p class="note">
    <strong>示例：</strong>
    查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">演示</a>，了解如何查找聚集点。深入研究此示例，了解<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">保留路径和支配项</a>。</p>


## 查询颜色编码

对象的属性和属性值具有不同的类型，并采用相应的颜色进行编码。
每个属性都具有以下四种类型之一：

* **a: property** - 具有名称的正则属性，可以通过 .（点）运算符或者 [ ]（方括号）标记访问，例如 ["foo bar"]；
* **0: element** - 具有数字索引的正则属性，可以通过 [ ]（方括号）标记访问；
* **a: context var** - 函数上下文中的变量，可以通过其名称从函数闭包内访问；
* **a: system prop** - 由 JavaScript VM 添加的属性，无法从 JavaScript 代码访问。

被指定为 `System ` 的对象没有对应的 JavaScript 类型。这些对象是 JavaScript VM 的对象系统实现的一部分。V8 会将相同堆中的大多数内部对象分配为用户的 JS 对象。因此，这些对象只是 v8 内部项。

## 查找特定对象

要在回收的堆中查找某个对象，您可以使用 <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd> 搜索并提供对象 ID。

## 发现 DOM 泄漏

堆分析器可以反映浏览器原生对象（DOM 节点、CSS 规则）与 JavaScript 对象之间的双向依赖关系。这样有助于发现由被遗忘的已分离 DOM 子树引起的不可见泄漏。




DOM 泄漏可能比您想象的要大。思考下面的示例 - 什么时候发生 #tree GC？



      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf` 可以维持对其父级 (parentNode) 的引用，并以递归方式返回 `#tree`，因此，只有 leafRef 被作废后，`#tree` 下的整个树才会成为 GC 的候选。



![DOM 子树](imgs/treegc.png)

<p class="note">
    <strong>示例：</strong>
    查看此<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">泄漏的 DOM 节点</a>示例，了解 DOM 节点的什么地方可能出现泄漏以及如何检测泄漏。您还可以查看这个 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">DOM 泄漏超出预期</a>示例，继续深入研究。</p>


要详细了解 DOM 泄漏和内存分析基础知识，请参阅 Gonzalo Ruiz de Villa 编写的[使用 Chrome DevTools 查找和调试内存泄漏](http://slid.es/gruizdevilla/memory)。


<p class="note">
    <strong>示例</strong>：
    查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">演示</a>，了解已分离的 DOM 树。</p>





{# wf_devsite_translation #}
