project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:更改 DevTools 的外观和访问隐藏的功能。

{# wf_updated_on:2016-07-26 #}
{# wf_published_on:2016-03-28 #}

# 配置和自定义 DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

更改 DevTools 的外观和访问隐藏的功能。



### TL;DR {: .hide-from-toc }
- 打开主菜单和 Settings 菜单。
- 自定义 DevTools 的外观。
- 访问隐藏的功能。


## 打开主菜单 {:#main-menu}

DevTools 的**主菜单**是一个下拉菜单，可用于配置 DevTools 外观、访问附加工具、打开 Settings，等等。


要打开主菜单，请点击 DevTools 窗口右上方的**主菜单**按钮。


![主菜单](images/main-menu.png)

## 打开 Settings {: #settings }

要打开 DevTools 的 Settings，请在 DevTools 处于焦点时按 <kbd>F1</kbd>，或者[打开主菜单](#main-menu)，然后选择 **Settings**。


## 打开命令菜单 {:#command-menu}

按 <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) 或
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>（Windows、Linux）打开命令菜单。


![命令菜单](images/command-menu.png)

## 对面板标签重新排序 {:#panel-tabs}

点击、按住并拖动面板标签可以更改其顺序。您的自定义标签顺序在 DevTools 会话间保持不变。


例如，默认情况下，**Network** 通常是左侧第四个标签。

![重新排序之前](images/before-reorder.png)

您可以将其拖动到任何位置，如左侧第一个标签处。

![重新排序之后](images/after-reorder.png)

## 自定义 DevTools 位置 {:#placement}

您可以将 DevTools 停靠在页面的底部、页面的右侧，或者在新窗口中打开它。
 

要更改 DevTools 的位置，请[打开主菜单](#main-menu)，然后选择 **Undock into separate window** (![undock 按钮](images/undock.png){:.inline}) 按钮、**Dock to bottom** (![Dock to bottom 按钮](images/dock-bottom.png){:.inline}) 按钮或者 **Dock to right** (![Dock to right 按钮](images/dock-right.png){:.inline}) 按钮。







 

## 使用深色主题{:#dark-theme}

要使用深色 DevTools 主题，请[打开 DevTools 的 Settings](#settings)，转到 **Preferences** 页面，找到 **Appearance** 部分，然后从 **Theme** 下拉菜单中选择 **Dark**。



![深色主题](images/dark-theme.png)

## 打开和关闭抽屉式导航栏标签 {:#drawer-tabs}

按 <kbd>Esc</kbd> 可以打开和关闭 DevTools **抽屉式导航栏**。下方的屏幕截图显示了 **Console** 抽屉式导航栏在底部打开时 **Elements** 面板的示例。



![带抽屉式导航栏的 Elements 面板](images/drawer.png)

通过抽屉式导航栏，您可以在控制台中执行命令、查看动画检查器、配置网络条件和渲染设置、搜索字符串和文件，以及模拟移动传感器。



在抽屉式导航栏打开时，点击 **Console** 标签左侧的三个圆点图标 (![三个圆点图标](images/three-dot.png){:.inline})，然后从下拉菜单选项中选择一项，打开其他标签。




![抽屉式导航栏标签菜单](images/drawer-tabs.png)

## 启用实验 {:#experiments}

启用 DevTools 的 Experiments 后，一个名为 **Experiments** 的新页面会显示在 DevTools 的 Settings 中。
您可以从此页面启用和停用实验功能。


要启用 Experiments，请转到 `chrome://flags/#enable-devtools-experiments`，然后点击 **Enable**。
点击页面底部的 **Relaunch Now** 按钮。
 

打开 DevTools 的 Settings 时，您会看到一个名为 **Experiments** 的新页面。


![DevTools 的 Experiments](images/experiments.png)

## 模拟打印介质 {:#emulate-print-media}

要以打印预览模式查看页面，请[打开 DevTools 主菜单](#main-menu)，选择 **More Tools** > **Rendering Settings**，然后启用 **emulate media** 复选框，并将下拉菜单设置为 **print**。



![启用打印预览模式](images/emulate-print-media.png)

## 显示 HTML 注释 {: #show-html-comments }

要在 **Elements** 面板中显示或隐藏 HTML 注释，请[打开 **Settings**](#settings)，转到 **Preferences** 面板，找到 **Elements** 部分，然后切换 **Show HTML comments** 复选框。




{# wf_devsite_translation #}
