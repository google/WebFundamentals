project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:为您反复使用的命令行任务设置快捷方式。如果您发现自己在命令行中反复键入相同的内容，这将为您带来很大方便。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-09-24 #}

# 设置命令行快捷方式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

为您反复使用的命令行任务设置快捷方式。如果您发现自己在命令行中反复键入相同的内容，这将为您带来很大方便。


### TL;DR {: .hide-from-toc }
- 掌控命令行；创建易于记住和可快速键入的别名。
- 尝试保存、分享 Github 点文件，并同步您的命令行快捷方式。


## 如何设置

创建命令行快捷方式最简单的方法就是将常见命令的别名添加至 bashrc 文件。
在 Mac 或 Linux 上：

1. 从命令行任意位置，键入：

        open -a 'Sublime Text' ~/.bashrc

2. 添加新别名，例如：

        alias master='git checkout master'

3. 任何时候当您位于带 git repo 的目录时，都可以运行命令 `master`，它将为您检查主分支。


注：请参阅[设置 Windows 别名](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx)的说明。


## 我们推荐的快捷方式

您可能会发现以下几个快捷方式比较有用。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">命令和别名</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">打开您的编辑器</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">启动服务器</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">转到您通常在其中工作的目录</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## 保存、分享和同步您的快捷方式

在 Github 上保存您的快捷方式和点文件。主要好处是可以在各个设备之间分享快捷方式，而且始终可以备份快捷方式。


Github 还创建了一个[点文件专用页面](https://dotfiles.github.io/){: .external }，Chrome 团队的许多人都复制了 [Mathias Bynens 的点文件](https://github.com/mathiasbynens/dotfiles)。






{# wf_devsite_translation #}
