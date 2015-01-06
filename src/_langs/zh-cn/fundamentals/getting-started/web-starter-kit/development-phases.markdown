---
layout: article
title: "开发阶段"
description: "每个开发者在项目的开发过程中，都会经历不同的阶段。Web 新手开发包提高你的效率，并简化各阶段的许多工作。"
introduction: "在开发过程中，有三个特别的命令你会经常用到：gulp serve，gulp serve:dist，和 gulp。让我们看看这每一个任务都是怎样帮助你开发站点的。"
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 2
id: development-phases
collection: web-starter-kit
authors:
  - mattgaunt
translators:
  - 陈三
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## 启动一个本地服务器

我们要看的第一个任务是： `$ gulp serve`。

表面上看，这个任务启动了一个本地 HTTP 服务器，让你可以在浏览器中查看你的站点，但幕后其实有一些其他工具在运作。

### 实时刷新

传统的刷新过程是，编辑器中修改，切换到浏览器，按 CTRL-R，等待页面重载，实时刷新则消去这一步。

有了实时刷新，你可以一边在编辑器中修改，一边看它们在打开的浏览器中即时生效。

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/JE-ejS8N3YI?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf&amp;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

### 跨设备测试

Browser Sync 帮你跨设备测试站点。任何的滚动，轻拍，或按键都将同步给所有连接着的浏览器。

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/RKKBIs_3svM?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf&amp;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

这只有在你执行 `gulp serve` 命令运行网站后才能起作用。试着运行 `gulp serve`，在两个并排的浏览器窗口中打开 URL，然后滚动其中一个页面。


### 自动化添加前缀

在面向诸多浏览器时，你需要使用浏览器厂商前缀来确保你能够使用它们的特性。Web 新手开发包为你自动化所有的添加前缀的工作。

我们的示例 CSS (下面) 不包含任何浏览器厂商前缀：

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

构建过程会让 autoprefixer 过一遍 CSS，输出的最终结果如下：

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

### 检查你的 JavaScript

JSHint 是一个扫描 JavaScript 代码的工具，用于检查你 JavaScript 逻辑中的可能问题，而且能[强化编码的最佳实践](http://www.jshint.com/docs/)。

在你构建项目时，或是你运行 gulp server 然后对一个 JavaScript 文件做了修改，JSHint 都会运行。

### 编译你的 Sass

在你运行 serve 命令后，项目中任何针对 Sass 文件的修改都会被编译成 CSS 并且添加浏览器厂商前缀，随后页面由实时刷新功能来重载。

给不知道 Sass 的介绍一下，Sass 项目把自身描述为一种“CSS 扩展语言”。基本上它就是 CSS 加一些额外特性。比如，它添加了变量和函数的支持，可以帮你模块化、复用 CSS，更好地组织 CSS。

## 构建网站的生产版本

只要 gulp 命令，你就可以给你的网站构建一个可立即部署的版本。这个命令运行一些我们前面已经见过的任务，以及其它致力于让你的网站加载更快、更高效的任务。

构建生产版本执行的主要任务有：

### 构建样式

构建首先会先编译项目中的 Sass。Sass 编译完成后，Autoprefixer 过一遍所有的 CSS。

### 检查 JavaScript 中的问题

第二步运行 JSHint 检查 JavaScript。

### 构建 HTML 页面

下一步就是检查你的 HTML 文件，查找构建块，合并、压缩 JavaScript。处理完 JavaScript 后，构建会压缩 HTML 页面。

通过移除并非真正需要的注释或空格符，配合其它技术，压缩减小了最终 JavaScript 文件的字符数。这就减小了最终的文件大小，加快站点加载时间。

合并意味着把多个文件的内容并成一个。之所以这样做是因为浏览器可以因此只发送一个请求给服务器，而不是多个，对你的用户来说，这会更快。

关于哪些 JavaScript 文件需要我们合并、压缩到一起，构建块中都有。且让我们看一个构建块示例：

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

如你所见，一个构建块不过是一个格式特殊的注释，第一行表示该构建块是针对 JavaScript 的，最终文件的名称及路径应该是 scripts/main.min.js。最后一行关闭了块。两行之间则是我们要压缩、合并的 JavaScript 文件，在这个例子中是指 *example-1.js* 和 *example-2.js*。

### 优化图片资源

JPEGs 和 PNGs 格式的图片的元数据被剔除；对渲染图片来说这些是多余的。元数据包括了诸如拍照所用的相机等信息。

至于 SVGs，构建会移除所有不需要的属性或空白，以及存在的注释。

### 拷贝字体

这个简单工作就是把我们的字体从 app 目录拷贝到最终的构建目录里。

### 拷贝根目录下所有文件

如果项目根目录下存在任何文件，则构建也会将它们拷入最终的构建目录中。

## 测试你的生成

在你推送任何东西到生产环境前，你需要确保一切如你所预料的一样正常工作。`gulp serve:dist`命令构建出一个网站的生产版本，然后启动一个服务器，再为你打开一个浏览器。它没有实时刷新或 Browser Sync，但在部署你的站点前，它是个可靠的测试站点的方法。

{% include modules/nextarticle.liquid %}

{% endwrap %}
