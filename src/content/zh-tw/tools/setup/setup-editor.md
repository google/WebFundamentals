project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:代碼編輯器是您的主要開發工具；可以使用代碼編輯器編寫和保存代碼行。瞭解代碼編輯器的快捷鍵並安裝主要插件可以更快地編寫出更好的代碼。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-05-28 #}

# 設置您的編輯器 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

代碼編輯器是您的主要開發工具；可以使用代碼編輯器編寫和保存代碼行。瞭解代碼編輯器的快捷鍵並安裝主要插件可以更快地編寫出更好的代碼。


### TL;DR {: .hide-from-toc }
- 選擇一個能夠讓您自定義快捷鍵並擁有許多插件的編輯器，以便幫助您編寫更好的代碼。
- 使用軟件包管理器，更輕鬆地發現、安裝和更新插件。
- 安裝可以讓您在開發期間提高效率的插件；請從此指南中的推薦開始。


## 安裝 Sublime 文本編輯器

[Sublime](http://www.sublimetext.com/){: .external } 是一款非常優秀的編輯器，具有強大的功能，讓編寫代碼充滿樂趣。
您可以安裝軟件包管理器，輕鬆地安裝插件和添加新功能。


Sublime Text 當前有兩種下載選項，[版本 2](http://www.sublimetext.com/2) 或[版本 3](http://www.sublimetext.com/3)。版本 3 非常穩定，讓您可以訪問 Sublime Text 2 不支持的軟件包，不過您可能會發現版本 2 更加可靠。

Note: Rob Dodson 有關如何瞭解和愛上 Sublime 的<a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>博文</a>是充分利用編輯器一個非常好的參考。這些概念與所有文本編輯器相關，而不僅僅與 Sublime 相關。

## 爲什麼要使用軟件包管理器？

使用軟件包管理器，您可以輕鬆地查找、安裝和更新軟件包與插件。


<img src="imgs/package_control.png" class="center" alt="Sublime Text 編輯器的 Package Control 屏幕截圖"/>

您可以按照這些說明爲 Sublime 安裝 Package Manager
[https://packagecontrol.io/installation](https://packagecontrol.io/installation)。

您只需執行一次操作，之後請參見下方我們推薦的插件列表。


## 安裝插件

插件可以幫助您提高效率。您必須退回去使用其他工具執行的任務是什麼？


Linting（檢查代碼潛在問題）- 有一個插件可以執行這項任務。顯示一些更改未被提交
- 有一些插件可以解決這個問題。與其他工具集成（如 GitHub），許多插件都可以實現這個目標。


利用軟件包管理器，您可以輕鬆地查找、安裝和更新插件：

1. 在 Sublime Text 編輯器中，打開您的軟件包管理器 (ctrl+shift+p)。
2. 輸入“Install Package”。
3. 輸入您正在查找的插件名稱（或者瀏覽所有插件）。


查看 [Sublime Text 插件趨勢列表](https://packagecontrol.io/browse)。
這裏是一些我們喜愛並推薦您安裝的一些插件，它們能夠幫助您加快開發速度：


### Autoprefixer

如果想要快速地將供應商前綴添加到 CSS，您可以使用這款方便的插件。


編寫 CSS，忽略供應商前綴，當您想要添加它們時，按 `ctrl+shift+p`，然後鍵入 `Autoprefix CSS`。


[我們會介紹如何在構建流程中實現這項操作的自動化](/web/tools/setup/setup-buildtools)，這樣，您的 CSS 就會始終保持簡潔，您無需記得要按 `ctrl+shift+p`。




<img src="imgs/sublime-autoprefixer.gif" alt="Sublime Autoprefixer 插件示例" />

### ColorPicker

從調色板中選取顏色，然後通過按 `ctrl+shift+c` 將其添加至您的 CSS。

<img src="imgs/sublime-color-picker.png" alt="Sublime ColorPicker 插件" />

### Emmet

爲您的文本編輯器添加一些有用的鍵盤快捷鍵和代碼段。您可以在 [Emmet.io](http://emmet.io/){: .external } 上觀看視頻，瞭解它的用途（個人比較喜歡的是“Toggle Comment”命令）。



<img src="imgs/emmet-io-example.gif" alt="Emmet.io 插件的演示" />

### HTML-CSS-JS 修飾

此擴展程序爲您提供了可以設置 HTML、CSS 和 JS 格式的命令。無論何時保存文件，您都可以修飾文件。


<img src="imgs/sublime-prettify.gif" alt="Sublime Prettify 插件的 GIF" />

### Git Gutter

文件有更改時，可以在 gutter 中添加標記。

<img src="imgs/sublime-git-gutter.png" alt="Sublime Git Gutter 插件的屏幕截圖" />

### Gutter Color

Note: 僅適用於 Sublime Text 3

Gutter Color 可以在 CSS 旁爲您顯示小色樣。

<img src="imgs/sublime-gutter-color.png" alt="Sublime Gutter Color 的屏幕截圖" />

此插件需要 ImageMagick。如果使用 Mac OS X，我們建議您嘗試 [CactusLabs](http://cactuslab.com/imagemagick/){: .external } 的安裝程序（您可能需要重啓計算機才能使其工作）。







{# wf_devsite_translation #}
