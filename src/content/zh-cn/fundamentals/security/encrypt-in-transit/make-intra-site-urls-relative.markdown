---
title: "使站内 URL 变为相对地址"
description: "由于您的网站同时运行 HTTP 和 HTTPS，不管哪种协议，都应当尽可能顺畅运行。"
updated_on: 2015-03-27
key-takeaways:
  - 确保站内 URL 和外部 URL 与协议无关，即 确保使用相对路径或省去协议，例如 //example.com/something.js
---

<p class="intro">
  由于您的网站同时运行 HTTP 和 HTTPS，不管哪种协议，都应当尽可能顺畅运行。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

但是，当您通过 HTTPS
提供一个包括 HTTP 资源的页面: [混合
内容](http://www.w3.org/TR/mixed-content/) 时会出现问题，浏览器将警告用户，已失去
HTTPS 的全部能力。

事实上，在活动混合内容（脚本、插件、CSS、内嵌框架）的情况下，
浏览器经常完全不会加载或执行内容 — 导致
残缺页面。

**注：** 在 HTTP 页面中包括 HTTPS 资源完全没问题。

此外，当您链接到您网站中的其他页面时，用户可能
从 HTTPS 降级为 HTTP。

当您的页面包括了使用
 *http://* 架构的全限定站内 URL 时，会出现这些问题。 应当将以下内容：

		<h1>Welcome To Example.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Read this nice <a href="http://example.com/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

更改为这样：

		<h1>Welcome To Example.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Read this nice <a href="//example.com/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

或者这样：

		<h1>Welcome To Example.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Read this nice <a href="/2014/12/24/">new
		post on cats!</a></p>
		<p>Check out this <a href="http://foo.com/">other cool
		site.</a></p>

也就是说，使站内 URL 尽可能是相对地址：协议相对
（省去协议，以 //example.com 开头）或主机相对（以
相对路径开头，例如 /jquery.js）。

**注：** 通过脚本实现，而不是手动操作。 如果网站内容在
数据库中，要在
数据库的开发副本中测试您的脚本。 如果网站内容是简单文件，则要在文件的开发副本中
测试您的脚本。 像平常一样，只有在更改通过 QA 后，
才会将更改推送到生产平台中。 可以使用 [Bram van Damme 的
脚本](https://github.com/bramus/mixed-content-scan) 或类似脚本来
检测网站中的混合内容。

**注：** 在链接到其他网站（而不是包括其他网站
的资源）时，请勿更改协议，因为您不能控制
这些网站是如何运行的。

**注：** 我建议采用协议相对 URL，以确保大型网站
的迁移更顺利。 如果您还不确定是否能够完全部署 HTTPS，强制
网站的所有子资源使用 HTTPS 可能弄巧成拙。 可能会有
一段时间，您对 HTTPS 觉得新奇，并且 HTTP 网站
仍必须像往常一样运行。 长期而言，您将完成迁移并且可以
锁定 HTTPS（请参考接下来两个部分）。

如果网站依赖第三方提供的脚本、图像或其他资源
，例如 CDN、jquery.com 或类似资源，则有 2 个选项：

* 对这些资源也使用协议相对 URL。 如果该第三方
不提供 HTTPS，请求他们提供。 大多数已经提供，包括 jquery.com。
* 从您控制的并且同时提供 HTTP 和
 HTTPS 的服务器上提供资源。 这通常是个好点子，因为您可以更好地控制
网站的外观、性能和安全 — 不必
信任第三方，尽管他们总是很不错。

还要记住，您将需要更改
样式表、JavaScript、重定向规则、&lt;link …&gt; 标签和 CSP
声明中的站内链接 — 而不仅是 HTML 页面！

