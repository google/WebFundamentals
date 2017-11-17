project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:了解如何使用 Chrome 和 DevTools 查找影响页面性能的内存问题，包括内存泄漏、内存膨胀和频繁的垃圾回收。

{# wf_updated_on:2015-08-03 #}
{# wf_published_on:2015-04-13 #}

# 解决内存问题 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

了解如何使用 Chrome 和 DevTools 查找影响页面性能的内存问题，包括内存泄漏、内存膨胀和频繁的垃圾回收。




### TL;DR {: .hide-from-toc }
- 使用 Chrome 的任务管理器了解您的页面当前正在使用的内存量。
- 使用 Timeline 记录可视化一段时间内的内存使用。
- 使用堆快照确定已分离的 DOM 树（内存泄漏的常见原因）。
- 使用分配时间线记录了解新内存在 JS 堆中的分配时间。


## 概览

在 [RAIL][RAIL] 性能模型的精髓中，您的性能工作的焦点应是用户。


内存问题至关重要，因为这些问题经常会被用户察觉。
用户可通过以下方式察觉内存问题：


* **页面的性能随着时间的延长越来越差。** 这可能是内存泄漏的症状。
内存泄漏是指，页面中的错误导致页面随着时间的延长使用的内存越来越多。
* **页面的性能一直很糟糕。** 这可能是内存膨胀的症状。
内存膨胀是指，页面为达到最佳速度而使用的内存比本应使用的内存多。
* **页面出现延迟或者经常暂停。** 这可能是频繁垃圾回收的症状。
垃圾回收是指浏览器收回内存。
浏览器决定何时进行垃圾回收。
  回收期间，所有脚本执行都将暂停。因此，如果浏览器经常进行垃圾回收，脚本执行就会被频繁暂停。


### 内存膨胀：如何界定“过多”？

内存泄漏很容易确定。如果网站使用的内存越来越多，则说明发生内存泄漏。
但内存膨胀比较难以界定。
什么情况才算是“使用过多的内存”？

这里不存在硬性数字，因为不同的设备和浏览器具有不同的能力。
在高端智能手机上流畅运行的相同页面在低端智能手机上则可能崩溃。



界定的关键是使用 RAIL 模型并以用户为中心。了解什么设备在您的用户中深受欢迎，然后在这些设备上测试您的页面。如果体验一直糟糕，则页面可能超出这些设备的内存能力。


[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## 使用 Chrome 任务管理器实时监视内存使用

使用 Chrome 任务管理器作为内存问题调查的起点。
任务管理器是一个实时监视器，可以告诉您页面当前正在使用的内存量。


1. 按 <kbd>Shift</kbd>+<kbd>Esc</kbd> 或者转到 Chrome 主菜单并选择 **More tools** > **Task manager**，打开任务管理器。



   ![打开任务管理器](imgs/task-manager.png)


1. 右键点击任务管理器的表格标题并启用 **JavaScript memory**。


   ![启用 JavaScript memory](imgs/js-memory.png)


下面两列可以告诉您与页面的内存使用有关的不同信息：

* **Memory** 列表示原生内存。DOM 节点存储在原生内存中。
如果此值正在增大，则说明正在创建 DOM 节点。
* **JavaScript Memory** 列表示 JS 堆。此列包含两个值。
您感兴趣的值是实时数字（括号中的数字）。
实时数字表示您的页面上的可到达对象正在使用的内存量。
如果此数字在增大，要么是正在创建新对象，要么是现有对象正在增长。



<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## 使用 Timeline 记录可视化内存泄漏

您也可以使用 Timeline 面板作为调查的起点。
Timeline 面板可以帮助您直观了解页面在一段时间内的内存使用情况。


1. 在 DevTools 上打开 **Timeline** 面板。
1. 启用 **Memory** 复选框。
1. [做记录][recording]。

提示：一种比较好的做法是使用强制垃圾回收开始和结束记录。
在记录时点击 **Collect garbage** 按钮 (![强制垃圾回收按钮][cg]{:.inline}) 可以强制进行垃圾回收。



要显示 Timeline 内存记录，请考虑使用下面的代码：

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

每次按代码中引用的按钮时，将向文档正文附加 1 万个 `div` 节点，并将一个由 100 万个 `x` 字符组成的字符串推送到 `x` 数组。运行此代码会生成一个类似于以下屏幕截图的 Timeline 记录：


![简单增长示例][sg]

首先，我们来说明一下用户界面。**Overview** 窗格中的 **HEAP** 图表（**NET** 下方）表示 JS 堆。**概览**窗格下方是**计数器**窗格。从这里，您可以看到内存使用按 JS 堆 （与 **Overview** 窗格中的 **HEAP** 图表相同）、文档、DOM 节点、侦听器和 GPU 内存细分。停用对应的复选框可以将其在图表中隐藏。




现在，我们将根据屏幕截图来分析代码。如果查看节点计数器（绿色图表），您会看到它与代码完全匹配。节点计数以离散步长方式增大。
您可以假定节点计数的每次增大都是对 `grow()` 的一次调用。
JS 堆图表（蓝色图表）的显示并不直接。为了符合最佳做法，第一次下降实际上是一次强制垃圾回收（通过按 **Collect garbage** 按钮实现）。随着记录的进行，您会看到 JS 堆大小高低交错变化。这种现象是正常的并且在预料之中：每次点击按钮，JavaScript 代码都会创建 DOM 节点，在创建由 100 万个字符组成的字符串期间，代码会完成大量工作。这里的关键是，JS 堆在结束时会比开始时大（这里“开始”是指强制垃圾回收后的时间点）。在实际使用过程中，如果您看到这种 JS 堆大小或节点大小不断增大的模式，则可能存在内存泄漏。


[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## 使用堆快照发现已分离 DOM 树的内存泄漏

只有页面的 DOM 树或 JavaScript 代码不再引用 DOM 节点时，DOM 节点才会被作为垃圾进行回收。
如果某个节点已从 DOM 树移除，但某些 JavaScript 仍然引用它，我们称此节点为“已分离”。已分离的 DOM 节点是内存泄漏的常见原因。此部分将教您如何使用 DevTools 的堆分析器确定已分离的节点。



下面是一个已分离 DOM 节点的简单示例。 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedTree = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

点击代码中引用的按钮将创建一个包含 10 个 `li` 子级的 `ul` 节点。
这些节点由代码引用，但不存在于 DOM 树中，因此它们已分离。


堆快照是确定已分离节点的一种方式。顾名思义，堆快照可以为您显示拍摄快照时内存在您页面的 JS 对象和 DOM 节点间的分配。



要创建快照，请打开 DevTools 并转到 **Profiles** 面板，选择 **Take Heap Snapshot** 单选按钮，然后按 **Take Snapshot** 按钮。

 

![Take Heap Snapshot][ths]

快照可能需要一些时间处理和加载。完成后，请从左侧面板（名称为 **HEAP SNAPSHOTS**）中选择该快照。
 

在 **Class filter** 文本框中键入 `Detached`，搜索已分离的 DOM 树。


![针对已分离的节点过滤][df]

展开三角符号以调查分离的树。

![调查分离的树][ed]

以黄色突出显示的节点具有 JavaScript 代码对它们的直接引用。
以红色突出显示的节点则没有直接引用。只有属于黄色节点的树时，它们才处于活动状态。
一般而言，您需要将注意力放在黄色节点上。
修复代码，使黄色节点处于活动状态的时间不长于需要的时间，您也需要消除属于黄色节点树的红色节点。



点击黄色节点对其进行进一步调查。在 **Object** 窗格中，您可以看到与正在引用该节点的代码相关的更多信息。
例如，在下面的屏幕截图中，您可以看到 `detachedTree` 变量正在引用该节点。要解决这一特定的内存泄漏，您需要研究使用 `detachedTree` 的代码并确保在不需要时，此代码可以移除其对节点的引用。



![调查黄色节点][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## 使用分配时间线确定 JS 堆内存泄漏

分配时间线是您可以用于跟踪 JS 堆中内存泄漏的另一种工具。
 

要显示分配时间线，请考虑使用下面的代码：

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

每次按代码中引用的按钮时，都会向 `x` 数组添加一个由 100 万个字符组成的字符串。


要记录分配时间线，请打开 DevTools，然后转到 **Profiles** 面板，选择 **Record Allocation Timeline** 单选按钮，按 **Start** 按钮，执行您怀疑导致内存泄漏的操作。完成后，按 **stop recording** 按钮 (![stop recording 按钮][sr]{:.inline})。




 

记录时，请注意分配时间线上是否显示任何蓝色竖线（如下面的屏幕截图所示）。
 

![新分配][na]

这些蓝色竖线表示新内存分配。新内存分配中可能存在内存泄漏。
您可以在竖线上放大，将 **Constructor** 窗格筛选为仅显示在指定时间范围内分配的对象。

 

![缩放的分配时间线][zat]

展开对象并点击它的值，可以在 **Object** 窗格中查看其更多详情。
例如，在下面的屏幕截图中，通过查看新分配对象的详细信息，您可以看到它被分配到 `Window` 作用域中的 `x` 变量。



![对象详情][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## 按函数调查内存分配 {: #allocation-profile }

使用 **Record Allocation Profiler** 类型可按 JavaScript 函数查看内存分配。


![Record Allocation Profiler](imgs/record-allocation-profile.png)

1. 选择 **Record Allocation Profiler** 单选按钮。如果页面上有一个工作线程，您可以使用 **Start** 按钮旁的下拉菜单选择它作为分析目标。
1. 按 **Start** 按钮。
1. 在您想调查的页面上执行操作。
1. 完成所有操作时按 **Stop** 按钮。



DevTools 按函数显示内存分配明细。默认视图为 **Heavy (Bottom Up)**，将分配了最多内存的函数显示在最上方。



![分配分析](imgs/allocation-profile.png)

## 发现频繁的垃圾回收

如果感觉页面经常暂停，则可能存在垃圾回收问题。
 

您可以使用 Chrome 任务管理器或者 Timeline 内存记录发现频繁的垃圾回收。
在任务管理器中，**Memory** 或 **JavaScript Memory** 值频繁上升和下降表示存在频繁的垃圾回收。在 Timeline 记录中，JS 堆或节点计数图表频繁上升和下降指示存在频繁的垃圾回收。


确定问题后，您可以使用分配时间线记录找出内存正在分配到什么地方，以及哪些函数导致分配。

 


{# wf_devsite_translation #}
