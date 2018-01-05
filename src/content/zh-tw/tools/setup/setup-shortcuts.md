project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:爲您反覆使用的命令行任務設置快捷方式。如果您發現自己在命令行中反覆鍵入相同的內容，這將爲您帶來很大方便。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-09-24 #}

# 設置命令行快捷方式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

爲您反覆使用的命令行任務設置快捷方式。如果您發現自己在命令行中反覆鍵入相同的內容，這將爲您帶來很大方便。


### TL;DR {: .hide-from-toc }
- 掌控命令行；創建易於記住和可快速鍵入的別名。
- 嘗試保存、分享 Github 點文件，並同步您的命令行快捷方式。


## 如何設置

創建命令行快捷方式最簡單的方法就是將常見命令的別名添加至 bashrc 文件。
在 Mac 或 Linux 上：

1. 從命令行任意位置，鍵入：

        open -a 'Sublime Text' ~/.bashrc

2. 添加新別名，例如：

        alias master='git checkout master'

3. 任何時候當您位於帶 git repo 的目錄時，都可以運行命令 `master`，它將爲您檢查主分支。


注：請參閱[設置 Windows 別名](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx)的說明。


## 我們推薦的快捷方式

您可能會發現以下幾個快捷方式比較有用。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">命令和別名</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">打開您的編輯器</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">啓動服務器</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">轉到您通常在其中工作的目錄</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## 保存、分享和同步您的快捷方式

在 Github 上保存您的快捷方式和點文件。主要好處是可以在各個設備之間分享快捷方式，而且始終可以備份快捷方式。


Github 還創建了一個[點文件專用頁面](https://dotfiles.github.io/){: .external }，Chrome 團隊的許多人都複製了 [Mathias Bynens 的點文件](https://github.com/mathiasbynens/dotfiles)。






{# wf_devsite_translation #}
