---
title: "开发阶段"
description: "在项目的开发过程中，每个开发者 都将经历各种阶段。 Web Starter Kit 可帮助您提高效率并 简化每个阶段的各种任务。"
updated_on: 2014-10-21
translators:
  - samchen
key-takeaways:
---

<p class="intro">
  在开发期间，有 3 个您将经常使用的 特定命令：gulp serve、gulp 和 gulp serve:dist。我们看看每项任务如何帮助您开发网站。
</p>

{% include shared/toc.liquid %}

## 启动本地服务器

我们要看的第一个任务是: `$ gulp serve`。

表面上，此任务启动本地 HTTP 服务器，以便您在浏览器中查看
您的网站，但在后台有一些其他工具在运行。

### 实时重载

实时重载消除了传统刷新机制，即在编辑器中进行更改
，切换到浏览器，点击 CTRL-R，然后等待页面
重载。

通过实时重载，您可以在编辑器中进行更改，并在任何打开您网站的浏览器中
看到更改立即生效。

{% ytvideo JE-ejS8N3YI %}

### 跨设备测试

Browser Sync 帮助您在多种设备上测试您的网站。 任何滚动、
点击或键盘按键将在所连接的所有浏览器上共享。

{% ytvideo RKKBIs_3svM %}

此功能仅在您通过 `gulp serve` 运行网站时才起作用。 通过运行
`gulp serve`可尝试此功能，在两个并排的浏览器窗口中打开 URL，然后滚动
其中一个页面。

### 自动添加前缀

当针对一系列浏览器时，您将使用供应商前缀，
以确保可以使用其中每种浏览器的功能。 Web Starter Kit 将为您自动
添加所有前缀。

我们的示例 CSS（下面）不包括任何供应商前缀：

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

构建过程通过前缀自动添加器来运行 CSS，从而产生
以下最终输出：

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

### 检查 Javascript

JSHint 工具可扫描您的 JavaScript 代码，以检查
JavaScript 逻辑的潜在问题，并[实施代码最佳做法](http://www.jshint.com/docs/)。

每当建立项目时，或如果正在运行 gulp 服务器，
只要您对 JavaScript 文件进行更改，此工具就将运行。

### 编译 Sass

在运行 serve 命令时，对项目中任何 Sass
文件的更改将被编译为 CSS 并添加前缀，之后页面将通过
实时重载进行重载。

对于 Sass 新手，此项目将自身描述为“CSS
扩展语言”。 它基本上是有一些附加功能的 CSS。 例如，
它增加对变量和函数的支持，这可帮助您以模块化和可重复利用的方式来设计 CSS
。

## 构建网站的生产版本

可以通过简单的 `gulp`
命令来建立网站的生产就绪版本。 此命令运行我们已看过的一些任务，还有额外的
任务可以使您的网站加载更快、更高效。

生产构建执行的主要任务有：

### 构建样式

首先，构建过程编译您项目中的 Sass。 在 Sass 已编译
之后，将对所有 CSS 运行前缀自动添加器。

### 检查 JavaScript 的问题

第二个构建步骤是对 JavaScript 运行 JSHint。

### 构建 HTML 页面

下一步是检查 HTML 文件，查找构造块来串联
和缩小 JavaScript。 在处理 JavaScript 之后，构建过程
将缩小 HTML 页面。

缩小是通过删除实际不需要的注释或空格字符，
以及一些其他技术来减少
最终 JavaScript 文件中的字符数。 这样可减少最终文件的大小，加快
网站的加载时间。

串联是指将多个文件的内容粘贴到一个文件。 这样做的
目的是浏览器只需向服务器提出一次请求，
而非多次，这样让用户感觉更快。

构建块具有管理我们将 JavaScript 文件缩小
和串联在一起时所需的所有功能。 我们来看一个示例构建块。

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

构建块无非是一个特殊格式化的注释。
各构建块之间的所有 javascript 文件将合并
（串联）并缩小为一个名为 main.min.js 的文件，并且
最终文件将这些脚本替换为以下脚本标签：

    <script src="scripts/main.min.js"></script>

### 优化任何图像资产

JPEG 和 PNG 图像中的元数据被去掉；呈现图像并
不需要此信息。 元数据包括各种信息，例如用于
拍摄照片的相机。

它将去掉 SVG 图像中不需要的任何属性，或者存在的
任何空白和注释。

### 复制字体

这个简单任务将我们的字体从应用复制到最终文件目录中。

### 从根目录中复制所有文件

如果构建过程发现项目根目录中的任何文件，它会
将其复制到最终文件中。

## 测试生产构建

在将任何程序推进到生产之前，需要确保所有组件
如预期运行。 `gulp serve:dist` 命令为您构建网站的生产版本，
启动服务器，并打开浏览器。 这**并没有实时重载或
Browser Sync**，但它是在部署网站之前进行测试的可靠方式。


