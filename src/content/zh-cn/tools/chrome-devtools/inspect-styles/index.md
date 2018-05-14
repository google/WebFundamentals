project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:检查和编辑页面的 HTML 与 CSS。

{# wf_updated_on:2016-01-28 #}
{# wf_published_on:2015-04-13 #}

# 检查和编辑页面与样式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools 的 Elements 面板检查和实时编辑页面的 HTML 与 CSS。


![Chrome DevTools 的 Elements 面板](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- 在 Elements 面板中检查和实时编辑 DOM 树中的任何元素。
- 在 Styles 窗格中查看和更改应用到任何选定元素的 CSS 规则。
- 在 Computed 窗格中查看和修改选定元素的框模型。
- 在 Sources 面板中查看在本地对页面所做的更改。


## 实时编辑 DOM 节点

要实时编辑 DOM 节点，只需双击[选定元素](#inspect-an-element)，然后进行更改：


<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

DOM 树视图会显示树的当前状态；可能会与最初因其他原因加载的 HTML 不匹配。
例如，您可以使用 JavaScript 修改 DOM 树；浏览器引擎会尝试修正无效的作者标记并生成意外的 DOM。



## 实时编辑样式

在 **Styles** 窗格中实时编辑样式属性名称和值。所有样式均可修改，除了灰色部分（与 User Agent 样式表一样）。



要编辑名称或值，请点击它，进行更改，然后按 <kbd class="kbd">Tab</kbd> 或 <kbd class="kbd">Enter</kbd> 保存更改。


![编辑属性名称](imgs/edit-property-name.png)

默认情况下，您的 CSS 修改不是永久的，重新加载页面时更改会丢失。
如果您想要在页面加载时保留更改，请设置[永久制作](/web/tools/setup/setup-workflow)。

 

## 检查和编辑框模型参数

使用 **Computed** 窗格检查和编辑当前元素的框模型参数。
框模型中的所有值均可修改，只需点击它们即可。


![Computed 窗格](imgs/computed-pane.png)

同轴矩形包含当前元素 **padding**、**border** 和 **margin** 属性的 **top**、**bottom**、**left**、**right** 值。

 

对于位置为非静态的元素，还会显示 **position** 矩形，包含 **top**、**right**、**bottom** 和 **left** 属性的值。



![非静态计算元素](imgs/computed-non-static.png)

对于 `position: fixed` 和 `position: absolute` 元素，中心域包含选定元素实际的 **offsetWidth × offsetHeight** 像素尺寸。所有值都可以通过双击修改，就像 Styles 窗格中的属性值一样。
不过，无法保证这些更改能够生效，因为这要取决于具体的元素定位详情。



![固定计算元素](imgs/computed-fixed.png)

## 查看本地更改

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

要查看对页面所做实时编辑的历史记录，请执行以下操作：

1. 在 **Styles** 窗格中，点击您修改的文件。DevTools 会将您带到 **Sources** 面板。
1. 右键点击文件。
1. 选择 **Local modifications**。

要探索所做的更改，请执行以下操作：

* 展开顶级文件名查看做出修改的时间 ![做出修改的时间](imgs/image_25.png){:.inline}。
* 展开第二级项目查看修改相应的[不同](https://en.wikipedia.org/wiki/Diff)（前和后）。

粉色背景的线表示移除，绿色背景的线表示添加。


## 撤消更改

如果您未[设置永久制作](/web/tools/setup/setup-workflow)，每次您重新加载页面时，所有的实时编辑都会丢失。


假设您已设置了永久制作，要撤消更改，请执行以下操作：

* 使用 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) 或 <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) 通过 Elements 面板快速撤消对 DOM 或样式所做的细微更改。



* 要撤消对文件所做的所有本地修改，请打开 **Sources** 面板，然后选择文件名旁的 **revert**。


[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
