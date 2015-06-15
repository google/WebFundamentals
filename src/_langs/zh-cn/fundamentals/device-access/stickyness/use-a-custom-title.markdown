---
layout: article
title: "使用自定义标题"
description: "Internet Explorer 和 Safari 允许您指定一个自定义标题，作为应用名称显示在图标旁边或顶部。"
introduction: "Internet Explorer 和 Safari 允许您指定一个自定义标题，作为应用名称显示在图标旁边或顶部。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 4
id: use-a-custom-title
authors:
  - pbakaus
collection: stickyness
notes:
  undocumented:
    - 此标签在 Mobile Safari 中无正式记载，可随时更改或去掉。
---

{% wrap content %}

将以下代码添加到标头 `<head>`：

{% highlight html %}
<meta name="application-name" content="Web Fundamentals">
<meta name="apple-mobile-web-app-title" content="Web Fundamentals">
{% endhighlight %}

如果没有额外标签，则全部三种浏览器均使用默认 `<title>` 
属性。

{% include modules/remember.liquid title="Note" list=page.notes.undocumented %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
