---
layout: article
title: "装配 Web 新手开发包"
description: "如果你对 Web 新手开发包很陌生，那么本指南就是为你准备的。它逐步指引你怎样开始，然后尽可能快地上手 Web 新手开发包工具。"
introduction: "Web 新手开发包依赖于 NodeJS，NPM，& Sass，一旦你在你的机器上安装好这些，你就万事俱备，只差在你的项目中开始使用 Web 新手开发包。"
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 1
id: setting-up-wsk
collection: web-starter-kit
authors:
  - mattgaunt
translators:
  - 陈三
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## 安装这一生一次的依赖

在你使用 Web 新手开发包建站前，你需要在你的机器上安装两个工具集：NodeJS, NPM，& Sass。

### NodeJS & NPM

Web 新手开发包的构建工具需要 Node 跟 NPM。Node 用于跑 Gulp 任务运行器。NPM 则用于下载安装 Gulp 任务执行所需的模块。

如果你不确认自己是否已经安装 NodeJS 和 NPM，打开一个终端，执行 `node -v` 命令。如果 Node 反馈了，检查看看版本是否跟 NodeJS.org 上的一致。

如果命令没有反馈，或者版本较老，那么请访问 NodeJS.org 网站，点击那个很大的绿色安装按钮。NPM 会随着 NodeJS 一起自动安装。

### Sass

Web 新手开发包使用 Sass 来优化样式指南、模块化样式，但是 Sass 需要 Ruby。给不知道 Sass 的介绍一下，这个项目把自己形容为 “CSS 扩展语言”。基本上，它就是 CSS 外加些额外特性。比如，它添加了变量和函数的支持，有助于你模块化、复用 CSS。
 
首先用 `ruby -v` 检查你是否已经安装 Ruby。如果有报错，或者版本号低于 1.8.7，那么你需要访问 Ruby 的下载页面安装 Ruby。

一旦有了 Ruby，执行以下命令安装 Sass：
`$ gem install sass`

## 装配你的 Web 新手开发包项目

第一步，打开 [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)，下载并解压 zip 文件。

接着，你需要给 Web 新手开发包安装本地依赖。打开一个终端，切换目录到你的项目文件夹，然后执行 npm install。

    $ cd web-starter-kit
    $ npm install

就这些了！你现在已经为使用 Web 新手开发包中的 Gulp 工具准备好所有必需的东西。

这个指南的下一节里将介绍如何使用 Gulp，如果你现在想看个究竟，试着键入 `gulp serve` 命令来运行本地服务器。

<img src="images/wsk-on-pixel-n5.png">

{% include modules/nextarticle.liquid %}

{% endwrap %}
