---
title: "将 HTTP 重定向到 HTTPS"
updated_on: 2015-03-27
key-takeaways:
  - 您需要在网页的头部放一个规范链接，以告诉搜索引擎 https 是访问您网站的最佳方法。
---
>

{% include shared/takeaway.liquid list=page.key-takeaways %}

在网页中设置 &lt;link rel="canonical" href="https://…"/&gt; 标签。 [这样
可帮助搜索引擎](https://support.google.com/webmasters/answer/139066?hl=en)
了解访问您网站的最佳方法。

大多数 Web 服务器都提供一种简单的重定向功能。 使用 301（永久移动）
来告诉搜索引擎和浏览器，此 HTTPS 版本是标准的，并将用户从 HTTP 重定向到网站的 HTTPS 版本。

