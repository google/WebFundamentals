project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Chrome DevTools 的 Device Mode，您可以在一系列设备上模拟开发网站在生产环境中的运行。

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# 测试自适应和设备特定的视口 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

更新后的 Device Mode（自 Chrome 49 起）是当前移动设备优先的 DevTools 的主要部分，并且扩展了主 DevTools 栏。了解如何使用其控件模拟各种设备或切换为完全自适应。


### TL;DR {: .hide-from-toc }
- 使用 Device Mode 的屏幕模拟器测试网站的响应能力。
- 保存自定义预设，便于日后访问。
- Device Mode 不能替代真实设备测试。请注意它的限制。


## 使用视口控件{: #viewport-controls }

![Device Mode 已启用](imgs/device-mode.png)

利用视口控件，您可以针对各种设备测试网站，以及是否能够实现完全自适应。它包括以下两个模式：

  1. **自适应**。使视口可以通过任意一侧的大手柄随意调整大小。
  2. **特定设备**。将视口锁定为特定设备确切的视口大小，并模拟特定设备特性。

## 自适应模式

我们建议将**自适应模式**用作您的默认工作模式。在您的网站和应用的活动开发期间使用这一模式，并经常调整视口大小以创建完全自适应设计，这种设计可以适应未知和未来的设备类型。

要充分利用自适应模式，请启用[媒体查询栏](#media-queries)。

### 自定义视口大小

在视口上拖动调整大小的大手柄，或者点击菜单栏中的值进行精确调整。

## 特定设备模式

在接近活动开发末期以及想要了解网站在特定移动设备（例如，特定 iPhone 或 Nexus）上的外观时，可以使用**特定设备模式**。

### 内置设备预设

<div class="wf-devtools-flex">
  <div>
  <p>我们已在设备下拉菜单中包含了当前最热门的设备。选择设备后，每个预设都会自动配置特定设备特性的模拟：</p>
  <ul>
    <li>设置正确的“User Agent”(UA) 字符串。</li>
    <li>设置设备分辨率和 DPI（设备像素比）。</li>
    <li>模拟触摸事件（如果适用）。</li>
    <li>模拟移动设备滚动条叠加和 meta viewport。</li>
    <li>自动调整不带已定义视口的页面文本的大小（效果增强）。</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="选择设备">
  </div>
</div>

### 添加自定义设备预设

Device Mode 提供了多种用于模拟的设备。如果您发现某款边缘或冷门设备未涵盖在内，可以添加自定义设备。
 

<div class="wf-devtools-flex">
  <div>
  <p>要添加自定义设备，请执行以下操作：</p>
  <ol>
    <li>转至 DevTools 的 Settings 面板。</li>
    <li>点击 <strong>Devices</strong> 标签。</li>
    <li>点击 <strong>Add custom device</strong>。</li>
    <li>输入设备名称、宽度、高度、设备像素比和 User Agent 字符串。</li>
     <li>点击 <strong>Add</strong>。</li>
  </ol>
  <p>现在，您的自定义设备将显示在 <strong>Device</strong> 下拉菜单中。</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="选择设备">
  </div>
</div>

### 设备状态和方向

![切换方向](imgs/change-orientation.png)

模拟特定设备时，Device Mode 工具栏会显示另一个控件，主要用于在横向和纵向屏幕方向之间切换。

<div class="wf-devtools-flex">
  <div>
    <p>在选定的设备上，控件不只是可以切换方向。对于支持的设备（如 Nexus 5X），您会获得一个下拉菜单，可以模拟特定设备状态，如：</p>
    <ul>
      <li>默认浏览器 UI</li>
      <li>显示 Chrome 导航栏</li>
      <li>显示打开的键盘</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="更改设备 UI">
  </div>
</div>

### 缩放到合适大小  

<div class="wf-devtools-flex">
  <div>
  <p>有时，您可能想要测试分辨率大于浏览器窗口实际可用空间的设备。这种情况下，<strong>Zoom to Fit</strong> 选项会很方便：</p>
  <ol>
    <li><strong>Fit to Window</strong> 会自动将缩放级别设置为最大的可用空间。</li>
    <li>例如，如果您想要测试图像的 DPI，<strong>Explicit percentages</strong> 会非常有用。</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="缩放到合适大小">
  </div>
</div>

## 可选控件（例如，触摸、媒体查询、DPR）

<div class="wf-devtools-flex">
  <div>
  <p>点击设备工具栏右侧上的三个小圆点，可以更改或启用可选控件。当前选项包括：</p>
  <ul>
    <li>User Agent 类型（模拟 UA 和触摸事件）</li>
    <li>设备像素比</li>
    <li>媒体查询</li>
    <li>标尺</li>
    <li>配置网络（UA、网络节流）</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Device Mode 设置">
  </div>
</div>

继续阅读，详细了解特定选项。

### User Agent 类型

**User Agent Type** 或 Device Type 设置让您可以更改设备的类型。
可能的值为：

  1. Mobile
  2. Desktop
  3. Desktop with touch

更改此设置会影响移动设备视口和触摸事件模拟并更改 UA 字符串。
因此，如果您想要为桌面设备创建自适应网站，且想要测试悬停效果，请在 Responsive 模式下切换到“Desktop”。
：

**提示**：您也可以在 [**Network conditions**][nc] 抽屉式导航栏中设置 User Agent。



### 设备像素比 (DPR)

如果您想要从非 Retina 机器上模拟 Retina 设备或者从 Retina 机器上模拟非 Retina 设备，请调整**设备像素比**。
**设备像素比** (DPR) 是逻辑像素与物理像素之间的比率。与普通设备相比，带有 Retina 显示屏的设备（如 Nexus 6P）的像素密度更高，像素密度会影响可视内容的清晰度和大小。



网页上“设备像素比”(DPR) 灵敏度的部分示例如下：

* CSS 媒体查询，例如：

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 规则。


* 图像上的 [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup) 属性。


* `window.devicePixelRatio` 属性。

如果拥有原生 Retina 显示屏，您会注意到较低“每英寸点数”(DPI) 的资源看上去比较模糊，而较高 DPI 的资源比较清晰。
要在标准显示屏上模拟这种效果，请将 DPR 设置为 2 并通过缩放调整视口的大小。2 倍资源看上去还是比较清晰，1 倍资源看上去则比较模糊。


### 媒体查询 {: #media-queries }

[媒体查询](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)是自适应网页设计的基本部分。要查看媒体查询检查器，请在三圆点菜单中点击 **Show Media queries**。DevTools 会在样式表中检测媒体查询，并在顶端标尺中将它们显示为彩色条形。


![显示媒体查询](imgs/show-media-queries.png)

![媒体查询检查器](imgs/media-query-inspector-ruler.png)

用彩色标记的媒体查询示例如下：

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>针对最大宽度的查询。</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>针对一定范围内宽度的查询。</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>针对最小宽度的查询。</td>
    </tr>
  </tbody>
</table>

#### 快速预览媒体查询

点击媒体查询条形，调整视口大小和预览适合目标屏幕大小的样式。


#### 查看关联的 CSS

右键点击某个条形，查看媒体查询在 CSS 中何处定义并跳到源代码中的定义。


![网页基础知识媒体查询视图](imgs/reveal-source-code.png)

### 标尺

切换此选项可以在视口旁显示基于像素的标尺。

### 配置网络（UA、网络节流）

选择此选项会在抽屉式导航栏中打开一个面板，您可以在其中更改网络相关行为：


  1. **Disk Cache**：停用 Disk Cache 将在打开 DevTools 时停止浏览器缓存页面及其资源。
  2. **Network Throttling**：在此处阅读更多有关[网络节流](/web/tools/chrome-devtools/network-performance/network-conditions)的信息。
  3. **User Agent**：允许您设置特定的 UA (User Agent) 字符串替换值。


**提示**：您也可以从[主菜单][nc]中打开 **Network conditions** 抽屉式导航栏。


## 限制

Device Mode 存在一些限制。

* **设备硬件**
  * 无法模拟 GPU 和 CPU 行为。
* **浏览器 UI**
  * 无法模拟系统显示，如地址栏。
  * 无法将原生显示（如 `<select>` 元素）作为模态列表模拟。
  * 一些增强功能（如数字输入打开小键盘）可能会因实际设备行为不同而不同。
* **浏览器功能**
  * WebGL 可以在模拟器中操作，但 iOS 7 设备不支持 WebGL。
  * Chrome 不支持 MathML，但 iOS 7 设备支持 MathML。
  * 无法模拟 [iOS 5 方向缩放错误](https://github.com/scottjehl/device-bugs/issues/2)。
  * 行高 CSS 属性可以在模拟器中操作，但 Opera Mini 不支持行高 CSS。
  * 无法模拟 CSS 规则限制，例如 [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx) 中的规则限制。
* **AppCache**
  * 模拟器不会替换 AppCache [清单文件](https://code.google.com/p/chromium/issues/detail?id=334120) 的 <abbr title="User Agent">UA</abbr> 或[查看源请求](https://code.google.com/p/chromium/issues/detail?id=119767)。

尽管存在这些限制，Device Mode 还是十分强大，能够完成大多数任务。
如果需要在真实设备上测试，可以使用[远程调试](/web/tools/chrome-devtools/debug/remote-debugging)获得其他数据分析。




[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
