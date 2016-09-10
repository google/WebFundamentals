---
title: "为应用注册一个 Service Worker"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

让应用支持离线的第一步是注册一个 service worker，它是一段可以在不打开网页不需要用户交互允许在后台运行的脚本。

这需要以下简单两步：
1. 创建一个 JavaScript 文件作为 service worker。
1. 告诉浏览器将这个 JavaScript 文件注册为 service worker。

首先，创建一个空白的文件 `sw.js`，并将它放置在 `/app` 目录下（这个目录是应用的根目录）。放在根目录的原因是在目录结构中的位置决定了 service worker 的作用范围。如果它没有存在于正确的目录下，Service Worker 就不能让应用支持离线（这意味着你不能将它放在 script 目录下）。

现在在 `/app` 目录下打开 `index.html` 并将下列代码加至其中：

{% highlight javascript %}
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
{% endhighlight %}

上面这段代码检查浏览器是否支持 service worker，如果支持就调用注册方法并返回一个 Promise 对象。注册完成后浏览器将会 resolve Promise 并调用传入 `.then()` 的函数。（注意：这是异步过程）

在本地启动一个服务器并查看该项目有什么变化：

{% highlight javascript %}
$ cd app
$ python -m SimpleHTTPServer 3000
{% endhighlight %}

在 Chrome 中打开 `chrome://serviceworker-internals/`。这里会显示所有已经注册的 service workers，并允许你在安装之前打开 Chrome DevTools（开发者工具）。如果你想调试 service worker 的安装过程，这将会非常有用。

<img src="images/image02.png" width="624" height="350" />  

加载 web 应用，打开 Chrome DevTools，如果安装成功你将会看到 "Service Worker Registered" 的 log 信息。这是将 service worker 集成入你的应用的第一步。这个时候还不能离线工作，但是我们正在努力。

<img src="images/image03.png" width="624" height="350" />

### 高频问答

**为什么要把 service worker 放在根目录？我为什么不能将它放在 `/scripts` 目录下？**

为了安全，一个 service worker 只能控制与它相同目录或者相同目录下子目录中的页面。这意味着如果你将 service worker 放在 scripts 目录下，它只会作用于 `/scripts` 目录，以及 scripts 中的子目录（比如：`/scripts/test/`)。你的应用应该不会只存在于那么。
