project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 的 Timeline 面板可以记录和分析您的应用在运行时的所有活动。这里是开始调查应用中可觉察性能问题的最佳位置。

{# wf_updated_on:2016-03-07 #}
{# wf_published_on:2015-06-08 #}

# 如何使用 Timeline 工具 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools 的 <em>Timeline</em> 面板可以记录和分析您的应用在运行时的所有活动。
这里是开始调查应用中可觉察性能问题的最佳位置。



![Timeline 工具](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- 执行 Timeline 记录，分析页面加载或用户交互后发生的每个事件。
- 在 Overview 窗格中查看 FPS、CPU 和网络请求。
- 点击火焰图中的事件以查看与其相关的详细信息。
- 放大显示一部分记录以简化分析。


## Timeline 面板概览 {:#timeline-overview}

Timeline 面板包含以下四个窗格：

1. **Controls**。开始记录，停止记录和配置记录期间捕获的信息。
2. **Overview**。
页面性能的高级汇总。更多内容请参见下文。
3. **火焰图**。
CPU 堆叠追踪的可视化。 

   您可以在**火焰图**上看到一到三条垂直的虚线。蓝线代表 `DOMContentLoaded` 事件。
绿线代表首次绘制的时间。
红线代表 `load` 事件。

4. **Details**。选择事件后，此窗格会显示与该事件有关的更多信息。
未选择事件时，此窗格会显示选定时间范围的相关信息。
 

![带标注的 Timeline 面板](imgs/timeline-annotated.png)

### Overview 窗格

**Overview** 窗格包含以下三个图表：

1. **FPS**。每秒帧数。绿色竖线越高，FPS 越高。
FPS 图表上的红色块表示长时间帧，很可能会出现[卡顿][jank]。
2. **CPU**。
CPU 资源。此[面积图][ac]指示消耗 CPU 资源的事件类型。

3. **NET**。每条彩色横杠表示一种资源。横杠越长，检索资源所需的时间越长。
每个横杠的浅色部分表示等待时间（从请求资源到第一个字节下载完成的时间）。

深色部分表示传输时间（下载第一个和最后一个字节之间的时间）。



   横杠按照以下方式进行彩色编码：
   <!-- source: https://goo.gl/eANVFf -->
   
   * HTML 文件为**<span style="color:hsl(214, 67%, 66%)">蓝色</span>**。
   * 脚本为**<span style="color:hsl(43, 83%, 64%)">黄色</span>**。
   * 样式表为**<span style="color:hsl(256, 67%, 70%)">紫色</span>**。
   * 媒体文件为**<span style="color:hsl(109, 33%, 55%)">绿色</span>**。
   * 其他资源为**<span style="color:hsl(0, 0%, 70%)">灰色</span>**。


![Overview 窗格，带标注](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

## 做记录

要记录*页面加载*，请打开 **Timeline** 面板，打开想要记录的页面，然后重新加载页面。
**Timeline** 面板会自动记录页面重新加载。


要记录*页面交互*，请打开 **Timeline** 面板，然后按 **Record** 按钮 (![Record 按钮](imgs/record-off.png){:.inline}) 或者键入键盘快捷键 <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows / Linux)，开始记录。记录时，**Record** 按钮会变成红色。执行页面交互，然后按 **Record** 按钮或再次键入键盘快捷键停止记录。



完成记录后，DevTools 会猜测哪一部分记录与您最相关，并自动缩放到那一个部分。


### 记录提示

* **尽可能保持记录简短**。简短的记录通常会让分析更容易。
* **避免不必要的操作**。避免与您想要记录和分析的活动无关联的操作（鼠标点击、网络加载，等等）。例如，如果您想要记录点击 Login 按钮后发生的事件，请不要滚动页面、加载图像，等等。
* **停用浏览器缓存**。记录网络操作时，最好从 DevTools 的 Settings 面板或 [**Network conditions**][nc] 抽屉式导航栏停用浏览器的缓存。
* **停用扩展程序**。Chrome 扩展程序会给应用的 Timeline 记录增加不相关的噪声。
以[隐身模式][incognito]打开 Chrome 窗口或者创建新的 [Chrome 用户个人资料][new chrome profile]，确保您的环境中没有扩展程序。




[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

## 查看记录详细信息

在**火焰图**中选择事件时，**Details** 窗格会显示与事件相关的其他信息。


![Details 窗格](imgs/details-pane.png)

一些标签（如 **Summary**）适用于所有事件类型。其他标签则仅对特定事件类型可用。
请参阅 [Timeline 事件参考][event reference]，了解与每个记录类型相关的详细信息。


[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## 在记录期间捕捉屏幕截图{:#filmstrip}

**Timeline** 面板可以在页面加载时捕捉屏幕截图。此功能称为**幻灯片**。


在您开始记录之前，请在 **Controls** 窗格中启用 **Screenshots** 复选框，以便捕捉记录的屏幕截图。
屏幕截图显示在 **Overview** 窗格下方。


![带幻灯片的 Timeline 记录](imgs/timeline-filmstrip.png)

将您的鼠标悬停在 **Screenshots** 或 **Overview** 窗格上可以查看记录中该点的缩放屏幕截图。
左右移动鼠标可以模拟记录的动画。


<video src="animations/hover.mp4" autoplay muted loop controls></video>

## 分析 JavaScript {:#profile-js}

开始记录前，请启用 **JS Profile** 复选框，以便在您的时间线记录中捕捉 JavaScript 堆栈。
启用 JS 分析器后，您的火焰图会显示调用的每个 JavaScript 函数。
 

![启用 JS 分析的火焰图](imgs/js-profile.png)

## 分析绘制 {:#profile-painting}

开始记录前，请启用 **Paint** 复选框，以便获取有关 **Paint** 事件的更多数据分析。
启用绘制分析并点击 **Paint** 事件后，新 **Paint Profiler** 标签会出现在 **Details** 窗格中，后者显示了许多与事件相关的更精细信息。



![paint profiler](imgs/paint-profiler.png)

### 渲染设置 {:#rendering-settings}

打开主 DevTools 菜单，然后选择**More tools** > **Rendering settings** 访问渲染设置，这些设置在调试绘制问题时非常有用。渲染设置会作为一个标签显示在 **Console** 抽屉式导航栏（如果隐藏，请按 <kbd>esc</kbd> 显示抽屉式导航栏）旁边。




![渲染设置](imgs/rendering-settings.png)

## 搜索记录

查看事件时，您可能希望侧重于一种类型的事件。例如，您可能需要查看每个 `Parse HTML` 事件的详细信息。
 

在 **Timeline** 处于焦点时，按 <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>F</kbd> (Windows / Linux) 以打开一个查找工具栏。键入您想要检查的事件类型的名称，如 `Event`。

工具栏仅适用于当前选定的时间范围。选定时间范围以外的任何事件都不会包含在结果中。
 

利用上下箭头，您可以按照时间顺序在结果中移动。所以，第一个结果表示选定时间范围内最早的事件，最后一个结果表示最后的事件。每次按向上或向下箭头会选择一个新事件，因此，您可以在 **Details** 窗格中查看其详细信息。按向上和向下箭头等同于在**火焰图**中点击事件。


![查找工具栏](imgs/find-toolbar.png)

## 在 Timeline 部分上放大 {:#zoom}

您可以放大显示一部分记录，以便简化分析。使用 **Overview** 窗格可以放大显示一部分记录。
放大后，**火焰图**会自动缩放以匹配同一部分。


![放大 Timeline 记录的一部分](imgs/zoom.png)

要在 Timeline 部分上放大，请执行以下操作：

* 在 **Overview** 窗格中，使用鼠标拖出 Timeline 选择。
* 在标尺区域调整灰色滑块。

选择部分后，可以使用 <kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd> 和 <kbd>D</kbd> 键调整您的选择。
<kbd>W</kbd> 和 <kbd>S</kbd> 分别代表放大和缩小。
<kbd>A</kbd> 和 <kbd>D</kbd> 分别代表左移和右移。


## 保存和打开记录

您可以在 **Overview** 或**火焰图**窗格中点击右键并选择相关选项，保存和打开记录。


![保存和打开记录](imgs/save-open.png)


{# wf_devsite_translation #}
