---
layout: section
title: "添加到主屏幕"
description: "几乎所有主要浏览器供应商均允许用户锁定或安装您的 Web 应用。 所谓的“粘着”是原生应用的一个常见增强，但只需给您的标记略加调整即可实现。"
introduction: "几乎所有主要浏览器供应商均允许用户锁定或安装您的 Web 应用。 所谓的“粘着”是原生应用的一个常见增强，但只需给您的标记略加调整即可实现。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  - pbakaus
priority: 1
---
{% wrap content%}

对于用户而言，“添加到主屏幕”功能类似于
超级书签：但无需告诉浏览器要如何
显示您的应用，移动浏览器将获取收藏图标或您的网页
的截图作为书签，并且在用户从主屏幕中启动您的 Web
应用时显示浏览器的默认 UI。 我们来看看您可以改进
内置行为的方式。

Chrome 和 Safari 支持非常相似的句法，在网页的 `<head>` 中使用 `<meta>` 和 `<link>`
标签，并且使整个功能相对比较
轻量化。

Internet Explorer 10 引入了“固定网站”，此概念提供了
额外功能，例如更改图标和通知的
的呈现，并且，尽管它支持熟悉的 `<meta>` 标签样式，但它更偏爱作为配置的
链接的 XML 文件。

注：这里没有介绍 Firefox API 和 Firefox OS 独有的功能，
请另外参考官方的 [Firefox OS 文档](https://developer.mozilla.org/en-US/Apps/Quickstart)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
