---
title: "运行示例代码"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

首先，让我们看看最后完成后的应用是什么样的。跟着下面的介绍来构建和启动这个 Airhorn 应用。

通过将分支切换至 master 分支上来确保你在正确的分支。

{% highlight bash %}
$ git checkout master
{% endhighlight %}

你可以使用你最喜欢的 HTTP 服务器或者使用 Python 来运行本应用。下面命令使用 Python 在本地的 3000 端口上启动一个 Web 服务器。

{% highlight bash %}$ cd app
$ python -m SimpleHTTPServer 3000
{% endhighlight %}

在 Chrome 中打开本项目你将会看到：

<img src="images/image01.png" width="624" height="382" />
