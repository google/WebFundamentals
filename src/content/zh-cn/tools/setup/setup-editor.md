project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:代码编辑器是您的主要开发工具；可以使用代码编辑器编写和保存代码行。了解代码编辑器的快捷键并安装主要插件可以更快地编写出更好的代码。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-05-28 #}

# 设置您的编辑器 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

代码编辑器是您的主要开发工具；可以使用代码编辑器编写和保存代码行。了解代码编辑器的快捷键并安装主要插件可以更快地编写出更好的代码。


### TL;DR {: .hide-from-toc }
- 选择一个能够让您自定义快捷键并拥有许多插件的编辑器，以便帮助您编写更好的代码。
- 使用软件包管理器，更轻松地发现、安装和更新插件。
- 安装可以让您在开发期间提高效率的插件；请从此指南中的推荐开始。


## 安装 Sublime 文本编辑器

[Sublime](http://www.sublimetext.com/){: .external } 是一款非常优秀的编辑器，具有强大的功能，让编写代码充满乐趣。
您可以安装软件包管理器，轻松地安装插件和添加新功能。


Sublime Text 当前有两种下载选项，[版本 2](http://www.sublimetext.com/2) 或[版本 3](http://www.sublimetext.com/3)。版本 3 非常稳定，让您可以访问 Sublime Text 2 不支持的软件包，不过您可能会发现版本 2 更加可靠。

注：Rob Dodson 有关如何了解和爱上 Sublime 的<a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>博文</a>是充分利用编辑器一个非常好的参考。这些概念与所有文本编辑器相关，而不仅仅与 Sublime 相关。

## 为什么要使用软件包管理器？

使用软件包管理器，您可以轻松地查找、安装和更新软件包与插件。


<img src="imgs/package_control.png" class="center" alt="Sublime Text 编辑器的 Package Control 屏幕截图"/>

您可以按照这些说明为 Sublime 安装 Package Manager
[https://packagecontrol.io/installation](https://packagecontrol.io/installation)。

您只需执行一次操作，之后请参见下方我们推荐的插件列表。


## 安装插件

插件可以帮助您提高效率。您必须退回去使用其他工具执行的任务是什么？


Linting（检查代码潜在问题）- 有一个插件可以执行这项任务。显示一些更改未被提交
- 有一些插件可以解决这个问题。与其他工具集成（如 GitHub），许多插件都可以实现这个目标。


利用软件包管理器，您可以轻松地查找、安装和更新插件：

1. 在 Sublime Text 编辑器中，打开您的软件包管理器 (ctrl+shift+p)。
2. 输入“Install Package”。
3. 输入您正在查找的插件名称（或者浏览所有插件）。


查看 [Sublime Text 插件趋势列表](https://packagecontrol.io/browse)。
这里是一些我们喜爱并推荐您安装的一些插件，它们能够帮助您加快开发速度：


### Autoprefixer

如果想要快速地将供应商前缀添加到 CSS，您可以使用这款方便的插件。


编写 CSS，忽略供应商前缀，当您想要添加它们时，按 `ctrl+shift+p`，然后键入 `Autoprefix CSS`。


[我们会介绍如何在构建流程中实现这项操作的自动化](/web/tools/setup/setup-buildtools)，这样，您的 CSS 就会始终保持简洁，您无需记得要按 `ctrl+shift+p`。




<img src="imgs/sublime-autoprefixer.gif" alt="Sublime Autoprefixer 插件示例" />

### ColorPicker

从调色板中选取颜色，然后通过按 `ctrl+shift+c` 将其添加至您的 CSS。

<img src="imgs/sublime-color-picker.png" alt="Sublime ColorPicker 插件" />

### Emmet

为您的文本编辑器添加一些有用的键盘快捷键和代码段。您可以在 [Emmet.io](http://emmet.io/){: .external } 上观看视频，了解它的用途（个人比较喜欢的是“Toggle Comment”命令）。



<img src="imgs/emmet-io-example.gif" alt="Emmet.io 插件的演示" />

### HTML-CSS-JS 修饰

此扩展程序为您提供了可以设置 HTML、CSS 和 JS 格式的命令。无论何时保存文件，您都可以修饰文件。


<img src="imgs/sublime-prettify.gif" alt="Sublime Prettify 插件的 GIF" />

### Git Gutter

文件有更改时，可以在 gutter 中添加标记。

<img src="imgs/sublime-git-gutter.png" alt="Sublime Git Gutter 插件的屏幕截图" />

### Gutter Color

注：仅适用于 Sublime Text 3

Gutter Color 可以在 CSS 旁为您显示小色样。

<img src="imgs/sublime-gutter-color.png" alt="Sublime Gutter Color 的屏幕截图" />

此插件需要 ImageMagick。如果使用 Mac OS X，我们建议您尝试 [CactusLabs](http://cactuslab.com/imagemagick/){: .external } 的安装程序（您可能需要重启计算机才能使其工作）。







{# wf_devsite_translation #}
