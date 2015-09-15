---
title: "设置 Web Starter Kit"
description: "如果您是 Web Starter Kit 新手，则此指南适合您。 它逐步介绍了如何尽快掌握和运行 Web Starter Kit。"
notes:
  nosudo: 如果您看到许可或权限错误，例如 <code>EPERM</code>  或 <code>EACCESS</code>，不要使用 <code>sudo</code> 作为解决方法。 请参考 <a href="https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md">此页</a>了解更可靠的解决方法。
updated_on: 2015-04-01
translators:
  - samchen
---

<p class="intro">
  Web Starter Kit 依赖 NodeJS、NPM 和 Sass 来工作，在计算机上 安装这些组件之后就万事俱备了，您就可以开始在 项目中使用 Web Starter Kit。
</p>

{% include shared/toc.liquid %}

## 安装这些一次性依赖组件

您需要在计算机上安装两个工具集，才能
使用 Web Starter Kit 来建立网站：NodeJS、NPM 和 Sass。

### NodeJS 和 NPM

Web Starter Kit 的构建工具需要 Node 和 NPM。 Node 用于运行 Gulp，即
任务运行器。 NPM 用于下载在 Gulp 中执行某些任务时所需
的模块。

如果您不确定是否有 NodeJS 和 NPM，可通过打开命令提示符并
运行 `node -v` 来检查。 如果 Node 响应，请检查版本是否与
 NodeJS.org 上的当前版本一致。

如果没有响应，或是旧版本，则访问 NodeJS.org 并
单击绿色的 “安装”大按钮。 NPM 将随 NodeJS
一起自动安装。

## 设置 Web Starter Kit 项目

第一步是访问[https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
并且下载和解压 zip。 这将是您的项目的基础，因此将文件夹重命名，并将其放在计算机上的相关位置。 在本指南的其余部分，我们将此文件夹称为 `my-project`

下一步，需要为 Web Starter Kit 安装本地依赖组件。 打开
命令提示符，将目录更改为您的项目文件夹，然后运行以下 npm
安装脚本。

    cd my-project
    npm install
    npm install gulp -g

这样就行了！现在您已具备在 Web Starter
Kit 中使用 Gulp 工具所需的所有条件。

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

本指南的下一部分介绍了如何使用 Gulp，但如果您想看看
大体外观，可通过输入 `gulp serve` 来尝试运行本地服务器。

<img src="images/wsk-on-pixel-n5.png">


