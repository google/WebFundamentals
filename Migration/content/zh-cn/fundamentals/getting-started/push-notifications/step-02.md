---
title: "运行本地Web服务器"
description: "设置和运行本地Web服务器"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-14
translators:
  - henrylim  
---

**在localhost1开启一个Web服务器**

在这个codelab中，你需要运行一个本地Web服务器。你或许已经自己设置了。若没有，开启命令提示符,
导航至 **_push-notifications_** 文件夹。运行以下的Python命令以启动服务器:

{% highlight bash %}
$ python -m SimpleHTTPServer
{% endhighlight %}

这将会在默认的HTTP端口开启一个Web服务器。
从你的游览器，导航到[localhost](http://localhost)。
你将会看到 **_push-notifications_** 的顶层目录。

导航到[localhost/app](http://localhost/app)以查看在 **_app_** 文件夹里自己的代码。
导航到[localhost/completed](http://localhost/completed)以查看这codelab每个步骤的完整的代码。

如果你没有安装Python,你可以在[这里](https://www.python.org/downloads/)下载。如果在启动服务器时遇到问题，[请检查](https://www.google.com/search?q=what+is+using+port) 是不是有其他的服务在使用SimpleHTTPServer的端口。

这codelab里的命令行示例都使用 bash shell。

Windows用户需使用命令提示符里的MS-DOS命令: 检查这指南里相等的DOS / bash命令。要不然，你可能需要使用Cygwin环境。

另外，你也可以使用: [XAMPP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/).
