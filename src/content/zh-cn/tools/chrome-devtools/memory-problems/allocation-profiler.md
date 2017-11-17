project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用分配分析器工具可以查找未正确执行垃圾回收的对象，并继续保留内存。

{# wf_updated_on:2015-07-08 #}
{# wf_published_on:2015-04-13 #}

# 如何使用分配分析器工具 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}使用分配分析器工具可以查找未正确执行垃圾回收的对象，并继续保留内存。



## 工具的工作方式

**分配分析器**将[堆分析器](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)的详细快照信息与 [Timeline 面板](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)的增量式更新和跟踪相结合。与这些工具类似，跟踪对象的堆分配涉及开始记录，执行一系列操作，然后停止记录进行分析。






该工具在整个记录过程中定期（频率高达每 50 毫秒一次！）拍摄堆快照，并在记录结束时最后拍摄一次快照。

![分配分析器](imgs/object-tracker.png)

注：@ 后面的数字是存在于拍摄的多个快照之间的对象 ID。使用此 ID 可以精确比较堆状态。显示对象的地址毫无意义，因为对象在垃圾回收过程中会被移动。

## 启用分配分析器

要开始使用分配分析器，请执行以下操作：

1. 确保您已安装最新的 [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html)。
2. 打开 Developer Tools，然后点击右下方的齿轮图标。
3. 现在，打开 Profiler 面板，您会看到名为“Record Heap Allocations”的配置文件

![Record heap allocations 分析器](imgs/record-heap.png)

## 读取堆分配配置文件

堆分配配置文件会显示正在创建对象的位置并确定保留路径。在下面的快照中，顶部的竖线指示在堆中发现新对象的时间。


每条线的高度与最近分配的对象大小对应，竖线的颜色表示这些对象是否仍然显示在最终的堆快照中。蓝色竖线表示在时间线最后对象仍然显示，灰色竖线表示对象已在时间线期间分配，但曾对其进行过垃圾回收：





![分配分析器快照](imgs/collected.png)

在下面的快照中，操作执行了 10 次。示例程序缓存了五个对象，因此才有最后五条蓝色竖线。最左边蓝色竖线指示潜在问题。



然后，您可以使用上面时间线中的滑块放大特定快照并查看最近在该点分配的对象：


![放大快照](imgs/sliders.png)

点击堆中的特定对象会在堆快照的底部显示其保留树。检查对象的保留路径能够为您提供足够的信息以了解对象为什么未被回收，您可以进行必要的代码更改以移除不必要的引用。

## 按函数查看内存分配 {: #allocation-profiler }

您还可以按 JavaScript 函数查看内存分配。如需了解详细信息，请参阅[按函数调查内存分配](index#allocation-profile)。




{# wf_devsite_translation #}
