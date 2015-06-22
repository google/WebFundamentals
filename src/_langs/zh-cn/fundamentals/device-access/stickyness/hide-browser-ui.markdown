---
layout: article
title: "隐藏浏览器 UI"
description: "无需任何特殊代码，您的用户即可将您的网站添加到主屏幕，但我们建议让您的 Web 应用在从主屏幕启动时不显示浏览器 UI（即实际上进入全屏）。"
introduction: "无需任何特殊代码，您的用户即可将您的网站添加到主屏幕，但我们建议让您的 Web 应用在从主屏幕启动时不显示浏览器 UI（即实际上进入全屏）。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 2
id: hide-browser-ui
collection: stickyness
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

将以下代码添加到网页的 `<head>`：

{% highlight html %}
<meta name="apple-mobile-web-app-capable" content="yes">
{% endhighlight %}


这将告诉 Mobile Safari：它正在处理
Web 应用。

Internet Explorer 不需要指令即可实现此功能，因为
网站将默认启动全屏

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/web-app-capable.png" alt="web-app-capable">
        
        <figcaption>启动有 Web App Capable 元标签的网站</figcaption>
    </figure>
</div>

<div class="clear"></div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
