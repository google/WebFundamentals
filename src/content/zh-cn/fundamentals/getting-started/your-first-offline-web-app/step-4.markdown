---
title: "构建起步代码"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

回到命令行，并将分支从 `master` 切换至 `code-lab`：

{% highlight bash %}
git checkout code-lab
{% endhighlight %}

这会移除所有支持离线功能的资源，因此你可以在接下来的教程中将这些功能添加回来。

另外，在此之前你需要注销掉 service worker。在 Chrome 中你可以通过访问 `chrome://serviceworker-internals/` 并点击应用的 URL 下方的 **Unregister** 按钮来完成注销。
