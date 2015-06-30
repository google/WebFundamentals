---
layout: article
title: "从主屏幕启动时进行检测"
description: "应用是从主屏幕还是从网络浏览器中启动的？有时了解这一点可能很有用。 "
introduction: "应用是从主屏幕还是从网络浏览器中启动的？有时了解这一点可能很有用。 "
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 5
id: detect-when-launched
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

应用是从主屏幕还是从网络浏览器中启动的？有时了解这一点
可能 很有用。 为演示一个用例，您可能希望在用户从浏览器访问时
显示一个横幅，建议用户将应用安装到主屏幕，
但在安装之后，则隐藏此横幅。

在 Mobile Safari，查询 `window.navigator.standalone` 将说明
您的应用正在作为主屏幕图标运行，还是只在浏览器中运行。 在 Internet
Explorer 中，您可以通过查询
[`window.external.msIsSiteMode()`](http://msdn.microsoft.com/en-us/library/ie/gg491733(v=vs.85).aspx)来实现相同的效果。 以下是一个组合检查：

{% highlight js %}
var fromHomescreen = window.navigator.standalone || window.external.msIsSiteMode();
if(!fromHomescreen) {
    // show them a guide on how to install the web app
    ...
}
{% endhighlight %}

遗憾的是，在安卓版 Chrome 中无法检测此信息。

{% include modules/nextarticle.liquid %}

{% endwrap %}
