project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 选项1

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-03-28 #}

# Chrome 开发者工具 {: .page-title }

Chrome 开发者工具是一套内置于Google Chrome中的Web开发和调试工具，可用来对网站进行迭代、调试和分析。

Dogfood: 寻找最新版本的Chrome 开发者工具, [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) 总是有最新的DevTools.

## 打开Chrome 开发者工具 {: #open }

* 在Chrome菜单中选择 **更多工具** > **开发者工具**
* 在页面元素上右键点击，选择 “检查”
* 使用 [快捷键 ](/web/tools/chrome-devtools/inspect-styles/shortcuts)
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows) 或 <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)

## 了解面板

### 设备模式

<img src="images/device-mode.png" alt="Device Mode" class="attempt-right">

使用设备模式构建完全响应式，移动优先的网络体验。

* [Device Mode](/web/tools/chrome-devtools/device-mode/)
* [Test Responsive and Device-specific Viewports](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)
* [Emulate Sensors: Geolocation &amp; Accelerometer](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

<div style="clear:both;"></div>


### 元素面板

<img src="images/panels/elements.png" alt="Elements Panel" class="attempt-right">
使用元素面板可以自由的操作DOM和CSS来迭代布局和设计页面.


* [检查和调整页面](/web/tools/chrome-devtools/inspect-styles/)
* [编辑样式](/web/tools/chrome-devtools/inspect-styles/edit-styles)
* [编辑DOM](/web/tools/chrome-devtools/inspect-styles/edit-dom)

<div style="clear:both;"></div>


### 控制台面板

<img src="images/panels/console.png" alt="Console Panel" class="attempt-right">

在开发期间，可以使用控制台面板记录诊断信息，或者使用它作为 shell在页面上与JavaScript交互。

* [使用控制台面板](/web/tools/chrome-devtools/console/)
* [命令行交互](/web/tools/chrome-devtools/console/)

<div style="clear:both;"></div>


### 源代码面板

<img src="images/panels/sources.png" alt="Sources Panel" class="attempt-right">

在源代码面板中设置断点来调试 JavaScript ，或者通过Workspaces（工作区）连接本地文件来使用开发者工具的实时编辑器。

* [断点调试](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [调试混淆的代码](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [使用开发者工具的Workspaces（工作区）进行持久化保存](/web/tools/setup/setup-workflow)

<div style="clear:both;"></div>


### 网络面板
<img src="images/panels/network.png" alt="Network Panel" class="attempt-right">

使用网络面板了解请求和下载的资源文件并优化网页加载性能。

* [网络面板基础](/web/tools/chrome-devtools/network-performance/resource-loading)
* [了解资源时间轴](/web/tools/chrome-devtools/network-performance/understanding-resource-timing)
* [网络带宽限制](/web/tools/chrome-devtools/network-performance/network-conditions)

<div style="clear:both;"></div>


### 性能面板
Note: 在 Chrome 57 之后时间线面板更名为性能面板.
<img src="images/panels/performance.png" alt="Timeline Panel" class="attempt-right">

使用时间轴面板可以通过记录和查看网站生命周期内发生的各种事件来提高页面的运行时性能。

* [如何查看性能](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [分析运行时性能](/web/tools/chrome-devtools/rendering-tools/)
* [诊断强制的同步布局](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)

<div style="clear:both;"></div>


### 内存面板
Note: 在 Chrome 57 之后分析面板更名为内存面板.
<img src="images/panels/memory.png" alt="Profiles Panel" class="attempt-right">

如果需要比时间轴面板提供的更多信息，可以使用“配置”面板，例如跟踪内存泄漏。
Use the Profiles panel if you need more information than the Timeline provide, for instance to track down memory leaks.

* [JavaScript CPU 分析器](/web/tools/chrome-devtools/rendering-tools/js-execution)
* [内存堆区分析器](/web/tools/chrome-devtools/memory-problems/)

<div style="clear:both;"></div>


### 应用面板
Note: 在 Chrome 52 之后资源面板更名为应用面板.
<img src="images/panels/application.png" alt="Application Panel" class="attempt-right">

使用资源面板检查加载的所有资源，包括IndexedDB与Web SQL数据库，本地和会话存储，cookie，应用程序缓存，图像，字体和样式表。

* [管理数据](/web/tools/chrome-devtools/manage-data/local-storage)

<div style="clear:both;"></div>


### 安全面板
<img src="images/panels/security.png" alt="Security Panel" class="attempt-right">

使用安全面板调试混合内容问题，证书问题等等。

* [安全](/web/tools/chrome-devtools/security)

<div style="clear:both;"></div>

## 参与互动

[Twitter](https://twitter.com/ChromeDevTools){: .button .button-white}
[Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){: .button .button-white}
[Slack](https://chromiumdev.slack.com/messages/devtools/){: .button .button-white}
