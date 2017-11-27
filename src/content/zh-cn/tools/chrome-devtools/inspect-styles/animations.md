project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 动画检查器检查和修改动画。

{# wf_updated_on: 2016-05-02 #}
{# wf_published_on: 2016-05-02 #}

# 检查动画 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools 动画检查器检查和修改动画。


![动画检查器](imgs/animation-inspector.png)


### TL;DR {: .hide-from-toc }
- 通过打开动画检查器捕捉动画。检查器会自动检测动画并将它们分类为多个组。
- 通过慢速播放、重播或查看动画源代码来检查动画。
- 通过更改动画时间、延迟、持续时间或关键帧偏移修改动画。


## 概览 {:#overview}

Chrome DevTools 动画检查器有两个主要用途。 

* 检查动画。您希望慢速播放、重播或检查动画组的源代码。
 
* 修改动画。您希望修改动画组的时间、延迟、持续时间或关键帧偏移。
当前不支持编辑贝塞尔曲线和关键帧。
 

动画检查器支持 CSS 动画、CSS 过渡和网络动画。当前不支持 `requestAnimationFrame` 动画。



### 什么是动画组？

动画组是一组*看上去*彼此相关的动画。
当前，网页没有真正概念的组动画，动画设计师和开发者必须编排和设置各个动画的时间，让它们看上去有一种连贯的视觉效果。动画检查器会根据开始时间（不包括延迟等等）预测哪些动画相关并将它们并排分组。也就是说，全部在同一脚本块中触发的一组动画被分为一组，但如果是异步的，它们将单独分组。

 

## 使用入门

可以通过两种方式打开动画检查器：

* 转到 **Styles** 窗格（位于 **Elements** 面板上），然后按 **Animations** 按钮（![Animations 按钮](imgs/animations-button.png){:.inline}）。
* 打开 Command Menu，键入 `Drawer: Show Animations`。 

动画检查器将在 Console 抽屉旁作为标签打开。由于检查器是一个是抽屉式导航栏标签，您可以从任何 DevTools 面板打开它。
 

![空的动画检查器](imgs/empty-ai.png)

动画检查器分为四个主要部分（或窗格）。本指南使用以下名称指代各个窗格：


1. **Controls**。从这里，您可以清除所有当前捕捉的动画组，或者更改当前选定动画组的速度。
2. **Overview**。在这里选择动画组，然后在 **Details** 窗格中进行检查和修改。
3. **Timeline**。
从这里暂停和开始动画，或者跳到动画中的特定点。
4. **Details**。
检查和修改当前选定的动画组。
 

![注解动画检查器](imgs/annotated-animation-inspector.png)

要捕捉动画，只需在动画检查器打开时执行可以触发动画的交互。
如果动画在页面加载时触发，您可以重新加载页面，帮助动画检查器检测动画。

 

<video src="animations/capture-animations.mp4"
       autoplay loop muted controls></video>

## 检查动画 {:#inspect}

捕捉动画后，可以通过以下几种方式重播动画：

* 在 **Overview** 窗格中将鼠标悬停在动画的缩略图上方，查看它的预览。
* 从 **Overview** 窗格中选择动画组（这样，动画组就会显示在 **Details** 窗格中），然后按 **replay** 按钮（![replay 按钮](imgs/replay-button.png){:.inline}）。动画会在视口中重播。点击 **animation speed** 按钮（![animation speed 按钮](imgs/animation-speed-buttons.png){:.inline}）更改当前选定动画组的预览速度。您可以使用红色的垂直条更改当前位置。
* 点击并拖动红色的垂直条以拖拽视口动画。 

### 查看动画详细信息

捕捉动画组后，在 **Overview** 窗格点击动画组可以查看其详细信息。
在 **Details** 窗格中，每个动画会单独成行。
 

![动画组详情](imgs/animation-group-details.png)

将鼠标悬停在动画上可以在视口中突出显示该动画。点击动画，在 **Elements** 面板中将其选中。
 

![将鼠标悬停在动画上，使其在视口中突出显示](imgs/highlight-animation.png)


动画最左侧的深色部分是其定义。右侧的浅色部分表示重复。
例如，在下方的屏幕截图中，第二和第三部分表示第一部分的重复。
 

![动画重复示意图](imgs/animation-iterations.png)

如果两个元素应用了同一个动画，动画检查器会给它们分配相同的颜色。
颜色本身是随机的且没有意义。例如，在下方的屏幕截图中，两个元素 `div.eye.left::after` 和 `div.eye.right::after` 已应用了同一个动画 (`eyes`)，`div.feet::before` 和 `div.feet::after` 元素也同样如此。



 

![带有彩色编码的动画](imgs/color-coded-animations.png)

## 修改动画 {:#modify}

可以通过以下三种方式使用动画检查器修改动画：

* 动画持续时间。
* 关键帧时间。
* 开始时间延迟。

对于本部分，假设下面的屏幕截图代表原始动画：


![修改之前的原始动画](imgs/modify-original.png)

要更改动画的持续时间，请点击并拖动第一个或最后一个圆圈。


![修改的持续时间](imgs/modify-duration.png)

如果动画定义了任何关键帧规则，那么这些将表示为白色内圈。
点击并拖动其中一个以更改关键帧的时间。


![修改的关键帧](imgs/modify-keyframe.png)

要为动画添加延迟，请点击并将其拖动至圆圈以外的任何位置。
 

![修改的延迟](imgs/modify-delay.png)


{# wf_devsite_translation #}
