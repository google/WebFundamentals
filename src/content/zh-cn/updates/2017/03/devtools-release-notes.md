project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 58 中添加到 DevTools 的新功能和变更。

{# wf_updated_on: 2017-03-06 #}
{# wf_published_on: 2017-03-06 #}
{# wf_tags: chrome58,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Chrome 58 中添加到 DevTools 的新功能和变更。 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools 更新点 (Chrome 58) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

欢迎来到首期的 DevTools 发版日志！从这一版本开始，首次打开新版 Chrome 你会看到 DevTools 
有一个 **What's New** 标签，里面含有当前版本发版日志的链接。

## 亮点

* Timeline 面板更名为 Performance 面板。
* Profiles 面板更名为 Memory 面板。
* 可直接编辑 Cookie 值。
* 在内存溢出前 DevTool 会自动暂停。

## 新功能

### 可编辑的 Cookie {: #cookies }

双击 **Cookies** 标签里的表格项可直接编辑。

<figure>
  <img src="/web/updates/images/2017/03/editable-cookies.png"/>
  <figcaption>
    <b>图 1</b>. 编辑 Cookie
  </figcaption>
</figure>

感谢 [kdzwinel](https://twitter.com/kdzwinel) 的贡献!

### CSS 变量可以在 Styles 面板中进行审查和编辑 {: #css-variables }

现在，Styles 面板中可审查和编辑 CSS 变量了。查看[此示例][css vars]亲自体验一把吧。

[css vars]: https://googlechrome.github.io/devtools-samples/author/css-vars

### 内存溢出断点 {: #out-of-memory-breakpoints }

当程序在短时间内分配占用了大量内存时，DevTools 会自动暂停并且加大堆栈的上限。
这样你就可以审查堆栈，在控制台执行命令来释放内存，然后继续进行调试。想了解更多，
请移步 [Chrome的一小步，V8堆栈的一大步][heap]。

<figure>
  <img src="/web/updates/images/2017/03/out-of-memory-breakpoint.png"/>
  <figcaption>
    <b>图 2</b>. 在内存溢出点的暂停
  </figcaption>
</figure>

[heap]: https://v8project.blogspot.com/2017/02/one-small-step-for-chrome-one-giant.html

### Canvas 被创建的断点 {: #canvas-creation-breakpoints }

你可以创建一个基于 canvas 上下文被创建时所触发的[事件断点][event-listener-breakpoint]。

<figure>
  <img src="/web/updates/images/2017/03/canvas-breakpoint.png"/>
  <figcaption>
    <b>图 3</b>. 从<b>事件断点面板</b>的<b> canvas 上下文被创建</b>复选框生成的断点
  </figcaption>
</figure>

[event-listener-breakpoint]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners

### 瀑布流时间线中新增开始时间 {: #start-stats }

在瀑布流时间线顶部，可以看到一条请求是何时加入队列以及何时开始的。

<figure>
  <img src="/web/updates/images/2017/03/request-start-times.svg"/>
  <figcaption>
    <b>图 4</b>. 瀑布流时间线中新增开始时间
  </figcaption>
</figure>

### 用时统计标签中的服务器信息 {: #server-stats }

现在可以向网络面板的用时统计标签中插入自定义的服务器用时统计了。查看[服务器用时统计示例][server]。

[server]: https://gist.github.com/paulirish/a76ac17fc211b019e538c09d8d827691

<figure>
  <img src="/web/updates/images/2017/03/server-stats.svg"/>
  <figcaption>
    <b>图 5</b>. <b>用时统计标签</b>中的服务器时间统计
  </figcaption>
</figure>

## 变更

### Timeline 面板变更为了现在的 Performance 面板 {: #performance-panel }

Timeline 面板更名为了 Performance 面板，以更好地反映它的功能。

### Profiles 面板变成了现在的 Memory 面板 {: #memory-panel }

Profiles 面板更名为了 Memory 面板，以更好地反映它的功能。

### CPU 分析器位置变更 {: #cpu-profiler }

既然 Profiles 面板已经更名为了 Memory 面板，再把 CPU 分析器放这里面就不合适了。此外，从长远来看后续
会把所有分析相关的放入性能面板。目前，你仍然可以通过
[**设置**][settings] > **更多工具** > **JavaScript Profiler** 来访问老版的 CPU 分析器。

查看 [Chrome DevTools: 在 Chrome 58 中进行 JavaScript CPU 分析][migration]以了解如何在 Performance 面板中
分析 CPU。

[settings]: /web/tools/chrome-devtools/ui#settings
[migration]: /web/updates/2016/12/devtools-javascript-cpu-profile-migration

### 全新的控制台界面 {: #console }

控制台及相关的标签进行了界面的更新。一些不太常用的功能进行了隐藏，露出了更加常用的功能。

* 点击 **控制台设置图标** ![控制台设置图标][console settings]{:.devtools-inline} 来进行控制台相关的设置。
* **Preserve log** 被挪到了 **控制台的设置界面**.
* 去掉了 **Filters** 按钮及相应的面板。换成了现在的下拉菜单样式。
* 过滤控制台信息的文本输入框从之前不可见的二级面板中挪了出来，始终显示。
* 过滤控制台信息的文本输入自动接收正则作为输入，所以不需要之前的**正则开关**了。
* 去掉了 **Hide violations** 复选框，取而代之的是日志等级下拉框中的 **Verbose**。
* 新版控制台中，勾选 **控制台设置** 中的 **Selected context only** 的效果和之前老界面里
  去掉 **Show all messages** 的效果是一样的。

<figure>
  <img src="/web/updates/images/2017/03/console.png"/>
  <figcaption>
    <b>图 6</b>. 全新的控制台界面
  </figcaption>
</figure>

[console settings]: /web/updates/images/2017/03/console-settings.png

### WebGL 事件监听器断点位置有所变更 {: #webgl }

WebGL [事件监听器断点][event-listener-breakpoint] 从原来的 **WebGL** 分类中移动到了 **Canvas** 分类中。
去掉了**WebGL** 这个分类。