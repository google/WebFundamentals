project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:有时，新项目的最难部分是开头。Web Starter Kit 为您提供一个坚实的基础，提供一系列工具来帮助您完成开发过程。

{# wf_updated_on:2014-10-20 #}
{# wf_published_on:2014-07-16 #}

# 使用 Web Starter Kit 开始制作您的网站 {: .page-title }

注意：本文已有一段时间未更新，可能无法体现真实性。务必查阅 Web Starter Kit [文档](https://github.com/google/web-starter-kit/)，了解最新详情。

{% include "web/_shared/contributors/mattgaunt.html" %}

<img src="images/wsk-on-pixel-n5.png" class="attempt-right">

本指南引导您完成使用 Web Starter Kit 构建新网站的过程，并帮助您充分利用它提供的工具。


<div style="clear:both;"></div>

## 开发阶段

在开发过程中，有以下三个命令需要经常使用：`gulp serve`、`gulp` 和 `gulp serve:dist`。让我们看一看每个命令对开发过程的作用。


### 启动本地服务器

我们要看的第一个任务是：`$ gulp serve`。

表面上，此任务启动本地 HTTP 服务器，以便您在浏览器中查看您的网站，但在后台有一些其他工具在运行。


#### 实时重新加载

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

实时重新加载消除了传统刷新机制，即在编辑器中进行更改，切换到浏览器，点击 CTRL-R，然后等待页面重新加载。



通过实时重新加载，您可以在编辑器中进行更改，并在任何打开您网站的浏览器中看到更改立即生效。



#### 跨设备测试

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Browser Sync 帮助您在多种设备上测试您的网站。任何滚动、点击或键盘按键将在所连接的所有浏览器上共享。


此功能仅在您通过 `gulp serve` 运行网站时才起作用。通过运行 `gulp serve` 可尝试此功能，在两个并排的浏览器窗口中打开网址，然后滚动其中一个页面。



<div style="clear:both;"></div>

#### 自动添加前缀

当针对一系列浏览器时，您将需要使用供应商前缀，以确保可以使用其中每种浏览器的功能。
Web Starter Kit 将为您自动添加所有前缀。


我们的示例 CSS（下文）不包括任何供应商前缀：

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

构建过程通过前缀自动添加器来运行 CSS，从而产生以下最终输出：


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

#### 检查 JavaScript

JSHint 工具可扫描您的 JavaScript 代码，以检查 JavaScript 逻辑的潜在问题，并[实施编码最佳做法](//www.jshint.com/docs/){: .external }。


每当建立项目时，或如果正在运行 gulp 服务器，只要您对 JavaScript 文件进行更改，此工具就将运行。


#### 编译 Sass

在运行 serve 命令时，对项目中任何 Sass 文件的更改都将被编译为 CSS 并添加前缀，之后页面将通过实时重新加载进行重新加载。



对于 Sass 新手，此项目将自身描述为“CSS 扩展语言”。
它基本上是有一些附加功能的 CSS。例如，它增加对变量和函数的支持，这可帮助您以模块化和可重用的方式来构造 CSS。



### 构建网站的生产版本

可以通过简单的 `gulp` 命令来建立网站的生产就绪版本。
此命令运行我们已看过的一些任务，还有额外的任务可以使您的网站加载更快、更高效。


生产构建执行的主要任务有：

#### 构建样式

首先，构建过程编译您项目中的 Sass。在编译 Sass 之后，将对所有 CSS 运行前缀自动添加器。


#### 检查 JavaScript 的问题

第二个构建步骤是对 JavaScript 运行 JSHint。

#### 构建 HTML 页面

下一步是检查 HTML 文件，查找构造块来串联和缩小 JavaScript。
在处理 JavaScript 之后，构建过程将缩小 HTML 页面。


缩小是通过删除实际不需要的注释或空格字符，以及一些其他技术来减少最终 JavaScript 文件中的字符数。这样可减少最终文件的大小，缩短网站的加载时间。


串联是指将多个文件的内容粘贴到一个文件。这样做的目的是浏览器只需向服务器提出一次请求，而非多次，这样让用户感觉更快。



构建块具有对我们将哪些 JavaScript 文件缩小和串联在一进行管理时所需的所有功能。
我们来看一个示例构建块：

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

构建块无非是一个特殊格式化的注释。各构建块之间的所有 javascript 文件将合并（串联）并缩小为一个名为 main.min.js 的文件，并且最终文件将这些脚本替换为以下脚本标记：




    <script src="scripts/main.min.js"></script>

#### 优化任何图像资产

JPEG 和 PNG 图像中的元数据被去掉；呈现图像并不需要此信息。
元数据包括各种信息，例如用于拍摄照片的相机。


它将去掉 SVG 图像中不需要的任何属性，或者存在的任何空白和注释。


#### 复制字体

这个简单任务将我们的字体从应用复制到最终文件目录中。

#### 从根目录中复制所有文件

如果构建过程发现项目根目录中的任何文件，它会将其复制到最终文件中。


### 测试生产构建

在将任何程序推进到生产之前，需要确保所有组件如预期运行。
`gulp serve:dist` 命令为您构建网站的生产版本，启动服务器，并打开浏览器。
这**并没有实时重新加载或 Browser Sync**，但它是在部署网站之前进行测试的可靠方式。



## 设置 Web Starter Kit


Web Starter Kit 依赖 NodeJS、NPM 和 Sass 来工作。安装上述组件之后，您就具备了所有条件，可以开始在项目中使用 Web Starter Kit 了。


### 安装这些一次性依赖组件

您需要在计算机上安装两个工具集，才能使用 Web Starter Kit 来建立网站：
NodeJS 和 NPM，以及 Sass。

#### NodeJS 和 NPM

Web Starter Kit 的构建工具需要 Node 和 NPM。Node 用于运行 Gulp，即任务运行器。
NPM 用于下载在 Gulp 中执行某些任务时所需的模块。


如果您不确定是否有 NodeJS 和 NPM，可通过打开命令提示符并运行 `node -v` 来检查。
如果 Node 响应，请检查版本是否与 NodeJS.org 上的当前版本一致。


如果没有响应，或是旧版本，则访问 NodeJS.org 并点击绿色的“Install”大按钮。
NPM 将随 NodeJS 一起自动安装。


### 设置 Web Starter Kit 项目

第一步是访问 [/web/tools/starter-kit/](/web/tools/starter-kit/) 并且下载和解压 zip。
这将是您的项目的基础，因此将文件夹重命名，并将其放在计算机上的相关位置。在本指南的其余部分，我们将此文件夹称为 `my-project.`

下一步，需要为 Web Starter Kit 安装本地依赖组件。打开命令提示符，将目录更改为您的项目文件夹，然后运行以下 npm 安装脚本。



    cd my-project
    npm install
    npm install gulp -g

这样就行了！现在您已具备在 Web Starter Kit 中使用 Gulp 工具所需的所有条件。



注：如果您看到许可或访问权限错误，例如  <code>EPERM</code> 或  <code>EACCESS</code>，不要使用  <code>sudo</code> 作为解决方法。请参考 <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>此页</a>了解更可靠的解决方法。

<!--
The next section of this guide covers how to use Gulp, but if you want to see how things look, try running the local server by typing `gulp serve`.
-->
<img src="images/wsk-on-pixel-n5.png">


{# wf_devsite_translation #}
